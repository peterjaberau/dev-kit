"use client"
import { createActorContext, useSelector } from "@xstate/react"
import { assign, enqueueActions, setup } from "xstate"
import { useMenu } from './use-menu'
import { useMemo } from "react"



export function useMenuManager() {
  const { menuManagerRef } = useMenu()

  const sendToMenuManager = menuManagerRef.send
  const menuManagerState: any = useSelector(menuManagerRef, (state) => state)
  const menuManagerContext = menuManagerState.context

  const menuManagerId = menuManagerRef?.id

  /** Data Tree **/
  const data = menuManagerContext?.data
  const dataReferences = menuManagerContext?.dataReferences
  const dataRef = menuManagerContext?.dataRef

  /** children **/
  const menuManagerChildren = menuManagerState?.children
  const menuManagerChildrenIds = Object.keys(menuManagerChildren || [])
  const hasChildren = menuManagerChildrenIds.length > 0
  const hasChildrenEmpty = hasChildren && menuManagerChildrenIds.length === 0
  const getMenuItemById = (itemId: string) => {
    if (menuManagerChildren) {
      return menuManagerChildren[itemId] ?? null
    }
    return null
  }

  /** meta info */
  const uniqueContextId = useMemo(() => menuManagerContext?.uniqueContextId, [])
  const dependencies = menuManagerContext?.dependencies

  return {
    menuManagerRef,
    sendToMenuManager,
    menuManagerId,

    menuManagerState,
    menuManagerContext,

    //drag dependencies
    uniqueContextId,
    dependencies,

    data,
    dataReferences,
    dataRef,

  }
}