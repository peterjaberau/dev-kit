import React, { Suspense, useCallback, useRef } from "react"
import { css } from "@emotion/react"

import { chakra, Avatar, Text, Box, Button } from "@chakra-ui/react"
import { forwardRefWithGeneric, mergeRefs } from "../../../packages/ds-lib"

import { expandableMenuItemIndentation } from "./constants"
import { LazyDragHandle } from "./drag-handle/lazy-drag-handle"
import { useLevel } from "./expandable-menu-item/expandable-menu-item-context"
import { COLLAPSE_ELEM_BEFORE } from "./menu-item-signals"
import { keyframes } from "@emotion/css"

const containerStyles = css({
  root: {
    boxSizing: "border-box",
    display: "grid",
    /**
     * Slot 1: elemBefore (collapse last)
     * Slot 2: interactive element content (collapse first)
     * Slot 3: elemAfter (collapse last) [also for actionsOnHover]
     * Slot 4: actions (collapse last)
     */
    gridTemplateColumns: "minmax(0, auto) 1fr minmax(0, auto) minmax(0, auto)",
    gridTemplateRows: "1fr", // a single row grid
    gridTemplateAreas: '"elem-before interactive elem-after actions"',
    /**
     * A min-width is set to ensure that the menu items do not completely collapse when deeply nested.
     * Otherwise, the menu items progressively shrink as they get into deeper levels of expandable menu items, until they
     * are unusable.
     */
    minWidth: "72px",
    // Using rem so it scales with browser font size and rem-based spacing/typography
    height: "2rem",
    alignItems: "center",
    userSelect: "none",
    borderRadius: token("radius.small"),
    color: token("color.text.subtle"),
    // Applying :hover styles on the container rather than on
    // just the button / anchor so that we will still trigger the
    // :hover styles when over action buttons
    "&:hover": {
      backgroundColor: token("elevation.surface.hovered"),
    },
    "--notch-color": "transparent",
    "--elem-after-display": "flex",
    /**
     * We are not using `display: none` or `visibility: hidden` to hide the `actionsOnHover` slot, as this causes problems
     * with returning focus to dropdown/popup triggers.
     *
     * The problem:
     * - The `actionsOnHover` slot is kept visible when it contains a dropdown/popup trigger, and the dropdown/popup is open.
     *   This is done using the CSS selector `nestedOpenPopupCSSSelector` (which looks at the `aria-expanded` attribute).
     * - When the user presses `Escape`, the dropdown/popup closes, and the `actionsOnHover` slot is hidden by the browser.
     * - Then, dropdown/popup runs JavaScript to `focus()` on the trigger element using `requestAnimationFrame`.
     * - By the time the `focus()` is run, the `actionsOnHover` slot is already hidden, which means the trigger cannot be
     *   focused on.
     *
     * As a workaround, we are using `opacity` to only _visually_ hide the slot, and setting the width and padding to 0 so
     * it doesn't take up space. This allows the button to be focused upon after the dropdown/popup closes.
     */
    "--actions-on-hover-opacity": "0",
    "--actions-on-hover-width": "0",
    "--actions-on-hover-padding": "0",
    "&:hover, &:focus-within": {
      "--actions-on-hover-opacity": "1",
      "--actions-on-hover-width": "auto",
      "--actions-on-hover-padding": token("space.050"),
    },
    // If there is a nested open popup, we want to apply hover styling, and display the `actionsOnHover` slot.
    // eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-values
    '&:has([aria-expanded="true"][aria-haspopup="true"])': {
      "--actions-on-hover-opacity": "1",
      "--actions-on-hover-width": "auto",
      "--actions-on-hover-padding": token("space.050"),
      backgroundColor: token("elevation.surface.hovered"),
    },
  },
  // platform-dst-shape-theme-default TODO: Merge into base after rollout
  rootT26Shape: {
    borderRadius: token("radius.medium", "6px"),
  },
  removeElemAfter: {
    "--elem-after-display": "none",
  },
  showHoverActions: {
    "--actions-on-hover-opacity": "1",
    "--actions-on-hover-width": "auto",
    "--actions-on-hover-padding": token("space.050"),
  },
  removeElemAfterOnHoverOrOpenNestedPopup: {
    // On hover of the menu item, remove the elemAfter
    "&:hover, &:focus-within": {
      "--elem-after-display": "none",
    },
    // If there is a nested open popup, and both `actionsOnHover` and `elemAfter` exist, we want to hide the `elemAfter`.
    // eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-values
    '&:has([aria-expanded="true"][aria-haspopup="true"])': {
      "--elem-after-display": "none",
    },
  },
  selected: {
    backgroundColor: token("color.background.selected"),
    color: token("color.text.selected"),
    "--notch-color": token("color.background.selected.bold"),
    "&:hover": {
      color: token("color.text.selected"),
      backgroundColor: token("color.background.selected.hovered"),
    },
    // eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-values
    '&:has([aria-expanded="true"][aria-haspopup="true"])': {
      backgroundColor: token("color.background.selected.hovered"),
    },
  },
  disabled: {
    // Setting the color here to allow icons with "currentColor" to inherit the disabled color.
    color: token("color.text.disabled"),
    // Explicitly setting the background color here to make sure it's not set when selected and disabled
    backgroundColor: "unset",
    "&:hover": {
      // Removing the background color that gets applied on hover
      backgroundColor: "unset",
      // The color should not change on hover (e.g. when both selected and disabled)
      color: token("color.text.disabled"),
    },
  },
  hasDescription: {
    /* Standard 32px + another 16px for the description */
    height: "3rem",
  },
  dragging: {
    opacity: 0.4,
  },
})

