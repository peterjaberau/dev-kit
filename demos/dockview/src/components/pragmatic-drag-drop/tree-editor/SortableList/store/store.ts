import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { isEqual } from "lodash"
import type { StateCreator } from 'zustand/vanilla';
import type { SortableListState } from '../type';
import { SortableListDispatchPayload } from '../type';
import { getIndexOfActiveItem } from '../utils';
import { initialState } from './initialState';
import { keyManagerReducer } from './keyManagerReducer';
import { listDataReducer } from './listDataReducer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Action {
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  handleDragCancel: () => void;
  dispatchListData: (payload: SortableListDispatchPayload) => void;
}

export type Store = SortableListState & Action;

const vanillaStore: StateCreator<Store, [['zustand/devtools', never]]> = (set, get) => ({
  ...initialState,
  handleDragStart: ({ active: { id: activeId } }) => {
    if (!activeId) {
      return;
    }
    set({ activeId });
  },
  handleDragEnd: ({ over, active }) => {
    const { dispatchListData, keyManager }: any = get();
    if (over) {
      const activeIndex = getIndexOfActiveItem(keyManager, active.id);
      const overIndex = getIndexOfActiveItem(keyManager, over.id);

      dispatchListData({
        type: 'moveItem',
        activeIndex: activeIndex,
        overIndex: overIndex,
      });
    }
    set({ activeId: null });
  },
  handleDragCancel: () => {
    set({ activeId: null });
  },
  // ===== Update the listData method ======= //
  dispatchListData: (payload) => {
    const { value, keyManager, onChange }: any = get();
    const data = listDataReducer(value, payload);
    // When the value value changes, the keyManager needs to change as well
    const keys = keyManagerReducer(keyManager, payload);

    if (data) {
      if (isEqual(value, data)) return;
      set({ value: data, keyManager: keys });
      if (onChange) onChange(data, payload);
    }
  },
});

export default vanillaStore;
