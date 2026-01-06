import { AppProvider, AppUIProvider } from "#json-tree/providers"
import { Tree } from "./components"

const App = (props: any) => {
  return (
    <>
      <AppProvider {...props}>
        <AppUIProvider>
          <Tree />
        </AppUIProvider>
      </AppProvider>
    </>
  )
}

export default App
