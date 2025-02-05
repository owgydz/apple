// Copyright 2025 the Apple authors.
// This project is governed under the Mozilla Public License, v2.0. View in the LICENSE file.

let Module = {
  onRuntimeInitialized: function() {
    const canvas = document.getElementById('renderCanvas');
    canvas.width = 800;
    canvas.height = 600;
    
    // Initialize WebGL context
    const gl = canvas.getContext('webgl2');
    if (!gl) {
      alert("ERR! WebGL 2 not supported");
      return;
    }
    
    Module._init();

    // Render loop
    function render() {
      Module._render();
      gl.flush()
      requestAnimationFrame(render);
    }

    render(); 
  }
};

// wasm mod setup
const script = document.createElement('script');
script.src = 'renderer.js';
document.body.appendChild(script);
