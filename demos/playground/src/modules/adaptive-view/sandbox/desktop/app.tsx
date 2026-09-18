import {
  DockviewReact,
  DockviewReadyEvent,
  IContextMenuItemComponentProps,
  GetTabContextMenuItemsParams,
  GetTabGroupChipContextMenuItemsParams,
  DEFAULT_TAB_GROUP_COLORS,
} from "#adaptive-view/react"

import "#adaptive-view/enterprise"
import { useDesktop } from "./selectors"
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
  TabModeMenuItemProps,
  TabOverflowMode,
  WatermarkRenderer as WatermarkComponent,
  GroupDragGhostRenderer as GroupDragGhost,
} from "../components"

const AdvaptiveViewDesktopContent = (props: DesktopRenderProps) => {
  const { sendToDesktop, dockviewApi, currentDesktop, isReady } = useDesktop()
  const {
    logLines,
    panels,
    groups,
    activePanel,
    activeGroup,
    watermark,
    customGhost,
    dndCompass,
    smartGuides,
    showLogs,
    debug,
  } = currentDesktop
  React.useEffect(() => {
    if (!dockviewApi) return

    const disposables = [
      dockviewApi.onDidAddPanel((event: any) => {
        sendToDesktop({
          type: "onDidAddPanel",
          params: {
            panelId: event.id,
          },
        })
      }),

      dockviewApi.onDidActivePanelChange((event: any) => {
        sendToDesktop({
          type: "onDidActivePanelChange",
          params: {
            panelId: event.panel?.id,
          },
        })
      }),
      dockviewApi.onDidRemovePanel((event: any) => {
        sendToDesktop({
          type: "onDidRemovePanel",
          params: {
            panelId: event.id,
          },
        })
      }),

      dockviewApi.onDidAddGroup((event: any) => {
        sendToDesktop({
          type: "onDidAddGroup",
          params: {
            groupId: event.id,
          },
        })
      }),
      dockviewApi.onDidMovePanel((event: any) => {
        sendToDesktop({
          type: "onDidMovePanel",
          params: {
            panelId: event.panel.id,
          },
        })
      }),

      dockviewApi.onDidMaximizedGroupChange((event: any) => {
        sendToDesktop({
          type: "onDidMaximizedGroupChange",
          params: {
            groupId: event.group.api.id,
            isMaximized: event.isMaximized,
          },
        })
      }),

      dockviewApi.onDidRemoveGroup((event: any) => {
        sendToDesktop({
          type: "onDidRemoveGroup",
          params: {
            groupId: event.id,
          },
        })
      }),

      dockviewApi.onDidActiveGroupChange((event: any) => {
        sendToDesktop({
          type: "onDidActiveGroupChange",
          params: {
            groupId: event?.id,
          },
        })
      }),
    ]

    return () => {
      disposables.forEach((disposable) => disposable.dispose())
    }
  }, [dockviewApi, sendToDesktop])

  const onReady = (event: DockviewReadyEvent) => {
    sendToDesktop({ type: "onReady", params: { api: event.api } })
  }

  const effectiveTheme = props.theme

  const getTabContextMenuItems = React.useCallback(
    ({ panel, group }: GetTabContextMenuItemsParams) => {
      const items: (
        | "close"
        | "closeOthers"
        | "closeAll"
        | "closeLeft"
        | "closeRight"
        | "maximize"
        | "separator"
        | "pin"
        | {
            component: React.FC<IContextMenuItemComponentProps>
            componentProps?: object
          }
        | { label: string; action: () => void }
      )[] = [
        // No 'pin' here: `pinnedTabs.enabled` makes the context menu
        // module inject Pin/Unpin at the top of the list already.
        "separator",
        "close",
        "closeOthers",
        "closeAll",
        "closeLeft",
        "closeRight",
        "separator",
        "maximize",
        "separator",
        // Switches `overflow.mode` between the single-row strip + chevron
        // dropdown and multi-row wrapping tabs.
        ...(["dropdown", "wrap"] as TabOverflowMode[]).map((mode) => ({
          component: TabModeMenuItem,
          componentProps: {
            mode,
            active: currentDesktop.overflow.mode === mode,
            onSelect: (mode: TabOverflowMode) => {
              sendToDesktop({ type: "onUpdateOverflow", params: { mode } })
            },
          } satisfies TabModeMenuItemProps,
        })),
        "separator",
        ...(group.api.location.type === "edge"
          ? // An edge group can't float or pop out, but it can switch
            // between a pinnable tool window and a static docked
            // panel, so that toggle takes the slot instead.
            [{ component: EdgeAutoHideMenuItem }]
          : // Float / popout are shown here as custom component items
            // (with icons); the `'float'` and `'popout'` built-in
            // shortcuts do the same thing without custom rendering.
            [{ component: FloatMenuItem }, { component: PopoutMenuItem }]),
      ]

      if (dockviewApi) {
        const groupId = group.id
        const panelId = panel.id
        const tabGroup = dockviewApi.getTabGroupForPanel({ groupId, panelId })
        const allTabGroups = dockviewApi.getTabGroups({ groupId })
        const otherTabGroups = allTabGroups.filter((tg: any) => tg.id !== tabGroup?.id)

        items.push("separator")

        if (tabGroup) {
          items.push({
            label: `Remove from "${tabGroup.label || tabGroup.id}"`,
            action: () => dockviewApi.removePanelFromTabGroup({ groupId, panelId }),
          })
        }

        for (const tg of otherTabGroups) {
          items.push({
            label: `Add to "${tg.label || tg.id}"`,
            action: () =>
              dockviewApi.addPanelToTabGroup({
                groupId,
                tabGroupId: tg.id,
                panelId,
              }),
          })
        }

        items.push({
          label: "Add to new group",
          action: () => {
            const label = window.prompt("Group name:") || ""
            const colors: any = DEFAULT_TAB_GROUP_COLORS
            const color = colors[Math.floor(Math.random() * colors.length)].id
            const newGroup = dockviewApi.createTabGroup({
              groupId,
              label,
              color,
            })
            dockviewApi.addPanelToTabGroup({
              groupId,
              tabGroupId: newGroup.id,
              panelId,
            })
          },
        })
      }

      return items
    },
    [currentDesktop.overflow.mode, dockviewApi, sendToDesktop],
  )

  const getTabGroupChipContextMenuItems = React.useCallback(
    ({ group, tabGroup }: GetTabGroupChipContextMenuItemsParams) => {
      const items: (
        | "colorPicker"
        | "rename"
        | "collapse"
        | "close"
        | "separator"
        | { label: string; action: () => void }
      )[] = ["rename", "colorPicker", "collapse", "close"]

      if (dockviewApi) {
        // Float / popout operate on the whole containing group, so they
        // stay custom items. The built-in chip shortcuts are scoped to
        // the tab group (`'collapse'` / `'close'`, used above).
        items.push(
          "separator",
          {
            label: "Float group",
            action: () => dockviewApi.addFloatingGroup(group),
          },
          {
            label: "Popout group",
            action: () => {
              void dockviewApi.addPopoutGroup(group)
            },
          },
          "separator",
          {
            label: "Dissolve group",
            action: () =>
              dockviewApi.dissolveTabGroup({
                groupId: group.id,
                tabGroupId: tabGroup.id,
              }),
          },
        )
      }

      return items
    },
    [dockviewApi],
  )

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
            smartGuides={smartGuides ? { snapDistance: 8 } : undefined}
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
        {props.renderController?.({
          api: dockviewApi,
          panels,
          groups,
          activePanel,
          activeGroup,
          hasCustomWatermark: watermark,
          toggleCustomWatermark: () => sendToDesktop({ type: "onToggleWatermark" }),
          hasCustomGhost: customGhost,
          toggleCustomGhost: () => sendToDesktop({ type: "onToggleCustomGhost" }),
          dndCompass,
          onToggleDndCompass: () => sendToDesktop({ type: "onToggleDndCompass" }),
          smartGuides,
          onToggleSmartGuides: () => sendToDesktop({ type: "onToggleSmartGuides" }),
          debug,
          onToggleDebug: () => sendToDesktop({ type: "onToggleDebug" }),
          showLogs,
          onToggleShowLogs: () => sendToDesktop({ type: "onToggleShowLogs" }),
          onClearLogs: () => {
            sendToDesktop({
              type: "onClearLogLines",
            })
          },
        })}
      </div>
    </div>
  )
}

const AdvaptiveViewDesktop = () => <Desktop>{(props) => <AdvaptiveViewDesktopContent {...props} />}</Desktop>

export default AdvaptiveViewDesktop
