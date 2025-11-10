import { useDock } from "./dock.selector"
import { usePluginDvController } from "#actors/model/selectors"
import { componentsSelector, executionSelector, configSelector } from "#actors/slices"
import { rootSelector } from "#actors/selector"


export const useDockDebugger = () => {
  const { dockState, dockContext, dockRef, sendToDock } = useDock()
  const {dvControllerPluginState, dvControllerPluginContext, dvControllerPluginRef} = usePluginDvController()

  const { componentsContext } = componentsSelector()
  const { configContext } = configSelector()
  const { executionContext } = executionSelector()

  const { root } = rootSelector()


  const dockDebugger = {
    root: root,
    builder: {
      componentsContext,
      configContext,
      executionContext
    },




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
