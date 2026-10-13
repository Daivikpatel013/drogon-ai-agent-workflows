# Drogon AI Agent 1.0

Drogon AI Agent 1.0 is a set of n8n workflows for AI-assisted job searching and application management. It includes the actual exported workflows and operational docs.

## What I added

- LICENSE (MIT)
- CHANGELOG.md (initial)
- CONTRIBUTING.md
- docs/SETUP.md — step-by-step setup and testing
- scripts/validate-workflows.js + package.json — simple JSON validation helper
- docs/ARCHITECTURE.svg — a simple architecture diagram
- docs/screenshots/1-4.svg — placeholder screenshots (replace with your real screenshots if you prefer)

## How to use the new tooling

1. Install node dependencies (none required but the validate script uses Node builtin APIs)

```bash
npm install
```

2. Validate workflow JSON files:

```bash
npm run validate
```

3. Replace placeholder screenshots in `docs/screenshots/` with the real PNGs if you have them. The README references the files for easy display on GitHub.

## Files of interest
- `workflows/` — n8n workflow export files (already added)
- `docs/ARCHITECTURE.svg` — architecture diagram
- `docs/SETUP.md` — setup and onboarding steps
- `CONTRIBUTING.md`, `CHANGELOG.md`, `LICENSE`
- `package.json` + `scripts/validate-workflows.js`

If you want, I can now:
- Replace the placeholder screenshots with the exact images you provided in chat (I can add them as binary files if you confirm)
- Create a visual README section that embeds the architecture diagram and screenshots
- Add a release entry to CHANGELOG.md and create a git tag
