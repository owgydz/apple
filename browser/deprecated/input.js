// Copyright 2025 the Apple authors. 
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file.

export function setupNavigation(renderer, fetchPage) {
  document.getElementById('back').addEventListener('click', () => window.history.back());
  document.getElementById('forward').addEventListener('click', () => window.history.forward());
  document.getElementById('refresh').addEventListener('click', async () => {
    const virtualDOM = await fetchPage(window.location.href);
    renderer.render(virtualDOM);
  });
}
