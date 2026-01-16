function domToJson(node) {
  // COMMENT NODE
  if (node.nodeType === Node.COMMENT_NODE) {
    return {
      tag: 'comment',
      text: node.nodeValue.trim(),
    };
  }

  // TEXT NODE (ignore whitespace-only)
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.nodeValue.trim();
    if (!text) return null;
    return {
      tag: 'text',
      text,
    };
  }

  // ELEMENT NODE
  if (node.nodeType === Node.ELEMENT_NODE) {
    const obj = {
      tag: node.tagName.toLowerCase(),
      id: node.getAttribute('id'),
      style: normalizeStyle(node.getAttribute('style')),
      children: [],
    };

    for (const child of node.childNodes) {
      const childJson = domToJson(child);
      if (childJson) {
        obj.children.push(childJson);
      }
    }

    // lift direct text content
    const directText = Array.from(node.childNodes)
      .filter((n) => n.nodeType === Node.TEXT_NODE)
      .map((n) => n.nodeValue.trim())
      .join(' ');

    if (directText) {
      obj.text = directText;
    }

    return obj;
  }

  return null;
}
function normalizeStyle(style) {
  if (!style) return null;

  return style
    .replace(/\n/g, ' ') // remove newlines
    .replace(/\s+/g, ' ') // collapse whitespace
    .replace(/\s*;\s*/g, '; ') // normalize semicolon spacing
    .trim();
}