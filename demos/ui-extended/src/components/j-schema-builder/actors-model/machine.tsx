import { assign, createMachine } from "xstate"
import {
  appMachine, currentAppMachine, sessionMachine,
  jsonSchemaStandardsMachine, jsonSchemaToolsMachine, jsonSchemaFormsMachine,
  jsonSchemaTreeMachine,
  jsonSchemaExamplesMachine,

} from "./machines"
import { ROOT_SYSTEM_IDS } from "./shared/constants"

export const rootMachine = createMachine({
  entry: assign({
    app: ({ spawn }) => spawn(appMachine, { systemId: ROOT_SYSTEM_IDS.APP }),
    session: ({ spawn }) => spawn(sessionMachine, { systemId: ROOT_SYSTEM_IDS.SESSION }),
    currentApp: ({ spawn }) => spawn(currentAppMachine, { systemId: ROOT_SYSTEM_IDS.CURRENT_APP }),

    jsonSchemaStandards: ({ spawn }) => spawn(jsonSchemaStandardsMachine, { systemId: ROOT_SYSTEM_IDS.JSON_SCHEMA_STANDARDS }),
    jsonSchemaTools: ({ spawn }) => spawn(jsonSchemaToolsMachine, { systemId: ROOT_SYSTEM_IDS.JSON_SCHEMA_TOOLS }),
    jsonSchemaForms: ({ spawn }) => spawn(jsonSchemaFormsMachine, { systemId: ROOT_SYSTEM_IDS.JSON_SCHEMA_FORMS }),

    jsonSchemaTree: ({ spawn }) => spawn(jsonSchemaTreeMachine, { systemId: ROOT_SYSTEM_IDS.JSON_SCHEMA_TREE }),


    jsonSchemaExamples: ({ spawn }) => spawn(jsonSchemaExamplesMachine, { systemId: ROOT_SYSTEM_IDS.JSON_SCHEMA_EXAMPLES }),
  }),
})
