import { defineSlotRecipe } from "@chakra-ui/react"

export const appShellSlotRecipe = defineSlotRecipe({
  className: "app-shell",
  slots: [
    "root",
    "header",
    "main",
    "mainContainer",
    "footer",
    "bottom",
    "sidebarLeft",
    "sidePanelLeft",
    "sidebarRight",
    "sidePanelRight",
    "body",
    "canvas",
    "canvasTop",
    "canvasBottom",
  ],
  base: {
    root: {
      "--floating-offset": "0px",
      "--header-height": "50px",
      "--footer-height": "30px",
      "--bottom-height": "150px",
      "--sidebar-left-width": "50px",
      "--side-panel-left-width": "200px",
      "--sidebar-right-width": "50px",
      "--side-panel-right-width": "200px",
      "--canvas-top-height": "40px",
      "--canvas-bottom-height": "200px",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      bg: "bg.panel",
    },
    header: {
      borderBottom: "1px solid",
      borderBottomColor: "border",
      height: "var(--header-height)",
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    mainContainer: {
      display: "flex",
      height: "100%",
      position: "relative",
    },
    footer: {
      h: "var(--footer-height)",
      borderTop: "1px solid",
      borderTopColor: "border",
    },
    bottom: {
      h: "var(--bottom-height)",
      borderTop: "1px solid",
      borderTopColor: "border",
      bg: "bg.panel",
    },
    sidebarLeft: {
      w: "var(--sidebar-left-width)",
      borderRight: "1px solid",
      borderRightColor: "border",
      h: "100%",
    },
    sidePanelLeft: {
      w: "var(--side-panel-left-width)",
      borderRight: "1px solid",
      borderRightColor: "border",
      h: "100%",
      bg: "bg.panel",
    },
    sidebarRight: {
      w: "var(--sidebar-right-width)",
      borderLeft: "1px solid",
      borderLeftColor: "border",
      h: "100%",
    },
    sidePanelRight: {
      w: "var(--side-panel-right-width)",
      borderLeft: "1px solid",
      borderLeftColor: "border",
      h: "100%",
      bg: "bg.panel",
    },
    body: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      h: "100%",
      // bg: "gray.500",
      // p: 4,
    },
    canvas: {
      flex: 1,
      bg: "bg.subtle",
      p: 4,
    },
    canvasTop: {
      h: "var(--canvas-top-height)",
      borderBottom: "1px solid",
      borderBottomColor: "border",
    },
    canvasBottom: {
      h: "var(--canvas-bottom-height)",
      borderTop: "1px solid",
      borderTopColor: "border",
      bg: "bg.panel",
    },
  },
  variants: {
    showHeader: {
      true: {},
      false: {
        header: {
          display: "none",
        },
      },
    },
    showFooter: {
      true: {},
      false: {
        footer: {
          display: "none",
        },
      },
    },
    showBottom: {
      true: {},
      false: {
        bottom: {
          display: "none",
        },
      },
    },
    showSidebarLeft: {
      true: {},
      false: {
        sidebarLeft: {
          display: "none",
        },
      },
    },
    showSidePanelLeft: {
      true: {},
      false: {
        sidePanelLeft: {
          display: "none",
        },
      },
    },
    showSidebarRight: {
      true: {},
      false: {
        sidebarRight: {
          display: "none",
        },
      },
    },
    showSidePanelRight: {
      true: {},
      false: {
        sidePanelRight: {
          display: "none",
        },
      },
    },
    showCanvasTop: {
      true: {},
      false: {
        canvasTop: {
          display: "none",
        },
      },
    },
    showCanvasBottom: {
      true: {},
      false: {
        canvasBottom: {
          display: "none",
        },
      },
    },
    pinnedSidePanelLeft: {
      true: {},
      false: {},
    },
    pinnedSidePanelRight: {
      true: {},
      false: {},
    },
    pinnedCanvasBottom: {
      true: {},
      false: {
        canvasBottom: {
          position: "absolute",
          flex: "0 0 auto",
          // left: "var(--floating-offset)",
          // right: "var(--floating-offset)",
          bottom: "var(--floating-offset)",
        },
      },
    },
    pinnedBottom: {
      true: {},
      false: {
        bottom: {
          position: "absolute",
          flex: "0 0 auto",
          left: "var(--floating-offset)",
          right: "var(--floating-offset)",
        },
      },
    },
  },
  compoundVariants: [
    {
      pinnedBottom: false,
      showFooter: true,
      css: {
        bottom: {
          bottom: "calc(var(--footer-height))",
        },
      },
    },
    {
      pinnedBottom: false,
      showFooter: false,
      css: {
        bottom: {
          bottom: "var(--floating-offset)",
        },
      },
    },

  ],
  defaultVariants: {
    showHeader: true,
    showFooter: true,
    showBottom: true,
    showSidebarLeft: true,
    showSidePanelLeft: true,
    showSidebarRight: true,
    showSidePanelRight: true,
    showCanvasTop: true,
    showCanvasBottom: true,
    pinnedSidePanelLeft: true,
    pinnedSidePanelRight: true,
    pinnedCanvasBottom: true,
    pinnedBottom: true,
  },
})
