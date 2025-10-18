"use client"
import { SchemaDesignerProvider } from "./provider"
import { App as SchemaDesigner } from "./app"

const Index = () => {
  return (
    <>
      <SchemaDesignerProvider>
        <SchemaDesigner />
      </SchemaDesignerProvider>
    </>
  )
}

export default Index
