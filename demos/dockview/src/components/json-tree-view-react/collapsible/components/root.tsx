import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../helpers/utils/create-split-props'
import { chakra } from '@chakra-ui/react'
// import { ark } from '../helpers/factory'
import { useComponent } from '../selectors'
import { AppProvider } from '../providers'


export const splitCollapsibleProps = (props: any) =>
  createSplitProps()(props, [
    'collapsedHeight',
    'collapsedWidth',
    'defaultOpen',
    'disabled',
    'id',
    'ids',
    'lazyMount',
    'onExitComplete',
    'onOpenChange',
    'open',
    'unmountOnExit',
  ])


export const Root = forwardRef<HTMLDivElement, any>((props, ref) => {
  const [useAppProps, localProps] = splitCollapsibleProps(props)

  const app = useComponent(useAppProps)
  const mergedProps = mergeProps(app.getRootProps(), localProps)

  console.log(
    '---Root---',
    {
      useAppProps,
      localProps,
      app,
      mergedProps,
    }
  )

  return (
    <AppProvider value={app}>
      <chakra.div {...mergedProps} ref={ref} />
    </AppProvider>
  )
})

Root.displayName = 'Root'
