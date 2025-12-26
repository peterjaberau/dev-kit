"use client"

import { AppProvider, AppUIProvider } from "./providers"
import { Panel as JsonTreePanel } from "./components"

const App = (props: any) => {
  return (
    <>
      <AppProvider {...props}>
        <AppUIProvider>
          <JsonTreePanel.Tree />
        </AppUIProvider>
      </AppProvider>
    </>
  )
}

export default App
