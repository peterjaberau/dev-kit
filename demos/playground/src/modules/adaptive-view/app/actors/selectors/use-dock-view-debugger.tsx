'use client'
import {
  useApp,
  useDockViewAdapter
} from "."


export const useDockViewDebugger = () => {
  const { appRef } = useApp()
  const dockViewAdapter = useDockViewAdapter()


  const dockViewDebugger = {
    app: appRef.getSnapshot().toJSON(),
    dockViewAdapter,
  }

  return {
    dockViewDebugger,
  }
}
