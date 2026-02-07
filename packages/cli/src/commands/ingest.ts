import path from "node:path";
import { pathToFileURL } from "node:url";
import {ingest, type DocsyConfig } from "@docsy/core";
import ora from "ora";
import chalk from "chalk";


export async function runIngest() {
  const cwd = process.cwd();
  const configPath = path.join(cwd, "docsy.config.ts");

  const configUrl = pathToFileURL(configPath).href;
  const { default: config } = await import(configUrl) as { default: DocsyConfig };

  const spinner = ora("Starting ingestion...").start("Starting ingestion...");

  try {
    await ingest(config);
    spinner.succeed(chalk.green("✅ Ingestion complete!"));
  } catch (err) {
    spinner.fail(chalk.red("Ingestion failed"));
    console.error(err);
    process.exit(1);
  }
}