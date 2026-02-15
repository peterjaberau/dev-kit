'use client'
import { ActorsModelProvider } from "./model/provider"


export const App = ({ children }: any) => {
  return (
    <>
      <ActorsModelProvider>
        {children}
      </ActorsModelProvider>
    </>
  )
}

