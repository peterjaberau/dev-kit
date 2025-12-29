import { token } from "#atlas-ui/primitives/css"
import { chakra, Icon } from "@chakra-ui/react"
import React, { type ReactNode, useCallback, useId, useRef, forwardRef } from "react"

import { IconButton } from "@chakra-ui/react"
import { LuChevronRight as ChevronRightIcon, LuChevronDown as ChevronDownIcon } from "react-icons/lu"

import { MenuItemBase, nestedOpenPopupCSSSelector } from "../menu-item"
import type { MenuItemCommonProps, MenuItemSlots } from "../types"
import { useScrollMenuItemIntoView } from "../use-scroll-menu-item-into-view"

import { useIsExpanded, useOnExpansionToggle, useSetIsExpanded } from "./expandable-menu-item-context"

type ExpandableMenuItemIconProps = {
  isExpanded: boolean
  isHovering: boolean
  isSelected?: boolean
  providedElemBefore?: ReactNode
  iconProps?: ReactNode | any
}

// Widening type to `string` to side-step Compiled cssMap typescript warnings with unknown properties
const chevronDisplayCssVar: string = "--expandable-chevron-display"
const providedElemBeforeDisplayCssVar: string = "--expandable-provided-elembefore-display"

const wrapperStyles = {
  root: {
    /**
     * By default, we display the chevron icon only.
     */
    // Using `display: flex` to ensure the chevron icon is center aligned.
    // We can't use `display: contents` as it won't apply the `transform` property.
    [chevronDisplayCssVar]: "flex",
    [providedElemBeforeDisplayCssVar]: "none",
  },
  showProvidedElemBefore: {
    /**
     * If there is a provided `elemBefore`, we display it in the default state instead of the chevron icon.
     *
     * We replace it with the chevron icon when:
     * - The user hovers over the menu item
     * - The user is focused on the menu item, or any of the interactive elements within the menu item
     * - The menu item has a nested open popup (e.g. a `More` submenu in the `actions` or `actionsOnHover` slot)
     */
    [chevronDisplayCssVar]: "none",
    // We can use `display: contents` here as we don't need to apply the `transform` property on the provided
    // elemBefore - we only apply it to the chevron icon.
    [providedElemBeforeDisplayCssVar]: "contents",
    /**
     * We are using `:has(:focus-visible)` to target the menu item when it, or any of its interactive elements, should
     * actually appear focused. If we just used `:focus-within`, in some browsers it could (incorrectly) stay in the
     * focus state after being clicked.
     *
     * Ideally we want something like `:focus-visible-within`, but that doesn't exist yet - but we can emulate it
     * with `:has`. See: https://larsmagnus.co/blog/focus-visible-within-the-missing-pseudo-class
     */
    // eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors
    "&:hover, &:has(:focus-visible)": {
      [chevronDisplayCssVar]: "flex",
      [providedElemBeforeDisplayCssVar]: "none",
    },
    // eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-values, @atlaskit/ui-styling-standard/no-imported-style-values
    [nestedOpenPopupCSSSelector]: {
      [chevronDisplayCssVar]: "flex",
      [providedElemBeforeDisplayCssVar]: "none",
    },
  },
}

const iconStyles = {
  chevron: {
    display: `var(${chevronDisplayCssVar})`,
    // Flip the chevron icon when the direction is right-to-left
    // eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors
    '[dir="rtl"] &': {
      transform: "scaleX(-1)",
    },
  },
  providedElemBefore: {
    display: `var(${providedElemBeforeDisplayCssVar})`,
  },
  providedElemBeforeSelected: {
    color: token("color.icon.selected"),
  },
}

const ExpandableMenuItemIcon: any = ({
  iconProps,
  isExpanded,
  isSelected,
  providedElemBefore,
}: any) => {

  const { css: iconCss = {}, ...restIconProps }: any = iconProps || {}

  return (
    <>
      <Icon
        size={"xs"}
        {...restIconProps}
        css={{
          backgroundColor: isSelected && token("color.icon.selected"),
          ...iconCss
        }}
      >
        {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
      </Icon>
      {providedElemBefore && (
        <chakra.div
          css={{
            ...iconStyles.providedElemBefore,
            ...(isSelected && iconStyles.providedElemBeforeSelected),
          }}
        >
          {providedElemBefore}
        </chakra.div>
      )}
    </>
  )
}


/**
 * __ExpandableMenuItemTrigger__
 *
 * The trigger component for an `ExpandableMenuItem`. Interacting with it will expand or collapse the expandable.
 */

export const ExpandableMenuItemTrigger = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement | any>(function ExpandableMenuItemTrigger(
  {
    actions,
    isSelected,
    href,
    elemBefore: providedElemBefore,
    elemAfter,
    actionsOnHover,
    onClick,
    children,
    testId,
    interactionName,
    isContentTooltipDisabled,
    visualContentRef,
    isDragging,
    hasDragIndicator,
    dropIndicator,
    iconProps,
  }: any,
  forwardedRef,
) {
  const id = useId()
  const onExpansionToggle = useOnExpansionToggle()
  const isExpanded = useIsExpanded()
  const setIsExpanded = useSetIsExpanded()
  const itemRef: any = useRef<HTMLDivElement>(null)

  const handleIconClick = () => {
    onExpansionToggle?.(!isExpanded)
    setIsExpanded(!isExpanded)
  }

  const handleMenuContentClick = (
    event: any,
  ) => {
    const newValue = !isExpanded
    onClick?.(event, { isExpanded: newValue })
    onExpansionToggle?.(newValue)
    setIsExpanded(newValue)
  }

  const isSelectable = href !== undefined

  useScrollMenuItemIntoView({
    elementRef: itemRef,
    isSelected: Boolean(isSelectable && isSelected),
  })

  const elemBefore = isSelectable ? (
    <IconButton
      aria-expanded={isExpanded}
      aria-labelledby={id}
      variant={'ghost'}
      size={'xs'}
      onClick={handleIconClick}
    >
      <ExpandableMenuItemIcon
        iconProps={iconProps}
        isExpanded={isExpanded}
        isSelected={isSelected}
        providedElemBefore={providedElemBefore}
      />
    </IconButton>
  ) : (
    <ExpandableMenuItemIcon
      isExpanded={isExpanded}
      isSelected={isSelected}
      providedElemBefore={providedElemBefore}
    />
  )

  return (
    <chakra.div
      css={{
        ...wrapperStyles.root,
        ...(providedElemBefore && wrapperStyles.showProvidedElemBefore),
      }}
      ref={itemRef}
    >
      <MenuItemBase
        id={id}
        actions={actions}
        actionsOnHover={actionsOnHover}
        elemBefore={elemBefore}
        ariaExpanded={isExpanded}
        elemAfter={elemAfter}
        href={href}
        isSelected={isSelected}
        onClick={handleMenuContentClick}
        ref={forwardedRef}
        visualContentRef={visualContentRef}
        testId={testId}
        interactionName={interactionName}
        isContentTooltipDisabled={isContentTooltipDisabled}
        isDragging={isDragging}
        hasDragIndicator={hasDragIndicator}
        dropIndicator={dropIndicator}
      >
        {children}
      </MenuItemBase>
    </chakra.div>
  )
})



