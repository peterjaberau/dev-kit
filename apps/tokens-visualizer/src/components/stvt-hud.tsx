import React, { useCallback } from 'react';
import {
  Box,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
  Icon,
  useTheme,
  forwardRef,
} from '@chakra-ui/react';
import { FullscreenIcon, FullscreenExitIcon } from '@chakra-ui/icons';

// --- Icon Replacement ---
// Since the original used masked SVGs, we'll use Chakra's built-in icons
// or a custom Icon component for better fidelity. Here, we use a custom Icon
// to reference the original SVG paths (though simplified for demonstration).

// Mock Icon component to represent the full-screen buttons
const FullscreenButtonIcon: React.FC<{ isExit: boolean }> = ({ isExit }) => {
  // NOTE: In a real app, you would import and use the actual SVG/path data here.
  const theme = useTheme();

  // Determine the background color based on the selected/emphasized state
  const backgroundColor = isExit
    ? 'blue.500' // Custom color for 'selected' state (mapping Spectrum)
    : 'gray.600'; // Default color

  const iconUrl = isExit
    ? './Smock_FullScreenExit_18_N.svg'
    : './Smock_FullScreen_18_N.svg';

  return (
    <Box
      as="span"
      display="inline-block"
      w="18px"
      h="18px"
      bg={backgroundColor}
      // Mimic the mask styling
      sx={{
        maskImage: `url(${iconUrl})`,
        maskRepeat: 'no-repeat',
        maskPosition: 'center center',
        maskSize: '100%',
      }}
    />
  );
};

// --- Component Props ---
interface StvtHudProps {
  fullscreenMode?: boolean;
  zoom?: number;
  // Callback for zoom changes (replacing dispatchCustomEvent)
  onSetZoomCenteredOnCanvas: (value: number) => void;
  // Callback for fullscreen toggle (replacing dispatchCustomEvent)
  onSetFullscreenMode: (value: boolean) => void;
}

/**
 * Heads-Up Display (HUD) component with zoom slider and fullscreen toggle.
 */
export const StvtHud: React.FC<StvtHudProps> = ({
                                                  fullscreenMode = false,
                                                  zoom = 1,
                                                  onSetZoomCenteredOnCanvas,
                                                  onSetFullscreenMode,
                                                }) => {
  const theme = useTheme();

  // --- Event Handlers (Replacing class methods) ---

  const handleZoomSliderChange = useCallback(
    (newZoom: number) => {
      // The Chakra Slider reports the value immediately on change
      onSetZoomCenteredOnCanvas(newZoom);
    },
    [onSetZoomCenteredOnCanvas],
  );

  const handleFullscreenToggle = useCallback(() => {
    onSetFullscreenMode(!fullscreenMode);
  }, [fullscreenMode, onSetFullscreenMode]);

  // --- Render ---

  // Use a string to ensure the slider value is fixed to 2 decimal places,
  // matching the original component's behavior.
  const sliderValue = parseFloat(zoom.toFixed(2));

  return (
    <Flex
      // Equivalent to :host styles
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex="overlay"
      alignItems="center"
      gap="20px"
    >
      {/* Slider Panel */}
      <Box
        className="slider-panel"
        position="relative"
        bg="gray.100" // spectrum-gray-100
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
        borderRadius="4px"
        padding="0px 16px"
        display="inline-block"
        opacity={fullscreenMode ? 0 : 1}
        top={fullscreenMode ? '25px' : '0'}
        transition="opacity 0.25s, top 0.25s"
        // Ensure the panel is accessible when visible
        pointerEvents={fullscreenMode ? 'none' : 'auto'}
        width="182px" // 150px slider width + 32px padding
      >
        {/* Chakra Slider (Replacing sp-slider) */}
        <Slider
          id="zoom-slider"
          aria-label="Zoom"
          min={0.1}
          max={2}
          step={0.05}
          value={sliderValue}
          onChange={handleZoomSliderChange}
          width="150px"
          // Vertical margin to center the slider in the panel height
          my="8px"
        >
          <SliderTrack>
            <SliderFilledTrack bg="blue.500" /> {/* Use a standard color */}
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>

      {/* Button Panel */}
      <Box
        className="button-panel"
        position="relative"
        bg="gray.100" // spectrum-gray-100
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
        borderRadius="4px"
        padding="0px"
        display="inline-block"
      >
        {/* Chakra IconButton (Replacing sp-action-button) */}
        <IconButton
          onClick={handleFullscreenToggle}
          aria-label={fullscreenMode ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          variant="ghost" // Equivalent to Spectrum's 'quiet'
          colorScheme={fullscreenMode ? 'blue' : 'gray'} // 'emphasized'/'selected' state
          // Using a custom icon component to retain the original look
          icon={<FullscreenButtonIcon isExit={fullscreenMode} />}
          isRound={false}
          size="md" // Default size, adjust as needed
          p="8px" // Add padding to control the button size
        />
      </Box>
    </Flex>
  );
};
