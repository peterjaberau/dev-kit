"use client"
import { Fragment, memo, useCallback, useContext, useEffect, useRef, useState } from "react"
import invariant from "tiny-invariant"

import { Box, Icon, chakra, Text } from "@chakra-ui/react"
import { LuChevronDown as ChevronDownIcon, LuChevronRight as ChevronRightIcon } from "react-icons/lu"
import { type Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import {
  draggable,
  dropTargetForElements,
  type ElementDropTargetEventBasePayload,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"

import { DropIndicator } from "../../components/dnd-drop-indicator"

import { DependencyContext, TreeContext } from "./tree-context"
import { createRoot } from "react-dom/client"



const indentPerLevel = 5

function delay({ waitMs: timeMs, fn }: { waitMs: number; fn: () => void }): () => void {
  let timeoutId: number | null = window.setTimeout(() => {
    timeoutId = null
    fn()
  }, timeMs)
  return function cancel() {
    if (timeoutId) {
      window.clearTimeout(timeoutId)
      timeoutId = null
    }
  }
}

const TreeItem = memo(function TreeItem({ item, level, index }: { item: any; level: number; index: number }) {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const groupRef = useRef<HTMLDivElement | null>(null)

  const [state, setState] = useState<"idle" | "dragging" | "preview">("idle")
  const [groupState, setGroupState] = useState<"is-innermost-over" | "idle">("idle")
  const [instruction, setInstruction] = useState<Instruction | null>(null)
  const cancelExpandRef = useRef<(() => void) | null>(null)

  const { dispatch, uniqueContextId, getPathToItem, registerTreeItem } = useContext(TreeContext)
  const { DropIndicator: DropIndicatorListItem, attachInstruction, extractInstruction } = useContext(DependencyContext)
  const toggleOpen = useCallback(() => {
    dispatch({ type: "toggle", itemId: item.id })
  }, [dispatch, item])

  const cancelExpand = useCallback(() => {
    cancelExpandRef.current?.()
    cancelExpandRef.current = null
  }, [])

  useEffect(() => {
    invariant(buttonRef.current)

    function onChange({ self }: ElementDropTargetEventBasePayload) {
      const instruction = extractInstruction(self.data)

      // expand after 500ms if still merging
      if (instruction?.operation === "combine" && item.children.length && !item.isOpen && !cancelExpandRef.current) {
        cancelExpandRef.current = delay({
          waitMs: 500,
          fn: () => dispatch({ type: "expand", itemId: item.id }),
        })
      }
      if (instruction?.operation !== "combine" && cancelExpandRef.current) {
        cancelExpand()
      }

      setInstruction(instruction)
      return
    }

    return combine(
      draggable({
        element: buttonRef.current,
        getInitialData: () => ({
          id: item.id,
          type: "tree-item",
          isOpenOnDragStart: item.isOpen,
          uniqueContextId,
        }),
        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          setCustomNativeDragPreview({
            getOffset: pointerOutsideOfPreview({ x: "16px", y: "8px" }),
            render: ({ container }) => {
              const root = createRoot(container)
              root.render(null)
              return () => root.unmount()
            },
            nativeSetDragImage,
          })
        },
        onDragStart: ({ source }) => {
          setState("dragging")
          // collapse open items during a drag
          if (source.data.isOpenOnDragStart) {
            dispatch({ type: "collapse", itemId: item.id })
          }
        },
        onDrop: ({ source }) => {
          setState("idle")
          if (source.data.isOpenOnDragStart) {
            dispatch({ type: "expand", itemId: item.id })
          }
        },
      }),
      dropTargetForElements({
        element: buttonRef.current,
        getData: ({ input, element }) => {
          const data = { id: item.id }

          return attachInstruction(data, {
            input,
            element,
            operations: item.isDraft
              ? { combine: "blocked" }
              : {
                  combine: "available",
                  "reorder-before": "available",
                  // Don't allow 'reorder-after' on expanded items
                  "reorder-after": item.isOpen && item.children.length ? "not-available" : "available",
                },
          })
        },
        canDrop: ({ source }) =>
          source.data.type === "tree-item" &&
          source.data.id !== item.id &&
          source.data.uniqueContextId === uniqueContextId,
        onDragEnter: onChange,
        onDrag: onChange,
        onDragLeave: () => {
          cancelExpand()
          setInstruction(null)
        },
        onDrop: () => {
          cancelExpand()
          setInstruction(null)
        },
      }),
    )
  }, [dispatch, item, cancelExpand, uniqueContextId, extractInstruction, attachInstruction, getPathToItem])

  useEffect(() => {
    const group = groupRef.current
    // item has no children or is not open
    if (!group) {
      return
    }

    function onChange({ location, self }: ElementDropTargetEventBasePayload) {
      const [innerMost] = location.current.dropTargets.filter((dropTarget) => dropTarget.data.type === "group")

      setGroupState(innerMost?.element === self.element ? "is-innermost-over" : "idle")
    }

    return dropTargetForElements({
      element: group,
      canDrop: ({ source }) =>
        source.data.type === "tree-item" &&
        source.data.id !== item.id &&
        source.data.uniqueContextId === uniqueContextId,
      getData: () => ({ type: "group" }),
      getIsSticky: () => false,
      onDragStart: onChange,
      onDropTargetChange: onChange,
      onDragLeave: () => setGroupState("idle"),
      onDrop: () => setGroupState("idle"),
    })
  }, [item.id, uniqueContextId])

  useEffect(
    function mount() {
      return function unmount() {
        cancelExpand()
      }
    },
    [cancelExpand],
  )

  const aria = (() => {
    if (!item.children.length) {
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
        css={{
          position: "relative",
          ...(state === "idle" && {
            borderRadius: 3,
            cursor: "pointer",
            _hover: {
              background: "bg.emphasized",
            },
          }),
        }}
      >
        <chakra.button
          {...aria}
          css={{
            color: "fg",
            border: 0,
            width: "100%",
            position: "relative",
            background: "transparent",
            margin: 0,
            padding: 0,
            borderRadius: 3,
            cursor: "pointer",
            boxShadow: "sm",
          }}
          id={`tree-item-${item.id}`}
          onClick={toggleOpen}
          ref={buttonRef}
          type="button"
          data-index={index}
          data-level={level}
          data-testid={`tree-item-${item.id}`}
          focusRing={"border.info"}
        >
          <chakra.span
            css={{
              padding: 2,
              paddingRight: 40,
              gap: 2,
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              background: "transparent",
              borderRadius: 3,
              opacity: state === "dragging" && 0.4,
            }}
          >
            {
              item.children.length > 0 && (
                <Icon>
                  {item.isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </Icon>
              )
            }

            <chakra.span
              css={{
                flexGrow: 1,
                // overflow: "hidden",
                textAlign: "left",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Item {item.id}
            </chakra.span>
          </chakra.span>
          {instruction ? <DropIndicatorListItem instruction={instruction} /> : null}
          <chakra.span
            css={{
              position: "absolute",
              inset: 0,
            }}
            style={{
              left: `calc(-1 * ${level} * ${indentPerLevel}`,
            }}
          />
        </chakra.button>
      </chakra.div>
      {item.children.length && item.isOpen ? (
        <chakra.div
          id={aria?.["aria-controls"]}
          css={{
            paddingLeft: indentPerLevel,
          }}
        >
          <DropIndicator.Group isActive={groupState === "is-innermost-over"} ref={groupRef}>
            {item.children.map((child: any, index: any) => {
              return <TreeItem item={child} key={child.id} level={level + 1} index={index} />
            })}
          </DropIndicator.Group>
        </chakra.div>
      ) : null}
    </Fragment>
  )
})

export default TreeItem
