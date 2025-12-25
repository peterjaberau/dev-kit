import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../helpers/utils/create-split-props'
import { chakra } from '@chakra-ui/react'
// import { ark } from '../helpers/factory'
import { useComponent } from '../selectors'
import { Provider } from '../providers'


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
  const [useProps, localProps] = splitCollapsibleProps(props)

  const app = useComponent(useProps)
  const mergedProps = mergeProps(app.getRootProps(), localProps)

  return (
    <Provider value={app}>
      <chakra.div {...mergedProps} ref={ref} />
    </Provider>
  )
})

Root.displayName = 'Root'
