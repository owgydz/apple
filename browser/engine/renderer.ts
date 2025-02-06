// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

import { Node } from './htmlpar';
import { Style } from './css';

export function render(node: Node, styles: Style = {}): string {
    let output = '';

    if (node.type === 'root' || node.type === 'element') {
        if (node.tagName) {
            const style = renderStyles(node.tagName, styles);
            output += `<${node.tagName}${renderAttributes(node.attributes!)}${style}>`;
        }
        if (node.children) {
            for (const child of node.children) {
                output += render(child, styles);
            }
        }
        if (node.tagName) {
            output += `</${node.tagName}>`;
        }
    } else if (node.type === 'text') {
        output += node.content;
    }

    return output;
}

function renderAttributes(attributes: { [key: string]: string }): string {
    let output = '';
    for (const name in attributes) {
        output += ` ${name}="${attributes[name]}"`;
    }
    return output;
}

function renderStyles(tagName: string, styles: Style): string {
    const style = styles[tagName];
    if (!style) return '';

    let output = ' style="';
    for (const property in style) {
        output += `${property}: ${style[property]}; `;
    }
    output += '"';
    return output;
}
