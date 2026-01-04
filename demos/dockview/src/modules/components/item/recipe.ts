import { defineSlotRecipe } from "@chakra-ui/react"

export const itemSlotRecipe = defineSlotRecipe({
  className: "item",
  slots: ["root", "media", "content", "title", "description", "actions", "header", "footer", "group", "separator"],

  base: {
    root: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      width: "full",
      borderRadius: "md",
      fontSize: "xs",
      lineHeight: "relaxed",
      transitionProperty: "colors",
      transitionDuration: "100ms",
      _focusVisible: {
        outline: "none",
        ring: "3px",
        ringColor: "ring",
        borderColor: "ring",
      },
      _hover: {
        bg: "bg.muted",
      },
    },

    media: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      "& svg": {
        pointerEvents: "none",
      },
    },

    content: {
      display: "flex",
      flex: "1",
      flexDirection: "column",
      gap: "1",
    },

    title: {
      display: "flex",
      alignItems: "center",
      fontWeight: "medium",
      lineHeight: "snug",
      textDecorationThickness: "from-font",
      textUnderlineOffset: "4px",
    },

    description: {
      color: "fg.muted",
      fontSize: "xs",
      lineHeight: "relaxed",
    },

    actions: {
      display: "flex",
      alignItems: "center",
      gap: "2",
    },

    header: {
      display: "flex",
      flexBasis: "full",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "2",
    },

    footer: {
      display: "flex",
      flexBasis: "full",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "2",
    },

    group: {
      display: "flex",
      flexDirection: "column",
      width: "full",
      gap: "4",
    },

    separator: {
      marginY: "2",
    },
  },

  variants: {
    variant: {
      default: {
        root: {
          borderColor: "transparent",
        },
      },
      outline: {
        root: {
          borderWidth: "1px",
          borderColor: "border",
        },
      },
      muted: {
        root: {
          bg: "bg.muted",
          borderColor: "transparent",
        },
      },
    },

    size: {
      default: {
        root: {
          gap: "2.5",
          px: "3",
          py: "2.5",
        },
      },
      sm: {
        root: {
          gap: "2.5",
          px: "3",
          py: "2.5",
        },
      },
      xs: {
        root: {
          gap: "2.5",
          px: "2.5",
          py: "2",
        },
        content: {
          gap: "0.5",
        },
      },
    },

    mediaVariant: {
      default: {},
      icon: {
        media: {
          "& svg:not([class*='size-'])": {
            width: "4",
            height: "4",
          },
        },
      },
      image: {
        media: {
          width: "8",
          height: "8",
          overflow: "hidden",
          borderRadius: "sm",
          "& img": {
            width: "full",
            height: "full",
            objectFit: "cover",
          },
        },
      },
    },
  },

  defaultVariants: {
    variant: "default",
    size: "default",
    mediaVariant: "default",
  },
})
