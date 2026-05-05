import { defineSlotRecipe } from "@chakra-ui/react"

export const itemRecipe = defineSlotRecipe({
  className: "item",
  slots: ["root", "group", "separator", "media", "content", "title", "description", "actions", "header", "footer"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 3,
      w: "full",
      p: 3,
      fontSize: "sm",
      borderWidth: "1px",
      borderRadius: "xl",
      transitionProperty: "colors",
      transitionDuration: "100ms",
      outline: "none",
      "[data-scope=menu][data-part=content] &": {
        p: 0,
      },
      "& a": {
        transitionProperty: "colors",
      },
      "& a:hover": {
        bg: "bg.muted",
      },
      "& svg": {
        pointerEvents: "none",
        flexShrink: 0,
      },
      "& svg:not([class*='size-'])": {
        boxSize: 4,
      },
      _focusVisible: {
        borderColor: "colorPalette.focusRing",
        boxShadow: "0 0 0 3px color-mix(in srgb, currentColor 32%, transparent)",
      },
    },
    group: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      w: "full",
    },
    separator: {
      my: 2,
    },
    media: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      gap: 2,
      "& svg": {
        pointerEvents: "none",
      },
      "[data-slot=root]:has([data-slot=description]) &": {
        alignSelf: "flex-start",
        transform: "translateY(0.125rem)",
      },
    },
    content: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      gap: 0.5,
      "& + [data-slot=content]": {
        flex: "none",
      },
    },
    title: {
      display: "flex",
      alignItems: "center",
      gap: 2,
      w: "fit-content",
      fontSize: "sm",
      fontWeight: "medium",
      lineHeight: "snug",
      lineClamp: 1,
      textUnderlineOffset: "4px",
    },
    description: {
      color: "fg.muted",
      fontSize: "sm",
      fontWeight: "normal",
      lineHeight: "normal",
      lineClamp: 2,
      textAlign: "left",
      "& > a": {
        textDecoration: "underline",
        textUnderlineOffset: "4px",
      },
      "& > a:hover": {
        color: "colorPalette.fg",
      },
    },
    actions: {
      display: "flex",
      alignItems: "center",
      gap: 2,
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexBasis: "full",
      gap: 2,
      "& img": {
        boxSize: "full",
        borderRadius: "xl",
        objectFit: "cover",
      },
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexBasis: "full",
      gap: 2,
    },
  },
  variants: {
    variant: {
      plain: {
        root: {
          borderColor: "transparent",
        },
      },
      outline: {
        root: {
          borderColor: "border",
          shadow: "xs",
        },
      },
      muted: {
        root: {
          bg: "bg.muted",
          borderColor: "transparent",
          shadow: "xs",
          shadowColor: "bg.muted",
        },
      },
    },
    mediaType: {
      plain: {
        media: {
          bg: "transparent",
        },
      },
      icon: {
        media: {
          "& svg:not([class*='size-'])": {
            boxSize: 4,
          },
        },
      },
      image: {
        media: {
          boxSize: 10,
          overflow: "hidden",
          borderRadius: "xl",
          "& img": {
            boxSize: "full",
            objectFit: "cover",
          },
        },
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: "plain",
    mediaType: "plain",
  },
})
