import React, { forwardRef } from "react"
import { chakra, Collapsible, Stack, useCollapsible, mergeRefs } from "@chakra-ui/react"
import { useMenuItem } from "#adaptive-menu/use-menu-item"


export const Control = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { itemRef, children, ...rest } = props
  const { isOpen } = useMenuItem({ actorRef: itemRef })

  const collapsible = useCollapsible({
    open: isOpen,
    onOpenChange: (e) => {},
  })

  return (
    <Stack data-scope="control" data-part="control" gap={0} ref={ref} {...rest}>
      <Collapsible.RootProvider value={collapsible}>{children}</Collapsible.RootProvider>
    </Stack>
  )
})



/*

import { expandableMenuItemIndentation } from "./constants"

const elemAfterDisplayVar = "--elem-after-display"
const actionsOnHoverOpacityVar = "--actions-on-hover-opacity"
const actionsOnHoverWidthVar = "--actions-on-hover-width"
const actionsOnHoverPaddingInlineEndVar = "--actions-on-hover-padding"
const notchColorVar = "--notch-color"

const dragHandleDisplayVar = "--drag-handle-display"

const topLevelSiblingStyles = {
  root: {
    position: "relative",
  },
}
const onTopOfButtonOrAnchorStyles = {
  root: {
    "&:not(:has(button,a))": {
      pointerEvents: "none",
    },
  },
}
export const nestedOpenPopupCSSSelector = '&:has([aria-expanded="true"][aria-haspopup="true"])'
const containerStyles = {
  root: {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "minmax(0, auto) 1fr minmax(0, auto) minmax(0, auto)",
    gridTemplateRows: "1fr",
    gridTemplateAreas: '"elem-before interactive elem-after actions"',
    minWidth: "72px",
    height: "2rem",
    alignItems: "center",
    userSelect: "none",
    borderRadius: 1,
    color: "var(--chakra-colors-gray-800)",
    "&:hover": {
      //#F0F1F2
      backgroundColor: "var(--chakra-colors-gray-100)",
    },
    [notchColorVar]: "transparent",
    [elemAfterDisplayVar]: "flex",
    [actionsOnHoverOpacityVar]: "0",
    [actionsOnHoverWidthVar]: "0",
    [actionsOnHoverPaddingInlineEndVar]: "0",
    "&:hover, &:focus-within": {
      [actionsOnHoverOpacityVar]: "1",
      [actionsOnHoverWidthVar]: "auto",
      [actionsOnHoverPaddingInlineEndVar]: "1px",
    },
    [nestedOpenPopupCSSSelector]: {
      [actionsOnHoverOpacityVar]: "1",
      [actionsOnHoverWidthVar]: "auto",
      [actionsOnHoverPaddingInlineEndVar]: "1px",
      backgroundColor: "var(--chakra-colors-gray-100)",
    },
  },
  rootT26Shape: {
    borderRadius: "6px",
  },
  removeElemAfter: {
    [elemAfterDisplayVar]: "none",
  },
  showHoverActions: {
    [actionsOnHoverOpacityVar]: "1",
    [actionsOnHoverWidthVar]: "auto",
    [actionsOnHoverPaddingInlineEndVar]: "1px",
  },
  removeElemAfterOnHoverOrOpenNestedPopup: {
    "&:hover, &:focus-within": {
      [elemAfterDisplayVar]: "none",
    },
    [nestedOpenPopupCSSSelector]: {
      [elemAfterDisplayVar]: "none",
    },
  },
  selected: {
    backgroundColor: "#E9F2FE",
    color: "var(--chakra-colors-gray-800)",
    [notchColorVar]: "var(--chakra-colors-gray-800)",
    "&:hover": {
      color: "#1868DB",
      backgroundColor: "#1558BC",
    },
    [nestedOpenPopupCSSSelector]: {
      backgroundColor: "#1558BC",
    },
  },
  disabled: {
    color: "var(--chakra-colors-gray-400)",
    backgroundColor: "unset",
    "&:hover": {
      backgroundColor: "unset",
      color: "var(--chakra-colors-gray-500)",
    },
  },
  hasDescription: {
    height: "3rem",
  },
  dragging: {
    opacity: 0.4,
  },
}

const buttonOrAnchorStyles = {
  root: {
    display: "grid",
    gridColumn: "1 / -1",
    gridRow: "1",
    gridTemplateColumns: "subgrid",
    gridTemplateRows: "subgrid",
    paddingInlineEnd: "1px",
    paddingInlineStart: "1px",
    paddingBlockStart: "1px",
    paddingBlockEnd: "1px",
    backgroundColor: "transparent",
    borderRadius: "4px",
    color: "var(--chakra-colors-gray-800)",
    alignItems: "center",
    textAlign: "start",
    "&:active:not(:disabled)": {
      backgroundColor: "var(--chakra-colors-gray-200)",
    },
  },
  rootT26Shape: {
    borderRadius: "6px",
  },
  selected: {
    color: "var(--chakra-colors-gray-900)",
    "&:active:not(:disabled)": {
      backgroundColor: "var(--chakra-colors-gray-200)",
    },
  },
  hasDragIndicator: {
    // "-webkit-touch-callout": "none",
    [dragHandleDisplayVar]: "none",
    "&:hover": {
      [dragHandleDisplayVar]: "flex",
      cursor: "grab",
      // animationName: dragCursorAnimation,
      // animationDuration: "0s",
      // animationDelay: "800ms",
      // animationFillMode: "forwards",
    },
  },
}

const extendButtonOrAnchorStyles = {
  root: {
    position: "absolute",
    inset: 0,
  },
}

const notchStyles = {
  root: {
    position: "absolute",
    insetBlockStart: "50%",
    insetInlineStart: 0,
    width: "2px",
    height: "12px",
    transform: "translateY(-50%)",
    backgroundColor: `var(${notchColorVar})`,
  },
}

const actionStyles = {
  root: {
    display: "flex",
    alignItems: "center",
    gap: "1px",
    gridArea: "actions",
    paddingInlineEnd: "1px",
    overflow: "hidden",
    "&:focus-within": {
      overflow: "initial",
    },
  },
}

const actionsOnHoverStyles = {
  root: {
    gridArea: "elem-after",
    alignItems: "center",
    gap: "1px",
    display: "flex",
    opacity: `var(${actionsOnHoverOpacityVar})`,
    width: `var(${actionsOnHoverWidthVar})`,
    paddingInlineEnd: `var(${actionsOnHoverPaddingInlineEndVar})`,
    overflow: "hidden",
    "&:focus-within": {
      overflow: "initial",
    },
  },
}

const textStyles = {
  root: {
    paddingInlineEnd: "1px",
    paddingInlineStart: "1px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    minWidth: "1ch",
    overflow: "hidden",
    "&:focus-within": {
      overflow: "initial",
    },
  },
  noElemBeforeIndent: {
    paddingInlineStart: "6px",
  },
}

const elemBeforeStyles = {
  root: {
    gridArea: "elem-before",
    display: "flex",
    flexShrink: 0,
    width: "24px",
    height: "24px",
    alignItems: "center",
    justifyContent: "center",
    paddingInlineStart: "1px",
    boxSizing: "content-box",
    overflow: "hidden",
    "&:focus-within": {
      overflow: "initial",
    },
  },
}

const elemAfterStyles = {
  root: {
    display: `var(${elemAfterDisplayVar})`,
    gridArea: "elem-after",
    flexShrink: 0,
    height: "24px",
    alignItems: "center",
    paddingInlineEnd: "1px",
    overflow: "hidden",
    "&:focus-within": {
      overflow: "initial",
    },
  },
}

const interactiveContentStyles = {
  root: {
    gridArea: "interactive",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
}

export const Node = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { itemRef, children, ...rest } = props

  return <Stack data-scope="control" data-part="control" gap={0} ref={ref} {...rest}></Stack>
})

export const ControlImpl = forwardRef((props: any, ref: any) => {
  const { children, isDragging, css, isDisabled, ...rest } = props

  return (
    <chakra.div
      {...rest}
      css={{
        ...containerStyles.root,
        ...(isDragging && containerStyles.dragging),
        ...(isDisabled && containerStyles.disabled),
        ...css,
      }}
    >
      <chakra.button
        ref={ref}
        onClick={handleClick}
        css={{
          p: 0,
          m: 0,
          ...buttonOrAnchorStyles.root,
          ...topLevelSiblingStyles.root,
          textDecoration: "none",
        }}
        draggable={true}
        disabled={isDisabled}
      >
        {interactiveElemContent}
      </chakra.button>

      {children}
    </chakra.div>
  )
})
 */