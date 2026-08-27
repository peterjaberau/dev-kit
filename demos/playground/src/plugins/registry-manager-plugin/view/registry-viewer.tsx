"use client"
import { CardWithScrollArea } from "../components/card-with-scroll-area"
import { ComponentRenderer } from "#registry"

export default function Index(props: any) {
  const { id,  props: extraProps = null } = props

  return (
    <>
      <CardWithScrollArea title={extraProps?.api?.id}>
        <ComponentRenderer id={id} props={extraProps} />
      </CardWithScrollArea>
    </>
  )
}
