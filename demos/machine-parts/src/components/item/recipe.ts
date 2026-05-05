import { defineSlotRecipe } from "@chakra-ui/react"

export const itemRecipe = defineSlotRecipe({
  className: "item",
  slots: ["root", "group", "separator", "media", "content", "title", "description", "actions", "header", "footer"],
  base: {
    root: {
      "--space": 3
    },
    group: {},
    separator: {},
    media: {

    },
    content: {},
    title: {},
    description: {},
    actions: {},
    header: {},
    footer: {},
  },
  variants: {
    variant: {
      plain: {},
      outline: {},
      muted: {},
    },
    mediaType: {
      plain: {},
      icon: {},
      image: {},
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: "plain",
    mediaType: "plain",
  },
})
