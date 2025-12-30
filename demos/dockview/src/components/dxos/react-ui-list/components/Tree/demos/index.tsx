"use client"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { type Instruction, extractInstruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item"
import React, { useEffect } from "react"
import { faker } from "@faker-js/faker"
import { Path } from "../../../util"
import { createTree, updateState } from "../testing"
import { Tree } from "../Tree"
import { Flex, Icon } from "@chakra-ui/react"
import { PiPlaceholder as IconPlaceholder } from "react-icons/pi";

faker.seed(1234)

const initialTree = createTree()
const initialState = new Map<string, any>()

export const TreeDraggableDemo = () => {
  const [tree, setTree] = React.useState(initialTree);
  const [state, setState] = React.useState(initialState);


  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => typeof source.data.id === "string" && Array.isArray(source.data.path),
      onDrop: ({ location, source }) => {
        // Didn't drop on anything.
        if (!location.current.dropTargets.length) {
          return
        }

        const target: any = location.current.dropTargets[0]
        const instruction: Instruction | null = extractInstruction(target.data)
        if (instruction !== null) {
          updateState({
            state: tree,
            instruction,
            source: source.data,
            target: target.data,
          })
        }
      },
    })
  }, [])

  return (
    <Tree
      useItems={(parent?: any) => {
        return parent?.items ?? tree.items
      }}
      draggable={true}
      getProps={(parent: any) => ({
        id: parent.id,
        label: parent.name,
        icon: parent.icon,
        ...((parent.items?.length ?? 0) > 0 && {
          parentOf: parent.items!.map(({ id }: any) => id),
        }),
      })}
      isOpen={(_path: string[]) => {
        const path = Path.create(..._path);
        const object = state.get(path) ?? { open: false, current: false };
        if (!state.has(path)) {
          state.set(path, object);
        }

        return object.open;
      }}
      isCurrent={(_path: string[]) => {
        const path = Path.create(..._path);
        const object = state.get(path) ?? { open: false, current: false };
        if (!state.has(path)) {
          state.set(path, object);
        }

        return object.current;
      }}
      renderColumns={
        () => (
          <Flex alignItems={'center'}>
            <Icon size={'sm'}>
              <IconPlaceholder />
            </Icon>
          </Flex>
        )

      }

      onOpenChange={
        ({ path: _path, open }: any) => {
          const path = Path.create(..._path);
          const object = state.get(path);
          object!.open = open;
        }
      }
      onSelect={
        ({ path: _path, current }: any) => {
          const path = Path.create(..._path);
          const object = state.get(path);
          object!.current = current;
        }
      }
    />
  )
}
