// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file.

class Renderer {
  constructor() {
    this.graphics = new Graphics(800, 600);
  }

  render(virtualDOM) {
    this.graphics.clear();

    // Render the parsed Virtual DOM with styles
    virtualDOM.forEach((node) => this.renderNode(node));

    this.graphics.present();
  }

  renderNode(node) {
    const styles = node.styles || {};

    if (node.type === 'div') {
      // Apply styles to the div element (e.g., background color, width, height)
      const width = styles.width ? parseInt(styles.width) : 100;
      const height = styles.height ? parseInt(styles.height) : 100;
      const color = styles.backgroundColor || 'white';

      this.graphics.drawRect(node.x, node.y, width, height, color);
    } else if (node.type === 'text') {
      // Apply text styles (e.g., font-size, color)
      const fontSize = styles.fontSize ? parseInt(styles.fontSize) : 12;
      const color = styles.color || 'black';

      this.graphics.renderText(node.content, node.x, node.y, fontSize, color);
    }

    // Recursively render child nodes
    if (node.children) {
      node.children.forEach((child) => this.renderNode(child));
    }
  }

  close() {
    this.graphics.close();
  }
}

export default Renderer;

