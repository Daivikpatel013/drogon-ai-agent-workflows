# Workflows

This folder contains the exported n8n workflow files for the Drogon AI Agent 1.0 system.

## Included files

- `Drogon Ai Agent 1.0.json` — main AI job application agent
- `Job Agent - Daily Run.json` — scheduled daily candidate refresh workflow
- `Drogon Ai Agent 1.0- Weekly Skills Summary.json` — weekly missing-skills email summary

## Import guide

1. Open your n8n workspace.
2. Go to the workflow menu and choose Import from File.
3. Upload one of the JSON files in this folder.
4. Reconnect all required credentials.
5. Validate sheet IDs, data tables, and workflow references.
6. Test the workflow before enabling live automation.

## Key dependencies

These workflows rely on:

- Gmail OAuth
- Google Sheets OAuth
- OpenAI/Gateway model access
- Apify LinkedIn job scraper
- an n8n data table called `job_agent_candidates`
- Google Sheets tracker documents for jobs and resume gaps

## Notes

- The workflows are designed to be imported as-is, but IDs and credentials still need to be connected to your own environment.
- The repo intentionally keeps secrets out of git and expects credential configuration inside n8n.
- For a more polished setup, keep the Google Sheets structure consistent with the workflow mappings.
