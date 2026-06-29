The question nobody asks when you build a virtual campus is: what happens to a pet when its owner stops logging in?

## Where this started

I grew up with knockoff Tamagotchis. We didn't have animals at home, so these little digital creatures were my first pets. My siblings and I got *deeply* attached to them. We named them, we checked on them constantly, and when one of them "died" because we couldn't feed it during the school day, the resulting sob fest was... a lot.

My mom's solution was quietly brilliant and a little absurd: she started feeding our digital pets while we were at school. She'd carry these tiny plastic keychains around the house, pressing buttons between laundry loads, making sure nobody's pet starved while we sat through math class. Was it inconvenient? Yes. Was it ridiculous? Absolutely. But it was one of the ways she showed us she loved us, and I never forgot that.

Years later, I started going to cat cafes. The thing I love about them is the concept of resident cats. These are ambassador cats who aren't up for adoption. They live at the cafe, they're well cared for by staff, and the regulars bond with them over time. You can have a cat friend who you visit every week, who recognizes you, who hops into your lap when you sit in your usual spot. That cat is loved and looked after, but it isn't "yours." And somehow that makes the relationship more generous, not less.

Both of those experiences shaped how I thought about what should happen when a student graduates or takes a break and their virtual pet is left behind.

## The problem

On our platform, students adopt pets. Pixel art companions that follow them around campus: cats, foxes, capybaras, crows, rabbits. The pets have names and personalities, and the students get genuinely attached to them.

But students graduate. They take breaks. Life gets complicated and they disappear for three months. Their pet is still in the database, following a ghost. Waiting for someone who isn't coming back.

I couldn't just delete them. That felt wrong the same way it felt wrong when my Tamagotchi died at school and there was nothing I could do about it.

![The Pet Sanctuary — a peaceful meadow with a wooden arch entrance. A fox naps under a tree while a student kneels to feed it. A black cat perches on a fence post, a capybara grazes near a pond, rabbits hop through wildflowers, and a crow watches from a lamp post. Each animal has a golden sanctuary paw-print badge floating nearby. Hay bales, small shelters, food bowls, and a bird bath dot the area.](images/sanctuary-pets-zone.png)

## The Sanctuary system

After 90 days of owner inactivity, a pet transitions from "owned pet" to "Sanctuary Animal." It doesn't vanish. It doesn't get reassigned. Instead, it becomes a campus wanderer with its own routines, its own preferred spots, and its own life. Like a resident cat at a cafe, it belongs to the community now.

Sanctuary animals belong to everyone. Any authenticated student can walk up and feed them, play with them, or just watch them wander. Every interaction earns communal XP that levels the pet up collectively. The pet still remembers its original owner (there's a `sanctuary_since` timestamp and the original `player_id` is preserved), but it no longer depends on one person.

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

A cron job runs daily, checking for pets whose owners haven't logged in for 90+ days. When a pet transitions, `is_sanctuary` flips to `true`, `sanctuary_since` records the moment, and the pet's `preferred_biome` is set based on its species. Capybaras gravitate toward water, crows toward high ground, cats toward warm indoor spaces.

## Cinder and Marshmallow

On day one, I seeded two founding sanctuary pets:

**Cinder** 🐦‍⬛ is a crow. The lore says Cinder arrived with the first cohort of students and never left. Home base: the Rock Garden at world coordinates (215, 250). Cinder prefers elevated terrain, perches on buildings, and has a wider wander radius than most pets. Starting level: 2, with 250 XP to feel like a creature with history.

**Marshmallow** 🦫 is a capybara. Marshmallow wandered in from the Capybara Spa and just... stayed. Home base: the spa at world coordinates (345, 348). Marshmallow moves slowly, gravitates toward water, and has a tight wander radius. Capybaras are homebodies.

Neither Cinder nor Marshmallow ever had a "real" owner. They're founding myths. Every campus needs a few creatures that were there before anyone else, that feel like they belong to the land itself rather than to a person.

## Free will

The trickiest part of sanctuary pets isn't the database. It's the behavior. An owned pet follows its owner. Simple state: go where they go. A sanctuary pet has to *decide* where to go on its own.

Each sanctuary pet runs an independent behavior loop with personality-weighted decisions:

- **Wander**: Move toward a random point within a radius of the preferred biome center. Speed and radius vary by species.
- **Rest**: Stop moving. Play an idle animation. Duration varies by time of day (pets rest more at night).
- **Socialize**: If another sanctuary pet is nearby, drift toward it. If a student is nearby and recently interacted, drift toward them too.
- **Return home**: If the pet has wandered too far from its preferred biome, gradually path back.

The weighting between these states changes throughout the day. In the morning, pets wander more. In the afternoon, they're more likely to socialize. At night, they rest. It's a simple circadian overlay, but it makes the pets feel like they have rhythms. Like creatures instead of screensavers.

## Coming back

Here's the part I care about most: if a student takes a break and comes back six months later, their pet is still here. It's a little bigger than they remember. Its level is higher because the community kept feeding it. It has a `total_interactions` count that proves other people cared about it while they were gone.

The pet remembers its original owner. When that person logs back in, a toast notification appears: "🐾 [Pet name] recognizes you!" The pet will drift toward them, and the student can reclaim ownership if they want, or leave it as a sanctuary animal. Either way, the reunion happens. Nothing was lost.

It's the thing my mom understood about those knockoff Tamagotchis: someone should be taking care of this while you can't. And it's the thing cat cafes understand about animals: a creature can be loved by a community without belonging to any one person, and that's a perfectly good kind of love.

## What it looks like

Sanctuary pets are visually identical to owned pets. Same sprites, same animations. The difference is in how they move: they wander independently instead of tailing a player, and they respond to *any* student's interactions, not just one.

When you click near a sanctuary pet, it turns toward you. If you feed it (press F), it plays a happy bounce and a toast notification appears: "🐾 Marshmallow is happy! (+15 XP)". The XP contributes to the pet's communal level, and the interaction count increments.

On the campus roster panel, sanctuary pets appear in their own section: "🏝️ On Campus Now" with each pet's name, emoji, mood, and level. It's a small touch, but it makes them feel like characters with social presence, not just database rows with `is_sanctuary = true`.

## The founding myth matters

The most rewarding part of building this feature was watching students interact with Cinder and Marshmallow. Creatures that never had owners, that existed from day one, that belong to the campus itself.

Students gave them stories. "Cinder's been here since the beginning." "Marshmallow basically runs the spa." These aren't lore I wrote. These are things students told each other, building mythology around two rows in a database table.

That's the thing about building virtual spaces: you don't get to decide what matters. You can only create the conditions for meaning to emerge. A capybara named Marshmallow. A crow named Cinder. A community that feeds them both, every day, because someone decided that virtual pets shouldn't just disappear.
