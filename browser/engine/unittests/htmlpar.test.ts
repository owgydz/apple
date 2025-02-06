// Copyright 2025 the Apple authors.
// This project is governed under the Mozilla Public License, v2.0. View in the LICENSE file.  
// You need Jest for these unit tests. Install with this command: npm i --save-dev @types/jest

import { parseHTML } from '../htmlpar';

describe('HTML Parser', () => {
    it('should parse a simple HTML string', () => {
        const html = '<div><p>Hello, world!</p></div>';
        const dom = parseHTML(html);
        expect(dom).toEqual({
            type: 'root',
            children: [
                {
                    type: 'element',
                    tagName: 'div',
                    attributes: {},
                    children: [
                        {
                            type: 'element',
                            tagName: 'p',
                            attributes: {},
                            children: [
                                {
                                    type: 'text',
                                    content: 'Hello, world!',
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });
});
