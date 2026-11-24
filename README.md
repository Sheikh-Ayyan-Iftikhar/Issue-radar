# FirstIssue Radar

Find real, open GitHub issues that match your language and skill level, then save the ones worth trying.

## Problem
Newcomers struggle to find active repos with clear, unassigned, beginner-labelled issues in their language.

## Features
- Live search over GitHub's issue API: language, keywords, repo/owner, label presets (good first issue, help wanted, beginner), custom label, opened date, repo activity, sort
- Issue cards with labels, dates, comment count and a direct GitHub link; a beginner indicator only when a label supports it
- Saved issues in localStorage (no account), shareable filter URLs, pagination, loading/empty/error/rate-limit states

## Stack
Next.js (App Router), TypeScript, Tailwind CSS v4, Lucide icons, GitHub REST API.

## Setup
```bash
npm install
cp .env.example .env.local   # GITHUB_TOKEN is optional
npm run dev
```
Checks: `npm run typecheck`, `npm run lint`, `npm run build`.

## API
`GET /api/issues` proxies `search/issues` (server-side token, 5-minute cache). Params: `q, repo, language, labels, label, created, active, sort, page`.
Language filtering uses GitHub's `language:` qualifier (the repository's primary language), so the language shown is never guessed.

## Roadmap
Repository detail panel (stats, CONTRIBUTING link), CONTRIBUTING/CODE_OF_CONDUCT/SECURITY files, issue and PR templates, screenshots.

## License
MIT
