import { useSelector } from "@xstate/react"
import { useSchema } from "./use-schema"

import { getSpawnedActor } from "#machines/common"
import { SCHEMA_SYSTEM_IDS } from "../constants"
import { SchemaContext } from "../provider"

export function useSchemaActors() {
  const { schemaRef } = useSchema()

  const schemaAppRef = getSpawnedActor(SCHEMA_SYSTEM_IDS.APP, schemaRef)
  const schemaSessionRef = getSpawnedActor(SCHEMA_SYSTEM_IDS.SESSION, schemaRef)
  const schemaCurrentAppRef = getSpawnedActor(SCHEMA_SYSTEM_IDS.CURRENT_APP, schemaRef)

  return {
    schemaRef,
    schemaAppRef,
    schemaSessionRef,
    schemaCurrentAppRef,
  }
}
