import { createContext } from "@radix-ui/react-context"
import { LuGripVertical } from 'react-icons/lu';
import { createContext as chakraCreateContext, chakra, CloseButton, Button, List, Icon, IconButton } from "@chakra-ui/react"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"
import { type Edge, attachClosestEdge, extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { ListDropIndicator } from './ListDropIndicator'
import React, {
  type ComponentProps,
  type HTMLAttributes,
  type RefObject,
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"

import invariant from "tiny-invariant"

import { useListContext } from "./ListRoot"

export type ListItemRecord = any

export type ItemDragState =
  | {
      type: "idle"
    }
  | {
      type: "preview"
      container: HTMLElement
    }
  | {
      type: "is-dragging"
    }
  | {
      type: "is-dragging-over"
      closestEdge: Edge | null
    }

export const idle: ItemDragState = { type: "idle" }

const stateStyles: { [Key in ItemDragState["type"]]?: HTMLAttributes<HTMLDivElement>["className"] } = {
  "is-dragging": "opacity-50",
}

type ListItemContext<T extends ListItemRecord> = {
  item: T
  dragHandleRef: RefObject<HTMLElement | null>
}

/**
 * Default context defined for ListItemDragPreview, which is defined outside of ListItem.
 */
const defaultContext: any = {}

const LIST_ITEM_NAME = "ListItem"

// export const [ListItemChakraProvider, useListItemChakraContext] = chakraCreateContext<any>(
//   {
//     name: LIST_ITEM_NAME,
//     defaultValue: defaultContext,
//     providerName: 'ListItemProvider',
//     hookName: 'useListItemChakraContext',
//   }
// );

export const [ListItemProvider, useListItemContext] = createContext<any>(LIST_ITEM_NAME, defaultContext)

/**
 * Draggable list item.
 */
export const ListItem = <T extends ListItemRecord>({ children, css, item, ...props }: any) => {
  const { isItem, readonly, dragPreview, setState: setRootState } = useListContext(LIST_ITEM_NAME)
  const ref = useRef<HTMLDivElement | null>(null)
  const dragHandleRef = useRef<HTMLElement | null>(null)
  const [state, setState] = useState<ItemDragState>(idle)

  useEffect(() => {
    const element = ref.current
    invariant(element)
    return combine(
      //
      // https://atlassian.design/components/pragmatic-drag-and-drop/core-package/adapters/element/about#draggable
      //
      draggable({
        element,
        dragHandle: dragHandleRef.current!,
        canDrag: () => !readonly,
        getInitialData: () => item as any,
        onGenerateDragPreview: dragPreview
          ? ({ nativeSetDragImage, source }) => {
              const rect = source.element.getBoundingClientRect()
              setCustomNativeDragPreview({
                nativeSetDragImage,
                getOffset: ({ container }) => {
                  const { height } = container.getBoundingClientRect()
                  return { x: 20, y: height / 2 }
                },
                render: ({ container }) => {
                  container.style.width = rect.width + "px"
                  setState({ type: "preview", container })
                  setRootState({ type: "preview", container, item })
                  return () => {} // TODO(burdon): Cleanup.
                },
              })
            }
          : undefined,
        onDragStart: () => {
          setState({ type: "is-dragging" })
          setRootState({ type: "is-dragging", item })
        },
        onDrop: () => {
          setState(idle)
          setRootState(idle)
        },
      }),

      //
      // https://atlassian.design/components/pragmatic-drag-and-drop/core-package/adapters/element/about#drop-target-for-elements
      //
      dropTargetForElements({
        element,
        canDrop: ({ source }) => {
          return (source.element !== element && isItem?.(source.data)) ?? false
        },
        getData: ({ input }) => {
          return attachClosestEdge(item as any, { element, input, allowedEdges: ["top", "bottom"] })
        },
        getIsSticky: () => true,
        onDragEnter: ({ self }) => {
          const closestEdge = extractClosestEdge(self.data)
          setState({ type: "is-dragging-over", closestEdge })
        },
        onDragLeave: () => {
          setState(idle)
        },
        onDrag: ({ self }) => {
          const closestEdge = extractClosestEdge(self.data)
          setState((current) => {
            if (current.type === "is-dragging-over" && current.closestEdge === closestEdge) {
              return current
            }
            return { type: "is-dragging-over", closestEdge }
          })
        },
        onDrop: () => {
          setState(idle)
        },
      }),
    )
  }, [item])

  return (
    <ListItemProvider item={item} dragHandleRef={dragHandleRef}>
      <chakra.div
        ref={ref}
        role="listitem"
        css={{
          display: "flex",
          position: "relative",
          ...(css || {}),
          ...(state.type === "is-dragging" ? { opacity: 0.5 } : {}),
        }}
        // className={mx("relative flex", classNames, stateStyles[state.type])}
        {...props}
      >
        {children}
        {state.type === "is-dragging-over" && state.closestEdge && (
          <ListDropIndicator edge={state.closestEdge} />
        )}
      </chakra.div>
    </ListItemProvider>
  )
}

//
// List item components
//

export const ListItemDeleteButton = ({ autoHide = true, css, disabled, ...props }: any) => {
  const { state } = useListContext("DELETE_BUTTON")
  const isDisabled = state.type !== "idle" || disabled
  return (
    <CloseButton
      variant="ghost"
      {...props}
      disabled={isDisabled}
      size={"xs"}
      css={{
        ...css,
        ...(autoHide && disabled ? { display: "none" } : {}),
      }}
    />
  )
}


export const ListItemButton = ({
  autoHide = true,
  variant = "ghost",
  css,
  label,
  disabled,
  ...props
}: any) => {
  const { state } = useListContext("ITEM_BUTTON")
  const isDisabled = state.type !== "idle" || disabled
  return (
    <Button
      {...props}
      disabled={isDisabled}
      size={'xs'}
      // iconOnly={iconOnly}
      variant={variant}
      css={{
        ...css,
        ...(autoHide && disabled ? { display: "none" } : {}),
      }}

      // classNames={[classNames, autoHide && disabled && "hidden"]}
    >
      {label}
    </Button>
  )
}

export const ListItemDragHandle = ({ disabled }: any) => {
  const { dragHandleRef } = useListItemContext("DRAG_HANDLE")
  return (
    <IconButton
      variant="ghost"
      size={'xs'}
      ref={dragHandleRef as any}
      disabled={disabled}
    >
      <LuGripVertical />
    </IconButton>
  )
}

export const ListItemDragPreview = <T extends ListItemRecord>({
  children,
}: {
  children: ({ item }: { item: T }) => ReactNode
}) => {
  const { state } = useListContext("DRAG_PREVIEW")
  return state?.type === "preview" ? createPortal(children({ item: state.item }), state.container) : null
}

export const ListItemWrapper = ({ css, children }: any) => (
  <chakra.div
    css={{
      width: "full",
      display: "flex",
      gap: 1,
      ...css,
    }}
  >
    {children}
  </chakra.div>
)

export const ListItemTitle = ({
  css,
  children,
  ...props
}: any) => (
  <chakra.div
  css={{
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    ...css
  }}
    {...props}
  >
    {children}
  </chakra.div>
)
