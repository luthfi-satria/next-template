# GitHub MCP Server Setup Guide

This guide walks you through setting up the GitHub Model Context Protocol (MCP) server in VS Code.

## Step 1: Install GitHub MCP Server

Reference: [GitHub MCP Server Repository](https://github.com/mcp-servers/github)

The GitHub MCP server will be installed automatically when you run VS Code with the MCP configuration.

## Step 2: Generate GitHub Personal Access Token (PAT)

1. Go to your GitHub Account settings:
   - Click your profile avatar → **Settings**
   - Click **Developer settings** (bottom of the left sidebar)
   - Click **Personal access tokens** → **Tokens (classic)**

2. Click **Generate new token (classic)**

3. Configure the token:
   - **Token name**: Enter a descriptive name (e.g., `copilot-mcp-token`)
   - **Expiration**: Select your preferred expiration period
   - **Scopes**: Check the following scopes:
     - ✅ `repo` - Full control of private repositories
     - ✅ `workflow` - Update GitHub Action workflows
   
4. Click **Generate token**

5. **Copy and save the token** - You won't be able to see it again!

## Step 3: Configure MCP Server in VS Code

Create or update `.vscode/mcp.json` in your workspace root:

```json
{
  "servers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${input:githubToken}"
      }
    }
  },
  "inputs": [
    {
      "id": "githubToken",
      "type": "promptString",
      "description": "Enter your GitHub Personal Access Token (PAT):",
      "password": true
    }
  ]
}
```

## Step 4: Verify the Setup

1. Restart VS Code
2. You'll be prompted to enter your GitHub Personal Access Token
3. Paste the token you generated in Step 2
4. The GitHub MCP server will now be active and available to Copilot

## Verifying GitHub MCP Server Status

Run the following command in your terminal to check if the server starts properly:

```bash
npx -y @modelcontextprotocol/server-github
```

If you see the following output:
```bash
GitHub MCP Server running on stdio
```

It indicates that the MCP server is active and ready to handle incoming requests.

## Usage

Once configured, you can use Copilot with GitHub MCP to:
- Query repository information
- Search code
- Browse issues and pull requests
- Perform repository operations