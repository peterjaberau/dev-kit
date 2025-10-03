import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  List,
  ListItem,
  VStack,
  Text,
  ThemingProps,
  Icon,
  useTheme,
  forwardRef,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

// --- Placeholder/Mock Data and Imports ---
// NOTE: Replace these with your actual imports and types.
// We are simulating the types and constants from the original code.

// Mock types for worker communication
type GraphState = any;
type GraphModel = { DEFAULT_STATE: any };
const GraphModel = { DEFAULT_STATE: {} } as GraphModel;

type StringMatchDictionaryItem = { id: string; name: string };
type StringMatchSearchResult = {
  value: string;
  matchMarkup: string; // HTML string with <span> for highlights
  type: 'component' | 'token' | 'orphan-category';
};

// Mock the web worker
class MockStringMatchWorker extends Worker {
  constructor() {
    super(new URL('./mock-worker.js', import.meta.url));
  }
}
const StringMatchWorker = MockStringMatchWorker;

// Mock dispatchCustomEvent
const dispatchCustomEvent = (target: any, name: string, detail: any) => {
  console.log(`Dispatching event: ${name} with detail:`, detail);
  // In a real React app, this would be an `onSelectId` prop.
};

// Colors from original LitElement CSS
const COLOR_ORPHAN_CATEGORY_NODE = 'rgb(0, 140, 186)';
const COLOR_COMPONENT_NODE = 'rgb(208, 208, 208)';
const COLOR_TOKEN_NODE = 'rgb(211, 65, 213)';

// --- Component Props ---
interface StvtSearchProps {
  // graphState?: GraphState; // Not used directly in render/worker logic, removed for brevity
  dictionary?: StringMatchDictionaryItem[];
  // Callback for when a result is selected
  onSelectId: (id: string) => void;
}

// --- Icon Mapping Helper ---
// Since the original component used SVG masks, we'll use simple Chakra Icons or custom SVGs.
// For simplicity, we'll map the type to a generic icon and use the color.
const TypeIcon: React.FC<{
  type: StringMatchSearchResult['type'];
}> = ({ type }) => {
  let color = 'gray.700';
  let maskImage = ''; // Not used directly in Chakra, but we'll use CSS properties if needed

  switch (type) {
    case 'component':
      color = COLOR_COMPONENT_NODE;
      // maskImage = 'url("./Smock_Note_18_N.svg")'; // Placeholder for custom SVG
      break;
    case 'orphan-category':
      color = COLOR_ORPHAN_CATEGORY_NODE;
      // maskImage = 'url("./Smock_Selection_18_N.svg")';
      break;
    case 'token':
      color = COLOR_TOKEN_NODE;
      // maskImage = 'url("./Smock_Label_18_N.svg")';
      break;
  }

  // Chakra's Icon component is used for simplicity.
  // For precise replication of the original SVG icons, you'd import and use a custom React component.
  return (
    <Icon
      viewBox="0 0 24 24"
      w="18px"
      h="18px"
      color={color}
      // Mimic the mask styling with a simple circle or other shape
    >
      <circle cx="12" cy="12" r="8" fill="currentColor" />
    </Icon>
  );
};

/**
 * React Component for Search functionality with a dropdown list.
 */
