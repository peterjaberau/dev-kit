import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"
import { MenuListItem } from "./menu-list-item"
import { MenuItem } from "./menu-item"

export const ItemButton = forwardRef((props: any, ref: any) => {
  const {
    visualContentRef,
    dropIndicator,
    onClick,
    isDragging,
    css,
    children,

    description,
    listItemRef,
    interactionName,
    hasDragIndicator,
    elemBefore,
    elemAfter,
    isDisabled,


    actions,
    isSelected,
    actionsOnHover,
    'aria-controls': ariaControls,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    isContentTooltipDisabled,
  } = props

  return (
    <chakra.div
      data-scope="item-button"
      css={{
        ...css,
      }}
    >
      <MenuListItem ref={listItemRef}>
        <MenuItem
          description={description}
          elemAfter={elemAfter}
          elemBefore={elemBefore}
          isDisabled={isDisabled}
          actions={isDisabled ? undefined : actions}
          actionsOnHover={isDisabled ? undefined : actionsOnHover}
          onClick={onClick}
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
      </MenuListItem>
    </chakra.div>
  )
})
