// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file.

// Apply styles.
function applyStyles(element, styles) {
  for (const property in styles) {
    element.style[property] = styles[property];
  }
}

// Styles
const shellElement = document.getElementById('shell');
const shellStyles = {
  backgroundColor: '#282c34',
  color: '#61dafb',
  fontFamily: 'monospace',
  fontSize: '14px',
  padding: '10px',
  border: '1px solid #61dafb',
  borderRadius: '5px',
  margin: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'auto',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word'
};

// Apply styles to the shell element
applyStyles(shellElement, shellStyles);

export { applyStyles };
