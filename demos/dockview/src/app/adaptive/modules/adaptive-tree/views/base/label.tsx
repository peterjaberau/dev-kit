import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useTreeContext } from '../../providers'
import { chakra } from '@chakra-ui/react'

export const Label = forwardRef<HTMLHeadingElement, any>((props, ref) => {
  const tree: any = useTreeContext()
  const mergedProps = mergeProps(tree.getLabelProps(), props)

  return <chakra.h3 {...mergedProps} ref={ref} />
})

