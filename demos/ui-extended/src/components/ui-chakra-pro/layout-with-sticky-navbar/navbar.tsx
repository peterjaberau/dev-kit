import { Container } from '@chakra-ui/react'
import {
  ContentPlaceholder,
  type ContentPlaceholderProps,
  Label,
} from './content-placeholder'

export const Navbar = (props: ContentPlaceholderProps) => {
  return (
    <ContentPlaceholder minH="16" borderBottomWidth="1px" {...props}>
      <Container>
        <Label>Navbar</Label>
      </Container>
    </ContentPlaceholder>
  )
}
