"use client"
import { useAppRoot, useNode } from "../selectors"
import {
  dropTargetForElements,
  attachListInstruction,
  extractListInstruction,
  attachTreeInstruction,
  extractTreeInstruction,
  DropIndicator,
  TreeDropIndicator,
  GroupDropIndicator,
} from "../components/base/drag-and-drop/dependencies"


export const useDropTarget= ({ actorRef = null } = {}) => {
  const appRoot = useAppRoot()

  const nodeRef = actorRef ?? appRoot?.nodeRef
  const nodeId = nodeRef?.id

}
