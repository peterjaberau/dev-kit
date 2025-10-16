import {
  Avatar,
  AvatarGroup,
  Card,
  Container,
  HStack,
  SimpleGrid,
  Square,
  Text,
} from '@chakra-ui/react'
import { CollectionIcon } from './collection-icon'
import { collectionQuery } from './data'

 const Index = () => {
  const collections = collectionQuery.get()
  return (
    <Container maxW="6xl" py="16">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="8">
        {collections.map((collection: any) => (
          <Card.Root key={collection.id}>
            <Card.Body gap="1">
              <Square size="8" layerStyle="fill.subtle" rounded="l2">
                <CollectionIcon value={collection.icon} />
              </Square>
              <Card.Title mt="3">{collection.title}</Card.Title>
              <Text color="fg.muted" textStyle="sm" minH="2lh">
                {collection.description}
              </Text>
              <HStack my="3">
                <AvatarGroup size="xs">
                  {collection.authors.slice(0, 2).map((author: any) => (
                    <Avatar.Root key={author.id}>
                      <Avatar.Fallback name={author.name} />
                      <Avatar.Image src={author.avatar_url || ''} />
                    </Avatar.Root>
                  ))}
                </AvatarGroup>
                <Text color="fg.muted" textStyle="xs">
                  By {collection.authors[0].name} + {collection.authors.length - 1}
                </Text>
              </HStack>
              <Text color="fg.muted" textStyle="xs">
                {collection.articles.length} articles
              </Text>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Container>
  )
}
export default Index
