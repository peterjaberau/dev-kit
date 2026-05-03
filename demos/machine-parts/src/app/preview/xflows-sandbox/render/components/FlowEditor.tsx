import { useState, useEffect } from 'react';
import { Badge, Button, chakra, HStack, Stack, Textarea } from "@chakra-ui/react"

interface FlowEditorProps {
  initialFlow: any | null;
  onFlowChange: (flow: any, error: string | null) => void;
  error: string | null;
}

export function FlowEditor({ initialFlow, onFlowChange }: FlowEditorProps) {
  const [flowJson, setFlowJson]: any = useState('');
  const [syntaxErrors, setSyntaxErrors] = useState<string[]>([]);
  const [history, setHistory]: any = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (!initialFlow) {
      setFlowJson('');
      setHistory(['']);
      setHistoryIndex(0);
      setSyntaxErrors([]);
      return;
    }

    const jsonString = JSON.stringify(initialFlow, null, 2);
    setFlowJson(jsonString);
    setHistory([jsonString]);
    setHistoryIndex(0);
  }, [initialFlow]);

  const validateFlow = (jsonString: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!jsonString.trim()) {
      return { isValid: true, errors };
    }

    try {
      const parsed = JSON.parse(jsonString);

      if (!parsed.id) errors.push('Missing required field: id');
      if (!parsed.initial) errors.push('Missing required field: initial');
      if (!parsed.states) errors.push('Missing required field: states');

      if (parsed.initial && parsed.states && !parsed.states[parsed.initial]) {
        errors.push(`Initial state "${parsed.initial}" not found in states`);
      }

      if (parsed.states) {
        Object.entries(parsed.states).forEach(([stateId, state]: [string, any]) => {
          if (state.on) {
            Object.values(state.on).forEach((target: any) => {
              if (typeof target === 'string') {
                if (target.startsWith('#')) return;
                if (!parsed.states[target] && !target.match(/\./)) {
                  errors.push(`State "${stateId}" references non-existent state "${target}"`);
                }
              }
            });
          }
        });
      }

      return { isValid: errors.length === 0, errors };
    } catch (parseError) {
      const err = parseError as Error;
      return { isValid: false, errors: [`JSON Parse Error: ${err.message}`] };
    }
  };

  const handleJsonChange = (newJsonString: string) => {
    setFlowJson(newJsonString);

    if (!newJsonString.trim()) {
      setSyntaxErrors([]);
      onFlowChange(null, null);
      return;
    }

    let errors: string[] | any = [];
    try {
      JSON.parse(newJsonString);
    } catch (syntaxError) {
      errors.push(`Syntax Error: ${(syntaxError as Error).message}`);
      setSyntaxErrors(errors);
      onFlowChange(null, errors[0]);
      return;
    }

    setSyntaxErrors([]);

    const validation: any = validateFlow(newJsonString);

    if (validation.isValid) {
      setHistory((prev: any) => [...prev.slice(0, historyIndex + 1), newJsonString]);
      setHistoryIndex(prev => prev + 1);

      onFlowChange(JSON.parse(newJsonString), null);
    } else {
      onFlowChange(null, validation.errors[0]);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setFlowJson(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setFlowJson(history[historyIndex + 1]);
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(flowJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setFlowJson(formatted);
      handleJsonChange(formatted);
    } catch (e) {
      // Invalid JSON, don't format
    }
  };

  const insertTemplate = (template: string) => {
    const templates: Record<string, string> = {
      button: `
{
  "id": "button-example",
  "view": {
    "moduleId": "button-module"
  },
  "on": {
    "CLICK": "next-state"
  }
}`,
      validation: `
{
  "id": "validation-example", 
  "guards": [
    {
      "condition": {
        "field": "age",
        "operator": "gte",
        "value": 18
      },
      "errorMessage": "Must be 18+"
    }
  ]
}`,
      parallel: `
{
  "id": "parallel-example",
  "type": "parallel",
  "states": {
    "loading": {
      "on": {
        "COMPLETE": "done"
      }
    },
    "validation": {
      "on": {
        "VALID": "done"
      }
    }
  }
}`
    };

    const templateValue = templates[template] || '';
    setFlowJson(templateValue);
    handleJsonChange(templateValue);
  };

  const allErrors = [...syntaxErrors, ...validateFlow(flowJson).errors];

  return (
    <chakra.div css={{ h: "full", display: "flex", flexDirection: "column", bg: "bg.panel" }}>
      <chakra.div css={{ borderBottomWidth: "1px", px: 4, py: 2, bg: "gray.50" }}>
        <HStack justify="space-between">
          <HStack gap={2}>
            <Button size="xs" variant="subtle" onClick={handleUndo} disabled={historyIndex <= 0}>
              ↶ Undo
            </Button>
            <Button size="xs" variant="subtle" onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
              ↷ Redo
            </Button>
            <Button size="xs" colorPalette="blue" variant="subtle" onClick={formatJson}>
              🎨 Format
            </Button>
          </HStack>

          <HStack gap={2}>
            <chakra.span css={{ fontSize: "sm", color: "gray.600" }}>Templates:</chakra.span>
            <Button size="xs" colorPalette="green" variant="subtle" onClick={() => insertTemplate('button')}>
              Button
            </Button>
            <Button size="xs" colorPalette="yellow" variant="subtle" onClick={() => insertTemplate('validation')}>
              Validation
            </Button>
            <Button size="xs" colorPalette="purple" variant="subtle" onClick={() => insertTemplate('parallel')}>
              Parallel
            </Button>
          </HStack>
        </HStack>
      </chakra.div>

      {allErrors.length > 0 && (
        <chakra.div css={{ borderBottomWidth: "1px", bg: "red.50", px: 4, py: 2 }}>
          <HStack align="flex-start" gap={2}>
            <chakra.span css={{ color: "red.600" }}>⚠️</chakra.span>
            <Stack gap={1} css={{ fontSize: "sm", color: "red.700" }}>
              {allErrors.map((error, i) => (
                <chakra.div key={i}>{error}</chakra.div>
              ))}
            </Stack>
          </HStack>
        </chakra.div>
      )}

      <chakra.div css={{ flex: 1, overflow: "hidden" }}>
        <Textarea
          value={flowJson}
          onChange={(e) => handleJsonChange(e.target.value)}
          placeholder="Enter your flow JSON here..."
          spellCheck={false}
          css={{
            w: "full",
            h: "full",
            p: 4,
            fontFamily: "JetBrains Mono, Fira Code, Monaco, Consolas, monospace",
            fontSize: "13px",
            lineHeight: "1.5",
            borderWidth: 0,
            borderRadius: 0,
            resize: "none",
            bg: "gray.50",
            _focus: { outline: "none", boxShadow: "none" },
          }}
        />
      </chakra.div>

      <chakra.div css={{ borderTopWidth: "1px", px: 4, py: 2, bg: "gray.50" }}>
        <HStack justify="space-between" css={{ fontSize: "sm", color: "gray.600" }}>
          <HStack gap={4}>
            <chakra.span>📝 Lines: {flowJson?.split('\n').length}</chakra.span>
            <chakra.span>📏 Chars: {flowJson?.length}</chakra.span>
            <chakra.span>✅ Valid: {allErrors.length === 0 ? 'Yes' : 'No'}</chakra.span>
          </HStack>
          <HStack gap={2}>
            <Badge colorPalette="green">JSON {allErrors.length === 0 ? '✓' : '✗'}</Badge>
            <Badge colorPalette="blue">Flow Schema {allErrors.length === 0 ? '✓' : '✗'}</Badge>
          </HStack>
        </HStack>
      </chakra.div>
    </chakra.div>
  );
}
