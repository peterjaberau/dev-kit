import {
  ContentPlaceholder,
  type ContentPlaceholderProps,
  Label,
} from './content-placeholder'

export const Column = (props: ContentPlaceholderProps) => {
  return (
    <ContentPlaceholder borderRightWidth="1px" {...props}>
      <Label>Column</Label>
    </ContentPlaceholder>
  )
}
