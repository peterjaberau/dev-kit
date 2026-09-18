# Providers and Debuggers

The actors are not explicitly passed as props to Adaptive Debugger. The debugger receives them through React context
inheritance.

The desktop machine spawns the local store and theme actors during initiation. The local store uses
`sandbox-adaptive-view` as its persistence key and is available through `useLocalStore`.

The desktop provider hierarchy is effectively:

```typescript jsx
<DesktopProvider>
    <Desktop>
      <AdvaptiveViewDesktopContent>
        <AdaptiveDebuggerRoot />
      </AdvaptiveViewDesktopContent>
    </Desktop>
</DesktopProvider>
```

AdaptiveDebuggerRoot adds only its own provider:

```typescript jsx
<AdaptiveDebuggerProvider>
  <AdaptiveDebuggerPanel />
</AdaptiveDebuggerProvider>
```

# Hierarchy (Providers vs tsx Files)

| Component                     | Type     | File                                    |
| ----------------------------- | -------- | --------------------------------------- |
| `DesktopProvider`             | Provider | desktop/providers/DesktopProvider.tsx   |
| `AdaptiveDebuggerProvider`    | Provider | adaptive-debugger/provider.tsx          |
| `Desktop`                     | Renderer | desktop/desktop.tsx                     |
| `DesktopDesigner`             | Renderer | desktop/designer/desktop-designer.tsx   |
| `AdvaptiveViewDesktopContent` | Renderer | desktop/app.tsx                         |
| `AdaptiveDebuggerRoot`        | Renderer | adaptive-debugger/components/root.tsx   |
| `AdaptiveDebuggerPanel`       | Renderer | adaptive-debugger/components/root.tsx   |
| `AdaptiveDebuggerLayout`      | Renderer | adaptive-debugger/components/layout.tsx |

That hierarchy is split across these files:

## desktop/index.tsx

```typescript jsx
<DesktopProvider>
    {children}
</DesktopProvider>

// inside AdvaptiveViewDesktopContent
<AdaptiveDebuggerRoot />

// adaptive-debugger/components/root.tsx
<AdaptiveDebuggerProvider>
  <AdaptiveDebuggerPanel />
</AdaptiveDebuggerProvider>
```

## desktop/app.tsx

```typescript jsx
<Desktop>
  {(props) => <AdvaptiveViewDesktopContent {...props} />}
</Desktop>

// inside AdvaptiveViewDesktopContent
<AdaptiveDebuggerRoot />
```

## adaptive-debugger/components/root.tsx

```typescript jsx
<AdaptiveDebuggerProvider>
  <AdaptiveDebuggerPanel />
</AdaptiveDebuggerProvider>
```
