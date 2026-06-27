import type { SystemStyleObject } from '@chakra-ui/react'

export const svgContainer: SystemStyleObject = {
  minWidth: 300,
  '& svg': {
    width: '100%',
    height: 'auto',
  },
}

export const cssScrollArea: SystemStyleObject = {
  height: '100%',
  '& .mantine-ScrollArea-viewport': {
    minHeight: '100%',
  },
  '& .mantine-ScrollArea-viewport > div': {
    minHeight: '100%',
    height: '100%',
  },
}

export const cssCodeBlock: SystemStyleObject = {
  minHeight: '100%',
}

export const viewWithTopPadding: SystemStyleObject = {
  height: '100%',
  paddingTop: '[var(--header-height)]',
}
