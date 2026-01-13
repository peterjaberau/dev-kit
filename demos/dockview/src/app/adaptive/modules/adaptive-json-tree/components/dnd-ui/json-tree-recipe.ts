import { defineSlotRecipe } from "@chakra-ui/react"

export const jsonTreeSlotRecipe = defineSlotRecipe({
  slots: ["root"],
  className: "adaptive-j-tree",
  base: {
    root: {
      "--expandableMenuItemIndentation": "12px",

      backgroundColor: "#fff",
      margin: "0px",
      padding: 3,
      flex: "1 1 0px",
      overflow: "auto",
      borderWidth: "thin",
      borderStyle: "solid",
      borderRadius: "sm",
      width: "20pc",
      borderColor: "#0b120e24",

    },
  },
  variants: {},
  compoundVariants: [
    /*





     */
  ],
  defaultVariants: {},
})
