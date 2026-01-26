"use client"

import { useEffect, useRef, useState } from "react"
import CodeEditor from "./components/CodeEditor"
import type { EditorView } from "@codemirror/view"

function getInitialCode(language: any) {
  if (language === "json") {
    return `{ "firstName": "John", "lastName": "Doe", "age": 30 }`
  } else {
    return `just a normal text`
  }
}


export default function Page() {
  const [isClient, setIsClient] = useState(false)

  const [language, setLanguage] = useState<any>("json")
  const [code, setCode] = useState(getInitialCode("json"))
  const [output, setOutput] = useState("")

  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState({
    fontSize: 14,
    fontFamily: "monospace",
    lineHeight: 1.5,
  })

  const editorViewRef = useRef<EditorView | null>(null)


  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return  <CodeEditor
    language={'javascript'}
    code={code}
    onChange={setCode}
    editorViewRef={editorViewRef}
    settings={settings}
  />
}
