AbortController has been in every browser and Node release that matters for years now, and most code I review still gets it subtly wrong. Not "doesn't work" wrong — "works until it doesn't" wrong: ghost requests overwriting fresh state, timeouts that can't be told apart from user cancels, `AbortError` logged as if the sky fell, leaked listeners that never fire.

None of these throw in the demo. They surface in production under a flaky network and a fast-clicking user. Here are the patterns that actually hold up, with the 2026 API surface.

## 1. Cancelling fetch — and why `AbortError` is not an error

The mechanics are easy. The mistake is what you do in `catch`.

```js
const controller = new AbortController();

try {
  const res = await fetch('/api/search?q=hello', { signal: controller.signal });
  const data = await res.json();
  render(data);
} catch (err) {
  if (err.name === 'AbortError') return; // not a failure — we caused it
  throw err;                              // a real failure — surface it
}

// elsewhere, e.g. the user typed another character:
controller.abort();
```

The single most common bug: a blanket `catch` that pipes *every* rejection into your error UI. When you abort an in-flight `fetch`, the promise rejects. If you don't special-case that rejection, cancelling a request renders an error toast for an action the user deliberately took. Abort is a normal control-flow outcome, not an exception condition.

Two precision points people get wrong:

- **`controller.abort()` with no argument** rejects `fetch` with a `DOMException` whose `name` is `"AbortError"`. That's the case the snippet above handles.
- **`controller.abort(reason)`** rejects `fetch` with *that reason* instead. If you pass `abort(new Error('user navigated'))`, your `err.name === 'AbortError'` check won't match and you'll re-throw it. If you use custom reasons, branch on `controller.signal.aborted` / inspect `signal.reason`, don't pattern-match the name.

A controller is **single-use**. Once `abort()` has been called, the signal is permanently aborted ("sticky") — handing that same signal to a new `fetch` aborts it immediately. One operation, one fresh `AbortController`.

## 2. `AbortSignal.timeout()` instead of the setTimeout dance

The hand-rolled version is everywhere and it leaks:

```js
// Don't do this
const controller = new AbortController();
const t = setTimeout(() => controller.abort(), 5000);
try {
  const res = await fetch(url, { signal: controller.signal });
  // BUG: if the fetch resolves in 200ms, this timer still fires 4.8s later
} finally {
  clearTimeout(t); // easy to forget; without it the timer keeps a ref alive
}
```

Use the built-in:

```js
const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
```

`AbortSignal.timeout(ms)` returns a signal that aborts itself after `ms`. No timer handle to clean up, nothing to forget. Two properties worth knowing:

- It aborts with a `DOMException` named **`"TimeoutError"`**, *not* `"AbortError"`. This is a feature: you can finally tell "the server was too slow" apart from "the user hit cancel" in one `catch`.
- The clock is **active time, not wall-clock**. It pauses while the document is in the back/forward cache or a worker is suspended, so a backgrounded tab won't spuriously time out the moment it's restored.

```js
try {
  const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
  return await res.json();
} catch (err) {
  if (err.name === 'TimeoutError') return showRetry();   // slow server
  if (err.name === 'AbortError')   return;                // user cancelled
  throw err;
}
```

## 3. `AbortSignal.any()` — timeout *and* user-cancel, correctly

The real-world requirement is almost always "abort if the user cancels **or** if it takes too long." People reach for nested controllers and a `setTimeout`. Don't. Compose:

```js
function load(url, { signal } = {}) {
  const signals = [AbortSignal.timeout(8000)];
  if (signal) signals.push(signal);          // caller's user-cancel signal
  return fetch(url, { signal: AbortSignal.any(signals) });
}
```

`AbortSignal.any([...signals])` returns a signal that aborts as soon as **any** input aborts. `signal.reason` is set to the reason of whichever one fired first — so you can still distinguish a `TimeoutError` from a user `AbortError` after combining:

```js
try {
  const res = await load(url, { signal: userCancel.signal });
} catch (err) {
  if (err.name === 'TimeoutError') { /* it was the 8s timeout */ }
  if (err.name === 'AbortError')   { /* it was the user */ }
}
```

Two sharp edges:

