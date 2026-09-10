import * as React from "react"
import { IDockviewGroupDragGhostProps } from "#adaptive-view/react"

export const WatermarkRenderer = () => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        color: "rgba(255,255,255,0.55)",
        fontFamily: "monospace",
        pointerEvents: "none",
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 32, opacity: 0.7 }}>
        dashboard
      </span>
      <div style={{ fontSize: 13 }}>Custom watermark</div>
      <div style={{ fontSize: 11, opacity: 0.7 }}>Drag a tab here or add a panel</div>
    </div>
  )
}


export const GroupDragGhostRenderer = (props: IDockviewGroupDragGhostProps) => {
  const count = props.group.panels.length
  const title = props.group.activePanel?.title ?? "Group"
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        background: "rgba(33, 150, 243, 0.92)",
        color: "white",
        font: "11px/1 system-ui, sans-serif",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
      }}
    >
      <span style={{ fontWeight: 600 }}>{title}</span>
      <span
        style={{
          padding: "1px 6px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.25)",
        }}
      >
        +{Math.max(0, count - 1)} more
      </span>
    </div>
  )
}
