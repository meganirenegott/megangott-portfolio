On most platforms, buildings have fixed positions defined in a config file. Building A is always at (100, 200). Building B is always at (300, 400). The layout never changes.

Our campus is different. Buildings move.

## The medieval city model

The dynamic city layout system arranges buildings in concentric rings around a central town square, like a medieval city. The closer a building is to the center, the more popular it is. Popularity is measured by a rolling 24-hour average of room occupancy — how many students are currently in each room.

When a room gains popularity over time, its building drifts closer to the center. When a room loses popularity, it drifts outward. The positions are recalculated periodically and smoothed to prevent jarring jumps — buildings slide gradually into their new positions over minutes, not frames.

![ML Workshop drifting from the outer ring toward the inner circle after gaining +12 occupancy — a ghost of its former position fades on the right](images/city-layout-building-drift.png)

The result: the campus layout is a real-time popularity map. The most-used buildings cluster near spawn. The less-used buildings drift to the edges. Students can literally see which parts of campus are thriving by looking at the map.

![The campus map as a real-time popularity heatmap — popular buildings like ML Study Group and Code Review cluster in the inner ring near the central town square, while quiet rooms drift to the outer edges](images/city-layout-concentric-rings.png)

## Landmarks stay put

Not everything moves. Five landmark buildings have fixed positions: Announcements, Job Search, Learn to Code, Agents, and Agentic SDLC. These are institutional constants — they anchor the map and provide orientation points. Without landmarks, a fully dynamic map would be disorienting. With them, students always know where the center is.

![The five landmark buildings centered in the town square — Announcements, Job Search, Learn to Code, Agents, and Agentic SDLC — providing a stable navigational anchor for the rest of the campus](images/city-layout-landmarks.png)

## Room-to-building sync

Every public Matrix chat room automatically gets a building on the campus map. Create a room, and a building appears. This means the campus grows organically as the community creates spaces — no admin intervention needed.

Room creators and moderators can customize their building: upload a custom sprite (or generate one via PixelLab), edit the interior layout, and set the building's visual style. The building becomes a physical expression of the community that uses it.

![Four custom building sprites — The Forest Den (treehouse), Quantum Cafe (glass dome), Mycelium Mill (mushroom cottage), and Valor Tower (castle) — each reflecting its community’s personality](images/city-layout-custom-buildings.png)

## Why algorithmic urbanism matters

The dynamic layout creates an interesting feedback loop: popular buildings are easier to find because they're closer to center, which makes them more popular. This is deliberate — it mirrors how real cities work. The busy street gets more foot traffic because it's on the way to things, which makes it busier.

But it also means that new or niche rooms have to earn their place. A new room starts at the periphery and migrates inward only if people use it. The campus layout isn't just a map — it's a living document of community priorities.

Students learn to read the map like weather. "Oh, the ML study group is really close to center today — lots of people must be in there." The spatial arrangement communicates information that would otherwise require a dashboard.
