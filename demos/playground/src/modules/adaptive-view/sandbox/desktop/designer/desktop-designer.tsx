import * as React from "react"
import { Btn, IconBtn, IconChip } from "./designer-kit"
import { DesignerDockviewTheme } from "./designer-dockview-theme"
import { LM } from "./theme-utils"

type DesignerPanel = "theme" | "controller"
type DockviewThemeDesignerProps = React.ComponentProps<typeof DesignerDockviewTheme>

export interface DesktopDesignerProps extends DockviewThemeDesignerProps {
  open: boolean
  onClose: () => void
  onReset: () => void
  controller: React.ReactNode
}

const PanelSelector = (props: { active: DesignerPanel; onChange: (panel: DesignerPanel) => void }) => (
  <div style={{ padding: "10px 12px 4px", flexShrink: 0 }}>
    <div
      style={{
        display: "flex",
        background: LM.surface,
        border: `1px solid ${LM.border}`,
        borderRadius: LM.radiusSm,
        padding: 3,
        gap: 3,
      }}
    >
      {(
        [
          ["theme", "Theme"],
          ["controller", "Controls"],
        ] as [DesignerPanel, string][]
      ).map(([id, label]) => {
        const active = props.active === id

        return (
          <button
            key={id}
            onClick={() => props.onChange(id)}
            style={{
              flex: 1,
              padding: "6px 0",
              fontSize: 11.5,
              fontWeight: active ? 700 : 600,
              fontFamily: LM.ui,
              letterSpacing: "0.02em",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              outline: "none",
              background: active ? LM.accent : "transparent",
              color: active ? LM.accentContrast : LM.muted,
              boxShadow: active ? LM.glow : "none",
              transition: "background 0.12s, color 0.12s",
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  </div>
)

export const DesktopDesigner = ({ open, onClose, onReset, controller, ...themeProps }: DesktopDesignerProps) => {
  const [activePanel, setActivePanel] = React.useState<DesignerPanel>("theme")

  if (!open) return null

  return (
    <aside
      className="dv-designer-panel"
      style={{
        width: 332,
        background: LM.bg,
        color: LM.text,
        borderLeft: `1px solid ${LM.border}`,
        boxShadow: LM.shadowLg,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        fontFamily: LM.ui,
      }}
    >
      <header
        style={{
          padding: "11px 12px 11px 14px",
          borderBottom: `1px solid ${LM.border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <IconChip icon="tune" />
        <span
          style={{
            marginRight: "auto",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: LM.heading,
          }}
        >
          Desktop Designer
        </span>
        {activePanel === "theme" && (
          <Btn onClick={onReset} icon="restart_alt" title="Reset all overrides">
            Reset
          </Btn>
        )}
        <IconBtn onClick={onClose} icon="close" title="Close" />
      </header>

      <PanelSelector active={activePanel} onChange={setActivePanel} />

      <div
        className="dv-trade-scroll"
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {activePanel === "theme" ? <DesignerDockviewTheme {...themeProps} /> : controller}
      </div>
    </aside>
  )
}
