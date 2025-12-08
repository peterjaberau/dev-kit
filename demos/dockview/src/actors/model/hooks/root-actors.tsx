import { useRoot } from "./root"
import { getSpawnedActor } from "./utils"
import { ROOT_SYSTEM_IDS } from "../shared/constants"
import { CONSTANT_SYSTEM_ACTOR_IDS } from "#actors/constants"
import { DOCK_VIEW_ENUM } from "#actors/model/machines/dock-view"

export function useRootActors() {
  const { rootRef } = useRoot()

  const rootAppRef = getSpawnedActor(ROOT_SYSTEM_IDS.APP, rootRef)
  const rootSessionRef = getSpawnedActor(ROOT_SYSTEM_IDS.SESSION, rootRef)
  const rootCurrentAppExampleRef = getSpawnedActor(ROOT_SYSTEM_IDS.CURRENT_APP_EXAMPLE, rootRef)

  const rootPluginScopePickerRef = getSpawnedActor(ROOT_SYSTEM_IDS.PLUGIN_SCOPE_PICKER, rootRef)
  const rootDvControllerPluginRef = getSpawnedActor(ROOT_SYSTEM_IDS.PLUGIN_DV_CONTROLLER, rootRef)


  const rootNodeManagerRef = getSpawnedActor(ROOT_SYSTEM_IDS.NODE_MANAGER, rootRef)

  const rootDockAdapterRef = getSpawnedActor(ROOT_SYSTEM_IDS.DOCK_ADAPTER, rootRef)


  const rootPatternRef = getSpawnedActor(ROOT_SYSTEM_IDS.PATTERN, rootRef)


  const rootDockViewAdapterRef = getSpawnedActor(DOCK_VIEW_ENUM.ADAPTER_ID, rootRef)
  const rootDynamicPanelLabRef = getSpawnedActor(DOCK_VIEW_ENUM.DYNAMIC_PANEL_LAB_ACTOR_ID, rootRef)


  /*
  currentApp actors
 */
  const currentAppActorRef = getSpawnedActor(CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP, rootRef)
  const currentAppActionActorRef = getSpawnedActor(CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_ACTION, rootRef)
  const currentAppAppInfoActorRef = getSpawnedActor(CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_APP_INFO, rootRef)
  const currentAppComponentsActorRef = getSpawnedActor(CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_COMPONENTS, rootRef)
  const currentAppExecutionActorRef = getSpawnedActor(CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_EXECUTION, rootRef)
  const currentAppLayoutInfoActorRef = getSpawnedActor(CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_APP_LAYOUT_INFO, rootRef)


  /*
  other actors (console, ai...)
 */
  const configActorRef = getSpawnedActor(CONSTANT_SYSTEM_ACTOR_IDS.CONFIG, rootRef)
  const builderInfoActorRef = getSpawnedActor(CONSTANT_SYSTEM_ACTOR_IDS.BUILDER_INFO, rootRef)
  const resourceActorRef = getSpawnedActor(CONSTANT_SYSTEM_ACTOR_IDS.RESOURCE, rootRef)
  const currentUserActorRef = getSpawnedActor(CONSTANT_SYSTEM_ACTOR_IDS.CURRENT_USER, rootRef)
  const teamActorRef = getSpawnedActor(CONSTANT_SYSTEM_ACTOR_IDS.TEAM, rootRef)

  return {
    rootRef,
    rootAppRef,
    rootSessionRef,
    rootCurrentAppExampleRef,

    rootNodeManagerRef,
    rootDockAdapterRef,
    rootDockViewAdapterRef,
    rootDynamicPanelLabRef,
    rootPatternRef,

    rootPluginScopePickerRef,
    rootDvControllerPluginRef,



    //currentApp actors
    currentAppActorRef,
    currentAppActionActorRef,
    currentAppAppInfoActorRef,
    currentAppComponentsActorRef,
    currentAppExecutionActorRef,
    currentAppLayoutInfoActorRef,

    //other modules actors
    builderInfoActorRef,
    configActorRef,
    resourceActorRef,
    currentUserActorRef,
    teamActorRef,
  }
}
