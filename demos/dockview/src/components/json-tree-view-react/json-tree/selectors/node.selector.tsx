"use client"
import { useAppRoot } from "./app.root.selector"
import { useSelector } from "@xstate/react"
import { keys } from "lodash"

export const useNode = ({ actorRef = null } = {}) => {
  const appRoot = useAppRoot()

  const nodeRef = actorRef ?? appRoot?.nodeRef

  const nodeId = nodeRef?.id
  const sendToNode = nodeRef?.send
  const nodeState: any = useSelector(nodeRef, (state) => state)
  const nodeContext = nodeState?.context

  const dataConfig = nodeContext?.dataConfig
  const dataValue = dataConfig.value

  const internal = {
    nodeLogic: nodeRef?.src,
  }

  const childNodes = nodeContext?.refs?.childNodes
  const parentNode = nodeContext?.refs?.parent

  // computed
  const dataRuntime = nodeContext?.dataRuntime
  const dataRuntimeInfo = dataRuntime?.info

  const childNames = dataRuntimeInfo?.isArray
    ? keys(childNodes).map(Number)
    : dataRuntimeInfo?.isObject
      ? keys(childNodes)
      : dataValue

  const getChildNode = (name: string | number) => {
    if (dataRuntimeInfo?.isArray || dataRuntimeInfo?.isObject) {
      return childNodes?.[name]
    }
    return null
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

  return {
    nodeRef,
    nodeId,
    sendToNode,
    nodeState,
    nodeContext,

    childNodes,
    parentNode,

    dataConfig,
    dataValue,

    internal,

    dataRuntime,
    dataRuntimeInfo,
    childNames,
    getChildNode,

    displayLabels,
  }
}
