'use client'
import { useRootActors } from "#modules/dockview/actors/hooks/root-actors"
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
