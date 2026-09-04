"use client"
import { CardWithScrollArea } from "../components/card-with-scroll-area"
import { ComponentRenderer } from "#registry"

export interface RegistryViewerProps {
  componentId?: string | any
  title?: string
  options?: any
  data?: any
}

export default function Index(props: RegistryViewerProps) {
  const { componentId, title = "untitled", options = {}, data = null } = props

  return (
    <>
      <CardWithScrollArea title={title}>
        <ComponentRenderer id={componentId} props={options} />
      </CardWithScrollArea>
    </>
  )
}
