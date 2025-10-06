export const ValuePathSplitter = ":^;";
export const ValuesListSplitter = ":*;";

/** GRAPH_GRID & LAYOUT */
export const GRAPH_COLUMN_WIDTH = 650;
export const GRAPH_ROW_HEIGHT = 20;
export const GRAPH_NODE_WIDTH = 450;
export const GRAPH_NODE_HEIGHT = 20;
export const GRAPH_NODE_VALUE_HEIGHT = 16;
export const GRAPH_NODE_VALUE_MARGIN = 2;
export const GRAPH_NODE_VALUES_PADDING = 3;
export const GRAPH_ROW_MARGIN = 4;
export const MINIMUM_CANVAS_RENDER_SCALE = 0.1;
export const MAXIMUM_CANVAS_RENDER_SCALE = 2;
export const HEADER_HEIGHT = 55;
export const SIDEBAR_WIDTH = 250;

/** GRAPH_ADJACENCY */
export const GRAPH_ADJACENCY_VERTICAL_PADDING = 10;

/** SEARCH */
export const ORDERED_TOKEN_FILTER_CATEGORIES: string[] = [
  "theme",
  "color",
  "scale",
];

export const CATEGORIZED_TOKEN_FILTERS: { [category: string]: string[] } = {
  theme: ["spectrum"],
  color: ["light", "dark", "wireframe"],
  scale: ["desktop", "mobile"],
};

export const CATEGORIZED_TOKEN_FILTER_LABELS: { [category: string]: string } = {
  theme: "Theme",
  color: "Color Theme",
  scale: "Scale",
};

/** STYLES */
export const SEARCH_COLOR_ORPHAN_CATEGORY_NODE = "rgb(0, 140, 186)";
export const SEARCH_COLOR_COMPONENT_NODE = "rgb(208, 208, 208)"
export const SEARCH_COLOR_TOKEN_NODE = "rgb(211, 65, 213)"


const TABS_COLOR_ORPHAN_CATEGORY_NODE = "rgb(0, 140, 186)"
const TABS_COLOR_COMPONENT_NODE = "rgb(208, 208, 208)"
const TABS_COLOR_TOKEN_NODE = "rgb(211, 65, 213)"
