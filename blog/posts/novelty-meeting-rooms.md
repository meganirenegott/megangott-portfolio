When I needed to build a meeting room system for our virtual campus, I had a choice. I could put up five rectangular rooms with names like "Conference Room A" and "Meeting Space 2." Functional. Clean. Forgettable.

Instead, I built a giant duck.

![Five novelty architecture meeting rooms on campus: a massive yellow Giant Duck building, a pink frosted Donut, a brown Shoe Room, a Coffee Cup with steam rising from the top, and a Hot Dog Hut. Students mill about on pathways between the buildings.](images/novelty-meeting-rooms.png)

## Real novelty architecture, recreated on campus

These buildings are based on real-world novelty architecture, buildings shaped like the things they sell or represent. This is a real architectural tradition called *mimetic architecture*, and it produced some of the most delightfully absurd structures in America. It's not really on trend anymore in public spaces, but a virtual campus is the perfect place to bring it back.

**The Giant Duck**, modeled after the Big Duck in Flanders, Long Island (1931). Originally a duck farm store shaped like a 20-foot duck. Ours is a meeting room. You walk into the duck. You have your meeting inside the duck.

**The Basket**, inspired by the Longaberger Company Headquarters in Newark, Ohio. A seven-story office building shaped like a giant basket, complete with handles. The company made baskets. They built their headquarters to match. Our version seats up to 6 and has woven-wall interior decorations.

**The Teapot**, based on the Teapot Dome Service Station in Zillah, Washington. Built in 1922 as a political protest (it's a long story involving a government scandal), it's a gas station shaped like a teapot. Our teapot has a cozy interior with steam particle effects.

**The Whale Belly**, inspired by a whale-shaped museum in Gothenburg, Sweden. You enter through the mouth. The interior has ribbed walls and blue lighting. Meetings inside the whale have a different energy.

**The Donut**, modeled after The Donut Hole in La Puente, California. A drive-through donut shop where you literally drive through a giant donut. Our version is a circular meeting room with frosted-sprinkle interior textures.

## Why the container changes the meeting

Nobody wants to be in a meeting room. Meetings interrupt flow. The default emotional register of "we need to have a meeting" is mild dread.

But "we need to have a meeting inside the whale" is a fundamentally different sentence. The absurdity of the container changes the energy of the activity. You're not going to a meeting. You're going into the whale.

This is the same principle behind theme park queue lines. Disney doesn't make you wait in a roped-off corridor. They make you wait inside the story. The waiting is the same duration, but the experience of waiting is completely different because the space communicates that something interesting is happening.

## The reservation system

Each room has a full reservation system:

- **Availability checking**: See which rooms are free for the next 24 hours.
- **Double-booking prevention**: Two groups can't reserve the same room at the same time.
- **Invitations and RSVP**: The organizer invites participants. Each person gets an RSVP (accept/decline).
- **Auto-lock privacy**: When all invited participants arrive inside the building, the room locks to outsiders. Your meeting in the whale is private.
- **Auto-unlock on expiry**: When the reserved time expires, the room reopens. No zombie reservations.

The auto-lock behavior is the most interesting piece. It uses the presence system to track who's inside the building's bounding box. When the set of present players matches the invited set, a socket event locks the door. Anyone who walks up after that sees a "Meeting in Progress" indicator but can't enter. When the reservation expires, the lock drops automatically.

## The suggestion board

After building the five rooms, I added a community suggestion board. Students can propose what the next novelty building should be. Submit a name, a description, and optionally a reference URL to the real-world inspiration. Other students vote.

The voting system is simple: one vote per student per suggestion, toggle on/off. Suggestions sort by vote count. Authors auto-vote on their own. Authors can delete their own suggestions.

This turned building design into a democratic process. Students started researching real-world novelty architecture to submit suggestions. "Can we have a meeting room shaped like a giant shoe? There's a real one in Pennsylvania!" "What about the pineapple building in Scotland?" The suggestion board generated more engagement than the meeting rooms themselves.

Letting users participate in building the world they inhabit is a pattern I keep reusing. People care more about a space they helped shape.

## The technical details

Each meeting room is a building entry in the world layout with a themed interior. The interiors use the existing building-entry system but with custom decoration sets per room: the whale has ribbed walls and blue lighting, the duck has feathered textures and egg-shaped furniture, the donut has frosted surfaces and sprinkle patterns.

The reservation system is a standalone service (`meetingRooms.ts`) with its own Zustand store (`meetingStore.ts`) on the client side. The `MeetingRoomPanel` component shows the reservation form, upcoming bookings, and the suggestion board in a tabbed layout.

Database tables: `meeting_rooms` (room metadata), `meeting_reservations` (bookings), `meeting_invitations` (per-participant RSVPs), `room_suggestions` (user proposals), and `room_suggestion_votes` (votes).

The whole thing shipped in a single commit: five themed buildings, a reservation system with invitations and privacy, and a community suggestion board.
