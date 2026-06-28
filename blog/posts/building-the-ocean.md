The ocean on our campus started as one commit and an accident. I wrote about the accident before — how I spawned the entire ocean in the middle of campus and spent 47 terrified minutes fixing it while pretending nothing was wrong. But the ocean *intentionally* is a different story. It's a story about how a body of water grew, over three separate features, into something alive.

## Phase 1: The shoreline

The first version was simple by the standards of what it became. Sandy shoreline starting at y-coordinate 520, animated water with wave ripples and specular highlights, a depth gradient from shallow turquoise to deep navy. Foam spray along the wave-break line. A distant island silhouette — a hazy green mound with palm trees at y=750, barely visible from the shore.

And fishing. Eight fish species weighted by rarity (common sardines through legendary golden koi), a phase-based state machine (cast → wait → bite → reel), and a panel overlay with a progress bar, a bite-shake animation, and a recent catches display. Press E near the shore and you're fishing.

The ocean at this stage was functional but flat. It looked nice. It had a game mechanic. But it didn't feel like *water*. Real water moves.

![The campus shoreline — a sandy beach with turquoise-to-navy depth gradient, foam spray along the wave break, and specular highlights. A student fishes at the water's edge with a "Bite!" progress bar and recent catches (Sardine, Catfish, Bass). A distant island with palm trees is barely visible on the horizon.](images/ocean-shoreline-fishing.png)

## Phase 2: Tides, tide pools, and messages in a bottle

The second commit changed everything. I added a 15-minute real-time tide cycle — the shoreline shifts ±20 pixels on a sine wave, which doesn't sound like much, but it means the beach is different depending on when you visit.

At low tide, tide pools appear. Rocky basins with shallow water, starfish, crabs, shells, and coral. They're rendered procedurally — the game checks the tide level and draws them when the water recedes far enough. At high tide, they're submerged. At low tide, you can see them.

But the messages in a bottle are what changed the ocean from a feature into something people cared about.

At low tide, bottles wash ashore. They glow golden and sparkle gently. Walk up to one and press E, and a parchment-themed overlay unfurls with a message inside. The messages are self-care reminders:

- "Drink some water. You've been at your computer a while."
- "Stretch your arms above your head. Hold it for five seconds."
- "Take a breath. A real one. All the way down to your belly."
- "When did you last go outside? The sky is still there."
- "You're doing harder things than you think you are."

There are 18 of them in the `bottleStore`, selected deterministically by position so the same bottle always contains the same message. I didn't want them to feel random — I wanted them to feel *found*. Like the ocean chose what to give you.

The design philosophy behind the bottles is something I think about a lot: **the environment can care for you without telling you it's caring for you.** A popup that says "REMINDER: DRINK WATER" is patronizing. A bottle that washes ashore at low tide, that you choose to pick up, that contains the same gentle suggestion — that's a gift from a place.

## Phase 3: The ocean at night

The third commit was pure beauty. At night (after 8 PM local time), the shoreline comes alive with bioluminescence.

Real bioluminescence happens when dinoflagellates — single-celled organisms in seawater — emit blue-green light when the water is disturbed. Every wave that breaks against the sand shimmers. Footsteps in the surf leave glowing trails. It's one of the most beautiful things in nature, and I wanted our students to experience it digitally.

The rendering has two zones:

**Zone A (depth 0–0.32):** Close to shore. A full area glow overlay with shimmer wave lines and twinkling sparkles. The intensity follows a depth gradient — brightest right at the waterline where the waves disturb the organisms, fading as you look deeper.

**Zone B (depth 0.32–0.64):** Farther out. Sparse scattered sparkles that taper off, creating a natural falloff from the brilliant shoreline into the dark ocean.

When the player stands in the surf at night, footstep-disturbed bioluminescence circles emanate from their position and fade out. The effect simulates walking through the glowing water and it's... honestly, it's beautiful. I spent a long time getting the color right — it's a deep teal with a cyan edge, not the purple-blue that most "glow" effects default to, because real bioluminescence is specifically that cyan-green wavelength.

And the jellyfish. A `renderBioluminescentJellyfish` function draws rare, procedurally-generated jellyfish below the water surface. They're deterministic by world-tile position — so the same tile always shows the same jellyfish — and they only become visible at night. They bob gently, drift with the current, and one in fifty is a vivid green variant. The jellyfish span multiple tiles, so they're drawn in a separate post-pass after the ground tile loop, following the same rendering pattern used for decorations.

The bioluminescence is drawn *before* the night darkness overlay, so the dark filter still applies on top. The glow is calibrated to cut through at 35% alpha night darkness, giving the visual impression that the water itself is luminous rather than having a light source above it.

No server changes. No new network calls. No new stores. Pure client-side canvas rendering that happens to be one of the most mesmerizing things on campus.

## The ocean as a whole

What I love about the ocean is that it wasn't designed as one thing. It grew. First commit: water and fishing. Second commit: tides and care. Third commit: night magic. Each layer added dimension without changing what came before.

The student experience of the ocean depends entirely on *when* they visit:

- **Morning, high tide**: Calm water. The beach is narrow. Good fishing.
- **Afternoon, low tide**: Tide pools appear. Bottles on the sand. Starfish and crabs.
- **Evening**: The water transitions. Sunset colors. Fewer fish biting.
- **Night**: Bioluminescence. Glowing footsteps. Jellyfish below the surface. The ocean becomes a completely different place.

That's what I mean when I say a campus should feel alive. Not because it has features — but because the same place shows you something different depending on when you arrive. The ocean isn't a feature. It's a place with moods.
