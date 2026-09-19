import { useSelector } from "@xstate/react"
import { useCurrentApp } from "."

export const useCurrentAppInfo = () => {
  const { appInfoRef: infoRef } = useCurrentApp()

  const infoState: any = useSelector(infoRef, (state) => state)
  const infoContext = infoState?.context

  return {
    infoRef,
    infoState,
    infoContext,
    sendToInfo: infoRef.send,
  }
}