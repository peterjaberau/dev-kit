"use client"

import { Controller } from "./controller"
import { TreeViewContextStateExample, TreeViewControlledExample, TreeViewUncontrolledRootExample } from "./examples"

const treeViewControllerPayloads = {
  controlled: {
    title: "Controlled provider",
    controls: [
      {
        id: "fullRowHighlight",
        label: "Full row highlight",
        type: "boolean",
        defaultValue: false,
      },
      {
        id: "expandOnNodeClick",
        label: "Expand on node click",
        type: "boolean",
        defaultValue: true,
      },
    ],
  },
  uncontrolled: {
    title: "Uncontrolled root",
    controls: [
      {
        id: "fullRowHighlight",
        label: "Full row highlight",
        type: "boolean",
        defaultValue: true,
      },
      {
        id: "expandOnNodeClick",
        label: "Expand on node click",
        type: "boolean",
        defaultValue: false,
      },
    ],
  },
  context: {
    title: "Context reader",
    controls: [
      {
        id: "fullRowHighlight",
        label: "Full row highlight",
        type: "boolean",
        defaultValue: false,
      },
      {
        id: "expandOnNodeClick",
        label: "Expand on node click",
        type: "boolean",
        defaultValue: false,
      },
    ],
  },
} as const

const getTreeViewProps = (values: Record<string, boolean>) => ({
  fullRowHighlight: values.fullRowHighlight ?? false,
  expandOnNodeClick: values.expandOnNodeClick ?? false,
})

export default function TreeViewGridCssPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "start center",
        padding: "48px 16px",
        background: "linear-gradient(135deg, color-mix(in srgb, Canvas 92%, #0f766e 8%), Canvas)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "78rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 24rem), 1fr))",
          alignItems: "start",
          gap: "1.5rem",
        }}
      >
        <Controller
          payload={treeViewControllerPayloads.controlled}
          render={(values) => (
            <TreeViewControlledExample {...getTreeViewProps(values)} />
          )}
        />

        <Controller
          payload={treeViewControllerPayloads.uncontrolled}
          render={(values) => (
            <TreeViewUncontrolledRootExample {...getTreeViewProps(values)} />
          )}
        />

        <Controller
          payload={treeViewControllerPayloads.context}
          render={(values) => (
            <TreeViewContextStateExample {...getTreeViewProps(values)} />
          )}
        />
      </div>
    </main>
  )
}
