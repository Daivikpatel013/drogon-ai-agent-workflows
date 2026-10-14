<p align="center">
  <img src="docs/dragog.jpg" alt="Drogon AI Agent 1.0 banner" width="1200" />
</p>

<h1 align="center">Drogon AI Agent 1.0</h1>

<p align="center">
  <strong>AI-powered job search, application tracking, and recruiter outreach workflow suite.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/n8n-Workflow-orange?style=for-the-badge&logo=n8n" alt="n8n workflow" />
  <img src="https://img.shields.io/badge/AI-Job%20Search-Blue?style=for-the-badge" alt="AI job search" />
  <img src="https://img.shields.io/badge/Resume-Tailoring-Green?style=for-the-badge" alt="resume tailoring" />
  <img src="https://img.shields.io/badge/Sheets-Tracking-9A5BDF?style=for-the-badge" alt="sheets tracking" />
</p>

> Built for candidates who want a smarter, faster, and more organized job application engine.

Drogon AI Agent 1.0 is a collection of n8n workflows designed to automate the entire job search lifecycle—from finding opportunities to tailoring documents and tracking progress.

## What it does

- Collects candidate details and job preferences from a structured intake flow
- Finds relevant LinkedIn opportunities using Apify-powered scraping
- Uses AI to score and prioritize the best-fit roles
- Tailors resumes and cover letters to each job description
- Identifies recruiter contacts and outreach opportunities
- Tracks engagement and application progress in Google Sheets
- Sends a weekly skills-gap summary to improve future applications

## Quick links

- Interactive overview: [docs/index.html](docs/index.html)
- Main workflow JSON: [workflows/Drogon Ai Agent 1.0.json](workflows/Drogon%20Ai%20Agent%201.0.json)
- Workflow docs: [workflows/README.md](workflows/README.md)

---

## Why this workflow stands out

- Automates the most time-consuming parts of the job search
- Improves role matching with AI-driven scoring and filtering
- Personalizes outreach with better-fit application materials
- Keeps all activity visible in a single tracking sheet
- Builds a repeatable weekly improvement loop for your job-search strategy

---

## Screenshots & diagrams

See `docs/ARCHITECTURE.svg` and `docs/screenshots/` for the updated visuals and architecture references.

---

## Run validation

- Install dependencies (none required for the validator)
- Run: `npm run validate`

---

## Project structure

- `docs/` — interactive overview, diagrams, screenshots, and branding assets
- `workflows/` — exported n8n workflow JSON files
- `README.md` — project overview and quick start guide

---

For contributors: the `docs/` folder contains the interactive overview used for GitHub Pages. If you want a different visual direction—neon, minimal, cinematic, or animated—I can help refine the branding further.
