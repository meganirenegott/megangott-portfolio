Every virtual campus needs rituals — moments where students pause, reflect, and celebrate what they've been doing. Our campus already had fishing for research papers and encounters with Baba Yaga, but there was no simple way for students to just... check in. To say "here's what I learned today" and have that feel like it *mattered*.

That's where the Bubble Wand came from.

## The idea

There's a sculpture on our campus — a giant, whimsical bubble wand with a rainbow ring and a candy-striped handle. When you click it, a panel opens asking one question: **"What did you learn today?"**

![The bubble wand sculpture on campus — a rainbow-ringed wand with sparkle effects](images/bubble-wand-sculpture.png)

You type a quick reflection — a sentence, a paragraph, whatever feels right — and hit "Blow Bubbles!" The panel closes, and iridescent soap bubbles start floating up from the wand. They drift lazily in every direction, shimmering with rainbow hue shifts, and slowly pop after 18–35 seconds. The animation runs for three full minutes.

![The reflection panel — a glassmorphic modal with a textarea and a "Blow Bubbles!" button](images/bubble-wand-panel.png)

It's a celebration. A visual, ambient, zero-pressure way to mark the end of a learning session.

## The bubble physics

The trickiest part was making the bubbles feel real. Soap bubbles don't rise in straight lines — they drift, wobble, and each one behaves slightly differently.

Every bubble is a CSS element with 7 custom properties:

```css
.soap-bubble {
  --s: 30px;       /* size */
  --bo: 0.7;       /* opacity */
  --sx: 420px;     /* spawn X position */
  --dx: 80px;      /* drift X (how far to travel horizontally) */
  --dy: -350px;    /* drift Y (how far to travel vertically) */
  --ld: 22s;       /* lifetime duration */
  --sd: 5s;        /* sway duration (wobble cycle) */
}
```

When a bubble spawns, these values are randomized:

```javascript
const angle = Math.random() * Math.PI * 2;  // full 360°
const distance = 400 + Math.random() * 500;
let dx = Math.cos(angle) * distance;
let dy = Math.sin(angle) * distance;
dy -= 200 + Math.random() * 250;  // bias upward
```

The upward bias is key — bubbles tend to rise, but they can drift in *any* direction. Some float left, some right, some almost horizontally before lazily rising. This looks natural because real soap bubbles behave exactly this way.

![Bubbles emerging from the wand — a burst of iridescent soap bubbles drifting upward](images/bubble-wand-bubbles-spawning.png)

## The iridescent shimmer

The rainbow surface of each bubble uses a `conic-gradient` that rotates through the spectrum:

```css
.soap-bubble-inner {
  background:
    radial-gradient(circle at 30% 30%,
      rgba(255,255,255,0.6) 0%,
      rgba(255,255,255,0.15) 20%,
      transparent 50%),
    conic-gradient(from var(--ho),
      rgba(255,100,100,0.25), rgba(255,200,100,0.25),
      rgba(100,255,100,0.25), rgba(100,200,255,0.25),
      rgba(200,100,255,0.25), rgba(255,100,200,0.25),
      rgba(255,100,100,0.25));
}
```

The `--ho` (hue offset) is randomized per bubble, so each one starts at a different point in the rainbow. Combined with a `hue-rotate` animation, the colors shift continuously — just like real soap film.

The `radial-gradient` overlay creates the light reflection spot you see on real bubbles: a bright highlight at roughly the 10-o'clock position.

![Bubbles floating across the screen after 8 seconds — dispersed and shimmering](images/bubble-wand-bubbles-floating.png)

## The full stack behind it

The bubble animation is just the frontend reward. Behind it, there's a full persistence layer:

**Database:** A `learning_reflections` table with `student_id`, `body`, and `created_at`, indexed for fast retrieval by student.

```sql
CREATE TABLE IF NOT EXISTS learning_reflections (
  id          SERIAL PRIMARY KEY,
  student_id  INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  body        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**API:** REST routes for creating and retrieving reflections. The service layer wraps the generic `promptResponses` system, so the Bubble Wand shares infrastructure with other campus features that ask students questions.

**Client:** A `BubbleWandPanel` React component that dispatches a custom DOM event (`bubble-wand:blow`) on successful submission, which triggers the `SoapBubbleOverlay` component to start spawning bubbles.

The event-driven architecture means the panel and the bubble overlay are completely decoupled. Any future feature could trigger bubbles by dispatching the same event.

## Why it works as a check-in

I didn't expect the Bubble Wand to become one of the most-used features on campus, but it has. I think it works because:

1. **Zero pressure.** There's no grading, no minimum length, no right answer. Just "what did you learn today?"
2. **Immediate visual reward.** The bubbles are beautiful and they last three minutes. You *see* your reflection turn into something.
3. **Persistent history.** The Learning Journal stores every reflection. Students can scroll back and see their own growth over weeks and months.
4. **It's whimsical.** The rainbow wand, the candy-striped handle, the sparkle effects — it doesn't take itself seriously. That lowers the barrier to participation.

The best features don't have to be complex. Sometimes a textarea, a database table, and some really good CSS is all you need.
