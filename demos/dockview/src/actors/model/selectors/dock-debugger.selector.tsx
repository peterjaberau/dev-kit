import { useDock } from "./dock.selector"
import { usePluginDvController } from "#actors/model/selectors"


export const useDockDebugger = () => {
  const { dockState, dockContext, dockRef, sendToDock } = useDock()
  const {dvControllerPluginState, dvControllerPluginContext, dvControllerPluginRef} = usePluginDvController()


  const dockDebugger = {
    dock: {
      state: dockState.toJSON(),
      snapshot: dockRef.getSnapshot().toJSON(),
      stateValue: dockState.value,
      status: dockState.status,
      context: dockContext,
    },
    dvController: {
      state: dvControllerPluginState.toJSON(),
      snapshot: dvControllerPluginRef.getSnapshot().toJSON(),
      stateValue: dvControllerPluginState.value,
      status: dvControllerPluginState.status,
      context: dvControllerPluginContext,
    }
  }

  return {
    dockDebugger

  }
}
