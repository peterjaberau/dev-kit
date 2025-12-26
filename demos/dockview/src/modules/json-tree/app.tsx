"use client"

import { AppProvider, AppUIProvider } from "./providers"
// import { Panel as JsonTreePanel } from "./components"
import { Tree } from "./components/panels/tree"

const App = (props: any) => {
  return (
    <>
      <AppProvider {...props}>
        <AppUIProvider>
          <Tree />
          {/*<JsonTreePanel.Tree />*/}
        </AppUIProvider>
      </AppProvider>
    </>
  )
}

export default App
