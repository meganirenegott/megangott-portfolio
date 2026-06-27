Baba Yaga's Hut is a narrative encounter on the Multiverse campus. Students walk up to a chicken-legged hut, enter, and meet a witch who challenges them with research questions. Answer well, and she grants you a magical pet companion. Answer poorly, and you get a punishment (your avatar turns into a goose for 24 hours).

It's one HTML file. 1,200 lines. One `<canvas>` element. 19 custom pixel art sprites. No framework, no build step, no dependencies.

## Why one canvas?

The hut interior has multiple interactive zones: a cauldron, a potion shelf, a crystal ball, an herb rack, candle sconces, and Baba Yaga herself. Each zone responds to hover and click events.

The naive approach would be to use DOM elements — a `<div>` for each zone with CSS positioning and `onclick` handlers. But that creates a disconnect between the visual layer (canvas-rendered pixel art) and the interaction layer (DOM rectangles). They drift apart when the window resizes. Z-ordering becomes a nightmare.

Instead, I defined zones as rectangles in canvas coordinate space:

```javascript
const ZONES = {
    cauldron: { x: 350, y: 200, w: 100, h: 100 },
    potions:  { x: 100, y: 150, w: 150, h: 80 },
    crystal:  { x: 600, y: 180, w: 60, h: 60 },
    herbs:    { x: 500, y: 120, w: 130, h: 70 },
};
```

Mouse events hit-test against these zones in canvas space. The same coordinate system drives both rendering and interaction. No drift, no sync bugs.

## The dialogue tree

The encounter is a branching dialogue. Baba Yaga asks questions, the student picks responses or submits free-text answers, and the system evaluates whether the answer demonstrates understanding.

The dialogue is modeled as a state machine with nodes:

- **greeting** → Baba Yaga introduces herself
- **challenge** → She poses a research question
- **evaluation** → Free-text response is scored
- **reward** → Pet selection if you pass
- **punishment** → Avatar transformation if you fail

Each transition has side effects — switching which sprite is rendered (angry Baba Yaga vs. celebratory Baba Yaga), triggering particle effects, updating the HUD.

## The pet companion system

If you pass the challenge, you pick from 8 pets: fox, black cat, owl, toad, bat, wolf, dragon, or hedgehog. Each has a Tamagotchi-style needs system — happiness, hunger, energy — that ticks down over time.

The pet follows you around campus after the encounter. It's rendered using the same sprite system: `drawImage` centered at the pet's position, with a bobbing animation offset.

## What I'd refactor

If I were building this again, I'd extract the zone system into a reusable `CanvasUI` class. The pattern — "define rectangles in canvas space, hit-test on mouse events, render visual feedback on hover" — is general enough to power any canvas-based interactive scene. Right now it's all inline in one file, which works but doesn't scale.

The dialogue tree would also benefit from being data-driven — a JSON file that defines nodes, transitions, and conditions — rather than a nested `if/else` chain. That would let a game designer author new encounters without touching the rendering code.
