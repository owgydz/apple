// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

import { builtins } from "./builtins.js";
import { MarkAndSweepGC } from "./appgc.js";

class ASTExecutor {
  constructor(ast) {
    this.ast = ast;
    this.globalEnv = new Environment();

    // Define builtins in global environment
    this.globalEnv.define("Math", {
      pow: builtins.pow,
      abs: builtins.abs,
      sin: builtins.sin
    });

    this.globalEnv.define("Array", {
      push: builtins.push,
      map: builtins.map
    });

    this.globalEnv.define("String", {
      slice: builtins.slice,
      replace: builtins.replace
    });

    this.globalEnv.define("Date", {
      now: builtins.now
    });
  }
  
  execute(node = this.ast) {
    switch (node.type) {
      case 'Program':
        let result;
        node.body.forEach(statement => result = this.execute(statement));
        return result;  // Ensure the program returns the final result
  
      case 'FunctionDeclaration':
        this.globalEnv.define(node.name, node);  // Store function in global env
        break;
  
      case 'CallExpression':
        return this.executeCallExpression(node);
  
      case 'BinaryExpression':
        return this.executeBinaryExpression(node);
  
      case 'Literal':
        return node.value;
  
      case 'Identifier':
        return this.globalEnv.variables.get(node.name);  // Use globalEnv here
  
      case 'VariableDeclaration':
        return this.executeVariableDeclaration(node);
  
      case 'IfStatement':
        return this.executeIfStatement(node);
  
      case 'ForStatement':
        return this.executeForStatement(node);
  
      case 'WhileStatement':
        return this.executeWhileStatement(node);
  
      case 'ReturnStatement':
        return this.executeReturnStatement(node);
  
      case 'ArrayExpression':
        return this.executeArrayExpression(node);
  
      case 'ObjectExpression':
        return this.executeObjectExpression(node);
  
      default:
        throw new Error(`Unknown AST node type: ${node.type}`);
    }
  }
  
  executeVariableDeclaration(node) {
    const value = this.execute(node.value);
    this.globalEnv.define(node.name, value);  // Store variable in global env
  }
  
  executeCallExpression(node) {
    const func = this.globalEnv.variables.get(node.callee);  // Use globalEnv here
    if (func) {
      const args = node.arguments.map(arg => this.execute(arg));
      return this.executeFunction(func, args);
    } else {
      throw new Error(`Function not found: ${node.callee}`);
    }
  }
  
  executeFunction(func, args) {
    const localEnv = new Environment(this.globalEnv);  // Create local environment for function
    func.params.forEach((param, index) => {
      localEnv.define(param.name, args[index]);
    });
  
    let result;
    func.body.forEach(statement => {
      result = this.executeWithEnv(statement, localEnv);
    });
  
    return result;  // Ensure result is returned after function execution
  }
  
  executeWithEnv(node, localEnv) {
    const previousEnv = this.globalEnv;
    this.globalEnv = localEnv;  // Temporarily use local env
    const result = this.execute(node);
    this.globalEnv = previousEnv;  // Restore global env
    return result;
  }
  
  executeBinaryExpression(node) {
    const leftValue = this.execute(node.left);
    const rightValue = this.execute(node.right);
    switch (node.operator) {
      case '+': return leftValue + rightValue;
      case '-': return leftValue - rightValue;
      case '*': return leftValue * rightValue;
      case '/': return leftValue / rightValue;
      case '==': return leftValue === rightValue;
      case '!=': return leftValue !== rightValue;
      case '>': return leftValue > rightValue;
      case '<': return leftValue < rightValue;
      case '>=': return leftValue >= rightValue;
      case '<=': return leftValue <= rightValue;
      default: throw new Error(`Unknown operator: ${node.operator}`);
    }
  }
  
  executeIfStatement(node) {
    const condition = this.execute(node.test);
    if (condition) {
      node.consequent.forEach(statement => this.execute(statement));
    } else if (node.alternate) {
      node.alternate.forEach(statement => this.execute(statement));
    }
  }
  
  executeForStatement(node) {
    this.execute(node.init);
    while (this.execute(node.condition)) {
      node.body.forEach(statement => this.execute(statement));
      this.execute(node.update);
    }
  }
  
  executeWhileStatement(node) {
    while (this.execute(node.condition)) {
      node.body.forEach(statement => this.execute(statement));
    }
  }
  
  executeReturnStatement(node) {
    return this.execute(node.argument);  // Return the result of the argument
  }
  
  executeArrayExpression(node) {
    return node.elements.map(element => this.execute(element));
  }
  
  executeObjectExpression(node) {
    const obj = {};
    node.properties.forEach(prop => {
      obj[prop.key.name] = this.execute(prop.value);
    });
    return obj;
  }
}

const ast = {
  type: 'Program',
  body: [
    {
      type: 'FunctionDeclaration',
      name: 'example',
      params: [{ type: 'Identifier', name: 'x' }],
      body: [
        {
          type: 'VariableDeclaration',
          name: 'arr',
          value: {
            type: 'ArrayExpression',
            elements: [
              { type: 'Literal', value: 1 },
              { type: 'Literal', value: 2 },
              { type: 'Literal', value: 3 }
            ]
          }
        },
        {
          type: 'VariableDeclaration',
          name: 'obj',
          value: {
            type: 'ObjectExpression',
            properties: [
              { key: { name: 'a' }, value: { type: 'Literal', value: 1 } },
              { key: { name: 'b' }, value: { type: 'Literal', value: 2 } }
            ]
          }
        },
        {
          type: 'ReturnStatement',
          argument: {
            type: 'BinaryExpression',
            left: {
              type: 'Identifier',
              name: 'arr'
            },
            operator: '+',
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        }
      ]
    },
    {
      type: 'CallExpression',
      callee: 'example',
      arguments: [{ type: 'Literal', value: 5 }]
    }
  ]
};

class Environment {
  constructor(parent = null) {
    this.parent = parent;
    this.variables = new Map();
    this.gc = new MarkAndSweepGC();
  }

  define(name, value) {
    this.variables.set(name, this.gc.allocate(value));
  }

  runGC() {
    this.gc.runGC(this);
  }
}


const executor = new ASTExecutor(ast);
const result = executor.execute();
console.log(result);  // This should now output a meaningful result, not "undefined" like in v0.20.8
  
