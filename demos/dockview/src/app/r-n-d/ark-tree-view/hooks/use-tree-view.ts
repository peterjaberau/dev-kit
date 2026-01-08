import { normalizeProps, useMachine } from "@zag-js/react"
import * as treeView from "@zag-js/tree-view"
import { useId } from "react"
import { useEnvironmentContext, useLocaleContext } from "@chakra-ui/react"
import { createContext } from "@chakra-ui/react"

export const useTreeView = (props: any) => {
  const id = useId()
  const { dir } = useLocaleContext()
  const { getRootNode } = useEnvironmentContext()

  const machineProps: treeView.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(treeView.machine, machineProps)
  return treeView.connect(service, normalizeProps)
}

