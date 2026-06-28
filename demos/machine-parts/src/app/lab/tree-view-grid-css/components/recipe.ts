import { defineSlotRecipe } from "@chakra-ui/react";

export const treeViewRecipe = defineSlotRecipe({
  className: "tree-view-grid-css",
  slots: [
    "root",
    "label",
    "tree",
    "node",
    "item",
    "itemIndent",
    "itemStart",
    "itemContent",
    "itemEnd",
    "nodeChild",
    "toggle",
    "icon",
    "text",
    "meta",
  ],
  base: {
    root: {
      colorPalette: "teal",
      display: "flex",
      flexDirection: "column",
      gap: 3,
      w: "full",
      maxW: "32rem",
      p: 4,
      bg: "bg.panel",
      borderWidth: "1px",
      borderColor: "border",
      borderRadius: "lg",
      shadow: "sm",
    },
    label: {
      color: "fg.muted",
      fontSize: "xs",
      fontWeight: "semibold",
      letterSpacing: "0",
      textTransform: "uppercase",
    },
    tree: {
      "--tree-start-width": "1.75rem",
      display: "flex",
      flexDirection: "column",
      gap: 0.5,
      outline: "none",
    },
    node: {
      "--item-indent-width": "max(8px, calc(var(--level) * 8px))",
      display: "flex",
      flexDirection: "column",
      gap: 0.5,
      color: "fg",
      contentVisibility: "auto",
      containIntrinsicSize: "auto 2rem",
      position: "relative",
      isolation: "isolate",
      outline: "none",
      "& > [data-slot]": {
        position: "relative",
        zIndex: 1,
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.focusRing",
        outlineOffset: "2px",
      },
    },
    item: {
      display: "grid",
      gridTemplateColumns:
        "var(--item-indent-width) var(--tree-start-width) minmax(0, 1fr) auto",
      gridTemplateAreas: `
        "item-indent item-start item-content item-end"
      `,
      alignItems: "center",
      minH: 8,
      position: "relative",
      "& > [data-slot]": {
        position: "relative",
        zIndex: 1,
      },
    },
    itemIndent: {
      gridArea: "item-indent",
      alignSelf: "stretch",
      w: "full",
      minH: 8,
      minW: 0,
    },
    itemStart: {
      gridArea: "item-start",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minH: 8,
    },
    itemContent: {
      gridArea: "item-content",
      display: "flex",
      alignItems: "center",
      gap: 2,
      minW: 0,
      minH: 8,
      ps: 2,
      cursor: "default",
    },
    itemEnd: {
      gridArea: "item-end",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      minH: 8,
      pe: 2,
    },
    nodeChild: {
      display: "flex",
      flexDirection: "column",
      gap: 0.5,
      ms: "var(--item-indent-width)",
    },
    toggle: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxSize: 7,
      color: "fg.muted",
      borderRadius: "sm",
      borderWidth: "0",
      bg: "transparent",
      cursor: "pointer",
      _hover: {
        bg: "bg.muted",
        color: "fg",
      },
      _disabled: {
        cursor: "default",
        opacity: 0,
      },
      "& svg": {
        boxSize: 4,
        transition: "transform 120ms ease",
      },
      "&[data-expanded=true] svg": {
        transform: "rotate(90deg)",
      },
    },
    icon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      color: "fg.muted",
      "& svg": {
        boxSize: 4,
      },
    },
    text: {
      minW: 0,
      overflow: "hidden",
      fontSize: "sm",
      fontWeight: "medium",
      lineHeight: "1.35",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    meta: {
      color: "fg.subtle",
      fontSize: "xs",
      lineHeight: "1",
      whiteSpace: "nowrap",
    },
  },
  variants: {
    fullRowHighlight: {
      true: {
        node: {
          "&:hover:not(:has(> [data-slot=node-child]:hover)) > [data-slot=item] > :is([data-slot=item-indent], [data-slot=item-start], [data-slot=item-content], [data-slot=item-end])":
            {
              bg: "bg.subtle",
            },
          "&[data-selected] > [data-slot=item] > :is([data-slot=item-indent], [data-slot=item-start], [data-slot=item-content], [data-slot=item-end])":
            {
              bg: "colorPalette.subtle",
            },
          "& > [data-slot=item] > [data-slot=item-indent]": {
            borderStartRadius: "sm",
          },
          "& > [data-slot=item] > [data-slot=item-end]": {
            borderEndRadius: "sm",
          },
          "&[data-selected]": {
            color: "colorPalette.fg",
          },
        },
      },
      false: {
        node: {
          "&:hover:not(:has(> [data-slot=node-child]:hover)) > [data-slot=item] > :is([data-slot=item-content], [data-slot=item-end])":
            {
              bg: "bg.subtle",
            },
          "&[data-selected] > [data-slot=item] > :is([data-slot=item-content], [data-slot=item-end])":
            {
              bg: "colorPalette.subtle",
            },
          "&[data-branch=true]:hover:not(:has(> [data-slot=node-child]:hover)) > [data-slot=item] > [data-slot=item-start]":
            {
              bg: "bg.subtle",
            },
          "&[data-branch=true][data-selected] > [data-slot=item] > [data-slot=item-start]": {
            bg: "colorPalette.subtle",
          },
          "& > [data-slot=item] > [data-slot=item-content]": {
            borderStartRadius: "sm",
          },
          "&[data-branch=true] > [data-slot=item] > [data-slot=item-start]": {
            borderStartRadius: "sm",
          },
          "&[data-branch=true] > [data-slot=item] > [data-slot=item-content]": {
            borderStartRadius: "0",
          },
          "& > [data-slot=item] > [data-slot=item-end]": {
            borderEndRadius: "sm",
          },
          "&[data-selected]": {
            color: "colorPalette.fg",
          },
        },
      },
    },
    fullNodeHighlight: {
      true: {},
      false: {},
    },
    expandOnNodeClick: {
      true: {
        node: {
          "&[data-branch=true]": {
            cursor: "pointer",
          },
          "&[data-branch=true] > [data-slot=item] > :is([data-slot=item-content], [data-slot=item-end])":
            {
              cursor: "pointer",
            },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    fullRowHighlight: true,
    fullNodeHighlight: false,
    expandOnNodeClick: false,
  },
  compoundVariants: [
    {
      fullNodeHighlight: true,
      fullRowHighlight: true,
      css: {
        node: {
          "&[data-branch=true]::before": {
            content: "\"\"",
            position: "absolute",
            inset: 0,
            borderRadius: "sm",
            pointerEvents: "none",
            zIndex: 0,
          },
          "&[data-branch=true]:hover:not(:has(> [data-slot=node-child]:hover))::before":
            {
              bg: "bg.subtle",
            },
          "&[data-branch=true][data-selected]::before": {
            bg: "colorPalette.subtle",
          },
        },
      },
    },
    {
      fullNodeHighlight: true,
      fullRowHighlight: false,
      css: {
        node: {
          "&[data-branch=true]::before": {
            content: "\"\"",
            position: "absolute",
            insetBlock: 0,
            insetInlineStart: "var(--item-indent-width)",
            insetInlineEnd: 0,
            borderRadius: "sm",
            pointerEvents: "none",
            zIndex: 0,
          },
          "&[data-branch=true]:hover:not(:has(> [data-slot=node-child]:hover))::before":
            {
              bg: "bg.subtle",
            },
          "&[data-branch=true][data-selected]::before": {
            bg: "colorPalette.subtle",
          },
        },
      },
    },
  ],
});
