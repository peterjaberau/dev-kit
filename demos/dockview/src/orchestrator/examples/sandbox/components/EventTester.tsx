'use client'
import React, { useState, useEffect } from 'react';
import { SimpleGrid, GridItem, Box, chakra, Button, Flex, Stack, HStack } from "@chakra-ui/react"
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
          marginTop: 2,
          fontSize: 'xs',
          backgroundColor: 'gray.50',
          padding: 2,
          borderRadius: 'md',
          border: '1px solid',
          borderColor: 'gray.200',
        }}
        >
        <chakra.div
          css={{
            fontWeight: 'medium',
            color: 'gray.600',
            marginBottom: 1,
          }}
       >Example Payload:</chakra.div>
        <chakra.pre
          css={{
            color: 'gray.700',
          }}
          >{JSON.stringify(payload, null, 2)}</chakra.pre>
      </chakra.div>
    );
  };

  const renderEventHistory = () => {
    if (eventHistory.length === 0) {
      return (
        <chakra.div
          css={{
            textAlign: 'center',
            color: 'gray.500',
            paddingY: 8,
          }}

        >
          <chakra.p
            css={{
              fontSize: 'lg',
              marginBottom: 2,
            }}
            >📜</chakra.p>
          <chakra.p>No events sent yet</chakra.p>
        </chakra.div>
      );
    }

    return (
      <chakra.div
        css={{
          gapX: 2
        }}
        >
        {eventHistory.map((entry, index) => (
          <chakra.div
            key={index}
            css={{
              padding: 2,
              borderRadius: 'full',
              border: '1px solid',
              borderColor: entry.result === 'success' ? 'green.200' : 'red.200',
              backgroundColor: entry.result === 'success' ? 'green.50' : 'red.50',
              fontSize: 'sm',

            }}
          >
            <chakra.div
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
             >
              <chakra.div
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  gapX: 2,
                }}
               >
                <chakra.span
                  css={{
                    fontSize: 'xs',
                    paddingX: 2,
                    paddingY: 0.5,
                    borderRadius: 'full',
                    backgroundColor: entry.result === 'success' ? 'green.200' : 'red.200',
                    color: entry.result === 'success' ? 'green.800' : 'red.800',

                  }}

                 >
                  {entry.result === 'success' ? '✓' : '✗'}
                </chakra.span>
                <chakra.span
                  css={{
                    fontWeight: 'medium',
                    color: 'gray.700',
                  }}
                  >{entry.event}</chakra.span>
              </chakra.div>
              <chakra.span
                css={{
                  fontSize: 'xs',
                  color: 'gray.500',
                }}
               >
                {new Date(entry.timestamp).toLocaleTimeString()}
              </chakra.span>
            </chakra.div>

            {entry.payload && (
              <chakra.div
                css={{
                  marginTop: 1,
                  fontSize: 'xs',
                }}
                >
                <chakra.pre
                  css={{
                    color: 'gray.600',
                    backgroundColor: 'white',
                    padding: 1,
                    borderRadius: 'full',
                    maxHeight: 20,
                    overflow: 'auto',

                  }}
                 >
                  {JSON.stringify(entry.payload, null, 2)}
                </chakra.pre>
              </chakra.div>
            )}
          </chakra.div>
        ))}
      </chakra.div>
    );
  };

  return (
    <chakra.div
      css={{
        height: 'full',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
      >
      {/* Event Tester Toolbar */}
      <chakra.div
        css={{
          borderBottom: '1px solid',
          borderColor: 'gray.200',
          paddingX: 4,
          paddingY: 2,
          backgroundColor: 'gray.50',
        }}
        >
        <chakra.div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          >
          <chakra.span
            css={{
              fontSize: 'sm',
              fontWeight: 'medium',
              color: 'gray.700',
            }}
            >⚡ Event Tester</chakra.span>
          <chakra.div
            css={{
              display: 'flex',
              gapX: 2,
            }}
            >
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              colorPalette={isPlaying ? 'red' : 'green'}
              variant={'solid'}
              size={'sm'}
            >
              {isPlaying ? '⏸️ Stop' : '▶️ Auto'}
            </Button>
            <Button
              onClick={() => setEventHistory([])}
              size={'sm'}
            >
              🗑️ Clear
            </Button>
          </chakra.div>
        </chakra.div>
      </chakra.div>

      {/* Content Area */}
      <Box flex={1} overflow={'auto'} p={4} gapY={6} >
        {/* Available Events */}
        <chakra.div>
          <chakra.h3 css={{
            fontSize: 'sm',
            fontWeight: 'medium',
            color: 'gray.700',
            marginBottom: 3,
          }} >🎯 Available Events</chakra.h3>
          <SimpleGrid columns={2} gap={2}>
            {events.map(event => (
              <chakra.div key={event.id}
                          css={{
                            padding: 3,
                            borderRadius: 'full',
                            border: '1px solid',
                            cursor: 'pointer',
                            transitionProperty: 'colors',
                            backgroundColor: selectedEvent === event.name ? 'blue.50' : 'gray.50',
                            borderColor: selectedEvent === event.name ? 'blue.200' : 'gray.200',
                            '_hover': {
                              backgroundColor: selectedEvent === event.name ? 'blue.50' : 'gray.100',
                            },

                          }}

              onClick={() => setSelectedEvent(event.name)}
              >
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                  <chakra.span
                    css={{
                      fontWeight: 'medium',
                      color: 'gray.700',
                    }}
                    >{event.name}</chakra.span>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      const payload = generateRandomPayload(event.name);
                      sendEvent(event.name, payload);
                    }}
                    size={'sm'}

                  >
                    Send
                  </Button>
                </HStack>
                {renderEventPreview(event.name)}
              </chakra.div>
            ))}
          </SimpleGrid>
        </chakra.div>

        {/* Custom Event */}
        <chakra.div>
          <chakra.h3
            css={{
              fontSize: 'sm',
              fontWeight: 'medium',
              color: 'gray.700',
              marginBottom: 3,
            }}
            >🎯 Custom Events</chakra.h3>
          <chakra.form onSubmit={handleCustomEventSubmit} css={{ gapY: 3}}>
            <chakra.div>
              <chakra.label

                css={{
                  display: 'block',
                  fontSize: 'sm',
                  fontWeight: 'medium',
                  color: 'gray.700',
                  marginBottom: 1,
                }}
                >
                Custom Event Name
              </chakra.label>
              <chakra.input
                type="text"
                value={customEvent}
                onChange={(e) => setCustomEvent(e.target.value)}
                placeholder="e.g., CUSTOM_ACTION"
                css={{
                  width: 'full',
                  paddingX: 3,
                  paddingY: 2,
                  border: '1px solid',
                  borderColor: 'gray.300',
                  borderRadius: 'md',
                  _focus: {
                    ring: '2px',
                    ringColor: 'blue.500',
                    borderColor: 'blue.500',
                  },
                }}
              />
            </chakra.div>

            <chakra.div>
              <chakra.label

                css={{
                  display: 'block',
                  fontSize: 'sm',
                  fontWeight: 'medium',
                  color: 'gray.700',
                  marginBottom: 1,
                }}
                >
                Event Payload (JSON)
              </chakra.label>
              <chakra.textarea
                value={customPayload}
                onChange={(e) => setCustomPayload(e.target.value)}
                placeholder='{"key": "value"}'
                rows={3}
                css={{
                  width: 'full',
                  paddingX: 3,
                  paddingY: 2,
                  border: '1px solid',
                  borderColor: 'gray.300',
                  borderRadius: 'md',
                  fontFamily: 'monospace',
                  fontSize: 'sm',
                  _focus: {
                    ring: '2px',
                    ringColor: 'blue.500',
                    borderColor: 'blue.500',
                  },
                }}

              />
            </chakra.div>

            <Button
              type="submit"
              css={{
                width: 'full',
                borderRadius: 'full',
              }}

            >
              🚀 Send Custom Event
            </Button>
          </chakra.form>
        </chakra.div>

        {/* Event History */}
        <chakra.div>
          <chakra.h3
            css={{
              fontSize: 'sm',
              fontWeight: 'medium',
              color: 'gray.700',
              marginBottom: 3,
            }}
            >📜 Event History</chakra.h3>
          <chakra.div
            css={{
              backgroundColor: 'gray.50',
              borderRadius: 'full',
              maxHeight: 48,
              overflow: 'auto'
            }}

            >
            {renderEventHistory()}
          </chakra.div>
        </chakra.div>
      </Box>

      {/* Event Tester Status */}
      <chakra.div
        css={{
          borderTop: '1px solid',
          borderColor: 'gray.200',
          paddingX: 4,
          paddingY: 2,
          backgroundColor: 'gray.50',
        }}

        >
        <chakra.div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 'sm',
            color: 'gray.600',
          }}

          >
          <chakra.div
            css={{
              display: 'flex',
              alignItems: 'center',
              gapX: 4,
            }}

            >
            <span>⚡ Events: {events.length}</span>
            <span>📜 History: {eventHistory.length}</span>
          </chakra.div>
          <chakra.div
            css={{
              display: 'flex',
              alignItems: 'center',
              gapX: 2,
            }}

            >
            <chakra.span
              css={{
                fontSize: 'xs',
                paddingX: 2,
                paddingY: 0.5,
                borderRadius: 'full',
                backgroundColor: 'green.200',
                color: 'green.800',
              }}
              >
              Ready ✓
            </chakra.span>
          </chakra.div>
        </chakra.div>
      </chakra.div>
    </chakra.div>
  );
}
