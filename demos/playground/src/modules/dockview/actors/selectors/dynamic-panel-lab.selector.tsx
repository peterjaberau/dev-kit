'use client'
import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"
import { createTreeCollection } from "@chakra-ui/react"

export const useDynamicPanelLab = () => {
  const { rootDynamicPanelLabRef: dynamiPanelLab } = useRootActors()

  const dynamicPanelLabState: any = useSelector(dynamiPanelLab, (state) => state)
  const dynamicPanelLabContext = dynamicPanelLabState?.context
  const sendToDynamicPanelLab = dynamiPanelLab?.send

  const inScopeState = dynamicPanelLabState.matches("scope")
  const inScopedState = dynamicPanelLabState.matches("scoped")

  // Scope logic
  const scopeContext = {
    collection: createTreeCollection<any>({
      nodeToValue: (node) => node.id,
      nodeToString: (node) => node.name,
      rootNode: dynamicPanelLabContext.scope.collection,
    }),
    defaultExpanded: ["panels"],
    selectedValue: [],
    filter: {
      sensitivity: "base",
    }
  }



  // Scoped logic
  const scopedContext = dynamicPanelLabContext.scoped || {}


  return {
    dynamiPanelLab,
    dynamicPanelLabState,
    dynamicPanelLabContext,
    sendToDynamicPanelLab,

    inScopeState,
    inScopedState,

    scopeContext,
    scopedContext,
  }

}
