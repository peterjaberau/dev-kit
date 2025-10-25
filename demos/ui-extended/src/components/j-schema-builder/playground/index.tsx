"use client"
import { AppWithActorsProvider } from "./provider"
import { App } from "./app"

const Index = () => {
  return (
    <AppWithActorsProvider>
      <App />
    </AppWithActorsProvider>
  )
}
export default Index
