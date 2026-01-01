import * as React from "react"
import { useAtom } from "jotai"

export const SidebarContext = React.createContext<any>(null)

export function SidebarProvider({
                           defaultOpen = true,
                           open: openProp,
                           onOpenChange: setOpenProp,
                           className,
                           style,
                           children,
                           ...props
                         }: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = false
  const [openMobile, setOpenMobile] = React.useState(false)
  const [persistedSidebarWidth, setPersistedSidebarWidth] = useAtom(sideBarWidthAtom)
  const sidebarWrapperRef = React.useRef<HTMLDivElement | null>(null)

  const applyCssSidebarWidth = React.useCallback((value: number) => {
    if (sidebarWrapperRef.current) {
      sidebarWrapperRef.current.style.setProperty("--sidebar-width", `${value}px`)
    }
  }, [])
  const setSidebarWidth = React.useCallback(
    (value: number | ((value: number) => number)) => {
      setPersistedSidebarWidth(value)
    },
    [setPersistedSidebarWidth],
  )

  const setSidebarWidthLive = React.useCallback(
    (value: number) => {
      const clamped = clampSidebarWidth(value)
      applyCssSidebarWidth(clamped)
    },
    [applyCssSidebarWidth],
  )

  React.useEffect(() => {
    applyCssSidebarWidth(persistedSidebarWidth)
  }, [persistedSidebarWidth, applyCssSidebarWidth])

  const sidebarWidth = persistedSidebarWidth

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open],
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const currentOpen = isMobile ? openMobile : open
  const state = currentOpen ? "expanded" : "collapsed"

  const contextValue = React.useMemo<any>(
    () => ({
      state,
      open: currentOpen,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      sidebarWidth,
      setSidebarWidth,
      setSidebarWidthLive,
    }),
    [
      state,
      currentOpen,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      sidebarWidth,
      setSidebarWidth,
      setSidebarWidthLive,
    ],
  )

  const mergedStyle = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const baseStyle = (style || {}) as Record<string, string | number>

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {
      ...baseStyle,
      "--sidebar-width": `${sidebarWidth}px`,
      "--sidebar-width-icon": baseStyle["--sidebar-width-icon"] || SIDEBAR_WIDTH_ICON,
    } as React.CSSProperties
  }, [sidebarWidth, style])

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        ref={sidebarWrapperRef}
        style={mergedStyle}
        className={cn(
          "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}
