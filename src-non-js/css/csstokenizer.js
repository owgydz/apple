// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

class csstokenizer {
    tokenize(css) {
      const regex = /([a-zA-Z0-9_-]+:\s*[^;]+|[{};])/g;
      const tokens = [];
      let match;
      while ((match = regex.exec(css)) !== null) {
        tokens.push(match[0].trim());
      }
      return tokens;
    }
  }
