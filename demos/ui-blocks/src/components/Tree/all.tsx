import { createContext, forwardRef, HTMLAttributes, ReactNode, useContext, useEffect, useRef, useState } from "react"

import { cn } from "#utils"
import { Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/dist/types/list-item"
import { IconButton } from "@chakra-ui/react"
import { LuChevronRight as ChevronRight } from "react-icons/lu"
import { cva } from "class-variance-authority"
import { useClickOutside, useFocusInputOnMount, useValidateInput } from "#hooks"

export interface BaseTreeContextProps {
  id: string
  name: string
  order: number
  treePaddingLeft: number
  treePaddingRight: number
  nodeOffset: number
  showOrders?: boolean
}
interface RootNodeProps extends HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode
  className?: string
  isChildDropBlocked?: boolean | null
  instruction?: Instruction | null
  dropIndicatorFullWidth?: boolean
  combineInstruction?: Instruction | null
  isDragging?: boolean
}
interface DropIndicatorForDirProps extends HTMLAttributes<HTMLDivElement> {
  isChildDropBlocked?: boolean | null
  instruction: Instruction | null
}
interface DropIndicatorForCombineProps extends HTMLAttributes<HTMLDivElement> {
  instruction: Instruction | null
}
interface DragHandleButtonProps {
  className?: string
  slim?: boolean
  ghost?: boolean
}
interface RootNodeChildrenProps {
  children?: React.ReactNode
  className?: string
  hideDirDepthIndicator?: boolean
}
interface DropIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  instruction: Instruction | null
  gap?: number
  paddingLeft?: number
  paddingRight?: number
  depth?: number
  isLastChild?: boolean
  height?: number
  fullWidth?: boolean
}
interface RootNodeControlsProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}
interface RootNodeHeaderProps extends HTMLAttributes<HTMLLIElement> {
  isActive?: boolean
  children: React.ReactNode
}
interface RootNodeLabelProps extends HTMLAttributes<HTMLDivElement> {
  label: string
}
interface RootNodeOrderProps {
  order?: number
}
interface RootNodeTriggersProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}
interface NodeProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode
  isChildDropBlocked?: boolean | null
  dropInstructionForDir?: Instruction | null
  className?: string
}
interface NodeChildrenProps extends HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode
  className?: string
  depth: number
}
interface NodeActionsProps {
  className?: string
  children: React.ReactNode
}
interface NodeDirCountProps extends HTMLAttributes<HTMLDivElement> {
  count: number
}
interface NodeDirToggleIconProps extends HTMLAttributes<HTMLDivElement> {
  handleClickOnDir: (e: React.MouseEvent<HTMLButtonElement>) => void
  isDir: boolean
  shouldRenderChildNodes: boolean
}
interface NodeLabelProps extends HTMLAttributes<HTMLSpanElement> {
  label: string
  capitalize?: boolean
}
interface NodeOrderProps {
  order?: number
}
interface NodeTriggersProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}
interface ActionLabelProps {
  children: React.ReactNode
  className?: string
  props?: React.HTMLAttributes<HTMLDivElement>
}
interface ActionsHoverProps {
  children: React.ReactNode
  className?: string
  forceVisible?: boolean
  props?: React.HTMLAttributes<HTMLDivElement>
  invisible?: boolean
  showOnTreeHover?: boolean
}
interface ActionsPersistentProps {
  children: React.ReactNode
  className?: string
  props?: React.HTMLAttributes<HTMLDivElement>
}
interface ActiveNodeIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  isActive: boolean
}
interface DragHandleButtonProps {
  className?: string
  slim?: boolean
  ghost?: boolean
}
interface DropIndicatorForCombineProps extends HTMLAttributes<HTMLDivElement> {
  instruction: Instruction | null
}
interface DropIndicatorForDirProps extends HTMLAttributes<HTMLDivElement> {
  isChildDropBlocked?: boolean | null
  instruction: Instruction | null
}
interface DropIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  instruction: Instruction | null
  gap?: number
  paddingLeft?: number
  paddingRight?: number
  depth?: number
  isLastChild?: boolean
  height?: number
  fullWidth?: boolean
}
interface NodeRenamingFormProps {
  onSubmit: (name: string) => void
  onCancel: () => void
  restrictedNames?: string[]
  className?: string
}

export const TreeContext = createContext<BaseTreeContextProps>({
  id: "",
  name: "",
  order: 0,
  treePaddingLeft: 8,
  treePaddingRight: 8,
  nodeOffset: 12,
  showOrders: false,
})

