import { useActorRef, useSelector } from "@xstate/react"
import { recursiveMachine } from "./recursive.machine"


const selectStateValue = (state: any) => {
  return state.value
}

const selectTransform = (state: any) => {
  return state.context.transform
}

const selectOutput = (state: any) => {
  return state.context.output
}

export function useRecursive(source: any) {
  const actorRef = useActorRef(recursiveMachine, {
    input: { source },
  })

  const stateValue = useSelector(actorRef, selectStateValue)
  const transform = useSelector(actorRef, selectTransform)
  const output = useSelector(actorRef, selectOutput)

  const isIdle = stateValue === "idle"
  const isBooting = stateValue === "boot"
  const isFinished = stateValue === "finished"

  const isRunning = typeof stateValue === "object" && stateValue.tree

  const start = () => {
    actorRef.send({ type: "START" })
  }

  const reset = () => {
    actorRef.send({ type: "RESET" })
  }

  return {
    actorRef,

    stateValue,
    transform,
    output,

    isIdle,
    isBooting,
    isRunning,
    isFinished,

    start,
    reset,
  }
}
