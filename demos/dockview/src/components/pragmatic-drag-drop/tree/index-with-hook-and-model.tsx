import { useContext, useEffect, useMemo, useReducer, useRef, useState } from "react"
import { Container, Center } from "@chakra-ui/react"
import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region"

import { getInitialTreeState, treeStateReducer } from "./data/tree"

import { TreeContext, DependencyContext, type TreeContextValue } from "./providers/tree-context"

import TreeItem from "./components/tree-item"
import { GroupDropIndicator } from "../../pragmatic-drag-drop/drop-indicator/group"
import { triggerPostMoveFlash } from "./utils/dnd-flourish"

import { useTreeModel } from "./hooks/use-tree-model"
import { useDraggableTree } from "./hooks/use-draggable-tree"

/* ------------------------------------------------------------------ */

function createTreeItemRegistry() {
  const registry = new Map<string, { element: HTMLElement; actionMenuTrigger: HTMLElement }>()

  return {
    registry,
    registerTreeItem({
                       itemId,
                       element,
                       actionMenuTrigger,
                     }: {
      itemId: string
      element: HTMLElement
      actionMenuTrigger: HTMLElement
    }) {
      registry.set(itemId, { element, actionMenuTrigger })
      return () => registry.delete(itemId)
    },
  }
}

/* ------------------------------------------------------------------ */

function Index() {
  const [state, dispatch] = useReducer(treeStateReducer, null, getInitialTreeState)

  const { data, lastAction } = state
  const { extractInstruction } = useContext(DependencyContext)

  const rootRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)

  const [{ registry, registerTreeItem }] = useState(createTreeItemRegistry)

  /* ---------------- Tree model ---------------- */

  const { lastStateRef, getMoveTargets, getChildrenOfItem, getPathToItem } = useTreeModel({ data })

  /* ---------------- Context ---------------- */

  const context = useMemo<TreeContextValue>(
    () => ({
      dispatch,
      uniqueContextId: Symbol("tree"),
      getMoveTargets,
      getChildrenOfItem,
      getPathToItem,
      registerTreeItem,
    }),
    [dispatch, getMoveTargets, getChildrenOfItem, getPathToItem, registerTreeItem],
  )

  /* ---------------- Root DnD ---------------- */

  const { groupState } = useDraggableTree({
    rootRef,
    groupRef,
    uniqueContextId: context.uniqueContextId,
    extractInstruction,
    dispatch,
  })

  /* ---------------- Live region ---------------- */

  useEffect(() => {
    if (!lastAction) return

    setTimeout(() => {
      const entry = registry.get(lastAction.itemId)
      if (!entry) return

      if (lastAction.type === "modal-move") {
        const parentName = lastAction.targetId === "" ? "the root" : `Item ${lastAction.targetId}`

        liveRegion.announce(
          `You've moved Item ${lastAction.itemId} to position ${lastAction.index + 1} in ${parentName}.`,
        )

        triggerPostMoveFlash(entry.element)
        entry.actionMenuTrigger.focus()
      }

      if (lastAction.type === "instruction") {
        triggerPostMoveFlash(entry.element)
      }
    })
  }, [lastAction, registry])

  useEffect(() => () => liveRegion.cleanup(), [])

  /* ---------------- Render ---------------- */

  return (
    <TreeContext.Provider value={context}>
      <Container px={24}>
        <Center ref={rootRef} css={{ boxShadow: "sm", py: 10 }}>
          <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
            {data.map((item, index) => (
              <TreeItem key={item.id} item={item} level={0} index={index} />
            ))}
          </GroupDropIndicator>
        </Center>
      </Container>
    </TreeContext.Provider>
  )
}

export default Index
