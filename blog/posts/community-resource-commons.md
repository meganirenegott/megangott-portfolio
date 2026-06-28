When our school had a few hundred students, mutual aid was personal. Someone needed help finding a food bank, a facilitator knew one, they made the connection. One person, one conversation, one resource.

As the school grew past 8,000 students, that process had to grow with it. Not because people stopped caring, but because the volume outpaced what one-on-one referrals could handle. Students were waiting for a human to be available before they could look up a food bank. The resource data lived in a static JSON file that only a developer could update. And organizations change their info all the time, so things got stale fast.

The Community Resource Commons is what mutual aid looks like at scale. It's a community-maintained, self-service resource library with an AI-assisted review pipeline that keeps quality high without burying the admin team.

## How the system grew

The [first version of the Mutual Aid Database](/blog/post.html?slug=mutual-aid-database) was a static site with Leaflet.js maps and a JSON file I curated by hand. That was the right tool for a small school. As we grew, three things needed to change: community members needed to be able to contribute resources themselves, students needed to be able to look things up without asking someone, and the data needed to stay current automatically.

So I designed the Commons around three layers:

**A public resource browser** where anyone can search by location and category without creating an account. Someone in crisis at 2 AM should never hit a login wall before finding a food bank. That was a non-negotiable.

**A contributor portal** where verified community members submit resources they know about. Registration is passwordless, just email verification. No passwords to manage, no OAuth complexity. Contributors choose whether a resource should be publicly browsable or shared only through private referral.

**An AI-assisted review pipeline** that handles the mechanical verification (does this URL work? is this a real organization? does the category match?) so humans can focus on the judgment calls.

![The Community Resource Commons public browser — a search interface with category filter buttons for Housing, Food, Healthcare, Legal, Education, Transportation, and Library. A location filter dropdown shows regional options. Resource cards display organization names, category badges, descriptions, and contact info. No login required.](images/commons-resource-browser.png)

## The AI review pipeline

This was the most interesting engineering problem. The goal was to keep the door open for community contributions while making sure nothing unsafe or broken reaches the public library, without creating a review bottleneck for staff.

The pipeline runs submissions through layered checks:

```
Submission → Anti-spam checks → Technical validation (DNS, URL, dedup)
    → AI cross-reference (verify the org exists and matches the description)
        → All checks pass → Auto-published
        → Anything uncertain → Admin queue (with AI notes attached)
```

The most important architectural decision: **the system fails toward human review, never toward publication.** If any verification step is uncertain or unavailable, the submission goes to the admin queue with full context. Admins see confidence scores, category match results, and cross-reference notes, then make the final call.

This brought the admin review load down to roughly 20% of submissions. The AI handles the repetitive verification so humans can spend their time on the questions that actually require judgment.

![The AI review pipeline — a submission flows from a contributor through anti-spam filters, technical validation (URL and DNS checks), and AI cross-referencing. Two paths branch out: verified submissions auto-publish to the public library (green path), while uncertain ones route to an admin dashboard with AI notes attached for human review (amber path).](images/commons-ai-pipeline.png)

## Public vs. referral visibility

I designed a two-tier visibility model enforced at the database level.

**Public resources** show up in search results and can be auto-published if all checks pass. **Referral resources** never appear in search results. They exist in the system for staff to share person-to-person, but they're invisible to public browsing.

Some resources serve people who can't safely appear in a public directory. The system enforces that boundary with automated auditing, and a daily background job checks that referral resources haven't leaked into any public-facing context.

Referral resources also always route to human review, regardless of AI confidence. Sensitive resources deserve a human decision every time.

## Database design

Three new tables, two migrations on existing ones.

**New tables:**
- A contributor profiles table with trust levels (`new` → `trusted` → `suspended`), email verification state, and notification preferences
- A submissions staging table with full AI review metadata: confidence scores, review notes, category match results, moderation status
- A resource flagging table with resolution tracking

**Migrations:**
- Added a `visibility` column to the existing resources table with a constraint that enforces the public/referral boundary
- Expanded the regions table from US-only state-level to an international hierarchy (country, region, city), seeded with initial data for five countries

The staging table pattern was key. Submissions never write directly to the live resources table. Everything lives in staging with its full verification history until it's accepted or moderated. The live table is always clean, and every decision has an audit trail.

## Background jobs

Three workers running behind the scenes:

- **A continuous AI verification worker** that processes new submissions through the review pipeline
- **A weekly impact digest** that sends opt-in contributors a summary of how their submitted resources were accessed. Transparency builds trust and keeps people contributing
- **A daily health check** that validates URLs across the entire library and audits visibility boundaries

The health check is how we solved the staleness problem. Every resource gets periodically re-verified. Broken links get flagged. The library stays current without someone manually checking every entry.

## Contributor trust system

The system has four roles: browser (no auth), contributor, AI reviewer, and admin. Each with different capabilities and rate limits. I built a separate auth system for contributors, completely independent from the student auth. Someone can contribute resources without needing a student account, and vice versa.

Trust auto-promotes based on track record. New contributors start with a rate limit. After enough accepted submissions with no rejections over a rolling window, they move up to a higher trust tier. Trusted contributors can also recommend other contributors for promotion.

## The build

28 routes across public, contributor, and admin surfaces. 11 templates. 3 background jobs. 150 unit tests covering submission validation, visibility enforcement, AI verification with mocked responses, and more.

The system rolls out in three phases. Phase 1 delivers the core browser, contributor portal, and AI pipeline. Phase 2 adds the contributor dashboard, a needs board showing coverage gaps by region (using a garden metaphor: sparse, growing, healthy, thriving), and weekly impact digests. Phase 3, "The Living Commons," adds public stats, auto-integration with regional resource packs, and an RSS feed.

## What I learned

The hardest part of this project wasn't the AI pipeline or the database schema. It was the design principles. Deciding when to automate and when to require a human. Where to be open and where to be opaque. What to track and what to deliberately not track.

The first principle: *"Nothing about us without us."* The AI verifies, but humans decide. Automation handles URL checks, deduplication, and cross-referencing so people can spend their time on questions that actually need a person.

The second principle: **no disclosure required.** Anyone can access resources without explaining why they need help. The browse page needs no login, no account, no cookies. That's not a technical shortcut. It's a commitment to the idea that people looking for help shouldn't have to justify it.

Building at scale means rethinking everything. The Commons takes what used to be one person curating a JSON file and turns it into a community-maintained living library, with the infrastructure to make that work responsibly.
