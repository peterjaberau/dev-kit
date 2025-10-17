"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { createMachine, assign } from "xstate"
import { SCHEMA_BUILDER_SYSTEM_IDS } from "./schema-builder.constants"
import { appMachine, sessionMachine, currentAppMachine,

} from "./schema-builder.machines"

export const schemaBuilderMachine = createMachine({
  entry: assign({
    app: ({ spawn }) => spawn(appMachine, { systemId: SCHEMA_BUILDER_SYSTEM_IDS.APP }),
    session: ({ spawn }) => spawn(sessionMachine, { systemId: SCHEMA_BUILDER_SYSTEM_IDS.SESSION }),
    currentApp: ({ spawn }) => spawn(currentAppMachine, { systemId: SCHEMA_BUILDER_SYSTEM_IDS.CURRENT_APP }),


  }),
})

export const SchemaBuilderContext = createActorContext(schemaBuilderMachine)

export const SchemaBuilderProvider = ({ children }: any) => {
  return <SchemaBuilderContext.Provider>{children}</SchemaBuilderContext.Provider>
}
