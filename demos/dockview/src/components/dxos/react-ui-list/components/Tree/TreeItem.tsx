import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import {
  type Instruction,
  type ItemMode,
  attachInstruction,
  extractInstruction,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item"
import React, { type FC, type KeyboardEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from "react"

import invariant from "tiny-invariant"
import { Treegrid } from "./Treegrid"
import { TreeDropIndicator } from "./TreeDropIndicator"


import { DEFAULT_INDENTATION, paddingIndentation } from "./helpers"
import { useTree } from "./TreeContext"
import { TreeItemHeading } from "./TreeItemHeading"
import { TreeItemToggle } from "./TreeItemToggle"

const hoverableDescriptionIcons =
  "[--icons-color:inherit] hover-hover:[--icons-color:var(--description-text)] hover-hover:hover:[--icons-color:inherit] focus-within:[--icons-color:inherit]"

type TreeItemState = "idle" | "dragging" | "preview" | "parent-of-instruction"

export type TreeData = {
  id: string
  path: string[]
  item: unknown
}

export const isTreeData = (data: unknown): data is TreeData => {
  if (typeof data !== 'object' || data === null) return false

  const d = data as Record<string, unknown>

  return (
    typeof d.id === 'string' &&
    Array.isArray(d.path) &&
    d.path.every((p) => typeof p === 'string') &&
    'item' in d
  )
}


const RawTreeItem = ({
  item,
  path: _path,
  levelOffset = 2,
  last,
  draggable: _draggable,
  renderColumns: Columns,
  blockInstruction,
  canDrop,
  canSelect,
  onOpenChange,
  onSelect,
}: any) => {
  const rowRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const openRef = useRef(false)
  const cancelExpandRef = useRef<NodeJS.Timeout | null>(null)
  const [_state, setState] = useState<TreeItemState>("idle")
  const [instruction, setInstruction] = useState<Instruction | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const { useItems, getProps, isOpen, isCurrent } = useTree()
  const items = useItems(item)
  const { id, parentOf, label, css, headingCss, icon, iconHue, disabled, testId } = getProps(item, _path)
  const path = useMemo(() => [..._path, id], [_path, id])
  const open = isOpen(path, item)
  const current = isCurrent(path, item)
  const level = path.length - levelOffset
  const isBranch = !!parentOf
  const mode: ItemMode = last ? "last-in-group" : open ? "expanded" : "standard"
  const canSelectItem = canSelect?.({ item, path }) ?? true

  const cancelExpand = useCallback(() => {
    if (cancelExpandRef.current) {
      clearTimeout(cancelExpandRef.current)
      cancelExpandRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!_draggable) {
      return
    }

    invariant(buttonRef.current)

    const data = { id, path, item } satisfies TreeData

    // https://atlassian.design/components/pragmatic-drag-and-drop/core-package/adapters/element/about
    return combine(
      draggable({
        element: buttonRef.current,
        getInitialData: () => data,
        onDragStart: () => {
          setState("dragging")
          if (open) {
            openRef.current = true
            onOpenChange?.({ item, path, open: false })
          }
        },
        onDrop: () => {
          setState("idle")
          if (openRef.current) {
            onOpenChange?.({ item, path, open: true })
          }
        },
      }),
      // https://github.com/atlassian/pragmatic-drag-and-drop/blob/main/packages/hitbox/constellation/index/about.mdx
      dropTargetForElements({
        element: buttonRef.current,
        getData: ({ input, element }) => {
          return attachInstruction(data, {
            input,
            element,
            indentPerLevel: DEFAULT_INDENTATION,
            currentLevel: level,
            mode,
            block: isBranch ? [] : ["make-child"],
          })
        },
        canDrop: ({ source }) => {
          const _canDrop = canDrop ?? (() => true)
          return source.element !== buttonRef.current && _canDrop({ source: source.data as TreeData, target: data })
        },
        getIsSticky: () => true,
        onDrag: ({ self, source }) => {
          const desired = extractInstruction(self.data)
          const block =
            desired && blockInstruction?.({ instruction: desired, source: source.data as TreeData, target: data })
          const instruction: Instruction | null =
            block && desired.type !== "instruction-blocked" ? { type: "instruction-blocked", desired } : desired

          if (source.data.id !== id) {
            if (instruction?.type === "make-child" && isBranch && !open && !cancelExpandRef.current) {
              cancelExpandRef.current = setTimeout(() => {
                onOpenChange?.({ item, path, open: true })
              }, 500)
            }

            if (instruction?.type !== "make-child") {
              cancelExpand()
            }

            setInstruction(instruction)
          } else if (instruction?.type === "reparent") {
            // TODO(wittjosiah): This is not occurring in the current implementation.
            setInstruction(instruction)
          } else {
            setInstruction(null)
          }
        },
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
  }, [_draggable, item, id, mode, path, open, blockInstruction, canDrop])

  // Cancel expand on unmount.
  useEffect(() => () => cancelExpand(), [cancelExpand])

  const handleOpenToggle = useCallback(
    () => onOpenChange?.({ item, path, open: !open }),
    [onOpenChange, item, path, open],
  )

  const handleSelect = useCallback(
    (option = false) => {
      // If the item is a branch, toggle it if:
      //   - also holding down the option key
      //   - or the item is currently selected
      if (isBranch && (option || current)) {
        handleOpenToggle()
      } else if (canSelectItem) {
        canSelect?.({ item, path })
        rowRef.current?.focus()
        onSelect?.({ item, path, current: !current, option })
      }
    },
    [item, path, current, isBranch, canSelectItem, handleOpenToggle, onSelect],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
        case "ArrowLeft":
          isBranch && handleOpenToggle()
          break
      }
    },
    [isBranch, open, handleOpenToggle, handleSelect],
  )

  return (
    <>
      <Treegrid.Row
        ref={rowRef}
        key={id}
        id={id}
        aria-labelledby={`${id}__label`}
        parentOf={parentOf?.join(Treegrid.PARENT_OF_SEPARATOR)}
        css={{
          display: "grid",
          gridTemplateColumns: "subgrid",
          gridColumn: "tree-row",
          marginBlockStart: "0.125rem",

          /* base state */
          "--controls-opacity": 1,
          "--icons-color": "inherit",

          /* aria-current */
          "&[aria-current]": {
            backgroundColor: "var(--activeSurface)",
          },

          /* hover-capable devices: default hover state */
          "@media (hover: hover)": {
            "&": {
              "--controls-opacity": 0,
              "--icons-color": "var(--description-text)",
            },
            "&:hover": {
              "--controls-opacity": 1,
              "--icons-color": "inherit",
            },
          },

          /* hover + focus visuals */
          "&:hover": {
            backgroundColor: "var(--hoverSurface)",
          },

          /* focus-within (mouse + keyboard) */
          "&:focus-within": {
            backgroundColor: "var(--hoverSurface)",
            "--controls-opacity": 1,
            "--icons-color": "inherit",
          },

          /* keyboard focus only */
          "&:focus-visible": {
            "--controls-opacity": 1,
          },
          ...css
        }}

        data-object-id={id}
        data-testid={testId}
        // NOTE(thure): This is intentionally an empty string to for descendents to select by in the CSS
        //   without alerting the user (except for in the correct link element). See also:
        //   https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current#description
        aria-current={current ? ("" as "page") : undefined}
        onKeyDown={handleKeyDown}
        onContextMenu={(event: any) => {
          event.preventDefault()
          setMenuOpen(true)
        }}
      >
        <div
          role="none"
          className="indent relative col-[tree-row] grid grid-cols-subgrid"
          style={paddingIndentation(level)}
        >
          <Treegrid.Cell classNames="flex items-center">
            <TreeItemToggle isBranch={isBranch} open={open} onClick={handleOpenToggle} />
            <TreeItemHeading
              disabled={disabled}
              current={current}
              css={headingCss}
              onSelect={handleSelect}
              ref={buttonRef}
            />
          </Treegrid.Cell>
          {Columns && <Columns item={item} path={path} open={open} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
          {instruction && <TreeDropIndicator instruction={instruction} gap={2} />}
        </div>
      </Treegrid.Row>
      {open &&
        items.map((item, index) => (
          <TreeItem
            key={item.id}
            item={item}
            path={path}
            last={index === items.length - 1}
            draggable={_draggable}
            renderColumns={Columns}
            blockInstruction={blockInstruction}
            canDrop={canDrop}
            canSelect={canSelect}
            onOpenChange={onOpenChange}
            onSelect={onSelect}
          />
        ))}
    </>
  )
}

export const TreeItem = memo(RawTreeItem)
