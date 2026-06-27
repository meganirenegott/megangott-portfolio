If you've ever played *Untitled Goose Game*, you know the joy of being a horrible goose. The waddle. The honk. The theft. I loved that game, and when I started building interactive creatures for our virtual campus, I knew we needed our own horrible goose as an homage.

The Horrible Goose started as a pet. Students could select it from the pet customizer and it would follow them around campus. Cute, harmless.

Then I had a better idea: what if the goose was an admin-only event creature? Release it during a campus event, and it finds the biggest group of students, flies over, and causes absolute mayhem — honking, stealing items, chasing people, leaving droppings.

The key design challenge: **how does the goose decide where to go and what to do?**

## Finding the crowd

The goose needs to find the densest cluster of users on a canvas that might have 50+ people scattered across it. I used a sliding-window density approach:

```javascript
function findDensestCluster() {
    let best = null;
    for (const u of users) {
        let count = 0;
        let cx = 0, cy = 0;
        for (const v of users) {
            if (dist(u, v) < CLUSTER_RADIUS) {
                count++;
                cx += v.x; cy += v.y;
            }
        }
        if (!best || count > best.size) {
            best = {
                center: { x: cx / count, y: cy / count },
                size: count
            };
        }
    }
    return best;
}
```

Each user acts as a potential cluster center. We count how many other users are within `CLUSTER_RADIUS`, and the user with the most neighbors defines the densest cluster. The goose flies to the centroid of that cluster.

It's O(n²), but with <100 simulated users on a demo canvas, it runs in microseconds. For the production campus (which could have 500+ concurrent users), you'd want a grid-based spatial hash — but premature optimization is the root of all evil, and this was a prototype.

## The behavior state machine

Once the goose reaches the crowd, it cycles through behaviors:

```
prowl → dart → prowl → steal → prowl → honk → prowl → poop
```

Each behavior has its own physics:
- **Prowl**: Circle the cluster center at a fixed radius, menacingly
- **Dart**: Pick a random user, accelerate toward them at 2x speed, scare them on contact
- **Steal**: Approach a user who has an item, take it, run away in the opposite direction, drop it smugly
- **Honk**: Stop moving, emit `HONK!` particles, scare everyone within 120px radius

The state machine is timer-based — each behavior runs for a random duration, then transitions. This creates unpredictable but believable behavior. The goose feels *alive* even though it's just a `switch` statement with timers.

## The moment it clicked

The first time I ran the demo with 15 simulated users clustered in groups of 5, the goose flew to the biggest group, stole someone's laptop emoji, ran away to the edge of the screen, dropped it, then circled back and honked at everyone. I didn't program that sequence — the state machine generated it emergently.

That's when I knew the design was right. The best game AI isn't the smartest — it's the one that *looks* smart while being simple enough to debug.

## A rite of passage

The student reaction was something I never expected. The first time we released the goose during a live campus event, the chat exploded. People were screaming (in text) about the goose stealing their items. Screenshots started flying. Someone recorded themselves chasing the goose across the quad trying to get their notebook back.

It became a *thing*. Getting harassed by the goose is now considered a rite of passage on campus. Students who've had an item stolen wear it as a badge of honor — "the goose got me" is a sentence you hear regularly. There's an unspoken rule that you have to work to reclaim your stolen item rather than just waiting for it to respawn; you chase that goose down.

The internet had wild reactions too. When clips of the goose surfaced online, people couldn't believe a coding school had a campus creature that actively terrorized students. The *Untitled Goose Game* homage landed exactly the way I hoped — people immediately got the reference and loved that we'd built our own chaotic waterfowl.

Sometimes the best features aren't the ones on your roadmap. They're the ones that make people laugh so hard they forget they're supposed to be learning — and then learn anyway, because they're having too much fun to stop.
