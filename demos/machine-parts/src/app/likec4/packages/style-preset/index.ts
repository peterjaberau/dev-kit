import { defineConfig } from '@chakra-ui/react'

import { animationStyles, keyframes } from './animations'
import { conditions } from './conditions'
import { vars as likec4vars } from './defaults/vars'
import { breakpoints, mantine } from './generated'
import { globalCss } from './globalCss'
import { layerStyles } from './layer-styles'
import * as recipes from './recipes/index'
import * as slotRecipes from './stot-recipes/index'
import { textStyles } from './text-styles'
import { semanticTokens } from './tokens-semantic'
import { tokens } from './tokens'

export const theme = {
  breakpoints,
  textStyles,
  layerStyles,
  tokens,
  semanticTokens,
  recipes,
  slotRecipes,
  keyframes,
  animationStyles,
}

export default /* @__PURE__ */ defineConfig({
  conditions,
  globalCss,
  theme,
})

export const vars = {
  likec4: likec4vars,
  mantine,
}
