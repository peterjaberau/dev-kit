import { defineSlotRecipe } from "@chakra-ui/react";

export const treeViewRecipe = defineSlotRecipe({
  className: "tree-view-grid-css",
  slots: [
    "root",
    "label",
    "tree",
    "node",
    "nodeIndent",
    "nodeStart",
    "nodeContent",
    "nodeEnd",
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
      "--node-indent-width": "max(8px, calc(var(--level) * 8px))",
      display: "grid",
      gridTemplateColumns:
        "var(--node-indent-width) var(--tree-start-width) minmax(0, 1fr) auto",
      gridTemplateAreas: `
        "node-indent node-start node-content node-end"
        ". node-child node-child node-child"
      `,
      alignItems: "center",
      minH: 8,
      color: "fg",
      contentVisibility: "auto",
      containIntrinsicSize: "auto 2rem",
      outline: "none",
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.focusRing",
        outlineOffset: "2px",
      },
    },
    nodeIndent: {
      gridArea: "node-indent",
      alignSelf: "stretch",
      w: "full",
      minH: 8,
      minW: 0,
    },
    nodeStart: {
      gridArea: "node-start",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minH: 8,
    },
    nodeContent: {
      gridArea: "node-content",
      display: "flex",
      alignItems: "center",
      gap: 2,
      minW: 0,
      minH: 8,
      ps: 2,
      cursor: "default",
    },
    nodeEnd: {
      gridArea: "node-end",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      minH: 8,
      pe: 2,
    },
    nodeChild: {
      gridArea: "node-child",
      display: "flex",
      flexDirection: "column",
      gap: 0.5,
      mt: 0.5,
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
          "&:hover:not(:has(> [data-slot=node-child]:hover)) > :is([data-slot=node-indent], [data-slot=node-start], [data-slot=node-content], [data-slot=node-end])":
            {
              bg: "bg.subtle",
            },
          "&[data-selected] > :is([data-slot=node-indent], [data-slot=node-start], [data-slot=node-content], [data-slot=node-end])":
            {
              bg: "colorPalette.subtle",
            },
          "& > [data-slot=node-indent]": {
            borderStartRadius: "sm",
          },
          "& > [data-slot=node-end]": {
            borderEndRadius: "sm",
          },
          "&[data-selected]": {
            color: "colorPalette.fg",
          },
        },
      },
      false: {
        node: {
          "&:hover:not(:has(> [data-slot=node-child]:hover)) > :is([data-slot=node-content], [data-slot=node-end])":
            {
              bg: "bg.subtle",
            },
          "&[data-selected] > :is([data-slot=node-content], [data-slot=node-end])":
            {
              bg: "colorPalette.subtle",
            },
          "&[data-branch=true]:hover:not(:has(> [data-slot=node-child]:hover)) > [data-slot=node-start]":
            {
              bg: "bg.subtle",
            },
          "&[data-branch=true][data-selected] > [data-slot=node-start]": {
            bg: "colorPalette.subtle",
          },
          "& > [data-slot=node-content]": {
            borderStartRadius: "sm",
          },
          "&[data-branch=true] > [data-slot=node-start]": {
            borderStartRadius: "sm",
          },
          "&[data-branch=true] > [data-slot=node-content]": {
            borderStartRadius: "0",
          },
          "& > [data-slot=node-end]": {
            borderEndRadius: "sm",
          },
          "&[data-selected]": {
            color: "colorPalette.fg",
          },
        },
      },
    },
    expandOnNodeClick: {
      true: {
        node: {
          "&[data-branch=true]": {
            cursor: "pointer",
          },
          "&[data-branch=true] > :is([data-slot=node-content], [data-slot=node-end])":
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
    expandOnNodeClick: false,
  },
});
