import { defineSlotRecipe } from "@chakra-ui/react"

const borderStyles = {
  borderBottom: {
    borderBlockEnd: "1px solid #d9d9d9",
  },
  borderBottomNone: {
    borderBlockEndWidth: 0,
  },
  borderLeft: {
    borderInlineStart: "1px solid #d9d9d9",
  },
  borderLeftNone: {
    borderInlineStartWidth: 0,
  },
  borderRight: {
    borderInlineEnd: "1px solid #d9d9d9",
  },
  borderRightNone: {
    borderInlineEndWidth: 0,
  },
  borderTop: {
    borderBlockStart: "1px solid #d9d9d9",
  },
  borderTopNone: {
    borderBlockStartWidth: 0,
  },
}


const handleBaseStyle = {
  position: "relative",
  background: "r !important",
  "&::before": {
    content: '""',
    position: "absolute",
    transition: "all 0.2s ease-out",
  },
}

const handleHighlightStyle = {
  "&:hover": {
    "&::before": {
      background: "#91caff",
      boxShadow: "0 0 8px color-mix(in srgb, #1677ff 25%, transparent)",
    },
  },
  "&:active": {
    "&::before": {
      background: "#1677ff !important",
    },
  },
}

const handleStyles = {
  handleBottom: {
    "&::before": {
      insetBlockEnd: "50%",
      width: "100%",
      height: "2px",
    },
  },
  handleLeft: {
    "&::before": {
      insetInlineStart: "50%",
      width: "2px",
      height: "100%",
    },
  },
  handleRight: {
    "&::before": {
      insetInlineEnd: "50%",
      width: "2px",
      height: "100%",
    },
  },
  handleRoot: handleBaseStyle,
  handleTop: {
    "&::before": {
      insetBlockStart: "50%",
      width: "100%",
      height: "2px",
    },
  },
}

const componentStyles = {
  fixed: {
    position: "relative",
  },



  panel: {
    overflow: "hidden",
    background: "var(--draggable-panel-bg, #ffffff)",
    transition: "all 0.2s ease-out",
  },



  root: {
    flexShrink: 0,
  },
}

const styles = {
  ...borderStyles,
  ...handleStyles,
  handleHighlight: handleHighlightStyle,
  ...componentStyles,
}



export const stylesRecipe = defineSlotRecipe({
  className: "draggable-panel",
  slots: ["root", "panel", "body", "container", "footer", "handlerIcon", "header"],
  base: {
    root: {
      "--draggable-panel-bg": "bg.panel",
      "--draggable-panel-header-height": "0px",
      position: "relative",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "bg.panel",
    },
    panel: {
      boxSizing: "border-box",
      position: "relative",
      userSelect: "auto",
      overflow: "hidden",
      background: "var(--draggable-panel-bg)",
      transition: "all 0.2s ease-out",
      opacity: 1,
      display: "flex",
      flex: 1,
      flexDirection: "column",
    },
    body: {
      overflow: "hidden auto",
      display: "flex",
      flexDirection: "column",
      padding: "16px",
      flex: 1,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      position: "relative",
      overflow: "hidden",
    },
    handlerIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease-out",
    },
    header: {
      display: "flex",
      flex: "none",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      gap: "8px",
      paddingBlock: "8px",
      paddingInline: "16px",
      borderBlockEnd: "1px solid #f0f0f0",
      fontWeight: 500,
    },
    footer: {
      display: "flex",
      flexDirection: "row",
      flex: "none",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "8px",
      paddingBlock: "8px",
      paddingInline: "16px",
      borderBlockStart: "1px solid #f0f0f0",
    },
  },
  variants: {

    pin: {
      true: {},
      false: {},
    },

    expand: {
      true: {},
      false: {},
    },
    position: {
      left: {},
      right: {},
      top: {},
      bottom: {},
    },
    placement: {
      left: {},
      right: {},
      top: {},
      bottom: {},
    },
    showBorder: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [],
  defaultVariants: {
    position: "left",
    pin: true,
    expand: true,
    placement: "right",
    showBorder: true,
  },
})



