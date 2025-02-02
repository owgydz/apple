// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

export const builtins = {
  pow: (a, b) => Math.pow(a, b),
  abs: (a) => Math.abs(a),
  sin: (a) => Math.sin(a),
  push: (array, value) => {
    if (!Array.isArray(array)) throw new Error("push can only be used on arrays");
    array.push(value);
    return array;
  },
  map: (array, fn) => {
    if (!Array.isArray(array)) throw new Error("map can only be used on arrays");
    if (typeof fn !== "function") throw new Error("map requires a function");
    return array.map(fn);
  },
  slice: (str, start, end) => {
    if (typeof str !== "string") throw new Error("slice requires a string");
    return str.slice(start, end);
  },
  replace: (str, search, replacement) => {
    if (typeof str !== "string") throw new Error("replace requires a string");
    return str.replace(search, replacement);
  },
  now: () => Date.now()
};

  
