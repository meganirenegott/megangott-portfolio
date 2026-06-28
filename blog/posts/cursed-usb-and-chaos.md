You wouldn't plug a mysterious USB drive into your computer, right?

That's digital safety 101. Don't click unknown links. Don't open attachments from strangers. Don't stick a random thumb drive into your laptop just because someone left it on a table. Everyone knows this. Very few people actually follow it, because curiosity is stronger than caution.

So we made it a feature.

## The Cursed USB Drive

The Cursed USB Drive is an item you can receive on campus. It's rated "Abhorrent," a rarity tier we invented for things that are too wonderfully weird for any normal category. When you inspect it, it starts playfully shuffling your UI styles. Your sidebar might tilt. Your font changes to something unexpected. Your color scheme goes somewhere you didn't ask for.

Nothing breaks. You can still work, still code, still navigate. It's a cosmetic remix of your own interface, and it looks terrible in the best way.

![The Cursed USB Drive: "No one knows what is on it. That is for the best."](images/odd-items-cursed-usb.png)

As a developer, this was also a chance to play with the "worst UI" awards concept. There's a whole genre of intentionally bad design that's genuinely funny: text that's technically readable but rotated 3 degrees, colors that clash on purpose, buttons that drift slightly when you hover. The Cursed USB Drive turns your campus interface into a contestant, and the result is always worth screenshotting.

## Digital safety advice, but make it a toy

The items in this post are all digital safety lessons disguised as jokes. Each one takes a real piece of advice and turns it into something you can hold, use, and laugh about.

### 🐍 Box of Snakes

**Rarity:** Common · **Source:** Baba Yaga (15%)

*"You open your email and out pours a box of snakes. Who would send this?"*

Don't open suspicious attachments. This one is suspicious. You open it anyway because it's a game, and out comes a surprise. The lesson sticks because the experience is memorable: you clicked the thing you shouldn't have clicked, and something wild happened.

![The Box of Snakes: "Something is moving inside. Shaking it seems unwise."](images/odd-items-box-of-snakes.png)

### 📊 Almost Done Project™

**Rarity:** Epic · **Source:** Cornelius (20%)

When you hold this item, a cosmetic "Scope Creep" counter starts ticking up. The tasks aren't real. It's a knowing nod to every developer who's ever said "just one more thing" and watched the project triple in size.

This one isn't a safety lesson, it's a work culture roast. But it earns its place because the recognition is instant. Every developer who sees "It has been 'almost done' for six weeks" has lived that exact sentence.

![The Almost Done Project™: "It has been 'almost done' for six weeks."](images/odd-items-almost-done.png)

### 💭 Unsolicited Opinion

**Rarity:** Abhorrent · **Source:** Emma Goldman (30%)

When you hold this item, it auto-sends well-meaning but unsolicited suggestions in chat. Other people can see them. They know you have the item. Everyone laughs.

The safety angle here is about social engineering. Real phishing often comes disguised as helpful advice from someone who seems like they're looking out for you. The Unsolicited Opinion is the friendly, harmless version of that pattern: unsolicited input that's technically nice but nobody asked for.

## Why "worst UI" is actually good UI design

Building the Cursed USB Drive meant writing a system that intentionally makes things worse, which turns out to be a surprisingly interesting design problem. The style overrides have to be noticeable but not unusable. Funny but not frustrating. Broken-looking but still functional.

The pool of effects includes gentle rotations, color shifts, font swaps, and layout nudges. Each one is hand-tuned to land in the sweet spot between "this is wrong" and "I love this." It's the opposite of my normal job, where I spend all day making sure nothing looks broken. Here, the broken look *is* the feature.

```css
/* One of the Cursed USB style overrides */
.cursed-tilt {
  transform: rotate(-2deg);
  filter: hue-rotate(45deg);
  font-family: 'Comic Sans MS', cursive;
  transition: all 0.5s ease;
}
```

Students who get the Cursed USB Drive tend to keep the shuffled styles for a while. It becomes a badge: "yeah, I plugged in the USB." Which, if you think about it, is exactly what happens in real life too. People plug in the USB. At least here, the worst thing that happens is Comic Sans.

And that's the other thing worth mentioning: none of this is permanent. Discard the item and your settings snap right back to normal. No lasting damage, no consequences you can't undo. It's a safe way to make a mistake, see what happens, and learn from it without any real cost. That matters in a place where people are already dealing with enough real errors in their code. The items let you be curious and reckless in a space where reckless is fine.
