"use client"
import { useAppRoot } from "./app.root.selector"
import { useSelector } from "@xstate/react"
import { isLeaf, isArray, isObject } from "../utils"
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
  const isArrayNode = isArray(dataValue)
  const isObjectNode = isObject(dataValue)
  const isScalarNode = isLeaf(dataValue)

  const childNames = isArrayNode ? keys(childNodes).map(Number) : isObjectNode ? keys(childNodes) : dataValue

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

    //computed
    isArrayNode,
    isObjectNode,
    isScalarNode,
    childNames,
  }
}
