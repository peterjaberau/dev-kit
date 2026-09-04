"use client"

import { useParams } from "next/navigation"
import { RegistryViewer } from "#plugins/registry-manager-plugin/view"

export default function Page() {
  const { name } = useParams<{ name: string }>()

  return <RegistryViewer title={name} componentId={name} />
}
