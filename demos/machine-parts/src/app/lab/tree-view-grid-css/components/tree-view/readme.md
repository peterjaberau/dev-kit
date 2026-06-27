# Uncontrolled

```typescript jsx
<TreeView.Root>
  <TreeView.Label />
  <TreeView.Tree>
    <TreeView.Node>
      <TreeView.NodeIndent />

      <TreeView.NodeStart>
        <TreeView.Toggle />
      </TreeView.NodeStart>

      <TreeView.NodeContent>
        <TreeView.Icon />
        <TreeView.Text />
      </TreeView.NodeContent>

      <TreeView.NodeEnd>
        <TreeView.Meta />
      </TreeView.NodeEnd>

      <TreeView.NodeChild>
        <TreeView.Node>
          <TreeView.NodeIndent />

          <TreeView.NodeStart>
            <TreeView.Toggle />
          </TreeView.NodeStart>

          <TreeView.NodeContent>
            <TreeView.Icon />
            <TreeView.Text />
          </TreeView.NodeContent>

          <TreeView.NodeEnd>
            <TreeView.Meta />
          </TreeView.NodeEnd>
        </TreeView.Node>
      </TreeView.NodeChild>
    </TreeView.Node>
  </TreeView.Tree>
</TreeView.Root>

```

# Controlled/provider

```typescript jsx
<TreeView.Root>
  <TreeView.Label />

  <TreeView.Tree>
    <TreeView.Node>
      <TreeView.NodeIndent />

      <TreeView.NodeStart>
        <TreeView.Toggle />
      </TreeView.NodeStart>

      <TreeView.NodeContent>
        <TreeView.Icon />
        <TreeView.Text />
      </TreeView.NodeContent>

      <TreeView.NodeEnd>
        <TreeView.Meta />
      </TreeView.NodeEnd>

      <TreeView.NodeChild>
        <TreeView.Node>
          <TreeView.NodeIndent />

          <TreeView.NodeStart>
            <TreeView.Toggle />
          </TreeView.NodeStart>

          <TreeView.NodeContent>
            <TreeView.Icon />
            <TreeView.Text />
          </TreeView.NodeContent>

          <TreeView.NodeEnd>
            <TreeView.Meta />
          </TreeView.NodeEnd>
        </TreeView.Node>
      </TreeView.NodeChild>
    </TreeView.Node>
  </TreeView.Tree>
</TreeView.Root>
```


# JSON/data-driven - uncontrolled

```typescript jsx
<TreeView.Root nodes={nodes}>
  <TreeView.Label>Machine parts</TreeView.Label>
  <TreeView.JsonTree />
</TreeView.Root>
```


# Convenience wrapper version:
```typescript jsx
<TreeView.View
  label="Machine parts"
  nodes={nodes}
/>
```

# JSON/data-driven - controlled/provider

```typescript jsx
<TreeView.RootProvider>
  <TreeView.Label />

  <TreeView.JsonTree />
</TreeView.RootProvider>
```
