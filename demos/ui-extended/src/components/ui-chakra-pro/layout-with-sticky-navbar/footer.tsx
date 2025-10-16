import { Container } from '@chakra-ui/react'
import {
  ContentPlaceholder,
  type ContentPlaceholderProps,
  Label,
} from './content-placeholder'

export const Footer = (props: ContentPlaceholderProps) => {
  return (
    <ContentPlaceholder minH="40" borderTopWidth="1px" {...props}>
      <Container>
        <Label>Footer</Label>
      </Container>
    </ContentPlaceholder>
  )
}
