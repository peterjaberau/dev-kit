"use client"

import { useParams } from "next/navigation"
import { ComponentRenderer } from "#adaptive-registry"

export default function Page() {
  const params = useParams()
  const paramValue = params.name as string
  return (
    <>
      <ComponentRenderer id={paramValue} />
    </>
  )
}