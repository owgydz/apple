// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

import { Node } from './htmlpar';

const eventListeners: { [key: string]: Function[] } = {};

export function addEventListener(event: string, listener: Function) {
    if (!eventListeners[event]) {
        eventListeners[event] = [];
    }
    eventListeners[event].push(listener);
}

export function dispatchEvent(event: string, context: any = {}) {
    if (eventListeners[event]) {
        for (const listener of eventListeners[event]) {
            listener(context);
        }
    }
}

export function attachEventHandlers(node: Node) {
    if (node.type === 'element' && node.attributes) {
        for (const attr in node.attributes) {
            if (attr.startsWith('on')) {
                const event = attr.slice(2).toLowerCase();
                const handler = new Function('event', node.attributes[attr]);
                addEventListener(event, handler);
            }
        }
    }

    if (node.children) {
        for (const child of node.children) {
            attachEventHandlers(child);
        }
    }
}
