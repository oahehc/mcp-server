import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const version = "1.0.0";
const name = "my-mcp-server";
const server = new McpServer({
  name,
  version,
  // capabilities: {
  //   resources: {},
  //   tools: {},
  // },
});

// Resources are how you expose data to LLMs
const CONFIG_URI = "config://info";
server.registerResource(
  "config",
  CONFIG_URI,
  {
    title: "Config",
    description: "Returns MCP server info",
    mimeType: "application/json",
  },
  async () => ({
    contents: [
      {
        uri: CONFIG_URI,
        text: JSON.stringify({ name, version }),
      },
    ],
  })
);

// Tools let LLMs take actions through your server,
// expected to perform computation and have side effects:
server.registerTool(
  "add",
  {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() },
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }],
  })
);

// Prompts are reusable templates
server.registerPrompt(
  "review-code",
  {
    title: "Code Review",
    description: "Review code for best practices and potential issues",
    argsSchema: { code: z.string() },
  },
  ({ code }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Please review this code:\n\n${code}`,
        },
      },
    ],
  })
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
