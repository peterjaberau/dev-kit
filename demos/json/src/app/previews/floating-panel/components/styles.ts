import { defineSlotRecipe } from "@chakra-ui/react"

export const floatingPanelRecipe = defineSlotRecipe({
  slots: ["trigger", "positioner", "content", "header", "title", "controls", "iconButton", "body"],
  base: {
    trigger: {
      px: "4",
      py: "2",
      fontSize: "sm",
      fontWeight: "medium",
      rounded: "lg",
    },
    positioner: {
      zIndex: "modal",
    },
    content: {
      display: "flex",
      flexDir: "column",
      bg: "bg",
      rounded: "lg",
      borderWidth: "1px",
      shadow: "md",
      minW: "80",
      _dark: {
        bg: "gray.900",
      },
      "&[data-maximized]": {
        rounded: "none",
      },
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: "4",
      py: "2",
      bg: "bg.muted",
      borderBottomWidth: "1px",
      cursor: "move",
      _dark: {
        bg: "gray.800",
      },
    },
    title: {
      fontWeight: "medium",
    },
    controls: {
      display: "flex",
      gap: "1",
    },
    iconButton: {
      size: "xs",
      variant: "ghost",
    },
    body: {
      p: "4",
      display: "flex",
      flexDir: "column",
      gap: "4",
    },
  },
})
