"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { createMachine, assign } from "xstate"
import { SCHEMA_SYSTEM_IDS } from "./constants"
import { appMachine, sessionMachine, currentAppMachine, } from "./machines"

export const schemaMachine = createMachine({
  entry: assign({
    app: ({ spawn }) => spawn(appMachine, { systemId: SCHEMA_SYSTEM_IDS.APP }),
    session: ({ spawn }) => spawn(sessionMachine, { systemId: SCHEMA_SYSTEM_IDS.SESSION }),
    currentApp: ({ spawn }) => spawn(currentAppMachine, { systemId: SCHEMA_SYSTEM_IDS.CURRENT_APP }),


  }),
})

export const SchemaContext = createActorContext(schemaMachine)

export const SchemaProvider = ({ children }: any) => {
  return <SchemaContext.Provider>{children}</SchemaContext.Provider>
}
