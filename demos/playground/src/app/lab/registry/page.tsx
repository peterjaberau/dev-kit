"use client"

import { useParams } from "next/navigation"
import { RegistryViewer } from "#plugins/registry-manager-plugin/view"

export default function Page() {
  const params = useParams()
  const paramValue: string = params.name as string
  return <RegistryViewer title={paramValue} componentId={paramValue} />
}
