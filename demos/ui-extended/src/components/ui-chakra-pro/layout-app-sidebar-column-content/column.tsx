import {
  ContentPlaceholder,
  type ContentPlaceholderProps,
  Label,
} from './content-placeholder'

export const Column = (props: ContentPlaceholderProps) => {
  return (
    <ContentPlaceholder borderWidth="1px" maxW={{ base: 'full', lg: 'sm' }} minH="40" {...props}>
      <Label>Column</Label>
    </ContentPlaceholder>
  )
}
