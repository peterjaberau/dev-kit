'use client'
import { ActorsModelProvider } from "./actors-model/provider"

export const AppWithActorsProvider = ({children}: any) => {
  return (
    <>
      <ActorsModelProvider>
        {children}
      </ActorsModelProvider>
    </>
  )
}
