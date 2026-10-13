# Drogon AI Agent Workflows

Drogon AI Agent 1.0 is a collection of n8n automation workflows designed to help with career operations, recurring work, and AI-assisted knowledge capture.

This repository is organized to make it easy to:

- automate job applications and outreach
- run recurring daily tasks with AI
- summarize skills and progress weekly
- manage workflow exports, credentials, and environment configuration

## Included workflow concepts

- Job Application Agent
  - Research and prepare for opportunities
  - Draft or refine application materials
  - Send outreach or application steps using configured services

- Daily Run
  - Daily AI review and task orchestration
  - Prioritize work, create summaries, and trigger follow-ups

- Weekly Skills Summary
  - Aggregate recent activity and work output
  - Highlight strengths, gaps, and next learning priorities

## Repository structure

```text
.
├── README.md
├── .env.example
├── .gitignore
├── docs/
│   └── WORKFLOW_GUIDE.md
├── workflows/
│   └── README.md
└── .n8n/                     # optional local export folder if you use n8n-specific files
```

## Prerequisites

Before importing or using the workflows, make sure you have:

- n8n installed and running
- a valid AI provider account (OpenAI, Anthropic, or similar)
- access to the tools/services used by your automation
  - email provider
  - database or spreadsheet storage
  - messaging or CRM tools (if used)
- secure credentials stored in n8n and/or environment variables

## Quick start

1. Clone the repository.
2. Copy `.env.example` to `.env` and fill in your credentials.
3. Open the workflows in n8n.
4. Import or recreate the workflows using the exported JSON files (when added to the `workflows/` folder).
5. Configure credentials and webhook endpoints inside each workflow.
6. Test each workflow in a safe environment before enabling live automation.

## Environment configuration

Use `.env.example` as a template for sensitive values. Keep your real secrets out of git history.

Example:

```bash
cp .env.example .env
```

Then update values such as:

- `OPENAI_API_KEY`
- `N8N_WEBHOOK_URL`
- `SMTP_*` settings
- any service or database credentials required by your automation steps

## Workflow implementation notes

This repo is structured for an AI-driven workflow system, but it does not assume a single rigid architecture. The workflows can be adapted to:

- personal use
- team operations
- recruiter or talent workflows
- internal productivity automation

Recommended pattern:

- keep workflow exports in `workflows/`
- document environment assumptions in `docs/`
- store credentials in n8n credentials manager or secure environment variables
- use versioning and test runs before broad deployment

## Workflow guide

See `docs/WORKFLOW_GUIDE.md` for a step-by-step guide covering:

- importing workflows into n8n
- configuring credentials
- setting triggers and schedule nodes
- handling AI prompts and outputs
- testing and monitoring

## Security recommendations

- never commit real API keys or secrets
- rotate credentials regularly
- use environment-specific credentials for staging and production
- validate external service access before production automation
- review all AI-generated actions before they are allowed to trigger external writes

## Suggested next improvements

If you want to make this project even stronger, consider adding:

- workflow JSON exports for every automation
- a `package.json` and TypeScript utility layer for helper scripts
- a proper `LICENSE`
- README screenshots or architecture diagrams
- a changelog and release notes
- a testing checklist for each workflow

## Contributing

This repository is intended to grow with your workflows and automation ideas. Keep documentation updated whenever workflow logic changes.

## Notes

The repository currently serves as a solid foundation for AI workflow automation. As you add actual n8n export files and service integrations, this structure will scale cleanly.
