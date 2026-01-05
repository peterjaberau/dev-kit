import type { DropTargetRecord, ElementDragType } from "@atlaskit/pragmatic-drag-and-drop/types"
import type { JSX } from "react"
import type { Instruction } from "./tree-item-hitbox"

/* ------------------------------------------------------------------ */
/* Core primitives                                                     */
/* ------------------------------------------------------------------ */

export type DataType = Record<string, unknown> | undefined
export type IdType = string | number

export type DragStateType = "idle" | "indicator" | "dragging" | "preview" | "parent-of-instruction"

export type IndentSizeType = number
export type IndicatorTypeType = "ghost" | "line"

/* ------------------------------------------------------------------ */
/* Item + drag payloads                                                */
/* ------------------------------------------------------------------ */

export type ItemType<ID extends IdType, D extends DataType = DataType> = {
  id: ID
  data: D

  isDraggable?: boolean
  isExpandable?: boolean
  isOpen?: boolean

  /** Debug flag — single source of truth */
  isDebug?: boolean

  items?: Array<ItemType<ID, D>>
}

export type DropPayloadType<ID extends IdType, D extends DataType> = {
  instruction: Instruction
  source: ElementDragType["payload"] & { data: ItemType<ID, D> }
  target: DropTargetRecord & { data: ItemType<ID, D> }
}

/* ------------------------------------------------------------------ */
/* Render-layer props                                                  */
/* ------------------------------------------------------------------ */

export type ChildPropsType = {
  children: React.ReactNode
  containerRef: React.RefObject<HTMLElement | null>
}

export type RowPropsType<ID extends IdType, D extends DataType> = {
  "aria-controls"?: string
  "aria-expanded"?: boolean

  draggedItem: ItemType<ID, D> | null

  dragHandleRef?: React.RefObject<HTMLElement | null>
  itemRef?: React.RefObject<HTMLElement | null>

  indentLevel: number
  indentSize: IndentSizeType
  indicatorType: IndicatorTypeType

  instruction: Instruction | null
  item: ItemType<ID, D>

  state: DragStateType

  onExpandToggle?: (info: {
    event?: React.MouseEvent | React.KeyboardEvent
    item: ItemType<ID, D>
    isOpen: boolean
  }) => void

  onDebugToggle?: (info: {
    event?: React.MouseEvent | React.KeyboardEvent
    item: ItemType<ID, D>
    isDebug: boolean
  }) => void
}

export type IndicatorPropsType<ID extends IdType, D extends DataType> = {
  instruction: Instruction | null
  indentLevel: number
  indentSize: IndentSizeType
  item?: ItemType<ID, D> | null
}

export type PreviewPropsType<ID extends IdType, D extends DataType> = {
  item: ItemType<ID, D>
}

/* ------------------------------------------------------------------ */
/* SortableTree public props                                           */
/* ------------------------------------------------------------------ */

export type PropsType<ID extends IdType, D extends DataType> = {
  /** Root renderer */
  children: (childProps: ChildPropsType) => JSX.Element

  flashClass?: string
  flashStyle?: React.CSSProperties

  getAllowedDropInstructions?: (payload: {
    source: DropPayloadType<ID, D>["source"]
    target: {
      data: ItemType<ID, D>
      element: Element
    }
  }) => Array<Instruction["type"]>

  indentSize?: IndentSizeType
  indicatorType?: IndicatorTypeType

  items: Array<ItemType<ID, D>>

  onDrop?: (payload: DropPayloadType<ID, D>) => void
  onExpandToggle?: RowPropsType<ID, D>["onExpandToggle"]
  onDebugToggle?: RowPropsType<ID, D>["onDebugToggle"]

  renderIndicator?: (indicatorProps: IndicatorPropsType<ID, D>) => React.ReactNode

  renderPreview?: (previewProps: PreviewPropsType<ID, D>) => React.ReactNode

  renderRow: (rowProps: RowPropsType<ID, D>) => React.ReactNode
}
