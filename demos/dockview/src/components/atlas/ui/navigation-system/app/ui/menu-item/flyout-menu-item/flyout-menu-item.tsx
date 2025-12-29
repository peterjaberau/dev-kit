import React, { forwardRef, type ReactNode, useEffect } from "react"

import { useControlled, usePreviousValue } from "#atlas-packages/ds-lib"
import { Popover, Portal, Card } from "@chakra-ui/react"
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

export const FlyoutMenuItem = forwardRef<HTMLDivElement, any>(
  ({ children, trigger, id, isDefaultOpen = false }, forwardedRef) => {
    return (
      <MenuListItem ref={forwardedRef}>
        <Popover.Root
          positioning={{
            placement: "right-start",
            fitViewport: true,
          }}
          portalled={true}
          autoFocus={true}
          defaultOpen={isDefaultOpen}
        >
          <Popover.Trigger>{trigger}</Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content>
                <Popover.Body>
                  <Card.Root id={id}>{children}</Card.Root>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </MenuListItem>
    )
  },
)
