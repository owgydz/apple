// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

import { BrowserWindow } from './browserWindow';
const browserWindow = new BrowserWindow('container-id');
browserWindow.loadURL('http://example.com');
browserWindow.run();