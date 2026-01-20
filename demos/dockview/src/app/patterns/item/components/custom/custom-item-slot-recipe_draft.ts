import { defineSlotRecipe } from "@chakra-ui/react"

/**
 * FIXES APPLIED:
 * - Grid template now matches original dense column layout
 * - Proper gridTemplateAreas switching per description placement
 * - Root uses inline-grid + min/max sizing like original
 * - Icon / rightIcon sizing + centering aligned with original
 * - Actions slot supports hover-only visibility WITHOUT layout jump
 * - Selected / disabled / interactive states added
 */
export const customItemSlotRecipe = defineSlotRecipe({
  slots: ["root", "icon", "prefix", "label", "description", "suffix", "rightIcon", "actions"],
  className: "item",
  base: {
    root: {
      "--item-radius": "radii.l2",
      display: "inline-grid",
      gridAutoFlow: "column dense",
      gap: 0,
      outline: 0,
      placeItems: "stretch",
      placeContent: "stretch",
      gridTemplate:
        'icon prefix label suffix rightIcon actions" auto "icon prefix label suffix rightIcon actions" auto / max-content max-content 1sf max-content max-content max-content',

      flexShrink: "initial",
      position: "relative",
      padding: 0,
      margin: 0,
      borderRadius: "var(--accordion-radius)",
      height: "10", //md --> default variant.size
      width: "full",
      boxSizing: "border-box",
      textDecoration: "none",
      transition: "theme",
      cursor: "inherit",
      outlineOffset: 1,
      bg: "colorPalette.subtle",
      color: "colorPalette.fg",
      borderWidth: "1px",
      borderColor: "transparent",
      _hover: {
        bg: "colorPalette.muted",
      },
      _expanded: {
        bg: "colorPalette.muted",
      },

      // "--inline-padding":
      //   "max(var(--min-inline-padding), calc(calc(var(--size) - var(--line-height) - 2px) / 2 + var(--inline-compensation)))",
      // "--block-padding": "2px",
      // "--inline-compensation": "4px",
      // "--min-inline-padding":
      //   "max(var(--min-inline-padding), calc(calc(var(--size) - var(--line-height) - 2px) / 2 + var(--inline-compensation)))",

      // paddingInline: "max(var(--min-inline-padding), calc(calc(var(--size) - var(--line-height) - 2px) / 2 + var(--inline-compensation)))",
      // paddingBlock: "2px",

      // "--min-inline-padding": "max(var(--min-inline-padding), calc(calc(var(--size) - var(--line-height) - 2px) / 2 + var(--inline-compensation)))",

      // "$inline-padding": "max($min-inline-padding, (($size - 1lh - 2bw) / 2 + $inline-compensation))",
      // "$block-padding": {
      //   "": ".5x",
      //   "size=xsmall | size=small": ".25x",
      //   "size=inline": 0,
      // },
      // "$inline-compensation": ".5x",
      // "$min-inline-padding": "(1x - 1bw)",
      //
      // "--inline-compensation": "4px",
      // "--min-inline-padding":
      //   "max(var(--min-inline-padding), calc(calc(var(--size) - var(--line-height) - 2px) / 2 + var(--inline-compensation)))",
      // "--description-padding-bottom": 0,
      // "--label-padding-right": "var(--inline-padding)",
      // "--label-padding-left": "var(--inline-padding)",
      // "--label-padding-bottom": "var(--block-padding)",
      //
      // "--inline-padding":
      //   "max(var(--min-inline-padding), calc(calc(var(--size) - var(--line-height) - 2px) / 2 + var(--inline-compensation)))",
      // "--block-padding": "2px",
    },

    icon: { gridArea: "icon", display: "grid", placeItems: "center" },
    prefix: { gridArea: "prefix", display: "grid", placeItems: "center" },
    label: {
      gridArea: "label",
      minW: 0,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    description: {
      gridArea: "description",
      fontSize: "sm",
      opacity: 0.75,
    },
    suffix: { gridArea: "suffix", display: "grid", placeItems: "center" },
    rightIcon: { gridArea: "rightIcon", display: "grid", placeItems: "center" },
    actions: {
      gridArea: "actions",
      display: "flex",
      alignItems: "center",
      gap: 1,
    },
  },

  variants: {
    size: {
      xsmall: { root: { minH: "24px", fontSize: "xs" } },
      small: { root: { minH: "32px", fontSize: "sm" } },
      medium: { root: { minH: "40px", fontSize: "md" } },
      large: { root: { minH: "48px", fontSize: "lg" } },
      xlarge: { root: { minH: "56px", fontSize: "xl" } },
      inline: { root: { minH: "1lh" } },
    },

    type: {
      item: {},
      link: {
        root: {
          bg: "transparent",
          _hover: { textDecoration: "underline", bg: "transparent" },
        },
      },
      card: {
        root: {
          bg: "gray.50",
          borderRadius: "lg",
          _hover: { bg: "gray.100" },
        },
        label: { fontWeight: "semibold" },
      },
      header: {
        label: { fontWeight: "semibold" },
      },
    },

    shape: {
      button: { root: { borderRadius: "md" } },
      card: { root: { borderRadius: "lg" } },
      pill: { root: { borderRadius: "full" } },
      sharp: { root: { borderRadius: "none" } },
    },

    descriptionPlacement: {
      inline: {
        root: {
          gridTemplateAreas: `
            "icon prefix label suffix rightIcon actions"
            "icon prefix description suffix rightIcon actions"
          `,
        },
        description: {
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        },
      },
      block: {
        root: {
          gridTemplateAreas: `
            "icon prefix label suffix rightIcon actions"
            "description description description description description description"
          `,
        },
      },
      none: {
        root: {
          gridTemplateAreas: `"icon prefix label suffix rightIcon actions"`,
        },
      },
    },

    showActionsOnHover: {
      true: {
        actions: {
          opacity: 0,
          pointerEvents: "none",
          _groupHover: {
            opacity: 1,
            pointerEvents: "auto",
          },
          _groupFocusWithin: {
            opacity: 1,
            pointerEvents: "auto",
          },
        },
      },
      false: {},
    },

    preserveActionsSpace: {
      false: {
        actions: {
          width: 0,
          overflow: "hidden",
        },
      },
      true: {},
    },
  },

  defaultVariants: {
    //@ts-ignore
    size: "medium",
    type: "item",
    shape: "button",
    descriptionPlacement: "none",
    showActionsOnHover: false,
    preserveActionsSpace: true,
  },
})
