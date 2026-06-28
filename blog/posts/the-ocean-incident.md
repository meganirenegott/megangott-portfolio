On March 5th at 6:00 PM on a Thursday evening, I accidentally spawned an ocean in the middle of campus.

Not a puddle. Not a texture glitch. A full ocean — with waves, foam spray, specular highlights, a sandy shoreline, and a distant island silhouette with palm trees. Right where the buildings were supposed to be.

![Recreation of the bug — an entire ocean spawned in the middle of the campus quad, with buildings partially submerged in water](images/ocean-on-campus-recreation.png)

I sat there staring at my screen, watching animated waves lap against the Student Center, and thought: *I can never tell anyone about this.*

## How it happened

I was building the fishing feature. Our campus is a 2D game world with procedurally generated terrain — plaza, urban zone, park, forest, wilds — arranged in concentric rings radiating out from Town Square at the center. The ocean was supposed to go at the very southern edge, past ring 8, where nobody would stumble into it accidentally.

The ocean rendering code needed a `baseShorelineY` coordinate — the Y position where sand meets water. I was working with Claude, and we were going back and forth about the coordinate system. Our campus uses tile coordinates, but the rendering code works in world pixels. I kept confusing the two.

It was day 2 of a campus hackathon. I was more tired than I realized, in that state where you think you're being productive but you're actually making everything worse. I set `baseShorelineY` to 520.

```javascript
const baseShorelineY = 520  // 🫠 this is the urban zone
```

`y=520` is not the southern edge of campus. `y=520` is the *middle of campus*. That's where the quad is. That's where buildings are. That's where students walk around.

So when I refreshed the page, the entire lower half of campus was an ocean. Buildings were jutting out of the water. Walking paths disappeared into surf. The library had a beachfront.

## The 47 minutes of panic

The commit that created the ocean was pushed at `6:00 PM`. The commit that fixed it was pushed at `6:46 PM`. Those 47 minutes felt like a year.

Here's what I did:

1. **Stared at the screen for too long.** The water animation was actually really pretty. For a brief moment I was proud of how good the waves looked before remembering they were destroying campus.

2. **Took a screenshot.** Some part of my brain knew this would be funny later, even though in the moment I was terrified.

3. **Fixed the coordinate.** Changed `baseShorelineY` from `520` to `3500`:

```diff
- const baseShorelineY = 520
+ const baseShorelineY = 3500
```

That's it. One number. 520 → 3500. The entire ocean moved 3,000 pixels south, past the wilds biome boundary, to where it was supposed to be all along.

4. **Updated every other reference.** The fishing prompt, the island silhouette, the decoration exclusion zone, the tide HUD — everything that referenced the ocean's position had to be updated too:

```diff
- if (worldY > 520) continue  // Ocean zone — no decorations
+ if (worldY > 3470) continue  // Ocean zone — no decorations
```

5. **Pushed the fix.** Committed as `fix: move ocean to far southern edge of campus (ring 8+)` with a commit message that very professionally explained "Ocean was at y=520 (inside urban zone, overlapping buildings)."

6. **Fessed up.** This was the hardest part. I told the team what I'd done. Nobody was angry. A few people thought it was hilarious. Someone suggested we should keep the ocean-campus as a secret easter egg.

## The aftershocks

A month later, in April, we got ticket THE-542: **"buildings in ocean."** It turned out that even though I'd moved the ocean to `y=3500`, the dorm building grid was using axes in the wrong order, and some buildings were spawning at coordinates that put them in the water. My ocean was still claiming victims a month after I'd fixed it.

The PR that fixed THE-542? `fix: swap dorm grid axes so buildings stay on land`. Another coordinate bug. Another simple fix. Another reminder that game development is 30% creative vision and 70% "why is the thing in the wrong place."

## What I actually learned

The ocean incident is still my favorite mistake. Here's why:

**Mistakes are how you learn the coordinate system.** Before the ocean bug, I had a vague understanding of how our world coordinates worked. After it, I had a visceral, embodied understanding. I will never confuse tile coordinates with world pixels again, because I once flooded a campus with my confusion.

**Coding past your bedtime is a choice.** Not always a bad one, but always a choice with consequences. I don't regret the late night — the fishing feature shipped and students love it. But I do remember the ocean every time I think "I'll just push one more commit before bed."

**Telling people about your mistakes makes everything better.** I was scared to tell the team. But fessing up meant someone else could catch the aftershocks (THE-542). And it turned into a team story that still makes people laugh.

## The ocean today

The ocean is exactly where it belongs now — at the far southern edge of campus, past the wilds biome, at `y=3500`. Students walk through the plaza, through the urban zone, past the park, through the forest, through the wilds, and then they reach the sandy beach.

It's beautiful there. The water has animated waves. Jellyfish glow at night. You can fish for research papers. There's an island in the distance with palm trees.

It just doesn't belong in the middle of the quad.

And if you're reading this as a developer who just broke something in production — take a screenshot, fix the number, and tell someone. You'll laugh about it in six months. I promise.
