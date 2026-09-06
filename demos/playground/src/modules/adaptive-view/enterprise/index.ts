import { DockviewModule, registerModules } from '../core';
import { KeyboardNavigationModule } from './keyboardNavigationService';
import { LayoutHistoryModule } from './layoutHistoryService';
import { DndCompassModule } from './dndCompassService';
import { SmartGuidesModule } from './smartGuidesService';
import { AutoHideEdgeGroupModule } from './autoHideEdgeGroupService';
import { AutoEdgeGroupModule } from './autoEdgeGroupService';
import { MultiRowTabsModule } from './multiRowTabsService';
import { PinnedTabsModule } from './pinnedTabsService';
import { AdvancedOverflowModule } from './advancedOverflowService';
import { KeyboardDockingModule } from './keyboardDockingService';

// Re-export the full dockview (free) API so `dockview-enterprise` is a drop-in
// superset of `dockview`.
export * from '../core';

// The TabGroupChips and ContextMenu modules are free and live in
// dockview-core; `export * from '../core'` above re-exports them, so
// `dockview-enterprise` stays a drop-in superset.
export {
    KeyboardNavigationService,
    KeyboardNavigationModule,
} from './keyboardNavigationService';
export {
    LayoutHistoryService,
    LayoutHistoryModule,
} from './layoutHistoryService';
export { DndCompassService, DndCompassModule } from './dndCompassService';
export { SmartGuidesService, SmartGuidesModule } from './smartGuidesService';
export {
    AutoHideEdgeGroupService,
    AutoHideEdgeGroupModule,
} from './autoHideEdgeGroupService';
export {
    AutoEdgeGroupService,
    AutoEdgeGroupModule,
} from './autoEdgeGroupService';
export { MultiRowTabsService, MultiRowTabsModule } from './multiRowTabsService';
export {
    PinnedTabsService,
    PinnedTabsModule,
    computePinnedFirstOrder,
} from './pinnedTabsService';
export {
    AdvancedOverflowService,
    OverflowListView,
    AdvancedOverflowModule,
    matchesQuery,
} from './advancedOverflowService';
export { MruTracker } from './mruTracker';
export {
    KeyboardDockingService,
    KeyboardDockingModule,
} from './keyboardDockingService';

/**
 * The enterprise feature modules. Registered automatically on import (below),
 * so importing `dockview-enterprise` activates them for every component in
 * the process.
 */
export const Modules: DockviewModule<any>[] = [
    KeyboardNavigationModule,
    LayoutHistoryModule,
    DndCompassModule,
    SmartGuidesModule,
    AutoHideEdgeGroupModule,
    AutoEdgeGroupModule,
    MultiRowTabsModule,
    PinnedTabsModule,
    AdvancedOverflowModule,
    KeyboardDockingModule,
];

// Self-register on import (a side effect, hence `sideEffects: true` in
// package.json). This makes the package batteries-included: no explicit
// registerModules() call is required of the consumer.
registerModules(Modules);
