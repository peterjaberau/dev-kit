"use client"
import { createSlotRecipeContext } from "@chakra-ui/react"
import { menuSlotRecipe } from "./menu-slot-recipe"
import * as Primitive from "./namespaces/primitive"

const {
  withProvider,
  withContext,
  useStyles: useMenuStyles,
  PropsProvider: MenuPropsProvider,
} = createSlotRecipeContext({ recipe: menuSlotRecipe })

export { useMenuStyles }

export const Root: any = withProvider(Primitive.Root, "root", { forwardAsChild: true })
export const PropsProvider: any = MenuPropsProvider

export const List: any = withContext(Primitive.List, "list", {
  forwardAsChild: true,
})

export const ListItem: any = withContext(Primitive.ListItem, "listItem", {
  forwardAsChild: true,
})

export const MenuList: any = withContext(Primitive.MenuList, "menuList", {
  forwardAsChild: true,
})

export const MenuListItem: any = withContext(Primitive.MenuListItem, "menuListItem", {
  forwardAsChild: true,
})

export const ExpandableMenuItem: any = withContext(Primitive.MenuItem, "expandableMenuItem", {
  forwardAsChild: true,
})

export const ExpandableMenuItemContent: any = withContext(
  Primitive.ExpandableMenuItemContent,
  "expandableMenuItemContent",
  {
    forwardAsChild: true,
  },
)

export const ExpandableMenuItemTrigger: any = withContext(
  Primitive.ExpandableMenuItemTrigger,
  "expandableMenuItemTrigger",
  {
    forwardAsChild: true,
  },
)

export const MenuItem: any = withContext(Primitive.MenuItem, "menuItem", {
  forwardAsChild: true,
})

export const MenuItemActions: any = withContext(Primitive.MenuItemActions, "menuItemActions", {
  forwardAsChild: true,
})
export const MenuItemElementAfter: any = withContext(Primitive.MenuItemElementAfter, "menuItemElementAfter", {
  forwardAsChild: true,
})
export const MenuItemElementBefore: any = withContext(Primitive.MenuItemElementBefore, "menuItemElementBefore", {
  forwardAsChild: true,
})
export const MenuItemElementInteractive: any = withContext(
  Primitive.MenuItemElementInteractive,
  "menuItemElementInteractive",
  {
    forwardAsChild: true,
  },
)

export const MenuSection: any = withContext(Primitive.MenuItemElementInteractive, "menuSection", {
  forwardAsChild: false,
})
export const MenuSectionDivider: any = withContext(Primitive.MenuItemElementInteractive, "menuSectionDivider", {
  forwardAsChild: false,
})
export const MenuSectionHeading: any = withContext(Primitive.MenuItemElementInteractive, "menuSectionHeading", {
  forwardAsChild: false,
})

export const ItemButton: any = withContext(Primitive.ItemButton, "itemButton", {
  forwardAsChild: true,
})

export const ItemCustom: any = withContext(Primitive.ItemCustom, "itemCustom", {
  forwardAsChild: true,
})

export const ItemLink: any = withContext(Primitive.ItemLink, "itemLink", {
  forwardAsChild: true,
})

export const ItemText: any = withContext(Primitive.ItemText, "itemText", {
  forwardAsChild: true,
})

export const DndDragHandle: any = withContext(Primitive.DndDragHandle, "dndDragHandle", {
  forwardAsChild: true,
})

export const DndDragPreview: any = withContext(Primitive.DndDragPreview, "dndDragPreview", {
  forwardAsChild: true,
})

export const DropIndicator: any = withContext(Primitive.DropIndicator, "dropIndicator", {
  forwardAsChild: true,
})

export const GroupDropIndicator: any = withContext(Primitive.GroupDropIndicator, "groupDropIndicator", {
  forwardAsChild: true,
})

export const DndHitbox: any = withContext(Primitive.DndHitbox, "dndHitbox", {
  forwardAsChild: true,
})

/**
 *
 * "root",
 *     "list",
 *     "listItem",
 *     "menuList",
 *     "menuListItem",
 *
 *     "menuItem",
 *     "menuItemActions",
 *     "menuItemElementAfter",
 *     "menuItemElementBefore",
 *     "menuItemElementInteractive",
 *
 *     "menuSection",
 *     "menuSectionDivider",
 *     "menuSectionHeading",
 *
 *     "expandableMenuItem",
 *     "expandableMenuItemContent",
 *     "expandableMenuItemTrigger",
 *
 *     "itemButton",
 *     "itemCustom",
 *     "itemLink",
 *     "itemText",
 *
 *     "dndDragHandle",
 *     "dndDragPreview",
 *     "dndDropIndicator",
 *     "dndGroupIndicator",
 *     "dndHitbox",
 */
