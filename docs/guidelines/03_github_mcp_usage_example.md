Here is a comprehensive documentation draft detailing the capabilities of both MCP servers. You can directly copy and add this to your project's `README.md` or a dedicated `docs/mcp-guide.md` file.

---

# Model Context Protocol (MCP) Capabilities & Prompting Guide

This repository integrates two Model Context Protocol (MCP) servers—**GitHub MCP** and **PostgreSQL MCP**—allowing AI assistants (GitHub Copilot, Roo Code, Cline) to interact directly with the repository workflow and the live local database.

---

## 🛠️ 1. GitHub MCP Server (`@modelcontextprotocol/server-github`)

The GitHub MCP server grants the AI assistant deep contextual awareness of your remote GitHub repository, enabling automated management of issues, pull requests, commits, and workflows directly from VS Code.

### 💡 Capabilities & Prompt Examples

#### 🐛 Issue Management

* **List & Filter Issues:**
> *"Fetch the 5 latest open issues labeled `bug` in this repository and summarize their main root causes."*


* **Create New Issues:**
> *"Create a new GitHub issue titled `[BUG] Registration fails on slow connections` with a detailed step-by-step reproduction guide based on our recent fix."*


* **Add Comments:**
> *"Add a comment to issue #14 stating that the issue has been resolved in the latest commit."*



#### 🔀 Pull Requests & Code Review

* **Draft PR Creation:**
> *"Compare the diff between branch `feature/auth` and `main`. Create a draft Pull Request with a clear summary of changes and a QA checklist."*


* **Review Feedback Analysis:**
> *"Read the latest review comments on PR #8 and list all files that require modification."*



#### ⚙️ Workflows & Commit Inspection

* **GitHub Actions Monitoring:**
> *"Check the status of the latest GitHub Actions workflow run on the `main` branch. Did any job fail?"*


* **Commit History:**
> *"List all commits made in the repository over the last 7 days grouped by author."*



---

## 🐘 2. PostgreSQL MCP Server (`@modelcontextprotocol/server-postgres`)

The PostgreSQL MCP server connects your AI assistant directly to your active local PostgreSQL Docker instance (`next_pgdb`). This allows the AI to inspect live schemas, run read-only queries, and verify Drizzle ORM migrations without leaving the editor.

### 💡 Capabilities & Prompt Examples

#### 🔍 Schema Inspection & Migration Drift

* **Schema Verification:**
> *"Inspect the live structure of the `users` and `sessions` tables in PostgreSQL. Compare them against `src/lib/db/schema.ts` to check if any columns are missing migrations."*


* **Index & Constraint Audit:**
> *"Display all primary keys, foreign keys, and indexes currently defined in the `next-template` database."*



#### 📊 Data Inspection & Debugging

* **Record Verification:**
> *"Query the `users` table for the email `admin@example.com` and verify if the `role` field is correctly populated."*


* **Aggregation & Statistics:**
> *"Count the total number of registered users in the local database and group them by `role`."*



#### ⚡ Query Execution & Optimization

* **Query Validation:**
> *"Write a SQL query that joins `users` with `orders` to retrieve total user spending, then execute it against the database to confirm the output structure."*


* **Database Health Check:**
> *"List the largest tables in the `next-template` database by row count."*



---

## 🔀 3. Combined Cross-Tool Workflows

By combining both MCP servers, your AI assistant can execute end-to-end debugging and management tasks across both the repository and the database layer in a single prompt:

* **Issue Verification with Live DB Check:**
> *"Read GitHub issue #22 regarding the missing user profile data. Then, query the local PostgreSQL `users` table to check if the affected account's record is malformed."*


* **Migration Audit & PR Drafting:**
> *"Check if the live PostgreSQL database schema matches our Drizzle definitions. If there are new schema changes, summarize the diff and prepare a Pull Request description for the database migration."*