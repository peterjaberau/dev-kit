import { useSchemaFormActors } from "./hooks/schema-form.hook"
import { useSelector } from "@xstate/react"

export const useSchemaFormApp = () => {
  const { schemaFormAppRef } = useSchemaFormActors()

  const sendToApp = schemaFormAppRef.send
  const appState: any = useSelector(schemaFormAppRef, (state) => state)
  const appContext = appState.context

  return {
    appRef: schemaFormAppRef,
    sendToApp,

    appState,
    appContext,
  }
}

export const useSchemaFormSession = () => {
  const { schemaFormSessionRef } = useSchemaFormActors()

  const sendToSession = schemaFormSessionRef.send
  const sessionState: any = useSelector(schemaFormSessionRef, (state) => state)
  const sessionContext = sessionState.context

  return {
    sessionRef: schemaFormSessionRef,
    sendToSession,

    sessionState,
    sessionContext,
  }
}

export const useSchemaFormCurrentApp = () => {
  const { schemaFormCurrentAppRef } = useSchemaFormActors()

  const sendToCurrentApp = schemaFormCurrentAppRef.send
  const currentAppState: any = useSelector(schemaFormCurrentAppRef, (state) => state)
  const currentAppContext = currentAppState.context

  return {
    currentAppRef: schemaFormCurrentAppRef,
    sendToCurrentApp,

    currentAppState,
    currentAppContext,
  }
}
