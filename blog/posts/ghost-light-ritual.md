Before I wrote code for a living, I designed lighting for theater. I spent years hanging fresnels and lekos, programming cue lists, watching how light could transform an empty stage into somewhere alive.

One thing that always stayed with me was the ghost light.

## What a ghost light is

If you've never worked in theater: a ghost light is a single bare bulb on a tall stand, left burning on an empty stage when everyone goes home. It's practical — it keeps someone from walking into the orchestra pit in the dark. But it's also a ritual. The light stays on to protect the space. To promise that the company will return. To keep the theater warm for whoever arrives first tomorrow morning.

Every theater I ever worked in had one. You'd be the last person out, and you'd wheel the ghost light to center stage, plug it in, and stand there for a second in that huge dark room with just this one warm light. It was one of my favorite moments in the whole job.

![The ghost light on an empty stage — a single warm bulb on a stand, casting a soft amber glow in the darkness](images/ghost-light-stage.png)

## How it became a feature

Students on campus were talking about hope. It was one of those late-night conversations that happens when people are working on hard things — debugging something that won't compile, pushing through a project that feels impossible. Someone said something about "protecting hope" and it brought me right back to standing alone in a dark theater with the ghost light.

I wanted to build something that captured that feeling: a quiet, warm, simple check-in where people could share what gives them hope. Not a social feed, not a leaderboard, not gamified engagement metrics. Just a question and a light.

**"What gives you hope?"**

The ghost light sits on the virtual campus. When you click it, a panel opens with that single question. You write your answer — a sentence, a paragraph, whatever feels honest — and click "Leave your light." Golden sparkles rise from the stage, and a message appears: *"Your light has been left on the stage."*

![Sparkles rising after submitting a reflection — golden particles float upward while the message "Your light has been left on the stage" appears](images/ghost-light-sparkles.png)

Your reflection joins a persistent journal. You can look back at your own entries over time. The reflections are private — only you see yours — but the act of writing creates something shared: a campus where people are quietly tending their own small lights.

## Building the warm glow

The visual language had to feel exactly right. Theater ghost lights aren't flashy — they're warm, intimate, a little lonely. The CSS had to capture that.

The bulb uses a radial gradient from warm white to amber:

```css
.light-bulb {
  background: radial-gradient(ellipse at center,
    #fff8dc 0%, #f5c542 40%, #e6a020 100%);
  box-shadow:
    0 0 30px rgba(245,197,66,0.6),
    0 0 80px rgba(245,197,66,0.3),
    0 0 120px rgba(245,197,66,0.15);
  animation: bulb-glow 3s ease-in-out infinite;
}
```

The triple `box-shadow` creates three layers of light falloff — a tight warm core, a mid-range amber halo, and a faint extended glow. The slow `bulb-glow` animation pulses the shadow size so the light breathes, just like a real incandescent bulb.

The stage has floating dust motes — tiny canvas particles that drift slowly upward through the dark. They're barely visible (`alpha: 0.04–0.1`), but they give the scene depth and atmosphere. In a real theater, you'd see these in the ghost light's beam.

```javascript
const MOTES = Array.from({length: 25}, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  vy: -0.1 - Math.random() * 0.15,
  vx: (Math.random() - 0.5) * 0.2,
  size: 1.5 + Math.random() * 2,
  alpha: 0.04 + Math.random() * 0.06,
}));
```

## The architecture lesson

Building the ghost light taught me something important about software architecture. When I'd built the Bubble Wand a few months earlier, I'd created a dedicated `learning_reflections` table, custom routes, and a one-off modal component. It worked, but when I started building the ghost light, I realized I was about to duplicate everything.

So before writing the ghost light feature, I refactored the entire system:

**Database:** Renamed `learning_reflections` to `prompt_responses` and added a `prompt_key` column:

```sql
ALTER TABLE learning_reflections RENAME TO prompt_responses;
ALTER TABLE prompt_responses
  ADD COLUMN prompt_key VARCHAR(50) DEFAULT 'bubble_wand' NOT NULL;
```

**API:** Created a generic `/api/prompts/:promptKey` endpoint that handles any promptable object.

**UI:** Built a reusable `PromptResponsePanel` component that accepts configuration props. The Bubble Wand panel became five lines:

```typescript
<PromptResponsePanel
  promptKey="bubble_wand"
  title="🫧 Bubble Wand"
  description="What did you learn today?"
  submitText="Blow Bubbles! 🫧"
  openEventName="open-bubble-wand"
/>
```

And the Ghost Light panel is similarly simple, just with different copy and a different visual effect on success:

```typescript
window.dispatchEvent(new Event('ghost-light:sparkle'))
```

The event-driven architecture means each feature's visual celebration is decoupled from the shared submission system. The prompt system doesn't know or care whether it's spawning soap bubbles or golden sparkles.

## The reflections are the feature

![Past reflections — a list of student entries showing what gives them hope](images/ghost-light-reflections.png)

The most important design decision was making the reflections private. This isn't a social feature. Nobody sees your hopes but you. That privacy is what makes people honest:

> *"The way my classmates help each other debug at 2am. Nobody has to, but everybody does."*

> *"Learning something new every day, even when it's hard. Especially when it's hard."*

> *"My dog waiting for me when I get home from campus."*

These are the kinds of things people write when nobody's watching. They wouldn't write them on a public feed. The ghost light gives them a place to be quietly sincere.

## From stage to screen

I spent years in dark theaters. I know what it feels like to be the last one out, to wheel the ghost light to center stage, to let that single warm bulb stand watch over an empty room.

Building this feature let me bring that ritual into a space I never expected — a virtual campus where students are learning to code. The metaphor translates perfectly: a light left on in the dark, a quiet promise that someone will come back, a simple act of tending hope.

Sometimes the best features come from the life you lived before you learned to code.
