#!/usr/bin/env node
import  "dotenv/config";
import { Command } from 'commander';
import { showBanner } from './utils/banner.js';
import { runInit } from './commands/init.js';
import { runIngest } from './commands/ingest.js';

const program = new Command();

showBanner();

program
  .name('docsy')
  .description('Headless RAG Component for React & Next.js')
  .version('0.0.1');

program
  .command('init')
  .description('Create docsy.config.js template')
  .action(runInit);

program
  .command('ingest')
  .description('Index your documentation')
  .action(runIngest);

program.parse(process.argv);