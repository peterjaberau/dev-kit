'use client'
import "../styles/dock-light.css"
import ActorsApp from "#actors"
import ViewRenderer from "./view-renderer"

const Index = ({ children }: any) => {
  return (
    <ActorsApp>
      <ViewRenderer />
    </ActorsApp>
  )
}

export default Index
