// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file.

import fetch from 'node-fetch';
import { parseDOM } from 'htmlparser2';
import { VirtualDOM } from './virtualDOM';  

export async function fetchGoogleHomepage() {
  try {
    const response = await fetch('https://www.google.com');
    const html = await response.text();

    const parsedHtml = parseDOM(html);  

    return htmlToVirtualDOM(parsedHtml);
  } catch (error) {
    console.error('Failed to fetch Google:', error);
  }
}

function htmlToVirtualDOM(nodes) {
  const virtualNodes = [];

  nodes.forEach((node) => {
    if (node.type === 'tag') {
      const virtualNode = new VirtualDOM(node.name, { x: 0, y: 0 }, []);

      // Add child nodes if any
      if (node.children && node.children.length > 0) {
        virtualNode.children = htmlToVirtualDOM(node.children);
      }

      virtualNodes.push(virtualNode);
    } else if (node.type === 'text' && node.data.trim()) {
      virtualNodes.push(new VirtualDOM('text', { x: 0, y: 0, content: node.data.trim() }));
    }
  });

  return virtualNodes;
}
// Literally just made a script to fetch google. what
