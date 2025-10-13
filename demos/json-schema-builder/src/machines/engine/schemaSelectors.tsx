import { useEngineActors } from "../hooks/engine"
import { useSelector } from "@xstate/react"

export const useSchemaSource = () => {
  const { schemaSourceRef } = useEngineActors()

  // const { dataSourceContext } = useDataSource()

  const sendToSchemaSource = schemaSourceRef.send
  const schemaSourceState: any = useSelector(schemaSourceRef, (state) => state)
  const schemaSourceContext = schemaSourceState.context

  return {
    schemaSourceRef,
    sendToSchemaSource,

    schemaSourceState,
    schemaSourceContext,
  }
}
