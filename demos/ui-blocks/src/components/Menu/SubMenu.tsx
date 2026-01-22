import React, { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react";
import { LuChevronRight as ChevronRight, LuChevronDown as ChevronDown } from "react-icons/lu"

import { cn } from "#utils";
import * as MenuPrimitive from "@radix-ui/react-menu";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { Icon } from "@chakra-ui/react";
import { ScopedProps, useMenuScope } from "./Menu";
import { menuContentStyles, menuIconStyles, menuItemStyles } from "./styles";

/* -------------------------------------------------------------------------------------------------
 * Sub
 * -----------------------------------------------------------------------------------------------*/

const SUB_NAME = "ActionMenuSub";

interface ActionMenuSubProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
}

const Sub: React.FC<ActionMenuSubProps> = (props: ScopedProps<ActionMenuSubProps>) => {
  const { __scopeActionMenu, children, onOpenChange, open: openProp, defaultOpen = false } = props;
  const menuScope = useMenuScope(__scopeActionMenu);

  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    caller: SUB_NAME,
  });

  return (
    <MenuPrimitive.Sub {...menuScope} open={open} onOpenChange={setOpen}>
      {children}
    </MenuPrimitive.Sub>
  );
};

/* -------------------------------------------------------------------------------------------------
 * SubTrigger
 * -----------------------------------------------------------------------------------------------*/

type SubTriggerElement = ComponentRef<typeof MenuPrimitive.SubTrigger>;
type SubTriggerProps = ScopedProps<ComponentPropsWithoutRef<typeof MenuPrimitive.SubTrigger>> & {
  icon?: any;
  iconClassName?: string;
  alignWithIcons?: boolean;
};

const SubTrigger = forwardRef<SubTriggerElement, SubTriggerProps>(
  ({ alignWithIcons = false, iconClassName, ...props }, forwardedRef) => {
    const { __scopeActionMenu, ...triggerItemProps } = props;

    return (
      <MenuPrimitive.SubTrigger
        {...triggerItemProps}
        ref={forwardedRef}
        className={cn(menuItemStyles({ disabled: props.disabled }), props.className)}
      >
        {props.icon && (
          <Icon className={menuIconStyles({ className: iconClassName })}>
            {props.icon}
          </Icon>
        )}
        {alignWithIcons && <div className={menuIconStyles({ className: cn("opacity-0", iconClassName) })} />}

        <span className="truncate">{props.children}</span>

        <Icon className={menuIconStyles({ className: "ml-auto" })} ><ChevronRight /></Icon>
      </MenuPrimitive.SubTrigger>
    )
  }
);

/* -------------------------------------------------------------------------------------------------
 * SubContent
 * -----------------------------------------------------------------------------------------------*/

type SubContentElement = ComponentRef<typeof MenuPrimitive.Content>;
type SubContentProps = ScopedProps<ComponentPropsWithoutRef<typeof MenuPrimitive.SubContent>>;

const SubContent = forwardRef<SubContentElement, SubContentProps>(
  (props: ScopedProps<SubContentProps>, forwardedRef) => {
    const { __scopeActionMenu, ...subContentProps } = props;

    return (
      <MenuPrimitive.SubContent
        {...subContentProps}
        ref={forwardedRef}
        style={{ ...props.style }}
        className={cn(menuContentStyles(), props.className)}
      />
    );
  }
);

export { Sub, SubContent, SubTrigger };

export type { ActionMenuSubProps, SubContentProps, SubTriggerProps };
