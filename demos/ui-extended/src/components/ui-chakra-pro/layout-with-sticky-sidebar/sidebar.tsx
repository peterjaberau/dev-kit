import {
  ContentPlaceholder,
  type ContentPlaceholderProps,
  Label,
} from './content-placeholder'

export const Sidebar = (props: ContentPlaceholderProps) => {
  return (
    <ContentPlaceholder borderWidth="1px" minH={{ base: '20', lg: 'xs' }} {...props}>
      <Label>Sidebar</Label>
    </ContentPlaceholder>
  )
}
