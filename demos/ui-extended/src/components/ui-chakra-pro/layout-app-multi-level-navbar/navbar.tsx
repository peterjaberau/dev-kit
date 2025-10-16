import { Container, type ContainerProps, Flex, Grid } from '@chakra-ui/react'
import { ContentPlaceholder, Label } from './content-placeholder'

export const Navbar = (props: ContainerProps) => {
  return (
    <Container {...props}>
      <Grid templateColumns="auto 1fr auto" gap="4" alignItems="center">
        <Flex justify="start">
          <ContentPlaceholder width="fit-content" borderWidth="1px">
            <Label>Menu | Logo</Label>
          </ContentPlaceholder>
        </Flex>
        <Flex justify="center">
          <ContentPlaceholder maxW="xs" borderWidth="1px" justifyContent="center">
            <Label>Secondary Nav</Label>
          </ContentPlaceholder>
        </Flex>
        <Flex justify="flex-end">
          <ContentPlaceholder width="fit-content" borderWidth="1px">
            <Label>User Menu</Label>
          </ContentPlaceholder>
        </Flex>
      </Grid>
    </Container>
  )
}
