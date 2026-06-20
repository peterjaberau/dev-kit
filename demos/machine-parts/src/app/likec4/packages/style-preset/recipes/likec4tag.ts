import { defineSlotRecipe } from '@chakra-ui/react'

export const likec4tag = defineSlotRecipe({
  className: 'likec4-tag',
  slots: ['root'],
  base: {
    root: {
      pointerEvents: 'all',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 40,
      width: 'min-content',
      transition: 'fast',
      fontSize: 'xs',
      gap: '[1px]',
      cursor: 'default',
      fontFamily: 'likec4',
      fontWeight: 'bold',
      layerStyle: 'likec4.tag',
      whiteSpace: 'nowrap',
      px: '1',
      py: '0',
      '& > span': {
        color: 'likec4.tag.text',
        _first: {
          opacity: 0.65,
        },
      },
    } as any,
  },
})
