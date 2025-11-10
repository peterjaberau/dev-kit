import { useRootActors } from "../../hooks"
import { useSelector } from "@xstate/react"
import { useCurrentAppExample } from '../current-app-example.selector'
import { usePluginScopePicker } from "./plugin.scope-picker.selector"

export const usePluginJsonViewer = () => {
  const { currentAppExampleState, currentAppExampleContext, currentAppExampleRef } = useCurrentAppExample()
  const { pluginScopePickerState, pluginScopePickerContext, pluginScopePickerRef } = usePluginScopePicker()

  const data = {
    currentApp: {

      state: currentAppExampleState.toJSON(),
      context: currentAppExampleContext,
      stateValue: currentAppExampleState.value,
      status: currentAppExampleState.status,
      snapshot: currentAppExampleRef.getSnapshot().toJSON()
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
