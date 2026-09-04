"use client"
import { assign, enqueueActions, setup } from "xstate"
import { createActorContext, useSelector } from "@xstate/react"

export const playgroundMachine = setup({
  actions: {
    handleLogEvent: ({ event }) => {
      console.log({ type: event?.type })
    },

    handleSetController: assign(({ context, event }: any) => ({
      refs: {
        ...context.refs,
        controllerRef: event.controllerRef,
      },
      runtime: {
        ...context.runtime,
        variables: {
          ...context.runtime.variables,
          snapshot: event.controllerRef?.getLayout() ?? context.runtime.variables.snapshot,
        },
      },
    })),
    handleMount: assign({
      runtime: ({ context }: any) => ({
        ...context.runtime,
        variables: {
          ...context.runtime.variables,
          mounted: true,
        },
      }),
    }),
    handleNewTab: enqueueActions(({ context, event, enqueue }: any) => {
      const id = context.runtime.variables.id + 1
      const seq = context.runtime.variables.seq + 1
      const prefix = context.config.options.makeTabPrefix
      const tab = {
        id: `${prefix.id}-${id}`,
        data: { title: `${prefix.title} ${seq}` },
      }

      enqueue.assign({
        runtime: () => ({
          ...context.runtime,
          variables: {
            ...context.runtime.variables,
            id,
            seq,
          },
        }),
      })
      enqueue(() => event.panel?.appendTab(tab))
    }),

  },
  actors: {},
}).createMachine({
  id: "playground",
  initial: "idle",
  context: ({ input }: any) => {
    return {
      datasets: {
        themes: [
          {
            id: "default",
            label: "Default",
            style: {
              colorScheme: "dark",
              "--view-accent": "var(--site-workspace-accent)",
              "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
              "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
              "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
            },
          },
          {
            id: "light",
            label: "Light",
            style: {
              colorScheme: "light",
              "--view-bg": "#f4f6fb",
              "--view-fg": "#1f2937",
              "--view-panel-bg": "#ffffff",
              "--view-panel-border": "#d8dee8",
              "--view-tabbar-bg": "#edf1f7",
              "--view-tab-fg": "#667085",
              "--view-tab-active-bg": "#ffffff",
              "--view-tab-active-fg": "#111827",
              "--view-tab-hover-bg": "#e2e8f2",
              "--view-menu-bg": "#ffffff",
              "--view-action-hover-bg": "#e5ebf4",
              "--view-accent": "var(--site-workspace-accent)",
              "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
              "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
              "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
            },
          },
          {
            id: "dracula",
            label: "Dracula",
            style: {
              colorScheme: "dark",
              "--view-bg": "#191a21",
              "--view-fg": "#f8f8f2",
              "--view-panel-bg": "#282a36",
              "--view-panel-border": "#44475a",
              "--view-tabbar-bg": "#21222c",
              "--view-tab-fg": "#bdc0d6",
              "--view-tab-active-bg": "#343746",
              "--view-tab-active-fg": "#ffffff",
              "--view-tab-hover-bg": "#303241",
              "--view-menu-bg": "#282a36",
              "--view-action-hover-bg": "#3a3d4f",
              "--view-accent": "var(--site-workspace-accent)",
              "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
              "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
              "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
            },
          },
          {
            id: "replit",
            label: "Replit",
            style: {
              colorScheme: "dark",
              "--view-bg": "#0e1525",
              "--view-fg": "#f5f9fc",
              "--view-panel-bg": "#1c2333",
              "--view-panel-border": "#30394f",
              "--view-tabbar-bg": "#131b2c",
              "--view-tab-fg": "#a5adba",
              "--view-tab-active-bg": "#20283a",
              "--view-tab-active-fg": "#ffffff",
              "--view-tab-hover-bg": "#26314a",
              "--view-menu-bg": "#1c2333",
              "--view-action-hover-bg": "#2a344a",
              "--view-accent": "var(--site-workspace-accent)",
              "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
              "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
              "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
            },
          },
          {
            id: "abyss",
            label: "Abyss",
            style: {
              colorScheme: "dark",
              "--view-bg": "#000c18",
              "--view-fg": "#d7ecff",
              "--view-panel-bg": "#001b33",
              "--view-panel-border": "#123a58",
              "--view-tabbar-bg": "#001426",
              "--view-tab-fg": "#8db9d6",
              "--view-tab-active-bg": "#002440",
              "--view-tab-active-fg": "#f4fbff",
              "--view-tab-hover-bg": "#052b4a",
              "--view-menu-bg": "#02243f",
              "--view-action-hover-bg": "#0b3555",
              "--view-accent": "var(--site-workspace-accent)",
              "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
              "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
              "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
            },
          },
        ],
        ...input.datasets,
      },
      config: {
        layout: {
          type: "root",
          main: {
            type: "group",
            direction: "horizontal",
            children: [
              {
                type: "panel",
                id: "editor-a",
                size: 58,
                tabs: [
                  { id: "index-ts", data: { title: "index.ts" } },
                  { id: "router-ts", data: { title: "router.ts" } },
                ],
              },
              {
                type: "panel",
                id: "editor-b",
                size: 42,
                tabs: [
                  {
                    id: "field",
                    data: {
                      title: "Field",
                      inputs: {
                        componentId: "forms-field",
                      },
                    },
                  },
                ],
              },
            ],
          },
          edges: {
            left: {
              type: "edgePanel",
              id: "left-tools",
              size: 22,
              minSize: 14,
              maxSize: 34,
              tabs: [
                {
                  id: "registry",
                  data: { title: "Registry" },
                  closable: false,
                },
                {
                  id: "button",
                  data: {
                    title: "Button",
                    inputs: {
                      componentId: "components-button",
                    },
                  },
                },
              ],
            },
            right: {
              type: "edgePanel",
              id: "right-tools",
              size: 18,
              minSize: 12,
              maxSize: 28,
              tabs: [
                {
                  id: "popover",
                  data: {
                    title: "Popover",
                    inputs: {
                      componentId: "components-popover",
                    },
                  },
                },
              ],
            },
            bottom: {
              type: "edgePanel",
              id: "bottom-tools",
              size: 28,
              minSize: 18,
              maxSize: 42,
              tabs: [
                {
                  id: "checkbox",
                  data: {
                    title: "Checkbox",
                    inputs: {
                      componentId: "forms-checkbox",
                    },
                  },
                  closable: false,
                },
                {
                  id: "slider",
                  data: {
                    title: "Slider",
                    inputs: {
                      componentId: "forms-slider",
                    },
                  },
                },
              ],
            },
          },
        },
        global: {
          resizable: true,
          showActionsButton: true,
          showNewTabButton: true,
          resizeHandleHitSize: 24,
          minSize: 10,
        },
        options: {
          themeId: "light",
          makeTabPrefix: {
            id: "tab",
            title: "Tab",
          },
        },
        ...input.config,
      },
      refs: {
        controllerRef: null,
        ...input.refs,
      },
      runtime: {
        theme: {},
        variables: {
          id: 0,
          seq: 0,
          snapshot: null,
          mounted: false,
        },
      },
    }
  },
  entry: assign({
    runtime: ({ context }: any) => {
      return {
        ...context.runtime,
        theme: context.datasets.themes.find((t: any) => t.id === context.config.options.themeId)?.style,
      }
    },
  }),
  states: {
    idle: {
      on: {
        onSetController: { actions: ["handleSetController"] },
        onMount: { actions: ["handleMount"] },
        onNewTab: { actions: ["handleNewTab", "handleLogEvent"] },
        onChange: { actions: "handleLogEvent" },
        onActiveTabChange: { actions: "handleLogEvent" },
        onPanelSplit: { actions: "handleLogEvent" },
        onTabsMove: { actions: "handleLogEvent" },
        onTabsOpen: { actions: "handleLogEvent" },
        onTabsClose: { actions: "handleLogEvent" },
        onPanelsOpen: { actions: "handleLogEvent" },
        onPanelsClose: { actions: "handleLogEvent" },
      },
    },
  },
})

export const PlaygroundContext: any = createActorContext(playgroundMachine)

export const PlaygroundProvider = (props: any) => {
  const { children, ...rest } = props
  return (
    <PlaygroundContext.Provider
      options={{
        input: { ...rest },
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}

export function usePlayground() {
  const playgroundRef = PlaygroundContext.useActorRef()
  const sendToPlayground = playgroundRef.send

  const playgroundContext: any = useSelector(playgroundRef, (state: any) => state.context)
  const playgroundState = playgroundRef.getSnapshot()

  const playgroundId = playgroundRef?.id

  const datasets = playgroundContext?.datasets || {}
  const config = playgroundContext?.config || {}
  const refs = playgroundContext?.refs || {}
  const runtime = playgroundContext?.runtime || {}

  return {
    playgroundId,
    playgroundRef,
    sendToPlayground,
    playgroundState,
    playgroundContext,
    datasets,
    config,
    refs,
    runtime,
  }
}
