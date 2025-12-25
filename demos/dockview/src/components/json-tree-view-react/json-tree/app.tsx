"use client"

import { AppProvider, AppUIProvider } from "./providers"
import { Root } from "./components/root"
import { Render } from "./render"

const App = (props: any) => {
  return (
    <>
      <AppProvider {...props}>
        <AppUIProvider>
          <Render />
          {/*<Root />*/}
        </AppUIProvider>
      </AppProvider>
    </>
  )
}

export default App
