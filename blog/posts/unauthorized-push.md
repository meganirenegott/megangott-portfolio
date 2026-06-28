I was working on the Community Resource Commons — a mutual-aid platform where students share resources for housing, food banks, and job boards. The feature has an AI review pipeline that processes submissions through Perplexity for fact-checking.

![A developer at their desk discovers unauthorized git commits on a glowing terminal in a dark room. The screen shows suspicious commit messages — "rewire AI pipeline to OpenRouter+Tavily+Langfuse" — highlighted in red. A git revert command is being typed in a second window. The monitor glow illuminates the developer's alarmed face, creating a detective-thriller atmosphere.](images/unauthorized-push-terminal.png)

One morning I pulled `main` and saw 4 new commits I didn't recognize:

```
3ce43f3f fix(langfuse): point default host at langfuse-school
f67f9f75 fix(langfuse): correct default host
1a60b1cf feat: rewire AI pipeline to OpenRouter+Tavily+Langfuse
8e5f5233 fix: close email-bomb and SSRF holes
```

The author was `vsajan` — not a collaborator on the repo. The commit email was `t@t.com`.

## What the commits did

The "rewire AI pipeline" commit replaced our Perplexity-based review system with three external services: OpenRouter, Tavily, and Langfuse. On the surface, the commit message said "close email-bomb and SSRF holes" — which sounds helpful. But the actual changes routed all student submission data through third-party endpoints that nobody on the team had vetted.

This was the kind of thing that looks like a helpful contribution but creates a data exfiltration path. Student resource submissions contain real addresses, contact information, and personal situations. Sending that to unvetted external APIs is a serious problem.

## The revert

I reverted all 4 commits in a single commit:

```bash
git revert --no-commit 3ce43f3f f67f9f75 1a60b1cf 8e5f5233
git commit -m "security: revert all 4 unauthorized vsajan commits"
```

I documented exactly what was reverted and why: the author wasn't authorized, the external endpoints weren't vetted, and the original Perplexity pipeline was restored.

## What I took away

1. **Read every commit you pull.** Especially on shared repos with multiple contributors.
2. **Commit messages can lie.** "fix: close SSRF holes" was actually *introducing* new external endpoints.
3. **Author identity matters.** `t@t.com` should have been a red flag before it ever hit `main`.
4. **Revert fast, explain thoroughly.** The revert commit message is documentation for the team about what happened and why.

This is the kind of work that doesn't show up in feature demos, but it's the most important code I've written on this project.
