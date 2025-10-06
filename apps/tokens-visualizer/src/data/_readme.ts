/**
 *
 * Tokens
 * - Object of objects
 * - @$schema, value or sets, uuid
 * - @sets recursive self
 *
 * Examples:
 * default-font-family: token - with value
 * @font-size-25: token - with sets
 * @accordion-top-to-text-compact-small: component token - with value
 * @accordion-top-to-text-spacious-small: component token - with sets
 *
 */
const tokens = {
  "default-font-family": {
    $schema: "https://opensource.adobe.com/spectrum-tokens/schemas/token-types/alias.json",
    value: "{sans-serif-font-family}",
    uuid: "45d43d4e-a4e4-4c5f-94ec-644a81300eb0",
  },
  "font-size-25": {
    "$schema": "https://opensource.adobe.com/spectrum-tokens/schemas/token-types/scale-set.json",
    "sets": {
      "desktop": {
        "$schema": "https://opensource.adobe.com/spectrum-tokens/schemas/token-types/font-size.json",
        "value": "10px",
        "uuid": "26ab49ea-7e86-4f0d-812e-ef1ba794c8a8"
      },
      "mobile": {
        "$schema": "https://opensource.adobe.com/spectrum-tokens/schemas/token-types/font-size.json",
        "value": "12px",
        "uuid": "5946a4e5-8bed-4dd7-aa73-9ebe232f9790"
      }
    }
  },
  "accordion-top-to-text-compact-small": {
    component: "accordion",
    $schema: "https://opensource.adobe.com/spectrum-tokens/schemas/token-types/dimension.json",
    value: "2px",
    uuid: "d6cc404c-af92-43be-88e3-407fdcb6e068",
  },
  "accordion-top-to-text-spacious-small": {
    component: "accordion",
    $schema: "https://opensource.adobe.com/spectrum-tokens/schemas/token-types/scale-set.json",
    sets: {
      desktop: {
        $schema: "https://opensource.adobe.com/spectrum-tokens/schemas/token-types/dimension.json",
        value: "9px",
        uuid: "696ab6c1-0c23-4868-8d6c-039d6d430d29",
      },
      mobile: {
        $schema: "https://opensource.adobe.com/spectrum-tokens/schemas/token-types/dimension.json",
        value: "12px",
        uuid: "7bcbaaf1-f1d8-4755-acb2-5f6a45c3b9fe",
      },
    },
  },
}


/**
 * Dictionary
 * - Array of objects
 * - @value, type, meta
 *
 * NB: it has all tokens + injected component objects. eg value: accordion
 */
const dictionary = [
  {
    "value": "default-font-family",
    "type": "token",
    "metadata": ""
  },
  {
    "value": "font-size-25",
    "type": "token",
    "metadata": ""
  },

  {
    "value": "accordion",
    "type": "component",
    "metadata": ""
  },


  {
    "value": "accordion-top-to-text-compact-small",
    "type": "token",
    "metadata": "2px"
  },
  {
    "value": "accordion-top-to-text-spacious-small",
    "type": "token",
    "metadata": ""
  },
]


/**
 * Nodes
 * - Object of objects
 * - @type, id, x, y, value?
 * - @adjacencyLabels: { key: value }
 *
 * How to:
 * - from tokens, every item has { component: value }
 * - from dictionary, every { type: component }
 * - orphan --> (type !== component ) + something else. usually accordion-*, default-*
 */
const nodes = {
  "accordion": {
    "type": "component",
    "id": "accordion",
    "x": 0,
    "y": 0
  },
  "accordion-top-to-text-compact-large": {
    "type": "token",
    "id": "accordion-top-to-text-compact-large",
    "x": 650,
    "y": 415.125
  },
  "seafoam-*": {
    "type": "orphan-category",
    "id": "seafoam-*",
    "x": 0,
    "y": 3213
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
  "accordion-top-to-text-compact-small": {
    "type": "token",
    "id": "accordion-top-to-text-compact-small",
    "x": 650,
    "y": 469.125,
    "value": "2px"
  },
}


/**
 * can be captured from dictionary where type = component, get the value
 */
const listOfComponents = [
  "heading",
  "body",
  "detail",
  "code",
  "checkbox",
]

/**
 * object of key: array
 * keys = from nodes where type=component or "type": "orphan-category",
 * value array = in tokens, get all sets or value per key
 */
const adjacencyList = {}
