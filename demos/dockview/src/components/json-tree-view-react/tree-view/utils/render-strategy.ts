import { createContext } from './create-context'
import { createSplitProps } from './create-split-props'


export const [RenderStrategyPropsProvider, useRenderStrategyPropsContext]: any = createContext<any>({
  name: 'RenderStrategyContext',
  hookName: 'useRenderStrategyContext',
  providerName: '<RenderStrategyPropsProvider />',
})

export const splitRenderStrategyProps = (props: any) =>
  createSplitProps()(props, ['lazyMount', 'unmountOnExit'])
