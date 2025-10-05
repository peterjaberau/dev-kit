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
  const dictionary = searchContext.dictionary
  const searchResults = searchContext?.searchResults
  const searchQuery = searchContext?.searchQuery

  const selected = searchContext?.selected
  const targetIndex = searchContext?.targetIndex

  const isReady = searchState.matches('ready')
  const stateValue = searchState.value

  const hasSearchQuery= searchQuery.length > 0
  const searchCount = hasSearchQuery ? searchResults.length : dictionary.length



  const updateSearch = (searchQuery: any, searchResults: any) => sendToSearch({ type: 'input.changed', payload: { searchQuery, searchResults } })
  const updateSelected = (selected: any) => sendToSearch({ type: 'value.changed', payload: { selected } })



  return {
    searchRef,
    searchState,
    searchContext,

    sendToSearch,
    updateSearch,
    updateSelected,

    isReady,
    stateValue,
    dictionary,
    collection,
    searchResults,
    searchQuery,
    searchCount,
    selected,
    targetIndex,
  }
}
