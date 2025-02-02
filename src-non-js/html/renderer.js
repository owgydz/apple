// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

class renderer {
  render(domTree) {
    this.renderElement(domTree, 0);
  }

  renderElement(element, indentLevel) {
    const indent = ' '.repeat(indentLevel * 2);

    if (element.tag) {
      console.log(`${indent}<${element.tag}${this.renderAttributes(element.attributes)}>`);
      if (element.children.length) {
        element.children.forEach(child => this.renderElement(child, indentLevel + 1));
      }
      console.log(`${indent}</${element.tag}>`);
    } else if (element.text) {
      console.log(`${indent}${element.text}`);
    }
  }

  renderAttributes(attributes) {
    return Object.entries(attributes)
      .map(([key, value]) => ` ${key}="${value}"`)
      .join('');
  }
}
