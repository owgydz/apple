// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

class htmlparser {
    constructor() {
      this.tokens = [];
      this.domTree = [];
    }
  
    parse(tokens) {
      this.tokens = tokens;
      let currentNode = null;
  
      while (this.tokens.length) {
        const token = this.tokens.shift();
        if (token === '<') {
          const tagName = this.tokens.shift();
          const node = { tag: tagName, children: [] };
          if (!currentNode) {
            this.domTree.push(node);
          } else {
            currentNode.children.push(node);
          }
          currentNode = node;
        } else if (token === '>') {
          currentNode = currentNode.parent || null;
        } else {
          currentNode.children.push({ text: token });
        }
      }
  
      return this.domTree;
    }
  }
