export const config : any = {
  layout: {
    constants: {
      GRAPH_COLUMN_WIDTH: 650,
      GRAPH_ROW_HEIGHT: 20,
      GRAPH_NODE_WIDTH: 450,
      GRAPH_NODE_HEIGHT: 20,
      GRAPH_NODE_VALUE_HEIGHT: 16,
      GRAPH_NODE_VALUE_MARGIN: 2,
      GRAPH_NODE_VALUES_PADDING: 3,
      GRAPH_ROW_MARGIN: 4,
      MINIMUM_CANVAS_RENDER_SCALE: 0.1,
      MAXIMUM_CANVAS_RENDER_SCALE: 2,
      HEADER_HEIGHT: 55,
      SIDEBAR_WIDTH: 250,
      ORDERED_TOKEN_FILTER_CATEGORIES: ["theme", "color", "scale"],
      CATEGORIZED_TOKEN_FILTERS: {
        theme: ["spectrum"],
        color: ["light", "dark", "wireframe"],
        scale: ["desktop", "mobile"],
      },
      CATEGORIZED_TOKEN_FILTER_LABELS: {
        theme: "Theme",
        color: "Color Theme",
        scale: "Scale",
      },
    }
  },
  graphGrid: {
    constants: {
      maximumRepeatingTileSize: 200,
      cellFadeOutThresh: 50,
      lineWidth: 1,
    },
    props: {
      scale: 1,
      posx: 0,
      posy: 0,
      colorTheme: "paper",
      size: 7,
    },
  }
}

const layoutConstants: any = config.layout.constants
const graphGridConstants: any = config.graphGrid.constants
const graphGridDefaults: any = config.graphGrid.props
