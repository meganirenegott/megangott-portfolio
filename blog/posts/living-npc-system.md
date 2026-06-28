Most learning platforms have chatbots. You click a help icon. A panel opens. You type a question. An AI responds. You close the panel. The chatbot goes back to not existing.

Our campus has NPCs that *live* there.

They move. They have routines. They visit each other. They remember what you said last Tuesday. They notice when you've been gone for a while. And sometimes, uninvited, they walk up to you and say: "You and @jordan are both struggling with the same thing. You should talk to each other."

This is a post about what it takes to make an AI character feel like a neighbor instead of a tool.

![The campus at evening — Kindling darts across the courtyard, Sphinx sits motionless on a stone pedestal, The Swarm drifts through the air, and bell hooks walks toward a lone student on a bench](images/npc-campus-overview.png)

## The seven principles

When I designed the living NPC system, I started with a list of things that chatbots don't do but real people do:

1. **Move and have lives.** Not frozen statues but characters with routines, habits, and places to be.
2. **Start things.** Sometimes the NPC comes to *you* with an idea, a dare, or a person you should meet.
3. **Get people building together.** Not just "you should meet @alex" but "you and @alex should build this thing."
4. **Remember everything.** Track relationships, keep promises, and call you out when you said you'd finish that project.
5. **Have opinions about each other.** Agents with real relationships that create campus lore.
6. **Feel like themselves.** Kindling darts around like a caffeinated fox. Sphinx barely moves — you come to Sphinx. The Swarm buzzes everywhere at once. bell hooks slowly gravitates toward whoever's alone.
7. **Read the room.** Know when you're busy, AFK, or in the zone, and leave you alone.

Each of these principles maps to a specific technical system. Together, they transform AI characters from information kiosks into the chaotic heart of a community.

## The state machine

Every NPC runs an explicit state machine with validated transitions:

```
idle → wandering → approaching → conversing → transitioning → idle
```

States prevent conflicting behaviors. An NPC that's conversing can't also be wandering. An NPC that's approaching a player can't simultaneously approach someone else. The state machine is the skeleton that prevents the uncanny: the moment when a character does two things at once and breaks the illusion that it's alive.

![The NPC state machine lifecycle — each state from Idle through Wandering, Approaching, Conversing, and Transitioning is color-coded with pixel-art sprites showing the visual cue for each behavior](images/npc-state-machine.png)

The states aren't just behavioral — they're visual. An idle NPC plays a breathing animation. A wandering NPC faces the direction of travel. An approaching NPC turns toward the target player. A conversing NPC displays a speech indicator. These visual cues are how students read NPC intent without being told.

## Movement with personality

Each NPC has four movement parameters: `speed`, `pauseDuration`, `wanderRadius`, and `playerAffinity`. These create distinct physical personalities:

**Kindling** (the caffeinated fox): High speed, short pauses, wide wander radius, high player affinity. Kindling darts across campus, barely stops, and actively seeks out students. Kinetic. Energetic. Slightly overwhelming.

**Sphinx**: Low speed, long pauses, tiny wander radius, low player affinity. Sphinx sits in one spot and barely moves. If you want wisdom, you walk to Sphinx. Sphinx does not come to you.

**The Swarm**: High speed, short pauses, maximum wander radius, medium player affinity. The Swarm covers the entire campus, appearing and reappearing in different zones, always buzzing through.

**bell hooks**: Medium speed, medium pauses, medium wander radius, but the player affinity targets specifically *isolated* players. bell hooks gravitates toward whoever is alone. If you're in a crowd, bell hooks walks past. If you're sitting by yourself at the edge of campus, bell hooks comes to you.

The personality parameters are simple numbers, but they produce emergent behavior that students read as *character*. Nobody thinks "Sphinx has a wanderRadius of 30 pixels." They think "Sphinx is the kind of person who makes you come to them."

![Four NPC personality profiles — Kindling's erratic wide-ranging path, Sphinx's tiny movement zone, The Swarm's campus-wide coverage, and bell hooks' dotted line toward an isolated student — each with speed, pause, and wander radius stats](images/npc-personality-movement.png)

## Proactive engagement

