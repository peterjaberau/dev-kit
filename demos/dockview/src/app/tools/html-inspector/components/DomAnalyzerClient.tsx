'use client';

import React, { useEffect, useMemo, useState } from 'react';

type DomPathItem = {
  tag: string;
  attributes: Record<string, string>;
};

type DomNode = {
  tag: string;
  attributes: Record<string, string>;
  text: string;
  children: DomNode[];
  path: DomPathItem[];
};

type DomStats = {
  tagCounts: Record<string, number>;
  totalElements: number;
  maxDepth: number;
};

type DomData = {
  tree: DomNode;
  stats: DomStats;
};

export function DomAnalyzerClient({ html = '' }: { html?: string }) {
  const [domData, setDomData] = useState<DomData | null>(null);
  const [selectedPath, setSelectedPath] = useState<DomPathItem[] | null>(null);

  const [showAttrs, setShowAttrs] = useState(true);
  const [showText, setShowText] = useState(true);
  const [expandAll, setExpandAll] = useState(false);

  /* ---------------- Parse HTML ---------------- */

  useEffect(() => {
    if (typeof html !== "string" || !html.trim()) {
      setDomData(null)
      setSelectedPath(null)
      return
    }

    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, "text/html")
      const analyzed = analyzeDOM(doc)

      setDomData(analyzed)
      setSelectedPath(null)
    } catch {
      setDomData(null)
    }
  }, [html])

  /* ---------------- DOM Analysis ---------------- */

  function analyzeDOM(doc: Document): DomData {
    const stats: DomStats = { tagCounts: {}, totalElements: 0, maxDepth: 0 };
    const tree = buildTreeNode(doc.documentElement, 0, stats, []);
    return { tree, stats };
  }

  function buildTreeNode(
    element: Element,
    depth: number,
    stats: DomStats,
    path: DomPathItem[]
  ): DomNode {
    stats.totalElements++;
    stats.maxDepth = Math.max(stats.maxDepth, depth);

    const tag = element.tagName.toLowerCase();
    stats.tagCounts[tag] = (stats.tagCounts[tag] || 0) + 1;

    const node: DomNode = {
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

  /* ---------------- Tree UI ---------------- */

  const TreeNode = ({ node }: { node: DomNode }) => {
    const [expanded, setExpanded] = useState(expandAll);

    useEffect(() => {
      setExpanded(expandAll);
    }, [expandAll]);

    const hasChildren = node.children.length > 0;

    return (
      <div className="tree-node">
        <div
          className={`node-header ${
            selectedPath === node.path ? 'selected' : ''
          }`}
          onClick={() => setSelectedPath(node.path)}
        >
          <span
            className="node-toggle"
            onClick={(e) => {
              e.stopPropagation();
              if (hasChildren) setExpanded(!expanded);
            }}
          >
            {hasChildren ? (expanded ? '▼' : '▶') : '·'}
          </span>

          <span className="node-tag">{`<${node.tag}>`}</span>

          {showAttrs && Object.keys(node.attributes).length > 0 && (
            <span className="node-attrs">
              {' '}
              {Object.entries(node.attributes)
                .slice(0, 3)
                .map(([k, v]) => `${k}="${v.slice(0, 15)}"`)
                .join(' ')}
            </span>
          )}

          {showText && node.text && (
            <span className="node-text">{` "${node.text}"`}</span>
          )}
        </div>

        {expanded && (
          <div className="node-children">
            {node.children.map((c, i) => (
              <TreeNode key={i} node={c} />
            ))}
          </div>
        )}
      </div>
    );
  };

  /* ---------------- BS4 Code ---------------- */

  const bs4Code = useMemo(() => {
    if (!selectedPath) return 'Select an element';

    const selectors = generateSelectors(selectedPath);

    return (
      `from bs4 import BeautifulSoup\n\n` +
      `soup = BeautifulSoup(html, 'html.parser')\n\n` +
      `element = soup.select_one("${selectors.css}")\n`
    );
  }, [selectedPath]);

  function generateSelectors(path: DomPathItem[]) {
    const useful = path.filter(p => !['html', 'body'].includes(p.tag));

    const css = useful
      .map(p => {
        let s = p.tag;
        if (p.attributes.id) s += `#${p.attributes.id}`;
        if (p.attributes.class)
          s += '.' + p.attributes.class.split(/\s+/).join('.');
        return s;
      })
      .join(' > ');

    return { css };
  }

  /* ---------------- Render ---------------- */

  if (!domData) {
    return <div style={{ opacity: 0.6 }}>Paste HTML to visualize</div>;
  }

  return (
    <div className="dom-analyzer">
      <div className="tree-container">
        <TreeNode node={domData.tree} />
      </div>

      <pre>
        <code>{bs4Code}</code>
      </pre>
    </div>
  );
}