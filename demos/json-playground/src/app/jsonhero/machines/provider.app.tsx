import { createActorContext, useSelector } from "@xstate/react"
import { createBrowserInspector } from "@statelyai/inspect"

import { appMachine } from "./machine.app"
import { useEffect } from "react"

const inspector = createBrowserInspector({
  autoStart: false,
})

const InspectorBridge = () => {
  const appRef = AppContext.useActorRef()

  const inspectionEnabled = useSelector(appRef, (state: any) => state.context.inspector.enable)

  useEffect(() => {
    if (inspectionEnabled) inspector.start()
    else inspector.stop()

    return () => inspector.stop()
  }, [inspectionEnabled])

  return null
}

export const AppContext = createActorContext(appMachine)

export const AppProvider = (props: any) => {
  const { children, data, views, ...rest } = props
  return (
    <AppContext.Provider
      options={{
        input: {
          // data: data,
          // views: views,
          ...rest,
        },
        inspect: inspector.inspect,
      }}
    >
      <InspectorBridge />
      {children}
    </AppContext.Provider>
  )
}