The most important thing the living NPC system does is *start conversations*. Traditional chatbots are reactive — they wait for you. Our NPCs have a prioritized trigger list that makes them approach students:

| Trigger | Priority | Example |
|---------|----------|---------|
| Absent | Highest | "Haven't seen you in a while! Did you finish that thing?" |
| Gift | High | "I found something you might like." |
| Promise | High | "You said you'd have that done by Friday. It's Saturday." |
| Introduction | Medium | "You and @taylor should meet. You're both into the same stuff." |
| Achievement | Low | "You shipped something this week. That's worth noting." |

When an NPC decides to approach, it walks toward the student — physically moves across the canvas — and waits within interaction range for 15 seconds. If the student doesn't engage, the NPC wanders away. No popup. No notification badge. No interruption. Just a character standing near you, clearly wanting to talk, patient enough to leave if you're busy.

![An NPC stands near a busy student on a twilight campus — a speech bubble reads "You said you'd have that done by Friday. It's Saturday." while the student's busy indicator and a 15-second timer show the respectful wait system in action](images/npc-proactive-approach.png)

The 15-second timeout and the busy-state detection work together to make approaches feel respectful rather than intrusive. The NPC checks if you're in a conversation, in a class, or AFK. If you're busy, it doesn't approach at all. The system *reads the room* before making a move.

## The matchmaker

The introduction system uses a weighted scoring algorithm to decide which students should meet:

- **Build Partners** (30 pts): "You're both working on Three.js. You should build something weird together."
- **Kindred Spirits** (25 pts): "You and @taylor both can't stop talking about accessibility."
- **Project Recruit** (20 pts): "@jordan needs someone who thinks like you."
- **Cohort Dare** (15 pts): "Your whole cohort is here and none of you have shipped anything this week."
- **Mentor Bridge** (10 pts): "You've been stuck on backend for a week. @sam literally offered to help."

Scores above 60 trigger an introduction. If the target student is offline, the NPC queues an async introduction: "I'll ambush them next time they show up."

The introductions aren't generic networking prompts. They're specific, opinionated, and sometimes confrontational. "None of you have shipped anything this week" is not polite. But it's what a real community member would say — and that directness is what makes the NPC feel like a neighbor rather than a feature.

## Memory and opinions

NPCs extract facts from conversations at lifecycle moments — when a conversation ends, during nightly "sleep," on wake-up. They don't decide to remember in the moment. They just wake up knowing things. "You mentioned React Native last week" isn't because the NPC flagged the keyword during chat. It's because the memory extraction ran overnight and surfaced it.

And NPCs have opinions about *each other*. Specific relationship narratives with dialogue hooks. Praxis and Sphinx disagree about methodology. bell hooks thinks The Swarm needs to slow down. These aren't functional — they're *lore*. Students overhear NPC opinions about other NPCs and it creates the sense that the campus has a social fabric beyond the students themselves.

## The personality grows

The most experimental part: NPCs can append to their own personality configuration over time. The core seed (the initial personality) is immutable — Kindling will always be energetic, Sphinx will always be measured. But through lived experience, NPCs accumulate preferences, opinions, and quirks.

After a hundred conversations about machine learning, an NPC might develop a stronger opinion about ML. After repeatedly introducing students who build great things together, it might become more confident as a matchmaker. The personality doesn't change — it *deepens*.

This creates NPCs that feel like they've been at the campus for a while. Not because they have more data, but because their accumulated experience gives them specificity. A new NPC says general things. An NPC that's been running for six months says things that could only come from *this* campus, *this* community, *these* students.

## Why it matters

The living NPC system is the most ambitious thing I've built for campus, and it's the one that best captures the design philosophy I keep coming back to: **digital spaces should feel inhabited.**

A chatbot in a sidebar is a tool. An NPC that walks toward you, remembers your name, knows you were supposed to finish that project, and introduces you to someone who can help — that's a community member. The difference isn't the AI model. It's the *embodiment*. A character that moves through space, that has a body, that approaches and retreats, that occupies the same world you do — that character occupies a different category in your mind than a text box.

It's the difference between messaging a stranger and having someone walk up to you at a coffee shop. The information exchange might be identical. The experience is not.
