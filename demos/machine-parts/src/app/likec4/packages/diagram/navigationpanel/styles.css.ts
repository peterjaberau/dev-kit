import type { SystemStyleObject } from '@chakra-ui/react'

export const breadcrumbTitle = ({
  truncate = false,
  dimmed = false,
}: {
  truncate?: boolean
  dimmed?: boolean
} = {}): SystemStyleObject => ({
  fontSize: 'sm',
  fontWeight: 'medium',
  transition: 'fast',
  color: dimmed
    ? {
      base: 'likec4.panel.text.dimmed',
      _hover: 'likec4.panel.action',
    }
    : {
      base: 'likec4.panel.action',
      _hover: 'likec4.panel.action.hover',
    },
  ...(truncate
    ? {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }
    : {}),
})
