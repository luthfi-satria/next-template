# PostgreSQL MCP Server Setup Guide

This guide walks you through setting up the PostgreSQL Model Context Protocol (MCP) server in VS Code.

## Step 1: Prerequisites

Before setting up the PostgreSQL MCP server, ensure you have:
- ✅ PostgreSQL database running (local or remote)
- ✅ Database connection details (host, port, user, password, database name)
- ✅ `.env.local` file with `DATABASE_URL` configured

Example `.env.local`:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
```

## Step 2: Configure MCP Server in VS Code

Update `.vscode/mcp.json` to include the PostgreSQL server:

```json
{
  "servers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres"
      ],
      "env": {
        "DATABASE_URL": "${env:DATABASE_URL}"
      }
    }
  }
}
```

## Step 3: Verify Environment Setup

Ensure your `.env.local` file is properly configured:

```bash
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=my_app_db
POSTGRES_PORT=5432
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/my_app_db"
```

## Step 4: Test the Connection

Run the following command to verify the PostgreSQL MCP server connection:

```bash
npx dotenv-cli -e .env.local -- npx -y @modelcontextprotocol/server-postgres
```

**Expected output:**
```bash
PostgreSQL MCP Server running on stdio
```

## Step 5: Verify with Docker Compose

If using Docker Compose, ensure the database service is running:

```bash
# Start PostgreSQL container
docker-compose up -d

# Check container status
docker-compose ps

# Test connection
npx dotenv-cli -e .env.local -- psql -c "SELECT 1"
```

## Step 6: Verify the Setup in VS Code

1. Restart VS Code
2. Open the Copilot chat
3. The PostgreSQL MCP server will automatically connect using the `DATABASE_URL` from your environment
4. You can now query your database through Copilot

## Features Available

With PostgreSQL MCP configured, you can:
- 📊 Query database tables and schemas
- 🔍 Explore table structures and relationships
- 📝 Run SQL queries directly
- 🛠️ Migrate and manage schema changes
- 📈 Generate database documentation

## Troubleshooting

### Connection Failed Error
```
psql: error: connection to server on socket "/tmp/.s.PGSQL.5432" failed
```
**Solution**: Ensure PostgreSQL is running:
```bash
# For Docker
docker-compose up -d

# For local PostgreSQL
brew services start postgresql  # macOS
sudo systemctl start postgresql  # Linux
```

### Environment Variable Not Found
**Solution**: Verify `.env.local` exists in the project root and contains `DATABASE_URL`:
```bash
echo $DATABASE_URL  # Should output your connection string
```

### Wrong Credentials Error
**Solution**: Double-check your `DATABASE_URL` format:
```
postgresql://username:password@host:port/database
```

## References

- [PostgreSQL MCP Server Documentation](https://github.com/mcp-servers/postgres)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Drizzle ORM Integration](https://orm.drizzle.team/)
