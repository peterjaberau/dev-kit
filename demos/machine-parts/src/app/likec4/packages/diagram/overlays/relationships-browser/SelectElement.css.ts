import { css } from '#likec4/style-preset/css'

export const node = css({
  margin: '0',
})

export const label = css({
  _hover: {
    backgroundColor: 'mantine.colors.gray[0]',
    _dark: {
      backgroundColor: 'default.hover',
      color: 'white',
    },
  },
})

export const scrollArea = css({
  maxHeight: [
    '70vh',
    'calc(100cqh - 70px)',
  ],
})
