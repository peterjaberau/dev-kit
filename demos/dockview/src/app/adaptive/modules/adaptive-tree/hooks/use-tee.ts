import { ReactFramework } from "#adaptive-core"
import * as tree from "#adaptive-core/machines/tree"
import { useId } from "react"
import { useEnvironmentContext, useLocaleContext } from "@chakra-ui/react"

const { normalizeProps, useMachine } = ReactFramework

export const useTree = (props: any) => {
  const id = useId()
  const { dir } = useLocaleContext()
  const { getRootNode } = useEnvironmentContext()

  const machineProps = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(tree.machine, machineProps)
  return tree.connect(service, normalizeProps)
}
