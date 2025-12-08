"use client"
import { Wrap, Highlight, Input, Stack, TreeView, createTreeCollection, useFilter, Button } from "@chakra-ui/react"
import { useState } from "react"
import { LuFile, LuFolder } from "react-icons/lu"
import { PanelDynamicSelectScope } from "./panel.dynamic.select-scope"
import { useDynamicPanelLab } from "#modules/dockview/actors/selectors"
import { ScrollAreaWrapper } from "../../common"
import { PanelDynamicRendered } from "./panel.dynamic.rendered"

export const PanelDynamic = (props: any) => {
  const [currentState, setCurrentState] = useState(null)
  const { inScopeState, inScopedState, scopeContext, scopedContext, sendToDynamicPanelLab } = useDynamicPanelLab()

  return (
    <>
      {inScopeState && (
        <PanelDynamicSelectScope />
      )}
      {inScopedState && (
        <>
          <PanelDynamicRendered
            toolbar={
              <Button size={'sm'} onClick={() => sendToDynamicPanelLab({ type: "BACK_TO_SCOPE" })}>BACK_TO_SCOPE</Button>
            }
            id={scopedContext.targetPanel}
            props={props}
          />
        </>
      )}
    </>
  )
}
