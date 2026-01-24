import { useSelector } from "@xstate/react"
import { usePlayground } from "./use-playground"

export const useJsonManager = () => {
  const { playgroundContext } = usePlayground()
  const jsonManagerRef = playgroundContext?.refs?.jsonManager
  const jsonManagerId = jsonManagerRef?.id

  const sendToJsonManager = jsonManagerRef?.send

  const jsonManagerState: any = useSelector(jsonManagerRef, (state) => state)
  const jsonManagerContext = jsonManagerState?.context

  /** Fire events */
  //  const fireInitiate = () => sendToPlayground({ type: "playground.initiate" })

  const createDocFromJson = (params : any = { content: null, options: { readOnly: false }}) =>
    sendToJsonManager({ type: "doc.create-from-json", params: params })

  return {
    jsonManagerRef,
    jsonManagerId,

    jsonManagerState,
    jsonManagerContext,

    sendToJsonManager,
    createDocFromJson,
  }
}
