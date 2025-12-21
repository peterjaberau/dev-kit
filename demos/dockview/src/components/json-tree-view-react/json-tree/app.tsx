"use client"
import { JsonTreeProvider } from "./providers"

export const App = ({ children }: any) => {
  return (
    <>
      <JsonTreeProvider>{children}</JsonTreeProvider>
    </>
  )
}
