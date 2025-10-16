import {
  ContentPlaceholder,
  type ContentPlaceholderProps,
  Label,
} from './content-placeholder'

export const Sidebar = (props: ContentPlaceholderProps) => {
  return (
    <ContentPlaceholder borderWidth="1px" width={{ base: 'full', md: 'sm' }} minH="40" {...props}>
      <Label>Sidebar</Label>
    </ContentPlaceholder>
  )
}
