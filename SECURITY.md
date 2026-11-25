# Security Policy

## Reporting a vulnerability

Please do **not** open a public issue for security vulnerabilities. Instead, email the maintainer or use GitHub's private vulnerability reporting feature on this repository.

Include:
- A description of the issue
- Steps to reproduce
- Potential impact

We aim to acknowledge reports within 7 days and provide a fix or mitigation as soon as possible.

## Supported versions

Only the latest `main` branch is actively supported.

## Notes

- The `/api/issues` route proxies GitHub's search API. The optional `GITHUB_TOKEN` is server-side only; never commit `.env.local`.
- Do not expose tokens in client code or logs.
