Students on our virtual campus can go fishing. Instead of catching bass, they catch arxiv papers — "Attention Is All You Need," "Playing Atari with Deep Reinforcement Learning," that sort of thing. It's a gamified way to nudge people toward reading foundational ML research.

The system worked great in testing. Then students started actually using it, and around catch #15, they hit a wall. Same papers. Over and over. The celebration banners still fired, but the content was stale. The magic was gone.

![A student fishing from a dock on the virtual campus ocean at sunset. Their rod is cast into the water, but their expression is bored — a thought bubble reads "Again??" as yet another copy of "Attention Is All You Need" surfaces. A stack of already-caught duplicate papers sits beside them. The celebration banner overhead looks stale. The contrast between the beautiful ocean setting and the repetitive content tells the whole story.](images/fishing-wall-catch-15.png)

## Finding the root cause

The fishing flow works like this:

1. Student casts a line → API call to `/fishing/cast`
2. Server picks from the student's interest tags to build an arxiv search query
3. arxiv returns papers, server picks one, records it in PostgreSQL
4. Client shows a celebration banner with the paper title

The bug was in steps 2 and 3. Two problems compounding:

**Problem A: The same tags were always picked first.** `castLine()` grabbed the student's top N interest tags in the same order every time. If your interests were `["transformers", "reinforcement-learning", "computer-vision"]`, every single cast started with "transformers."

**Problem B: The arxiv offset was capped.** `queryArxiv()` used a `start` parameter between 0–9. After ~15 casts searching "transformers" at offsets 0–9, you've seen every result. The well runs dry.

## The fix

I went with what I called "Option 4 — no hard-coded limits":

```javascript
// Before: always the same tags in the same order
const tags = student.interests.slice(0, 3);

// After: Fisher-Yates shuffle so different tags lead each cast
const tags = shuffleArray([...student.interests]).slice(0, 3);
```

For the offset, instead of capping at 9, I scaled it by total catch count:

```javascript
// Offset grows as the student fishes more
const start = Math.min(10 + Math.floor(totalCatches / 2), 40);
```

A student with 60 catches is now searching at offset 40 — deep into arxiv's results. Combined with rotating tags, even a student with 200+ catches keeps finding fresh papers.

## What I'd do differently

The real fix would be a server-side "seen papers" table — deduplicate at the database level instead of hoping randomization avoids repeats. That's the v2 I'd build if this feature sees heavy use.

## What I learned

The bug wasn't in any single function. It was in the *interaction* between two reasonable defaults (pick top tags, use small offsets) that only broke at scale. The best tests for this kind of thing aren't unit tests — they're "play the feature 50 times in a row" tests. I added two regression tests that simulate exactly that.
