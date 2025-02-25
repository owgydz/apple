// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

import fs from 'fs';
import readline from 'readline';
import { spawnSync } from 'child_process';
import { parseHTML, renderHTML, manipulateHTML } from '../html/src/html.js';
import { openCSSEditor } from '../css/src/csseditor.js';

const VERSION = "0.60.4";  

const args = process.argv.slice(2);

if (args.includes("-v")) {
  console.log(`Currently running Apple version: ${VERSION}`);
  console.log(`Copyright 2025 the Apple authors, under the Mozilla Public License v2.0.`);
  process.exit(0);  
}

function runFile(fileName) {
  const code = fs.readFileSync(fileName, 'utf-8');
  const tokens = tokenize(code);
  const ast = parseProgram(tokens);
  const executor = new ASTExecutor(ast);
  executor.execute();
}

// Tokenizer function
function tokenize(code) {
  const regex = /\s*(=>|[\d\.]+|[A-Za-z_][A-Za-z0-9_]*|[{}()=+\-*\/<>,;]+)/g;
  const tokens = [];
  let match;
  
  while (match = regex.exec(code)) {
    const token = match[1];
    if (token.trim()) {
      tokens.push(token);
    }
  }
  return tokens;
}


// Parser function
function parseProgram(tokens) {
  const program = [];
  while (tokens.length) {
    const stmt = parseStatement(tokens);
    program.push(stmt);
  }
  return { type: "Program", body: program };
}

function parseStatement(tokens) {
  if (tokens[0] === "function") {
    return parseFunctionDeclaration(tokens);
  }
  throw new Error("apple: unexpected token: " + tokens[0]);
}

function parseFunctionDeclaration(tokens) {
  const name = tokens[1];
  const params = parseParams(tokens.slice(2));
  const body = parseBlock(tokens.slice(params.length + 3));
  return {
    type: "FunctionDeclaration",
    name,
    params,
    body
  };
}

function parseParams(tokens) {
  return tokens.filter(token => token !== "(" && token !== ")");
}

function parseBlock(tokens) {
  const block = [];
  while (tokens.length) {
    const stmt = parseStatement(tokens);
    block.push(stmt);
    if (tokens[0] === '}') break;
  }
  return block;
}

function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });

  console.log("Starting Apple. Press Ctrl + D to exit.");
  rl.prompt();

  rl.on('line', (line) => {
    try {
      const result = eval(line);
      if (result !== undefined) {
        console.log(result);
      }
    } catch (err) {
      console.error("apple:", err.message);
    }

    rl.prompt();
  }).on('close', () => {
    console.log("Exiting Apple.");
    process.exit(0);
  });
}

function openNanoEditor() {
  const tempFile = `/tmp/apple_edit_${Date.now()}.js`;
  fs.writeFileSync(tempFile, "// Write your JavaScript code here\n", "utf-8");

  const nano = spawnSync("nano", [tempFile], { stdio: "inherit" });

  if (nano.error) {
    console.error("Error opening Nano editor.");
    process.exit(1);
  }

  const editedCode = fs.readFileSync(tempFile, "utf-8");
  fs.unlinkSync(tempFile); 

  try {
    const tokens = tokenize(editedCode);
    const ast = parseProgram(tokens);
    const executor = new ASTExecutor(ast);
    executor.execute();
  } catch (err) {
    console.error("apple:", err.message);
  }
}

function openNanoEditorForHTML() {
  const tempFile = `/tmp/apple_edit_${Date.now()}.html`;
  fs.writeFileSync(tempFile, "<!-- Write your HTML code here -->\n", "utf-8");

  const nano = spawnSync("nano", [tempFile], { stdio: "inherit" });

  if (nano.error) {
    console.error("Error opening Nano editor.");
    process.exit(1);
  }

  const editedHTML = fs.readFileSync(tempFile, "utf-8");
  fs.unlinkSync(tempFile);

  try {
    const dom = parseHTML(editedHTML);
    manipulateHTML(dom, (document) => {
      // Example:
      const newElement = document.createElement('p');
      newElement.textContent = 'Hello, world!';
      document.body.appendChild(newElement);
    });
    const resultHTML = renderHTML(dom);
    console.log(resultHTML);
  } catch (err) {
    console.error("apple:", err.message);
  }
}

function openCSSEditor() {
  const tempFile = `/tmp/apple_edit_${Date.now()}.css`;
  fs.writeFileSync(tempFile, "/* Write your CSS here */\n", "utf-8");

  const nano = spawnSync("nano", [tempFile], { stdio: "inherit" });

  if (nano.error) {
    console.error("Error opening Nano.");
    process.exit(1);
  }

  const editedCode = fs.readFileSync(tempFile, "utf-8");
  fs.unlinkSync(tempFile);

  try {
    const cssFilePath = path.join(__dirname, 'styles.css');
    fs.writeFileSync(cssFilePath, editedCode, "utf-8");
    console.log("CSS updated successfully");
  } catch (err) {
    console.error("apple:", err.message);
  }
}


function createNewFile() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Enter the name of the new JavaScript file (e.g., newfile.js): ", (filename) => {
    if (!filename.endsWith(".js")) {
      filename += ".js";
    }

    console.log(`Opening ${filename} in Nano. Press Ctrl+X to save and exit.`);

    const nano = spawnSync("nano", [filename], { stdio: "inherit" });

    if (nano.error) {
      console.error("Error opening Nano editor.");
      process.exit(1);
    }

    console.log(`File ${filename} created successfully!`);
    rl.close();
  });
}

function runBrowser() {
  const browserProcess = spawnSync('node', ['browser/src/main.ts'], { stdio: 'inherit' });
  if (browserProcess.error) {
    console.error("appleBrowser:", browserProcess.error);
  }
}

if (args.includes("-b")) {
  runBrowser();
} else if (args.includes("-tx")) {
  openNanoEditor();
} else if (args.includes("-htm")) {
  openNanoEditorForHTML();
} else if (args.includes("-css")) {
  openCSSEditor();
} else if (args.includes("-c")) {
  createNewFile();
} else if (args.includes("-ru")) {
  const fileIndex = args.indexOf("-ru") + 1;
  if (fileIndex < args.length) {
    runFile(args[fileIndex]);
  } else {
    console.error("apple: No file specified for -ru.");
  }
} else {
  startREPL();
}
