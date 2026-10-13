# Drogon AI Agent Workflows

n8n workflows (as `@n8n/workflow-sdk` TypeScript source) for an automated job-application assistant. It finds fresh LinkedIn jobs for a candidate, scores each one against their CV, writes a tailored CV and cover letter for the good fits, and emails everything in a single digest.

## Workflows

| File | Workflow | Purpose |
|---|---|---|
| `workflows/drogon-ai-agent-1.0.workflow.ts` | Drogon Ai Agent 1.0 | Main workflow. Combines the form flow, the daily run and the weekly summary in one workflow. |
| `workflows/job-agent-daily-run.workflow.ts` | Job Agent - Daily Run | Standalone copy of the daily run, kept for reference. Already included in the main workflow. |
| `workflows/drogon-ai-agent-weekly-skills-summary.workflow.ts` | Drogon Ai Agent 1.0 - Weekly Skills Summary | Standalone copy of the weekly summary, kept for reference. Already included in the main workflow. |

## How the main workflow works

It has four triggers.

1. **Form submission.** The candidate enters name, CV text, email, job title and location. The details are saved to the `job_agent_candidates` Data Table, then the job search starts.
2. **Every day at 8am.** Loads every saved candidate, rotates the search keyword through common variations of their job title, and runs the job search once per candidate.
3. **Called by the daily run.** The entry point the daily run uses to start the same job search for each candidate.
4. **Every Monday 9am.** Reads the last 7 days of missed jobs from the gap sheet, finds each candidate's most frequently missing skills and emails them a summary.

### Job search pipeline

1. **Find matching jobs.** Scrapes LinkedIn jobs posted in the last 7 days through Apify.
2. **Score job fit.** Drops obviously weak matches, skips jobs already processed, then an AI step scores each job from 0 to 100 against the CV.
3. **Prepare application.** For jobs at or above the cutoff (60), the AI tailors the CV, writes a cover letter and searches the web for a recruiter email. It only returns an address it actually saw on a page.
4. **Deliver and track.** One digest email with all matches, best first.
5. **Log resume gaps.** Jobs below the cutoff are logged to the Resume Gap Tracker sheet with the score and the missing skills.

Nothing is ever sent to employers automatically. The candidate reviews and sends each application themselves.

## Services and credentials

The workflows reference these by name inside n8n. No secrets are stored in this repo.

- Apify, to scrape LinkedIn jobs
- OpenAI via Gateway credits, for scoring, CV writing and web search
- Gmail, to send the digest and the weekly summary
- Google Sheets, for the gap tracker
- n8n Data Table `job_agent_candidates`, which stores the saved candidates

## Settings

These are set in the "Workflow Config" node of the main workflow.

- `maxJobs`: 5
- `minFitScore`: 60

## Status

These workflows are drafts and are not published. They have been verified only partly, with some steps simulated. They have not had a full live end-to-end run. A live run costs Apify credits, sends a real email and writes sheet rows.

## Usage

The files are SDK source, not importable n8n JSON. To use one, give it to the n8n workflow builder (or an `@n8n/workflow-sdk` setup) to build it in your n8n instance, then connect your own credentials.
