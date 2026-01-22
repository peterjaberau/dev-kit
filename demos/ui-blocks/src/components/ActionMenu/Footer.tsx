import { forwardRef } from "react";

import { Menu } from "#components/Menu";
import { cn } from "#utils";

const Footer = forwardRef<HTMLDivElement, Menu.LabelProps>(({ children, className, ...props }, ref) => {
  return (
    <Menu.Footer
      ref={ref}
      style={{ backgroundColor: "var(--chakra-colors-gray-subtle)" }}
      className={cn("text-left", className)}
      {...props}
    >
      {children}
    </Menu.Footer>
  )
});

export { Footer };
