"use client"

import { Controller } from "./controller"
import {
  TreeViewContextJsonExample,
  TreeViewContextCustomCompositionExample,
  TreeViewControlledProviderCompositionExample,
  TreeViewControlledProviderJsonExample,
  TreeViewUncontrolledCompositionExample,
  TreeViewUncontrolledJsonExample,
} from "./examples"

const treeViewControllerPayloads = {
  jsonControlled: {
    title: "Controlled JSON provider",
    description:
      "Data is passed as JSON, while useTreeView owns the controlled expanded and selected state through RootProvider.",
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
  jsonUncontrolled: {
    title: "Uncontrolled JSON root",
    description:
      "TreeView.View receives JSON data and keeps expanded and selected state internally.",
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
  jsonContext: {
    title: "JSON context reader",
    description:
      "TreeView.Root renders JSON data, and a child component reads live state with useTreeViewContext.",
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
  compositionControlled: {
    title: "Controlled composition provider",
    description:
      "Rows are written with TreeView parts, while useTreeView controls state through RootProvider.",
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
  compositionUncontrolled: {
    title: "Uncontrolled composition root",
    description:
      "Rows are custom JSX using Node, NodeStart, NodeContent, and NodeEnd; Root owns internal state.",
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
  compositionContext: {
    title: "Composition context reader",
    description:
      "Custom JSX rows plus useTreeViewContext, showing how composed children can read TreeView state.",
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
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, color-mix(in srgb, Canvas 92%, #0f766e 8%), Canvas)",
      }}
    >
      <div
        style={{
          height: "100%",
          overflowY: "auto",
          overscrollBehavior: "contain",
          padding: "48px 16px",
          display: "grid",
          placeItems: "start center",
        }}
      >
        <div
        style={{
          width: "100%",
          maxWidth: "104rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 24rem), 1fr))",
          alignItems: "start",
          gap: "1.5rem",
        }}
      >
        <Controller
          payload={treeViewControllerPayloads.jsonControlled}
          render={(values) => (
            <TreeViewControlledProviderJsonExample {...getTreeViewProps(values)} />
          )}
        />

        <Controller
          payload={treeViewControllerPayloads.jsonUncontrolled}
          render={(values) => (
            <TreeViewUncontrolledJsonExample {...getTreeViewProps(values)} />
          )}
        />

        <Controller
          payload={treeViewControllerPayloads.jsonContext}
          render={(values) => (
            <TreeViewContextJsonExample {...getTreeViewProps(values)} />
          )}
        />

        <Controller
          payload={treeViewControllerPayloads.compositionControlled}
          render={(values) => (
            <TreeViewControlledProviderCompositionExample
              {...getTreeViewProps(values)}
            />
          )}
        />

        <Controller
          payload={treeViewControllerPayloads.compositionUncontrolled}
          render={(values) => (
            <TreeViewUncontrolledCompositionExample
              {...getTreeViewProps(values)}
            />
          )}
        />

        <Controller
          payload={treeViewControllerPayloads.compositionContext}
          render={(values) => (
            <TreeViewContextCustomCompositionExample {...getTreeViewProps(values)} />
          )}
        />
        </div>
      </div>
    </main>
  )
}
