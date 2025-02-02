// NOTE: Testing files only. Not a part of the source. 

import { VariableDeclaration, IfStatement, WhileStatement, BinaryExpression, Literal, Identifier } from '../src/appast';
import BytecodeCompiler from '../src/appvm';
import VirtualMachine from '../src/appvm';

const ast = {
  type: "Program",
  body: [
    new IfStatement(
      new BinaryExpression(new Literal(5), new Literal(3), "greaterThan"),
      new VariableDeclaration("result", new Literal("Greater")),
      new VariableDeclaration("result", new Literal("Lesser"))
    ),
    new WhileStatement(
      new BinaryExpression(new Identifier("i"), new Literal(10), "lessThan"),
      new VariableDeclaration("i", new BinaryExpression(new Identifier("i"), new Literal(1), "plus"))
    )
  ]
};

const compiler = new BytecodeCompiler();
compiler.compile(ast);
const bytecode = compiler.getBytecode();
const vm = new VirtualMachine(bytecode);
vm.run();
