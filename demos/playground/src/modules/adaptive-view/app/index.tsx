"use client"
import { RenderAdaptiveRenderer } from "./render"



const AdaptiveViewApp = ({children, input = {}}: any) => {
  return <RenderAdaptiveRenderer input={input}>{children}</RenderAdaptiveRenderer>
}

export default AdaptiveViewApp