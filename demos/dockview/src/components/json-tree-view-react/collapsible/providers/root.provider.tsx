import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { chakra } from '@chakra-ui/react'
import { AppProvider } from './app.provider'
import { createSplitProps } from '../helpers/utils/create-split-props'

const splitRootProviderProps = createSplitProps()

export const RootProvider = forwardRef<HTMLDivElement, any>((props, ref) => {
  const [{ value: component }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(component.getRootProps(), localProps)

  return (
    <AppProvider value={component}>
      <chakra.div {...mergedProps} ref={ref} />
    </AppProvider>
  )
})

RootProvider.displayName = 'RootProvider'
