import { assign, createMachine } from "xstate"
import { appMachine, currentAppMachine, sessionMachine, pluginScopePickerMachine } from "./machines"
import { ROOT_SYSTEM_IDS } from "./shared/constants"

export const rootMachine = createMachine({
  entry: assign({
    app: ({ spawn }: any) => spawn(appMachine, { systemId: ROOT_SYSTEM_IDS.APP }),
    session: ({ spawn }: any) => spawn(sessionMachine, { systemId: ROOT_SYSTEM_IDS.SESSION }),
    currentApp: ({ spawn }: any) => spawn(currentAppMachine, { systemId: ROOT_SYSTEM_IDS.CURRENT_APP }),

    pluginScopePicker: ({ spawn }: any) => spawn(pluginScopePickerMachine, { systemId: ROOT_SYSTEM_IDS.PLUGIN_SCOPE_PICKER }),
  }),
})
