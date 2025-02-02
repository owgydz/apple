// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.


export class MarkAndSweepGC {
  constructor() {
    this.objects = new Set();
  }

  allocate(obj) {
    this.objects.add(obj);
    return obj;
  }

  mark(env) {
    const stack = [env];
    const marked = new Set();

    while (stack.length) {
      let current = stack.pop();
      if (!marked.has(current)) {
        marked.add(current);
        stack.push(...Object.values(current.variables));
      }
    }

    return marked;
  }

  sweep(marked) {
    for (let obj of this.objects) {
      if (!marked.has(obj)) {
        this.objects.delete(obj);
      }
    }
  }

  runGC(env) {
    const marked = this.mark(env);
    this.sweep(marked);
  }
}
