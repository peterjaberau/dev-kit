import { registerComponent } from "#plugins"



export const initiateRegistry = () => {
  registerComponent("", {
    "code-mirror-basic-story": () => import("#components/code-editor/stories/basic"),
  })
}