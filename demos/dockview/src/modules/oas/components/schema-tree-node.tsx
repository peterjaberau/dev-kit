'use client'
import React, { useState } from "react"

/* Single node renderer. */
export function SchemaTreeNode({ node }: any) {
  const [open, setOpen] = useState(false)
  const hasChildren = node.children && node.children.length > 0

  return (
    <li>
      <div onClick={() => hasChildren && setOpen(!open)} style={{ cursor: hasChildren ? "pointer" : "default" }}>
        {hasChildren && (open ? "▼" : "►")} <strong>{node.name}</strong>: <em>{node.type}</em>
        {Object.keys(node.details).length > 0 && (
          <span style={{ marginLeft: "0.5rem", color: "#666" }}>
            {Object.entries(node.details)
              .map(([k, v]) => `${k}=${Array.isArray(v) ? v.join(", ") : v}`)
              .join("; ")}
          </span>
        )}
      </div>
      {open && hasChildren && (
        <ul style={{ paddingLeft: "1rem", borderLeft: "1px solid #ccc", marginLeft: "0.5rem" }}>
          {node.children.map((child: any, index: any) => (
            <SchemaTreeNode key={`${child.name}-${index}`} node={child} />
          ))}
        </ul>
      )}
    </li>
  )
}

