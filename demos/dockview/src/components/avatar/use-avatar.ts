import * as avatar from "@zag-js/avatar"
import { normalizeProps, useMachine } from "@zag-js/react"
import { useId } from "react"
import { useEnvironmentContext, useLocaleContext } from "./providers"

export const useAvatar = (props?: any): any => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const context: avatar.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(avatar.machine, context)
  return avatar.connect(service, normalizeProps)
}
