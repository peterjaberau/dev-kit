import { Root } from "#adaptive-menu/namespaces/primitive"
import { data as getInitialData } from "./jira-refactor-cycle1/data"
import { forwardRef } from "react"

export const AdaptiveMenuActorInitiator = forwardRef(( {children}: any, ref) => {
  return <Root data={getInitialData} ref={ref}>{children}</Root>
})
