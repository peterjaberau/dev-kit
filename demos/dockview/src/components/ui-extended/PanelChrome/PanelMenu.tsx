import { useCallback } from "react"

import { IconButton, Menu, Portal } from "@chakra-ui/react"
import { LuEllipsisVertical as EllipsisVerticalIcon } from "react-icons/lu"

const items = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
]

interface PanelMenuProps {
  menuItems: any[]
  menuButtonClass?: string
  dragClassCancel?: string
  title?: string
  placement?: any
  offset?: any
  onOpenMenu?: () => void
  css?: any
}

export function PanelMenu({
  menuItems,
  title,
  placement = "bottom",
  offset,
  dragClassCancel,
  onOpenMenu,
}: PanelMenuProps) {
  const handleVisibility = useCallback(
    (details: any) => {
      if (details.open && onOpenMenu) {
        onOpenMenu()
      }
    },
    [onOpenMenu],
  )

  return (
    <>
      <Menu.Root positioning={{ placement: placement, offset: offset }} onOpenChange={handleVisibility}>
        <Menu.Trigger asChild>
          <IconButton
            aria-label={`Menu Panel for ${title ?? "Untitled"}`}
            title="Menu"
            variant="ghost"
            size="sm"
            className={dragClassCancel}
          >
            <EllipsisVerticalIcon />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {menuItems.map((item: any) => (
                <Menu.Item key={item.value} value={item.value}>
                  {item.label || item.value}
                  <Menu.ItemIndicator />
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  )
}
