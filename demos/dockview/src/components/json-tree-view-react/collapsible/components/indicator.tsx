import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useAppContext } from '../providers'
import { chakra } from '@chakra-ui/react'


export const Indicator = forwardRef<HTMLDivElement, any>((props, ref) => {
  const app = useAppContext()
  const mergedProps = mergeProps(app.getIndicatorProps(), props)

  return <chakra.div {...mergedProps} ref={ref} />
})

Indicator.displayName = 'Indicator'
