import React from "react"
import { useRecursive } from "./gpt-use-recursive"


export function RenderRecursive({ source }) {
  const {
    stateValue,
    transform,
    output,

    isIdle,
    isBooting,

    start,
    reset,
  } = useRecursive(source)

  /* ───────────────────────────────────────────── */
  /* STYLES                                       */
  /* ───────────────────────────────────────────── */

  const buttonStyle = (enabled, color) => {
    return {
      padding: "8px 16px",
      marginRight: 8,
      backgroundColor: enabled ? color : "#ccc",
      color: "#fff",
      border: "none",
      borderRadius: 4,
      cursor: enabled ? "pointer" : "not-allowed",
    }
  }

  const boxStyle = {
    padding: 12,
    marginTop: 12,
    border: "1px solid #ddd",
    borderRadius: 6,
    background: "#fafafa",
    fontFamily: "monospace",
    fontSize: 13,
  }

  /* ───────────────────────────────────────────── */
  /* RENDER                                      */
  /* ───────────────────────────────────────────── */

  return (
    <div style={{ maxWidth: 720 }}>
      <h3>Recursive Tree Machine</h3>

      {/* CONTROLS */}
      <div style={{ marginBottom: 12 }}>
        <button style={buttonStyle(isIdle, "#2e7d32")} disabled={!isIdle} onClick={start}>
          START
        </button>

        <button style={buttonStyle(!isBooting, "#c62828")} disabled={isBooting} onClick={reset}>
          RESET
        </button>
      </div>

      {/* MACHINE STATE */}
      <div style={boxStyle}>
        <strong>Machine State</strong>
        <pre>{JSON.stringify(stateValue, null, 2)}</pre>
      </div>

      {/* ITERATION STATE */}
      <div style={boxStyle}>
        <strong>Iteration (context.transform)</strong>
        <pre>{JSON.stringify(transform, null, 2)}</pre>
      </div>

      {/* OUTPUT */}
      <div style={boxStyle}>
        <strong>Output (incremental)</strong>
        <pre>{JSON.stringify(output, null, 2)}</pre>
      </div>
    </div>
  )
}
