Every Wednesday on our virtual campus, a giant animated slice of bread appears in the main quad. It bounces gently. If you click on it, it tells you a bread pun. A different pun every time.

And somewhere nearby, a horrible goose is circling. Honking. Clearly with plans for the bread.

![The Wednesday Bread event on the virtual campus quad: a giant golden slice of bread with cute eyes bounces in the center of a green quad, surrounded by three stationary geese honking in unison. In the background, a chaos goose sprints after a student trying to reclaim a stolen notebook.](images/wednesday-bread-quad.png)

This is the Wednesday Bread NPC, and building it required more infrastructure than you'd expect for a pun-telling carbohydrate.

## The idea

We already had an NPC framework with AI-powered agents that live on campus, have personalities, and talk to students. But those agents are always there. I wanted something different: a character that only exists on one day of the week. Something students would look forward to. Something that made Wednesday feel like Wednesday.

The inspiration came from weekly rituals. If you've ever worked somewhere with "Taco Tuesday" or "Donut Friday," you know the phenomenon. It's not about the taco. It's about having a shared marker in the week that everyone recognizes. You walk in and someone says "it's taco day" and you both know exactly where you are in time.

I wanted our campus to have that. But instead of tacos, I chose bread. Because bread is inherently funny.

## The bread

Wednesday Bread is a 32x32 pixel art sprite, a golden slice of bread with a slight crust gradient and two small eyes. It uses the scripted-response NPC system, which means instead of an LLM generating responses, it draws from a hand-written shuffle deck of lines.

The shuffle deck is all bread puns:

- "I'm on a *roll* today."
- "That's the *yeast* of my worries."
- "You're the *butter* half."
- "I *knead* a break."
- "Don't be so *crusty*."

When you interact with the bread, it picks a random line from the deck, plays a bobbing animation, and displays it in the JRPG dialogue box. The deck shuffles to avoid repeats until you've exhausted all options, then reshuffles.

Not every interaction on a learning platform needs to be educational. Sometimes the best thing you can offer a student who's been staring at code for three hours is a slice of bread with opinions.

## The goose

The bread doesn't appear alone. Three stationary goose NPCs spawn around the quad on Wednesdays, each with their own honk-only dialogue deck. They don't say words. They just honk. Different honks. Emphatic honks. Concerned honks. Existential honks.

The real drama comes from the `GooseEventManager`. On Wednesday, it has a 50% chance per minute of releasing a roaming wild Horrible Goose from our `wildGoose.ts` system. This goose prowls the campus, darts toward students, steals items from their inventory, honks at inappropriate moments, and leaves droppings on the path.

The bread. The stationary honking geese. The roaming chaos goose. Together they create a little emergent narrative that plays out differently every Wednesday. Sometimes the goose circles the bread ominously. Sometimes it chases a student past the bread while the bread cheerfully dispenses puns. The combination creates stories, and those stories become the kind of thing students tell each other about.

## Time-gated NPCs

Building Wednesday Bread required solving a general problem: how do you make an NPC that only exists at certain times?

Our `agents` table already had an `active_weekdays` column, an integer array where `3` means Wednesday. But I needed finer control for future NPCs (imagine a late-night creature that only appears between 10 PM and 2 AM). So I added two new columns:

```sql
ALTER TABLE agents
  ADD COLUMN active_window_start INTEGER,  -- UTC minutes from midnight
  ADD COLUMN active_window_end   INTEGER;  -- UTC minutes from midnight
```

When `loadAgents()` fires, it checks both the weekday and the time window. If the current UTC time doesn't fall within `[active_window_start, active_window_end)`, the agent isn't loaded into cache and doesn't exist on the world canvas.

Wednesday Bread uses `active_weekdays = ARRAY[3]` with null time windows, meaning it appears all day on Wednesdays. But the infrastructure supports any schedule: a midnight librarian, a dawn runner, a lunch-hour food truck.

## Why scarcity matters

I could have made Wednesday Bread appear every day. It would have been easier. No time-gating infrastructure needed.

But scarcity is what makes it special. If the bread is always there, it's furniture. If the bread appears once a week, it's an event. Students log in on Wednesday and notice it. Or they log in on Thursday and someone mentions it and they feel like they missed something. Both reactions build community.

A campus where everything is always available feels flat. A campus where things come and go (seasonally, weekly, randomly) feels alive.
