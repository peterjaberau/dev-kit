import { SidepanesProvider, localStorageAdapter } from '../src'
import { BasicExample } from './examples/BasicExample'
import './styles/sidepanes.css'

function App() {
  return (
    <SidepanesProvider
      config={{
        persistence: localStorageAdapter
      }}
    >
      <BasicExample />
    </SidepanesProvider>
  )
}

export default App
