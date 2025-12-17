"use client"
import React, { useEffect, useState, useMemo } from "react"
import Oas from "oas"
import { HStack, Text, Stack, Card, Wrap, Button } from "@chakra-ui/react"
import { parseSchema } from "../utils/parse-schema"
import { SchemaTreeNode } from "../components/schema-tree-node"
import EditableSchemaTree from "../components/editable-schema-tree"
import { useOas } from "#modules/dockview/actors/selectors/okas.selector"

const Index = ({ apiSpec }: any) => {
  const [schemas, setSchemas]: any = useState(null)
  const { oasContext, oasRef, sendToOAS } = useOas()

  useEffect(() => {
    async function load() {
      const oas = new Oas(apiSpec)
      await oas.dereference()
      const def: any = oas.getDefinition()
      console.log("dereferenced definition", def)

      setSchemas(def?.components?.schemas || {})
    }
    load()
  }, [apiSpec])

  return (
    <Stack gap={3}>
      <Card.Root p={0} m={0} size={"sm"}>
        <Card.Header p={0} m={0}>
          <Card.Title>OpenAPI definitions</Card.Title>
        </Card.Header>
        <Card.Body p={0} m={0}>
          <Text textStyle="xl" fontWeight="semibold">
            General
          </Text>
          <Wrap w={"full"}>
            <Button
              size={"2xs"}
              onClick={() =>
                sendToOAS({
                  type: "oas.dereference",
                })
              }
            >
              dereference
            </Button>
            <Button size={"2xs"}>getCircularReferences</Button>
            <Button size={"2xs"}>getDefinition</Button>
            <Button size={"2xs"}>getTags</Button>
            <Button size={"2xs"}>getPaths</Button>
            <Button size={"2xs"}>getVersion</Button>
            <Button size={"2xs"}>getWebhooks</Button>
            <Button size={"2xs"}>init</Button>
          </Wrap>
          <Text textStyle="xl" fontWeight="semibold">
            Operations
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>findOperation</Button>
            <Button size={"2xs"}>findOperationWithoutMethod</Button>
            <Button size={"2xs"}>getOperation</Button>
            <Button size={"2xs"}>getOperationById</Button>
            <Button size={"2xs"}>operation</Button>
          </Wrap>
          <Text textStyle="xl" fontWeight="semibold">
            Servers
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>defaultVariables</Button>
            <Button size={"2xs"}>replaceUrl</Button>
            <Button size={"2xs"}>splitUrl</Button>
            <Button size={"2xs"}>splitVariables</Button>
            <Button size={"2xs"}>url</Button>
            <Button size={"2xs"}>variables</Button>
          </Wrap>
          <Text textStyle="xl" fontWeight="semibold">
            Specification Extensions
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>getExtension</Button>
            <Button size={"2xs"}>hasExtension</Button>
            <Button size={"2xs"}>validateExtension</Button>
            <Button size={"2xs"}>validateExtensions</Button>
          </Wrap>
          <Text textStyle="xl" fontWeight="semibold">
            User Authentication
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>getAuth</Button>
          </Wrap>
        </Card.Body>
      </Card.Root>
      <Card.Root p={0} m={0} size={"sm"}>
        <Card.Header p={0} m={0}>
          <Card.Title>Operations</Card.Title>
        </Card.Header>
        <Card.Body p={0} m={0}>
          <Text textStyle="xl" fontWeight="semibold">
            General
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>getContentType</Button>
            <Button size={"2xs"}>getDescription</Button>
            <Button size={"2xs"}>getOperationId</Button>
            <Button size={"2xs"}>hasOperationId</Button>
            <Button size={"2xs"}>isDeprecated</Button>
            <Button size={"2xs"}>isFormUrlEncoded</Button>
            <Button size={"2xs"}>isJson</Button>
            <Button size={"2xs"}>isMultipart</Button>
            <Button size={"2xs"}>isXml</Button>
            <Button size={"2xs"}>isWebhook</Button>
            <Button size={"2xs"}>getExampleGroups</Button>
            <Button size={"2xs"}>getHeaders</Button>
            <Button size={"2xs"}>getSummary</Button>
            <Button size={"2xs"}>getTags</Button>
          </Wrap>
          <Text textStyle="xl" fontWeight="semibold">
            Callbacks
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>getCallback</Button>
            <Button size={"2xs"}>getCallbackExamples</Button>
            <Button size={"2xs"}>getCallbacks</Button>
            <Button size={"2xs"}>hasCallbacks</Button>
          </Wrap>
          <Text textStyle="xl" fontWeight="semibold">
            Parameters
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>getParameters</Button>
            <Button size={"2xs"}>getParametersAsJSONSchema</Button>
            <Button size={"2xs"}>hasParameters</Button>
            <Button size={"2xs"}>hasRequiredParameters</Button>
          </Wrap>
          <Text textStyle="xl" fontWeight="semibold">
            Request Body
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>getRequestBody</Button>
            <Button size={"2xs"}>getRequestBodyExamples</Button>
            <Button size={"2xs"}>getRequestBodyMediaTypes</Button>
            <Button size={"2xs"}>hasRequestBody</Button>
            <Button size={"2xs"}>hasRequiredRequestBody</Button>
          </Wrap>
          <Text textStyle="xl" fontWeight="semibold">
            Responses
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>getResponseAsJSONSchema</Button>
            <Button size={"2xs"}>getResponseByStatusCode</Button>
            <Button size={"2xs"}>getResponseExamples</Button>
            <Button size={"2xs"}>getResponseStatusCodes</Button>
          </Wrap>
          <Text textStyle="xl" fontWeight="semibold">
            Security
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>getSecurity</Button>
            <Button size={"2xs"}>getSecurityWithTypes</Button>
            <Button size={"2xs"}>prepareSecurity</Button>
          </Wrap>
          <Text textStyle="xl" fontWeight="semibold">
            Specification Extensions
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>hasExtension</Button>
          </Wrap>
        </Card.Body>
      </Card.Root>
      <Card.Root p={0} m={0} size={"sm"}>
        <Card.Header p={0} m={0}>
          <Card.Title>Callbacks</Card.Title>
        </Card.Header>
        <Card.Body p={0} m={0}>
          <Text textStyle="xl" fontWeight="semibold">
            Callbacks
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>getIdentifier</Button>
          </Wrap>
        </Card.Body>
      </Card.Root>

      <Card.Root p={0} m={0} size={"sm"}>
        <Card.Header p={0} m={0}>
          <Card.Title>Additional Utilities</Card.Title>
        </Card.Header>
        <Card.Body p={0} m={0}>
          <Text textStyle="xl" fontWeight="semibold">
            General
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>dereferencedFileSize</Button>
            <Button size={"2xs"}>mediaTypes</Button>
            <Button size={"2xs"}>operationTotal</Button>
            <Button size={"2xs"}>rawFileSize</Button>
            <Button size={"2xs"}>securityTypes</Button>
          </Wrap>
          <Text textStyle="xl" fontWeight="semibold">
            OpenAPI Features
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>additionalProperties</Button>
            <Button size={"2xs"}>callbacks</Button>
            <Button size={"2xs"}>circularRefs</Button>
            <Button size={"2xs"}>commonParameters</Button>
            <Button size={"2xs"}>discriminators</Button>
            <Button size={"2xs"}>links</Button>
            <Button size={"2xs"}>style</Button>
            <Button size={"2xs"}>polymorphism</Button>
            <Button size={"2xs"}>serverVariables</Button>
            <Button size={"2xs"}>webhooks</Button>
            <Button size={"2xs"}>xml</Button>
          </Wrap>
          <Text textStyle="xl" fontWeight="semibold">
            Reducer
          </Text>
          <Wrap w={"full"}>
            <Button size={"2xs"}>reducer</Button>
          </Wrap>
        </Card.Body>
      </Card.Root>
    </Stack>
  )
}

export default Index
