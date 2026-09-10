'use client'
import { ActorsModelProvider } from "./actors/provider"


export const RenderAdaptiveRenderer = ({ children, input }: any) => {
  return (
    <>
      <ActorsModelProvider input={input}>{children}</ActorsModelProvider>
    </>
  )
}

