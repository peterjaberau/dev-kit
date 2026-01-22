'use client'
import { scan } from "react-scan/all-environments"
import { useEffect } from "react"

export function ReactScan() {
  useEffect(() => {
    scan({
      enabled: true,
    })
  }, [])

  return <></>
}
