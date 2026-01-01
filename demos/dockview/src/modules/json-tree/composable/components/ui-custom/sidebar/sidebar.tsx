"use client"

import * as React from "react"

import { useSidebar } from "./use-sidebar"
import { SidebarProvider, SidebarContext } from "./sidebar.provider"
import { SidebarGroupContent } from "./sidebar.group-content"
import { SidebarMenu } from "./sidebar.menu"
import { SidebarMenuItem } from "./sidebar.menu-item"
import { SidebarMenuButton } from "./sidebar.menu-button"
import { SidebarMenuBadge } from "./sidebar.menu-badge"

import * as CONSTANTS from "./constants"
import { SIDEBAR_WIDTH_PX_MAX, SIDEBAR_WIDTH_PX_MIN } from "../../../shared/contants"
import { Slot } from "@radix-ui/react-slot"

import { chakra, Button, IconButton, Input, Separator, Card as Sheet, Skeleton } from "@chakra-ui/react"

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn("bg-sidebar text-sidebar-foreground w-(--sidebar-width) flex h-full flex-col", className)}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className="text-sidebar-foreground group peer relative hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "w-(--sidebar-width) relative bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <SidebarRail side={side} />
      <div
        data-slot="sidebar-container"
        className={cn(
          "w-(--sidebar-width) fixed inset-y-0 z-10 hidden h-svh transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarRail({
  className,
  side = "left",
  onPointerDown,
  onClick,
  ...props
}: React.ComponentProps<"div"> & { side?: "left" | "right" }) {
  const { toggleSidebar, sidebarWidth, setSidebarWidth, setSidebarWidthLive, state } = useSidebar()
  const railRef = React.useRef<HTMLDivElement | null>(null)
  const dragStateRef = React.useRef({
    startX: 0,
    startWidth: sidebarWidth,
    latestWidth: sidebarWidth,
    didDrag: false,
    resizing: false,
  })
  const moveListenerRef = React.useRef<((event: PointerEvent) => void) | null>(null)
  const upListenerRef = React.useRef<(() => void) | null>(null)
  const cancelListenerRef = React.useRef<(() => void) | null>(null)
  const pointerIdRef = React.useRef<number | null>(null)

  const teardownListeners = React.useCallback(() => {
    if (moveListenerRef.current) {
      window.removeEventListener("pointermove", moveListenerRef.current)
      moveListenerRef.current = null
    }
    if (upListenerRef.current) {
      window.removeEventListener("pointerup", upListenerRef.current)
      upListenerRef.current = null
    }
    if (cancelListenerRef.current) {
      window.removeEventListener("pointercancel", cancelListenerRef.current)
      cancelListenerRef.current = null
    }
    if (
      pointerIdRef.current !== null &&
      // Optional chaining needed for test environment compatibility
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      railRef.current?.hasPointerCapture?.(pointerIdRef.current) === true
    ) {
      // Optional chaining needed for test environment compatibility
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      railRef.current?.releasePointerCapture?.(pointerIdRef.current)
    }
    pointerIdRef.current = null
    dragStateRef.current.resizing = false
  }, [])

  React.useEffect(() => {
    dragStateRef.current.startWidth = sidebarWidth
    dragStateRef.current.latestWidth = sidebarWidth
  }, [sidebarWidth])

  React.useEffect(() => teardownListeners, [teardownListeners])

  const handlePointerDown = React.useCallback<React.PointerEventHandler<HTMLDivElement>>(
    (event) => {
      if (event.button !== 0 || state === "collapsed") {
        return
      }

      dragStateRef.current = {
        startX: event.clientX,
        startWidth: sidebarWidth,
        latestWidth: sidebarWidth,
        didDrag: false,
        resizing: true,
      }
      event.preventDefault()

      pointerIdRef.current = event.pointerId
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      event.currentTarget.setPointerCapture?.(event.pointerId)

      const direction = side === "left" ? 1 : -1

      const handlePointerMove = (moveEvent: PointerEvent) => {
        if (!dragStateRef.current.resizing) return
        const delta = (moveEvent.clientX - dragStateRef.current.startX) * direction
        if (Math.abs(delta) > SIDEBAR_RESIZE_THRESHOLD) {
          dragStateRef.current.didDrag = true
        }

        const nextWidth = dragStateRef.current.startWidth + delta
        dragStateRef.current.latestWidth = nextWidth
        setSidebarWidthLive(nextWidth)
      }

      const handlePointerUp = () => {
        if (dragStateRef.current.didDrag) {
          setSidebarWidth(dragStateRef.current.latestWidth)
          // Note: don't reset didDrag here - it should be reset in onClick to prevent toggle
        } else {
          // Only reset if no drag occurred
          dragStateRef.current.didDrag = false
        }
        teardownListeners()
      }

      const handlePointerCancel = () => {
        dragStateRef.current.didDrag = false
        setSidebarWidthLive(sidebarWidth)
        teardownListeners()
      }

      moveListenerRef.current = handlePointerMove
      upListenerRef.current = handlePointerUp
      cancelListenerRef.current = handlePointerCancel
      window.addEventListener("pointermove", handlePointerMove)
      window.addEventListener("pointerup", handlePointerUp)
      window.addEventListener("pointercancel", handlePointerCancel)
    },
    [setSidebarWidth, setSidebarWidthLive, sidebarWidth, side, state, teardownListeners],
  )

  const handleKeyDown = React.useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        toggleSidebar()
        return
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault()
        const direction = event.key === "ArrowRight" ? 1 : -1
        const step = event.shiftKey ? SIDEBAR_KEYBOARD_STEP_LARGE : SIDEBAR_KEYBOARD_STEP
        setSidebarWidth((prev) => prev + direction * step)
      }
    },
    [setSidebarWidth, toggleSidebar],
  )

  return (
    <div
      ref={railRef}
      data-sidebar="rail"
      data-slot="sidebar-rail"
      data-side={side}
      role="separator"
      aria-label="Resize sidebar"
      aria-orientation="vertical"
      aria-valuemin={SIDEBAR_WIDTH_PX_MIN}
      aria-valuenow={sidebarWidth}
      aria-valuemax={SIDEBAR_WIDTH_PX_MAX}
      tabIndex={0}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        handlePointerDown(event)
      }}
      onClick={(event) => {
        if (dragStateRef.current.didDrag) {
          dragStateRef.current.didDrag = false
          event.preventDefault()
          return
        }
        onClick?.(event)
        toggleSidebar()
      }}
      onKeyDown={handleKeyDown}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "in-data-[side=left]:cursor-ew-resize in-data-[side=right]:cursor-ew-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-ew-resize [[data-side=right][data-state=collapsed]_&]:cursor-ew-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",
        className,
      )}
      {...props}
    />
  )
}

function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring outline-hidden flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground outline-hidden absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground outline-hidden absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="max-w-(--skeleton-width) h-4 flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground outline-hidden flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
}
