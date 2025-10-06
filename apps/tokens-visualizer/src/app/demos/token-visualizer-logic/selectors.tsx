import { useSelector } from '@xstate/react'
import { useActors } from "#actors/hooks/useActors"

export const useTokenVisualizerLogic = () => {
  const { tokenVisualizerLogicRef } = useActors()
  const sendToTokenVisualizerLogic = tokenVisualizerLogicRef?.send


  const tokenVisualizerLogicState: any = useSelector(tokenVisualizerLogicRef, s => s)
  const tokenVisualizerLogicContext = tokenVisualizerLogicState?.context

  const nodes = tokenVisualizerLogicContext?.nodes
  const adjacencies = tokenVisualizerLogicContext?.adjacencies

  const isReady = tokenVisualizerLogicState.matches('ready')
  const stateValue = tokenVisualizerLogicState.value


  return {
    tokenVisualizerLogicRef,
    tokenVisualizerLogicState,
    tokenVisualizerLogicContext,

    sendToTokenVisualizerLogic,

    nodes,
    adjacencies,

    isReady,
    stateValue
  }

}
