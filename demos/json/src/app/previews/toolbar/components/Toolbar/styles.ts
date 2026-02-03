import { defineSlotRecipe } from "@chakra-ui/react"

export const toolbarSlotRecipe = defineSlotRecipe({
  slots: ["root", "button", "divider"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "1",
      p: "1",
      borderRadius: "lg",
      bg: "bg.subtle",
      borderWidth: "1px",
      boxShadow: "md",
    },
    button: {
      h: "8",
      w: "8",
      borderRadius: "md",
      color: "fg",
      _hover: {
        bg: "bg.muted",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "border.emphasized",
        outlineOffset: "2px",
      },
    },
    divider: {
      h: "8",
    },
  },
  variants: {
    active: {
      true: {
        button: {
          bg: "bg.muted",
        },
      },
      false: {
        button: {
          bg: "transparent",
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
})
