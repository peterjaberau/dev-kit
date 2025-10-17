import { useSelector } from "@xstate/react"
import { getSpawnedActor } from "#machines/common"
import { SCHEMA_BUILDER_SYSTEM_IDS } from "../schema-builder.constants"
import { SchemaBuilderContext } from "../schema-builder.provider"

export function useSchemaBuilder() {
  const schemaBuilderRef = SchemaBuilderContext.useActorRef()
  const sendToSchemaBuilder = schemaBuilderRef.send

  const schemaBuilderState: any = useSelector(schemaBuilderRef, (state) => state)
  const schemaBuilderContext = schemaBuilderState.context

  return {
    schemaBuilderRef,
    sendToSchemaBuilder,

    schemaBuilderState,
    schemaBuilderContext,
  }
}

export function useSchemaBuilderActors() {
  const { schemaBuilderRef } = useSchemaBuilder()

  const schemaBuilderAppRef = getSpawnedActor(SCHEMA_BUILDER_SYSTEM_IDS.APP, schemaBuilderRef)
  const schemaBuilderSessionRef = getSpawnedActor(SCHEMA_BUILDER_SYSTEM_IDS.SESSION, schemaBuilderRef)
  const schemaBuilderCurrentAppRef = getSpawnedActor(SCHEMA_BUILDER_SYSTEM_IDS.CURRENT_APP, schemaBuilderRef)

  return {
    schemaBuilderRef,
    schemaBuilderAppRef,
    schemaBuilderSessionRef,
    schemaBuilderCurrentAppRef,
  }
}
