import React, { forwardRef, type ReactNode, useEffect } from "react"

import { useControlled, usePreviousValue } from "#atlas-packages/ds-lib"
import { Popover, Portal, usePopover } from "@chakra-ui/react"
// import { Popup } from '@atlaskit/popup/experimental';

import { MenuListItem } from "../menu-list-item"

import { IsOpenContext, SetIsOpenContext } from "./flyout-menu-item-context"

export type FlyoutMenuItemProps = {
  children: ReactNode
  id?: string
  isOpen?: boolean
  isDefaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

/**
 * __FlyoutMenuItem__
 *
 * Displays content in a flyout menu, triggered by a button.
 *
 * The top-level component that contains the trigger and content of a flyout menu.
 *
 * Usage example:
 * ```tsx
 * <FlyoutMenuItem>
 *   <FlyoutMenuItemTrigger>Trigger</FlyoutMenuItemTrigger>
 *   <FlyoutMenuItemContent>
 *     <MenuList>
 *       <ButtonMenuItem>Item 1</ButtonMenuItem>
 *       <ButtonMenuItem>Item 2</ButtonMenuItem>
 *     </MenuList>
 *   </FlyoutMenuItemContent>
 * </FlyoutMenuItem>
 * ```
 */

export const FlyoutMenuItem = forwardRef<HTMLDivElement, any>(
  ({ children, id, isOpen: isOpenControlled, isDefaultOpen = false,

     onOpenChange

   }, forwardedRef) => {
    const [isOpen, setIsOpen] = useControlled(isOpenControlled, () => isDefaultOpen)

    const popover = usePopover({
      open: isOpen,
      closeOnInteractOutside: true,
      portalled: true,
      autoFocus: true,
      positioning: {
        placement: 'right-start',
        fitViewport: true,
      },
      onOpenChange: (e) => {
        onOpenChange?.(e.open)
      },
    })

    const previousIsOpen = usePreviousValue(isOpen)

    useEffect(() => {
      if (previousIsOpen === undefined || previousIsOpen === isOpen) {
        return
      }

      onOpenChange?.(isOpen)
    }, [isOpen, onOpenChange, previousIsOpen])

    return (
      <IsOpenContext.Provider value={isOpen}>
        <SetIsOpenContext.Provider value={setIsOpen}>
          <MenuListItem ref={forwardedRef}>
            <Popover.RootProvider value={popover}>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content id={id}>{children}</Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.RootProvider>
          </MenuListItem>
        </SetIsOpenContext.Provider>
      </IsOpenContext.Provider>
    )
  },
)
