'use client'
import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useOas = () => {
  const { rootOASRef: oasRef } = useRootActors()
  const oasState: any = useSelector(oasRef, (state) => state)
  const oasContext = oasState?.context
  const sendToOAS = oasRef?.send

  const oasInstance = oasContext?.instance?.oas
  const oasExecutionCache = oasContext?.executionCache
  const oasApiSpecs = oasContext?.props?.apiSpec

  return {
    oasRef,
    oasState,
    oasContext,
    sendToOAS,

    oasInstance,
    oasExecutionCache,
    oasApiSpecs
  }

}
