import { useActors } from "./hooks/useActors"

export const rootActorSelector = () => {
  const { rootActorRef: rootRef } = useActors()
  const rootState = rootRef?.getSnapshot()
  const rootContext = rootState?.context

  const { exampleContext } = exampleSelector()

  return {
    rootRef,
    rootState,
    rootContext,

    exampleContext,
  }
}

export const exampleSelector = () => {
  const { exampleActorRef: exampleRef } = useActors()
  const exampleState = exampleRef?.getSnapshot()
  const exampleContext = exampleState?.context

  return {
    exampleRef,
    exampleState,
    exampleContext,

    isReady: exampleState?.matches("ready"),
    colorThemeObj: exampleContext?.colorThemeObj,
    gridStylesObj: exampleContext?.gridStylesObj,
    props: exampleContext?.props,
  }
}
