"use client"

import { forwardRef } from "react"
import { AppProvider, UIProvider } from "./providers"
import { Root } from "./components/root"

const App = (props: any) => {
  return (
    <>
      <AppProvider {...props}>
        <UIProvider>
          <Root />
        </UIProvider>
      </AppProvider>
    </>
  )
}

export default App
