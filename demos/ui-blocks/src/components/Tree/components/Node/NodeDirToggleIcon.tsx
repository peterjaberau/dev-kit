import { HTMLAttributes } from "react";
import { LuChevronRight as ChevronRight, LuChevronDown as ChevronDown } from "react-icons/lu"
import { Icon, IconButton } from "@chakra-ui/react"

import { cn } from "#utils"

interface NodeDirToggleIconProps extends HTMLAttributes<HTMLDivElement> {
  handleClickOnDir: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDir: boolean;
  shouldRenderChildNodes: boolean;
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
};
