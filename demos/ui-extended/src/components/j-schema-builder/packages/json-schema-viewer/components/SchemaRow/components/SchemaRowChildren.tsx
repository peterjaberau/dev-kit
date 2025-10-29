import * as React from "react"
import { ChildStack } from "#jSchemaBuilder/json-schema-viewer/components/shared/ChildStack"

export const SchemaRowChildren = ({ schemaNode, childNodes, nestingLevel, nodeId, parentChangeType, isCollapsible, isExpanded }: any) => {
  return (
    isCollapsible && isExpanded ? (
    <ChildStack
      schemaNode={schemaNode}
      childNodes={childNodes}
      currentNestingLevel={nestingLevel}
      parentNodeId={nodeId}
      parentChangeType={parentChangeType}
    />
    ) : null
  )
}
