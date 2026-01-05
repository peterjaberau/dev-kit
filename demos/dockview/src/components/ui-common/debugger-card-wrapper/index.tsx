import { Button, Card, Stack, Flex } from "@chakra-ui/react"
import { ScrollAreaWrapper } from "#components/ui-common/scroll-area-wrapper"

const Index = ({ title, children, autoScroll = false, args }: any) => {
  return (
    <Card.Root size={"sm"} h={"full"} w={'full'} >
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Flex
          css={{

            ...(autoScroll
              ? {
                flexGrow: 1,
                height: autoScroll ? 0 : undefined,
                  overflow: "hidden",
                }
              : {}),
          }}
        >
          <ScrollAreaWrapper>{children}</ScrollAreaWrapper>
        </Flex>
      </Card.Body>
      <Card.Footer>
        <Button size={"sm"} variant={"outline"} onClick={() => console.log(`Inspect [${title}]---->`, args)}>
          Inspect
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}
export default Index