import { dictionary, nodes, adjacencyList, graphNodeTypeLookup } from "./common"

// Workers
const graphLayoutWorker = {
  "graphModelState": {
    "width": 2600,
    "height": 3537,
    "topologyKey": "9ct89",
    "nodes": {
      "accordion": {
        "type": "component",
        "id": "accordion",
        "x": 0,
        "y": 0
      },
      "checkbox": {
        "type": "component",
        "id": "checkbox",
        "x": 0,
        "y": 378
      },
      "tab-item": {
        "type": "component",
        "id": "tab-item",
        "x": 0,
        "y": 1782
      },
      "side-navigation": {
        "type": "component",
        "id": "side-navigation",
        "x": 0,
        "y": 1566
      },
      "accordion-top-to-text-compact-small": {
        "type": "token",
        "id": "accordion-top-to-text-compact-small",
        "x": 650,
        "y": 469.125,
        "value": "2px"
      },
      "accordion-top-to-text-regular-small": {
        "type": "token",
        "id": "accordion-top-to-text-regular-small",
        "x": 650,
        "y": 577.125
      },
      "accordion-small-top-to-text-spacious": {
        "type": "token",
        "id": "accordion-small-top-to-text-spacious",
        "x": 650,
        "y": 361.125
      },
      "accordion-top-to-text-compact-medium": {
        "type": "token",
        "id": "accordion-top-to-text-compact-medium",
        "x": 650,
        "y": 442.125,
        "value": "4px"
      },
      "accordion-top-to-text-regular-medium": {
        "type": "token",
        "id": "accordion-top-to-text-regular-medium",
        "x": 650,
        "y": 550.125
      },
      "accordion-top-to-text-spacious-medium": {
        "type": "token",
        "id": "accordion-top-to-text-spacious-medium",
        "x": 650,
        "y": 658.125
      },
      "accordion-top-to-text-compact-large": {
        "type": "token",
        "id": "accordion-top-to-text-compact-large",
        "x": 650,
        "y": 415.125
      },
      "accordion-top-to-text-regular-large": {
        "type": "token",
        "id": "accordion-top-to-text-regular-large",
        "x": 650,
        "y": 523.125
      },
      "accordion-top-to-text-spacious-large": {
        "type": "token",
        "id": "accordion-top-to-text-spacious-large",
        "x": 650,
        "y": 631.125
      },
      "accordion-top-to-text-compact-extra-large": {
        "type": "token",
        "id": "accordion-top-to-text-compact-extra-large",
        "x": 650,
        "y": 388.125
      },
      "accordion-top-to-text-regular-extra-large": {
        "type": "token",
        "id": "accordion-top-to-text-regular-extra-large",
        "x": 650,
        "y": 496.125
      },
      "accordion-top-to-text-spacious-extra-large": {
        "type": "token",
        "id": "accordion-top-to-text-spacious-extra-large",
        "x": 650,
        "y": 604.125
      },
      "accordion-bottom-to-text-compact-small": {
        "type": "token",
        "id": "accordion-bottom-to-text-compact-small",
        "x": 650,
        "y": -313.875
      },
      "accordion-bottom-to-text-regular-small": {
        "type": "token",
        "id": "accordion-bottom-to-text-regular-small",
        "x": 650,
        "y": -205.875
      },
      "accordion-bottom-to-text-spacious-small": {
        "type": "token",
        "id": "accordion-bottom-to-text-spacious-small",
        "x": 650,
        "y": -97.875
      },
      "accordion-bottom-to-text-compact-medium": {
        "type": "token",
        "id": "accordion-bottom-to-text-compact-medium",
        "x": 650,
        "y": -340.875
      },
      "accordion-bottom-to-text-regular-medium": {
        "type": "token",
        "id": "accordion-bottom-to-text-regular-medium",
        "x": 650,
        "y": -232.875
      },
      "accordion-bottom-to-text-spacious-medium": {
        "type": "token",
        "id": "accordion-bottom-to-text-spacious-medium",
        "x": 650,
        "y": -124.875
      },
      "accordion-bottom-to-text-compact-large": {
        "type": "token",
        "id": "accordion-bottom-to-text-compact-large",
        "x": 650,
        "y": -367.875
      },
      "accordion-bottom-to-text-regular-large": {
        "type": "token",
        "id": "accordion-bottom-to-text-regular-large",
        "x": 650,
        "y": -259.875
      },
      "accordion-bottom-to-text-spacious-large": {
        "type": "token",
        "id": "accordion-bottom-to-text-spacious-large",
        "x": 650,
        "y": -151.875
      },
      "accordion-bottom-to-text-compact-extra-large": {
        "type": "token",
        "id": "accordion-bottom-to-text-compact-extra-large",
        "x": 650,
        "y": -394.875
      },
      "accordion-bottom-to-text-regular-extra-large": {
        "type": "token",
        "id": "accordion-bottom-to-text-regular-extra-large",
        "x": 650,
        "y": -286.875
      },
      "accordion-bottom-to-text-spacious-extra-large": {
        "type": "token",
        "id": "accordion-bottom-to-text-spacious-extra-large",
        "x": 650,
        "y": -178.875
      },
      "accordion-minimum-width": {
        "type": "token",
        "id": "accordion-minimum-width",
        "x": 650,
        "y": 334.125
      },
      "accordion-disclosure-indicator-to-text": {
        "type": "token",
        "id": "accordion-disclosure-indicator-to-text",
        "x": 650,
        "y": 91.125,
        "value": "0px"
      },
      "accordion-edge-to-disclosure-indicator": {
        "type": "token",
        "id": "accordion-edge-to-disclosure-indicator",
        "x": 650,
        "y": 226.125,
        "value": "0px"
      },
      "accordion-edge-to-text": {
        "type": "token",
        "id": "accordion-edge-to-text",
        "x": 650,
        "y": 253.125,
        "value": "0px"
      },
      "accordion-focus-indicator-gap": {
        "type": "token",
        "id": "accordion-focus-indicator-gap",
        "x": 650,
        "y": 280.125,
        "value": "0px"
      },
      "accordion-content-area-top-to-content": {
        "type": "token",
        "id": "accordion-content-area-top-to-content",
        "x": 650,
        "y": 64.125
      },
      "accordion-content-area-bottom-to-content": {
        "type": "token",
        "id": "accordion-content-area-bottom-to-content",
        "x": 650,
        "y": -70.875
      },
      "accordion-top-to-text-spacious-small": {
        "type": "token",
        "id": "accordion-top-to-text-spacious-small",
        "x": 650,
        "y": 685.125
      },
      "accordion-content-area-edge-to-content-small": {
        "type": "token",
        "id": "accordion-content-area-edge-to-content-small",
        "x": 650,
        "y": 37.125
      },
      "accordion-content-area-edge-to-content-medium": {
        "type": "token",
        "id": "accordion-content-area-edge-to-content-medium",
        "x": 650,
        "y": 10.125
      },
      "accordion-content-area-edge-to-content-large": {
        "type": "token",
        "id": "accordion-content-area-edge-to-content-large",
        "x": 650,
        "y": -16.875
      },
      "accordion-content-area-edge-to-content-extra-large": {
        "type": "token",
        "id": "accordion-content-area-edge-to-content-extra-large",
        "x": 650,
        "y": -43.875
      },
      "accordion-disclosure-indicator-to-text-small": {
        "type": "token",
        "id": "accordion-disclosure-indicator-to-text-small",
        "x": 650,
        "y": 199.125
      },
      "accordion-disclosure-indicator-to-text-medium": {
        "type": "token",
        "id": "accordion-disclosure-indicator-to-text-medium",
        "x": 650,
        "y": 172.125
      },
      "accordion-disclosure-indicator-to-text-large": {
        "type": "token",
        "id": "accordion-disclosure-indicator-to-text-large",
        "x": 650,
        "y": 145.125
      },
      "accordion-disclosure-indicator-to-text-extra-large": {
        "type": "token",
        "id": "accordion-disclosure-indicator-to-text-extra-large",
        "x": 650,
        "y": 118.125
      },
      "accordion-item-to-divider": {
        "type": "token",
        "id": "accordion-item-to-divider",
        "x": 650,
        "y": 307.125,
        "value": "0px"
      },
      "checkbox-control-size-small": {
        "type": "token",
        "id": "checkbox-control-size-small",
        "x": 650,
        "y": 847.125
      },
      "checkbox-control-size-medium": {
        "type": "token",
        "id": "checkbox-control-size-medium",
        "x": 650,
        "y": 820.125
      },
      "checkbox-control-size-large": {
        "type": "token",
        "id": "checkbox-control-size-large",
        "x": 650,
        "y": 793.125
      },
      "checkbox-control-size-extra-large": {
        "type": "token",
        "id": "checkbox-control-size-extra-large",
        "x": 650,
        "y": 766.125
      },
      "checkbox-top-to-control-small": {
        "type": "token",
        "id": "checkbox-top-to-control-small",
        "x": 650,
        "y": 955.125
      },
      "checkbox-top-to-control-medium": {
        "type": "token",
        "id": "checkbox-top-to-control-medium",
        "x": 650,
        "y": 928.125
      },
      "checkbox-top-to-control-large": {
        "type": "token",
        "id": "checkbox-top-to-control-large",
        "x": 650,
        "y": 901.125
      },
      "checkbox-top-to-control-extra-large": {
        "type": "token",
        "id": "checkbox-top-to-control-extra-large",
        "x": 650,
        "y": 874.125
      },
      "tab-item-height-small": {
        "type": "token",
        "id": "tab-item-height-small",
        "x": 650,
        "y": 1819.125
      },
      "tab-item-height-medium": {
        "type": "token",
        "id": "tab-item-height-medium",
        "x": 650,
        "y": 1792.125
      },
      "tab-item-height-large": {
        "type": "token",
        "id": "tab-item-height-large",
        "x": 650,
        "y": 1765.125
      },
      "tab-item-height-extra-large": {
        "type": "token",
        "id": "tab-item-height-extra-large",
        "x": 650,
        "y": 1738.125
      },
      "tab-item-compact-height-small": {
        "type": "token",
        "id": "tab-item-compact-height-small",
        "x": 650,
        "y": 1603.125
      },
      "tab-item-compact-height-medium": {
        "type": "token",
        "id": "tab-item-compact-height-medium",
        "x": 650,
        "y": 1576.125
      },
      "tab-item-compact-height-large": {
        "type": "token",
        "id": "tab-item-compact-height-large",
        "x": 650,
        "y": 1549.125
      },
      "tab-item-compact-height-extra-large": {
        "type": "token",
        "id": "tab-item-compact-height-extra-large",
        "x": 650,
        "y": 1522.125
      },
      "tab-item-to-tab-item-horizontal-small": {
        "type": "token",
        "id": "tab-item-to-tab-item-horizontal-small",
        "x": 650,
        "y": 2062.125
      },
      "tab-item-to-tab-item-horizontal-medium": {
        "type": "token",
        "id": "tab-item-to-tab-item-horizontal-medium",
        "x": 650,
        "y": 2035.125
      },
      "tab-item-to-tab-item-horizontal-large": {
        "type": "token",
        "id": "tab-item-to-tab-item-horizontal-large",
        "x": 650,
        "y": 2008.125
      },
      "tab-item-to-tab-item-horizontal-extra-large": {
        "type": "token",
        "id": "tab-item-to-tab-item-horizontal-extra-large",
        "x": 650,
        "y": 1981.125
      },
      "tab-item-to-tab-item-vertical-small": {
        "type": "token",
        "id": "tab-item-to-tab-item-vertical-small",
        "x": 650,
        "y": 2170.125
      },
      "tab-item-to-tab-item-vertical-medium": {
        "type": "token",
        "id": "tab-item-to-tab-item-vertical-medium",
        "x": 650,
        "y": 2143.125
      },
      "tab-item-to-tab-item-vertical-large": {
        "type": "token",
        "id": "tab-item-to-tab-item-vertical-large",
        "x": 650,
        "y": 2116.125
      },
      "tab-item-to-tab-item-vertical-extra-large": {
        "type": "token",
        "id": "tab-item-to-tab-item-vertical-extra-large",
        "x": 650,
        "y": 2089.125
      },
      "tab-item-start-to-edge-quiet": {
        "type": "token",
        "id": "tab-item-start-to-edge-quiet",
        "x": 650,
        "y": 1927.125,
        "value": "0px"
      },
      "tab-item-start-to-edge-small": {
        "type": "token",
        "id": "tab-item-start-to-edge-small",
        "x": 650,
        "y": 1954.125
      },
      "tab-item-start-to-edge-medium": {
        "type": "token",
        "id": "tab-item-start-to-edge-medium",
        "x": 650,
        "y": 1900.125
      },
      "tab-item-start-to-edge-large": {
        "type": "token",
        "id": "tab-item-start-to-edge-large",
        "x": 650,
        "y": 1873.125
      },
      "tab-item-start-to-edge-extra-large": {
        "type": "token",
        "id": "tab-item-start-to-edge-extra-large",
        "x": 650,
        "y": 1846.125
      },
      "tab-item-top-to-text-small": {
        "type": "token",
        "id": "tab-item-top-to-text-small",
        "x": 650,
        "y": 2386.125
      },
      "tab-item-bottom-to-text-small": {
        "type": "token",
        "id": "tab-item-bottom-to-text-small",
        "x": 650,
        "y": 1495.125
      },
      "tab-item-top-to-text-medium": {
        "type": "token",
        "id": "tab-item-top-to-text-medium",
        "x": 650,
        "y": 2359.125
      },
      "tab-item-bottom-to-text-medium": {
        "type": "token",
        "id": "tab-item-bottom-to-text-medium",
        "x": 650,
        "y": 1468.125
      },
      "tab-item-top-to-text-large": {
        "type": "token",
        "id": "tab-item-top-to-text-large",
        "x": 650,
        "y": 2332.125
      },
      "tab-item-bottom-to-text-large": {
        "type": "token",
        "id": "tab-item-bottom-to-text-large",
        "x": 650,
        "y": 1441.125
      },
      "tab-item-top-to-text-extra-large": {
        "type": "token",
        "id": "tab-item-top-to-text-extra-large",
        "x": 650,
        "y": 2305.125
      },
      "tab-item-bottom-to-text-extra-large": {
        "type": "token",
        "id": "tab-item-bottom-to-text-extra-large",
        "x": 650,
        "y": 1414.125
      },
      "tab-item-top-to-text-compact-small": {
        "type": "token",
        "id": "tab-item-top-to-text-compact-small",
        "x": 650,
        "y": 2278.125
      },
      "tab-item-bottom-to-text-compact-small": {
        "type": "token",
        "id": "tab-item-bottom-to-text-compact-small",
        "x": 650,
        "y": 1387.125
      },
      "tab-item-top-to-text-compact-medium": {
        "type": "token",
        "id": "tab-item-top-to-text-compact-medium",
        "x": 650,
        "y": 2251.125
      },
      "tab-item-bottom-to-text-compact-medium": {
        "type": "token",
        "id": "tab-item-bottom-to-text-compact-medium",
        "x": 650,
        "y": 1360.125
      },
      "tab-item-top-to-text-compact-large": {
        "type": "token",
        "id": "tab-item-top-to-text-compact-large",
        "x": 650,
        "y": 2224.125
      },
      "tab-item-bottom-to-text-compact-large": {
        "type": "token",
        "id": "tab-item-bottom-to-text-compact-large",
        "x": 650,
        "y": 1333.125
      },
      "tab-item-top-to-text-compact-extra-large": {
        "type": "token",
        "id": "tab-item-top-to-text-compact-extra-large",
        "x": 650,
        "y": 2197.125
      },
      "tab-item-bottom-to-text-compact-extra-large": {
        "type": "token",
        "id": "tab-item-bottom-to-text-compact-extra-large",
        "x": 650,
        "y": 1306.125
      },
      "tab-item-top-to-workflow-icon-small": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-small",
        "x": 650,
        "y": 2602.125
      },
      "tab-item-top-to-workflow-icon-medium": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-medium",
        "x": 650,
        "y": 2575.125
      },
      "tab-item-top-to-workflow-icon-large": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-large",
        "x": 650,
        "y": 2548.125
      },
      "tab-item-top-to-workflow-icon-extra-large": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-extra-large",
        "x": 650,
        "y": 2521.125
      },
      "tab-item-top-to-workflow-icon-compact-small": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-compact-small",
        "x": 650,
        "y": 2494.125
      },
      "tab-item-top-to-workflow-icon-compact-medium": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-compact-medium",
        "x": 650,
        "y": 2467.125
      },
      "tab-item-top-to-workflow-icon-compact-large": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-compact-large",
        "x": 650,
        "y": 2440.125
      },
      "tab-item-top-to-workflow-icon-compact-extra-large": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-compact-extra-large",
        "x": 650,
        "y": 2413.125
      },
      "tab-item-focus-indicator-gap-small": {
        "type": "token",
        "id": "tab-item-focus-indicator-gap-small",
        "x": 650,
        "y": 1711.125
      },
      "tab-item-focus-indicator-gap-medium": {
        "type": "token",
        "id": "tab-item-focus-indicator-gap-medium",
        "x": 650,
        "y": 1684.125
      },
      "tab-item-focus-indicator-gap-large": {
        "type": "token",
        "id": "tab-item-focus-indicator-gap-large",
        "x": 650,
        "y": 1657.125
      },
      "tab-item-focus-indicator-gap-extra-large": {
        "type": "token",
        "id": "tab-item-focus-indicator-gap-extra-large",
        "x": 650,
        "y": 1630.125
      },
      "side-navigation-width": {
        "type": "token",
        "id": "side-navigation-width",
        "x": 650,
        "y": 1225.125
      },
      "side-navigation-minimum-width": {
        "type": "token",
        "id": "side-navigation-minimum-width",
        "x": 650,
        "y": 1144.125
      },
      "side-navigation-maximum-width": {
        "type": "token",
        "id": "side-navigation-maximum-width",
        "x": 650,
        "y": 1117.125
      },
      "side-navigation-second-level-edge-to-text": {
        "type": "token",
        "id": "side-navigation-second-level-edge-to-text",
        "x": 650,
        "y": 1171.125
      },
      "side-navigation-third-level-edge-to-text": {
        "type": "token",
        "id": "side-navigation-third-level-edge-to-text",
        "x": 650,
        "y": 1198.125
      },
      "side-navigation-with-icon-second-level-edge-to-text": {
        "type": "token",
        "id": "side-navigation-with-icon-second-level-edge-to-text",
        "x": 650,
        "y": 1252.125
      },
      "side-navigation-with-icon-third-level-edge-to-text": {
        "type": "token",
        "id": "side-navigation-with-icon-third-level-edge-to-text",
        "x": 650,
        "y": 1279.125
      },
      "side-navigation-item-to-item": {
        "type": "token",
        "id": "side-navigation-item-to-item",
        "x": 650,
        "y": 1090.125
      },
      "side-navigation-item-to-header": {
        "type": "token",
        "id": "side-navigation-item-to-header",
        "x": 650,
        "y": 1063.125
      },
      "side-navigation-bottom-to-text": {
        "type": "token",
        "id": "side-navigation-bottom-to-text",
        "x": 650,
        "y": 1009.125
      },
      "side-navigation-header-to-item": {
        "type": "token",
        "id": "side-navigation-header-to-item",
        "x": 650,
        "y": 1036.125
      },
      "component-height-200": {
        "type": "token",
        "id": "component-height-200",
        "x": 1300,
        "y": 1801.125
      },
      "component-height-300": {
        "type": "token",
        "id": "component-height-300",
        "x": 1300,
        "y": 1774.125
      },
      "component-height-400": {
        "type": "token",
        "id": "component-height-400",
        "x": 1300,
        "y": 1747.125
      },
      "component-height-500": {
        "type": "token",
        "id": "component-height-500",
        "x": 1300,
        "y": 1720.125
      },
      "component-height-75": {
        "type": "token",
        "id": "component-height-75",
        "x": 1300,
        "y": 1693.125
      },
      "component-height-100": {
        "type": "token",
        "id": "component-height-100",
        "x": 1300,
        "y": 1666.125
      },
      "alert-banner-top-to-text": {
        "type": "token",
        "id": "alert-banner-top-to-text",
        "x": 1300,
        "y": 1558.125
      },
      "accent-color-800": {
        "type": "token",
        "id": "accent-color-800",
        "x": 1950,
        "y": 1967.625
      },
      "accent-color-400": {
        "type": "token",
        "id": "accent-color-400",
        "x": 650,
        "y": 2629.125
      },
      "alert-banner": {
        "type": "component",
        "id": "alert-banner",
        "x": 0,
        "y": 81
      },
      "alert-banner-to-top-text": {
        "type": "token",
        "id": "alert-banner-to-top-text",
        "x": 650,
        "y": 712.125
      },
      "accent-visual-color": {
        "type": "token",
        "id": "accent-visual-color",
        "x": 1300,
        "y": 1945.125,
        "adjacencyLabels": {
          "accent-color-800": "light",
          "accent-color-900": "wireframe"
        }
      },
      "accent-*": {
        "type": "orphan-category",
        "id": "accent-*",
        "x": 0,
        "y": 2106
      },
      "drop-zone-background-color": {
        "type": "token",
        "id": "drop-zone-background-color",
        "x": 650,
        "y": 2710.125
      },
      "drop-zone": {
        "type": "component",
        "id": "drop-zone",
        "x": 0,
        "y": 837
      },
      "drop-*": {
        "type": "orphan-category",
        "id": "drop-*",
        "x": 0,
        "y": 2619
      },
      "blue-800": {
        "type": "token",
        "id": "blue-800",
        "x": 2600,
        "y": 1967.625,
        "value": "rgb(75, 117, 255):^;light:*;rgb(93, 127, 201):^;wireframe"
      },
      "blue-400": {
        "type": "token",
        "id": "blue-400",
        "x": 1300,
        "y": 1828.125,
        "value": "rgb(172, 207, 253):^;light:*;rgb(192, 205, 234):^;wireframe"
      },
      "heading": {
        "type": "component",
        "id": "heading",
        "x": 0,
        "y": 945
      },
      "body": {
        "type": "component",
        "id": "body",
        "x": 0,
        "y": 270
      },
      "detail": {
        "type": "component",
        "id": "detail",
        "x": 0,
        "y": 783
      },
      "code": {
        "type": "component",
        "id": "code",
        "x": 0,
        "y": 513
      },
      "switch": {
        "type": "component",
        "id": "switch",
        "x": 0,
        "y": 1755
      },
      "radio-button": {
        "type": "component",
        "id": "radio-button",
        "x": 0,
        "y": 1431
      },
      "field-label": {
        "type": "component",
        "id": "field-label",
        "x": 0,
        "y": 891
      },
      "help-text": {
        "type": "component",
        "id": "help-text",
        "x": 0,
        "y": 972
      },
      "status-light": {
        "type": "component",
        "id": "status-light",
        "x": 0,
        "y": 1674
      },
      "action-button": {
        "type": "component",
        "id": "action-button",
        "x": 0,
        "y": 54
      },
      "button": {
        "type": "component",
        "id": "button",
        "x": 0,
        "y": 324
      },
      "tooltip": {
        "type": "component",
        "id": "tooltip",
        "x": 0,
        "y": 2025
      },
      "divider": {
        "type": "component",
        "id": "divider",
        "x": 0,
        "y": 810
      },
      "progress-circle": {
        "type": "component",
        "id": "progress-circle",
        "x": 0,
        "y": 1404
      },
      "toast": {
        "type": "component",
        "id": "toast",
        "x": 0,
        "y": 1998
      },
      "action-bar": {
        "type": "component",
        "id": "action-bar",
        "x": 0,
        "y": 27
      },
      "swatch": {
        "type": "component",
        "id": "swatch",
        "x": 0,
        "y": 1701
      },
      "progress-bar": {
        "type": "component",
        "id": "progress-bar",
        "x": 0,
        "y": 1377
      },
      "meter": {
        "type": "component",
        "id": "meter",
        "x": 0,
        "y": 1242
      },
      "in-line-alert": {
        "type": "component",
        "id": "in-line-alert",
        "x": 0,
        "y": 1134
      },
      "tag": {
        "type": "component",
        "id": "tag",
        "x": 0,
        "y": 1836
      },
      "popover": {
        "type": "component",
        "id": "popover",
        "x": 0,
        "y": 1350
      },
      "menu": {
        "type": "component",
        "id": "menu",
        "x": 0,
        "y": 1188
      },
      "slider": {
        "type": "component",
        "id": "slider",
        "x": 0,
        "y": 1593
      },
      "picker": {
        "type": "component",
        "id": "picker",
        "x": 0,
        "y": 1323
      },
      "text-field": {
        "type": "component",
        "id": "text-field",
        "x": 0,
        "y": 1917
      },
      "text-area": {
        "type": "component",
        "id": "text-area",
        "x": 0,
        "y": 1890
      },
      "combo-box": {
        "type": "component",
        "id": "combo-box",
        "x": 0,
        "y": 675
      },
      "thumbnail": {
        "type": "component",
        "id": "thumbnail",
        "x": 0,
        "y": 1944
      },
      "alert-dialog": {
        "type": "component",
        "id": "alert-dialog",
        "x": 0,
        "y": 108
      },
      "opacity-checkerboard": {
        "type": "component",
        "id": "opacity-checkerboard",
        "x": 0,
        "y": 1296
      },
      "contextual-help": {
        "type": "component",
        "id": "contextual-help",
        "x": 0,
        "y": 702
      },
      "breadcrumbs": {
        "type": "component",
        "id": "breadcrumbs",
        "x": 0,
        "y": 297
      },
      "avatar": {
        "type": "component",
        "id": "avatar",
        "x": 0,
        "y": 189
      },
      "rating": {
        "type": "component",
        "id": "rating",
        "x": 0,
        "y": 1458
      },
      "color-area": {
        "type": "component",
        "id": "color-area",
        "x": 0,
        "y": 540
      },
      "color-wheel": {
        "type": "component",
        "id": "color-wheel",
        "x": 0,
        "y": 648
      },
      "color-slider": {
        "type": "component",
        "id": "color-slider",
        "x": 0,
        "y": 621
      },
      "floating-action-button": {
        "type": "component",
        "id": "floating-action-button",
        "x": 0,
        "y": 918
      },
      "illustrated-message": {
        "type": "component",
        "id": "illustrated-message",
        "x": 0,
        "y": 1026
      },
      "search-field": {
        "type": "component",
        "id": "search-field",
        "x": 0,
        "y": 1485
      },
      "color-loupe": {
        "type": "component",
        "id": "color-loupe",
        "x": 0,
        "y": 594
      },
      "card": {
        "type": "component",
        "id": "card",
        "x": 0,
        "y": 351
      },
      "coach-mark": {
        "type": "component",
        "id": "coach-mark",
        "x": 0,
        "y": 486
      },
      "color-handle": {
        "type": "component",
        "id": "color-handle",
        "x": 0,
        "y": 567
      },
      "table": {
        "type": "component",
        "id": "table",
        "x": 0,
        "y": 1809
      },
      "tray": {
        "type": "component",
        "id": "tray",
        "x": 0,
        "y": 2052
      },
      "in-field-button": {
        "type": "component",
        "id": "in-field-button",
        "x": 0,
        "y": 1053
      },
      "arrow-icon": {
        "type": "component",
        "id": "arrow-icon",
        "x": 0,
        "y": 135
      },
      "asterisk-icon": {
        "type": "component",
        "id": "asterisk-icon",
        "x": 0,
        "y": 162
      },
      "checkmark-icon": {
        "type": "component",
        "id": "checkmark-icon",
        "x": 0,
        "y": 405
      },
      "chevron-icon": {
        "type": "component",
        "id": "chevron-icon",
        "x": 0,
        "y": 432
      },
      "cross-icon": {
        "type": "component",
        "id": "cross-icon",
        "x": 0,
        "y": 729
      },
      "dash-icon": {
        "type": "component",
        "id": "dash-icon",
        "x": 0,
        "y": 756
      },
      "title": {
        "type": "component",
        "id": "title",
        "x": 0,
        "y": 1971
      },
      "field": {
        "type": "component",
        "id": "field",
        "x": 0,
        "y": 864
      },
      "in-field-progress-circle": {
        "type": "component",
        "id": "in-field-progress-circle",
        "x": 0,
        "y": 1080
      },
      "standard-dialog": {
        "type": "component",
        "id": "standard-dialog",
        "x": 0,
        "y": 1620
      },
      "link-out-icon": {
        "type": "component",
        "id": "link-out-icon",
        "x": 0,
        "y": 1161
      },
      "menu-item": {
        "type": "component",
        "id": "menu-item",
        "x": 0,
        "y": 1215
      },
      "coach-indicator": {
        "type": "component",
        "id": "coach-indicator",
        "x": 0,
        "y": 459
      },
      "swatch-group": {
        "type": "component",
        "id": "swatch-group",
        "x": 0,
        "y": 1728
      },
      "avatar-group": {
        "type": "component",
        "id": "avatar-group",
        "x": 0,
        "y": 216
      },
      "standard-panel": {
        "type": "component",
        "id": "standard-panel",
        "x": 0,
        "y": 1647
      },
      "bar-panel": {
        "type": "component",
        "id": "bar-panel",
        "x": 0,
        "y": 243
      },
      "select-box": {
        "type": "component",
        "id": "select-box",
        "x": 0,
        "y": 1539
      },
      "segmented-control": {
        "type": "component",
        "id": "segmented-control",
        "x": 0,
        "y": 1512
      },
      "in-field-stepper": {
        "type": "component",
        "id": "in-field-stepper",
        "x": 0,
        "y": 1107
      },
      "number-field": {
        "type": "component",
        "id": "number-field",
        "x": 0,
        "y": 1269
      },
      "takeover-dialog": {
        "type": "component",
        "id": "takeover-dialog",
        "x": 0,
        "y": 1863
      },
      "tree-view": {
        "type": "component",
        "id": "tree-view",
        "x": 0,
        "y": 2079
      },
      "icon": {
        "type": "component",
        "id": "icon",
        "x": 0,
        "y": 999
      },
      "default-*": {
        "type": "orphan-category",
        "id": "default-*",
        "x": 0,
        "y": 2538
      },
      "text-*": {
        "type": "orphan-category",
        "id": "text-*",
        "x": 0,
        "y": 3348
      },
      "cjk-*": {
        "type": "orphan-category",
        "id": "cjk-*",
        "x": 0,
        "y": 2403
      },
      "heading-*": {
        "type": "orphan-category",
        "id": "heading-*",
        "x": 0,
        "y": 2808
      },
      "body-*": {
        "type": "orphan-category",
        "id": "body-*",
        "x": 0,
        "y": 2214
      },
      "informative-*": {
        "type": "orphan-category",
        "id": "informative-*",
        "x": 0,
        "y": 2889
      },
      "negative-*": {
        "type": "orphan-category",
        "id": "negative-*",
        "x": 0,
        "y": 2970
      },
      "notice-*": {
        "type": "orphan-category",
        "id": "notice-*",
        "x": 0,
        "y": 3024
      },
      "positive-*": {
        "type": "orphan-category",
        "id": "positive-*",
        "x": 0,
        "y": 3132
      },
      "icon-*": {
        "type": "orphan-category",
        "id": "icon-*",
        "x": 0,
        "y": 2835
      },
      "android-*": {
        "type": "orphan-category",
        "id": "android-*",
        "x": 0,
        "y": 2133
      },
      "workflow-*": {
        "type": "orphan-category",
        "id": "workflow-*",
        "x": 0,
        "y": 3510
      },
      "spacing-*": {
        "type": "orphan-category",
        "id": "spacing-*",
        "x": 0,
        "y": 3294
      },
      "component-*": {
        "type": "orphan-category",
        "id": "component-*",
        "x": 0,
        "y": 2457
      },
      "focus-*": {
        "type": "orphan-category",
        "id": "focus-*",
        "x": 0,
        "y": 2673
      },
      "side-*": {
        "type": "orphan-category",
        "id": "side-*",
        "x": 0,
        "y": 3240
      },
      "border-*": {
        "type": "orphan-category",
        "id": "border-*",
        "x": 0,
        "y": 2241
      },
      "field-*": {
        "type": "orphan-category",
        "id": "field-*",
        "x": 0,
        "y": 2646
      },
      "character-*": {
        "type": "orphan-category",
        "id": "character-*",
        "x": 0,
        "y": 2322
      },
      "disclosure-*": {
        "type": "orphan-category",
        "id": "disclosure-*",
        "x": 0,
        "y": 2592
      },
      "navigational-*": {
        "type": "orphan-category",
        "id": "navigational-*",
        "x": 0,
        "y": 2943
      },
      "color-*": {
        "type": "orphan-category",
        "id": "color-*",
        "x": 0,
        "y": 2430
      },
      "corner-*": {
        "type": "orphan-category",
        "id": "corner-*",
        "x": 0,
        "y": 2484
      },
      "gradient-*": {
        "type": "orphan-category",
        "id": "gradient-*",
        "x": 0,
        "y": 2727
      },
      "window-*": {
        "type": "orphan-category",
        "id": "window-*",
        "x": 0,
        "y": 3483
      },
      "transparent-*": {
        "type": "orphan-category",
        "id": "transparent-*",
        "x": 0,
        "y": 3429
      },
      "gray-*": {
        "type": "orphan-category",
        "id": "gray-*",
        "x": 0,
        "y": 2754
      },
      "yellow-*": {
        "type": "orphan-category",
        "id": "yellow-*",
        "x": 0,
        "y": 3537
      },
      "chartreuse-*": {
        "type": "orphan-category",
        "id": "chartreuse-*",
        "x": 0,
        "y": 2349
      },
      "celery-*": {
        "type": "orphan-category",
        "id": "celery-*",
        "x": 0,
        "y": 2295
      },
      "seafoam-*": {
        "type": "orphan-category",
        "id": "seafoam-*",
        "x": 0,
        "y": 3213
      },
      "cyan-*": {
        "type": "orphan-category",
        "id": "cyan-*",
        "x": 0,
        "y": 2511
      },
      "indigo-*": {
        "type": "orphan-category",
        "id": "indigo-*",
        "x": 0,
        "y": 2862
      },
      "purple-*": {
        "type": "orphan-category",
        "id": "purple-*",
        "x": 0,
        "y": 3159
      },
      "fuchsia-*": {
        "type": "orphan-category",
        "id": "fuchsia-*",
        "x": 0,
        "y": 2700
      },
      "magenta-*": {
        "type": "orphan-category",
        "id": "magenta-*",
        "x": 0,
        "y": 2916
      },
      "pink-*": {
        "type": "orphan-category",
        "id": "pink-*",
        "x": 0,
        "y": 3105
      },
      "turquoise-*": {
        "type": "orphan-category",
        "id": "turquoise-*",
        "x": 0,
        "y": 3456
      },
      "brown-*": {
        "type": "orphan-category",
        "id": "brown-*",
        "x": 0,
        "y": 2268
      },
      "silver-*": {
        "type": "orphan-category",
        "id": "silver-*",
        "x": 0,
        "y": 3267
      },
      "cinnamon-*": {
        "type": "orphan-category",
        "id": "cinnamon-*",
        "x": 0,
        "y": 2376
      },
      "static-*": {
        "type": "orphan-category",
        "id": "static-*",
        "x": 0,
        "y": 3321
      },
      "overlay-*": {
        "type": "orphan-category",
        "id": "overlay-*",
        "x": 0,
        "y": 3078
      },
      "background-*": {
        "type": "orphan-category",
        "id": "background-*",
        "x": 0,
        "y": 2160
      },
      "neutral-*": {
        "type": "orphan-category",
        "id": "neutral-*",
        "x": 0,
        "y": 2997
      },
      "disabled-*": {
        "type": "orphan-category",
        "id": "disabled-*",
        "x": 0,
        "y": 2565
      },
      "red-*": {
        "type": "orphan-category",
        "id": "red-*",
        "x": 0,
        "y": 3186
      },
      "orange-*": {
        "type": "orphan-category",
        "id": "orange-*",
        "x": 0,
        "y": 3051
      },
      "green-*": {
        "type": "orphan-category",
        "id": "green-*",
        "x": 0,
        "y": 2781
      },
      "blue-*": {
        "type": "orphan-category",
        "id": "blue-*",
        "x": 0,
        "y": 2187
      },
      "title-*": {
        "type": "orphan-category",
        "id": "title-*",
        "x": 0,
        "y": 3375
      },
      "track-*": {
        "type": "orphan-category",
        "id": "track-*",
        "x": 0,
        "y": 3402
      }
    },
    "adjacencyList": {
      "accordion": [
        "accordion-bottom-to-text-compact-extra-large",
        "accordion-bottom-to-text-compact-large",
        "accordion-bottom-to-text-compact-medium",
        "accordion-bottom-to-text-compact-small",
        "accordion-bottom-to-text-regular-extra-large",
        "accordion-bottom-to-text-regular-large",
        "accordion-bottom-to-text-regular-medium",
        "accordion-bottom-to-text-regular-small",
        "accordion-bottom-to-text-spacious-extra-large",
        "accordion-bottom-to-text-spacious-large",
        "accordion-bottom-to-text-spacious-medium",
        "accordion-bottom-to-text-spacious-small",
        "accordion-content-area-bottom-to-content",
        "accordion-content-area-edge-to-content-extra-large",
        "accordion-content-area-edge-to-content-large",
        "accordion-content-area-edge-to-content-medium",
        "accordion-content-area-edge-to-content-small",
        "accordion-content-area-top-to-content",
        "accordion-disclosure-indicator-to-text",
        "accordion-disclosure-indicator-to-text-extra-large",
        "accordion-disclosure-indicator-to-text-large",
        "accordion-disclosure-indicator-to-text-medium",
        "accordion-disclosure-indicator-to-text-small",
        "accordion-edge-to-disclosure-indicator",
        "accordion-edge-to-text",
        "accordion-focus-indicator-gap",
        "accordion-item-to-divider",
        "accordion-minimum-width",
        "accordion-small-top-to-text-spacious",
        "accordion-top-to-text-compact-extra-large",
        "accordion-top-to-text-compact-large",
        "accordion-top-to-text-compact-medium",
        "accordion-top-to-text-compact-small",
        "accordion-top-to-text-regular-extra-large",
        "accordion-top-to-text-regular-large",
        "accordion-top-to-text-regular-medium",
        "accordion-top-to-text-regular-small",
        "accordion-top-to-text-spacious-extra-large",
        "accordion-top-to-text-spacious-large",
        "accordion-top-to-text-spacious-medium",
        "accordion-top-to-text-spacious-small"
      ],
      "checkbox": [
        "checkbox-control-size-extra-large",
        "checkbox-control-size-large",
        "checkbox-control-size-medium",
        "checkbox-control-size-small",
        "checkbox-top-to-control-extra-large",
        "checkbox-top-to-control-large",
        "checkbox-top-to-control-medium",
        "checkbox-top-to-control-small"
      ],
      "tab-item": [
        "tab-item-bottom-to-text-compact-extra-large",
        "tab-item-bottom-to-text-compact-large",
        "tab-item-bottom-to-text-compact-medium",
        "tab-item-bottom-to-text-compact-small",
        "tab-item-bottom-to-text-extra-large",
        "tab-item-bottom-to-text-large",
        "tab-item-bottom-to-text-medium",
        "tab-item-bottom-to-text-small",
        "tab-item-compact-height-extra-large",
        "tab-item-compact-height-large",
        "tab-item-compact-height-medium",
        "tab-item-compact-height-small",
        "tab-item-focus-indicator-gap-extra-large",
        "tab-item-focus-indicator-gap-large",
        "tab-item-focus-indicator-gap-medium",
        "tab-item-focus-indicator-gap-small",
        "tab-item-height-extra-large",
        "tab-item-height-large",
        "tab-item-height-medium",
        "tab-item-height-small",
        "tab-item-start-to-edge-extra-large",
        "tab-item-start-to-edge-large",
        "tab-item-start-to-edge-medium",
        "tab-item-start-to-edge-quiet",
        "tab-item-start-to-edge-small",
        "tab-item-to-tab-item-horizontal-extra-large",
        "tab-item-to-tab-item-horizontal-large",
        "tab-item-to-tab-item-horizontal-medium",
        "tab-item-to-tab-item-horizontal-small",
        "tab-item-to-tab-item-vertical-extra-large",
        "tab-item-to-tab-item-vertical-large",
        "tab-item-to-tab-item-vertical-medium",
        "tab-item-to-tab-item-vertical-small",
        "tab-item-top-to-text-compact-extra-large",
        "tab-item-top-to-text-compact-large",
        "tab-item-top-to-text-compact-medium",
        "tab-item-top-to-text-compact-small",
        "tab-item-top-to-text-extra-large",
        "tab-item-top-to-text-large",
        "tab-item-top-to-text-medium",
        "tab-item-top-to-text-small",
        "tab-item-top-to-workflow-icon-compact-extra-large",
        "tab-item-top-to-workflow-icon-compact-large",
        "tab-item-top-to-workflow-icon-compact-medium",
        "tab-item-top-to-workflow-icon-compact-small",
        "tab-item-top-to-workflow-icon-extra-large",
        "tab-item-top-to-workflow-icon-large",
        "tab-item-top-to-workflow-icon-medium",
        "tab-item-top-to-workflow-icon-small"
      ],
      "side-navigation": [
        "side-navigation-bottom-to-text",
        "side-navigation-header-to-item",
        "side-navigation-item-to-header",
        "side-navigation-item-to-item",
        "side-navigation-maximum-width",
        "side-navigation-minimum-width",
        "side-navigation-second-level-edge-to-text",
        "side-navigation-third-level-edge-to-text",
        "side-navigation-width",
        "side-navigation-with-icon-second-level-edge-to-text",
        "side-navigation-with-icon-third-level-edge-to-text"
      ],
      "tab-item-height-small": [
        "component-height-200"
      ],
      "tab-item-height-medium": [
        "component-height-300"
      ],
      "tab-item-height-large": [
        "component-height-400"
      ],
      "tab-item-height-extra-large": [
        "component-height-500"
      ],
      "tab-item-compact-height-small": [
        "component-height-75"
      ],
      "tab-item-compact-height-medium": [
        "component-height-100"
      ],
      "tab-item-compact-height-large": [
        "component-height-200"
      ],
      "tab-item-compact-height-extra-large": [
        "component-height-300"
      ],
      "alert-banner": [
        "alert-banner-to-top-text",
        "alert-banner-top-to-text"
      ],
      "alert-banner-to-top-text": [
        "alert-banner-top-to-text"
      ],
      "accent-visual-color": [
        "accent-color-800"
      ],
      "accent-*": [
        "accent-color-400",
        "accent-color-800",
        "accent-visual-color"
      ],
      "drop-zone-background-color": [
        "accent-visual-color"
      ],
      "drop-zone": [
        "drop-zone-background-color"
      ],
      "drop-*": [
        "drop-zone-background-color"
      ],
      "accent-color-800": [
        "blue-800"
      ],
      "accent-color-400": [
        "blue-400"
      ]
    }
  },
  "maxWidth": 2600,
  "maxHeight": 3537,
  "orphanNodes": [
    "accordion",
    "action-bar",
    "action-button",
    "alert-banner",
    "alert-dialog",
    "arrow-icon",
    "asterisk-icon",
    "avatar",
    "avatar-group",
    "bar-panel",
    "body",
    "breadcrumbs",
    "button",
    "card",
    "checkbox",
    "checkmark-icon",
    "chevron-icon",
    "coach-indicator",
    "coach-mark",
    "code",
    "color-area",
    "color-handle",
    "color-loupe",
    "color-slider",
    "color-wheel",
    "combo-box",
    "contextual-help",
    "cross-icon",
    "dash-icon",
    "detail",
    "divider",
    "drop-zone",
    "field",
    "field-label",
    "floating-action-button",
    "heading",
    "help-text",
    "icon",
    "illustrated-message",
    "in-field-button",
    "in-field-progress-circle",
    "in-field-stepper",
    "in-line-alert",
    "link-out-icon",
    "menu",
    "menu-item",
    "meter",
    "number-field",
    "opacity-checkerboard",
    "picker",
    "popover",
    "progress-bar",
    "progress-circle",
    "radio-button",
    "rating",
    "search-field",
    "segmented-control",
    "select-box",
    "side-navigation",
    "slider",
    "standard-dialog",
    "standard-panel",
    "status-light",
    "swatch",
    "swatch-group",
    "switch",
    "tab-item",
    "table",
    "tag",
    "takeover-dialog",
    "text-area",
    "text-field",
    "thumbnail",
    "title",
    "toast",
    "tooltip",
    "tray",
    "tree-view",
    "accent-*",
    "android-*",
    "background-*",
    "blue-*",
    "body-*",
    "border-*",
    "brown-*",
    "celery-*",
    "character-*",
    "chartreuse-*",
    "cinnamon-*",
    "cjk-*",
    "color-*",
    "component-*",
    "corner-*",
    "cyan-*",
    "default-*",
    "disabled-*",
    "disclosure-*",
    "drop-*",
    "field-*",
    "focus-*",
    "fuchsia-*",
    "gradient-*",
    "gray-*",
    "green-*",
    "heading-*",
    "icon-*",
    "indigo-*",
    "informative-*",
    "magenta-*",
    "navigational-*",
    "negative-*",
    "neutral-*",
    "notice-*",
    "orange-*",
    "overlay-*",
    "pink-*",
    "positive-*",
    "purple-*",
    "red-*",
    "seafoam-*",
    "side-*",
    "silver-*",
    "spacing-*",
    "static-*",
    "text-*",
    "title-*",
    "track-*",
    "transparent-*",
    "turquoise-*",
    "window-*",
    "workflow-*",
    "yellow-*"
  ],
  "nodesToLayout": [],
  "columnNodeAssignments": [
    [
      "accordion",
      "action-bar",
      "action-button",
      "alert-banner",
      "alert-dialog",
      "arrow-icon",
      "asterisk-icon",
      "avatar",
      "avatar-group",
      "bar-panel",
      "body",
      "breadcrumbs",
      "button",
      "card",
      "checkbox",
      "checkmark-icon",
      "chevron-icon",
      "coach-indicator",
      "coach-mark",
      "code",
      "color-area",
      "color-handle",
      "color-loupe",
      "color-slider",
      "color-wheel",
      "combo-box",
      "contextual-help",
      "cross-icon",
      "dash-icon",
      "detail",
      "divider",
      "drop-zone",
      "field",
      "field-label",
      "floating-action-button",
      "heading",
      "help-text",
      "icon",
      "illustrated-message",
      "in-field-button",
      "in-field-progress-circle",
      "in-field-stepper",
      "in-line-alert",
      "link-out-icon",
      "menu",
      "menu-item",
      "meter",
      "number-field",
      "opacity-checkerboard",
      "picker",
      "popover",
      "progress-bar",
      "progress-circle",
      "radio-button",
      "rating",
      "search-field",
      "segmented-control",
      "select-box",
      "side-navigation",
      "slider",
      "standard-dialog",
      "standard-panel",
      "status-light",
      "swatch",
      "swatch-group",
      "switch",
      "tab-item",
      "table",
      "tag",
      "takeover-dialog",
      "text-area",
      "text-field",
      "thumbnail",
      "title",
      "toast",
      "tooltip",
      "tray",
      "tree-view",
      "accent-*",
      "android-*",
      "background-*",
      "blue-*",
      "body-*",
      "border-*",
      "brown-*",
      "celery-*",
      "character-*",
      "chartreuse-*",
      "cinnamon-*",
      "cjk-*",
      "color-*",
      "component-*",
      "corner-*",
      "cyan-*",
      "default-*",
      "disabled-*",
      "disclosure-*",
      "drop-*",
      "field-*",
      "focus-*",
      "fuchsia-*",
      "gradient-*",
      "gray-*",
      "green-*",
      "heading-*",
      "icon-*",
      "indigo-*",
      "informative-*",
      "magenta-*",
      "navigational-*",
      "negative-*",
      "neutral-*",
      "notice-*",
      "orange-*",
      "overlay-*",
      "pink-*",
      "positive-*",
      "purple-*",
      "red-*",
      "seafoam-*",
      "side-*",
      "silver-*",
      "spacing-*",
      "static-*",
      "text-*",
      "title-*",
      "track-*",
      "transparent-*",
      "turquoise-*",
      "window-*",
      "workflow-*",
      "yellow-*"
    ],
    [
      "accordion-bottom-to-text-compact-extra-large",
      "accordion-bottom-to-text-compact-large",
      "accordion-bottom-to-text-compact-medium",
      "accordion-bottom-to-text-compact-small",
      "accordion-bottom-to-text-regular-extra-large",
      "accordion-bottom-to-text-regular-large",
      "accordion-bottom-to-text-regular-medium",
      "accordion-bottom-to-text-regular-small",
      "accordion-bottom-to-text-spacious-extra-large",
      "accordion-bottom-to-text-spacious-large",
      "accordion-bottom-to-text-spacious-medium",
      "accordion-bottom-to-text-spacious-small",
      "accordion-content-area-bottom-to-content",
      "accordion-content-area-edge-to-content-extra-large",
      "accordion-content-area-edge-to-content-large",
      "accordion-content-area-edge-to-content-medium",
      "accordion-content-area-edge-to-content-small",
      "accordion-content-area-top-to-content",
      "accordion-disclosure-indicator-to-text",
      "accordion-disclosure-indicator-to-text-extra-large",
      "accordion-disclosure-indicator-to-text-large",
      "accordion-disclosure-indicator-to-text-medium",
      "accordion-disclosure-indicator-to-text-small",
      "accordion-edge-to-disclosure-indicator",
      "accordion-edge-to-text",
      "accordion-focus-indicator-gap",
      "accordion-item-to-divider",
      "accordion-minimum-width",
      "accordion-small-top-to-text-spacious",
      "accordion-top-to-text-compact-extra-large",
      "accordion-top-to-text-compact-large",
      "accordion-top-to-text-compact-medium",
      "accordion-top-to-text-compact-small",
      "accordion-top-to-text-regular-extra-large",
      "accordion-top-to-text-regular-large",
      "accordion-top-to-text-regular-medium",
      "accordion-top-to-text-regular-small",
      "accordion-top-to-text-spacious-extra-large",
      "accordion-top-to-text-spacious-large",
      "accordion-top-to-text-spacious-medium",
      "accordion-top-to-text-spacious-small",
      "alert-banner-to-top-text",
      "checkbox-control-size-extra-large",
      "checkbox-control-size-large",
      "checkbox-control-size-medium",
      "checkbox-control-size-small",
      "checkbox-top-to-control-extra-large",
      "checkbox-top-to-control-large",
      "checkbox-top-to-control-medium",
      "checkbox-top-to-control-small",
      "drop-zone-background-color",
      "side-navigation-bottom-to-text",
      "side-navigation-header-to-item",
      "side-navigation-item-to-header",
      "side-navigation-item-to-item",
      "side-navigation-maximum-width",
      "side-navigation-minimum-width",
      "side-navigation-second-level-edge-to-text",
      "side-navigation-third-level-edge-to-text",
      "side-navigation-width",
      "side-navigation-with-icon-second-level-edge-to-text",
      "side-navigation-with-icon-third-level-edge-to-text",
      "tab-item-bottom-to-text-compact-extra-large",
      "tab-item-bottom-to-text-compact-large",
      "tab-item-bottom-to-text-compact-medium",
      "tab-item-bottom-to-text-compact-small",
      "tab-item-bottom-to-text-extra-large",
      "tab-item-bottom-to-text-large",
      "tab-item-bottom-to-text-medium",
      "tab-item-bottom-to-text-small",
      "tab-item-compact-height-extra-large",
      "tab-item-compact-height-large",
      "tab-item-compact-height-medium",
      "tab-item-compact-height-small",
      "tab-item-focus-indicator-gap-extra-large",
      "tab-item-focus-indicator-gap-large",
      "tab-item-focus-indicator-gap-medium",
      "tab-item-focus-indicator-gap-small",
      "tab-item-height-extra-large",
      "tab-item-height-large",
      "tab-item-height-medium",
      "tab-item-height-small",
      "tab-item-start-to-edge-extra-large",
      "tab-item-start-to-edge-large",
      "tab-item-start-to-edge-medium",
      "tab-item-start-to-edge-quiet",
      "tab-item-start-to-edge-small",
      "tab-item-to-tab-item-horizontal-extra-large",
      "tab-item-to-tab-item-horizontal-large",
      "tab-item-to-tab-item-horizontal-medium",
      "tab-item-to-tab-item-horizontal-small",
      "tab-item-to-tab-item-vertical-extra-large",
      "tab-item-to-tab-item-vertical-large",
      "tab-item-to-tab-item-vertical-medium",
      "tab-item-to-tab-item-vertical-small",
      "tab-item-top-to-text-compact-extra-large",
      "tab-item-top-to-text-compact-large",
      "tab-item-top-to-text-compact-medium",
      "tab-item-top-to-text-compact-small",
      "tab-item-top-to-text-extra-large",
      "tab-item-top-to-text-large",
      "tab-item-top-to-text-medium",
      "tab-item-top-to-text-small",
      "tab-item-top-to-workflow-icon-compact-extra-large",
      "tab-item-top-to-workflow-icon-compact-large",
      "tab-item-top-to-workflow-icon-compact-medium",
      "tab-item-top-to-workflow-icon-compact-small",
      "tab-item-top-to-workflow-icon-extra-large",
      "tab-item-top-to-workflow-icon-large",
      "tab-item-top-to-workflow-icon-medium",
      "tab-item-top-to-workflow-icon-small",
      "accent-color-400"
    ],
    [
      "alert-banner-top-to-text",
      "accent-visual-color",
      "component-height-300",
      "component-height-200",
      "component-height-100",
      "component-height-75",
      "component-height-500",
      "component-height-400",
      "blue-400"
    ],
    [
      "accent-color-800"
    ],
    [
      "blue-800"
    ]
  ],
  "columnInsertionPoints": [
    3564,
    3132,
    414,
    99,
    90
  ],
  "mapOfValidInsertionPoints": {
    "accordion": [
      0
    ],
    "action-bar": [
      27
    ],
    "action-button": [
      54
    ],
    "alert-banner": [
      81
    ],
    "alert-dialog": [
      108
    ],
    "arrow-icon": [
      135
    ],
    "asterisk-icon": [
      162
    ],
    "avatar": [
      189
    ],
    "avatar-group": [
      216
    ],
    "bar-panel": [
      243
    ],
    "body": [
      270
    ],
    "breadcrumbs": [
      297
    ],
    "button": [
      324
    ],
    "card": [
      351
    ],
    "checkbox": [
      378
    ],
    "checkmark-icon": [
      405
    ],
    "chevron-icon": [
      432
    ],
    "coach-indicator": [
      459
    ],
    "coach-mark": [
      486
    ],
    "code": [
      513
    ],
    "color-area": [
      540
    ],
    "color-handle": [
      567
    ],
    "color-loupe": [
      594
    ],
    "color-slider": [
      621
    ],
    "color-wheel": [
      648
    ],
    "combo-box": [
      675
    ],
    "contextual-help": [
      702
    ],
    "cross-icon": [
      729
    ],
    "dash-icon": [
      756
    ],
    "detail": [
      783
    ],
    "divider": [
      810
    ],
    "drop-zone": [
      837
    ],
    "field": [
      864
    ],
    "field-label": [
      891
    ],
    "floating-action-button": [
      918
    ],
    "heading": [
      945
    ],
    "help-text": [
      972
    ],
    "icon": [
      999
    ],
    "illustrated-message": [
      1026
    ],
    "in-field-button": [
      1053
    ],
    "in-field-progress-circle": [
      1080
    ],
    "in-field-stepper": [
      1107
    ],
    "in-line-alert": [
      1134
    ],
    "link-out-icon": [
      1161
    ],
    "menu": [
      1188
    ],
    "menu-item": [
      1215
    ],
    "meter": [
      1242
    ],
    "number-field": [
      1269
    ],
    "opacity-checkerboard": [
      1296
    ],
    "picker": [
      1323
    ],
    "popover": [
      1350
    ],
    "progress-bar": [
      1377
    ],
    "progress-circle": [
      1404
    ],
    "radio-button": [
      1431
    ],
    "rating": [
      1458
    ],
    "search-field": [
      1485
    ],
    "segmented-control": [
      1512
    ],
    "select-box": [
      1539
    ],
    "side-navigation": [
      1566
    ],
    "slider": [
      1593
    ],
    "standard-dialog": [
      1620
    ],
    "standard-panel": [
      1647
    ],
    "status-light": [
      1674
    ],
    "swatch": [
      1701
    ],
    "swatch-group": [
      1728
    ],
    "switch": [
      1755
    ],
    "tab-item": [
      1782
    ],
    "table": [
      1809
    ],
    "tag": [
      1836
    ],
    "takeover-dialog": [
      1863
    ],
    "text-area": [
      1890
    ],
    "text-field": [
      1917
    ],
    "thumbnail": [
      1944
    ],
    "title": [
      1971
    ],
    "toast": [
      1998
    ],
    "tooltip": [
      2025
    ],
    "tray": [
      2052
    ],
    "tree-view": [
      2079
    ],
    "accent-*": [
      2106
    ],
    "android-*": [
      2133
    ],
    "background-*": [
      2160
    ],
    "blue-*": [
      2187
    ],
    "body-*": [
      2214
    ],
    "border-*": [
      2241
    ],
    "brown-*": [
      2268
    ],
    "celery-*": [
      2295
    ],
    "character-*": [
      2322
    ],
    "chartreuse-*": [
      2349
    ],
    "cinnamon-*": [
      2376
    ],
    "cjk-*": [
      2403
    ],
    "color-*": [
      2430
    ],
    "component-*": [
      2457
    ],
    "corner-*": [
      2484
    ],
    "cyan-*": [
      2511
    ],
    "default-*": [
      2538
    ],
    "disabled-*": [
      2565
    ],
    "disclosure-*": [
      2592
    ],
    "drop-*": [
      2619
    ],
    "field-*": [
      2646
    ],
    "focus-*": [
      2673
    ],
    "fuchsia-*": [
      2700
    ],
    "gradient-*": [
      2727
    ],
    "gray-*": [
      2754
    ],
    "green-*": [
      2781
    ],
    "heading-*": [
      2808
    ],
    "icon-*": [
      2835
    ],
    "indigo-*": [
      2862
    ],
    "informative-*": [
      2889
    ],
    "magenta-*": [
      2916
    ],
    "navigational-*": [
      2943
    ],
    "negative-*": [
      2970
    ],
    "neutral-*": [
      2997
    ],
    "notice-*": [
      3024
    ],
    "orange-*": [
      3051
    ],
    "overlay-*": [
      3078
    ],
    "pink-*": [
      3105
    ],
    "positive-*": [
      3132
    ],
    "purple-*": [
      3159
    ],
    "red-*": [
      3186
    ],
    "seafoam-*": [
      3213
    ],
    "side-*": [
      3240
    ],
    "silver-*": [
      3267
    ],
    "spacing-*": [
      3294
    ],
    "static-*": [
      3321
    ],
    "text-*": [
      3348
    ],
    "title-*": [
      3375
    ],
    "track-*": [
      3402
    ],
    "transparent-*": [
      3429
    ],
    "turquoise-*": [
      3456
    ],
    "window-*": [
      3483
    ],
    "workflow-*": [
      3510
    ],
    "yellow-*": [
      3537
    ],
    "accordion-bottom-to-text-compact-extra-large": [
      0
    ],
    "accordion-bottom-to-text-compact-large": [
      27
    ],
    "accordion-bottom-to-text-compact-medium": [
      54
    ],
    "accordion-bottom-to-text-compact-small": [
      81
    ],
    "accordion-bottom-to-text-regular-extra-large": [
      108
    ],
    "accordion-bottom-to-text-regular-large": [
      135
    ],
    "accordion-bottom-to-text-regular-medium": [
      162
    ],
    "accordion-bottom-to-text-regular-small": [
      189
    ],
    "accordion-bottom-to-text-spacious-extra-large": [
      216
    ],
    "accordion-bottom-to-text-spacious-large": [
      243
    ],
    "accordion-bottom-to-text-spacious-medium": [
      270
    ],
    "accordion-bottom-to-text-spacious-small": [
      297
    ],
    "accordion-content-area-bottom-to-content": [
      324
    ],
    "accordion-content-area-edge-to-content-extra-large": [
      351
    ],
    "accordion-content-area-edge-to-content-large": [
      378
    ],
    "accordion-content-area-edge-to-content-medium": [
      405
    ],
    "accordion-content-area-edge-to-content-small": [
      432
    ],
    "accordion-content-area-top-to-content": [
      459
    ],
    "accordion-disclosure-indicator-to-text": [
      486
    ],
    "accordion-disclosure-indicator-to-text-extra-large": [
      513
    ],
    "accordion-disclosure-indicator-to-text-large": [
      540
    ],
    "accordion-disclosure-indicator-to-text-medium": [
      567
    ],
    "accordion-disclosure-indicator-to-text-small": [
      594
    ],
    "accordion-edge-to-disclosure-indicator": [
      621
    ],
    "accordion-edge-to-text": [
      648
    ],
    "accordion-focus-indicator-gap": [
      675
    ],
    "accordion-item-to-divider": [
      702
    ],
    "accordion-minimum-width": [
      729
    ],
    "accordion-small-top-to-text-spacious": [
      756
    ],
    "accordion-top-to-text-compact-extra-large": [
      783
    ],
    "accordion-top-to-text-compact-large": [
      810
    ],
    "accordion-top-to-text-compact-medium": [
      837
    ],
    "accordion-top-to-text-compact-small": [
      864
    ],
    "accordion-top-to-text-regular-extra-large": [
      891
    ],
    "accordion-top-to-text-regular-large": [
      918
    ],
    "accordion-top-to-text-regular-medium": [
      945
    ],
    "accordion-top-to-text-regular-small": [
      972
    ],
    "accordion-top-to-text-spacious-extra-large": [
      999
    ],
    "accordion-top-to-text-spacious-large": [
      1026
    ],
    "accordion-top-to-text-spacious-medium": [
      1053
    ],
    "accordion-top-to-text-spacious-small": [
      1080
    ],
    "alert-banner-to-top-text": [
      1107
    ],
    "alert-banner-top-to-text": [
      0
    ],
    "checkbox-control-size-extra-large": [
      1161
    ],
    "checkbox-control-size-large": [
      1188
    ],
    "checkbox-control-size-medium": [
      1215
    ],
    "checkbox-control-size-small": [
      1242
    ],
    "checkbox-top-to-control-extra-large": [
      1269
    ],
    "checkbox-top-to-control-large": [
      1296
    ],
    "checkbox-top-to-control-medium": [
      1323
    ],
    "checkbox-top-to-control-small": [
      1350
    ],
    "drop-zone-background-color": [
      1377,
      3105
    ],
    "side-navigation-bottom-to-text": [
      1404
    ],
    "side-navigation-header-to-item": [
      1431
    ],
    "side-navigation-item-to-header": [
      1458
    ],
    "side-navigation-item-to-item": [
      1485
    ],
    "side-navigation-maximum-width": [
      1512
    ],
    "side-navigation-minimum-width": [
      1539
    ],
    "side-navigation-second-level-edge-to-text": [
      1566
    ],
    "side-navigation-third-level-edge-to-text": [
      1593
    ],
    "side-navigation-width": [
      1620
    ],
    "side-navigation-with-icon-second-level-edge-to-text": [
      1647
    ],
    "side-navigation-with-icon-third-level-edge-to-text": [
      1674
    ],
    "tab-item-bottom-to-text-compact-extra-large": [
      1701
    ],
    "tab-item-bottom-to-text-compact-large": [
      1728
    ],
    "tab-item-bottom-to-text-compact-medium": [
      1755
    ],
    "tab-item-bottom-to-text-compact-small": [
      1782
    ],
    "tab-item-bottom-to-text-extra-large": [
      1809
    ],
    "tab-item-bottom-to-text-large": [
      1836
    ],
    "tab-item-bottom-to-text-medium": [
      1863
    ],
    "tab-item-bottom-to-text-small": [
      1890
    ],
    "tab-item-compact-height-extra-large": [
      1917
    ],
    "tab-item-compact-height-large": [
      1944
    ],
    "tab-item-compact-height-medium": [
      1971
    ],
    "tab-item-compact-height-small": [
      1998
    ],
    "tab-item-focus-indicator-gap-extra-large": [
      2025
    ],
    "tab-item-focus-indicator-gap-large": [
      2052
    ],
    "tab-item-focus-indicator-gap-medium": [
      2079
    ],
    "tab-item-focus-indicator-gap-small": [
      2106
    ],
    "tab-item-height-extra-large": [
      2133
    ],
    "tab-item-height-large": [
      2160
    ],
    "tab-item-height-medium": [
      2187
    ],
    "tab-item-height-small": [
      2214
    ],
    "tab-item-start-to-edge-extra-large": [
      2241
    ],
    "tab-item-start-to-edge-large": [
      2268
    ],
    "tab-item-start-to-edge-medium": [
      2295
    ],
    "tab-item-start-to-edge-quiet": [
      2322
    ],
    "tab-item-start-to-edge-small": [
      2349
    ],
    "tab-item-to-tab-item-horizontal-extra-large": [
      2376
    ],
    "tab-item-to-tab-item-horizontal-large": [
      2403
    ],
    "tab-item-to-tab-item-horizontal-medium": [
      2430
    ],
    "tab-item-to-tab-item-horizontal-small": [
      2457
    ],
    "tab-item-to-tab-item-vertical-extra-large": [
      2484
    ],
    "tab-item-to-tab-item-vertical-large": [
      2511
    ],
    "tab-item-to-tab-item-vertical-medium": [
      2538
    ],
    "tab-item-to-tab-item-vertical-small": [
      2565
    ],
    "tab-item-top-to-text-compact-extra-large": [
      2592
    ],
    "tab-item-top-to-text-compact-large": [
      2619
    ],
    "tab-item-top-to-text-compact-medium": [
      2646
    ],
    "tab-item-top-to-text-compact-small": [
      2673
    ],
    "tab-item-top-to-text-extra-large": [
      2700
    ],
    "tab-item-top-to-text-large": [
      2727
    ],
    "tab-item-top-to-text-medium": [
      2754
    ],
    "tab-item-top-to-text-small": [
      2781
    ],
    "tab-item-top-to-workflow-icon-compact-extra-large": [
      2808
    ],
    "tab-item-top-to-workflow-icon-compact-large": [
      2835
    ],
    "tab-item-top-to-workflow-icon-compact-medium": [
      2862
    ],
    "tab-item-top-to-workflow-icon-compact-small": [
      2889
    ],
    "tab-item-top-to-workflow-icon-extra-large": [
      2916
    ],
    "tab-item-top-to-workflow-icon-large": [
      2943
    ],
    "tab-item-top-to-workflow-icon-medium": [
      2970
    ],
    "tab-item-top-to-workflow-icon-small": [
      2997
    ],
    "accent-color-400": [
      3024
    ],
    "accent-color-800": [
      0,
      72
    ],
    "accent-visual-color": [
      27,
      387
    ],
    "component-height-300": [
      54,
      216
    ],
    "component-height-200": [
      81,
      243
    ],
    "component-height-100": [
      108
    ],
    "component-height-75": [
      135
    ],
    "component-height-500": [
      162
    ],
    "component-height-400": [
      189
    ],
    "blue-400": [
      270
    ],
    "blue-800": [
      0,
      45
    ]
  },
  "columnOffsets": [
    -13.5,
    202.5,
    1561.5,
    1719,
    1723.5
  ],
  "priorColumnAncestorYValues": [],
  "graphState": {
    "width": 2600,
    "height": 3537,
    "topologyKey": "9ct89",
    "nodes": {
      "accordion": {
        "type": "component",
        "id": "accordion",
        "x": 0,
        "y": 0
      },
      "checkbox": {
        "type": "component",
        "id": "checkbox",
        "x": 0,
        "y": 378
      },
      "tab-item": {
        "type": "component",
        "id": "tab-item",
        "x": 0,
        "y": 1782
      },
      "side-navigation": {
        "type": "component",
        "id": "side-navigation",
        "x": 0,
        "y": 1566
      },
      "accordion-top-to-text-compact-small": {
        "type": "token",
        "id": "accordion-top-to-text-compact-small",
        "x": 650,
        "y": 469.125,
        "value": "2px"
      },
      "accordion-top-to-text-regular-small": {
        "type": "token",
        "id": "accordion-top-to-text-regular-small",
        "x": 650,
        "y": 577.125
      },
      "accordion-small-top-to-text-spacious": {
        "type": "token",
        "id": "accordion-small-top-to-text-spacious",
        "x": 650,
        "y": 361.125
      },
      "accordion-top-to-text-compact-medium": {
        "type": "token",
        "id": "accordion-top-to-text-compact-medium",
        "x": 650,
        "y": 442.125,
        "value": "4px"
      },
      "accordion-top-to-text-regular-medium": {
        "type": "token",
        "id": "accordion-top-to-text-regular-medium",
        "x": 650,
        "y": 550.125
      },
      "accordion-top-to-text-spacious-medium": {
        "type": "token",
        "id": "accordion-top-to-text-spacious-medium",
        "x": 650,
        "y": 658.125
      },
      "accordion-top-to-text-compact-large": {
        "type": "token",
        "id": "accordion-top-to-text-compact-large",
        "x": 650,
        "y": 415.125
      },
      "accordion-top-to-text-regular-large": {
        "type": "token",
        "id": "accordion-top-to-text-regular-large",
        "x": 650,
        "y": 523.125
      },
      "accordion-top-to-text-spacious-large": {
        "type": "token",
        "id": "accordion-top-to-text-spacious-large",
        "x": 650,
        "y": 631.125
      },
      "accordion-top-to-text-compact-extra-large": {
        "type": "token",
        "id": "accordion-top-to-text-compact-extra-large",
        "x": 650,
        "y": 388.125
      },
      "accordion-top-to-text-regular-extra-large": {
        "type": "token",
        "id": "accordion-top-to-text-regular-extra-large",
        "x": 650,
        "y": 496.125
      },
      "accordion-top-to-text-spacious-extra-large": {
        "type": "token",
        "id": "accordion-top-to-text-spacious-extra-large",
        "x": 650,
        "y": 604.125
      },
      "accordion-bottom-to-text-compact-small": {
        "type": "token",
        "id": "accordion-bottom-to-text-compact-small",
        "x": 650,
        "y": -313.875
      },
      "accordion-bottom-to-text-regular-small": {
        "type": "token",
        "id": "accordion-bottom-to-text-regular-small",
        "x": 650,
        "y": -205.875
      },
      "accordion-bottom-to-text-spacious-small": {
        "type": "token",
        "id": "accordion-bottom-to-text-spacious-small",
        "x": 650,
        "y": -97.875
      },
      "accordion-bottom-to-text-compact-medium": {
        "type": "token",
        "id": "accordion-bottom-to-text-compact-medium",
        "x": 650,
        "y": -340.875
      },
      "accordion-bottom-to-text-regular-medium": {
        "type": "token",
        "id": "accordion-bottom-to-text-regular-medium",
        "x": 650,
        "y": -232.875
      },
      "accordion-bottom-to-text-spacious-medium": {
        "type": "token",
        "id": "accordion-bottom-to-text-spacious-medium",
        "x": 650,
        "y": -124.875
      },
      "accordion-bottom-to-text-compact-large": {
        "type": "token",
        "id": "accordion-bottom-to-text-compact-large",
        "x": 650,
        "y": -367.875
      },
      "accordion-bottom-to-text-regular-large": {
        "type": "token",
        "id": "accordion-bottom-to-text-regular-large",
        "x": 650,
        "y": -259.875
      },
      "accordion-bottom-to-text-spacious-large": {
        "type": "token",
        "id": "accordion-bottom-to-text-spacious-large",
        "x": 650,
        "y": -151.875
      },
      "accordion-bottom-to-text-compact-extra-large": {
        "type": "token",
        "id": "accordion-bottom-to-text-compact-extra-large",
        "x": 650,
        "y": -394.875
      },
      "accordion-bottom-to-text-regular-extra-large": {
        "type": "token",
        "id": "accordion-bottom-to-text-regular-extra-large",
        "x": 650,
        "y": -286.875
      },
      "accordion-bottom-to-text-spacious-extra-large": {
        "type": "token",
        "id": "accordion-bottom-to-text-spacious-extra-large",
        "x": 650,
        "y": -178.875
      },
      "accordion-minimum-width": {
        "type": "token",
        "id": "accordion-minimum-width",
        "x": 650,
        "y": 334.125
      },
      "accordion-disclosure-indicator-to-text": {
        "type": "token",
        "id": "accordion-disclosure-indicator-to-text",
        "x": 650,
        "y": 91.125,
        "value": "0px"
      },
      "accordion-edge-to-disclosure-indicator": {
        "type": "token",
        "id": "accordion-edge-to-disclosure-indicator",
        "x": 650,
        "y": 226.125,
        "value": "0px"
      },
      "accordion-edge-to-text": {
        "type": "token",
        "id": "accordion-edge-to-text",
        "x": 650,
        "y": 253.125,
        "value": "0px"
      },
      "accordion-focus-indicator-gap": {
        "type": "token",
        "id": "accordion-focus-indicator-gap",
        "x": 650,
        "y": 280.125,
        "value": "0px"
      },
      "accordion-content-area-top-to-content": {
        "type": "token",
        "id": "accordion-content-area-top-to-content",
        "x": 650,
        "y": 64.125
      },
      "accordion-content-area-bottom-to-content": {
        "type": "token",
        "id": "accordion-content-area-bottom-to-content",
        "x": 650,
        "y": -70.875
      },
      "accordion-top-to-text-spacious-small": {
        "type": "token",
        "id": "accordion-top-to-text-spacious-small",
        "x": 650,
        "y": 685.125
      },
      "accordion-content-area-edge-to-content-small": {
        "type": "token",
        "id": "accordion-content-area-edge-to-content-small",
        "x": 650,
        "y": 37.125
      },
      "accordion-content-area-edge-to-content-medium": {
        "type": "token",
        "id": "accordion-content-area-edge-to-content-medium",
        "x": 650,
        "y": 10.125
      },
      "accordion-content-area-edge-to-content-large": {
        "type": "token",
        "id": "accordion-content-area-edge-to-content-large",
        "x": 650,
        "y": -16.875
      },
      "accordion-content-area-edge-to-content-extra-large": {
        "type": "token",
        "id": "accordion-content-area-edge-to-content-extra-large",
        "x": 650,
        "y": -43.875
      },
      "accordion-disclosure-indicator-to-text-small": {
        "type": "token",
        "id": "accordion-disclosure-indicator-to-text-small",
        "x": 650,
        "y": 199.125
      },
      "accordion-disclosure-indicator-to-text-medium": {
        "type": "token",
        "id": "accordion-disclosure-indicator-to-text-medium",
        "x": 650,
        "y": 172.125
      },
      "accordion-disclosure-indicator-to-text-large": {
        "type": "token",
        "id": "accordion-disclosure-indicator-to-text-large",
        "x": 650,
        "y": 145.125
      },
      "accordion-disclosure-indicator-to-text-extra-large": {
        "type": "token",
        "id": "accordion-disclosure-indicator-to-text-extra-large",
        "x": 650,
        "y": 118.125
      },
      "accordion-item-to-divider": {
        "type": "token",
        "id": "accordion-item-to-divider",
        "x": 650,
        "y": 307.125,
        "value": "0px"
      },
      "checkbox-control-size-small": {
        "type": "token",
        "id": "checkbox-control-size-small",
        "x": 650,
        "y": 847.125
      },
      "checkbox-control-size-medium": {
        "type": "token",
        "id": "checkbox-control-size-medium",
        "x": 650,
        "y": 820.125
      },
      "checkbox-control-size-large": {
        "type": "token",
        "id": "checkbox-control-size-large",
        "x": 650,
        "y": 793.125
      },
      "checkbox-control-size-extra-large": {
        "type": "token",
        "id": "checkbox-control-size-extra-large",
        "x": 650,
        "y": 766.125
      },
      "checkbox-top-to-control-small": {
        "type": "token",
        "id": "checkbox-top-to-control-small",
        "x": 650,
        "y": 955.125
      },
      "checkbox-top-to-control-medium": {
        "type": "token",
        "id": "checkbox-top-to-control-medium",
        "x": 650,
        "y": 928.125
      },
      "checkbox-top-to-control-large": {
        "type": "token",
        "id": "checkbox-top-to-control-large",
        "x": 650,
        "y": 901.125
      },
      "checkbox-top-to-control-extra-large": {
        "type": "token",
        "id": "checkbox-top-to-control-extra-large",
        "x": 650,
        "y": 874.125
      },
      "tab-item-height-small": {
        "type": "token",
        "id": "tab-item-height-small",
        "x": 650,
        "y": 1819.125
      },
      "tab-item-height-medium": {
        "type": "token",
        "id": "tab-item-height-medium",
        "x": 650,
        "y": 1792.125
      },
      "tab-item-height-large": {
        "type": "token",
        "id": "tab-item-height-large",
        "x": 650,
        "y": 1765.125
      },
      "tab-item-height-extra-large": {
        "type": "token",
        "id": "tab-item-height-extra-large",
        "x": 650,
        "y": 1738.125
      },
      "tab-item-compact-height-small": {
        "type": "token",
        "id": "tab-item-compact-height-small",
        "x": 650,
        "y": 1603.125
      },
      "tab-item-compact-height-medium": {
        "type": "token",
        "id": "tab-item-compact-height-medium",
        "x": 650,
        "y": 1576.125
      },
      "tab-item-compact-height-large": {
        "type": "token",
        "id": "tab-item-compact-height-large",
        "x": 650,
        "y": 1549.125
      },
      "tab-item-compact-height-extra-large": {
        "type": "token",
        "id": "tab-item-compact-height-extra-large",
        "x": 650,
        "y": 1522.125
      },
      "tab-item-to-tab-item-horizontal-small": {
        "type": "token",
        "id": "tab-item-to-tab-item-horizontal-small",
        "x": 650,
        "y": 2062.125
      },
      "tab-item-to-tab-item-horizontal-medium": {
        "type": "token",
        "id": "tab-item-to-tab-item-horizontal-medium",
        "x": 650,
        "y": 2035.125
      },
      "tab-item-to-tab-item-horizontal-large": {
        "type": "token",
        "id": "tab-item-to-tab-item-horizontal-large",
        "x": 650,
        "y": 2008.125
      },
      "tab-item-to-tab-item-horizontal-extra-large": {
        "type": "token",
        "id": "tab-item-to-tab-item-horizontal-extra-large",
        "x": 650,
        "y": 1981.125
      },
      "tab-item-to-tab-item-vertical-small": {
        "type": "token",
        "id": "tab-item-to-tab-item-vertical-small",
        "x": 650,
        "y": 2170.125
      },
      "tab-item-to-tab-item-vertical-medium": {
        "type": "token",
        "id": "tab-item-to-tab-item-vertical-medium",
        "x": 650,
        "y": 2143.125
      },
      "tab-item-to-tab-item-vertical-large": {
        "type": "token",
        "id": "tab-item-to-tab-item-vertical-large",
        "x": 650,
        "y": 2116.125
      },
      "tab-item-to-tab-item-vertical-extra-large": {
        "type": "token",
        "id": "tab-item-to-tab-item-vertical-extra-large",
        "x": 650,
        "y": 2089.125
      },
      "tab-item-start-to-edge-quiet": {
        "type": "token",
        "id": "tab-item-start-to-edge-quiet",
        "x": 650,
        "y": 1927.125,
        "value": "0px"
      },
      "tab-item-start-to-edge-small": {
        "type": "token",
        "id": "tab-item-start-to-edge-small",
        "x": 650,
        "y": 1954.125
      },
      "tab-item-start-to-edge-medium": {
        "type": "token",
        "id": "tab-item-start-to-edge-medium",
        "x": 650,
        "y": 1900.125
      },
      "tab-item-start-to-edge-large": {
        "type": "token",
        "id": "tab-item-start-to-edge-large",
        "x": 650,
        "y": 1873.125
      },
      "tab-item-start-to-edge-extra-large": {
        "type": "token",
        "id": "tab-item-start-to-edge-extra-large",
        "x": 650,
        "y": 1846.125
      },
      "tab-item-top-to-text-small": {
        "type": "token",
        "id": "tab-item-top-to-text-small",
        "x": 650,
        "y": 2386.125
      },
      "tab-item-bottom-to-text-small": {
        "type": "token",
        "id": "tab-item-bottom-to-text-small",
        "x": 650,
        "y": 1495.125
      },
      "tab-item-top-to-text-medium": {
        "type": "token",
        "id": "tab-item-top-to-text-medium",
        "x": 650,
        "y": 2359.125
      },
      "tab-item-bottom-to-text-medium": {
        "type": "token",
        "id": "tab-item-bottom-to-text-medium",
        "x": 650,
        "y": 1468.125
      },
      "tab-item-top-to-text-large": {
        "type": "token",
        "id": "tab-item-top-to-text-large",
        "x": 650,
        "y": 2332.125
      },
      "tab-item-bottom-to-text-large": {
        "type": "token",
        "id": "tab-item-bottom-to-text-large",
        "x": 650,
        "y": 1441.125
      },
      "tab-item-top-to-text-extra-large": {
        "type": "token",
        "id": "tab-item-top-to-text-extra-large",
        "x": 650,
        "y": 2305.125
      },
      "tab-item-bottom-to-text-extra-large": {
        "type": "token",
        "id": "tab-item-bottom-to-text-extra-large",
        "x": 650,
        "y": 1414.125
      },
      "tab-item-top-to-text-compact-small": {
        "type": "token",
        "id": "tab-item-top-to-text-compact-small",
        "x": 650,
        "y": 2278.125
      },
      "tab-item-bottom-to-text-compact-small": {
        "type": "token",
        "id": "tab-item-bottom-to-text-compact-small",
        "x": 650,
        "y": 1387.125
      },
      "tab-item-top-to-text-compact-medium": {
        "type": "token",
        "id": "tab-item-top-to-text-compact-medium",
        "x": 650,
        "y": 2251.125
      },
      "tab-item-bottom-to-text-compact-medium": {
        "type": "token",
        "id": "tab-item-bottom-to-text-compact-medium",
        "x": 650,
        "y": 1360.125
      },
      "tab-item-top-to-text-compact-large": {
        "type": "token",
        "id": "tab-item-top-to-text-compact-large",
        "x": 650,
        "y": 2224.125
      },
      "tab-item-bottom-to-text-compact-large": {
        "type": "token",
        "id": "tab-item-bottom-to-text-compact-large",
        "x": 650,
        "y": 1333.125
      },
      "tab-item-top-to-text-compact-extra-large": {
        "type": "token",
        "id": "tab-item-top-to-text-compact-extra-large",
        "x": 650,
        "y": 2197.125
      },
      "tab-item-bottom-to-text-compact-extra-large": {
        "type": "token",
        "id": "tab-item-bottom-to-text-compact-extra-large",
        "x": 650,
        "y": 1306.125
      },
      "tab-item-top-to-workflow-icon-small": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-small",
        "x": 650,
        "y": 2602.125
      },
      "tab-item-top-to-workflow-icon-medium": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-medium",
        "x": 650,
        "y": 2575.125
      },
      "tab-item-top-to-workflow-icon-large": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-large",
        "x": 650,
        "y": 2548.125
      },
      "tab-item-top-to-workflow-icon-extra-large": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-extra-large",
        "x": 650,
        "y": 2521.125
      },
      "tab-item-top-to-workflow-icon-compact-small": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-compact-small",
        "x": 650,
        "y": 2494.125
      },
      "tab-item-top-to-workflow-icon-compact-medium": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-compact-medium",
        "x": 650,
        "y": 2467.125
      },
      "tab-item-top-to-workflow-icon-compact-large": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-compact-large",
        "x": 650,
        "y": 2440.125
      },
      "tab-item-top-to-workflow-icon-compact-extra-large": {
        "type": "token",
        "id": "tab-item-top-to-workflow-icon-compact-extra-large",
        "x": 650,
        "y": 2413.125
      },
      "tab-item-focus-indicator-gap-small": {
        "type": "token",
        "id": "tab-item-focus-indicator-gap-small",
        "x": 650,
        "y": 1711.125
      },
      "tab-item-focus-indicator-gap-medium": {
        "type": "token",
        "id": "tab-item-focus-indicator-gap-medium",
        "x": 650,
        "y": 1684.125
      },
      "tab-item-focus-indicator-gap-large": {
        "type": "token",
        "id": "tab-item-focus-indicator-gap-large",
        "x": 650,
        "y": 1657.125
      },
      "tab-item-focus-indicator-gap-extra-large": {
        "type": "token",
        "id": "tab-item-focus-indicator-gap-extra-large",
        "x": 650,
        "y": 1630.125
      },
      "side-navigation-width": {
        "type": "token",
        "id": "side-navigation-width",
        "x": 650,
        "y": 1225.125
      },
      "side-navigation-minimum-width": {
        "type": "token",
        "id": "side-navigation-minimum-width",
        "x": 650,
        "y": 1144.125
      },
      "side-navigation-maximum-width": {
        "type": "token",
        "id": "side-navigation-maximum-width",
        "x": 650,
        "y": 1117.125
      },
      "side-navigation-second-level-edge-to-text": {
        "type": "token",
        "id": "side-navigation-second-level-edge-to-text",
        "x": 650,
        "y": 1171.125
      },
      "side-navigation-third-level-edge-to-text": {
        "type": "token",
        "id": "side-navigation-third-level-edge-to-text",
        "x": 650,
        "y": 1198.125
      },
      "side-navigation-with-icon-second-level-edge-to-text": {
        "type": "token",
        "id": "side-navigation-with-icon-second-level-edge-to-text",
        "x": 650,
        "y": 1252.125
      },
      "side-navigation-with-icon-third-level-edge-to-text": {
        "type": "token",
        "id": "side-navigation-with-icon-third-level-edge-to-text",
        "x": 650,
        "y": 1279.125
      },
      "side-navigation-item-to-item": {
        "type": "token",
        "id": "side-navigation-item-to-item",
        "x": 650,
        "y": 1090.125
      },
      "side-navigation-item-to-header": {
        "type": "token",
        "id": "side-navigation-item-to-header",
        "x": 650,
        "y": 1063.125
      },
      "side-navigation-bottom-to-text": {
        "type": "token",
        "id": "side-navigation-bottom-to-text",
        "x": 650,
        "y": 1009.125
      },
      "side-navigation-header-to-item": {
        "type": "token",
        "id": "side-navigation-header-to-item",
        "x": 650,
        "y": 1036.125
      },
      "component-height-200": {
        "type": "token",
        "id": "component-height-200",
        "x": 1300,
        "y": 1801.125
      },
      "component-height-300": {
        "type": "token",
        "id": "component-height-300",
        "x": 1300,
        "y": 1774.125
      },
      "component-height-400": {
        "type": "token",
        "id": "component-height-400",
        "x": 1300,
        "y": 1747.125
      },
      "component-height-500": {
        "type": "token",
        "id": "component-height-500",
        "x": 1300,
        "y": 1720.125
      },
      "component-height-75": {
        "type": "token",
        "id": "component-height-75",
        "x": 1300,
        "y": 1693.125
      },
      "component-height-100": {
        "type": "token",
        "id": "component-height-100",
        "x": 1300,
        "y": 1666.125
      },
      "alert-banner-top-to-text": {
        "type": "token",
        "id": "alert-banner-top-to-text",
        "x": 1300,
        "y": 1558.125
      },
      "accent-color-800": {
        "type": "token",
        "id": "accent-color-800",
        "x": 1950,
        "y": 1967.625
      },
      "accent-color-400": {
        "type": "token",
        "id": "accent-color-400",
        "x": 650,
        "y": 2629.125
      },
      "alert-banner": {
        "type": "component",
        "id": "alert-banner",
        "x": 0,
        "y": 81
      },
      "alert-banner-to-top-text": {
        "type": "token",
        "id": "alert-banner-to-top-text",
        "x": 650,
        "y": 712.125
      },
      "accent-visual-color": {
        "type": "token",
        "id": "accent-visual-color",
        "x": 1300,
        "y": 1945.125,
        "adjacencyLabels": {
          "accent-color-800": "light",
          "accent-color-900": "wireframe"
        }
      },
      "accent-*": {
        "type": "orphan-category",
        "id": "accent-*",
        "x": 0,
        "y": 2106
      },
      "drop-zone-background-color": {
        "type": "token",
        "id": "drop-zone-background-color",
        "x": 650,
        "y": 2710.125
      },
      "drop-zone": {
        "type": "component",
        "id": "drop-zone",
        "x": 0,
        "y": 837
      },
      "drop-*": {
        "type": "orphan-category",
        "id": "drop-*",
        "x": 0,
        "y": 2619
      },
      "blue-800": {
        "type": "token",
        "id": "blue-800",
        "x": 2600,
        "y": 1967.625,
        "value": "rgb(75, 117, 255):^;light:*;rgb(93, 127, 201):^;wireframe"
      },
      "blue-400": {
        "type": "token",
        "id": "blue-400",
        "x": 1300,
        "y": 1828.125,
        "value": "rgb(172, 207, 253):^;light:*;rgb(192, 205, 234):^;wireframe"
      },
      "heading": {
        "type": "component",
        "id": "heading",
        "x": 0,
        "y": 945
      },
      "body": {
        "type": "component",
        "id": "body",
        "x": 0,
        "y": 270
      },
      "detail": {
        "type": "component",
        "id": "detail",
        "x": 0,
        "y": 783
      },
      "code": {
        "type": "component",
        "id": "code",
        "x": 0,
        "y": 513
      },
      "switch": {
        "type": "component",
        "id": "switch",
        "x": 0,
        "y": 1755
      },
      "radio-button": {
        "type": "component",
        "id": "radio-button",
        "x": 0,
        "y": 1431
      },
      "field-label": {
        "type": "component",
        "id": "field-label",
        "x": 0,
        "y": 891
      },
      "help-text": {
        "type": "component",
        "id": "help-text",
        "x": 0,
        "y": 972
      },
      "status-light": {
        "type": "component",
        "id": "status-light",
        "x": 0,
        "y": 1674
      },
      "action-button": {
        "type": "component",
        "id": "action-button",
        "x": 0,
        "y": 54
      },
      "button": {
        "type": "component",
        "id": "button",
        "x": 0,
        "y": 324
      },
      "tooltip": {
        "type": "component",
        "id": "tooltip",
        "x": 0,
        "y": 2025
      },
      "divider": {
        "type": "component",
        "id": "divider",
        "x": 0,
        "y": 810
      },
      "progress-circle": {
        "type": "component",
        "id": "progress-circle",
        "x": 0,
        "y": 1404
      },
      "toast": {
        "type": "component",
        "id": "toast",
        "x": 0,
        "y": 1998
      },
      "action-bar": {
        "type": "component",
        "id": "action-bar",
        "x": 0,
        "y": 27
      },
      "swatch": {
        "type": "component",
        "id": "swatch",
        "x": 0,
        "y": 1701
      },
      "progress-bar": {
        "type": "component",
        "id": "progress-bar",
        "x": 0,
        "y": 1377
      },
      "meter": {
        "type": "component",
        "id": "meter",
        "x": 0,
        "y": 1242
      },
      "in-line-alert": {
        "type": "component",
        "id": "in-line-alert",
        "x": 0,
        "y": 1134
      },
      "tag": {
        "type": "component",
        "id": "tag",
        "x": 0,
        "y": 1836
      },
      "popover": {
        "type": "component",
        "id": "popover",
        "x": 0,
        "y": 1350
      },
      "menu": {
        "type": "component",
        "id": "menu",
        "x": 0,
        "y": 1188
      },
      "slider": {
        "type": "component",
        "id": "slider",
        "x": 0,
        "y": 1593
      },
      "picker": {
        "type": "component",
        "id": "picker",
        "x": 0,
        "y": 1323
      },
      "text-field": {
        "type": "component",
        "id": "text-field",
        "x": 0,
        "y": 1917
      },
      "text-area": {
        "type": "component",
        "id": "text-area",
        "x": 0,
        "y": 1890
      },
      "combo-box": {
        "type": "component",
        "id": "combo-box",
        "x": 0,
        "y": 675
      },
      "thumbnail": {
        "type": "component",
        "id": "thumbnail",
        "x": 0,
        "y": 1944
      },
      "alert-dialog": {
        "type": "component",
        "id": "alert-dialog",
        "x": 0,
        "y": 108
      },
      "opacity-checkerboard": {
        "type": "component",
        "id": "opacity-checkerboard",
        "x": 0,
        "y": 1296
      },
      "contextual-help": {
        "type": "component",
        "id": "contextual-help",
        "x": 0,
        "y": 702
      },
      "breadcrumbs": {
        "type": "component",
        "id": "breadcrumbs",
        "x": 0,
        "y": 297
      },
      "avatar": {
        "type": "component",
        "id": "avatar",
        "x": 0,
        "y": 189
      },
      "rating": {
        "type": "component",
        "id": "rating",
        "x": 0,
        "y": 1458
      },
      "color-area": {
        "type": "component",
        "id": "color-area",
        "x": 0,
        "y": 540
      },
      "color-wheel": {
        "type": "component",
        "id": "color-wheel",
        "x": 0,
        "y": 648
      },
      "color-slider": {
        "type": "component",
        "id": "color-slider",
        "x": 0,
        "y": 621
      },
      "floating-action-button": {
        "type": "component",
        "id": "floating-action-button",
        "x": 0,
        "y": 918
      },
      "illustrated-message": {
        "type": "component",
        "id": "illustrated-message",
        "x": 0,
        "y": 1026
      },
      "search-field": {
        "type": "component",
        "id": "search-field",
        "x": 0,
        "y": 1485
      },
      "color-loupe": {
        "type": "component",
        "id": "color-loupe",
        "x": 0,
        "y": 594
      },
      "card": {
        "type": "component",
        "id": "card",
        "x": 0,
        "y": 351
      },
      "coach-mark": {
        "type": "component",
        "id": "coach-mark",
        "x": 0,
        "y": 486
      },
      "color-handle": {
        "type": "component",
        "id": "color-handle",
        "x": 0,
        "y": 567
      },
      "table": {
        "type": "component",
        "id": "table",
        "x": 0,
        "y": 1809
      },
      "tray": {
        "type": "component",
        "id": "tray",
        "x": 0,
        "y": 2052
      },
      "in-field-button": {
        "type": "component",
        "id": "in-field-button",
        "x": 0,
        "y": 1053
      },
      "arrow-icon": {
        "type": "component",
        "id": "arrow-icon",
        "x": 0,
        "y": 135
      },
      "asterisk-icon": {
        "type": "component",
        "id": "asterisk-icon",
        "x": 0,
        "y": 162
      },
      "checkmark-icon": {
        "type": "component",
        "id": "checkmark-icon",
        "x": 0,
        "y": 405
      },
      "chevron-icon": {
        "type": "component",
        "id": "chevron-icon",
        "x": 0,
        "y": 432
      },
      "cross-icon": {
        "type": "component",
        "id": "cross-icon",
        "x": 0,
        "y": 729
      },
      "dash-icon": {
        "type": "component",
        "id": "dash-icon",
        "x": 0,
        "y": 756
      },
      "title": {
        "type": "component",
        "id": "title",
        "x": 0,
        "y": 1971
      },
      "field": {
        "type": "component",
        "id": "field",
        "x": 0,
        "y": 864
      },
      "in-field-progress-circle": {
        "type": "component",
        "id": "in-field-progress-circle",
        "x": 0,
        "y": 1080
      },
      "standard-dialog": {
        "type": "component",
        "id": "standard-dialog",
        "x": 0,
        "y": 1620
      },
      "link-out-icon": {
        "type": "component",
        "id": "link-out-icon",
        "x": 0,
        "y": 1161
      },
      "menu-item": {
        "type": "component",
        "id": "menu-item",
        "x": 0,
        "y": 1215
      },
      "coach-indicator": {
        "type": "component",
        "id": "coach-indicator",
        "x": 0,
        "y": 459
      },
      "swatch-group": {
        "type": "component",
        "id": "swatch-group",
        "x": 0,
        "y": 1728
      },
      "avatar-group": {
        "type": "component",
        "id": "avatar-group",
        "x": 0,
        "y": 216
      },
      "standard-panel": {
        "type": "component",
        "id": "standard-panel",
        "x": 0,
        "y": 1647
      },
      "bar-panel": {
        "type": "component",
        "id": "bar-panel",
        "x": 0,
        "y": 243
      },
      "select-box": {
        "type": "component",
        "id": "select-box",
        "x": 0,
        "y": 1539
      },
      "segmented-control": {
        "type": "component",
        "id": "segmented-control",
        "x": 0,
        "y": 1512
      },
      "in-field-stepper": {
        "type": "component",
        "id": "in-field-stepper",
        "x": 0,
        "y": 1107
      },
      "number-field": {
        "type": "component",
        "id": "number-field",
        "x": 0,
        "y": 1269
      },
      "takeover-dialog": {
        "type": "component",
        "id": "takeover-dialog",
        "x": 0,
        "y": 1863
      },
      "tree-view": {
        "type": "component",
        "id": "tree-view",
        "x": 0,
        "y": 2079
      },
      "icon": {
        "type": "component",
        "id": "icon",
        "x": 0,
        "y": 999
      },
      "default-*": {
        "type": "orphan-category",
        "id": "default-*",
        "x": 0,
        "y": 2538
      },
      "text-*": {
        "type": "orphan-category",
        "id": "text-*",
        "x": 0,
        "y": 3348
      },
      "cjk-*": {
        "type": "orphan-category",
        "id": "cjk-*",
        "x": 0,
        "y": 2403
      },
      "heading-*": {
        "type": "orphan-category",
        "id": "heading-*",
        "x": 0,
        "y": 2808
      },
      "body-*": {
        "type": "orphan-category",
        "id": "body-*",
        "x": 0,
        "y": 2214
      },
      "informative-*": {
        "type": "orphan-category",
        "id": "informative-*",
        "x": 0,
        "y": 2889
      },
      "negative-*": {
        "type": "orphan-category",
        "id": "negative-*",
        "x": 0,
        "y": 2970
      },
      "notice-*": {
        "type": "orphan-category",
        "id": "notice-*",
        "x": 0,
        "y": 3024
      },
      "positive-*": {
        "type": "orphan-category",
        "id": "positive-*",
        "x": 0,
        "y": 3132
      },
      "icon-*": {
        "type": "orphan-category",
        "id": "icon-*",
        "x": 0,
        "y": 2835
      },
      "android-*": {
        "type": "orphan-category",
        "id": "android-*",
        "x": 0,
        "y": 2133
      },
      "workflow-*": {
        "type": "orphan-category",
        "id": "workflow-*",
        "x": 0,
        "y": 3510
      },
      "spacing-*": {
        "type": "orphan-category",
        "id": "spacing-*",
        "x": 0,
        "y": 3294
      },
      "component-*": {
        "type": "orphan-category",
        "id": "component-*",
        "x": 0,
        "y": 2457
      },
      "focus-*": {
        "type": "orphan-category",
        "id": "focus-*",
        "x": 0,
        "y": 2673
      },
      "side-*": {
        "type": "orphan-category",
        "id": "side-*",
        "x": 0,
        "y": 3240
      },
      "border-*": {
        "type": "orphan-category",
        "id": "border-*",
        "x": 0,
        "y": 2241
      },
      "field-*": {
        "type": "orphan-category",
        "id": "field-*",
        "x": 0,
        "y": 2646
      },
      "character-*": {
        "type": "orphan-category",
        "id": "character-*",
        "x": 0,
        "y": 2322
      },
      "disclosure-*": {
        "type": "orphan-category",
        "id": "disclosure-*",
        "x": 0,
        "y": 2592
      },
      "navigational-*": {
        "type": "orphan-category",
        "id": "navigational-*",
        "x": 0,
        "y": 2943
      },
      "color-*": {
        "type": "orphan-category",
        "id": "color-*",
        "x": 0,
        "y": 2430
      },
      "corner-*": {
        "type": "orphan-category",
        "id": "corner-*",
        "x": 0,
        "y": 2484
      },
      "gradient-*": {
        "type": "orphan-category",
        "id": "gradient-*",
        "x": 0,
        "y": 2727
      },
      "window-*": {
        "type": "orphan-category",
        "id": "window-*",
        "x": 0,
        "y": 3483
      },
      "transparent-*": {
        "type": "orphan-category",
        "id": "transparent-*",
        "x": 0,
        "y": 3429
      },
      "gray-*": {
        "type": "orphan-category",
        "id": "gray-*",
        "x": 0,
        "y": 2754
      },
      "yellow-*": {
        "type": "orphan-category",
        "id": "yellow-*",
        "x": 0,
        "y": 3537
      },
      "chartreuse-*": {
        "type": "orphan-category",
        "id": "chartreuse-*",
        "x": 0,
        "y": 2349
      },
      "celery-*": {
        "type": "orphan-category",
        "id": "celery-*",
        "x": 0,
        "y": 2295
      },
      "seafoam-*": {
        "type": "orphan-category",
        "id": "seafoam-*",
        "x": 0,
        "y": 3213
      },
      "cyan-*": {
        "type": "orphan-category",
        "id": "cyan-*",
        "x": 0,
        "y": 2511
      },
      "indigo-*": {
        "type": "orphan-category",
        "id": "indigo-*",
        "x": 0,
        "y": 2862
      },
      "purple-*": {
        "type": "orphan-category",
        "id": "purple-*",
        "x": 0,
        "y": 3159
      },
      "fuchsia-*": {
        "type": "orphan-category",
        "id": "fuchsia-*",
        "x": 0,
        "y": 2700
      },
      "magenta-*": {
        "type": "orphan-category",
        "id": "magenta-*",
        "x": 0,
        "y": 2916
      },
      "pink-*": {
        "type": "orphan-category",
        "id": "pink-*",
        "x": 0,
        "y": 3105
      },
      "turquoise-*": {
        "type": "orphan-category",
        "id": "turquoise-*",
        "x": 0,
        "y": 3456
      },
      "brown-*": {
        "type": "orphan-category",
        "id": "brown-*",
        "x": 0,
        "y": 2268
      },
      "silver-*": {
        "type": "orphan-category",
        "id": "silver-*",
        "x": 0,
        "y": 3267
      },
      "cinnamon-*": {
        "type": "orphan-category",
        "id": "cinnamon-*",
        "x": 0,
        "y": 2376
      },
      "static-*": {
        "type": "orphan-category",
        "id": "static-*",
        "x": 0,
        "y": 3321
      },
      "overlay-*": {
        "type": "orphan-category",
        "id": "overlay-*",
        "x": 0,
        "y": 3078
      },
      "background-*": {
        "type": "orphan-category",
        "id": "background-*",
        "x": 0,
        "y": 2160
      },
      "neutral-*": {
        "type": "orphan-category",
        "id": "neutral-*",
        "x": 0,
        "y": 2997
      },
      "disabled-*": {
        "type": "orphan-category",
        "id": "disabled-*",
        "x": 0,
        "y": 2565
      },
      "red-*": {
        "type": "orphan-category",
        "id": "red-*",
        "x": 0,
        "y": 3186
      },
      "orange-*": {
        "type": "orphan-category",
        "id": "orange-*",
        "x": 0,
        "y": 3051
      },
      "green-*": {
        "type": "orphan-category",
        "id": "green-*",
        "x": 0,
        "y": 2781
      },
      "blue-*": {
        "type": "orphan-category",
        "id": "blue-*",
        "x": 0,
        "y": 2187
      },
      "title-*": {
        "type": "orphan-category",
        "id": "title-*",
        "x": 0,
        "y": 3375
      },
      "track-*": {
        "type": "orphan-category",
        "id": "track-*",
        "x": 0,
        "y": 3402
      }
    },
    "adjacencyList": {
      "accordion": [
        "accordion-bottom-to-text-compact-extra-large",
        "accordion-bottom-to-text-compact-large",
        "accordion-bottom-to-text-compact-medium",
        "accordion-bottom-to-text-compact-small",
        "accordion-bottom-to-text-regular-extra-large",
        "accordion-bottom-to-text-regular-large",
        "accordion-bottom-to-text-regular-medium",
        "accordion-bottom-to-text-regular-small",
        "accordion-bottom-to-text-spacious-extra-large",
        "accordion-bottom-to-text-spacious-large",
        "accordion-bottom-to-text-spacious-medium",
        "accordion-bottom-to-text-spacious-small",
        "accordion-content-area-bottom-to-content",
        "accordion-content-area-edge-to-content-extra-large",
        "accordion-content-area-edge-to-content-large",
        "accordion-content-area-edge-to-content-medium",
        "accordion-content-area-edge-to-content-small",
        "accordion-content-area-top-to-content",
        "accordion-disclosure-indicator-to-text",
        "accordion-disclosure-indicator-to-text-extra-large",
        "accordion-disclosure-indicator-to-text-large",
        "accordion-disclosure-indicator-to-text-medium",
        "accordion-disclosure-indicator-to-text-small",
        "accordion-edge-to-disclosure-indicator",
        "accordion-edge-to-text",
        "accordion-focus-indicator-gap",
        "accordion-item-to-divider",
        "accordion-minimum-width",
        "accordion-small-top-to-text-spacious",
        "accordion-top-to-text-compact-extra-large",
        "accordion-top-to-text-compact-large",
        "accordion-top-to-text-compact-medium",
        "accordion-top-to-text-compact-small",
        "accordion-top-to-text-regular-extra-large",
        "accordion-top-to-text-regular-large",
        "accordion-top-to-text-regular-medium",
        "accordion-top-to-text-regular-small",
        "accordion-top-to-text-spacious-extra-large",
        "accordion-top-to-text-spacious-large",
        "accordion-top-to-text-spacious-medium",
        "accordion-top-to-text-spacious-small"
      ],
      "checkbox": [
        "checkbox-control-size-extra-large",
        "checkbox-control-size-large",
        "checkbox-control-size-medium",
        "checkbox-control-size-small",
        "checkbox-top-to-control-extra-large",
        "checkbox-top-to-control-large",
        "checkbox-top-to-control-medium",
        "checkbox-top-to-control-small"
      ],
      "tab-item": [
        "tab-item-bottom-to-text-compact-extra-large",
        "tab-item-bottom-to-text-compact-large",
        "tab-item-bottom-to-text-compact-medium",
        "tab-item-bottom-to-text-compact-small",
        "tab-item-bottom-to-text-extra-large",
        "tab-item-bottom-to-text-large",
        "tab-item-bottom-to-text-medium",
        "tab-item-bottom-to-text-small",
        "tab-item-compact-height-extra-large",
        "tab-item-compact-height-large",
        "tab-item-compact-height-medium",
        "tab-item-compact-height-small",
        "tab-item-focus-indicator-gap-extra-large",
        "tab-item-focus-indicator-gap-large",
        "tab-item-focus-indicator-gap-medium",
        "tab-item-focus-indicator-gap-small",
        "tab-item-height-extra-large",
        "tab-item-height-large",
        "tab-item-height-medium",
        "tab-item-height-small",
        "tab-item-start-to-edge-extra-large",
        "tab-item-start-to-edge-large",
        "tab-item-start-to-edge-medium",
        "tab-item-start-to-edge-quiet",
        "tab-item-start-to-edge-small",
        "tab-item-to-tab-item-horizontal-extra-large",
        "tab-item-to-tab-item-horizontal-large",
        "tab-item-to-tab-item-horizontal-medium",
        "tab-item-to-tab-item-horizontal-small",
        "tab-item-to-tab-item-vertical-extra-large",
        "tab-item-to-tab-item-vertical-large",
        "tab-item-to-tab-item-vertical-medium",
        "tab-item-to-tab-item-vertical-small",
        "tab-item-top-to-text-compact-extra-large",
        "tab-item-top-to-text-compact-large",
        "tab-item-top-to-text-compact-medium",
        "tab-item-top-to-text-compact-small",
        "tab-item-top-to-text-extra-large",
        "tab-item-top-to-text-large",
        "tab-item-top-to-text-medium",
        "tab-item-top-to-text-small",
        "tab-item-top-to-workflow-icon-compact-extra-large",
        "tab-item-top-to-workflow-icon-compact-large",
        "tab-item-top-to-workflow-icon-compact-medium",
        "tab-item-top-to-workflow-icon-compact-small",
        "tab-item-top-to-workflow-icon-extra-large",
        "tab-item-top-to-workflow-icon-large",
        "tab-item-top-to-workflow-icon-medium",
        "tab-item-top-to-workflow-icon-small"
      ],
      "side-navigation": [
        "side-navigation-bottom-to-text",
        "side-navigation-header-to-item",
        "side-navigation-item-to-header",
        "side-navigation-item-to-item",
        "side-navigation-maximum-width",
        "side-navigation-minimum-width",
        "side-navigation-second-level-edge-to-text",
        "side-navigation-third-level-edge-to-text",
        "side-navigation-width",
        "side-navigation-with-icon-second-level-edge-to-text",
        "side-navigation-with-icon-third-level-edge-to-text"
      ],
      "tab-item-height-small": [
        "component-height-200"
      ],
      "tab-item-height-medium": [
        "component-height-300"
      ],
      "tab-item-height-large": [
        "component-height-400"
      ],
      "tab-item-height-extra-large": [
        "component-height-500"
      ],
      "tab-item-compact-height-small": [
        "component-height-75"
      ],
      "tab-item-compact-height-medium": [
        "component-height-100"
      ],
      "tab-item-compact-height-large": [
        "component-height-200"
      ],
      "tab-item-compact-height-extra-large": [
        "component-height-300"
      ],
      "alert-banner": [
        "alert-banner-to-top-text",
        "alert-banner-top-to-text"
      ],
      "alert-banner-to-top-text": [
        "alert-banner-top-to-text"
      ],
      "accent-visual-color": [
        "accent-color-800"
      ],
      "accent-*": [
        "accent-color-400",
        "accent-color-800",
        "accent-visual-color"
      ],
      "drop-zone-background-color": [
        "accent-visual-color"
      ],
      "drop-zone": [
        "drop-zone-background-color"
      ],
      "drop-*": [
        "drop-zone-background-color"
      ],
      "accent-color-800": [
        "blue-800"
      ],
      "accent-color-400": [
        "blue-400"
      ]
    }
  }
}

