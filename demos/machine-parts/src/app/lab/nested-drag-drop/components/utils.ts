import { Tree, TreeItem } from "./types"
import { Box } from "@chakra-ui/react"
import { type KeyboardEvent, memo, useMemo, useRef, useState } from "react"
import type { Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/dist/types/list-item"

export const findNodeLocation = (
  items: Tree,
  itemId: string,
  parent?: TreeItem,
): { list: Tree; index: number; parent?: TreeItem } | undefined => {
  const index = items.findIndex((i) => i.id === itemId)

  if (index !== -1) return { list: items, index, parent }

  for (const item of items) {
    if (item.children) {
      const result = findNodeLocation(item.children, itemId, item)

      if (result) return result
    }
  }
}

export const findItem = (items: Tree, itemId: string): TreeItem | undefined => {
  const location = findNodeLocation(items, itemId)

  return location ? location.list[location.index] : undefined
}

export const removeItem = (items: Tree, itemId: string): Tree => {
  return items.reduce((acc: Tree, item) => {
    if (item.id === itemId) return acc

    if (item.children) {
      return [...acc, { ...item, children: removeItem(item.children, itemId) }]
    }

    return [...acc, item]
  }, [])
}

export const insertChild = (items: Tree, targetId: string, newItem: TreeItem): Tree => {
  return items.map((item) => {
    if (item.id === targetId) {
      return {
        ...item,
        children: [newItem, ...(item.children || [])],
      }
    }

    if (item.children) {
      return {
        ...item,
        children: insertChild(item.children, targetId, newItem),
      }
    }

    return item
  })
}

export const insertBefore = (items: Tree, targetId: string, newItem: TreeItem): Tree => {
  return items.flatMap((item) => {
    if (item.id === targetId) return [newItem, item]
    if (item.children) {
      return [{ ...item, children: insertBefore(item.children, targetId, newItem) }]
    }

    return [item]
  })
}

export const insertAfter = (items: Tree, targetId: string, newItem: TreeItem): Tree => {
  return items.flatMap((item) => {
    if (item.id === targetId) return [item, newItem]
    if (item.children) {
      return [{ ...item, children: insertAfter(item.children, targetId, newItem) }]
    }

    return [item]
  })
}

export const moveItem = (items: Tree, itemId: string, direction: "up" | "down" | "indent" | "outdent"): Tree => {
  const location = findNodeLocation(items, itemId)
  if (!location) return items

  const { list, index, parent } = location
  const itemToMove = list[index]
  if (!itemToMove) return items

  const newItems = removeItem(items, itemId)

  if (direction === "up") {
    if (index > 0) {
      const prevSibling = list[index - 1]
      if (!prevSibling) return items

      return insertBefore(newItems, prevSibling.id, itemToMove)
    }
  } else if (direction === "down") {
    if (index < list.length - 1) {
      const nextSibling = list[index + 1]
      if (!nextSibling) return items

      return insertAfter(newItems, nextSibling.id, itemToMove)
    }
  } else if (direction === "indent") {
    if (index > 0) {
      const prevSibling = list[index - 1]
      if (!prevSibling) return items

      return insertChild(newItems, prevSibling.id, itemToMove)
    }
  } else if (direction === "outdent") {
    if (parent) return insertAfter(newItems, parent.id, itemToMove)
  }

  return items
}

export  const getDescendantIds = (item: TreeItem): string[] => {
  return (item.children || []).flatMap((child) => [child.id, ...getDescendantIds(child)])
}