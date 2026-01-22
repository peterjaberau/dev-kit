import { forwardRef } from "react";

import { Label, LabelProps } from "./Label"
import { cn } from "#utils";

type SectionLabelProps = React.ComponentPropsWithoutRef<typeof Label>;

const SectionLabel = forwardRef<HTMLDivElement, LabelProps>(({ children, className, ...props }, ref) => {
  return (
    <Label ref={ref} className={cn("-ml-1 px-3 py-1 text-left", className)} {...props}>
      {children}
    </Label>
  )
})

export { SectionLabel };

export type { SectionLabelProps };
