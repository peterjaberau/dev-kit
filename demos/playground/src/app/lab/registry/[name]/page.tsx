"use client"

import { useParams } from "next/navigation"
import { RegistryViewerWithCard } from "#plugins/registry-manager-plugin/view"

export default function Page() {
  const { name } = useParams<{ name: string }>()

  return <RegistryViewerWithCard title={name} componentId={name} />
}
