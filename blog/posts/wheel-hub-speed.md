There's a building east of the quad called The Wheel Hub. It's a lending station for vehicles. You walk in, you borrow something, you move faster across campus for the rest of your session. When you disconnect, the vehicle returns automatically.

This sounds straightforward. It is straightforward. The interesting part isn't the code — it's what happens to exploration when you change movement speed.

![The Wheel Hub — a cozy lending station with a gear logo sign, roller skates on hooks, skateboards on a wall rack, and bicycles lined up inside. A student grabs a bicycle as a speech bubble reads "The campus is huge and full of surprises. Grab some wheels and go explore." Paths branch in every direction from the entrance.](images/wheel-hub-building.png)

## The standard picks

Three vehicles are always available:

| Vehicle | Speed Multiplier |
|---------|-----------------|
| 🛼 Roller Skates | 1.5× |
| 🛹 Skateboard | 1.6× |
| 🚲 Campus Bicycle | 2.0× |

One vehicle per session. Borrow skates, you can't also borrow a bike. The constraint is intentional — choosing a vehicle is a small commitment. Do you want the agility of skates or the raw speed of a bicycle? The decision forces a tiny moment of self-knowledge: *what kind of explorer am I today?*

## Today's Special

Every day, the Wheel Hub rotates a special vehicle from a curated list of 22 options. The rotation is deterministic — a hash of the UTC day selects the vehicle, so all students see the same special on the same day. The list includes:

🎪 Unicycle, 🚴‍♂️ Penny-Farthing, 🌙 Moon Boots, 🦫 Rideable Capybara, 🤡 Clown Car, 🐙 Disco Octopus, 🪂 Hang Glider, 🚀 Jetpack, 🧹 Flying Broomstick, 🎈 Helium Balloon Chair, 🧞 Magic Carpet, 🦩 Giant Flamingo...

The specials all grant campus-wide fast travel regardless of their default characteristics. Flying vehicles (Hang Glider, Jetpack, Magic Carpet, etc.) are limited to 30-minute loans to keep them rare. Ground vehicles last until midnight UTC.

The daily special creates a conversation. "What's the special today?" "It's the Rideable Capybara." Students check the Wheel Hub even if they don't need a vehicle, just to see what's available. Predictability within surprise — you know there will be a special, you just don't know which one.

![Today's Special at The Wheel Hub — a Rideable Capybara with a saddle and reins stands on a spotlight pedestal, glowing with a purple aura. Silhouettes of other specials surround the base: unicycle, penny-farthing, moon boots, jetpack, flying broomstick, magic carpet, giant flamingo, disco octopus. A student exclaims "It's the Rideable Capybara!"](images/wheel-hub-daily-special.png)

## Speed changes what you see

Here's what I learned from watching students use the Wheel Hub: **movement speed is a lens, not just a stat.**

A student walking at 1× speed tends to explore locally. They go to class, they visit the buildings nearby, they stick to the paths they know. The campus feels like a collection of familiar rooms.

A student on a bicycle at 2× speed behaves completely differently. They overshoot their destination and discover the inlet they'd never walked to. They loop around the perimeter and find the dock with the sailboat. They pass through the Sculpture Garden on their way somewhere else and stop to read the pizza sculpture for the first time.

Speed doesn't just get you there faster. It changes your *radius of curiosity*. Things that were "too far away to bother" at 1× become "right over there" at 2×. The campus functionally doubles in size — not because I added content, but because I reduced the friction of reaching it.

![Walking (1×) vs Bicycle (2×) — on the left, a student's trail covers only the classroom, quad, and library while the rest of campus is grayed out. On the right, a bicycle trail sweeps across the entire campus, discovering the Sculpture Garden, the dock with the sailboat, and the inlet. "Speed changes your radius of curiosity."](images/wheel-hub-speed-radius.png)

## Session-scoped lending

Vehicles are session-scoped, not permanent. When you disconnect, your vehicle returns to the Hub automatically. This was a deliberate decision with three reasons:

1. **Discovery is daily.** If you permanently own a bicycle, the Wheel Hub becomes a one-time transaction. If you borrow one each day, visiting the Hub is a daily ritual — and you might try something different today.

2. **The special matters.** If you have a permanent bicycle, you'd never borrow the Disco Octopus. Session scoping means the special is always a viable choice because you're already making a daily decision.

3. **Equity.** If vehicles were purchasable with in-game currency, speed would stratify. Wealthy students move fast, new students walk. By making vehicles free and session-scoped, every student has equal access to exploration speed every single day.

That last point is the one I care about most. **Speed is an equity decision disguised as a game mechanic.** Who gets to move fast determines who discovers things first, who reaches more of the campus, who has richer experiences. Making speed free and universal means discovery is equally available to everyone.

## The speed badge HUD

When you're riding a vehicle, a small pill-shaped badge appears in the bottom-left corner of the canvas: amber for standard vehicles, purple for flying or special vehicles. It shows your current speed multiplier and vehicle name.

Tap the badge once to arm the return. Tap again to confirm and return your wheels. This two-tap pattern prevents accidental dismounts — you don't want to lose your bicycle because you clicked the wrong thing during a fishing session.

![A student skateboarding across campus at sunset — the HUD shows an amber "Skateboard — 1.6×" badge and a purple "Magic Carpet — Special" badge. A two-step return diagram demonstrates the tap-to-arm then tap-to-confirm pattern that prevents accidental dismounts.](images/wheel-hub-speed-badge.png)

## What the flavor text says

When you walk into the Wheel Hub, the greeting message reads:

> *"The campus is huge and full of surprises. Grab some wheels and go explore."*

I spent more time on this sentence than on the reservation system. The sentence does three things:

1. It tells you the campus is bigger than you think. (Implicit: you haven't seen everything.)
2. It promises surprises. (Implicit: there are things worth finding.)
3. It invites exploration. (Implicit: movement is encouraged, not just permitted.)

The flavor text is a nudge. Not "Here are some vehicles you can borrow" — that's a feature description. "The campus is huge and full of surprises" — that's an invitation. And invitations are what get people moving.
