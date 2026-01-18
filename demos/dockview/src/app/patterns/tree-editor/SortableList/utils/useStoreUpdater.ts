import { devtools } from 'zustand/middleware';
import type { StateCreator } from 'zustand/vanilla';

export type ZustandStoreWithDevTools<T> = StateCreator<T, [['zustand/devtools', never]]>;

/**
 * Make whether or not to enable devtools optional
 * Refs: https://github.com/pmndrs/zustand/discussions/1266
 */

export const optionalDevtools = (showDevTools: boolean) =>
  (showDevTools ? devtools : (f) => f) as typeof devtools;
