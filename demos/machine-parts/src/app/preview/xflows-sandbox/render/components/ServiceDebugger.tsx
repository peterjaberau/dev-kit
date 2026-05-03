import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, chakra, HStack, ScrollArea, SimpleGrid, Stack } from "@chakra-ui/react"
export function ServiceDebugger() {
  const [services, setServices] = useState<Array<{name: string, type: 'http' | 'mock', status: 'working' | 'error' | 'pending'}>>([
    { name: 'getUserData', type: 'http', status: 'working' },
    { name: 'validateInput', type: 'http', status: 'working' },
    { name: 'saveData', type: 'http', status: 'working' }
  ]);

  const [requests, setRequests] = useState<Array<{
    service: string,
    method: string,
    url: string,
    status: number,
    time: number,
    timestamp: number
  }>>([]);

  const [mockMode, setMockMode] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const addMockRequest = () => {
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];
    const services = ['getUserData', 'validateInput', 'saveData'];
    const statuses = [200, 201, 400, 404, 500];

    const newRequest = {
      service: services[Math.floor(Math.random() * services.length)],
      method: methods[Math.floor(Math.random() * methods.length)],
      url: `/api/${services[Math.floor(Math.random() * services.length)]}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      time: Math.random() * 1000 + 50,
      timestamp: Date.now()
    };

    setRequests((prev: any) => [newRequest, ...prev.slice(0, 19)]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        addMockRequest();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working': return 'green';
      case 'error': return 'red';
      case 'pending': return 'yellow';
      default: return 'gray';
    }
  };

  const getStatusColorForCode = (code: number) => {
    if (code >= 200 && code < 300) return 'green.600';
    if (code >= 400 && code < 500) return 'yellow.600';
    if (code >= 500) return 'red.600';
    return 'gray.600';
  };

  const renderServiceDetails = () => {
    const service = services.find(s => s.name === selectedService);
    if (!service) {
      return (
        <chakra.div css={{ textAlign: "center", color: "gray.500", py: 8 }}>
          <chakra.p css={{ fontSize: "lg", mb: 2 }}>🔧</chakra.p>
          <chakra.p>Select a service to view details</chakra.p>
        </chakra.div>
      );
    }

    return (
      <Stack gap={4}>
        <chakra.div>
          <chakra.h5 css={{ fontWeight: "medium", color: "gray.700", mb: 2 }}>📡 Service Configuration</chakra.h5>
          <chakra.div css={{ bg: "gray.50", p: 3, borderRadius: "md", borderWidth: "1px" }}>
            <Stack gap={2} css={{ fontSize: "sm" }}>
              <chakra.div><chakra.span css={{ color: "blue.600" }}>Name:</chakra.span> {service.name}</chakra.div>
              <chakra.div><chakra.span css={{ color: "blue.600" }}>Type:</chakra.span> {service.type}</chakra.div>
              <chakra.div>
                <chakra.span css={{ color: "blue.600" }}>Status:</chakra.span>
                <Badge ml={2} colorPalette={getStatusColor(service.status)}>{service.status}</Badge>
              </chakra.div>
              <chakra.div><chakra.span css={{ color: "blue.600" }}>Mode:</chakra.span> {mockMode ? 'Mock' : 'Real'}</chakra.div>
            </Stack>
          </chakra.div>
        </chakra.div>

        <chakra.div>
          <chakra.h5 css={{ fontWeight: "medium", color: "gray.700", mb: 2 }}>📊 Service Statistics</chakra.h5>
          <SimpleGrid columns={2} gap={4} css={{ fontSize: "sm" }}>
            <chakra.div css={{ bg: "bg.panel", p: 3, borderRadius: "md", borderWidth: "1px" }}>
              <chakra.span css={{ color: "gray.600" }}>Total Requests:</chakra.span>
              <chakra.span css={{ ml: 2, fontWeight: "medium" }}>
                {requests.filter(r => r.service === service.name).length}
              </chakra.span>
            </chakra.div>
            <chakra.div css={{ bg: "bg.panel", p: 3, borderRadius: "md", borderWidth: "1px" }}>
              <chakra.span css={{ color: "gray.600" }}>Avg Response:</chakra.span>
              <chakra.span css={{ ml: 2, fontWeight: "medium" }}>
                {(() => {
                  const serviceRequests = requests.filter(r => r.service === service.name);
                  if (serviceRequests.length === 0) return '0ms';
                  const avg = serviceRequests.reduce((sum, r) => sum + r.time, 0) / serviceRequests.length;
                  return `${avg.toFixed(0)}ms`;
                })()}
              </chakra.span>
            </chakra.div>
          </SimpleGrid>
        </chakra.div>

        {mockMode && (
          <chakra.div>
            <chakra.h5 css={{ fontWeight: "medium", color: "gray.700", mb: 2 }}>🎭 Mock Response</chakra.h5>
            <chakra.div css={{ bg: "yellow.50", p: 3, borderRadius: "md", borderWidth: "1px" }}>
              <chakra.pre css={{ fontSize: "xs", color: "gray.700" }}>{`{
    id: "${service.name}_mock_id",
    status: "success",
    data: "Mock response for ${service.name}",
    timestamp: ${Date.now()}
}`}</chakra.pre>
            </chakra.div>
          </chakra.div>
        )}
      </Stack>
    );
  };

  return (
    <Card.Root
      size={"sm"}
      variant={"subtle"}
      css={{ display: "flex", flexDirection: "column", flex: 1, minH: 0, h: "full", maxH: "full", w: "full", overflow: "hidden" }}
    >
      <Card.Header css={{ py: 2, flexShrink: 0, borderBottom: "1px solid", borderBottomColor: "border" }}>
        <HStack justify="space-between">
          <Card.Title>🌐 Service Debugger</Card.Title>
          <HStack gap={2}>
            <Button size="xs" colorPalette={mockMode ? "yellow" : "blue"} variant="subtle" onClick={() => setMockMode(!mockMode)}>
              {mockMode ? '🎭 Mock' : '🔗 Real'}
            </Button>
            <Button size="xs" variant="subtle" onClick={() => setRequests([])}>🗑️ Clear</Button>
            <Button size="xs" colorPalette="green" variant="subtle" onClick={addMockRequest}>➕ New Request</Button>
          </HStack>
        </HStack>
      </Card.Header>

      <Card.Body css={{ display: "flex", flex: 1, minH: 0, overflow: "hidden", p: 0 }}>
        <ScrollArea.Root css={{ flex: 1, minH: 0, h: "full", maxH: "full", w: "full" }} size="sm" variant="always">
          <ScrollArea.Viewport css={{ h: "full", maxH: "full", minH: 0 }}>
            <ScrollArea.Content p={4} pe={6}>
              <Stack gap={6}>
                <chakra.div>
                  <chakra.h3 css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700", mb: 3 }}>📡 Registered Services</chakra.h3>
                  <SimpleGrid columns={3} gap={3}>
                    {services.map(service => (
                      <chakra.div
                        key={service.name}
                        css={{
                          p: 3,
                          borderRadius: "md",
                          borderWidth: "1px",
                          cursor: "pointer",
                          transition: "background 0.15s ease, border-color 0.15s ease",
                          ...(selectedService === service.name
                            ? { bg: "blue.50", borderColor: "blue.200" }
                            : { bg: "gray.50", borderColor: "gray.200", _hover: { bg: "gray.100" } }),
                        }}
                        onClick={() => setSelectedService(service.name)}
                      >
                        <HStack justify="space-between" css={{ mb: 2 }}>
                          <chakra.span css={{ fontWeight: "medium", color: "gray.700" }}>{service.name}</chakra.span>
                          <Badge colorPalette={getStatusColor(service.status)}>{service.status}</Badge>
                        </HStack>
                        <chakra.div css={{ fontSize: "xs", color: "gray.600" }}>
                          Type: {service.type} • Mode: {mockMode ? 'Mock' : 'Real'}
                        </chakra.div>
                      </chakra.div>
                    ))}
                  </SimpleGrid>
                </chakra.div>

                {renderServiceDetails()}

                <chakra.div>
                  <chakra.h3 css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700", mb: 3 }}>📋 Request Logs</chakra.h3>
                  <chakra.div css={{ bg: "gray.50", borderRadius: "md", borderWidth: "1px", maxH: 48, overflow: "auto" }}>
                    {requests.length === 0 ? (
                      <chakra.div css={{ textAlign: "center", color: "gray.500", py: 8 }}>
                        <chakra.p css={{ fontSize: "lg", mb: 2 }}>📝</chakra.p>
                        <chakra.p>No requests yet</chakra.p>
                        <chakra.p css={{ fontSize: "sm", mt: 1 }}>Interact with your flow to see requests appear</chakra.p>
                      </chakra.div>
                    ) : (
                      <Stack gap={2} css={{ p: 3 }}>
                        {requests.map((request, index) => (
                          <chakra.div key={index} css={{ bg: "bg.panel", p: 2, borderRadius: "md", borderWidth: "1px", fontSize: "sm" }}>
                            <HStack justify="space-between">
                              <HStack gap={3}>
                                <chakra.span css={{ fontWeight: "medium", color: getStatusColorForCode(request.status) }}>{request.method}</chakra.span>
                                <chakra.span css={{ color: "gray.600" }}>{request.service}</chakra.span>
                                <chakra.span css={{ color: "gray.500", fontSize: "xs" }}>{request.url}</chakra.span>
                              </HStack>
                              <HStack gap={3} css={{ fontSize: "xs", color: "gray.500" }}>
                                <chakra.span>{request.time.toFixed(0)}ms</chakra.span>
                                <chakra.span>{new Date(request.timestamp).toLocaleTimeString()}</chakra.span>
                              </HStack>
                            </HStack>
                          </chakra.div>
                        ))}
                      </Stack>
                    )}
                  </chakra.div>
                </chakra.div>

                <chakra.div>
                  <chakra.h3 css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700", mb: 3 }}>📊 Service Performance</chakra.h3>
                  <SimpleGrid columns={3} gap={4}>
                    <chakra.div css={{ bg: "green.50", p: 3, borderRadius: "md", borderWidth: "1px", textAlign: "center" }}>
                      <chakra.div css={{ fontSize: "lg", fontWeight: "bold", color: "green.800" }}>{requests.filter(r => r.status >= 200 && r.status < 300).length}</chakra.div>
                      <chakra.div css={{ fontSize: "sm", color: "green.600" }}>Success</chakra.div>
                    </chakra.div>
                    <chakra.div css={{ bg: "red.50", p: 3, borderRadius: "md", borderWidth: "1px", textAlign: "center" }}>
                      <chakra.div css={{ fontSize: "lg", fontWeight: "bold", color: "red.800" }}>{requests.filter(r => r.status >= 400).length}</chakra.div>
                      <chakra.div css={{ fontSize: "sm", color: "red.600" }}>Errors</chakra.div>
                    </chakra.div>
                    <chakra.div css={{ bg: "blue.50", p: 3, borderRadius: "md", borderWidth: "1px", textAlign: "center" }}>
                      <chakra.div css={{ fontSize: "lg", fontWeight: "bold", color: "blue.800" }}>{requests.length > 0 ? (requests.reduce((sum, r) => sum + r.time, 0) / requests.length).toFixed(0) : '0'}ms</chakra.div>
                      <chakra.div css={{ fontSize: "sm", color: "blue.600" }}>Avg Time</chakra.div>
                    </chakra.div>
                  </SimpleGrid>
                </chakra.div>
              </Stack>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Card.Body>

      <Card.Footer css={{ flexShrink: 0, p: 0 }}>
        <chakra.div css={{ w: "full", borderTopWidth: "1px", px: 4, py: 2, bg: "gray.50" }}>
          <HStack justify="space-between" css={{ fontSize: "sm", color: "gray.600" }}>
            <HStack gap={4}>
              <chakra.span>🌐 Services: {services.length}</chakra.span>
              <chakra.span>📋 Requests: {requests.length}</chakra.span>
              <chakra.span>🎭 Mode: {mockMode ? 'Mock' : 'Real'}</chakra.span>
            </HStack>
            <Badge colorPalette="green">Monitoring ✓</Badge>
          </HStack>
        </chakra.div>
      </Card.Footer>
    </Card.Root>
  );
}
