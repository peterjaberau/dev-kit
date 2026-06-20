import { defineSlotRecipe } from '@chakra-ui/react'

export const navigationPanelActionIcon = defineSlotRecipe({
  className: 'likec4-navigation-panel-icon',
  slots: ['root'],
  base: {
    root: {
      color: {
        base: 'likec4.panel.action',
        _disabled: 'likec4.panel.action.disabled',
        _notDisabled: {
          _hover: 'likec4.panel.action.hover',
        },
      },
      _disabled: {
        opacity: 0.5,
      },
    } as any,
  },
  variants: {
    variant: {
      'default': {
        root: {
          backgroundColor: {
            base: 'transparent',
            _notDisabled: {
              _hover: 'likec4.panel.action.bg.hover',
            },
          },
        },
      },
      'filled': {
        root: {
          backgroundColor: {
            base: 'likec4.panel.action.bg',
            _notDisabled: {
              _hover: 'likec4.panel.action.bg.hover',
            },
          },
        },
      },
    },
    type: {
      'default': {},
      'warning': {
        root: {
          color: {
            base: 'likec4.panel.action.warning',
            _hover: 'likec4.panel.action.warning.hover',
          },
        },
      },
    },
  },
  compoundVariants: [{
    type: 'warning',
    variant: 'filled',
    css: {
      root: {
        backgroundColor: {
          base: 'likec4.panel.action.warning.bg',
          _hover: 'likec4.panel.action.warning.bg.hover',
        },
      },
    },
  }],
  defaultVariants: {
    variant: 'default',
    type: 'default',
  },
} as any)