export const StvtSearch: React.FC<StvtSearchProps> = ({
                                                        dictionary = [],
                                                        onSelectId,
                                                      }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
    StringMatchSearchResult[]
  >([]);
  const [targetIndex, setTargetIndex] = useState(0);
  const [isListVisible, setIsListVisible] = useState(false);

  const workerRef = useRef<Worker | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // --- Worker Setup and Communication ---
  useEffect(() => {
    // 1. Initialize worker
    const worker = new StringMatchWorker();
    workerRef.current = worker;

    // 2. Worker message handler
    worker.onmessage = (event: MessageEvent<StringMatchSearchResult[]>) => {
      // Lit's handleStringMatchWorkerResponse logic
      setTargetIndex(0);
      setSearchResults(event.data);
    };

    // 3. Cleanup on unmount
    return () => {
      worker.terminate();
    };
  }, []);

  // --- Prop/State Change to Worker Communication (Replacing willUpdate) ---
  useEffect(() => {
    // Post dictionary to worker when it changes
    if (dictionary.length > 0) {
      workerRef.current?.postMessage({
        name: 'set-dictionary',
        value: dictionary,
      });
      // Re-run search after setting the dictionary
      workerRef.current?.postMessage({
        name: 'find-matches',
        value: searchQuery,
      });
    }
  }, [dictionary, searchQuery]);

  useEffect(() => {
    // Post search query to worker when it changes
    workerRef.current?.postMessage({
      name: 'find-matches',
      value: searchQuery,
    });

    // Control list visibility
    setIsListVisible(searchQuery.length > 0 && searchResults.length > 0);
  }, [searchQuery, searchResults.length]);


  // --- Selection Logic ---
  const selectItemAtIndex = useCallback(
    (index: number) => {
      const searchResult = searchResults[index];
      if (!searchResult) return;

      // Lit's selectItemAtIndex logic
      setSearchQuery(''); // Clear search query
      searchInputRef.current?.blur(); // Blur the input
      searchInputRef.current!.value = ''; // Ensure the input visually clears immediately
      setTargetIndex(0);
      setSearchResults([]);
      onSelectId(searchResult.value); // Use the prop callback
    },
    [searchResults, onSelectId],
  );

  const handleItemClick = useCallback(
    (index: number) => {
      selectItemAtIndex(index);
    },
    [selectItemAtIndex],
  );

  // --- Keyboard Navigation Logic ---
  const setNewTargetIndex = useCallback(
    (newIndex: number) => {
      setTargetIndex(newIndex);

      // Scroll list container to target item (Lit's setNewTargetIndex logic)
      const listContainer = listContainerRef.current;
      if (!listContainer) return;

      const listItem = listContainer.querySelector<HTMLElement>(
        `#search-result-${newIndex}`,
      );
      if (!listItem) return;

      const listItemHeight = listItem.offsetHeight;
      const containerHeight = listContainer.offsetHeight;
      const topEdge = listContainer.scrollTop;
      const bottomEdge = topEdge + containerHeight;
      const position = listItem.offsetTop;

      if (position < topEdge) {
        listContainer.scrollTop = position;
      } else if (position > bottomEdge - listItemHeight) {
        listContainer.scrollTop = position + listItemHeight - containerHeight;
      }
    },
    [],
  );

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Only handle keydown if the search results list is visible
      if (searchResults.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          e.stopPropagation();
          let downIndex = targetIndex + 1;
          if (searchResults.length <= downIndex) {
            downIndex = 0;
          }
          setNewTargetIndex(downIndex);
          break;
        case 'ArrowUp':
          e.preventDefault();
          e.stopPropagation();
          let upIndex = targetIndex - 1;
          if (upIndex < 0) {
            upIndex = searchResults.length - 1;
          }
          setNewTargetIndex(upIndex);
          break;
        case 'Enter':
          e.preventDefault();
          selectItemAtIndex(targetIndex);
          break;
        case 'Escape':
          e.preventDefault();
          searchInputRef.current?.blur();
          setSearchQuery('');
          setSearchResults([]);
          break;
      }
    },
    [searchResults, targetIndex, setNewTargetIndex, selectItemAtIndex],
  );

  // --- Helper to render HTML from string (unsafeHTML replacement) ---
  const UnsafeHtmlRenderer: React.FC<{ html: string }> = ({ html }) => {
    // Chakra's 'dangerouslySetInnerHTML' is the React/Chakra equivalent to Lit's 'unsafeHTML'
    const theme = useTheme();
    return (
      <Text
        as="span"
        dangerouslySetInnerHTML={{ __html: html }}
        sx={{
          // Apply the highlight style from the original CSS
          'span': {
            color: theme.colors.yellow[500], // Map original spectrum yellow
            fontWeight: 'bold',
          },
        }}
      />
    );
  };

  // --- Render Search Results List ---
  const renderResultsList = useMemo(() => {
    if (searchResults.length === 0) {
      return (
        <ListItem
          p="4px 8px 4px 30px"
          color="gray.500"
          fontSize="12px"
          lineHeight="16px"
          background="gray.100" // selected style for "No matching results"
          borderRadius="3px"
        >
          No matching results
        </ListItem>
      );
    }

    return searchResults.map((item, index) => (
      <ListItem
        key={item.value}
        id={`search-result-${index}`}
        position="relative"
        p="4px 8px 4px 30px"
        fontSize="12px"
        color="gray.500"
        lineHeight="16px"
        cursor="pointer"
        onClick={() => handleItemClick(index)}
        // Mimic the :hover and [selected] styles with Chakra's styling props
        _hover={{ background: 'gray.100', borderRadius: '3px' }}
        bg={index === targetIndex ? 'gray.100' : 'transparent'}
        color={index === targetIndex ? 'gray.900' : 'gray.500'}
        borderRadius={index === targetIndex ? '3px' : '0'}
      >
        <Box
          as="i"
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          top="4px"
          left="6px"
          width="18px"
          height="18px"
        >
          <TypeIcon type={item.type} />
        </Box>
        <UnsafeHtmlRenderer html={item.matchMarkup} />
      </ListItem>
    ));
  }, [searchResults, targetIndex, handleItemClick]);

  // --- Main Render ---
  return (
    <Box
      position="relative"
      display="block"
      width="100%"
      // Max-width from original CSS
      // maxWidth="400px" // Optional
    >
      <InputGroup width="100%" size="md">
        <Input
          ref={searchInputRef}
          id="search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (searchResults.length > 0) setIsListVisible(true);
          }}
          onBlur={() =>
            // Defer hiding the list slightly so click events on list items register
            setTimeout(() => setIsListVisible(false), 100)
          }
          onKeyDown={handleKeydown}
          pr="4.5rem" // Space for the close button
        />
        <InputRightElement width="4.5rem">
          <IconButton
            aria-label="Clear search"
            icon={<CloseIcon />}
            size="sm"
            onClick={() => {
              setSearchQuery('');
              searchInputRef.current?.focus();
            }}
            visibility={searchQuery.length > 0 ? 'visible' : 'hidden'}
          />
          <SearchIcon ml={2} color="gray.500" />
        </InputRightElement>
      </InputGroup>

      {/* The Search Results Dropdown List */}
      <Box
        ref={listContainerRef}
        className="list" // Use class for the key CSS selector
        id="list-container"
        display={isListVisible && searchResults.length > 0 ? 'block' : 'none'}
        position="absolute"
        left="0px"
        top="110%" // Equivalent to original 110% position
        width="400px"
        marginTop="1px"
        maxHeight="300px"
        bg="gray.50" // Map spectrum-gray-50
        overflow="auto"
        zIndex="dropdown" // Ensure the list is on top
        boxShadow="inset 0 0 0 1px var(--chakra-colors-gray-200), 0px 3px 6px rgba(0, 0, 0, 0.1)" // Mimic original box-shadow
        fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
        borderRadius="5px"
      >
        <List p="10px" spacing={0}>
          {renderResultsList}
        </List>
      </Box>
    </Box>
  );
};
