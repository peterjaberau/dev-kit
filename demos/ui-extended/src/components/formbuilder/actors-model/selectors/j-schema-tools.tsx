import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useJSchemaTools = () => {
  const { rootJSchemaToolsRef: jSchemaToolsRef } = useRootActors()

  const sendToJSchemaTools = jSchemaToolsRef.send
  const jSchemaToolsState: any = useSelector(jSchemaToolsRef, (state) => state)
  const jSchemaToolsContext = jSchemaToolsState.context

  return {
    jSchemaToolsRef,
    sendToJSchemaTools,

    jSchemaToolsState,
    jSchemaToolsContext,
  }
}
