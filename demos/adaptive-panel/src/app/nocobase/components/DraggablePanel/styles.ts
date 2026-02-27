import { defineSlotRecipe } from "@chakra-ui/react"

export const DraggablePanelStyles = defineSlotRecipe({
  className: "draggable-panel",
  slots: ["root", "container", "header", "body", "footer", "handler", "handlerIcon", "toggle", "inner"],
  base: {
    root: {
      "--default-height": "180px",
      "--default-width": "280px",
      "--header-height": "0px",
      "--max-height": "0px",
    },

  },
  variants: {

  },
  compoundVariants: [

  ],
  defaultVariants: {

  },
})
