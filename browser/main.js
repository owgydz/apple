// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file.

import { fetchGoogleHomepage } from './google';  
import Renderer from './render';  

async function initBrowser() {
  const renderer = new Renderer();
  const virtualDOM = await fetchGoogleHomepage();
  renderer.render(virtualDOM);
}

initBrowser();
// On caffeine 
