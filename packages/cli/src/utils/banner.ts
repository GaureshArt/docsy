import chalk from 'chalk';
import figlet from 'figlet';
import {rainbow} from 'gradient-string';

export function showBanner() {
  const banner = figlet.textSync('DOCSY', {
    font: '3D-ASCII',
    horizontalLayout: 'universal smushing',
  });

  console.log(rainbow(banner));
  console.log(chalk.blueBright('  Headless RAG Component v0.0.1\n'));
}