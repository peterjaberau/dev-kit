import { floatingPanelAnatomy } from "@ark-ui/react"
import { defineSlotRecipe } from "@chakra-ui/react/styled-system"

export const floatingPanelRecipe: any = defineSlotRecipe({
  className: "floating-panel-custom",
  slots: floatingPanelAnatomy.keys(),
  base: {
    positioner: {
      zIndex: "overlay",
    },
    content: {
      // bg: "bg.panel",
      borderRadius: "md",
      boxShadow: "sm",

      display: "flex",
      flexDirection: "column",
      border: "1px solid",
      borderColor: "border",

      overflow: "hidden",
    },
    control: {
      display: "flex",
      alignItems: "center",
    },
    header: {
      borderBottom: "1px solid",
      borderBottomColor: "border.muted",
      bg: "bg.subtle",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 2,
      px: 2,
    },
    title: {
      fontWeight: "medium",
    },
    resizeTrigger: {
      '&[data-axis="n"], &[data-axis="s"]': {
        height: "6px",
        maxWidth: "90%",
      },
      '&[data-axis="e"], &[data-axis="w"]': {
        width: "6px",
        maxHeight: "90%",
      },
      '&[data-axis="ne"], &[data-axis="nw"], &[data-axis="se"], &[data-axis="sw"]': {
        width: "10px",
        height: "10px",
      },
    },
    body: {
      bg: "bg.panel",
      display: "flex",
      flex: 1,
      flexDirection: "column",
      p: 3,
      overflow: "hidden",

      // critical: allows the body to shrink and become the scrolling boundary
      minHeight: 0,
    },
  },
})

export const axes = ["n", "s", "e", "w", "ne", "nw", "se", "sw"] as const
