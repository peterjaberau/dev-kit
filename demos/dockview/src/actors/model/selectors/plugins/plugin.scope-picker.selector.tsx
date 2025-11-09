import { useRootActors } from "../../hooks"
import { useSelector } from "@xstate/react"

export const usePluginScopePicker = () => {
  const { rootPluginScopePickerRef: pluginScopePickerRef } = useRootActors()

  // read
  const pluginScopePickerState: any = useSelector(pluginScopePickerRef, (state) => state)
  const pluginScopePickerContext = pluginScopePickerState.context

  // emits
  const sendToPluginScopePicker = pluginScopePickerRef.send
  const triggerStartLoading = () => sendToPluginScopePicker({
    type: 'START_LOADING_REQUEST',
  })
  const triggerValueChange = (e: any) => sendToPluginScopePicker({
    type: 'VALUE_CHANGE',
    payload: e
  })

  // states
  const isLoading = pluginScopePickerState.matches('loading')
  const isReady = pluginScopePickerState.matches('ready')

  const items = pluginScopePickerContext.items
  const defaultValue = pluginScopePickerContext.defaultValue
  const value = pluginScopePickerContext.value

  return {
    pluginScopePickerRef,
    sendToPluginScopePicker,
    triggerStartLoading,
    triggerValueChange,

    pluginScopePickerState,
    pluginScopePickerContext,

    isLoading,
    isReady,

    items,
    defaultValue,
    value
  }
}
