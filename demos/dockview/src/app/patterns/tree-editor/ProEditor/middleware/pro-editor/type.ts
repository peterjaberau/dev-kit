import { StateCreator } from 'zustand/vanilla';
import { ConfigPublicAction } from '../../store/slices/config';
import { TakeTwo, Write } from '../types/utils';

export interface ProEditorSetStateAction {
  type: unknown;

  name?: string;
  recordHistory?: boolean;
}


export interface ProEditorMiddlewareInjectMethod<Sa extends unknown[], Sr, T, A> {
  setState<A1 extends string | ProEditorSetStateAction>(...a: [...a: TakeTwo<Sa>, action?: A1]): Sr;

  proEditor: {
    undo?: () => void;
    redo?: () => void;
    // clearStorage: () => void;
    getOptions: () => Partial<ProEditorOptions<T, A>>;
  };
}

export interface ProEditorOptions<S, EditorSaveState = S> {
  /** Name of the storage (must be unique) */
  name: string;
  /**
   * Filter the persisted value.
   *
   * @params state The state's value
   */
  partialize?: (state: S) => EditorSaveState;
}


type WithProEditor<S, A> = S extends {
  getState: () => infer T;
  setState: (...a: infer Sa) => infer Sr;
}
  ? Write<S, ProEditorMiddlewareInjectMethod<Sa, Sr, T, A>>
  : never;

declare module 'zustand/vanilla' {
  interface StoreMutators<S, A> {
    ['pro-editor']: WithProEditor<S, A>;
  }
}

export type ProEditorImpl = <T>(
  storeInitializer: StateCreator<T, [['pro-editor', unknown]], []>,
  options: ProEditorOptions<T, T>,
) => StateCreator<T, [['pro-editor', unknown]], []>;

export interface InjectInternalProEditor {
  proEditor: {
    __INTERNAL_SET_CONFIG__NOT_USE_IT: ConfigPublicAction['setConfig'];
  };
}
