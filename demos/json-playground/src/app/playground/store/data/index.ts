import { dataTokens } from './data-tokens'
import { dataThemes } from "./data-themes"
import { dataXstateOpenapi } from './data-xstate-openapi'


export const rawJsonData = {
  tokens: JSON.stringify(dataTokens),
  themes: JSON.stringify(dataThemes),
  xstateOpenapi: JSON.stringify(dataXstateOpenapi),
}

export const parsedJsonData = {
  tokens: dataTokens,
  themes: dataThemes,
  xstateOpenapi: dataXstateOpenapi,
}

