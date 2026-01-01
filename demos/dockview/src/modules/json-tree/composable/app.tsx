"use client"

import { AppProvider, AppUIProvider } from "../providers"
import { ComposableDragDrop } from "./views"

const App = (props: any) => {
  return (
    <>
      <AppProvider {...props}>
        <AppUIProvider>
          <ComposableDragDrop />
          {/*<JsonTreePanel.Tree />*/}
        </AppUIProvider>
      </AppProvider>
    </>
  )
}

export default App
