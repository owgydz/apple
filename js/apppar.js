// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

class Parser {
  constructor(lexer) {
    this.lexer = lexer;
    this.currentToken = this.lexer.nextToken();
  }

  eat(tokenType) {
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.lexer.nextToken();
    } else {
      throw new Error(`Expected ${tokenType}, got ${this.currentToken.type}`);
    }
  }

  parseProgram() {
    let body = [];
    while (this.currentToken.type !== "EOF") {
      body.push(this.parseStatement());
    }
    return { type: "Program", body };
  }

  parseStatement() {
    if (this.currentToken.type === "LET" || this.currentToken.type === "CONST") {
      return this.parseVariableDeclaration();
    }
    if (this.currentToken.type === "IF") {
      return this.parseIfStatement();
    }
    if (this.currentToken.type === "FUNCTION") {
      return this.parseFunctionDeclaration();
    }
    if (this.currentToken.type === "FOR") {
      return this.parseForLoop();
    }
    if (this.currentToken.type === "WHILE") {
      return this.parseWhileLoop();
    }
    return this.parseExpression();
  }

  parseForLoop() {
    this.eat("FOR");
    this.eat("LPAREN");
    let init = this.parseStatement(); // Expecting initialization (e.g., let i = 0)
    this.eat("SEMICOLON");
    let condition = this.parseExpression(); // Condition (e.g., i < 10)
    this.eat("SEMICOLON");
    let update = this.parseExpression(); // Update expression (e.g., i++)
    this.eat("RPAREN");
    this.eat("LBRACE");
    let body = [];
    while (this.currentToken.type !== "RBRACE") {
      body.push(this.parseStatement());
    }
    this.eat("RBRACE");

    return { type: "ForStatement", init, condition, update, body };
  }

  parseWhileLoop() {
    this.eat("WHILE");
    this.eat("LPAREN");
    let condition = this.parseExpression();
    this.eat("RPAREN");
    this.eat("LBRACE");
    let body = [];
    while (this.currentToken.type !== "RBRACE") {
      body.push(this.parseStatement());
    }
    this.eat("RBRACE");

    return { type: "WhileStatement", condition, body };
  }

  parseVariableDeclaration() {
    let kind = this.currentToken.type;
    this.eat(kind);
    let name = this.currentToken.value;
    this.eat("IDENTIFIER");
    this.eat("EQUAL");
    let value = this.parseExpression();
    this.eat("SEMICOLON");
    return { type: "VariableDeclaration", kind, name, value };
  }

  parseFunctionDeclaration() {
    this.eat("FUNCTION");
    let name = this.currentToken.value;
    this.eat("IDENTIFIER");
    this.eat("LPAREN");
    
    let params = [];
    if (this.currentToken.type !== "RPAREN") {
      params.push(this.parseIdentifier());
      while (this.currentToken.type === "COMMA") {
        this.eat("COMMA");
        params.push(this.parseIdentifier());
      }
    }
    this.eat("RPAREN");

    this.eat("LBRACE");
    let body = [];
    while (this.currentToken.type !== "RBRACE") {
      body.push(this.parseStatement());
    }
    this.eat("RBRACE");

    return { type: "FunctionDeclaration", name, params, body };
  }

  parseIdentifier() {
    let name = this.currentToken.value;
    this.eat("IDENTIFIER");
    return { type: "Identifier", name };
  }

  parseIfStatement() {
    this.eat("IF");
    this.eat("LPAREN");
    let test = this.parseExpression();
    this.eat("RPAREN");
    this.eat("LBRACE");
    let consequent = [];
    while (this.currentToken.type !== "RBRACE") {
      consequent.push(this.parseStatement());
    }
    this.eat("RBRACE");

    let alternate = null;
    if (this.currentToken.type === "ELSE") {
      this.eat("ELSE");
      this.eat("LBRACE");
      alternate = [];
      while (this.currentToken.type !== "RBRACE") {
        alternate.push(this.parseStatement());
      }
      this.eat("RBRACE");
    }

    return { type: "IfStatement", test, consequent, alternate };
  }

  parseExpression() {
    return this.parseBinaryExpression();
  }

  parseBinaryExpression() {
    let left = this.parsePrimary();
    
    while (["PLUS", "MINUS", "STAR", "SLASH", "EQUALITY", "NOT_EQUAL", "GREATER_EQUAL", "LESS_EQUAL"].includes(this.currentToken.type)) {
      let operator = this.currentToken.type;
      this.eat(operator);
      let right = this.parsePrimary();
      left = { type: "BinaryExpression", operator, left, right };
    }
    
    return left;
  }

  parsePrimary() {
    if (this.currentToken.type === "NUMBER") {
      let value = this.currentToken.value;
      this.eat("NUMBER");
      return { type: "Literal", value };
    }

    if (this.currentToken.type === "STRING") {
      let value = this.currentToken.value;
      this.eat("STRING");
      return { type: "Literal", value };
    }

    if (this.currentToken.type === "IDENTIFIER") {
      let name = this.currentToken.value;
      this.eat("IDENTIFIER");

      if (this.currentToken.type === "LPAREN") {
        return this.parseCallExpression(name);
      }

      return { type: "Identifier", name };
    }

    if (this.currentToken.type === "LPAREN") {
      this.eat("LPAREN");
      let expr = this.parseExpression();
      this.eat("RPAREN");
      return expr;
    }

    throw new Error(`Unexpected token: ${this.currentToken.type}`);
  }

  parseCallExpression(callee) {
    this.eat("LPAREN");
    let args = [];
    
    if (this.currentToken.type !== "RPAREN") {
      args.push(this.parseExpression());
      while (this.currentToken.type === "COMMA") {
        this.eat("COMMA");
        args.push(this.parseExpression());
      }
    }

    this.eat("RPAREN");
    return { type: "CallExpression", callee, arguments: args };
  }
}

// Example usage:
const lexer = new Lexer(`
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
  
  let x = 5;
  while (x > 0) {
    console.log(x);
    x--;
  }
`);

const parser = new Parser(lexer);
const ast = parser.parseProgram();
console.log(JSON.stringify(ast, null, 2));