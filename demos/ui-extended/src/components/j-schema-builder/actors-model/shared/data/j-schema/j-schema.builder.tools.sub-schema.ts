export default {
  compositionForm: {
    "schema": {
      "type": "object",
      "properties": {
        "composition": {
          "type": "object",
          "properties": {

            "oneOf": {
              "type": "array",
              "items": { "$ref": "draft07.schema.json" }
            },
            "allOf": {
              "type": "array",
              "items": { "$ref": "draft07.schema.json" }
            },
            "any": {
              "type": "array",
              "items": { "$ref": "draft07.schema.json" }
            }
          }
        }
      }
    },

    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Formbuilder",
          "scope": "#/properties/composition",
          "options": {
            "schemaOnly": true,
            "baseTool": "combinator"
          }
        }
      ]
    },
    "data": {}
  },
  conditionalForm: {
    "schema": {
      "type": "object",
      "properties": {
        "conditional": {
          "type": "object",
          "properties": {

            "if": { "$ref": "draft07.schema.json" },
            "then": { "$ref": "draft07.schema.json" },
            "else": { "$ref": "draft07.schema.json" }
          }
        },
        "composition": {
          "type": "object",
          "properties": {

            "oneOf": {"type": "array", "items": { "$ref": "draft07.schema.json" } },
            "allOf": {"type": "array", "items": { "$ref": "draft07.schema.json" } },
            "anyOf": {"type": "array", "items": { "$ref": "draft07.schema.json" } }
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [

        {
          "scope": "#",
          "type": "Formbuilder",
          "options": {
            "hideDroparea": true,
            "schemaOnly": true
          }
        },

        {
          "type": "Group",
          "label": "If",
          "elements": [
            {
              "type": "Formbuilder",
              "scope": "#/properties/conditional/properties/if",
              "options": {
                "schemaOnly": true,
                "hideToolbar": true,
                "baseTool": "schema",
                "baseToolProps": {
                  "hideActionbar": true,
                  "prefixLabel": "If:"
                }
              }
            }
          ],
          "options": {
            "collapsible": true
          }
        },

        {
          "type": "Group",
          "label": "Then",
          "elements": [
            {
              "type": "Formbuilder",
              "scope": "#/properties/conditional/properties/then",
              "options": {
                "schemaOnly": true,
                "hideToolbar": true,
                "baseTool": "schema",
                "baseToolProps": {
                  "hideActionbar": true,
                  "prefixLabel": "Then:"
                }
              }
            }
          ],
          "options": {
            "collapsible": true
          }
        },

        {
          "type": "Group",
          "label": "Else",
          "elements": [
            {
              "type": "Formbuilder",
              "scope": "#/properties/conditional/properties/else",
              "options": {
                "schemaOnly": true,
                "hideToolbar": true,
                "baseTool": "schema",
                "baseToolProps": {
                  "hideActionbar": true,
                  "prefixLabel": "Else:"
                }
              }
            }
          ],
          "options": {
            "collapsible": true
          }
        },



        {
          "type": "Group",
          "label": "Composition (oneOf / anyOf / allOf)",
          "elements": [
            {
              "type": "Formbuilder",
              "scope": "#/properties/composition",
              "options": {
                "schemaOnly": true,
                "hideToolbar": true,
                "baseTool": "combinator"
              }
            }
          ],
          "options": {
            "collapsible": true
          }
        }

      ]
    },
    "data": {}
  },
  constForm: {
    "schema": {
      "type": "object",
      "properties": {
        "const": {
          "type": "object",
          "properties": {
            "const": {
              "oneOf": [
                {
                  "type": "string",
                  "title": "string"
                },
                {
                  "type": "number",
                  "title": "number"
                },
                {
                  "type": "boolean",
                  "title": "boolean"
                }
              ]
            },
            "parseAs": {
              "type": "string",
              "enum": [
                "json",
                "null"
              ]
            }
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/const/properties/const"
        },
        {
          "type": "Control",
          "scope": "#/properties/const/properties/parseAs",
          "rule": {
            "effect": "SHOW",
            "condition": {
              "scope": "#/properties/const/properties/const",
              "schema": {
                "allOf": [
                  {
                    "type": "string"
                  },
                  {
                    "oneOf": [
                      {
                        "const": "null"
                      },
                      {
                        "pattern": "^\\{|\\[.*\\}|\\]$"
                      }
                    ]
                  }
                ]
              }
            }
          }
        }
      ]
    },
    "data": {}
  },
  definitionsForm: {
    "schema": {
      "type": "object",
      "properties": {
        "definitions": {
          "type": "object",
          "properties": {
            "definitions": {
              "type": "object"
            }
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [

        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "Formbuilder",
              "scope": "#/properties/definitions/properties/definitions",
              "options": {
                "schemaOnly": true,
                "useProperties": true,
                "baseToolProps": {
                  "hideActionbar": true,
                  "prefixLabel": "definitions:"
                }
              }
            }
          ]
        }
      ]
    },
    "data": {}
  },
  labelModeBothForm: {
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "scope": "#/properties/labelAndI18n/properties/label",
              "type": "Control"
            },
            {
              "scope": "#/properties/labelAndI18n/properties/title",
              "type": "Control"
            }
          ]
        },

        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "scope": "#/properties/labelAndI18n/properties/description",
              "type": "Control",
              "options": {
                "multi": true
              },
              "rule": {
                "effect": "HIDE",
                "condition": {
                  "type": "OR",
                  "conditions": [
                    {
                      "scope": "#/properties/_isSchemaReadOnly",
                      "schema": {"const": true}
                    },
                    {
                      "scope": "#/properties/labelAndI18n/properties/_type",
                      "schema": {"enum": ["Category","Group"]}
                    }
                  ]
                }
              }
            },
            {
              "scope": "#/properties/uiOptions/properties/options/properties/showUnfocusedDescription",
              "type": "Control",
              "rule": {
                "effect": "SHOW",
                "condition": {
                  "scope": "#/properties/labelAndI18n/properties/_type",
                  "schema": { "const":"Control" }
                }
              }
            }
          ]
        },
        {
          "scope": "#/properties/labelAndI18n/properties/i18n",
          "type": "Control"
        },
        {
          "scope": "#/properties/labelAndI18n/properties/_type",
          "type": "Control",
          "rule": {
            "effect": "HIDE",
            "condition": {}
          }
        }
      ]
    },
    "data": {}
  },
  labelModeSchemaForm: {},
  labelModeUiForm: {},
  labelSchemaForm: {},
  operationForm: {},
  ruleForm: {},
  stylesForm: {},
  uioptionsForm: {},
  validationForm: {}
}
