// Copyright 2025 the Apple authors.
// This project is governed under the Mozilla Public License, v2.0. View in the LICENSE file.  
// You need Jest for these unit tests. Install with this command: npm i --save-dev @types/jest

import { parseCSS } from '../css';

describe('CSS Parser', () => {
    it('should parse a simple CSS string', () => {
        const css = '.title { color: red; font-size: 20px; }';
        const styles = parseCSS(css);
        expect(styles).toEqual({
            '.title': {
                color: 'red',
                'font-size': '20px',
            },
        });
    });
});
