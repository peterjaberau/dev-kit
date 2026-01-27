"use client"
import React from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"

interface CodeMirrorEditorProps {
  data: string
  config?: {
    theme?: any
    extensions?: any[]
  }
  onChange: (value: string) => void
}

export default function CodeMirrorEditor({ data, config, onChange }: CodeMirrorEditorProps) {
  return (
    <CodeMirror
      value={data}
      height="200px"
      extensions={config?.extensions ?? [javascript()]}
      onChange={(value) => onChange(value)}
    />
  )
}