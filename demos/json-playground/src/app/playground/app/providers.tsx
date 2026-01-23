import { createActorContext, useSelector } from "@xstate/react"
import { playgroundMachine, jsonManagerMachine, jsonOperationsMachine, jsonViewsMachine } from "../engine"

export const PlaygroundContext = createActorContext(playgroundMachine)

export const PlaygroundProvider = (props: any) => {
  const { children, data, views, ...rest } = props
  return (
    <PlaygroundContext.Provider
      options={{
        input: {
          data: data,
          views: views,
          ...rest,
        },
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}

export const usePlayground = () => {
  const playgroundRef: any = PlaygroundContext.useActorRef()
  const playgroundId = playgroundRef?.id

  const sendToPlayground = playgroundRef.send
  const playgroundState: any = useSelector(playgroundRef, (state: any) => state)
  const playgroundContext = playgroundState.context

  const jsonManagerRef = playgroundRef?.refs?.manager
  const jsonViewsRef = playgroundRef?.refs?.views
  const jsonOperationsRef = playgroundRef?.refs?.manager

  return {
    playgroundRef,
    playgroundId,

    sendToPlayground,
    playgroundState,
    playgroundContext,

    jsonManagerRef,
    jsonViewsRef,
    jsonOperationsRef,
  }
}

export const useJsonManager = () => {
  const { playgroundContext } = usePlayground()
  const jsonManagerRef = playgroundContext?.refs?.jsonManager
  const jsonManagerId = jsonManagerRef?.id

  const sendToJsonManager = jsonManagerRef?.send

  const jsonManagerState: any = useSelector(jsonManagerRef, (state) => state)
  const jsonManagerContext = jsonManagerState?.context

  return {
    jsonManagerRef,
    jsonManagerId,
    sendToJsonManager,
    jsonManagerState,
    jsonManagerContext,
  }
}

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

export const useJsonOperations = () => {
  const { playgroundContext } = usePlayground()
  const jsonOperationsRef = playgroundContext?.refs?.jsonOperations
  const jsonOperationsId = jsonOperationsRef?.id

  const sendToJsonOperations = jsonOperationsRef?.send

  const jsonOperationsState: any = useSelector(jsonOperationsRef, (state) => state)
  const jsonOperationsContext = jsonOperationsState?.context

  return {
    jsonOperationsRef,
    jsonOperationsId,

    sendToJsonOperations,
    jsonOperationsState,
    jsonOperationsContext,
  }
}