"use client"

import { useEffect, useState } from "react"
import App from "./src/App"

export default function Page() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return <App />
}
