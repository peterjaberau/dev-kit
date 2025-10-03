import { useActors } from "./hooks/useActors"

export const rootActorSelector = () => {
  const { rootActorRef: rootRef } = useActors()
  const rootState = rootRef?.getSnapshot()
  const rootContext = rootState?.context

  const { graphGridContext } = graphGridSelector()

  return {
    rootRef,
    rootState,
    rootContext,

    graphGridContext,
  }
}

export const graphGridSelector = () => {
  const { graphGridActorRef: graphGridRef } = useActors()
  const graphGridState = graphGridRef?.getSnapshot()
  const graphGridContext = graphGridState?.context

  return {
    graphGridRef,
    graphGridState,
    graphGridContext,

    isReady: graphGridState?.matches("ready"),
    colorThemeObj: graphGridContext?.colorThemeObj,
    gridStylesObj: graphGridContext?.gridStylesObj,
    props: graphGridContext?.props,
  }
}
