import * as collapsible from '@zag-js/collapsible'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId, useRef } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../helpers/providers'




export const useComponent = (props: any = {}): any => {
  const { lazyMount, unmountOnExit, ...collapsibleProps }: any = props
  const id = useId()
  const wasVisible = useRef(false)
  const { dir } = useLocaleContext()
  const { getRootNode } = useEnvironmentContext()

  const machineProps: collapsible.Props = {
    id,
    dir,
    getRootNode,
    ...collapsibleProps,
  }

  const service = useMachine(collapsible.machine, machineProps)
  const api = collapsible.connect(service, normalizeProps)

  if (api.visible) {
    wasVisible.current = true
  }

  const isUnmounted =
    (!api.visible && !wasVisible.current && lazyMount) || (unmountOnExit && !api.visible && wasVisible.current)

  return { ...api, isUnmounted }
}