const buttonOrAnchorStyles = cssMap({
  // This button / anchor is positioned to produce the visual appearance of nested
  // buttons whilst the elements are actually siblings in the DOM structure.
  root: {
    display: "grid",
    // Extend the button to the full width of container
    gridColumn: "1 / -1",
    // Each grid item is placed on the same row and stacks on top of each other.
    gridRow: "1",
    gridTemplateColumns: "subgrid",
    gridTemplateRows: "subgrid",
    paddingInlineEnd: token("space.050"),
    paddingInlineStart: token("space.050"),
    // Notes:
    // - block padding is not strictly needed.
    // - it does cause some issues with "combine" styling on firefox@125; but not
    //   on firefox@137
    paddingBlockStart: token("space.050"),
    paddingBlockEnd: token("space.050"),
    backgroundColor: "transparent",
    borderRadius: token("radius.small"),
    color: token("color.text.subtle"),
    alignItems: "center",
    textAlign: "start",
    // :active styles are applied on the button / anchor rather
    // than on the container so that pressing on actions does not
    // trigger the :active styles on the whole element.
    // We are excluding the disabled state, so we don't respond to
    // presses when disabled.
    // eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors
    "&:active:not(:disabled)": {
      backgroundColor: token("elevation.surface.pressed"),
    },
  },
  // platform-dst-shape-theme-default TODO: Merge into base after rollout
  rootT26Shape: {
    borderRadius: token("radius.medium", "6px"),
  },
  selected: {
    color: token("color.text.selected"),
    // We are excluding the disabled state, so we don't respond to
    // presses when disabled.
    // We also need to match the :active selector in the non-selected styles
    // to ensure it doesn't have a higher specificity
    // eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors
    "&:active:not(:disabled)": {
      backgroundColor: token("color.background.selected.pressed"),
    },
  },
  // Only applying on interactive element as we are not enabling
  // dragging from nested interactive elements
  hasDragIndicator: {
    /**
     * Opting out of long press actions on iOS as they don't work well with drag and drop.
     *
     * If you don't opt out, anchors can get a context menu including a link preview and actions
     * (eg "open in new tab"). While it's still possible to do drag and drop operations with this
     * context menu, it's a pain as you need to close the context menu while keeping your dragging
     * finger depressed, then you can continue with the drag operation.
     *
     * TODO: could consider adding this to all menu items for a consistent experience.
     */
    "-webkit-touch-callout": "none",
    // change cursor on hover
    ["--drag-handle-display"]: "none",
    "&:hover": {
      ["--drag-handle-display"]: "flex",
      animationName: keyframes({
        to: {
          cursor: "grab",
        },
      }),

      // instant animation
      animationDuration: "0s",

      // delay cursor change
      animationDelay: "800ms",

      // keep the end state when the animation ends
      animationFillMode: "forwards",
    },
  },
})

const extendButtonOrAnchorStyles = cssMap({
  root: {
    position: "absolute",
    inset: token("space.0"),
  },
})

const notchStyles = cssMap({
  root: {
    position: "absolute",
    insetBlockStart: "50%",
    insetInlineStart: token("space.0"),
    width: "2px",
    height: "12px",
    transform: "translateY(-50%)",
    backgroundColor: `var(--notch-color)`,
  },
})

