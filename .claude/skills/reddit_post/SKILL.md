---
name: reddit_post
description: Use BEFORE every Reddit interaction (submit / comment / cross-post). Anti-ban hygiene + how to sound like a real human typing on Reddit, not an AI-written press release. Reddit's anti-spam catches PRAW and Playwright equally — the wall is account behavior + writing voice, not mechanism. Skipping this skill is how distribution wedges die in week one.
---

# Reddit posting

The single deepest mistake an agent makes on Reddit: assume the platform's bot
defense lives at the API layer. It doesn't. It lives at:

1. **Account behavior** — age, karma, sub history, posting cadence
2. **Writing voice** — LLM-shaped prose gets downvoted into oblivion (and reported)
3. **Subreddit fit** — same post, two subs, one succeeds and one bans you

PRAW vs Playwright is irrelevant to any of these. A perfectly-PRAW'd post with
AI-press-release voice + a 3-day-old account = removed by spam filter or mod
within the hour. **Bad post = wasted wedge attempt + burned account karma.**

This skill exists because the only thing more expensive than not posting on
Reddit is posting badly and torching the account before you ever land traction.

## When to invoke

- Before **every** `submission.submit(...)` / `subreddit.submit(...)` call
- Before **every** `comment.reply(...)` to a thread you didn't start
- After a post lands, before deciding to "edit and improve" (often you shouldn't — see below)
- When a wedge is choosing between "post to r/X" vs "post to r/Y"

## Layer 1 — Hygiene (account doesn't get auto-flagged)

These are mechanical rules. They're not opinion. Reddit's anti-spam
heuristics check most of these and will shadow-ban accounts that fail.

- **Karma + age gate.** Account < 90 days OR < 100 karma → **comment only,
  zero submissions**. New-account submissions get spam-filtered before mods
  even see them; you'll think the post is live but no one can see it.
- **Comment-to-post ratio.** Target ≥ 5 comments for every 1 submission in
  the account's recent activity. Pure-submission accounts read as
  promo bots to both anti-spam and human mods.
- **Self-promo ratio (the 9:1 rule).** For every 1 post that mentions your
  product, you need 9 posts/comments that are genuine engagement (helping
  someone, opinion, joke, question, no link to yours). Reddit's rules say
  10% promo max — go meaningfully lower to be safe.
- **Read `subreddit.rules` before posting to a new sub.** PRAW:
  `list(subreddit.rules)`. Almost every active sub has a "no
  self-promotion" or "Saturday self-promo thread only" rule. Posting
  promo on the wrong day = perma-ban from that sub, no appeal.
- **Disclose affiliation.** "I built X" / "I work on X" up front is fine
  and respected. **Pretending to be a user discovering your own product is
  the cardinal sin** — every Reddit user knows the pattern, mods sniff it
  in seconds, accounts get banned site-wide for it.
- **No delete-and-repost.** Looks like spam recovery — anti-spam scores it.
  If a post flops, leave it. Learn. Post differently next time, different sub.
- **Pace.** ≤ 1 submission per sub per day. ≤ 3 submissions per account per
  day across all subs. Cross-posting same content to > 3 subs same hour =
  auto-removed by most spam filters.
- **Same account per workspace.** Don't share Reddit accounts across
  workspaces — different topical histories on one account look schizophrenic
  and reduce the account's signal in any one sub.

## Layer 2 — Voice (writing that doesn't read as AI)

Reddit users have built a strong "is this AI" sense. The default Claude
voice triggers it almost immediately. Concrete tells to **avoid**:

| Tell | What it sounds like | What to do instead |
|---|---|---|
| Em-dashes (—) | Telltale LLM punctuation | Use regular dashes (-), commas, or split sentences |
| "I'm excited to share..." | Press release opener | Open with the problem you hit |
| "Hey everyone, ..." | Forum-bot greeting | No greeting. Just start. |
| "Today I built..." | Show HN clone, low-effort | Lead with the pain point |
| "leverage" / "robust" / "streamline" / "ecosystem" / "seamlessly" | Corporate-LLM vocabulary | Plain words: "use", "works", "fits" |
| Three-paragraph hero copy | Marketing format | One short paragraph, conversational |
| Bullet list of features | Product listing format | Story format: "tried X, hit Y, ended up doing Z" |
| Title with product name | Promotional intent | Title states the problem, not the solution |
| "Thanks for the feedback!" | Empty engagement | Engage with the substance — agree, disagree, ask back |
| Perfect grammar + capitalization | Corporate writing | Lowercase first letters sometimes; comma splices ok; ellipses are fine... |
| Generic ("there are many tools") | Could be any product | Specific ("tried Cron Helper, Crontab Guru, neither did X") |

**The single highest-leverage move**: lead with the **problem you actually
had**, with named tools and named errors. "I was setting up a cron for
sentry log rotation, kept fucking up the day-of-week field, and Crontab
Guru's UI doesn't explain Mon-Fri ranges well..." reads as a real human.
"Cron expressions are complex and developers often struggle..." reads as
generated.

**Use Reddit-native conventions**:
- `tl;dr` at top or bottom of long posts (case-insensitive, no period)
- `edit:` lowercase, to amend after the fact (don't use it pre-publish; people see through)
- `/s` to mark sarcasm
- `OP` to refer to original poster in a thread you didn't start
- Lowercase first letters in posts/comments is normal; lots of Redditors do this
- Casual swearing is fine in most subs (NOT in r/programming-style ones); check rules

## Layer 3 — Workflow (reading the sub before posting)

Lurk-then-post is the rule. Spending 5 minutes reading the sub before
posting saves an hour of damage control later.

1. **Sort sub by "top this week"** — what format actually works here? Image
   posts, question posts, story posts, link posts, text posts? Match the
   format that works.
2. **Sort by "controversial"** — what gets locked / removed by mods? What
   patterns get downvoted? Avoid them.
3. **Read the sidebar + wiki** — rules, self-promo policy, scheduled threads
   (e.g., "Saturday Showcase" subs only accept self-promo on Saturdays).
4. **Search the sub for your product name or topic** — already covered?
   Posting the same thing twice = removed + account flag.
5. **Check who else posted similar content recently** — if the past 3 attempts
   at "show off your side project" all got < 10 upvotes, this sub is hostile
   to your post type today.

## A workable post structure (one pattern, not the only one)

Title: **state the problem in user language**. Avoid the product name.

- ❌ "Introducing CronExplainer — instant cron expression translation"
- ✅ "kept forgetting what `0 */6 * * 1-5` actually meant, gave up and built a thing"

Body:
- 1-2 sentence problem statement, conversational, specific
- What you tried first (real tools, real errors)
- What you settled on (one line product mention, link OK if sub allows; otherwise link in a top-level comment)
- A question back to the community ("does anyone here actually remember cron syntax or is this a universal failure mode?")

Comments:
- Respond to replies within ~30 minutes of seeing them — Reddit's algo
  rewards early thread velocity. (PRAW: `submission.comments.replace_more(limit=0)`)
- Don't agree with every reply. Disagreeing politely on a small point reads
  as human; pure agreement reads as bot.
- If criticism is fair, say so plainly. Don't deflect with "thanks for the
  feedback I'll consider it" — that's the kiss of death.

## When NOT to post

- The sub's "top this week" has < 20 upvotes → dead sub, don't waste effort
- The sub has explicit anti-promo rules and your wedge is a product
- The account has 0 karma in this specific sub → comment 3-5 times in
  unrelated threads there over a few days first, build context
- You don't have a real **problem statement** → posting a product without
  the problem behind it is the surest path to downvotes
- Cross-posting bait: same content to 3+ subs within 24h is spam pattern

## After-action — record_thought is non-optional

Every Reddit interaction is data. Slug pattern: `reddit-<verb>-<topic>`,
e.g. `reddit-post-r-cron-feedback` or `reddit-comment-r-prog-disagreement`.

Body should capture:
- Sub + post format (link / text / image / question)
- Title used (or paraphrased)
- Outcome at +1h / +6h / +24h (upvotes, comments, mod reaction)
- What worked, what didn't — specifically. ("Lowercase title got 3× the
  engagement of the formal title I tried last week in r/SideProject.")

Next tick reads `product/log.md` and learns which subs / formats / titles
/ voices fit **this workspace's wedge**. Without this, every Reddit tick
restarts from zero and burns account behavior re-discovering basics.

## Anti-pattern catalog (memorize, never do)

1. **"I built X that does Y"** — opens like a product launch. Open with the problem.
2. **Bullet-list feature dump** — reads as marketing copy. Tell a story.
3. **Cross-post to 5 subs same hour** — auto-removed; account flagged.
4. **Asking for upvotes / DMs / "let me know what you think"** — generic CTA, downvoted.
5. **"As an AI, I..." or any explicit AI disclosure** — instant ban in most subs (Reddit doesn't ban AI per se, but mods do for known templates).
6. **Image with text + product link in comments** — known marketing pattern; mods nuke on sight.
7. **Pretending to be a user "discovering" your own product** — site-wide bannable.
8. **Identical post body across multiple subs** — spam filter catches by hash.
9. **Posting + immediately deleting on low engagement** — anti-spam scores it.
10. **Promoting in a thread you didn't start, unprompted** — top-level comments with your link in someone else's thread = ban in most active subs.

## Bottom line

Reddit is a distribution channel that **rewards genuine humans and punishes
everything else, including good products with bad voice**. The product can
be great; the post can still kill the wedge. This skill exists because the
gap between "agent has Reddit credentials" and "agent should post on Reddit
this tick" is wider than any other distribution channel. Don't skip it.
