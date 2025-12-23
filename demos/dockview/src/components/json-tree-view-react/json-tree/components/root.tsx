import { chakra, Container, Stack } from "@chakra-ui/react"
import React, { Ref } from "react"
import { useApp, useAppRoot, useNode, useNodeRoot } from "../selectors"
import { CollapseWrapper } from "#views/components/common"
import JsonView from "react18-json-view"

const Impl = (props: any, ref: Ref<HTMLDivElement>) => {}

export const Root = (props: any) => {
  const { appId, appContext  } = useApp()
  const { appRootId, appRootContext } = useAppRoot()
  const { nodeRootId, nodeRootContext  } = useNodeRoot()

  return (
    <Stack
      css={{
        padding: 0,
        margin: 0,
      }}
    >
      <CollapseWrapper title={`Inspect JsonTree`}>
        <JsonView
          src={{
            app: {
              id: appId,
              context: appContext
            },
            appRoot: {
              id: appRootId,
              context: appRootContext
            },
            nodeRoot: {
              id: nodeRootId,
              context: nodeRootContext
            },
          }}
          collapsed={1}
          theme="github"
          displaySize
          displayArrayIndex
          style={{ fontSize: 13, fontWeight: "bold" }}
        />
      </CollapseWrapper>

    </Stack>
  )
}
