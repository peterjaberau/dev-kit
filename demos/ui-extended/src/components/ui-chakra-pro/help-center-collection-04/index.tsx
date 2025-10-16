import { Card, Container, Link, SimpleGrid, Square, Text } from '@chakra-ui/react'
import { LuChevronRight } from 'react-icons/lu'
import { CollectionIcon } from './collection-icon'
import { collectionQuery } from './data'

 const Index = () => {
  const collections = collectionQuery.get()
  return (
    <Container maxW="6xl" py="16">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="8">
        {collections.map((collection) => (
          <Card.Root variant="elevated" key={collection.id}>
            <Card.Header gap="1">
              <Square size="8" layerStyle="fill.solid" rounded="l2">
                <CollectionIcon value={collection.icon} />
              </Square>
              <Card.Title mt="3">{collection.title}</Card.Title>
              <Text color="fg.muted" textStyle="sm" minH="2lh">
                {collection.description}
              </Text>
            </Card.Header>

            <Card.Body gap="1" divideY="1px">
              {collection.articles.map((article) => (
                <Link href={article.url || '#'} key={article.id} textStyle="sm" py="2">
                  {article.title} <LuChevronRight />
                </Link>
              ))}
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Container>
  )
}
export default Index
