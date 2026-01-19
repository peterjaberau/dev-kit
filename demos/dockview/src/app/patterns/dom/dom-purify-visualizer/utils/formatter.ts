export function formatHTML(html: string): string {
  let formatted = '';
  const pad = 2;
  let indent = 0;

  // Split by tags, preserving them. This handles mixed content like <h1>Text</h1> better.
  // The regex matches <...> lazily but we use [^>]* to be robust against simple cases.
  // We trim each token to remove existing formatting.
  const tokens = html.split(/(<[^>]+>)/g)
    .map(t => t.trim())
    .filter(t => t.length > 0);

  tokens.forEach((node, index) => {
    // Determine the type of the node
    const isTag = node.startsWith('<') && node.endsWith('>');
    const isClosing = isTag && node.match(/^<\/\w/);
    const isOpening = isTag && node.match(/^<\w/) && !node.startsWith('<!'); // Exclude comments/doctype
    
    // Check for self-closing or void tags
    // Void tags: area, base, br, col, embed, hr, img, input, link, meta, param, source, track, wbr
    const isVoid = isOpening && node.match(/^<(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)\b/i);
    const isSelfClosingExplicit = isOpening && node.match(/\/>$/);
    const isSelfClosing = isVoid || isSelfClosingExplicit;

    let indentLevel = indent;

    if (isClosing) {
      indent -= 1;
      if (indent < 0) indent = 0;
      indentLevel = indent;
    }

    if (index !== 0) formatted += '\n';
    
    formatted += ' '.repeat(indentLevel * pad) + node;

    if (isOpening && !isSelfClosing) {
      indent += 1;
    }
  });

  return formatted.trim();
}
