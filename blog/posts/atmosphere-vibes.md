I built nine weather systems for a virtual campus. Snowflakes. Autumn leaves. Rain. Fireflies. Confetti. Shooting stars. Bubbles. Matrix code rain. And cherry blossoms. Each one has its own settings panel with density and speed sliders, and each uses its own vocabulary to describe what the slider values mean.

Rain doesn't have a "speed" slider. Rain has a slider that goes from "Drizzle" to "Downpour."

Matrix code rain goes from "Slow Hack" to "Overdrive."

This is a post about vibes-as-infrastructure — why controlling the atmosphere of a digital space matters, and why the words you use to label a slider are as important as the code behind it.

## The Atmosphere Panel

The system lives behind a ✨ button in the bottom-left corner of the screen. Click it and a glassmorphism popover opens, listing all nine particle effects. Each one has:

- **A personal on/off toggle** — persisted in `localStorage`, so your atmosphere preferences survive between sessions.
- **Density and speed sliders** — only visible when the effect is active. Density controls how many particles are on screen. Speed controls how fast they move.
- **An admin badge** — when an admin has force-broadcast an effect, it shows "admin" to indicate it wasn't your choice.

The architecture is extensible by design. Adding a new weather system requires exactly one thing: add an entry to the `ATMOSPHERE_FILTERS` array and implement a `renderFilter()` case. Zero other files change. The panel auto-discovers new filters and renders their controls.

## The nine effects

Each effect is its own CSS or canvas overlay. The details matter because particle effects live or die on the details.

**❄️ Snowflakes** — Radial-gradient circles in white and pale blue. 8% of snowflakes are the "fluffy large" variant — twice the size, slower fall speed, slight wobble. Without the fluffy variant, snowfall looks uniform and dead. With it, your eye catches the occasional big flake drifting lazily, and the whole thing feels like weather.

**🍂 Autumn Leaves** — Three leaf shapes (maple, oak, simple), seven fall color variants (amber, rust, burgundy, gold, brown, olive, crimson). Each leaf has a heavy tumbling spin animation — not the gentle sway of cherry blossoms, but a chaotic end-over-end tumble. Leaves fall faster, spin harder, and feel *heavier*. The personality of the particle communicates the season.

**🌧️ Rain** — Diagonal streaks at 15° angle. 10% of drops are "heavy" — wider, slightly brighter, leaving a brief splash at the bottom of the viewport. The diagonal is important — rain that falls perfectly vertical looks like a screensaver. Rain that falls at 15° looks like it's being pushed by wind, which reads as weather instead of decoration.

**✨ Fireflies** — Warm yellow-green glow with independent per-firefly blink timing. Each firefly has its own blink cycle (2–5 seconds) with a sine-wave intensity curve. The key is that they don't blink in sync. Synchronized blinking looks artificial. Desynchronized blinking looks like a meadow at dusk.

**🎉 Confetti** — Eight vivid colors. 20% of particles are the "ribbon" variant — elongated, twisting strips instead of flat squares. The ribbons add a 3D sway effect that makes the confetti feel like it's falling through real space rather than sliding down a flat plane.

**🌟 Shooting Stars** — Trailing gradient streaks that arc across the viewport at random intervals. 5% are the "rainbow comet" variant — a multi-hue trail instead of the standard white. Shooting stars are rare by design — low default density, because the magic of a shooting star is that you almost missed it.

**🫧 Bubbles** — Iridescent circles with a `hue-rotate` shell animation. They float upward (the only effect that moves *up*), wobble on a sine wave, and "pop" at the top of the viewport with a brief scale-down animation. The iridescence is key — a static-colored bubble looks like a dot. A hue-shifting bubble catches light and reads as glass.

**💚 Matrix Rain** — Neon green character columns falling at varying speeds. 12% of characters are the "bright leader" variant — the leading character in each column is brighter and larger, creating the signature cascading effect from the films. The column density is randomized so they don't form a uniform grid. Speed vocabulary: "Slow Hack" → "Normal" → "Overdrive."

**🌸 Cherry Blossoms** — The original. Refactored from its own standalone component into the Atmosphere Panel system. All the same physics — coherent wind, sparkle variants, three petal shapes — but now controllable from the same interface as everything else.

## Why vocabulary matters

The slider labels are the detail I'm proudest of, and they took almost no code. Each `FilterDef` in the atmosphere system has `densityLabels` and `speedLabels` fields — arrays of human-readable names that map to the slider range:

Rain density: "Light Mist" → "Drizzle" → "Shower" → "Downpour"
Firefly density: "A Few" → "Some" → "Swarm" → "Galaxy"
Matrix speed: "Slow Hack" → "Normal" → "Fast" → "Overdrive"
Confetti speed: "Gentle" → "Party" → "Celebration" → "Chaos"

This matters because the vocabulary *is* the experience. A slider labeled "particle_count: 50-200" and a slider labeled "A Few → Galaxy" communicate the same range but offer completely different invitations. The first says "this is a technical parameter." The second says "how many fireflies would make you happy?"

Users interact with the vocabulary, not the implementation. The words on the label determine whether someone explores the slider or ignores it. Every effect got its own vocabulary because rain isn't snow isn't fireflies, and the language of each should match its personality.

## Admin weather broadcasts

Admins can broadcast any atmosphere effect to all connected clients simultaneously. One button in the admin menu: "Broadcast: Rain" — and every student on campus sees rain start falling at the same time.

This creates *shared emotional moments*. An admin broadcasts confetti during a graduation ceremony. Snowflakes on the first day of winter break. Shooting stars during a late-night hackathon. The weather isn't decorative — it's *communicative*. It says "something is happening right now, and we're all experiencing it together."

Broadcast effects override personal settings and show an "admin" badge in the panel so students know it wasn't their choice. When the admin turns it off, everyone's personal settings restore. The override is respectful — it communicates "this is temporary and intentional" rather than silently changing your environment.

## Mood is a feature

The Atmosphere Panel taught me that **environmental control is a form of agency.** When students can choose their own weather — rain while they study, fireflies while they code, matrix rain while they debug — they're not just decorating. They're *setting a mood*. And mood affects focus, creativity, and how long someone stays in a space.

Giving users control over atmosphere is giving them ownership. A campus where you can make it rain is *your* campus, not just *a* campus. And that sense of ownership — "I chose this, I like this, this is my environment" — is one of the most undervalued tools in education technology.

The nine effects took about two days to build. The vocabulary labels took about an hour. The hour spent on vocabulary was the most impactful hour of the entire project.
