import {
  DEFAULT_TAB_GROUP_COLORS,
  DockviewDefaultTab,
  GetTabContextMenuItemsParams,
  IContextMenuItemComponentProps,
  IDockviewPanelHeaderProps,
} from "#adaptive-view/react"
import * as React from "react"

export type TabOverflowMode = "dropdown" | "wrap"

export interface TabModeMenuItemProps {
  mode: TabOverflowMode
  active: boolean
  onSelect: (mode: TabOverflowMode) => void
}

const TAB_MODE_LABELS: Record<TabOverflowMode, string> = {
  dropdown: "Overflow dropdown",
  wrap: "Wrap onto rows",
}

export const FloatMenuItemRenderer = ({ panel, api, close }: IContextMenuItemComponentProps) => {
  return (
    <div
      className="dv-context-menu-item"
      onClick={() => {
        api.addFloatingGroup(panel)
        close()
      }}
      style={{ display: "flex", alignItems: "center", gap: "6px" }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
        ad_group
      </span>
      Float tab
    </div>
  )
}

export const PopoutMenuItemRenderer = ({ panel, api, close }: IContextMenuItemComponentProps) => {
  return (
    <div
      className="dv-context-menu-item"
      onClick={() => {
        api.addPopoutGroup(panel)
        close()
      }}
      style={{ display: "flex", alignItems: "center", gap: "6px" }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
        open_in_new
      </span>
      Popout tab
    </div>
  )
}

/**
 * Radio-style item for `overflow.mode`. `updateOptions` re-applies wrap to every
 * group, so the two modes can be swapped while the dock is live; the tick marks
 * whichever is currently active.
 */
export const TabModeMenuItemRenderer = ({ close, componentProps }: IContextMenuItemComponentProps) => {
  const { mode, active, onSelect } = componentProps as TabModeMenuItemProps

  return (
    <div
      className="dv-context-menu-item"
      onClick={() => {
        onSelect(mode)
        close()
      }}
      style={{ display: "flex", alignItems: "center", gap: "12px" }}
    >
      {TAB_MODE_LABELS[mode]}
      {/* Kept mounted (not conditionally rendered) so the reserved space
                stops the menu width changing as the tick moves between modes. */}
      <span
        className="material-symbols-outlined"
        style={{
          fontSize: "14px",
          marginLeft: "auto",
          visibility: active ? "visible" : "hidden",
        }}
      >
        check
      </span>
    </div>
  )
}

/**
 * Checkable toggle for an edge group's auto-hide mode. `setAutoHide` writes a
 * per-group override of the global `autoHideEdgeGroups` option and the auto-hide
 * controller reconciles the group's chrome live, so a single edge can be flipped
 * between a pinnable tool window and a static docked panel while the dock runs.
 *
 * One toggling item rather than an on/off pair: every edge group here starts
 * auto-hiding, so in a pair the ticked row is the one you'd reach for first and
 * clicking it would do nothing.
 */
export const EdgeAutoHideMenuItemRenderer = ({ group, close }: IContextMenuItemComponentProps) => {
  const autoHide = group.api.isAutoHide()

  return (
    <div
      className="dv-context-menu-item"
      onClick={() => {
        group.api.setAutoHide(!autoHide)
        if (autoHide) {
          // Turning it off: nothing expands a collapsed edge group
          // once auto-hide is gone (the strip's click-to-peek goes
          // with it and the sash is locked at the collapsed size), so
          // open it here rather than leave a dead strip.
          group.api.expand()
        }
        close()
      }}
      style={{ display: "flex", alignItems: "center", gap: "12px" }}
    >
      Auto-hide edge
      {/* Kept mounted (not conditionally rendered) so the reserved space
                stops the menu width changing as the tick comes and goes. */}
      <span
        className="material-symbols-outlined"
        style={{
          fontSize: "14px",
          marginLeft: "auto",
          visibility: autoHide ? "visible" : "hidden",
        }}
      >
        check
      </span>
    </div>
  )
}
