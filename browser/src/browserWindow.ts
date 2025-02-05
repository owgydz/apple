// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

import { fetchResource } from '../engine/network';
import { parseHTML, Node } from '../engine/htmlpar';
import { parseCSS } from '../engine/css';
import { render } from '../engine/renderer';
import { calculateLayout } from '../engine/layout';
import { attachEventHandlers } from '../engine/handler';
import { executeScripts } from '../engine/execu';
import { createElement, appendChild, removeChild, setAttribute, setTextContent } from '../engine/dommani';

export class BrowserWindow {
    private currentURL: string;
    private dom: Node | null;
    private container: HTMLElement;

    constructor(containerId: string) {
        this.currentURL = 'https://www.google.com';
        this.dom = null;
        this.container = document.getElementById(containerId) as HTMLElement;
        this.setupGUI();
    }

    private setupGUI() {
        // Create address bar container
        const addressBarContainer = document.createElement('div');
        addressBarContainer.style.display = 'flex';
        addressBarContainer.style.alignItems = 'center';
        addressBarContainer.style.padding = '5px';
        addressBarContainer.style.borderBottom = '1px solid #ccc';
        addressBarContainer.style.backgroundColor = '#f1f1f1';

        // Create address bar
        const addressBar = document.createElement('input');
        addressBar.type = 'text';
        addressBar.value = this.currentURL;
        addressBar.style.flex = '1';
        addressBar.style.padding = '5px';
        addressBar.style.border = '1px solid #ccc';
        addressBar.style.borderRadius = '4px';
        addressBar.style.marginRight = '5px';
        addressBar.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.loadURL(addressBar.value);
            }
        });

        // Create go button
        const goButton = document.createElement('button');
        goButton.textContent = 'Go';
        goButton.style.padding = '5px 10px';
        goButton.style.border = '1px solid #ccc';
        goButton.style.borderRadius = '4px';
        goButton.style.backgroundColor = '#fff';
        goButton.style.cursor = 'pointer';
        goButton.addEventListener('click', () => {
            this.loadURL(addressBar.value);
        });

        // Create browser view
        const browserView = document.createElement('div');
        browserView.style.border = '1px solid #ccc';
        browserView.style.height = 'calc(100% - 50px)';
        browserView.style.overflow = 'auto';

        // Append elements to container
        addressBarContainer.appendChild(addressBar);
        addressBarContainer.appendChild(goButton);
        this.container.appendChild(addressBarContainer);
        this.container.appendChild(browserView);
    }

    async loadURL(url: string) {
        this.currentURL = url;
        const html = await fetchResource(url);
        this.dom = parseHTML(html);
        const css = ''; 
        const styles = parseCSS(css);
        const layout = calculateLayout(this.dom);
        attachEventHandlers(this.dom);
        executeScripts(this.dom);
        const output = render(this.dom, styles);
        this.updateView(output);
    }

    private updateView(content: string) {
        const browserView = this.container.querySelector('div:last-child') as HTMLElement;
        browserView.innerHTML = content;
    }

    createElement(tagName: string): Node {
        return createElement(tagName);
    }

    appendChild(parent: Node, child: Node) {
        appendChild(parent, child);
    }

    removeChild(parent: Node, child: Node) {
        removeChild(parent, child);
    }

    setAttribute(node: Node, name: string, value: string) {
        setAttribute(node, name, value);
    }

    setTextContent(node: Node, text: string) {
        setTextContent(node, text);
    }

    run() {
        console.log(`Browser running. Current URL: ${this.currentURL}`);
        // Add event listeners and other logic to handle user input and navigation
    }
}