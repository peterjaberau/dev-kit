import { definePreset } from '@pandacss/dev'

import { animationStyles, keyframes } from './animations'
import { conditions } from './conditions'
import { vars as likec4vars } from './defaults/vars'
import { breakpoints, mantine } from './generated'
import { globalCss } from './globalCss'
import { globalVars } from './globalVars'
import { layerStyles } from './layer-styles'
import { patterns } from './pattens/index'
import { radixColorsPreset } from './radixColors'
import * as recipes from './recipes/index'
import * as slotRecipes from './stot-recipes/index'
import { textStyles } from './text-styles'
import { semanticTokens } from './tokens-semantic'
import { tokens } from './tokens'
import { utilities } from './utilities'

export const theme = {
  breakpoints,
  textStyles,
  layerStyles,
  tokens,
  semanticTokens,
  recipes,
  slotRecipes,
  containerNames: ['likec4-root', 'likec4-dialog'],
  containerSizes: {
    xs: '384px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },
  keyframes,
  animationStyles,
}

export default /* @__PURE__ */ definePreset({
  name: 'likec4',
  presets: [
    radixColorsPreset,
  ],
  globalVars,
  globalCss,
  staticCss: {
    extend: {
      themes: ['light', 'dark'],
    },
  },
  conditions,
  patterns,
  utilities,
  theme: {
    extend: theme,
  },
})

export const vars = {
  likec4: likec4vars,
  mantine,
}
