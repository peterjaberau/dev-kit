import { useSchemaActors } from "./hooks"
import { useSelector } from "@xstate/react"

export const useSchemaApp = () => {
  const { schemaAppRef } = useSchemaActors()

  const sendToApp = schemaAppRef.send
  const appState: any = useSelector(schemaAppRef, (state) => state)
  const appContext = appState.context

  return {
    appRef: schemaAppRef,
    sendToApp,

    appState,
    appContext,
  }
}

export const useSchemaSession = () => {
  const { schemaSessionRef } = useSchemaActors()

  const sendToSession = schemaSessionRef.send
  const sessionState: any = useSelector(schemaSessionRef, (state) => state)
  const sessionContext = sessionState.context

  return {
    sessionRef: schemaSessionRef,
    sendToSession,

    sessionState,
    sessionContext,
  }
}

export const useSchemaCurrentApp = () => {
  const { schemaCurrentAppRef } = useSchemaActors()

  const sendToCurrentApp = schemaCurrentAppRef.send
  const currentAppState: any = useSelector(schemaCurrentAppRef, (state) => state)
  const currentAppContext = currentAppState.context

  const schema = currentAppContext.schema
  const uiSchema = currentAppContext.uiSchema
  const formData = currentAppContext.formData

  const schemaDefinitions = schema?.definitions
  const uiSchemaDefinitions = uiSchema?.definitions

  const constants = currentAppContext.constants

  const allFormInputs = currentAppContext.allFormInputs
  const unsupportedFeatures = currentAppContext.unsupportedFeatures
  const schemaElementsCount = currentAppContext.schemaElementsCount
  const categoryHash = currentAppContext.categoryHash

  const schemaTitle = schema.title || ""
  const schemaDescription = schema.description || ""

  const canAdd = schema.properties && Object.keys(schema.properties).length !== 0
  const hasUnsupportedFeatures = unsupportedFeatures.length > 0

  const mods = currentAppContext.mods
  const canShowFormName = mods && mods.labels && typeof mods.labels.formNameLabel === "string"
  const canShowFormDescription = mods && mods.labels && typeof mods.labels.formDescriptionLabel === "string"
  const canShowFormMeta = canShowFormName || canShowFormDescription

  const formNameLabel = canShowFormName ? mods.labels.formNameLabel : "Form Name"
  const formDescriptionLabel = canShowFormDescription ? mods.labels.formDescriptionLabel : "Form Description"

  return {
    currentAppRef: schemaCurrentAppRef,
    sendToCurrentApp,

    currentAppState,
    currentAppContext,

    schemaTitle,
    schemaDescription,
    schema,
    uiSchema,
    formData,

    schemaDefinitions,
    uiSchemaDefinitions,

    constants,

    allFormInputs,
    unsupportedFeatures,
    schemaElementsCount,
    categoryHash,

    canAdd,
    hasUnsupportedFeatures,

    mods,
    canShowFormName,
    canShowFormDescription,
    canShowFormMeta,
    formNameLabel,
    formDescriptionLabel,
  }
}
