import { defineSlotRecipe } from '@chakra-ui/react'

export const elementNode = defineSlotRecipe({
  className: 'likec4-element-node',
  slots: ['root'],
  base: {
    root: {
      position: 'relative',
      width: 'full',
      height: 'full',
      padding: '0',
      margin: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',

      _focusVisible: {
        outline: 'none',
      },
      _selectable: {
        pointerEvents: 'all',
        _before: {
          content: '" "',
          position: 'absolute',
          top: 'calc(100% - 4px)',
          left: '0',
          width: 'full',
          height: '24px',
          background: 'transparent',
          pointerEvents: 'all',
        },
      },
      _reduceGraphicsOnPan: {
        _before: {
          display: 'none',
        },
      },

      [`:where(.react-flow__node.selectable:not(.dragging)) &`]: {
        cursor: 'pointer',
      },

      [`&:is([data-likec4-shape="document"])`]: {
        paddingBottom: '16px',
      },
    } as any,
  },
} as any)
