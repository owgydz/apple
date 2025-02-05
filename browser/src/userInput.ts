// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

import { BrowserWindow } from './browserWindow';

export class UserInput {
    private browserWindow: BrowserWindow;

    constructor(browserWindow: BrowserWindow) {
        this.browserWindow = browserWindow;
    }

    handleInput(input: string) {
        if (input.startsWith('http')) {
            this.browserWindow.loadURL(input);
        } else {
            console.log('ERR! Invalid URL. Type in a valid URL');
        }
    }
}