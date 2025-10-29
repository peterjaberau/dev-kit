import { Box, HStack } from "@chakra-ui/react"
import * as React from "react"
import { isReferenceNode } from "@stoplight/json-schema-tree"
import { Button } from '@chakra-ui/react'

export const SchemaRowGoToRef = ({ onGoToRef, schemaNode }: any) => {
  return onGoToRef && isReferenceNode(schemaNode) && schemaNode.external ? (
    <Button
      variant={'ghost'}
      size={'xs'}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onGoToRef(schemaNode)
      }}
    >
      (go to ref)
    </Button>
  ) : null
}
