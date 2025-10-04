import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  IconButton,
  List,
  ListItem,
  useTheme,
  Icon,
} from '@chakra-ui/react';
import { LuX as CloseIcon } from 'react-icons/lu';

// --- Placeholder/Mock Data and Types ---
// NOTE: Replace these with your actual imports and types.
const SIDEBAR_WIDTH = 300; // Mock value for SIDEBAR_WIDTH
type StringMatchDictionaryItem = {
  value: string;
  type: 'component' | 'token' | 'orphan-category';
};

const COLOR_ORPHAN_CATEGORY_NODE = 'rgb(0, 140, 186)';
const COLOR_COMPONENT_NODE = 'rgb(208, 208, 208)';
const COLOR_TOKEN_NODE = 'rgb(211, 65, 213)';

interface StvtTabsProps {
  dictionary: StringMatchDictionaryItem[];
  selectedTokens: string[];
  selectedComponents: string[];
  onCloseTab: (itemId: string) => void;
  onCloseAllTabs: () => void;
}


const TypeIcon: React.FC<{ type: string }> = ({ type }) => {
  let color = 'gray.700';
  let iconUrl = ''; // Placeholder for custom SVGs

  switch (type) {
    case 'component':
      color = COLOR_COMPONENT_NODE;
      iconUrl = './Smock_Note_18_N.svg';
      break;
    case 'orphan-category':
      color = COLOR_ORPHAN_CATEGORY_NODE;
      iconUrl = './Smock_Selection_18_N.svg';
      break;
    case 'token':
      color = COLOR_TOKEN_NODE;
      iconUrl = './Smock_Label_18_N.svg';
      break;
    default:
      color = 'gray.500';
  }

  // Mimicking the mask styling with a background image for full control
  return (
    <Box
      as="i"
      position="absolute"
      display="block"
      top="3px"
      left="4px"
      width="18px"
      height="18px"
      opacity="0.6"
      bg={color}
      // Using an external URL for the mask image, assuming they are accessible
      sx={{
        maskImage: `url(${iconUrl})`,
        maskSize: '75%',
        maskRepeat: 'no-repeat',
        maskPosition: 'center center',
      }}
    />
  );
};

/**
 * A tab bar component for selected graph nodes using Chakra UI.
 */
