import { defineRecipe, defineSlotRecipe } from "@chakra-ui/react"

export const panelSlotRecipe = defineSlotRecipe({
  slots: ["root", "handle"],

  base: {
    root: {
      overflow: "visible",
      flexShrink: 0,
    },

    handle: {
      position: "absolute",
      opacity: 0,
      userSelect: "none",
      zIndex: 1,

      _hover: {
        opacity: 0.5,
        bg: "border",
      },
    },
  },

  variants: {
    position: {
      left: {
        root: { top: 0, bottom: 0, left: 0 },
        handle: {
          width: "0.35rem",
          right: "-0.175rem",
          top: 0,
          bottom: 0,
          cursor: "ew-resize",
        },
      },
      right: {
        root: { top: 0, bottom: 0, right: 0 },
        handle: {
          width: "0.35rem",
          left: "-0.175rem",
          top: 0,
          bottom: 0,
          cursor: "ew-resize",
        },
      },
      bottom: {
        root: { left: 0, right: 0, bottom: 0 },
        handle: {
          height: "0.35rem",
          top: "-0.175rem",
          left: 0,
          right: 0,
          cursor: "ns-resize",
        },
      },
    },

    floating: {
      true: { root: { position: "fixed" } },
      false: { root: { position: "absolute" } },
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

  // compound variants used ONLY as guards
  compoundVariants: [
    {
      floating: true,
      css: { root: { position: "fixed" } },
    },
    {
      floating: false,
      css: { root: { position: "absolute" } },
    },
  ],

  defaultVariants: {
    position: "bottom",
    floating: false,
  },
})

export const panelLayoutRecipe = defineRecipe({
  base: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%",

    // default column layout
    flexDirection: "column",

    // react to panel intent via data attributes
    '& > [data-can-push="true"][data-position="left"]': {
      marginRight: "auto",
    },

    '& > [data-can-push="true"][data-position="right"]': {
      marginLeft: "auto",
    },

    '& > [data-can-push="true"][data-position="bottom"]': {
      marginTop: "auto",
    },
  },
})