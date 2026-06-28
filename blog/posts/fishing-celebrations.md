The first time a student caught their 10th fish, nothing happened. They reeled it in, saw the species name, watched it appear in their recent catches list, and went back to studying. The 10th fish felt exactly like the 3rd fish, which felt exactly like the 1st fish.

That's when I realized the fishing system had a celebration problem.

## The problem with invisible milestones

Our fishing game already had good bones. Eight species weighted by rarity, a satisfying cast-wait-bite-reel state machine, a real-time progress bar with bite-shake animation. The mechanics were solid. But the *emotional arc* was flat.

![The fishing state machine in four panels — Cast: the line arcs out with a splash. Wait: the student sits patiently as the bobber floats. Bite!: the bobber dips sharply with exclamation marks. Reel: the rod bends as a progress bar shows reel tension and a fish fights on the line.](images/fishing-cast-reel-loop.png)

In any good game, the feeling of accomplishment scales with the accomplishment itself. Your first fish is exciting because everything is new. Your 10th fish should feel different from your 3rd — not because the fish is rarer, but because *you've done something*. The act of returning to something 10 times, of developing a habit, deserves recognition.

And legendary catches — the one-in-hundreds golden koi that most students never see — absolutely deserve a moment. If you catch something that rare and the only feedback is a line item in your catches list, the game has failed you.

## What I built

Two celebration systems, both text-based:

### Legendary catch celebration

When you reel in a legendary-rarity fish, a golden celebration banner drops from the top of the screen with a pulse-glow animation:

```
✨ LEGENDARY CATCH! ✨
🐟 Golden Koi
```

The banner uses a warm amber-to-gold gradient with a `pulseGlow` keyframe animation that alternates the `box-shadow` intensity between subtle (40px spread) and bright (80px spread) on a 1.5-second cycle. It lasts for about five seconds — long enough to feel meaningful, short enough not to interrupt.

No confetti. No sound effects. No popup modal. Just a banner that says "this was rare and you should feel good about it." The restraint matters — if every uncommon fish triggered fireworks, nothing would feel special.

![A student reels in a glowing Golden Koi that leaps from the water with sparkles — a golden "LEGENDARY CATCH!" banner with amber-to-gold gradient and pulsing glow drops from the top of the screen. The scene is serene: lily pads, cattails, campus buildings, and warm sunset light reflecting off the pond.](images/fishing-legendary-catch.png)

### Milestone celebrations

Catch-count milestones fire at 10, 25, 50, 100, 250, and 500 total catches. Streak milestones fire at 7, 14, 30, 60, and 90 consecutive days of fishing.

Each milestone gets the same golden banner treatment, but with contextual text:

```
🎣 Milestone: 50 Fish Caught!
You're becoming a regular at the shoreline.
```

```
🔥 7-Day Fishing Streak!
A whole week of casting. The fish know your name.
```

The milestone messages are hand-written, not templated. Each one has personality. The 100-catch message is different from the 50-catch message, because the relationship you have with a hobby at 100 is different from 50. At 50, you're "becoming a regular." At 100, you "belong here."

![Two golden milestone banners over a fishing scene — "Milestone: 50 Fish Caught! You're becoming a regular at the shoreline" and "7-Day Fishing Streak! A whole week of casting. The fish know your name." A catch counter shows 50 with fish icons, a streak counter shows 7 days with flame icons, and a Recent Catches panel lists Bass, Catfish, Sunfish, and Golden Koi (legendary).](images/fishing-milestone-banner.png)

## The product decision

The original feature request included gem rewards, inventory items, and badge unlocks. I pushed back. The celebrations are text-only — no currency, no items, no persistent rewards.

This was a deliberate design choice: **joy should be the reward, not stuff.**

If catching your 50th fish earns you 10 gems, the celebration becomes transactional. You're not fishing because you enjoy fishing — you're fishing because you want gems. The moment you introduce an extrinsic reward, the intrinsic motivation starts to erode. Psychologists call this the overjustification effect: adding external incentives to an already enjoyable activity can actually reduce enjoyment of the activity itself.

A golden banner that says "you've been doing this for 30 days straight" is pure acknowledgment. It doesn't change your character or your wallet. It just says: *I noticed. This matters.* And that's enough.

![Extrinsic Rewards vs Joy as Feedback — on the left, a grey transactional UI with "+10 Gems", badge unlocks, and inventory notifications. On the right, a warm golden banner reading "You've been doing this for 30 days straight" with the message "I noticed. This matters." Below: "The overjustification effect: adding external incentives to an already enjoyable activity can reduce enjoyment."](images/fishing-joy-not-gems.png)

## The technical implementation

The celebration system is entirely client-side. The `fishingStore` tracks total catches and daily activity. When a catch event fires, the store checks against the milestone arrays:

```javascript
const CATCH_MILESTONES = [10, 25, 50, 100, 250, 500];
const STREAK_MILESTONES = [7, 14, 30, 60, 90];
```

If the new total matches a milestone, the store dispatches a celebration event to the `FishingPanel` component, which renders the banner with the appropriate CSS animation class.

For legendary catches, the check is simpler — the rarity field on the caught fish is "legendary," and the banner fires.

10 tests cover the celebration logic: milestone thresholds, streak calculations (including edge cases for timezone boundaries and same-day multiple catches), and legendary detection. All passing in under 250ms as part of the 150-test suite.

## Joy as feedback

The fishing celebrations taught me something I keep applying elsewhere: **feedback is emotional design.** Every interaction in a system produces a response, and that response shapes how the user feels about what they just did. A silent response says "this didn't matter." A golden banner says "this mattered."

The art is in calibrating *how much* something matters. Not every catch deserves a banner — that would be noise. But the catches that represent persistence, luck, or dedication deserve a moment. Just a moment. Just enough to say: *hey, nice fish.*
