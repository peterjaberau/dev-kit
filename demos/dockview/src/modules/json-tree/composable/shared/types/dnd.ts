import { ListInstruction, TreeInstruction, ElementDropTargetEventBasePayload} from '../imports'
import React from "react"
export type DraggableMode = "list" | "tree"
export type DropTargetMode = "list-item" | "group" | "tree-item"
export type Instruction = ListInstruction | TreeInstruction

export interface DraggableItemProps {
  id: string
  index: number
  mode?: DraggableMode
  children: React.ReactNode
  style?: React.CSSProperties
  dragStyle?: React.CSSProperties
  getData?: () => Record<string, unknown>
  onDragStart?: () => void
  onDrop?: () => void
  badgeCount?: number // Show count badge on drag preview (only if > 1)
}

export interface DropTargetItemProps {
  id: string
  index?: number
  mode: DropTargetMode
  children: React.ReactNode
  style?: React.CSSProperties
  lineGap?: string
  currentLevel?: number // For tree mode
  indentPerLevel?: number // For tree mode
  getData?: () => Record<string, unknown>
  canDrop?: (sourceData: Record<string, unknown>) => boolean
  validateInstruction?: (
    sourceData: Record<string, unknown>,
    targetData: Record<string, unknown>,
    instruction: Instruction | null,
  ) => boolean
  onDrop: (args: ElementDropTargetEventBasePayload) => void
  onDragEnter?: (args: ElementDropTargetEventBasePayload) => void
  onDragLeave?: (args: ElementDropTargetEventBasePayload) => void
  onDrag?: (args: ElementDropTargetEventBasePayload) => void
}

export type DragPreviewItemProps = {
  children: React.ReactNode
  badgeCount?: number
}


export interface DragSource {
  data: Record<string, unknown>
}

export interface DropLocation {
  current: {
    dropTargets: Array<{
      data: Record<string, unknown>
    }>
  }
}

export interface DropEventData {
  source: DragSource
  location: DropLocation
}

export interface CanDropEventData {
  source: DragSource
}

export interface GetDataArgs {
  input: unknown
  element?: HTMLElement
}

export interface DraggableWrapperProps {
  dragId: string
  index: number
  children: React.ReactNode
  style?: React.CSSProperties
  dragStyle?: React.CSSProperties
  onDragStart?: (data: { dragId: string; index: number }) => void
  onDrop?: () => void
  getData?: () => Record<string, unknown>
}

export interface DropTargetWrapperProps {
  children: React.ReactNode
  style?: React.CSSProperties
  dropStyle?: React.CSSProperties
  onDrop: (data: DropEventData) => void
  canDrop?: (data: CanDropEventData) => boolean
  getData?: (() => Record<string, unknown>) | ((args?: GetDataArgs) => Record<string, unknown>)
  dropTargetId?: string
  onDragEnter?: (data: DropEventData) => void
  onDragLeave?: (data: DropEventData) => void
  onDrag?: (data: DropEventData) => void
}

export interface DragResult {
  source: {
    data: {
      type: string
      dragId: string
      index: number
      [key: string]: any
    }
  }
  location: {
    current: {
      dropTargets: Array<{
        data: {
          type: string
          dropTargetId?: string
          [key: string]: any
        }
      }>
    }
  }
}
