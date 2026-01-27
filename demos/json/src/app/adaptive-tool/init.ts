export const config = {
  plugins: {
    "code-mirror-basic-story": () => import("#components/code-editor/stories/basic"),
    "code-mirror-editor": () => import("#adaptive-tool/packages/components/code-mirror/CodeMirrorEditor"),
    "code-mirror-viewer": () => import("#adaptive-tool/packages/components/code-mirror/CodeMirrorViewer"),
    "code-mirror-story": () => import("#adaptive-tool/packages/components/code-mirror/stories"),
  },
}