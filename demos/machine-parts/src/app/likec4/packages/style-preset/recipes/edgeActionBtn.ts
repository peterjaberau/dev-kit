import { defineSlotRecipe } from '@chakra-ui/react'

export const edgeActionBtn = defineSlotRecipe({
  className: 'likec4-edge-action-btn',
  slots: ['root'],
  base: {
    root: {
      pointerEvents: 'all',
      color: `var(--xy-edge-label-color)`,
      cursor: 'pointer',
      opacity: 0.75,
      transition: 'fast',
      translate: 'auto',
      '--ai-bg': 'transparent',
      '--ai-hover': `color-mix(in oklab , var(--xy-edge-label-background-color), {colors.likec4.mixColor} 10%)`,
      '--ai-size': `28px`,
      '--ai-radius': `{radii.sm}`,
      _hover: {
        '--ai-bg': 'var(--xy-edge-label-background-color)',
        opacity: 1,
        translateY: '[2px]',
        scale: 1.15,
      },
      _active: {
        translateY: '[-1px]',
        scale: '0.9',
      },
      '& .tabler-icon': {
        width: '80%',
        height: '80%',
        strokeWidth: '2',
      },
      _print: {
        display: 'none',
      },
    } as any,
  },
} as any)
