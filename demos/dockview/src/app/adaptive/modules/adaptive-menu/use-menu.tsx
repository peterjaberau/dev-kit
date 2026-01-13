"use client"
import { createActorContext, useSelector } from "@xstate/react"
import { assign, enqueueActions, setup } from "xstate"
import { MenuContext } from './menu-provider'



export function useMenu() {
  const menuRef = MenuContext.useActorRef()
  const sendToMenu = menuRef.send

  const menuState: any = useSelector(menuRef, (state) => state)
  const menuContext = menuState.context

  const menuId = menuRef?.id

  const data = menuContext?.data
  const menuManagerRef = menuContext?.menuManagerRef

  return {
    menuRef,
    sendToMenu,
    menuId,

    menuState,
    menuContext,

    data,
    menuManagerRef,
  }
}

