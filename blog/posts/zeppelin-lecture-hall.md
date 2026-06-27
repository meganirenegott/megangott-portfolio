When enrollment spikes and a lecture needs to seat 200 students, we don't open a big room. We launch a zeppelin.

## How it works

The Zeppelin Lecture Hall is a dirigible that exists in two states on the campus map:

**Landed**: The zeppelin sits on a launch pad, tethered, deflated to half-height. Students can see it from across campus — it's the largest single object on the map. A countdown timer shows the next scheduled lecture.

**Airborne**: When a lecture begins, the zeppelin inflates (a canvas animation that scales the sprite vertically over 3 seconds), the tethers release, and it lifts off. Students who boarded during the countdown are inside. Students who missed the window see it floating above the campus, unreachable until it lands again.

The boarding sequence uses a `ZeppelinBoardingOverlay` — a countdown timer with a live participant list, showing who's already aboard and how many seats remain. The overlay creates urgency: you can see the timer ticking down and your classmates' names appearing. It feels like boarding a flight, not joining a Zoom call.

## Inside the zeppelin

The interior is a BigBlueButton video conference session embedded in an iframe, wrapped in a custom `ZeppelinInterior` component. A status bar shows session duration, participant count, and recording status.

The BBB integration required implementing the checksum authentication system (46 tests for the auth flow alone) and managing the full session lifecycle state machine: scheduled → boarding → airborne → ending → landed. Each state transition is validated and broadcast via socket, so the zeppelin's visual state on everyone's map stays synchronized.

## Why the metaphor matters

A Zoom link says: "Here's a meeting." A zeppelin that lands, opens its doors, counts down, lifts off, and floats above the campus with everyone inside says: "This is an *event*."

The framing changes attendance psychology. Missing a Zoom link feels like forgetting a tab. Missing the zeppelin feels like missing the boat — literally. The countdown creates commitment. The visual of the airship floating overhead creates FOMO for the students who didn't board.

Lectures are the same content either way. But a lecture in a zeppelin is a story, and stories are what people show up for.
