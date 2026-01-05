import { useAppRoot } from "#json-tree/selectors/app.root.selector"
import { useSelector } from "@xstate/react"

export const useTreeManager = () => {
  const { appRootContext } = useAppRoot()
  const treeManagerRef = appRootContext?.treeManagerRef

  const treeManagerState: any = useSelector(treeManagerRef, (state) => state)
  const sendToTreeManager = treeManagerRef?.send
  const treeManagerContext = treeManagerState?.context

  const treeManagerId = treeManagerRef?.id

  const dataTreeManager = treeManagerContext?.data
  const lastActionTreeManager = treeManagerContext?.lastAction
  const extractInstructionTreeManager = treeManagerContext?.extractInstruction
  const attachInstructionTreeManager = treeManagerContext?.attachInstruction


  return {
    treeManagerId,
    treeManagerRef,
    sendToTreeManager,
    treeManagerState,
    treeManagerContext,

    dataTreeManager,
    lastActionTreeManager,

    extractInstructionTreeManager,
    attachInstructionTreeManager,
  }
}

export const useTreeItemManager = ({itemId}: any) => {
  const { appRootContext } = useAppRoot()
  const treeManagerRef = appRootContext?.treeManagerRef

  const treeManagerState: any = useSelector(treeManagerRef, (state) => state)
  const sendToTreeManager = treeManagerRef?.send
  const treeManagerContext = treeManagerState?.context

  const treeManagerId = treeManagerRef?.id

  const dataTreeManager = treeManagerContext?.data
  const lastActionTreeManager = treeManagerContext?.lastAction
  const extractInstructionTreeManager = treeManagerContext?.extractInstruction
  const attachInstructionTreeManager = treeManagerContext?.attachInstruction

  return {
    treeManagerId,
    treeManagerRef,
    sendToTreeManager,
    treeManagerState,
    treeManagerContext,

    dataTreeManager,
    lastActionTreeManager,

    extractInstructionTreeManager,
    attachInstructionTreeManager,
  }
}