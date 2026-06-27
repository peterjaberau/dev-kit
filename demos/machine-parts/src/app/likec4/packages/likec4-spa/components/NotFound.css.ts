import type { SystemStyleObject } from '@chakra-ui/react'
import { rem } from '@mantine/core'

export const content: SystemStyleObject = {
  paddingTop: '[120px]',
  position: 'relative',
  zIndex: '1',
  sm: {
    paddingTop: '[220px]',
  },
}

export const image: SystemStyleObject = {
  position: 'absolute',
  inset: '0',
  opacity: 0.2,
}

export const inner: SystemStyleObject = {
  position: 'relative',
}

export const root: SystemStyleObject = {
  paddingTop: '[80px]',
  paddingBottom: '[80px]',
}

export const description: SystemStyleObject = {
  maxWidth: rem(540),
  margin: 'auto',
  marginTop: 'xl',
  marginBottom: '[calc({spacing.xl}*1.5)]',
}

export const title: SystemStyleObject = {
  textAlign: 'center',
  fontWeight: '[900]',
  fontSize: `[38px]`,
}
