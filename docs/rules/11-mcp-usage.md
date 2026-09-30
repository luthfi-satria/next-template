# MCP (MODEL CONTEXT PROTOCOL) USAGE RULES

## Overview
Model Context Protocol (MCP) enables AI coding assistants to interact directly with local/remote databases, GitHub repositories, and documentation servers.

## Guidelines
1. **Database Safety**:
   - The PostgreSQL MCP server MUST be connected to the LOCAL development database or a STAGING database only.
   - NEVER connect MCP tools directly to the Production database.
2. **Workflow Automation**:
   - Before writing Server Actions or Drizzle queries, ask the AI agent to run PostgreSQL MCP tools (e.g., `db:get_schema`) to inspect real-time database definitions.
   - Use GitHub MCP to generate Pull Requests (PRs) and summarize commit diffs automatically.
3. **Environment Security**:
   - Keep GitHub access tokens in local configuration files (`.env.local` or untracked local JSON settings).
   - Never commit raw access keys or credentials to Git repositories.