export const useTreeContext = () => {
  return useContext(TreeContext)
}
export const RootNode = forwardRef<HTMLUListElement, RootNodeProps>(
  (
    {
      children,
      className,
      isChildDropBlocked,
      instruction,
      dropIndicatorFullWidth = false,
      combineInstruction,
      isDragging,
      ...props
    }: RootNodeProps,
    ref,
  ) => {
    return (
      <ul
        ref={ref}
        className={cn(
          "group/TreeRootNode relative w-full list-none",
          {
            "opacity-50": isDragging,
          },
          className,
        )}
        {...props}
      >
        <DropIndicatorForDir isChildDropBlocked={isChildDropBlocked} instruction={instruction ?? null} />
        <DropIndicatorForTrigger instruction={instruction ?? null} fullWidth={dropIndicatorFullWidth} />
        {combineInstruction && <DropIndicatorForCombine instruction={combineInstruction} />}

        {children}
      </ul>
    )
  },
)



export const RootNodeChildren = ({ children, className, hideDirDepthIndicator, ...props }: RootNodeChildrenProps) => {
  return (
    <ul className={cn("relative w-full", className)} {...props}>
      {!hideDirDepthIndicator && <DirDepthIndicator depth={0} />}

      {children}
    </ul>
  )
}



export const RootNodeControls = ({ children, className, ...props }: RootNodeControlsProps) => {
  return (
    <div
      className={cn("group/TreeRootNodeControls flex w-full min-w-0 items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export const RootNodeHeader = forwardRef<HTMLLIElement, RootNodeHeaderProps>(
  ({ isActive = false, children, className, ...props }: RootNodeHeaderProps, ref) => {
    const { treePaddingLeft, treePaddingRight } = useTreeContext()

    return (
      <li
        ref={ref}
        className={cn(
          "group/TreeRootNodeHeader py-0.75 relative flex w-full min-w-0 items-center justify-between",
          className,
        )}
        style={{
          paddingLeft: treePaddingLeft,
          paddingRight: treePaddingRight,
        }}
        {...props}
      >
        <ActiveNodeIndicator isActive={isActive} />
        {children}
      </li>
    )
  },
)

export const RootNodeLabel = ({ label, className, ...props }: RootNodeLabelProps) => {
  return (
    <div className={cn("w-full cursor-pointer truncate font-medium", className)} {...props}>
      {label}
    </div>
  )
}

export const RootNodeOrder = ({ order }: RootNodeOrderProps) => {
  return <div className={cn("text-blue-700 underline")}>{order ?? "-"}</div>
}
export const RootNodeTriggers = ({ children, className, ...props }: RootNodeTriggersProps) => {
  return (
    <div className={cn("flex grow items-center gap-1", className)} {...props}>
      {children}
    </div>
  )
}




export const Node = forwardRef<HTMLLIElement, NodeProps>(
  ({ children, className, isChildDropBlocked, dropInstructionForDir, ...props }: NodeProps, ref) => {
    return (
      <li ref={ref} className={cn("relative", className)} {...props}>
        <DropIndicatorForDir isChildDropBlocked={isChildDropBlocked} instruction={dropInstructionForDir ?? null} />

        {children}
      </li>
    )
  },
)
export const NodeChildren = ({ children, className, depth, ...props }: NodeChildrenProps) => {
  return (
    <ul className={cn("relative h-full", className)} {...props}>
      <DirDepthIndicator depth={depth} />

      {children}
    </ul>
  )
}

export const NodeActions = ({ className, children, ...props }: NodeActionsProps) => {
  return (
    <div className={cn("flex items-center gap-0.5", className)} {...props}>
      {children}
    </div>
  )
}

export const NodeDirCount = ({ count, className, ...props }: NodeDirCountProps) => {
  return (
    <div className={cn("text-(--moss-list-descriptionForeground)", className)} {...props}>
      ({count})
    </div>
  )
}

export const NodeDirToggleIcon = ({
  handleClickOnDir,
  isDir,
  shouldRenderChildNodes,
  className,
  ...props
}: NodeDirToggleIconProps) => {
  return (
    <div className={cn("flex size-5 shrink-0 items-center justify-center", className)} {...props}>
      <IconButton onClick={handleClickOnDir} variant={"ghost"} size={"xs"} borderRadius="full" opacity={isDir ? 1 : 0}>
        <ChevronRight
          className={cn("", {
            "rotate-90": shouldRenderChildNodes,
            "opacity-0": !isDir,
          })}
        />
      </IconButton>
    </div>
  )
}
export const NodeLabel = ({ label, className, capitalize, ...props }: NodeLabelProps) => {
  return (
    <span
      className={cn(
        "min-w-0 truncate",
        {
          capitalize: capitalize,
        },
        className,
      )}
      {...props}
    >
      {label}
    </span>
  )
}

export const NodeOrder = ({ order }: NodeOrderProps) => {
  return <div className={cn("text-blue-500 underline")}>{order ?? "-"}</div>
}

export const NodeTriggers = ({ children, className, ...props }: NodeTriggersProps) => {
  return (
    <div className={cn("relative z-10 flex h-full grow items-center gap-1.5", className)} {...props}>
      {children}
    </div>
  )
}
export const ActionLabel = ({ children, className, ...props }: ActionLabelProps) => {
  return (
    <div className={cn("text-(--moss-primary-foreground) rounded-[3px] px-1 text-xs leading-4", className)} {...props}>
      {children}
    </div>
  )
}
const actionsHoverStyles = cva(["transition-[display,opacity] transition-discrete duration-100"], {
  variants: {
    invisible: {
      false: ["sr-only group-hover/TreeNodeControls:contents group-hover/TreeRootNodeControls:contents"],
      true: ["opacity-0 group-hover/TreeNodeControls:opacity-100 group-hover/TreeRootNodeControls:opacity-100"],
    },
    showOnTreeHover: {
      true: ["group-hover/TreeRootNode:contents"],
      false: [""],
    },
    forceVisible: {
      true: ["contents opacity-100"],
      false: [""],
    },
  },
})

export const ActionsHover = ({
  children,
  className,
  forceVisible,
  invisible = false,
  showOnTreeHover = false,
  ...props
}: ActionsHoverProps) => {
  return (
    <div className={cn(actionsHoverStyles({ invisible, showOnTreeHover, forceVisible }), className)} {...props}>
      {children}
    </div>
  )
}
export const ActionsPersistent = ({ children, className, ...props }: ActionsPersistentProps) => {
  return (
    <div className={cn("contents", className)} {...props}>
      {children}
    </div>
  )
}


export const ActiveNodeIndicator = ({ isActive, className, ...props }: ActiveNodeIndicatorProps) => {
  return (
    <div
      //prettier-ignore
      className={cn(`
          absolute top-0 left-0 
          h-full w-full 
          group-hover/TreeRootNodeHeader:background-(--moss-secondary-background-hover)
          group-hover/TreeNodeControls:background-(--moss-secondary-background-hover)
          -z-1
        `,
        {
          "background-(--moss-secondary-background-hover) border-l border-l-(--moss-accent)": isActive,
        },
        className
      )}
      {...props}
    />
  )
}

export const DirDepthIndicator = ({ depth }: { depth: number }) => {
  const { nodeOffset } = useContext(TreeContext)

  const iconSize = 16
  const left = depth * nodeOffset + iconSize + 1

  return (
    <div
      //prettier-ignore
      className={`
        absolute top-0  
        h-full w-px 
        z-5 
        background-(--moss-border) 
        transition-[display,opacity] transition-discrete duration-100
        hidden opacity-0
        group-hover/TreeRootNode:flex 
        group-hover/TreeRootNode:opacity-100
      `}
      style={{ left }}
    />
  )
}

const DragHandleButton = forwardRef<HTMLDivElement, DragHandleButtonProps>(({ className, slim, ghost }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex cursor-grab items-center justify-center rounded",
        {
          "px-1 py-0.5": slim,
          "size-4": !slim,
          "": ghost,
          "background-(--moss-primary-background) shadow": !ghost,
        },
        className,
      )}
    >
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H2V2H0V0ZM4 0H6V2H4V0ZM2 4H0V6H2V4ZM4 4H6V6H4V4ZM2 8H0V10H2V8ZM4 8H6V10H4V8Z"
          fill="#525252"
        />
      </svg>
    </div>
  )
})

