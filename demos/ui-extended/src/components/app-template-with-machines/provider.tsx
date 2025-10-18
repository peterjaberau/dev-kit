'use client'
import { SchemaProvider } from "./machines/provider"

export const SchemaDesignerProvider = ({children}: any) => {
  return (
    <>
      <SchemaProvider>
        {children}
      </SchemaProvider>
    </>
  )
}
