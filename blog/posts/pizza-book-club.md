When I was eight years old, I participated in Pizza Hut's Book It! program. You read books. Your teacher checked off your reading log. When you hit your goal, you got a personal pan pizza. A real one. At Pizza Hut. With a certificate.

I would have read those books anyway. But the pizza made it feel like an *achievement*. Twenty years later, I built the same system for a virtual campus — except the pizza is digital, the book reports go through a JRPG dialogue box, and the whole thing lives inside a giant pizza sculpture in a zone I named the Sculpture Garden.

## The Sculpture Garden

Before I could build the book club, I needed somewhere to put it. I created a new outdoor zone in the southern part of campus, near the beach dock — an open-air area with a sandy path, decorative tileset, and no doors or locks. The Sculpture Garden is freely walkable, and it's designed as an extensible cluster: the pizza sculpture is the first resident, but any future whimsical campus addition can be placed here.

The zone matters because the *location* of a feature affects how it's discovered. A reading tracker buried in a settings menu will be used by people who already read. A reading tracker that's a giant pizza sculpture you walk past on your way to the beach will be noticed by everyone.

![The Pizza Book Club in the Sculpture Garden \u2014 a massive pixel art pizza slice sculpture several stories tall with melted cheese dripping down the sides, standing on a sandy beach area near a dock. A JRPG-style dialogue box shows the book review submission interface with fields for title, review, and a pizza-slice rating. A Book It! Reading Log scoreboard displays student progress bars. Students browse bookshelves built into pizza-themed structures nearby.](images/pizza-book-club-sculpture.png)

## Read It!

The NPC is called **Read It!** — a giant pizza slice rendered in a 90s futuristic space aesthetic (chrome accents, neon gradients, star-field details). When you approach it and press E, the JRPG dialogue system launches.

The multi-step dialogue works like a quest:

1. **Title**: "What did you read?"
2. **Author**: "Who wrote it?"
3. **Summary**: "Tell me about it in your own words." (Free text, no minimum length.)
4. **Pages/Amount**: "How much did you read?" (A number — could be pages, could be chapters.)
5. **Fun Rating**: A 5-tier emoji scale: 😴 😐 😊 🔥 🤩

When you submit, you earn a pizza slice 🍕. The slice is your unit of achievement. Everything in the system is measured in slices.

## The pizza economy

The slice system has a few constraints to prevent gaming:

- **Daily cap**: 3 reports per day. You can't grind 50 book reports at midnight.
- **Streak bonuses**: Consecutive days of reading earn bonus slices. The streak resets if you skip a day.
- **Badge milestones**: 5 slices earns your first badge. Then 10, 25, 50, 100. Each badge is a visual upgrade on your reading profile.
- **Privacy toggle**: You can mark reports as private. Private reports still earn slices but don't appear on the leaderboard. This matters because some students want to read without public scrutiny.

The monthly leaderboard shows top readers by total slices earned that month. An `isSelf` flag highlights your own position. A cron job runs at 3 AM on the 1st of each month to award monthly trophies to the top readers.

## Share links

Every book report can be shared via a unique URL. `POST /api/book-club/reports/:id/share` generates an idempotent share token. The public view at `/r/:shareToken` shows the report without requiring authentication — so students can share their reading on social media.

The share page shows the book title, author, the student's summary, their fun rating, and their cumulative pizza stack. It's a personal reading portfolio, shareable with a single link.

## 61 tests

This is the most tested feature I've built for campus. 61 unit tests covering the slice economy, daily caps, streak calculations, badge milestones, leaderboard queries, share link generation, and privacy filtering. All passing in 239ms.

I wrote them before writing most of the code — genuine test-driven development — and it caught three bugs before they ever reached production:

1. The leaderboard endpoint returned a 500 because I forgot to pass the params array to the SQL query.
2. The public profile endpoint tried to query a `users` table that had been renamed to `students`.
3. The streak calculator double-counted the current day, so logging two reports on the same day broke your streak instead of extending it.

Writing tests for a pizza-themed book club felt absurd. But the tests were the reason it shipped clean.

## Why nostalgia works

The Book It! reference isn't arbitrary. Every student I've mentioned it to either participated in the program or knows someone who did. The pizza-for-reading exchange is lodged in an entire generation's memory as a positive association with books.

By explicitly invoking that nostalgia — the sculpture looks like a 90s pizza ad, the rewards are pizza slices, the whole vibe is "remember when reading got you pizza?" — I'm borrowing an emotional framework that already exists. Students don't need to be convinced that pizza-for-reading is a valid incentive. They already believe it. They believed it when they were eight.

This is what I mean when I say **nostalgia is a design tool.** You're not just evoking a memory — you're reactivating a motivational pattern that was established in childhood. The Book It! program taught millions of kids that reading → reward → celebration. The Pizza Book Club says: that's still true. Here's your pizza.

## The JRPG dialogue as game design

Filing a book report sounds boring. Filling out a form is boring. But having a *conversation with a pizza sculpture* about what you read? That's a quest.

The JRPG dialogue system — the same one we use for Baba Yaga encounters and NPC interactions — transforms data entry into narrative. Each step of the report is a dialogue exchange. The NPC has personality. It reacts to your fun rating ("🤩 That good?! I'm adding extra cheese to your slice!"). The submit button isn't "Submit Report" — it's "Claim Your Slice! 🍕"

The information collected is identical to a form. The experience of providing it is completely different. And in a learning environment, experience *is* the product. Nobody remembers a form. Everyone remembers the time a giant pizza gave them a 🔥 rating.
