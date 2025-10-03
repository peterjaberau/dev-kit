import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  useTheme,
  Button,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

// --- Constants (Preserved) ---
// NOTE: Replace these with your actual imports from "../layout-consts"
const GRAPH_NODE_WIDTH = 200;
const GRAPH_NODE_VALUE_HEIGHT = 18;
const GRAPH_NODE_VALUE_MARGIN = 2;
const GRAPH_NODE_VALUES_PADDING = 10;

// NOTE: Replace these with your actual imports from "../models/graph-model"
const ValuePathSplitter = '::';
const ValuesListSplitter = '|';

// --- Types ---
type ValueTuple = [value: string, path: string];
type GraphNodeType = 'token' | 'component' | 'orphan-category' | string;

// --- Custom Gesture Hook Abstraction (Replaces Lit's Gesture system) ---
// This hook simulates the event handling needed for drag, click, and single/double click.
// NOTE: A full implementation of the Gesture class is highly complex and omitted for brevity.
const useGestureHandlers = (
  id: string,
  targetRef: React.RefObject<HTMLElement>,
  onEvent: (name: string, detail: any) => void,
) => {
  const isValidDragRef = useRef(false);

  // Placeholder for pointerdown to initiate drag/click logic
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      onEvent('node-pointerdown', { id, data: { x: e.clientX, y: e.clientY } });

      // Check for modifier keys to enable drag, mirroring Lit logic
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
        isValidDragRef.current = true;
      }
      // Full gesture logic (drag, click timing) would go here.
    },
    [id, onEvent],
  );

  // Placeholder for handling simulated gesture events
  const handleGestureEvent = useCallback(
    (eventName: string, e: React.MouseEvent | React.KeyboardEvent) => {
      onEvent(`node-${eventName}`, {
        id,
        shiftKey: e.shiftKey,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        altKey: e.altKey,
      });
    },
    [id, onEvent],
  );

  return {
    onPointerDown: handlePointerDown,
    // Simulate gesture events on standard mouse events for demo
    onClick: (e: React.MouseEvent) => handleGestureEvent('click', e),
    onDoubleClick: (e: React.MouseEvent) => handleGestureEvent('doubleclick', e),
    // ... more detailed drag handlers would be integrated here
  };
};

// --- Component Props ---
interface TokenGraphNodeProps {
  id: string;
  value: string;
  type?: GraphNodeType;
  isFaded?: boolean;
  isIntersect?: boolean;
  selected?: boolean;
  selectionAncestor?: boolean;
  selectionDescendent?: boolean;
  hasDownstream?: boolean;
  hoverUpstream?: boolean;
  // Event callbacks (replacing dispatchCustomEvent)
  onNodeEvent: (name: string, detail: any) => void;
}

/**
 * Highly stateful, visually complex graph node refactored using Chakra UI.
 */
