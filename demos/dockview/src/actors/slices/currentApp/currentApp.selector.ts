import { useRootActors } from "#actors/model/hooks"
import { actionSelector } from "./action/action.selector"
import { appInfoSelector } from "./appInfo/appInfo.selector"
import { componentsSelector } from "./components/components.selector"
import { executionSelector } from "./executionTree/execution.selector"
import { layoutInfoSelector } from "./layoutInfo/layoutInfo.selector"

//pass the rootActorRef
export const currentAppSelector = () => {
  const { currentAppActorRef: currentAppRef } = useRootActors()
  const currentAppState = currentAppRef?.getSnapshot()
  const currentAppContext = currentAppState?.context

  const { actionContext } = actionSelector()
  const { appInfoContext } = appInfoSelector()
  const { componentsContext } = componentsSelector()
  const { executionContext } = executionSelector()
  const { layoutInfoContext } = layoutInfoSelector()

  return {
    currentAppRef,
    currentAppState,
    currentAppContext,
    currentApp: {
      action: actionContext,
      appInfo: appInfoContext,
      components: componentsContext,
      execution: executionContext,
      layoutInfo: executionContext,
    },
  }
}
