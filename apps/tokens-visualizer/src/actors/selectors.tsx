import { useSelector } from '@xstate/react'
import { useActors } from "./hooks/useActors"


export const rootActorSelector = () => {
  const { rootActorRef: rootRef } = useActors()
  const rootState = useSelector(rootRef, (s) => s)
  const rootContext = rootState?.context



  const { searchContext } = searchSelector()



  return {
    rootRef,
    rootState,
    rootContext,

    searchContext,
  }
}

export const searchSelector = () => {
  const { searchActorRef: searchRef } = useActors()
  const searchState: any = useSelector(searchRef, (s) => s)
  const searchContext = searchState?.context
  const sendToSearch = searchRef?.send

  const collection = searchContext?.collection

  const searchResults = searchContext?.searchResults
  const searchQuery = searchContext?.searchQuery
  const targetIndex = searchContext?.targetIndex

  const isReady = searchState.matches('ready')
  const stateValue = searchState.value
  const dictionary = searchContext.dictionary



  const updateSearch = (searchQuery: any, searchResults: any) => sendToSearch({ type: 'search.changed', payload: { searchQuery, searchResults } })



  return {
    searchRef,
    searchState,
    searchContext,

    sendToSearch,
    updateSearch,

    isReady,
    stateValue,
    dictionary,
    collection,
    searchResults,
    searchQuery,
    targetIndex,
  }
}
