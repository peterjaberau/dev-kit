'use client'
import { useState, useEffect } from "react"
import { chakra, Stack, Button } from "@chakra-ui/react"

interface FlowEditorProps {
  initialFlow: any
  onFlowChange: (flow: any, error: string | null) => void
  error: string | null
}

export function FlowEditor({ initialFlow, onFlowChange }: FlowEditorProps) {
  const [flowJson, setFlowJson] = useState("")
  const [syntaxErrors, setSyntaxErrors] = useState<string[]>([])
  const [history, setHistory]: any = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    const jsonString = JSON.stringify(initialFlow, null, 2)
    setFlowJson(jsonString)
    setHistory([jsonString])
    setHistoryIndex(0)
  }, [initialFlow])

  const validateFlow = (jsonString: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    try {
      const parsed = JSON.parse(jsonString)

      // Basic structure validation
      if (!parsed.id) errors.push("Missing required field: id")
      if (!parsed.initial) errors.push("Missing required field: initial")
      if (!parsed.states) errors.push("Missing required field: states")

      // Validate initial state exists
      if (parsed.initial && parsed.states && !parsed.states[parsed.initial]) {
        errors.push(`Initial state "${parsed.initial}" not found in states`)
      }

      // Validate state transitions
      if (parsed.states) {
        Object.entries(parsed.states).forEach(([stateId, state]: [string, any]) => {
          if (state.on) {
            Object.values(state.on).forEach((target: any) => {
              if (typeof target === "string") {
                // Allow external references like "#flowId.state"
                if (target.startsWith("#")) return
                if (!parsed.states[target] && !target.match(/\./)) {
                  errors.push(`State "${stateId}" references non-existent state "${target}"`)
                }
              }
            })
          }
        })
      }

      return { isValid: errors.length === 0, errors }
    } catch (parseError) {
      const err = parseError as Error
      return { isValid: false, errors: [`JSON Parse Error: ${err.message}`] }
    }
  }

  const handleJsonChange = (newJsonString: string) => {
    setFlowJson(newJsonString)

    // Check for syntax errors
    let errors: string[] | any = []
    try {
      JSON.parse(newJsonString)
    } catch (syntaxError) {
      errors.push(`Syntax Error: ${(syntaxError as Error).message}`)
      setSyntaxErrors(errors)
      onFlowChange(null, errors[0])
      return
    }

    setSyntaxErrors([])

    // Validate flow
    const validation: any = validateFlow(newJsonString)

    if (validation.isValid) {
      // Add to history
      setHistory((prev: any) => [...prev.slice(0, historyIndex + 1), newJsonString])
      setHistoryIndex((prev) => prev + 1)

      onFlowChange(JSON.parse(newJsonString), null)
    } else {
      onFlowChange(null, validation.errors[0])
    }
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setFlowJson(history[historyIndex - 1])
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setFlowJson(history[historyIndex + 1])
    }
  }

  const formatJson = () => {
    try {
      const parsed = JSON.parse(flowJson)
      const formatted = JSON.stringify(parsed, null, 2)
      setFlowJson(formatted)
      handleJsonChange(formatted)
    } catch (e) {
      // Invalid JSON, don't format
    }
  }

  const insertTemplate = (template: string) => {
    const templates: Record<string, string> = {
      button: `
{
  "id": "button-example",
  "view": {
    "moduleId": "button-module"
  },
  "on": {
    "CLICK": "next-state"
  }
}`,
      validation: `
{
  "id": "validation-example", 
  "guards": [
    {
      "condition": {
        "field": "age",
        "operator": "gte",
        "value": 18
      },
      "errorMessage": "Must be 18+"
    }
  ]
}`,
      parallel: `
{
  "id": "parallel-example",
  "type": "parallel",
  "states": {
    "loading": {
      "on": {
        "COMPLETE": "done"
      }
    },
    "validation": {
      "on": {
        "VALID": "done"
      }
    }
  }
}`,
    }

    const templateValue = templates[template] || ""
    setFlowJson(templateValue)
    handleJsonChange(templateValue)
  }

  const allErrors = [...syntaxErrors, ...validateFlow(flowJson).errors]


  return (
    <Stack height={"full"} backgroundColor={"bg.panel"}>
      {/* Editor Toolbar */}
      <chakra.div
        css={{
          borderBottom: "1px solid",
          borderColor: "gray.200",
          paddingX: 4,
          paddingY: 2,
        }}
      >
        <chakra.div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <chakra.div
            css={{
              display: "flex",
              alignItems: "center",
              gapX: 2,
            }}
          >
            <Button onClick={handleUndo} disabled={historyIndex <= 0} size={"sm"}>
              ↶ Undo
            </Button>
            <Button size={"sm"} onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
              ↷ Redo
            </Button>
            <Button size={"sm"} onClick={formatJson}>
              🎨 Format
            </Button>
          </chakra.div>

          <chakra.div
            css={{
              display: "flex",
              alignItems: "center",
              gapX: 2,
            }}
          >
            <chakra.span
              css={{
                fontSize: "sm",
                color: "gray.600",
              }}
            >
              Templates:
            </chakra.span>
            <Button size={"sm"} onClick={() => insertTemplate("button")}>
              Button
            </Button>
            <Button size={"sm"} onClick={() => insertTemplate("validation")}>
              Validation
            </Button>
            <Button size={"sm"} onClick={() => insertTemplate("parallel")}>
              Parallel
            </Button>
          </chakra.div>
        </chakra.div>
      </chakra.div>

      {/* Error Panel */}
      {allErrors.length > 0 && (
        <chakra.div
          css={{
            borderBottom: "1px solid",
            backgroundColor: "red.50",
            paddingX: 4,
            paddingY: 2,
          }}
        >
          <chakra.div
            css={{
              display: "flex",
              alignItems: "center",
              gapX: 2,
            }}
          >
            <chakra.span
              css={{
                color: "red.600",
              }}
            >
              ⚠️
            </chakra.span>
            <chakra.div
              css={{
                fontSize: "sm",
                color: "red.700",
              }}
            >
              {allErrors.map((error, i) => (
                <chakra.div key={i}>{error}</chakra.div>
              ))}
            </chakra.div>
          </chakra.div>
        </chakra.div>
      )}

      {/* JSON Editor */}
      <chakra.div
        css={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <chakra.textarea
          value={flowJson}
          onChange={(e) => handleJsonChange(e.target.value)}
          css={{
            width: "full",
            height: "full",
            padding: 4,
            fontFamily: "monospace",
            fontSize: "sm",
            border: "0",
            resize: "none",
            outline: "none",
            backgroundColor: "gray.50",
            _focus: { outline: "none" },
          }}
          placeholder="Enter your flow JSON here..."
          spellCheck={false}
          style={{
            fontFamily: "JetBrains Mono, Fira Code, Monaco, Consolas, monospace",
            fontSize: "13px",
            lineHeight: "1.5",
          }}
        />
      </chakra.div>

      {/* Editor Status */}
      <chakra.div
        css={{
          borderTop: "1px solid",
          borderColor: "gray.200",
          paddingX: 4,
          paddingY: 2,
        }}
      >
        <chakra.div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "sm",
            color: "gray.600",
          }}
        >
          <chakra.div
            css={{
              display: "flex",
              alignItems: "center",
              gapX: 4,
            }}
          >
            <chakra.span>📝 Lines: {flowJson.split("\n").length}</chakra.span>
            <chakra.span>📏 Chars: {flowJson.length}</chakra.span>
            <chakra.span>✅ Valid: {allErrors.length === 0 ? "Yes" : "No"}</chakra.span>
          </chakra.div>
          <chakra.div
            css={{
              display: "flex",
              alignItems: "center",
              gapX: 2,
            }}
          >
            <chakra.span
              css={{
                px: 2,
                py: 0.5,
                backgroundColor: "green.100",
                color: "green.700",
                borderRadius: "full",
                fontSize: "xs",
              }}
            >
              JSON {allErrors.length === 0 ? "✓" : "✗"}
            </chakra.span>
            <chakra.span
              css={{
                px: 2,
                py: 0.5,
                backgroundColor: "blue.100",
                color: "blue.700",
                borderRadius: "full",
                fontSize: "xs",
              }}
            >
              Flow Schema {allErrors.length === 0 ? "✓" : "✗"}
            </chakra.span>
          </chakra.div>
        </chakra.div>
      </chakra.div>
    </Stack>
  )
}
