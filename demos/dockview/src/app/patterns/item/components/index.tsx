import { forwardRef, ReactNode, MouseEvent, KeyboardEvent, PointerEvent } from "react"
import { Box, Grid, GridItem, Flex, Text, Icon, chakra, useToken } from "@chakra-ui/react"
import { LuCheck as CheckIcon } from "react-icons/lu"

export type ItemSize = "xsmall" | "small" | "medium" | "large" | "xlarge" | "inline" | number | string

export type ItemType =
  | "item"
  | "header"
  | "primary"
  | "secondary"
  | "outline"
  | "neutral"
  | "clear"
  | "link"
  | "card"
  | string

export type ItemTheme = "default" | "danger" | "success" | "special" | "note" | string

/**
 *
 * @property {ReactNode | "checkbox"} [icon] - The leading icon or "checkbox" for a checkbox icon.
 * @property {ReactNode} [icon] - The leading icon or "checkbox" for a checkbox icon.
 *
 *
 * Whether the item is selected.
 * @default false
 *
 *
 */

// TODO: hotkeys, tooltip

export interface ItemProps {
  icon?: ReactNode | "checkbox"
  /**
   * The leading icon or "checkbox" for a checkbox icon.
   */
  rightIcon?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  description?: ReactNode
  descriptionPlacement?: "inline" | "block"
  /**
   * Whether the item is selected.
   * @default false
   */
  isSelected?: boolean
  /**
   * When true, actions are hidden by default and shown only on hover, focus, or focus-within.
   * Uses opacity transition for visual hiding while maintaining layout space.
   */
  actions?: ReactNode | true
  showActionsOnHover?: boolean
  /**
   * When true, preserves the actions width when hidden (only changes opacity).
   * Only applies when showActionsOnHover is true.
   * @default false
   */
  preserveActionsSpace?: boolean
  /**
   * When true, disables focus on action buttons by setting tabIndex={-1}.
   * @default true
   */
  disableActionsFocus?: boolean
  size?: ItemSize
  theme?: ItemTheme



  children?: ReactNode

  isDisabled?: boolean
  isLoading?: boolean

  type?: ItemType
  shape?: "card" | "button" | "sharp" | "pill"

  htmlType?: "button" | "submit" | "reset"

  onClick?: (e: MouseEvent) => void
  onKeyDown?: (e: KeyboardEvent) => void
}


const ACTION_EVENT_HANDLERS = {
  onClick: (e: MouseEvent) => e.stopPropagation(),
  onPointerDown: (e: PointerEvent) => e.stopPropagation(),
  onPointerUp: (e: PointerEvent) => e.stopPropagation(),
  onMouseDown: (e: MouseEvent) => e.stopPropagation(),
  onMouseUp: (e: MouseEvent) => e.stopPropagation(),
  onKeyDown: (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") e.stopPropagation()
  },
}


