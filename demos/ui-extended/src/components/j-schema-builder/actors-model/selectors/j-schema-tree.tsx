import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useJSchemaTree = () => {
  const { rootJSchemaTreeRef: jSchemaTreeRef } = useRootActors()

  const sendToJSchemaTree = jSchemaTreeRef.send
  const jSchemaTreeState: any = useSelector(jSchemaTreeRef, (state) => state)
  const jSchemaTreeContext = jSchemaTreeState.context

  return {
    jSchemaTreeRef,
    sendToJSchemaTree,

    jSchemaTreeState,
    jSchemaTreeContext,
  }
}

