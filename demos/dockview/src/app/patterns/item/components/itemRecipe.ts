import { defineSlotRecipe } from "@chakra-ui/react"


export const itemRecipe = defineSlotRecipe({
  anatomy: ["root", "icon", "prefix", "label", "description", "suffix", "rightIcon", "actions"],

  base: {
    root: {
      display: "grid",
      gridTemplateColumns: "max-content max-content 1fr max-content max-content max-content",
      alignItems: "stretch",
      position: "relative",
      boxSizing: "border-box",
      transition: "background-color 0.2s ease",
      cursor: "inherit",

      _disabled: {
        opacity: 0.6,
        cursor: "not-allowed",
      },
    },

    icon: { display: "grid", placeItems: "center" },
    rightIcon: { display: "grid", placeItems: "center" },
    prefix: { display: "grid", placeItems: "center" },
    suffix: { display: "grid", placeItems: "center" },

    label: {
      alignSelf: "center",
      minW: 0,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },

    description: {
      fontSize: "sm",
      opacity: 0.75,
      minW: 0,
    },

    actions: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
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
      item: {
        root: { cursor: "pointer", _hover: { bg: "gray.50" } },
      },
      link: {
        root: { cursor: "pointer", _hover: { textDecoration: "underline" } },
      },
      card: {
        root: { bg: "gray.50", _hover: { bg: "gray.100" } },
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
          overflow: "hidden",
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
          transition: "opacity 0.2s ease",
          _groupHover: { opacity: 1 },
          _groupFocusWithin: { opacity: 1 },
        },
      },
      false: {},
    },

    preserveActionsSpace: {
      true: {},
      false: {
        actions: { visibility: "hidden" },
      },
    },
  },

  defaultVariants: {
    //@ts-ignore
    size: "medium",
    type: "item",
    shape: "button",
    descriptionPlacement: "none",
    showActionsOnHover: false,
    preserveActionsSpace: false,
  },
})
