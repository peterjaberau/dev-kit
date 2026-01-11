"use client"
import React, { forwardRef } from "react"
import { HStack, Stack, Card, Text, Button, IconButton, Icon, chakra, Box } from '@chakra-ui/react'

const Tree = forwardRef<HTMLDivElement, any>(({ children, ...props }, ref) => {
  return <Stack ref={ref} pl={4} borderLeft="1px solid #ccc" {...props} />
})

const TreeNode = forwardRef<HTMLDivElement, any>(({ props }, ref) => {
  return <Card.Root ref={ref} pl={4} borderLeft="1px solid #ccc" {...props} />
})



const TreeNodeSummary = forwardRef<HTMLDivElement, any>(({ children, ...props }, ref) => {
  return (
    <Card.Header>
      <HStack ref={ref} pl={4} borderLeft="1px solid #ccc" {...props} >{children}</HStack>
    </Card.Header>
  )
})

const TreeNodeChildren = forwardRef<HTMLDivElement, any>(({ children, ...props }, ref) => {
  return (
    <Card.Body css={{ backgroundColor: 'bg.muted'}}>
      <Stack ref={ref} pl={4} borderLeft="1px solid #ccc" {...props}>
        {children}
      </Stack>
    </Card.Body>
  )
})

export function HtmlTree({ data }: any) {
  if (!data) return null

  if (data.type === "text") {

    return (
      <TreeNode>
        <TreeNodeSummary>{data.content}</TreeNodeSummary>
      </TreeNode>
    )
  }

  return (
    <div style={{ marginLeft: 16 }}>
      <div style={{ fontWeight: "bold" }}>&lt;{data.tag}&gt;</div>

      {data.children?.map((child: any, i: any) => (
        <HtmlTree key={i} data={child} />
      ))}

      <div style={{ fontWeight: "bold" }}>&lt;/{data.tag}&gt;</div>
    </div>
  )
}




