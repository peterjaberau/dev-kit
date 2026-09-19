import { useSelector } from "@xstate/react"
import { useCurrentApp } from "."

export const useCurrentAppComponents = () => {
  const { componentsRef } = useCurrentApp()

  const componentsState: any = useSelector(componentsRef, (state) => state)
  const componentsContext = componentsState?.context


  return {
    componentsRef,
    componentsState,
    componentsContext,
    sendToComponents: componentsRef.send,
  }
}