"use client"
// react-scan must be imported before react
import { scan } from "react-scan"
import { useEffect } from "react"

export function ReactScan() {
  useEffect(() => {
    scan({
      enabled: true,
      showToolbar: true,
      animationSpeed: "off",
      trackUnnecessaryRenders: true,
      dangerouslyForceRunInProduction: true,
      log: true,
    })
  }, [])

  return <></>
}
