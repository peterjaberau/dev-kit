import { forwardRef, Suspense, useCallback, useRef } from "react"
import { chakra, HStack, Text, Button, defineKeyframes } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { useLevel } from "./expandable-menu-item-context"
import { COLLAPSE_ELEM_BEFORE } from "./menu-item-signals"
import { expandableMenuItemIndentation } from "./constants"
import { LazyDragHandle } from "./drag-handle/lazy-drag-handle"

function isTextClamped(element: HTMLElement): boolean {
  return element.scrollHeight > element.clientHeight
}

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
    // "-webkit-touch-callout": "none",
    [dragHandleDisplayVar]: "none",
    "&:hover": {
      [dragHandleDisplayVar]: "flex",
      cursor: 'grab',
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

function getTextColor({ isDisabled, isSelected }: { isDisabled?: boolean; isSelected?: boolean }) {
  if (isDisabled) {
    return "#080F214A"
  }

  if (isSelected) {
    return "#1868DB"
  }

  return "#505258"
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

    actions,
    actionsOnHover,
    href,
    target,
    isSelected,
    ariaControls,
    ariaExpanded,
    ariaHasPopup,
    isContentTooltipDisabled,

    ...rest
  } = props

  const level = useLevel()
  const isLink = typeof href !== "undefined"
  const labelRef = useRef(null)
  const descriptionRef = useRef(null)

  const handleClick = useCallback(
    (event: any) => {
      onClick?.(event)
    },
    [onClick],
  )

  const showElemBefore = elemBefore !== COLLAPSE_ELEM_BEFORE

  const interactiveElemContent = (
    <chakra.div css={interactiveContentStyles.root}>
      <chakra.div
        css={{
          insetInlineStart: `calc(-1 * ${level} * ${expandableMenuItemIndentation})`,
          ...extendButtonOrAnchorStyles.root,
        }}
        aria-hidden="true"
      />
      <chakra.div
        css={{
          ...textStyles.root,
          ...(!showElemBefore && textStyles.noElemBeforeIndent),
        }}
      >
        <Text fontWeight="medium" maxLines={1} color={getTextColor({ isDisabled, isSelected })} ref={labelRef}>
          {children}
        </Text>
        {description && (
          <Text color={isDisabled ? "#080F214A" : "#505258"} textStyle="sm" maxLines={1} ref={descriptionRef}>
            {description}
          </Text>
        )}
      </chakra.div>

      {hasDragIndicator ? (
        <Suspense fallback={null}>
          <LazyDragHandle />
        </Suspense>
      ) : null}

      {dropIndicator}
    </chakra.div>
  )

  const showHoverActionsWhenNotHovered = Boolean(ariaExpanded && actionsOnHover)

  return (
    <chakra.div
      ref={visualContentRef}
      tabIndex={0}
      onClick={onClick}
      css={{
        ...containerStyles.root,
        ...(isSelected && containerStyles.selected),
        ...(isDragging && containerStyles.dragging),
        ...(description && containerStyles.hasDescription),
        ...(showHoverActionsWhenNotHovered && containerStyles.showHoverActions),
        ...(showHoverActionsWhenNotHovered && elemAfter && containerStyles.removeElemAfter),
        ...(actionsOnHover && elemAfter && containerStyles.removeElemAfterOnHoverOrOpenNestedPopup),
        ...(isDisabled && containerStyles.disabled),
        ...css,
      }}
      data-selected={isSelected}
    >
      {/* interactiveElemContent */}
      <Button
        ref={ref}
        onClick={handleClick}
        css={{
          p: 0,
          m: 0,
          ...buttonOrAnchorStyles.root,
          ...topLevelSiblingStyles.root,
          ...(isSelected && buttonOrAnchorStyles.selected),
          ...(hasDragIndicator && buttonOrAnchorStyles.hasDragIndicator),
          textDecoration: "none",
        }}
        draggable={isLink && hasDragIndicator ? undefined : false}
        aria-current={isLink && isSelected && "page"}
        aria-expanded={!isLink && ariaExpanded && ariaExpanded}
        disabled={isDisabled}
        asChild={isLink}
      >
        {isLink && <chakra.div css={notchStyles.root} aria-hidden="true" />}
        {interactiveElemContent}
      </Button>

      {showElemBefore && (
        <chakra.div
          css={{
            ...elemBeforeStyles.root,
            ...topLevelSiblingStyles.root,
            ...onTopOfButtonOrAnchorStyles.root,
          }}
        >
          {elemBefore}
        </chakra.div>
      )}

      {actionsOnHover && <chakra.div css={actionsOnHoverStyles.root}>{actionsOnHover}</chakra.div>}

      {elemAfter && (
        <chakra.div
          css={{
            ...elemAfterStyles.root,
            ...topLevelSiblingStyles.root,
            ...onTopOfButtonOrAnchorStyles.root,
          }}
        >
          {elemAfter}
        </chakra.div>
      )}

      {actions && (
        <chakra.div
          css={{
            ...actionStyles.root,
            ...topLevelSiblingStyles.root,
            ...onTopOfButtonOrAnchorStyles.root,
          }}
        >
          {actions}
        </chakra.div>
      )}
    </chakra.div>
  )
})

export const MenuItem = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return <MenuItemImpl {...props} ref={ref} />
})
