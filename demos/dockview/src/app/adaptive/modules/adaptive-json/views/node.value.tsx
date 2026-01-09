
export const NodeValue = (props: any): React.ReactNode => {
  const { node, renderValue } = props

  if (node.type === 'text') {
    return <>{renderValue?.(node) ?? node.value}</>
  }

  const Element = node.tagName
  return (
    <Element
      data-root={node.properties.root ? "" : undefined}
      data-type={node.properties.nodeType}
      data-kind={node.properties.kind}
      suppressHydrationWarning
    >
      {node.children.map((child: any, index: any) => (
        <NodeValue key={index} node={child} renderValue={renderValue} />
      ))}
    </Element>
  )
}
