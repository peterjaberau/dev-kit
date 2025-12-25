"use client"
import JsonView from "react18-json-view"
import { chakra, Container, Stack, HStack, For, Text, Code, Box } from "@chakra-ui/react"
import React, { forwardRef, memo, Ref, useState } from "react"
import { useApp, useAppRoot, useNode } from "../selectors"
import { CollapseWrapper } from "#views/components/common"
import { Collapsible, useCollapsible } from "@chakra-ui/react"
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

      <Container mt={4} css={{ bg: "bg.panel", borderRadius: "md", boxShadow: "sm", p: 4 }}>
        <JsonViewNode nodeRef={nodeRef} />
      </Container>
    </Stack>
  )
}

// all nodes. it's the one which decide between branch or leaf
export const JsonViewNode = memo(({ nodeRef }: any) => {
  const { childNames, dataRuntimeInfo: dataInfo, getChildNode } = useNode({ actorRef: nodeRef })

  return (
    <Stack css={{ bg: "bg.muted", borderRadius: "md", p: 2 }} gap={2}>
      <For each={childNames}>
        {(item: any, index: any) => {
          const { dataRuntimeInfo: dataChildInfo, nodeRef: nodeChildRef } = useNode({ actorRef: getChildNode(item) })

          return (
            <Box key={index} css={{ bg: "bg.panel", px: 3, py: 2, borderRadius: "md", boxShadow: "xs" }}>
              {dataChildInfo?.isBranch && <JsonViewBranch nodeRef={nodeChildRef} />}
              {dataChildInfo?.isScalar && <JsonViewItem nodeRef={nodeChildRef} />}
            </Box>
          )
        }}
      </For>
    </Stack>
  )
})

/**
 * JsonViewBranch: actually is collapisble component
 * JsonViewBranchControl: the header of the branch that include the indicator + info + trigger
 * JsonViewBranchIndicator: the arrow icon that indicate open/close state
 */

export const JsonViewBranch = ({ nodeRef }: any) => {
  const { dataRuntimeInfo: dataInfo, dataValue, nodeId, displayLabels } = useNode({ actorRef: nodeRef })
  return (
    <Collapsible.Root defaultOpen={false} unstyled>
      <JsonViewBranchTrigger>
        <JsonViewBranchControl nodeRef={nodeRef} />
      </JsonViewBranchTrigger>
      <JsonViewBranchContent nodeRef={nodeRef} />
    </Collapsible.Root>
  )
}

export const JsonViewBranchControl = forwardRef(({ children, nodeRef, ...props }: any, ref: any) => {
  const { dataRuntimeInfo: dataInfo, dataValue, nodeId, displayLabels } = useNode({ actorRef: nodeRef })
  return (
    <HStack justifyContent={"space-between"} alignItems={"center"} flex={1} {...props} ref={ref}>
      <HStack alignItems={"center"} flex={1}>
        <JsonViewBranchIndicator />
        <JsonViewNodeText>{nodeId}</JsonViewNodeText>
      </HStack>
      <HStack>
        <JsonViewNodeLabelText>{displayLabels.childrenCountLabel}</JsonViewNodeLabelText>
        <JsonViewNodeLabelCode>{displayLabels.dataTypeLabel}</JsonViewNodeLabelCode>
      </HStack>
    </HStack>
  )
})

export const JsonViewBranchTrigger = ({ children }: any) => {
  return (
    <Collapsible.Trigger width={"full"} _open={{ pb: 2 }} css={{ cursor: "pointer" }} asChild>
      {children}
    </Collapsible.Trigger>
  )
}

export const JsonViewBranchIndicator = () => {
  return (
    <Collapsible.Indicator transition="transform 0.2s" _open={{ transform: "rotate(90deg)" }}>
      <LuChevronRight />
    </Collapsible.Indicator>
  )
}

export const JsonViewBranchContent = ({ nodeRef }: any) => {
  return (
    <Collapsible.Content>
      <JsonViewNode nodeRef={nodeRef} />
    </Collapsible.Content>
  )
}

export const JsonViewNodeText = ({ children }: any) => {
  return (
    <Text fontWeight={"semibold"} textStyle={"sm"}>
      {children}
    </Text>
  )
}

export const JsonViewNodeLabelText = ({ children }: any) => {
  return (
    <Text
      css={{
        fontWeight: "light",
        fontStyle: "italic",
      }}
      textStyle={"xs"}
    >
      {children}
    </Text>
  )
}

export const JsonViewNodeLabelCode = ({ children }: any) => {
  return (
    <Code>{children}</Code>
  )
}



// the collapsible content of the branch. actually it will render the JsonViewNode inside.
// the text of the branch control

// leaf node
export const JsonViewItem = ({ nodeRef }: any) => {
  const { dataRuntimeInfo: dataInfo, dataValue, nodeId, displayLabels } = useNode({ actorRef: nodeRef })
  return (
    <HStack justifyContent={"space-between"} flex={1}>
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
