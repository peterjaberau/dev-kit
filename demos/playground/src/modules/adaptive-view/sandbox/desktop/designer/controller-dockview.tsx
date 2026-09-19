import { useDesktop, useDockview, useDockviewActive } from "../selectors"
import * as React from "react"
import { GridActions } from "../../components/gridActions"
import { PanelActions } from "../../components/panelActions"
import { GroupActions } from "../../components/groupActions"
import { LM } from "./theme-utils"
import { Card, Switch, Btn } from "./designer-kit"

const Kbd = (props: { children: React.ReactNode }) => (
  <kbd
    style={{
      display: "inline-block",
      padding: "1px 6px",
      fontSize: 10,
      fontFamily: LM.mono,
      lineHeight: "16px",
      border: `1px solid ${LM.border}`,
      borderBottomWidth: 2,
      borderRadius: 4,
      background: LM.surface,
      color: LM.muted,
      whiteSpace: "nowrap",
    }}
  >
    {props.children}
  </kbd>
)

// Read-only reference. Mirrors the enabled `keyboardNavigation` bindings:
// KeyboardNavigation (nav) + KeyboardDocking (move). Keep in sync with
// DEFAULT_KEYMAP in dockview-enterprise if the defaults change.
const SHORTCUTS: { label: string; keys: string[] }[] = [
  { label: "Focus next / previous group", keys: ["F6", "⇧ F6"] },
  { label: "Focus group by direction", keys: ["Ctrl ⇧ ←↑↓→"] },
  { label: "Next / previous tab in group", keys: ["Ctrl ]", "Ctrl ["] },
  { label: "Focus the tab strip", keys: ["Ctrl ⇧ \\"] },
  { label: "Move panel: arm", keys: ["Ctrl M"] },
  { label: "…then pick target / edge", keys: ["←↑↓→"] },
  { label: "…tab into group (centre)", keys: ["Space", "C"] },
  { label: "…commit / cancel", keys: ["Enter", "Esc"] },
  { label: "…float instead of dock", keys: ["Ctrl ⇧ F"] },
]

const KeyboardShortcuts = () => (
  <div style={{ padding: "2px 0" }}>
    {SHORTCUTS.map((row) => (
      <div
        key={row.label}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "4px 0",
          fontSize: 11.5,
          color: LM.text,
          fontFamily: LM.ui,
        }}
      >
        <span>{row.label}</span>
        <span style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          {row.keys.map((k) => (
            <Kbd key={k}>{k}</Kbd>
          ))}
        </span>
      </div>
    ))}
  </div>
)

export const ControllerDockview = () => {
  const { dockviewApi, dndCompass, sendToDockview } = useDockview()
  const { activePanel, activeGroup, smartGuidesEnabled } = useDockviewActive()
  const { currentDesktop, sendToDesktop } = useDesktop()
  const { debug, showLogs, watermark, customGhost } = currentDesktop
  return (
    <>
      <Card title="Grid" icon="grid_view" defaultOpen>
        <GridActions />
      </Card>

      {dockviewApi && activePanel && (
        <Card title="Active Panel" icon="web_asset" defaultOpen>
          <PanelActions panels={[activePanel.id]} />
        </Card>
      )}

      {dockviewApi && activeGroup && (
        <Card title="Active Group" icon="space_dashboard" defaultOpen>
          <GroupActions groups={[activeGroup.id]} />
        </Card>
      )}

      <Card title="View" icon="visibility" defaultOpen>
        <Switch
          label="Debug overlay"
          icon="engineering"
          checked={debug}
          onChange={() => sendToDesktop({ type: "onToggleDebug" })}
        />
        <Switch
          label="Events log"
          icon="terminal"
          checked={showLogs}
          onChange={() => sendToDesktop({ type: "onToggleShowLogs" })}
        />
        <Switch
          label="Custom watermark"
          icon="branding_watermark"
          checked={watermark}
          onChange={() => sendToDesktop({ type: "onToggleWatermark" })}
        />
        <Switch
          label="Custom drag ghost"
          icon="drag_indicator"
          checked={customGhost}
          onChange={() => sendToDesktop({ type: "onToggleCustomGhost" })}
        />
        <Switch
          label="DnD compass"
          icon="explore"
          checked={dndCompass}
          onChange={() => sendToDockview({ type: "onToggleDndCompass" })}
        />
        <Switch
          label="Smart guides"
          icon="straighten"
          checked={smartGuidesEnabled}
          onChange={() => sendToDockview({ type: "onToggleSmartGuides" })}
        />
        {showLogs && (
          <div style={{ paddingTop: 6 }}>
            <Btn onClick={() => sendToDesktop({ type: "onClearLogLines" })} icon="undo">
              Clear log
            </Btn>
          </div>
        )}
      </Card>

      <Card title="Keyboard shortcuts" icon="keyboard">
        <KeyboardShortcuts />
      </Card>
    </>
  )
}
