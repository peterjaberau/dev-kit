import { Icon, IconButton } from "@chakra-ui/react"
import { LuChevronRight as ChevronRight, LuChevronDown as ChevronDown } from "react-icons/lu"
import { cn } from "#utils"

interface RootNodeIconProps {
  handleIconClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  isFolderExpanded: boolean
  iconPath?: string
}

export const RootNodeIcon = ({ handleIconClick, isFolderExpanded, iconPath }: RootNodeIconProps) => {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center">
      <IconButton variant={"ghost"} size={"xs"} borderRadius="full" onClick={handleIconClick}>
        <ChevronRight
          className={cn("text-(--moss-list-foreground)", {
            "rotate-90": isFolderExpanded,
            "hidden group-hover/treeRootNodeTrigger:block": iconPath,
          })}
        />
      </IconButton>

      {iconPath && (
        <div className="h-full w-full rounded group-hover/treeRootNodeTrigger:hidden">
          <img src={iconPath} className="h-full w-full" />
        </div>
      )}
    </span>
  )
}
