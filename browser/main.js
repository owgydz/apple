// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file.

import { openGoogleWindow } from './window.js';
import { fetchGoogleHomepage } from './google.js';  
import Renderer from './render.js';  

async function initBrowser() {
  const renderer = new Renderer();
  const virtualDOM = await fetchGoogleHomepage();
  renderer.render(virtualDOM);
  openGoogleWindow();
}

initBrowser();
// On caffeine
