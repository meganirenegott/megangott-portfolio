The question nobody asks when you build a virtual campus is: what happens to a pet when its owner stops logging in?

On our platform, students adopt pets — pixel art companions that follow them around campus. Cats, foxes, capybaras, crows, rabbits. The pets have names and personalities and the students get genuinely attached to them.

But students graduate. Or they take breaks. Or life gets complicated and they disappear for three months. And their pet is still in the database, following a ghost. Hungry. Alone. Waiting for someone who isn't coming back.

I couldn't just delete them.

## The Sanctuary system

After 90 days of owner inactivity, a pet transitions from "owned pet" to "Sanctuary Animal." It doesn't vanish. It doesn't get reassigned. Instead, it becomes a *campus wanderer* — a free-roaming creature with its own routines, its own preferred spots, and its own life.

Sanctuary animals belong to everyone. Any authenticated student can walk up and feed them, play with them, or just watch them wander. Every interaction earns communal XP that levels the pet up collectively. The pet still remembers its original owner — there's a `sanctuary_since` timestamp and the original `player_id` is preserved — but it no longer depends on one person.

The database changes were straightforward:

```sql
ALTER TABLE campus_pets
  ADD COLUMN is_sanctuary      BOOLEAN DEFAULT FALSE,
  ADD COLUMN sanctuary_xp      INTEGER DEFAULT 0,
  ADD COLUMN sanctuary_level   INTEGER DEFAULT 1,
  ADD COLUMN preferred_biome   TEXT,
  ADD COLUMN sanctuary_since   TIMESTAMPTZ,
  ADD COLUMN total_interactions INTEGER DEFAULT 0;
```

A cron job runs daily, checking for pets whose owners haven't logged in for 90+ days. When a pet transitions, `is_sanctuary` flips to `true`, `sanctuary_since` records the moment, and the pet's `preferred_biome` is set based on its species — capybaras gravitate toward water, crows toward high ground, cats toward warm indoor spaces.

## Cinder and Marshmallow

On day one, I seeded two founding sanctuary pets:

**Cinder** 🐦‍⬛ — a crow. The lore says Cinder arrived with the first cohort of students and never left. Home base: the Rock Garden at world coordinates (215, 250). Cinder prefers elevated terrain, perches on buildings, and has a wider wander radius than most pets. Starting level: 2, with 250 XP to feel like a creature with history.

**Marshmallow** 🦫 — a capybara. Marshmallow wandered in from the Capybara Spa and just... stayed. Home base: the spa at world coordinates (345, 348). Marshmallow moves slowly, gravitates toward water, and has a tight wander radius — capybaras are homebodies.

Neither Cinder nor Marshmallow ever had a "real" owner. They're founding myths. Every campus needs a few creatures that were there before anyone else, that feel like they belong to the land itself rather than to a person.

## Free will

The trickiest part of sanctuary pets isn't the database — it's the behavior. An owned pet follows its owner. Simple state: go where they go. A sanctuary pet has to *decide* where to go on its own.

Each sanctuary pet runs an independent behavior loop with personality-weighted decisions:

- **Wander**: Move toward a random point within a radius of the preferred biome center. Speed and radius vary by species.
- **Rest**: Stop moving. Play an idle animation. Duration varies by time of day (pets rest more at night).
- **Socialize**: If another sanctuary pet is nearby, drift toward it. If a student is nearby and recently interacted, drift toward them too.
- **Return home**: If the pet has wandered too far from its preferred biome, gradually path back.

The weighting between these states changes throughout the day. In the morning, pets wander more. In the afternoon, they're more likely to socialize. At night, they rest. It's a simple circadian overlay, but it makes the pets feel like they have rhythms — like creatures instead of screensavers.

## The ethics of it

I thought a lot about why this feature mattered beyond game design. Virtual pets occupy a weird ethical space. They're not real, obviously. Nobody's starving. But the attachment students form is real, and the feeling of abandonment when something you cared for just *stops existing* is real too.

By transitioning abandoned pets into sanctuary animals instead of deleting them, I was making a statement about how our platform treats things that people invested in: **nothing just disappears.** Your pet might not be yours anymore, but it's still here. It's still fed. Other students take care of it. And if you come back after six months, you'll see it wandering the quad, a little bigger than you remember, with a community that adopted it in your absence.

There's something in that metaphor about learning communities too. Students come and go. But the things they built, the connections they made, the weird little pets they named — those persist. The campus remembers.

## What it looks like

Sanctuary pets are visually identical to owned pets — same sprites, same animations. The difference is in how they move: they wander independently instead of tailing a player, and they respond to *any* student's interactions, not just one.

When you click near a sanctuary pet, it turns toward you. If you feed it (press F), it plays a happy bounce and a toast notification appears: "🐾 Marshmallow is happy! (+15 XP)". The XP contributes to the pet's communal level, and the interaction count increments.

On the campus roster panel, sanctuary pets appear in their own section: "🏝️ On Campus Now" with each pet's name, emoji, mood, and level. It's a small touch, but it makes them feel like characters with social presence — not just database rows with `is_sanctuary = true`.

## The founding myth matters

The most rewarding part of building this feature was watching students interact with Cinder and Marshmallow — creatures that never had owners, that existed from day one, that belong to the campus itself.

Students gave them stories. "Cinder's been here since the beginning." "Marshmallow basically runs the spa." These aren't lore I wrote. These are things students told each other, building mythology around two rows in a database table.

That's the thing about building virtual spaces: you don't get to decide what matters. You can only create the conditions for meaning to emerge. A capybara named Marshmallow. A crow named Cinder. A community that feeds them both, every day, because someone decided that virtual pets shouldn't just disappear.
