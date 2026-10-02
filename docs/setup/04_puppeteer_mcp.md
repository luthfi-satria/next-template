# Puppeteer MCP Server Setup Guide

This guide walks you through setting up the Puppeteer Model Context Protocol (MCP) server in VS Code.

## Overview

Puppeteer MCP enables browser automation through Model Context Protocol, allowing you to:
- 🌐 Take screenshots of web pages
- 📄 Extract page content and structure
- 🔍 Perform automated testing
- ⚙️ Automate web interactions
- 📊 Gather web data

## Step 1: Prerequisites

Ensure you have:
- ✅ Node.js 16+ installed
- ✅ Chrome/Chromium browser installed
- ✅ At least 500MB free disk space

Check Node.js version:
```bash
node --version  # Should be v16+
npm --version   # Should be v7+
```

## Step 2: Configure MCP Server in VS Code

Update `.vscode/mcp.json` to include the Puppeteer server:

```json
{
  "servers": {
    "puppeteer": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-puppeteer"
      ],
      "env": {
        "PUPPETEER_HEADLESS": "true",
        "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD": "false"
      }
    }
  }
}
```

## Step 3: Optional - Configure Puppeteer Settings

Add these environment variables to control Puppeteer behavior:

```bash
# .env.local
PUPPETEER_HEADLESS=true                          # Run in headless mode
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false          # Auto-download Chromium
PUPPETEER_TIMEOUT=30000                         # 30 second timeout
PUPPETEER_DISABLE_HEADLESS_MODE=false           # Don't show UI
```

## Step 4: Test Puppeteer Installation

Verify Puppeteer works correctly:

```bash
npx -y @modelcontextprotocol/server-puppeteer
```

**Expected output:**
```bash
Puppeteer MCP Server running on stdio
```

If Chromium download is needed, it may take a few minutes on first run.

## Step 5: Verify the Setup in VS Code

1. Restart VS Code
2. Open the Copilot chat
3. The Puppeteer MCP server will be active and ready
4. You can now use Copilot to automate browser tasks

## Common Use Cases

### Taking Screenshots
```
"Take a screenshot of https://localhost:3000/login"
```

### Extracting Page Content
```
"Get the text content from the login form at https://localhost:3000/login"
```

### Automated Testing
```
"Navigate to https://localhost:3000, click the login button, and take a screenshot"
```

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `PUPPETEER_HEADLESS` | `true` | Run browser in headless mode |
| `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` | `false` | Skip Chromium download |
| `PUPPETEER_TIMEOUT` | `30000` | Timeout in milliseconds |
| `PUPPETEER_DISABLE_HEADLESS_MODE` | `false` | Show browser UI (for debugging) |

## Troubleshooting

### Chrome/Chromium Not Found
**Error:**
```
Error: Chrome is not installed at /path/to/chrome
```

**Solution**: Let Puppeteer download Chromium:
```bash
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false npx -y @modelcontextprotocol/server-puppeteer
```

### Timeout Errors
**Error:**
```
TimeoutError: Navigation timeout of 30000ms exceeded
```

**Solution**: Increase timeout in `.env.local`:
```bash
PUPPETEER_TIMEOUT=60000  # 60 seconds
```

### Out of Memory
**Solution**: Limit concurrent page instances and close pages after use:
```
Ensure your MCP configuration doesn't spawn too many browser instances
```

### Port Already in Use
**Solution**: Change the port or kill the existing process:
```bash
lsof -i :3000  # Find process using port 3000
kill -9 <PID>  # Kill the process
```

## Performance Tips

1. **Use headless mode** (default) for better performance
2. **Close pages** after use to free memory
3. **Set appropriate timeouts** to avoid hanging
4. **Limit concurrent instances** to 2-3 browsers max
5. **Use screenshots** instead of full page rendering when possible

## Integration with Development

### Local Development Server
Test automation against your local app:
```
"Verify the login form at http://localhost:3000/login works correctly"
```

### Multi-Page Testing
Navigate through your application:
```
"Go to http://localhost:3000, click login, enter credentials, and verify redirect"
```

## References

- [Puppeteer Documentation](https://pptr.dev/)
- [Puppeteer MCP Server](https://github.com/mcp-servers/puppeteer)
- [Browser Automation Best Practices](https://pptr.dev/guides/what-is-puppeteer)
