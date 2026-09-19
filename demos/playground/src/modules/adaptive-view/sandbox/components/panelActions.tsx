import { useDockviewPanel } from "../desktop/selectors"
import * as React from "react"
import { LM } from "../desktop/designer/theme-utils"
import { IconBtn } from "../desktop/designer/designer-kit"

const PanelAction = ({ panelId }: { panelId: string }) => {
  const { isActive, isVisible: visible, sendToDockview } = useDockviewPanel(panelId)
  const onClick = () => sendToDockview({ type: "onSetActivePanel", params: { panelId } })
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 0",
        minHeight: 28,
      }}
    >
      <button
        onClick={onClick}
        style={{
          flex: 1,
          padding: "5px 10px",
          fontSize: 11.5,
          fontWeight: isActive ? 600 : 500,
          fontFamily: LM.ui,
          border: `1px solid ${isActive ? LM.accent : LM.border}`,
          borderRadius: LM.radiusSm,
          background: isActive ? LM.accent : LM.surface,
          color: isActive ? LM.accentContrast : LM.text,
          boxShadow: isActive ? LM.glow : "none",
          cursor: "pointer",
          textAlign: "left",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {panelId}
      </button>
      <div style={{ display: "flex", gap: 3 }}>
        <IconBtn
          icon="ad_group"
          title="Float"
          onClick={() => sendToDockview({ type: "onFloatPanel", params: { panelId } })}
        />
        <IconBtn
          icon="open_in_new"
          title="Popout"
          onClick={() => sendToDockview({ type: "onPopoutPanel", params: { panelId } })}
        />
        <IconBtn
          icon="close"
          title="Close"
          onClick={() => sendToDockview({ type: "onClosePanel", params: { panelId } })}
        />
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 16,
            color: visible ? LM.muted : LM.faint,
            display: "flex",
            alignItems: "center",
            padding: "0 2px",
          }}
          title="Visibility (read-only)"
        >
          {visible ? "visibility" : "visibility_off"}
        </span>
      </div>
    </div>
  )
}

export const PanelActions = (props: { panels: string[] }) => {
  return (
    <div style={{ padding: "2px 0" }}>
      {props.panels.map((id) => (
        <PanelAction key={id} panelId={id} />
      ))}
    </div>
  )
}
