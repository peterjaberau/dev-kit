import {
  ContentPlaceholder,
  type ContentPlaceholderProps,
  Label,
} from './content-placeholder'

export const Sidebar = (props: ContentPlaceholderProps) => {
  return (
    <ContentPlaceholder borderRightWidth="1px" {...props}>
      <Label>Sidebar</Label>
    </ContentPlaceholder>
  )
}
