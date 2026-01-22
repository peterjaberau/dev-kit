import { forwardRef } from "react";

import { Label, LabelProps } from "./Label";
import { cn } from "#utils";

type FooterProps = React.ComponentPropsWithoutRef<typeof Label>;

const Footer = forwardRef<HTMLDivElement, LabelProps>(({ children, className, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      className={cn("-mx-1 -my-1.5 mt-2 rounded-b-lg px-3.5 py-1.5 font-normal", className)}
      {...props}
    >
      {children}
    </Label>
  )
})

export { Footer };

export type { FooterProps };
