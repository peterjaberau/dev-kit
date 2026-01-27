'use client'
import { ComponentRenderer, registerComponent } from ".."

registerComponent("", {
  basic: () => import("#app/adaptive-tool/packages/plugins/stories/basic"),
})



export const RenderFromRegistry =() => {
    return <ComponentRenderer id="basic" />
}