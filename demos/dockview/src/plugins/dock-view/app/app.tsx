'use client'
import { DockViewProvider } from "./provider"


export const App = ({ children }: any) => {
  return (
    <>
      <DockViewProvider>
        {children}
      </DockViewProvider>
    </>
  )
}

