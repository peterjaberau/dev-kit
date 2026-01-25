"use client"
import { LuEye, LuEyeOff } from "react-icons/lu"
import { Button, Card, Wrap, Stack } from "@chakra-ui/react"
import { AdaptiveCard } from "#components/adaptive/adaptive-card"
import { usePlayground, useJsonManager } from "../../engine"
import { rawJsonData, parsedJsonData } from "../../store/data"

const CardSection = ({ title, children }: any) => {
  return (
    <Card.Root size={"sm"}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Wrap>{children}</Wrap>
      </Card.Body>
    </Card.Root>
  )
}

export const RequestView = ({ children }: any) => {
  const { isInspectorEnabled, enableInspection, disableInspection, fireInitiate } = usePlayground()
  const { createDocFromJson, makeJsonPresentation, makeJsonStable, makeSchemaFromJson  } = useJsonManager()
  return (
    <AdaptiveCard.Root
      actions={[
        {
          label: "Inspect",
          icon: isInspectorEnabled ? <LuEye /> : <LuEyeOff />,
          trigger: () => (isInspectorEnabled ? disableInspection() : enableInspection()),
        },
      ]}
      title={"Request"}
    >
      <Stack gap={4} px={4}>
        <CardSection title={"Json Manager"}>
          <Button size={"xs"} variant={"solid"} onClick={() => fireInitiate()}>
            Initiate
          </Button>
        </CardSection>
        <CardSection title={"Json Manager"}>
          <Button
            size={"xs"}
            variant={"solid"}
            onClick={() => {
              createDocFromJson({ content: parsedJsonData.xstateOpenapi })
            }}
          >
            Create Doc from Raw JSON
          </Button>
          <Button
            size={"xs"}
            variant={"solid"}
            onClick={() => {
              makeJsonPresentation()
            }}
          >
            Make JSON Presentation
          </Button>

          <Button
            size={"xs"}
            variant={"solid"}
            onClick={() => {
              makeJsonStable()
            }}
          >
            Make JSON Stable
          </Button>

          <Button
            size={"xs"}
            variant={"solid"}
            onClick={() => {
              makeSchemaFromJson()
            }}
          >
            Make Schema from Json
          </Button>
        </CardSection>
      </Stack>
    </AdaptiveCard.Root>
  )
}
