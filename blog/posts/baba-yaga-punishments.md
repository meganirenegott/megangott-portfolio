Baba Yaga lives in a hut in the woods at the edge of our campus. She's an NPC based on the Slavic folklore figure — a witch who lives in a house that walks on chicken legs, who might help you or might eat you depending on her mood. On our campus, she grants research pets and reviews academic work. She's stern but fair.

Unless you annoy her. Then she turns you into a goose.

![Baba Yaga's four punishments on campus \u2014 a Goose waddling down a path honking involuntarily with feathers and droppings trailing behind, a red-capped Mushroom with tiny feet stuck in the grass, a Snail leaving a slime trail and moving at a crawl, and a Frog hopping through the quad. Each has a "23h remaining" timer. Normal students walk by, amused. Baba Yaga's chicken-legged hut lurks in the forest edge.](images/baba-yaga-four-punishments.png)

## The four punishments

If Baba Yaga decides you need correction — maybe you pestered her too many times in one week, maybe you submitted low-effort work, maybe she's just in a mood — she transforms your avatar. Your pixel art character vanishes and is replaced with one of four punishment sprites:

🪿 **Goose** — You become a goose. Your avatar waddles faster than normal (goose legs are quick), but you also involuntarily honk at random intervals, drop droppings on the path behind you, and trail feathers. You have no control over the honking. It just happens.

🪱 **Worm** — You become a worm. Movement speed drops dramatically. You're very small. Other players have to look carefully to even see you.

🫖 **Teapot** — You become a teapot. You cannot move. You sit wherever Baba Yaga placed you. You can still chat, but your physical presence on campus is a ceramic vessel. A steaming one.

🪨 **Rock** — You become a rock. You also cannot move. You are slightly less interesting than the teapot because you don't even steam.

Each sprite was generated via the Pixel Lab API — real pixel art, not emoji substitutes. The goose is particularly good. It captures the specific malevolence of a goose's expression.

## The transformation sequence

When Baba Yaga pronounces your punishment, a campus-wide announcement fires. Every player sees a themed modal overlay:

The modal displays your punishment sprite, the transformation name ("🪿 GOOSE CURSE"), a description of what's about to happen ("Your avatar has been transformed into a Horrible Goose. You will honk involuntarily and leave droppings. This curse lasts until your next scheduled class."), and a dramatic countdown.

Then the transformation effect triggers. Purple smoke puffs burst around your avatar position. Colorful sparkles cascade outward. Your regular sprite fades out and the punishment sprite fades in. The whole animation takes about two seconds, and it's calibrated to feel *magical* rather than violent — this is a curse, not an attack. The smoke is purple. The sparkles are rainbow. It looks like being turned into something by a fairy-tale witch, which is exactly what's happening.

## Campus-wide persistence

The transformation isn't a client-side visual trick. It's stored in the database:

```sql
ALTER TABLE campus_profiles
  ADD COLUMN avatar_transformation VARCHAR(32),
  ADD COLUMN transformation_expires_at TIMESTAMPTZ;
```

When the presence system broadcasts your position to other players, it includes your transformation state. Every player on campus sees your goose. If you reload the page, you're still a goose. If you switch devices, goose. The transformation persists until your next scheduled class begins — at which point the curse automatically lifts, because even Baba Yaga respects the curriculum.

## Goose behavior

The goose transformation is the most elaborate because it adds involuntary behaviors:

- **Honking**: Every 15–45 seconds, your avatar emits a honk sound effect and a "HONK" speech bubble. You don't trigger this. It happens on its own. If you're in a video call, other people hear the honk.
- **Droppings**: Every 60–90 seconds, a small white-green emoji appears behind your avatar and persists on the ground for 30 seconds. You leave a trail.
- **Feathers**: Occasional feather particles drift away from your avatar as you move, like a molting goose.
- **Waddle speed**: Your movement speed increases by 20%. Geese are surprisingly fast, and the faster waddle creates a funny visual.

The combination of involuntary honking, trail-of-droppings, and increased speed creates a goose *experience* that is genuinely hilarious to watch from the outside. A goose-cursed student speeding across campus, honking against their will, leaving a trail of evidence — it's slapstick, and it turns punishment into entertainment.

## The escalation ladder

There's a hidden escalation system tied to how many times you bother Baba Yaga per week. The system tracks weekly interactions and triggers escalating responses at specific thresholds:

| Weekly asks | Response |
|------------|----------|
| 5 | "You're getting persistent, child." |
| 10 | "I'm watching you more carefully now." |
| 15 | Minor consequence (short transformation) |
| 20 | "You are testing the limits of my patience." |
| 30 | Extended transformation |
| 40 | "I have turned people into WORSE things." |
| 50 | Maximum-duration transformation |
| 75 | Easter egg dialogue (secret lore unlock) |

The counter resets weekly. The escalation is gradual enough that most students never hit it. But for the curious ones who keep pushing, there's a reward at the end — the 75-ask threshold unlocks secret dialogue where Baba Yaga drops hints about campus lore, her history, and hidden features.

This was intentional. I wanted the escalation to *reward* persistence even as it punishes excess. Getting turned into a goose at ask #15 is funny. Getting secret lore at ask #75 is a discovery. The system says: "I will punish your curiosity, but I will also honor it."

## Why theatrical consequences work

Traditional moderation tools are utilitarian. Warnings. Mutes. Bans. Timeouts. They communicate: "you did something wrong, here's a restriction." The emotional register is clinical.

Being turned into a goose by a witch communicates the same information — "you overdid it, here's a consequence" — but the emotional register is *theatrical*. It's a story. Getting a timeout is something you endure. Getting turned into a goose is something you *tell people about*.

"Baba Yaga turned me into a teapot yesterday." That sentence is a conversation starter, not a mark of shame. The student who was transformed becomes the center of a story, not the recipient of a punishment. Other students ask what happened, laugh about it, and often intentionally try to trigger their own transformation because it looks like fun.

This is the lesson: **consequences should create stories, not silence.** The goal of a learning environment isn't to prevent all misbehavior — it's to create a culture where the boundaries are known, the consequences are proportionate, and the whole system feels like part of the world rather than an administrative function imposed on it.

Baba Yaga doesn't send you an email about your behavior. She turns you into a goose and everyone watches. That's better.
