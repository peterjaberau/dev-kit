import React, { forwardRef } from "react"
import { Collapsible, HStack, chakra } from "@chakra-ui/react"
import { useMenuItem } from "#adaptive-menu/use-menu-item"
import { expandableMenuItemIndentation } from "./constants"
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

const elemAfterDisplayVar = "--elem-after-display"
const actionsOnHoverOpacityVar = "--actions-on-hover-opacity"
const actionsOnHoverWidthVar = "--actions-on-hover-width"
const actionsOnHoverPaddingInlineEndVar = "--actions-on-hover-padding"
const notchColorVar = "--notch-color"

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

export const ControlTrigger = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {

  const { itemRef, children, ...rest } = props

  const { sendToMenuItem, isOpen } = useMenuItem({ actorRef: itemRef })

  const handleClick = (e: any) => {
    sendToMenuItem({ type: "toggle", open: !isOpen })
  }

  return (
    <chakra.div
      onClick={handleClick}
      {...props}
      css={{
        "--actions-on-hover-padding": 0,
        "--actions-on-hover-opacity": 0,
        "--actions-on-hover-width": 0,
        "--element-after-display": "flex",
        "--notch-color": "transparent",
        margin: "0px",
        padding: "0px",
        borderRadius: "sm",
        gridTemplateColumns: "minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)",
        gridTemplateAreas: '"elem-before interactive elem-after actions"',
        gridTemplateRows: "1fr",
        boxSizing: "border-box",
        display: "grid",
        minWidth: "72px",
        height: "2rem",
        alignItems: "center",
        userSelect: "none",
        '&[data-draggable="dragging"]': {
          opacity: 0.4,
        },
        cursor: "pointer",
        w: "full",
      }}
      ref={ref}
    >
      {children}
    </chakra.div>
  )
})

/**
 * return (
 *     <HStack
 *       data-scope="control"
 *       data-part="trigger"
 *       onClick={handleClick}
 *       gap={0}
 *       {...props}
 *       css={{
 *         '&[data-draggable="dragging"]': {
 *           opacity: 0.4,
 *         },
 *         height: "2rem",
 *         w: "full",
 *         cursor: "pointer",
 *         alignItems: "center",
 *         justifyContent: "flex-start",
 *       }}
 *       ref={ref}
 *     />
 *   )
 */
