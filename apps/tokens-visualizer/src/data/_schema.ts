const types = {
  dictionary: {
    "component": "component",
    "token": "token"
  },
  tokenSets: {
    "desktop": "desktop",
    "mobile": "mobile",
    "all": "all"
  }
}

/** definitions */
const componentNames = {
  "button": "button",
  "radio-button": "radio-button",
  "avatar": "avatar",
  "accordion": "accordion",
}
const componentTokenNames = {
  "accordion-top-to-text-compact-small": "accordion-top-to-text-compact-small",
  "accordion-top-to-text-spacious-small": "accordion-top-to-text-spacious-small",
  "button-minimum-width-multiplier": "button-minimum-width-multiplier",
  "accordion-top-to-text-regular-small": "accordion-top-to-text-regular-small",
  "accordion-bottom-to-text-compact-small": "accordion-bottom-to-text-compact-small",
  "accordion-focus-indicator-gap": "accordion-focus-indicator-gap",
  "accordion-item-to-divider": "accordion-item-to-divider",
  "accordion-disclosure-indicator-to-text-medium": "accordion-disclosure-indicator-to-text-medium"
}
const themeTokenNames = {
  "default-font-family": "default-font-family",
  "font-size-25": "font-size-25",
  "font-size-50": "font-size-50"
}


/** Tokens */
const componentTokens = [
  {
    "name": componentNames.button,
    "token": componentTokenNames["button-minimum-width-multiplier"],
    "type": types.tokenSets.desktop,
    "value": ""
  },
  {
    "name": componentNames.button,
    "token": componentTokenNames["button-minimum-width-multiplier"],
    "type": types.tokenSets.mobile,
    "value": ""
  },
  {
    "name": componentNames.accordion,
    "token": componentTokenNames["accordion-top-to-text-regular-small"],
    "type": types.tokenSets.desktop,
    "value": "10px"
  },
  {
    "name": componentNames.accordion,
    "token": componentTokenNames["accordion-top-to-text-regular-small"],
    "type": types.tokenSets.mobile,
    "value": "12px"
  }
]
const themeTokens = [
  {
    name: themeTokenNames["default-font-family"],
    token: themeTokenNames["default-font-family"],
    type: types.tokenSets.all,
    value: "{sans-serif-font-family}"
  },
  {
    name: themeTokenNames["font-size-25"],
    token: themeTokenNames["font-size-25"],
    type: types.tokenSets.desktop,
    value: "10px"
  },
  {
    name: themeTokenNames["font-size-25"],
    token: themeTokenNames["font-size-25"],
    type: types.tokenSets.mobile,
    value: "12px"
  },
  {
    name: themeTokenNames["font-size-50"],
    token: themeTokenNames["font-size-50"],
    type: types.tokenSets.desktop,
    value: "11px"
  },
  {
    name: themeTokenNames["font-size-50"],
    token: themeTokenNames["font-size-50"],
    type: types.tokenSets.mobile,
    value: "13px"
  }

]
const tokens = [
  ...componentTokens,
  ...themeTokens
]



//componentNames 1 to 1
//componentTokenNames: 1 to 1
//themeTokenNames: 1 to 1
const dictionary = [
  // componentNames
  {
    "value": componentNames.button,
    "type": types.dictionary.component,
    "metadata": ""
  },

  //componentTokenNames
  {
    "value": componentTokenNames["button-minimum-width-multiplier"],
    "type": types.dictionary.component,
    "metadata": ""
  },

  {
    "value": themeTokenNames["default-font-family"],
    "type": types.dictionary.token,
    "metadata": ""
  },
  {
    "value": themeTokenNames["font-size-25"],
    "type": types.dictionary.token,
  },

  {
    "value": themeTokenNames["font-size-50"],
    "type": types.dictionary.token,
  },

]


// componentNames 1 to 1
// componentTokens 1 to 1 when componentTokens.name.count > 1 (components with Sets), then add its componentTokenNames.xxx
// componentTokenNames 1 to 1 + enrich with componentTokens values eg Mobile, Desktop within the same record
// figure out what to do for orphans

// componentNames 1 to 1
const nodesForComponents = [
  {
    type: types.dictionary.component,
    id: componentNames.button,
    x: 0,
    y: 0
  },
]

// componentTokenNames 1 to 1 + check count > 1 in componentTokens
const nodesForComponentsWithMultiTokens = [
  {
    type: types.dictionary.token,
    id: componentTokenNames["accordion-top-to-text-compact-small"]
  }
]

const nodes = [
  {
    type: types.dictionary.component,
    id: componentNames.button
  },
  {
    type: types.dictionary.token,
    id: componentTokenNames["button-minimum-width-multiplier"]
  }
]



