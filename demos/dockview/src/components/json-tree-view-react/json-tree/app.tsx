"use client"
import { AppProvider, UIProvider } from "./providers"
import { Root } from "./components/root"

const App = ({ data }: any) => {
  return (
    <>
      <AppProvider data={data}>
        <UIProvider>
          <Root />
        </UIProvider>
      </AppProvider>
    </>
  )
}

export default App
