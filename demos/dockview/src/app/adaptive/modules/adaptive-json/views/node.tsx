import {
  getAccessibleDescription,
  jsonNodeToElement,
  keyPathToKey,
} from '@zag-js/json-tree-utils'
import { useMemo } from 'react'
import { AdaptiveTree, useAdaptiveTreeContext } from '#adaptive-tree'
import { NodeKey } from './node.key'
import { useJsonTreePropsContext } from '../providers'
import { NodeValue } from './node.value'

const scopeProps = {
  'data-scope': 'json-tree',
}

export function Node(props: any) {
  const { node, indexPath, arrow, indentGuide, renderValue } = props

  const options: any = useJsonTreePropsContext()
  const tree: any = useAdaptiveTreeContext()

  const nodeState = tree.getNodeState({ node, indexPath })
  const key = keyPathToKey(node.keyPath, { excludeRoot: true })
  const valueNode = useMemo(() => jsonNodeToElement(node, options), [node, options])

  const nodeProps: Record<string, any> = useMemo(() => {
    const desc = getAccessibleDescription(node)
    const line = indexPath.reduce((acc: any, curr: any) => acc + curr, 1)
    const lineLength = indexPath.length - 1
    return {
      ...scopeProps,
      'aria-label': desc,
      'data-line': line,
      style: { ['--line-length' as any]: lineLength },
    }
  }, [indexPath, node])

  return (
    <AdaptiveTree.NodeProvider node={node} indexPath={indexPath}>
      {nodeState.isBranch ? (
        <AdaptiveTree.Branch {...scopeProps}>
          <AdaptiveTree.BranchControl {...nodeProps}>
            {arrow && <AdaptiveTree.BranchIndicator {...scopeProps}>{arrow}</AdaptiveTree.BranchIndicator>}
            <AdaptiveTree.BranchText {...scopeProps}>
              {key && <NodeKey node={node} showQuotes={options.quotesOnKeys} />}
              <NodeValue node={valueNode} renderValue={renderValue} />
            </AdaptiveTree.BranchText>
          </AdaptiveTree.BranchControl>
          <AdaptiveTree.BranchContent {...scopeProps}>
            {typeof indentGuide === "boolean" ? <AdaptiveTree.BranchIndentGuide /> : indentGuide}
            {node.children?.map((child: any, index: any) => (
              <Node key={index} {...props} node={child} indexPath={[...indexPath, index]} />
            ))}
          </AdaptiveTree.BranchContent>
        </AdaptiveTree.Branch>
      ) : (
        <AdaptiveTree.Item {...nodeProps}>
          <AdaptiveTree.ItemText {...scopeProps}>
            {key && <NodeValue node={node} showQuotes={options.quotesOnKeys} />}
            <NodeValue node={valueNode} renderValue={renderValue} />
          </AdaptiveTree.ItemText>
        </AdaptiveTree.Item>
      )}
    </AdaptiveTree.NodeProvider>
  )
}
