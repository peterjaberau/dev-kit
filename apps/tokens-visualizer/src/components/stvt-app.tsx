import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  Box,
  Flex,
  useTheme,
  useToast,
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';

// --- Placeholder/Mock Imports and Types ---
// NOTE: These should be replaced with your actual class imports.

// Mock Controller/Model types (assuming they are standard JS/TS classes)
type GraphState = any;
type AppState = {
  zoom: number;
  panX: number;
  panY: number;
  selectedComponents: string[];
  selectedTokens: string[];
  setFilters: string[];
  spectrumColorTheme: 'dark' | 'light';
  fullscreenMode: boolean;
};
type StringMatchDictionaryItem = any;

class MockGraphController {
  displayGraphModel = { state: {} as GraphState };
  handleEvent = (name: string, detail: any) => console.log(`GraphController: ${name}`, detail);
  onDictionaryAvailable = (cb: (dict: StringMatchDictionaryItem[]) => void) => {};
  onNewGraphState = (cb: (state: GraphState) => void) => {};
}
class MockAppController {
  appModel = {
    state: {} as AppState,
    setSelectedComponents: (c: string[]) => {},
    setSelectedTokens: (t: string[]) => {},
    setSetFilters: (f: string[]) => {},
  };
  handleEvent = (name: string, detail: any) => console.log(`AppController: ${name}`, detail);
  emitNewAppState = () => {};
  onNewAppState = (cb: (state: AppState) => void) => {};
  constructor(config: any) {}
}
const GraphController = MockGraphController;
const AppController = MockAppController;

// Mock initial state for reference
const GraphModel = { DEFAULT_STATE: {} };
const AppModel = {
  DEFAULT_STATE: {
    zoom: 1,
    panX: 0,
    panY: 0,
    selectedComponents: [],
    selectedTokens: [],
    setFilters: [],
    spectrumColorTheme: 'light',
    fullscreenMode: false,
  } as AppState,
};
const SIDEBAR_WIDTH = 300; // Assuming this constant exists

// --- Placeholder Components (Replacing Web Components) ---

// stvt-sidebar
const StvtSidebar = React.memo((props: any) => (
  <Box id="stvt-sidebar" w={`${SIDEBAR_WIDTH}px`} h="100%" bg="gray.50" p={4} {...props}>
    Sidebar Content
  </Box>
));

// stvt-tabs
const StvtTabs = React.memo((props: any) => (
  <Flex
    position="absolute"
    top="0"
    left={`${SIDEBAR_WIDTH}px`}
    right="0"
    height="55px"
    bg="gray.100"
    align="center"
    justify="center"
    zIndex="docked"
    boxShadow="md"
    {...props}
  >
    Tabs Content
  </Flex>
));

// token-graph
const TokenGraph = React.memo((props: any) => (
  <Box position="fixed" top="0" left="0" w="100%" h="100%" zIndex="base" {...props}>
    Token Graph Canvas
  </Box>
));

// stvt-hud
const StvtHud = React.memo((props: any) => (
  <Box position="absolute" bottom="0" right="0" p={4} zIndex="overlay" {...props}>
    HUD (Zoom: {props.zoom})
  </Box>
));

// --- StvtApp Component ---

