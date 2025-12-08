import { Container } from "@chakra-ui/react"
import JsonView from "react18-json-view"
import React from "react"
import { useDockViewPanel } from "#modules/dockview/actors/selectors"

const Index = (props: any) => {

  const { props: extraProps = null } = props;

  const dockViewPanel = useDockViewPanel(extraProps.api.id)

  return (
    <Container fluid w="full" h="full" p={3}>
      <JsonView
        src={{
          ...extraProps.params,
          dockViewPanel,
          panelRefInfo: {
            panelState: dockViewPanel.panelState,
            panelContext: dockViewPanel.panelContext,
            id: extraProps.api.id,
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

export default Index
