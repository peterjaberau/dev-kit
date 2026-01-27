"use client"

import React from "react"

interface CodeMirrorViewerProps {
  data: string
}

export default function CodeMirrorViewer({ data }: CodeMirrorViewerProps) {
  return (
    <pre
      style={{
        background: "#0d1117",
        color: "#c9d1d9",
        padding: "12px",
        overflowX: "auto",
      }}
    >
      {data}
    </pre>
  )
}