export const StvtApp: React.FC = () => {
  const [graphState, setGraphState] = useState<GraphState>(
    GraphModel.DEFAULT_STATE,
  );
  const [appState, setAppState] = useState<AppState>(AppModel.DEFAULT_STATE);
  const [dictionary, setDictionary] = useState<StringMatchDictionaryItem[]>([]);

  // Custom toast implementation for alert
  const toast = useToast();
  const alertKeyRef = useRef<string | null>(null);

  // Controllers are initialized only once
  const graphController = useMemo(() => new GraphController(), []);

  const appController = useMemo(() => {
    // Initial URL parsing logic from constructor
    const urlParams = new URLSearchParams(window.location.search);
    const urlParamToken = urlParams.get('token') || '';
    const urlParamComponent = urlParams.get('component') || '';
    const urlParamFilter = urlParams.get('filter') || '';

    const initialTokens = urlParamToken.split(',').filter(t => t !== '');
    const initialComponents = urlParamComponent.split(',').filter(c => c !== '');
    let initialFilters = urlParamFilter.split(',').filter(f => f !== '');

    if (!urlParams.has('filter')) {
      // Default filters if no 'filter' param is present
      initialFilters = ['spectrum', 'light', 'desktop'];
    }

    return new AppController({
      graphController: graphController,
      selectedComponents: initialComponents,
      selectedTokens: initialTokens,
      setFilters: initialFilters,
    });
  }, [graphController]);

  // Refs for tracking URL parameters (Replacing Lit's property tracking)
  const urlParamComponentRef = useRef('');
  const urlParamTokenRef = useRef('');
  const urlParamFilterRef = useRef('');

  // --- Controller Subscriptions (Replacing Lit's constructor subscriptions) ---
  useEffect(() => {
    // Initial state population
    setGraphState(graphController.displayGraphModel.state);
    setAppState(appController.appModel.state);

    // Subscribe to controllers
    graphController.onDictionaryAvailable(setDictionary);
    graphController.onNewGraphState(setGraphState);
    appController.onNewAppState(setAppState);

    // Cleanup logic (not strictly needed for these controller patterns but good practice)
    return () => {
      // In a real implementation, you'd unsubscribe the listeners if the controllers allowed it.
    };
  }, [appController, graphController]);

  // --- URL State Management (Replacing willUpdate and popstate handler) ---

  // 1. AppState to URL (Replaces willUpdate)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let didUrlParamsChange = false;

    const encodedComponents = appState.selectedComponents.join(',');
    const encodedTokens = appState.selectedTokens.join(',');
    const encodedFilters = appState.setFilters.join(',');

    const updateUrlParam = (
      key: string,
      currentValue: string,
      encodedValue: string,
      ref: React.MutableRefObject<string>,
    ) => {
      if (encodedValue !== ref.current) {
        ref.current = encodedValue;
        if (encodedValue === '') {
          // Special handling for 'filter' to allow empty string
          if (key === 'filter') {
            urlParams.set(key, '');
          } else {
            urlParams.delete(key);
          }
        } else {
          urlParams.set(key, encodedValue);
        }
        return true;
      }
      return false;
    };

    didUrlParamsChange =
      updateUrlParam(
        'component',
        urlParamComponentRef.current,
        encodedComponents,
        urlParamComponentRef,
      ) ||
      updateUrlParam(
        'token',
        urlParamTokenRef.current,
        encodedTokens,
        urlParamTokenRef,
      ) ||
      updateUrlParam(
        'filter',
        urlParamFilterRef.current,
        encodedFilters,
        urlParamFilterRef,
      );

    if (didUrlParamsChange) {
      window.history.pushState({}, '', `${location.pathname}?${urlParams}`);
    }
  }, [appState]);

  // 2. URL to AppState (Replaces popstate listener)
  useEffect(() => {
    const handlePopstate = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const newTokens = urlParams.get('token')?.split(',').filter(t => t !== '') || [];
      const newComponents = urlParams.get('component')?.split(',').filter(c => c !== '') || [];
      const newFilters = urlParams.get('filter')?.split(',').filter(f => f !== '') || [];

      appController.appModel.setSelectedComponents(newComponents);
      appController.appModel.setSelectedTokens(newTokens);
      appController.appModel.setSetFilters(newFilters);
      appController.emitNewAppState();
    };

    window.addEventListener('popstate', handlePopstate);
    return () => window.removeEventListener('popstate', handlePopstate);
  }, [appController]);

  // --- Event Handling (Replaces keyboard listener) ---
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const { zoom, panX, panY } = appState;
      const amount = e.shiftKey ? 300 : 30;

      switch (e.code) {
        case 'KeyZ':
          appController.handleEvent('set-zoom-centered-on-canvas', {
            value: zoom * (e.shiftKey ? 0.8 : 1.2),
          });
          break;
        case 'ArrowUp':
          appController.handleEvent('set-panning-position', {
            x: panX,
            y: panY + amount,
          });
          break;
        case 'ArrowDown':
          appController.handleEvent('set-panning-position', {
            x: panX,
            y: panY - amount,
          });
          break;
        case 'ArrowLeft':
          appController.handleEvent('set-panning-position', {
            x: panX + amount,
            y: panY,
          });
          break;
        case 'ArrowRight':
          appController.handleEvent('set-panning-position', {
            x: panX - amount,
            y: panY,
          });
          break;
        case 'KeyF':
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            // Imperative focus logic (simplified, as traversing React components is different)
            try {
              // Find the search input element and focus it
              document.querySelector('#stvt-sidebar #stvt-search #search')?.focus();
            } catch (error) {
              console.info('Failed to focus search input.', error);
            }
          }
          break;
        default:
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [appState, appController]);

  // --- Alert/Toast Logic (Replaces handleCopiedToClipboard) ---
  const handleCopiedToClipboard = useCallback(
    (e: CustomEvent) => {
      const tokenName = e.detail.id;
      const key = tokenName;
      alertKeyRef.current = key;

      // Use Chakra's useToast hook for a modern alert
      toast({
        id: key,
        title: `${tokenName} copied to clipboard.`,
        status: 'success',
        duration: 2500,
        isClosable: true,
        position: 'top',
        containerStyle: {
          // Mimic original position: absolute top: 110px and centering
          position: 'absolute',
          top: '110px',
          left: '50%',
          transform: 'translateX(-50%)',
        }
      });

      // The original Lit logic for timeout based on alertKey is handled implicitly by Chakra's duration and unique ID
    },
    [toast],
  );

  // --- Helper to bind events to the AppController ---
  const handleAppEvent = useCallback(
    (name: string, detail: any) => {
      appController.handleEvent(name, detail);
    },
    [appController],
  );

  // --- Layout Classes ---
  const fullscreenClass = appState.fullscreenMode ? 'fullscreen-mode' : '';

  // Custom Chakra theme to map Spectrum colors (optional, but good practice)
  const customTheme = extendTheme({
    colors: {
      // Placeholder for Spectrum theme colors if needed
      spectrumGray: {
        50: '#fafafa',
        100: '#f5f5f5',
        // ...
      },
    },
    // Define custom layout styles that mimic the Lit CSS
    styles: {
      global: {
        '#root': {
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          minHeight: '100%',
          overflow: 'hidden',
          // Theme background is handled by ChakraProvider
        },
        // Mimic the CSS transition logic for fullscreen mode
        '.fullscreen-mode #stvt-sidebar': {
          opacity: 0,
          left: '-50px !important',
          pointerEvents: 'none',
        },
        '.fullscreen-mode .stvt-tabs-container': {
          opacity: 0,
          top: '-25px !important',
          pointerEvents: 'none',
        },
        // Apply transitions
        '#stvt-sidebar': {
          transition: 'opacity 0.25s, left 0.25s',
        },
        '.stvt-tabs-container': {
          transition: 'opacity 0.25s, top 0.25s',
        },
      },
    },
  });

  // --- Main Render ---

  // ChakraProvider wraps the app to provide the context for styling and the toast.
  return (
    <ChakraProvider theme={customTheme}>
      <Box
        id="app-root"
        className={fullscreenClass}
        // Mimicking the sp-theme wrapper's color/scale
        // Chakra handles dark/light mode via `colorMode` in theme configuration.
        // We can simulate the theme change by keying the Box or using a color mode hook.
        // For simplicity, we assume the host app handles Chakra's color mode based on appState.spectrumColorTheme
        minH="100vh"
        bg={appState.spectrumColorTheme === 'dark' ? 'gray.800' : 'gray.50'}
      >
        {/* Sidebar */}
        <StvtSidebar
          position="absolute"
          left="0"
          top="0"
          zIndex="2"
          dictionary={dictionary}
          filters={appState.setFilters}
          spectrumColorTheme={appState.spectrumColorTheme}
          // Mapping custom events to controller handler
          onSetSpectrumColorTheme={(detail: any) =>
            handleAppEvent('set-spectrum-color-theme', detail)
          }
          onFiltersSelected={(detail: any) =>
            handleAppEvent('filters-selected', detail)
          }
          onSelectId={(detail: any) => handleAppEvent('select-id', detail)}
          // Preventing gesture propagation (React will handle this naturally)
          onPointerDown={(e: any) => {
            if (e.pointerType === 'touch') e.preventDefault();
          }}
        />

        {/* Tabs */}
        <StvtTabs
          className="stvt-tabs-container"
          dictionary={dictionary}
          selectedTokens={appState.selectedTokens}
          selectedComponents={appState.selectedComponents}
          zIndex="1"
          onCloseTab={(detail: any) => handleAppEvent('close-tab', detail)}
          onCloseAllTabs={(detail: any) => handleAppEvent('close-all-tabs', detail)}
          onPointerDown={(e: any) => {
            if (e.pointerType === 'touch') e.preventDefault();
          }}
        />

        {/* Graph */}
        <TokenGraph
          graphState={graphState}
          appState={appState}
          onSetZoom={(detail: any) => handleAppEvent('set-zoom', detail)}
          onSetPanningPosition={(detail: any) =>
            handleAppEvent('set-panning-position', detail)
          }
          onPanningInputDelta={(detail: any) =>
            handleAppEvent('panning-input-delta', detail)
          }
          onNodeClick={(detail: any) => handleAppEvent('node-click', detail)}
          onNodeDragMove={(detail: any) =>
            graphController.handleEvent('node-dragmove', detail)
          }
          onNodePointerOver={(detail: any) =>
            handleAppEvent('node-pointerover', detail)
          }
          onNodePointerOut={(detail: any) =>
            handleAppEvent('node-pointerout', detail)
          }
          onNodeDragStart={(detail: any) =>
            handleAppEvent('node-dragstart', detail)
          }
          onNodeDragEnd={(detail: any) =>
            handleAppEvent('node-dragend', detail)
          }
          onGenericGestureStart={(detail: any) =>
            handleAppEvent('generic-gesture-start', detail)
          }
          onGenericGestureEnd={(detail: any) =>
            handleAppEvent('generic-gesture-end', detail)
          }
          onCopiedToClipboard={handleCopiedToClipboard} // Direct handler for Toast
        />

        {/* HUD */}
        <StvtHud
          fullscreenMode={appState.fullscreenMode}
          zoom={appState.zoom}
          onSetZoomCenteredOnCanvas={(detail: any) =>
            handleAppEvent('set-zoom-centered-on-canvas', detail)
          }
          onSetFullscreenMode={(detail: any) =>
            handleAppEvent('set-fullscreen-mode', detail)
          }
        />

        {/* Note: sp-toast is replaced by Chakra's useToast implementation.
            The toast will appear via the handleCopiedToClipboard logic. */}
      </Box>
    </ChakraProvider>
  );
};
