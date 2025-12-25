import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { chakra } from '@chakra-ui/react'
import { useContext } from '../providers'

export const Content = forwardRef<HTMLDivElement, any>((props, ref) => {
  const app = useContext()

  if (app.isUnmounted) {
    return null
  }

  const mergedProps = mergeProps(app.getContentProps(), props)
  return <chakra.div {...mergedProps} ref={ref} />
})

Content.displayName = 'Content'
