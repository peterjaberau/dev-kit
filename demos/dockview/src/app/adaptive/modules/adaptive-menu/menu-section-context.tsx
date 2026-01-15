import { createContext, useContext } from "react"

import invariant from "tiny-invariant"

export const MenuSectionContext = createContext<string | null>(null)

export const useMenuSectionContext = (): string => {
  const context = useContext(MenuSectionContext)
  invariant(context, "useMenuSectionContext must be used within a MenuSection")
  return context
}
