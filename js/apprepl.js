// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

import fs from 'fs';
import readline from 'readline';
import process from 'process';

const VERSION = "0.60.3-rc1";
const args = process.argv.slice(2);
let codeBuffer = []; 
function createNewJSFile(rl) {
  rl.question("Enter the name of the new JavaScript file (e.g., newfile.js): ", (fileName) => {
    if (!fileName.endsWith(".js")) {
      console.log("Error: The file must have a .js extension.");
      rl.close();
      return;
    }

    console.log("Start typing your code. Press Ctrl+Q to save and exit:");

    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "q") {
        const code = codeBuffer.join("\n");
        fs.writeFileSync(fileName, code, "utf-8");
        console.log(`\nFile '${fileName}' created successfully!`);
        codeBuffer = []; 
        rl.prompt();
      }
    });

    rl.on("line", (line) => {
      codeBuffer.push(line);
    });
  });
}

function runFile(fileName) {
  const code = fs.readFileSync(fileName, "utf-8");
  const tokens = tokenize(code);
  const ast = parseProgram(tokens);
  const executor = new ASTExecutor(ast);
  executor.execute();
}

// tokenizer for now
function tokenize(code) {
  const regex = /\s*(=>|[\d\.]+|[A-Za-z_][A-Za-z0-9_]*|[{}()=+\-*\/<>,;]+)/g;
  const tokens = [];
  let match;

  while ((match = regex.exec(code))) {
    const token = match[1];
    if (token.trim()) {
      tokens.push(token);
    }
  }

  return tokens;
}

// main logics
function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    if (line.trim() === "exit") {
      rl.close();
      return;
    }

    if (args.includes("-cf")) {
      createNewJSFile(rl);
      return;
    }

    try {
      const tokens = tokenize(line);
      const ast = parseProgram(tokens);
      const executor = new ASTExecutor(ast);
      const result = executor.execute();
      if (result !== undefined) {
        console.log(result);
      }
    } catch (err) {
      console.error("apple:", err.message);
    }

    rl.prompt();
  }).on("close", () => {
    console.log("Exiting Apple...");
    process.exit(0);
  });
}

// handle args
if (args.includes("-v")) {
  console.log(`Current running Apple version: ${VERSION}`);
  console.log(`Copyright 2025 the Apple authors, under the Mozilla Public License v2.0.`)
  process.exit(0);
} else if (args.includes("-ru")) {
  const fileIndex = args.indexOf("-ru") + 1;
  if (fileIndex < args.length) {
    runFile(args[fileIndex]);
  } else {
    console.error("Error: No file specified with -ru.");
    process.exit(1);
  }
} else {
  console.log("No file provided. Running Apple REPL.");
  startREPL();
}
