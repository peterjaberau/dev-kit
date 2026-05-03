import React, { useState, useEffect } from 'react';
import { Badge, Button, chakra, ScrollArea, HStack, Card, Input, SimpleGrid, Stack } from "@chakra-ui/react"

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    renderTime: 16,
    memoryUsage: 45,
    updateCount: 0,
    stateTransitions: 0,
    eventCount: 0,
    serviceCalls: 0
  });

  const [history, setHistory] = useState<Array<{
    timestamp: number,
    renderTime: number,
    memoryUsage: number
  }>>([]);

  const [thresholds, setThresholds] = useState({
    renderTime: 50,
    memoryUsage: 100,
    updateCount: 1000
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        renderTime: Math.random() * 50 + 10,
        memoryUsage: Math.random() * 20 + 40,
        updateCount: prev.updateCount + Math.floor(Math.random() * 3),
        stateTransitions: prev.stateTransitions + Math.floor(Math.random() * 2),
        eventCount: prev.eventCount + Math.floor(Math.random() * 5),
        serviceCalls: prev.serviceCalls + Math.floor(Math.random() * 2)
      }));
    }, 1000);

    const historyInterval = setInterval(() => {
      setHistory(prev => [{
        timestamp: Date.now(),
        renderTime: Math.random() * 50 + 10,
        memoryUsage: Math.random() * 20 + 40
      }, ...prev.slice(0, 19)]);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(historyInterval);
    };
  }, []);

  const getMetricColor = (value: number, threshold: number, reverse: boolean = false) => {
    const ratio = value / threshold;
    if (reverse ? ratio <= 0.5 : ratio >= 1.5) return 'red.600';
    if (reverse ? ratio <= 0.8 : ratio >= 1.2) return 'yellow.600';
    return 'green.600';
  };

  const getMetricBarColor = (value: number, threshold: number) => {
    const color = getMetricColor(value, threshold);
    if (color === 'red.600') return 'red.400';
    if (color === 'yellow.600') return 'yellow.400';
    return 'green.400';
  };

  const renderPerformanceChart = () => {
    const maxRenderTime = Math.max(...history.map(h => h.renderTime), 1);
    const maxMemory = Math.max(...history.map(h => h.memoryUsage), 1);

    const renderChart = (
      title: string,
      unit: string,
      maxValue: number,
      valueGetter: (point: { renderTime: number; memoryUsage: number }) => number,
      threshold: number
    ) => (
      <chakra.div>
        <chakra.h5 css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700", mb: 2 }}>{title}</chakra.h5>
        <chakra.div css={{ bg: "gray.50", p: 3, borderRadius: "md", borderWidth: "1px" }}>
          <HStack align="end" gap={1} css={{ h: 20 }}>
            {history.slice(0, 10).reverse().map((point, index) => {
              const value = valueGetter(point);
              const height = (value / maxValue) * 100;
              return (
                <Stack key={index} gap={1} css={{ flex: 1 }}>
                  <chakra.div
                    css={{
                      w: "full",
                      borderTopRadius: "md",
                      bg: getMetricBarColor(value, threshold),
                      h: `${height}%`,
                    }}
                  />
                  <chakra.div css={{ fontSize: "xs", color: "gray.500", mt: 1 }}>
                    {new Date(point.timestamp).toLocaleTimeString().slice(-8, -3)}
                  </chakra.div>
                </Stack>
              );
            })}
          </HStack>
          <HStack justify="space-between" css={{ fontSize: "xs", color: "gray.600", mt: 2 }}>
            <chakra.span>0{unit}</chakra.span>
            <chakra.span css={{ fontWeight: "medium" }}>{maxValue.toFixed(0)}{unit}</chakra.span>
          </HStack>
        </chakra.div>
      </chakra.div>
    );

    return (
      <Stack gap={4}>
        {renderChart("⚡ Render Time (ms)", "ms", maxRenderTime, point => point.renderTime, thresholds.renderTime)}
        {renderChart("💾 Memory Usage (MB)", "MB", maxMemory, point => point.memoryUsage, thresholds.memoryUsage)}
      </Stack>
    );
  };

  const renderAlerts = () => {
    const alerts = [];

    if (metrics.renderTime > thresholds.renderTime) {
      alerts.push({
        type: 'warning',
        message: `Render time ${metrics.renderTime.toFixed(1)}ms exceeds threshold ${thresholds.renderTime}ms`,
        metric: 'renderTime'
      });
    }

    if (metrics.memoryUsage > thresholds.memoryUsage) {
      alerts.push({
        type: 'error',
        message: `Memory usage ${metrics.memoryUsage.toFixed(1)}MB exceeds threshold ${thresholds.memoryUsage}MB`,
        metric: 'memoryUsage'
      });
    }

    if (metrics.updateCount > thresholds.updateCount && metrics.updateCount % 100 === 0) {
      alerts.push({
        type: 'info',
        message: `High update count: ${metrics.updateCount}`,
        metric: 'updateCount'
      });
    }

    if (alerts.length === 0) {
      return (
        <chakra.div css={{ bg: "green.50", borderWidth: "1px", borderColor: "green.200", p: 3, borderRadius: "md", color: "green.800", fontSize: "sm" }}>
          ✅ All metrics within normal thresholds
        </chakra.div>
      );
    }

    return (
      <Stack gap={2}>
        {alerts.map((alert, index) => (
          <chakra.div
            key={index}
            css={{
              borderWidth: "1px",
              p: 3,
              borderRadius: "md",
              fontSize: "sm",
              ...(alert.type === 'error'
                ? { bg: "red.50", borderColor: "red.200", color: "red.800" }
                : alert.type === 'warning'
                  ? { bg: "yellow.50", borderColor: "yellow.200", color: "yellow.800" }
                  : { bg: "blue.50", borderColor: "blue.200", color: "blue.800" }),
            }}
          >
            <HStack gap={2}>
              <chakra.span>{alert.type === 'error' ? '🛑' : alert.type === 'warning' ? '⚠️' : 'ℹ️'}</chakra.span>
              <chakra.span>{alert.message}</chakra.span>
            </HStack>
          </chakra.div>
        ))}
      </Stack>
    );
  };

  const metricCard = (label: string, value: string | number, color: string, threshold?: string) => (
    <chakra.div css={{ bg: "bg.panel", p: 3, borderWidth: "1px", borderRadius: "md" }}>
      <HStack justify="space-between">
        <chakra.span css={{ color: "gray.600", fontSize: "sm" }}>{label}</chakra.span>
        <chakra.span css={{ fontWeight: "bold", color }}>{value}</chakra.span>
      </HStack>
      {threshold && <chakra.div css={{ fontSize: "xs", color: "gray.500", mt: 1 }}>Threshold: {threshold}</chakra.div>}
    </chakra.div>
  );

  return (
    <Card.Root
      size={"sm"}
      variant={"subtle"}
      css={{ display: "flex", flexDirection: "column", flex: 1, minH: 0, h: "full", maxH: "full", w: "full", overflow: "hidden" }}
    >
      <Card.Header css={{ py: 2, flexShrink: 0, borderBottom: "1px solid", borderBottomColor: 'border' }}>
        <HStack>
          <Card.Title>📊 Performance Monitor</Card.Title>
          <HStack css={{ gap: 2, flex: 1 }}>
            <Button size="xs" variant="subtle" onClick={() => setHistory([])}>
              🗑️ Clear Data
            </Button>
            <Button
              size="xs"
              colorPalette="blue"
              variant="subtle"
              onClick={() =>
                setMetrics((prev) => ({
                  ...prev,
                  renderTime: 16,
                  memoryUsage: 45,
                  updateCount: 0,
                  stateTransitions: 0,
                  eventCount: 0,
                  serviceCalls: 0,
                }))
              }
            >
              🔄 Reset Metrics
            </Button>
          </HStack>
        </HStack>
      </Card.Header>
      <Card.Body css={{ display: "flex", flex: 1, minH: 0, overflow: "hidden", p: 0 }}>
        <ScrollArea.Root css={{ flex: 1, minH: 0, h: "full", maxH: "full", w: "full" }} size="sm" variant="always">
          <ScrollArea.Viewport css={{ h: "full", maxH: "full", minH: 0 }}>
            <ScrollArea.Content p={4} pe={6}>
              <Stack gap={6}>
                <chakra.div>
                  <chakra.h3 css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700", mb: 3 }}>
                    📈 Current Metrics
                  </chakra.h3>
                  <SimpleGrid columns={3} gap={4}>
                    {metricCard(
                      "Render Time",
                      `${metrics.renderTime.toFixed(1)}ms`,
                      getMetricColor(metrics.renderTime, thresholds.renderTime),
                      `${thresholds.renderTime}ms`,
                    )}
                    {metricCard(
                      "Memory",
                      `${metrics.memoryUsage.toFixed(1)}MB`,
                      getMetricColor(metrics.memoryUsage, thresholds.memoryUsage),
                      `${thresholds.memoryUsage}MB`,
                    )}
                    {metricCard("Updates", metrics.updateCount, "blue.600", String(thresholds.updateCount))}
                  </SimpleGrid>
                </chakra.div>

                <chakra.div>
                  <chakra.h3 css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700", mb: 3 }}>
                    🔄 Activity Metrics
                  </chakra.h3>
                  <SimpleGrid columns={3} gap={4}>
                    {metricCard("State Transitions", metrics.stateTransitions, "blue.800")}
                    {metricCard("Events Processed", metrics.eventCount, "purple.800")}
                    {metricCard("Service Calls", metrics.serviceCalls, "green.800")}
                  </SimpleGrid>
                </chakra.div>

                <chakra.div>
                  <chakra.h3 css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700", mb: 3 }}>
                    📊 Performance Trends
                  </chakra.h3>
                  {renderPerformanceChart()}
                </chakra.div>

                <chakra.div>
                  <chakra.h3 css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700", mb: 3 }}>
                    🚨 Alerts & Thresholds
                  </chakra.h3>
                  {renderAlerts()}
                </chakra.div>

                <chakra.div>
                  <chakra.h3 css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700", mb: 3 }}>
                    ⚙️ Threshold Settings
                  </chakra.h3>
                  <chakra.div css={{ bg: "gray.50", p: 3, borderRadius: "md", borderWidth: "1px" }}>
                    <Stack gap={3}>
                      <chakra.label css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700" }}>
                        Render Time Threshold (ms)
                        <Input
                          mt={1}
                          size="sm"
                          type="number"
                          value={thresholds.renderTime}
                          onChange={(e) => setThresholds((prev) => ({ ...prev, renderTime: Number(e.target.value) }))}
                        />
                      </chakra.label>
                      <chakra.label css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700" }}>
                        Memory Usage Threshold (MB)
                        <Input
                          mt={1}
                          size="sm"
                          type="number"
                          value={thresholds.memoryUsage}
                          onChange={(e) => setThresholds((prev) => ({ ...prev, memoryUsage: Number(e.target.value) }))}
                        />
                      </chakra.label>
                      <chakra.label css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700" }}>
                        Update Count Threshold
                        <Input
                          mt={1}
                          size="sm"
                          type="number"
                          value={thresholds.updateCount}
                          onChange={(e) => setThresholds((prev) => ({ ...prev, updateCount: Number(e.target.value) }))}
                        />
                      </chakra.label>
                    </Stack>
                  </chakra.div>
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
              <chakra.span>⚡ Render: {metrics.renderTime.toFixed(1)}ms</chakra.span>
              <chakra.span>💾 Memory: {metrics.memoryUsage.toFixed(1)}MB</chakra.span>
              <chakra.span>🔄 Updates: {metrics.updateCount}</chakra.span>
            </HStack>
            <Badge colorPalette="green">Monitoring ✓</Badge>
          </HStack>
        </chakra.div>
      </Card.Footer>
    </Card.Root>
  )
}
