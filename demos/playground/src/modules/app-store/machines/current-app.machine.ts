import { assign, createMachine } from "xstate"

import {
  actionMachine,
  appInfoMachine,
  componentsMachine,
  executionMachine,
  historyMachine,
  layoutInfoMachine,
} from "./current-app"
import { MACHINE_IDS } from "../lib/constants"

export const currentAppMachine = createMachine({
  entry: assign({
    componentsRef: ({ spawn }: any) =>
      spawn(componentsMachine, {
        systemId: MACHINE_IDS.CURRENT_APP_COMPONENTS,
        id: MACHINE_IDS.CURRENT_APP_COMPONENTS,
      }),
    actionRef: ({ spawn }: any) =>
      spawn(actionMachine, { systemId: MACHINE_IDS.CURRENT_APP_ACTION, id: MACHINE_IDS.CURRENT_APP_ACTION }),
    appInfoRef: ({ spawn }: any) =>
      spawn(appInfoMachine, { systemId: MACHINE_IDS.CURRENT_APP_APP_INFO, id: MACHINE_IDS.CURRENT_APP_APP_INFO }),
    executionRef: ({ spawn }: any) =>
      spawn(executionMachine, { systemId: MACHINE_IDS.CURRENT_APP_EXECUTION, id: MACHINE_IDS.CURRENT_APP_EXECUTION }),
    layoutInfoRef: ({ spawn }: any) =>
      spawn(layoutInfoMachine, {
        systemId: MACHINE_IDS.CURRENT_APP_LAYOUT_INFO,
        id: MACHINE_IDS.CURRENT_APP_LAYOUT_INFO,
      }),
    historyRef: ({ spawn }: any) =>
      spawn(historyMachine, { systemId: MACHINE_IDS.CURRENT_APP_HISTORY, id: MACHINE_IDS.CURRENT_APP_HISTORY }),
  }),
})
