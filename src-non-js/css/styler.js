// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file.

class styler {
  applyStyles(domTree, cssRules) {
    domTree.forEach(node => this.applyStylesToNode(node, cssRules));
  }

  applyStylesToNode(node, cssRules) {
    if (node.tag) {
      const matchingRules = this.getMatchingCSSRules(node, cssRules);
      node.styles = matchingRules.reduce((styles, rule) => {
        Object.entries(rule.properties).forEach(([property, value]) => {
          styles[property] = value;
        });
        return styles;
      }, {});
    }

    if (node.children) {
      node.children.forEach(child => this.applyStylesToNode(child, cssRules));
    }
  }

  getMatchingCSSRules(node, cssRules) {
    return cssRules.filter(rule => {
      return rule.selectors.some(selector => this.matchesSelector(node, selector));
    });
  }

  matchesSelector(node, selector) {
    return selector === node.tag; 
}
