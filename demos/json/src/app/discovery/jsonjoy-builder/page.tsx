"use client"
import "./demo/index.css"
import { useEffect, useState } from "react"
import App from "./demo/App"

export default function Page() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return <App />
}