//State & Controllers
const graphDataSource = {
  listOfComponents: [
    "heading",
    "body",
    "detail",
    "code",
    "checkbox",
    "switch",
    "radio-button",
    "field-label",
    "help-text",
    "status-light",
    "action-button",
    "button",
    "tooltip",
    "divider",
    "progress-circle",
    "toast",
    "action-bar",
    "swatch",
    "progress-bar",
    "meter",
    "in-line-alert",
    "tag",
    "popover",
    "menu",
    "slider",
    "picker",
    "text-field",
    "text-area",
    "combo-box",
    "thumbnail",
    "alert-dialog",
    "opacity-checkerboard",
    "contextual-help",
    "breadcrumbs",
    "avatar",
    "alert-banner",
    "rating",
    "color-area",
    "color-wheel",
    "color-slider",
    "floating-action-button",
    "illustrated-message",
    "search-field",
    "color-loupe",
    "card",
    "drop-zone",
    "coach-mark",
    "accordion",
    "color-handle",
    "table",
    "tab-item",
    "side-navigation",
    "tray",
    "in-field-button",
    "arrow-icon",
    "asterisk-icon",
    "checkmark-icon",
    "chevron-icon",
    "cross-icon",
    "dash-icon",
    "title",
    "field",
    "in-field-progress-circle",
    "standard-dialog",
    "link-out-icon",
    "menu-item",
    "coach-indicator",
    "swatch-group",
    "avatar-group",
    "standard-panel",
    "bar-panel",
    "select-box",
    "segmented-control",
    "in-field-stepper",
    "number-field",
    "takeover-dialog",
    "tree-view",
    "icon",
    "heading",
    "body",
    "detail",
    "code",
    "checkbox",
    "switch",
    "radio-button",
    "field-label",
    "help-text",
    "status-light",
    "action-button",
    "button",
    "tooltip",
    "divider",
    "progress-circle",
    "toast",
    "action-bar",
    "swatch",
    "progress-bar",
    "meter",
    "in-line-alert",
    "tag",
    "popover",
    "menu",
    "slider",
    "picker",
    "text-field",
    "text-area",
    "combo-box",
    "thumbnail",
    "alert-dialog",
    "opacity-checkerboard",
    "contextual-help",
    "breadcrumbs",
    "avatar",
    "alert-banner",
    "rating",
    "color-area",
    "color-wheel",
    "color-slider",
    "floating-action-button",
    "illustrated-message",
    "search-field",
    "color-loupe",
    "card",
    "drop-zone",
    "coach-mark",
    "accordion",
    "color-handle",
    "table",
    "tab-item",
    "side-navigation",
    "tray",
    "in-field-button",
    "arrow-icon",
    "asterisk-icon",
    "checkmark-icon",
    "chevron-icon",
    "cross-icon",
    "dash-icon",
    "title",
    "field",
    "in-field-progress-circle",
    "standard-dialog",
    "link-out-icon",
    "menu-item",
    "coach-indicator",
    "swatch-group",
    "avatar-group",
    "standard-panel",
    "bar-panel",
    "select-box",
    "segmented-control",
    "in-field-stepper",
    "number-field",
    "takeover-dialog",
    "tree-view",
    "icon",
  ],
  listOfOrphanTokens: [],
}

