"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { createMachine, assign } from "xstate"
import { SCHEMA_FORM_SYSTEM_IDS } from "./schema-form.constants"
import { appMachine, sessionMachine, currentAppMachine,

} from "./schema-form.machines"

export const schemaFormMachine = createMachine({
  entry: assign({
    app: ({ spawn }) => spawn(appMachine, { systemId: SCHEMA_FORM_SYSTEM_IDS.APP }),
    session: ({ spawn }) => spawn(sessionMachine, { systemId: SCHEMA_FORM_SYSTEM_IDS.SESSION }),
    currentApp: ({ spawn }) => spawn(currentAppMachine, { systemId: SCHEMA_FORM_SYSTEM_IDS.CURRENT_APP }),


  }),
})

export const SchemaFormContext = createActorContext(schemaFormMachine)

export const SchemaFormProvider = ({ children }: any) => {
  return <SchemaFormContext.Provider>{children}</SchemaFormContext.Provider>
}
