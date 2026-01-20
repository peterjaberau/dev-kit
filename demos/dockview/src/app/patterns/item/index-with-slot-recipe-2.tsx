import { Item } from "./components/with-recipe-v2"
import { Stack, IconButton, Avatar, Badge } from "@chakra-ui/react"
import {
  Settings as SettingsIcon,
  Edit as EditIcon,
  Trash as DeleteIcon,
  MoreHorizontal as MoreHorizontalIcon,
} from "lucide-react"

export default function IndexWithSlotRecipe2() {
  return (
    <Stack gap={3} maxW="640px">
      {/* 1 — Basic item */}
      <Item onClick={() => console.log("clicked")}>Settings</Item>

      {/* 2 — Icon + inline description */}
      <Item icon={<SettingsIcon size={16} />} description="Configure application behavior">
        Settings
      </Item>

      {/* 3 — Prefix + suffix */}
      <Item
        prefix={
          <Avatar.Root size="xs">
            <Avatar.Fallback name={"John Doe"} />
          </Avatar.Root>
        }
        suffix={<Badge size="sm">Admin</Badge>}
      >
        John Doe
      </Item>

      {/* 4 — Actions always visible */}
      <Item
        actions={
          <>
            <IconButton aria-label="Edit" size="xs" variant="ghost">
              <EditIcon size={14} />
            </IconButton>
            <IconButton aria-label="Delete" size="xs" variant="ghost">
              <DeleteIcon size={14} />
            </IconButton>
          </>
        }
      >
        Project Alpha
      </Item>

      {/* 5 — Actions on hover */}
      <Item
        showActionsOnHover
        actions={
          <IconButton aria-label="More" size="xs" variant="ghost">
            <MoreHorizontalIcon size={14} />
          </IconButton>
        }
      >
        Hover me
      </Item>

      {/* 6 — Hover actions, preserved layout */}
      <Item
        showActionsOnHover
        preserveActionsSpace
        actions={
          <IconButton aria-label="More" size="xs" variant="ghost">
            <MoreHorizontalIcon size={14} />
          </IconButton>
        }
      >
        Stable layout
      </Item>

      {/* 7 — Card item with block description */}
      <Item type="card" descriptionPlacement="block" description="This description wraps and aligns below the label.">
        Card item title
      </Item>

      {/* 8 — Checkbox item */}
      <Item icon="checkbox" isSelected>
        Select this option
      </Item>

      {/* 9 — Disabled item */}
      <Item isDisabled>Disabled item</Item>

      {/* 10 — Link item */}
      <Item type="link" onClick={() => window.open("https://example.com")}>
        External link
      </Item>
    </Stack>
  )
}
