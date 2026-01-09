import { createSlotRecipeContext } from "@chakra-ui/react"
import { treeSlotRecipe } from "../styles"

const {
  withProvider,
  withContext,
  useStyles: useTreeStyles,
  PropsProvider,
} = createSlotRecipeContext({ recipe: treeSlotRecipe })

export { useTreeStyles }
