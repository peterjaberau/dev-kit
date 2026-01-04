# 1. Making an item a drop target



[//]: # (https://atlassian.design/components/navigation-system/side-nav-items/drag-and-drop#making-a-menu-item-a-drop-target)
- call dropTargetForElementsuse with `visualContentRef`
- all list and tree items should have the visualContentRef




```javascript
// Predefined component example
function Item({ item }) {
    const { draggableButtonRef, dropTargetRef } = useMenuItemDragAndDrop({});

    return (
        <ButtonMenuItem visualContentRef={dropTargetRef} ref={draggableButtonRef}>
            {item.content}
        </ButtonMenuItem>
    );
}

# custom component example
function Item({ item }) {
  const dropTargetRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    const dropTarget = dropTargetRef.current;
    invariant(element && dropTarget);

    return combine(
      // make the menu item a drop target
      dropTargetForElements({
        element: dropTarget,
        // make the drop target sticky
        getIsSticky: () => true,
        // prevent dropping on self
        canDrop: ({ source }) => source.element !== element && source.data.type === 'menu-item',
      }),
      // make the menu item draggable
      draggable({
        element,
      }),
    );
  }, []);

  return (
    <ButtonMenuItem ref={ref} visualContentRef={dropTargetRef}>
      {item.content}
    </ButtonMenuItem>
  );
}






```
- useMenuItemDragAndDrop()
- ButtonMenuItem
