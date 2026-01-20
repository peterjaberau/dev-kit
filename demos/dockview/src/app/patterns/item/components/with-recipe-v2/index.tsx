// Item.tsx
import { forwardRef, ReactNode, MouseEvent, KeyboardEvent } from "react"
import { Grid, GridItem, Text, chakra, useSlotRecipe } from "@chakra-ui/react"
import { LuCheck as CheckIcon } from "react-icons/lu"
import { itemRecipe } from "./item-slot-recipe"

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
      preserveActionsSpace = true,
      disableActionsFocus = true,
      isSelected,
      isDisabled,
      size = "medium",
      type = "item",
      shape = "button",
      onClick,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {


    const recipe = useSlotRecipe({ recipe: itemRecipe })

    const styles = recipe({
      size,
      type,
      shape,
      descriptionPlacement: description ? descriptionPlacement : "none",
      showActionsOnHover,
      preserveActionsSpace,
    })


    return (
      <chakra.div
        ref={ref}
        css={styles.root}
        role="group"
        aria-disabled={isDisabled}
        aria-selected={isSelected}
        data-selected={isSelected ? "" : undefined}
        data-disabled={isDisabled ? "" : undefined}
        onClick={isDisabled ? undefined : onClick}
        onKeyDown={onKeyDown}
        {...rest}
      >
        {icon && (
          <chakra.div css={styles.icon}>
            {icon === "checkbox" ? <CheckIcon /> : icon}
          </chakra.div>
        )}

        {prefix && (
          <chakra.div css={styles.prefix}>
            {prefix}
          </chakra.div>
        )}

        {children && (
          <chakra.div css={styles.label}>
            <Text>{children}</Text>
          </chakra.div>
        )}

        {description && (
          <chakra.div css={styles.description}>
            {description}
          </chakra.div>
        )}

        {suffix && (
          <chakra.div css={styles.suffix}>
            {suffix}
          </chakra.div>
        )}

        {rightIcon && (
          <chakra.div css={styles.rightIcon}>
            {rightIcon}
          </chakra.div>
        )}

        {actions && (
          <chakra.div
            css={styles.actions}
            tabIndex={disableActionsFocus ? -1 : undefined}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {actions !== true ? actions : null}
          </chakra.div>
        )}
      </chakra.div>
    )
  },
)

Item.displayName = "Item"
