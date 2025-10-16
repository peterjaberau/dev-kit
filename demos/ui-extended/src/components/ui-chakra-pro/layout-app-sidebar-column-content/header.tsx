import {
  ContentPlaceholder,
  type ContentPlaceholderProps,
  Label,
} from './content-placeholder'

export const Header = (props: ContentPlaceholderProps) => {
  return (
    <ContentPlaceholder minH="40" borderBottomWidth="1px" {...props}>
      <Label>Header</Label>
    </ContentPlaceholder>
  )
}
