* Sidebar.GroupContent -------> Tree      ---- (sidebar-nav.tsx) root.tsx
* Sidebar.Menu ---------------> Node      ---- (sidebar-nav.tsx) node.tsx

  
---hooks--------
* DropTarget-Item -------------> Node.Drop      ---- (drop-target-item.tsx) node.drop.tsx
* Draggable-Item -------------> Node.Drag       ---- (draggable-item.tsx) node.drag.tsx
----------------


* Draggable-ProjectGroupItem --> Node.Drag.Branch     ----(draggable-project-group-item.tsx) node.drag-branch.tsx
* Draggable-ProjectItem -------> Node.Drag.Item       ----(draggable-project-item.tsx)  node.drag-item.tsx
  
* Sidebar-MenuItem ------------> Branch or Item       ---(sidebar-menu-item.tsx)  branch.tsx or item.tsx
* Sidebar-MenuButton ----------> Branch or Item       ---(sidebar-menu-button.tsx) branch.tsx or item.tsx
  
  
-----(same file)
* DropTarget-SidebarItem ----->  Item.Drop             ----(drop-target-sidebar-item.tsx)  branch.drop.tsx or item.drop.tsx
* DropTarget-SidebarGroup --->  Branch.Drop            ----(drop-target-sidebar-item.tsx)  branch.drop.tsx or item.drop.tsx
-----
  
-----(same file)
* Draggable-SidebarItem ----->   Item.Drag             ----(draggable-sidebar-item.tsx)    branch.drag.tsx or item.drag.tsx
* Draggable-SidebarGroupItem -----> Branch.Drag       ----(draggable-sidebar-item.tsx)     branch.drag.tsx or item.drag.tsx
-----
  
```html





```



# Definitions
* **Drop Indicator:**
  * `<GroupDropIndicator /> | <DropIndicator />`: **States**: _is-over | is-innermost-over_
    * _For Nested Tree_:  `<GroupDropIndicator isActive />` when `is-innermost-over`
    * _For List _:  `<GroupDropIndicator isActive />` when `is-over`
    * _For Item in the List (leaf)_:  `<DropIndicator isActive />` when `is-over`

* **Hitbox:**
  * `Instruction outcome`: **operations** _combine | reorder-above | reorder-after_


# Nested (multi-levels dragging)

* **Drop Indicator:** GroupDropIndicator 
* **State:** is-innermost-over


* Tree: use DropIndicator + in-most-over
* List: use GroupDropIndicator + is-over
* Item (leaf): use DropIndicator + is-over

```html

  <DropIndicator 
          instruction={{
            operation: "reorder-above | reorder-below | combine",
            axis:"vertical | horizontal",
            blocked: true | false
          }}
            isActive={state === 'is-over | is-innermost-over'} ref={ref}
  >
  {children}
  </GroupDropIndicator>



```
