// Copyright 2025 the Apple authors
// This code is governed by the Mozilla Public License v2.0. See in the LICENSE file.

import { VirtualDOM } from './browser/virtualDOM.js';
import Renderer from './browser/render.js';

const renderer = new Renderer();

// Only an example for now since this is the `beta` branch
const virtualDOM = new VirtualDOM('div', { x: 50, y: 50, width: 300, height: 200, style: { backgroundColor: { r: 0, g: 0, b: 255, a: 255 } } }, [
  new VirtualDOM('text', { x: 60, y: 60, content: 'Welcome to AppleJS Browser' })
]);

renderer.render(virtualDOM);
