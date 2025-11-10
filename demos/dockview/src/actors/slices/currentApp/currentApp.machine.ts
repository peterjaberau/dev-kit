import { assign, createMachine } from "xstate"

import { actionMachine } from "./action/action.machine"
import { appInfoMachine } from "./appInfo/appInfo.machine"
import { componentsMachine } from "./components/components.machine"
import { executionMachine } from "./executionTree/execution.machine"
import { layoutInfoMachine } from "./layoutInfo/layoutInfo.machine"
import { CONSTANT_SYSTEM_ACTOR_IDS } from "#actors/constants"

export const currentAppMachine = createMachine({
  entry: assign({
    action: ({ spawn }) => spawn(actionMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_ACTION }),
    appInfo: ({ spawn }) => spawn(appInfoMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_APP_INFO }),
    components: ({ spawn }) => spawn(componentsMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_COMPONENTS }),
    executionTree: ({ spawn }) => spawn(executionMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_EXECUTION }),
    layoutInfo: ({ spawn }) => spawn(layoutInfoMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_LAYOUT_INFO }),
  }),
})
