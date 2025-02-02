// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

class cssparser {
    constructor() {
      this.styles = [];
    }
  
    parse(tokens) {
      let currentRule = null;
      while (tokens.length) {
        const token = tokens.shift();
        if (token === '{') {
          currentRule = { selectors: [], properties: {} };
        } else if (token === '}') {
          if (currentRule) {
            this.styles.push(currentRule);
          }
          currentRule = null;
        } else if (currentRule && token.includes(':')) {
          const [property, value] = token.split(':').map(s => s.trim());
          currentRule.properties[property] = value;
        } else {
          currentRule.selectors.push(token);
        }
      }
    }
  }