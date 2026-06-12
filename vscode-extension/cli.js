#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  purple: '\x1b[35m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

function printHeader() {
  console.log(`
${C.cyan}  ██████  ███    ██ ██████  ██████  ███████ ████████ ██    ██ ██ 
  ██       ████   ██    ██   ██   ██ ██         ██    ██    ██ ██ 
  ███████  ██ ██  ██ ██████  ██████  █████      ██    ██    ██ ██ 
       ██  ██  ██ ██ ██      ██      ██         ██    ██    ██ ██ 
  ███████  ██   ████ ██      ██      ███████    ██     ██████  ██ ${C.reset}
  ${C.dim}--- SnippetUI CLI Toolkit — Premium Frontend Component Catalog ---${C.reset}
  ${C.yellow}${C.dim}[ DISCLAIMER ] Provided "AS IS" under MIT License. The authors hold no liability for any config changes or workspace issues.${C.reset}
  `);
}

function showHelp() {
  printHeader();
  console.log(`${C.bold}Usage:${C.reset} snippetui <command> [options]\n`);
  console.log(`${C.bold}Commands:${C.reset}`);
  console.log(`  ${C.cyan}${'init'.padEnd(25)}${C.reset} Initialize SnippetUI configuration mapping.`);
  console.log(`\n${C.bold}Options:${C.reset}`);
  console.log(`  ${C.cyan}-v, --version${C.reset}           Show CLI version`);
  console.log(`  ${C.cyan}-h, --help${C.reset}              Show this help documentation`);
  console.log(`  ${C.cyan}-y, --yes${C.reset}               Bypass prompts during config init`);
}

function promptQuestions(questions) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const answers = {};
  let i = 0;
  return new Promise((resolve) => {
    function askNext() {
      if (i < questions.length) {
        const q = questions[i];
        rl.question(`${C.bold}${q.question}${C.reset}${q.options ? ` (${q.options.join('/')})` : ''} [${C.dim}${q.default}${C.reset}]: `, (ans) => {
          let value = ans.trim() || q.default;
          answers[q.key] = value;
          i++;
          askNext();
        });
      } else {
        rl.close();
        resolve(answers);
      }
    }
    askNext();
  });
}

async function runInit(options = {}) {
  printHeader();
  const configPath = path.join(process.cwd(), 'snippetui.config.json');
  let finalConfig = {
    srcDir: './src/components/snippetui',
    styleFormat: 'css',
    framework: 'vanilla',
    script: 'js'
  };

  if (!options.yes) {
    const answers = await promptQuestions([
      { key: 'srcDir', question: 'Enter output directory for SnippetUI components', default: './src/components/snippetui' },
      { key: 'framework', question: 'Select default component wrapper framework', default: 'vanilla' },
      { key: 'styleFormat', question: 'Select default styling layout format', default: 'css' },
      { key: 'script', question: 'Select default scripting language / file type', default: 'js' }
    ]);
    finalConfig = answers;
  }

  fs.writeFileSync(configPath, JSON.stringify(finalConfig, null, 2), 'utf8');
  console.log(`\n${C.green}✔ Created configuration file:${C.reset} ${C.bold}snippetui.config.json${C.reset}`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  if (command === 'init') {
    const hasYesFlag = args.includes('--yes') || args.includes('-y');
    await runInit({ yes: hasYesFlag });
  } else {
    showHelp();
  }
}
main();
