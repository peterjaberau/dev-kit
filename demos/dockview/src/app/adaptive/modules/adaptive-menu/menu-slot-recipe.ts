import { defineSlotRecipe } from "@chakra-ui/react"

export const menuSlotRecipe = defineSlotRecipe({
  slots: [
    "root",
    "list",
    "listItem",
    "menuList",
    "menuListItem",

    "menuItem",
    "menuItemActions",
    "menuItemElementAfter",
    "menuItemElementBefore",
    "menuItemElementInteractive",

    "menuSection",
    "menuSectionDivider",
    "menuSectionHeading",

    "expandableMenuItem",
    "expandableMenuItemContent",
    "expandableMenuItemTrigger",

    "itemButton",
    "itemCustom",
    "itemLink",
    "itemText",

    "dndDragHandle",
    "dndDragPreview",
    "dndDropIndicator",
    "dndGroupDropIndicator",
    "dndHitbox",
  ],
  className: "adaptive-menu",
  base: {
    root: {
      "--expandableMenuItemIndentation": "12px",

      width: "full",
      display: "flex",
      flexDirection: "column",
      gap: "2",
    },
    list: {},
    listItem: {},
    menuList: {},
    menuListItem: {},
    menuItem: {
      "--notch-color": "transparent",
      "--elem-after-display": "flex",
      "--actions-on-hover-width": "0",
      "--actions-on-hover-opacity": "0",
      "--actions-on-hover-padding": "0",
      '&:has([ariaExpanded="true"][aria-haspopup="true"])': {
        "--actions-on-hover-opacity": "1",
        "--actions-on-hover-width": "auto",
        "--actions-on-hover-padding": "4px",
        backgroundColor: "#f0f1f2",
      },
      _hover: {
        backgroundColor: "#f0f1f2",
        _focusWithin: {
          "--actions-on-hover-opacity": "1",
          "--actions-on-hover-width": "auto",
          "--actions-on-hover-padding": "4px",
        },
      },
      '&[data-dragging="true"]': {
        opacity: 0.4,
      },
      boxSizing: "border-box",
      display: "grid",
      gridTemplateColumns: "minmax(0, auto) 1fr minmax(0, auto) minmax(0, auto)",
      gridTemplateRows: "1fr",
      gridTemplateAreas: '"elem-before interactive elem-after actions"',
      minWidth: "72px",
      height: "2rem",
      alignItems: "center",
      userSelect: "none",
      borderRadius: "sm",
      color: "#505258",
    },
    menuItemActions: {
      gridArea: "actions",
      alignItems: "center",
      gap: "4px",
      paddingInlineEnd: "4px",
      overflow: "hidden",
      _focusWithin: {
        overflow: "initial",
      },
    },
    menuItemElementAfter: {
      display: "var(--elem-after-display)",
      gridArea: "elem-after",
      flexShrink: 0,
      height: "24px",
      alignItems: "center",
      paddingInlineEnd: "4",
      overflow: "hidden",
      _focusWithin: {
        overflow: "initial",
      },
    },
    menuItemElementBefore: {
      gridArea: "elem-before",
      display: "flex",
      flexShrink: 0,
      width: "24px",
      height: "24px",
      alignItems: "center",
      justifyContent: "center",
      paddingInlineStart: "4px",
      boxSizing: "content-box",
      overflow: "hidden",
      _focusWithin: {
        overflow: "initial",
      },
    },
    menuItemElementInteractive: {
      gridArea: "interactive",
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
    },
    menuSection: {},
    menuSectionDivider: {},
    menuSectionHeading: {},
    expandableMenuItem: {},
    expandableMenuItemContent: {},
    expandableMenuItemTrigger: {},
    itemButton: {},
    itemCustom: {},
    itemLink: {},
    itemText: {
      margin: "0px",
      padding: "0px",
      gap: "2px",
      overflow: "hidden",
      display: "flex",
      paddingInlineEnd: "4px",
      paddingInlineStart: "4px",
      flexDirection: "column",
      minWidth: "1ch",
      _focusWithin: {
        overflow: "initial",
      },
    },
    dndDragHandle: {},
    dndDragPreview: {},
    dndDropIndicator: {},
    dndGroupDropIndicator: {},
    dndHitbox: {},
  },
  variants: {},
  compoundVariants: [
    /*





     */
  ],
  defaultVariants: {},
})
