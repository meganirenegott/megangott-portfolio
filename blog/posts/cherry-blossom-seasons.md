On our virtual campus, when you walk close enough to another student, a video proximity call opens automatically. You see each other's cameras. You talk. It's the closest thing to bumping into someone in a hallway that remote learning has.

The cherry blossom overlay is a camera filter for those calls. When it's active, CSS-animated petals drift across your video feed — falling gently over your face, catching light behind your head, occasionally landing on your shoulder. It turns a utilitarian video rectangle into something that feels like sitting under a tree in spring.

## Why atmosphere matters in video calls

Video calls on a learning platform are functional by default. You see a face in a box. The box has no personality, no warmth, no sense of place. Every call looks the same whether it's Monday morning or Friday afternoon, January or June.

I built the cherry blossom filter because I think atmosphere is infrastructure — even in a video feed. When petals drift across your camera, the call feels different. It feels like you're *somewhere*, not just connected to someone. The overlay doesn't change the conversation, but it changes the feeling of the conversation. And feelings are what make students stay on a call an extra five minutes, ask one more question, feel one degree more comfortable.

Real places have seasons. Your video feed should too.

## 65 petals, 3 shapes, 7 colors

Each cherry blossom petal is a CSS element with its own personality. When the overlay initializes, it spawns 65 petals (configurable from 5 to 200) and randomizes seven properties per petal:

```css
.cherry-petal {
  --petal-size: 10px;
  --petal-color: #FFB7C5;
  --start-x: 340px;
  --drift-x: 80px;
  --fall-duration: 10s;
  --sway-duration: 3s;
  --sway-amount: 15px;
}
```

Three animations run simultaneously on each petal: `petalFall` (vertical descent with horizontal drift), `petalSway` (lateral wobble), and `petalSpin` (rotation). The sway animation uses an asymmetric keyframe curve — the petal drifts right at 20%, recenters at 50%, then dips left at 70% — which prevents the mechanical back-and-forth look that ruins most falling-leaf animations.

The shapes come in three variants: the classic cherry petal (teardrop with `border-radius: 50% 0 50% 0`), a round variant, and a pointed variant. Seven color variations range from pale `#FFE4E9` through coral `#FF91A4` to deep rose `#E8789A`.

## The wind

Getting the wind right was the part I obsessed over. In most particle effects, each element falls independently — random direction, random speed. It looks like static. Real wind has *coherence*. When a gust hits a tree, every petal moves in roughly the same direction.

All 65 petals share a `--drift-x` direction that's biased left-to-right, simulating a prevailing breeze. The magnitude varies per petal (some drift 40px, some drift 120px), but they all move the same way. This one constraint makes the entire effect feel like weather instead of noise.

Users can adjust the wind speed on their camera view from "Still" to "Gusty" using a settings panel. At Still, the drift is minimal and petals fall nearly straight down across your video feed. At Gusty, they streak sideways, and the sway amplitudes increase. The vocabulary matters — I didn't label the slider "wind speed (px/s)." I labeled it *Still* through *Gusty* because that's how people think about wind.

## Sparkle petals

Five percent of petals are sparkle variants. They're the same shape and color, but they shimmer with a golden glow:

```css
.cherry-petal-sparkle .cherry-petal-inner {
  box-shadow:
    0 0 6px rgba(255, 215, 0, 0.6),
    0 0 12px rgba(255, 215, 0, 0.3),
    0 0 2px rgba(255, 255, 255, 0.8);
  filter: brightness(1.3) saturate(1.2);
  animation: petalSparkleShimmer 1.2s ease-in-out infinite alternate;
}
```

The shimmer animation pulses the `box-shadow` radius and `brightness` on a 1.2-second cycle. At peak intensity, the glow radius nearly triples and the brightness jumps to 1.6x. It's subtle enough that you might not notice it immediately — and that's the point. Sparkle petals are a micro-discovery. The first time you spot one, you feel like you found something.

## Your camera, your petals

The overlay respects `prefers-reduced-motion`. If the OS says no animations, the petals don't render. Period.

Beyond that, every user gets full control over their own camera view: a 🌸 button in the corner opens a settings panel where you can toggle the filter on or off, adjust petal density (5–200), and dial the wind speed from Still to Gusty. Your settings only affect your camera feed — the person on the other end of the call sees their own settings. Preferences save to `localStorage`, so your camera aesthetic persists across sessions.

This matters because "atmospheric" shouldn't mean "mandatory." Some people find particle effects distracting. Some people are on slow machines. The feature should *default* to delightful and *allow* removal, not the other way around.

## From seasonal to permanent

The cherry blossom overlay originally ran only from April 1st through April 14th. Two weeks a year, date-gated, no early access. I believed seasonal scarcity was the whole point — if cherry blossoms were always there, they'd be wallpaper.

I was wrong. Or rather, I was right about scarcity, but I underestimated what would happen when students started using the petals as a **camera overlay for video calls.**

Somewhere in the first week of April, students discovered that the cherry blossom CSS overlay rendered on top of everything — including their video call windows. Petals drifted across their faces during standups. Sparkle petals caught the light behind their heads during pair programming. Within three days, students were asking if they could keep it after April 14th. "My camera looks so good with petals" became a recurring message in chat.

The demand was overwhelming and genuine. Students weren't asking for a feature — they were asking to keep something that made their daily calls feel more human. So I made it permanent. The cherry blossom overlay moved from a date-gated seasonal event to an always-available option, which eventually grew into the full [Atmosphere Panel](/blog/post.html?slug=atmosphere-vibes) with nine weather systems. The petals were the seed.

The best interactions with a digital space are the ones that make you feel like the space has a life of its own. And sometimes the best product decision is listening when people love something and giving them more of it.

## What I learned

Building the cherry blossom overlay taught me something I keep coming back to: **atmosphere is a feature, not a decoration.** No database. No API. No server calls. Just CSS and the belief that how a video call *feels* is worth engineering for.

It also taught me to listen. I was so sure that scarcity was the right call. But when students started using petals as their video call aesthetic and asked to keep them, the right move was to say yes — and then build eight more weather systems because the demand was clearly there. The cherry blossoms didn't just become a feature. They became the proof of concept for an entire atmosphere infrastructure.

The nicest compliment I got about this feature was from a student who messaged me on a Monday in April: "I logged in this morning and something felt different but I couldn't figure out what it was for like five minutes. Then I saw a petal land on my avatar's head."

That's the goal. Not "look at this cool animation I built." Just... something felt different. Something felt like spring.
