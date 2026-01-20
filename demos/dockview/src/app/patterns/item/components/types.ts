
import { RefObject } from "react"

export interface Props {
  [key: string]: any
}


/**
 * Tokens definition for inline CSS custom properties.
 * - `$name` keys become `--name` CSS properties
 * - `#name` keys become `--name-color` and `--name-color-rgb` CSS properties
 */
export type TokenValue = string | number | undefined | null
export type Tokens = {
  [key: `$${string}` | `#${string}`]: TokenValue
}



/**
 * Type for element modifiers (mods prop).
 * Can be used as a generic to define known modifiers with autocomplete:
 * @example
 * type ButtonMods = Mods<{
 *   loading?: boolean;
 *   selected?: boolean;
 * }>;
 */
export type Mods<T extends Record<string, ModValue> = {}> = T & {
  [key: string]: ModValue;
};
/** Allowed mod value types */
export type ModValue = boolean | string | number | undefined | null;



/* ---------------------------------------------------------------------------------------------
* Item Props
* -------------------------------------------------------------------------------------------*/


/** Known modifiers for Item component */
export type ItemMods = Mods<{
  'has-icon'?: boolean;
  'has-start-content'?: boolean;
  'has-end-content'?: boolean;
  'has-right-icon'?: boolean;
  'has-label'?: boolean;
  'has-prefix'?: boolean;
  'has-suffix'?: boolean;
  'has-description'?: boolean;
  'has-actions'?: boolean;
  'has-actions-content'?: boolean;
  'show-actions-on-hover'?: boolean;
  'preserve-actions-space'?: boolean;
  checkbox?: boolean;
  disabled?: boolean;
  selected?: boolean;
  loading?: boolean;
  size?: string;
  description?: string;
  type?: string;
  theme?: string;
  shape?: string;
}>;




export interface CubeItemProps extends BaseProps, ContainerStyleProps {
  icon?: DynamicIcon<ItemMods> | "checkbox"
  rightIcon?: DynamicIcon<ItemMods>
  prefix?: ReactNode
  suffix?: ReactNode
  description?: ReactNode
  descriptionPlacement?: "inline" | "block"
  /**
   * Whether the item is selected.
   * @default false
   */
  isSelected?: boolean
  /**
   * Actions to render inline or placeholder mode for ItemButton wrapper.
   * - ReactNode: renders actions inline as part of the grid layout
   * - true: placeholder mode for ItemButton (enables --actions-width calculation)
   */
  actions?: ReactNode | true
  /**
   * When true, actions are hidden by default and shown only on hover, focus, or focus-within.
   * Uses opacity transition for visual hiding while maintaining layout space.
   */
  showActionsOnHover?: boolean
  /**
   * When true, preserves the actions width when hidden (only changes opacity).
   * Only applies when showActionsOnHover is true.
   * @default false
   */
  preserveActionsSpace?: boolean
  /**
   * When true, disables focus on action buttons by setting tabIndex={-1}.
   * @default true
   */
  disableActionsFocus?: boolean
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "inline" | number | (string & {})
  type?: "item" | "header" | "primary" | "secondary" | "outline" | "neutral" | "clear" | "link" | "card" | (string & {})
  theme?: "default" | "danger" | "success" | "special" | "note" | (string & {})
  /** Keyboard shortcut that triggers the element when pressed */
  hotkeys?: string
  /**
   * Tooltip content and configuration:
   * - string: simple tooltip text
   * - true: auto tooltip on overflow (shows children as tooltip when truncated)
   * - object: advanced configuration with optional auto property
   */
  tooltip?: string | boolean | (Omit<CubeTooltipProviderProps, "children"> & { auto?: boolean })
  /**
   * HTML button type to avoid implicit form submission when used as `as="button"`.
   * Kept separate from visual `type` prop.
   */
  htmlType?: "button" | "submit" | "reset"
  labelProps?: Props
  descriptionProps?: Props
  keyboardShortcutProps?: Props
  /**
   * The slot which the loading icon should replace in loading state.
   * - "auto": Smart selection - prefers icon if present, then rightIcon, fallback to icon
   * - Specific slot names: Always use that slot
   * @default "auto"
   */
  loadingSlot?: "auto" | "icon" | "rightIcon" | "prefix" | "suffix"
  /**
   * When true, shows loading state by replacing the specified slot with LoadingIcon
   * and makes the component disabled.
   */
  isLoading?: boolean
  /**
   * Shape of the item's border radius.
   * - `card` - Card shape with larger border radius (`1cr`)
   * - `button` - Button shape with default border radius (default)
   * - `sharp` - Sharp corners with no border radius (`0`)
   * - `pill` - Pill shape with fully rounded ends (`round`)
   * @default "button"
   */
  shape?: "card" | "button" | "sharp" | "pill"
  /**
   * @private
   * Default tooltip placement for the item.
   * @default "top"
   */
  defaultTooltipPlacement?: OverlayProps["placement"]
  /**
   * Ref to access the label element directly
   */
  labelRef?: RefObject<HTMLElement>
  /**
   * Heading level for the Label element when type="header" or type="card".
   * Changes the Label's HTML tag to the corresponding heading (h1-h6).
   * @default 3
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /**
   * String to highlight within children.
   * Only works when children is a plain string.
   */
  highlight?: string
  /**
   * Whether highlight matching is case-sensitive.
   * @default false
   */
  highlightCaseSensitive?: boolean
  /**
   * Custom styles for highlighted text.
   */
  highlightStyles?: Styles
  /**
   * Variant of the item.
   */
  variantMode?: 'default' | 'danger' | 'success' | 'special'
  variant?: 'primary' | 'secondary' | 'outline' | 'neutral' | 'clear' | 'link' | 'card'

}
