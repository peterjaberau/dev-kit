"use client"

import { AppProvider, AppUIProvider } from "../../providers"
import { TreeDraggable } from "../../components/panels/tree-draggable"

const App = (props: any) => {
  return (
    <>
      <AppProvider {...props}>
        <AppUIProvider>
          <TreeDraggable />
        </AppUIProvider>
      </AppProvider>
    </>
  )
}

export default App
