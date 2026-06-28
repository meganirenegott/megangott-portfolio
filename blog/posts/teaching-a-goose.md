If you've played *Untitled Goose Game*, you know the joy of being a horrible goose. The waddle. The honk. The theft. When I started building interactive creatures for our virtual campus, I knew we needed our own horrible goose as an homage.

The Horrible Goose started as a pet. Students could select it from the pet customizer and it would follow them around campus. Cute, harmless.

![The Horrible Goose causing chaos on the virtual campus quad. A large white goose mid-sprint through a crowd of panicked pixel art students, a stolen hat clenched in its beak. Students scatter in every direction while papers fly.](images/teaching-goose-chaos.png)

Then I had a better idea: what if the goose was an admin-only event creature? Release it during a campus event, and it finds the biggest group of students, flies over, and causes absolute mayhem. Honking, stealing items, chasing people, leaving droppings.

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

It's O(n²), but with under 100 simulated users on a demo canvas, it runs in microseconds. For the production campus (which could have 500+ concurrent users), you'd want a grid-based spatial hash, but this was a prototype and it works.

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

The state machine is timer-based. Each behavior runs for a random duration, then transitions. This creates unpredictable but believable behavior. The goose feels alive even though it's just a `switch` statement with timers.

## The moment it clicked

The first time I ran the demo with 15 simulated users clustered in groups of 5, the goose flew to the biggest group, stole someone's laptop emoji, ran away to the edge of the screen, dropped it, then circled back and honked at everyone. I didn't program that sequence. The state machine generated it on its own.

That's when I knew the design was right. The best game AI isn't the smartest. It's the one that looks smart while being simple enough to debug.

## The goose as a campus event

The Horrible Goose is an admin tool. We release it during live campus events, and when it shows up, the chat goes wild. People yelling (in text) about the goose stealing their items. Screenshots flying. Someone chasing the goose across the quad trying to get their notebook back.

Getting harassed by the goose has become a rite of passage. Students who've had an item stolen treat it as a badge of honor. "The goose got me" is a sentence you hear on campus. There's an unspoken rule that you chase the goose down to reclaim your stolen item instead of waiting for it to respawn.

The *Untitled Goose Game* homage landed the way I hoped. People immediately get the reference and love that we built our own chaotic waterfowl for a coding school.
