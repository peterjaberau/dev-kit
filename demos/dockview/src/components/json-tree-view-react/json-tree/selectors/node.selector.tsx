'use client'
import { useAppRoot } from "./app.root.selector"


export const useNode = () => {
  const { appRootRef } = useAppRoot()

  return {
    appRootRef,
  }
}
