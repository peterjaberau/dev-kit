import { useState, useEffect, useCallback, useRef } from "react";
// General Utilities
import invariant from "tiny-invariant";
// Pragmatic Drag-and-Drop Core
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";

import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

import { token } from "@atlaskit/tokens";

import {
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

import { getReorderDestinationIndex } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";

import { triggerPostMoveFlash } from "@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region";
// Design System and Primitives
import mergeRefs from "@atlaskit/ds-lib/merge-refs";

// draggable and dropTargetForElements API is exported by this
function useDragAndDropTarget({ todo, index }) {
  const todoRef = useRef(null); // Ref for the todo item
  const dragHandleRef = useRef(null); // Ref for the drag handle
  const [closestEdge, setClosestEdge] = useState(null); // State for the closest edge
  const [draggableState, setDraggableState] = useState({ type: "idle" }); // State for draggable status
  const [registry] = useState(getItemRegistry);
  const dragRef = mergeRefs([todoRef, dragHandleRef]);
  const registerItem= registry.register;
  useEffect(() => {
    const element = todoRef.current;
    const dragHandle = dragHandleRef.current;

    if (!element || !dragHandle) return;

    invariant(element, `Ref for ${todo} is not defined`);
    invariant(dragHandle, `Drag handle ref for ${todo} is not defined`);

    const data = getItemData({ item: todo, index });
    return combine(
      registerItem({ itemId: todo.id, element }),

      // Draggable functionality
      draggable({
        element: dragHandle,
        getInitialData: () => data,
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: token("space.200", "16px"),
              y: token("space.100", "8px"),
            }),
            render({ container }) {
              setDraggableState({ type: "preview", container });

              return () => setDraggableState({ type: "dragging" });
            },
          });
        },
        onDragStart() {
          setDraggableState({ type: "dragging" });
        },
        onDrop() {
          setDraggableState({ type: "idle" });
        },
      }),

      // Drop target functionality
      dropTargetForElements({
        element:element,
        canDrop({ source }) {
          return isItemData(source.data);
        },
        getData({ input }) {
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          });
        },
        onDrag({ self, source }) {
          const isSource = source.element === element;
          if (isSource) {
            setClosestEdge(null);
            return;
          }

          const closestEdge = extractClosestEdge(self.data);
          const sourceIndex = source.data.index;
          invariant(typeof sourceIndex === "number");

          const isItemBeforeSource = index === sourceIndex - 1;
          const isItemAfterSource = index === sourceIndex + 1;

          const isDropIndicatorHidden =
            (isItemBeforeSource && closestEdge === "bottom") ||
            (isItemAfterSource && closestEdge === "top");

          if (isDropIndicatorHidden) {
            setClosestEdge(null);
            return;
          }

          setClosestEdge({
            edge: closestEdge,
          });
        },
        onDragLeave() {
          setClosestEdge(null);
        },
        onDrop() {
          setClosestEdge(null);
        },
      })
    );
  }, [index, todo]);

  return { dragRef, closestEdge, draggableState, DropIndicator };
}

const useMonitorForElements = ({list, setList}) => {
  const [{ items, lastCardMoved }, setListState] = useState({
    items: list, // Initialize with todos
    lastCardMoved: null,
  });

  const [registry] = useState(() => getItemRegistry());

  // Sync list state with the todos prop
  useEffect(() => {
    setListState((prevState) => {
      if (prevState.items !== list) {
        return {
          ...prevState,
          items: list,
        };
      }
      return prevState;
    });
  }, [list]);

  // Function to reorder items
  const reorderItem = useCallback(
    ({ startIndex, indexOfTarget, closestEdgeOfTarget }) => {
      const finishIndex = getReorderDestinationIndex({
        startIndex,
        closestEdgeOfTarget,
        indexOfTarget,
        axis: "vertical",
      });

      if (finishIndex === startIndex) {
        return; // No changes needed
      }

      setListState((listState) => {
        const item = listState.items[startIndex];
        const reorderedItems = reorder({
          list: listState.items,
          startIndex,
          finishIndex,
        });
        return {
          items: reorderedItems,
          lastCardMoved: {
            item,
            previousIndex: startIndex,
            currentIndex: finishIndex,
            numberOfItems: listState.items.length,
          },
        };
      });

      setList((prev) => {
        const reorderedTodos = reorder({
          list: prev,
          startIndex,
          finishIndex,
        });

        return reorderedTodos;
      });
    },
    []
  );

  // Monitor onDrop to handle reordering
  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return isItemData(source.data);
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;
        if (!isItemData(sourceData) || !isItemData(targetData)) {
          return;
        }

        const indexOfTarget = items.findIndex(
          (item) => item.id === targetData.item.id
        );
        if (indexOfTarget < 0) {
          return;
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        reorderItem({
          startIndex: sourceData.index,
          indexOfTarget,
          closestEdgeOfTarget,
        });
      },
    });
  }, [items, reorderItem]);

  // Handle post-drop actions
  useEffect(() => {
    if (lastCardMoved === null) {
      return;
    }

    const { item, previousIndex, currentIndex, numberOfItems } = lastCardMoved;
    const element = registry.getElement(item.id);
    if (element) {
      triggerPostMoveFlash(element);
    }

    liveRegion.announce(
      `You've moved ${item.text} from position ${
        previousIndex + 1
      } to position ${currentIndex + 1} of ${numberOfItems}.`
    );
  }, [lastCardMoved, registry, liveRegion]);

  // Cleanup live region when the hook is unmounted
  useEffect(() => {
    return () => {
      liveRegion.cleanup();
    };
  }, [liveRegion]);

};

const itemKey = Symbol("item");

function getItemData({ item, index, instanceId }) {
  return {
    [itemKey]: true,
    item,
    index,
    instanceId,
  };
}

function isItemData(data) {
  return data[itemKey] === true;
}
function getItemRegistry() {
  const registry = new Map();

  function register({ itemId, element }) {
    registry.set(itemId, element);
    return function unregister() {
      registry.delete(itemId);
    };
  }

  function getElement(itemId) {
    return registry.get(itemId) ?? null;
  }

  return { register, getElement };
}

export {useDragAndDropTarget, useMonitorForElements};
