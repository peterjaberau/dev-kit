import { createContext, useContext } from "react"

import invariant from "tiny-invariant"

type onExpansionToggle = (isExpanded: boolean) => void

export const ExpandableLevelContext = createContext(0)

export const AreAllAncestorsExpandedContext = createContext<boolean | null>(null)

export const IsExpandedContext = createContext<boolean | null>(null)

export const SetIsExpandedContext = createContext<((value: boolean) => void) | null>(null)

export const OnExpansionToggleContext = createContext<onExpansionToggle | null>(null)

export const LevelContext = ExpandableLevelContext

export const useIsExpanded = (): boolean => {
  const context = useContext(IsExpandedContext)
  invariant(context !== null, "useIsExpanded must be used within an Expandable")
  return context
}

export const useSetIsExpanded = (): ((value: boolean) => void) => {
  const context = useContext(SetIsExpandedContext)
  invariant(context !== null, "useSetIsExpanded must be used within an Expandable")
  return context
}

export const useOnExpansionToggle = (): onExpansionToggle | null => useContext(OnExpansionToggleContext)

export const useLevel = (): number => useContext(LevelContext)

export const useAreAllAncestorsExpanded = (): boolean => useContext(AreAllAncestorsExpandedContext) ?? true
