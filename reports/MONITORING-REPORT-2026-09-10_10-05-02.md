# Movena Website - Comprehensive Monitoring Report
**Generated:** 2026-09-10 10:05:02 UTC
**Project:** movena-website v0.1.0
**Framework:** Next.js 13.5.11 | React 18 | TypeScript 5

---

## Health Check Summary

| Check | Status | Severity |
|-------|--------|----------|

## 1. Uptime & Availability

| Homepage Availability | FAIL | Critical |
**Homepage Status**: ❌ Offline

### Page Availability Tests

| Page: / | FAIL | Critical |
| `/` | 000000 | ❌ |
| Page: /en/ | FAIL | Critical |
| `/en/` | 000000 | ❌ |
| Page: /en/contact | FAIL | Critical |
| `/en/contact` | 000000 | ❌ |
| Page: /en/savings-calculator | FAIL | Critical |
| `/en/savings-calculator` | 000000 | ❌ |
| Page: /en/terms | FAIL | Critical |
| `/en/terms` | 000000 | ❌ |
| Page: /en/privacy | FAIL | Critical |
| `/en/privacy` | 000000 | ❌ |


## 2. SSL/TLS Certificate Status

| SSL Certificate Present | PASS | Green |
**Certificate Details:**

- **Issuer**: O = Anthropic, CN = Egress Gateway SDS Issuing CA (production)
- **Subject**: CN = movena.io
- **Valid From**:             Not Before: Sep 10 10:04:04 2026 GMT
- **Expires**:             Not After : Oct 10 10:05:04 2026 GMT

| Certificate Expiration | WARN | Yellow |


## 3. Page Load Performance

### Load Time Tests (seconds)

| Page | Load Time | Status |
|------|-----------|--------|
| Load: / (.251 s) | FAIL | Critical |
| `/` | .251s | ⚠️ |
| Load: /en/contact (.349 s) | FAIL | Critical |
| `/en/contact` | .349s | ⚠️ |
| Load: /en/savings-calculator (.320 s) | FAIL | Critical |
| `/en/savings-calculator` | .320s | ⚠️ |


## 4. Critical API Endpoints

### API Route Status

| Endpoint | Method | Status | Details |
|----------|--------|--------|---------|
| API: /api/contact (POST) | FAIL | Critical |
| `POST /api/contact` | POST | 000000 | Not responding |
| API: /api/calculator/submit (POST) | FAIL | Critical |
| `POST /api/calculator/submit` | POST | 000000 | Not responding |


## 5. Error Rates & Anomalies

### Content Validation

| Homepage HTML Structure | FAIL | Critical |
| HTML Structure | ❌ Invalid |
| Homepage Meta Tags | WARN | Yellow |
| Meta Tags | ⚠️ Limited |
| Error Pattern Detection | PASS | Green |
| Error Patterns | ✅ None |


## 6. Build & Deployment Status

### Local Build Status

| Local Build | WARN | Yellow |
**Build Status**: ⚠️ Check needed

| Dependency Security | FAIL | Critical |
**Dependency Audit**: ⚠️ 5 vulnerabilities

## Summary & Health Score

**Overall Health Score**: 10/100

- **Total Checks**: 19
- **Passed**: 2 ✅
- **Failed/Warnings**: 17 ⚠️

---

*Report generated on 2026-09-10 10:05:39 UTC*
