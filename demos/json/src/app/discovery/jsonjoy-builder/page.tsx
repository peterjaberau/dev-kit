'use client'

// // Option1 redirect to demo page
//
// import { redirect } from "next/navigation"
//
// export default function JsonJoyBuilderPage() {
//   redirect("/discovery/jsonjoy-builder/demo")
// }

// Option2 render demo page directly
import { useEffect, useState } from "react"
import DemoPage from "./demo/page"
export default function JsonJoyBuilderPage() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null


  return <DemoPage />
}