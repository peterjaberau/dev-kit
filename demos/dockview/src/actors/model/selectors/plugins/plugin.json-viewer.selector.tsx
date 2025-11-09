import { useRootActors } from "../../hooks"
import { useSelector } from "@xstate/react"
import { useCurrentApp } from '../current-app.selector'
import { usePluginScopePicker } from "./plugin.scope-picker.selector"

export const usePluginJsonViewer = () => {
  const { currentAppState, currentAppContext, currentAppRef } = useCurrentApp()
  const { pluginScopePickerState, pluginScopePickerContext, pluginScopePickerRef } = usePluginScopePicker()

  const data = {
    currentApp: {

      state: currentAppState.toJSON(),
      context: currentAppContext,
      stateValue: currentAppState.value,
      status: currentAppState.status,
      snapshot: currentAppRef.getSnapshot().toJSON()
    },
    pluginScopePicker: {
      state: pluginScopePickerState.toJSON(),
      context: pluginScopePickerContext,
      stateValue: pluginScopePickerState.value,
      status: pluginScopePickerState.status,
      snapshot: pluginScopePickerRef.getSnapshot().toJSON()
    }
  }



  return {
    data
  }
}
