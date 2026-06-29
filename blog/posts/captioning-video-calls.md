Our campus isn't just a game world with pixel art and fishing ponds. It's also where students attend class. Real classes, with real instructors, over video calls built directly into the platform. Students walk their avatar to a classroom building, click to enter, and they're in a live video conference with their cohort. The game *is* the school.

That means video conferencing isn't a third-party integration we bolted on. It's a core piece of infrastructure, and the quality of that experience directly affects whether students can learn.

## Captioning as a priority, not an afterthought

I'm hard of hearing. When our team started building live captioning into the video call system, I was in the room helping design the specs. I sat with the other developers as we planned out how these features should work, what the edge cases were, and what "good enough" actually meant for someone who depends on captions to follow a conversation.

Captioning and transcription are tools I use every day in my work. I've tried a lot of different services over the years, so I came into this with strong opinions about what works, what doesn't, and where most solutions fall short. That experience meant I wasn't just reviewing specs after they were written. I was shaping them. When we discussed how long a caption could lag before it stopped being useful, I had the answer because I live it. When we debated whether to auto-start transcription or require a toggle, I could say from experience what the friction of an extra click feels like when you're already trying to keep up. And then once features shipped, I was one of the primary testers, because I catch things a hearing tester might not flag. For them captions are a feature. For me they're how I participate.

## What the team built

The captioning system went through several major iterations. I was part of the planning for each one and testing every build. The engineering work was substantial:

**Voice Activity Detection (VAD).** The system uses a state machine to detect when someone is actually speaking versus ambient noise. Early versions would transcribe keyboard clicks, background music, someone's dog barking. The VAD pipeline improved to speculative-start detection, where it begins buffering audio at the first hint of speech and only commits to transcription once it confirms a real utterance.

**Whisper transcription with hallucination filtering.** The audio chunks go to Whisper for transcription. Raw Whisper output sometimes hallucinates, repeating phrases or inserting text that was never spoken. The team built a dedup layer and hallucination filter that catches these artifacts. I helped identify the patterns because I'd see them in real-time during calls and flag exactly what went wrong.

**Latency tuning.** Shorter audio chunks processed in parallel, with client-side reordering so captions arrive in the right sequence. This was one of the changes I pushed hardest for. Captions that arrive three seconds after someone speaks are decorative, not functional. By the time you read them, the conversation has moved on.

**Mic-mute awareness.** An early bug: the system kept transcribing even when someone's mic was muted, picking up bleed-through audio and generating ghost captions. The fix tied transcription state to the mic mute toggle so captions stop cleanly when you mute.

**CC toggle and faculty controls.** The UI gives users a CC button to show or hide the caption overlay, and faculty get panel-level controls for room-wide caption settings. Transcription auto-starts when you join a call, so captions are always available if you need them.

## Built by people who need these tools

There's a specific quality that shows up when accessibility features are tested by people with disabilities, and it's hard to describe without sounding like a platitude. But the difference is real.

Compliance says "we have captions." Testing with lived experience says "the captions are actually good enough to learn from." A hearing QA tester checks that captions appear. I sit through a 45-minute class reading only the captions and say "this technical term keeps getting transcribed wrong, students hear it every day, we need to add it to the filter." That's a different kind of feedback, and it produces a different kind of product.

The team building this, the engineers writing the VAD state machines and Whisper integrations and Redis helpers, they're building it with real feedback from someone who needs it daily. That loop between building and testing with lived experience is what makes the difference between an accessibility feature and an accessibility feature that actually works.

## The broader context

The campus serves students around the world. Different time zones, different internet speeds, different hardware, different native languages. Captioning and transcription aren't just accessibility features for hard of hearing users. They help students learning in their second language. They help students in noisy environments. They help students who process information better by reading than by listening.

I know what it's like to be a student who can't hear and has to rely on documentation to fill in the gaps from lectures. You miss a word, you miss a concept, and then you're spending twice as long after class piecing things together from docs and Stack Overflow. Learning to code has its own set of challenges on top of that. So much of programming education happens through live instruction, pair programming, and verbal walkthroughs where someone talks through their thinking out loud.

This is one area where learning to code with AI has been genuinely transformative for me. Having an AI that I can ask "what did this concept mean" or "why isn't this working" on my own time, without needing to hear a lecture or wait for office hours, has been extremely helpful. It's become a core part of how I research, debug, and learn additional developer tools and accessibility tools. It fills the gaps that captions can't always cover.

When we prioritize captioning quality, we're not building a niche feature for a small group. We're making the entire learning experience better for everyone. That's what accessibility work looks like when it's done with care: it lifts the floor for the whole platform.
