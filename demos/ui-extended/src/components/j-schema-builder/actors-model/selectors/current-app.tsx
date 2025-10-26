import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"
import { useJSchemaExamples } from "./j-schema-examples"

export const useCurrentApp = () => {
  const { rootCurrentAppRef: currentAppRef } = useRootActors()

  const { getExampleByName, getViewerExampleByName } = useJSchemaExamples()

  const sendToCurrentApp = currentAppRef.send
  const currentAppState: any = useSelector(currentAppRef, (state) => state)
  const currentAppContext = currentAppState.context

  const setCurrentExample = (name: string) => {
    sendToCurrentApp({
      type: 'SET_CURRENT_EXAMPLE',
      payload: getExampleByName(name)
    })
  }
  const currentExample = currentAppContext.currentExample


  const setCurrentViewerExample = (name: string) => {
    sendToCurrentApp({
      type: 'SET_CURRENT_VIEWER_EXAMPLE',
      payload: getViewerExampleByName(name)
    })
  }
  const currentViewerExample = currentAppContext.currentViewerExample

  // const setExample = () =>



  return {
    currentAppRef,
    sendToCurrentApp,

    currentAppState,
    currentAppContext,

    setCurrentExample,
    currentExample,

    setCurrentViewerExample,
    currentViewerExample
  }
}
