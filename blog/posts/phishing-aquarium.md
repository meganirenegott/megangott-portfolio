We do a lot upfront to discourage and minimize phishing on our campus. Spam filters, verification layers, proactive moderation. This is the internet though, and sometimes people get in who want to scam students in chat. It doesn't happen often, but when it does, we ban them.

And then we turn them into fish.

![The Phishing Training Tank. Scammer fish swim around with their sanitized tactics in thought bubbles.](images/phishing-aquarium-hero.png)

## The idea

When someone on campus breaks the code of conduct with a phishing attempt (a "click this link to win" message, a fake urgent notice, a too-good-to-be-true job offer) an admin bans the account and marks the message as phishing. Most moderation systems stop there.

Ours keeps going, because this is a school after all, and education matters.

The message gets sanitized: all URLs are stripped, email addresses are removed, any clickable links become `[link removed]`. What remains is the *text*, the social engineering, the urgency, the emotional manipulation. The part students need to learn to recognize.

That sanitized text becomes a fish. It joins the Phishing Training Tank in the Campus Aquarium, where it swims around with other scammer fish forever, periodically displaying its tactic in a thought bubble. The consequence for trying to phish our students? You're a digital fish now, permanently on display.

## How the sanitizer works

The sanitizer is deliberately conservative. It removes anything a student might accidentally click:

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

![The Campus Aquarium, showing multiple tanks with different zones, including the Phishing Training Tank.](images/phishing-aquarium-demo-full.png)

The Campus Aquarium is a building on campus with a Phishing Training Tank. Inside the tank, scammer fish swim around in real-time. Each fish is one of four species (a crab, an octopus, a puffer fish, or a shark) randomly assigned when the phishing report is created.

![Close-up of the Phishing Training Tank. Scammer fish swimming with their sanitized tactics in thought bubbles.](images/phishing-aquarium-demo-tank.png)

The fish drift around the tank with simple physics: velocity-based movement, wall bouncing, and periodic direction changes. Every few seconds, a fish displays its thought bubble, the sanitized phishing text floating above it like the most transparent inner monologue in the animal kingdom.

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

Turning a phishing attempt into a fish does something nice: it transforms a scary experience into something students can study safely. The scam that was designed to manipulate you is now a little pixel crab drifting left to right with "Congratulations you've been selected!!!" floating above its head. It's hard to be scared of a cartoon crab.

Students can walk up to the tank, watch the fish swim, read the tactics, and start to notice the patterns: the artificial urgency, the too-good-to-be-true offers, the requests for personal information. It's phishing education that feels like visiting an aquarium instead of sitting through a compliance checklist.

## The Denise connection

The aquarium is also home to Denise, a friendly goldfish NPC who serves as the phishing training guide. She lives in the tank alongside the scammer fish and offers context about each tactic: why it works, what to look for, and how to protect yourself.

Having a friendly character in the same space as the scammer fish keeps the tone right. The aquarium isn't a hall of shame, it's a classroom. The scammer fish are exhibits, not trophies. Denise helps frame each one as a learning moment.

## What I love about this feature

Phishing attempts on our campus are rare, and we work hard to keep it that way. But when they do happen, banning the account is just step one. The aquarium turns a frustrating moment into something genuinely good for the community. Every phishing attempt that gets reported makes the aquarium a little richer and the students a little more prepared.

You came to our campus to phish? You're a fish now. Forever. Your tactics are on permanent display, stripped of their links, teaching the very people you tried to exploit to recognize the patterns. The on-the-rare-occasion the aquarium grows, the community gets a little better at spotting what phishing looks like.

And the fish are kind of cute, honestly. Even the shark.
