import { forwardRef } from "react"
import { chakra, HStack, IconButton, Icon } from "@chakra-ui/react"
import React, { type ReactNode, useCallback, useId, useRef } from "react"
import { LuChevronRight as ChevronRightIcon, LuChevronDown as ChevronDownIcon } from "react-icons/lu"
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

export const nestedOpenPopupCSSSelector = '&:has([aria-expanded="true"][aria-haspopup="true"])'

const chevronDisplayCssVar: string = "--expandable-chevron-display"
const providedElemBeforeDisplayCssVar: string = "--expandable-provided-elembefore-display"

const wrapperStyles = {
  /*
   "--expandable-chevron-display": "none",
   "--expandable-provided-elembefore-display": "contents"
  */
  root: {
    [chevronDisplayCssVar]: "flex",
    [providedElemBeforeDisplayCssVar]: "none",
  },
  showProvidedElemBefore: {
    [chevronDisplayCssVar]: "none",
    [providedElemBeforeDisplayCssVar]: "contents",
    "&:hover, &:has(:focus-visible)": {
      [chevronDisplayCssVar]: "flex",
      [providedElemBeforeDisplayCssVar]: "none",
    },
    [nestedOpenPopupCSSSelector]: {
      [chevronDisplayCssVar]: "flex",
      [providedElemBeforeDisplayCssVar]: "none",
    },
  },
}
//var(--ds-surface-hovered,#f0f1f2)
const iconStyles = {
  chevron: {
    display: `var(${chevronDisplayCssVar})`,
    '[dir="rtl"] &': {
      transform: "scaleX(-1)",
    },
  },
  providedElemBefore: {
    display: `var(${providedElemBeforeDisplayCssVar})`,
  },
  providedElemBeforeSelected: {
    // color: "#1868DB",
  },
}

const ExpandableMenuItemIcon = ({
  iconProps,
  isExpanded,
  isSelected,
  providedElemBefore,
}: Omit<ExpandableMenuItemIconProps, "isHovering">) => {

  const ChevronIcon = isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />
  const chevronElem = (
    <Icon {...iconProps} color={isSelected ? "colorPalette.subtle" : undefined} size="sm">
      {ChevronIcon}
    </Icon>
  )

  //
  // const chevronElem = (
  //   //variant={isSelected ? "solid" : undefined}
  //   // <Icon {...iconProps} size="sm" colorPalette={'yellow'}>
  //     {ChevronIcon}
  //   // </Icon>
  // )

  return (
    <>
      <chakra.div css={iconStyles.chevron}>{chevronElem}</chakra.div>
      {providedElemBefore && (
        <chakra.div
          css={{
            ...iconStyles.providedElemBefore,
            ...(isSelected && iconStyles.providedElemBeforeSelected),
          }}
        >
          <Icon size="sm">{providedElemBefore}</Icon>
        </chakra.div>
      )}
    </>
  )
}

export const ExpandableMenuItemTrigger = forwardRef((props: any, ref: any) => {
  const {
    actions,
    isSelected,
    href,
    elemBefore: providedElemBefore,
    elemAfter,
    actionsOnHover,
    onClick,
    children,
    interactionName,
    isContentTooltipDisabled,
    visualContentRef,
    isDragging,
    hasDragIndicator,
    dropIndicator,
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
    <chakra.button
      css={{ p: 0, m: 0 }}
      // size={"xs"}
      // variant={isSelectable ? "subtle" : "ghost"}
      // variant={"plain"}
      aria-expanded={isExpanded}
      aria-labelledby={id}
      onClick={handleIconClick}
    >
      <ExpandableMenuItemIcon isExpanded={isExpanded} isSelected={isSelected} providedElemBefore={providedElemBefore} />
    </chakra.button>
  ) : (
    providedElemBefore && (
      <ExpandableMenuItemIcon isExpanded={isExpanded} isSelected={isSelected} providedElemBefore={providedElemBefore} />
    )
  )

  return (
    <chakra.div
      ref={itemRef}
      css={{
        ...wrapperStyles.root,
        ...(providedElemBefore && wrapperStyles.showProvidedElemBefore),
      }}
    >
      <MenuItem
        id={id}
        actions={actions}
        actionsOnHover={actionsOnHover}
        elemBefore={elemBefore}
        ariaExpanded={isExpanded}
        elemAfter={elemAfter}
        href={href}
        isSelected={isSelected}
        onClick={handleMenuContentClick}
        ref={ref}
        visualContentRef={visualContentRef}
        interactionName={interactionName}
        isContentTooltipDisabled={isContentTooltipDisabled}
        isDragging={isDragging}
        hasDragIndicator={hasDragIndicator}
        dropIndicator={dropIndicator}
      >
        {children}
      </MenuItem>
    </chakra.div>
  )
})
