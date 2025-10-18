'use client'
import { SchemaBuilderProvider as Provider } from "./machines/schema-builder.provider"

export const SchemaBuilderProvider = ({children}: any) => {
  return (
    <>
      <Provider>
        {children}
      </Provider>
    </>
  )
}
