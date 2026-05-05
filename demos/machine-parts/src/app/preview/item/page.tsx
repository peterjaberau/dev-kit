"use client"
import { Box, Card, Container, Stack } from "@chakra-ui/react"
import {
  ExampleBasic,
  ExampleCustomSpacing,
  ExampleDefault,
  ExampleGroup,
  ExampleHeader,
  ExampleIcon,
  ExampleImage,
  ExampleLink,
  ExampleVariantDefault,
  ExampleVariantMuted,
  ExampleVariantOutline,
  ExampleAvatar,
  ExampleDropdown,
} from "./render"

const ComponentViewer = ({ children, title }: any) => {
  return (
    <Card.Root size={'sm'}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body css={{ alignItems: 'center'}}><Box>
        {children}
      </Box></Card.Body>
    </Card.Root>
  )
}

export default function Page() {
  // return <ActorViz data={dataTree} machine={sessionTimeoutMachine} />
  return (
    <Container css={{ w: "3xl", h: 'full', overflow: 'scroll', px: 24 }}>
      <Stack>
        <ComponentViewer title="Basic">
          <ExampleBasic />
        </ComponentViewer>
        <ComponentViewer title="Default">
          <ExampleDefault />
        </ComponentViewer>
        <ComponentViewer title={"Variant Plain"}>
          <ExampleVariantDefault />
        </ComponentViewer>
        <ComponentViewer title={"Outline"}>
          <ExampleVariantOutline />
        </ComponentViewer>
        <ComponentViewer title={"Variant Muted"}>
          <ExampleVariantMuted />
        </ComponentViewer>
        <ComponentViewer title={"Custom Spacing"}>
          <ExampleCustomSpacing />
        </ComponentViewer>
        <ComponentViewer title={"Icon"}>
          <ExampleIcon />
        </ComponentViewer>
        <ComponentViewer title={"Avatar"}>
          <ExampleAvatar />
        </ComponentViewer>
        <ComponentViewer title={"Image"}>
          <ExampleImage />
        </ComponentViewer>
        <ComponentViewer title={"Group"}>
          <ExampleGroup />
        </ComponentViewer>
        <ComponentViewer title={"Header"}>
          <ExampleHeader />
        </ComponentViewer>
        <ComponentViewer title={"Link"}>
          <ExampleLink />
        </ComponentViewer>
        <ComponentViewer title={"Dropdown"}>
          <ExampleDropdown />
        </ComponentViewer>
      </Stack>
    </Container>
  )
}
