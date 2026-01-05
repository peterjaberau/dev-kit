import { useAppRoot } from "#json-tree/selectors/app.root.selector"
import { useSelector } from "@xstate/react"

export const useTreeActor = ({ actorRef = null } = {}) => {
  const { appRootContext } = useAppRoot()
  const treeActorRef = actorRef ?? appRootContext?.treeActorRef

  const treeActorState: any = useSelector(treeActorRef, (state) => state)
  const sendToTreeActor = treeActorRef?.send
  const treeActorContext = treeActorState?.context

  const treeActorId = treeActorRef?.id

  const dataConfig = treeActorContext?.dataConfig
  const dataName = dataConfig?.name || "_TREE_ACTOR_ROOT_"
  const dataValue = dataConfig?.value

  const viewConfig = treeActorContext?.viewConfig


  // computed
  // const dataRuntime = treeActorContext?.dataRuntime
  // const dataRuntimeInfo = dataRuntime?.info
  //


  // const dataChildren = dataRuntimeInfo?.isArray ? dataValue : dataRuntimeInfo?.isObject ? dataValue?.children : []

  return {
    treeActorRef,
    treeActorId,
    sendToTreeActor,
    treeActorState,
    treeActorContext,

    dataConfig,
    dataName,
    dataValue,
    viewConfig
  }
}
