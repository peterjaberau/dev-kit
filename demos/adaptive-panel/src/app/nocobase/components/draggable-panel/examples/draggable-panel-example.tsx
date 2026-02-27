import React from 'react';
import DraggablePanel from '../draggable-panel';
import { useState } from 'react';
import { Box, Button, HStack, Stack, Heading, Text, Separator } from '@chakra-ui/react';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';

export function DraggablePanelExample() {
  const [placement, setPlacement] = useState<'left' | 'right' | 'top' | 'bottom'>('right');

  const [mode, setMode] = useState<'fixed' | 'float'>('float');
  const [fullscreen, setFullscreen] = useState(false);
  const [expandable, setExpandable] = useState(true);
  const [pin, setPin] = useState(true);
  const [destroyOnClose, setDestroyOnClose] = useState(false);

  return (
    <Box h="100vh" display="flex" bg="bg.canvas">
      {/* Control Panel */}
      <Box w="340px" p="6" borderRightWidth="1px" borderColor="border.muted" bg="bg.subtle">
        <Heading size="md" mb="6">
          Draggable Panel Playground
        </Heading>

        <Stack gap="6">
          {/* Placement */}
          <Box>
            <Text fontWeight="semibold" mb="3">
              Placement
            </Text>

            <HStack wrap="wrap">
              <PlacementButton
                label="Left"
                icon={<ArrowLeft size={16} />}
                active={placement === 'left'}
                onClick={() => setPlacement('left')}
              />
              <PlacementButton
                label="Right"
                icon={<ArrowRight size={16} />}
                active={placement === 'right'}
                onClick={() => setPlacement('right')}
              />
              <PlacementButton
                label="Top"
                icon={<ArrowUp size={16} />}
                active={placement === 'top'}
                onClick={() => setPlacement('top')}
              />
              <PlacementButton
                label="Bottom"
                icon={<ArrowDown size={16} />}
                active={placement === 'bottom'}
                onClick={() => setPlacement('bottom')}
              />
            </HStack>
          </Box>

          <Separator />

          {/* Mode */}
          <Box>
            <Text fontWeight="semibold" mb="3">
              Mode
            </Text>

            <HStack>
              <StateButton label="Fixed" active={mode === 'fixed'} onClick={() => setMode('fixed')} />
              <StateButton label="Float" active={mode === 'float'} onClick={() => setMode('float')} />
            </HStack>
          </Box>

          <Separator />

          {/* Toggles */}
          <Box>
            <Text fontWeight="semibold" mb="3">
              Options
            </Text>

            <Stack gap="3">
              <ToggleButton label="Fullscreen" active={fullscreen} onClick={() => setFullscreen((v) => !v)} />

              <ToggleButton label="Expandable" active={expandable} onClick={() => setExpandable((v) => !v)} />

              <ToggleButton label="Pin (Hover Disabled)" active={pin} onClick={() => setPin((v) => !v)} />

              <ToggleButton
                label="Destroy On Close"
                active={destroyOnClose}
                onClick={() => setDestroyOnClose((v) => !v)}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Main Content */}
      <Box flex="1" position="relative" p="10">
        <Heading size="lg" mb="4">
          Main Content Area
        </Heading>
        <Text color="fg.muted">Interact with the controls on the left to test different panel configurations.</Text>

        <DraggablePanel
          placement={placement}
          mode={mode}
          fullscreen={fullscreen}
          expandable={expandable}
          pin={pin}
          destroyOnClose={destroyOnClose}
        >
          <Box p="6">
            <Heading size="md" mb="4">
              Panel Content
            </Heading>
            <Text>This panel reacts to your configuration.</Text>
          </Box>
        </DraggablePanel>
      </Box>
    </Box>
  );
}

/* -------------------- Small UI Helpers -------------------- */

function PlacementButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      size="sm"
      variant={active ? 'solid' : 'outline'}
      colorPalette={active ? 'blue' : 'gray'}
      onClick={onClick}
    >
      {label} {icon}
    </Button>
  );
}

function StateButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <Button size="sm" variant={active ? 'solid' : 'outline'} colorPalette={active ? 'blue' : 'gray'} onClick={onClick}>
      {label}
    </Button>
  );
}

function ToggleButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <Button
      size="sm"
      justifyContent="space-between"
      variant={active ? 'solid' : 'outline'}
      colorPalette={active ? 'green' : 'gray'}
      onClick={onClick}
    >
      {label}
      {active ? 'ON' : 'OFF'}
    </Button>
  );
}