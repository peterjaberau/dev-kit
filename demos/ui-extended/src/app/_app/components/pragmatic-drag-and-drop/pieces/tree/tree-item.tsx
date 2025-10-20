'use client'
import { Fragment, memo, useCallback, useContext, useEffect, useRef, useState } from "react"
import invariant from "tiny-invariant"

import { Box, Icon as ChakraIcon, chakra, Text } from "@chakra-ui/react"
import { LuChevronDown as ChevronDownIcon, LuChevronRight as ChevronRightIcon, LuEllipsis as MoreIcon } from "react-icons/lu"
import { type Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"
import { GroupDropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/group"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { draggable, dropTargetForElements, type ElementDropTargetEventBasePayload } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"

import { DependencyContext, TreeContext } from "./tree-context"
import { createRoot } from "react-dom/client"
const iconColor = "gray.solid"

function ChildIcon() {
  return <Box borderRadius="full" backgroundColor={iconColor} width={"6px"} height={"6px"}></Box>
}

function GroupIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <ChakraIcon size={"sm"} color={iconColor}>
      {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
    </ChakraIcon>
  )
}

function Icon({ item }: any) {
  if (!item.children.length) {
    return <ChildIcon />
  }
  return <GroupIcon isOpen={item.isOpen ?? false} />
}

const outerStyles = {
  position: "relative",
}

const outerButtonStyles = {
  color: "fg",
  border: 0,
  width: "100%",
  position: "relative",
  background: "transparent",
  margin: 0,
  padding: 0,
  borderRadius: 3,
  cursor: "pointer",
}

const outerHoverStyles = {
  borderRadius: 3,
  cursor: "pointer",
  _hover: {
    background: "bg.emphasized",
  },
}

const innerDraggingStyles = {
  opacity: 0.4,
}

const innerButtonStyles = {
  padding: 2,
  paddingRight: 40,
  gap:2,
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  background: "transparent",
  borderRadius: 3,
}

const idStyles = {
  margin: 0,
  color: "fg.muted",
}

const labelStyles = {
  flexGrow: 1,
  // overflow: "hidden",
  textAlign: "left",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}

const indentPerLevel = 5

const indentStyles = {
  paddingLeft: indentPerLevel,
}

const fullWidthStyle = {
  position: "absolute",
  inset: 0,
}

const previewStyles = {
  background: "red",
  padding: 2,
  borderRadius: 3,
}

function Preview({ item }: { item: any }) {
  return <chakra.div css={previewStyles}>Item {item.id}</chakra.div>
}

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
  const { DropIndicator, attachInstruction, extractInstruction } = useContext(DependencyContext)
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
        canDrop: ({ source }) => source.data.type === "tree-item" && source.data.id !== item.id && source.data.uniqueContextId === uniqueContextId,
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
      canDrop: ({ source }) => source.data.type === "tree-item" && source.data.id !== item.id && source.data.uniqueContextId === uniqueContextId,
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

  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false)
  const openMoveDialog = useCallback(() => {
    setIsMoveDialogOpen(true)
  }, [])
  const closeMoveDialog = useCallback(() => {
    setIsMoveDialogOpen(false)
  }, [])

  return (
    <Fragment>
      <chakra.div css={[outerStyles, state === "idle" ? outerHoverStyles : undefined]}>
        <chakra.button
          {...aria}
          css={[outerButtonStyles]}
          id={`tree-item-${item.id}`}
          onClick={toggleOpen}
          ref={buttonRef}
          type="button"
          data-index={index}
          data-level={level}
          data-testid={`tree-item-${item.id}`}
          focusRing={"border.info"}
        >
          <chakra.span css={[innerButtonStyles, state === "dragging" ? innerDraggingStyles : undefined]}>
            <Icon item={item} />
            <chakra.span css={labelStyles}>Item {item.id}</chakra.span>
          </chakra.span>
          {instruction ? <DropIndicator instruction={instruction} /> : null}
          <chakra.span
            css={fullWidthStyle}
            style={{
              left: `calc(-1 * ${level} * ${indentPerLevel}`,
            }}
          />
        </chakra.button>
      </chakra.div>
      {item.children.length && item.isOpen ? (
        <chakra.div id={aria?.["aria-controls"]} css={indentStyles}>
          <GroupDropIndicator isActive={groupState === "is-innermost-over"} ref={groupRef}>
            {item.children.map((child: any, index: any) => {
              return <TreeItem item={child} key={child.id} level={level + 1} index={index} />
            })}
          </GroupDropIndicator>
        </chakra.div>
      ) : null}
    </Fragment>
  )
})

export default TreeItem
