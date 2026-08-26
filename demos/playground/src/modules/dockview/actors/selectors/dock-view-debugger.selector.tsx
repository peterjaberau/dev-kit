'use client'
import {
  useApp,
  useDockViewAdapter
} from "#modules/dockview/actors/selectors"


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
