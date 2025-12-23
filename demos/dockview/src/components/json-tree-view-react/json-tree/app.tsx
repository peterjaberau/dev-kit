"use client"

import { AppProvider, AppUIProvider } from "./providers"
import { Root } from "./components/root"

const App = (props: any) => {
  return (
    <>
      <AppProvider {...props}>
        <AppUIProvider>
          <Root />
        </AppUIProvider>
      </AppProvider>
    </>
  )
}

export default App
