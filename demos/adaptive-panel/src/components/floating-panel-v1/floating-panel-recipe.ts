import { floatingPanelAnatomy } from "@ark-ui/react"
import { defineSlotRecipe } from "@chakra-ui/react/styled-system"

export const floatingPanelRecipe: any = defineSlotRecipe({
  className: "floating-panel-custom",
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
      zIndex: "overlay",
    },
    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      height: "var(--height)",
      width: "var(--width)",
      minHeight: 0,
      background: "bg.panel",
      color: "fg",
      boxShadow: "sm",
      borderRadius: "sm",
      border: "1px solid",
      borderColor: "border",
      opacity: 1,
    },
    header: {
      position: "relative",
      minWidth: 0,
      display: "flex",
      flex: 1,
      flexShrink: 0,
      alignItems: "center",
      background: "bg.subtle",
      borderBottom: "1px solid",
      borderBottomColor: "border.emphasized",
      overflow: "hidden",
      borderTopLeftRadius: "sm",
      borderTopRightRadius: "sm",
    },
    control: {
      display: "flex",
      alignItems: "center",
    },
    title: {
      minWidth: 0,
      flex: 1,
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      fontSize: "sm",
      fontWeight: "medium",
      lineHeight: 1,
    },
    body: {
      display: "flex",
      flexDirection: "column",
      overflow: "auto",
    },
    footer: {
      display: "flex",
      flexDirection: "column-reverse",
      background: "bg.",
      borderTop: "1px solid rgba(0,0,0,0.12)",

      // sm:flex-row sm:justify-end and sm:rounded-b... are responsive; inline styles can’t do breakpoints.
      // If you need responsive behavior without Tailwind, you’ll need a CSS @media rule.
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
  },
})

export const axes = ["n", "s", "e", "w", "ne", "nw", "se", "sw"] as const
