# MCP server

- typescript
- mcp typescript-sdk

## Resources

- https://modelcontextprotocol.io/quickstart/server#node
- https://github.com/modelcontextprotocol/typescript-sdk/
- https://github.com/modelcontextprotocol/inspector

## How to start

### MCP Inspector

```
npm install
npm run start  ... start MCP inspector
```

On the MCP Inspector UI

- Command: node
- Arguments: build/index.js

Then click `Connect`.

### Cursor

- https://docs.cursor.com/context/mcp

```
npm install
npm run build
```

In cursor,

1. open the settings page > Tools & Integrations > New MCP Server
2. add to the mcp.json
   ```
   {
     "mcpServers": {
         "my-mcp-server": {
           "command": "node",
           "args": ["/ABSOLUTE_PATH/mcp-server/build/index.js"]
         }
     }
   }
   ```
3. in the settings page, select the tools to enable