export const TokenGraphNode: React.FC<TokenGraphNodeProps> = ({
                                                                id,
                                                                value,
                                                                type = 'token',
                                                                isFaded = false,
                                                                isIntersect = false,
                                                                selected = false,
                                                                selectionAncestor = false,
                                                                selectionDescendent = false,
                                                                hasDownstream = false,
                                                                hoverUpstream = false,
                                                                onNodeEvent,
                                                              }) => {
  const theme = useTheme();
  const gestureTargetRef = useRef<HTMLDivElement>(null);
  const [pointerOverDepth, setPointerOverDepth] = useState(0);

  // Custom hook to replace Lit's Gesture logic
  const gestureHandlers = useGestureHandlers(id, gestureTargetRef, onNodeEvent);

  // --- Value Decomposition and Layout Logic (Replacing willUpdate's 'value' check) ---
  const { decomposedValues, rowCount, nodeHeight } = useMemo(() => {
    const values = value.split(ValuesListSplitter).filter((v) => v !== '');
    const decomposed: ValueTuple[] = values.map((val) => {
      const parts = val.split(ValuePathSplitter);
      return [parts[0], parts[1] || ''];
    });

    const count = Math.max(decomposed.length, 1);
    const height =
      count * GRAPH_NODE_VALUE_HEIGHT +
      (count - 1) * GRAPH_NODE_VALUE_MARGIN +
      GRAPH_NODE_VALUES_PADDING * 2;

    return {
      decomposedValues: decomposed,
      rowCount: count,
      nodeHeight: height,
    };
  }, [value]);

  // --- Color Determination Logic (Replacing willUpdate's color logic) ---
  const { fillColorVar, textColorVar } = useMemo(() => {
    let hue = 'celery';
    let fillValue = 200;
    let textValue = 900;

    if (selected) {
      // Direct color selection for 'selected' state
      // Mapping Spectrum colors to Chakra's default naming (e.g., yellow.500)
      return {
        fillColorVar: 'yellow.500',
        textColorVar: 'yellow.100', // A light contrast color
      };
    }

    // Node Type/State Logic
    if (type === 'token') {
      hue = selectionDescendent ? 'fuchsia' : 'purple';
      if (isIntersect || (selectionDescendent && selectionAncestor)) {
        hue = 'orange';
        fillValue = 600;
        textValue = 1300;
      }
    } else if (type === 'component') {
      hue = 'gray';
      if (hasDownstream) {
        fillValue = 300;
      }
    } else if (type === 'orphan-category') {
      hue = 'cyan';
      if (hasDownstream) {
        fillValue = 300;
      }
    }

    // Fading and Hover adjustments
    if (isFaded) {
      fillValue = Math.max(100, fillValue - 100);
      textValue = Math.max(100, textValue - 400);
    }
    if (hoverUpstream) {
      textValue = Math.min(1300, textValue + 400);
    }

    // NOTE: In a production app, you would use a custom Chakra theme that
    // maps these Spectrum hues/values (e.g., `fuchsia-200`) to actual hex codes.
    // Here, we return a string that can be used as a CSS variable name for
    // the host app, or a simplified Chakra color key for demonstration.
    return {
      fillColorVar: `var(--spectrum-${hue}-${fillValue})`,
      textColorVar: `var(--spectrum-${hue}-${textValue})`,
    };
  }, [
    selected,
    type,
    selectionDescendent,
    selectionAncestor,
    isIntersect,
    hasDownstream,
    isFaded,
    hoverUpstream,
  ]);

  // --- Pointer Over/Out Logic (Replacing handlePointerOver/Out) ---
  const handlePointerOver = useCallback(() => {
    setPointerOverDepth((d) => {
      const newDepth = d + 1;
      if (newDepth === 1) {
        onNodeEvent('node-pointerover', { id });
      }
      return newDepth;
    });
  }, [id, onNodeEvent]);

  const handlePointerOut = useCallback(() => {
    // Mimic Lit's setTimeout for debounce
    setTimeout(() => {
      setPointerOverDepth((d) => {
        const newDepth = Math.max(0, d - 1);
        if (newDepth === 0) {
          onNodeEvent('node-pointerout', { id });
        }
        return newDepth;
      });
    }, 1);
  }, [id, onNodeEvent]);

  // --- Copy to Clipboard Logic (Replacing copyToClipboard) ---
  const copyToClipboard = useCallback(
    (e: React.MouseEvent) => {
      navigator.clipboard.writeText(id).then(
        () => {
          onNodeEvent('copied-to-clipboard', { id });
        },
        () => {
          console.info('FAILED TO COPY TO CLIPBOARD');
        },
      );
      // Prevent drag initiation or other node events
      e.preventDefault();
      e.stopPropagation();
    },
    [id, onNodeEvent],
  );

  // --- Render Functions ---

  const renderValueList = useMemo(() => {
    if (decomposedValues.length === 0) {
      return null;
    }

    // Define styles for the nested elements based on state
    const valueStyles = {
      // Base styles for b and i elements (path and value)
      base: {
        padding: '0 5px',
        height: '100%',
        position: 'relative',
        display: 'inline-block',
        lineHeight: `${GRAPH_NODE_VALUE_HEIGHT}px`,
        fontWeight: 'normal',
        fontStyle: 'normal',
      },
      // Default colors (not selected, not faded)
      b: {
        color: 'gray.800', // spectrum-gray-800
        backgroundColor: 'gray.100', // spectrum-gray-100
        borderRadius: '2px 0 0 2px',
      },
      i: {
        color: 'gray.100', // spectrum-gray-100
        backgroundColor: 'gray.900', // spectrum-gray-900
        borderRadius: '0 2px 2px 0',
      },
      // Faded state overrides
      faded: {
        b: {
          color: 'gray.600',
          backgroundColor: 'gray.200',
        },
        i: {
          color: 'gray.200',
          backgroundColor: 'gray.600',
        },
      },
      // Selected state overrides
      selected: {
        b: {
          color: 'yellow.800',
          backgroundColor: 'yellow.100',
        },
        i: {
          color: 'yellow.100',
          backgroundColor: 'yellow.700', // Mapping yellow-1300 to a high-contrast dark yellow
        },
      },
    };

    // Determine current styles based on props
    const currentStyles = {
      b: { ...valueStyles.b, ...(isFaded ? valueStyles.faded.b : {}), ...(selected ? valueStyles.selected.b : {}) },
      i: { ...valueStyles.i, ...(isFaded ? valueStyles.faded.i : {}), ...(selected ? valueStyles.selected.i : {}) },
    };

    return (
      <List
        listStyleType="none"
        fontSize="12px"
        position="absolute"
        margin="0"
        padding="0"
        display="block"
        right={`${GRAPH_NODE_VALUES_PADDING}px`}
        whiteSpace="nowrap"
        textAlign="right"
        pointerEvents="none"
      >
        {decomposedValues.map(([val, path]) => (
          <ListItem
            key={path + val}
            marginBottom={`${GRAPH_NODE_VALUE_MARGIN}px`}
            position="relative"
            display="block"
            height={`${GRAPH_NODE_VALUE_HEIGHT}px`}
          >
            {/* Value Path (b) */}
            <Text as="b" sx={{ ...valueStyles.base, ...currentStyles.b }}>
              {path || '*'}
            </Text>
            {/* Value (i) */}
            <Text as="i" sx={{ ...valueStyles.base, ...currentStyles.i }}>
              {val}
            </Text>
          </ListItem>
        ))}
      </List>
    );
  }, [decomposedValues, isFaded, selected]);

  // --- Main Render ---
  return (
    <Box
      ref={gestureTargetRef}
      id="gesture-target"
      // Container Styles (from Lit's div CSS)
      position="absolute"
      width={`${GRAPH_NODE_WIDTH}px`}
      display="flex"
      alignItems="center"
      justifyContent="left"
      textAlign="left"
      userSelect="none"
      borderRadius="3px"
      // Dynamic Height Calculation
      height={`${nodeHeight}px`}
      // Dynamic Colors
      bg={fillColorVar}
      color={textColorVar}
      // State Classes translated to props
      className={selected ? 'selected' : ''} // Used for value list styling reference
      // Mouse/Pointer Events
      onPointerDown={gestureHandlers.onPointerDown}
      onClick={gestureHandlers.onClick}
      onDoubleClick={gestureHandlers.onDoubleClick}
      onMouseOver={handlePointerOver}
      onMouseOut={handlePointerOut}
      // Add other gesture events (drag-start/move/end) here as part of the gesture hook
    >
      {/* Node ID/Title (h3) */}
      <Heading
        as="h3"
        fontSize="12px"
        padding="0"
        margin="0"
        textAlign="left"
        paddingLeft="26px"
        pointerEvents="none"
        color="inherit" // Inherit color from parent box
      >
        {id}
      </Heading>

      {/* Copy Icon (i.copyIcon) */}
      <Box
        as="i"
        className="copyIcon" // Use className for hover visibility logic
        position="absolute"
        display="none" // Controlled by the :hover selector below
        cursor="pointer"
        top="0"
        left="0"
        height="100%"
        width="28px"
        opacity="0.7"
        bg={textColorVar} // Use the text color for the background color of the icon mask
        onClick={copyToClipboard}
        // Custom mask styles (assuming local SVGs)
        sx={{
          maskImage: `url("./Smock_Copy_18_N.svg")`,
          maskRepeat: 'no-repeat',
          maskPosition: 'center center',
          maskSize: '18px',
          // Lit's CSS hover logic translated to Chakra's sx
          'div:hover &': {
            display: 'block', // Make visible on container hover
          },
          _hover: { opacity: 0.8 },
          _active: { opacity: 1 },
        }}
        // Handlers for Lit's isInteractingWithButton flag (optional if not needed for drag logic)
        onPointerDown={(e) => {
          // console.log('Copy icon pointer down');
          e.stopPropagation(); // Stop pointerdown from reaching the gesture-target
        }}
        onPointerUp={(e) => {
          // console.log('Copy icon pointer up');
        }}
      />

      {/* Value List (ol) */}
      {renderValueList}
    </Box>
  );
};
