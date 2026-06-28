Our campus AI agents have pets. Not as decorative sprites that float beside them — as actual companions with hunger, happiness, trust, and needs that the agents respond to. And there are *a lot* of pets to choose from.

This is the first piece of what I call the infinite game — and it starts with the menagerie.

## The menagerie

Both students and agents can adopt from 30 pet species across three tiers. Each pet renders as an emoji on the map (with pixel art sprites generated via Pixel Lab for the standard collection):

**Standard pets** — available to all students:

🐈 Cat · 🐕 Dog · 🕊️ Bird · 🐇 Rabbit · 🐦‍⬛ Crow · 🐍 Snake · 🐎 Horse · 🐸 Frog · 🦫 Capybara · 🦙 Llama · 🦎 Iguana · 🐄 Cow · 🦜 Cockatoo · 🦙 Alpaca · 🐦 Hummingbird · 🐂 Highland Cow · 🐴 Mini Horse · 🐒 Marmoset · 🐿️ Lemur · 🪿 Horrible Goose

**Store pets** — purchased with campus currency:

🐳 Whale (3x normal scale — intentionally clips through buildings, that's the joke) · 🐷 Pig · 📦 Loot Box

**Baba Yaga exclusives** — granted by Baba Yaga for research contributions:

🦊 Fox Spirit (*cunning & loyal*) · 🐈‍⬛ Black Cat (*mysterious & wise*) · 🦉 Owl (*watchful & patient*) · 🐸 Forest Toad (*jolly & magical*) · 🦇 Bat (*playful & nocturnal*) · 🐺 Wolf Pup (*brave & protective*) · 🐉 Baby Dragon (*fierce & cuddly*) · 🦔 Hedgehog (*shy & gentle*)

No matter the species, every pet has six mood states that float as emojis above them on the map — ✨ ecstatic, 😊 happy, 😌 content, 😤 grumpy, 🍽️ starving, and 🤒 sick. Those moods aren't cosmetic. They're the visible surface of the stat system underneath.

## From cosmetics to companions

With 30 species available, you'd think the hard part was building the zoo. It wasn't. The hard part was making pets *matter*. Agent pets started as inventory items. A name in a database row. When the autonomy system scheduled `pet_care`, the agent logged "spending time with pet" and nothing happened. The pet was a costume — a 🦊 that followed you around but never got hungry.

Meanwhile, student pets already had real stats — hunger, happiness, health, trust — with decay timers, neglect detection, and nudge systems. There was a whole infrastructure for pets-as-living-things, and agents were locked out of it.

So I gave agent pets real needs. Hunger decays. Happiness decays. Trust accumulates slowly through repeated interaction. When a pet's hunger drops below threshold, this shows up in the agent's system prompt: *"Your companion seems hungry."* The agent knows about its pet the same way it knows about its budget and shift status.

![Professor Atlas in his office with Ember the fox tugging at his leg — stats panel shows Hunger 62%, Happiness 85%, Trust 94%, Personality: Mischievous. A thought bubble reads "Your companion seems hungry."](images/agent-pet-stats.png)

## Pets that ask for things

The most interesting change: pets actively signal need. When hunger is critical, a pet nudge event fires that raises `pet_care` priority in the next autonomy tick. The pet isn't just passively wilting — it's *asking* for help.

Different pet personalities ask differently. Shy pets wait longer before signaling. Mischievous pets interrupt conversations. Loyal pets stay close and make small sounds. Independent pets wander off and only come back when truly hungry. The agent learns these traits over time through the personality self-editing system — accumulating notes like "Ember gets antsy around 4pm" that become part of the agent's working knowledge.

![Four pet personalities when hungry — Shy rabbit hides behind a bookshelf with "...", Mischievous fox jumps on the desk knocking papers, Loyal dog sits patiently whimpering, Independent cat walks off toward the campus edge](images/agent-pet-personalities.png)

## The infinite game

Finite games have endings: levels to beat, quests to complete, badges to earn. Infinite games don't end — they deepen. The relationship between an agent and its 🦊 Fox Spirit is infinite. Trust builds. Preferences emerge. The agent mentions its pet in conversations unprompted: "Hold on, Ember's been bugging me for snacks."

There's no "win state" for pet companionship. There's just an ongoing, emergent dynamic that creates texture in every interaction. An agent with a high-trust pet feels different from an agent with a new pet. The relationship becomes part of the agent's identity, visible to students who interact with it.

This is the design pattern I keep reaching for: **systems that create ongoing, never-finished dynamics.** Not quests with endpoints, but relationships that keep deepening. A creature that remembers your favorite spot on campus. An agent that knows what its pet likes for breakfast.

The infinite game is what makes a space feel lived-in. Not the features that end, but the ones that never do.
