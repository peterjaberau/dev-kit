import { Badge, Button, Card, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { LuArrowRight, LuMapPin } from 'react-icons/lu'
import { MdAccessTime } from 'react-icons/md'

 const Index = () => {
  return (
    <Card.Root variant="elevated" boxShadow="lg">
      <Card.Header>
        <HStack justify="space-between">
          <Card.Title>Software Engineer</Card.Title>
          <Badge>Engineering</Badge>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" width="full">
          <Card.Description>
            Build next-gen software with a team of talented engineers. Collaborate, innovate, and
            push boundaries on impactful projects.
          </Card.Description>
          <HStack gap={{ base: '5', md: '6' }}>
            <HStack>
              <Icon>
                <LuMapPin />
              </Icon>
              <Text textStyle="sm" color="fg.muted">
                San Francisco, CA
              </Text>
            </HStack>
            <HStack>
              <Icon>
                <MdAccessTime />
              </Icon>
              <Text textStyle="sm" color="fg.muted">
                FullTime
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <Button size="sm" variant="outline" colorPalette="gray">
          Learn more <LuArrowRight />
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}
export default Index
