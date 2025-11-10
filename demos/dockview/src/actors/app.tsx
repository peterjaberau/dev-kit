'use client'
import { ActorsModelProvider } from "./provider"


export const App = ({ children }: any) => {
  return (
    <>
      <ActorsModelProvider>
        {children}
      </ActorsModelProvider>
    </>
  )
}

