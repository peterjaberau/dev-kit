import { defineSlotRecipe } from '@chakra-ui/react'

export const actionButtons = defineSlotRecipe({
  className: 'action-buttons',
  slots: ['root', 'container'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      top: 'calc(100% - 30px)',
      transform: 'translateX(-50%)',
      left: `50%`,
      width: 'auto',
      minHeight: 30,
      zIndex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      _smallZoom: {
        display: 'none',
      },
    } as any,
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: '1.5',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
})

export const actionBtn = defineSlotRecipe({
  className: 'action-btn',
  slots: ['root'],
  base: {
    root: {
      color: 'var(--actionbtn-color)',
      opacity: 0.75,

      '--actionbtn-color': 'var(--likec4-palette-loContrast)',
      '--actionbtn-color-hovered': 'var(--likec4-palette-loContrast)',
      '--actionbtn-color-hovered-btn': 'var(--likec4-palette-hiContrast)',

      '--actionbtn-bg-idle': `color-mix(in oklab , var(--likec4-palette-fill),  transparent 99%)`,
      '--actionbtn-bg-hovered': `color-mix(in oklab , var(--likec4-palette-fill) 65%, var(--likec4-palette-stroke))`,
      '--actionbtn-bg-hovered-btn': `color-mix(in oklab , var(--likec4-palette-fill) 50%, var(--likec4-palette-stroke))`,

      '--ai-bg': `var(--actionbtn-bg-idle)`,

      background: `var(--ai-bg)`,

      _selectable: {
        pointerEvents: 'all',
        cursor: 'pointer',
      },

      _hover: {
        opacity: 1,
        color: 'var(--actionbtn-color-hovered-btn)',
        '--ai-bg': `var(--actionbtn-bg-hovered-btn)`,
      },
      _reduceGraphicsOnPan: {
        display: 'none',
      },
      _smallZoom: {
        display: 'none',
      },
      '& *': {
        pointerEvents: 'none',
      },
      _print: {
        display: 'none',
      },
    } as any,
  },

  variants: {
    variant: {
      transparent: {
        root: {
          '--actionbtn-bg-hovered': `var(--actionbtn-bg-idle)`,
        },
      },
      filled: {
        root: {
          boxShadow: {
            base: '1px 1px 3px 0px transparent',
            _hover: '1px 1px 3px 0px rgba(0, 0, 0, 0.2)',
            _reduceGraphics: 'none',
          },
        },
      },
    },
    size: {
      sm: {
        root: {
          ['--ai-size']: `22px`,
        },
      },
      md: {
        root: {
          ['--ai-size']: `28px`,
        },
      },
    },
    radius: {
      sm: {
        root: {
          '--ai-radius': `{radii.sm}`,
        },
      },
      md: {
        root: {
          '--ai-radius': `{radii.md}`,
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    radius: 'md',
    variant: 'filled',
  },
})
