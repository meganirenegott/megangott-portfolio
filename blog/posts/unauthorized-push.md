I was working on the Community Resource Commons, a mutual aid platform where students share resources for housing, food banks, and job boards. The feature has an AI review pipeline that processes submissions through Perplexity for fact-checking.

One morning I pulled `main` and saw 4 commits I didn't recognize:

```
3ce43f3f fix(langfuse): point default host at langfuse-school
f67f9f75 fix(langfuse): correct default host
1a60b1cf feat: rewire AI pipeline to OpenRouter+Tavily+Langfuse
8e5f5233 fix: close email-bomb and SSRF holes
```

The author was `vsajan` with a commit email of `t@t.com`. Not a collaborator on the repo. My first thought was that someone had pushed unauthorized code to our repository.

![A developer at their desk discovers unauthorized git commits on a glowing terminal. The screen shows suspicious commit messages highlighted in red. A git revert command is being typed in a second window.](images/unauthorized-push-terminal.png)

## What the commits did

The "rewire AI pipeline" commit replaced our Perplexity-based review system with three external services: OpenRouter, Tavily, and Langfuse. The commit message said "close email-bomb and SSRF holes," which sounds helpful. But the actual changes routed all student submission data through third-party endpoints that nobody on the team had reviewed.

Student resource submissions contain real addresses, contact information, and personal situations. Routing that through unvetted external APIs is a real problem, regardless of who pushed the code.

## The revert

I reverted all 4 commits immediately:

```bash
git revert --no-commit 3ce43f3f f67f9f75 1a60b1cf 8e5f5233
git commit -m "security: revert all 4 unauthorized vsajan commits"
```

I documented exactly what was reverted and why: the author wasn't authorized, the external endpoints weren't vetted, and the original Perplexity pipeline was restored.

## What actually happened

After investigating, this turned out not to be an outside intruder. It was an AI coding agent that wasn't named or configured correctly. The agent had been set up to work on the project but its identity wasn't recognizable as part of the team, so it looked like an unknown actor pushing code.

The commits themselves weren't malicious in intent, but they still would have routed student data through unvetted services. The security concern was real even if the threat wasn't.

## What changed because of this

Because I flagged it and investigated instead of just accepting the commits, we did a full security review of how agents are identified and authorized on our repos:

1. **Agent identity protocols.** Every AI agent working on a project now has a clearly named identity that's registered as a collaborator. No more anonymous-looking commit authors.
2. **Commit review for all automated pushes.** Agent commits get the same review as human commits. Nothing goes to `main` without someone reading it.
3. **Vetting external endpoints.** Any commit that introduces a new external API endpoint gets flagged automatically. Student data doesn't go to services the team hasn't reviewed.
4. **Revert first, investigate second.** If something looks wrong, revert it. You can always un-revert once you understand what happened. The revert commit message becomes documentation for the team.

The incident looked scarier than it was, but the response was worth it. We now have real protocols around agent identity and automated code review that we wouldn't have built otherwise.
