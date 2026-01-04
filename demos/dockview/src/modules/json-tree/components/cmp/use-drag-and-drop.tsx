'use client'
import { useCallback } from "react"

export const useDragAndDrop = () => {
  const handleDrop = useCallback(async (args: any) => {
    const { source, location, self } = args
    const sourceData = source.data
    const dropTargets = location.current.dropTargets
  }, [])


  return { handleDrop }
}
