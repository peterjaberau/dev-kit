import { useState, useEffect } from 'react';
import { Button, Card, chakra, HStack, NativeSelect, Progress, Stack } from "@chakra-ui/react"

interface TestingHelperProps {
  approach: 'approach-1' | 'approach-2';
  onApproachChange: (approach: 'approach-1' | 'approach-2') => void;
}

export const TestingHelper: React.FC<TestingHelperProps> = ({
  approach,
  onApproachChange
}) => {
  const [testState, setTestState] = useState({
    isLoading: false,
    currentStep: 1,
    totalSteps: 5,
    startTime: Date.now(),
    events: [] as string[]
  });

  const testScenarios = [
    {
      id: 'happy-path',
      name: '✅ Happy Path',
      description: 'Flujo completo sin errores',
      steps: ['NEXT', 'FORM.SUBMIT', 'FORM.SUBMIT']
    },
    {
      id: 'error-recovery',
      name: '🔄 Error Recovery',
      description: 'Simulación de errores y recuperación',
      steps: ['NEXT', 'FORM.SUBMIT', 'ERROR', 'SUCCESS']
    },
    {
      id: 'navigation',
      name: '🧭 Navigation',
      description: 'Navegación hacia adelante y atrás',
      steps: ['NEXT', 'BACK', 'NEXT', 'FORM.SUBMIT']
    }
  ];

  const [currentScenario, setCurrentScenario]: any = useState(testScenarios[0]);

  useEffect(() => {
    if (testState.isLoading && currentScenario.steps.length > 0) {
      const interval = setInterval(() => {
        setTestState(prev => {
          if (prev.currentStep > currentScenario.steps.length) {
            setTestState(prev => ({ ...prev, isLoading: false, currentStep: 1 }));
            return prev;
          }
          return {
            ...prev,
            currentStep: prev.currentStep + 1,
            events: [...prev.events, currentScenario.steps[prev.currentStep - 1] || 'END']
          };
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [testState.isLoading, currentScenario.steps]);

  const runTestScenario = () => {
    setTestState({
      isLoading: true,
      currentStep: 1,
      totalSteps: currentScenario.steps.length,
      startTime: Date.now(),
      events: []
    });
  };

  const stopTest = () => {
    setTestState(prev => ({ ...prev, isLoading: false }));
  };

  return (
    <Card.Root css={{ position: "fixed", bottom: 4, right: 4, w: 80, zIndex: 50, shadow: "lg" }}>
      <Card.Body css={{ p: 4 }}>
        <HStack justify="space-between" css={{ mb: 3 }}>
          <chakra.h3 css={{ fontWeight: "semibold", color: "gray.800" }}>🧪 Testing Helper</chakra.h3>
          <Button
            size="xs"
            variant="subtle"
            onClick={() => onApproachChange(approach === 'approach-1' ? 'approach-2' : 'approach-1')}
          >
            Switch Approches
          </Button>
        </HStack>

        <chakra.div css={{ mb: 3, p: 2, bg: "gray.50", borderRadius: "md", fontSize: "xs" }}>
          <HStack justify="space-between">
            <chakra.span>Testing:</chakra.span>
            <chakra.span css={{ fontWeight: "medium", color: testState.isLoading ? "green.600" : "gray.500" }}>
              {testState.isLoading ? 'RUNNING' : 'IDLE'}
            </chakra.span>
          </HStack>
          <HStack justify="space-between">
            <chakra.span>Current:</chakra.span>
            <chakra.span css={{ fontWeight: "medium" }}>{approach}</chakra.span>
          </HStack>
          {testState.isLoading && (
            <chakra.div css={{ mt: 1 }}>
              <Progress.Root value={((testState.currentStep - 1) / testState.totalSteps) * 100} size="xs">
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
              <chakra.div css={{ textAlign: "center", mt: 1 }}>
                {testState.currentStep - 1} / {testState.totalSteps}
              </chakra.div>
            </chakra.div>
          )}
        </chakra.div>

        <chakra.div css={{ mb: 3 }}>
          <chakra.div css={{ display: "block", fontSize: "xs", fontWeight: "medium", color: "gray.700", mb: 2 }}>
            Test Scenarios:
          </chakra.div>
          <NativeSelect.Root size="xs">
            <NativeSelect.Field
              value={currentScenario.id}
              onChange={(e) => {
                const scenario = testScenarios.find(s => s.id === e.target.value) || testScenarios[0];
                setCurrentScenario(scenario);
              }}
            >
              {testScenarios.map(scenario => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </chakra.div>

        <chakra.div css={{ mb: 3, fontSize: "xs", color: "gray.600", p: 2, bg: "blue.50", borderRadius: "md" }}>
          <chakra.div css={{ fontWeight: "medium" }}>{currentScenario.name}</chakra.div>
          <chakra.div>{currentScenario.description}</chakra.div>
          <chakra.div css={{ mt: 1, color: "gray.500" }}>Steps: {currentScenario.steps.join(' → ')}</chakra.div>
        </chakra.div>

        <HStack gap={2}>
          <Button size="xs" flex={1} colorPalette="green" onClick={runTestScenario} disabled={testState.isLoading}>
            ▶️ Run Test
          </Button>
          {testState.isLoading && (
            <Button size="xs" colorPalette="red" onClick={stopTest}>
              ⏹️ Stop
            </Button>
          )}
        </HStack>

        {testState.events.length > 0 && (
          <chakra.div css={{ mt: 3 }}>
            <chakra.div css={{ fontSize: "xs", fontWeight: "medium", color: "gray.700", mb: 1 }}>Event Log:</chakra.div>
            <Stack gap={1} css={{ fontSize: "xs", bg: "gray.100", p: 2, borderRadius: "md", maxH: 20, overflowY: "auto" }}>
              {testState.events.map((event, index) => (
                <HStack key={`event-${index}-${event}`} justify="space-between">
                  <chakra.span>{event}</chakra.span>
                  <chakra.span css={{ color: "gray.500" }}>{Math.floor((Date.now() - testState.startTime) / 1000)}s</chakra.span>
                </HStack>
              ))}
            </Stack>
          </chakra.div>
        )}

        <chakra.div css={{ mt: 3, pt: 2, borderTopWidth: "1px", borderColor: "gray.200" }}>
          <chakra.div css={{ fontSize: "xs", fontWeight: "medium", color: "gray.700", mb: 1 }}>Quick Actions:</chakra.div>
          <HStack gap={1}>
            <Button
              size="xs"
              colorPalette="blue"
              variant="subtle"
              onClick={() => {
                const event = document.querySelector('[data-testid="trigger-event"]') as HTMLButtonElement;
                if (event) event.click();
              }}
            >
              Event
            </Button>
            <Button
              size="xs"
              colorPalette="yellow"
              variant="subtle"
              onClick={() => {
                setTestState(prev => ({
                  ...prev,
                  events: [...prev.events, 'RESET'],
                  currentStep: 1
                }));
              }}
            >
              Reset
            </Button>
          </HStack>
        </chakra.div>
      </Card.Body>
    </Card.Root>
  );
};
