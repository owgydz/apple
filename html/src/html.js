// Copyright 2025 the Apple authors.
// This project is governed under the Mozilla Public License, v2.0. View in the LICENSE file.

export function parseHTML(htmlString) {
  const parser = new DOMParser();
  return parser.parseFromString(htmlString, 'text/html');
}

export function renderHTML(dom) {
  return new XMLSerializer().serializeToString(dom);
}

export function manipulateHTML(dom, callback) {
  callback(dom);
  return dom;
}
