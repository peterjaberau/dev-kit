import { defineSlotRecipe } from "@chakra-ui/react"

export const draggablePanelRecipe = defineSlotRecipe({
  className: "draggable-panel",
  slots: ["root", "panel", "container", "header", "footer", "resizeTrigger"],
  base: {
    root: {
      "--draggable-panel-bg": "bg.panel",
      "--draggable-panel-header-height": "0px",
      flexShrink: 0,
    },
    container: {},
    panel: {},
    header: {},
    footer: {},
    resizeTrigger: {
      position: "relative",
      background: "transparent",
      "&::before": {
        content: '""',
        position: "absolute",
        transition: "all 0.2s ease-out",
      },
      _hover: {
        "&::before": {
          background: "#91caff",
          boxShadow: "0 0 8px color-mix(in srgb, #1677ff 25%, transparent)",
        },
      },
      _active: {
        "&::before": {
          background: "#1677ff !important",
        },
      },
    },
  },
  variants: {
    mode: {
      fixed: {
        root: {
          position: "relative",
        },
        panel: {
          overflow: "hidden",
          background: "bg.panel",
          transition: "all 0.2s ease-out",
        },
      },
      float: {
        root: {
          position: "absolute",
          zIndex: 200,
        },
      },
    },
    fullscreen: {
      true: {
        root: {
          position: "absolute",
          insetBlock: "var(--draggable-panel-header-height, 0) 0",
          insetInline: 0,
          width: "100%",
          height: "calc(100% - var(--draggable-panel-header-height, 0px))",
          background: "bg.panel",
          zIndex: 200,
        },
      },
      false: {},
    },
    placement: {
      bottom: {
        resizeTrigger: {
          "&::before": {
            insetBlockEnd: "50%",
            width: "100%",
            height: "2px",
          },
        },
      },
      left: {
        resizeTrigger: {
          "&::before": {
            insetInlineStart: "50%",
            width: "2px",
            height: "100%",
          },
        },
      },
      right: {
        resizeTrigger: {
          "&::before": {
            insetInlineEnd: "50%",
            width: "2px",
            height: "100%",
          },
        },
      },
      top: {
        resizeTrigger: {
          "&::before": {
            insetBlockStart: "50%",
            width: "100%",
            height: "2px",
          },
        },
      },
    },

    pin: {
      true: {},
      false: {},
    },


    expand: {
      true: {},
      false: {},
    },
    showBorder: {
      true: {},
      false: {},
    },
    showHandleHighlight: {
      true: {},
      false: {},
    },
    expandable: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      placement: "top",
      expand: false,
      css: {
        panel: {
          minHeight: 0,
        },
      },
    },
    {
      placement: "bottom",
      expand: false,
      css: {
        panel: {
          minWidth: 0,
        },
      },
    },

    // mode=float, placement=top
    {
      placement: "top",
      mode: "float",
      css: {
        root: {
          insetBlockStart: "var(--draggable-panel-header-height, 0)",
          insetInline: "0 0",
          width: "100%",
        },
      },
    },
    // mode=float, placement=bottom
    {
      placement: "bottom",
      mode: "float",
      css: {
        root: {
          insetBlockEnd: "0",
          insetInline: "0 0",
          width: "100%",
        },
      },
    },
    // mode=float, placement=left
    {
      placement: "left",
      mode: "float",
      css: {
        root: {
          insetBlock: "var(--draggable-panel-header-height, 0) 0",
          insetInlineStart: "0",
          height: "calc(100% - var(--draggable-panel-header-height, 0px))",
        },
      },
    },
    // mode=float, placement=right
    {
      placement: "right",
      mode: "float",
      css: {
        root: {
          insetBlock: "var(--draggable-panel-header-height, 0) 0",
          insetInlineEnd: "0",
          height: "calc(100% - var(--draggable-panel-header-height, 0px))",
        },
      },
    },

    // placement=top, showBorder=true, expand=true
    {
      placement: "top",
      expand: true,
      showBorder: true,
      css: {
        root: {
          borderBlockEnd: "1px solid #d9d9d9",
        },
      },
    },
    // placement=bottom, showBorder=true, expand=true
    {
      placement: "bottom",
      expand: true,
      showBorder: true,
      css: {
        root: {
          borderBlockStart: "1px solid #d9d9d9",
        },
      },
    },
    // placement=left, showBorder=true, expand=true
    {
      placement: "left",
      expand: true,
      showBorder: true,
      css: {
        root: {
          borderInlineEnd: "1px solid #d9d9d9",
        },
      },
    },
    // placement=right, showBorder=true, expand=true
    {
      placement: "right",
      expand: true,
      showBorder: true,
      css: {
        root: {
          borderInlineStart: "1px solid #d9d9d9",
        },
      },
    },
    // placement=top, showBorder=false, expand=true
    {
      placement: "top",
      expand: true,
      showBorder: false,
      css: {
        root: {
          borderBlockEnd: "none",
        },
      },
    },
    // placement=bottom, showBorder=false, expand=true
    {
      placement: "bottom",
      expand: true,
      showBorder: false,
      css: {
        root: {
          borderBlockStart: "none",
        },
      },
    },
    // placement=left, showBorder=false, expand=true
    {
      placement: "left",
      expand: true,
      showBorder: false,
      css: {
        root: {
          borderInlineEnd: "none",
        },
      },
    },
    // placement=right, showBorder=false, expand=true
    {
      placement: "right",
      expand: true,
      showBorder: false,
      css: {
        root: {
          borderInlineStart: "none",
        },
      },
    },
  ],
  defaultVariants: {
    pin: true,
    mode: "fixed",
    expandable: true,
    expand: true,

    placement: "right",
    showBorder: true,
    showHandleHighlight: false,
    fullscreen: false,
  },
})
