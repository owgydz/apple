// Copyright 2025 the Apple authors.
// This project is governed under the Mozilla Public License, v2.0. View in the LICENSE file.  
// You need Jest for these unit tests. Install with this command: npm i --save-dev @types/jest

import { createElement, appendChild, setAttribute, setTextContent, removeChild } from '../dommani';
import { Node } from '../htmlpar';

describe('DOM Manipulation', () => {
    it('should create an element', () => {
        const element = createElement('div');
        expect(element).toEqual({
            type: 'element',
            tagName: 'div',
            attributes: {},
            children: [],
        });
    });

    it('should append a child', () => {
        const parent: Node = createElement('div');
        const child: Node = createElement('p');
        appendChild(parent, child);
        expect(parent.children).toContain(child);
    });

    it('should set an attribute', () => {
        const element: Node = createElement('div');
        setAttribute(element, 'class', 'test-class');
        expect(element.attributes).toEqual({ class: 'test-class' });
    });

    it('should set text content', () => {
        const element: Node = createElement('div');
        setTextContent(element, 'Hello, world!');