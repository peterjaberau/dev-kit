"use client"
import { Button } from "@chakra-ui/react"
import { useState } from "react"
import { PanelDynamicSelectScope } from "./panel.dynamic.select-scope"
import { PanelDynamicRendered } from "./panel.dynamic.rendered"
import { useDockViewPanel } from "#modules/dockview/actors/selectors"

export const PanelDynamic = (props: any) => {
  const { inPanelViewScopeState, inPanelViewScopedState, panelViewScopeContext, panelViewScopedContext, sendToPanelView } = useDockViewPanel({
    panelId: props.props.api.id,
  })


  return (
    <>
      {inPanelViewScopeState && <PanelDynamicSelectScope {...props.props} />}
      {inPanelViewScopedState && (
        <>
          <PanelDynamicRendered
            toolbar={
              <Button size={"sm"} onClick={() => sendToPanelView({ type: "BACK_TO_SCOPE" })}>
                BACK_TO_SCOPE
              </Button>
            }
            id={panelViewScopedContext.targetPanel}
            props={props.props}
          />
        </>
      )}
    </>
  )
}
