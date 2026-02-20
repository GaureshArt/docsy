import prompts from "prompts";
import ora from "ora";
import path from "node:path";
import fs from "node:fs";
import chalk from "chalk";
import { writeConfig } from "../utils/write-config.js";
import { writeEnvExample } from "../utils/write-env-example.js";
import { DocsyConfig } from "../../../core/dist/index.js";



export interface FullAnswers {
  githubOwner: string;
  githubRepo: string;
  githubBranch: string;
  githubPath: string;
  maxFiles: number;
  chunkSize: number;
  provider: 'google' | 'openai';
  model: string;
  taskType?: string;
  vectorDatabse: {
    provider: 'qdrant',
    collection: string
  }
  excludePaths?: string[];
  strictRegex?: boolean;
}
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
  const sourceAnswers = await prompts([
    { type: 'text', name: 'owner', message: 'GitHub owner' },
    { type: 'text', name: 'repo', message: 'GitHub repo' },
    { type: 'text', name: 'branch', message: 'Branch', initial: 'main' },
  ]);
  console.log(chalk.bold("\n🔧 Processing Configuration\n"));
  const processingAnswers = await prompts([
    { type: 'number', name: 'maxFiles', message: 'Max files', initial: 100 },
    { type: 'number', name: 'chunkSize', message: 'Chunk size', initial: 1000 },
    { type: 'number', name: 'chunkOverlap', message: 'Chunk overlap', initial: 200 },
  ]);

  console.log(chalk.bold("\n🟦 Embedding Configuration\n"));
  const { embeddingProvider } = await prompts({
    type: 'select',
    name: 'embeddingProvider',
    message: 'Embedding provider',
    choices: [
      { title: 'Google', value: 'google' },
      { title: 'OpenAI', value: 'openai' }
    ]
  });

  let embeddingConfig;

  if (embeddingProvider === 'google') {
    const google = await prompts([
      {
        type: 'select',
        name: 'taskType',
        message: 'Task type',
        choices: [
          { title: 'Retrieval Document', value: 'RETRIEVAL_DOCUMENT' },
          { title: 'Question Answering', value: 'QUESTION_ANSWERING' }
        ]
      },
      {
        type: 'select',
        name: 'model',
        message: 'Model',
        choices: [
          { title: 'gemini-embedding-001', value: 'gemini-embedding-001' }
        ]
      }
    ]);

    embeddingConfig = {
      provider: 'google' as const,
      taskType: google.taskType,
      model: google.model
    };
  } else {
    const openai = await prompts({
      type: 'select',
      name: 'model',
      message: 'Model',
      choices: [
        { title: 'text-embedding-3-small', value: 'text-embedding-3-small' },
        { title: 'text-embedding-3-large', value: 'text-embedding-3-large' }
      ]
    });

    embeddingConfig = {
      provider: 'openai' as const,
      model: openai.model
    };
  }

  console.log(chalk.bold("\📊 Database Configuration\n"));
  const dbAnswers = await prompts({
    type: 'text',
    name: 'collection',
    message: 'Collection name',
    initial: `${sourceAnswers.repo}-docs`
  });
  const finalConfig: DocsyConfig = {
    source: {
      type: 'github',
      owner: sourceAnswers.owner,
      repo: sourceAnswers.repo,
      branch: sourceAnswers.branch
    },
    processing: {
      maxFiles: processingAnswers.maxFiles,
      chunkSize: processingAnswers.chunkSize,
      chunkOverlap: processingAnswers.chunkOverlap
    },
    embeddings: embeddingConfig,
    vectorDatabase: {
      provider: 'qdrant',
      collection: dbAnswers.collection
    }
  };
  const spinner = ora("Creating configuration files...").start();

  try {

    await writeConfig(configPath, finalConfig);
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