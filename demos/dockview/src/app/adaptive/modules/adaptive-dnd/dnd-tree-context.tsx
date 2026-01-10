import { createContext } from "react"
import { DropIndicator } from "#modules/drag-and-drop/components/dnd/drop-indicator/list-item"
import {
  attachInstruction,
  extractInstruction,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"

export const TreeContext = createContext<{
  uniqueContextId: symbol
}>({
  uniqueContextId: Symbol("tree"),
})

export const DependencyContext = createContext({
  DropIndicator,
  attachInstruction,
  extractInstruction,
})