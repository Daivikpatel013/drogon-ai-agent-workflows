# Setup guide

This file walks through importing and configuring the workflows included in this repository.

Prerequisites
- n8n (self-hosted or cloud) with permissions to import workflows
- Google account with access to Google Sheets and OAuth credentials
- Gmail account or SMTP credentials for sending emails
- Apify account with an API token for the LinkedIn jobs scraper
- OpenAI or AI model access configured for n8n LangChain nodes

1) Clone the repository

```bash
git clone https://github.com/Daivikpatel013/drogon-ai-agent-workflows.git
cd drogon-ai-agent-workflows
```

2) Review `.env.example` and create your `.env`

Copy `.env.example` to `.env` and fill values for:
- OPENAI_API_KEY (or n8n gateway credentials configured in the UI)
- N8N_WEBHOOK_URL
- SMTP_* settings (if using SMTP instead of Gmail OAuth)
- APIFY_TOKEN (store in n8n credentials instead of `.env` when possible)

3) Import workflows into n8n

- In your n8n workspace: Workflow → Import from File
- Import these files from the `workflows/` folder:
  - `Drogon Ai Agent 1.0.json` (main agent)
  - `Job Agent - Daily Run.json` (daily scheduler)
  - `Drogon Ai Agent 1.0- Weekly Skills Summary.json` (weekly summary)

4) Reconnect credentials in n8n

After import, open each workflow and reconnect credential nodes:
- Gmail OAuth2 (or SMTP)
- Google Sheets OAuth2
- Apify API Token (custom HTTP credential)
- OpenAI / Gateway credentials for LangChain nodes

5) Confirm data table and sheet IDs

- Create a data table named `job_agent_candidates` (or update the DataTable node to point to your data table ID)
- Create Google Sheets documents:
  - Job Applications Tracker (sheet id: configure in GoogleSheets node)
  - Resume Gap Tracker v2 with a sheet named `Gaps`

6) Dry-run and testing

- Test the main workflow by submitting the form trigger (use the n8n form UI screenshot in `/docs/screenshots/4.svg` as reference)
- Test the daily run by triggering the schedule node manually
- Review logs in n8n and ensure emails are not sent to employers automatically

7) Validation (locally)

You can validate that the workflow JSON files are syntactically valid with the provided npm script (see `package.json`).

```bash
npm install
npm run validate
```

8) Production notes

- Use separate credentials for staging and production
- Rotate keys regularly
- Monitor workflow execution logs and set up alerting for failures

If anything in your environment differs (different Gmail domain or SMTP provider), update the corresponding nodes and document the changes in `docs/SETUP.md`.
