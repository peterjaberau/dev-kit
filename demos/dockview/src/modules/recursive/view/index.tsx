"use client"
import React from "react"
import { useAppSelector, useNodeRootSelector, useNodeItemSelector } from "../actors/selectors"
import { Container, Card, For, Stack, Button, HStack, Center } from "@chakra-ui/react"

export const NodeRootComponent = () => {
  const { nodeRootContext, nodeRootRef } = useNodeRootSelector()

  return (
    <Card.Root p={0} m={0} w={'full'}>
      <Card.Header p={0} m={0}>
        <Card.Title>Root Node {nodeRootRef?.id}</Card.Title>
      </Card.Header>
      <Card.Body gap={2} p={0} m={0}>
        <For each={nodeRootContext?.internalRefs?.children}>
          {(item: any, index: any) => {
            return <NodeItemComponent key={index} childRef={item} />
          }}
        </For>
        <Center w={"full"}>
          <Button size={"sm"}>Add Child</Button>
        </Center>
      </Card.Body>
    </Card.Root>
  )
}

export const NodeItemComponent = ({ childRef }: any) => {
  const { nodeItemContext } = useNodeItemSelector({ childRef: childRef })

  console.log("--nodeItemContext---", nodeItemContext)

  return (
    <NodeItemDesigner>
      <Card.Root p={0} m={0} w={'full'} minH={'150px'} boxShadow={'sm'}>
        <Card.Header p={0} m={0}>
          <Card.Title>{nodeItemContext.props.id}</Card.Title>
        </Card.Header>
        <Card.Body gap={2} p={0} m={0}  bg={'bg.subtle'} >
          {
            nodeItemContext?.internalRefs?.children.length > 0 ? (
              <For each={nodeItemContext?.internalRefs?.children}>
                {(item: any, index: any) => {
                  return <NodeItemComponent key={index} childRef={item} />
                }}
              </For>
            ) : (
              <Center w={"full"} flex={1}>
                <Button size={"sm"}>Add Child</Button>
              </Center>
            )
          }

        </Card.Body>
      </Card.Root>
    </NodeItemDesigner>

  )
}
export const NodeItemDesigner = ({ children }: any) => {
  return (
    <Stack w={'full'}>
      <HStack justifyContent={"center"} w={'full'}>
        <Button size={"2xs"}>+</Button>
      </HStack>
      <HStack w={'full'}>
        <Stack justifyContent={"center"} >
          <Button size={"2xs"}>+</Button>
        </Stack>
        <Stack w={'full'}>{children}</Stack>
        <Stack justifyContent={"center"}>
          <Button size={"2xs"}>+</Button>
        </Stack>
      </HStack>
      <HStack justifyContent={"center"} w={'full'}>
        <Button size={"2xs"}>+</Button>
      </HStack>
    </Stack>
  )
}
