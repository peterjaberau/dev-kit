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
export const itemRecipe = defineSlotRecipe({
  anatomy: ["root", "icon", "prefix", "label", "description", "suffix", "rightIcon", "actions"],

  base: {
    root: {
      display: "inline-grid", // matches original
      gridAutoFlow: "column",
      gridTemplateColumns: "max-content max-content 1fr max-content max-content max-content",
      alignItems: "stretch",
      position: "relative",
      boxSizing: "border-box",
      outline: "0",
      transition: "background-color 0.2s ease, color 0.2s ease",
      cursor: "inherit",

      _hover: { bg: "gray.50" },
      _active: { bg: "gray.100" },

      _disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
      },

      _selected: {
        bg: "gray.100",
      },
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
