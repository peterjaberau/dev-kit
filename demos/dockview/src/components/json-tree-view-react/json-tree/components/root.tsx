"use client"
import { chakra, Container, Stack, HStack, For, Text } from "@chakra-ui/react"
import React, { Ref } from "react"
import { useApp, useAppRoot, useNode } from "../selectors"
import { CollapseWrapper } from "#views/components/common"

import JsonView from "react18-json-view"

const Impl = (props: any, ref: Ref<HTMLDivElement>) => {}

export const Root = (props: any) => {
  const { appId, appContext } = useApp()
  const { appRootId, appRootContext } = useAppRoot()
  const {
    nodeRef,
    nodeId,
    sendToNode,
    nodeState,
    nodeContext,
    parentNode,
    childNodes,
    dataConfig,
    dataValue,
    internal,
    childNames,
  } = useNode()

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
            node: {
              nodeId,
              nodeState,
              dataConfig,
              dataValue,
              internal,
              nodeContext,
              nodeRef,
              parentNode,
              childNodes,
              childNames,
            },
            app: {
              id: appId,
              context: appContext,
            },
            appRoot: {
              id: appRootId,
              context: appRootContext,
            },
          }}
          collapsed={2}
          theme="github"
          displaySize
          displayArrayIndex
          style={{ fontSize: 13, fontWeight: "bold" }}
        />
      </CollapseWrapper>

      <Container mt={4} css={{ bg: "bg.panel", borderRadius: "md", boxShadow: "sm", p: 4 }}>
        <JsonViewNode nodeRef={nodeRef} />
      </Container>
    </Stack>
  )
}

// all nodes. it's the one which decide between branch or leaf
export const JsonViewNode = ({ nodeRef }: any) => {
  const { childNames } = useNode({ actorRef: nodeRef })

  return (
    <Stack css={{ bg: "bg.muted", borderRadius: "md", p: 4 }} gap={3}>
      <For each={childNames}>
        {(item: any, index: any) => {
          return (
            <HStack key={index} css={{ bg: "bg.panel", px: 3, py: 2, borderRadius: "md", boxShadow: "xs" }}>
              <Text fontWeight={"semibold"} textStyle={"sm"}>
                {item}
              </Text>
            </HStack>
          )
        }}
      </For>
    </Stack>
  )
}

// branch actually is collapisble component
export const JsonViewBranch = ({ nodeRef }) => {}
// the header of the branch that include the indicator + info + trigger
export const JsonViewBranchControl = ({ nodeRef }) => {}
// the arrow at the right of the branch control
export const JsonViewBranchIndicator = ({ nodeRef }) => {}
// the + or - icon to the left
export const JsonViewBranchTrigger = ({ nodeRef }) => {}
// the collapsible content of the branch. actually it will render the JsonViewNode inside.
export const JsonViewBranchContent = ({ nodeRef }) => {}
// the text of the branch control
export const JsonViewBranchText = ({ nodeRef }) => {}

// leaf node
export const JsonViewItem = ({ nodeRef }) => {}
// indicator can be placed at the side of the item
export const JsonViewItemIndicator = ({ nodeRef }) => {}
export const JsonViewItemText = ({ nodeRef }) => {}
