This isn't a campus feature. It's a separate project entirely — a searchable database of mutual aid resources organized by state, built for Multiverse School students who need real-world support.

## What it is

The Multiverse Mutual Aid Database is a static web application (HTML + CSS + JavaScript + Leaflet.js maps) that catalogs community resources across the United States:

- **Housing**: shelters, transitional housing, rental assistance programs
- **Food**: food banks, community fridges, meal programs, SNAP assistance
- **Transportation**: transit passes, ride-share programs, vehicle repair assistance
- **Education**: tutoring, GED programs, scholarship databases, digital literacy
- **Library**: public library programs, free WiFi locations, computer access
- **Healthcare**: community clinics, mental health services, harm reduction
- **Legal**: immigration assistance, tenant rights, expungement clinics

Resources are filterable by state and by identity — 10 identity filters that help students find organizations specifically serving their communities.

## Why I built it

Coding bootcamp students face a particular constellation of challenges: they're in an intense program, often transitioning careers, sometimes relocating, frequently experiencing financial pressure. The skills they're learning will help long-term, but they need support *now* — this week, this month.

Most mutual aid directories are local and scattered. You have to know which organizations exist in your area, and you have to find them through word-of-mouth or scattered Google searches. I wanted one place where any Multiverse student could go, select their state, and immediately see what's available.

## The design choices

The interface uses a map (Leaflet.js) as the primary navigation metaphor, with a filterable resource database below. Each resource entry includes the organization name, description, contact info, service area, eligibility requirements, and direct links.

Users can suggest new resources via a "Suggest a Resource" button — community-sourced, because local knowledge is always more current than any curated database.

The site is static — no server, no database, no authentication. Resources are stored in JSON files and loaded client-side. This keeps the infrastructure cost at zero and ensures the site stays up even if everything else goes down. A mutual aid resource directory shouldn't require server maintenance to remain available.

## What it means

The Mutual Aid Database sits outside the game design philosophy that drives the campus features. There's no whimsy here. No capybaras. No cherry blossoms. It's a tool that helps people find food, housing, and healthcare.

But it comes from the same place: the belief that the platforms we build for learners should care about learners as whole people, not just as students. A student who's worried about rent can't focus on learning to code. Removing that friction — or at least pointing toward resources that can help — is as much a part of education technology as any clever game mechanic.

Sometimes the most important feature you can build isn't a feature at all. It's a directory.
