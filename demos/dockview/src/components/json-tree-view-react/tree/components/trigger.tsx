import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { chakra } from '@chakra-ui/react'
import { useContext } from '../providers'


export const Trigger = forwardRef<HTMLButtonElement, any>((props, ref) => {
  const app = useContext()
  const mergedProps = mergeProps(app.getTriggerProps(), props)

  return <chakra.button {...mergedProps} ref={ref} />
})

Trigger.displayName = 'Trigger'
