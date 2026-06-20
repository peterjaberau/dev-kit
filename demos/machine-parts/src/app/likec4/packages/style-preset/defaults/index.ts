import { ElementColors } from './element-colors'
import { RelationshipColors } from './relationship-colors'
import { defaultSizes } from './sizes'
import { type LikeC4Theme, type ThemeColor, type ThemeColorValues, ThemeColors } from './types'

export const defaultTheme = {
  colors: ThemeColors.reduce((acc, key) => {
    acc[key] = {
      elements: ElementColors[key],
      relationships: RelationshipColors[key],
    }
    return acc
  }, {} as Record<ThemeColor, ThemeColorValues>),
  ...defaultSizes,
} as const satisfies LikeC4Theme

export * from './element-colors'
export * from './relationship-colors'
export * from './types'
export * from './vars'
