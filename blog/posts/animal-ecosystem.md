We already had capybaras, crows, and sanctuary pets. But each species was hand-coded — custom behavior files, custom sprites, custom spawning rules. Adding a new animal meant writing a new behavior module from scratch. I wanted a system where animals could be *composed* from reusable traits, and where new species could appear on campus without anyone writing code.

## The trait system

Inspired by Rain World's emergent creature ecosystems, the animal behavior system uses six trait categories:

**Social traits**: solitary, pair-bonding, herding, territorial, symbiotic, communal
**Feeding traits**: grazer, predator, scavenger, filter-feeder, photosynthetic, parasitic
**Movement traits**: walker, flyer, swimmer, burrower, climber, glider
**Rhythm traits**: diurnal, nocturnal, crepuscular, cathemeral
**Environmental traits**: aquatic, arboreal, subterranean, aerial, amphibious
**Temperament traits**: docile, skittish, curious, aggressive, playful, aloof

Each trait is a self-contained behavior module with an `update()` tick, state transitions, and visual effect hooks. An animal's full behavior is the composition of its assigned traits. A capybara is: `herding + grazer + swimmer + diurnal + aquatic + docile`. A crow is: `pair-bonding + scavenger + flyer + diurnal + arboreal + aloof`.

The same composition system means you can describe a never-before-seen creature — `communal + photosynthetic + glider + nocturnal + aerial + curious` — and the behavior engine produces coherent movement, feeding patterns, and social dynamics without a single line of species-specific code.

## The species registry

Every species is defined in JSON:

```json
{
  "name": "Moonjelly Moth",
  "category": "fantastical",
  "rarity": "uncommon",
  "traits": ["communal", "photosynthetic", "glider", "nocturnal", "aerial", "curious"],
  "habitat": { "terrain": ["park", "water-edge"], "proximity": "trees" },
  "social": { "groupSize": [3, 8], "territorySize": 120 },
  "appearance": { "spriteSheet": "moonjelly-moth", "variants": 3 }
}
```

Adding a new species is adding a JSON file. No behavior code changes. The trait composition engine reads the trait list and produces the complete behavioral repertoire.

## Procedural species generation

The most ambitious part: a weekly job that uses an LLM to design new species. The generator produces a species profile (name, lore, traits, habitat, appearance description), categorizes it as real, fantastical, mythical, or "unknown oddity," and generates sprite sheets via PixelLab from the appearance description.

New species appear on campus with "new discovery" fanfare — a small announcement, a new entry in the bestiary. Students notice new creatures appearing over time, each with behaviors they've never seen before but that emerge naturally from the trait composition.

The campus ecosystem isn't static. It evolves. Every week, there's something new to observe. And because the behaviors are compositional rather than scripted, the new creatures feel genuinely surprising — combinations of traits that produce emergent patterns nobody explicitly designed.

## Why ecosystems matter

A campus with one species of animal feels like a game with a pet feature. A campus with a living, growing ecosystem of dozens of species — each with distinct behaviors, habitats, and social dynamics — feels like a *world*.

The animal ecosystem is the ultimate expression of the design principle I keep returning to: **richness creates believability.** The more layers of living behavior the campus has, the less it feels like software and the more it feels like a place. A place where new things appear. Where creatures interact. Where the world is richer tomorrow than it was today.