- If **any** input signal is *already* aborted when you call `AbortSignal.any()`, the combined signal comes back already aborted. That's correct behavior, but it means you must build the combined signal *per attempt*, not once and reuse it — same single-use rule as a controller.
- On Node, `AbortSignal.any()` had a history of memory leaks when a long-lived signal accumulated many short-lived dependents (nodejs/node #54614, #57584); fixes landed progressively through the v26.x line. The practical guidance hasn't changed: keep the composed signal scoped to one operation and let it get collected, rather than wiring thousands of per-request signals into one process-lifetime parent.

## 4. The React `useEffect` + StrictMode trap

This is where most people actually meet AbortController, and where the bug is the most expensive because it looks like it works.

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/users/${userId}`, { signal: controller.signal })
    .then(r => r.json())
    .then(setUser)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);
    });

  return () => controller.abort();   // cleanup: cancel the in-flight request
}, [userId]);
```

Why this exact shape:

- **Fresh controller inside the effect body.** Not in a ref shared across runs, not module scope. Each effect run owns its own controller because an aborted one is dead forever (point 1).
- **`abort()` in the cleanup function.** When `userId` changes, React runs cleanup *then* re-runs the effect. Without the abort, a slow response for the old `userId` can land *after* the new one and overwrite correct state with stale data. This is the classic search/autocomplete race, and AbortController is the fix — not a debounce (a debounce only narrows the window).
- **Filter `AbortError` before `setState`.** The aborted request rejects; if you don't filter it you'll call `setError` for a cancellation, and possibly set state on an unmounted component.

On **StrictMode in development** (React 18 and 19): the effect runs, cleans up, and runs again — on purpose. You'll see the first request show as cancelled (red) in the network panel. That is not a bug to silence; it's StrictMode proving your cleanup works. The React team's position is explicit: this is expected, and the resolution is correct cleanup + a fresh controller per run — exactly the code above. It does not fire twice in production builds. Disabling StrictMode to "fix" it just hides the broken-cleanup class of bugs until production finds them for you.

## 5. Node: the same signal, far past fetch

`AbortSignal` is the cancellation currency across Node core, not just HTTP.

**Auto-removing event listeners.** The `signal` option on `addEventListener` (and Node's `EventEmitter`/`EventTarget`) removes the listener when the signal aborts. One `abort()` tears down a whole group of listeners — no bookkeeping, no matching `removeEventListener`:

```js
const controller = new AbortController();

target.addEventListener('message', onMessage, { signal: controller.signal });
target.addEventListener('error',   onError,   { signal: controller.signal });

controller.abort(); // both listeners gone
```

**Awaitable timers.** `timers/promises` honors a signal, so a delay becomes cancellable:

```js
import { setTimeout as delay } from 'node:timers/promises';

try {
  await delay(10_000, undefined, { signal });
} catch (err) {
  if (err.name === 'AbortError') return; // cancelled before the 10s elapsed
  throw err;
}
```

**Streams.** `fs.createReadStream(path, { signal })` and the stream iterator helpers (`.map`, `.filter`, `stream.compose`, `events.on`) all accept a `signal` and destroy the stream on abort — clean cancellation of a large file transfer instead of letting it run to completion after the client already disconnected.

**Cooperative cancellation between awaits.** When you write your own async function, the signal can be passed through but nothing checks it for you between steps. `signal.throwIfAborted()` is the one-liner that does:

```js
async function pipeline(items, { signal }) {
  for (const item of items) {
    signal?.throwIfAborted();      // bail at the boundary if already aborted
    await processOne(item, { signal });
  }
}
```

It throws `signal.reason` if aborted and does nothing otherwise — the idiomatic way to add abort checkpoints to a loop without hand-rolling `if (signal.aborted) throw ...`.

## Checklist

- One `AbortController` per operation. Signals are sticky and single-use — never reuse one after `abort()`.
- In every `catch` touching cancellable work, ignore the cancellation: `if (err.name === 'AbortError') return;` — abort is control flow, not an error.
- Reach for `AbortSignal.timeout(ms)` over `setTimeout` + `abort()`. It can't leak a timer, and `TimeoutError` is distinguishable from `AbortError`.
- Combine concerns with `AbortSignal.any([...])`, built fresh per attempt; read `signal.reason` to learn which one fired.
- In `useEffect`: fresh controller in the body, `abort()` in cleanup, filter `AbortError` before `setState`. StrictMode's double-run is the test, not the bug.
- In Node, pass `signal` everywhere it's accepted (listeners, `timers/promises`, streams) and use `signal.throwIfAborted()` for checkpoints in your own async code.

Get these six right and the entire class of "stale response clobbered fresh state" / "cancel shows an error" / "timer leaked" bugs disappears.

---

I built an interactive version of every pattern here so you can run them in the browser, abort them mid-flight, and watch exactly what each `catch` sees: **https://solvo-devnotes.vercel.app**

![](https://solvo-devnotes.goatcounter.com/count?p=/devto-abortcontroller&t=devto-article)
