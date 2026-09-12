import {
  DockviewDefaultTab,
  DockviewReact,
  DockviewReadyEvent,
  IDockviewGroupDragGhostProps,
  IDockviewPanelHeaderProps,
  IDockviewPanelProps,
  DockviewApi,
  DockviewTheme,
  themeAbyss,
  IContextMenuItemComponentProps,
  GetTabContextMenuItemsParams,
  GetTabGroupChipContextMenuItemsParams,
  DEFAULT_TAB_GROUP_COLORS,
} from "#adaptive-view/react"
import "#adaptive-view/enterprise"
import { DebugContext, ApiContext, ThemeContext } from "./providers"
import { useDesktop } from "./selectors"
import { DESKTOP_DOCKVIEW_COMPONENTS, DEFAULT_DOCKVIEW_COMPONENT } from "./panels/registry"
import * as React from "react"
import { setupEdgeGroups } from "../sandbox-manager/defaultLayout"
import { loadDockviewLayout } from "../sandbox-manager/utils"
import { useSandboxManagerSelector } from "../sandbox-manager/provider"
import SandboxRenderer, { type SandboxManagerRenderProps } from "../sandbox-manager/sandbox-renderer"
import { instanceProfiles, layoutProfiles } from "./config"
import { LeftControls, PrefixHeaderControls, RightControls } from "../components/headerActions"
import {
  SandboxColorsContext,
  SANDBOX_DARK_COLORS,
  SANDBOX_LIGHT_COLORS,
  useSandboxColors,
} from "../sandbox-manager/sandboxTheme"
import { RegistryViewer } from "#plugins/registry-manager-plugin/view"
import { InstanceRenderer } from "../instance-manager/instance-renderer"
import { useSandboxInstance } from "../instance-manager/selectors"
import { useLayoutManager } from "../layout-manager/selectors"
import { Box, Text } from "@chakra-ui/react"
import { ViewInstanceRenderer } from "../sandbox-manager/views"
import { AdaptiveDebuggerRoot } from "../../../adaptive-debugger/components/root"
import { useLocalStore } from "../store-manager/selectors"
import {
  TabRenderer,
  tabComponents,
  FloatMenuItemRenderer as FloatMenuItem,
  TabModeMenuItemRenderer as TabModeMenuItem,
  EdgeAutoHideMenuItemRenderer as EdgeAutoHideMenuItem,
  PopoutMenuItemRenderer as PopoutMenuItem,
  TabModeMenuItemProps,
  TabOverflowMode,
  WatermarkRenderer as WatermarkComponent,
  GroupDragGhostRenderer as GroupDragGhost,
} from "#adaptive-view/app/components"
import { useDockViewAdapter } from "#adaptive-view/app/actors/selectors"

const colors = [
  "rgba(255,0,0,0.2)",
  "rgba(0,255,0,0.2)",
  "rgba(0,0,255,0.2)",
  "rgba(255,255,0,0.2)",
  "rgba(0,255,255,0.2)",
  "rgba(255,0,255,0.2)",
]
let count = 0

export interface AdvaptiveViewDesktopProp {
  initialTheme?: DockviewTheme
}

