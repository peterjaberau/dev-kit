# Providers and Debuggers

The actors are not explicitly passed as props to Adaptive Debugger. The debugger receives them through React context
inheritance.

The provider hierarchy is effectively:

```typescript jsx
<InstanceManagerProvider>
  <LayoutManagerProvider>
    <SandboxManagerProvider>
      <SandboxManager>
        <AdvaptiveViewDesktopContent>
          <AdaptiveDebuggerRoot />
        </AdvaptiveViewDesktopContent>
      </SandboxManager>
    </SandboxManagerProvider>
  </LayoutManagerProvider>
</InstanceManagerProvider>
```

AdaptiveDebuggerRoot adds only its own provider:

```typescript jsx
<AdaptiveDebuggerProvider>
  <AdaptiveDebuggerPanel />
</AdaptiveDebuggerProvider>
```

# Hierarchy (Providers vs tsx Files)

| Component                     | Type     | File                                              |
| ----------------------------- | -------- | ------------------------------------------------- |
| `InstanceManagerProvider`     | Provider | instance-manager/provider.tsx                     |
| `LayoutManagerProvider`       | Provider | layout-manager/provider.tsx                       |
| `SandboxManagerProvider`      | Provider | sandbox-manager/provider.tsx                      |
| `AdaptiveDebuggerProvider`    | Provider | adaptive-debugger/provider.tsx                    |
| `SandboxRenderer`             | Renderer | sandbox-manager/sandbox-renderer.tsx              |
| `SandboxManager`              | Renderer | sandbox-manager/manager.tsx                       |
| `AdvaptiveViewDesktopContent` | Renderer | app.tsx                                           |
| `AdaptiveDebuggerRoot`        | Renderer | adaptive-debugger/components/root.tsx             |
| `AdaptiveDebuggerPanel`       | Renderer | adaptive-debugger/components/root.tsx             |
| `AdaptiveDebuggerLayout`      | Renderer | adaptive-debugger/components/layout.tsx           |
| `LayoutPanel`                 | Renderer | adaptive-debugger/components/layout.component.tsx |

That hierarchy is split across these files:

## sandbox-renderer.tsx
```typescript jsx

// sandbox-renderer.tsx
<InstanceManagerProvider>
  <LayoutManagerProvider>
    <SandboxManagerProvider>
      <SandboxManager>{children}</SandboxManager>
    </SandboxManagerProvider>
  </LayoutManagerProvider>
</InstanceManagerProvider>

// inside AdvaptiveViewDesktopContent
<AdaptiveDebuggerRoot />

// adaptive-debugger/components/root.tsx
<AdaptiveDebuggerProvider>
  <AdaptiveDebuggerPanel />
</AdaptiveDebuggerProvider>
```

## desktop/app.tsx
```typescript jsx
<SandboxRenderer>
  {(props) => <AdvaptiveViewDesktopContent {...props} />}
</SandboxRenderer>

// inside AdvaptiveViewDesktopContent
<AdaptiveDebuggerRoot />
```

## adaptive-debugger/components/root.tsx
```typescript jsx
<AdaptiveDebuggerProvider>
  <AdaptiveDebuggerPanel />
</AdaptiveDebuggerProvider>
```