export const DropIndicatorForCombine = ({ instruction, ...props }: DropIndicatorForCombineProps) => {
  if (!instruction) return null

  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: instruction.blocked ? "var(--moss-error-background)" : "var(--moss-success-background)",
      }}
      {...props}
    />
  )
}

export const DropIndicatorForDir = ({ isChildDropBlocked, instruction, ...props }: DropIndicatorForDirProps) => {
  if (isChildDropBlocked) {
    return (
      <div
        {...props}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          backgroundColor: "var(--moss-error-background)",
        }}
      />
    )
  }

  if (!instruction) return null

  if (instruction.operation === "combine") {
    return (
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          backgroundColor: instruction.blocked ? "var(--moss-error-background)" : "var(--moss-success-background)",
        }}
        {...props}
      />
    )
  }

  return null
}
export const DropIndicatorForTrigger = ({
  instruction,
  gap = 0,
  paddingLeft = 0,
  paddingRight = 0,
  depth = 0,
  isLastChild = false,
  height = 1,
  fullWidth = false,
  ...props
}: DropIndicatorProps) => {
  if (!instruction || instruction.blocked || instruction.operation === "combine") return null

  let reorderWidth: string
  let leftOffset: number

  if (fullWidth) {
    reorderWidth = `100%`

    leftOffset = 0
  } else {
    const baseWidth = `calc(100% - ${paddingRight}px - ${paddingLeft}px)`

    reorderWidth = depth === 1 ? baseWidth : `calc(${baseWidth} - 16px)`

    leftOffset =
      paddingLeft + (depth === 1 ? 0 : instruction.operation === "reorder-before" ? 16 : isLastChild ? 0 : 16)
  }

  const gapOffset = -(gap + height / 2)

  return (
    <div
      style={{
        position: "absolute",
        height: "1px",
        backgroundColor: "var(--moss-accent)",
        [instruction.operation === "reorder-before" ? "top" : "bottom"]: gapOffset,
        width: reorderWidth,
        left: leftOffset,
        pointerEvents: "none",
        zIndex: 5,
      }}
      {...props}
    />
  )
}
export const NodeAddForm = ({ onSubmit, onCancel, restrictedNames, className }: NodeRenamingFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [value, setValue] = useState("")

  const { isInitialized } = useFocusInputOnMount({
    inputRef,
    initialValue: value,
  })

  const { isValid } = useValidateInput({
    value,
    restrictedValues: restrictedNames,
    inputRef,
    isInitialized,
  })

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") onCancel()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>) => {
    if ("preventDefault" in e) e.preventDefault()

    if (!isValid) return

    onSubmit(value)
  }

  const handleBlur = () => {
    if (!isInitialized.current) return

    if (!isValid) {
      onCancel()
      return
    }

    onSubmit(value)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("h-full w-full grow py-1 pr-1", className)}>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        minLength={1}
        maxLength={100}
        className="rounded-xs focus-visible:outline-(--moss-accent) relative flex h-full w-[calc(100%-3px)] min-w-0 grow items-center bg-white py-0.5 focus-visible:outline-1 focus-visible:outline-offset-0"
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        required
      />
    </form>
  )
}
export const NodeRenamingForm = ({ onSubmit, onCancel, restrictedNames, currentName }: any | NodeRenamingFormProps) => {
  // const isMac = platform() === "macos";
  // const isLinux = platform() === "linux";
  // HACK: Adding leading-[19px] class for Linux and macOS to prevent slight shifting of list items during edit mode.
  // const leadingClass = isMac || isLinux ? "leading-[19px]" : "";
  const leadingClass = "leading-[19px]"

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState(String(currentName))

  const { isInitialized } = useFocusInputOnMount({
    inputRef,
    initialValue: value,
  })

  const { isValid } = useValidateInput({
    value,
    restrictedValues: restrictedNames,
    inputRef,
    isInitialized,
  })

  const finishEditing = () => {
    if (!isValid) {
      onCancel()
      return
    }

    onSubmit(value)
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") onCancel()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    finishEditing()
  }

  // We use onBlur for Windows and useClickOutside for macOS
  const handleBlur = () => {
    if (!isInitialized.current) return
    finishEditing()
  }

  useClickOutside(containerRef, () => {
    // if (isMac) {
    //   finishEditing();
    // }
    finishEditing()
  })

  useEffect(() => {
    // Delay to avoid focus bug on macOS
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
        const dotIndex = inputRef.current.value.indexOf(".")
        inputRef.current.setSelectionRange(0, dotIndex >= 0 ? dotIndex : inputRef.current.value.length)
        isInitialized.current = true
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <form onSubmit={handleSubmit} className="w-full grow">
      <div ref={containerRef}>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          minLength={1}
          maxLength={100}
          className={`z-1 rounded-xs outline-(--moss-primary) flex w-[calc(100%-8px)] min-w-0 grow items-center gap-1 bg-white outline outline-offset-1 ${leadingClass}`}
          onKeyUp={handleKeyUp}
          // onBlur={isMac ? undefined : handleBlur}
          required
        />
      </div>
    </form>
  )
}
