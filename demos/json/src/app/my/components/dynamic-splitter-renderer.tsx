"use client"
import { Splitter, Center, Button } from "@chakra-ui/react"

export function SplitterRenderer(props: any) {
  const { component, part, children, ...rest } = props

  return renderComponent({
    component,
    part,
    children,
    props: rest,
    css: props.css,
  })
}

function getRenderState(node: any) {
  if (node && node.component) {
    const children = node.children || []

    const panels = children.filter((c: any) => !c.component && c.part === "panel").map((c: any) => ({ id: c.id }))

    return {
      kind: "component-root",
      component: node.component,
      part: node.part,
      panels,
      children,
      props: node.props || {},
      css: node.css || {},
    }
  }

  if (node.part === "panel") {
    return {
      kind: "panel",
      id: node.id,
      children: node.children || [],
      props: node.props || {},
    }
  }

  if (node.part === "resize-trigger") {
    const id = node.id || ""
    const [from, to] = id.split(":")

    return {
      kind: "resize-trigger",
      id,
      from,
      to,
      props: node.props || {},
    }
  }

  return { kind: "unknown" }
}

function renderComponent(node: any) {
  const state = getRenderState(node)

  if (state.kind !== "component-root") return null

  return (
    <Splitter.Root {...state.props} {...state.css} panels={state.panels}>
      {state.children.map((child: any, index: any) => renderChild(child, index))}
    </Splitter.Root>
  )
}

function renderChild(node: any, index: any) {
  const state = getRenderState(node)

  if (state.kind === "component-root") {
    const { component, part, children, ...rest } = node

    return (
      <SplitterRenderer key={`component-${index}`} component={component} part={part} children={children} {...rest} />
    )
  }

  if (state.kind === "panel") {
    return (
      <Splitter.Panel key={`panel-${state.id}`} id={state.id} {...state.props}>
        {state.children.length ? (
          state.children.map((child: any, i: any) => renderChild(child, i))
        ) : (
          <Center boxSize="full">{state.id === "right" ? <Button>B</Button> : state.id}</Center>
        )}
      </Splitter.Panel>
    )
  }

  if (state.kind === "resize-trigger") {
    return <Splitter.ResizeTrigger key={`resize-${state.id}`} id={state.id} aria-label="Resize" {...state.props} />
  }

  return null
}
