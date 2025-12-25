import { createContext } from '../helpers/utils/create-context'
import { createSplitProps } from '../helpers/utils/create-split-props'

export interface RenderProps {
  lazyMount?: boolean | undefined
  unmountOnExit?: boolean | undefined
}

export const [RenderProvider, useRenderContext] = createContext<RenderProps>({
  name: 'RenderContext',
  hookName: 'useRenderContext',
  providerName: '<RenderProvider />',
})

export const splitRenderProps = (props: any) =>
  createSplitProps()(props, ['lazyMount', 'unmountOnExit'])
