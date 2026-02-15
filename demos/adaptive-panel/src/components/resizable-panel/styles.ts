import { defineSlotRecipe } from "@chakra-ui/react"

export const panelSlotRecipe = defineSlotRecipe({
  slots: ["root", "handle"],

  base: {
    root: {
      overflow: "visible",
      bottom: "0",
    },

    handle: {
      position: "absolute",
      opacity: 0,
      userSelect: "none",
      zIndex: 1,
      flexShrink: 0,

      _hover: {
        opacity: 0.5,
        bg: "border",
      },
    },
  },

  variants: {
    position: {
      bottom: {
        root: {
          left: 0,
          right: 0,
        },
        handle: {
          height: 2,
          top: -1,
          left: 0,
          right: 0,
          cursor: "ns-resize",
        },
      },
      left: {
        root: {
          top: 0,
          bottom: 0,
          left: 0,
        },
        handle: {
          width: 2,
          right: -1,
          top: 0,
          bottom: 0,
          cursor: "ew-resize",
        },
      },
      right: {
        root: {
          top: 0,
          bottom: 0,
          right: 0,
        },
        handle: {
          width: 2,
          left: -1,
          top: 0,
          bottom: 0,
          cursor: "ew-resize",
        },
      },
    },
    floating: {
      true: {
        root: {
          position: "fixed",
        },
      },
      false: {
        root: {
          position: "absolute",
          flex: "0 0 auto",
        },
      },
    },

    resizing: {
      true: {
        handle: {
          opacity: 1,
          bg: "border.emphasized",
          _hover: { opacity: 1 },
        },
      },
    },
  },

  defaultVariants: {
    position: "bottom",
    floating: false,
  },
})
