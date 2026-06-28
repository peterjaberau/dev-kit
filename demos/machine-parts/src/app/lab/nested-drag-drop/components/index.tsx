import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import {
  Accordion,
  Box,
  Card,
  HStack,
  Icon,
  IconButton,
  Menu,
  mergeRefs,
  Portal,
  Text,
} from '@chakra-ui/react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  GripVertical,
  MoreVertical,
} from 'lucide-react';
import { type DraggablePanelProps, type Tree } from "./types"
import { initialData } from './data'
import { EXPAND_ON_HOVER_TIME } from './constants'
import {
  moveItem,
  getDescendantIds,
} from './utils'
import { useNodeItemDragAndDrop } from "./drag-and-drop/use-node-item-drag-and-drop"
import { useNestedTreeDropMonitor } from "./drag-and-drop/use-nested-tree-drop-monitor"


const DraggablePanel = memo(function DraggablePanel({
  children,
  id,
  index,
  isBlocked,
  level = 0,
  title,
  activeId,
  setActiveId,
  onMove,
  isFirst,
  isLast,
}: DraggablePanelProps) {
  const expandTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const buttonId = `${id}-button`;

  const [isExpanded, setIsExpanded] = useState(true);

  const hasChildren = useMemo(() => {
    return !!children?.length;
  }, [children]);

  const dragAndDropConfig = useMemo<
    Parameters<typeof useNodeItemDragAndDrop>[0]
  >(
    () => ({
      draggable: {
        getInitialData: () => ({
          id,
          index,
          descendantIds: getDescendantIds({ id, children, title }),
        }),
        getDragPreviewPieces: () => ({
          elemBefore: <GripVertical size={16} />,
          content: (
            <Text as="span" textStyle="sm" fontWeight="medium">
              {title}
            </Text>
          ),
        }),
      },
      dropTarget: {
        getData: () => ({ id, index, level }),
        getOperations: () => ({
          combine: isBlocked ? 'not-available' : 'available',
          'reorder-before': 'available',
          'reorder-after': 'available',
        }),
        canDrop: ({ source }) => {
          const descendantIds = source.data.descendantIds as string[];
          return !descendantIds.includes(id);
        },
      },
    }),
    [children, id, index, isBlocked, level, title]
  );

  const dragAndDrop = useNodeItemDragAndDrop(dragAndDropConfig);

  const instruction =
    dragAndDrop.state.type === 'is-over' ? dragAndDrop.state.instruction : null;

  const cancelExpand = useCallback(() => {
    clearTimeout(expandTimeout.current);
    expandTimeout.current = undefined;
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;

    const getTreeItems = () => {
      const tree = target.closest('[data-list]');
      if (!tree) return [];
      return Array.from(
        tree.querySelectorAll<HTMLElement>('[data-item]')
      ).filter((el) => !el.closest('[inert]'));
    };

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const treeItems = getTreeItems();
        const currentIndex = treeItems.indexOf(target);
        const next = treeItems[currentIndex + 1];
        next?.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const treeItems = getTreeItems();
        const currentIndex = treeItems.indexOf(target);
        const prev = treeItems[currentIndex - 1];
        prev?.focus();
        break;
      }
      case 'Home': {
        e.preventDefault();
        const treeItems = getTreeItems();
        treeItems[0]?.focus();
        break;
      }
      case 'End': {
        e.preventDefault();
        const treeItems = getTreeItems();
        treeItems[treeItems.length - 1]?.focus();
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        if (hasChildren) {
          if (!isExpanded) {
            setIsExpanded(true);
          } else {
            const treeItems = getTreeItems();
            const currentIndex = treeItems.indexOf(target);
            const next = treeItems[currentIndex + 1];
            next?.focus();
          }
        }
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        if (hasChildren && isExpanded) {
          setIsExpanded(false);
        } else {
          const parentList = target.closest('ul[data-group]');
          const parentId = parentList?.getAttribute('aria-labelledby');
          if (parentId) {
            const parentEl = document.getElementById(parentId);
            parentEl?.focus();
          }
        }
        break;
      }
    }
  };

  /*
   * Auto-expand accordion on having dropped an element.
   */
  useEffect(() => {
    if (hasChildren) setIsExpanded(true);
  }, [hasChildren]);

  useEffect(() => {
    const isNesting = instruction?.operation === 'combine';

    if (isNesting && hasChildren && !isExpanded && !expandTimeout.current) {
      expandTimeout.current = setTimeout(() => {
        setIsExpanded(true);
        expandTimeout.current = undefined;
      }, EXPAND_ON_HOVER_TIME);
    } else if (!isNesting) {
      cancelExpand();
    }
  }, [cancelExpand, hasChildren, instruction?.operation, isExpanded]);

  useEffect(() => cancelExpand, [cancelExpand]);

  return (
    <Box as="li" position="relative" listStyleType="none">
      {instruction?.operation === "reorder-before" && dragAndDrop.dropIndicator}
      {/*{dragAndDrop.dropIndicator}*/}
      {dragAndDrop.dragPreview}
      <Card.Root
        ref={mergeRefs(dragAndDrop.draggableAnchorRef, dragAndDrop.dropTargetRef)}
        size="sm"
        variant={level % 2 ? "outline" : "subtle"}
        borderColor={instruction?.operation === "combine" ? "teal.solid" : "border"}
        boxShadow={instruction?.operation === "combine" ? "inset 0 0 0 1px var(--chakra-colors-teal-solid)" : "none"}
        overflow="visible"
        transition="border-color 120ms ease, box-shadow 120ms ease"
      >
        <Accordion.Root
          collapsible
          value={hasChildren && isExpanded ? [id] : []}
          onValueChange={(details) => {
            if (hasChildren) setIsExpanded(details.value.includes(id))
          }}
        >
          <Accordion.Item value={id} borderBottomWidth="0">
            <HStack gap="1" px="2" py="1.5">
              <Accordion.ItemTrigger
                ref={dragAndDrop.draggableButtonRef}
                id={buttonId}
                data-item
                onKeyDown={handleKeyDown}
                tabIndex={activeId === id ? 0 : -1}
                onFocus={() => setActiveId(id)}
                flex="1"
                minW="0"
                p="1"
                borderRadius="md"
                _hover={{
                  bg: "bg.muted",
                  "& .drag-handle": { color: "fg" },
                }}
              >
                <HStack gap="1.5" minW="0" flex="1">
                  <Icon className="drag-handle" color="fg.muted" boxSize="4" flexShrink="0">
                    <GripVertical />
                  </Icon>
                  {hasChildren ? (
                    <Icon color="fg.muted" boxSize="4" flexShrink="0">
                      {isExpanded ? <ChevronDown /> : <ChevronRight />}
                    </Icon>
                  ) : (
                    <Box boxSize="4" flexShrink="0" />
                  )}
                  <Text as="span" textStyle="sm" fontWeight="medium" truncate>
                    {title}
                  </Text>
                </HStack>
              </Accordion.ItemTrigger>

              <Menu.Root positioning={{ placement: "bottom-end" }}>
                <Menu.Trigger asChild>
                  <IconButton aria-label="More actions" variant="ghost" size="xs">
                    <MoreVertical />
                  </IconButton>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content minW="36">
                      <Menu.Item value="move-up" disabled={isFirst} onSelect={() => onMove(id, "up")}>
                        <ChevronUp />
                        Move up
                      </Menu.Item>
                      <Menu.Item value="move-down" disabled={isLast} onSelect={() => onMove(id, "down")}>
                        <ChevronDown />
                        Move down
                      </Menu.Item>
                      <Menu.Separator />
                      <Menu.Item value="indent" disabled={isFirst} onSelect={() => onMove(id, "indent")}>
                        <ChevronRight />
                        Indent
                      </Menu.Item>
                      <Menu.Item value="outdent" disabled={level === 0} onSelect={() => onMove(id, "outdent")}>
                        <ChevronLeft />
                        Outdent
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </HStack>

            {hasChildren && (
              <Accordion.ItemContent overflow="visible">
                <Accordion.ItemBody px="3" pt="2" pb="3">
                  <Box
                    as="ul"
                    aria-labelledby={buttonId}
                    data-group
                    display="flex"
                    flexDirection="column"
                    gap="2"
                    listStyleType="none"
                    m="0"
                    p="0"
                  >
                    {children?.map((child, index) => (
                      <DraggablePanel
                        key={child.id}
                        index={index}
                        level={level + 1}
                        activeId={activeId}
                        setActiveId={setActiveId}
                        onMove={onMove}
                        isFirst={index === 0}
                        isLast={index === (children || []).length - 1}
                        {...child}
                      />
                    ))}
                  </Box>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            )}
          </Accordion.Item>
        </Accordion.Root>
      </Card.Root>
      {instruction?.operation === "reorder-after" && dragAndDrop.dropIndicator}
    </Box>
  )
});

export function NestedDragDropDemo() {
  const [items, setItems] = useState<Tree>(initialData);
  const [activeId, setActiveId] = useState<string>(initialData[0]!.id);

  useNestedTreeDropMonitor({ setItems });

  const handleMove = (
    id: string,
    direction: 'up' | 'down' | 'indent' | 'outdent'
  ) => {
    setItems((items) => moveItem(items, id, direction));
  };

  return items.map((item, index) => (
    <DraggablePanel
      key={item.id}
      index={index}
      activeId={activeId}
      setActiveId={setActiveId}
      onMove={handleMove}
      isFirst={index === 0}
      isLast={index === items.length - 1}
      {...item}
    />
  ))
}

export default NestedDragDropDemo;
