import { assign, setup } from "xstate"

const config = {
  scope: {
    collection: {
      id: "ROOT",
      name: "",
      children: [
        {
          id: "panels",
          name: "Panels",
          children: [
            { id: "ai-chat", name: "AI Chat" },
            { id: "code", name: "Code" },
            { id: "default", name: "Default", disabled: true },
            { id: "empty", name: "empty" },
            { id: "json-viewer", name: "Json Viewer" },
            { id: "placeholder", name: "Placeholder" },
            { id: "renderer", name: "Renderer" },
            { id: "json-viewer-custom", name: "Json Viewer Custom" },
            {
              id: "src",
              name: "src",
              children: [
                { id: "src/app.tsx", name: "app.tsx" },
                { id: "src/index.ts", name: "index.ts" },
              ],
            },
          ],
        },
      ],
    },
    selectedValue: [],
  },
  scoped: {
    targetPanel: null
  },
}


export const dynamicPanelLabMachine = setup({
  types: {} as any,
  actions: {
    handleSelectScope: assign(({ context, event }) => {}),
    handleSelectionChange: assign(({ context, event }) => {
      const { selectedValue } = event.payload;
      context.scope.selectedValue = selectedValue;
      context.scoped.targetPanel = selectedValue[0] || null;
    }),

  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "scope",
  context: ({ input }: any) => ({
    ...config,
    ...input,
  }),
  states: {
    scope: {
      on: {
        SELECT_SCOPE: {
          actions: ["handleSelectScope"],
          target: "scoped",
        },
        EXPANDED_CHANGE: {
          actions: ["handleSelectScope"],
        },
        SELECTION_CHANGE: {
          actions: ["handleSelectionChange"],
          target: "scoped",
        },


      },
    },
    scoped: {
      on: {
        BACK_TO_SCOPE: {
          target: "scope",
        }
      }
    },
  },
})
