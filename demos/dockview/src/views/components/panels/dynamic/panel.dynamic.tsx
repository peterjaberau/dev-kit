"use client"
import { Wrap, Highlight, Input, Stack, TreeView, createTreeCollection, useFilter, Button } from "@chakra-ui/react"
import { useState } from "react"
import { LuFile, LuFolder } from "react-icons/lu"
import { PanelDynamicSelectScope } from "./panel.dynamic.select-scope"
import { useDynamicPanelLab } from "#actors/model/machines/dynamic-panels"
import { ScrollAreaWrapper } from "../../common"

export const PanelDynamic = (props: any) => {
  const [currentState, setCurrentState] = useState(null)

  const { inScopeState, inScopedState, scopeContext, scopedContext, sendToDynamicPanelLab } = useDynamicPanelLab()

  return (
    <>
      {inScopeState && (
        <>
          <PanelDynamicSelectScope/>
          {/*<Button onClick={() => sendToDynamicPanelLab({ type: "SELECT_SCOPE" })}>SELECT SCOPE</Button>*/}
        </>
      )}
      {inScopedState && (
        <>
          <div>scoped panel</div>
          <Button onClick={() => sendToDynamicPanelLab({ type: "BACK_TO_SCOPE" })}>BACK_TO_SCOPE</Button>
        </>
      )}
    </>
  )
}
