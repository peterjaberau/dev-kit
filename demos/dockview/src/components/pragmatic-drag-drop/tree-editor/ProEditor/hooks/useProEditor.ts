import { useMemoizedFn } from 'ahooks';
import { useMemo } from 'react';

import { ConfigPublicAction } from '../store/slices/config';
import { GeneralPublicAction } from '../store/slices/general';

import { useStoreApi } from '../store';

export interface ProEditorInstance<Config = any, Props = any>
  extends ConfigPublicAction,
    GeneralPublicAction {
  getConfig: () => Config | null;
  getProps: () => Props;
}

export const useProEditor = <T>(): ProEditorInstance<T> => {
  const storeApi = useStoreApi();

  const {
    undoStack,
    undoLength,
    redoLength,
    redoStack,
    setConfig,
    exportConfig,
    resetConfig,
    undo,
    redo,
  } = storeApi.getState();

  const getConfig = useMemoizedFn(() => storeApi.getState().config);
  const getProps = useMemoizedFn(() => storeApi.getState().props);

  return useMemo(
    () => ({
      getConfig,
      setConfig,
      exportConfig,
      resetConfig,

      undo,
      redo,
      undoStack,
      redoStack,
      undoLength,
      redoLength,

      getProps,
    }),
    [],
  );
};
