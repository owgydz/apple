// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

import { Node } from './htmlpar';

export function createElement(tagName: string): Node {
    return {
        type: 'element',
        tagName,
        attributes: {},
        children: [],
    };
}

export function appendChild(parent: Node, child: Node) {
    if (!parent.children) {
        parent.children = [];
    }
    parent.children.push(child);
}

export function removeChild(parent: Node, child: Node) {
    if (parent.children) {
        parent.children = parent.children.filter(c => c !== child);
    }
}

export function setAttribute(node: Node, name: string, value: string) {
    if (!node.attributes) {
        node.attributes = {};
    }
    node.attributes[name] = value;
}

export function setTextContent(node: Node, text: string) {
    if (node.type === 'element') {
        node.children = [{ type: 'text', content: text }];
    } else if (node.type === 'text') {
        node.content = text;
    }
}
