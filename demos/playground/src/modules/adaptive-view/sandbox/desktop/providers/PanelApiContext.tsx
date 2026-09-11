import { createContext, useContext, useEffect, type ReactNode, type RefObject } from "react"
import { DockviewGroupLocation, DockviewPanelApi, DockviewPanelRenderer } from "#adaptive-view/react"
import * as React from "react"

const PanelApiContext = createContext<DockviewPanelApi | null>(null)

export function PanelApiProvider({ api, children }: { api: DockviewPanelApi; children: ReactNode }) {
  return <PanelApiContext.Provider value={api}>{children}</PanelApiContext.Provider>
}

export function usePanelApi(): DockviewPanelApi | null {
  return useContext(PanelApiContext)
}

export interface PanelApiMetadata {
  isActive: {
    value: boolean
    count: number
  }
  isVisible: {
    value: boolean
    count: number
  }
  renderer: {
    value: DockviewPanelRenderer
    count: number
  }
  isGroupActive: {
    value: boolean
    count: number
  }
  groupChanged: {
    count: number
  }
  location: {
    value: DockviewGroupLocation
    count: number
  }
  didFocus: {
    count: number
  }
  dimensions: {
    count: number
    value: { height: number; width: number }
  }
}
export function usePanelApiMetadata(api: DockviewPanelApi): PanelApiMetadata {
  const [state, setState] = React.useState<PanelApiMetadata>({
    isActive: { value: api.isActive, count: 0 },
    isVisible: { value: api.isVisible, count: 0 },
    renderer: { value: api.renderer, count: 0 },
    isGroupActive: { value: api.isGroupActive, count: 0 },
    groupChanged: { count: 0 },
    location: { value: api.location, count: 0 },
    didFocus: { count: 0 },
    dimensions: {
      count: 0,
      value: { height: api.height, width: api.width },
    },
  })

  React.useEffect(() => {
    const d1 = api.onDidActiveChange((event) => {
      setState((_) => ({
        ..._,
        isActive: {
          value: event.isActive,
          count: _.isActive.count + 1,
        },
      }))
    })
    const d2 = api.onDidActiveGroupChange((event) => {
      setState((_) => ({
        ..._,
        isGroupActive: {
          value: event.isActive,
          count: _.isGroupActive.count + 1,
        },
      }))
    })
    const d3 = api.onDidDimensionsChange((event) => {
      setState((_) => ({
        ..._,
        dimensions: {
          count: _.dimensions.count + 1,
          value: { height: event.height, width: event.width },
        },
      }))
    })
    const d4 = api.onDidFocusChange((event) => {
      setState((_) => ({
        ..._,
        didFocus: {
          count: _.didFocus.count + 1,
        },
      }))
    })
    const d5 = api.onDidGroupChange((event) => {
      setState((_) => ({
        ..._,
        groupChanged: {
          count: _.groupChanged.count + 1,
        },
      }))
    })
    const d7 = api.onDidLocationChange((event) => {
      setState((_) => ({
        ..._,
        location: {
          value: event.location,
          count: _.location.count + 1,
        },
      }))
    })
    const d8 = api.onDidRendererChange((event) => {
      setState((_) => ({
        ..._,
        renderer: {
          value: event.renderer,
          count: _.renderer.count + 1,
        },
      }))
    })
    const d9 = api.onDidVisibilityChange((event) => {
      setState((_) => ({
        ..._,
        isVisible: {
          value: event.isVisible,
          count: _.isVisible.count + 1,
        },
      }))
    })

    return () => {
      d1.dispose()
      d2.dispose()
      d3.dispose()
      d4.dispose()
      d5.dispose()
      d7.dispose()
      d8.dispose()
      d9.dispose()
    }
  }, [api])

  return state
}

export function usePanelVisibilityEffect(callback: () => void) {
  const api = useContext(PanelApiContext)
  const [visible, setVisible] = React.useState(true)

  useEffect(() => {
    if (!api) return
    setVisible(api.isVisible)
    const disposable = api.onDidVisibilityChange((e) => {
      if (e.isVisible) {
        setVisible(e.isVisible)
        callback()
      }
    })
    return () => disposable.dispose()
  }, [api])
}

export function usePanelFocusEffect(callback: () => void) {
  const api = useContext(PanelApiContext)
  useEffect(() => {
    if (!api) return
    const disposable = api.onDidFocusChange((e) => {
      if (e.isFocused) callback()
    })
    return () => disposable.dispose()
    // callback identity is intentionally excluded — callers should memoize if needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])
}

export function usePanelActiveEffect(callback: () => void) {
  const api = useContext(PanelApiContext)
  useEffect(() => {
    if (!api) return
    const disposable = api.onDidActiveChange((e) => {
      if (e.isActive) callback()
    })
    return () => disposable.dispose()
    // callback identity is intentionally excluded — callers should memoize if needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])
}

interface ScrollRestorableVirtualizer {
  scrollOffset: number | null
  scrollToOffset: (offset: number, options?: { align?: "start" }) => void
}

export function useRestoreVirtualizerScroll(
  virtualizer: ScrollRestorableVirtualizer,
  scrollElRef: RefObject<HTMLElement | null>,
) {
  usePanelActiveEffect(() => {
    // Wait until the panel is actually laid out (dockview may still have it
    // display:none for this tick); setting scrollTop on a 0-height element is a
    // no-op, so retry next frame until it has size.
    const apply = () => {
      const el = scrollElRef.current
      if (!el) return
      if (el.clientHeight === 0) {
        requestAnimationFrame(apply)
        return
      }
      virtualizer.scrollToOffset(virtualizer.scrollOffset ?? 0, { align: "start" })
    }
    requestAnimationFrame(apply)
  })
}
