import isEqual from 'fast-deep-equal';
import type { StateCreator } from 'zustand';
import { optionalDevtools } from 'zustand-utils';
import { DevtoolsOptions } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

import { ConfigPublicState, ConfigSlice, configSlice } from './slices/config';
import { GeneralSlice, generalSlice } from './slices/general';

export type ProEditorState<Config = any> = ConfigPublicState<Config>;

export type InternalProEditorStore = ProEditorState & ConfigSlice & GeneralSlice;

const vanillaStore: StateCreator<InternalProEditorStore, [['zustand/devtools', never]]> = (
  ...params
) => ({
  ...generalSlice(...params),
  ...configSlice(...params),
});

export const createStore = (options: boolean | DevtoolsOptions = false) => {
  const devtools = optionalDevtools(options !== false);

  const devtoolOptions =
    options === false ? undefined : options === true ? { name: 'ProEditorStore' } : options;

  return createWithEqualityFn<InternalProEditorStore>()(
    devtools(vanillaStore, devtoolOptions),
    isEqual,
  );
};