const appModel = {
  state: {
    panX: 663.1976744186047,
    panY: 137.35360465116278,
    zoom: 0.18511627906976744,
    spectrumColorTheme: "dark",
    isDragging: false,
    fullscreenMode: false,
    hoverNodeId: "",
    setFilters: ["spectrum", "light", "wireframe"],
    listOfComponents: graphDataSource.listOfComponents,
    selectedTokens: [
      "accordion-focus-indicator-gap",
      "alert-banner-top-to-text",
      "checkbox-top-to-control-large",
      "accent-color-800",
      "accent-color-400",
    ],
    selectionAncestorNodes: [
      "accordion-focus-indicator-gap",
      "alert-banner-top-to-text",
      "checkbox-top-to-control-large",
      "accent-color-800",
      "accent-color-400",
      "accordion",
      "alert-banner",
      "alert-banner-to-top-text",
      "checkbox",
      "accent-visual-color",
      "accent-*",
      "drop-zone-background-color",
      "drop-zone",
      "drop-*",
    ],
    selectionDescendentNodes: [
      "accordion-focus-indicator-gap",
      "alert-banner-top-to-text",
      "checkbox-top-to-control-large",
      "accent-color-800",
      "accent-color-400",
      "accordion",
      "checkbox",
      "tab-item",
      "side-navigation",
      "blue-800",
      "blue-400",
      "accordion-top-to-text-compact-small",
      "accordion-top-to-text-regular-small",
      "accordion-small-top-to-text-spacious",
      "accordion-top-to-text-compact-medium",
      "accordion-top-to-text-regular-medium",
      "accordion-top-to-text-spacious-medium",
      "accordion-top-to-text-compact-large",
      "accordion-top-to-text-regular-large",
      "accordion-top-to-text-spacious-large",
      "accordion-top-to-text-compact-extra-large",
      "accordion-top-to-text-regular-extra-large",
      "accordion-top-to-text-spacious-extra-large",
      "accordion-bottom-to-text-compact-small",
      "accordion-bottom-to-text-regular-small",
      "accordion-bottom-to-text-spacious-small",
      "accordion-bottom-to-text-compact-medium",
      "accordion-bottom-to-text-regular-medium",
      "accordion-bottom-to-text-spacious-medium",
      "accordion-bottom-to-text-compact-large",
      "accordion-bottom-to-text-regular-large",
      "accordion-bottom-to-text-spacious-large",
      "accordion-bottom-to-text-compact-extra-large",
      "accordion-bottom-to-text-regular-extra-large",
      "accordion-bottom-to-text-spacious-extra-large",
      "accordion-minimum-width",
      "accordion-disclosure-indicator-to-text",
      "accordion-edge-to-disclosure-indicator",
      "accordion-edge-to-text",
      "accordion-content-area-top-to-content",
      "accordion-content-area-bottom-to-content",
      "accordion-top-to-text-spacious-small",
      "accordion-content-area-edge-to-content-small",
      "accordion-content-area-edge-to-content-medium",
      "accordion-content-area-edge-to-content-large",
      "accordion-content-area-edge-to-content-extra-large",
      "accordion-disclosure-indicator-to-text-small",
      "accordion-disclosure-indicator-to-text-medium",
      "accordion-disclosure-indicator-to-text-large",
      "accordion-disclosure-indicator-to-text-extra-large",
      "accordion-item-to-divider",
      "checkbox-control-size-small",
      "checkbox-control-size-medium",
      "checkbox-control-size-large",
      "checkbox-control-size-extra-large",
      "checkbox-top-to-control-small",
      "checkbox-top-to-control-medium",
      "checkbox-top-to-control-extra-large",
      "tab-item-height-small",
      "tab-item-height-medium",
      "tab-item-height-large",
      "tab-item-height-extra-large",
      "tab-item-compact-height-small",
      "tab-item-compact-height-medium",
      "tab-item-compact-height-large",
      "tab-item-compact-height-extra-large",
      "tab-item-to-tab-item-horizontal-small",
      "tab-item-to-tab-item-horizontal-medium",
      "tab-item-to-tab-item-horizontal-large",
      "tab-item-to-tab-item-horizontal-extra-large",
      "tab-item-to-tab-item-vertical-small",
      "tab-item-to-tab-item-vertical-medium",
      "tab-item-to-tab-item-vertical-large",
      "tab-item-to-tab-item-vertical-extra-large",
      "tab-item-start-to-edge-quiet",
      "tab-item-start-to-edge-small",
      "tab-item-start-to-edge-medium",
      "tab-item-start-to-edge-large",
      "tab-item-start-to-edge-extra-large",
      "tab-item-top-to-text-small",
      "tab-item-bottom-to-text-small",
      "tab-item-top-to-text-medium",
      "tab-item-bottom-to-text-medium",
      "tab-item-top-to-text-large",
      "tab-item-bottom-to-text-large",
      "tab-item-top-to-text-extra-large",
      "tab-item-bottom-to-text-extra-large",
      "tab-item-top-to-text-compact-small",
      "tab-item-bottom-to-text-compact-small",
      "tab-item-top-to-text-compact-medium",
      "tab-item-bottom-to-text-compact-medium",
      "tab-item-top-to-text-compact-large",
      "tab-item-bottom-to-text-compact-large",
      "tab-item-top-to-text-compact-extra-large",
      "tab-item-bottom-to-text-compact-extra-large",
      "tab-item-top-to-workflow-icon-small",
      "tab-item-top-to-workflow-icon-medium",
      "tab-item-top-to-workflow-icon-large",
      "tab-item-top-to-workflow-icon-extra-large",
      "tab-item-top-to-workflow-icon-compact-small",
      "tab-item-top-to-workflow-icon-compact-medium",
      "tab-item-top-to-workflow-icon-compact-large",
      "tab-item-top-to-workflow-icon-compact-extra-large",
      "tab-item-focus-indicator-gap-small",
      "tab-item-focus-indicator-gap-medium",
      "tab-item-focus-indicator-gap-large",
      "tab-item-focus-indicator-gap-extra-large",
      "side-navigation-width",
      "side-navigation-minimum-width",
      "side-navigation-maximum-width",
      "side-navigation-second-level-edge-to-text",
      "side-navigation-third-level-edge-to-text",
      "side-navigation-with-icon-second-level-edge-to-text",
      "side-navigation-with-icon-third-level-edge-to-text",
      "side-navigation-item-to-item",
      "side-navigation-item-to-header",
      "side-navigation-bottom-to-text",
      "side-navigation-header-to-item",
      "component-height-200",
      "component-height-300",
      "component-height-400",
      "component-height-500",
      "component-height-75",
      "component-height-100",
    ],
    selectionDescendentIntersectNodes: [],
    componentDescendentNodes: [],
    selectedComponents: ["accordion", "checkbox", "tab-item", "side-navigation"],
    hoverUpstreamNodes: [],
  },
}

