'use client'
import { ActorsModelProvider } from "./actors/provider"


export const RenderAdaptiveView = ({ children }: any) => {

  return (
    <>
      <ActorsModelProvider>
        {children}
      </ActorsModelProvider>
    </>
  )
}

