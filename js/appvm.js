// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

class VirtualMachine {
    constructor(bytecode, globalEnv) {
      this.bytecode = bytecode;
      this.globalEnv = globalEnv;
      this.stack = [];
      this.variables = {};
      this.pc = 0; 
    }
  
    run() {
      while (this.pc < this.bytecode.length) {
        let instruction = this.bytecode[this.pc];
        this.pc++;
        switch (instruction.op) {
          case OPCODES.LOAD_CONST:
            this.stack.push(instruction.arg);
            break;
  
          case OPCODES.LOAD_VAR:
            this.stack.push(this.variables[instruction.arg]);
            break;
  
          case OPCODES.STORE_VAR:
            this.variables[instruction.arg] = this.stack.pop();
            break;
  
          case OPCODES.ADD:
            this.stack.push(this.stack.pop() + this.stack.pop());
            break;
  
          case OPCODES.SUB:
            this.stack.push(-this.stack.pop() + this.stack.pop());
            break;
  
          case OPCODES.MUL:
            this.stack.push(this.stack.pop() * this.stack.pop());
            break;
  
          case OPCODES.DIV:
            let divisor = this.stack.pop();
            this.stack.push(this.stack.pop() / divisor);
            break;
  
          case OPCODES.CALL_FUNCTION:
            let func = this.globalEnv.lookup(instruction.arg);
            let args = this.stack.splice(-func.length);
            this.stack.push(func(...args));
            break;
  
          case "JUMP_IF_FALSE":
            let condition = this.stack.pop();
            if (!condition) {
              this.pc = instruction.arg;
            }
            break;
  
          case "JUMP":
            this.pc = instruction.arg;
            break;
        }
      }
      return this.stack.pop();
    }
  }
  