"use client"

import { useCallback, useEffect, useRef } from "react"
import invariant from "tiny-invariant"
import memoizeOne from "memoize-one"
import { tree, type TreeItem } from "../data/tree"

type Params = {
  data: TreeItem[]
}

export function useTreeModel({ data }: Params) {
  const lastStateRef = useRef<TreeItem[]>(data)

  useEffect(() => {
    lastStateRef.current = data
  }, [data])

  const getMoveTargets = useCallback(
    ({ itemId }: { itemId: string }) => {
      const targets: TreeItem[] = []
      const stack = [...lastStateRef.current]

      while (stack.length) {
        const node: any = stack.pop()
        if (!node) continue
        if (node.id === itemId) continue
        if (node.isDraft) continue

        targets.push(node)
        node.children.forEach((c: any) => stack.push(c))
      }

      return targets
    },
    [],
  )

  const getChildrenOfItem = useCallback((itemId: string) => {
    if (itemId === "") {
      return lastStateRef.current
    }

    const item = tree.find(lastStateRef.current, itemId)
    invariant(item)
    return item.children
  }, [])

  const getPathToItem = memoizeOne((targetId: string) => {
    return (
      tree.getPathToItem({
        current: lastStateRef.current,
        targetId,
      }) ?? []
    )
  })

  return {
    lastStateRef,
    getMoveTargets,
    getChildrenOfItem,
    getPathToItem,
  }
}
