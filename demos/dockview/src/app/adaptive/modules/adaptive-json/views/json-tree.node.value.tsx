'use client'
export const JsonTreeNodeValue = (props: any): React.ReactNode => {
  const { node, renderValue } = props

  if (node.type === 'text') {
    return <>{renderValue?.(node) ?? node.value}</>
  }

  console.log("--- from inside json0tree.node.value ---", { node, renderValue })

  if (!node?.properties) {
    return null
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
        <JsonTreeNodeValue key={index} node={child} renderValue={renderValue} />
      ))}
    </Element>
  )
}
