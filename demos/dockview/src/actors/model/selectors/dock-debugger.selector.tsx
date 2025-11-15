import { useDock } from "./dock.selector"
import { usePluginDvController } from "#actors/model/selectors"
import { componentsSelector, executionSelector, configSelector } from "#actors/slices"
import { rootSelector } from "#actors/selector"
import { useRootActors } from "#actors/model/hooks/root-actors"
import {
  useApp,
  useSession,
  useCurrentAppExample,
  useNodeManager
} from "#actors/model/selectors"

export const useDockDebugger = () => {
  const { appRef } = useApp()
  const { sessionRef } = useSession()
  const { currentAppExampleRef } = useCurrentAppExample()
  const { nodeManagerRef, nodeManagerContext } = useNodeManager()

  // const { nodeManagerState, nodeManagerContext, nodeManagerRef } = useNodeManager( )



  const { dockState, dockContext, dockRef, sendToDock } = useDock()
  const {dvControllerPluginState, dvControllerPluginContext, dvControllerPluginRef} = usePluginDvController()

  const { componentsContext } = componentsSelector()
  const { configContext } = configSelector()
  const { executionContext } = executionSelector()

  const { root } = rootSelector()


  const dockDebugger = {
    app: appRef.getPersistedSnapshot(),
    session: sessionRef.getPersistedSnapshot(),
    currentAppExample: currentAppExampleRef.getSnapshot().toJSON(),
    nodeManager: nodeManagerRef.getSnapshot().toJSON(),
    dock: dockRef.getSnapshot().toJSON(),
    ...root.builder,
  }

  return {


    dockDebugger,

  }
}
