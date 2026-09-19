import { DockviewReact, DockviewReadyEvent } from "#adaptive-view/react"

import "#adaptive-view/enterprise"
import { useDesktop, useDockviewMenus } from "./selectors"
import { DESKTOP_DOCKVIEW_COMPONENTS } from "./panels/registry"
import * as React from "react"
import Desktop, { type DesktopRenderProps } from "./desktop"

import {
  LeftControls,
  PrefixHeaderControls,
  RightControls,
  TabRenderer,
  FloatMenuItemRenderer as FloatMenuItem,
  TabModeMenuItemRenderer as TabModeMenuItem,
  EdgeAutoHideMenuItemRenderer as EdgeAutoHideMenuItem,
  PopoutMenuItemRenderer as PopoutMenuItem,
  WatermarkRenderer as WatermarkComponent,
  GroupDragGhostRenderer as GroupDragGhost,
} from "../components"

const MENU_BINDINGS = {
  renderers: {
    overflow: TabModeMenuItem,
    float: FloatMenuItem,
    popout: PopoutMenuItem,
    edgeAutoHide: EdgeAutoHideMenuItem,
  },
  prompt: (message: string) => window.prompt(message),
}

const SMART_GUIDES_OPTIONS = { snapDistance: 8 }

const AdvaptiveViewDesktopContent = (props: DesktopRenderProps) => {
  const { sendToDesktop, currentDesktop, isReady } = useDesktop()
  const { logLines, watermark, customGhost, dndCompass, showLogs } = currentDesktop
  const { getTabContextMenuItems, getTabGroupChipContextMenuItems } = useDockviewMenus(MENU_BINDINGS)

  const onReady = (event: DockviewReadyEvent) => {
    sendToDesktop({ type: "onReady", params: { api: event.api } })
  }

  const effectiveTheme = props.theme

  return (
    <div
      className={["desktop-workspace", effectiveTheme.colorScheme === "light" && "desktop-workspace--light"]
        .filter(Boolean)
        .join(" ")}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: effectiveTheme.colorScheme === "light" ? "rgba(0,0,0,0.03)" : "rgba(0,0,50,0.25)",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          height: 0,
          display: "flex",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            overflow: "hidden",
            display: "flex",
            visibility: isReady ? "visible" : "hidden",
          }}
        >
          <DockviewReact
            components={DESKTOP_DOCKVIEW_COMPONENTS}
            defaultTabComponent={TabRenderer}
            rightHeaderActionsComponent={RightControls}
            leftHeaderActionsComponent={LeftControls}
            prefixHeaderActionsComponent={PrefixHeaderControls}
            watermarkComponent={watermark ? WatermarkComponent : undefined}
            groupDragGhostComponent={customGhost ? GroupDragGhost : undefined}
            onReady={onReady}
            keyboardNavigation
            theme={effectiveTheme}
            autoHideEdgeGroups
            dockToEdgeGroups
            pinnedTabs={{ enabled: true }}
            overflow={currentDesktop.overflow}
            floatingGroupDragHandle="titlebar"
            dndCompass={dndCompass}
            smartGuides={SMART_GUIDES_OPTIONS}
            getTabContextMenuItems={getTabContextMenuItems}
            getTabGroupChipContextMenuItems={getTabGroupChipContextMenuItems}
          />
        </div>

        {showLogs && (
          <div
            style={{
              width: "400px",
              backgroundColor: effectiveTheme.colorScheme === "light" ? "#f6f8fa" : "black",
              color: effectiveTheme.colorScheme === "light" ? "#1f2328" : "white",
              overflow: "hidden",
              fontFamily: "monospace",
              marginLeft: "10px",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flexGrow: 1, overflow: "auto" }}>
              {logLines.map((line: any, i: any) => {
                return (
                  <div
                    style={{
                      height: "30px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: line.backgroundColor,
                    }}
                    key={i}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: "20px",
                        maxWidth: "20px",
                        color: "gray",
                        borderRight: "1px solid gray",
                        marginRight: "4px",
                        paddingLeft: "4px",
                        height: "100%",
                      }}
                    >
                      {logLines.length - i}
                    </span>
                    <span>
                      {line.timestamp && (
                        <span
                          style={{
                            fontSize: "0.7em",
                            padding: "0px 2px",
                          }}
                        >
                          {line.timestamp.toISOString().substring(11, 23)}
                        </span>
                      )}
                      <span>{line.text}</span>
                    </span>
                  </div>
                )
              })}
            </div>
            <div
              style={{
                padding: "4px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => {
                  sendToDesktop({
                    type: "onClearLogLines",
                  })
                }}
              >
                Clear
              </button>
            </div>
          </div>
        )}
        {props.renderController?.()}
      </div>
    </div>
  )
}

const AdvaptiveViewDesktop = () => <Desktop>{(props) => <AdvaptiveViewDesktopContent {...props} />}</Desktop>

export default AdvaptiveViewDesktop
