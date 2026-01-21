"use client"
import { chakra, Button, Heading, Stack, Card, Wrap } from "@chakra-ui/react"
import React from "react"
import { useJsonAgent, useJsonView } from "../actors"
import { data as dataToLoad } from "../data"


export function JsonRequest() {
  const { sendLoadDataEvent } = useJsonAgent()
  const { sendIndentSetter, current: currentView  } = useJsonView()

  return (
    <Stack gap={4} px={4}>
      <Card.Root size={"sm"}>
        <Card.Header>
          <Card.Title>Agent</Card.Title>
        </Card.Header>
        <Card.Body>
          <Wrap>
            <Button onClick={() => sendLoadDataEvent(dataToLoad)} size="sm" variant={"outline"}>
              LOAD DATA
            </Button>
          </Wrap>
        </Card.Body>
      </Card.Root>

      <Card.Root size={"sm"}>
        <Card.Header>
          <Card.Title>View</Card.Title>
        </Card.Header>
        <Card.Body>
          <Wrap>
            <Button onClick={() => sendIndentSetter(currentView.preferences?.indent !==2 ? 2 : 4)} size="sm" variant={"outline"}>
              Set Indent
            </Button>
          </Wrap>
        </Card.Body>
      </Card.Root>
    </Stack>
  )
}
