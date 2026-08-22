import { ReactNode } from "react"
import type { Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/dist/types/list-item"

import {
  draggable,
  dropTargetForElements,
  type ElementGetFeedbackArgs,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"

export type TInternalState =
  | {
      type: "idle"
    }
  | {
      type: "preview"
      container: HTMLElement
      ui: {
        elemBefore?: ReactNode
        content: ReactNode
      }
    }
  | {
      type: "dragging"
    }
  | {
      type: "is-over"
      instruction: Instruction | null
    }

export type TMenuItemDragAndDropState =
  | Exclude<TInternalState, { type: "preview" }>
  | {
      type: "preview"
    }

export type TPDNDDraggableArgs = Required<Parameters<typeof draggable>[0]>
export type TPDNDDropTargetArgs = Required<Parameters<typeof dropTargetForElements>[0]>

export type TDraggableArgs = {
  // Giving this function the same parameters as `getDraggableInitialData`
  getDragPreviewPieces: (args: Parameters<TPDNDDraggableArgs["getInitialData"]>[0]) => {
    elemBefore?: ReactNode
    content: ReactNode
  }
  getInitialData: (args: Parameters<TPDNDDraggableArgs["getInitialData"]>[0]) => Record<string | symbol, unknown>

  canDrag?: TPDNDDraggableArgs["canDrag"]
}
