# Uncontrolled

```typescript jsx
<TreeView.Root>
  <TreeView.Label />

  <TreeView.Tree>
    <TreeView.Node>
      <TreeView.Item>
        <TreeView.ItemIndent />

        <TreeView.ItemStart>
          <TreeView.Toggle />
        </TreeView.ItemStart>

        <TreeView.ItemContent>
          <TreeView.Icon />
          <TreeView.Text />
        </TreeView.ItemContent>

        <TreeView.ItemEnd>
          <TreeView.Meta />
        </TreeView.ItemEnd>
      </TreeView.Item>

      <TreeView.NodeChild>
        <TreeView.Node>
          <TreeView.Item>
            <TreeView.ItemIndent />

            <TreeView.ItemStart>
              <TreeView.Toggle />
            </TreeView.ItemStart>

            <TreeView.ItemContent>
              <TreeView.Icon />
              <TreeView.Text />
            </TreeView.ItemContent>

            <TreeView.ItemEnd>
              <TreeView.Meta />
            </TreeView.ItemEnd>
          </TreeView.Item>
        </TreeView.Node>
      </TreeView.NodeChild>
    </TreeView.Node>
  </TreeView.Tree>
</TreeView.Root>

```

# Controlled/provider

```typescript jsx
<TreeView.RootProvider>
  <TreeView.Label />

  <TreeView.Tree>
    <TreeView.Node>
      <TreeView.Item>
        <TreeView.ItemIndent />

        <TreeView.ItemStart>
          <TreeView.Toggle />
        </TreeView.ItemStart>

        <TreeView.ItemContent>
          <TreeView.Icon />
          <TreeView.Text />
        </TreeView.ItemContent>

        <TreeView.ItemEnd>
          <TreeView.Meta />
        </TreeView.ItemEnd>
      </TreeView.Item>

      <TreeView.NodeChild>
        <TreeView.Node>
          <TreeView.Item>
            <TreeView.ItemIndent />

            <TreeView.ItemStart>
              <TreeView.Toggle />
            </TreeView.ItemStart>

            <TreeView.ItemContent>
              <TreeView.Icon />
              <TreeView.Text />
            </TreeView.ItemContent>

            <TreeView.ItemEnd>
              <TreeView.Meta />
            </TreeView.ItemEnd>
          </TreeView.Item>
        </TreeView.Node>
      </TreeView.NodeChild>
    </TreeView.Node>
  </TreeView.Tree>
</TreeView.RootProvider>
```


# JSON/data-driven - uncontrolled

```typescript jsx
<TreeView.Root nodes={nodes}>
  <TreeView.Label>Machine parts</TreeView.Label>
  <TreeView.JsonTree />
</TreeView.Root>

// internally renders
<TreeView.Tree>
  <TreeView.Node>
    <TreeView.Item>
      <TreeView.ItemIndent />
      <TreeView.ItemStart>
        <TreeView.Toggle />
      </TreeView.ItemStart>
      <TreeView.ItemContent />
      <TreeView.ItemEnd />
    </TreeView.Item>

    <TreeView.NodeChild />
  </TreeView.Node>
</TreeView.Tree>

// convenience wrapper version
<TreeView.View
  label="Machine parts"
  nodes={nodes}
/>
```


# Convenience wrapper version:
```typescript jsx
<TreeView.RootProvider value={treeView}>
  <TreeView.Label>Machine parts</TreeView.Label>
  <TreeView.JsonTree />
</TreeView.RootProvider>
```
