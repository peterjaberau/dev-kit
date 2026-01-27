"use client"
import { useState } from "react"
import CodeMirrorEditor from "../CodeMirrorEditor"
import CodeMirrorViewer from "../CodeMirrorViewer"

export default function CodeMirrorEditView() {
  const [code, setCode] = useState(`console.log('Hello CodeMirror')`)

  return (
    <main style={{ padding: 24, display: "grid", gap: 24 }}>
      <CodeMirrorEditor data={code} onChange={setCode} />

      <CodeMirrorViewer data={code} />
    </main>
  )
}
