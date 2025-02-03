// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file.

import SDL from 'sdl2';  

class Graphics {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    SDL.init(SDL.INIT_VIDEO);

    this.window = SDL.createWindow('AppleJS Browser', SDL.WINDOWPOS_CENTERED, SDL.WINDOWPOS_CENTERED, this.width, this.height, SDL.WINDOW_SHOWN);
    this.renderer = SDL.createRenderer(this.window, -1, SDL.RENDERER_ACCELERATED);

    this.clearColor = { r: 0, g: 0, b: 0, a: 255 };
  }

  clear() {
    SDL.setRenderDrawColor(this.renderer, this.clearColor.r, this.clearColor.g, this.clearColor.b, this.clearColor.a);
    SDL.renderClear(this.renderer);
  }

  renderText(text, x, y, fontColor = { r: 255, g: 255, b: 255, a: 255 }) {
    console.log(`Render text "${text}" at (${x}, ${y})`);
  }

  drawRect(x, y, w, h, color = { r: 255, g: 255, b: 255, a: 255 }) {
    SDL.setRenderDrawColor(this.renderer, color.r, color.g, color.b, color.a);
    SDL.renderFillRect(this.renderer, { x, y, w, h });
  }

  present() {
    SDL.renderPresent(this.renderer);
  }

  close() {
    SDL.destroyRenderer(this.renderer);
    SDL.destroyWindow(this.window);
    SDL.quit();
  }
}

export default Graphics;
