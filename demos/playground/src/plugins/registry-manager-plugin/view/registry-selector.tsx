"use client"
import { useDockViewPanel } from "#modules/dockview/actors/selectors"
import RegistryTree from "./registry-tree"
import RegistryViewer from "./registry-viewer"
import { Button } from "@chakra-ui/react"

export default function Index(props: any) {
  const {
    inPanelViewScopeState,
    inPanelViewScopedState,
    panelViewScopeContext,
    panelViewScopedContext,
    sendToPanelView,
  } = useDockViewPanel({
    panelId: props.props.api.id,
  })


  return (
    <>
      {inPanelViewScopeState && <RegistryTree {...props.props} />}
      {inPanelViewScopedState && (
        <>
          <Button size={"sm"} onClick={() => sendToPanelView({ type: "BACK_TO_SCOPE" })}>
            Back
          </Button>
          <RegistryViewer
            id={panelViewScopedContext.targetPanel}
            props={props.props}
          />
        </>
      )}
    </>
  )
}
