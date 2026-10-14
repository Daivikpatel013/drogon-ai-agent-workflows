<p align="center">
  <img src="docs/dragog.jpg" alt="Drogon AI Agent 1.0 banner" width="3840" />
</p>

<h1 align="center">Drogon AI Agent 1.0</h1>

<p align="center"><strong style="color:#7df9ff">AI-first job search & application automation — cinematic, repeatable, measurable.</strong></p>

<p align="center">
  <a href="docs/index.html"><img src="https://img.shields.io/badge/Docs-Interactive-%2300b894?style=for-the-badge" alt="Docs"/></a>
  <a href="workflows/Drogon%20Ai%20Agent%201.0.json"><img src="https://img.shields.io/badge/Import-n8n%20JSON-%23ff6b6b?style=for-the-badge" alt="Import n8n"/></a>
  <a href="#why-this-workflow-stands-out"><img src="https://img.shields.io/badge/Why-It%20Matters-%238a5cff?style=for-the-badge" alt="Why"/></a>
  <a href="#get-started"><img src="https://img.shields.io/badge/Get%20Started-Setup%20Guide-%2399ffcc?style=for-the-badge" alt="Get Started"/></a>
</p>

<p align="center">
  <a href="docs/index.html"><img src="https://img.shields.io/badge/Start%20the%20Interactive%20Demo-Launch-%23f72585?style=flat-square&logo=chromium" alt="Launch demo"/></a>
  &nbsp;
  <a href="workflows/Drogon%20Ai%20Agent%201.0.json"><img src="https://img.shields.io/badge/Try%20the%20Workflow-Import%20JSON-%2312b886?style=flat-square&logo=n8n" alt="Try workflow"/></a>
  &nbsp;
  <a href="https://github.com/sponsors/Daivikpatel013"><img src="https://img.shields.io/badge/Sponsor-Support%20Development-%23ffb86b?style=flat-square" alt="Sponsor"/></a>
</p>

---

## Elevator pitch

Drogon AI Agent 1.0 automates the boring parts of job hunting: discovery, qualification, personalization, and tracking — so you can apply faster and smarter. Built as a suite of n8n workflows that connect scraping, AI scoring, document tailoring and Google Sheets tracking into a single repeatable pipeline.

## What it does

- Structured candidate intake and preferences capture
- LinkedIn opportunity discovery via Apify
- AI-driven scoring and prioritization of roles
- Automated resume & cover letter tailoring per role
- Recruiter contact discovery and messaging suggestions
- Comprehensive Google Sheets tracking for pipelines and metrics
- Weekly skills-gap report to close critical gaps over time

---

## Why this workflow stands out

- Designed for scale: batched discovery + AI filtering reduces noise
- Higher responder rates: role-specific resumes + outreach improves fit
- Single-source tracking: all applications, statuses, and outcomes in Sheets
- Continuous improvement: weekly summaries highlight high-impact skills to develop

---

## Architecture (visual)

- Diagram: `docs/ARCHITECTURE.svg`
- Interactive demo: `docs/index.html`

Quick architecture summary:

1. Intake form -> candidate profile
2. Apify LinkedIn job scraper -> raw job hits
3. Scoring service (AI) -> prioritized job list
4. Tailor resumes & letters -> generate attachments
5. Outreach & recruiter contact lookup -> send or queue messages
6. Google Sheets -> tracking, analytics & weekly reports

---

## Get started

1. Open `workflows/` and import `Drogon Ai Agent 1.0.json` into your n8n instance.
2. Reconnect credentials (Gmail, Google Sheets, Apify, OpenAI/Gateway).
3. Validate Google Sheet IDs and n8n data table name `job_agent_candidates`.
4. Run a dry test with a small candidate set and review generated artifacts.

---

## Visual style note & 4K banner

I rendered the banner at a 4K display width in the README (width="3840"). This forces a cinematic, high-res presentation on supported screens but it does not increase the underlying image's pixel count. For an actual 4K banner (3840×2160), replace `docs/dragog.jpg` with a true 4K-exported image and I'll swap it in.

---

## Project structure

- `docs/` — interactive overview, diagrams, screenshots, and branding assets
- `workflows/` — exported n8n workflow JSON files
- `README.md` — project overview and quick start

---

## Get involved

If you'd like a darker neon aesthetic applied to the image itself (neon overlays, glow, and high-contrast text), or a alternate minimal hero — drop the 4K source and I’ll produce two variants (Cinematic Neon, Minimal Dark) and update the README with a toggle preview.

---

_Updated to a startup-style landing layout with cinematic hero and CTAs — let me know which image variant you want next (Cinematic Neon / Minimal Dark) or upload the 4K source to replace the banner._
