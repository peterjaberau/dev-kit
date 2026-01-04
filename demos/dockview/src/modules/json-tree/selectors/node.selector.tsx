"use client"
import { useAppRoot } from "./app.root.selector"
import { useSelector } from "@xstate/react"
import { keys } from "lodash"
import { machineConstants } from "../utils/constants"
export const useNode = ({ actorRef = null } = {}) => {
  const appRoot = useAppRoot()

  const nodeRef = actorRef ?? appRoot?.nodeRef

  const nodeId = nodeRef?.id
  const sendToNode = nodeRef?.send
  const nodeState: any = useSelector(nodeRef, (state) => state)
  const nodeContext = nodeState?.context

  const dataConfig = nodeContext?.dataConfig
  const dataName = dataConfig?.name || machineConstants.NODE_ROOT_NAME
  const dataValue = dataConfig.value


  const internal = {
    nodeLogic: nodeRef?.src,
  }




  // computed
  const dataRuntime = nodeContext?.dataRuntime
  const dataRuntimeInfo = dataRuntime?.info

  // parent node
  const parentNodeRef = nodeContext?.refs?.parent
  const parentNodeId = parentNodeRef?.id
  const parentState: any = useSelector(parentNodeRef, (state) => state)
  const parentContext = parentState?.context

  // child nodes
  const childNodes = nodeContext?.refs?.childNodes

  const childNames = dataRuntimeInfo?.isArray
    ? keys(childNodes).map(Number)
    : dataRuntimeInfo?.isObject
      ? keys(childNodes)
      : [dataValue]

  const getChildNode = (name: any) => {
    if (dataRuntimeInfo?.isArray || dataRuntimeInfo?.isObject) {
      return childNodes?.[name]
    }
    return null
  }

  const getChildNodeState: any = (name: any) => {
    const childNodeRef = getChildNode(name)
    if (childNodeRef) {
      return useSelector(childNodeRef, (state) => state)
    }
  }

  const getChildNodeMetadata = (name: any) => {
    const childNodeSelector = getChildNodeState(name)
    return childNodeSelector?.context?.metadata
  }

  const childrenLength = childNames?.length ?? 0

  const displayLabels =
    dataRuntimeInfo?.dataType === "object"
      ? // array type
        dataRuntimeInfo?.isArray
        ? {
            childrenCount: childrenLength,
            childrenCountLabel: childrenLength === 1 ? "1 item" : `${childrenLength} items`,
            dataTypeLabel: "array",
          }
        : {
            childrenCount: childrenLength,
            childrenCountLabel: childrenLength === 1 ? "1 key" : `${childrenLength} keys`,
            dataTypeLabel: "object",
          }
      : // scalar types
        {
          dataTypeLabel: dataRuntimeInfo?.dataType,
        }




  const viewConfig = nodeContext?.viewConfig
  const isOpen = viewConfig?.isOpen

  const metadata = {
    id: nodeId,
    name: dataName,
    data: {
      type: dataRuntimeInfo?.dataType,
      isBranch: dataRuntimeInfo?.isBranch,
      isScalar: dataRuntimeInfo?.isScalar,
      isOpen: isOpen,
      open: isOpen ? 'open' : 'closed',
      isRootNode: !parentNodeRef
    },
    sibling: [],
    children: childNames
  }


  return {
    nodeRef,
    nodeId,
    sendToNode,
    nodeState,
    nodeContext,

    // Parent
    parentNodeRef,
    parentNodeId,
    parentState,
    parentContext,

    childNodes,
    getChildNodeState,
    getChildNodeMetadata,

    dataConfig,
    dataValue,
    dataName,


    viewConfig,
    isOpen,

    internal,

    dataRuntime,
    dataRuntimeInfo,
    childNames,
    getChildNode,

    displayLabels,

    metadata
  }
}
