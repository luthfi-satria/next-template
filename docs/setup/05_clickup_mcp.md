# ClickUp MCP Server Setup Guide

This guide walks you through setting up the ClickUp Model Context Protocol (MCP) server in VS Code.

## Overview

ClickUp MCP enables seamless integration with your ClickUp workspace, allowing you to:
- 📋 Access and manage tasks and lists
- 📝 Create and update task details
- 👥 Manage team members and permissions
- 🏷️ View custom fields and properties
- 💬 Add comments and attachments
- 🔍 Search and filter tasks

## Step 1: Generate ClickUp API Token

1. Go to [ClickUp Settings](https://app.clickup.com/settings)
   - Click your profile avatar in the bottom left
   - Click **Settings**
   - Click **Integrations** (or go directly to [API Integration](https://app.clickup.com/settings/integrations/api))

2. Look for **ClickUp API** section

3. Click **Generate** to create a new API token

4. **Copy and save the token** - You won't be able to see it again!

5. (**Optional**) Set token name and expiration date for security

## Step 2: Configure MCP Server in VS Code

Update `.vscode/mcp.json` to include the ClickUp server:

```json
{
  "servers": {
    "clickup": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-clickup"
      ],
      "env": {
        "CLICKUP_API_TOKEN": "${input:clickupToken}"
      }
    }
  },
  "inputs": [
    {
      "id": "clickupToken",
      "type": "promptString",
      "description": "Enter your ClickUp API Token:",
      "password": true
    }
  ]
}
```

## Step 3: Add to `.env.local` (Optional)

If you prefer to store the token in environment variables instead of prompting:

```bash
# .env.local
CLICKUP_API_TOKEN=pk_123456789abcdef  # Your ClickUp API token
```

Then update `.vscode/mcp.json`:

```json
{
  "servers": {
    "clickup": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-clickup"
      ],
      "env": {
        "CLICKUP_API_TOKEN": "${env:CLICKUP_API_TOKEN}"
      }
    }
  }
}
```

## Step 4: Test the Connection

Verify ClickUp MCP server connection:

```bash
CLICKUP_API_TOKEN=your_token npx -y @modelcontextprotocol/server-clickup
```

**Expected output:**
```bash
ClickUp MCP Server running on stdio
```

## Step 5: Verify the Setup in VS Code

1. Restart VS Code
2. You'll be prompted to enter your ClickUp API Token (if using prompt method)
3. Paste the token you generated in Step 1
4. The ClickUp MCP server will now be active
5. You can now query your ClickUp workspace through Copilot

## Common Use Cases

### Getting Task Information
```
"Show me the details of task #14ymjnw0hwz"
```

### Creating a New Task
```
"Create a new task in ClickUp with title 'Setup authentication' and description 'Implement login feature'"
```

### Updating Task Status
```
"Mark task #14ymjnw0hwz as done"
```

### Searching Tasks
```
"Find all open tasks related to 'auth' in my workspace"
```

### Getting Workspace Information
```
"Show me all lists and teams in my ClickUp workspace"
```

## API Token Scopes

When generating your token, ensure it has access to:
- ✅ **Tasks** - Read/Write task information
- ✅ **Lists** - Read/Write lists
- ✅ **Workspaces** - Read workspace data
- ✅ **Teams** - Read team information
- ✅ **Attachments** - Manage task attachments

## Troubleshooting

### Invalid API Token
**Error:**
```
Error: Invalid or expired API token
```

**Solution**: 
1. Generate a new token in ClickUp settings
2. Update your `.vscode/mcp.json` or `.env.local`
3. Restart VS Code

### Token Expired
**Error:**
```
Error: Token has expired
```

**Solution**: 
1. Go to ClickUp Settings → Integrations → API
2. Generate a new token
3. Update your configuration

### Workspace Not Accessible
**Error:**
```
Error: Workspace not found or access denied
```

**Solution**:
1. Verify the token has workspace access
2. Check your ClickUp subscription level
3. Ensure the token scope includes workspaces

### Connection Timeout
**Error:**
```
Error: Connection timeout
```

**Solution**:
1. Check your internet connection
2. Verify ClickUp API is accessible
3. Check for network firewall restrictions
4. Increase timeout in MCP configuration

## Security Best Practices

1. **Never commit tokens** - Always use `.env.local` or prompt for input
2. **Rotate tokens regularly** - Generate new tokens periodically
3. **Use minimal scopes** - Only grant necessary permissions
4. **Separate tokens for teams** - Create team-specific tokens if needed
5. **Monitor token usage** - Check ClickUp logs for unauthorized access

### Example `.gitignore` Entry
```bash
# Security - Never commit API tokens
.env.local
.env.*.local
.vscode/mcp.tokens.json
```

## Integration with Development Workflow

### Automatic Task Tracking
Link ClickUp tasks in your development:
```
"When creating a PR, reference the ClickUp task #14ymjnw0hwz in the description"
```

### Task-Based Development
```
"Show me the acceptance criteria for task #14ymjnw0hwz and help me implement the feature"
```

### Progress Monitoring
```
"Update the progress of task #14ymjnw0hwz to 75% complete"
```

## References

- [ClickUp API Documentation](https://clickup.com/api)
- [ClickUp API Authentication](https://clickup.com/api/clickapidocs/authentication)
- [ClickUp MCP Server](https://github.com/mcp-servers/clickup)
- [ClickUp Workspace Settings](https://app.clickup.com/settings)

## Support

For issues with the ClickUp MCP server:
1. Check ClickUp status page: [status.clickup.com](https://status.clickup.com)
2. Review API rate limits and quotas
3. Contact ClickUp Support: [support.clickup.com](https://support.clickup.com)
