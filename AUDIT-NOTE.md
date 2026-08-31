# Note: website-monitor agent and the unaddressed Next.js advisories

Written 2026-08-31. Flagging for whoever owns dependencies (Valdemar).

## What the agent has been doing

`.claude/agents/website-monitor.md` runs on a schedule and has been
committing to `package-lock.json` on its own. Four commits so far:

| Commit | Date | Change to package-lock.json |
|---|---|---|
| `e43370a` | 2026-07-30 | +70 / -194 |
| `1773536` | 2026-07-30 | +1099 / -4554 |
| `f997044` | 2026-08-28 | +75 / -4 |
| `225cb96` | 2026-08-29 | +4 / -75 |

`f997044` and `225cb96` are an exact add-then-revert pair. The second
undoes the first line for line, so the net effect of that pair is zero.
The two July commits are not a revert pair; together they cut the
lockfile down by roughly 3,500 lines.

## Why it matters

`f997044`'s message claims:

> Identified 7 high-severity vulnerabilities requiring attention:
> - Next.js security patches needed (31 advisories)
> - PostCSS, js-yaml, minimatch, nanoid updates available

Nothing was done about any of it. **None of the four commits touched
`package.json`.** The pin is still `"next": "13.5.11"`, exactly as it was
before the agent started. The agent only ever regenerated the lockfile,
which cannot move a pinned major version, and then reverted even that.

The risk is not the churn. It is that the commit log reads as though a
security check ran and was handled, when no dependency was upgraded and
no advisory was closed. Anyone skimming history would reasonably assume
this was dealt with.

## What someone should actually do

1. Run `npm audit` by hand and see what is real. The 31-advisory figure
   came from an agent's commit message and has not been verified.
2. Decide on the Next.js upgrade. 13.5.11 is the current pin. Moving off
   13.x is a real piece of work, not a lockfile regeneration, and it
   needs a deliberate call rather than a scheduled agent.
3. Fix or disable the agent's commit behaviour. It should open an issue
   or a PR for a human to look at, not push to `main` unattended, and it
   should not claim in a commit message that it identified
   vulnerabilities when it is not going to act on them.