const graphModels = {
  baseDisplayGraphModel: {
    state: {
      width: 0,
      height: 0,
      topologyKey: "",
      nodes: graphLayoutWorker.orphanNodes,
      adjacencyList: {},
    },
  },
  completeGraphModel: {
    state: {
      width: 0,
      height: 0,
      topologyKey: "zmnhfw",
      nodes: nodes,
      adjacencyList: adjacencyList,
    },
  },
  displayGraphModel: {
    state: graphLayoutWorker.graphModelState,
  },
}

const graphController = {
  appState: appModel.state,
  baseDisplayGraphModel: graphModels.baseDisplayGraphModel,
  completeGraphModel: graphModels.completeGraphModel,
  displayGraphModel: graphModels.displayGraphModel,
  graphDataSource: graphDataSource,
  graphLayoutWorker: {},
  listOfComponents: graphDataSource.listOfComponents,
  listOfOrphanNodes: [],
  newDictionaryCallbacks: [],
  newGraphStateCallbacks: [],
  selectedComponent: "slider",
  newAppStateCallbacks: [],
}

const appController = {
  appModel: appModel,
  graphController: graphController,
  newAppStateCallbacks: {},
}

// UI
const tokenGraphUI = {
  allSelections: [
    "alert-banner",
    "accordion",
    "checkbox",
    "tab-item",
    "side-navigation",
    "accordion-focus-indicator-gap",
    "alert-banner-top-to-text",
    "checkbox-top-to-control-large",
  ],
  focusItems: ["alert-banner-to-top-text"],
  focusedOrSelected: [
    "alert-banner-to-top-text",
    "alert-banner",
    "accordion",
    "checkbox",
    "tab-item",
    "side-navigation",
    "accordion-focus-indicator-gap",
    "alert-banner-top-to-text",
    "checkbox-top-to-control-large",
  ],
  hoverUpstreamNodes: [],
  isDragging: false,
  panX: 783.522262885026,
  panY: 218.1995120463556,
  renderedHoverUpstream: [],
  selectedComponents: ["alert-banner", "accordion", "checkbox", "tab-item", "side-navigation"],
  selectedTokens: ["accordion-focus-indicator-gap", "alert-banner-top-to-text", "checkbox-top-to-control-large"],
  selectionAncestorNodes: [
    "accordion-focus-indicator-gap",
    "alert-banner-top-to-text",
    "checkbox-top-to-control-large",
    "accordion",
    "alert-banner",
    "alert-banner-to-top-text",
    "checkbox",
  ],
  selectionDescendentIntersectNodes: [],
  selectionDescendentNodes: [
    "accordion-focus-indicator-gap",
    "alert-banner-top-to-text",
    "checkbox-top-to-control-large",
    "alert-banner",
    "accordion",
    "checkbox",
    "tab-item",
    "side-navigation",
    "alert-banner-minimum-height",
    "alert-banner-width",
    "alert-banner-to-top-workflow-icon",
    "alert-banner-top-to-workflow-icon",
    "alert-banner-to-top-text",
    "alert-banner-to-bottom-text",
    "alert-banner-bottom-to-text",
    "alert-banner-top-to-alert-icon",
    "accordion-top-to-text-compact-small",
    "accordion-top-to-text-regular-small",
    "accordion-small-top-to-text-spacious",
    "accordion-top-to-text-compact-medium",
    "accordion-top-to-text-regular-medium",
    "accordion-top-to-text-spacious-medium",
    "accordion-top-to-text-compact-large",
    "accordion-top-to-text-regular-large",
    "accordion-top-to-text-spacious-large",
    "accordion-top-to-text-compact-extra-large",
    "accordion-top-to-text-regular-extra-large",
    "accordion-top-to-text-spacious-extra-large",
    "accordion-bottom-to-text-compact-small",
    "accordion-bottom-to-text-regular-small",
    "accordion-bottom-to-text-spacious-small",
    "accordion-bottom-to-text-compact-medium",
    "accordion-bottom-to-text-regular-medium",
    "accordion-bottom-to-text-spacious-medium",
    "accordion-bottom-to-text-compact-large",
    "accordion-bottom-to-text-regular-large",
    "accordion-bottom-to-text-spacious-large",
    "accordion-bottom-to-text-compact-extra-large",
    "accordion-bottom-to-text-regular-extra-large",
    "accordion-bottom-to-text-spacious-extra-large",
    "accordion-minimum-width",
    "accordion-disclosure-indicator-to-text",
    "accordion-edge-to-disclosure-indicator",
    "accordion-edge-to-text",
    "accordion-content-area-top-to-content",
    "accordion-content-area-bottom-to-content",
    "accordion-top-to-text-spacious-small",
    "accordion-content-area-edge-to-content-small",
    "accordion-content-area-edge-to-content-medium",
    "accordion-content-area-edge-to-content-large",
    "accordion-content-area-edge-to-content-extra-large",
    "accordion-disclosure-indicator-to-text-small",
    "accordion-disclosure-indicator-to-text-medium",
    "accordion-disclosure-indicator-to-text-large",
    "accordion-disclosure-indicator-to-text-extra-large",
    "accordion-item-to-divider",
    "checkbox-control-size-small",
    "checkbox-control-size-medium",
    "checkbox-control-size-large",
    "checkbox-control-size-extra-large",
    "checkbox-top-to-control-small",
    "checkbox-top-to-control-medium",
    "checkbox-top-to-control-extra-large",
    "tab-item-height-small",
    "tab-item-height-medium",
    "tab-item-height-large",
    "tab-item-height-extra-large",
    "tab-item-compact-height-small",
    "tab-item-compact-height-medium",
    "tab-item-compact-height-large",
    "tab-item-compact-height-extra-large",
    "tab-item-to-tab-item-horizontal-small",
    "tab-item-to-tab-item-horizontal-medium",
    "tab-item-to-tab-item-horizontal-large",
    "tab-item-to-tab-item-horizontal-extra-large",
    "tab-item-to-tab-item-vertical-small",
    "tab-item-to-tab-item-vertical-medium",
    "tab-item-to-tab-item-vertical-large",
    "tab-item-to-tab-item-vertical-extra-large",
    "tab-item-start-to-edge-quiet",
    "tab-item-start-to-edge-small",
    "tab-item-start-to-edge-medium",
    "tab-item-start-to-edge-large",
    "tab-item-start-to-edge-extra-large",
    "tab-item-top-to-text-small",
    "tab-item-bottom-to-text-small",
    "tab-item-top-to-text-medium",
    "tab-item-bottom-to-text-medium",
    "tab-item-top-to-text-large",
    "tab-item-bottom-to-text-large",
    "tab-item-top-to-text-extra-large",
    "tab-item-bottom-to-text-extra-large",
    "tab-item-top-to-text-compact-small",
    "tab-item-bottom-to-text-compact-small",
    "tab-item-top-to-text-compact-medium",
    "tab-item-bottom-to-text-compact-medium",
    "tab-item-top-to-text-compact-large",
    "tab-item-bottom-to-text-compact-large",
    "tab-item-top-to-text-compact-extra-large",
    "tab-item-bottom-to-text-compact-extra-large",
    "tab-item-top-to-workflow-icon-small",
    "tab-item-top-to-workflow-icon-medium",
    "tab-item-top-to-workflow-icon-large",
    "tab-item-top-to-workflow-icon-extra-large",
    "tab-item-top-to-workflow-icon-compact-small",
    "tab-item-top-to-workflow-icon-compact-medium",
    "tab-item-top-to-workflow-icon-compact-large",
    "tab-item-top-to-workflow-icon-compact-extra-large",
    "tab-item-focus-indicator-gap-small",
    "tab-item-focus-indicator-gap-medium",
    "tab-item-focus-indicator-gap-large",
    "tab-item-focus-indicator-gap-extra-large",
    "side-navigation-width",
    "side-navigation-minimum-width",
    "side-navigation-maximum-width",
    "side-navigation-second-level-edge-to-text",
    "side-navigation-third-level-edge-to-text",
    "side-navigation-with-icon-second-level-edge-to-text",
    "side-navigation-with-icon-third-level-edge-to-text",
    "side-navigation-item-to-item",
    "side-navigation-item-to-header",
    "side-navigation-bottom-to-text",
    "side-navigation-header-to-item",
    "component-height-200",
    "component-height-300",
    "component-height-400",
    "component-height-500",
    "component-height-75",
    "component-height-100",
  ],
  spectrumColorTheme: "dark",
  zoom: 0.18511741384568467,
}

