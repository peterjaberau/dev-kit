import React, { forwardRef } from "react"
import { Stack, For, Box } from "@chakra-ui/react"
import { useNode } from "../../selectors"
import {
  Branch,
  BranchTrigger,
  BranchControl,
  BranchContent,
  BranchIndicator,
  NodeLabel,
  NodeCode,
  NodeKey,
  NodeKeyValue,
  NodeIndicator,
  ItemDraggable,
  ItemControl,
} from "."

export const NodeDraggable = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { nodeRef, ...rest } = props
  const {
    childNames,
    dataRuntimeInfo: dataInfo,
    getChildNode,
    nodeId,
    dataValue,
    displayLabels,
  } = useNode({ actorRef: nodeRef })

  return (
    <Stack gap={2} ref={ref} {...rest}>
      <Box asChild>
        {dataInfo?.isBranch && (
          <Branch data-id={nodeId}>
            {/* always BranchControl or BranchTrigger when it comes first, consider asChild*/}
            <BranchControl asChild>
              <BranchTrigger>
                <BranchIndicator />
                <NodeKey flex={1}>{nodeId}</NodeKey>
                <NodeLabel>{displayLabels.childrenCountLabel}</NodeLabel>
                <NodeCode>{displayLabels.dataTypeLabel}</NodeCode>
              </BranchTrigger>
            </BranchControl>
            <BranchContent>
              <For each={childNames}>
                {(child: any, index: any) => {
                  return <NodeDraggable key={index} nodeRef={getChildNode(child)} />
                }}
              </For>
            </BranchContent>
          </Branch>
        )}
        {dataInfo?.isScalar && (
          <ItemDraggable>
            <ItemControl>
              <NodeKey>{nodeId}</NodeKey>
              <NodeKeyValue flex={1}>{dataValue}</NodeKeyValue>
              <NodeCode>{displayLabels.dataTypeLabel}</NodeCode>
            </ItemControl>
          </ItemDraggable>
        )}
      </Box>
    </Stack>
  )
})
