import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useContext } from '../providers'
import { chakra } from '@chakra-ui/react'


export const Indicator = forwardRef<HTMLDivElement, any>((props, ref) => {
  const app = useContext()
  const mergedProps = mergeProps(app.getIndicatorProps(), props)

  return <chakra.div {...mergedProps} ref={ref} />
})

Indicator.displayName = 'Indicator'
