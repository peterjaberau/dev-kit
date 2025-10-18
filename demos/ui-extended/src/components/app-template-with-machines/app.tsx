'use client'
import { SchemaDesignerProvider } from "./provider"
import { SchemaDesignerView } from "./views"


export const App = () => {
  return (
    <>
      <SchemaDesignerProvider>
        <SchemaDesignerView />
      </SchemaDesignerProvider>
    </>
  )
}

