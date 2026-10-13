# Contributing

Thank you for considering contributing to Drogon AI Agent Workflows! Contributions help improve the project and benefit other users.

Ways to contribute:

- Report issues: open an Issue describing the problem, expected behavior, and steps to reproduce.
- Suggest features: open an Issue with a clear description and use cases.
- Submit fixes or improvements: fork the repo, make changes, and open a Pull Request.

Guidelines:

1. Keep secrets out of commits
   - Never commit API keys, OAuth tokens, or other secrets. Use `.env` and n8n credentials.

2. Code style and JSON
   - Workflow exports are JSON files. Please validate JSON before opening a PR.
   - Run `npm run validate` (provided) to check JSON parsing of workflow files.

3. Writing good PRs
   - Use a descriptive title and summary of what the PR changes.
   - Reference any related issues.
   - If your change requires credential or environment changes, document them in `docs/SETUP.md`.

4. Tests and verification
   - For workflow changes, include notes describing how the workflow was tested inside n8n.

5. License
   - By contributing, you agree that your contributions will be licensed under the project's MIT license.

Thank you!
