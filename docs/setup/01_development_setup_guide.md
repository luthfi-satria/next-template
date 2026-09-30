# Local Environment & Development Setup Guide

Welcome to the project! This guide provides complete, step-by-step instructions to get your local development environment running smoothly from scratch.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Initial Project Setup](#2-initial-project-setup)
3. [PostgreSQL Setup](#3-postgresql-setup)
4. [Environment Variables](#4-environment-variables)
5. [Database Migrations (Drizzle ORM)](#5-database-migrations-drizzle-orm)
6. [Tooling & Quality Enforcement (Biome & Husky)](#6-tooling--quality-enforcement-biome--husky)
7. [MCP (Model Context Protocol) Setup](#7-mcp-model-context-protocol-setup)
8. [Running the Application](#8-running-the-application)
9. [Common CLI Commands Summary](#9-common-cli-commands-summary)

---# Local Environment & Development Setup Guide

Welcome to the project! This guide provides complete, step-by-step instructions to get your local development environment running smoothly from scratch.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Initial Project Setup](#2-initial-project-setup)
3. [PostgreSQL Setup (Docker Compose)](#3-postgresql-setup-docker-compose)
4. [Environment Variables](#4-environment-variables)
5. [Database Migrations & ORM (Drizzle)](#5-database-migrations--orm-drizzle)
6. [Tooling & Quality Enforcement (Biome & Husky)](#6-tooling--quality-enforcement-biome--husky)
7. [MCP (Model Context Protocol) Setup](#7-mcp-model-context-protocol-setup)
8. [Running the Application](#8-running-the-application)
9. [Common CLI Commands Summary](#9-common-cli-commands-summary)

---

## 1. Prerequisites

Ensure you have the following tools installed on your machine before proceeding:

* **Node.js**: `v20.x` or later
* **pnpm**: `v9.x` or later (`npm install -g pnpm`)
* **Docker Desktop**: Installed and running (Recommended for local PostgreSQL)
* **Git**: Installed and configured
* **IDE**: VS Code, Cursor, or Windsurf

---

## 2. Initial Project Setup

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install Dependencies:**
   ```bash
   pnpm install
   ```

3. **Initialize Pre-commit Hooks (Husky):**
   ```bash
   pnpm prepare
   ```

---

## 3. PostgreSQL Setup (Docker Compose)

We use Docker Compose to run PostgreSQL locally in an isolated environment.

### A. Docker Compose Configuration (`docker-compose.yml`)
Ensure a `docker-compose.yml` exists at the root of the project:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: next_pgdb
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-password}
      POSTGRES_DB: ${POSTGRES_DB:-my_app_db}
    ports:
      - "${POSTGRES_PORT:-5432}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-postgres} -d ${POSTGRES_DB:-my_app_db}"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
    driver: local
```

### B. Database Initialization (`docker/init.sql`)
Ensure `docker/init.sql` exists to enable necessary extensions when the container starts for the first time:

```sql
-- Enable UUID extension for primary key generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Set timezone to UTC
SET timezone = 'UTC';
```

### C. Container Operations

* **Start PostgreSQL Container:**
  ```bash
  pnpm db:up
  # or directly: docker compose up -d
  ```

* **Check Status & Health:**
  ```bash
  docker compose ps
  ```

* **View Database Logs:**
  ```bash
  pnpm db:logs
  # or directly: docker compose logs -f postgres
  ```

* **Stop Container (Preserve Data):**
  ```bash
  pnpm db:down
  # or directly: docker compose down
  ```

* **Wipe Data & Fresh Restart:**
  ```bash
  pnpm db:reset
  # or directly: docker compose down -v && docker compose up -d
  ```

---

## 4. Environment Variables

1. Copy `.env.example` to create your local `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and configure your credentials:
   ```env
   # PostgreSQL Connection Credentials
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=password
   POSTGRES_DB=my_app_db
   POSTGRES_PORT=5432

   # Connection URL for Drizzle ORM and MCP Servers
   DATABASE_URL="postgresql://postgres:password@localhost:5432/my_app_db"

   # App Base URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

---

## 5. Database Migrations & ORM (Drizzle)

Once the PostgreSQL container is running and `.env.local` is configured, manage your database schema using Drizzle ORM:

1. **Generate Migration SQL Files:**
   Generates SQL files in `/drizzle` based on changes in `src/lib/db/schema.ts`:
   ```bash
   pnpm db:generate
   ```

2. **Run Pending Migrations:**
   Executes unapplied SQL migration files against the PostgreSQL database:
   ```bash
   pnpm db:migrate
   ```

3. **Direct Schema Sync (Prototyping Mode):**
   Directly pushes `schema.ts` modifications to the database without producing migration SQL files:
   ```bash
   pnpm db:push
   ```

4. **Visual Database Management (Drizzle Studio):**
   Launches a GUI browser interface to view and edit database rows:
   ```bash
   pnpm db:studio
   ```

---

## 6. Tooling & Quality Enforcement (Biome & Husky)

We use **Biome** for lightning-fast linting, formatting, and import sorting, and **Husky** for automated pre-commit validation.

### Workflow Commands

* **Check Formatting & Linting Errors:**
  ```bash
  pnpm biome:check
  ```

* **Auto-Fix Formatting & Lint Issues:**
  ```bash
  pnpm biome:write
  ```

* **TypeScript Strict Type-Checking:**
  ```bash
  pnpm typecheck
  ```

### Automated Pre-Commit Hook

Whenever you execute `git commit`, Husky triggers `lint-staged` configured in `package.json`:

```json
"lint-staged": {
  "*.{js,ts,jsx,tsx,json,scss}": [
    "biome check --write --no-errors-on-unmatched"
  ]
}
```

If any unfixable lint or type errors exist, the commit will be safely aborted.

---

## 7. MCP (Model Context Protocol) Setup

Model Context Protocol (MCP) enables AI coding tools (Cursor, Windsurf, VS Code + Cline/Roo Code/Copilot) to read database schemas and repository information directly.

### A. Central Configuration File (`.mcp/mcp-config.json`)

Create `.mcp/mcp-config.json` at the root of the project:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://postgres:password@localhost:5432/my_app_db"
      ]
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_pat_here"
      }
    }
  }
}
```

### B. IDE Configuration

* **Cursor IDE:** Navigate to `Settings` > `Features` > `MCP` > `Add New MCP Server`. Set type to `command` and provide the command string above.
* **VS Code (Cline / Roo Code / Copilot Agent):** Open the extension's MCP settings tab and paste the JSON contents from `.mcp/mcp-config.json`.

> **Security Note:** Never connect MCP servers to a production database. Only connect to your local development or staging environment.

---

## 8. Running the Application

Start the local Next.js development server with Turbopack enabled:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 9. Common CLI Commands Summary

| Task | Command | Description |
| --- | --- | --- |
| **Start Dev Server** | `pnpm dev` | Starts Next.js dev server with Turbopack (`http://localhost:3000`) |
| **Build Production** | `pnpm build` | Compiles production-ready build |
| **Start Production** | `pnpm start` | Runs production build locally |
| **Typecheck** | `pnpm typecheck` | Validates TypeScript types across the codebase |
| **Check Code Quality** | `pnpm biome:check` | Runs Biome lint and format checks |
| **Fix Code Quality** | `pnpm biome:write` | Auto-fixes formatting, linting, and organizes imports |
| **Start DB Container** | `pnpm db:up` | Starts local PostgreSQL Docker container |
| **Stop DB Container** | `pnpm db:down` | Stops local PostgreSQL Docker container |
| **View DB Logs** | `pnpm db:logs` | Streams PostgreSQL container logs |
| **Reset DB Volume** | `pnpm db:reset` | Drops DB container volume and starts fresh |
| **Generate Migration** | `pnpm db:generate` | Creates SQL migration files from Drizzle schema |
| **Apply Migrations** | `pnpm db:migrate` | Runs pending SQL migrations against PostgreSQL |
| **Sync DB Schema** | `pnpm db:push` | Directly updates DB schema without SQL files |
| **Open DB Studio** | `pnpm db:studio` | Launches Drizzle Studio web GUI |

## 1. Prerequisites

Ensure you have the following installed on your machine before proceeding:

* **Node.js**: `v20.x` or later
* **pnpm**: `v9.x` or later (`npm install -g pnpm`)
* **Docker Desktop** (Recommended for local PostgreSQL) or a local PostgreSQL instance
* **Git**: Installed and configured
* **IDE**: VS Code or Cursor

---

## 2. Initial Project Setup

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. ** Install Dependencies
  ```bash
  pnpm install
  ```

3. ** Initialize Pre-commit Hooks (Husky)
  ```bash
  pnpm prepare
  ```
