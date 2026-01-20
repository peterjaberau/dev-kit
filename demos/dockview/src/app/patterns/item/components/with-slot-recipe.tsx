// Item.tsx

import { forwardRef, ReactNode, MouseEvent, KeyboardEvent } from "react"
import { Grid, GridItem, Text, useSlotRecipe } from "@chakra-ui/react"
import { LuCheck as CheckIcon } from "react-icons/lu"
import { itemRecipe } from "./itemRecipe"

export interface ItemProps {
  children?: ReactNode
  icon?: ReactNode | "checkbox"
  rightIcon?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  description?: ReactNode
  descriptionPlacement?: "inline" | "block"
  actions?: ReactNode | true
  showActionsOnHover?: boolean
  preserveActionsSpace?: boolean
  disableActionsFocus?: boolean
  isSelected?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "inline"
  type?: "item" | "header" | "card" | "link"
  theme?: string
  shape?: "card" | "button" | "sharp" | "pill"
  htmlType?: "button" | "submit" | "reset"
  onClick?: (e: MouseEvent) => void
  onKeyDown?: (e: KeyboardEvent) => void
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
    // 1️⃣ get recipe resolver
    const resolveRecipe = useSlotRecipe({
      key: "item",
      recipe: itemRecipe,
      variants: {
        size,
        type,
        shape,
        descriptionPlacement: description ? descriptionPlacement : "none",
        showActionsOnHover,
        preserveActionsSpace,
      },
    })

    // 2️⃣ CALL it to get slot styles
    const styles = resolveRecipe()

    return (
      <Grid
        ref={ref}
        css={styles.root}
        role="group"
        aria-disabled={isDisabled}
        aria-selected={isSelected}
        data-disabled={isDisabled ? "" : undefined}
        onClick={isDisabled ? undefined : onClick}
        onKeyDown={onKeyDown}
        {...rest}
      >
        {icon && (
          <GridItem area="icon" css={styles.icon}>
            {icon === "checkbox" ? <CheckIcon /> : icon}
          </GridItem>
        )}

        {prefix && (
          <GridItem area="prefix" css={styles.prefix}>
            {prefix}
          </GridItem>
        )}

        {children && (
          <GridItem area="label" css={styles.label}>
            <Text lineClamp={1}>{children}</Text>
          </GridItem>
        )}

        {description && (
          <GridItem area="description" css={styles.description}>
            {description}
          </GridItem>
        )}

        {suffix && (
          <GridItem area="suffix" css={styles.suffix}>
            {suffix}
          </GridItem>
        )}

        {rightIcon && (
          <GridItem area="rightIcon" css={styles.rightIcon}>
            {rightIcon}
          </GridItem>
        )}

        {actions && (
          <GridItem area="actions" css={styles.actions} tabIndex={disableActionsFocus ? -1 : undefined}>
            {actions !== true ? actions : null}
          </GridItem>
        )}
      </Grid>
    )
  },
)

Item.displayName = "Item"
