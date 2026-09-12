# website2.0

Marketing site for Movena (movena.io). Next.js 13 App Router, Tailwind,
two locales under `app/[locale]/` (`en` and `da`). The product itself is a
separate repo (`Movena-io/Movena`) and is not in this tree.

Build: `npm run build`. Lint: `npm run lint`.

## Monitor reports: one file, always overwritten

The website monitor writes to exactly one path:

```
reports/monitor-latest.md
```

Overwrite it in full on every run. It holds the most recent run and nothing
else. Start the file with the run timestamp and the overall status, so the
top of the diff shows what happened.

Do not:

- create a new file per run, or add a date, a timestamp, or a `-latest`,
  `-final`, `-run`, `-scheduled`, `-automated`, `COMPREHENSIVE-`,
  `EXECUTIVE-`, `TECHNICAL-AUDIT-`, `QUICK-REFERENCE-` or `INDEX` variant
- write any report to the repository root
- keep previous reports alongside the current one
- split one run across several files

History belongs in git, not in filenames. Every run overwriting the same
path means `git log reports/monitor-latest.md` is the run history and
`git diff` shows what changed since the last run. A new filename per run
destroys both.

This rule has been broken repeatedly. On 2026-09-12 the directory held 26
files and was collapsed back to one. `.claude/agents/website-monitor.md`
states the same rule, but that file is not a registered subagent, so its
contents are not loaded automatically. This file is. Treat it as the
authority.

## Commit only what you changed

Commit the specific files your task touched, never `git add -A` or `git
commit -a`. Scheduled runs share this working tree with human work in
progress; sweeping up unrelated files has caused merge commits and
clobbered edits.

## npm audit

`npm audit fix` and `npm update <pkg>` both rewrite ~87 packages here,
far beyond whatever has an advisory. Patch a transitive dependency with a
scoped entry in `overrides` in `package.json` instead, the way `js-yaml@3`
and `nanoid@3` are pinned, then `npm install`.

`next` and its nested `postcss` are knowingly left on their current
versions. Fixing them requires Next 13 to 16, a major upgrade that is a
product decision, not a monitor action. Do not run `npm audit fix --force`.

## Blog

Article conventions, the `.da.md` translation pairing, and the frontmatter
reference are documented in `content/blog/README.md`. Read it before adding
or editing a post rather than inferring the rules from existing files.
