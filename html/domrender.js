export function renderDOM(domElements) {
  return domElements.map((element) => {
    let html = `<${element.tagName}`;
    
    for (const [key, value] of Object.entries(element.attributes)) {
      html += ` ${key}="${value}"`;
    }

    if (element.isSelfClosing) {
      html += ' />';
      return html;
    }

    html += `>${element.innerHTML}`;
    if (element.children.length > 0) {
      html += renderDOM(element.children).join('');
    }

    html += `</${element.tagName}>`;
    return html;
  }).join('');
}
