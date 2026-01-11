"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import './style.css'

/* ---------------- Types ---------------- */

type DomPathItem = {
  tag: string
  attributes: Record<string, string>
}

type DomNode = {
  tag: string
  attributes: Record<string, string>
  text: string
  children: DomNode[]
  path: DomPathItem[]
}

type DomStats = {
  tagCounts: Record<string, number>
  totalElements: number
  maxDepth: number
}

type DomData = {
  tree: DomNode
  stats: DomStats
}

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

export function DomAnalyzerClient({ html = "" }: { html?: string }) {
  const [domData, setDomData] = useState<DomData | null>(null)
  const [selectedPath, setSelectedPath] = useState<DomPathItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const debounceRef = useRef<number | null>(null)

  /* ---------------- Debounced Parse ---------------- */

  useEffect(() => {
    if (!html.trim()) {
      setDomData(null)
      setSelectedPath(null)
      setError(null)
      return
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = window.setTimeout(() => {
      try {
        const fragment = parseHtmlSnippet(html)
        const analyzed = analyzeFragment(fragment)

        setDomData(analyzed)
        setSelectedPath(null)
        setError(null)
      } catch {
        setDomData(null)
        setError("Invalid HTML snippet")
      }
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [html])

  /* ---------------- Parsing Helpers ---------------- */

  function parseHtmlSnippet(html: string): DocumentFragment {
    const template = document.createElement("template")
    template.innerHTML = html.trim()
    return template.content
  }

  function analyzeFragment(fragment: DocumentFragment): DomData {
    const stats: DomStats = {
      tagCounts: {},
      totalElements: 0,
      maxDepth: 0,
    }

    const children = Array.from(fragment.children).map((el) => buildTreeNode(el, 0, stats, []))

    return {
      tree: {
        tag: "root",
        attributes: {},
        text: "",
        children,
        path: [],
      },
      stats,
    }
  }

  function buildTreeNode(element: Element, depth: number, stats: DomStats, path: DomPathItem[]): DomNode {
    stats.totalElements++
    stats.maxDepth = Math.max(stats.maxDepth, depth)

    const tag = element.tagName.toLowerCase()
    stats.tagCounts[tag] = (stats.tagCounts[tag] || 0) + 1

    const node: DomNode = {
      tag,
      attributes: {},
      text: "",
      children: [],
      path: [...path, { tag, attributes: {} }],
    }

    for (const attr of Array.from(element.attributes)) {
      node.attributes[attr.name] = attr.value
      node.path.at(-1)!.attributes[attr.name] = attr.value
    }

    for (const child of Array.from(element.childNodes)) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        node.children.push(buildTreeNode(child as Element, depth + 1, stats, node.path))
      } else if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
        node.text += child.textContent.trim().slice(0, 50)
      }
    }

    return node
  }

  /* ---------------- Tree UI ---------------- */

  const TreeNode = ({ node }: { node: DomNode }) => {
    const [expanded, setExpanded] = useState(true)

    return (
      <div className="tree-node">
        <div
          className={`node-header ${selectedPath === node.path ? "selected" : ""}`}
          onClick={() => setSelectedPath(node.path)}
        >
          {node.tag !== "root" && <span className="node-tag">{`<${node.tag}>`}</span>}
        </div>

        {expanded && (
          <div className="node-children">
            {node.children.map((c, i) => (
              <TreeNode key={i} node={c} />
            ))}
          </div>
        )}
      </div>
    )
  }

  /* ---------------- BS4 Code ---------------- */

  const bs4Code = useMemo(() => {
    if (!selectedPath) return "Select an element"

    const css = selectedPath
      .filter((p) => !["root"].includes(p.tag))
      .map((p) => {
        let s = p.tag
        if (p.attributes.id) s += `#${p.attributes.id}`
        if (p.attributes.class) s += "." + p.attributes.class.split(/\s+/).join(".")
        return s
      })
      .join(" > ")

    return (
      `from bs4 import BeautifulSoup\n\n` +
      `soup = BeautifulSoup(html, 'html.parser')\n` +
      `element = soup.select_one("${css}")\n`
    )
  }, [selectedPath])

  /* ---------------- Render ---------------- */

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>
  }

  if (!domData) {
    return <div style={{ opacity: 0.6 }}>Paste HTML and click “Parse”</div>
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
  )


}
