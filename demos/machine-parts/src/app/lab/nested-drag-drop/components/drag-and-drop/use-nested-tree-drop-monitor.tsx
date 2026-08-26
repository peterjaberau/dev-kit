"use client"

import { useEffect, type Dispatch, type SetStateAction } from "react"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { extractInstruction, type Instruction } from "./hitbox"
import type { Tree } from "../types"
import {
  findItem,
  insertAfter,
  insertBefore,
  insertChild,
  removeItem,
} from "../utils"

interface UseNestedTreeDropMonitorProps {
  setItems: Dispatch<SetStateAction<Tree>>
}

export function useNestedTreeDropMonitor({
  setItems,
}: UseNestedTreeDropMonitorProps) {
  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const target = location.current.dropTargets[0]

        if (!target) return

        const sourceId = source.data.id as string
        const targetId = target.data.id as string

        if (sourceId === targetId) return

        const instruction: Instruction | null = extractInstruction(target.data)

        if (!instruction) return
        if (instruction.blocked) return

        setItems((items) => {
          const itemToMove = findItem(items, sourceId)
          if (!itemToMove) return items

          let updatedTree = removeItem(items, sourceId)

          if (instruction.operation === "combine") {
            updatedTree = insertChild(updatedTree, targetId, itemToMove)
          } else if (instruction.operation === "reorder-before") {
            updatedTree = insertBefore(updatedTree, targetId, itemToMove)
          } else if (instruction.operation === "reorder-after") {
            updatedTree = insertAfter(updatedTree, targetId, itemToMove)
          }

          return updatedTree
        })
      },
    })
  }, [setItems])
}
