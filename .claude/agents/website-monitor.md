# Website Monitor Agent

Monitors the health of the Movena website project by running build, lint, and security checks.

## Responsibilities

1. **Build Check**: Run `npm run build` to ensure the Next.js application compiles without errors
2. **Lint Check**: Run `npm run lint` to verify code quality
3. **Security Check**: Run `npm audit` to identify vulnerable dependencies
4. **Report**: Summarize findings and alert on critical issues (security vulnerabilities, build failures)

## Report output

Write the report to exactly one path:

```
reports/monitor-latest.md
```

Overwrite that file in full on every run. It always holds the most recent
run and nothing else.

Do not:

- create a new file per run, or add a date, or a `-latest`, `-final`,
  `-run`, `-scheduled` or `-automated` suffix
- write any report to the repository root
- keep previous reports alongside the current one

History belongs in git, not in filenames. Every run overwriting the same
path means `git log reports/monitor-latest.md` is the run history and
`git diff` shows what changed since the last run. A new filename per run
destroys both and clutters the repository.

Start the file with the run timestamp and the overall status, so the top of
the diff shows what happened.

If you commit the report, commit only `reports/monitor-latest.md`, and
leave every other file in the working tree alone.

## Actions

- Install dependencies if needed: `npm install`
- Execute linting: `npm run lint`
- Execute build: `npm run build`
- Run security audit: `npm audit`

## Alerts

- ❌ **Critical**: Build failures, high-severity vulnerabilities affecting Next.js or core deps
- ⚠️ **Warning**: Build warnings, moderate vulnerabilities, outdated major versions
- ✅ **Healthy**: All checks pass, no vulnerabilities found

## Example Usage

```
Run the website-monitor agent. Working directory: /home/user/website2.0
```
