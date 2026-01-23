import { config as configDefaults } from "../../store/config"
import { fromPromise } from "xstate"

export const getConfigDefaultsOperation = fromPromise(async ({ input }) => {
  return configDefaults
})
