// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file.

import { openGoogleWindow } from './window.js';
import { fetchGoogleHomepage } from './google.js';  
import Renderer from './render.js';
import { setupNavigation } from './navigation.js';
import { setupUserInput } from './input.js';
import { setupBookmarks } from './bookmark.js';

async function initBrowser() {
  const renderer = new Renderer();
  const virtualDOM = await fetchGoogleHomepage();
  renderer.render(virtualDOM);
  setupNavigation(renderer, fetchGoogleHomepage);
  setupUserInput(renderer, fetchGoogleHomepage);
  setupBookmarks();
  openGoogleWindow();
}

initBrowser();
// On caffeine
