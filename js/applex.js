// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

class Lexer {
    constructor(source) {
      this.source = source;
      this.position = 0;
    }
  
    nextToken() {
      while (this.position < this.source.length) {
        let char = this.source[this.position];
  
        if (/\s/.test(char)) {
          this.position++; 
          continue;
        }
  
        if (char === "/" && this.peek() === "/") {
          this.skipSingleLineComment();
          continue;
        }
  
        if (char === "/" && this.peek() === "*") {
          this.skipMultiLineComment();
          continue;
        }
  
        if (/[0-9]/.test(char)) {
          return this.readNumber();
        }
  
        if (/[a-zA-Z_$]/.test(char)) {
          return this.readIdentifier();
        }
  
        if (char === '"' || char === "'") {
          return this.readString();
        }
  
        if (char === "`") {
          return this.readTemplateLiteral();
        }
  
        let token = this.readOperator();
        if (token) return token;
  
        throw new Error(`Unexpected character: ${char}`);
      }
  
      return { type: "EOF", value: null };
    }
  
    peek() {
      return this.source[this.position + 1] || "";
    }
  
    readNumber() {
      let start = this.position;
      while (/[0-9]/.test(this.source[this.position])) {
        this.position++;
      }
      return { type: "NUMBER", value: this.source.slice(start, this.position) };
    }
  
    readIdentifier() {
      let start = this.position;
      while (/[a-zA-Z0-9_$]/.test(this.source[this.position])) {
        this.position++;
      }
      const value = this.source.slice(start, this.position);
      const keywords = { let: "LET", const: "CONST", function: "FUNCTION", return: "RETURN" };
      return { type: keywords[value] || "IDENTIFIER", value };
    }
  
    readString() {
      let quote = this.source[this.position];
      let start = ++this.position;
      while (this.position < this.source.length && this.source[this.position] !== quote) {
        this.position++;
      }
      if (this.source[this.position] !== quote) throw new Error("Unterminated string");
      this.position++; // Skip closing quote
      return { type: "STRING", value: this.source.slice(start, this.position - 1) };
    }
  
    readTemplateLiteral() {
      let start = ++this.position;
      let value = "";
      while (this.position < this.source.length) {
        if (this.source[this.position] === "$" && this.peek() === "{") {
          this.position += 2; // Skip ${
          return { type: "TEMPLATE_LITERAL_START", value };
        }
        if (this.source[this.position] === "`") {
          this.position++;
          return { type: "TEMPLATE_LITERAL_END", value };
        }
        value += this.source[this.position++];
      }
      throw new Error("Unterminated template literal");
    }
  
    readOperator() {
      const multiCharOps = {
        "==": "EQUALITY",
        "!=": "NOT_EQUAL",
        ">=": "GREATER_EQUAL",
        "<=": "LESS_EQUAL",
        "&&": "LOGICAL_AND",
        "||": "LOGICAL_OR",
        "+=": "PLUS_ASSIGN",
        "-=": "MINUS_ASSIGN"
      };
  
      const oneCharOps = {
        "+": "PLUS",
        "-": "MINUS",
        "*": "STAR",
        "/": "SLASH",
        "(": "LPAREN",
        ")": "RPAREN",
        "{": "LBRACE",
        "}": "RBRACE",
        "=": "EQUAL",
        ";": "SEMICOLON"
      };
  
      let twoChar = this.source.slice(this.position, this.position + 2);
      if (multiCharOps[twoChar]) {
        this.position += 2;
        return { type: multiCharOps[twoChar], value: twoChar };
      }
  
      let oneChar = this.source[this.position];
      if (oneCharOps[oneChar]) {
        this.position++;
        return { type: oneCharOps[oneChar], value: oneChar };
      }
  
      return null;
    }
  
    skipSingleLineComment() {
      this.position += 2; 
      while (this.position < this.source.length && this.source[this.position] !== "\n") {
        this.position++;
      }
    }
  
    skipMultiLineComment() {
      this.position += 2; 
      while (this.position < this.source.length && !(this.source[this.position] === "*" && this.peek() === "/")) {
        this.position++;
      }
      this.position += 2; 
    }
  }
  
  // Example:
  const lexer = new Lexer(`
    let x = 42;
    const name = "Apple";
    if (x >= 10) {
      console.log("Hello, World!");
    }
    // This is a comment
    /*
      This is a multi-line comment
    */
    let str = \`Hello, \${name}\`;
  `);
  
  let token;
  do {
    token = lexer.nextToken();
    console.log(token);
  } while (token.type !== "EOF");
  