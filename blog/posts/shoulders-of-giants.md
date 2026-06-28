Inside the Alabaster Tower — the growing research library — there's a basement level that most students discover by accident. You take the stairs down instead of up, and you find yourself in a long hallway lined with portraits.

Every portrait is an author.

## The Hall of Portraits

When a student cites a research paper, the system records the paper's authors. The Shoulders of Giants Basement maintains a gallery where every cited author gets a portrait frame — generated dynamically as the research library grows.

The portraits use a JRPG-style dialogue display system (shared with the Baba Yaga and Pizza Book Club interfaces). Walk up to a portrait and press E, and you get the author's name, their most-cited work on campus, and a short generated blurb about their contribution to the field. The portrait styling reuses the `BytePortrait` component — the same pixel-art-framed character display used throughout the campus UI.

![The Shoulders of Giants hallway — stone walls, red carpet, torchlight, and ornate golden frames with portraits of Dr. Sarah Chen, Prof. Elias Vance, Dr. Aisha Khan, and more](images/portraits-hallway.png)

![A student interacts with Dr. Ada Lovelace's portrait — a JRPG dialogue box shows her name, most-cited work ("Notes on the Analytical Engine", cited 14 times), and a blurb about her contribution](images/portraits-dialogue.png)

## Why acknowledge the sources

The name "Shoulders of Giants" comes from Newton's letter to Hooke: "If I have seen further, it is by standing on the shoulders of giants." It's the foundational metaphor for academic citation — every new idea builds on the work of people who came before.

Most learning platforms treat citations as metadata. A footnote. A required field in a submission form. The Shoulders of Giants Basement treats them as *people*. Real humans who did real work that made your learning possible. Putting their portraits on a wall, in a gallery you can walk through, changes the relationship from "required reference" to "acknowledged ancestor."

The more research the campus produces, the longer the hallway gets. More portraits. More giants. The basement is a physical manifestation of the idea that knowledge is cumulative and that the people who built it deserve to be remembered.

## The small details

Each portrait frame has a subtle glow intensity proportional to how many times that author has been cited on campus. The most-cited authors have brighter frames — not dramatically, just enough that your eye is drawn to the names that keep coming up. It's a quiet leaderboard of influence.

When a new author is cited for the first time, a small announcement appears in the campus feed: "📚 New portrait added to the Shoulders of Giants: [Author Name]." The basement grows, one frame at a time, as students read and cite and build.

![A new portrait materializes on the wall — Dr. Yoshua Bengio's frame shimmers with golden sparkles as a campus notification announces the addition, alongside existing portraits of Geoffrey Hinton, Yann LeCun, and Dr. Fei-Fei Li](images/portraits-new-addition.png)
