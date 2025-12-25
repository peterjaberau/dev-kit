

* **use-tree-view-context.tsx** --> `provider.tsx`
* TreeViewProvider --> `Provider` ( exposed providerName)
* TreeViewContext --> `Context` (name)
* useTreeViewContext --> `useContext` (hookName)
* TreeViewProvider --> `Provider` (providerName)


* **use-tree-view-node-props-context.tsx** --> `item.provider.tsx`
* TreeViewNodePropsProvider --> `ItemProvider` ( exposed providerName)
* TreeViewNodePropsContext --> `ItemContext` (name)
* useTreeViewNodePropsContext --> `useItemContext` (hookName)
* TreeViewItemProvider --> `ItemProvider` (providerName)


* **use-tree-view-node-context.tsx** --> `item.provider.tsx`
* TreeViewNodeStateProvider --> `NodeStateProvider` (exposed providerName)
* useTreeViewNodeContext --> `useNodeContext` (hookName)
* TreeViewNodeContext --> `NodeContext` (name)
* TreeViewNodeProvider --> `NodeProvider` (providerName)



* **use-tree-view.tsx** --> `component.selector.tsx` (to create and connect machine service)
* useTreeView --> `useComponent` (hookName)


* **tree-view-tree.tsx** --> `????` 
* TreeViewTree --> `????` (displayName)
  * _useTreeViewContext()_



* **render-strategy.ts** --> `render.provider.tsx` (lazy load, mounting strategy)
* RenderStrategyPropsProvider --> `RenderProvider` (exposed providerName)
* useRenderStrategyContext --> `useRenderContext` (hookName)
* RenderStrategyContext --> `RenderContext` (name)
* RenderStrategyPropsProvider --> `RenderProvider` (providerName)

