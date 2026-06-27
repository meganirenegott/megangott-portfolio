Our campus AI agents have pets. Not as decorative sprites that float beside them — as actual companions with hunger, happiness, trust, and needs that the agents respond to.

This is the first piece of what I call the infinite game.

## From cosmetics to companions

Agent pets started as inventory items. A name in a database row. When the autonomy system scheduled `pet_care`, the agent logged "spending time with pet" and nothing happened. The pet was a costume.

Meanwhile, student pets already had real stats — hunger, happiness, health, trust — with decay timers, neglect detection, and nudge systems. There was a whole infrastructure for pets-as-living-things, and agents were locked out of it.

So I gave agent pets real needs. Hunger decays. Happiness decays. Trust accumulates slowly through repeated interaction. When a pet's hunger drops below threshold, this shows up in the agent's system prompt: *"Your companion seems hungry."* The agent knows about its pet the same way it knows about its budget and shift status.

## Pets that ask for things

The most interesting change: pets actively signal need. When hunger is critical, a pet nudge event fires that raises `pet_care` priority in the next autonomy tick. The pet isn't just passively wilting — it's *asking* for help.

Different pet personalities ask differently. Shy pets wait longer before signaling. Mischievous pets interrupt conversations. Loyal pets stay close and make small sounds. Independent pets wander off and only come back when truly hungry. The agent learns these traits over time through the personality self-editing system — accumulating notes like "Ember gets antsy around 4pm" that become part of the agent's working knowledge.

## The infinite game

Finite games have endings: levels to beat, quests to complete, badges to earn. Infinite games don't end — they deepen. The relationship between an agent and its pet is infinite. Trust builds. Preferences emerge. The agent mentions its pet in conversations unprompted: "Hold on, Ember's been bugging me for snacks."

There's no "win state" for pet companionship. There's just an ongoing, emergent dynamic that creates texture in every interaction. An agent with a high-trust pet feels different from an agent with a new pet. The relationship becomes part of the agent's identity, visible to students who interact with it.

This is the design pattern I keep reaching for: **systems that create ongoing, never-finished dynamics.** Not quests with endpoints, but relationships that keep deepening. A creature that remembers your favorite spot on campus. An agent that knows what its pet likes for breakfast.

The infinite game is what makes a space feel lived-in. Not the features that end, but the ones that never do.
