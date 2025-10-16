import { Container } from '@chakra-ui/react'
import {
  ContentPlaceholder,
  type ContentPlaceholderProps,
  Label,
} from './content-placeholder'

export const Content = (props: ContentPlaceholderProps) => {
  return (
    <ContentPlaceholder minH="2xl" borderYWidth="1px" {...props}>
      <Container>
        <Label>Content</Label>
      </Container>
    </ContentPlaceholder>
  )
}
