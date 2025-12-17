import { Container } from "@chakra-ui/react"
import JsonView from "react18-json-view"
import React from "react"
import { useOas } from "#modules/dockview/actors/selectors/okas.selector"

const Index = (props: any) => {
  const { id, api, params } = props

  const { oasContext } = useOas()



  return (
    <Container fluid w="full" h="full" p={3}>
      <JsonView
        src={{
          apiSpec: oasContext.props.apiSpec,
          oas: oasContext.instance.oas,
          cache: {
            executionCache: oasContext.executionCache
          }
        }}
        collapsed={2}
        theme="github"
        displaySize
        displayArrayIndex
        style={{ fontSize: 13, fontWeight: "bold" }}
      />
    </Container>
  )
}

export default Index
