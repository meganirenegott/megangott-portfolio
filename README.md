# Megan Gott - Portfolio

Personal portfolio and dev blog. Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies.

**Live site:** [meganirenegott.github.io/megangott-portfolio](https://meganirenegott.github.io/megangott-portfolio/)

## What's in here

**Portfolio** (`index.html`) - Work samples, commit history links, and contact info.

**Dev Blog** (`blog/`) - 42 posts about building interactive systems for a virtual campus. Topics include game design, accessibility, system architecture, mutual aid infrastructure, and the philosophy behind features that prioritize joy and atmosphere. Posts are written in Markdown and rendered client-side.

**Interactive Demos** (`demos/`) - 18 standalone HTML demos that accompany blog posts. Each one is a self-contained, playable version of a campus feature: cherry blossom camera filters, a capybara spa, a ghost light ritual, a rock garden with cursed artifacts, fishing celebrations, and more.

## Tech stack

- HTML / CSS / JavaScript (vanilla, no frameworks)
- Markdown blog posts rendered client-side via `post.html`
- Post metadata stored in `blog/posts/index.json`
- Google Fonts (Inter, Space Grotesk, JetBrains Mono)
- GitHub Pages via GitHub Actions (`deploy.yml`)

## Structure

```
index.html              # Portfolio homepage
style.css               # Portfolio styles
script.js               # Portfolio interactions (particles, animations)
favicon.svg
blog/
  index.html            # Blog index page
  post.html             # Blog post template (renders Markdown)
  blog.css              # Blog styles
  posts/
    index.json          # Post metadata (titles, dates, tags, slugs)
    *.md                # 42 blog posts in Markdown
  images/               # 86 generated pixel-art images for posts
demos/
  *.html                # 18 interactive demos
.github/
  workflows/
    deploy.yml          # GitHub Pages deployment
```

## Running locally

No build step. Just serve the directory:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

Pushes to `main` auto-deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.
