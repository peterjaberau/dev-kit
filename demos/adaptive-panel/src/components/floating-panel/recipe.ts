import { defineSlotRecipe } from "@chakra-ui/react/styled-system"

export const floatingPanelStyles: any = defineSlotRecipe({
  className: "floating-panel",
  slots: [
    "positioner",
    "trigger",
    "content",
    "header",
    "body",
    "title",
    "resizeTrigger",
    "dragTrigger",
    "stageTrigger",
    "closeTrigger",
    "control",
    "footer",
  ],
  base: {
    positioner: {
      zIndex: 50,
    },
    content: {
      bg: "bg.panel",
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
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
})

export const axes = ["n", "s", "e", "w", "ne", "nw", "se", "sw"] as const
