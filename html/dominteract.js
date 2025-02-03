// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file.

class DOMElement {
  constructor(tagName, attributes = {}, children = []) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.children = children;
  }

  getAttribute(attr) {
    return this.attributes[attr] || null;
  }

  appendChild(child) {
    this.children.push(child);
  }
}

export class DOM {
  constructor() {
    this.body = new DOMElement('body', {}, []);
  }

  getElementById(id) {
    return this._findById(this.body, id);
  }

  _findById(element, id) {
    if (element.attributes.id === id) return element;

    for (let child of element.children) {
      const result = this._findById(child, id);
      if (result) return result;
    }
    return null;
  }

  createElement(tagName) {
    return new DOMElement(tagName);
  }
}
