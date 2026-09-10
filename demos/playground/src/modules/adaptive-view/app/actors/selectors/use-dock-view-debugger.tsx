'use client'
import {
  useDockView,
  useDockViewAdapter
} from "."


export const useDockViewDebugger = () => {
  const { dockviewRef } = useDockView()
  const dockViewAdapter = useDockViewAdapter()


  const dockViewDebugger = {
    app: dockviewRef.getSnapshot().toJSON(),
    dockViewAdapter,
  }

  return {
    dockViewDebugger,
  }
}
