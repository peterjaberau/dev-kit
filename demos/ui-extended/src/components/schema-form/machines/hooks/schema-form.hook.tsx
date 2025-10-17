import { useSelector } from "@xstate/react"
import { getSpawnedActor } from "#machines/common"
import { SCHEMA_FORM_SYSTEM_IDS } from "../schema-form.constants"
import { SchemaFormContext } from "../schema-form.provider"

export function useSchemaForm() {
  const schemaFormRef = SchemaFormContext.useActorRef()
  const sendToSchemaForm = schemaFormRef.send

  const schemaFormState: any = useSelector(schemaFormRef, (state) => state)
  const schemaFormContext = schemaFormState.context

  return {
    schemaFormRef,
    sendToSchemaForm,

    schemaFormState,
    schemaFormContext,
  }
}

export function useSchemaFormActors() {
  const { schemaFormRef } = useSchemaForm()

  const schemaFormAppRef = getSpawnedActor(SCHEMA_FORM_SYSTEM_IDS.APP, schemaFormRef)
  const schemaFormSessionRef = getSpawnedActor(SCHEMA_FORM_SYSTEM_IDS.SESSION, schemaFormRef)
  const schemaFormCurrentAppRef = getSpawnedActor(SCHEMA_FORM_SYSTEM_IDS.CURRENT_APP, schemaFormRef)

  return {
    schemaFormRef,
    schemaFormAppRef,
    schemaFormSessionRef,
    schemaFormCurrentAppRef,
  }
}
