// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file.
import Graphics from './graphics';  

class Renderer {
  constructor() {
    this.graphics = new Graphics(800, 600);
  }

  render(virtualDOM) {
    this.graphics.clear();
    virtualDOM.forEach((node) => this.renderNode(node));
    this.graphics.present();
  }

  renderNode(node) {
    if (node.type === 'div') {
      // Just draw a rectangle
      this.graphics.drawRect(node.x, node.y, node.width || 100, node.height || 100, { r: 255, g: 255, b: 255, a: 255 });
    } else if (node.type === 'text') {
      // text
      this.graphics.renderText(node.content, node.x, node.y);
    }
    
    if (node.children) {
      node.children.forEach((child) => this.renderNode(child));
    }
  }

  close() {
    this.graphics.close();
  }
}

export default Renderer;
