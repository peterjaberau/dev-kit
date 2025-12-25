import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { chakra } from '@chakra-ui/react'
import { useAppContext } from '../providers'

export const Content = forwardRef<HTMLDivElement, any>((props, ref) => {
  const app = useAppContext()

  if (app.isUnmounted) {
    return null
  }

  const mergedProps = mergeProps(app.getContentProps(), props)
  return <chakra.div {...mergedProps} ref={ref} />
})

Content.displayName = 'Content'
