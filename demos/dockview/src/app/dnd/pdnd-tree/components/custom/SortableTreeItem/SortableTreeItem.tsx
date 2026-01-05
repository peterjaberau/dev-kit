import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { draggable, dropTargetForElements, monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"
import type { DragLocationHistory } from "@atlaskit/pragmatic-drag-and-drop/types"
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import type { Instruction, ItemMode } from "../tree-item-hitbox"
import { chakra } from "@chakra-ui/react"
import { applyInstructionBlock, attachInstruction, extractInstruction, getInstruction } from "../tree-item-hitbox"
import type { DataType, DragStateType, DropPayloadType, IdType, ItemType, PropsType as SharedPropsType } from "../types"
import { delay } from "../utilities"
type DebugTag = {
  label?: string // optional left box
  value: string // right box
  bg?: string
  color?: string
}

const RESET_STYLE = `
  color: inherit;
  background: transparent;
  padding: 0;
  border-radius: 0;
  font-size: inherit;
`

const debug = (enabled: boolean | undefined, mainLabel: string, payload?: unknown, tags?: DebugTag[]) => {
  if (!enabled) return

  if (tags?.length) {
    // FORMAT STRING:
    // mainLabel %c %c[label]%c[value] %c[label]%c[value]
    let fmt = `%c${mainLabel}`
    const styles: string[] = [RESET_STYLE]

    tags.forEach((tag) => {
      // gap before each tag
      fmt += "  "

      if (tag.label) {
        fmt += "%c%s"
        styles.push(
          `
      
            
            color: ${tag.color ?? "#fff"};
          background: ${tag.bg ?? "#000"};
          border: 1px solid ${tag.bg ?? "black"};
            padding: 1px 3px;
            border-radius: 4px 0 0 4px;
            font-size: 11px;
          `,
          tag.label,
        )
      }

      fmt += "%c%s"
      styles.push(
        `
               color: #000;
            background: transparent;
            border: 1px solid ${tag.bg ?? "black"};
          padding: 1px 3px;
          border-radius: ${tag.label ? "0 4px 4px 0" : "4px"};
          font-size: 11px;
          margin-right: 6px;
        `,
        tag.value,
      )
    })

    // reset after everything
    fmt += " %c"
    styles.push(RESET_STYLE)

    console.groupCollapsed(fmt, ...styles)
  } else {
    console.groupCollapsed(mainLabel)
  }

  if (payload !== undefined) {
    console.log(payload)
  }

  console.trace()
  console.groupEnd()
}

type PropsType<ID extends IdType, D extends DataType> = {
  children: SharedPropsType<ID, D>["renderRow"]
  draggedItem: ItemType<ID, D> | null
  getAllowedDropInstructions: NonNullable<SharedPropsType<ID, D>["getAllowedDropInstructions"]>
  getPathToItem: (itemId: ID) => Array<ID>
  indentLevel: number
  indentSize: NonNullable<SharedPropsType<ID, D>["indentSize"]>
  indicatorType: NonNullable<SharedPropsType<ID, D>["indicatorType"]>
  item: ItemType<ID, D>
  mode: ItemMode
  onExpandToggle?: SharedPropsType<ID, D>["onExpandToggle"]
  onDebugToggle?: SharedPropsType<ID, D>["onDebugToggle"]
  renderIndicator: SharedPropsType<ID, D>["renderIndicator"]
  renderPreview: SharedPropsType<ID, D>["renderPreview"]
  uniqueContextId: symbol
}

function getParentLevelOfInstruction(instruction: Instruction): number {
  if (instruction.type === "instruction-blocked") {
    return getParentLevelOfInstruction(instruction.desired)
  }
  if (instruction.type === "reparent") {
    return instruction.desiredLevel - 1
  }
  return instruction.currentLevel - 1
}

const SortableTreeItem = <ID extends IdType, D extends DataType>({
  children,
  draggedItem,
  getAllowedDropInstructions,
  getPathToItem,
  indentLevel,
  indentSize,
  indicatorType,
  item,
  mode,
  onExpandToggle,
  onDebugToggle,
  renderIndicator,
  renderPreview,
  uniqueContextId,
}: PropsType<ID, D>) => {
  const itemRef = useRef<HTMLElement | null>(null)
  const dragHandleRef = useRef<HTMLElement | null>(null)

  const [state, setState] = useState<DragStateType>("idle")
  const [instruction, setInstruction] = useState<Instruction | null>(null)

  const cancelExpandRef = useRef<(() => void) | null>(null)

  const cancelExpand = useCallback(() => {
    cancelExpandRef.current?.()
    cancelExpandRef.current = null
  }, [])

  const clearParentOfInstructionState = useCallback(() => {
    setState((current) => (current === "parent-of-instruction" ? "idle" : current))
  }, [])

  // When an item has an instruction applied
  // we are highlighting its parent item for improved clarity
  const shouldHighlightParent = useCallback(
    (location: DragLocationHistory): boolean => {
      const target = location.current.dropTargets[0]
      if (!target) return false

      const instruction = extractInstruction(target.data)
      if (!instruction) return false

      const targetId = target.data.id as ID
      if (!targetId) return false

      const path = getPathToItem(targetId)
      const parentLevel = getParentLevelOfInstruction(instruction)
      return path[parentLevel] === item.id
    },
    [getPathToItem, item],
  )

  useEffect(() => {
    if (!itemRef.current) return

    return combine(
      draggable({
        element: itemRef.current,
        dragHandle: dragHandleRef.current ?? undefined,
        canDrag: () => item.isDraggable ?? true,

        getInitialData: ({ input, element, dragHandle }) => {
          debug(
            item.isDebug,
            "DRAGGABLE--getInitialData",
            {
              input,
              element,
              item,
              isOpenOnDragStart: item.isOpen,
              isDebug: item.isDebug,
              uniqueContextId,
            },
            [
              {
                label: "item.id",
                value: String(item.id),
              },
              {
                label: "state",
                value: state,
              },
            ],
          )

          return {
            ...item,
            isOpenOnDragStart: item.isOpen,
            isDebug: item.isDebug,
            uniqueContextId,
          }
        },

        /*

         debug(item.isDebug, "MONITOR_FOR_ELEMENTS--onDragStart", {
            location,
            source,
          })
         */

        onDragStart: ({ source, location }) => {
          setState("dragging")

          debug(
            item.isDebug,
            "DRAGGABLE--onDragStart",
            {
              location,
              source,
              item,
            },
            [
              {
                label: "source(id,#items)",
                //@ts-ignore
                value: `${String(source.data.id)} | ${source.data?.items?.length}`,
              },
              {
                label: "state",
                value: state,
              },
              {
                label: "#source.items",
                value: state,
              },
              {
                label: "loc.current",
                value: `dropTargets[${location?.current?.dropTargets?.length}] | ${location?.current?.dropTargets?.[0]?.data?.id} | ${location?.current?.dropTargets?.[0]?.dropEffect}`,
              },
              {
                label: "loc.init",
                value: `dropTargets[${location?.initial?.dropTargets?.length}] | ${location?.initial?.dropTargets?.[0]?.data?.id} | ${location?.initial?.dropTargets?.[0]?.dropEffect}`,
              },
            ],
          )

          if (source.data.isOpenOnDragStart) {
            onExpandToggle?.({ isOpen: false, item })
          }
        },

        onDrop: ({ source, location }) => {
          setState("idle")

          debug(item.isDebug, "DRAGGABLE--onDrop", {
            location,
            source,
            item,
          })

          if (source.data.isOpenOnDragStart) {
            onExpandToggle?.({ isOpen: true, item })
          }
        },

        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          if (!renderPreview) return

          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({ x: "8px", y: "8px" }),
            render: ({ container }) => {
              const root = createRoot(container)
              root.render(renderPreview({ item }))
              return () => root.unmount()
            },
          })
        },
      }),

      dropTargetForElements({
        element: itemRef.current,
        canDrop: ({ source }) => source.data.uniqueContextId === uniqueContextId,

        getIsSticky: () => true,

        getData: ({ input, element, source }) => {
          const data = { ...item }

          const allowedInstructions = getAllowedDropInstructions({
            source: source as DropPayloadType<ID, D>["source"],
            target: { data, element },
          })

          let nextInstruction: any = getInstruction({
            allowedInstructions,
            currentLevel: indentLevel,
            element,
            indentSize,
            input,
            mode,
          })

          if (!allowedInstructions.includes(nextInstruction.type)) {
            nextInstruction = applyInstructionBlock({
              allowedInstructions,
              desired: nextInstruction,
            })
          }

          debug(
            item.isDebug,
            "DROP_TARGET_FOR_ELEMENTS--getData",
            {
              location,
              source,
              item,

              allowedInstructions,
              nextInstruction,
              attachedInstruction: attachInstruction(data, nextInstruction),
              input,
              element,
            },
            [
              {
                label: "source.data.id",
                value: String(source.data.id),
              },
              {
                label: "state",
                value: state,
              },
              {
                label: "nextInstruction(type, desired.type)",
                value: nextInstruction && `${nextInstruction.type} | ${nextInstruction?.desired?.type}`,
              },
            ],
          )

          return attachInstruction(data, nextInstruction)
        },

        onDrag: ({ self, source, location }) => {
          const nextInstruction = extractInstruction(self.data)

          debug(
            item.isDebug,
            "DROP_TARGET_FOR_ELEMENTS--onDrag",
            {
              self,
              source,
              location,
              extractInstruction: instruction,
              item,
            },

            [
              {
                label: "source(id,#items)",
                //@ts-ignore
                value: `${String(source.data.id)} | ${source.data?.items?.length}`,
              },
              {
                label: "state",
                value: state,
              },
              {
                label: "#source.items",
                value: state,
              },
              {
                label: "loc.current",
                value: `dropTargets[${location?.current?.dropTargets?.length}] | ${location?.current?.dropTargets?.[0]?.data?.id} | ${location?.current?.dropTargets?.[0]?.dropEffect}`,
              },
              {
                label: "loc.init",
                value: `dropTargets[${location?.initial?.dropTargets?.length}] | ${location?.initial?.dropTargets?.[0]?.data?.id} | ${location?.initial?.dropTargets?.[0]?.dropEffect}`,
              },
              {
                label: "self (destination)",
                //@ts-ignore
                value: `dropTargets[${self?.data?.id}]`,
              },
            ],
          )

          if (source.data.id !== item.id) {
            if (
              nextInstruction?.type === "make-child" &&
              item.isExpandable &&
              !item.isOpen &&
              !cancelExpandRef.current
            ) {
              debug(item.isDebug, "-------source.data.id !== item.id---")
              cancelExpandRef.current = delay({
                waitMs: 500,
                fn: () => onExpandToggle?.({ isOpen: true, item }),
              })
            }

            if (nextInstruction?.type !== "make-child") {
              debug(item.isDebug, "-------nextInstruction?.type !== make-child ---")

              cancelExpand()
            }

            setInstruction(nextInstruction)
            return
          }

          if (nextInstruction?.type === "reparent") {
            debug(item.isDebug, "-------nextInstruction?.type === reparent ---")

            setInstruction(nextInstruction)
            return
          }

          setInstruction(null)
        },

        onDragLeave: () => {
          cancelExpand()
          requestAnimationFrame(() => setInstruction(null))
        },

        onDrop: () => {
          cancelExpand()
          setInstruction(null)
        },
      }),

      monitorForElements({
        canMonitor: ({ source }) => source.data.uniqueContextId === uniqueContextId,

        onDrag: ({ location, source }) => {
          if (shouldHighlightParent(location)) {
            setState("parent-of-instruction")
          } else {
            clearParentOfInstructionState()
          }

          debug(
            item.isDebug,
            "MONITOR_FOR_ELEMENTS--onDrag",
            {
              location,
              source,
            },

            [
              {
                label: "source(id,#items)",
                //@ts-ignore
                value: `${String(source.data.id)} | ${source.data?.items?.length}`,
              },
              {
                label: "state",
                value: state,
              },
              {
                label: "#source.items",
                value: state,
              },
              {
                label: "loc.current",
                value: `dropTargets[${location?.current?.dropTargets?.length}] | ${location?.current?.dropTargets?.[0]?.data?.id} | ${location?.current?.dropTargets?.[0]?.dropEffect}`,
              },
              {
                label: "loc.init",
                value: `dropTargets[${location?.initial?.dropTargets?.length}] | ${location?.initial?.dropTargets?.[0]?.data?.id} | ${location?.initial?.dropTargets?.[0]?.dropEffect}`,
              },

            ],
          )
        },

        onDragStart: ({ location, source,  }) => {
          if (shouldHighlightParent(location)) {
            setState("parent-of-instruction")
          }

          debug(item.isDebug, "MONITOR_FOR_ELEMENTS--onDragStart", {
            location,
            source,
          })
        },

        onDrop: clearParentOfInstructionState,
      }),
    )
  }, [
    cancelExpand,
    clearParentOfInstructionState,
    getAllowedDropInstructions,
    getPathToItem,
    indentLevel,
    indentSize,
    item,
    mode,
    onExpandToggle,
    renderPreview,
    shouldHighlightParent,
    uniqueContextId,
  ])

  useEffect(() => cancelExpand, [cancelExpand])

  const subTreeId = `tree-item-${item.id}--subtree`
  const hasChildren = Boolean(item.items?.length)

  return (
    <Fragment>
      {instruction?.type === "reorder-above" &&
        draggedItem &&
        renderIndicator?.({
          indentLevel,
          indentSize,
          instruction,
          item: draggedItem,
        })}

      {children?.({
        "aria-controls": item.isExpandable ? subTreeId : undefined,
        "aria-expanded": item.isExpandable ? item.isOpen : undefined,
        draggedItem,
        dragHandleRef,
        indentLevel,
        indentSize,
        indicatorType,
        instruction,
        item,
        itemRef,
        onExpandToggle,
        onDebugToggle,
        state,
      })}

      {instruction?.type === "reorder-below" &&
        draggedItem &&
        renderIndicator?.({
          indentLevel,
          indentSize,
          instruction,
          item: draggedItem,
        })}

      {hasChildren && item.isOpen && (
        <chakra.ul id={subTreeId} css={{ padding: 0, width: "100%" }}>
          {item.items!.map((child, index, array) => {
            const childMode: ItemMode =
              child.items?.length && child.isOpen
                ? "expanded"
                : index === array.length - 1
                  ? "last-in-group"
                  : "standard"

            return (
              <SortableTreeItem
                key={child.id}
                {...{
                  children,
                  draggedItem,
                  getAllowedDropInstructions,
                  getPathToItem,
                  indentSize,
                  indicatorType,
                  onExpandToggle,
                  onDebugToggle,
                  renderIndicator,
                  renderPreview,
                  uniqueContextId,
                }}
                item={child}
                indentLevel={indentLevel + 1}
                mode={childMode}
              />
            )
          })}

          {instruction?.type === "make-child" &&
            indicatorType === "ghost" &&
            draggedItem &&
            renderIndicator?.({
              indentLevel: indentLevel + 1,
              indentSize,
              instruction: null,
              item: draggedItem,
            })}
        </chakra.ul>
      )}
    </Fragment>
  )
}

export default SortableTreeItem
