import { atom } from "jotai";
import {
  createAtomWithStorage,
  log,
  namedAtom,
} from "../../atoms/utils/atom-helpers";
import {
  DEFAULT_GLOBAL_VIEW_OPTIONS,
  SIDEBAR_WIDTH_PX_MIN,
  SIDEBAR_WIDTH_PX_MAX,
  SIDEBAR_WIDTH_PX_DEFAULT
} from "../../../lib/contants";


/**
 * Update global view options
 * Usage: set(updateGlobalViewOptionsAtom, { sidePanelWidth: 30 })
 */
export const updateGlobalViewOptionsAtom = atom(
  null,
  (get, set, updates: Partial<any>) => {
    const current = get(globalViewOptionsAtom);
    set(globalViewOptionsAtom, { ...current, ...updates });
  },
);
updateGlobalViewOptionsAtom.debugLabel = "updateGlobalViewOptionsAtom";


/**
 * Global view options stored in localStorage
 * UI preferences that apply across all views
 */
export const globalViewOptionsAtom = createAtomWithStorage<any>(
  "global-view-options",
  DEFAULT_GLOBAL_VIEW_OPTIONS,
);
globalViewOptionsAtom.debugLabel = "globalViewOptionsAtom";

export const sideBarWidthAtom = atom(
  (get) => {
    const rawValue = get(globalViewOptionsAtom).sideBarWidth;
    return getSanitizedSidebarWidth(rawValue);
  },
  (get, set, update: number | ((value: number) => number)) => {
    const rawValue = get(globalViewOptionsAtom).sideBarWidth;
    const current = getSanitizedSidebarWidth(rawValue);
    const next = clampSidebarWidthPx(
      typeof update === "function" ? update(current) : update,
    );
    set(updateGlobalViewOptionsAtom, { sideBarWidth: next });
  },
);
sideBarWidthAtom.debugLabel = "sideBarWidthAtom";


const clampSidebarWidthPx = (value: number) =>
  Math.min(SIDEBAR_WIDTH_PX_MAX, Math.max(SIDEBAR_WIDTH_PX_MIN, value));

const getSanitizedSidebarWidth = (value: unknown) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return SIDEBAR_WIDTH_PX_DEFAULT;
  }
  return clampSidebarWidthPx(value);
};
