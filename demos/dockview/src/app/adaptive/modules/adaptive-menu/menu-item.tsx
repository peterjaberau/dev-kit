import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"

function isTextClamped(element: HTMLElement): boolean {
  return element.scrollHeight > element.clientHeight
}

const elemAfterDisplayVar = '--elem-after-display';
const actionsOnHoverOpacityVar = '--actions-on-hover-opacity';
const actionsOnHoverWidthVar = '--actions-on-hover-width';
const actionsOnHoverPaddingInlineEndVar = '--actions-on-hover-padding';
const notchColorVar = '--notch-color';

const dragHandleDisplayVar = "--drag-handle-display"
const dragCursorAnimation = keyframes({
  to: {
    cursor: "grab",
  },
})
const topLevelSiblingStyles = {
  root: {
    position: 'relative',
  },
};
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
    color: "#505258",
    "&:hover": {
      //#F0F1F2
      backgroundColor: "#F0F1F2",
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
      backgroundColor: "#F0F1F2",
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
    color: "#1868DB",
    [notchColorVar]: "#1868DB",
    "&:hover": {
      color: "#1868DB",
      backgroundColor: "#1558BC",
    },
    [nestedOpenPopupCSSSelector]: {
      backgroundColor: "#1558BC",
    },
  },
  disabled: {
    color: "#080F214A",
    backgroundColor: "unset",
    "&:hover": {
      backgroundColor: "unset",
      color: "#080F214A",
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
    color: "#505258",
    alignItems: "center",
    textAlign: "start",
    "&:active:not(:disabled)": {
      backgroundColor: "#DDDEE1",
    },
  },
  rootT26Shape: {
    borderRadius: "6px",
  },
  selected: {
    color: "#1868DB",
    "&:active:not(:disabled)": {
      backgroundColor: "#8FB8F6",
    },
  },
  hasDragIndicator: {
    "-webkit-touch-callout": "none",
    [dragHandleDisplayVar]: "none",
    "&:hover": {
      [dragHandleDisplayVar]: "flex",
      animationName: dragCursorAnimation,
      animationDuration: "0s",
      animationDelay: "800ms",
      animationFillMode: "forwards",
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


export const MenuItemImpl = forwardRef((props: any, ref: any) => {
  const {
    visualContentRef,
    dropIndicator,
    onClick,
    isDragging,
    css,
    children,

    description,
    interactionName,
    hasDragIndicator,
    elemBefore,
    elemAfter,
    isDisabled,
    ...rest
  } = props

  return (
    <chakra.div
      ref={visualContentRef} // DRAG TARGET
      data-scope="menu-item"
      data-dragging={isDragging || undefined}
      css={css}
    >
      <chakra.div
        ref={ref} // INTERACTIVE TARGET
        tabIndex={0}
        onClick={onClick}
        {...rest}
      >
        {children}
      </chakra.div>
      {dropIndicator}
    </chakra.div>
  )
})


export const MenuItem = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
      <MenuItemImpl {...props} ref={ref} />
  )
})
