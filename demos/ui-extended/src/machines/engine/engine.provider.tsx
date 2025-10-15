"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { createMachine, assign } from "xstate"
import { ENGINE_SYSTEM_IDS } from "./engine.constants"
import { configMachine, sessionMachine, currentAppMachine, currentInstanceMachine,

} from "./engine.machines"

export const engineMachine = createMachine({
  entry: assign({
    config: ({ spawn }) => spawn(configMachine, { systemId: ENGINE_SYSTEM_IDS.CONFIG }),
    session: ({ spawn }) => spawn(sessionMachine, { systemId: ENGINE_SYSTEM_IDS.SESSION }),
    currentApp: ({ spawn }) => spawn(currentAppMachine, { systemId: ENGINE_SYSTEM_IDS.CURRENT_APP }),
    currentInstance: ({ spawn }) => spawn(currentInstanceMachine, { systemId: ENGINE_SYSTEM_IDS.CURRENT_INSTANCE }),


  }),
})

export const EngineContext = createActorContext(engineMachine)

export const EngineProvider = ({ children }: any) => {
  return <EngineContext.Provider>{children}</EngineContext.Provider>
}
