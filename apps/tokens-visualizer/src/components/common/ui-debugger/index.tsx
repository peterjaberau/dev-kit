import React, {
  forwardRef,
  isValidElement,
  cloneElement,
  ReactElement,
} from "react";
import { Box, Badge } from "@chakra-ui/react";

type UIDebuggerProps = {
  enable?: boolean;
  label?: string;
  children: React.ReactNode;
};

export const UIDebugger = forwardRef<HTMLDivElement, UIDebuggerProps>(
  ({ enable = false, label, children, ...props }, ref) => {
    if (!enable) return <>{children}</>;

    const count = React.Children.count(children);

    // ✅ CASE A: Single valid React element — clone and inject overlay + badge
    if (count === 1 && isValidElement(children)) {
      const childEl = children as ReactElement<any>;

      const existingStyle = childEl.props?.style ?? {};
      const newStyle = {
        ...existingStyle,
        position: existingStyle.position ?? "relative",
        zIndex: existingStyle.zIndex ?? 0,
      };

      // 🔹 Overlay border
      const overlay = (
        <Box
          pointerEvents="none"
          position="absolute"
          inset={0}
          border="1px dashed"
          borderColor="blue.400"
          borderRadius="sm"
          zIndex={9999}
        />
      );

      // 🔹 Optional badge
      const debugBadge = label ? (
        <Badge
          position="absolute"
          top="0"
          left="0"
          borderBottomRightRadius="md"
          fontSize="xs"
          colorScheme="blue"
          zIndex={10000}
          pointerEvents="none"
        >
          {label}
        </Badge>
      ) : null;

      return cloneElement(
        childEl,
        { style: newStyle },
        <>
          {childEl.props.children}
          {overlay}
          {debugBadge}
        </>
      );
    }

    // ✅ CASE B: Multiple children or primitives — safe fallback
    return (
      <Box position="relative" ref={ref} {...props}>
        {children}

        <Box
          pointerEvents="none"
          position="absolute"
          inset={0}
          border="1px dashed"
          borderColor="blue.400"
          borderRadius="sm"
          zIndex={9999}
        />
        {label && (
          <Badge
            position="absolute"
            top="0"
            left="0"
            borderBottomRightRadius="md"
            fontSize="xs"
            colorScheme="blue"
            zIndex={10000}
            pointerEvents="none"
          >
            {label}
          </Badge>
        )}
      </Box>
    );
  }
);


