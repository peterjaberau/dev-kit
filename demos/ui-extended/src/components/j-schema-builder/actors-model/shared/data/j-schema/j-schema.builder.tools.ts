export default {

  simpleTypeTool: {
    Schema: {
      "type": "object",

      "definitions": {


        "type": {
          "$comment" : "@see http://json-schema.org/draft-07/schema#/definitions/simpleTypes",
          "enum": ["string", "number", "integer", "boolean"]
        },

        "format": {
          "$comment" : "@see https://json-schema.org/understanding-json-schema/reference/string.html?highlight=format#built-in-formats",
          "enum": [
            "date", "time", "date-time", "duration",
            "email","password",
            "uuid",
            "regex",
            "hostname", "ipv4", "ipv6",
            "uri","uri-reference","iri","iri-reference",
            "binary"
          ]
        }
      },


      "properties": {
        "validation": {
          "$ref":"validation.schema#/properties/validation"
        },
        "conditional": {
          "$ref": "conditional.schema#/properties/conditional"
        },
        "rule": {
          "$ref":"rule.schema#/properties/rule"
        },
        "labelAndI18n": {
          "$ref":"labelAndI18n.schema#/properties/labelAndI18n"
        },
        "uiOptions": {
          "$ref":"uiOptions.schema#/properties/uiOptions"
        },

        "schema": {
          "type": "object",
          "properties": {

            "type": {  "$ref": "#/definitions/type" },
            "format": {  "$ref": "#/definitions/format" },

            "contentMediaType": {
              "type": "string",
              "description": "like: 'image/*', 'image/jpeg' or 'application/pdf'"
            },

            "contentEncoding": {
              "$comment" : "[\"7bit\", \"8bit\", \"binary\", \"quoted-printable\", \"base16\", \"base32\", \"base64\"] there are really only two options useful for modern usage",
              "type": "string",
              "enum": ["base64"]
            }
          }
        },


        "propertyName": {
          "type": "string",
          "pattern": "^[a-z]"
        },

        "required": {
          "type": "boolean"
        },

        "_isUischema": {"type":"boolean"},
        "_isSchemaOnly": {"type":"boolean"},
        "_isSchemaReadOnly": {"type":"boolean"},
        "_isProperty": {"type":"boolean"}
      },


      "allOf": [
        {
          "if": {
            "properties": {
              "_isProperty": {"const": true}
            }
          },
          "then":{
            "required": ["propertyName"]
          }
        }
      ]


    },
    ModeUiUischema: {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "scope": "#/properties/propertyName",
                  "type": "Control",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#/properties/_isProperty",
                      "schema": {"const": true}
                    }
                  }
                },

                {
                  "type": "Group",
                  "label": "Form Type",
                  "elements": [
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "scope": "#/properties/schema/properties/type",
                          "type": "Control"
                        },
                        {
                          "scope": "#/properties/schema/properties/format",
                          "type": "Control",
                          "rule": {
                            "effect": "ENABLE",
                            "condition": {
                              "scope": "#/properties/schema/properties/type",
                              "schema": {
                                "const": "string"
                              }
                            }
                          }
                        }
                      ]
                    },
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "scope": "#/properties/schema/properties/contentMediaType",
                          "type": "Control"
                        },
                        {
                          "scope": "#/properties/schema/properties/contentEncoding",
                          "type": "Control"
                        }
                      ],
                      "rule": {
                        "effect": "ENABLE",
                        "condition": {
                          "scope": "#/properties/schema/properties/type",
                          "schema": {
                            "const": "string"
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  "type": "Group",
                  "label": "Label & Description",
                  "elements": [
                    {
                      "$ref": "labelAndI18n.schema.uischema"
                    }
                  ]
                },
                {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "scope": "#/properties/required",
                      "type": "Control",
                      "rule": {
                        "effect": "SHOW",
                        "condition": {
                          "scope": "#/properties/_isProperty",
                          "schema": {
                            "const": true
                          }
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "Category",
          "label": "Validation",
          "elements": [
            {
              "$ref": "validation.uischema"
            }
          ],
          "rule": {
            "effect": "DISABLE",
            "condition": {
              "scope": "#/properties/schema/properties/type",
              "schema": {
                "enum": ["boolean"]
              }
            }
          }
        },
        {
          "type": "Category",
          "label": "Conditional",
          "elements": [
            {
              "$ref": "conditional.uischema"
            }
          ]
        }
      ]
    },
    ModeSchemaUischema: {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "scope": "#/properties/propertyName",
                  "type": "Control",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#/properties/_isProperty",
                      "schema": {"const": true}
                    }
                  }
                },

                {
                  "type": "Group",
                  "label": "Form Type",
                  "elements": [
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "scope": "#/properties/schema/properties/type",
                          "type": "Control"
                        },
                        {
                          "scope": "#/properties/schema/properties/format",
                          "type": "Control",
                          "rule": {
                            "effect": "ENABLE",
                            "condition": {
                              "scope": "#/properties/schema/properties/type",
                              "schema": {
                                "const": "string"
                              }
                            }
                          }
                        }
                      ]
                    },
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "scope": "#/properties/schema/properties/contentMediaType",
                          "type": "Control"
                        },
                        {
                          "scope": "#/properties/schema/properties/contentEncoding",
                          "type": "Control"
                        }
                      ],
                      "rule": {
                        "effect": "ENABLE",
                        "condition": {
                          "scope": "#/properties/schema/properties/type",
                          "schema": {
                            "const": "string"
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  "type": "Group",
                  "label": "Label & Description",
                  "elements": [
                    {
                      "$ref": "labelAndI18n.schema.uischema"
                    }
                  ]
                },
                {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "scope": "#/properties/required",
                      "type": "Control",
                      "rule": {
                        "effect": "SHOW",
                        "condition": {
                          "scope": "#/properties/_isProperty",
                          "schema": {
                            "const": true
                          }
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "Category",
          "label": "Validation",
          "elements": [
            {
              "$ref": "validation.uischema"
            }
          ],
          "rule": {
            "effect": "DISABLE",
            "condition": {
              "scope": "#/properties/schema/properties/type",
              "schema": {
                "enum": ["boolean"]
              }
            }
          }
        },
        {
          "type": "Category",
          "label": "Conditional",
          "elements": [
            {
              "$ref": "conditional.uischema"
            }
          ]
        }
      ]
    },
    ModeBothUischema: {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "scope": "#/properties/propertyName",
                      "type": "Control"
                    }
                  ],
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#/properties/_isProperty",
                      "schema": {
                        "const": true
                      }
                    }
                  }
                },
                {
                  "type": "Group",
                  "label": "Form Type",
                  "elements": [
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "scope": "#/properties/schema/properties/type",
                          "type": "Control"
                        },
                        {
                          "scope": "#/properties/schema/properties/format",
                          "type": "Control",
                          "rule": {
                            "effect": "ENABLE",
                            "condition": {
                              "scope": "#/properties/schema/properties/type",
                              "schema": {
                                "const": "string"
                              }
                            }
                          }
                        }
                      ]
                    },
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "scope": "#/properties/schema/properties/contentMediaType",
                          "type": "Control"
                        },
                        {
                          "scope": "#/properties/schema/properties/contentEncoding",
                          "type": "Control"
                        }
                      ],
                      "rule": {
                        "effect": "ENABLE",
                        "condition": {
                          "scope": "#/properties/schema/properties/type",
                          "schema": {
                            "const": "string"
                          }
                        }
                      }
                    },
                    {
                      "type": "VerticalLayout",
                      "elements": [
                        {
                          "scope": "#/properties/uiOptions/properties/options/properties/multi",
                          "label": "as Textarea",
                          "type": "Control",
                          "rule": {
                            "effect": "SHOW",
                            "condition": {
                              "type": "AND",
                              "conditions": [
                                {
                                  "scope": "#/properties/schema/properties/type",
                                  "schema": {
                                    "const": "string"
                                  }
                                },
                                {
                                  "scope": "#/properties/format",
                                  "schema": {
                                    "not": {
                                      "type": "string"
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        },
                        {
                          "scope": "#/properties/uiOptions/properties/options/properties/toggle",
                          "label": "as Toggle",
                          "type": "Control",
                          "options": {
                            "toggle": true
                          },
                          "rule": {
                            "effect": "SHOW",
                            "condition": {
                              "scope": "#/properties/schema/properties/type",
                              "schema": {
                                "const": "boolean"
                              }
                            }
                          }
                        }
                      ],
                      "rule": {
                        "effect": "SHOW",
                        "condition": {
                          "type": "AND",
                          "conditions": [
                            {
                              "scope": "#/properties/_isUischema",
                              "schema": {
                                "const": true
                              }
                            }
                          ]
                        }
                      }
                    }
                  ]
                },
                {
                  "type": "Group",
                  "label": "Label & Description",
                  "elements": [
                    {
                      "type": "VerticalLayout",
                      "elements": [
                        {
                          "$ref": "labelAndI18n.both.uischema"
                        }
                      ],
                      "rule": {
                        "effect": "SHOW",
                        "condition": {
                          "scope": "#/properties/_isUischema",
                          "schema": {
                            "const": true
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "scope": "#/properties/uiOptions/properties/options/properties/placeholder",
                      "type": "Control",
                      "rule": {
                        "effect": "SHOW",
                        "condition": {
                          "scope": "#/properties/_isUischema",
                          "schema": {
                            "const": true
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "scope": "#/properties/required",
                      "type": "Control",
                      "rule": {
                        "effect": "SHOW",
                        "condition": {
                          "scope": "#/properties/_isProperty",
                          "schema": {
                            "const": true
                          }
                        }
                      }
                    },
                    {
                      "scope": "#/properties/uiOptions/properties/options/properties/readonly",
                      "type": "Control",
                      "rule": {
                        "effect": "SHOW",
                        "condition": {
                          "scope": "#/properties/_isUischema",
                          "schema": {
                            "const": true
                          }
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "Category",
          "label": "Validation",
          "elements": [
            {
              "$ref": "validation.uischema"
            }
          ],
          "rule": {
            "effect": "DISABLE",
            "condition": {
              "scope": "#/properties/schema/properties/type",
              "schema": {
                "enum": ["boolean"]
              }
            }
          }
        },
        {
          "type": "Category",
          "label": "Conditional",
          "elements": [
            {
              "$ref": "conditional.uischema"
            }
          ]
        },
        {
          "type": "Category",
          "label": "Options & Styles",
          "elements": [
            {
              "$ref": "uiOptions.uischema"
            }
          ]
        },
        {
          "type": "Category",
          "label": "Rule",
          "elements": [
            {
              "$ref": "rule.uischema"
            }
          ]
        }
      ]
    },

  },

  SelectTool: {
    Schema: {
      "type": "object",

      "definitions": {

        "selectAsEnumString": {
          "properties": {
            "enum": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "title": "Items as string"
            }
          },
          "required": ["enum"],
          "title": "Items as string"
        },

        "selectAsOneOf": {
          "properties": {
            "oneOf": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "const": {
                    "type": "string",
                    "title": "Key"
                  },
                  "title": {
                    "type": "string",
                    "title": "Value"
                  }
                }
              },
              "title": "Items as Key-Value Pairs"
            }
          },
          "required": ["oneOf"],
          "title": "Items as Key-Value Pairs"
        }
      },

      "properties": {
        "validation": {
          "$ref":"validation.schema#/properties/validation"
        },
        "conditional": {
          "$ref": "conditional.schema#/properties/conditional"
        },
        "rule": {
          "$ref":"rule.schema#/properties/rule"
        },
        "labelAndI18n": {
          "$ref":"labelAndI18n.schema#/properties/labelAndI18n"
        },
        "uiOptions": {
          "$ref":"uiOptions.schema#/properties/uiOptions"
        },

        "propertyName": {
          "type": "string",
          "pattern": "^[a-z]"
        },
        "required": {
          "type": "boolean"
        },

        "asMultiSelect": {"type": "boolean"},

        "enumOrOneOf": {
          "oneOf": [
            {
              "$ref": "#/definitions/selectAsEnumString"
            },
            {
              "$ref": "#/definitions/selectAsOneOf"
            }
          ]
        },

        "_isUischema": {"type": "boolean" },
        "_isSchemaOnly": {"type":"boolean"},
        "_isProperty": {"type":"boolean"}
      },

      "allOf": [
        {
          "if": {
            "properties": {
              "_isProperty": {
                "const": true
              }
            }
          },
          "then": {
            "required": ["propertyName"]
          }
        }
      ]
    },
    ModeSchemaUischema: {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/propertyName",
                  "rule": {
                    "effect": "HIDE",
                    "condition": {
                      "scope": "#/properties/_isProperty",
                      "schema": {"const": false}
                    }
                  }
                }
              ]
            },

            {
              "type": "Group",
              "label": "Label & Description",
              "elements": [
                {
                  "$ref": "labelAndI18n.schema.uischema"
                }
              ]
            },


            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "scope": "#/properties/required",
                  "type": "Control",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#/properties/_isProperty",
                      "schema": {
                        "const": true
                      }
                    }
                  }
                }
              ]
            }

          ]
        },

        {
          "type": "Category",
          "label": "Select Items",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "scope": "#/properties/asMultiSelect",
                  "type": "Control"
                },
                {
                  "scope": "#/properties/enumOrOneOf",
                  "type": "Control",
                  "label": "Type of Items"
                }
              ]
            }
          ]
        },

        {
          "type": "Category",
          "label": "Conditional",
          "elements": [
            {
              "$ref": "conditional.uischema"
            }
          ]
        }
      ]
    },
    ModeBothUischema: {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "scope": "#/properties/propertyName",
                      "type": "Control",
                      "rule": {
                        "effect": "HIDE",
                        "condition": {
                          "scope": "#/properties/_isProperty",
                          "schema": {
                            "const": false
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  "type": "Group",
                  "label": "Options",
                  "elements": [
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "scope": "#/properties/uiOptions/properties/options/properties/format",
                          "type": "Control"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "Group",
                  "label": "Label & Description",
                  "elements": [
                    {
                      "$ref": "labelAndI18n.both.uischema"
                    }
                  ]
                },

                {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "scope": "#/properties/required",
                      "type": "Control",
                      "rule": {
                        "effect": "SHOW",
                        "condition": {
                          "scope": "#/properties/_isProperty",
                          "schema": {"const": true  }
                        }
                      }
                    },

                    {
                      "scope": "#/properties/uiOptions/properties/options/properties/readonly",
                      "type": "Control"
                    }
                  ]
                }

              ]
            }
          ]
        },


        {
          "type": "Category",
          "label": "Select Items",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "scope": "#/properties/asMultiSelect",
                  "type": "Control"
                },
                {
                  "type": "Group",
                  "label": "Items",
                  "elements": [
                    {
                      "scope": "#/properties/enumOrOneOf",
                      "type": "Control",
                      "label": false
                    }
                  ]
                }

              ]
            }
          ]
        },



        {
          "type": "Category",
          "label": "Options & Styles",
          "elements": [
            {
              "$ref":"uiOptions.uischema"
            }
          ]
        },
        {
          "type": "Category",
          "label": "Rule",
          "elements": [
            {
              "$ref": "rule.uischema"
            }
          ]
        }


      ]
    },
  },

  ScopeTool: {
    Schema: {
      "type": "object",

      "definitions": {
        "scopeString": {
          "type": "string",
          "title": "Manual path",
          "description": "#/properties/NAME"
        }
      },

      "properties": {

        "uischema": {
          "type": "object",
          "properties": {
            "scope": {
              "anyOf": [
                {"$ref": "scopeTool.scopes"},
                {"$ref": "#/definitions/scopeString"}
              ]
            },
            "label": {
              "type": "string"
            }
          }
        },

        "labelAndI18n": {
          "$ref": "labelAndI18n.schema#/properties/labelAndI18n"
        },
        "rule": {
          "$ref": "rule.schema#/properties/rule"
        },
        "uiOptions": {
          "$ref": "uiOptions.schema#/properties/uiOptions"
        },
        "operation": {
          "$ref": "operation.schema#/properties/operation"
        }
      }
    },
    ToolModeUiUischema: {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "Group",
              "label": "Scope",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/uischema/properties/scope",
                  "label": "Scopes"
                }
              ]
            },

            {
              "type": "Group",
              "label": "Label & Description",
              "elements": [
                {"$ref":"labelAndI18n.ui.uischema" }
              ]
            }
          ]
        },

        {
          "type": "Category",
          "label": "Options & Styles",
          "elements": [
            {
              "$ref": "uiOptions.uischema"
            }
          ]
        },
        {
          "type": "Category",
          "label": "Rule",
          "elements": [
            {
              "$ref": "rule.uischema"
            }
          ]
        },

        {
          "type": "Category",
          "elements": [
            {
              "type": "LayoutRef",
              "$ref": "operation.uischema"
            }
          ],
          "rule": {
            "effect": "SHOW",
            "condition": {
              "scope": "#/properties/operation/properties/_isBaseUiTool",
              "schema": {
                "const": true
              }
            }
          }
        }
      ]
    },
    ToolModeSchemaUischema: {},
    ToolModeBothUischema: {}
  },

  RefTool: {
    Schema: {
      "type": "object",

      "definitions": {
        "refString": {
          "type": "string",
          "title": "Reference",
          "description": "#/definitions/NAME"
        }
      },

      "properties": {

        "_reference": {
          "anyOf": [
            {"$ref":"referenceTool.definitions"},
            {"$ref":"#/definitions/refString"}
          ]
        },

        "rule": {
          "$ref":"rule.schema#/properties/rule"
        },
        "labelAndI18n": {
          "$ref":"labelAndI18n.schema#/properties/labelAndI18n"
        },
        "uiOptions": {
          "$ref":"uiOptions.schema#/properties/uiOptions"
        },


        "propertyName": {
          "type": "string",
          "pattern": "^[a-z]"
        },
        "required": {
          "type": "boolean"
        },


        "_isSchemaOnly": {"type":"boolean"},
        "_isProperty": {"type":"boolean"}
      },

      "required": [
        "_reference"
      ],

      "allOf": [
        {
          "if": {
            "properties": {
              "_isProperty": {"const": true}
            }
          },
          "then":{
            "required": ["propertyName"]
          }
        }
      ]
    },
    ToolModeUiUischema: {},
    ToolModeSchemaUischema: {},
    ToolModeBothUischema: {

      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/propertyName",
                  "rule": {
                    "effect": "HIDE",
                    "condition": {
                      "scope": "#/properties/_isProperty",
                      "schema": {"const": false}
                    }
                  }
                }
              ]
            },


            {
              "type": "Group",
              "label": "Reference",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/_reference",
                  "label": "Reference to Definitions"
                }
              ]
            },



            {
              "type": "Group",
              "label": "Label & Description",
              "elements": [
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "$ref": "labelAndI18n.ui.uischema"
                    }
                  ]
                }
              ],
              "rule": {
                "effect": "SHOW",
                "condition": {
                  "scope": "#/properties/_isUischema",
                  "schema": {"const": true}
                }
              }
            },

            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "scope": "#/properties/required",
                  "type": "Control"
                }
              ]
            }
          ]
        },


        {
          "type": "Category",
          "label": "Options & Styles",
          "elements": [
            {
              "$ref":"uiOptions.uischema"
            }
          ]
        },


        {
          "type": "Category",
          "label": "Rule",
          "elements": [
            {
              "$ref":"rule.uischema"
            }
          ]
        }

      ]
    }
  },

  ObjectTool: {
    Schema: {
      "type": "object",
      "definitions": {
        "additionalPropertiesFalse": {
          "type": "boolean",
          "title": "by boolean"
        },
        "additionalPropertiesSingleType": {
          "type": "object",
          "title": "by type",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "string",
                "number",
                "integer",
                "boolean",
                "array"
              ]
            }
          },
          "required": [
            "type"
          ]
        }
      },

      "properties": {
        "propertyName": {
          "type": "string"
        },
        "required": {
          "type": "boolean"
        },

        "schema": {
          "type": "object",
          "properties": {
            "type": {"type": "string"},

            "additionalProperties": {
              "anyOf": [
                {"$ref": "#/definitions/additionalPropertiesFalse"},
                { "$ref": "#/definitions/additionalPropertiesSingleType" }
              ]
            }
          }
        },

        "rule": {
          "$ref": "rule.schema#/properties/rule"
        },
        "labelAndI18n": {
          "$ref":"labelAndI18n.schema#/properties/labelAndI18n"
        },
        "uiOptions": {
          "$ref": "uiOptions.schema#/properties/uiOptions"
        },
        "validation": {
          "$ref": "validation.schema#/properties/validation"
        },
        "conditional": {
          "$ref": "conditional.schema#/properties/conditional"
        },
        "definitions": {
          "$ref": "definitions.schema#/properties/definitions"
        },

        "_isUischema": { "type": "boolean" },
        "_isProperty": {"type":"boolean"}
      },


      "allOf": [
        {
          "if": {
            "properties": {
              "_isProperty": {"const": true}
            }
          },
          "then":{
            "properties": {
              "propertyName": {
                "pattern": "^[a-z]"
              }
            },
            "required": ["propertyName"]
          }
        }
      ]

    },
    ToolModeUiUischema: {},
    ToolModeSchemaUischema: {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "scope": "#/properties/propertyName",
                  "type": "Control",
                  "rule": {
                    "effect": "HIDE",
                    "condition": {
                      "scope": "#/properties/_isProperty",
                      "schema": { "const": false}
                    }
                  }
                }
              ]
            },


            {
              "type": "Group",
              "label": "Additional Properties",
              "elements": [
                {
                  "scope": "#/properties/schema/properties/additionalProperties",
                  "type": "Formbuilder",
                  "options": {
                    "schemaOnly": true,
                    "baseTool": "schema",
                    "baseToolProps": {
                      "prefixLabel": "Additional Properties"
                    }
                  }
                }
              ],
              "options": {
                "collapsible": true
              }
            }
          ]
        },

        {
          "type": "Category",
          "label": "Definitions",
          "elements": [
            { "$ref": "definitions.uischema" }
          ]
        },
        {
          "type": "Category",
          "label": "Validation",
          "elements": [
            { "$ref": "validation.uischema" }
          ]
        },
        {
          "type": "Category",
          "label": "Conditional",
          "elements": [
            {"$ref": "conditional.uischema" }
          ]
        }
      ]
    },
    ToolModeBothUischema: {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "scope": "#/properties/propertyName",
                  "type": "Control",
                  "rule": {
                    "effect": "HIDE",
                    "condition": {
                      "scope": "#/properties/_isProperty",
                      "schema": { "const": false}
                    }
                  }
                }
              ]
            },

            {
              "type": "Group",
              "label": "Label & Description",
              "elements": [
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "$ref": "labelAndI18n.ui.uischema"
                    }
                  ]
                }
              ],
              "options": {
                "collapsible": true
              }
            },

            {
              "type": "Group",
              "label": "Additional Properties",
              "elements": [
                {
                  "scope": "#/properties/schema/properties/additionalProperties",
                  "type": "Formbuilder",
                  "options": {
                    "schemaOnly": true,
                    "baseTool": "schema",
                    "baseToolProps": {
                      "prefixLabel": "Additional Properties"
                    }
                  }
                }
              ],
              "options": {
                "collapsible": true
              }
            }
          ]
        },

        {
          "type": "Category",
          "label": "Definitions",
          "elements": [
            { "$ref": "definitions.uischema" }
          ]
        },
        {
          "type": "Category",
          "label": "Validation",
          "elements": [
            { "$ref": "validation.uischema" }
          ]
        },
        {
          "type": "Category",
          "label": "Conditional",
          "elements": [
            {"$ref": "conditional.uischema" }
          ]
        },

        {
          "type": "Category",
          "label": "Option & Styles",
          "elements": [
            {"$ref": "uiOptions.uischema" }
          ]
        },
        {
          "type": "Category",
          "label": "Rule",
          "elements": [
            { "$ref": "rule.uischema"  }
          ]
        }
      ]
    }
  },

  ConstTool: {
    Schema: {
      "type": "object",

      "properties": {
        "const": {
          "$ref": "const.schema#/properties/const"
        },
        "validation": {
          "$ref":"validation.schema#/properties/validation"
        },
        "conditional": {
          "$ref": "conditional.schema#/properties/conditional"
        },
        "rule": {
          "$ref":"rule.schema#/properties/rule"
        },
        "labelAndI18n": {
          "$ref":"labelAndI18n.schema#/properties/labelAndI18n"
        },
        "uiOptions": {
          "$ref":"uiOptions.schema#/properties/uiOptions"
        },

        "propertyName": {
          "type": "string",
          "pattern": "^[a-z]"
        },
        "required": {
          "type": "boolean"
        },


        "_isSchemaOnly": {"type":"boolean"},
        "_isProperty": {"type":"boolean"}
      },

      "required": [
        "const"
      ],

      "allOf": [
        {
          "if": {
            "properties": {
              "_isProperty": {"const": true}
            }
          },
          "then":{
            "required": ["propertyName"]
          }
        }
      ]
    },
    ToolModeUiUischema: {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "Group",
                  "label": "Label & Description",
                  "elements": [
                    {
                      "$ref": "labelAndI18n.ui.uischema"
                    }
                  ]
                }
              ]
            }
          ]
        },

        {
          "type": "Category",
          "label": "Options & Styles",
          "elements": [
            {
              "$ref":"uiOptions.uischema"
            }
          ]
        },

        {
          "type": "Category",
          "label": "Rule",
          "elements": [
            {
              "$ref": "rule.uischema"
            }
          ]
        }
      ]
    },
    ToolModeSchemaUischema: {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/propertyName",
                  "rule": {
                    "effect": "HIDE",
                    "condition": {
                      "scope": "#/properties/_isProperty",
                      "schema": {"const": false}
                    }
                  }
                },

                {
                  "type": "Group",
                  "label": "Const Value",
                  "elements": [
                    {
                      "type": "LayoutRef",
                      "$ref": "const.uischema"
                    }
                  ]
                }
              ]
            },

            {
              "type": "Group",
              "label": "Label & Description",
              "elements": [
                {
                  "$ref": "labelAndI18n.schema.uischema"
                }
              ]
            },


            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "scope": "#/properties/required",
                  "type": "Control",
                  "rule": {
                    "----$ref": "rule.isProperty",
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#/properties/_isProperty",
                      "schema": {
                        "const": true
                      }
                    }
                  }
                }
              ]
            }

          ]
        },


        {
          "type": "Category",
          "label": "Conditional",
          "elements": [
            {
              "$ref": "conditional.uischema"
            }
          ]
        }
      ]
    },
    ToolModeBothUischema: {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/propertyName",
                  "rule": {
                    "effect": "HIDE",
                    "condition": {
                      "scope": "#/properties/_isProperty",
                      "schema": {"const": false}
                    }
                  }
                },
                {
                  "type": "Group",
                  "label": "Label & Description",
                  "elements": [
                    {
                      "type": "VerticalLayout",
                      "elements": [
                        {
                          "$ref": "labelAndI18n.both.uischema"
                        }
                      ]
                    }
                  ]
                }
              ]
            },

            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "scope": "#/properties/required",
                  "type": "Control"
                }
              ]
            }
          ]
        },
        {
          "type": "Category",
          "label": "Const",
          "elements": [
            {
              "type": "LayoutRef",
              "$ref": "const.uischema"
            }
          ]
        },
        {
          "type": "Category",
          "label": "Options & Styles",
          "elements": [
            {
              "type": "LayoutRef",
              "$ref":"uiOptions.uischema"
            }
          ]
        },
        {
          "type": "Category",
          "label": "Rule",
          "elements": [
            {
              "type": "LayoutRef",
              "$ref": "rule.uischema"
            }
          ]
        }
      ]
    }
  },

  ArrayTool: {
    Schema: {
      "type": "object",

      "properties": {

        "propertyName": {
          "type": "string"
        },
        "required": {
          "type": "boolean"
        },

        "rule": {
          "$ref": "rule.schema#/properties/rule"
        },
        "labelAndI18n": {
          "$ref":"labelAndI18n.schema#/properties/labelAndI18n"
        },
        "uiOptions": {
          "$ref": "uiOptions.schema#/properties/uiOptions"
        },
        "validation": {
          "$ref": "validation.schema#/properties/validation"
        },
        "conditional": {
          "$ref": "conditional.schema#/properties/conditional"
        },

        "_readOnlySchema": {
          "type": "object"
        },

        "_isUischema": { "type": "boolean" },
        "_isProperty": {"type":"boolean"}
      },

      "allOf": [
        {
          "if": {
            "properties": {
              "_isProperty": {"const": true}
            }
          },
          "then":{
            "properties": {
              "propertyName": {
                "pattern": "^[a-z]"
              }
            },
            "required": ["propertyName"]
          }
        }
      ]
    },
    ToolModeUiUischema: {

      "type": "Categorization",
      "elements": [

        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [

                {
                  "type": "Group",
                  "label": "Label & Description",
                  "elements": [
                    {"$ref":"labelAndI18n.ui.uischema" }
                  ]
                },

                {
                  "scope": "#/properties/uiOptions/properties/options/properties/elementLabelProp",
                  "type": "Control"
                }
              ]
            }
          ]
        },


        {
          "type": "Category",
          "label": "Detail",
          "elements": [
            {
              "scope": "#/properties/uiOptions/properties/detail",
              "type": "Formbuilder",
              "options": {
                "schemaReadOnly": true,
                "schemaScope": "#/properties/_readOnlySchema"
              }
            }
          ]
        },

        {
          "type": "Category",
          "label": "Option & Styles",
          "elements": [
            {"$ref": "uiOptions.uischema" }
          ]
        },
        {
          "type": "Category",
          "label": "Rule",
          "elements": [
            { "$ref": "rule.uischema"  }
          ]
        }
      ]
    },
    ToolModeSchemaUischema: {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/propertyName",
                  "rule": {
                    "effect": "HIDE",
                    "condition": {
                      "scope": "#/properties/_isProperty",
                      "schema": {
                        "const": false
                      }
                    }
                  }
                }
              ]
            },

            {
              "type": "Group",
              "label": "Label & Description",
              "elements": [
                {"$ref":"labelAndI18n.schema.uischema" }
              ]
            },

            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "scope": "#/properties/required",
                  "type": "Control"
                }
              ]
            }
          ]
        },

        {
          "type": "Category",
          "label": "Validation",
          "elements": [
            {
              "$ref": "validation.uischema"
            }
          ]
        },
        {
          "type": "Category",
          "label": "Conditional",
          "elements": [
            {"$ref": "conditional.uischema" }
          ]
        }

      ]
    },
    ToolModeBothUischema: {

      "type": "Categorization",
      "elements": [


        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "scope": "#/properties/propertyName",
                  "type": "Control",
                  "rule": {
                    "effect": "HIDE",
                    "condition": {
                      "scope": "#/properties/_isProperty",
                      "schema": { "const": false}
                    }
                  }
                },

                {
                  "type": "Group",
                  "label": "Label & Description",
                  "elements": [
                    {"$ref":"labelAndI18n.both.uischema" }
                  ]
                },

                {
                  "scope": "#/properties/uiOptions/properties/options/properties/elementLabelProp",
                  "type": "Control"
                },

                {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "scope": "#/properties/required",
                      "type": "Control"
                    }
                  ]
                }
              ]
            }
          ]
        },


        {
          "type": "Category",
          "label": "Detail",
          "elements": [
            {
              "scope": "#/properties/uiOptions/properties/detail",
              "type": "Formbuilder",
              "options": {
                "schemaReadOnly": true,
                "schemaScope": "#/properties/_readOnlySchema"
              }
            }
          ]
        },


        {
          "type": "Category",
          "label": "Validation",
          "elements": [
            { "$ref": "validation.uischema" }
          ]
        },
        {
          "type": "Category",
          "label": "Conditional",
          "elements": [
            {"$ref": "conditional.uischema" }
          ]
        },
        {
          "type": "Category",
          "label": "Option & Styles",
          "elements": [
            {"$ref": "uiOptions.uischema" }
          ]
        },
        {
          "type": "Category",
          "label": "Rule",
          "elements": [
            { "$ref": "rule.uischema"  }
          ]
        }
      ]
    }
  }

}
