import { forwardRef } from "react";

import { Menu } from "#components/Menu";
import { cn } from "#utils";

import { actionMenuContentStyles, actionMenuStyles } from "./styles";

const Root = Menu.Root;
const Trigger = Menu.Trigger;
const Portal = Menu.Portal;

const Content = forwardRef<HTMLDivElement, Menu.ContentProps>(({ children, className, ...props }, ref) => {
  return (
    <Menu.Content ref={ref} className={cn(actionMenuContentStyles(), className)} {...props}>
      {children}
    </Menu.Content>
  );
});

const Item = forwardRef<HTMLDivElement, Menu.ItemProps>(({ children, className, ...props }, ref) => {
  return (
    <Menu.Item
      ref={ref}
      className={cn(actionMenuStyles(), className)}
      style={{ color: "var(--chakra-colors-gray-muted)" }}
      {...props}
    >
      {children}
    </Menu.Item>
  )
});

export { Content, Item, Portal, Root, Trigger };
