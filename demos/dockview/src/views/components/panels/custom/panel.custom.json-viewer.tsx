import { Container } from "@chakra-ui/react"
import JsonView from "react18-json-view"
import React from "react"
import { useDockViewPanel } from "#actors/model/machines/dock-view"

export const PanelCustomJsonViewer = (props: any) => {

  const dockViewPanel = useDockViewPanel(props.api.id)


  return (
    <Container fluid w="full" h="full" p={3}>
      <JsonView
        src={{
          ...props.params,
          dockViewPanel,
          panelRefInfo: {
            panelState: dockViewPanel.panelState,
            panelContext: dockViewPanel.panelContext,
            id: props.api.id,
            // snapshot: props.params.parentRef.getSnapshot()?.toJSON()
          },
        }}
        collapsed={1}
        theme="github"
        displaySize
        displayArrayIndex
        style={{ fontSize: 13, fontWeight: "bold" }}
      />
    </Container>
  )
}
