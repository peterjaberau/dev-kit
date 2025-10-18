import { useSelector } from "@xstate/react"
import { getSpawnedActor } from "#machines/common"
import { SCHEMA_SYSTEM_IDS } from "../constants"
import { SchemaContext } from "../provider"

export function useSchema() {
  const schemaRef = SchemaContext.useActorRef()
  const sendToSchema = schemaRef.send

  const schemaState: any = useSelector(schemaRef, (state) => state)
  const schemaContext = schemaState.context

  return {
    schemaRef,
    sendToSchema,

    schemaState,
    schemaContext,
  }
}

