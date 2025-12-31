"use client"

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react"
import { Container, Center } from "@chakra-ui/react"
import memoizeOne from "memoize-one"
import invariant from "tiny-invariant"

import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region"

import { triggerPostMoveFlash } from "./utils/dnd-flourish"
import {
  getInitialTreeState,
  tree,
  type TreeItem as TreeItemType,
  treeStateReducer,
} from "./data/tree"

import {
  DependencyContext,
  TreeContext,
  type TreeContextValue,
} from "./providers/tree-context"

import TreeItem from "./components/tree-item"
import { GroupDropIndicator } from "../../pragmatic-drag-drop/drop-indicator/group"
import { useDraggableTree } from "./hooks/use-draggable-tree"

/* ------------------------------------------------------------------ */
/* Tree item registry (unchanged)                                      */
/* ------------------------------------------------------------------ */

function createTreeItemRegistry() {
  const registry = new Map<
    string,
    { element: HTMLElement; actionMenuTrigger: HTMLElement }
  >()

  const registerTreeItem = ({
                              itemId,
                              element,
                              actionMenuTrigger,
                            }: {
    itemId: string
    element: HTMLElement
    actionMenuTrigger: HTMLElement
  }) => {
    registry.set(itemId, { element, actionMenuTrigger })
    return () => registry.delete(itemId)
  }

  return { registry, registerTreeItem }
}

/* ------------------------------------------------------------------ */
/* Index                                                               */
/* ------------------------------------------------------------------ */

function Index() {
  const [state, dispatch] = useReducer(
    treeStateReducer,
    null,
    getInitialTreeState,
  )

  const { data, lastAction } = state

  const rootRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)

  const { extractInstruction } = useContext(DependencyContext)

  const [{ registry, registerTreeItem }] = useState(
    createTreeItemRegistry,
  )

  /* ------------------------------------------------------------------ */
  /* Keep latest tree state for callbacks                                */
  /* ------------------------------------------------------------------ */

  const lastStateRef = useRef<TreeItemType[]>(data)

  useEffect(() => {
    lastStateRef.current = data
  }, [data])

  /* ------------------------------------------------------------------ */
  /* Live region announcements + post-move flash                         */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (!lastAction) return

    setTimeout(() => {
      if (lastAction.type === "modal-move") {
        const parentName =
          lastAction.targetId === ""
            ? "the root"
            : `Item ${lastAction.targetId}`

        liveRegion.announce(
          `You've moved Item ${lastAction.itemId} to position ${
            lastAction.index + 1
          } in ${parentName}.`,
        )

        const entry = registry.get(lastAction.itemId)
        if (entry?.element) {
          triggerPostMoveFlash(entry.element)
        }

        entry?.actionMenuTrigger?.focus()
        return
      }

      if (lastAction.type === "instruction") {
        const entry = registry.get(lastAction.itemId)
        if (entry?.element) {
          triggerPostMoveFlash(entry.element)
        }
      }
    })
  }, [lastAction, registry])

  useEffect(() => {
    return () => liveRegion.cleanup()
  }, [])

  /* ------------------------------------------------------------------ */
  /* Tree helpers                                                        */
  /* ------------------------------------------------------------------ */

  const getMoveTargets = useCallback(
    ({ itemId }: { itemId: string }) => {
      const targets: TreeItemType[] = []
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

  const getChildrenOfItem: any = useCallback((itemId: string) => {
    if (itemId === "") return lastStateRef.current
    const item = tree.find(lastStateRef.current, itemId)
    invariant(item)
    return item.children
  }, [])

  /* ------------------------------------------------------------------ */
  /* Context                                                             */
  /* ------------------------------------------------------------------ */

  const context = useMemo<TreeContextValue>(
    () => ({
      dispatch,
      uniqueContextId: Symbol("tree-context"),
      getPathToItem: memoizeOne(
        (targetId: string) =>
          tree.getPathToItem({
            current: lastStateRef.current,
            targetId,
          }) ?? [],
      ),
      getMoveTargets,
      getChildrenOfItem,
      registerTreeItem,
    }),
    [dispatch, getChildrenOfItem, getMoveTargets, registerTreeItem],
  )

  /* ------------------------------------------------------------------ */
  /* Root drag & drop (hook-based)                                        */
  /* ------------------------------------------------------------------ */

  const { groupState } = useDraggableTree({
    rootRef,
    groupRef,
    uniqueContextId: context.uniqueContextId,
    extractInstruction,
    dispatch,
  })

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */

  return (
    <TreeContext.Provider value={context}>
      <Container px={24}>
        <Center
          ref={rootRef}
          css={{ boxShadow: "sm", py: 10 }}
        >
          <GroupDropIndicator
            ref={groupRef}
            isActive={groupState === "is-innermost-over"}
          >
            {data.map((item, index) => (
              <TreeItem
                key={item.id}
                item={item}
                level={0}
                index={index}
              />
            ))}
          </GroupDropIndicator>
          {/*<GroupDropIndicator*/}
          {/*  ref={groupRef}*/}
          {/*  isActive={groupState === "is-innermost-over"}*/}
          {/*>*/}
          {/*  {data.map((item, index) => (*/}
          {/*    <TreeItem*/}
          {/*      key={item.id}*/}
          {/*      item={item}*/}
          {/*      level={0}*/}
          {/*      index={index}*/}
          {/*    />*/}
          {/*  ))}*/}
          {/*</GroupDropIndicator>*/}
        </Center>
      </Container>
    </TreeContext.Provider>
  )
}

export default Index
