import {
  ListItem,
  ListItemButton,
  ListItemDeleteButton,
  ListItemDragHandle,
  ListItemDragPreview,
  ListItemTitle,
  ListItemWrapper,
} from './ListItem';
import { ListRoot } from './ListRoot';

// TODO(burdon): Multi-select model.
// TODO(burdon): Key nav.
// TODO(burdon): Animation.
// TODO(burdon): Constrain axis.
// TODO(burdon): Tree view.
// TODO(burdon): Fix autoscroll while dragging.

/**
 * Draggable list.
 * Ref: https://github.com/atlassian/pragmatic-drag-and-drop
 * Ref: https://github.com/alexreardon/pdnd-react-tailwind/blob/main/src/task.tsx
 */
export const List = {
  Root: ListRoot,
  Item: ListItem,
  ItemDragPreview: ListItemDragPreview,
  ItemWrapper: ListItemWrapper,
  ItemDragHandle: ListItemDragHandle,
  ItemDeleteButton: ListItemDeleteButton,
  ItemButton: ListItemButton,
  ItemTitle: ListItemTitle,
};


export type { ListItem };
