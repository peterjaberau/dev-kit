import { chakra, Container, Stack } from "@chakra-ui/react"
import React, { Ref } from "react"
import { useApp, useRoot, useNodeRoot, useNodeTreeRoot } from "../selectors"
import { data } from "#datasets/metadata"
import { CollapseWrapper } from "#views/components/common"
import JsonView from "react18-json-view"

const Impl = (props: any, ref: Ref<HTMLDivElement>) => {}

export const Root = (props: any) => {
  const { appId, appContext  } = useApp()
  const { rootId, rootContext } = useRoot()
  const { nodeRootId, nodeRootContext  } = useNodeRoot()
  const { nodeTreeRootId, nodeTreeRootContext } = useNodeTreeRoot()

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
            root: {
              id: rootId,
              context: rootContext
            },
            nodeRoot: {
              id: nodeRootId,
              context: nodeRootContext,
              config: nodeRootContext?.config,
              relations: nodeRootContext?.refs?.relations,
              info: nodeRootContext?.info
            },
            nodeTreeRoot: {
              id: nodeTreeRootId,
              context: nodeTreeRootContext
            }
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
