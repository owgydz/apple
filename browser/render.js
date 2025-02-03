// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file.
import Graphics from './graphics';
import { VirtualDOM } from './virtualDOM';

class Renderer {
  constructor() {
    this.graphics = new Graphics(800, 600);
  }

  render(virtualDOM) {
    this.graphics.clear();]
    
    if (virtualDOM.type === 'div') {
      this.graphics.drawRect(virtualDOM.x, virtualDOM.y, virtualDOM.width, virtualDOM.height, virtualDOM.style.backgroundColor || { r: 255, g: 255, b: 255, a: 255 });
      if (virtualDOM.children) {
        virtualDOM.children.forEach(child => this.render(child)); 
      }
    } else if (virtualDOM.type === 'text') {
      this.graphics.renderText(virtualDOM.content, virtualDOM.x, virtualDOM.y);
    }

    this.graphics.present();
  }

  close() {
    this.graphics.close();
  }
}

export default Renderer;
