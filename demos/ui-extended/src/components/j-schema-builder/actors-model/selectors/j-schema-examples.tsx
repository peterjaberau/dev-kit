import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useJSchemaExamples = () => {
  const { rootJSchemaExamplesRef: jSchemaExamplesRef } = useRootActors()

  const sendToJSchemaExamples = jSchemaExamplesRef.send
  const jSchemaExamplesState: any = useSelector(jSchemaExamplesRef, (state) => state)
  const jSchemaExamplesContext = jSchemaExamplesState.context

  const getExampleByName = (name: string) => {
    return jSchemaExamplesContext.data.find((item: any) => item.name === name)
  }

  return {
    jSchemaExamplesRef,
    sendToJSchemaExamples,

    jSchemaExamplesState,
    jSchemaExamplesContext,

    getExampleByName
  }
}
