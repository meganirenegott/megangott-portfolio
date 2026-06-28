There's a building on campus called the Rock Garden. It's a sandy patch near coordinate (200, 240) with boulders, a cactus grove, a desert spring, and a stone circle. You walk in. You look around.

That's it. That's the feature.

## No mechanics

The Rock Garden has no quests, no collectibles, no mini-games, no NPC dialogue trees. There's no fishing here. No book reports. No bread telling you puns. It's a space with rocks and sand and quiet.

The only interactive element: if you stand near the Ancient Stones (the stone circle in the center), a pulsing amber glow appears and a line of text fades in: *"You feel strangely... stony. Baba Yaga's magic lingers here."* A lore whisper. Then nothing.

![The Rock Garden: boulders, a cactus grove, a desert spring, and the Ancient Stones circle with a faint amber glow at its center](images/rock-garden-stone-circle.png)

At least, that's what it looks like the first time. More on that later.

## Why design negative space

In game design, there's a concept called **negative space**: areas that exist specifically to have less than their surroundings. Negative space isn't empty. It's deliberately quiet. The pause in a sentence. The rest between notes.

Every other building on campus demands something from you. The library asks you to research. The Wheel Hub asks you to choose a vehicle. Baba Yaga asks you to prove yourself. Even the Capybara Spa, which does nothing productive, still offers interactive animals with behaviors to observe.

The Rock Garden asks nothing. That's its function.

Students who need a moment after a hard debugging session, during a break, in the middle of a frustrating build can walk to the Rock Garden and just exist. The rocks don't change. The sand doesn't shift. The desert spring reflects the sky. It's the campus equivalent of stepping outside to breathe.

## The atmosphere suggestion

One subtle piece: when you first enter the Rock Garden in a session, a toast notification fires once suggesting you open the Atmosphere Panel. Not commanding, suggesting. "The Rock Garden is a good place to set your mood." The implication: pick some fireflies, or rain, or nothing. Make this space feel like whatever you need it to feel like.

The suggestion fires once per session and never again. It's a nudge, not a tutorial.

## Baba Yaga's curses

To understand the Rock Garden's secret, you need to know about Baba Yaga.

Baba Yaga is an NPC who lives in a chicken-legged hut at the edge of campus, a witch based on Slavic folklore. She grants research pets, reviews academic work, and dispenses wisdom. She's stern but fair. Unless you cross her.

![Baba Yaga's hut: a crooked cottage on chicken legs at the edge of the dark forest, purple smoke rising from the chimney](images/rock-garden-baba-yaga-hut.png)

If students pester her too many times in one week, submit low-effort work, or mistreat their campus pet, she pronounces a curse that transforms their avatar into one of four things:

- 🪿 **Goose**: You waddle 20% faster than normal, but you honk involuntarily every 15 to 45 seconds and leave droppings behind you. Other students can hear the honking. You have no control over it.
- 🫖 **Teapot**: You cannot move. You sit wherever Baba Yaga placed you. You can still chat, but your physical presence on campus is a ceramic vessel. A steaming one.
- 🪱 **Worm**: Your movement speed drops dramatically. You're very small. Other players have to look carefully to even see you.
- 🪨 **Rock**: You cannot move. You are slightly less interesting than the teapot because you don't even steam.

The transformation is stored in the database, not a client-side visual trick. Every player sees your goose. Reload the page: still a goose. Switch devices: goose. The curse persists until your next scheduled class begins, because even Baba Yaga respects the curriculum.

The whole system makes punishment theatrical. Getting a timeout is something you endure. Getting turned into a goose by a witch is something you tell people about.

![The transformation sequence: purple smoke bursts and rainbow sparkles cascade as Baba Yaga's Rock Curse takes hold](images/rock-garden-curse-transformation.png)

## The rock concert

If you're currently cursed as a rock (immobile, slightly less interesting than a teapot) and you somehow get yourself into the Rock Garden, something unexpected happens.

A disco ball drops from nowhere. Rainbow light beams sweep the room. The boulders start bouncing to a beat. Confetti rains down. A banner reads: "🎵 ROCK CONCERT IN PROGRESS 🎵"

Because a rock walked into the rock garden. What did you expect?

![The Rock Concert: a disco ball, rainbow beams, confetti, and an audience of literal bouncing rocks](images/rock-garden-rock-concert.png)

The conditions are intentionally narrow: you have to be transformed into a rock (which requires annoying Baba Yaga), you have to get to the Rock Garden (which is hard because rocks can't move, so you need a friend to portal you or you need to get cursed while already standing nearby), and you have to stay cursed long enough to trigger it. It's a three-way intersection of systems that were never designed to interact.

That's what makes it feel like a discovery rather than a feature. Nobody is told about the rock concert. There's no hint in the UI. The lore whisper (*"Baba Yaga's magic lingers here"*) is the only breadcrumb, and even that's oblique.

## Why secrets matter

The rock concert has zero educational value. It exists in a space designed for quiet contemplation. It only triggers under a deeply specific condition.

It's also one of the most-shared moments on campus.

Students who discover it screenshot it, tell their friends, and start intentionally getting themselves cursed by Baba Yaga just to trigger it. A punishment system that students actively seek out is a punishment system that's working. The rock concert turned a consequence into a quest.

The Rock Garden gets visited more consistently than some of the most feature-rich buildings on campus. Some students come for the quiet. Some come hoping to trigger the concert. Both groups are getting exactly what they need from the same room.