const AdvaptiveViewDesktopContent = (props: SandboxManagerRenderProps) => {
  const { sendToDesktop, dockviewApi, currentDesktop } = useDesktop()
  const { logLines, panels, groups, layoutReady, activePanel, activeGroup } = currentDesktop

  const { sendToDockViewAdapter } = useDockViewAdapter()

  const { sentToLayoutManager } = useLayoutManager()
  const registeredLayoutProfiles = useSandboxManagerSelector((snapshot) => snapshot.context.layoutProfiles)
  const selectedLayoutProfileId = useSandboxManagerSelector((snapshot) => snapshot.context.selectedLayoutProfileId)
  const layoutRevision = useSandboxManagerSelector((snapshot) => snapshot.context.layoutRevision)
  const profilesRegistered = registeredLayoutProfiles === layoutProfiles
  const { value: selectedLayoutData, save: saveSelectedLayoutData } = useLocalStore<unknown>("sandbox.layout")

  React.useEffect(() => {
    if (!profilesRegistered || !selectedLayoutProfileId) {
      return
    }

    const profileData = registeredLayoutProfiles.find((profile) => profile.id === selectedLayoutProfileId)?.data
    if (profileData !== undefined) {
      saveSelectedLayoutData(profileData)
    }
  }, [profilesRegistered, registeredLayoutProfiles, saveSelectedLayoutData, selectedLayoutProfileId])

  /**
   * Listen to events emitted by the current Dockview API.
   *
   * This component does NOT update panels/groups/logs directly anymore.
   *
   * Dockview emits events -> we send domain events -> desktopMachine
   * updates its context.
   */

  React.useEffect(() => {
    if (!dockviewApi) return

    sendToDesktop({
      type: "onResetTrackedState",
    })

    const disposables = [
      dockviewApi.onDidAddPanel((event: any) => {
        sendToDesktop({
          type: "onPanelAdded",
          params: {
            panelId: event.id,
          },
        })
        // setPanels((_) => [..._, event.id])
        // addLogLine(`Panel Added ${event.id}`)
      }),

      dockviewApi.onDidActivePanelChange((event: any) => {
        sendToDesktop({
          type: "onPanelActivated",
          params: {
            panelId: event.panel?.id,
          },
        })
        // setActivePanel(event.panel?.id)
        // addLogLine(`Panel Activated ${event.panel?.id}`)
      }),
      dockviewApi.onDidRemovePanel((event: any) => {
        sendToDesktop({
          type: "onPanelRemoved",
          params: {
            panelId: event.id,
          },
        })
        // setPanels((_) => {
        //   const next = [..._]
        //   next.splice(
        //     next.findIndex((x) => x === event.id),
        //     1,
        //   )
        //
        //   return next
        // })
        // addLogLine(`Panel Removed ${event.id}`)
      }),

      dockviewApi.onDidAddGroup((event: any) => {
        sendToDesktop({
          type: "onGroupAdded",
          params: {
            groupId: event.id,
          },
        })
        // setGroups((_) => [..._, event.id])
        // addLogLine(`Group Added ${event.id}`)
      }),

      dockviewApi.onDidMovePanel((event: any) => {
        sendToDesktop({
          type: "onPanelMoved",
          params: {
            panelId: event.panel.id,
          },
        })

        // addLogLine(`Panel Moved ${event.panel.id}`)
      }),

      dockviewApi.onDidMaximizedGroupChange((event: any) => {
        sendToDesktop({
          type: "onGroupMaximizedChanged",
          params: {
            groupId: event.group.api.id,
            isMaximized: event.isMaximized,
          },
        })
        // addLogLine(`Group Maximized Changed ${event.group.api.id} [${event.isMaximized}]`)
      }),

      dockviewApi.onDidRemoveGroup((event: any) => {
        sendToDesktop({
          type: "onGroupRemoved",
          params: {
            groupId: event.id,
          },
        })

        // setGroups((_) => {
        //   const next = [..._]
        //   next.splice(
        //     next.findIndex((x) => x === event.id),
        //     1,
        //   )
        //
        //   return next
        // })
        // addLogLine(`Group Removed ${event.id}`)
      }),

      dockviewApi.onDidActiveGroupChange((event: any) => {
        sendToDesktop({
          type: "onGroupActivated",
          params: {
            groupId: event?.id,
          },
        })

        // setActiveGroup(event?.id)
        // addLogLine(`Group Activated ${event?.id}`)
      }),
    ]

    return () => {
      disposables.forEach((disposable) => disposable.dispose())
    }
  }, [dockviewApi])

  React.useEffect(() => {
    if (!dockviewApi || !profilesRegistered) {
      return
    }

    const hasStoredLayout =
      selectedLayoutData !== undefined &&
      selectedLayoutData !== null &&
      (typeof selectedLayoutData !== "object" || Object.keys(selectedLayoutData as object).length > 0)

    if (!hasStoredLayout) {
      loadDockviewLayout(dockviewApi)
    } else {
      loadDockviewLayout(dockviewApi, selectedLayoutData)
    }

    /**
     * Previously:
     *
     * setLayoutReady(true)
     *
     * Now the machine owns this state.
     */
    sendToDesktop({
      type: "onLayoutReady",
    })
    //       setLayoutReady(true)
  }, [dockviewApi, layoutRevision, profilesRegistered, selectedLayoutData, sendToDesktop])

  /**
   * Dockview creates the API here.
   *
   * We don't call setApi anymore.
   * desktopMachine receives the API and stores it in context.dockviewApi.
   */
  const onReady = (event: DockviewReadyEvent) => {
    setupEdgeGroups(event.api)
    sentToLayoutManager({ type: "ON_READY", api: event.api })
    // setApi(event.api)

    sendToDockViewAdapter({ type: "onReady", api: event.api })

    sendToDesktop({ type: "onReady", params: { api: event.api } })
  }

  // Signal the host once the layout is loaded and the dock becomes visible,
  // so a loading overlay can fade out at the right moment rather than while
  // the grid is still hidden.
  const hasSignalledReady = React.useRef(false)

  React.useEffect(() => {
    if (layoutReady && !hasSignalledReady.current) {
      hasSignalledReady.current = true
      props.onReady?.()
    }
  }, [layoutReady, props])

  const effectiveTheme = props.theme ?? themeAbyss

  const sandboxColors = React.useMemo(
    () => (effectiveTheme.colorScheme === "light" ? SANDBOX_LIGHT_COLORS : SANDBOX_DARK_COLORS),
    [effectiveTheme],
  )

  // Briefly enable colour transitions when the light/dark scheme flips, so the
  // dock crossfades between modes instead of hard-cutting. Scoped to the
  // switch moment (a temporary class) so it never interferes with dragging,
  // resizing or tab changes, and skipped under reduced-motion.
  const [themeAnimating, setThemeAnimating] = React.useState(false)
  const prevScheme = React.useRef(effectiveTheme.colorScheme)
  React.useEffect(() => {
    if (prevScheme.current === effectiveTheme.colorScheme) {
      return
    }
    prevScheme.current = effectiveTheme.colorScheme
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return
    }
    setThemeAnimating(true)
    const handle = window.setTimeout(() => setThemeAnimating(false), 350)
    return () => window.clearTimeout(handle)
  }, [effectiveTheme.colorScheme])

  const [tabOverflowMode, setTabOverflowMode] = React.useState<TabOverflowMode>("dropdown")

  // `'wrap'` needs the MultiRowTabsModule, which the `dockview-enterprise`
  // import above registers. Memoized so the prop only reaches `updateOptions`
  // when the mode actually changes.
  const overflow = React.useMemo(() => ({ mode: tabOverflowMode, mru: false, search: true }), [tabOverflowMode])

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
            active: tabOverflowMode === mode,
            onSelect: setTabOverflowMode,
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
    [dockviewApi, tabOverflowMode],
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

  const [watermark, setWatermark] = React.useState<boolean>(false)
  const [customGhost, setCustomGhost] = React.useState<boolean>(false)
  const [dndCompass, setDndCompass] = React.useState<boolean>(false)
  const [smartGuides, setSmartGuides] = React.useState<boolean>(true)

  const [gapCheck, setGapCheck] = React.useState<boolean>(false)

  const css = React.useMemo(() => {
    if (!gapCheck) {
      return {}
    }

    return {
      "--dv-group-gap-size": "0.5rem",
      "--demo-border": "5px dashed purple",
    } as React.CSSProperties
  }, [gapCheck])

  const [showLogs, setShowLogs] = React.useState<boolean>(false)
  const [debug, setDebug] = React.useState<boolean>(false)
  return (
    <div
      className={`sandbox${
        effectiveTheme.colorScheme === "light" ? "sandbox--light" : ""
      }${themeAnimating ? "dv-theme-animating" : ""}`}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: effectiveTheme.colorScheme === "light" ? "rgba(0,0,0,0.03)" : "rgba(0,0,50,0.25)",
        borderRadius: "8px",
        position: "relative",
        ...css,
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
            visibility: layoutReady ? "visible" : "hidden",
          }}
        >
          <SandboxColorsContext.Provider value={sandboxColors}>
            <ApiContext.Provider value={dockviewApi}>
              <DebugContext.Provider value={debug}>
                <ThemeContext.Provider value={effectiveTheme}>
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
                    overflow={overflow}
                    floatingGroupDragHandle="titlebar"
                    dndCompass={dndCompass}
                    smartGuides={smartGuides ? { snapDistance: 8 } : undefined}
                    getTabContextMenuItems={getTabContextMenuItems}
                    getTabGroupChipContextMenuItems={getTabGroupChipContextMenuItems}
                  />
                </ThemeContext.Provider>
              </DebugContext.Provider>
            </ApiContext.Provider>
          </SandboxColorsContext.Provider>
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
        {props.renderControls?.({
          api: dockviewApi,
          panels,
          groups,
          activePanel,
          activeGroup,
          hasCustomWatermark: watermark,
          toggleCustomWatermark: () => setWatermark(!watermark),
          hasCustomGhost: customGhost,
          toggleCustomGhost: () => setCustomGhost(!customGhost),
          dndCompass,
          onToggleDndCompass: () => setDndCompass(!dndCompass),
          smartGuides,
          onToggleSmartGuides: () => setSmartGuides(!smartGuides),
          debug,
          onToggleDebug: () => setDebug(!debug),
          showLogs,
          onToggleShowLogs: () => setShowLogs(!showLogs),
          onClearLogs: () => {
            sendToDesktop({
              type: "onClearLogLines",
            })
          },
        })}
      </div>
      <AdaptiveDebuggerRoot />
    </div>
  )
}

const AdvaptiveViewDesktop = ({ initialTheme }: AdvaptiveViewDesktopProp) => (
  <SandboxRenderer
    initialTheme={initialTheme}
    layoutProfiles={layoutProfiles}
    instanceManagerInput={instanceProfiles[0]}
  >
    {(props) => <AdvaptiveViewDesktopContent {...props} />}
  </SandboxRenderer>
)

export default AdvaptiveViewDesktop
