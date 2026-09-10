"use client"

import { enqueueActions, setup } from "xstate"
import { localStorageMachine } from "./localStorageMachine"

export const LOCAL_STORE_ID = "local-store"


export const storeManagerMachine = setup({
  actors: {
    localStorageMachine,
  },
  actions: {
    spawnLocalStore: enqueueActions(({ context, enqueue }) => {
      enqueue.spawnChild("localStorageMachine", {
        id: LOCAL_STORE_ID,
        systemId: LOCAL_STORE_ID,
        input: { data: context.data },
      })
    }),
  },
}).createMachine({
  id: "store-manager",
  initial: "initiating",
  context: ({ input }: any) => ({
    data: input.data,
    desktop: {
      panels: [],
      groups: [],
      layoutReady: false,
      activePanel: null,
      activeGroup: null,
    },
  }),
  states: {
    initiating: {
      entry: "spawnLocalStore",
      always: "ready",
    },
    ready: {},
  },
})
