import {
  ContentPlaceholder,
  type ContentPlaceholderProps,
  Label,
} from './content-placeholder'

export const Navbar = (props: ContentPlaceholderProps) => {
  return (
    <ContentPlaceholder minH="16" {...props}>
      <Label>Navbar</Label>
    </ContentPlaceholder>
  )
}
