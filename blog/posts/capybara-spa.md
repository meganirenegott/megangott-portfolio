The most popular feature on our campus isn't a tool, a game, or a learning system. It's capybaras.

Specifically, it's a small zone called the Capybara Spa — a cluster of warm-water pools in the southern part of campus where pixel art capybaras graze, soak, play tag with each other, groom each other's fur, and occasionally fall asleep on the rocks. They have circadian rhythms. They have friendships. They startle when you walk too close.

They do absolutely nothing productive, and students visit them every single day.

## Designing animal behavior that feels alive

The capybaras started as a test case for a compositional behavior system I was building — a framework where animal behavior is assembled from reusable trait modules rather than hand-coded per species.

Each capybara's behavior is composed from a stack of traits:

- **Wanderer**: Move toward random points within a home radius. Speed and pause duration randomized per individual.
- **Pair-bonder**: Form loose friendships with other capybaras. Drift toward bonded companions during idle periods.
- **Grazer**: Periodically stop walking and play a feeding animation. Duration varies. Sometimes interrupted by environmental stimuli.
- **Docile**: Low startle threshold. Nearby players cause a brief alert state (head-up, ears-perked) but not flight.
- **Diurnal**: Active during the day, resting at night. Activity levels ramp down starting at sunset and pick back up at dawn.
- **Aquatic**: Gravitates toward water tiles. Spends time partially submerged (only head visible) with periodic surfacing animations.

The key insight was that none of these traits know about each other. They're independent state machines that feed into a priority system. When a capybara's `aquatic` trait says "move toward water" at the same time its `pair-bonder` trait says "move toward Marshmallow," the priority resolver blends the vectors. The result looks like a capybara that *wants* to soak but also *wants* to be near its friend — which is exactly how real capybaras behave.

## The friendship system

This is the part that surprised me. I added a simple friendship tracker between individual capybaras — basically, how much time has each pair spent near each other? — and the emergent behaviors were immediate and believable.

Capybaras with high friendship scores drift toward each other during idle periods. They graze side by side. When one enters the water, the other tends to follow within a few minutes. If they're separated by distance (one wandered far), they'll gradually reconverge.

None of this is scripted. It's just proximity tracking plus behavioral gravity. But to students, it looks like the capybaras *like* each other. People started naming the friendship pairs. "Have you seen that Pudding and Cocoa are always together?" "Mochi keeps following Biscuit into the hot spring."

The friendship data is per-session and ephemeral — it doesn't persist to the database. Every time the server restarts, the friendships form fresh from proximity. This means the dynamics change subtly over time, which is actually more interesting than persistent bonds. Pudding and Cocoa might be inseparable on Tuesday and barely interact on Wednesday. Just like real friendships.

## Circadian rhythms

The capybaras follow a day/night cycle tied to the player's local time. During the day (6 AM to 6 PM), they're active — wandering, grazing, socializing, soaking. In the evening (6 PM to 9 PM), activity ramps down. They move less, pause more, and start clustering near the warm pools. After 9 PM, most of them are asleep on the rocks.

I implemented this as a `diurnal` behavior trait with a simple activity multiplier:

```javascript
function getDiurnalActivity(hour) {
  if (hour >= 6 && hour < 18) return 1.0;    // Full activity
  if (hour >= 18 && hour < 21) return 0.5;   // Winding down
  if (hour >= 21 || hour < 5) return 0.1;    // Sleeping
  return 0.3;                                 // Dawn, waking up
}
```

The multiplier scales wander speed, interaction probability, and state-change frequency. At 0.1 activity, a capybara barely moves — it shifts position once every few minutes, plays a slow breathing animation, and ignores nearby players entirely.

Students who visit the spa at 11 PM find sleeping capybaras. Students who visit at 7 AM find them slowly waking up, stretching, ambling toward the water. The different experience depending on *when* you visit makes the spa feel like a real place with its own schedule rather than a static scene that's always performing for you.

## The startle response

When a player walks within a certain radius of a capybara, the capybara reacts. Not dramatically — capybaras are famously chill — but visibly. The head lifts. The ears perk. If the player keeps approaching, the capybara shifts its weight but doesn't flee. If the player moves away, the capybara relaxes after a beat.

I tuned the startle distance to be close enough that you have to be *trying* to approach — you won't trigger it by walking past on the path. You have to walk off the path, into the grass, toward the pools. The reaction rewards deliberate exploration and creates a tiny moment of interspecies negotiation: *I'm coming closer, are you okay with that? Yeah, you're okay. Cool.*

## Why none of this is productive

I want to be honest about what the Capybara Spa doesn't do. It doesn't teach coding. It doesn't track learning outcomes. It doesn't award XP or badges or certificates. It exists purely as a place students go to decompress, to watch something calming, to exist in a digital space that isn't asking anything of them.

And that's the design philosophy: **not everything in a learning environment needs to be about learning.** The pressure to make every pixel educational is the same pressure that makes learning platforms feel like software instead of places. Real campuses have lawns where people sit and do nothing. They have ponds with ducks. They have benches under trees.

The Capybara Spa is our bench under a tree. Students go there between coding sessions. They go there when they're stuck on a bug. They go there to watch Marshmallow fall asleep in the hot spring.

Sometimes the most valuable thing you can build for people who are learning hard things is a place where nothing is expected of them at all.
