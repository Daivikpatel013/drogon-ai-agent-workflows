# Workflows

This folder is intended for exported n8n workflow JSON files and workflow-specific notes.

Suggested structure:

```text
workflows/
├── README.md
├── job-application-agent.json
├── daily-run.json
├── weekly-skills-summary.json
└── notes/
    └── workflow-notes.md
```

## Recommended workflow naming

- `job-application-agent.json`
- `daily-run.json`
- `weekly-skills-summary.json`

## Best practices

- keep each workflow under version control
- document trigger conditions and credentials
- test new versions in development before replacing live workflows
- store secrets outside the repository

## Importing workflows into n8n

1. Open n8n.
2. Go to the Workflow menu.
3. Select Import from File.
4. Upload the JSON export from this folder.
5. Reconnect credentials and verify node configuration.
6. Save and activate the workflow.