export const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      children,
      icon,
      rightIcon,
      prefix,
      suffix,
      description,
      descriptionPlacement = "inline",
      actions,
      showActionsOnHover = false,
      preserveActionsSpace = false,
      disableActionsFocus = true,
      isSelected,
      isDisabled,
      isLoading,
      size = "medium",
      type = "item",
      theme = "default",
      shape = "button",
      htmlType = "button",
      onClick,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    /* ---------------------------------------------------------------------------------------------
     * Derived flags
     * -------------------------------------------------------------------------------------------*/

    const hasIcon = !!icon
    const hasRightIcon = !!rightIcon
    const hasPrefix = !!prefix
    const hasSuffix = !!suffix
    const hasActions = !!actions
    const hasDescription = !!description
    const hasLabel = !!children

    /* ---------------------------------------------------------------------------------------------
     * Grid template definitions (Chakra-native)
     * -------------------------------------------------------------------------------------------*/

    const gridTemplateColumns = "max-content max-content 1fr max-content max-content max-content"

    const gridTemplateAreas = (() => {
      if (descriptionPlacement === "block" && hasDescription) {
        return `
          "icon prefix label suffix rightIcon actions"
          "description description description description description description"
        `
      }

      if (descriptionPlacement === "inline" && hasDescription && hasLabel) {
        return `
          "icon prefix label suffix rightIcon actions"
          "icon prefix description suffix rightIcon actions"
        `
      }

      if (descriptionPlacement === "inline" && hasDescription) {
        return `
          "icon prefix description suffix rightIcon actions"
        `
      }

      return `
        "icon prefix label suffix rightIcon actions"
      `
    })()

    /* ---------------------------------------------------------------------------------------------
     * Styling tokens (fully Chakra-native)
     * -------------------------------------------------------------------------------------------*/

    const borderRadius = shape === "card" ? "lg" : shape === "pill" ? "full" : shape === "sharp" ? "none" : "md"

    const cursor = isDisabled ? "not-allowed" : type === "link" ? "pointer" : "inherit"

    /* ---------------------------------------------------------------------------------------------
     * Render
     * -------------------------------------------------------------------------------------------*/

    return (
      <Grid
        ref={ref}
        as="div"
        role="button"
        aria-disabled={isDisabled}
        aria-selected={isSelected}
        tabIndex={isDisabled ? -1 : 0}
        templateColumns={gridTemplateColumns}
        templateAreas={gridTemplateAreas}
        alignItems="stretch"
        position="relative"
        boxSizing="border-box"
        minH="var(--item-size)"
        px={type === "card" ? 2 : 0}
        borderRadius={borderRadius}
        cursor={cursor}
        opacity={isDisabled ? 0.6 : 1}
        bg={isSelected ? "gray.100" : type === "card" ? "gray.50" : "transparent"}
        _hover={{
          bg: isDisabled ? undefined : "gray.50",
        }}
        _focusVisible={{
          outline: "2px solid",
          outlineColor: "blue.400",
        }}
        onClick={isDisabled ? undefined : onClick}
        onKeyDown={onKeyDown}
        {...rest}
      >
        {/* ICON SLOT */}
        {hasIcon && (
          <GridItem area="icon" display="grid" placeItems="center">
            {icon === "checkbox" ? <CheckIcon /> : icon}
          </GridItem>
        )}

        {/* PREFIX SLOT */}
        {hasPrefix && (
          <GridItem area="prefix" display="grid" placeItems="center">
            {prefix}
          </GridItem>
        )}

        {/* LABEL SLOT */}
        {hasLabel && (
          <GridItem area="label" alignSelf="center">
            <Text lineClamp={1} fontWeight={type === "header" || type === "card" ? "semibold" : "normal"}>
              {children}
            </Text>
          </GridItem>
        )}

        {/* DESCRIPTION SLOT */}
        {hasDescription && (
          <GridItem area="description" alignSelf="center">
            <Text fontSize="sm" opacity={0.75} lineClamp={descriptionPlacement === "inline" ? 1 : undefined}>
              {description}
            </Text>
          </GridItem>
        )}

        {/* SUFFIX SLOT */}
        {hasSuffix && (
          <GridItem area="suffix" display="grid" placeItems="center">
            {suffix}
          </GridItem>
        )}

        {/* RIGHT ICON SLOT */}
        {hasRightIcon && (
          <GridItem area="rightIcon" display="grid" placeItems="center">
            {rightIcon}
          </GridItem>
        )}

        {/* ACTIONS SLOT */}
        {hasActions && (
          <GridItem
            area="actions"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap={1}
            opacity={showActionsOnHover && !preserveActionsSpace ? 0 : 1}
            _groupHover={{
              opacity: 1,
            }}
            transition="opacity 0.2s ease"
            {...ACTION_EVENT_HANDLERS}
          >
            {actions !== true ? actions : null}
          </GridItem>
        )}
      </Grid>
    )
  },
)

Item.displayName = "Item"
