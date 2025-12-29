import React, { forwardRef } from "react"

import { MenuItemBase } from "./menu-item"
import { MenuListItem } from "./menu-list-item"
import type { MenuItemLinkOrButtonCommonProps, MenuItemOnClick } from "./types"

export type ButtonMenuItemProps = MenuItemLinkOrButtonCommonProps & {
  isDisabled?: boolean
  onClick?: MenuItemOnClick<HTMLButtonElement>
  "aria-controls"?: string
  "aria-expanded"?: boolean
  "aria-haspopup"?: boolean | "dialog"
}

export const ButtonMenuItem: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ButtonMenuItemProps> & React.RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, ButtonMenuItemProps>(
  (
    {
      testId,
      actions,
      children,
      description,
      elemAfter,
      isDisabled,
      isSelected,
      elemBefore,
      actionsOnHover,
      onClick,
      "aria-controls": ariaControls,
      "aria-expanded": ariaExpanded,
      "aria-haspopup": ariaHasPopup,
      interactionName,
      isContentTooltipDisabled,
      visualContentRef,
      listItemRef,
      isDragging,
      hasDragIndicator,
      dropIndicator,
    },
    forwardedRef,
  ) => {
    return (
      <MenuListItem ref={listItemRef}>
        <MenuItemBase
          testId={testId}
          description={description}
          elemAfter={elemAfter}
          elemBefore={elemBefore}
          isDisabled={isDisabled}
          /**
           * Not passing `actions` and `actionsOnHover` to MenuItemBase when `isDisabled`,
           * so they aren't rendered in the disabled state.
           */
          actions={isDisabled ? undefined : actions}
          actionsOnHover={isDisabled ? undefined : actionsOnHover}
          onClick={onClick}
          ariaControls={ariaControls || undefined}
          ariaExpanded={ariaExpanded || undefined}
          ariaHasPopup={ariaHasPopup || undefined}
          isSelected={isSelected || undefined}
          ref={forwardedRef}
          visualContentRef={visualContentRef}
          interactionName={interactionName}
          isContentTooltipDisabled={isContentTooltipDisabled}
          isDragging={isDragging}
          hasDragIndicator={hasDragIndicator}
          dropIndicator={dropIndicator}
        >
          {children}
        </MenuItemBase>
      </MenuListItem>
    )
  },
)
