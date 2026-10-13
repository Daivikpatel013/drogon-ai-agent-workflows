# Workflow guide

This guide explains how to structure, import, and maintain the Drogon AI Agent n8n workflows in a clean and production-friendly way.

## 1. Importing workflows into n8n

1. Open n8n.
2. Click the menu for workflow management.
3. Choose Import from File.
4. Upload the workflow JSON file from `workflows/`.
5. Review each node and confirm credential references.
6. Save the workflow.
7. Test the workflow with a safe trigger before enabling production mode.

## 2. Recommended workflow design

Each workflow should include:

- trigger node (manual, schedule, webhook, or event-driven)
- AI agent or prompt node
- tool/service nodes (email, database, HTTP, CRM, etc.)
- validation or condition logic
- result handling and logging

## 3. Workflow categories

### Job Application Agent
This workflow can coordinate:

- job discovery
- company and role research
- application preparation
- message drafting
- outreach follow-up

### Daily Run
This workflow can support:

- daily planning and triage
- AI summary of outstanding tasks
- reminders and follow-up actions
- routine system checks

### Weekly Skills Summary
This workflow can combine:

- completed work notes
- learning highlights
- improvements and gaps
- structured summary for reflection or reporting

## 4. Credential and environment setup

Use `.env.example` as your baseline and store secret values in n8n credentials or your environment manager. Avoid committing real keys.

Recommended secrets:

- AI provider API key
- email account credentials
- database credentials
- external service access tokens

## 5. Testing checklist

Before enabling a workflow:

- verify all credentials are connected
- test the trigger manually
- confirm data mapping between nodes
- validate AI prompts and outputs
- check error handling for failed external requests
- confirm the workflow logs are readable and actionable

## 6. Observability and maintenance

To keep automation stable:

- review workflow execution logs weekly
- monitor failed nodes and rate limits
- update prompts when business goals change
- document version updates in commit messages and notes
- keep backups of working workflow exports

## 7. Suggested future additions

As the project grows, consider adding:

- JSON workflow exports for each automation
- AI prompt templates
- service mapping documentation
- data schema examples
- staged environments for dev/test/prod

## 8. Best-practice summary

The strongest automation setup is one that is:

- transparent
- monitored
- secure
- modular
- documented

This makes it easier to maintain and scale without losing control over AI-driven actions.
