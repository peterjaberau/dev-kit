"use client"
import { forwardRef, Fragment, memo, useRef } from "react"
import { useTree, useTreeItem } from "../../selectors"
import { useDndNode } from "../dnd/use-dnd-node"
import { chakra, HStack, Box, Icon, Text, Badge } from "@chakra-ui/react"
import { GroupDropIndicator } from "../dnd/drop-indicator/group"
import { NodeText } from "./node.text"
import { NodeTag } from "./node.tag"
import { Control } from "./control"
import { ControlSpacer } from "./control.spacer"
import { ControlToggleIndicator } from "./control.toggle-indicator"
import { ControlContent } from "./control.content"

const indentPerLevel = 5
const toggleWidth = 4
const spacerWidth = 4

export const Node = memo(
  forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
    const { itemRef, level, index, ...rest } = props

    const {
      dataValue: item,
      treeItemChildrenRef,
      treeItemChildrenIds,
      treeItemChildrenLength,
      isBranch,
      isBranchEmpty,
      isBranchNotEmpty,
      isLeaf,
      sendToTreeItem,
      isOpen,
      isBranchData,
      isBranchNotEmptyData,
      isBranchEmptyData,
      isLeafData,
    } = useTreeItem({ actorRef: itemRef })

    const hasChildren = !!item?.children

    const { dependencies } = useTree()
    const { DropIndicator } = dependencies

    const nodeRef = useRef<HTMLDivElement>(null)
    const groupRef = useRef<HTMLDivElement>(null)

    const { dragState, groupState, instruction } = useDndNode({
      itemRef,
      buttonRef: nodeRef,
      groupRef,
    })

    const aria = (() => {
      if (!item.children?.length || item.children?.length === 0) {
        return undefined
      }
      return {
        "aria-expanded": item.isOpen,
        "aria-controls": `tree-item-${item.id}--subtree`,
      }
    })()

    return (
      <Fragment>
        <chakra.div
          data-scope="node"
          data-part="node"
          flex={1}
          css={{
            display: "flex",
            position: "relative",
            borderRadius: "sm",
            flexGrow: 1,
            // ml: !!item?.children && item.children.length > 0 && -2,
            ...(dragState === "idle" && {
              _hover: {
                backgroundColor: "bg.muted",
              },
            }),
          }}
          ref={ref}
        >
          {/* BRANCH */}
          {/*<HStack css={{*/}
          {/*  display: "flex",*/}
          {/*  alignItems: "center",*/}
          {/*  width: "100%",*/}
          {/*}}>*/}
            <Control
              data-children={item?.children ? item.children.length : undefined}
              data-index={index}
              data-level={level}
              id={`tree-item-${item.id}`}
              level={level}
              itemRef={itemRef}
              ref={nodeRef}
              flex={1}
              css={{
                width: "full",
                position: "relative",
                background: "transparent",
                margin: 0,
                padding: 0,
                borderRadius: 3,
                cursor: "pointer",
                border: 0,
              }}
            >
              <ControlToggleIndicator data-children={isBranchData ? treeItemChildrenLength : undefined} />
              <ControlContent>
                  <NodeText flex={1}>Item {item.id}</NodeText>
                  {item.isDraft && <NodeTag>Draft</NodeTag>}
                  <NodeTag>{hasChildren ? "Branch" : "Leaf"}</NodeTag>
              </ControlContent>
              {instruction ? <DropIndicator instruction={instruction} /> : null}
            </Control>
          {/*</HStack>*/}
        </chakra.div>

        {item.children?.length > 0 && item.isOpen && (
          <chakra.div
            id={aria?.["aria-controls"]}
            pl={indentPerLevel}
            // css={{
            //   paddingLeft: "var(--spacer-size)",
            // }}
            data-scope="node"
            data-part="children"
          >
            <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
              {treeItemChildrenIds?.map((child: any, i: number) => {
                return <Node key={child} itemRef={treeItemChildrenRef[child]} level={level + 1} index={i} />
              })}
            </GroupDropIndicator>
          </chakra.div>
        )}
      </Fragment>
    )
  }),
)
