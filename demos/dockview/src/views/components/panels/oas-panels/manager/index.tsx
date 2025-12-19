import OasApp from "#modules/oas/index"
import { useOasManager } from "#modules/dockview/actors/selectors/oas-manager.selector"
import { Accordion, Stack, Card, HStack, Button, IconButton, Box,
  Span, } from "@chakra-ui/react"
import JsonViewer from "react18-json-view"
import { LuPlay } from "react-icons/lu"

const AccordionListRenderer = ({ children }: any) => {
  return (
    <Accordion.Root multiple variant="enclosed">
      {children}
    </Accordion.Root>
  )
}

const AccordionItemRenderer = ({ children, title, value }: any) => {
  return (
    <Accordion.Item value={value}>
      <Accordion.ItemTrigger>
        <HStack flex={1}>{title}</HStack>
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>{children}</Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  )
}

const MetadataRenderer = ({ children }: any) => {
  return (
    <AccordionListRenderer>
      <MetadataDatasetsRenderer />
    </AccordionListRenderer>
  )
}

const MetadataDatasetsRenderer = () => {
  const { getMetadataDataset, getDatasetApiSpecificationItem, metadataDatasetsList }: any = useOasManager()

  return (
    <>
      {/* Metadata Dataset names list */}
      {metadataDatasetsList.map((item: any, index: any) => (
        <AccordionItemRenderer key={`metadata_dataset_${index}`} title={item} value={item}>
          {/* Metadata Dataset Item: metadata.datasets.xxxxx.list */}
          <AccordionListRenderer>
            {getMetadataDataset(item)?.list.map((item: any, index: any) => (
              <AccordionItemRenderer key={index} title={item} value={item}>
                <JsonViewer
                  src={getDatasetApiSpecificationItem(item)}
                  collapsed={1}
                  style={{ fontSize: "13px", fontWeight: "bold" }}
                />
              </AccordionItemRenderer>
            ))}
          </AccordionListRenderer>
        </AccordionItemRenderer>
      ))}
    </>
  )
}



type AnyObject = Record<string, any>;

function hasChildren(value: AnyObject) {
  return value && typeof value === "object" && Object.keys(value).length > 0;
}

interface RecursiveAccordionProps {
  data: AnyObject;
  path?: string;
}



export function RecursiveAccordion({ data, path = "" }: RecursiveAccordionProps) {
  return (
    <Accordion.Root collapsible multiple variant='enclosed'>
      {Object.entries(data).map(([key, value]) => {
        const itemValue = path ? `${path}.${key}` : key

        // Leaf node → Button
        if (!hasChildren(value)) {
          return (
            <Box key={itemValue} pl="4" py="1">
              <Button size="sm" variant="outline">
                {key}
              </Button>
            </Box>
          )
        }

        // Node with children → Accordion
        return (
          <Accordion.Item key={itemValue} value={itemValue}>
            <Accordion.ItemTrigger>
              <Span flex="1">{key}</Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>

            <Accordion.ItemContent>
              <Accordion.ItemBody pl="4">
                <RecursiveAccordion data={value} path={itemValue} />
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        )
      })}
    </Accordion.Root>
  )
}

const Index = (props: any) => {
  const { metadataOAS, metadataDatasets }: any = useOasManager()

  return (
    <Stack>
      <Card.Root>
        <Card.Header>
          <Card.Title>Metadata (OAS)</Card.Title>
        </Card.Header>
        <Card.Body>
          <RecursiveAccordion data={metadataOAS.methods} />
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Metadata (Datasets)</Card.Title>
        </Card.Header>
        <Card.Body>
          <RecursiveAccordion data={metadataDatasets} />
        </Card.Body>
      </Card.Root>
    </Stack>
  )
}
export default Index
