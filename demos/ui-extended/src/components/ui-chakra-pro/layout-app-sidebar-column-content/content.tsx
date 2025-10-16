import {
  ContentPlaceholder,
  type ContentPlaceholderProps,
  Label,
} from './content-placeholder'

export const Content = (props: ContentPlaceholderProps) => {
  return (
    <ContentPlaceholder minH="2xl" borderWidth="1px" {...props}>
      <Label>Content</Label>
    </ContentPlaceholder>
  )
}
