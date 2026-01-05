import { setup } from "xstate"

import { attachInstruction, extractInstruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"

export const treeManagerMachine = setup({
  actions: {},
  actors: {},
  guards: {},
}).createMachine({
  context: ({ input }: any) => ({
    data: input.data,
    execution: {
      lastState: input.data,
      targets: [],
      childrenOfItem: []
    },
    lastAction: null,
    extractInstruction: extractInstruction,
    attachInstruction: attachInstruction,
  }),
})


