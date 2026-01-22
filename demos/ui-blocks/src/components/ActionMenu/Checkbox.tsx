import { forwardRef } from "react";
import { IoMdCheckmark as CheckmarkIcon } from "react-icons/io"


import { Icon } from "@chakra-ui/react"

import { Menu } from "#components/Menu";
import { cn } from "#utils";

import { actionMenuStyles } from "./styles";

const CheckboxItem = forwardRef<HTMLDivElement, Menu.CheckboxItemProps>(({ children, className, ...props }, ref) => {
  return (
    <Menu.CheckboxItem ref={ref} className={cn(actionMenuStyles(), className)} {...props}>
      {props.checked ? <Icon size={'sm'}> <CheckmarkIcon/></Icon> : <Icon size={'sm'}> <CheckmarkIcon opacity={0}/></Icon>}

      <div className="flex w-full items-center gap-1.5">
        <span>{children}</span>

        {props.shortcut && <div className="ml-auto opacity-30">{props.shortcut}</div>}
      </div>
    </Menu.CheckboxItem>
  );
});

export { CheckboxItem };
