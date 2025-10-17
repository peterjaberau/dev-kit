import { useSchemaBuilderActors } from "./hooks/schema-builder.hook"
import { useSelector } from "@xstate/react"

export const useSchemaBuilderApp = () => {
  const { schemaBuilderAppRef } = useSchemaBuilderActors()

  const sendToApp = schemaBuilderAppRef.send
  const appState: any = useSelector(schemaBuilderAppRef, (state) => state)
  const appContext = appState.context

  return {
    appRef: schemaBuilderAppRef,
    sendToApp,

    appState,
    appContext,
  }
}

export const useSchemaBuilderSession = () => {
  const { schemaBuilderSessionRef } = useSchemaBuilderActors()

  const sendToSession = schemaBuilderSessionRef.send
  const sessionState: any = useSelector(schemaBuilderSessionRef, (state) => state)
  const sessionContext = sessionState.context

  return {
    sessionRef: schemaBuilderSessionRef,
    sendToSession,

    sessionState,
    sessionContext,
  }
}

export const useSchemaBuilderCurrentApp = () => {
  const { schemaBuilderCurrentAppRef } = useSchemaBuilderActors()

  const sendToCurrentApp = schemaBuilderCurrentAppRef.send
  const currentAppState: any = useSelector(schemaBuilderCurrentAppRef, (state) => state)
  const currentAppContext = currentAppState.context

  return {
    currentAppRef: schemaBuilderCurrentAppRef,
    sendToCurrentApp,

    currentAppState,
    currentAppContext,
  }
}
