import prompts from "prompts";
import ora from "ora";
import path from "node:path";
import fs from "node:fs";
import chalk from "chalk";
import { writeConfig } from "../utils/write-config.js";
import { writeEnvExample } from "../utils/write-env-example.js";


export async function runInit() {
  const cwd = process.cwd();
  const configPath = path.join(cwd, "docsy.config.ts");
  const envPath = path.join(cwd, ".env.example");

  if (fs.existsSync(configPath)) {
    console.log(chalk.yellow("⚠️  docsy.config.ts already exists"));
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "Overwrite existing config?",
      initial: false,
    });
    if (!overwrite) return;
  }

  console.log(chalk.bold("\n📝 GitHub Source Configuration\n"));

  const answers = await prompts([
    {
      type: "text",
      name: "githubOwner",
      message: "GitHub repository owner",
      validate: (v) => v.length > 0 || "Owner is required",
    },
    {
      type: "text",
      name: "githubRepo",
      message: "GitHub repository name",
      validate: (v) => v.length > 0 || "Repo name is required",
    },
    {
      type: "text",
      name: "githubBranch",
      message: "Branch name",
      initial: "main",
    },
    {
      type: "text",
      name: "githubPath",
      message: "Docs folder path (leave empty for root)",
      initial: "",
    },
    {
      type: "number",
      name: "maxFiles",
      message: "Maximum files to index",
      initial: 100,
    },
    {
      type: "number",
      name: "chunkSize",
      message: "Chunk size (characters)",
      initial: 1000,
    },
    {
      type: "select",
      name: "embeddingProvider",
      message: "Embedding provider",
      choices: [
        { title: "Gemini (Free)", value: "gemini" },
        { title: "OpenAI", value: "openai" },
      ],
      initial: 0,
    },
    {
      type: "text",
      name: "collectionName",
      message: "Vector database collection name",
      initial: answers => `${answers.githubRepo}-docs`,
    },
    {
      type: "confirm",
      name: "advancedOptions",
      message: "Configure advanced options?",
      initial: false,
    },
  ]);

  if (answers.advancedOptions) {
    const advanced = await prompts([
      {
        type: "list",
        name: "excludePaths",
        message: "Exclude paths (comma-separated)",
        initial: "node_modules,dist,test",
        separator: ",",
      },
      {
        type: "confirm",
        name: "strictRegex",
        message: "Use strict regex filtering?",
        initial: false,
      },
    ]);
    Object.assign(answers, advanced);
  }

  const spinner = ora("Creating configuration files...").start();

  try {
    await writeConfig(configPath, answers);
    await writeEnvExample(envPath);
    
    spinner.succeed(chalk.green("✨ Docsy initialized successfully!"));
    
    console.log(chalk.bold("\n📋 Next steps:\n"));
    console.log(chalk.gray("1."), "Copy", chalk.cyan(".env.example"), "to", chalk.cyan(".env"));
    console.log(chalk.gray("2."), "Add your API keys to", chalk.cyan(".env"));
    console.log(chalk.gray("3."), "Run", chalk.cyan("docsy ingest"), "to index your docs\n");
    
  } catch (err) {
    spinner.fail(chalk.red("Failed to create config"));
    console.error(err);
    process.exit(1);
  }
}