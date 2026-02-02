import { defineSlotRecipe } from "@chakra-ui/react"

export const panelStyle = defineSlotRecipe({
  className: "panel",
  slots: ["root", "handle"],
  base: {
    root: {
      "--panel-handle-size": "0.35rem",
    },
    handle: {
      width: "0.35rem",
      _hover: {
        opacity: 0.5,
        backgroundColor: "bg.subtle",
        "&[data-resizing]": {
          opacity: 1,
          backgroundColor: "bg.info",
        },
      },
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          "--card-padding": "spacing.4",
        },
        title: {
          textStyle: "md",
        },
      },
      md: {
        root: {
          "--card-padding": "spacing.6",
        },
        title: {
          textStyle: "lg",
        },
      },
      lg: {
        root: {
          "--card-padding": "spacing.7",
        },
        title: {
          textStyle: "xl",
        },
      },
    },
    variant: {
      elevated: {
        root: {
          bg: "bg.panel",
          boxShadow: "md",
        },
      },
      outline: {
        root: {
          bg: "bg.panel",
          borderWidth: "1px",
          borderColor: "border",
        },
      },
      subtle: {
        root: {
          bg: "bg.muted",
        },
      },
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
})
