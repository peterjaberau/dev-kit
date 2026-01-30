"use client"
import Link from "next/link"
import { Container, Button, Stack, Wrap, Center, Splitter } from "@chakra-ui/react"

export default function Page() {

  return (
      <Container bg={"bg.panel"} p={10} top={"100px"} h={"800px"}>
        <Splitter.Root
          defaultSize={[20, 60, 20]}
          panels={[{ id: "left" }, { id: "body" }, { id: "right" }]}
          borderWidth="1px"
          minH="60"
        >
          {/* ----------- left ------------ */}
          <Splitter.Panel id="left">
            <Center boxSize="full" textStyle="2xl">
              left
            </Center>
          </Splitter.Panel>

          <Splitter.ResizeTrigger id="left:body" aria-label="Resize" />

          {/* ----------- body ------------ */}
          <Splitter.Panel id="body">
            <Splitter.Root
              defaultSize={[70, 30]}
              panels={[
                { id: "body-top", minSize: 30 },
                {
                  id: "body-bottom",
                  collapsible: true,
                  collapsedSize: 5,
                  minSize: 15,
                },
              ]}
              orientation="vertical"
              h="full"
            >
              {/* ----------- body-top ------------ */}
              <Splitter.Panel id="body-top"></Splitter.Panel>

              <Splitter.ResizeTrigger id="body-top:body-bottom" />
              {/* ----------- body-bottom ------------ */}
              <Splitter.Panel id="body-bottom"></Splitter.Panel>
            </Splitter.Root>
          </Splitter.Panel>

          <Splitter.ResizeTrigger id="body:right" aria-label="Resize" />

          {/* ----------- right ------------ */}
          <Splitter.Panel id="right">
            <Center boxSize="full" textStyle="2xl">
              <Button>B</Button>
            </Center>
          </Splitter.Panel>
        </Splitter.Root>
      </Container>
  )
}
