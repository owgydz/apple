// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

class htmltokenizer {
    tokenize(html) {
        const regex = /<\/?([a-zA-Z]+)[^>]*>|[^<]+/g;
        const tokens = [];
        let match;
        while ((match = regex.exec(html)) !== null) {
          tokens.push(match[0].trim());
        }
        return tokens;
      }
    }