Most pet behavior in games follows one pattern: the pet follows you. You walk right, the pet walks right. You stop, the pet stops. The pet is a shadow with a face.

Crows don't do that. Real crows perch on things and watch you from a distance. They're curious but independent. They might follow you across campus — but up on the rooftops, not at your heels.

So when I added crows as a pet type, I built the "distant perching" behavior system.

## How distant perching works

A crow pet doesn't pathfind to the player's position. Instead, it pathfinds to an elevated point *near* the player — the roof of the nearest building, a tall tree, a lamp post. It maintains a comfortable distance of 60-120 pixels, staying close enough to be "yours" but far enough to be its own creature.

When you move, the crow evaluates whether it needs to relocate. If you've walked far enough that the nearest perch to your new position is different from the current perch, the crow takes off — a brief flight animation across the gap — and lands on the new perch. If you're just walking around in the same area, the crow stays put and watches.

The watching is the important part. The crow sprite faces the player. It tracks you. Not following, but *observing*. It's a subtle difference, but it completely changes how the pet feels. A cat that follows you is a companion. A crow that watches you from a building is a *presence*.

## The startle radius

Crows have an inverted startle system compared to other pets. Most pets (capybaras, cats, foxes) have a small startle radius — walk close and they react, walk away and they relax. Crows have a *proximity alert* instead.

If the player walks directly under the crow's perch, the crow shuffles sideways along the roofline. Not fleeing — just adjusting. Maintaining distance. If the player somehow gets very close (maybe climbed a building in a future feature), the crow takes off and finds a new perch entirely.

This communicates a personality: "I'm here because I want to be, not because you told me to be. Don't crowd me."

## Why some animals shouldn't be near you

The crow behavior taught me something about designing animal companions: **not all loyalty looks the same.** A dog follows you. A cat sits near you when it feels like it. A crow follows you from a distance and pretends it's not following you.

Each of these is a valid form of companionship, and each requires different behavior systems. The most interesting pets aren't the ones that do what you expect — they're the ones that have their own relationship to proximity, presence, and attention.

The students who choose crow pets tend to appreciate exactly this quality. They like looking up and seeing their crow on a rooftop three buildings away, watching. It's not affection. It's something more like respect.
