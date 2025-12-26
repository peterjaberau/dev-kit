import { createContext } from "react"
import React from "react"
export const AppRootContext: any = createContext(null)

export const AppRootProvider = ({ children }: any) => {
  return <AppRootContext.Provider>{children}</AppRootContext.Provider>
}
