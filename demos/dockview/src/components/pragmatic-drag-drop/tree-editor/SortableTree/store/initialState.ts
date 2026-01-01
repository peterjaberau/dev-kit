import type {
  FlattenNode,
  Projected,
  RenderNodeProps,
  TreeData,
  UniqueIdentifier,
  VirtualConfig,
} from '../types';
import { TreeDataDispatchPayload } from './treeDataReducer';

export type OnTreeDataChange<T = any> = (
  treeData: TreeData<T>,
  event: TreeDataDispatchPayload,
) => void;

export interface ControlledState {
  hideAdd?: boolean;
  hideRemove?: boolean;
  disableDrag?: boolean;
  indentationWidth?: number;
  onSelectedIdsChange?: (selectedIds: UniqueIdentifier[]) => void;
}


export interface State<T = any> extends ControlledState {
  treeData: TreeData;
  selectedIds?: UniqueIdentifier[];
  activeId?: UniqueIdentifier;
  overId?: UniqueIdentifier;
  offsetLeft: number;
  currentPosition?: {
    parentId: UniqueIdentifier | null;
    overId: UniqueIdentifier;
  };
  onTreeDataChange?: OnTreeDataChange;
  renderContent: RenderNodeProps;
  renderExtra: RenderNodeProps;
  sortableRule?: (data: {
    activeNode: FlattenNode<T>;
    targetNode: FlattenNode<T>;
    projected: Projected;
  }) => boolean;
  virtual?: VirtualConfig;
}

export const initialDragState: Pick<
  State,
  'offsetLeft' | 'overId' | 'activeId' | 'currentPosition'
> = {
  offsetLeft: 0,
  overId: null,
  activeId: null,
  currentPosition: null,
} as any;

export const initialState: State = {
  indentationWidth: 24,
  treeData: [],
  selectedIds: [],
  renderContent: undefined,
  renderExtra: undefined,
  hideAdd: false,
  virtual: false,
  disableDrag: false,
  hideRemove: false,
  ...initialDragState,
} as any;
