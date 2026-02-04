"use client"
import Link from "next/link"
import { Container, Button, Card, Stack, Wrap, SimpleGrid } from "@chakra-ui/react"
import { Provider as ChakraProvider } from "./provider"
import { Panel } from "#components/panel"
import { useState } from "react"
import type { PANEL_POSITIONS } from "#components/panel/useResizablePanel"

export const NavSection = ({ title, items }: any) => {
  return (
    <Card.Root size={"sm"}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Wrap w={"full"}>
          {items.map((item: any) => (
            <Button key={item.href} asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          {/*<Button asChild>*/}
          {/*  <Link href="/discovery/floating-panels/demos/basic">Basic</Link>*/}
          {/*</Button>*/}
        </Wrap>
      </Card.Body>
    </Card.Root>
  )
}

export function Nav() {
  return (
    <ChakraProvider>
      <Panel
        isFloating={true}
        position={"left"}
        defaultSize={200}
        storageKey={"panel-playground"}
        ariaLabel={"Panel Playground"}
      >
        <Stack
          p={4}
          gap={4}
          backgroundColor={"bg.subtle"}
          borderRight={"1px solid"}
          borderColor={"border"}
          h={"full"}
          zIndex={99999}
        >


          <NavSection
            title={"Json"}
            items={[
              {
                label: "Json Mapper",
                href: "/discovery/json-mapper",
              },
              {
                label: "Json Inspect",
                href: "/discovery/json-inspect",
              },
              {
                label: "Tree File",
                href: "/discovery/tree-file",
              },
              {
                label: "jsonjoy-builder",
                href: "/discovery/jsonjoy-builder",
              },
              {
                label: "jschema-dev",
                href: "/discovery/jschema-dev",
              },
              {
                label: "sureal",
                href: "/discovery/sureal",
              },
              {
                label: "json-editor-x",
                href: "/discovery/json-editor-x",
              }

            ]}
          />

          <NavSection
            title={"Resizable Panel"}
            items={[
              { label: "Panel - Basic", href: "/previews/panel" },
              {
                label: "Panel - With Children",
                href: "/previews/panel/with-children",
              },
              {
                label: "React SidePanes - Basic",
                href: "/discovery/resizable-panels/react-sidepanes",
              },
              {
                label: "react-split-pane - Basic",
                href: "/discovery/resizable-panels/react-split-pane",
              },
              {
                label: "inspect drawer - Basic",
                href: "/inspector-drawer",
              },
            ]}
          />

          <NavSection
            title={"Floating Panel"}
            items={[{ label: "Basic", href: "/discovery/floating-panels/demos/basic" }]}
          />
        </Stack>
      </Panel>
    </ChakraProvider>
  )
}
