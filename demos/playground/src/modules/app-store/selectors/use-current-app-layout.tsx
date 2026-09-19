import { useSelector } from "@xstate/react"
import { useCurrentApp } from "."

export const useCurrentAppLayout = () => {
  const { layoutInfoRef: layoutRef } = useCurrentApp()


  const layoutState: any = useSelector(layoutRef, (state) => state)
  const layoutContext = layoutState?.context

  return {
    layoutRef,
    layoutState,
    layoutContext,
    sendToLayout: layoutRef.send,
  }
}