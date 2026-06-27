The first time I saw cherry blossoms fall, I was walking across a bridge in Portland. It was mid-April, and the trees along the waterfront had erupted into clouds of pale pink. Petals drifted across the path in front of me — not falling straight down, but *traveling*, caught in a breeze that pushed them all in the same direction. Some spun. Some wobbled. One landed in my coffee.

I remember thinking: *this is what a place feels like when it knows what season it is.*

## Why I built a feature that does nothing

The cherry blossom overlay on our virtual campus does not teach anyone anything. It doesn't track progress. It doesn't gamify reading or reward attendance. It appears on April 1st, runs for two weeks, and vanishes. Its entire purpose is to make you stop walking and look up.

I built it because I think atmosphere is infrastructure. When students log into a learning platform and everything looks the same every single day — same background, same lighting, same energy — the space feels frozen. It doesn't feel like a *place*. It feels like an application.

Real places change. The light shifts. The seasons turn. You walk in one morning and something's different and you can't quite name it, but it makes you feel like the world is paying attention.

So I gave our campus seasons. Starting with spring.

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

Users can adjust the wind speed from "Still" to "Gusty" using a settings panel. At Still, the drift is minimal and petals fall nearly straight down. At Gusty, they streak sideways, and the sway amplitudes increase. The vocabulary matters — I didn't label the slider "wind speed (px/s)." I labeled it *Still* through *Gusty* because that's how people think about wind.

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

## Accessibility and the off switch

The overlay respects `prefers-reduced-motion`. If the OS says no animations, the petals don't render. Period.

Beyond that, every user gets controls: a 🌸 button in the corner opens a settings panel where you can adjust petal density (5–200), wind speed (Still–Gusty), or turn the whole thing off. Preferences save to `localStorage`, so your settings persist across sessions.

This matters because "atmospheric" shouldn't mean "mandatory." Some people find particle effects distracting. Some people are on slow machines. The feature should *default* to delightful and *allow* removal, not the other way around.

## April 1 through April 14

The cherry blossom overlay is date-gated. It appears on April 1st and disappears on April 14th. No toggle. No early access. No "turn on cherry blossoms in July."

I thought about making it permanent or user-triggerable, but seasonal scarcity is the whole point. If cherry blossoms are always there, they're wallpaper. If they appear for two weeks a year, they're an *event*. Students notice. They mention it in chat. "The blossoms are back!" becomes a thing people say.

The best interactions with a digital space are the ones that make you feel like the space has a life of its own. A campus that changes with the seasons says: *this isn't a tool you use. This is a place you inhabit.*

## What I learned

Building the cherry blossom overlay taught me something I keep coming back to: **the features people love most are often the ones that do the least.** No database. No API. No server calls. Just CSS, a date check, and the belief that beauty is worth engineering for.

The nicest compliment I got about this feature was from a student who messaged me on a Monday in April: "I logged in this morning and something felt different but I couldn't figure out what it was for like five minutes. Then I saw a petal land on my avatar's head."

That's the goal. Not "look at this cool animation I built." Just... something felt different. Something felt like spring.
