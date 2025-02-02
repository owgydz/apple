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
    if (selector.startsWith('#')) {
      const id = selector.slice(1);
      return node.attributes && node.attributes.id === id;
    }

    if (selector.startsWith('.')) {
      const className = selector.slice(1);
      return node.attributes && node.attributes.class && node.attributes.class.split(' ').includes(className);
    }
    
    if (!selector.includes('#') && !selector.includes('.')) {
      return node.tag === selector;
    }

    const attrMatch = selector.match(/\[([a-zA-Z0-9_-]+)(="([^"]+)")?\]/);
    if (attrMatch) {
      const attributeName = attrMatch[1];
      const attributeValue = attrMatch[3];
      return node.attributes && node.attributes[attributeName] === attributeValue;
    }

    if (selector.includes(' ')) {
      const parts = selector.split(' ');
      const ancestorSelector = parts.slice(0, -1).join(' ');
      const descendantSelector = parts[parts.length - 1];
      
      // Match the ancestor
      const ancestorMatches = this.matchesSelector(node, ancestorSelector);
      // Match the descendant
      const descendantMatches = this.matchesSelector(node, descendantSelector);

      return ancestorMatches && descendantMatches;
    }

    return false;
  }
}

export default styler;
