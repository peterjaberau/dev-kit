import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { chakra } from '@chakra-ui/react'
import { useAppContext } from '../providers'


export const Trigger = forwardRef<HTMLButtonElement, any>((props, ref) => {
  const app = useAppContext()
  const mergedProps = mergeProps(app.getTriggerProps(), props)

  console.log('---Trigger---', {
    app,
    mergedProps,
    props
  })

  return <chakra.button {...mergedProps} ref={ref} />
})

Trigger.displayName = 'Trigger'
