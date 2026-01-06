import { AppProvider, ThemeProvider } from "./providers"
import { Tree } from "./components"

const App = (props: any) => {
  return (
    <>
      <AppProvider {...props}>
        <ThemeProvider>
          <Tree />
        </ThemeProvider>
      </AppProvider>
    </>
  )
}

export default App
