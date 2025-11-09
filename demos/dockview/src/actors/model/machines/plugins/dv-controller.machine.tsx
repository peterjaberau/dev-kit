import { assign, enqueueActions, setup } from "xstate"

const config = {
  items: [
    { label: "Add Panel", value: "add-panel" },
    { label: "Add Panel Tab", value: "add-panel-tab" },
    { label: "Add Nested Panel", value: "add-nested-panel" },
    { label: "Add Group", value: "add-group" },
    { label: "Split Vertically", value: "split-vertical" },
    { label: "Split Horizontally", value: "split-horizontal" },
    { label: "Panel Info", value: "panel-info" },
    { label: "Close Panel", value: "close-panel" },
    { label: "Maximize Panel", value: "maximize-panel" },
    { label: "Minimize Panel", value: "minimize-panel" },

  ],
  defaultValue: null
}

export const dvControllerMachine = setup({
  types: {} as any,
  actions: {
    load: assign(({ context, event }) => {
      context.items = config.items
      context.defaultValue = config.defaultValue
    }),
    setValue: assign(({ context, event }) => {
      const { value = null } = event.payload || {}
      context.value = value
    }),
    addPanel: assign(({ context, event }) => {}),
    addPanelTab: assign(({ context, event }) => {}),
    addNestedPanel: assign(({ context, event }) => {}),
    addGroup: assign(({ context, event }) => {}),
    splitHorizontally: assign(({ context, event }) => {}),
    splitVertically: assign(({ context, event }) => {}),
    getPanelInfo: assign(({ context, event }) => {}),
    closePanel: assign(({ context, event }) => {}),
    maximizePanel: assign(({ context, event }) => {}),
    minimizePanel: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "loading",
  context: ({ input }: any) => ({
    defaultValue: null,
    value: null,
    items: [],
    ...input,
  }),
  states: {
    loading: {
      on: {
        START_LOADING_REQUEST: {
          actions: enqueueActions(({ enqueue, context, check, event }) => {
            enqueue("load")
          }),
          target: "ready",
        },
      },
    },
    ready: {
      on: {
        VALUE_CHANGE: { actions: ["setValue"] },
        ADD_PANEL_REQUEST: { actions: ["addPanel"] },
        ADD_PANEL_TAB_REQUEST: { actions: ["addPanelTab"] },
        ADD_NESTED_PANEL_REQUEST: { actions: ["addNestedPanel"] },
        ADD_GROUP_REQUEST: { actions: ["addGroup"] },
        SPLIT_HORIZONTAL_REQUEST: { actions: ["splitHorizontally"] },
        SPLIT_VERTICAL_REQUEST: { actions: ["splitVertically"] },
        PANEL_INFO_REQUEST: { actions: ["getPanelInfo"] },
        CLOSE_PANEL_REQUEST: { actions: ["closePanel"] },
        MAXIMIZE_PANEL_REQUEST: { actions: ["maximizePanel"] },
        MINIMIZE_PANEL_REQUEST: { actions: ["minimizePanel"] },
      },
    },
  },
})
