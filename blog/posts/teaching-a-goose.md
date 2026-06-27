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
