import { forwardRef } from "react"
import { chakra, HStack, IconButton, Icon } from "@chakra-ui/react"
import React, { type ReactNode, useCallback, useId, useRef } from "react"
import { LuChevronRight as ChevronDownIcon, LuChevronDown as ChevronRightIcon } from "react-icons/lu"
import { useScrollMenuItemIntoView } from "./use-scroll-menu-item-into-view"
import { MenuItem } from "./menu-item"
import { useIsExpanded, useOnExpansionToggle, useSetIsExpanded } from "./expandable-menu-item-context"

type ExpandableMenuItemIconProps = {
  isExpanded: boolean
  isHovering: boolean
  isSelected?: boolean
  providedElemBefore?: ReactNode
  iconProps?: any
}

const chevronDisplayCssVar: string = "--expandable-chevron-display"
const providedElemBeforeDisplayCssVar: string = "--expandable-provided-elembefore-display"

export const ExpandableMenuItemTrigger = forwardRef((props: any, ref: any) => {
  const {
    visualContentRef,
    dropIndicator,
    onClick,
    isDragging,
    children,
    description,
    interactionName,
    hasDragIndicator,
    elemAfter,
    isDisabled,
    elemBefore: providedElemBefore,
    iconProps,
    isSelected,
    href,
    css,
    ...rest
  } = props

  const id = useId()
  const onExpansionToggle = useOnExpansionToggle()
  const isExpanded = useIsExpanded()
  const setIsExpanded = useSetIsExpanded()
  const itemRef = useRef<HTMLDivElement>(null)

  const handleIconClick = useCallback(() => {
    onExpansionToggle?.(!isExpanded)
    setIsExpanded(!isExpanded)
  }, [isExpanded, onExpansionToggle, setIsExpanded])

  const handleMenuContentClick = useCallback(
    (event: any) => {
      const newValue = !isExpanded
      onClick?.(event, { isExpanded: newValue })
      onExpansionToggle?.(newValue)
      setIsExpanded(newValue)
    },
    [onClick, onExpansionToggle, isExpanded, setIsExpanded],
  )

  const isSelectable = typeof href !== "undefined"

  useScrollMenuItemIntoView({
    elementRef: itemRef,
    isSelected: Boolean(isSelectable && isSelected),
  })

  const elemBefore: any = isSelectable ? (
    <IconButton
      color={isSelected ? "#1868DB" : undefined}
      colorPalette={isSelectable ? "blue" : undefined}
      variant={isSelectable ? "solid" : "subtle"}
      aria-expanded={isExpanded}
      aria-labelledby={id}
      size={"xs"}
      onClick={handleIconClick}
    >
      {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
    </IconButton>
  ) : (
    providedElemBefore && (
      <chakra.div
        css={{
          display: `var(${providedElemBeforeDisplayCssVar})`,
          color: isSelected ? "#1868DB" : undefined,
        }}
      >
        {providedElemBefore}
      </chakra.div>
    )
  )

  return (
    <chakra.div
      data-scope="expandable-menu-item-trigger"
      ref={itemRef}
      css={{
        ...css,
        // By default, we display the chevron icon only
        [chevronDisplayCssVar]: "flex",
        [providedElemBeforeDisplayCssVar]: "none",
        ...(providedElemBefore && {
          [chevronDisplayCssVar]: "none",
          [providedElemBeforeDisplayCssVar]: "contents",
          "&:hover, &:has(:focus-visible)": {
            [chevronDisplayCssVar]: "flex",
            [providedElemBeforeDisplayCssVar]: "none",
          },
          // [nestedOpenPopupCSSSelector]: {
          //   [chevronDisplayCssVar]: "flex",
          //   [providedElemBeforeDisplayCssVar]: "none",
          // },
        }),
      }}
    >
      <MenuItem
        id={id}
        // actions={actions}
        // actionsOnHover={actionsOnHover}
        elemBefore={elemBefore}
        ariaExpanded={isExpanded}
        elemAfter={elemAfter}
        href={href}
        isSelected={isSelected}
        onClick={handleMenuContentClick}
        ref={ref}
        visualContentRef={visualContentRef}
        // interactionName={interactionName}
        // isContentTooltipDisabled={isContentTooltipDisabled}
        isDragging={isDragging}
        hasDragIndicator={hasDragIndicator}
        dropIndicator={dropIndicator}
      >
        {children}
      </MenuItem>
    </chakra.div>
  )
})
