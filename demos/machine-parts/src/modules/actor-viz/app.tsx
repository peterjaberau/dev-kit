import { AppProvider, ThemeProvider } from "./providers"
import { DraggableTree } from './views/draggable-tree'
import { RootVisualizer } from './components/visualizer/root.visualizer'

// props: data, machine
const App = (props?: any) => {
  return (
    <>
      <AppProvider {...props}>
        <ThemeProvider>
          <RootVisualizer />
        </ThemeProvider>
      </AppProvider>
    </>
  )
}

export default App
