Our campus has a phishing problem. Not the kind you fix with a spam filter — the kind where real people try to scam students in chat. It happens on every online platform, and ours is no exception.

Most platforms handle this with a ban button and a warning email. We built an aquarium.

![The Phishing Training Tank — scammer fish swim around with their sanitized tactics in thought bubbles](images/phishing-aquarium-hero.png)

## The idea

When someone on campus breaks the code of conduct with a phishing attempt — a "click this link to win" message, a fake urgent notice, a too-good-to-be-true job offer — an admin marks the message as phishing. That's where most moderation systems stop.

Ours is where it starts.

The message gets sanitized: all URLs are stripped, email addresses are removed, any clickable links become `[link removed]`. What remains is the *text* — the social engineering, the urgency, the emotional manipulation. The part students need to learn to recognize.

That sanitized text becomes a fish. It joins the Phishing Training Tank in the Campus Aquarium, where it swims around with other scammer fish, periodically displaying its tactic in a thought bubble.

## How the sanitizer works

The sanitizer is deliberately conservative — it removes anything a student might accidentally click:

```
"Click here https://evil.com/steal to win"
→ "Click here [link removed] to win"

"Visit [this site](https://evil.com)"
→ "Visit [link removed]"

"Reply to admin@fakesite.com"
→ "Reply to [email removed]"
```

What's left is pure educational content: the *language* of phishing. The urgency ("Act now!"), the authority ("This is from your administrator"), the emotional hook ("You've been selected"). Students can study the patterns without any risk of exposure to the actual scam.

## The aquarium

![The Campus Aquarium — multiple tanks with different zones, including the Phishing Training Tank](images/phishing-aquarium-demo-full.png)

The Campus Aquarium is a building on campus with a Phishing Training Tank. Inside the tank, scammer fish swim around in real-time. Each fish is one of four species — a crab, an octopus, a puffer fish, or a shark — randomly assigned when the phishing report is created.

![Close-up of the Phishing Training Tank — scammer fish swimming with their sanitized tactics in thought bubbles](images/phishing-aquarium-demo-tank.png)

The fish drift around the tank with simple physics: velocity-based movement, wall bouncing, and periodic direction changes. Every few seconds, a fish displays its thought bubble — the sanitized phishing text floating above it like the most transparent inner monologue in the animal kingdom.

```typescript
const SCAMMER_SPRITES = ['scam-crab', 'scam-octopus',
                         'scam-puffer', 'scam-shark']

function createFishFromExample(id: string, sanitizedText: string) {
  return {
    id,
    sanitizedText,
    spriteType: SCAMMER_SPRITES[Math.floor(Math.random() * 4)],
    x: randomInRange(TANK_BOUNDS.x, TANK_BOUNDS.width),
    y: randomInRange(TANK_BOUNDS.y, TANK_BOUNDS.height),
    vx: randomInRange(-20, 20),
    vy: randomInRange(-10, 10),
    thoughtTimer: randomInRange(3000, 8000),
    showingThought: false,
  }
}
```

The best part: it's live. When an admin marks a new phishing attempt, the system emits a `phishing:created` socket event and a new fish spawns in the tank in real-time. If you happen to be visiting the aquarium when a phishing report comes in, you see a new fish appear and start swimming.

## Why a fish?

The fishing/phishing pun is obvious. But the design choice runs deeper.

Turning a phishing attempt into a fish does something subtle: it transforms a scary, violating experience into something students can study from a position of safety. The scam that was designed to manipulate you is now a little pixel crab drifting left to right with "Congratulations you've been selected!!!" floating above its head. The power dynamic has completely inverted.

Students can walk up to the tank, watch the fish swim, read the tactics, and build pattern recognition. They start to see the common threads: the artificial urgency, the too-good-to-be-true offers, the requests for personal information. This is phishing training that doesn't feel like a compliance checklist — it feels like visiting an aquarium.

## The Denise connection

The aquarium is also home to Denise, a friendly goldfish NPC who serves as the phishing training guide. She lives in the tank alongside the scammer fish and offers context about each tactic — why it works, what to look for, and how to protect yourself.

Having a warm, approachable character in the same space as the scammer fish is a deliberate tonal choice. The aquarium isn't a hall of shame — it's a classroom. The scammer fish are exhibits, not trophies. Denise helps frame each one as a learning opportunity.

## What I love about this feature

This feature started with a frustrating problem — people try to scam our students — and turned it into something genuinely good for the community. Every phishing attempt that gets reported makes the aquarium a little richer and the community a little safer. The scammers are, unwittingly, contributing to the very security education they were trying to undermine.

There's a poetic justice to it. You came to our campus to phish? Congratulations — you're a fish now. Your tactics are on permanent display, stripped of their teeth, educating the very people you tried to exploit. The sanitizer removed your links but kept your words, and those words are teaching our students to never fall for them.

The aquarium grows every time someone breaks the code of conduct, and every time it grows, the community gets better at recognizing what phishing looks like. It's a moderation system that gets stronger with every attack.

And the fish are kind of cute, honestly. Even the shark.
