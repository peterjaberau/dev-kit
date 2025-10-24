import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useJSchemaForms = () => {
  const { rootJSchemaFormsRef: jSchemaFormsRef } = useRootActors()

  const sendToJSchemaForms = jSchemaFormsRef.send
  const jSchemaFormsState: any = useSelector(jSchemaFormsRef, (state) => state)
  const jSchemaFormsContext = jSchemaFormsState.context

  return {
    jSchemaFormsRef,
    sendToJSchemaForms,

    jSchemaFormsState,
    jSchemaFormsContext,
  }
}
