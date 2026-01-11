import { useActorRef, useSelector } from "@xstate/react"
import { recursiveMachine } from "./gpt-recursive.machine"

/* ───────────────────────────────────────────── */
/* SELECTORS                                     */
/* ───────────────────────────────────────────── */

const selectStateValue = (state) => {
  return state.value
}

const selectTransform = (state) => {
  return state.context.transform
}

const selectOutput = (state) => {
  return state.context.output
}

/* ───────────────────────────────────────────── */
/* HOOK                                         */
/* ───────────────────────────────────────────── */

export function useRecursive(source) {
  const actorRef = useActorRef(recursiveMachine, {
    input: { source },
  })

  const stateValue = useSelector(actorRef, selectStateValue)
  const transform = useSelector(actorRef, selectTransform)
  const output = useSelector(actorRef, selectOutput)

  /* ───────────────────────────────────────────── */
  /* DERIVED FLAGS                                */
  /* ───────────────────────────────────────────── */

  const isIdle = stateValue === "idle"
  const isBooting = stateValue === "boot"
  const isFinished = stateValue === "finished"

  const isRunning = typeof stateValue === "object" && stateValue.tree

  /* ───────────────────────────────────────────── */
  /* EVENT SENDERS                                */
  /* ───────────────────────────────────────────── */

  const start = () => {
    actorRef.send({ type: "START" })
  }

  const reset = () => {
    actorRef.send({ type: "RESET" })
  }

  return {
    actorRef,

    /* raw state */
    stateValue,
    transform,
    output,

    /* flags */
    isIdle,
    isBooting,
    isRunning,
    isFinished,

    /* actions */
    start,
    reset,
  }
}
