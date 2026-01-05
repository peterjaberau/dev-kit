import { AppProvider, AppUIProvider } from "#json-tree/providers"
import { RenderTree } from "./render-tree"

const App = (props: any) => {
  return (
    <>
      <AppProvider {...props}>
        <AppUIProvider>
          <RenderTree />
        </AppUIProvider>
      </AppProvider>
    </>
  )
}

export default App
