This isn't a campus feature. It's a separate project: a searchable database of mutual aid resources organized by state, built for Multiverse School students who need real-world support.

## What it is

The Multiverse Mutual Aid Directory is a static web application (HTML + CSS + JavaScript + Leaflet.js maps) that catalogs community resources across the United States:

- **Housing**: shelters, transitional housing, rental assistance programs
- **Food**: food banks, community fridges, meal programs, SNAP assistance
- **Transportation**: transit passes, ride-share programs, vehicle repair assistance
- **Education**: tutoring, GED programs, scholarship databases, digital literacy
- **Library**: public library programs, free WiFi locations, computer access
- **Healthcare**: community clinics, mental health services, harm reduction
- **Legal**: immigration assistance, tenant rights, expungement clinics

Resources are filterable by state and by identity, with 10 identity filters that help students find organizations specifically serving their communities.

![Seven resource categories: Housing, Food, Transportation, Education, Library, Healthcare, Legal, each with an icon, resource count, and example subtypes. Below, 10 identity filter badges including BIPOC, LGBTQ+, Disability, Veteran, Immigrant/Refugee, and more](images/mutual-aid-categories.png)

## Why I built it

Students at a coding school face a specific set of challenges: they're in an intense program, often transitioning careers, sometimes relocating, frequently dealing with financial pressure. The skills they're learning will help long-term, but they need support now. This week, this month.

Most mutual aid directories are local and scattered. You have to know which organizations exist in your area, and you have to find them through word of mouth or scattered Google searches. I wanted one place where any Multiverse student could go, select their state, and immediately see what's available.

## The design choices

The interface uses a map (Leaflet.js) as the primary navigation, with a filterable resource database below. Each resource entry includes the organization name, description, contact info, service area, eligibility requirements, and direct links.

![The Multiverse Mutual Aid Directory, a Leaflet.js map of the United States with color-coded pins for housing, food, healthcare, legal, and education resources. A filter panel on the left with category checkboxes and a state selector showing California. Resource cards below list organizations with contact info and service areas.](images/mutual-aid-map.png)

Users can suggest new resources via a "Suggest a Resource" button, because local knowledge is always more current than any curated database.

![Resource cards for New York showing the NYC Coalition for Housing Justice, City Harvest Food Rescue, and Stuyvesant Heights Legal Services, each with category badges, descriptions, addresses, phone numbers, and eligibility info. Category filter pills across the top and a "Suggest a Resource" button at the bottom.](images/mutual-aid-resource-cards.png)

The site is static: no server, no database, no authentication. Resources are stored in JSON files and loaded client-side. This keeps the infrastructure cost at zero and means the site stays up even if everything else goes down. A mutual aid directory shouldn't require server maintenance to remain available.

## Why it sits outside the campus

The Mutual Aid Directory has no whimsy. No capybaras. No cherry blossoms. It's a tool that helps people find food, housing, and healthcare.

But it comes from the same place as the rest of the campus: if you're building a platform for learners, you should care about them as whole people. A student who's worried about rent can't focus on learning to code. Pointing them toward resources that can help is as much a part of what we do as any game mechanic or curriculum feature.
