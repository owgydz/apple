// Copyright 2025 the Apple authors.
// This project is governed under the Mozilla Public License, v2.0. View in the LICENSE file.  
// You need Jest for these unit tests. Install with this command: npm i --save-dev @types/jest

import { executeScripts } from '../execu';
import { Node } from '../htmlpar';

describe('JavaScript Executor', () => {
    it('should execute a simple script', () => {
        const scriptNode: Node = {
            type: 'element',
            tagName: 'script',
            attributes: {},
            children: [],
            content: 'context.test = "Hello, world!";',
        };
        const context: any = {};
        executeScripts(scriptNode, context);
        expect(context.test).toBe('Hello, world!');
    });

    it('should handle script errors gracefully', () => {
        const scriptNode: Node = {
            type: 'element',
            tagName: 'script',
            attributes: {},
            children: [],
            content: 'throw new Error("Test error");',
        };
        const context: any = {};
        expect(() => executeScripts(scriptNode, context)).not.toThrow();
    });

    it('should execute nested scripts', () => {
        const scriptNode: Node = {
            type: 'element',
            tagName: 'div',
            attributes: {},
            children: [
                {
                    type: 'element',
                    tagName: 'script',
                    attributes: {},
                    children: [],
                    content: 'context.test = "Nested script";',
                },
            ],
        };
        const context: any = {};
        executeScripts(scriptNode, context);
        expect(context.test).toBe('Nested script');
    });

    it('should execute multiple scripts', () => {
        const scriptNode: Node = {
            type: 'element',
            tagName: 'div',
            attributes: {},
            children: [
                {
                    type: 'element',
                    tagName: 'script',
                    attributes: {},
                    children: [],
                    content: 'context.first = "First script";',
                },
                {
                    type: 'element',
                    tagName: 'script',
                    attributes: {},
                    children: [],
                    content: 'context.second = "Second script";',
                },
            ],
        };
        const context: any = {};
        executeScripts(scriptNode, context);
        expect(context.first).toBe('First script');
        expect(context.second).toBe('Second script');
    });
});
