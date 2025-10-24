import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useJSchemaStandards = () => {
  const { rootJSchemaStandardsRef: jSchemaStandardsRef } = useRootActors()

  const sendToJSchemaStandards = jSchemaStandardsRef.send
  const jSchemaStandardsState: any = useSelector(jSchemaStandardsRef, (state) => state)
  const jSchemaStandardsContext = jSchemaStandardsState.context

  return {
    jSchemaStandardsRef,
    sendToJSchemaStandards,

    jSchemaStandardsState,
    jSchemaStandardsContext,
  }
}
