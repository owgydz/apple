// Copyright 2025 the Apple authors. 
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file. 

export function parseHTML(htmlString) {
  const elements = [];
  let regex = /<([a-zA-Z0-9]+)([^>]*)>(.*?)<\/\1>/gs;
  let match;

  while ((match = regex.exec(htmlString)) !== null) {
    const tag = match[1];
    const attributes = parseAttributes(match[2]);
    const content = match[3];

    elements.push({
      tag,
      attributes,
      content
    });
  }

  return elements;
}

function parseAttributes(attributesString) {
  const attributes = {};
  let regex = /([a-zA-Z\-]+)="([^"]*)"/g;
  let match;

  while ((match = regex.exec(attributesString)) !== null) {
    attributes[match[1]] = match[2];
  }

  return attributes;
}
