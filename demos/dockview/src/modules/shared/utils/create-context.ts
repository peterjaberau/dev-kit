import { hasProp, isFunction } from '@zag-js/utils'
import { createContext as createReactContext, useContext as useReactContext } from 'react'

function getErrorMessage(hook: string, provider: string) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`
}

export function createContext<T>(options: any = {}) {
  const {
    name,
    strict = true,
    hookName = 'useContext',
    providerName = 'Provider',
    errorMessage,
    defaultValue,
  } = options

  const Context = createReactContext<T | undefined>(defaultValue)

  Context.displayName = name

  function useContext() {
    const context = useReactContext(Context)

    if (!context && strict) {
      const error = new Error(errorMessage ?? getErrorMessage(hookName, providerName))
      error.name = 'ContextError'
      if (hasProp(Error, 'captureStackTrace') && isFunction(Error.captureStackTrace)) {
        Error.captureStackTrace(error, useContext)
      }
      throw error
    }

    return context
  }

  return [Context.Provider, useContext, Context]
}
