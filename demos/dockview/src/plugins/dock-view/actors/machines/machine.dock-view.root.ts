import { assign, createMachine, enqueueActions, setup, spawnChild } from "xstate"
import { dockViewAdapterMachine, DOCK_VIEW_ENUM } from "#plugin-dock-view"

export const dockViewRootMachine = createMachine({
  entry: [spawnChild(dockViewAdapterMachine, { id: DOCK_VIEW_ENUM.ADAPTER_ID, systemId: DOCK_VIEW_ENUM.ADAPTER_ID })],
})
