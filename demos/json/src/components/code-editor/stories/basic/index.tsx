import { useEffect, useRef, useState } from "react"
import type { EditorView } from "@codemirror/view"
import CodeEditor from "../.."
import { getInitialCode } from "../_fixtures_"

export default function CodeMirrorBasic() {
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

  return (
    <CodeEditor
      language={"javascript"}
      code={code}
      onChange={setCode}
      editorViewRef={editorViewRef}
      settings={settings}
    />
  )
}
