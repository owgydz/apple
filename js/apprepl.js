// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

import fs from 'fs';
import readline from 'readline';

const VERSION = "0.60.1";  

const args = process.argv.slice(2);
if (args.includes("-v")) {
  console.log(`Your current Apple version: ${VERSION}`);
  console.log(`Copyright the Apple authors 2025, under the Mozilla Public License v2.0.`)
  process.exit(0);  
}

let codeBuffer = [];

// running files
function runFile(fileName) {
  try {
    if (!fs.existsSync(fileName)) {
      console.error(`File not found: ${fileName}`);
      process.exit(1);
    }
    const code = fs.readFileSync(fileName, 'utf-8');
    const tokens = tokenize(code);
    const ast = parseProgram(tokens);
    const executor = new ASTExecutor(ast);
    executor.execute();
  } catch (error) {
    console.error("Error running file:", error.message);
    process.exit(1);
  }
}

// Tokenize
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

// Parse
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

// REPL Logic
function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });

  rl.prompt();

  rl.on('line', (line) => {
    if (line.trim() === 'exit') {
      rl.close();
      return;
    }

    if (line.trim() === 'done' && codeBuffer.length > 0) {
      // Execute the buffered code from the editor
      const code = codeBuffer.join('\n');
      const tokens = tokenize(code);
      const ast = parseProgram(tokens);
      const executor = new ASTExecutor(ast);
      const result = executor.execute();
      if (result !== undefined) {
        console.log(result);
      }
      codeBuffer = []; // Clear the buffer after execution
    } else if (line.trim() === 'done' && codeBuffer.length === 0) {
      console.log("No code to execute.");
    } else if (args.includes('-tx')) {
      // Collect the input in the text editor mode
      codeBuffer.push(line);
      console.log(`Added line: ${line}`);
    } else if (args.includes('--create')) {
      // Handle --create flag to create a new JS file
      rl.question('Enter the name of the new JS file (e.g., newfile.js): ', (filename) => {
        rl.question('Start typing your code. Type "done" to finish:\n', () => {
          codeBuffer.push(line);
          console.log(`Now creating ${filename}`);
          rl.on('line', (line) => {
            if (line.trim() === 'done' && codeBuffer.length > 0) {
              const code = codeBuffer.join('\n');
              fs.writeFileSync(filename, code, 'utf-8');
              console.log(`File ${filename} created successfully!`);
              codeBuffer = []; // Clear the buffer
              rl.close();
            } else {
              codeBuffer.push(line);
            }
          });
        });
      });
    } else {
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
    }
    
    rl.prompt();
  }).on('close', () => {
    console.log('Exiting Apple...');
    process.exit(0);
  });
}

// check for args n stuffs
if (args.length > 0) {
  if (args.includes("-tx")) {
    console.log("Entering text editor Mode. Type 'done' to finish editing.");
    startREPL();
  } else if (args.includes("--create")) {
    console.log("apple: creating file...");
    startREPL();
  } else if (args.includes("-ru")) {
    const fileIndex = args.indexOf("-ru") + 1;
    if (fileIndex < args.length) {
      const fileName = args[fileIndex];
      runFile(fileName);
    } else {
      console.error("apple: missing file name for -ru flag");
      process.exit(1);
    }
  } else {
    const fileName = args[0];
    runFile(fileName);
  }
} else {
  console.log("No file provided. Running apple base.");
  startREPL();
}