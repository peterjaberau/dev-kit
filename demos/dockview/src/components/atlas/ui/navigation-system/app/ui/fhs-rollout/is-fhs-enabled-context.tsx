import { createContext } from 'react';
import type { Get } from './types';

/**
 * __Is fhs enabled context__
 *
 * Tracks is FHS enabled.
 * Defaults to feature gate 'navx-full-height-sidebar'.
 */
export const IsFhsEnabledContext = createContext<boolean | Get<boolean>>(() => true);
