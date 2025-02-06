// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

import { Node } from './htmlpar';

export function executeScripts(node: Node, context: any = {}) {
    if (node.type === 'element' && node.tagName === 'script' && node.content) {
        try {
            const scriptFunction = new Function('context', node.content);
            scriptFunction(context);
        } catch (error) {
            console.error('Error executing script:', error);
        }
    }

    if (node.children) {
        for (const child of node.children) {
            executeScripts(child, context);
        }
    }
}