const actionStyles = cssMap({
  root: {
    display: "flex",
    alignItems: "center",
    gap: token("space.050"),
    gridArea: "actions",
    paddingInlineEnd: token("space.050"),
    // Hiding overflowing slot content to prevent content from adjacent slots overlapping when the menu item is constrained to a narrow width.
    overflow: "hidden",
    "&:focus-within": {
      // To prevent the focus ring from being clipped, we are allowing content to overflow while focus is within the slot.
      overflow: "initial",
    },
  },
})

const actionsOnHoverStyles = cssMap({
  root: {
    // When actionsOnHover are displayed, the elemAfter is hidden
    // and these actions are rendered in it's place.
    gridArea: "elem-after",
    alignItems: "center",
    gap: token("space.050"),
    display: "flex",
    opacity: "var(--actions-on-hover-opacity)",
    width: `var(--actions-on-hover-width)`,
    paddingInlineEnd: `var(--actions-on-hover-padding)`,
    // Hiding overflowing slot content to prevent content from adjacent slots overlapping when the menu item is constrained to a narrow width.
    overflow: "hidden",
    "&:focus-within": {
      // To prevent the focus ring from being clipped, we are allowing content to overflow while focus is within the slot.
      overflow: "initial",
    },
  },
})

const textStyles = cssMap({
  root: {
    paddingInlineEnd: token("space.050"),
    paddingInlineStart: token("space.050"),
    display: "flex",
    flexDirection: "column",
    gap: token("space.025"),
    // Allowing at least one character to be seen at all times, even when the menu item has been shrunk down
    minWidth: "1ch",
    // Hiding overflowing slot content to prevent content from adjacent slots overlapping when the menu item is constrained to a narrow width.
    overflow: "hidden",
    "&:focus-within": {
      // To prevent the focus ring from being clipped, we are allowing content to overflow while focus is within the slot.
      overflow: "initial",
    },
  },
  noElemBeforeIndent: {
    paddingInlineStart: token("space.075"),
  },
})

const elemBeforeStyles = cssMap({
  root: {
    gridArea: "elem-before",
    display: "flex",
    flexShrink: 0,
    width: "24px",
    height: "24px",
    alignItems: "center",
    justifyContent: "center",
    paddingInlineStart: token("space.050"),
    // Box sizing must be explicit because we set a size AND padding on the same axis
    // Otherwise the resulting size can be inconsistent depending on the global reset used
    boxSizing: "content-box",
    // Hiding overflowing slot content to prevent content from adjacent slots overlapping when the menu item is constrained to a narrow width.
    overflow: "hidden",
    "&:focus-within": {
      // To prevent the focus ring from being clipped, we are allowing content to overflow while focus is within the slot.
      overflow: "initial",
    },
  },
})

const elemAfterStyles = cssMap({
  root: {
    display: `var(--elem-after-display)`,
    gridArea: "elem-after",
    flexShrink: 0,
    height: "24px",
    alignItems: "center",
    paddingInlineEnd: token("space.050"),
    // Hiding overflowing slot content to prevent content from adjacent slots overlapping when the menu item is constrained to a narrow width.
    overflow: "hidden",
    "&:focus-within": {
      // To prevent the focus ring from being clipped, we are allowing content to overflow while focus is within the slot.
      overflow: "initial",
    },
  },
})

/**
 * We are using a wrapping element for our interactive content
 * even though only the `Text` element is the only thing not using `position:absolute`
 *
 * Rationale:
 * - Super clear that everything inside the interactive content should be in a specific slot in the grid
 * - To work around a browser bug in Safari where it does not work well with `position:absolute`
 *   on a subgrid child.
 *   Safari bug: https://bugs.webkit.org/show_bug.cgi?id=292516
 */
