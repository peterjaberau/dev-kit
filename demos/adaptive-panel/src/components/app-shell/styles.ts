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
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    header: {
      bg: "gray.200",
      height: "50px",
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
      h: "30px",
      bg: "gray.200",
    },
    bottom: {
      h: "150px",
      bg: "gray.300",
    },
    sidebarLeft: {
      w: "50px",
      bg: "gray.300",
      h: "100%",
    },
    sidePanelLeft: {
      w: "200px",
      bg: "gray.400",
      h: "100%",
    },
    sidebarRight: {
      w: "50px",
      bg: "gray.300",
      h: "100%",
    },
    sidePanelRight: {
      w: "200px",
      bg: "gray.400",
      h: "100%",
    },
    body: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      h: "100%",
      bg: "gray.500",
      p: 4,
    },
    canvas: {
      flex: 1,
      bg: "gray.50",
    },
    canvasTop: {
      h: "40px",
      bg: "gray.300",
    },
    canvasBottom: {
      h: "150px",
      bg: "gray.300",
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
      false: {},
    },
    pinnedBottom: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [],
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
