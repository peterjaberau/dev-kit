import { assign, createMachine } from "xstate"
import { appMachine, currentAppExampleMachine, sessionMachine, pluginScopePickerMachine, dvControllerMachine } from "./model/machines"
import { builderInfoMachine } from "./slices/builderInfo/builderInfo.machine"
import { configMachine } from "./slices/config/config.machine"
import { resourceMachine } from "./slices/resource/resource.machine"
import { currentUserMachine } from "./slices/userInfo/currentUser/currentUser.machine"
import { teamMachine } from "./slices/userInfo/team/team.machine"

import { actionMachine } from "./slices/currentApp/action/action.machine"
import { appInfoMachine } from "./slices/currentApp/appInfo/appInfo.machine"
import { componentsMachine } from "./slices/currentApp/components/components.machine"
import { executionMachine } from "./slices/currentApp/executionTree/execution.machine"
import { layoutInfoMachine } from "./slices/currentApp/layoutInfo/layoutInfo.machine"

import { nodeManagerMachine } from './model/machines/node.machine'

import { ROOT_SYSTEM_IDS } from "./model/shared/constants"
import { CONSTANT_SYSTEM_ACTOR_IDS } from './constants'

export const rootMachine = createMachine({
  entry: assign({
    app: ({ spawn }: any) => spawn(appMachine, { systemId: ROOT_SYSTEM_IDS.APP }),
    session: ({ spawn }: any) => spawn(sessionMachine, { systemId: ROOT_SYSTEM_IDS.SESSION }),
    currentAppExample: ({ spawn }: any) => spawn(currentAppExampleMachine, { systemId: ROOT_SYSTEM_IDS.CURRENT_APP_EXAMPLE }),
    // nodeManager: ({ spawn }: any) => spawn(nodeManagerMachine, { systemId: ROOT_SYSTEM_IDS.NODE_MANAGER }),


    pluginScopePicker: ({ spawn }: any) => spawn(pluginScopePickerMachine, { systemId: ROOT_SYSTEM_IDS.PLUGIN_SCOPE_PICKER }),
    dvControllerMachine: ({ spawn }: any) => spawn(dvControllerMachine, { systemId: ROOT_SYSTEM_IDS.PLUGIN_DV_CONTROLLER }),

    builderInfo: ({ spawn }) => spawn(builderInfoMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.BUILDER_INFO }),
    config: ({ spawn }) => spawn(configMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.CONFIG }),
    resource: ({ spawn }) => spawn(resourceMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.RESOURCE }),
    currentUser: ({ spawn }) => spawn(currentUserMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_USER }),
    team: ({ spawn }) => spawn(teamMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.TEAM }),
    currentApp: ({ spawn }) => ({
      action: spawn(actionMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_ACTION }),
      appInfo: spawn(appInfoMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_APP_INFO }),
      components: spawn(componentsMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_COMPONENTS }),
      executionTree: spawn(executionMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_EXECUTION }),
      layoutInfo: spawn(layoutInfoMachine, { systemId: CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_LAYOUT_INFO }),
    }),



  }),
})