export const StvtTabs: React.FC<StvtTabsProps> = ({
                                                    dictionary,
                                                    selectedTokens,
                                                    selectedComponents,
                                                    onCloseTab,
                                                    onCloseAllTabs,
                                                  }) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  // --- State & Logic (Replacing properties and willUpdate) ---

  // 1. Map dictionary to a quick lookup object
  const graphNodeTypeLookup = useMemo(() => {
    return dictionary.reduce((acc, item) => {
      acc[item.value] = item.type;
      return acc;
    }, {} as { [nodeId: string]: string });
  }, [dictionary]);

  // 2. Combine selected items for rendering
  const tabItems = useMemo(() => {
    return [...selectedComponents, ...selectedTokens];
  }, [selectedComponents, selectedTokens]);

  const tabCount = tabItems.length;

  // --- Event Handlers (Replacing class methods) ---

  // Custom horizontal scrolling using mouse wheel (from handleWheelEvents)
  const handleWheelEvents = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (tabsRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      tabsRef.current.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, []);

  // Close tab handler (from handleCloseTabClick)
  const handleCloseTabClick = useCallback(
    (label: string) => {
      onCloseTab(label); // Use callback prop
    },
    [onCloseTab],
  );

  // Deselect all handler (from handleDeselectAll)
  const handleDeselectAll = useCallback(() => {
    onCloseAllTabs(); // Use callback prop
  }, [onCloseAllTabs]);

  // --- Render Functions ---

  const renderTabItem = useCallback(
    (itemId: string) => {
      const type = graphNodeTypeLookup[itemId] || 'unknown';

      return (
        <ListItem
          key={itemId}
          position="relative"
          display="inline-block"
          // Apply custom Li styling from original CSS
          bg="gray.50"
          borderRadius="3px"
          boxShadow="0 0 0 1px var(--chakra-colors-gray-200)"
          height="24px"
          color="gray.600"
          fontSize="12px"
          lineHeight="24px"
          whiteSpace="nowrap"
          p="0 34px 0 26px"
          userSelect="none"
          // Hover state for the entire list item
          _hover={{
            // This is just to make the button visible on hover, which is managed by the button's visibility below
          }}
        >
          {/* Node Type Icon */}
          <TypeIcon type={type} />

          {/* Item Label */}
          {itemId}

          {/* Close Button */}
          <IconButton
            aria-label={`Close tab for ${itemId}`}
            icon={<CloseIcon w="8px" h="8px" color="gray.800" />}
            size="xs"
            isRound={false}
            variant="ghost" // Use ghost variant for a quiet look
            position="absolute"
            top="3px"
            right="3px"
            w="18px"
            h="18px"
            p="0"
            minWidth="0" // Override default min-width for size="xs"
            onClick={() => handleCloseTabClick(itemId)}
            // Custom hover/active styles for the button
            _hover={{
              bg: 'gray.100', // Map spectrum-gray-100
            }}
            _active={{
              bg: 'gray.200', // Map spectrum-gray-200
            }}
            // Mimic the original Li:hover button visibility with opacity,
            // as direct CSS visibility control on the sibling is difficult
            opacity={{ base: 0.5, 'li:hover &': 1 }}
            _groupHover={{ opacity: 1 }} // Needs to be wrapped in a <Box role="group"> for true fidelity
            visibility={{ base: 'hidden', 'li:hover &': 'visible' }} // Better to control visibility with opacity if button is always mounted
          />
        </ListItem>
      );
    },
    [graphNodeTypeLookup, handleCloseTabClick],
  );

  // --- Main Render ---
  return (
    <Box position="relative" display="block" width="100%">
      <Flex
        ref={tabsRef}
        id="tab-scroller"
        className="tabs"
        position="absolute"
        top="0"
        left={`${SIDEBAR_WIDTH}px`}
        right="0"
        height="55px"
        bg="gray.100" // Map spectrum-gray-100
        zIndex="docked" // High z-index for z-index: 0
        boxShadow="0px -3px 8px var(--chakra-colors-gray-50)" // Mimic original box-shadow
        overflowX="auto"
        overflowY="hidden"
        alignItems="center"
        gap="20px"
        color="gray.900"
        onWheel={handleWheelEvents} // Custom wheel scrolling handler
        // Custom scrollbar styling (Webkit) via sx prop
        sx={{
          '&::-webkit-scrollbar': {
            height: '1px',
            backgroundColor: 'gray.100',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray.400',
            outline: '0px',
          },
          // Custom scrollbar styling (Firefox)
          scrollbarWidth: 'thin',
          scrollbarColor: '#404040 #303030',
        }}
      >
        <Text as="label" paddingLeft="30px" whiteSpace="nowrap">
          Selected:
        </Text>

        {tabCount === 0 && (
          <Text color="gray.600" fontStyle="italic" whiteSpace="nowrap">
            none
          </Text>
        )}

        {/* List of Tab Items */}
        <List as={HStack} spacing="10px" p="0" m="0" flexShrink={0}>
          {tabItems.map(renderTabItem)}
        </List>

        {/* Deselect All Button (Tabs Endcap) */}
        {tabCount > 3 && (
          <Flex
            className="tabs-endcap"
            alignItems="center"
            justifyContent="center"
            p="0 10px"
            flexShrink={0} // Ensure the button stays visible on the right
            ml="auto" // Push to the right
          >
            <Button
              onClick={handleDeselectAll}
              size="xs"
              variant="ghost" // Equivalent to Spectrum's 'quiet' action button
              colorScheme="gray"
            >
              Deselect All
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
