# Website Monitor Agent

Monitors the health of the Movena website project by running build, lint, and security checks.

## Responsibilities

1. **Build Check**: Run `npm run build` to ensure the Next.js application compiles without errors
2. **Lint Check**: Run `npm run lint` to verify code quality
3. **Security Check**: Run `npm audit` to identify vulnerable dependencies
4. **Report**: Summarize findings and alert on critical issues (security vulnerabilities, build failures)

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
