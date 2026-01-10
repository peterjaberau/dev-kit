import clsx from "clsx";
import { CSSProperties, forwardRef, HTMLAttributes } from "react";

import "../../../styles/DndKitTree.css";

export type Props = HTMLAttributes<HTMLButtonElement> & {
  cursor?: string;
};

export const Action = forwardRef<HTMLButtonElement, Props>(({ cursor, ...props }, ref) => {
  return (
    <button
      ref={ref}
      tabIndex={0}
      {...props}
      className={clsx("itemAction", props.className)}
      style={{ ...props.style, "--cursor": cursor || "pointer" } as CSSProperties}
    />
  )
});

Action.displayName = "Action";
