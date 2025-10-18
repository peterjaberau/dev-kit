'use client'
import { SchemaBuilderProvider } from "./provider"
import SchemaBuilder from "./schema-builder"


const Index = () => {
  return (
    <>
      <SchemaBuilderProvider>
        <SchemaBuilder />
      </SchemaBuilderProvider>
    </>
  )
}

export default Index
