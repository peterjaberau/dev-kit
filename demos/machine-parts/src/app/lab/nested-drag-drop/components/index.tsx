import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  attachInstruction,
  extractInstruction,
  type Instruction,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"
import {
  Accordion,
  Box,
  Card,
  HStack,
  Icon,
  IconButton,
  Menu,
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
import { Tree, TreeItem, LineIndicatorProps, DraggablePanelProps } from "./types"
import { initialData } from './data'
import { EXPAND_ON_HOVER_TIME } from './constants'
import { findNodeLocation, findItem, removeItem, insertChild, insertBefore, insertAfter, moveItem, getDescendantIds } from './utils'







const LineIndicator = ({ position }: LineIndicatorProps) => {
  return (
    <Box
      position="absolute"
      insetX="0"
      top={position === 'top' ? '-2' : 'auto'}
      bottom={position === 'bottom' ? '-2' : 'auto'}
      h="0.5"
      bg="teal.solid"
      borderRadius="full"
      pointerEvents="none"
      transform={position === 'top' ? 'translateY(-50%)' : 'translateY(50%)'}
      zIndex="1"
    />
  );
};



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
  const ref = useRef<HTMLDivElement | null>(null);
  const expandTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const buttonId = `${id}-button`;

  const [isExpanded, setIsExpanded] = useState(true);
  const [instruction, setInstruction] = useState<Instruction | null>(null);

  const hasChildren = useMemo(() => {
    return !!children?.length;
  }, [children]);

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
    const el = ref.current;
    if (!el) return;

    const cancelExpand = () => {
      clearTimeout(expandTimeout.current);
      expandTimeout.current = undefined;
    };

    const reset = () => {
      setInstruction(null);
      cancelExpand();
    };

    /*
     * `draggable` enables the dragging of an element.
     * See: https://atlassian.design/components/pragmatic-drag-and-drop/core-package/adapters/element/about#draggable
     *
     * `dropTargetForElements` makes an element a drop target.
     * See: https://atlassian.design/components/pragmatic-drag-and-drop/core-package/adapters/element/about#drop-target-for-elements
     *
     * `combine` is a utility that enables both behaviors.
     * See: https://atlassian.design/components/pragmatic-drag-and-drop/core-package/utilities#combine
     */
    const cleanup = combine(
      draggable({
        element: el,
        getInitialData: () => ({
          id,
          index,
          descendantIds: getDescendantIds({ id, children, title }),
        }),
      }),
      dropTargetForElements({
        element: el,
        getData: ({ input, element }) =>
          attachInstruction(
            { id, index, level },
            {
              input,
              element,
              operations: {
                combine: isBlocked ? 'not-available' : 'available',
                'reorder-before': 'available',
                'reorder-after': 'available',
              },
            }
          ),
        canDrop: ({ source }) => {
          const descendantIds = source.data.descendantIds as string[];
          return !descendantIds.includes(id);
        },
        onDrag: ({ self, location }) => {
          const newInstruction = extractInstruction(self.data);
          const isInnerMost =
            location.current.dropTargets[0]?.element === self.element;
          const isNesting = newInstruction?.operation === 'combine';

          /*
           * When you hover over a deeply nested child, you are technically
           * hovering over its parent and grandparent too. Without this check
           * you would see group and line indicators for the entire tree branch.
           * We only update the `instruction` state if the element is innermost.
           */
          if (isInnerMost) {
            const newInstruction = extractInstruction(self.data);
            setInstruction(newInstruction);

            if (
              isNesting &&
              hasChildren &&
              !isExpanded &&
              !expandTimeout.current
            ) {
              expandTimeout.current = setTimeout(() => {
                setIsExpanded(true);
                expandTimeout.current = undefined;
              }, EXPAND_ON_HOVER_TIME);
            } else if (!isNesting) {
              cancelExpand();
            }
          } else {
            reset();
          }
        },
        onDragLeave: reset,
        onDrop: reset,
      })
    );

    return () => {
      cleanup();
      cancelExpand();
    };
  }, [id, index, children, level, title, isExpanded, isBlocked]);

  return (
    <Box as="li" position="relative" listStyleType="none">
      {instruction?.operation === 'reorder-before' && (
        <LineIndicator position="top" />
      )}
      <Card.Root
        ref={ref}
        size="sm"
        variant={level % 2 ? 'outline' : 'subtle'}
        borderColor={
          instruction?.operation === 'combine' ? 'teal.solid' : 'border'
        }
        boxShadow={
          instruction?.operation === 'combine'
            ? 'inset 0 0 0 1px var(--chakra-colors-teal-solid)'
            : 'none'
        }
        overflow="visible"
        transition="border-color 120ms ease, box-shadow 120ms ease"
      >
        <Accordion.Root
          collapsible
          value={hasChildren && isExpanded ? [id] : []}
          onValueChange={(details) => {
            if (hasChildren) setIsExpanded(details.value.includes(id));
          }}
        >
          <Accordion.Item value={id} borderBottomWidth="0">
            <HStack gap="1" px="2" py="1.5">
              <Accordion.ItemTrigger
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
                  bg: 'bg.muted',
                  '& .drag-handle': { color: 'fg' },
                }}
              >
                <HStack gap="1.5" minW="0" flex="1">
                  <Icon
                    className="drag-handle"
                    color="fg.muted"
                    boxSize="4"
                    flexShrink="0"
                  >
                    <GripVertical />
                  </Icon>
                  {hasChildren ? (
                    <Icon color="fg.muted" boxSize="4" flexShrink="0">
                      {isExpanded ? (
                        <ChevronDown />
                      ) : (
                        <ChevronRight />
                      )}
                    </Icon>
                  ) : (
                    <Box boxSize="4" flexShrink="0" />
                  )}
                  <Text
                    as="span"
                    textStyle="sm"
                    fontWeight="medium"
                    truncate
                  >
                    {title}
                  </Text>
                </HStack>
              </Accordion.ItemTrigger>

              <Menu.Root positioning={{ placement: 'bottom-end' }}>
                <Menu.Trigger asChild>
                  <IconButton
                    aria-label="More actions"
                    variant="ghost"
                    size="xs"
                  >
                    <MoreVertical />
                  </IconButton>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content minW="36">
                      <Menu.Item
                        value="move-up"
                        disabled={isFirst}
                        onSelect={() => onMove(id, 'up')}
                      >
                        <ChevronUp />
                        Move up
                      </Menu.Item>
                      <Menu.Item
                        value="move-down"
                        disabled={isLast}
                        onSelect={() => onMove(id, 'down')}
                      >
                        <ChevronDown />
                        Move down
                      </Menu.Item>
                      <Menu.Separator />
                      <Menu.Item
                        value="indent"
                        disabled={isFirst}
                        onSelect={() => onMove(id, 'indent')}
                      >
                        <ChevronRight />
                        Indent
                      </Menu.Item>
                      <Menu.Item
                        value="outdent"
                        disabled={level === 0}
                        onSelect={() => onMove(id, 'outdent')}
                      >
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
      {instruction?.operation === 'reorder-after' && (
        <LineIndicator position="bottom" />
      )}
    </Box>
  );
});

