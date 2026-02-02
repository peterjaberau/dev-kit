"use client"

import { useEffect, useState } from "react"
import { ReactSidePanelsDemo } from "./demo"

export default function Page() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return <ReactSidePanelsDemo />
}
