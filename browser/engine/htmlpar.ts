// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

export interface Node {
    type: string;
    tagName?: string;
    attributes?: { [key: string]: string };
    children?: Node[];
    content?: string;
}

export function parseHTML(html: string): Node {
    const root: Node = { type: 'root', children: [] };
    const stack: Node[] = [root];
    const tagRegex = /<\/?([a-zA-Z0-9]+)([^>]*)>/g;
    let lastIndex = 0;

    html.replace(tagRegex, (match, tagName, attributes, index) => {
        if (index > lastIndex) {
            const text = html.slice(lastIndex, index).trim();
            if (text) {
                stack[stack.length - 1].children!.push({ type: 'text', content: text });
            }
        }
        if (match[1] === '/') {
            stack.pop();
        } else {
            const node: Node = { type: 'element', tagName, attributes: parseAttributes(attributes), children: [] };
            stack[stack.length - 1].children!.push(node);
            stack.push(node);
        }
        lastIndex = index + match.length;
        return match;
    });

    if (lastIndex < html.length) {
        const text = html.slice(lastIndex).trim();
        if (text) {
            stack[stack.length - 1].children!.push({ type: 'text', content: text });
        }
    }

    return root;
}

function parseAttributes(attributeString: string): { [key: string]: string } {
    const attributes: { [key: string]: string } = {};
    attributeString.replace(/([a-zA-Z0-9-]+)="([^"]*)"/g, (match, name, value) => {
        attributes[name] = value;
        return match;
    });
    return attributes;
}
