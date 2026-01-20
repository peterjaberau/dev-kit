import { forwardRef, ReactNode, MouseEvent, KeyboardEvent } from "react"
import { chakra, useSlotRecipe, Text } from "@chakra-ui/react"
import { LuCheck as CheckIcon } from "react-icons/lu"
import { itemSlotRecipe } from "./item-slot-recipe"

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

export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const {
    children,
    icon,
    rightIcon,
    prefix,
    suffix,
    description,
    descriptionPlacement,
    actions,
    showActionsOnHover = false,
    disableActionsFocus = false,
    isSelected,
    isDisabled,
    size = "medium",
    type = "item",
    shape = "button",
    onClick,
    onKeyDown,
    ...rest
  } = props

  const recipe = useSlotRecipe({ recipe: itemSlotRecipe })

  const hasLabel = Boolean(children)
  const hasIcon = Boolean(icon)
  const hasRightIcon = Boolean(rightIcon)
  const hasPrefix = Boolean(prefix)
  const hasSuffix = Boolean(suffix)
  const hasDescription = Boolean(description)
  const hasActions = Boolean(actions)

  const finalDescriptionPlacement = description
    ? (descriptionPlacement ?? ((type === "card" || type === "header") && hasLabel ? "block" : "inline"))
    : "none"

  const styles = recipe({
    size,
    type,
    shape,
    showActionsOnHover,
  })

  return (
    <chakra.div
      ref={ref}
      css={styles.root}
      role="group"
      aria-disabled={isDisabled}
      aria-selected={isSelected}
      data-disabled={isDisabled ? "" : undefined}
      data-selected={isSelected ? "" : undefined}
      data-has-icon={hasIcon ? "" : undefined}
      data-has-right-icon={hasRightIcon ? "" : undefined}
      data-has-prefix={hasPrefix ? "" : undefined}
      data-has-suffix={hasSuffix ? "" : undefined}
      data-has-label={hasLabel ? "" : undefined}
      data-has-description={hasDescription ? "" : undefined}
      data-has-actions={hasActions ? "" : undefined}
      data-description={finalDescriptionPlacement}
      onClick={isDisabled ? undefined : onClick}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {hasIcon && <chakra.div css={styles.icon}>{icon === "checkbox" ? <CheckIcon /> : icon}</chakra.div>}

      {prefix && <chakra.div css={styles.prefix}>{prefix}</chakra.div>}

      {hasLabel && (
        <chakra.div css={styles.label}>
          <Text>{children}</Text>
        </chakra.div>
      )}

      {hasDescription && <chakra.div css={styles.description}>{description}</chakra.div>}

      {suffix && <chakra.div css={styles.suffix}>{suffix}</chakra.div>}

      {hasRightIcon && <chakra.div css={styles.rightIcon}>{rightIcon}</chakra.div>}

      {hasActions && (
        <chakra.div
          css={styles.actions}
          tabIndex={disableActionsFocus ? -1 : undefined}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") e.stopPropagation()
          }}
        >
          {actions !== true ? actions : null}
        </chakra.div>
      )}
    </chakra.div>
  )
})

Item.displayName = "Item"
