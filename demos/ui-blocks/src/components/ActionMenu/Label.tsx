import { forwardRef } from "react";

import { Menu } from "#components/Menu";
import { cn } from "#utils";

const Label = forwardRef<HTMLDivElement, Menu.LabelProps>(({ children, className, ...props }, ref) => {
  return (
    <Menu.Label ref={ref} className={cn("", className)} {...props}>
      {children}
    </Menu.Label>
  );
});

export { Label };