export function NestedDragDropDemo() {
  const [items, setItems] = useState<Tree>(initialData);
  const [activeId, setActiveId] = useState<string>(initialData[0]!.id);

  useEffect(() => {
    /*
     * Monitors listen to all events for a draggable entity.
     * See: https://atlassian.design/components/pragmatic-drag-and-drop/core-package/monitors
     */
    return monitorForElements({
      onDrop({ source, location }) {
        /**
         * The inner-most drop target. We look from the deepest possible
         * drop target upwards.
         * See: https://atlassian.design/components/pragmatic-drag-and-drop/core-package/drop-targets#nested-drop-targets
         */
        const target = location.current.dropTargets[0];

        if (!target) return;

        const sourceId = source.data.id as string;
        const targetId = target.data.id as string;

        if (sourceId === targetId) return;

        const instruction: Instruction | null = extractInstruction(target.data);

        if (!instruction) return;
        if (instruction.blocked) return;

        const itemToMove = findItem(items, sourceId);
        if (!itemToMove) return;

        let updatedTree = removeItem(items, sourceId);

        /*
         * `@atlaskit/pragmatic-drag-and-drop-hitbox` calculates the user intent.
         * We can get that user intent using `extractInstruction`.
         *
         * The type of operation can be:
         * - `combine` - it means that the user is hovering over the center of a drop target.
         * - `reorder-before` - it means that the user is hovering close to the upper edge of a drop target.
         * - `reorder-after` - it means that the user is hovering close to the lower edge of a drop target.
         *
         * See: https://atlassian.design/components/pragmatic-drag-and-drop/optional-packages/hitbox/about
         */
        if (instruction.operation === 'combine') {
          updatedTree = insertChild(updatedTree, targetId, itemToMove);
        } else if (instruction.operation === 'reorder-before') {
          updatedTree = insertBefore(updatedTree, targetId, itemToMove);
        } else if (instruction.operation === 'reorder-after') {
          updatedTree = insertAfter(updatedTree, targetId, itemToMove);
        }

        setItems(updatedTree);
      },
    });
  }, [items]);

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
