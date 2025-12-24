"use client"
import JsonView from "react18-json-view"
import { chakra, Container, Stack, HStack, For, Text, Code, Box } from "@chakra-ui/react"
import React, { Ref } from "react"
import { useApp, useAppRoot, useNode } from "../selectors"
import { CollapseWrapper } from "#views/components/common"
import { Collapsible } from "@chakra-ui/react"
import { LuChevronRight } from "react-icons/lu"

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
    dataRuntimeInfo,
    dataRuntime,
    dataTypeLabel,
  }: any = useNode()

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
              dataRuntime,
              dataTypeLabel,
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

      <Container mt={4}  css={{ bg: "bg.panel", borderRadius: "md", boxShadow: "sm", p: 4 }}>
        <JsonViewNode nodeRef={nodeRef} />
      </Container>
    </Stack>
  )
}

// all nodes. it's the one which decide between branch or leaf
export const JsonViewNode = ({ nodeRef }: any) => {
  const { childNames, dataRuntimeInfo: dataInfo, getChildNode } = useNode({ actorRef: nodeRef })

  return (
    <Stack css={{ bg: "bg.muted", borderRadius: "md", p: 2 }} gap={2} >
      <For each={childNames}>
        {(item: any, index: any) => {
          const { dataRuntimeInfo: dataChildInfo, nodeRef: nodeChildRef } = useNode({ actorRef: getChildNode(item) })

          return (
            <Box key={index}  asChild>
              {dataChildInfo?.isBranch && <JsonViewBranch nodeRef={nodeChildRef} />}
              {dataChildInfo?.isScalar && <JsonViewItem nodeRef={nodeChildRef} />}
            </Box>
          )
        }}
      </For>
    </Stack>
  )
}

// branch actually is collapisble component
export const JsonViewBranch = ({ nodeRef }: any) => {
  const { dataRuntimeInfo: dataInfo, dataValue, nodeId, displayLabels } = useNode({ actorRef: nodeRef })
  return (
      <Collapsible.Root defaultOpen={false} unstyled css={{ bg: "bg.panel", px: 3, py: 2, borderRadius: "md", boxShadow: "xs",   }}>
        <Collapsible.Trigger width={'full'} _open={{ pb: 2}} css={{ cursor: 'pointer' }} asChild>
          <HStack justifyContent={"space-between"} alignItems={"center"} flex={1}>
            <HStack alignItems={"center"} flex={1}>
              <Collapsible.Indicator transition="transform 0.2s" _open={{ transform: "rotate(90deg)" }}>
                <LuChevronRight />
              </Collapsible.Indicator>
              <Text fontWeight={"semibold"} textStyle={"sm"}>
                {nodeId}
              </Text>
            </HStack>
            <HStack>
              <Text
                css={{
                  fontWeight: "light",
                  fontStyle: "italic",
                }}
                textStyle={"xs"}
              >
                {displayLabels.childrenCountLabel}
              </Text>
              <Code>{displayLabels.dataTypeLabel}</Code>
            </HStack>
          </HStack>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <JsonViewNode nodeRef={nodeRef} />
        </Collapsible.Content>
      </Collapsible.Root>
  )
}
// the header of the branch that include the indicator + info + trigger
export const JsonViewBranchControl = ({ nodeRef }: any) => {}
// the arrow at the right of the branch control
export const JsonViewBranchIndicator = ({ nodeRef }: any) => {}
// the + or - icon to the left
export const JsonViewBranchTrigger = ({ nodeRef }: any) => {}
// the collapsible content of the branch. actually it will render the JsonViewNode inside.
export const JsonViewBranchContent = ({ nodeRef }: any) => {}
// the text of the branch control
export const JsonViewBranchText = ({ nodeRef }: any) => {}

// leaf node
export const JsonViewItem = ({ nodeRef }: any) => {
  const { dataRuntimeInfo: dataInfo, dataValue, nodeId, displayLabels } = useNode({ actorRef: nodeRef })
  return (
    <HStack justifyContent={"space-between"} flex={1} css={{ bg: "bg.panel", px: 3, py: 2, borderRadius: "md", boxShadow: "xs",   }}>
      <HStack flex={1}>
        <Text fontWeight={"semibold"} textStyle={"sm"}>
          {nodeId}:
        </Text>
        <Text fontWeight={"normal"} color={"fg.info"} textStyle={"sm"}>
          {dataValue}
        </Text>
      </HStack>
      <HStack>
        <Code>{displayLabels.dataTypeLabel}</Code>
      </HStack>
    </HStack>
  )
}

// indicator can be placed at the side of the item
export const JsonViewItemIndicator = ({ nodeRef }: any) => {}
export const JsonViewItemText = ({ nodeRef }: any) => {}
