import { defineSlotRecipe } from "@chakra-ui/react"

export const DraggablePanelStyles = defineSlotRecipe({
  className: "draggable-panel",
  slots: ["root", "container", "header", "body", "footer", "handler", "handlerIcon", "toggle", "inner"],
  base: {
    root: {
      "--panel-header-height": "0px",
      "--panel-height": "180px",
      "--panel-width": "280px",
      "--panel-offset": "16px",
      "--panel-toggle-length": "40px",
      "--panel-toggle-short": "16px",
    },
    container: {
      flexShrink: 0,
      borderStyle: "0 solid",
      borderColor: "#f0f0f0",
      "& .draggable-panel__toggle": {
        opacity: 1,
      },
    },
    header: {},
    body: {},
    footer: {},
    handler: {
      position: "relative",
      _before: {
        content: '""',
        position: "absolute",
        zIndex: 50,
        transition: "all 0.2s ease-out",
      },
      _hover: {
        _before: {
          background: "bg.panel",
        },
      },
      _active: {
        _before: {
          background: "bg.panel",
        },
      },
    },
    handlerIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease-out",
    },
    toggle: {
      pointerEvents: "none",
      position: "absolute",
      zIndex: 10,
      opacity: 0,
      transition: "all 0.2s ease-out",
      _hover: {
        opacity: 1,
      },
      _active: {
        opacity: 1,
      },
      "& > div": {
        pointerEvents: "all",
        cursor: "pointer",
        position: "absolute",
        color: "#00000073",
        background: "#0000000a",
        borderColor: "#f0f0f0",
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "4px",
        transition: "all 0.2s ease-out",
        _hover: {
          color: "#000000a6",
          background: "#0000000f",
        },
        _active: {
          color: "#000000e0",
          background: "#00000026",
        },
      },
    },
    inner: {},
  },
  variants: {
    fullscreen: {
      true: {
        root: {
          position: "absolute",
          insetBlock: "var(--panel-header-height) 0",
          insetInline: 0,
          width: "100%",
          height: "calc(100% - var(--panel-header-height))",
          background: "#f5f5f5",
        },
      },
      false: {},
    },
    pin: {
      true: {},
      false: {},
    },
    mode: {
      fixed: {
        root: {
          position: "relative",
        },
      },
      float: {
        root: {
          position: "absolute",
          zIndex: 200,
        },
      },
    },
    placement: {
      right: {
        handler: {
          _before: {
            insetInlineStart: "50%",
            width: "2px",
            height: "100%",
          },
        },
      },
      left: {
        handler: {
          _before: {
            insetInlineEnd: "50%",
            width: "2px",
            height: "100%",
          },
        },
      },
      top: {
        handler: {
          _before: {
            insetBlockStart: "50%",
            width: "100%",
            height: "2px",
          },
        },
      },
      bottom: {
        handler: {
          _before: {
            insetBlockEnd: "50%",
            width: "100%",
            height: "2px",
          },
        },
      },
    },
    expandable: {
      true: {},
      false: {},
    },
    showHandlerWhenUnexpand: {
      true: {},
      false: {},
    },
    showHeader: {
      true: {},
      false: {},
    },
    showFooter: {
      true: {},
      false: {},
    },
    showHandlerWideArea: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      placement: "top",
      mode: "float",
      css: {
        root: {
          insetBlockStart: "var(--panel-header-height)",
          insetInline: "0 0",
          width: "100%",
        },
      },
    },
    {
      placement: "bottom",
      mode: "float",
      css: {
        root: {
          insetBlockEnd: 0,
          insetInline: "0 0",
          width: "100%",
        },
      },
    },
    {
      placement: "left",
      mode: "float",
      css: {
        root: {
          insetBlock: "var(--panel-header-height) 0",
          insetInlineStart: 0,
          height: "calc(100% - var(--panel-header-height))",
        },
      },
    },
    {
      placement: "right",
      mode: "float",
      css: {
        root: {
          insetBlock: "var(--panel-header-height) 0",
          insetInlineEnd: 0,
          height: "calc(100% - var(--panel-header-height))",
        },
      },
    },
  ],
  defaultVariants: {
    fullscreen: false,
    pin: false,
    mode: "fixed",
    placement: "right",
    expandable: true,
    showHandlerWideArea: true,
    showHandlerWhenUnexpand: true,
    showHeader: true,
    showFooter: true,
  },
})
