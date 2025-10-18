'use client'
import { ActorsModelProvider } from "./actors-model/provider"


export const App = ({ children }: any) => {
  return (
    <>
      <ActorsModelProvider>
        {children}
      </ActorsModelProvider>
    </>
  )
}

