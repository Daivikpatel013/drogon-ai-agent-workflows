<p align="center">
  <img src="docs/dragog.jpg" alt="Drogon AI Agent 1.0 banner" width="3840" />
</p>

<h1 align="center">Drogon AI Agent 1.0</h1>

<p align="center">
  <strong>AI-powered job search automation and application tracking system</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/n8n-Workflow%20Automation-orange?style=for-the-badge&logo=n8n" alt="n8n workflow automation" />
  <img src="https://img.shields.io/badge/AI-Job%20Matching-blue?style=for-the-badge" alt="AI job matching" />
  <img src="https://img.shields.io/badge/Google-Sheets%20Tracking-9A5BDF?style=for-the-badge" alt="Google Sheets tracking" />
  <img src="https://img.shields.io/badge/Apify-LinkedIn%20Scraping-00C2FF?style=for-the-badge" alt="Apify LinkedIn scraping" />
</p>

> A smart end-to-end workflow for discovering opportunities, prioritizing matches, tailoring applications, and tracking progress automatically.

## Overview

Drogon AI Agent 1.0 is an AI-assisted workflow suite built in n8n to automate the job search lifecycle. It helps candidates move from raw opportunity discovery to personalized application execution without losing track of the pipeline.

This project combines:

- job discovery from LinkedIn via Apify
- AI-powered scoring and role prioritization
- resume and cover letter tailoring
- recruiter contact discovery
- structured tracking in Google Sheets
- weekly skill-gap analysis for improvement

The result is a practical workflow that reduces repetitive manual work while making applications more targeted and measurable.

## Why this project matters

Job searching is often fragmented across multiple platforms and manual steps. This project addresses that by creating a streamlined system that:

- reduces time spent on low-quality applications
- improves fit by scoring jobs against candidate profile
- personalizes outreach and documents for each role
- centralizes progress tracking and analytics
- creates a repeatable process for continuous improvement

## Demo & Docs

- Interactive overview: [docs/index.html](docs/index.html)
- Workflow docs: [workflows/README.md](workflows/README.md)
- Main workflow JSON: [workflows/Drogon Ai Agent 1.0.json](workflows/Drogon%20Ai%20Agent%201.0.json)

## Key Features

- Candidate intake and profile capture
- LinkedIn job discovery using Apify
- AI-based role filtering and scoring
- Resume tailoring for each job description
- Cover letter generation
- Recruiter contact lookup
- Google Sheets pipeline tracking
- Weekly skills summary and gap analysis

## Architecture

The workflow follows a simple but effective pipeline:

1. Candidate profile is collected
2. LinkedIn job listings are scraped
3. AI ranks and filters opportunities
4. Tailored application materials are generated
5. Outreach and contacts are identified
6. Progress is tracked in Google Sheets
7. Weekly insights improve future search strategy

### Diagram

- `docs/ARCHITECTURE.svg`
- `docs/screenshots/`

## Tech Stack

- n8n for orchestration
- JavaScript / TypeScript for supporting automation logic
- OpenAI / Gateway model access for AI analysis
- Apify for LinkedIn job scraping
- Google Sheets for pipeline tracking
- Gmail / email automation for communication

## Project Structure

```text
.
├── docs/
│   ├── ARCHITECTURE.svg
│   ├── index.html
│   ├── screenshots/
│   └── drogog.jpg
├── workflows/
│   ├── Drogon Ai Agent 1.0.json
│   ├── Job Agent - Daily Run.json
│   ├── Drogon Ai Agent 1.0- Weekly Skills Summary.json
│   └── README.md
├── README.md
├── package.json
├── scripts/
└── validation/
```

## Getting Started

### Prerequisites

- n8n instance
- Apify account for LinkedIn scraping
- Google Sheets access
- Gmail OAuth / email access
- OpenAI or compatible model API access

### Setup

1. Open the workflow files in `workflows/`.
2. Import `Drogon Ai Agent 1.0.json` into n8n.
3. Reconnect required credentials.
4. Configure Google Sheet IDs and tracking data tables.
5. Validate the candidate profile and job fields.
6. Run a test workflow on a small set of jobs.

## Validation

Run the project validator:

```bash
npm run validate
```

## Resume-Friendly Summary

This project demonstrates:

- workflow automation and process design
- AI-driven decision support
- integration of external APIs and data sources
- structured data management with Google Sheets
- end-to-end product thinking from data intake to output

## Future Improvements

- add a dashboard for analytics and conversion metrics
- improve resume matching using richer scoring models
- add support for more job sources beyond LinkedIn
- integrate CRM-style candidate status tracking
- add a modern frontend or dashboard for reporting

## Contributing

This project is designed to be expanded with improved workflows, better analytics, and more automation layers. If you want to contribute, start by reviewing the docs and workflow structure, then extend the current pipelines with additional integrations or scoring logic.

## License

This project is intended for personal and portfolio use. Please review repository-specific licensing before commercial deployment.

---

Built to demonstrate practical AI workflow design, automation engineering, and end-to-end product thinking for real-world job-search tooling.
