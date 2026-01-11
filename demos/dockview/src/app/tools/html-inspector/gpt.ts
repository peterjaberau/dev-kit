'use client';

import React, { useEffect, useRef, useState } from 'react';

/* ---------------- Types ---------------- */

export type DomPathItem = {
  tag: string;
  attributes: Record<string, string>;
};

export type DomTreeNode = {
  tag: string;
  attributes: Record<string, string>;
  text: string;
  children: DomTreeNode[];
  path: DomPathItem[];
};

export type DomTreeStats = {
  tagCounts: Record<string, number>;
  totalElements: number;
  maxDepth: number;
};

export type DomTreeResult = {
  tree: DomTreeNode;
  stats: DomTreeStats;
};

/* ---------------- Public API ---------------- */

/**
 * Converts an HTML snippet into a JSON DOM tree.
 * This function parses ONLY fragments (no <html>, <body>).
 */
export function htmlSnippetToDomTree(html: string): DomTreeResult {
  const fragment = parseHtmlSnippet(html);
  return analyzeFragment(fragment);
}

/* ---------------- Parsing ---------------- */

function parseHtmlSnippet(html: string): DocumentFragment {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content;
}

/* ---------------- Analysis ---------------- */

function analyzeFragment(fragment: DocumentFragment): DomTreeResult {
  const stats: DomTreeStats = {
    tagCounts: {},
    totalElements: 0,
    maxDepth: 0,
  };

  const children = Array.from(fragment.children).map(el =>
    buildTreeNode(el, 0, stats, [])
  );

  return {
    tree: {
      tag: 'root',
      attributes: {},
      text: '',
      children,
      path: [],
    },
    stats,
  };
}

function buildTreeNode(
  element: Element,
  depth: number,
  stats: DomTreeStats,
  path: DomPathItem[]
): DomTreeNode {
  stats.totalElements++;
  stats.maxDepth = Math.max(stats.maxDepth, depth);

  const tag = element.tagName.toLowerCase();
  stats.tagCounts[tag] = (stats.tagCounts[tag] || 0) + 1;

  const node: DomTreeNode = {
    tag,
    attributes: {},
    text: '',
    children: [],
    path: [...path, { tag, attributes: {} }],
  };

  for (const attr of Array.from(element.attributes)) {
    node.attributes[attr.name] = attr.value;
    node.path.at(-1)!.attributes[attr.name] = attr.value;
  }

  for (const child of Array.from(element.childNodes)) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      node.children.push(
        buildTreeNode(child as Element, depth + 1, stats, node.path)
      );
    } else if (
      child.nodeType === Node.TEXT_NODE &&
      child.textContent?.trim()
    ) {
      node.text += child.textContent.trim().slice(0, 50);
    }
  }

  return node;
}


export function DomAnalyzerClient({ html = '' }: { html?: string }) {
  const [result, setResult] = useState<DomTreeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (!html.trim()) {
      setResult(null);
      setError(null);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      try {
        const parsed = htmlSnippetToDomTree(html);
        setResult(parsed);
        setError(null);
      } catch {
        setResult(null);
        setError('Invalid HTML snippet');
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [html]);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!result) return <div style={{ opacity: 0.6 }}>Paste HTML and parse</div>;

  /* Temporary debug render */
  return (
    <pre style={{ fontSize: 12, overflow: 'auto' }}>
  {JSON.stringify(result.tree, null, 2)}
  </pre>
);
}