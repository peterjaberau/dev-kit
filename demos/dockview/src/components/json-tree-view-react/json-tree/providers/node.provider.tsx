import { createContext } from "react"
import React from "react"
export const NodeContext: any = createContext(null)

export const NodeProvider = ({ children }: any) => {
  return <NodeContext.Provider>{children}</NodeContext.Provider>
}
