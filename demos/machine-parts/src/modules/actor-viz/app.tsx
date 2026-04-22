import { AppProvider, ThemeProvider } from "./providers"
import { DraggableTree } from './views/draggable-tree'

// props: data, machine
const App = (props: any) => {
  return (
    <>
      <AppProvider {...props}>
        <ThemeProvider>
          <DraggableTree/>
        </ThemeProvider>
      </AppProvider>
    </>
  )
}

export default App
