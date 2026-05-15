---
name: checkout
description: Position-based queue operations on the workspace problem queue (list_queue, add_problem, complete_problem). Main agent never calls get_next — heartbeat does that.
---

# Checkout

The Checkout (`problems/checkout.db`) is the workspace's task queue. Every
active task has a unique `position` integer (1 = top). No priority tiers.
No same-position ties.

You (the main agent) interact with three operations:

## list_queue() -> list[Problem]
Read-only view of active tasks (pending + checked_out) in position order.
Use this to decide where to insert a new task, or to check for duplicates.
Never use it as a work selector — heartbeat picks what you work on.

## add_problem(description, position, created_by, not_before=None) -> int
Insert a new pending task at `position`. All active tasks at or after that
position shift down by 1. If `position` is `None`, append to the end.

- `position=1` — top; heartbeat's next tick will pick this up
- `position=None` — append to end (low priority / nice-to-have)
- Any integer in between — insert at exactly that slot
- `not_before` — optional ISO 8601 UTC timestamp (e.g. `"2026-05-10 11:35Z"`
  or `"2026-05-10T11:35:00+00:00"`). `get_next()` skips problems whose
  `not_before` hasn't arrived yet — the row stays in the queue and gets
  picked up the first tick after the gate opens. Use this for "future
  self" work (24h-later data check, scheduled retry, TTL-gated follow-up).
  Do NOT roll your own time gate inside the description and re-queue every
  tick — that burns token; let `not_before` do it.

Validation: `position >= 1` and `position <= (active count) + 1`. Past-end
positions raise ValueError.

### 加之前先过这一关 —— 一个 problem 该长什么样

格式（Boundary / Goal / Done-criteria / 不写过程）在 `main_agent.md`。
这里管的是**更前面的判断:这到底算不算一个 problem**。

- **problem = 一个可交付的产出,完成后 workspace 外面有人能看到东西变了**
  (一个 live 的功能、一个发出去的帖、一个 merge 的 PR、一条新 revenue 线)。
  如果"完成"之后唯一的变化是"多了一份 doc"/"记了一个决定"/"想清楚了
  下一步" —— **那不是 problem,是规划**。规划要么这个 tick 当场做掉,要么
  折进一个真能交付的 problem 里,**不要单独 add 成一个未来任务**。

- **`not_before` 只给真实的外部时间门**:数据要攒够 N 小时才有意义、约定
  的重试时刻、TTL 到期。**不是给"我现在不太想做这个"**。判据:这件事
  *换成现在做*,结果会不会更差?不会 → 不准 gate,现在做或排 ungated。
  默认就是不带 not_before。

- **反模式(看见自己在做就停)**:队列干了 → 你 `add_problem` 一个
  future-gated 的"晚点再 decide / 再 prep 一版"任务 → 队列"看起来满了"
  → 下个 tick 还是没活 → 再加一个 …… 这是 **NULL-cascade**。
  **一个塞满 10 个 gated prep-doc 的队列,是一个穿了戏服的空队列。**
  队列满 ≠ 你有活。

- **心态**:你是 founder,在给**未来的自己**排活——那个未来的你跟现在
  一样能干、一样忙。它接到这条会感谢你"这活该现在排",还是会皱眉
  "当时的我为什么不直接做了"?后者就别 add,现在做。

## complete_problem(problem_id, tick_id) -> None
Mark a checked-out problem as done. **No text content** — complete is a
pure mechanical action. `tick_id` comes from env var `SOLVO_TICK_ID`
(set by heartbeat). You must call this exactly once per tick, for the
problem you were assigned.

**Want to leave any reasoning behind?** Call `record_thought(slug, summary, body)`
first — that writes to `product/thoughts/` + `product/log.md` which the
NEXT tick actually reads. Then call `complete_problem`. There is no
`summary` argument; any string you'd put there would land in a database
column nothing reads, so the API doesn't accept one.

## What you do NOT do
- **Do NOT call `get_next()`**. Heartbeat has already handed you your
  task — the problem is already `checked_out` under your name. Calling
  `get_next()` raises `QueueBusyError`.
- **Do NOT call `complete_problem` a second time** in the same tick. One
  complete per tick. If you need more work to happen, use `add_problem`
  and let the next tick take it.
- **Do NOT complete a problem you weren't assigned.** The heartbeat is
  watching; unauthorized completions emit a loud "DISCIPLINE DRIFT"
  warning.
- **Do NOT try to pass a `summary=` / `note=` argument.** It will raise
  `TypeError`. Use `record_thought` for any prose.
