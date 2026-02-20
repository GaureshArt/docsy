import { DocsyConfig } from "@gaureshart/docsy-core";
import fs from "node:fs/promises";
import prettier from "prettier";

function formatAsTypeScript(obj: any, indent = 2): string {
  const spaces = ' '.repeat(indent);

  if (typeof obj !== 'object' || obj === null) {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    const items = obj.map(item => formatAsTypeScript(item, indent + 2));
    return `[\n${spaces}  ${items.join(`,\n${spaces}  `)}\n${spaces}]`;
  }

  const entries = Object.entries(obj)
    .filter(([_, v]) => v !== undefined)
    .map(([key, value]) => {
      const formattedValue = formatAsTypeScript(value, indent + 2);
      return `${spaces}  ${key}: ${formattedValue}`;
    });

  return `{\n${entries.join(',\n')}\n${spaces}}`;
}

export async function writeConfig(
  filePath: string,
  data: DocsyConfig
): Promise<void> {

  const configObject = formatAsTypeScript(data, 0);

  const template = `import { defineConfig } from "@gaureshart/docsy-core";

export default defineConfig(${configObject});
`;
  const formatted = await prettier.format(template, {
    parser: "typescript",
  });

  await fs.writeFile(filePath, formatted, "utf-8");
}