const tokenGraphNodeUI = {
  selected: false,
  isFaded: true,
  id: "component-height-200",
  value: "",
  type: "token",
  isIntersect: false,
  selectionAncestor: false,
  selectionDescendent: true,
  hasDownstream: false,
  hoverUpstream: false,
  fillColor: "--spectrum-fuchsia-100",
  textColor: "--spectrum-fuchsia-500",
  decomposedValues: [],
  rowCount: 1,
  pointerOverDepth: 0,
  isInteractingWithButton: false,
  isValidDrag: false,
}

const sidebarUI = {
  dictionary: dictionary,
  filters: ["spectrum", "light", "desktop"],
  listOfComponents: [],
  selectedComponents: ["slider"],
  selectedTokens: [],
  spectrumColorTheme: "dark",
}

const searchUI = {
  dictionary: dictionary,
  graphState: {
    width: 0,
    height: 0,
    topologyKey: "",
    nodes: {},
    adjacencyList: {},
  },
  searchQuery: "acc",
  searchResults: [
    {
      value: "accent-*",
      type: "orphan-category",
      matchMarkup: "<span>acce</span>nt-*",
    },
    {
      value: "accent-background-color-default",
      type: "token",
      matchMarkup: "<span>acce</span>nt-background-color-default",
    },
    {
      value: "accent-background-color-down",
      type: "token",
      matchMarkup: "<span>acce</span>nt-background-color-down",
    },
    {
      value: "accent-background-color-hover",
      type: "token",
      matchMarkup: "<span>acce</span>nt-background-color-hover",
    },
    {
      value: "accent-background-color-key-focus",
      type: "token",
      matchMarkup: "<span>acce</span>nt-background-color-key-focus",
    },
    {
      value: "accent-color-100",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-100",
    },
    {
      value: "accent-color-1000",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-1000",
    },
    {
      value: "accent-color-1100",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-1100",
    },
    {
      value: "accent-color-1200",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-1200",
    },
    {
      value: "accent-color-1300",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-1300",
    },
    {
      value: "accent-color-1400",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-1400",
    },
    {
      value: "accent-color-1500",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-1500",
    },
    {
      value: "accent-color-1600",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-1600",
    },
    {
      value: "accent-color-200",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-200",
    },
    {
      value: "accent-color-300",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-300",
    },
    {
      value: "accent-color-400",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-400",
    },
    {
      value: "accent-color-500",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-500",
    },
    {
      value: "accent-color-600",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-600",
    },
    {
      value: "accent-color-700",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-700",
    },
    {
      value: "accent-color-800",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-800",
    },
    {
      value: "accent-color-900",
      type: "token",
      matchMarkup: "<span>acce</span>nt-color-900",
    },
    {
      value: "accent-content-color-default",
      type: "token",
      matchMarkup: "<span>acce</span>nt-content-color-default",
    },
    {
      value: "accent-content-color-down",
      type: "token",
      matchMarkup: "<span>acce</span>nt-content-color-down",
    },
    {
      value: "accent-content-color-hover",
      type: "token",
      matchMarkup: "<span>acce</span>nt-content-color-hover",
    },
    {
      value: "accent-content-color-key-focus",
      type: "token",
      matchMarkup: "<span>acce</span>nt-content-color-key-focus",
    },
    {
      value: "accent-content-color-selected",
      type: "token",
      matchMarkup: "<span>acce</span>nt-content-color-selected",
    },
    {
      value: "accent-subtle-background-color-default",
      type: "token",
      matchMarkup: "<span>acce</span>nt-subtle-background-color-default",
    },
    {
      value: "accent-visual-color",
      type: "token",
      matchMarkup: "<span>acce</span>nt-visual-color",
    },
  ],
  stringMatchWorker: {},
  targetIndex: 0,
}

