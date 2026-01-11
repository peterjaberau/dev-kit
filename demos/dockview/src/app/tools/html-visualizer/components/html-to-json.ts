export function htmlToJson(html: any): any {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")

  function nodeToJson(node: any): any {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim()
      return text ? { type: "text", content: text } : null
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return null

    return {
      type: "element",
      tag: node.tagName.toLowerCase(),
      attributes: [...node.attributes].reduce((a, b) => {
        a[b.name] = b.value
        return a
      }, {}),
      children: [...node.childNodes].map(nodeToJson).filter(Boolean),
    }
  }

  return nodeToJson(doc.body)
}
