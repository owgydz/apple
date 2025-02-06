// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

export interface Style {
    [selector: string]: { [property: string]: string };
}

export function parseCSS(css: string): Style {
    const style: Style = {};
    const ruleRegex = /([^{]+)\{([^}]+)\}/g;
    let match;

    while ((match = ruleRegex.exec(css)) !== null) {
        const selector = match[1].trim();
        const declarations = match[2].trim();
        style[selector] = parseDeclarations(declarations);
    }

    return style;
}

function parseDeclarations(declarations: string): { [property: string]: string } {
    const style: { [property: string]: string } = {};
    const declarationRegex = /([^:]+):([^;]+);/g;
    let match;

    while ((match = declarationRegex.exec(declarations)) !== null) {
        const property = match[1].trim();
        const value = match[2].trim();
        style[property] = value;
    }

    return style;
}