const hubUI = {
  fullscreenMode: false,
  zoom: 0.55,
}

const filtersMenuUI = {
  filters: ["spectrum", "light", "wireframe"],
  CATEGORIZED_TOKEN_FILTERS: {
    theme: ["spectrum"],
    color: ["light", "dark", "wireframe"],
    scale: ["desktop", "mobile"],
  },
  ORDERED_TOKEN_FILTER_CATEGORIES: ["theme", "color", "scale"],
}

const tabsUI = {
  tabItems: [
    "alert-banner",
    "accordion",
    "checkbox",
    "tab-item",
    "side-navigation",
    "accordion-focus-indicator-gap",
    "alert-banner-top-to-text",
    "checkbox-top-to-control-large",
  ],
  tabCount: 8,
}

const appUI = {
  alterKey: "",
  alertMessage: "",
  appController: appController,
  appState: appModel.state,
  dictionary: dictionary,
  graphController: graphController,
  graphState: graphModels.displayGraphModel.state,
  showAlert: false,
  urlParamComponent: "accordion,checkbox,tab-item,side-navigation",
  urlParamFilter: "spectrum,light,wireframe",
  urlParamToken:
    "accordion-focus-indicator-gap,alert-banner-top-to-text,checkbox-top-to-control-large,accent-color-800,accent-color-400",
  urlParams: {},
}

const graphGridUI = {
  lineColorR: 40,
  lineColorG: 40,
  lineColorB: 40,
  backgroundColor: "#000000",
  cellFadeOutThresh: 50,
  posx: 793,
  posy: 31.73750000000001,
  scale: 0.1,
  size: 7,
  maximumRepeatingTileSize: 200,
  lineWidth: 1,
  baseScale: 7.142857142857143,
  scaleDiff: 0.014,
  cellSizePx: 2.8000000000000003,
}


