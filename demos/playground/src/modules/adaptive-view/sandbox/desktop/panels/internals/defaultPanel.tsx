import * as React from "react"
import { IDockviewPanelProps } from "#adaptive-view/core"
import { DebugContext } from "../../providers/DebugContext"
import { usePanelApiMetadata, usePanelApi } from "../../providers/PanelApiContext"
import { useSandboxColors } from "../../../sandbox-manager/sandboxTheme"
import { DebugPanelTable } from "../debugPanel"
import { Option } from "../components"
import { MONO } from "#adaptive-view/sandbox/desktop/constants"

export function DefaultPanel() {
  const isDebug = React.useContext(DebugContext)
  const panelApi: any = usePanelApi()
  const metadata = usePanelApiMetadata(panelApi)
  const c = useSandboxColors()

  if (isDebug) {
    return (
      <div style={{ background: c.bg, color: c.text, border: "2px dashed orange", padding: 8, fontSize: "0.8em" }}>
        <Option
          title="Panel Rendering Mode"
          value={metadata.renderer.value}
          onClick={() => panelApi.setRenderer(panelApi.renderer === "always" ? "onlyWhenVisible" : "always")}
        />
        <DebugPanelTable data={metadata} />
      </div>
    )
  }

  // Clean, theme-aware placeholder for generic / user-added panels: a
  // faint dotted field with the panel title and an idle status line.
  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        backgroundImage: `radial-gradient(${c.border} 1px, transparent 1px)`,
        backgroundSize: "16px 16px",
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 26, color: c.textFaint }}>
        monitoring
      </span>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 13,
          fontWeight: 600,
          color: c.textSecondary,
        }}
      >
        {panelApi.title}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 10.5,
          color: c.textFaint,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 6,
            background: c.green,
            boxShadow: `0 0 4px ${c.green}`,
          }}
        />
        Connected · idle
      </div>
    </div>
  )
}
