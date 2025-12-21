import { createContext } from "react"
import React from "react"
export const RootContext: any = createContext(null)

export const RootProvider = ({ children }: any) => {
  return <RootContext.Provider>{children}</RootContext.Provider>
}
