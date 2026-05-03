import React, { useState, useEffect } from 'react';
import { Button, Card, chakra, Field, Input, Stack, Textarea, VStack } from "@chakra-ui/react"

interface EventTesterProps {
  flow: any;
}

export function EventTester({ flow }: EventTesterProps) {
  const [events, setEvents] = useState<Array<{id: string, name: string, payload?: any}>>([]);
  const [eventHistory, setEventHistory] = useState<Array<{event: string, payload?: any, timestamp: number, result: string}>>([]);
  const [customEvent, setCustomEvent] = useState('');
  const [customPayload, setCustomPayload] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Extract available events from flow states
    const availableEvents = new Set<string>();
    
    if (flow?.states) {
      Object.values(flow.states).forEach((state: any) => {
        if (state.on) {
          Object.keys(state.on).forEach(eventName => {
            availableEvents.add(eventName);
          });
        }
      });
    }

    const eventList: any = Array.from(availableEvents).map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      payload: undefined
    }));

    setEvents(eventList);
    
    // Set first event as selected
    if (eventList.length > 0 && !selectedEvent) {
      setSelectedEvent(eventList[0].name);
    }
  }, [flow]);

  const sendEvent = (eventName: string, payload?: any) => {
    const timestamp = Date.now();
    const result = Math.random() > 0.1 ? 'success' : 'error'; // Mock result
    
    const newHistory = {
      event: eventName,
      payload,
      timestamp,
      result
    };
    
    setEventHistory(prev => [newHistory, ...prev.slice(0, 9)]); // Keep last 10
    
    // Dispatch to parent
    console.log('Sending event:', { event: eventName, payload });
  };

  const handleCustomEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customEvent.trim()) {
      let payload;
      try {
        payload = customPayload.trim() ? JSON.parse(customPayload) : undefined;
      } catch (e) {
        alert('Invalid JSON payload');
        return;
      }
      
      sendEvent(customEvent.trim(), payload);
      setCustomEvent('');
      setCustomPayload('');
    }
  };

  const generateRandomPayload = (eventName: string) => {
    const generators: any = {
      'NEXT': () => ({ step: Math.floor(Math.random() * 10) + 1 }),
      'BACK': () => ({ reason: 'user_cancelled' }),
      'ERROR': () => ({ error: 'Mock error', code: 'ERR_MOCK' }),
      'CLICK': () => ({ buttonId: 'btn-' + Math.random().toString(36).substr(2, 9) }),
      'VALIDATE': () => ({ data: { age: 25, name: 'John' }, rule: 'age_check' }),
      'SUBMIT': () => ({ formData: { email: 'test@example.com', agreeToTerms: true } }),
      'RETRY': () => ({ attempts: Math.floor(Math.random() * 3) + 1 })
    };
    
    const generator = generators[eventName];
    return generator ? generator() : { timestamp: Date.now() };
  };

  const renderEventPreview = (eventName: string) => {
    const payload = generateRandomPayload(eventName);
    
    return (
      <chakra.div
        css={{
          mt: 2,
          borderRadius: "full",
          bg: "gray.50",
          p: 2,
          fontSize: "xs",
        }}
      >
        <chakra.div
          css={{
            mb: 1,
            fontWeight: "medium",
            color: "gray.600",
          }}
        >
          Example Payload:
        </chakra.div>
        <chakra.pre
          css={{
            color: 'gray.700',
          }}
        >
          {JSON.stringify(payload, null, 2)}
        </chakra.pre>
      </chakra.div>
    )
  };

  const renderEventHistory = () => {
    if (eventHistory.length === 0) {
      return (
        <chakra.div
          css={{
            color: "gray.500",
            textAlign: "center",
            py: 8,
          }}
        >
          <chakra.p
            css={{
              mb: 2,
              fontSize: 'lg',
              color: "gray.700",
            }}
          >
            📜
          </chakra.p>
          <chakra.p>No events sent yet</chakra.p>
        </chakra.div>
      )
    }

    return (
      <chakra.div css={{ spaceY: 2 }}>
        {eventHistory.map((entry, index) => (
          <chakra.div
            key={index}
            css={{
              p: 2,
              border: "1px solid",
              borderRadius: "full",
              fontSize: "sm",

              ...(entry.result === "success"
                ? {
                    borderColor: "green.200",
                    bg: "green.50",
                  }
                : {
                    borderColor: "red.200",
                    bg: "red.50",
                  }),
            }}
          >
            <chakra.div
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <chakra.div
                css={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <chakra.span
                  css={{
                    borderRadus: "full",
                    px: 2,
                    py: 0.5,
                    fontSize: "xs",
                    ...(entry.result === "success"
                      ? {
                          borderColor: "green.800",
                          bg: "green.200",
                        }
                      : {
                          borderColor: "red.800",
                          bg: "red.200",
                        }),
                  }}
                >
                  {entry.result === "success" ? "✓" : "✗"}
                </chakra.span>
                <chakra.span
                  css={{
                    fontWeight: 'medium',
                    color: 'gray.700'
                  }}
                >{entry.event}</chakra.span>
              </chakra.div>
              <chakra.span
                css={{
                  fontSize: 'xs',
                  color: 'gray.500'
                }}

              >{new Date(entry.timestamp).toLocaleTimeString()}</chakra.span>
            </chakra.div>

            {entry.payload && (
              <chakra.div
                css={{
                  mt: 1,
                  fontSize: 'xs'
                }}
                >
                <chakra.pre
                  css={{
                    maxH: 20,
                    overflow: 'auto',
                    borderRadius: 'full',
                    bg: 'bg.panel',
                    p: 1,
                    color: 'gray.600'
                  }}
                  >
                  {JSON.stringify(entry.payload, null, 2)}
                </chakra.pre>
              </chakra.div>
            )}
          </chakra.div>
        ))}
      </chakra.div>
    )
  };

  return (
    <chakra.div
      css={{
        h: "full",
        display: "flex",
        flexDirection: "column",
        bg: "bg.panel",
      }}
    >
      {/* Event Tester Toolbar */}
      <chakra.div
        css={{
          px: 4,
          py: 2,
          bg: "gray.5",
          borderBottom: "1px solid",
          borderColor: "border",
        }}
      >
        <chakra.div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <chakra.span
            css={{
              fontSize: "sm",
              fontWeight: "medium",
              color: "gray.700",
            }}
          >
            ⚡ Event Tester
          </chakra.span>
          <chakra.div
            css={{
              display: "flex",
              gap: 2,
            }}
          >
            <Button size="xs" colorPalette={isPlaying ? "red" : "green"} onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? "⏸️ Stop" : "▶️ Auto"}
            </Button>
            <Button size="xs" onClick={() => setEventHistory([])} variant={"surface"}>
              🗑️ Clear
            </Button>
          </chakra.div>
        </chakra.div>
      </chakra.div>

      {/* Content Area */}
      <chakra.div
        css={{
          flex: 1,
          spaceY: 6,
          overflow: "auto",
          p: 4,
        }}
      >
        {/* Available Events */}
        <chakra.div>
          <chakra.h3
            css={{
              mb: 3,
              fontSize: "sm",
              fontWeight: "medium",
              color: "gray.700",
            }}
          >
            🎯 Available Events
          </chakra.h3>
          <chakra.div
            css={{
              display: "grid",
              gridColumn: 2,
              gap: 2,
            }}
          >
            {events.map((event) => (
              <chakra.div
                key={event.id}
                css={{
                  cursor: "pointer",
                  borderRadius: "full",
                  border: "1px solid",
                  transition: "colors",
                  ...(selectedEvent === event.name
                    ? {
                        borderColor: "blue.200",
                        bg: "blue.50",
                      }
                    : {
                        borderColor: "gray.200",
                        bg: "gray.50",
                      }),
                }}
                onClick={() => setSelectedEvent(event.name)}
              >
                <chakra.div
                  css={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <chakra.span
                    css={{
                      fontWeight: "medium",
                      color: "gray.700",
                    }}
                  >
                    {event.name}
                  </chakra.span>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      const payload = generateRandomPayload(event.name)
                      sendEvent(event.name, payload)
                    }}
                    colorPalette={"blue"}
                    size={"xs"}
                  >
                    Send
                  </Button>
                </chakra.div>
                {renderEventPreview(event.name)}
              </chakra.div>
            ))}
          </chakra.div>
        </chakra.div>

        {/* Custom Event */}
        <Card.Root size={"sm"}>
          <Card.Header>
            <Card.Title>🎯 Custom Events</Card.Title>
          </Card.Header>
          <Card.Body>
            <chakra.form onSubmit={handleCustomEventSubmit}>
              <VStack css={{ gap: 4 }}>
                <Field.Root>
                  <Field.Label>Custom Event Name</Field.Label>
                  <Input
                    type="text"
                    value={customEvent}
                    onChange={(e) => setCustomEvent(e.currentTarget.value)}
                    placeholder="e.g., CUSTOM_ACTION"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Event Payload (JSON)</Field.Label>
                  <Textarea
                    value={customPayload}
                    onChange={(e) => setCustomPayload(e.target.value)}
                    placeholder='{"key": "value"}'
                    rows={3}
                  />
                </Field.Root>

                <Button size={"sm"} colorPalette={"purple"}>
                  🚀 Send Custom Event
                </Button>
              </VStack>
            </chakra.form>
          </Card.Body>
        </Card.Root>

        {/* Event History */}
        <Card.Root size={"sm"}>
          <Card.Header>
            <Card.Title>📜 Event History</Card.Title>
          </Card.Header>
          <Card.Body css={{ maxH: 48, overflow: "auto", bg: "bg.subtle" }}>{renderEventHistory()}</Card.Body>
        </Card.Root>
      </chakra.div>

      {/* Event Tester Status */}
      <chakra.div
        css={{
          borderTop: "1px solid",
          bg: "gray.50",
          px: 4,
          py: 2,
        }}
      >
        <chakra.div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "sm",
            color: "gray.600",
          }}
        >
          <chakra.div
            css={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <chakra.span>⚡ Events: {events.length}</chakra.span>
            <chakra.span>📜 History: {eventHistory.length}</chakra.span>
          </chakra.div>
          <chakra.div
            css={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <chakra.span
              css={{
                borderRadius: "full",
                bg: 'green.100',
                px: 2,
                py: 0.5,
                fontSize: 'xs',
                color: 'green.700'
              }}
            >
              Ready ✓
            </chakra.span>
          </chakra.div>
        </chakra.div>
      </chakra.div>
    </chakra.div>
  )
}
