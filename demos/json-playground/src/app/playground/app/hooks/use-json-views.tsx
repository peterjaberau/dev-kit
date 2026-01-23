import { useSelector } from "@xstate/react"
import { usePlayground } from "./use-playground"

export const useJsonViews = () => {
  const { playgroundContext } = usePlayground()
  const jsonViewsRef = playgroundContext?.refs?.jsonViews
  const jsonViewsId = jsonViewsRef?.id

  const sendToJsonViews = jsonViewsRef?.send

  const jsonViewsState: any = useSelector(jsonViewsRef, (state) => state)
  const jsonViewsContext = jsonViewsState?.context

  return {
    jsonViewsRef,
    jsonViewsId,

    sendToJsonViews,
    jsonViewsState,
    jsonViewsContext,
  }
}
