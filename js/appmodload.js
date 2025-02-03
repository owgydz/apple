// Copyright 2025 the Apple authors.
// This project is governed under the Mozilla Public License, v2.0. View in the LICENSE file.

import fs from 'fs';
import { tokenize } from './apppar.js'; 
import { parseProgram } from './apppar.js';
import { ASTExecutor } from './appast.js';

const moduleCache = new Map();

export function loadAppleModule(modulePath) {
  if (moduleCache.has(modulePath)) {
    return moduleCache.get(modulePath);
  }

  if (!fs.existsSync(modulePath)) {
    throw new Error(`Module not found: ${modulePath}`);
  }

  const code = fs.readFileSync(modulePath, 'utf-8');
  const tokens = tokenize(code);
  const ast = parseProgram(tokens);
  const executor = new ASTExecutor(ast);
  const moduleExports = executor.execute();

  moduleCache.set(modulePath, moduleExports); 
  return moduleExports;
}
