import { useRootActors } from "../../hooks"
import { useSelector } from "@xstate/react"

export const usePluginDvController = () => {
  const { rootDvControllerPluginRef: dvControllerPluginRef } = useRootActors()

  // read
  const dvControllerPluginState: any = useSelector(dvControllerPluginRef, (state) => state)
  const dvControllerPluginContext = dvControllerPluginState.context

  // emits
  const sendToDvControllerPlugin = dvControllerPluginRef.send
  const fireStartLoading = () => sendToDvControllerPlugin({
    type: 'START_LOADING_REQUEST',
  })
  const fireValueChange = (e: any) => sendToDvControllerPlugin({
    type: 'VALUE_CHANGE',
    payload: e
  })


  // states
  const isLoading = dvControllerPluginState.matches("loading")
  const isReady = dvControllerPluginState.matches("ready")




  const items = dvControllerPluginContext.items
  const defaultValue = dvControllerPluginContext.defaultValue
  const value = dvControllerPluginContext.value

  return {
    dvControllerPluginRef,
    sendToDvControllerPlugin,

    dvControllerPluginState,
    dvControllerPluginContext,

    fireStartLoading,
    fireValueChange,

    isLoading,
    isReady,

    items,
    defaultValue,
    value,
  }
}
