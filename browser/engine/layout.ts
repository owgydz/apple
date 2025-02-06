// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

import { Node } from './htmlpar';

interface Layout {
    x: number;
    y: number;
    width: number;
    height: number;
}

export function calculateLayout(node: Node, parentLayout: Layout = { x: 0, y: 0, width: 800, height: 600 }): Layout {
    const layout: Layout = { ...parentLayout };

    if (node.type === 'element') {
        layout.width = parentLayout.width;
        layout.height = 20; 

        if (node.children) {
            let yOffset = 0;
            for (const child of node.children) {
                const childLayout = calculateLayout(child, { ...layout, y: layout.y + yOffset });
                yOffset += childLayout.height;
            }
            layout.height = yOffset;
        }
    }

    return layout;
}