const interactiveContentStyles = cssMap({
  root: {
    gridArea: "interactive",
    // Make content full height
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
})

/**
 * This is the internal version of the component, to be passed into `forwardRef`.
 *
 * It contains a type argument `<T>`, to specify the type of the interactive element (`button` or `a`).
 * This can be inferred from the type of the `onClick` prop.
 */
const MenuItemBaseNoRef = <T extends HTMLAnchorElement | HTMLButtonElement | any>(
  {
    id,
    testId,
    actions,
    actionsOnHover,
    children,
    description,
    elemAfter,
    elemBefore,
    href,
    target,
    isDisabled,
    isSelected,
    onClick,
    ariaControls,
    ariaExpanded,
    ariaHasPopup,
    interactionName,
    isContentTooltipDisabled,
    visualContentRef,
    isDragging,
    hasDragIndicator,
    dropIndicator,
  }: MenuItemBaseProps<T>,
  forwardedRef: React.ForwardedRef<T>,
) => {
  const level = useLevel()
  const labelRef: any = useRef<T | null>(null)

  const showElemBefore = elemBefore !== COLLAPSE_ELEM_BEFORE

  const interactiveElemContent = (
    <chakra.div css={interactiveContentStyles.root}>
      <chakra.div
        css={extendButtonOrAnchorStyles.root}
        // This extends the clickable area of nested menu items to the width
        // of the root level menu items, while being visually indented.
        // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values
        style={{ insetInlineStart: `calc(-1 * ${level} * ${expandableMenuItemIndentation})` }}
        aria-hidden="true"
      />
      <div css={[textStyles.root, !showElemBefore && textStyles.noElemBeforeIndent]}>
        <Text
          fontWeight="medium"
          maxLines={1}
          color={isDisabled ? "#080F214A" : isSelected ? "#1868DB" : "#505258"}
          ref={labelRef}
        >
          {children}
        </Text>
      </div>
      {/**
       * Both the drop indicator and drag handle use `position:absolute`
       * Both rely on `position:relative` on a parent for positioning.
       */}

      {/**
       * Wrapping `LazyDragHandle` in it's own `Suspense` boundary, so that it's loading won't block
       * the rendering of the rest of the menu item.
       * We put the `Suspense` in the conditional branch to avoid putting a `Suspense` in the react
       * tree for consumers who don't need it
       */}
      {hasDragIndicator ? (
        <Suspense fallback={null}>
          <LazyDragHandle />
        </Suspense>
      ) : null}

      {dropIndicator}
    </chakra.div>
  )

  /**
   *  If the [expandable] menu item is expanded, show hover actions even when *not* hovered.
   *
   * Note: we also remove the `elemAfter` when showing `actionsOnHover`
   */
  const showHoverActionsWhenNotHovered = Boolean(ariaExpanded && actionsOnHover)

  return (
    <AvatarContext.Provider value={"small"}>
      <chakra.div
        ref={visualContentRef}
        css={[
          containerStyles.root,
          fg("platform-dst-shape-theme-default") && containerStyles.rootT26Shape,
          isSelected && containerStyles.selected,
          isDragging && containerStyles.dragging,
          description && containerStyles.hasDescription,
          // If the menu item has actionsOnHover and is expanded, show hover actions even when not hovered
          // Not using a ternary for the feature flag logic here, as Jest fails to parse the expression - Compiled complains that it is too complicated
          showHoverActionsWhenNotHovered && containerStyles.showHoverActions,
          // If the menu item has both actionsOnHover and elemAfter and is expanded, remove elemAfter to make more space for actionsOnHover.
          showHoverActionsWhenNotHovered && elemAfter && containerStyles.removeElemAfter,
          // If the menu item has both actionsOnHover and elemAfter, remove elemAfter to make more space for actionsOnHover, when:
          // - menu item is hovered, or
          // - there is an open nested popup (as we apply hover styles when there is an open nested popup)
          actionsOnHover && elemAfter && containerStyles.removeElemAfterOnHoverOrOpenNestedPopup,
          isDisabled && containerStyles.disabled,
        ]}
        data-testid={testId ? `${testId}-container` : undefined}
        data-selected={isSelected}
      >
        <Tooltip
          content={() => (
            <>
              <div>{children}</div>
              {description ? <div>{description}</div> : null}
            </>
          )}
          position="right-start"
          ignoreTooltipPointerEvents
          hideTooltipOnMouseDown
          // We don't need a duplicate hidden element containing tooltip content
          // as the content of the tooltip matches what is rendered for the menu item.
          isScreenReaderAnnouncementDisabled
          canAppear={canTooltipAppear}
        >
          {(tooltipProps) => {
            // Putting the tooltip onClick into a ref.
            // This way we don't need to create a new `onClick` function on each
            // render (as we would need to merge `tooltipProps.onClick` and our `handleClick`)
            tooltipOnClick.current = tooltipProps.onClick

            const sharedProps = {
              ...tooltipProps,
              "aria-controls": ariaControls,
              "aria-haspopup": ariaHasPopup,
              ref: mergeRefs<HTMLAnchorElement | HTMLButtonElement>([forwardedRef, tooltipProps.ref]),
              id,
              testId,
              interactionName,
            }

            return isLink ? (
              <Anchor
                {...sharedProps}
                onClick={handleClick as MenuItemOnClick<HTMLAnchorElement>}
                css={{
                  position: "relative", // top-level-sibling
                }}
                xcss={cx(
                  buttonOrAnchorStyles.root,
                  fg("platform-dst-shape-theme-default") && buttonOrAnchorStyles.rootT26Shape,
                  isSelected && buttonOrAnchorStyles.selected,
                  hasDragIndicator && buttonOrAnchorStyles.hasDragIndicator,
                )}
                // Needed to override Anchor style due to a compiled/emotion conflict
                // eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop
                style={{ textDecoration: "none" }}
                aria-current={isSelected ? "page" : undefined}
                href={href}
                target={target}
                /**
                 * For anchors we don't want to have the standard drag and drop behaviour.
                 *
                 * Thinking on the topic:
                 *
                 * - Anchors look visually similar to buttons in the sidenav
                 * - Why should some menu items be natively draggable, while others are not?
                 * - A user cannot know which menu items are "natively" draggable (ie anchors)
                 * - If you wire up an anchor to be draggable using our standard affordances
                 *   it will have a different preview experience to native anchor dragging.
                 *
                 * To promote consistency, all elements need to use the same visual affordances.
                 *
                 * Anchor elements will automatically attach URL information
                 * to the native data store.
                 *
                 * When `hasDragIndicator` is `true` we are expecting consumers to register
                 * the element as draggable through the `draggable()` Pragmatic drag and drop function.
                 * The `draggable()` function will add `draggable="true"` to the element.
                 */
                draggable={hasDragIndicator ? undefined : false}
              >
                {/* Won't be a "grid child" */}
                <div css={notchStyles.root} aria-hidden="true" />
                {interactiveElemContent}
              </Anchor>
            ) : (
              <Pressable
                {...sharedProps}
                onClick={handleClick as MenuItemOnClick<HTMLButtonElement>}
                css={{
                  position: "relative", // top-level-sibling
                }}
                xcss={cx(
                  buttonOrAnchorStyles.root,
                  fg("platform-dst-shape-theme-default") && buttonOrAnchorStyles.rootT26Shape,
                  isSelected && buttonOrAnchorStyles.selected,
                  hasDragIndicator && buttonOrAnchorStyles.hasDragIndicator,
                )}
                aria-expanded={ariaExpanded}
                isDisabled={isDisabled}
              >
                {interactiveElemContent}
              </Pressable>
            )
          }}
        </Tooltip>
        {showElemBefore && (
          <chakra.div
            css={{
              // top-level-sibling
              position: "relative",

              // on-top-of-button-or-anchor
              "&:not(:has(button,a))": {
                pointerEvents: "none",
              },

              ...[elemBeforeStyles.root],
            }}
          >
            {elemBefore}
          </chakra.div>
        )}
        {actionsOnHover && <div css={actionsOnHoverStyles.root}>{actionsOnHover}</div>}
        {elemAfter && (
          <chakra.div
            css={{
              // top-level-sibling
              position: "relative",

              // on-top-of-button-or-anchor
              "&:not(:has(button,a))": {
                pointerEvents: "none",
              },

              ...[elemAfterStyles.root],
            }}
          >
            {elemAfter}
          </chakra.div>
        )}
        {actions && (
          <chakra.div
            css={{
              // top-level-sibling
              position: "relative",

              // on-top-of-button-or-anchor
              "&:not(:has(button,a))": {
                pointerEvents: "none",
              },

              ...[actionStyles.root],
            }}
          >
            {actions}
          </chakra.div>
        )}
      </chakra.div>
    </AvatarContext.Provider>
  )
}

/**
 * __MenuItemBase__
 *
 * The base menu item component used to compose ButtonMenuItem and LinkMenuItem.
 *
 * It contains a type argument `<T>`, to specify the type of the interactive element (`button` or `a`).
 * This can be inferred from the type of the `onClick` prop.
 */
export const MenuItemBase: <T extends HTMLAnchorElement | HTMLButtonElement>(
  props: MenuItemBaseProps<T> & React.RefAttributes<T>,
) => React.ReactElement | null = forwardRefWithGeneric.default(MenuItemBaseNoRef)
