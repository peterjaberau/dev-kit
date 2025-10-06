"use client"
import {
  Container,
  For,
  Center,
  SimpleGrid,
  HStack,
  Stack,
  Button,
  Text,
  GridItem,
  DataList,
  Card,
  Flex,
  Box,
  Tag,
  Badge,
  ScrollArea,
  IconButton,
} from "@chakra-ui/react"
import { LuBug } from "react-icons/lu"
import { searchSelector } from "#actors/selectors"
import { SearchPanel } from "./components"
import { useState, forwardRef, cloneElement, isValidElement, ReactNode, ReactElement, Children } from "react"
import { UIDebugger } from '#components/common/ui-debugger'
import { GraphController } from "#controllers/graph-controller";
import { GraphModel, GraphState } from "#models/graph-model";
import { AppController } from "#controllers/app-controller"


type DebuggerContainerProps = {
  uiDebugger?: boolean;
  label?: string;
  children: ReactNode;
};

const DebuggerContainer = forwardRef<HTMLDivElement, DebuggerContainerProps>(
  ({ uiDebugger = false, label, children, ...props }, ref) => {
    if (!uiDebugger) return <>{children}</>;

    const count = Children.count(children);

    // Case A: single valid React element — clone it and inject overlay as a child
    if (count === 1 && isValidElement(children)) {
      // Narrow and cast so TS knows `props` exist
      const childEl = children as ReactElement<any>;

      // Preserve existing inline style but ensure it has a positioning context
      const existingStyle = childEl.props?.style ?? {};
      const newStyle = {
        ...existingStyle,
        // don't overwrite an explicit position
        position: existingStyle.position ?? "relative",
        zIndex: existingStyle.zIndex ?? 0,
      };

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

      const labeled = label ? (
        <Box
          pointerEvents="none"
          position="absolute"
          top={0}
          left={0}
          px={1}
          fontSize="xs"
          bg="blue.400"
          color="white"
          borderBottomRightRadius="sm"
          zIndex={10000}
        >
          {label}
        </Box>
      ) : null;

      // Inject overlay (and optional label) as last children of the cloned element.
      // This keeps the debug DOM inside the element itself, so layout and scroll stay intact.
      return cloneElement(
        childEl,
        { style: newStyle },
        <>
          {childEl.props.children}
          {overlay}
          {labeled}
        </>
      );
    }

    // Case B: multiple children or primitives — use a wrapper (may affect layout)
    // This is the fallback; usually ScrollArea.Root is a single element, so you won't hit this.
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
          <Box
            pointerEvents="none"
            position="absolute"
            top={0}
            left={0}
            px={1}
            fontSize="xs"
            bg="blue.400"
            color="white"
            borderBottomRightRadius="sm"
            zIndex={10000}
          >
            {label}
          </Box>
        )}
      </Box>
    );
  }
);

DebuggerContainer.displayName = "DebuggerContainer";

export default function Page() {
  const { searchQuery, searchResults, searchCount, selected } = searchSelector()
  const [uiDebugger, setUiDebugger]: any = useState(false)

  return (
    <Container fluid css={{ h: "100vh", p: 8 }}>
      <IconButton
        size="md"
        boxShadow="md"
        position="absolute"
        borderRadius={"full"}
        bottom="5"
        right="5"
        zIndex={1000}
        onClick={() => setUiDebugger(!uiDebugger)}
      >
        <LuBug />
      </IconButton>
      <HStack alignItems="flex-start" css={{ h: "full", overflow: "hidden" }}>
        <UIDebugger enable={uiDebugger} label='ScrollArea'>
          <ScrollArea.Root data-id="main-left-panel" css={{ h: "full", w: 350, minW: 250, maxW: 500 }}>
            <ScrollArea.Viewport>
              <ScrollArea.Content asChild>
                <UIDebugger enable={uiDebugger}>
                  <Stack gap={4} css={{ p: 4 }}>
                    <SearchPanel />
                    <Card.Root css={{ boxShadow: "sm", borderRadius: "md" }}>
                      <Card.Header>
                        <Card.Title>title</Card.Title>
                        <Card.Description>description </Card.Description>
                      </Card.Header>

                      <Card.Body>
                        <UIDebugger enable={uiDebugger}>
                          <Stack gap="4">test</Stack>
                        </UIDebugger>
                      </Card.Body>
                    </Card.Root>
                  </Stack>
                </UIDebugger>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
        </UIDebugger>

        <UIDebugger enable={uiDebugger} >
          <ScrollArea.Root data-id="main-content-panel" css={{ flex: 1, h: "full" }}>
            <ScrollArea.Viewport>
              <ScrollArea.Content asChild>
                  <Stack gap={4} css={{ p: 4 }} >








                    {/*<UIDebugger enable={uiDebugger} >*/}
                    {/*<DocPreview />*/}
                    {/*</UIDebugger>*/}
                  </Stack>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
        </UIDebugger>
      </HStack>
    </Container>
  )
}
