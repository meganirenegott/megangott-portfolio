Our campus already had an ocean with fishing, bioluminescence, and tide pools. But the ocean is an outdoor experience — you stand on the shore and cast a line. I wanted something more intimate. A place where you go *inside* the water. Where the fish aren't abstractions on a reel but living things swimming around you.

So I built an aquarium. And then I let students swim in it.

## The building

The Campus Aquarium is a dome-shaped building with an ocean-blue exterior, placed on the campus map like any other building. Walk up, press E, step inside. The transition takes you from the pixel-art overworld into a full-screen interior rendered on a dedicated canvas.

Inside: eight tanks. Four freshwater (river, lake, koi pond, tropical) and four saltwater (coral reef, deep sea, tropical, jellyfish). Each tank has its own lighting, color palette, and fauna. The freshwater koi pond has warm amber light and slow-moving fish. The deep sea tank is dark teal with sparse bioluminescent creatures. The jellyfish tank pulses with ethereal blue-white.

![The Campus Aquarium — a beautiful ocean-blue dome with glass panels revealing fish silhouettes inside, wave patterns on the roof, a "Welcome" entrance with coral planters and a starfish decoration. A student approaches on a cobblestone path, campus buildings visible in the background.](images/aquarium-dome-exterior.png)

![Eight aquarium tanks in a dark gallery — River, Lake, Koi Pond, and Tropical Freshwater on top; Coral Reef, Deep Sea, Tropical Saltwater, and Jellyfish below. Each tank has its own distinct color palette and fauna. Caustic light patterns dance across the ceiling. Students walk the observation floor between the glowing tanks.](images/aquarium-eight-tanks.png)

## Swimming

The feature that changed everything: you can enter the tanks.

Press E near a tank and your avatar transitions from standing on the observation floor to *swimming inside the water*. WASD controls switch from walking to swimming — slightly floatier, with momentum decay that feels like moving through a fluid. Your avatar's animation changes. Bubble particles trail behind you.

The fish react to you. Schools of small fish scatter when you swim through them, then regroup behind you. Larger fish maintain their paths but angle slightly away. The jellyfish are indifferent — they drift on their own currents regardless of your presence.

![Swimming inside the coral reef tank — a student swims with bubble particles trailing behind, a school of tropical fish scatters in a starburst pattern, a large angelfish angles away, and a clownfish companion pet follows with its own drift pattern. Vibrant coral formations line the floor with caustic light shimmer. Through the glass, other students watch from the observation floor.](images/aquarium-swimming-inside.png)

## Aquatic pets

When you enter a tank, you can select a companion from 11 aquatic pet options — species that match the tank's ecosystem. Pick a clownfish in the coral reef tank, a koi in the koi pond, a jellyfish in the jellyfish tank.

Your aquatic pet follows you through the water. It matches your general direction but with its own movement personality — slight drift, occasional independent loops, species-appropriate swimming patterns. When you leave the tank (step back onto the observation floor), your pet stays behind. It keeps swimming in the tank, visible through the glass.

If you walk away to look at another tank, the camera optionally follows your pet. You can watch your clownfish navigate the coral from outside, as if watching a real aquarium where you left a piece of yourself inside.

## Velocity-based fish AI

The fish AI uses a velocity-based system rather than waypoint following. Each fish has a velocity vector that's influenced by multiple forces:

- **Schooling**: Fish of the same species apply alignment, cohesion, and separation forces — the classic boids algorithm. Groups form naturally and move as a unit.
- **Obstacle avoidance**: Fish detect tank walls, coral formations, and decorations, applying repulsion forces when they get too close.
- **Current**: A gentle background force that simulates water current. Direction varies by tank — the river tank has a strong unidirectional current; the deep sea tank has near-zero current.
- **Player avoidance**: When the player swims near small fish, a radial repulsion force scatters them. The force decays with distance, so fish 50 pixels away barely react while fish 10 pixels away dart dramatically.

The velocity system produces movement that looks organic. Fish don't path along invisible rails — they flow, adjust, accelerate, decelerate, and navigate collectively. A school of fish splitting around a coral head and reconverging on the other side isn't scripted. It's emergent from three simple forces applied to each fish independently.

## Caustic lighting

The most technically satisfying visual detail: caustic lighting. In real aquariums, the water surface acts as a lens, focusing and defocusing light to create those shimmering, dancing bright-patches on the tank floor and walls. It's one of the most recognizable visual signatures of being underwater.

I simulated this with an animated overlay of light patterns — overlapping sine waves at different scales and speeds, creating a network of bright spots that drift and pulse. The caustics are rendered as a semi-transparent layer over the tank background, and they interact with the fish (fish cast subtle shadows that interrupt the caustic pattern).

The effect is most dramatic in the shallow freshwater tanks where the "sunlight" is strong. In the deep sea tank, caustics are barely visible — just a faint shimmer far above. This matches reality: caustic patterns are a surface phenomenon and fade with depth.

## Pet happiness

Each aquatic pet has a happiness system driven by player interaction:

- **Proximity**: Being near your pet increases happiness gradually.
- **Interaction emojis**: Click near your pet to send it a heart, a wave, or a treat. Each emoji triggers a pet animation (a happy wiggle, a surface breach, a spin) and bumps happiness.
- **Neglect**: Leaving your pet alone in the tank for too long decreases happiness slowly. When you return, there's a happiness boost — the reunion effect.

The happiness level affects the pet's behavior. A happy pet swims closer to the glass when you're watching from outside. A very happy pet does occasional tricks unprompted — a flip, a bubble ring, a chase of its own tail. The happiness system creates a quiet emotional loop: visit your pet, watch it react, feel responsible for it, want to come back.

![A student watches their pet koi through the glass — the koi swims close with a happiness meter showing four out of five hearts. Interaction options float nearby: heart (happy wiggle), wave (surface breach), treat (spin). A UI panel reads "Your Koi — Happiness: ★★★★☆ — Last visited: 2 hours ago" with a reunion boost indicator.](images/aquarium-pet-happiness.png)

## Why an aquarium

The Campus Aquarium is part of the broader thesis that runs through all of these features: **a learning environment should have places that exist for their own sake.**

The aquarium doesn't help you debug code. It doesn't track progress. It doesn't appear in any curriculum. It's a building you can walk into, where you can swim with fish, where the light dances on the walls, where a clownfish follows you through coral and waits for you when you leave.

Some students visit the aquarium between coding sessions as a reset. Some visit at night because the deep sea tank is calming in the dark. Some visit because they named their koi and they want to check on it.

All of these are valid uses of a learning platform. The aquarium exists because sometimes the most valuable thing a campus can offer is a place where nothing is expected of you except to be present with something beautiful.
