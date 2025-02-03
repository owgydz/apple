// Copyright 2025 the Apple authors. 
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file. 

export function parseHTML(html) {
  const regex = /<([a-z]+)([^>]*?)>(.*?)<\/\1>|<([a-z]+)([^>]*?)(\/?)>/g;
  const elements = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    const tagName = match[1] || match[4];
    const attributes = parseAttributes(match[2] || match[5]);
    const isSelfClosing = !!match[6];
    const innerHTML = match[3] || '';

    const element = { tagName, attributes, children: [], innerHTML, isSelfClosing };

    if (!isSelfClosing && innerHTML) {
      element.children = parseHTML(innerHTML);
    }

    elements.push(element);
  }

  return elements;
}

function parseAttributes(attributeStr) {
  const attrs = {};
  const attrRegex = /([a-z\-]+)="([^"]*)"/g;
  let match;
  while ((match = attrRegex.exec(attributeStr)) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}
