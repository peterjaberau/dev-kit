import { createActorContext as createActorXstateContext } from "@xstate/react"
import { hasProp, isFunction } from "@zag-js/utils"
import { useContext as useReactContext, createContext } from "react"

function getErrorMessage(hook: string, provider: string) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`
}

export function createActorContext(machine: any, options: any = {}) {
  const {
    name,
    hookName = "useContext",
    providerName = "Provider",
    errorMessage,
    strict = true,
  } = options

  const ActorContext = createActorXstateContext(machine)

  // domain context (what the app actually consumes)
  const Context = createContext<any | undefined>(undefined)
  Context.displayName = name

  function useDomainContext() {
    const ctx = useReactContext(DomainContext)
    if (!ctx && strict) {
      const error = new Error(
        errorMessage ?? getErrorMessage(hookName, providerName)
      )
      error.name = "ContextError"
      if (hasProp(Error, "captureStackTrace") && isFunction(Error.captureStackTrace)) {
        Error.captureStackTrace(error, useDomainContext)
      }
      throw error
    }
    return ctx
  }

  function Provider(props: any) {
    return (
      <ActorContext.Provider options={{ input: props }}>
        <Bridge>{props.children}</Bridge>
      </ActorContext.Provider>
    )
  }

  function Bridge({ children }: { children: React.ReactNode }) {
    const ref = ActorContext.useActorRef()
    const snapshot = ref.getSnapshot()

    const value = {
      ref,
      send: ref.send,
      state: snapshot,
      context: snapshot.context,
    }

    return (
      <DomainContext.Provider value={value}>
        {children}
      </DomainContext.Provider>
    )
  }

  return [Provider, useDomainContext]
}