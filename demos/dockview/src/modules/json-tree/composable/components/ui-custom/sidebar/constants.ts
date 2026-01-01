export const SIDEBAR_COOKIE_NAME = "sidebar_state"
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_WIDTH_MOBILE = "18rem"
export const SIDEBAR_WIDTH_ICON = "3rem"
export const SIDEBAR_KEYBOARD_SHORTCUT = "b"
export const SIDEBAR_RESIZE_THRESHOLD = 4
export const SIDEBAR_KEYBOARD_STEP = 16
export const SIDEBAR_KEYBOARD_STEP_LARGE = 32

export const clampSidebarWidth = (value: number) => Math.min(SIDEBAR_WIDTH_PX_MAX, Math.max(SIDEBAR_WIDTH_PX_MIN, value))
