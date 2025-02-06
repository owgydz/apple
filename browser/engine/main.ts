import { parseHTML } from './htmlpar';
import { render } from './renderer';
import { parseCSS } from './css';
import { calculateLayout } from './layout';
import { attachEventHandlers } from './handler';
import { executeScripts } from './execu';
import { createElement, appendChild, removeChild, setAttribute, setTextContent } from './dommani';

const html = '<html><body><h1>Hello, world!</h1><p>This is a paragraph.</p><div><span>Nested content</span></div></body></html>';
const css = 'h1 { color: red; } p { font-size: 16px; }';
const dom = parseHTML(html);
const styles = parseCSS(css);
const layout = calculateLayout(dom);
attachEventHandlers(dom);
executeScripts(dom);
const output = render(dom, styles);

console.log(output);

const newElement = createElement('div');
setAttribute(newElement, 'id', 'new-div');
setTextContent(newElement, 'This is a new div element.');
appendChild(dom.children![0], newElement);

const updatedOutput = render(dom, styles);
console.log(updatedOutput); // print the output

// child elements
removeChild(dom.children![0], newElement);
const outputAfterRemoval = render(dom, styles);
console.log(outputAfterRemoval);
// attributes
const anotherElement = createElement('span');
setAttribute(anotherElement, 'class', 'highlight');
setTextContent(anotherElement, 'Highlighted text');
appendChild(dom.children![0], anotherElement);
const outputWithAttributes = render(dom, styles);
console.log(outputWithAttributes);

// time for nested elements
const nestedElement = createElement('div');
const innerElement = createElement('p');
setTextContent(innerElement, 'Inner paragraph');
appendChild(nestedElement, innerElement);
appendChild(dom.children![0], nestedElement);
const outputWithNestedElements = render(dom, styles);
console.log(outputWithNestedElements);

// multiple elements
const multipleElements = createElement('div');
for (let i = 0; i < 5; i++) {
    const childElement = createElement('p');
    setTextContent(childElement, `Paragraph ${i + 1}`);
    appendChild(multipleElements, childElement);
}
appendChild(dom.children![0], multipleElements);
const outputWithMultipleElements = render(dom, styles);
console.log(outputWithMultipleElements);

// deeply nested
const deepNestedElement = createElement('div');
let currentParent = deepNestedElement;
for (let i = 0; i < 10; i++) {
    const childElement = createElement('div');
    setTextContent(childElement, `Level ${i + 1}`);
    appendChild(currentParent, childElement);
    currentParent = childElement;
}
appendChild(dom.children![0], deepNestedElement);
const outputWithDeepNestedElements = render(dom, styles);
console.log(outputWithDeepNestedElements);
