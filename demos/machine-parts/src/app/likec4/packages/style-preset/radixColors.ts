import createRadixColorsPreset from "pandacss-preset-radix-colors"
import { DefaultTagColors } from './defaults/types'

export const radixColorsPreset: any = /* @__PURE__ */ createRadixColorsPreset({
  autoP3: false,
  darkMode: {
    condition: '[data-mantine-color-scheme="dark"] &',
  },
  colorScales: [...DefaultTagColors] as any,
})
