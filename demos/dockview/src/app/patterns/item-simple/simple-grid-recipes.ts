import { defineSlotRecipe } from "@chakra-ui/react"

export const simpleGridRecipe = defineSlotRecipe({
  slots: ["root", "item"],
  base: {
    root: {
      display: "grid",
      gap: 4,
    },
    item: {
      borderRadius: "md",
      boxShadow: "sm",
      textAlign: "center",
      verticalAlign: "middle",
      borderStyle: "solid",
      borderWidth: "2px",
    },
  },
  variants: {
    name: {
      gridDefinitions: {
        root: {
          display: "grid",
          gridTemplateRows: "100px 100px",
          gridTemplateColumns: "400px 200px 100px",
        },
      },
      gridAreas: {
        root: {
          display: "grid",
          gridTempalteAreas: `
        "header  header"
        "sidebar main"
        "sidebar footer"
      `,
        },
      },
    },
    size: {
      small: {
        item: {
          fontSize: "1em",
        },
      },
      medium: {
        item: {
          fontSize: "2em",
        },
      },
      big: {
        item: {
          fontSize: "3em",
        },
      },
    },
    appearance: {
      pink: {
        item: {
          backgroundColor: "pink.200",
          borderColor: "pink.500",
        },
      },
      blue: {
        item: {
          backgroundColor: "blue.200",
          borderColor: "blue.500",
        },
      },
      green: {
        item: {
          backgroundColor: "green.200",
          borderColor: "green.500",
        },
      },
      yellow: {
        item: {
          backgroundColor: "yellow.200",
          borderColor: "yellow.500",
        },
      },
      orange: {
        item: {
          backgroundColor: "orange.200",
          borderColor: "orange.500",
        },
      },
      red: {
        item: {
          backgroundColor: "red.200",
          borderColor: "red.500",
        },
      },
    },
  },
  defaultVariants: {
    name: "gridDefinitions",
    size: "medium",
    appearance: "blue",
  },
})
