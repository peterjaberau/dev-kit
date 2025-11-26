import { fromCallback } from "xstate"
import { cleanupDockDisposables, defineDockDisposables, loadLayoutFromLocalStorage } from "."
import { DOCK_VIEW_ENUM } from "../constants"

export const handleDisposables = fromCallback(({ sendBack, input }) => {
  const { api, defaultConfig }: any = input

  const disposables = defineDockDisposables({ api, sendBack })

  loadLayoutFromLocalStorage({ api, key: DOCK_VIEW_ENUM.LOCAL_STORAGE_IDENTIFIER })
  // applyDefaultLayout({ api, defaultConfig})

  return cleanupDockDisposables({ disposables })
})
