"use client"
import { ResizablePanel } from "@dev-kit/experiments"

import React, { useState } from "react"
import { upperFirst } from "lodash"
import { chakra, CloseButton, Button, SimpleGrid, Tabs, Heading, Container, Center } from "@chakra-ui/react"

export const data: any = [
  {
    id: "panel_1",
    title: "Panel 1",
    content: "Panel 1",
    priority: 3,
    component: null,
    selector: null,
  },
  {
    id: "panel_2",
    title: "Panel 2",
    content: "Panel 2",
    priority: 2,
    component: null,
    selector: null,
  },
  {
    id: "panel_3",
    title: "Panel 3",
    content: "Panel 3",
    priority: 1,
    component: null,
    selector: null,
  },
]

const ResizablePanelContent = ({ position, children }: any) => {
  return (
    <chakra.div
      css={{
        p: 2,
        backgroundColor: "bg.info",
        border: "none",
        height: "100%",
        [`border${position}Width`]: "1px",
      }}
    >
      {children}
    </chakra.div>
  )
}
const Wrapper = ({children}: any) => {
  return (
    <Container w={"800px"}>
      <SimpleGrid columns={1} gap={10} h={"400px"} w={"full"} bg={"bg.emphasized"}>
        {children}
      </SimpleGrid>
    </Container>
  )
}


export function ResizablePanelBasic() {
  const [position, setPosition] = useState("left")
  const [value, setValue] = useState<string | null>(data[0].id)
  const [floating, setFloating] = useState(true)

  const closePanel = () => setValue(null)

  return (
    <>
      <Wrapper>
        <Container>
          <Center gap={4} py={4}>
            <Button onClick={() => setPosition("left")}>Show left panel</Button>
            <Button onClick={() => setPosition("right")}>Show right panel</Button>
            <Button onClick={() => setPosition("bottom")}>Show bottom panel</Button>
            <Button onClick={() => setFloating(!floating)}>{floating ? "Floating on" : "Floating Off"}</Button>
          </Center>
        </Container>

        {/*@ts-ignore*/}
        <ResizablePanel
          isFloating={floating}
          position={position}
          defaultSize={100}
          storageKey={`size-cache-${position}`}
          ariaLabel="Next.js panel"
        >
          <ResizablePanelContent
            position={position}
            css={{
              backgroundColor: "bg.info",
            }}
          >
            <b>{upperFirst(position)}</b> panel content
          </ResizablePanelContent>
        </ResizablePanel>
      </Wrapper>
    </>
  )
}

export function ResizablePanelWithTabs() {
  const [position, setPosition] = useState("left")
  const [value, setValue] = useState<string | null>(data[0].id)
  const [floating, setFloating] = useState(true)

  const closePanel = () => setValue(null)

  return (
    <>
      <Wrapper>
        <Container>
          <Center gap={4} py={4}>
            <Button onClick={() => setPosition("left")}>Show left panel</Button>
            <Button onClick={() => setPosition("right")}>Show right panel</Button>
            <Button onClick={() => setPosition("bottom")}>Show bottom panel</Button>
            <Button onClick={() => setFloating(!floating)}>{floating ? "Floating on" : "Floating Off"}</Button>
          </Center>
        </Container>

        <ResizablePanel
          isFloating={floating}
          position={position}
          css={{
            backgroundColor: "blue.100",
            p: 5,
          }}
        >
          <Tabs.Root
            defaultValue={value}
            onValueChange={(e) => setValue(e.value)}
            h={"full"}
            size="sm"
            backgroundColor="bg.panel"
          >
            <chakra.div
              css={{
                position: "sticky",
                top: 0,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Tabs.List>
                {data.map((item: any, index: any) => (
                  <Tabs.Trigger key={item.id} value={item.id}>
                    {item.title}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              <chakra.div
                css={{
                  alignItems: "center",
                  display: "flex",
                  mr: 2,
                }}
              >
                <CloseButton size={"sm"} onClick={closePanel} />
              </chakra.div>
            </chakra.div>

            {value ? (
              data.map(({ id, content }: any) => (
                <Tabs.Content key={id} value={id}>
                  <SimpleGrid columns={3} gap={2}>
                    {new Array(6).fill(0).map((_v, index) => (
                      <chakra.div key={index}>
                        Content {index + 1} of {content}
                      </chakra.div>
                    ))}
                  </SimpleGrid>
                </Tabs.Content>
              ))
            ) : (
              <div>empty panel view</div>
            )}
          </Tabs.Root>
        </ResizablePanel>
      </Wrapper>
    </>
  )
}
