import { StateCreator } from 'zustand/vanilla';

import { dataFlattenSelector } from '..';
import produce from 'immer';
import { MouseEvent } from 'react';
import { UniqueIdentifier } from '../../types';
import { InternalSortableTreeStore } from '../store';

export interface SelectionPublicAction {
  toggleNode: (id: UniqueIdentifier) => void;
  selectedNode: (id: UniqueIdentifier) => void;
  deselectedAll: () => void;
}

export interface SelectionSliceAction extends SelectionPublicAction {
  updateSelectedIds: (selectedKeys: UniqueIdentifier[]) => void;
  multiSelectNode: (id: UniqueIdentifier) => void;
  rowSelectNode: (id: UniqueIdentifier) => void;
  withKeyboardSelectNode: (event: MouseEvent<any>, id: UniqueIdentifier) => void;
}

export const selectionSlice: StateCreator<
  InternalSortableTreeStore,
  [['zustand/devtools', never]],
  [],
  SelectionSliceAction
> = (set, get) => ({
  updateSelectedIds: (selectedIds) => {
    set({ selectedIds });
    get().onSelectedIdsChange?.(selectedIds);
  },
  toggleNode: (id) => {
    const { selectedIds }: any = get();
    set(
      produce((s: any) => {
        if (!selectedIds.includes(id)) {
          s.selectedIds.push(id);
        } else {
          s.selectedIds = selectedIds.filter((key: any) => key !== id);
        }
      }),
    );
  },
  withKeyboardSelectNode: (e, id) => {
    const { multiSelectNode, rowSelectNode, selectedNode } = get();
    if (e.metaKey) {
      multiSelectNode(id);
      return;
    }

    if (e.shiftKey) {
      rowSelectNode(id);
      return;
    }

    selectedNode(id);
  },

  rowSelectNode: (id) => {
    const { selectedIds, updateSelectedIds }: any = get();
    if (selectedIds.length === 0) {
      updateSelectedIds([id]);
      return;
    }

    const dataFlatten = dataFlattenSelector(get());

    const currentIndex = dataFlatten.findIndex((d) => d.id === id);
    const activeIndex = dataFlatten.findIndex((d) => d.id === selectedIds[0]);

    if (selectedIds.length === 1) {
      let ids = selectedIds;
      if (activeIndex === currentIndex) {
        ids = [];
      } else if (activeIndex > currentIndex) {
        ids = dataFlatten.slice(currentIndex, activeIndex + 1).map((d) => d.id);
      } else {
        ids = dataFlatten.slice(activeIndex, currentIndex + 1).map((d) => d.id);
      }
      updateSelectedIds(ids);
    }
  },
  selectedNode: (id) => {
    const { selectedIds, updateSelectedIds } = get();

    if (selectedIds?.includes(id)) {
      updateSelectedIds([]);
    } else {
      updateSelectedIds([id]);
    }
  },
  deselectedAll: () => {
    const { updateSelectedIds } = get();

    updateSelectedIds([]);
  },
  multiSelectNode: (id) => {
    const { selectedIds, updateSelectedIds }: any = get();
    if (selectedIds?.includes(id)) {
      updateSelectedIds(
        produce(selectedIds, (draft: any) => {
          draft.splice(draft.indexOf(id), 1);
        }),
      );
    } else {
      updateSelectedIds([...selectedIds, id]);
    }
  },
});
