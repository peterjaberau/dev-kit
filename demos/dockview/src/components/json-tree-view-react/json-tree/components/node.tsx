import React, { forwardRef } from "react"
import { chakra, Stack, For, Box } from "@chakra-ui/react"
import { useNode } from "../selectors"
import {
  JsonTreeBranch,
  JsonTreeBranchTrigger,
  JsonTreeBranchControl,
  JsonTreeBranchContent,
  JsonTreeBranchIndicator,
  JsonTreeNodeLabel,
  JsonTreeNodeCode,
  JsonTreeNodeKey,
  JsonTreeNodeKeyValue,
  JsonTreeNodeIndicator,
  JsonTreeItem,
  JsonTreeItemControl,
} from "."

export const JsonTreeNode = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { nodeRef, ...rest } = props
  const { childNames, dataRuntimeInfo: dataInfo, getChildNode, nodeId, dataValue, displayLabels } = useNode({ actorRef: nodeRef })

  return (
    <Stack css={{ bg: "transparent",  }} gap={2} ref={ref} {...rest}>
      <Box >
        {dataInfo?.isBranch && (
          <JsonTreeBranch>
            <JsonTreeBranchTrigger >
              <JsonTreeBranchControl>
                <JsonTreeBranchIndicator />
                <JsonTreeNodeKey flex={1}>{nodeId}</JsonTreeNodeKey>
                <JsonTreeNodeLabel>{displayLabels.childrenCountLabel}</JsonTreeNodeLabel>
                <JsonTreeNodeCode>{displayLabels.dataTypeLabel}</JsonTreeNodeCode>
              </JsonTreeBranchControl>
            </JsonTreeBranchTrigger>
              <JsonTreeBranchContent>
                <For each={childNames}>
                  {(child: any, index: any) => {
                    return <JsonTreeNode key={index} nodeRef={getChildNode(child)} />
                  }}
                </For>
              </JsonTreeBranchContent>
          </JsonTreeBranch>
        )}
        {dataInfo?.isScalar && (
          <JsonTreeItem>
            <JsonTreeItemControl>
              <JsonTreeNodeKey>{nodeId}</JsonTreeNodeKey>
              <JsonTreeNodeKeyValue flex={1}>{dataValue}</JsonTreeNodeKeyValue>
              <JsonTreeNodeCode>{displayLabels.dataTypeLabel}</JsonTreeNodeCode>
            </JsonTreeItemControl>
          </JsonTreeItem>
        )}
      </Box>
    </Stack>
  )
})
