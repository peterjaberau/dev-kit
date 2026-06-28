export interface TreeItem {
  id: string
  title: string
  children?: TreeItem[]
  isBlocked?: boolean
}

export type Tree = TreeItem[]

export interface LineIndicatorProps {
  position: "top" | "bottom"
}

export interface DraggablePanelProps extends TreeItem {
  index: number
  level?: number
  activeId: string
  setActiveId: (id: string) => void
  onMove: (id: string, direction: "up" | "down" | "indent" | "outdent") => void
  isFirst: boolean
  isLast: boolean
}
