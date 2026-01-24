import { useSelector } from "@xstate/react"
import { useAppActor } from "./use-app-actor"

export const usePreferencesActor = () => {
  const { appContext } = useAppActor()
  const preferencesRef = appContext?.refs?.preferences

  const sendToPreferences = preferencesRef?.send
  const preferencesState: any = useSelector(preferencesRef, (state: any) => state)
  const preferencesContext = preferencesState?.context
  const preferences = preferencesContext?.preferences

  const indent = useSelector(preferencesRef, (state) => preferences?.indent)

  const isLoading = preferencesState?.matches?.("loading") ?? false
  const isReady = preferencesState?.matches?.("ready") ?? false

  // Generic preferences updater
  const updatePreferences = (partialPreferences: any) => {
    sendToPreferences({
      type: "preferences.update",
      preferences: partialPreferences,
    })
  }

  // Indent-specific updater
  const setIndent = (nextIndent: any) => {
    updatePreferences({ indent: nextIndent })
  }
  return {
    // actor
    preferencesRef,

    // state & context
    preferencesState,
    preferencesContext,

    // values
    preferences,
    indent,

    // status
    isLoading,
    isReady,

    // actions
    sendToPreferences,
    updatePreferences,
    setIndent,
  }
}

/*

const { indent, setIndent } = usePreferencesActor()

setIndent(2)
 */
