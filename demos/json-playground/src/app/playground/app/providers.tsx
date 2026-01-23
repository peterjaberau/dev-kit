import { createActorContext, useSelector } from "@xstate/react"
import { createBrowserInspector } from "@statelyai/inspect"

import { playgroundMachine } from "../engine"
import { useEffect } from "react"

const inspector = createBrowserInspector({
  autoStart: false,
})

const InspectorBridge = () => {
  const playgroundRef = PlaygroundContext.useActorRef()

  const inspectionEnabled = useSelector(
    playgroundRef,
    (state: any) => state.context.config.inspector.enable
  )

  useEffect(() => {
    if (inspectionEnabled) inspector.start()
    else inspector.stop()

    return () => inspector.stop()
  }, [inspectionEnabled])

  return null
}

export const PlaygroundContext = createActorContext(playgroundMachine)

export const PlaygroundProvider = (props: any) => {
  const { children, data, views, ...rest } = props
  return (
    <PlaygroundContext.Provider
      options={{
        input: {
          // data: data,
          // views: views,
          ...rest,
        },
        inspect: inspector.inspect
      }}
    >
      <InspectorBridge />
      {children}
    </PlaygroundContext.Provider>
  )
}




