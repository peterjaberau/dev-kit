export const data: any = [
  {
    "name": "additional-errors",
    "label": "Additional errors",
    "data": {
      "name": "John Doe",
      "vegetarian": false,
      "birthDate": "1985-06-02",
      "personalData": {
        "age": 34
      },
      "postalCode": "12345"
    },
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your name"
        },
        "vegetarian": {
          "type": "boolean"
        },
        "birthDate": {
          "type": "string",
          "format": "date"
        },
        "nationality": {
          "type": "string",
          "enum": [
            "DE",
            "IT",
            "JP",
            "US",
            "RU",
            "Other"
          ]
        },
        "personalData": {
          "type": "object",
          "properties": {
            "age": {
              "type": "integer",
              "description": "Please enter your age."
            },
            "height": {
              "type": "number"
            },
            "drivingSkill": {
              "type": "number",
              "maximum": 10,
              "minimum": 1,
              "default": 7
            }
          },
          "required": [
            "age",
            "height"
          ]
        },
        "occupation": {
          "type": "string"
        },
        "postalCode": {
          "type": "string",
          "maxLength": 5
        }
      },
      "required": [
        "occupation",
        "nationality"
      ]
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/name"
            },
            {
              "type": "Control",
              "scope": "#/properties/personalData/properties/age"
            },
            {
              "type": "Control",
              "scope": "#/properties/birthDate"
            }
          ]
        },
        {
          "type": "Label",
          "text": "Additional Information"
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/personalData/properties/height"
            },
            {
              "type": "Control",
              "scope": "#/properties/nationality"
            },
            {
              "type": "Control",
              "scope": "#/properties/occupation",
              "suggestion": [
                "Accountant",
                "Engineer",
                "Freelancer",
                "Journalism",
                "Physician",
                "Student",
                "Teacher",
                "Other"
              ]
            }
          ]
        }
      ]
    },
    "actions": [
      {
        "label": "Add additional error"
      }
    ]
  },
  {
    "name": "allOf",
    "label": "allOf",
    "data": {
      "billing_address": {
        "street_address": "1600 Pennsylvania Avenue NW",
        "city": "Washington",
        "state": "DC"
      }
    },
    "schema": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "definitions": {
        "address": {
          "type": "object",
          "properties": {
            "street_address": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "state": {
              "type": "string"
            }
          },
          "required": [
            "street_address",
            "city",
            "state"
          ]
        }
      },
      "type": "object",
      "properties": {
        "billing_address": {
          "$ref": "#/definitions/address"
        },
        "shipping_address": {
          "allOf": [
            {
              "$ref": "#/definitions/address"
            },
            {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": [
                    "residential",
                    "business"
                  ]
                }
              },
              "required": [
                "type"
              ]
            }
          ]
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "label": "Billing address",
          "type": "Control",
          "scope": "#/properties/billing_address"
        },
        {
          "type": "Control",
          "scope": "#/properties/shipping_address"
        }
      ]
    }
  },
  {
    "name": "anyOf",
    "label": "anyOf",
    "data": {
      "addressOrUser": {
        "street_address": "1600 Pennsylvania Avenue NW",
        "city": "Washington",
        "state": "DC"
      }
    },
    "schema": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "definitions": {
        "address": {
          "type": "object",
          "properties": {
            "street_address": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "state": {
              "type": "string"
            }
          },
          "required": [
            "street_address",
            "city",
            "state"
          ]
        },
        "user": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "mail": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "mail"
          ]
        },
        "users": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/user"
          }
        },
        "addresses": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/address"
          }
        }
      },
      "type": "object",
      "properties": {
        "addressOrUser": {
          "anyOf": [
            {
              "$ref": "#/definitions/address"
            },
            {
              "$ref": "#/definitions/user"
            }
          ]
        },
        "addressesOrUsers": {
          "anyOf": [
            {
              "$ref": "#/definitions/addresses"
            },
            {
              "$ref": "#/definitions/users"
            }
          ]
        },
        "addressesOrUsersAnyOfItems": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "#/definitions/addresses"
              },
              {
                "$ref": "#/definitions/users"
              }
            ]
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/addressOrUser"
        },
        {
          "type": "Control",
          "scope": "#/properties/addressesOrUsers",
          "label": "Addresses or Users (AnyOf Schema)"
        },
        {
          "type": "Control",
          "scope": "#/properties/addressesOrUsersAnyOfItems",
          "label": "Addresses or Users (AnyOf Array Items)"
        }
      ]
    }
  },
  {
    "name": "anyOf-oneOf-allOf-resolve",
    "label": "AnyOf OneOf AllOf Resolve",
    "data": {},
    "schema": {
      "$defs": {
        "Base": {
          "type": "object",
          "properties": {
            "width": {
              "type": "integer"
            }
          }
        },
        "Child": {
          "type": "object",
          "allOf": [
            {
              "$ref": "#/$defs/Base"
            },
            {
              "properties": {
                "geometry": {
                  "type": "string"
                }
              }
            }
          ]
        }
      },
      "type": "object",
      "properties": {
        "element": {
          "$ref": "#/$defs/Child"
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Label",
          "text": "AllOfRenderer"
        },
        {
          "type": "Control",
          "scope": "#/properties/element"
        },
        {
          "type": "Label",
          "text": "Manual controls"
        },
        {
          "type": "Control",
          "scope": "#/properties/element/properties/width"
        },
        {
          "type": "Control",
          "scope": "#/properties/element/properties/geometry"
        }
      ]
    }
  },
  {
    "name": "anyOf_simple",
    "label": "AnyOf Simple",
    "data": {
      "foo": "foo"
    },
    "schema": {
      "type": "object",
      "properties": {
        "foo": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "enum": [
                "foo",
                "bar"
              ]
            }
          ]
        }
      }
    }
  },
  {
    "name": "array",
    "label": "Array",
    "data": {
      "comments": [
        {
          "date": "2001-09-10",
          "message": "This is an example message"
        },
        {
          "date": "2025-10-23",
          "message": "Get ready for booohay",
          "oneOfEnum": "test"
        }
      ]
    },
    "schema": {
      "type": "object",
      "properties": {
        "comments": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "date": {
                "type": "string",
                "format": "date"
              },
              "message": {
                "type": "string",
                "maxLength": 5
              },
              "enum": {
                "type": "string",
                "const": "foo"
              },
              "oneOfEnum": {
                "type": "string",
                "oneOf": [
                  {
                    "const": "foo"
                  },
                  {
                    "const": "bar"
                  }
                ]
              }
            }
          }
        },
        "foo": {
          "type": "string"
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/foo"
        },
        {
          "type": "Control",
          "scope": "#/properties/comments",
          "options": {
            "showSortButtons": false
          }
        }
      ]
    },
    "config": {
      "withSort": {
        "type": "VerticalLayout",
        "elements": [
          {
            "type": "Control",
            "scope": "#/properties/foo"
          },
          {
            "type": "Control",
            "scope": "#/properties/comments",
            "options": {
              "showSortButtons": false
            }
          }
        ]
      }
    },
    "actions": [
      {
        "label": "Enable Sorting"
      },
      {
        "label": "Disable Sorting"
      }
    ]
  },
  {
    "name": "array-i18n",
    "label": "Array (i18n)",
    "data": {
      "comments": [
        {
          "date": "2001-09-10",
          "message": "This is an example message"
        },
        {
          "date": "2025-10-23",
          "message": "Get ready for booohay"
        }
      ]
    },
    "schema": {
      "type": "object",
      "properties": {
        "comments": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "date": {
                "type": "string",
                "format": "date"
              },
              "message": {
                "type": "string",
                "maxLength": 5
              },
              "enum": {
                "type": "string",
                "const": "foo"
              }
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
          "scope": "#/properties/comments",
          "options": {
            "showSortButtons": true
          }
        }
      ]
    },
    "i18n": {
      "locale": "en"
    }
  },
  {
    "name": "enumInArray",
    "label": "Array containing enums",
    "data": [],
    "schema": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "plainEnum": {
            "type": "string",
            "enum": [
              "foo",
              "bar"
            ]
          },
          "oneOfEnum": {
            "type": "string",
            "oneOf": [
              {
                "const": "foo",
                "title": "Foo"
              },
              {
                "const": "bar",
                "title": "Bar"
              },
              {
                "const": "foobar",
                "title": "FooBar"
              }
            ]
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#"
        }
      ]
    }
  },
  {
    "name": "stringArray",
    "label": "Array of Strings",
    "data": {
      "comments": [
        "one string",
        "two strings"
      ]
    },
    "schema": {
      "type": "object",
      "properties": {
        "comments": {
          "description": "Description for array of String Type",
          "type": "array",
          "items": {
            "type": "string",
            "maxLength": 5
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/comments"
        }
      ]
    }
  },
  {
    "name": "array-with-custom-element-label",
    "label": "Array with custom element label",
    "data": {
      "comments": [
        {
          "message1": "This is an example message",
          "message2": "This is an example message 2"
        },
        {
          "message1": "Get ready for booohay 1",
          "message2": "Get ready for booohay 2"
        }
      ]
    },
    "schema": {
      "type": "object",
      "properties": {
        "comments": {
          "type": "array",
          "title": "Messages",
          "items": {
            "type": "object",
            "properties": {
              "message1": {
                "type": "string"
              },
              "message2": {
                "type": "string"
              }
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
          "scope": "#/properties/comments",
          "options": {
            "elementLabelProp": "message2",
            "detail": {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/message1"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/message2"
                }
              ]
            }
          }
        }
      ]
    }
  },
  {
    "name": "array-with-defaults",
    "label": "Array with defaults",
    "data": {},
    "schema": {
      "definitions": {
        "itemsType": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "default": "foo1"
            },
            "name_noDefault": {
              "type": "string"
            },
            "description": {
              "type": "string",
              "default": "bar"
            },
            "done": {
              "type": "boolean",
              "default": false
            },
            "rating": {
              "type": "integer",
              "default": 5
            },
            "cost": {
              "type": "number",
              "default": 5.5
            },
            "date": {
              "type": "string",
              "format": "date",
              "default": "2025-10-23"
            }
          }
        },
        "stringDef": {
          "type": "string",
          "default": "excellent"
        },
        "numberDef": {
          "type": "number",
          "default": 10
        },
        "intDef": {
          "type": "integer",
          "default": 11
        },
        "boolDef": {
          "type": "boolean",
          "default": true
        },
        "arrayDef": {
          "type": "array",
          "default": [
            "a",
            "b",
            "c"
          ]
        }
      },
      "type": "object",
      "properties": {
        "objectArray": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/itemsType"
          }
        },
        "stringArray": {
          "type": "array",
          "items": {
            "type": "string",
            "default": "123"
          }
        },
        "objectArrayWithPropertyRefs": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "string1": {
                "$ref": "#/definitions/stringDef"
              },
              "string2": {
                "type": "string"
              },
              "number": {
                "$ref": "#/definitions/numberDef"
              },
              "int": {
                "$ref": "#/definitions/intDef"
              },
              "bool": {
                "$ref": "#/definitions/boolDef"
              },
              "array": {
                "$ref": "#/definitions/arrayDef"
              }
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
          "scope": "#/properties/objectArray"
        },
        {
          "type": "Control",
          "scope": "#/properties/stringArray"
        },
        {
          "type": "Control",
          "scope": "#/properties/objectArrayWithPropertyRefs"
        }
      ]
    }
  },
  {
    "name": "array-with-detail",
    "label": "Array with detail",
    "data": {
      "comments": [
        {
          "date": "2001-09-10",
          "message": "This is an example message"
        },
        {
          "date": "2025-10-23",
          "message": "Get ready for booohay"
        }
      ]
    },
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your name"
        },
        "vegetarian": {
          "type": "boolean"
        },
        "birthDate": {
          "type": "string",
          "format": "date",
          "description": "Please enter your birth date."
        },
        "nationality": {
          "type": "string",
          "enum": [
            "DE",
            "IT",
            "JP",
            "US",
            "RU",
            "Other"
          ]
        },
        "occupation": {
          "type": "string"
        },
        "comments": {
          "type": "array",
          "description": "Description for array with details",
          "minItems": 2,
          "maxItems": 8,
          "items": {
            "type": "object",
            "properties": {
              "date": {
                "type": "string",
                "format": "date"
              },
              "message": {
                "type": "string",
                "maxLength": 5
              }
            }
          }
        }
      },
      "required": [
        "occupation",
        "nationality"
      ]
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/comments",
          "options": {
            "showSortButtons": true,
            "restrict": true,
            "detail": {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/message"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/date"
                }
              ]
            }
          }
        }
      ]
    }
  },
  {
    "name": "array-with-detail-and-rule",
    "label": "Array with detail and rule",
    "data": {
      "occupation": "developer",
      "comments": [
        {
          "date": "2001-09-10",
          "message": "This is an example message"
        },
        {
          "date": "2025-10-23",
          "message": "Get ready for booohay"
        }
      ]
    },
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your name"
        },
        "vegetarian": {
          "type": "boolean"
        },
        "birthDate": {
          "type": "string",
          "format": "date",
          "description": "Please enter your birth date."
        },
        "nationality": {
          "type": "string",
          "enum": [
            "DE",
            "IT",
            "JP",
            "US",
            "RU",
            "Other"
          ]
        },
        "occupation": {
          "type": "string"
        },
        "enableArray": {
          "type": "boolean"
        },
        "comments": {
          "type": "array",
          "title": "Messages",
          "items": {
            "type": "object",
            "properties": {
              "date": {
                "type": "string",
                "format": "date"
              },
              "message": {
                "type": "string",
                "maxLength": 5
              }
            }
          }
        }
      },
      "required": [
        "occupation",
        "nationality"
      ]
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/occupation"
        },
        {
          "type": "Control",
          "scope": "#/properties/enableArray"
        },
        {
          "type": "Control",
          "scope": "#/properties/comments",
          "rule": {
            "effect": "SHOW",
            "condition": {
              "type": "OR",
              "conditions": [
                {
                  "schema": {
                    "const": "developer"
                  },
                  "scope": "#/properties/occupation"
                },
                {
                  "schema": {
                    "const": true
                  },
                  "scope": "/properties/enableArray"
                }
              ]
            }
          },
          "options": {
            "detail": {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/message"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/date"
                }
              ]
            }
          }
        }
      ]
    }
  },
  {
    "name": "array-with-sorting",
    "label": "Array with sorting",
    "data": {
      "comments": [
        {
          "date": "2001-09-10",
          "message": "This is an example message With sorting"
        },
        {
          "date": "2025-10-23",
          "message": "Get ready for booohay"
        }
      ]
    },
    "schema": {
      "type": "object",
      "properties": {
        "comments": {
          "type": "array",
          "minItems": 2,
          "maxItems": 8,
          "items": {
            "type": "object",
            "properties": {
              "date": {
                "type": "string",
                "format": "date"
              },
              "message": {
                "type": "string",
                "maxLength": 5
              },
              "enum": {
                "type": "string",
                "const": "foo"
              }
            }
          }
        },
        "foo": {
          "type": "string"
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/foo"
        },
        {
          "type": "Control",
          "scope": "#/properties/comments",
          "options": {
            "showSortButtons": true,
            "restrict": true
          }
        }
      ]
    },
    "config": {
      "withSort": {
        "type": "VerticalLayout",
        "elements": [
          {
            "type": "Control",
            "scope": "#/properties/foo"
          },
          {
            "type": "Control",
            "scope": "#/properties/comments",
            "options": {
              "showSortButtons": true,
              "restrict": true
            }
          }
        ]
      }
    },
    "actions": [
      {
        "label": "Enable Sorting"
      },
      {
        "label": "Disable Sorting"
      }
    ]
  },
  {
    "name": "categorization",
    "label": "Categorization",
    "data": {
      "provideAddress": true,
      "vegetarian": false
    },
    "schema": {
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your first name"
        },
        "secondName": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your second name"
        },
        "vegetarian": {
          "type": "boolean"
        },
        "birthDate": {
          "type": "string",
          "format": "date",
          "description": "Please enter your birth date."
        },
        "nationality": {
          "type": "string",
          "enum": [
            "DE",
            "IT",
            "JP",
            "US",
            "RU",
            "Other"
          ]
        },
        "provideAddress": {
          "type": "boolean"
        },
        "address": {
          "type": "object",
          "properties": {
            "street": {
              "type": "string"
            },
            "streetNumber": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "postalCode": {
              "type": "string",
              "maxLength": 5
            }
          }
        },
        "vegetarianOptions": {
          "type": "object",
          "properties": {
            "vegan": {
              "type": "boolean"
            },
            "favoriteVegetable": {
              "type": "string",
              "enum": [
                "Tomato",
                "Potato",
                "Salad",
                "Aubergine",
                "Cucumber",
                "Other"
              ]
            },
            "otherFavoriteVegetable": {
              "type": "string"
            }
          }
        }
      }
    },
    "uischema": {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "categoryLabelKey",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/firstName"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/secondName"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/birthDate"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/nationality"
                }
              ]
            },
            {
              "type": "Control",
              "scope": "#/properties/provideAddress"
            },
            {
              "type": "Control",
              "scope": "#/properties/vegetarian"
            }
          ]
        },
        {
          "type": "Category",
          "i18n": "address",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/street"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/streetNumber"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/city"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/postalCode"
                }
              ]
            }
          ],
          "rule": {
            "effect": "SHOW",
            "condition": {
              "scope": "#/properties/provideAddress",
              "schema": {
                "const": true
              }
            }
          }
        },
        {
          "type": "Category",
          "label": "Additional",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/vegetarianOptions/properties/vegan"
            },
            {
              "type": "Control",
              "scope": "#/properties/vegetarianOptions/properties/favoriteVegetable"
            },
            {
              "type": "Control",
              "scope": "#/properties/vegetarianOptions/properties/otherFavoriteVegetable",
              "rule": {
                "effect": "SHOW",
                "condition": {
                  "scope": "#/properties/vegetarianOptions/properties/favoriteVegetable",
                  "schema": {
                    "const": "Other"
                  }
                }
              }
            }
          ],
          "rule": {
            "effect": "SHOW",
            "condition": {
              "scope": "#/properties/vegetarian",
              "schema": {
                "const": true
              }
            }
          }
        }
      ]
    },
    "i18n": {
      "locale": "en"
    }
  },
  {
    "name": "categorization-stepper-nav-buttons",
    "label": "Categorization (Stepper - Nav Buttons)",
    "data": {
      "provideAddress": true,
      "vegetarian": false
    },
    "schema": {
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your first name"
        },
        "secondName": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your second name"
        },
        "vegetarian": {
          "type": "boolean"
        },
        "birthDate": {
          "type": "string",
          "format": "date",
          "description": "Please enter your birth date."
        },
        "nationality": {
          "type": "string",
          "enum": [
            "DE",
            "IT",
            "JP",
            "US",
            "RU",
            "Other"
          ]
        },
        "provideAddress": {
          "type": "boolean"
        },
        "address": {
          "type": "object",
          "properties": {
            "street": {
              "type": "string"
            },
            "streetNumber": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "postalCode": {
              "type": "string",
              "maxLength": 5
            }
          }
        },
        "vegetarianOptions": {
          "type": "object",
          "properties": {
            "vegan": {
              "type": "boolean"
            },
            "favoriteVegetable": {
              "type": "string",
              "enum": [
                "Tomato",
                "Potato",
                "Salad",
                "Aubergine",
                "Cucumber",
                "Other"
              ]
            },
            "otherFavoriteVegetable": {
              "type": "string"
            }
          }
        }
      }
    },
    "uischema": {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "categoryLabelKey",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/firstName"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/secondName"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/birthDate"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/nationality"
                }
              ]
            },
            {
              "type": "Control",
              "scope": "#/properties/provideAddress"
            },
            {
              "type": "Control",
              "scope": "#/properties/vegetarian"
            }
          ]
        },
        {
          "type": "Category",
          "i18n": "address",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/street"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/streetNumber"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/city"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/postalCode"
                }
              ]
            }
          ],
          "rule": {
            "effect": "SHOW",
            "condition": {
              "scope": "#/properties/provideAddress",
              "schema": {
                "const": true
              }
            }
          }
        },
        {
          "type": "Category",
          "label": "Additional",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/vegetarianOptions/properties/vegan"
            },
            {
              "type": "Control",
              "scope": "#/properties/vegetarianOptions/properties/favoriteVegetable"
            },
            {
              "type": "Control",
              "scope": "#/properties/vegetarianOptions/properties/otherFavoriteVegetable",
              "rule": {
                "effect": "SHOW",
                "condition": {
                  "scope": "#/properties/vegetarianOptions/properties/favoriteVegetable",
                  "schema": {
                    "const": "Other"
                  }
                }
              }
            }
          ],
          "rule": {
            "effect": "SHOW",
            "condition": {
              "scope": "#/properties/vegetarian",
              "schema": {
                "const": true
              }
            }
          }
        }
      ],
      "options": {
        "variant": "stepper",
        "showNavButtons": true
      }
    }
  },
  {
    "name": "categorizationstepper",
    "label": "Categorization (Stepper)",
    "data": {
      "provideAddress": true,
      "vegetarian": false
    },
    "schema": {
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your first name"
        },
        "secondName": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your second name"
        },
        "vegetarian": {
          "type": "boolean"
        },
        "birthDate": {
          "type": "string",
          "format": "date",
          "description": "Please enter your birth date."
        },
        "nationality": {
          "type": "string",
          "enum": [
            "DE",
            "IT",
            "JP",
            "US",
            "RU",
            "Other"
          ]
        },
        "provideAddress": {
          "type": "boolean"
        },
        "address": {
          "type": "object",
          "properties": {
            "street": {
              "type": "string"
            },
            "streetNumber": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "postalCode": {
              "type": "string",
              "maxLength": 5
            }
          }
        },
        "vegetarianOptions": {
          "type": "object",
          "properties": {
            "vegan": {
              "type": "boolean"
            },
            "favoriteVegetable": {
              "type": "string",
              "enum": [
                "Tomato",
                "Potato",
                "Salad",
                "Aubergine",
                "Cucumber",
                "Other"
              ]
            },
            "otherFavoriteVegetable": {
              "type": "string"
            }
          }
        }
      }
    },
    "uischema": {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "categoryLabelKey",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/firstName"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/secondName"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/birthDate"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/nationality"
                }
              ]
            },
            {
              "type": "Control",
              "scope": "#/properties/provideAddress"
            },
            {
              "type": "Control",
              "scope": "#/properties/vegetarian"
            }
          ]
        },
        {
          "type": "Category",
          "i18n": "address",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/street"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/streetNumber"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/city"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/postalCode"
                }
              ]
            }
          ],
          "rule": {
            "effect": "SHOW",
            "condition": {
              "scope": "#/properties/provideAddress",
              "schema": {
                "const": true
              }
            }
          }
        },
        {
          "type": "Category",
          "label": "Additional",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/vegetarianOptions/properties/vegan"
            },
            {
              "type": "Control",
              "scope": "#/properties/vegetarianOptions/properties/favoriteVegetable"
            },
            {
              "type": "Control",
              "scope": "#/properties/vegetarianOptions/properties/otherFavoriteVegetable",
              "rule": {
                "effect": "SHOW",
                "condition": {
                  "scope": "#/properties/vegetarianOptions/properties/favoriteVegetable",
                  "schema": {
                    "const": "Other"
                  }
                }
              }
            }
          ],
          "rule": {
            "effect": "SHOW",
            "condition": {
              "scope": "#/properties/vegetarian",
              "schema": {
                "const": true
              }
            }
          }
        }
      ],
      "options": {
        "variant": "stepper"
      }
    }
  },
  {
    "name": "categorization_1713",
    "label": "Categorization - Issue 1713",
    "data": {
      "provideAddress": true,
      "vegetarian": false
    },
    "schema": {
      "type": "object",
      "properties": {
        "experiments": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "ID": {
                "type": "string"
              }
            },
            "additionalProperties": false,
            "additionalItems": false
          }
        }
      },
      "required": [
        "experiments"
      ]
    },
    "uischema": {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Experiments",
          "elements": [
            {
              "type": "ListWithDetail",
              "scope": "#/properties/experiments",
              "options": {
                "labelRef": "#/items/properties/ID",
                "detail": {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/ID"
                        }
                      ]
                    },
                    {
                      "type": "Categorization",
                      "elements": [
                        {
                          "type": "Category",
                          "label": "Sequential",
                          "elements": [
                            {
                              "type": "VerticalLayout",
                              "elements": [
                                {
                                  "type": "Control",
                                  "scope": "#/properties/ID"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            }
          ]
        }
      ]
    }
  },
  {
    "name": "conditional-schema-compositions",
    "label": "Conditional Schema Compositions",
    "data": {},
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "minLength": 1,
          "description": "The task's name"
        },
        "recurrence": {
          "type": "string",
          "enum": [
            "Never",
            "Daily",
            "Weekly",
            "Monthly"
          ]
        }
      },
      "anyOf": [
        {
          "if": {
            "properties": {
              "recurrence": {
                "const": "Never"
              }
            }
          },
          "then": {
            "properties": {
              "lastname": {
                "type": "string"
              },
              "age": {
                "type": "number"
              }
            }
          }
        }
      ]
    },
    "uischema": {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/name"
            },
            {
              "type": "Control",
              "scope": "#/properties/recurrence"
            },
            {
              "type": "Control",
              "scope": "#/anyOf/0/then/properties/lastname",
              "rule": {
                "effect": "SHOW",
                "condition": {
                  "scope": "#/properties/recurrence",
                  "schema": {
                    "const": "Never"
                  }
                }
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/age",
              "rule": {
                "effect": "SHOW",
                "condition": {
                  "scope": "#/properties/recurrence",
                  "schema": {
                    "const": "Never"
                  }
                }
              }
            }
          ]
        }
      ]
    }
  },
  {
    "name": "configCustom",
    "label": "Configuration (Custom)",
    "data": {
      "postalCode": "12345"
    },
    "schema": {
      "type": "object",
      "properties": {
        "postalCode": {
          "type": "string",
          "description": "A Postal Code",
          "maxLength": 5
        },
        "recurrenceInterval": {
          "type": "integer",
          "description": "A recurrence interval"
        }
      },
      "required": [
        "postalCode"
      ]
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/postalCode",
              "label": "Postal Code"
            },
            {
              "type": "Control",
              "scope": "#/properties/recurrenceInterval",
              "label": "Recurrence Interval"
            }
          ]
        }
      ]
    },
    "config": {
      "restrict": true,
      "trim": true,
      "showUnfocusedDescription": true,
      "hideRequiredAsterisk": true
    }
  },
  {
    "name": "configDefault",
    "label": "Configuration (Default)",
    "data": {
      "postalCode": "12345"
    },
    "schema": {
      "type": "object",
      "properties": {
        "postalCode": {
          "type": "string",
          "description": "A Postal Code",
          "maxLength": 5
        },
        "recurrenceInterval": {
          "type": "integer",
          "description": "A recurrence interval"
        }
      },
      "required": [
        "postalCode"
      ]
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/postalCode",
              "label": "Postal Code"
            },
            {
              "type": "Control",
              "scope": "#/properties/recurrenceInterval",
              "label": "Recurrence Interval"
            }
          ]
        }
      ]
    }
  },
  {
    "name": "control-options",
    "label": "Control Options",
    "data": {
      "string": "This is a string",
      "boolean": true,
      "number": 50.5,
      "integer": 50,
      "date": "2020-06-25",
      "time": "23:08:00",
      "dateTime": "2020-06-25T23:08:42+02:00",
      "enum": "Two",
      "multilineString": "Multi-\nline\nexample",
      "slider": 4,
      "trimText": "abcdefg",
      "restrictText": "abcde",
      "toggle": false
    },
    "schema": {
      "type": "object",
      "properties": {
        "string": {
          "type": "string"
        },
        "boolean": {
          "type": "boolean",
          "description": "Boolean description as a tooltip"
        },
        "number": {
          "type": "number"
        },
        "integer": {
          "type": "integer"
        },
        "date": {
          "type": "string",
          "format": "date"
        },
        "time": {
          "type": "string",
          "format": "time"
        },
        "dateTime": {
          "type": "string",
          "format": "date-time"
        },
        "enum": {
          "type": "string",
          "enum": [
            "One",
            "Two",
            "Three"
          ]
        },
        "multilineString": {
          "type": "string",
          "description": "Multiline Example"
        },
        "slider": {
          "type": "number",
          "minimum": 1,
          "maximum": 5,
          "default": 2,
          "description": "Slider Example"
        },
        "trimText": {
          "type": "string",
          "description": "Trim indicates whether the control shall grab the full width available"
        },
        "restrictText": {
          "type": "string",
          "maxLength": 5,
          "description": "Restricts the input length to the set value (in this case: 5)"
        },
        "unfocusedDescription": {
          "type": "string",
          "description": "This description is shown even when the control is not focused"
        },
        "hideRequiredAsterisk": {
          "type": "string",
          "description": "Hides the \"*\" symbol, when the field is required"
        },
        "toggle": {
          "type": "boolean",
          "description": "The \"toggle\" option renders boolean values as a toggle."
        }
      },
      "required": [
        "hideRequiredAsterisk",
        "restrictText"
      ]
    },
    "uischema": {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Normal controls",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/string"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/boolean"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/number"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/integer"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/date"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/time"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/dateTime"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/enum"
                }
              ]
            }
          ]
        },
        {
          "type": "Category",
          "label": "Configured controls",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/multilineString",
                  "options": {
                    "multi": true
                  }
                },
                {
                  "type": "Control",
                  "scope": "#/properties/slider",
                  "options": {
                    "slider": true
                  }
                },
                {
                  "type": "Control",
                  "scope": "#/properties/trimText",
                  "options": {
                    "trim": true
                  }
                },
                {
                  "type": "Control",
                  "scope": "#/properties/restrictText",
                  "options": {
                    "restrict": true
                  }
                },
                {
                  "type": "Control",
                  "scope": "#/properties/unfocusedDescription",
                  "options": {
                    "showUnfocusedDescription": true
                  }
                },
                {
                  "type": "Control",
                  "scope": "#/properties/hideRequiredAsterisk",
                  "options": {
                    "hideRequiredAsterisk": true
                  }
                },
                {
                  "type": "Control",
                  "scope": "#/properties/toggle",
                  "label": "Boolean as Toggle",
                  "options": {
                    "toggle": true
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "name": "dates",
    "label": "Dates",
    "data": {
      "schemaBased": {
        "date": "2025-10-23",
        "time": "13:37:00",
        "datetime": "2025-10-23T09:56:11.238Z"
      },
      "uiSchemaBased": {
        "date": "2025-10-23",
        "time": "13:37:00",
        "datetime": "1999/12/11 10:05 am"
      }
    },
    "schema": {
      "type": "object",
      "properties": {
        "schemaBased": {
          "type": "object",
          "properties": {
            "date": {
              "type": "string",
              "format": "date",
              "description": "schema-based date picker"
            },
            "time": {
              "type": "string",
              "format": "time",
              "description": "schema-based time picker"
            },
            "datetime": {
              "type": "string",
              "format": "date-time",
              "description": "schema-based datetime picker"
            }
          }
        },
        "uiSchemaBased": {
          "type": "object",
          "properties": {
            "date": {
              "type": "string",
              "description": "does not allow to select days"
            },
            "time": {
              "type": "string",
              "description": "24 hour format"
            },
            "datetime": {
              "type": "string",
              "description": "uischema-based datetime picker"
            }
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/schemaBased/properties/date"
            },
            {
              "type": "Control",
              "scope": "#/properties/schemaBased/properties/time"
            },
            {
              "type": "Control",
              "scope": "#/properties/schemaBased/properties/datetime"
            }
          ]
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/uiSchemaBased/properties/date",
              "label": "Year Month Picker",
              "options": {
                "format": "date",
                "clearLabel": "Clear it!",
                "cancelLabel": "Abort",
                "okLabel": "Do it",
                "views": [
                  "year",
                  "month"
                ],
                "dateFormat": "YYYY.MM",
                "dateSaveFormat": "YYYY-MM"
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/uiSchemaBased/properties/time",
              "options": {
                "format": "time",
                "ampm": true
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/uiSchemaBased/properties/datetime",
              "options": {
                "format": "date-time",
                "dateTimeFormat": "DD-MM-YY hh:mm:a",
                "dateTimeSaveFormat": "YYYY/MM/DD h:mm a",
                "ampm": true
              }
            }
          ]
        }
      ]
    }
  },
  {
    "name": "default",
    "label": "Default",
    "data": {
      "name": "Send email to Adrian",
      "name_noDefault": "Send email to Adrian",
      "description": "Confirm if you have passed the subject\nHereby ...",
      "done": true,
      "rating": 1,
      "cost": 3.14,
      "dueDate": "2019-05-01"
    },
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "default": "foo"
        },
        "name_noDefault": {
          "type": "string"
        },
        "description": {
          "type": "string",
          "default": "bar"
        },
        "done": {
          "type": "boolean",
          "default": false
        },
        "rating": {
          "type": "integer",
          "default": 5
        },
        "cost": {
          "type": "number",
          "default": 5.5
        },
        "dueDate": {
          "type": "string",
          "format": "date",
          "default": "2019-04-01"
        }
      },
      "required": [
        "name",
        "name_noDefault"
      ]
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/name"
        },
        {
          "type": "Control",
          "scope": "#/properties/name_noDefault"
        },
        {
          "type": "Control",
          "label": false,
          "scope": "#/properties/done"
        },
        {
          "type": "Control",
          "scope": "#/properties/description",
          "options": {
            "multi": true
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/rating"
        },
        {
          "type": "Control",
          "scope": "#/properties/cost"
        },
        {
          "type": "Control",
          "scope": "#/properties/dueDate"
        }
      ]
    }
  },
  {
    "name": "multi-enum",
    "label": "Enum - Multi selection",
    "data": {
      "oneOfMultiEnum": [
        "foo"
      ],
      "multiEnum": [
        "bar"
      ]
    },
    "schema": {
      "type": "object",
      "properties": {
        "oneOfMultiEnum": {
          "type": "array",
          "uniqueItems": true,
          "items": {
            "oneOf": [
              {
                "const": "foo",
                "title": "My Foo"
              },
              {
                "const": "bar",
                "title": "My Bar"
              },
              {
                "const": "foobar",
                "title": "My FooBar"
              }
            ]
          }
        },
        "multiEnum": {
          "type": "array",
          "uniqueItems": true,
          "items": {
            "type": "string",
            "enum": [
              "foo",
              "bar",
              "foobar"
            ]
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/oneOfMultiEnum"
        },
        {
          "type": "Control",
          "scope": "#/properties/multiEnum"
        }
      ]
    }
  },
  {
    "name": "enum",
    "label": "Enums",
    "data": {
      "plainEnumSet": "foo",
      "enumWithError": "bogus",
      "oneOfEnumSet": "bar",
      "oneOfEnumWithError": "bogus"
    },
    "schema": {
      "type": "object",
      "properties": {
        "plainEnum": {
          "type": "string",
          "enum": [
            "foo",
            "bar"
          ]
        },
        "plainEnumSet": {
          "type": "string",
          "enum": [
            "foo",
            "bar"
          ]
        },
        "enumWithError": {
          "type": "string",
          "enum": [
            "foo",
            "bar"
          ]
        },
        "oneOfEnum": {
          "type": "string",
          "oneOf": [
            {
              "const": "foo",
              "title": "Foo"
            },
            {
              "const": "bar",
              "title": "Bar"
            },
            {
              "const": "foobar",
              "title": "FooBar"
            }
          ]
        },
        "oneOfEnumSet": {
          "type": "string",
          "oneOf": [
            {
              "const": "foo",
              "title": "Foo"
            },
            {
              "const": "bar",
              "title": "Bar"
            },
            {
              "const": "foobar",
              "title": "FooBar"
            }
          ]
        },
        "oneOfEnumWithError": {
          "type": "string",
          "oneOf": [
            {
              "const": "foo",
              "title": "Foo"
            },
            {
              "const": "bar",
              "title": "Bar"
            },
            {
              "const": "foobar",
              "title": "FooBar"
            }
          ]
        },
        "constEnum": {
          "const": "Const Value"
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Group",
          "label": "Enums",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/constEnum"
            },
            {
              "type": "Control",
              "scope": "#/properties/plainEnum"
            },
            {
              "type": "Control",
              "scope": "#/properties/plainEnumSet"
            },
            {
              "type": "Control",
              "scope": "#/properties/plainEnum",
              "options": {
                "autocomplete": false
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/plainEnumSet",
              "options": {
                "autocomplete": false
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/enumWithError"
            }
          ]
        },
        {
          "type": "Group",
          "label": "One of Enums",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/oneOfEnum"
            },
            {
              "type": "Control",
              "scope": "#/properties/oneOfEnumSet"
            },
            {
              "type": "Control",
              "scope": "#/properties/oneOfEnum",
              "options": {
                "autocomplete": false
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/oneOfEnumSet",
              "options": {
                "autocomplete": false
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/oneOfEnumWithError"
            }
          ]
        }
      ]
    }
  },
  {
    "name": "fb.anyofsimple",
    "label": "FormBuilder - AnyOf Simple",
    "data": {},
    "schema": {
      "type": "object",
      "properties": {
        "foo": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "type": "string",
              "enum": [
                "foo",
                "bar"
              ]
            }
          ]
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/foo"
        }
      ]
    }
  },
  {
    "name": "arrayofenum",
    "label": "FormBuilder - Array containing enums",
    "data": {},
    "schema": {
      "type": "object",
      "properties": {
        "myItem": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "plainEnum": {
                "type": "string",
                "enum": [
                  "foo",
                  "bar"
                ]
              },
              "oneOfEnum": {
                "type": "string",
                "oneOf": [
                  {
                    "const": "foo",
                    "title": "Foo"
                  },
                  {
                    "const": "bar",
                    "title": "Bar"
                  },
                  {
                    "const": "foobar",
                    "title": "FooBar"
                  }
                ]
              }
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
          "scope": "#/properties/myItem"
        }
      ]
    }
  },
  {
    "name": "fb.arrayofref",
    "label": "FormBuilder - Array of $ref",
    "data": {},
    "schema": {
      "type": "object",
      "definitions": {
        "user": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            }
          }
        }
      },
      "properties": {
        "users": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/user"
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/users"
        }
      ]
    }
  },
  {
    "name": "arrayarray",
    "label": "FormBuilder - Array with Array",
    "data": {},
    "schema": {
      "type": "object",
      "properties": {
        "usercolors": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "username": {
                "type": "string"
              },
              "colors": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "code": {
                      "type": "string"
                    }
                  }
                }
              }
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
          "scope": "#/properties/usercolors",
          "options": {
            "elementLabelProp": "username"
          }
        }
      ]
    }
  },
  {
    "name": "fb.composition",
    "label": "FormBuilder - Composition",
    "schema": {
      "type": "object",
      "properties": {
        "foo": {
          "enum": [
            "bar",
            "baz"
          ]
        },
        "bar": {
          "type": "string"
        },
        "baz": {
          "type": "string"
        }
      },
      "oneOf": [
        {
          "properties": {
            "foo": {
              "const": "bar"
            }
          },
          "required": [
            "bar"
          ]
        },
        {
          "properties": {
            "foo": {
              "const": "baz"
            }
          },
          "required": [
            "baz"
          ]
        }
      ]
    },
    "uischema": {
      "type": "Control",
      "scope": "#/"
    },
    "data": {}
  },
  {
    "name": "fb.composition2",
    "label": "FormBuilder - Composition 2",
    "schema": {
      "type": "object",
      "properties": {
        "scopeOrPath": {
          "type": "string",
          "enum": [
            "scope",
            "path"
          ]
        },
        "scope": {
          "type": "string"
        }
      },
      "allOf": [
        {
          "if": {
            "properties": {
              "scopeOrPath": {
                "const": "scope"
              }
            },
            "required": [
              "scopeOrPath"
            ]
          },
          "then": {
            "properties": {
              "scope": {
                "pattern": "^#/\\w+"
              }
            },
            "required": [
              "scope"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "scopeOrPath": {
                "const": "path"
              }
            },
            "required": [
              "scopeOrPath"
            ]
          },
          "then": {
            "properties": {
              "scope": {
                "pattern": "^\\./[a-z]+"
              }
            },
            "required": [
              "scope"
            ]
          }
        }
      ]
    },
    "uischema": {
      "type": "Control",
      "scope": "#/"
    },
    "data": {}
  },
  {
    "name": "fb.conditional",
    "label": "FormBuilder - conditional",
    "schema": {
      "type": "object",
      "properties": {
        "needText": {
          "type": "boolean"
        },
        "text": {
          "type": "string"
        }
      },
      "if": {
        "type": "object",
        "properties": {
          "needText": {
            "const": true
          }
        },
        "required": [
          "needText"
        ]
      },
      "then": {
        "type": "object",
        "properties": {
          "text": {
            "type": "string"
          }
        },
        "required": [
          "text"
        ]
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/needText"
        },
        {
          "type": "Control",
          "scope": "#/properties/text"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.conditional.arrayofobj",
    "label": "FormBuilder - conditional - Array of Objects",
    "schema": {
      "type": "object",
      "properties": {
        "texts": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "needText": {
                "type": "boolean"
              },
              "text": {
                "type": "string"
              }
            },
            "if": {
              "type": "object",
              "properties": {
                "needText": {
                  "const": true
                }
              },
              "required": [
                "needText"
              ]
            },
            "then": {
              "type": "object",
              "properties": {
                "text": {
                  "type": "string"
                }
              },
              "required": [
                "text"
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
          "scope": "#/properties/texts"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.conditional.not",
    "label": "FormBuilder - conditional - Not",
    "schema": {
      "type": "object",
      "properties": {
        "foobar": {
          "type": "string",
          "not": {
            "enum": [
              "foo",
              "bar"
            ]
          },
          "description": "this text must not be \"foo\" or \"bar\""
        },
        "count": {
          "type": "number",
          "description": "this number must not greather then 5 if lorem=ipsum"
        },
        "lorem": {
          "type": "string",
          "description": "this text must not be \"ipsum\" if count greather then 5"
        }
      },
      "not": {
        "type": "object",
        "properties": {
          "count": {
            "exclusiveMinimum": 5
          },
          "lorem": {
            "const": "ipsum"
          }
        },
        "required": [
          "count",
          "lorem"
        ]
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/foobar"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/count"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/lorem"
                }
              ]
            }
          ]
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.conditional.pattern",
    "label": "FormBuilder - conditional - Pattern",
    "schema": {
      "type": "object",
      "properties": {
        "address": {
          "type": "object",
          "properties": {
            "country": {
              "default": "United States of America",
              "type": "string",
              "enum": [
                "United States of America",
                "Canada"
              ]
            },
            "postal_code": {
              "type": "string"
            }
          },
          "if": {
            "properties": {
              "country": {
                "const": "United States of America"
              }
            }
          },
          "then": {
            "properties": {
              "postal_code": {
                "pattern": "[0-9]{5}(-[0-9]{4})?"
              }
            }
          },
          "else": {
            "properties": {
              "postal_code": {
                "pattern": "[A-Z][0-9][A-Z] [0-9][A-Z][0-9]"
              }
            }
          },
          "required": [
            "country",
            "postal_code"
          ]
        },
        "multiplier": {
          "type": "integer",
          "minimum": 1,
          "maximum": 1000,
          "if": {
            "minimum": 100
          },
          "then": {
            "multipleOf": 100
          },
          "else": {
            "if": {
              "minimum": 10
            },
            "then": {
              "multipleOf": 10
            }
          },
          "description": "any number greather then 10 must be multipleOf 10. and any number greather then 100 must be multipleOf 100."
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/address"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/multiplier",
              "options": {
                "showUnfocusedDescription": true
              }
            }
          ],
          "label": "Number with multipleOf"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.const",
    "label": "FormBuilder - const",
    "schema": {
      "type": "object",
      "properties": {
        "constString": {
          "const": "lorem ipsum"
        },
        "constInteger": {
          "const": 128
        },
        "constNumber": {
          "const": 0.015
        },
        "constBoolean": {
          "const": true
        },
        "constBooleanFalse": {
          "const": false
        },
        "constNull": {
          "const": null
        },
        "constArray": {
          "const": [
            "foo",
            "bar"
          ]
        },
        "constObject": {
          "const": {
            "type": "object",
            "properties": {
              "string": {
                "type": "string"
              }
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
          "scope": "#/properties/constString"
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/constInteger"
            },
            {
              "type": "Control",
              "scope": "#/properties/constNumber"
            }
          ]
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/constBoolean"
            },
            {
              "type": "Control",
              "scope": "#/properties/constBooleanFalse"
            }
          ]
        },
        {
          "type": "Control",
          "scope": "#/properties/constNull"
        },
        {
          "type": "Control",
          "scope": "#/properties/constArray"
        },
        {
          "type": "Control",
          "scope": "#/properties/constObject"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.definitions",
    "label": "FormBuilder - definitions",
    "schema": {
      "type": "object",
      "definitions": {
        "text": {
          "type": "string"
        },
        "more": {
          "type": "object",
          "properties": {
            "text2": {
              "type": "string"
            }
          },
          "definitions": {
            "textDef": {
              "type": "string"
            }
          }
        }
      },
      "properties": {
        "text": {
          "$ref": "#/definitions/text"
        },
        "moreText2": {
          "$ref": "#/definitions/more/properties/text2"
        },
        "moreTextDef": {
          "$ref": "#/definitions/more/definitions/textDef"
        },
        "user": {
          "type": "object",
          "definitions": {
            "name": {
              "type": "string"
            }
          },
          "properties": {
            "name": {
              "$ref": "#/properties/user/definitions/name"
            }
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Group",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/text",
              "label": "text - $ref:#/definitions/text"
            }
          ]
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/moreTextDef",
                  "label": "moreTextDef - $ref:#/definitions/more/definitions/textDef"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/moreText2",
                  "label": "moreText2 - $ref:#/definitions/more/properties/text2"
                }
              ]
            }
          ]
        },
        {
          "type": "Control",
          "scope": "#/properties/user",
          "label": "user - with name $ref:#/properties/user/definitions/name"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.file",
    "label": "FormBuilder - File",
    "schema": {
      "type": "object",
      "properties": {
        "imageDataUri": {
          "type": "string",
          "format": "uri",
          "contentEncoding": "base64",
          "contentMediaType": "image/*",
          "description": "Image encoded as data URI"
        },
        "fileDataUriWithFileName": {
          "type": "string",
          "format": "binary",
          "description": "File with maximum size of 1MB encoded as data URI and including the file name"
        },
        "base64String": {
          "type": "string",
          "contentEncoding": "base64",
          "description": "File encoded as base64"
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/imageDataUri"
        },
        {
          "type": "Control",
          "scope": "#/properties/fileDataUriWithFileName"
        },
        {
          "type": "Control",
          "scope": "#/properties/base64String"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "latestExample",
    "label": "FormBuilder - latest example",
    "data": {},
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Please enter your name 1"
        },
        "number": {
          "type": "integer",
          "minimum": 0,
          "maximum": 9,
          "default": 3
        },
        "boolean": {
          "type": "boolean"
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/number",
          "options": {
            "slider": true
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/name",
          "options": {
            "showUnfocusedDescription": true
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/boolean",
          "options": {
            "toggle": true
          }
        }
      ]
    }
  },
  {
    "name": "fb-listwithdetail",
    "label": "FormBuilder - ListWithDetail",
    "data": {},
    "schema": {
      "type": "object",
      "properties": {
        "orders": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "customer": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string",
                    "format": "email"
                  },
                  "department": {
                    "type": "string"
                  }
                }
              },
              "title": {
                "type": "string",
                "minLength": 5,
                "title": "Official Title"
              },
              "ordered": {
                "type": "boolean"
              },
              "processId": {
                "type": "number",
                "minimum": 0
              },
              "assignee": {
                "type": "string"
              },
              "startDate": {
                "type": "string",
                "format": "date"
              },
              "endDate": {
                "type": "string",
                "format": "date"
              },
              "status": {
                "type": "string",
                "enum": [
                  "unordered",
                  "planned",
                  "ordered"
                ]
              }
            },
            "required": [
              "title"
            ]
          }
        }
      }
    },
    "uischema": {
      "type": "ListWithDetail",
      "scope": "#/properties/orders",
      "options": {
        "labelRef": "#/items/properties/customer/properties/name",
        "detail": {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/title"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/processId"
                }
              ]
            },
            {
              "type": "Group",
              "label": "Customer",
              "elements": [
                {
                  "type": "Control",
                  "label": "ID",
                  "scope": "#/properties/customer/properties/id"
                },
                {
                  "type": "Control",
                  "label": "Name",
                  "scope": "#/properties/customer/properties/name"
                },
                {
                  "type": "Control",
                  "label": "Department",
                  "scope": "#/properties/customer/properties/department"
                }
              ]
            },
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/ordered",
                          "options": {
                            "toggle": true
                          }
                        },
                        {
                          "type": "Control",
                          "scope": "#/properties/assignee"
                        }
                      ]
                    },
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/startDate"
                        },
                        {
                          "type": "Control",
                          "scope": "#/properties/endDate"
                        }
                      ]
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/status"
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "name": "fb.login",
    "label": "FormBuilder - Login",
    "schema": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string",
          "description": "Login Name"
        },
        "password": {
          "type": "string",
          "format": "password",
          "description": "Login password"
        }
      },
      "required": [
        "username",
        "password"
      ]
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Label",
          "text": "Login Information"
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/username"
            },
            {
              "type": "Control",
              "scope": "#/properties/password"
            }
          ]
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.enum",
    "label": "FormBuilder - Multiple Choice",
    "schema": {
      "type": "object",
      "properties": {
        "singleEnum": {
          "type": "string",
          "enum": [
            "DE",
            "IT",
            "JP"
          ]
        },
        "singleOneOf": {
          "type": "string",
          "oneOf": [
            {
              "const": "DE",
              "title": "Germany"
            },
            {
              "const": "IT",
              "title": "Italy"
            },
            {
              "const": "JP",
              "title": "Japan"
            }
          ]
        },
        "multiEnum": {
          "type": "array",
          "uniqueItems": true,
          "items": {
            "enum": [
              "DE",
              "IT",
              "JP"
            ],
            "type": "string"
          }
        },
        "oneOfMultiEnum": {
          "type": "array",
          "uniqueItems": true,
          "items": {
            "oneOf": [
              {
                "const": "DE",
                "title": "Germany"
              },
              {
                "const": "IT",
                "title": "Italy"
              },
              {
                "const": "JP",
                "title": "Japan"
              }
            ],
            "type": "string"
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Group",
          "elements": [
            {
              "type": "Group",
              "elements": [
                {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/singleEnum",
                      "label": "Enum"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/singleOneOf",
                      "label": "One Of"
                    }
                  ]
                }
              ],
              "label": "Select"
            },
            {
              "type": "Group",
              "elements": [
                {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/singleEnum",
                      "options": {
                        "format": "radio"
                      },
                      "label": "Enum as Radio Button"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/singleOneOf",
                      "options": {
                        "format": "radio"
                      },
                      "label": "oneOf Radio Button"
                    }
                  ]
                }
              ],
              "label": "Radio Buttons"
            }
          ],
          "label": "Single Select"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/multiEnum",
                  "label": "Enum"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/oneOfMultiEnum",
                  "label": "One Of"
                }
              ]
            }
          ],
          "label": "Multi Select"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.nestedCombinator",
    "label": "FormBuilder - nested Combinator",
    "data": {},
    "schema": {
      "type": "object",
      "properties": {
        "rootColors": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "oneOf": [
                {
                  "const": "foo"
                },
                {
                  "const": "bar"
                }
              ]
            }
          ]
        }
      }
    },
    "uischema": {
      "type": "Group",
      "text": "Group Root",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/rootColors"
        }
      ]
    }
  },
  {
    "name": "nestedRefs",
    "label": "FormBuilder - nested Refs",
    "data": {},
    "schema": {
      "type": "object",
      "definitions": {
        "colors": {
          "type": "string",
          "enum": [
            "red",
            "green",
            "blue"
          ]
        }
      },
      "properties": {
        "rootColors": {
          "$ref": "#/definitions/colors"
        },
        "rootText": {
          "type": "string"
        },
        "colorsA": {
          "type": "object",
          "properties": {
            "AColors": {
              "allOf": [
                {
                  "$ref": "#/definitions/colors"
                }
              ]
            },
            "AText": {
              "type": "string"
            },
            "colorsB": {
              "type": "object",
              "properties": {
                "BColors": {
                  "allOf": [
                    {
                      "$ref": "#/definitions/colors"
                    }
                  ]
                },
                "BText": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "uischema": {
      "type": "Group",
      "text": "Group Root",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/colorsA"
        }
      ]
    }
  },
  {
    "name": "fb.object.addprops",
    "label": "FormBuilder - Object with additionalProperties",
    "data": {
      "options": {}
    },
    "schema": {
      "type": "object",
      "properties": {
        "objectString": {
          "type": "object",
          "title": "with type string",
          "properties": {
            "name": {
              "type": "string"
            }
          },
          "additionalProperties": {
            "type": "string"
          }
        },
        "objectTypes": {
          "type": "object",
          "title": "with type array",
          "properties": {
            "name": {
              "type": "string"
            }
          },
          "additionalProperties": {
            "type": [
              "string",
              "boolean"
            ]
          }
        },
        "objectOneOf": {
          "type": "object",
          "title": "with oneOf",
          "properties": {
            "name": {
              "type": "string"
            }
          },
          "additionalProperties": {
            "oneOf": [
              {
                "type": "string",
                "title": "string"
              },
              {
                "type": "boolean",
                "title": "boolean"
              },
              {
                "type": "number",
                "title": "number"
              }
            ]
          }
        },
        "objectPattern": {
          "type": "object",
          "title": "with patternProperties: ^S_ ^I_ ^B_",
          "properties": {
            "name": {
              "type": "string"
            }
          },
          "additionalProperties": true,
          "patternProperties": {
            "^S_": {
              "type": "string"
            },
            "^I_": {
              "type": "integer"
            },
            "^N_": {
              "type": "number"
            },
            "^B_": {
              "type": "boolean"
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
          "scope": "#"
        }
      ]
    }
  },
  {
    "name": "oneOfRefs",
    "label": "FormBuilder - oneOfRefs",
    "data": {
      "addressOrUser": {
        "name": "My Name"
      }
    },
    "schema": {
      "definitions": {
        "address": {
          "type": "object",
          "title": "Address",
          "properties": {
            "street": {
              "type": "string"
            },
            "city": {
              "type": "string"
            }
          },
          "required": [
            "street"
          ]
        },
        "user": {
          "type": "object",
          "title": "User",
          "properties": {
            "name": {
              "type": "string"
            }
          },
          "required": [
            "name"
          ]
        }
      },
      "type": "object",
      "properties": {
        "addressOrUser": {
          "oneOf": [
            {
              "$ref": "#/definitions/address"
            },
            {
              "$ref": "#/definitions/user"
            }
          ]
        }
      }
    },
    "uischema": {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/addressOrUser"
        }
      ]
    }
  },
  {
    "name": "fb.option.subschema.rule",
    "label": "FormBuilder - Option - Subschema: Rule",
    "schema": {
      "type": "object",
      "properties": {
        "rule": {
          "type": "object",
          "properties": {
            "rule": {
              "$ref": "jsonforms_ui_rule.schema.json"
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
          "scope": "#/properties/rule/properties/rule/properties/effect"
        },
        {
          "type": "Control",
          "scope": "#/properties/rule/properties/rule/properties/condition/properties/scope"
        },
        {
          "type": "Formbuilder",
          "scope": "#/properties/rule/properties/rule/properties/condition/properties/schema",
          "options": {
            "schemaOnly": true,
            "baseTool": "schema"
          }
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.option.subschema.styles",
    "label": "FormBuilder - Option - Subschema: Style",
    "schema": {
      "type": "object",
      "properties": {
        "styles": {
          "type": "object",
          "properties": {
            "stylesAsArray": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "path": {
                    "type": "string"
                  },
                  "class": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    "uischema": {
      "scope": "#/properties/styles/properties/stylesAsArray",
      "type": "Control",
      "options": {
        "detail": {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/path"
            },
            {
              "type": "Control",
              "scope": "#/properties/class",
              "options": {
                "multi": true
              }
            }
          ]
        }
      }
    },
    "data": {}
  },
  {
    "name": "fb.option.subschema.validation",
    "label": "FormBuilder - Option - Subschema: Validation",
    "schema": {
      "type": "object",
      "properties": {
        "validation": {
          "type": "object",
          "properties": {
            "maximum": {
              "type": "number",
              "exclusiveMinimum": 0
            },
            "minimum": {
              "type": "number",
              "exclusiveMinimum": 0
            },
            "multipleOf": {
              "type": "number",
              "exclusiveMinimum": 0
            },
            "exclusiveMinimum": {
              "type": "number",
              "exclusiveMinimum": 0
            },
            "exclusiveMaximum": {
              "type": "number",
              "exclusiveMinimum": 0
            },
            "minLength": {
              "type": "integer",
              "exclusiveMinimum": 0
            },
            "maxLength": {
              "type": "integer",
              "exclusiveMinimum": 0
            },
            "pattern": {
              "type": "string",
              "format": "regex",
              "description": "eg: \"[abc]+\""
            },
            "minItems": {
              "type": "integer",
              "exclusiveMinimum": 0
            },
            "maxItems": {
              "type": "integer",
              "exclusiveMinimum": 0
            },
            "minProperties": {
              "type": "integer",
              "exclusiveMinimum": 0
            },
            "maxProperties": {
              "type": "integer",
              "exclusiveMinimum": 0
            },
            "uniqueItems": {
              "type": "boolean"
            },
            "patternProperties": {
              "type": "object",
              "additionalProperties": {
                "$ref": "draft07.schema.json"
              },
              "propertyNames": {
                "format": "regex"
              }
            },
            "dependentRequired": {
              "type": "object",
              "additionalProperties": {
                "type": "array",
                "minItems": 2,
                "uniqueItems": true,
                "items": {
                  "type": "string"
                }
              }
            },
            "propertyNames": {
              "type": "object"
            },
            "not": {
              "type": "object"
            },
            "dependencies": {
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
              "type": "HorizontalLayout",
              "elements": [
                {
                  "scope": "#/properties/validation/properties/minimum",
                  "type": "Control"
                },
                {
                  "scope": "#/properties/validation/properties/maximum",
                  "type": "Control"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "scope": "#/properties/validation/properties/exclusiveMinimum",
                  "type": "Control"
                },
                {
                  "scope": "#/properties/validation/properties/exclusiveMaximum",
                  "type": "Control"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "scope": "#/properties/validation/properties/multipleOf",
                  "type": "Control"
                }
              ]
            }
          ],
          "rule": {
            "effect": "SHOW",
            "condition": {
              "scope": "#/properties/schema/properties/type",
              "schema": {
                "enum": [
                  "number",
                  "integer"
                ]
              }
            }
          }
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "scope": "#/properties/validation/properties/minLength",
              "type": "Control"
            },
            {
              "scope": "#/properties/validation/properties/maxLength",
              "type": "Control"
            }
          ],
          "rule": {
            "effect": "SHOW",
            "condition": {
              "scope": "#/properties/schema/properties/type",
              "schema": {
                "enum": [
                  "string"
                ]
              }
            }
          }
        },
        {
          "scope": "#/properties/validation/properties/pattern",
          "type": "Control",
          "rule": {
            "effect": "SHOW",
            "condition": {
              "scope": "#/properties/schema/properties/type",
              "schema": {
                "enum": [
                  "string"
                ]
              }
            }
          }
        },
        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "scope": "#/properties/validation/properties/minItems",
                  "type": "Control"
                },
                {
                  "scope": "#/properties/validation/properties/maxItems",
                  "type": "Control"
                }
              ]
            },
            {
              "scope": "#/properties/validation/properties/uniqueItems",
              "type": "Control"
            },
            {
              "type": "Group",
              "label": "Contains",
              "elements": [
                {
                  "scope": "#/properties/validation/properties/contains",
                  "type": "Formbuilder",
                  "options": {
                    "schemaOnly": true,
                    "baseTool": "schema"
                  }
                }
              ],
              "options": {
                "collapsible": true
              }
            },
            {
              "type": "Group",
              "label": "Additional Items",
              "elements": [
                {
                  "scope": "#/properties/validation/properties/additionalItems",
                  "type": "Formbuilder",
                  "options": {
                    "schemaOnly": true,
                    "baseTool": "schema"
                  }
                }
              ],
              "options": {
                "collapsible": true
              }
            }
          ],
          "rule": {
            "effect": "SHOW",
            "condition": {
              "scope": "#/properties/schema/properties/type",
              "schema": {
                "enum": [
                  "array"
                ]
              }
            }
          }
        },
        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "scope": "#/properties/validation/properties/minProperties",
                  "type": "Control"
                },
                {
                  "scope": "#/properties/validation/properties/maxProperties",
                  "type": "Control"
                }
              ]
            },
            {
              "type": "VerticalLayout",
              "label": "patternProperties",
              "elements": [
                {
                  "type": "Group",
                  "label": "PatternProperties",
                  "elements": [
                    {
                      "scope": "#/properties/validation/properties/patternProperties",
                      "type": "Formbuilder",
                      "options": {
                        "schemaOnly": true,
                        "useProperties": true
                      }
                    }
                  ],
                  "options": {
                    "collapsible": true
                  }
                }
              ],
              "rule": {
                "effect": "SHOW",
                "condition": {
                  "scope": "#/properties/schema/properties/type",
                  "schema": {
                    "const": "object"
                  }
                }
              }
            },
            {
              "type": "Group",
              "label": "dependentRequired",
              "elements": [
                {
                  "scope": "#/properties/validation/properties/dependentRequired",
                  "type": "Control"
                }
              ],
              "rule": {
                "effect": "HIDE",
                "condition": {
                  "scope": "#"
                }
              }
            },
            {
              "type": "Group",
              "label": "PropertyNames",
              "elements": [
                {
                  "scope": "#/properties/validation/properties/propertyNames",
                  "type": "Formbuilder",
                  "options": {
                    "schemaOnly": true,
                    "baseTool": "schema",
                    "baseToolProps": {
                      "prefixLabel": "propertyNames:"
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
              "label": "Dependencies",
              "elements": [
                {
                  "scope": "#/properties/validation/properties/dependencies",
                  "type": "Formbuilder",
                  "options": {
                    "schemaOnly": true,
                    "useProperties": true
                  }
                }
              ],
              "options": {
                "collapsible": true
              }
            }
          ],
          "rule": {
            "effect": "SHOW",
            "condition": {
              "scope": "#/properties/schema/properties/type",
              "schema": {
                "enum": [
                  "object"
                ]
              }
            }
          }
        },
        {
          "type": "Group",
          "label": "Not",
          "elements": [
            {
              "type": "Formbuilder",
              "scope": "#/properties/validation/properties/not",
              "options": {
                "schemaOnly": true,
                "baseTool": "schema",
                "baseToolProps": {
                  "prefixLabel": "not:"
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
    "data": {}
  },
  {
    "name": "fb.option.categorization",
    "label": "FormBuilder - Option: categorization",
    "schema": {
      "type": "object",
      "properties": {
        "uiOptions": {
          "$ref": "uiOptions.schema#/properties/uiOptions"
        },
        "rule": {
          "$ref": "rule.schema#/properties/rule"
        }
      }
    },
    "uischema": {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Options & Styles",
          "elements": [
            {
              "type": "LayoutRef",
              "$ref": "uiOptions.uischema"
            }
          ]
        },
        {
          "type": "Category",
          "elements": [
            {
              "type": "LayoutRef",
              "$ref": "rule.uischema"
            }
          ],
          "label": "Rule"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.option.category",
    "label": "FormBuilder - Option: category",
    "schema": {
      "type": "object",
      "properties": {
        "labelAndI18n": {
          "type": "object",
          "properties": {
            "label": {
              "type": "string"
            },
            "i18n": {
              "type": "string",
              "title": "i18n",
              "description": "alternative lookup key for translation catalogue"
            }
          }
        },
        "rule": {
          "$ref": "rule.schema#/properties/rule"
        }
      }
    },
    "uischema": {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "elements": [
            {
              "type": "Control",
              "scope": "properties/labelAndI18n/properties/label"
            },
            {
              "type": "Control",
              "scope": "properties/labelAndI18n/properties/i18n"
            }
          ],
          "label": "Base"
        },
        {
          "type": "Category",
          "elements": [
            {
              "type": "LayoutRef",
              "$ref": "rule.uischema"
            }
          ],
          "label": "Rule"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.option.combinator",
    "label": "FormBuilder - Option: combinator",
    "schema": {
      "type": "object",
      "properties": {
        "propertyName": {
          "type": "string"
        },
        "keyword": {
          "type": "string",
          "enum": [
            "oneOf",
            "anyOf",
            "allOf"
          ]
        }
      }
    },
    "uischema": {
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
                      "schema": {
                        "const": false
                      }
                    }
                  }
                }
              ]
            },
            {
              "scope": "#/properties/keyword",
              "type": "Control"
            }
          ]
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.option.group",
    "label": "FormBuilder - Option: group",
    "schema": {
      "type": "object",
      "properties": {
        "uischema": {
          "type": "object",
          "properties": {}
        },
        "labelAndI18n": {
          "$ref": "labelAndI18n.schema#/properties/labelAndI18n"
        },
        "uiOptions": {
          "$ref": "uiOptions.schema#/properties/uiOptions"
        },
        "rule": {
          "$ref": "rule.schema#/properties/rule"
        }
      }
    },
    "uischema": {
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
                  "scope": "properties/labelAndI18n/properties/label"
                },
                {
                  "type": "Control",
                  "scope": "properties/labelAndI18n/properties/i18n"
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
              "type": "LayoutRef",
              "$ref": "uiOptions.uischema"
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
    },
    "data": {}
  },
  {
    "name": "fb.option.layout",
    "label": "FormBuilder - Option: layout",
    "schema": {
      "type": "object",
      "properties": {
        "uischema": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "VerticalLayout",
                "HorizontalLayout"
              ]
            }
          }
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
    "uischema": {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Base",
          "elements": [
            {
              "scope": "#/properties/uischema/properties/type",
              "type": "Control"
            }
          ]
        },
        {
          "type": "Category",
          "label": "Options & Styles",
          "elements": [
            {
              "type": "LayoutRef",
              "$ref": "uiOptions.uischema"
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
        },
        {
          "type": "Category",
          "label": "Operations",
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
    "data": {}
  },
  {
    "name": "options.detail",
    "label": "FormBuilder - options.detail",
    "schema": {
      "definitions": {
        "message": {
          "type": "string"
        },
        "nameAndMessage": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        }
      },
      "properties": {
        "name": {
          "type": "string"
        },
        "number": {
          "type": "number"
        },
        "comments": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/nameAndMessage"
          }
        },
        "page": {
          "type": "object",
          "properties": {
            "comments": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/nameAndMessage"
              }
            }
          }
        },
        "commentsAsStr": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "commentsAsStrOrObj": {
          "oneOf": [
            {
              "type": "array",
              "title": "as str",
              "items": {
                "type": "string"
              }
            },
            {
              "type": "array",
              "title": "as obj",
              "items": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  },
                  "id": {
                    "type": "integer"
                  }
                },
                "required": [
                  "message"
                ]
              }
            }
          ]
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/page/properties/comments",
          "options": {
            "elementLabelProp": "message",
            "detail": {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Label",
                  "text": "Your comment"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/name"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/message",
                  "options": {
                    "multi": true
                  }
                }
              ]
            }
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/name"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "options.detail.anyOf",
    "label": "FormBuilder - options.detail (anyOf)",
    "schema": {
      "definitions": {
        "message": {
          "type": "string"
        },
        "nameAndMessage": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        }
      },
      "properties": {
        "name": {
          "type": "string"
        },
        "number": {
          "type": "number"
        },
        "comments": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/nameAndMessage"
          }
        },
        "page": {
          "type": "object",
          "properties": {
            "comments": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/nameAndMessage"
              }
            }
          }
        },
        "commentsAsStr": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "commentsAsStrOrObj": {
          "oneOf": [
            {
              "type": "array",
              "title": "as str",
              "items": {
                "type": "string"
              }
            },
            {
              "type": "array",
              "title": "as obj",
              "items": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  },
                  "id": {
                    "type": "integer"
                  }
                },
                "required": [
                  "message"
                ]
              }
            }
          ]
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/commentsAsStrOrObj",
          "options": {
            "detail": {
              "type": "Control",
              "scope": "#",
              "options": {
                "detail": {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "VerticalLayout",
                      "scope": "#",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#",
                          "options": {
                            "multi": true
                          }
                        }
                      ],
                      "rule": {
                        "effect": "SHOW",
                        "condition": {
                          "scope": "#",
                          "schema": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    {
                      "type": "VerticalLayout",
                      "scope": "#",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/id"
                        },
                        {
                          "type": "Control",
                          "scope": "#/properties/message",
                          "options": {
                            "multi": true
                          }
                        }
                      ],
                      "rule": {
                        "effect": "SHOW",
                        "condition": {
                          "scope": "#/items",
                          "schema": {
                            "type": "object"
                          }
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      ]
    },
    "data": {}
  },
  {
    "name": "options.detail.asstr",
    "label": "FormBuilder - options.detail (as str)",
    "schema": {
      "definitions": {
        "message": {
          "type": "string"
        },
        "nameAndMessage": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        }
      },
      "properties": {
        "name": {
          "type": "string"
        },
        "number": {
          "type": "number"
        },
        "comments": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/nameAndMessage"
          }
        },
        "page": {
          "type": "object",
          "properties": {
            "comments": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/nameAndMessage"
              }
            }
          }
        },
        "commentsAsStr": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "commentsAsStrOrObj": {
          "oneOf": [
            {
              "type": "array",
              "title": "as str",
              "items": {
                "type": "string"
              }
            },
            {
              "type": "array",
              "title": "as obj",
              "items": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  },
                  "id": {
                    "type": "integer"
                  }
                },
                "required": [
                  "message"
                ]
              }
            }
          ]
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/commentsAsStr",
          "options": {
            "detail": {
              "type": "Control",
              "scope": "#",
              "options": {
                "multi": true
              }
            }
          }
        }
      ]
    },
    "data": {}
  },
  {
    "name": "options.detail.nodetails",
    "label": "FormBuilder - options.detail (no options.detail)",
    "schema": {
      "definitions": {
        "message": {
          "type": "string"
        },
        "nameAndMessage": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        }
      },
      "properties": {
        "name": {
          "type": "string"
        },
        "number": {
          "type": "number"
        },
        "comments": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/nameAndMessage"
          }
        },
        "page": {
          "type": "object",
          "properties": {
            "comments": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/nameAndMessage"
              }
            }
          }
        },
        "commentsAsStr": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "commentsAsStrOrObj": {
          "oneOf": [
            {
              "type": "array",
              "title": "as str",
              "items": {
                "type": "string"
              }
            },
            {
              "type": "array",
              "title": "as obj",
              "items": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  },
                  "id": {
                    "type": "integer"
                  }
                },
                "required": [
                  "message"
                ]
              }
            }
          ]
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/comments"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.personalbogen",
    "label": "FormBuilder - personalbogen",
    "schema": {
      "type": "object",
      "properties": {
        "familienname": {
          "type": "string"
        },
        "strasse": {
          "type": "string"
        },
        "geburtsdatum": {
          "type": "string",
          "format": "date"
        },
        "vorname": {
          "type": "string"
        },
        "plz_ort": {
          "type": "string"
        },
        "geschlecht": {
          "type": "string",
          "enum": [
            "männlich",
            "weiblich"
          ]
        },
        "versicherungsnr": {
          "type": "string",
          "description": "gem. Sozialvers. Ausweis"
        },
        "familienstand": {
          "type": "string",
          "enum": [
            "ledig",
            "verheiratet",
            "verwitwet",
            "geschieden",
            "anderes"
          ]
        },
        "familienstand_anderes": {
          "type": "string"
        },
        "geburtsort": {
          "type": "string",
          "description": "nur bei fehlender Versicherungs-Nr"
        },
        "schwerbehindert": {
          "type": "boolean"
        },
        "staatsangehörigkeit": {
          "type": "string"
        },
        "kontonr": {
          "type": "string"
        },
        "blz": {
          "type": "string"
        },
        "arbeitnehmernr": {
          "type": "string"
        },
        "eintrittsdatum": {
          "type": "string",
          "format": "date"
        },
        "ersteintrittsdatum": {
          "type": "string",
          "format": "date"
        },
        "betriebsstätte": {
          "type": "string"
        },
        "berufsbezeichnung": {
          "type": "string"
        },
        "tätigkeit": {
          "type": "string"
        },
        "beschäftigung": {
          "type": "string",
          "enum": [
            "haupt",
            "neben"
          ]
        },
        "weitere_beschäftigungen": {
          "type": "boolean",
          "description": "Üben Sie weitere Beschäftigungen aus?"
        },
        "schulabschluss_hoehst": {
          "type": "string",
          "enum": [
            "ohne Schulabschluss",
            "Haupt-/Volksschulabschluss",
            "Mittlere Reife/gleichwertiger  Abschluss",
            " Abitur/Fachabitur"
          ]
        },
        "berufsausbildung_hoest": {
          "type": "string",
          "enum": [
            "ohne beruflichen Ausbildungsabschluss",
            "Anerkannte Berufsausbildung",
            "Meister/Techniker/gleichwertiger  Fachschulabschluss",
            "Bachelor",
            "Diplom/Magister/ Master/Staatsexamen",
            "Promotion"
          ]
        },
        "ausbildung_start": {
          "type": "string",
          "format": "date"
        },
        "ausbildung_ende": {
          "type": "string",
          "format": "date"
        },
        "baugewerbe_beschäftigt": {
          "type": "string",
          "format": "date"
        },
        "wochen_arbeitszeit": {
          "type": "string",
          "enum": [
            "vollzeit",
            "teilzeit"
          ]
        },
        "arbeitszeit_verteilung": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "tag": {
                "type": "string"
              },
              "anzahl": {
                "type": "string"
              }
            }
          }
        },
        "urlaubsanspruch": {
          "type": "number",
          "description": "pro Kalenderjahr"
        },
        "kostenstelle": {
          "type": "string"
        },
        "abteilungsnr": {
          "type": "string"
        },
        "personengruppe": {
          "type": "string"
        },
        "befristet": {
          "type": "boolean"
        },
        "zweckbefristet": {
          "type": "boolean"
        },
        "befristet_bis": {
          "type": "string",
          "format": "date"
        },
        "abschluss_befristung": {
          "type": "boolean",
          "description": "Schriftlicher Abschluss des befristeten Arbeitsvertrages "
        },
        "abschluss_am": {
          "type": "string",
          "format": "date"
        },
        "befristung_weiter": {
          "type": "boolean",
          "description": "befristete Beschäftigung ist für mindestens 2 Monate vorgesehen, mit Aussicht auf Weiterbeschäftigung "
        },
        "identifikationsnr": {
          "type": "string"
        },
        "finanzamtnr": {
          "type": "string"
        },
        "steuerklasse": {
          "type": "string"
        },
        "kinderfreibeträge": {
          "type": "string"
        },
        "konfession": {
          "type": "string"
        },
        "krankenkasse": {
          "type": "string",
          "description": "Gesetzl. Krankenkasse (bei PKV: letzte ges. Krankenkasse)"
        },
        "elterneigenschaft": {
          "type": "boolean"
        },
        "kv": {
          "type": "string"
        },
        "rv": {
          "type": "string"
        },
        "av": {
          "type": "string"
        },
        "pv": {
          "type": "string"
        },
        "uv": {
          "type": "string"
        },
        "entlohnung": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "bezeichnung": {
                "type": "string"
              },
              "betrag": {
                "type": "number"
              },
              "gueltig_ab": {
                "type": "string",
                "format": "date"
              },
              "stundenlohn": {
                "type": "string"
              },
              "stundenlohn_gueltig_ab": {
                "type": "string",
                "format": "date"
              }
            }
          }
        },
        "vwl": {
          "type": "object",
          "properties": {
            "empfaenger": {
              "type": "string"
            },
            "betrag": {
              "type": "number"
            },
            "anteil_ag": {
              "type": "number"
            },
            "start": {
              "type": "string",
              "format": "date"
            },
            "vertragsnr": {
              "type": "string"
            },
            "iban": {
              "type": "string"
            },
            "bic": {
              "type": "string"
            }
          }
        },
        "arbeitsvertrag": {
          "type": "boolean"
        },
        "bescheinigung_lstabzug": {
          "type": "boolean"
        },
        "sv_ausweis": {
          "type": "boolean"
        },
        "kk_mitglied": {
          "type": "boolean"
        },
        "pkv_bescheinigung": {
          "type": "boolean"
        },
        "vwl_vertrag": {
          "type": "boolean"
        },
        "elterneigenschaft_nachweis": {
          "type": "boolean"
        },
        "betriebliche_altersversorgung": {
          "type": "boolean"
        },
        "schwerbehindertenausweis": {
          "type": "boolean"
        },
        "sozialkasse_unterlagen": {
          "type": "boolean"
        },
        "vorbeschäftigungen": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "von": {
                "type": "string",
                "format": "date"
              },
              "bis": {
                "type": "string",
                "format": "date"
              },
              "beschäftigungsart": {
                "type": "string"
              },
              "beschäftigungstage": {
                "type": "number"
              }
            }
          }
        },
        "erklaerung_arbeitnehmer": {
          "type": "boolean",
          "description": " Ich versichere, dass die vorstehenden Angaben der Wahrheit entsprechen. Ich\nverpflichte mich, meinem Arbeitgeber alle Änderungen, insbesondere in Bezug auf weitere Beschäftigungen (in Bezug auf\nArt, Dauer und Entgelt) unverzüglich mitzuteilen. "
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/familienname"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/strasse",
                      "label": "Straße und Hausnummer"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/geburtsdatum"
                    }
                  ]
                },
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/vorname"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/plz_ort",
                      "label": "PLZ, Ort"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/geschlecht"
                    }
                  ]
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/versicherungsnr",
                  "label": "Versicherungsnummer"
                },
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/familienstand"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/familienstand_anderes",
                      "label": "anderer Familienstand",
                      "rule": {
                        "effect": "SHOW",
                        "condition": {
                          "scope": "#/properties/familienstand",
                          "schema": {
                            "const": "anderes"
                          }
                        }
                      }
                    }
                  ]
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/geburtsort",
                  "options": {
                    "showUnfocusedDescription": true
                  },
                  "rule": {
                    "effect": "DISABLE",
                    "condition": {
                      "scope": "#",
                      "schema": {
                        "required": [
                          "versicherungsnr"
                        ]
                      }
                    }
                  }
                },
                {
                  "type": "Control",
                  "scope": "#/properties/schwerbehindert"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/staatsangehörigkeit"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/kontonr",
                      "label": "Kontonummer (IBAN)"
                    }
                  ]
                },
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/blz",
                      "label": "Bankleitzahl (BIC)"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/arbeitnehmernr"
                    }
                  ]
                }
              ]
            }
          ],
          "label": "Persönliche Angaben"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/eintrittsdatum"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/ersteintrittsdatum"
                    }
                  ]
                },
                {
                  "type": "Control",
                  "scope": "#/properties/betriebsstätte",
                  "label": "Betriebsstätte"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/berufsbezeichnung"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/tätigkeit",
                  "label": "Ausgeübte Tätigkeit"
                }
              ]
            },
            {
              "type": "Control",
              "scope": "#/properties/beschäftigung"
            },
            {
              "type": "Control",
              "scope": "#/properties/weitere_beschäftigungen",
              "label": "Weitere Beschäftigungen",
              "options": {
                "showUnfocusedDescription": true
              }
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/schulabschluss_hoehst",
                  "label": "Höchster Schulabschluss"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/berufsausbildung_hoest",
                  "label": "Höchste Berufsausbildung"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/ausbildung_start",
                  "label": "Beginn der Ausbildung: "
                },
                {
                  "type": "Control",
                  "scope": "#/properties/ausbildung_ende",
                  "label": "Voraussichtliches Ende der Ausbildung: "
                },
                {
                  "type": "Control",
                  "scope": "#/properties/baugewerbe_beschäftigt",
                  "label": "Im Baugewerbe beschäftigt seit "
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/wochen_arbeitszeit",
                  "label": "Wöchentliche Arbeitszeit"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/arbeitszeit_verteilung",
                  "label": "Ggf.Verteilung d. wöchentl. Arbeitszeit (Std.)"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/urlaubsanspruch"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/kostenstelle"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/abteilungsnr"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/personengruppe"
                }
              ]
            }
          ],
          "label": "Beschäftigung"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/befristet"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/zweckbefristet"
                    }
                  ]
                },
                {
                  "type": "Control",
                  "scope": "#/properties/befristet_bis",
                  "rule": {
                    "effect": "ENABLE",
                    "condition": {
                      "type": "OR",
                      "conditions": [
                        {
                          "scope": "#/properties/befristet",
                          "schema": {
                            "const": true
                          }
                        },
                        {
                          "scope": "#/properties/zweckbefristet",
                          "schema": {
                            "const": true
                          }
                        }
                      ]
                    }
                  },
                  "label": "Befristung Arbeitsvertrag zum"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/abschluss_befristung",
                  "options": {
                    "showUnfocusedDescription": true
                  }
                },
                {
                  "type": "Control",
                  "scope": "#/properties/abschluss_am",
                  "label": "Abschluss Arbeitsvertrag am",
                  "rule": {
                    "effect": "ENABLE",
                    "condition": {
                      "scope": "#/properties/abschluss_befristung",
                      "schema": {
                        "const": true
                      }
                    }
                  }
                }
              ]
            },
            {
              "type": "Control",
              "scope": "#/properties/befristung_weiter",
              "options": {
                "showUnfocusedDescription": true
              }
            }
          ],
          "label": "Befristung"
        },
        {
          "type": "Label",
          "text": "Weitere Angaben"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/identifikationsnr"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/finanzamtnr"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/steuerklasse"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/kinderfreibeträge"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/konfession"
                }
              ]
            }
          ],
          "label": "Steuer"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/krankenkasse"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/elterneigenschaft"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/kv"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/rv"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/av"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/pv"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/uv"
                }
              ]
            }
          ],
          "label": "Sozialversicherung"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/entlohnung"
            }
          ],
          "label": "Entlohnung"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/vwl/properties/empfaenger",
                  "label": "Empfänger",
                  "options": {
                    "multi": true
                  }
                },
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/vwl/properties/betrag",
                          "label": "Betrag"
                        },
                        {
                          "type": "Control",
                          "scope": "#/properties/vwl/properties/anteil_ag",
                          "label": "AG-Anteil (Höhe mtl.) "
                        }
                      ]
                    },
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/vwl/properties/start"
                        },
                        {
                          "type": "Control",
                          "scope": "#/properties/vwl/properties/vertragsnr",
                          "label": "Vertragsnr"
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
                  "type": "Control",
                  "scope": "#/properties/vwl/properties/iban",
                  "label": "Kontonummer (IBAN)"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/vwl/properties/bic",
                  "label": "Bankleitzahl (BIC) "
                }
              ]
            }
          ],
          "label": "VWL"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/arbeitsvertrag"
            },
            {
              "type": "Control",
              "scope": "#/properties/bescheinigung_lstabzug",
              "label": "Bescheinigung über LSt.-Abzug"
            },
            {
              "type": "Control",
              "scope": "#/properties/sv_ausweis",
              "label": "SV Ausweis"
            },
            {
              "type": "Control",
              "scope": "#/properties/kk_mitglied",
              "label": "Mitgliedsbescheinigung Krankenkasse"
            },
            {
              "type": "Control",
              "scope": "#/properties/pkv_bescheinigung",
              "label": "Bescheinigung zur privaten Krankenversicherung "
            },
            {
              "type": "Control",
              "scope": "#/properties/vwl_vertrag"
            },
            {
              "type": "Control",
              "scope": "#/properties/elterneigenschaft_nachweis",
              "label": "Nachweis Elterneigenschaft "
            },
            {
              "type": "Control",
              "scope": "#/properties/betriebliche_altersversorgung",
              "label": "Vertrag Betriebliche Altersversorgung"
            },
            {
              "type": "Control",
              "scope": "#/properties/schwerbehindertenausweis"
            },
            {
              "type": "Control",
              "scope": "#/properties/sozialkasse_unterlagen",
              "label": "Unterlagen Sozialkasse Bau/Maler "
            }
          ],
          "label": "Angaben zu den Arbeitspapieren "
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/vorbeschäftigungen"
            }
          ],
          "label": "Angaben zu steuerpflichtigen Vorbeschäftigungszeiten im laufenden Kalenderjahr"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/erklaerung_arbeitnehmer",
              "label": "Erklärung des Arbeitnehmers:",
              "options": {
                "showUnfocusedDescription": true
              }
            }
          ]
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.rules",
    "label": "FormBuilder - rules",
    "schema": {
      "type": "object",
      "properties": {
        "boolean": {
          "type": "boolean"
        },
        "string": {
          "type": "string"
        },
        "enum": {
          "type": "string",
          "enum": [
            "off",
            "on",
            "true",
            "false"
          ]
        },
        "integer": {
          "type": "integer"
        },
        "array": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "object": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "country": {
              "type": "string"
            }
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/boolean"
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#/properties/boolean",
                      "schema": {
                        "const": true
                      }
                    }
                  }
                }
              ]
            }
          ],
          "label": "Boolean equals const"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/string",
                  "label": "enter \"on\" to match the rule"
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#/properties/string",
                      "schema": {
                        "const": "on"
                      }
                    }
                  }
                }
              ]
            }
          ],
          "label": "String equals const"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/string",
                  "label": "enter \"on\" or \"true\" to match the rule"
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#/properties/string",
                      "schema": {
                        "enum": [
                          "on",
                          "true"
                        ]
                      }
                    }
                  }
                }
              ]
            }
          ],
          "label": "String equals enum"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/enum",
                  "label": "select \"on\" to match the rule"
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#/properties/enum",
                      "schema": {
                        "const": "on"
                      }
                    }
                  }
                }
              ]
            }
          ],
          "label": "Enum equals const"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/string",
                  "label": "enter \"two letters followed by three numbers\" to match the rule"
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#",
                      "schema": {
                        "properties": {
                          "string": {
                            "pattern": "^\\w{2}\\d{3}"
                          }
                        },
                        "required": [
                          "string"
                        ]
                      }
                    }
                  }
                }
              ]
            }
          ],
          "label": "String Pattern"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/string",
                  "label": "enter at least 3 signs to match the rule"
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#",
                      "schema": {
                        "properties": {
                          "string": {
                            "minLength": 3
                          }
                        },
                        "required": [
                          "string"
                        ]
                      }
                    }
                  }
                }
              ]
            }
          ],
          "label": "String minLength"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/enum",
                  "label": "select neither \"off\" nor \"false\" to match the rule"
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#",
                      "schema": {
                        "properties": {
                          "enum": {
                            "not": {
                              "enum": [
                                "off",
                                "false"
                              ]
                            }
                          }
                        },
                        "required": [
                          "enum"
                        ]
                      }
                    }
                  }
                }
              ]
            }
          ],
          "label": "String not"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/integer",
                  "label": "enter a number between 5 and 10 to match the rule"
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#",
                      "schema": {
                        "properties": {
                          "integer": {
                            "minimum": 5,
                            "exclusiveMaximum": 10
                          }
                        },
                        "required": [
                          "integer"
                        ]
                      }
                    }
                  }
                }
              ]
            }
          ],
          "label": "Number Minimum & exclusiveMaximum"
        },
        {
          "type": "Group",
          "label": "Rule Condition with type=Leaf and expectedValue",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/string",
                  "label": "enter \"on\" to match the rule"
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "type": "LEAF",
                      "scope": "#/properties/string",
                      "expectedValue": "on"
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/array",
                  "label": "create at least one entry with \"on\" to match the rule"
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#",
                      "schema": {
                        "properties": {
                          "array": {
                            "contains": {
                              "const": "on"
                            }
                          }
                        },
                        "required": [
                          "array"
                        ]
                      }
                    }
                  }
                }
              ]
            }
          ],
          "label": "Array contains const"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/array",
                  "label": "create at least 3 unique filled items to match the rule"
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#",
                      "schema": {
                        "properties": {
                          "array": {
                            "minItems": 3,
                            "uniqueItems": true,
                            "items": {
                              "minLength": 1
                            }
                          }
                        },
                        "required": [
                          "array"
                        ]
                      }
                    }
                  }
                }
              ]
            }
          ],
          "label": "Array minItems"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/boolean",
                      "label": "enable boolean",
                      "options": {
                        "toggle": true
                      }
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/string",
                      "label": "enter at least 3 charaters"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/integer",
                      "label": "enter a number greater then 3"
                    }
                  ]
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "condition": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "string": {
                            "type": "string",
                            "minLength": 3
                          },
                          "integer": {
                            "type": "integer",
                            "minimum": 3
                          },
                          "boolean": {
                            "const": true
                          }
                        },
                        "required": [
                          "string",
                          "integer",
                          "boolean"
                        ]
                      },
                      "scope": "#"
                    },
                    "effect": "SHOW"
                  }
                }
              ]
            }
          ],
          "label": "Several Schema Conditions"
        },
        {
          "type": "Group",
          "label": "Rule Schema with $ref",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/boolean",
                  "label": "enable boolean",
                  "options": {
                    "toggle": true
                  }
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#",
                      "schema": {
                        "definitions": {
                          "defBoolean": {
                            "const": true
                          }
                        },
                        "properties": {
                          "boolean": {
                            "$ref": "#/definitions/defBoolean"
                          }
                        },
                        "required": [
                          "boolean"
                        ]
                      }
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "Group",
          "label": "Rule Schema with type=object  ",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/object/properties/name",
                      "label": "enter a name with more then 3 characters"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/object/properties/country",
                      "label": "enter DE or US as country"
                    }
                  ]
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#",
                      "schema": {
                        "type": "object",
                        "properties": {
                          "object": {
                            "type": "object",
                            "properties": {
                              "name": {
                                "minLength": 3
                              },
                              "country": {
                                "enum": [
                                  "DE",
                                  "US"
                                ]
                              }
                            },
                            "required": [
                              "name",
                              "country"
                            ]
                          }
                        },
                        "required": [
                          "object"
                        ]
                      }
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "Group",
          "label": "Rule Schema with oneOf",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/string",
                  "label": "Enter foo or bar to to match the rule "
                },
                {
                  "type": "Label",
                  "text": "Rule was successful",
                  "rule": {
                    "effect": "SHOW",
                    "condition": {
                      "scope": "#",
                      "schema": {
                        "type": "object",
                        "properties": {
                          "string": {
                            "oneOf": [
                              {
                                "const": "foo"
                              },
                              {
                                "const": "bar"
                              }
                            ]
                          }
                        },
                        "required": [
                          "string"
                        ]
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
    "data": {}
  },
  {
    "name": "fb.styles",
    "label": "FormBuilder - styles",
    "schema": {
      "type": "object",
      "properties": {
        "text": {
          "type": "string",
          "title": "very large textarea",
          "description": "a very good description text"
        },
        "control5": {
          "const": true
        },
        "control4": {
          "type": "string",
          "enum": [
            "foobar"
          ]
        },
        "control7": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "control11": {
                "type": "string"
              }
            }
          }
        },
        "control9": {
          "type": "object",
          "properties": {
            "control10": {
              "type": "string"
            }
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Label",
          "text": "Styling Example",
          "options": {
            "styles": {
              "label": {
                "root": "label-element m-4 p-2 !bg-yellow-400 !text-4xl font-bold !text-lime-400"
              }
            }
          }
        },
        {
          "type": "Categorization",
          "elements": [
            {
              "type": "Category",
              "elements": [
                {
                  "type": "Group",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/text",
                      "options": {
                        "multi": true,
                        "showUnfocusedDescription": true,
                        "styles": {
                          "control": {
                            "label": "label font-bold !tracking-widest !text-xl",
                            "textarea": "text-area font-mono font-bold !text-2xl text-lg h-80 text-blue-500 !bg-blue-100",
                            "description": "description bg-black !text-white p-4"
                          }
                        }
                      }
                    }
                  ],
                  "label": "a Group",
                  "options": {
                    "styles": {
                      "group": {
                        "root": "group !bg-yellow-200 rounded-lg",
                        "label": "group-label !bg-yellow-400 rounded-xl text-center font-bold",
                        "item": "group-item px-4"
                      }
                    }
                  }
                }
              ],
              "label": "Textarea"
            },
            {
              "type": "Category",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/control5",
                  "options": {
                    "styles": {
                      "control": {
                        "label": "label !text-red-500 !text-2xl !bg-yellow-300 block"
                      }
                    }
                  }
                },
                {
                  "type": "Control",
                  "scope": "#/properties/control4",
                  "options": {
                    "styles": {
                      "control": {
                        "label": "label !text-blue-500 !text-2xl"
                      }
                    }
                  }
                }
              ],
              "label": "Control"
            },
            {
              "type": "Category",
              "elements": [
                {
                  "type": "Label",
                  "text": "Array"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/control7",
                  "options": {
                    "styles": {
                      "arrayList": {
                        "root": "array-list !bg-yellow-500/50 !text-blue-500",
                        "label": "array-list-label font-mono !text-2xl !text-green-500/50",
                        "noData": "array-list-no-data !bg-red-500 !text-white"
                      }
                    }
                  }
                },
                {
                  "type": "Label",
                  "text": "Object"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/control9"
                }
              ],
              "label": "Array & Object"
            }
          ],
          "options": {
            "styles": {
              "categorization": {
                "root": "categorization p-2 border border-red-500 bg-red-50",
                "category": "tabs gap-10 !border-red-500",
                "panel": "panel border !border-red-500 p-4 bg-red-200/50",
                "selected": "selected !bg-red-800 !text-white"
              }
            }
          }
        }
      ],
      "options": {
        "styles": {
          "verticalLayout": {
            "root": "vertical-layout p-4 border-4 border-dotted border-blue-500 shadow-xl m-4 p-2"
          }
        }
      }
    },
    "data": {
      "text": "Lorem ipsum"
    }
  },
  {
    "name": "fb.styles.more",
    "label": "FormBuilder - styles Layout",
    "schema": {
      "type": "object",
      "properties": {
        "text": {
          "type": "string"
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Label",
          "text": "VerticalLayout with custom css class \"horizontalFirstChildOneQuarter\"",
          "options": {
            "styles": {
              "label": {
                "root": "!text-2xl !text-bold"
              }
            }
          }
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Label",
              "text": "Effortlessly design visually appealing website layouts with our tool."
            },
            {
              "type": "Control",
              "scope": "#/properties/text"
            }
          ]
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Label",
              "text": "You can get started on your design in no time and other design elements to your canvas and customize them to your liking.  Whether you're a seasoned designer or just starting out."
            },
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/text"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/text",
                  "options": {
                    "multi": true
                  }
                }
              ],
              "label": "Group"
            }
          ]
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Label",
              "text": "With our drag and drop functionality, you can quickly add images, text boxes, and other design elements to your canvas and customize them to your liking. And with a variety of pre-built templates and layouts to choose from, you can get started on your design in no time."
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/text"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/text",
                  "options": {
                    "multi": true
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Label",
              "text": "Our layout creation tool is the perfect solution for anyone looking to create stunning layouts for their projects with ease. Whether you're a seasoned designer or just starting out, our intuitive interface and powerful tools make it easy to arrange and showcase your content in a visually appealing way."
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/text"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/text",
                  "options": {
                    "multi": true
                  }
                },
                {
                  "type": "Control",
                  "scope": "#/properties/text"
                }
              ]
            }
          ]
        }
      ],
      "options": {
        "styles": {
          "verticalLayout": {
            "root": "vertical-layout horizontalFirstChildOneQuarter"
          }
        }
      }
    },
    "data": {}
  },
  {
    "name": "tabsInTabs",
    "label": "FormBuilder - Tabs in Tabs //:TODO - remove to own package",
    "data": {},
    "schema": {
      "properties": {
        "checkbox1": {
          "type": "boolean"
        },
        "text1": {
          "type": "number"
        },
        "text2": {
          "type": "string"
        },
        "textarea1": {
          "type": "string"
        }
      },
      "type": "object"
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Categorization",
          "elements": [
            {
              "type": "Category",
              "elements": [
                {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "label": "checkbox",
                      "scope": "#/properties/checkbox1",
                      "type": "Control"
                    },
                    {
                      "label": "text",
                      "scope": "#/properties/text2",
                      "type": "Control"
                    }
                  ]
                }
              ],
              "label": "Basics"
            },
            {
              "elements": [
                {
                  "elements": [
                    {
                      "elements": [
                        {
                          "elements": [
                            {
                              "label": "text",
                              "scope": "#/properties/text1",
                              "type": "Control"
                            }
                          ],
                          "label": "Text",
                          "type": "Category"
                        },
                        {
                          "elements": [
                            {
                              "label": "textarea",
                              "options": {
                                "multi": true
                              },
                              "scope": "#/properties/textarea1",
                              "type": "Control"
                            }
                          ],
                          "label": "Textarea",
                          "type": "Category"
                        }
                      ],
                      "type": "Categorization"
                    }
                  ],
                  "label": "Mehr Text",
                  "type": "Group"
                }
              ],
              "label": "Details",
              "type": "Category"
            }
          ]
        }
      ]
    }
  },
  {
    "name": "fb.jsonschema.cerbos_policy",
    "label": "FormBuilder JsonSchema - cerbos_policy",
    "schema": {
      "$id": "https://api.cerbos.dev/v0.26.0/cerbos/policy/v1/Policy.schema.json",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "definitions": {
        "cerbos.policy.v1.Condition": {
          "allOf": [
            {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "match": {
                  "$ref": "#/definitions/cerbos.policy.v1.Match"
                },
                "script": {
                  "type": "string"
                }
              }
            },
            {
              "oneOf": [
                {
                  "type": "object",
                  "required": [
                    "match"
                  ]
                },
                {
                  "type": "object",
                  "required": [
                    "script"
                  ]
                }
              ]
            }
          ]
        },
        "cerbos.policy.v1.DerivedRoles": {
          "type": "object",
          "required": [
            "name",
            "definitions"
          ],
          "additionalProperties": false,
          "properties": {
            "definitions": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/cerbos.policy.v1.RoleDef"
              },
              "minItems": 1
            },
            "name": {
              "type": "string",
              "minLength": 1,
              "pattern": "^[\\--\\.0-9A-Z_a-z]+$"
            }
          }
        },
        "cerbos.policy.v1.Match": {
          "allOf": [
            {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "all": {
                  "$ref": "#/definitions/cerbos.policy.v1.Match.ExprList"
                },
                "any": {
                  "$ref": "#/definitions/cerbos.policy.v1.Match.ExprList"
                },
                "expr": {
                  "type": "string"
                },
                "none": {
                  "$ref": "#/definitions/cerbos.policy.v1.Match.ExprList"
                }
              }
            },
            {
              "oneOf": [
                {
                  "type": "object",
                  "required": [
                    "all"
                  ]
                },
                {
                  "type": "object",
                  "required": [
                    "any"
                  ]
                },
                {
                  "type": "object",
                  "required": [
                    "none"
                  ]
                },
                {
                  "type": "object",
                  "required": [
                    "expr"
                  ]
                }
              ]
            }
          ]
        },
        "cerbos.policy.v1.Match.ExprList": {
          "type": "object",
          "required": [
            "of"
          ],
          "additionalProperties": false,
          "properties": {
            "of": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/cerbos.policy.v1.Match"
              },
              "minItems": 1
            }
          }
        },
        "cerbos.policy.v1.Metadata": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "annotations": {
              "type": "object",
              "additionalProperties": {
                "type": "string"
              }
            },
            "hash": {
              "oneOf": [
                {
                  "type": "integer",
                  "minimum": 0
                },
                {
                  "type": "string",
                  "pattern": "^(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?$"
                }
              ]
            },
            "sourceFile": {
              "type": "string"
            },
            "storeIdentifer": {
              "type": "string"
            },
            "storeIdentifier": {
              "type": "string"
            }
          }
        },
        "cerbos.policy.v1.PrincipalPolicy": {
          "type": "object",
          "required": [
            "principal",
            "version"
          ],
          "additionalProperties": false,
          "properties": {
            "principal": {
              "type": "string",
              "minLength": 1,
              "pattern": "^[A-Za-z][\\--\\.0-9@-Z_a-z]*(:[A-Za-z][\\--\\.0-9@-Z_a-z]*)*$"
            },
            "rules": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/cerbos.policy.v1.PrincipalRule"
              }
            },
            "scope": {
              "type": "string",
              "pattern": "^([0-9A-Za-z][\\-0-9A-Z_a-z]*(\\.[\\-0-9A-Z_a-z]*)*)*$"
            },
            "version": {
              "type": "string",
              "pattern": "^[0-9A-Z_a-z]+$"
            }
          }
        },
        "cerbos.policy.v1.PrincipalRule": {
          "type": "object",
          "required": [
            "resource",
            "actions"
          ],
          "additionalProperties": false,
          "properties": {
            "actions": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/cerbos.policy.v1.PrincipalRule.Action"
              },
              "minItems": 1
            },
            "resource": {
              "type": "string",
              "minLength": 1
            }
          }
        },
        "cerbos.policy.v1.PrincipalRule.Action": {
          "type": "object",
          "required": [
            "action",
            "effect"
          ],
          "additionalProperties": false,
          "properties": {
            "action": {
              "type": "string",
              "minLength": 1
            },
            "condition": {
              "$ref": "#/definitions/cerbos.policy.v1.Condition"
            },
            "effect": {
              "type": "string",
              "enum": [
                "EFFECT_ALLOW",
                "EFFECT_DENY"
              ]
            },
            "name": {
              "type": "string",
              "pattern": "^([A-Za-z][\\--\\.0-9@-Z_a-z]*)*$"
            }
          }
        },
        "cerbos.policy.v1.ResourcePolicy": {
          "type": "object",
          "required": [
            "resource",
            "version"
          ],
          "additionalProperties": false,
          "properties": {
            "importDerivedRoles": {
              "type": "array",
              "items": {
                "type": "string",
                "pattern": "^[\\--\\.0-9A-Z_a-z]+$"
              },
              "uniqueItems": true
            },
            "resource": {
              "type": "string",
              "minLength": 1,
              "pattern": "^[A-Za-z][\\--9@-Z_a-z]*(:[A-Za-z][\\--9@-Z_a-z]*)*$"
            },
            "rules": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/cerbos.policy.v1.ResourceRule"
              }
            },
            "schemas": {
              "$ref": "#/definitions/cerbos.policy.v1.Schemas"
            },
            "scope": {
              "type": "string",
              "pattern": "^([0-9A-Za-z][\\-0-9A-Z_a-z]*(\\.[\\-0-9A-Z_a-z]*)*)*$"
            },
            "version": {
              "type": "string",
              "pattern": "^[0-9A-Z_a-z]+$"
            }
          }
        },
        "cerbos.policy.v1.ResourceRule": {
          "type": "object",
          "required": [
            "actions",
            "effect"
          ],
          "additionalProperties": false,
          "properties": {
            "actions": {
              "type": "array",
              "items": {
                "type": "string",
                "minLength": 1
              },
              "minItems": 1,
              "uniqueItems": true
            },
            "condition": {
              "$ref": "#/definitions/cerbos.policy.v1.Condition"
            },
            "derivedRoles": {
              "type": "array",
              "items": {
                "type": "string",
                "pattern": "^[\\--\\.0-9A-Z_a-z]+$"
              },
              "uniqueItems": true
            },
            "effect": {
              "type": "string",
              "enum": [
                "EFFECT_ALLOW",
                "EFFECT_DENY"
              ]
            },
            "name": {
              "type": "string",
              "pattern": "^([A-Za-z][\\--\\.0-9@-Z_a-z]*)*$"
            },
            "roles": {
              "type": "array",
              "items": {
                "type": "string",
                "pattern": "^([\\--\\.0-9A-Z_a-z]+|\\*)$"
              },
              "uniqueItems": true
            }
          }
        },
        "cerbos.policy.v1.RoleDef": {
          "type": "object",
          "required": [
            "name",
            "parentRoles"
          ],
          "additionalProperties": false,
          "properties": {
            "condition": {
              "$ref": "#/definitions/cerbos.policy.v1.Condition"
            },
            "name": {
              "type": "string",
              "pattern": "^[\\--\\.0-9A-Z_a-z]+$"
            },
            "parentRoles": {
              "type": "array",
              "items": {
                "type": "string",
                "pattern": "^([\\--\\.0-9A-Z_a-z]+|\\*)$"
              },
              "minItems": 1,
              "uniqueItems": true
            }
          }
        },
        "cerbos.policy.v1.Schemas": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "principalSchema": {
              "$ref": "#/definitions/cerbos.policy.v1.Schemas.Schema"
            },
            "resourceSchema": {
              "$ref": "#/definitions/cerbos.policy.v1.Schemas.Schema"
            }
          }
        },
        "cerbos.policy.v1.Schemas.IgnoreWhen": {
          "type": "object",
          "required": [
            "actions"
          ],
          "additionalProperties": false,
          "properties": {
            "actions": {
              "type": "array",
              "items": {
                "type": "string",
                "minLength": 1
              },
              "minItems": 1,
              "uniqueItems": true
            }
          }
        },
        "cerbos.policy.v1.Schemas.Schema": {
          "type": "object",
          "required": [
            "ref"
          ],
          "additionalProperties": false,
          "properties": {
            "ignoreWhen": {
              "$ref": "#/definitions/cerbos.policy.v1.Schemas.IgnoreWhen"
            },
            "ref": {
              "type": "string",
              "minLength": 1
            }
          }
        }
      },
      "allOf": [
        {
          "type": "object",
          "required": [
            "apiVersion"
          ],
          "additionalProperties": false,
          "properties": {
            "apiVersion": {
              "type": "string",
              "const": "api.cerbos.dev/v1"
            },
            "derivedRoles": {
              "$ref": "#/definitions/cerbos.policy.v1.DerivedRoles"
            },
            "description": {
              "type": "string"
            },
            "disabled": {
              "type": "boolean"
            },
            "metadata": {
              "$ref": "#/definitions/cerbos.policy.v1.Metadata"
            },
            "principalPolicy": {
              "$ref": "#/definitions/cerbos.policy.v1.PrincipalPolicy"
            },
            "resourcePolicy": {
              "$ref": "#/definitions/cerbos.policy.v1.ResourcePolicy"
            },
            "variables": {
              "type": "object",
              "additionalProperties": {
                "type": "string"
              }
            }
          }
        },
        {
          "oneOf": [
            {
              "type": "object",
              "required": [
                "resourcePolicy"
              ]
            },
            {
              "type": "object",
              "required": [
                "principalPolicy"
              ]
            },
            {
              "type": "object",
              "required": [
                "derivedRoles"
              ]
            }
          ]
        }
      ]
    },
    "uischema": false,
    "data": {}
  },
  {
    "name": "fb.jsonschema.changeset",
    "label": "FormBuilder JsonSchema - changeset",
    "schema": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "ChangesetSpec",
      "description": "A changeset specification, which describes a changeset to be created or an existing changeset to be tracked.",
      "type": "object",
      "oneOf": [
        {
          "title": "ExistingChangesetSpec",
          "type": "object",
          "properties": {
            "version": {
              "type": "integer",
              "description": "A field for versioning the payload."
            },
            "baseRepository": {
              "type": "string",
              "description": "The GraphQL ID of the repository that contains the existing changeset on the code host.",
              "examples": [
                "UmVwb3NpdG9yeTo5Cg=="
              ]
            },
            "externalID": {
              "type": "string",
              "description": "The ID that uniquely identifies the existing changeset on the code host",
              "examples": [
                "3912",
                "12"
              ]
            }
          },
          "required": [
            "baseRepository",
            "externalID"
          ],
          "additionalProperties": false
        },
        {
          "title": "BranchChangesetSpec",
          "type": "object",
          "properties": {
            "version": {
              "type": "integer",
              "description": "A field for versioning the payload."
            },
            "baseRepository": {
              "type": "string",
              "description": "The GraphQL ID of the repository that this changeset spec is proposing to change.",
              "examples": [
                "UmVwb3NpdG9yeTo5Cg=="
              ]
            },
            "baseRef": {
              "type": "string",
              "description": "The full name of the Git ref in the base repository that this changeset is based on (and is proposing to be merged into). This ref must exist on the base repository.",
              "pattern": "^refs\\/heads\\/\\S+$",
              "examples": [
                "refs/heads/master"
              ]
            },
            "baseRev": {
              "type": "string",
              "description": "The base revision this changeset is based on. It is the latest commit in baseRef at the time when the changeset spec was created.",
              "examples": [
                "4095572721c6234cd72013fd49dff4fb48f0f8a4"
              ]
            },
            "headRepository": {
              "type": "string",
              "description": "The GraphQL ID of the repository that contains the branch with this changeset's changes. Fork repositories and cross-repository changesets are not yet supported. Therefore, headRepository must be equal to baseRepository.",
              "examples": [
                "UmVwb3NpdG9yeTo5Cg=="
              ]
            },
            "headRef": {
              "type": "string",
              "description": "The full name of the Git ref that holds the changes proposed by this changeset. This ref will be created or updated with the commits.",
              "pattern": "^refs\\/heads\\/\\S+$",
              "examples": [
                "refs/heads/fix-foo"
              ]
            },
            "title": {
              "type": "string",
              "description": "The title of the changeset on the code host."
            },
            "body": {
              "type": "string",
              "description": "The body (description) of the changeset on the code host."
            },
            "commits": {
              "type": "array",
              "description": "The Git commits with the proposed changes. These commits are pushed to the head ref.",
              "minItems": 1,
              "maxItems": 1,
              "items": {
                "title": "GitCommitDescription",
                "type": "object",
                "description": "The Git commit to create with the changes.",
                "additionalProperties": false,
                "required": [
                  "message",
                  "diff",
                  "authorName",
                  "authorEmail"
                ],
                "properties": {
                  "version": {
                    "type": "integer",
                    "description": "A field for versioning the payload."
                  },
                  "message": {
                    "type": "string",
                    "description": "The Git commit message."
                  },
                  "diff": {
                    "type": "string",
                    "description": "The commit diff (in unified diff format)."
                  },
                  "authorName": {
                    "type": "string",
                    "description": "The Git commit author name."
                  },
                  "authorEmail": {
                    "type": "string",
                    "format": "email",
                    "description": "The Git commit author email."
                  }
                }
              }
            },
            "published": {
              "oneOf": [
                {
                  "type": "boolean"
                },
                {
                  "type": "string",
                  "pattern": "^draft$"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Whether to publish the changeset. An unpublished changeset can be previewed on Sourcegraph by any person who can view the batch change, but its commit, branch, and pull request aren't created on the code host. A published changeset results in a commit, branch, and pull request being created on the code host."
            }
          },
          "required": [
            "baseRepository",
            "baseRef",
            "baseRev",
            "headRepository",
            "headRef",
            "title",
            "body",
            "commits"
          ],
          "additionalProperties": false
        }
      ]
    },
    "uischema": false,
    "data": {}
  },
  {
    "name": "fb.jsonschema.draft07",
    "label": "FormBuilder JsonSchema - draft07",
    "schema": {
      "$id": "http://json-schema.org/draft-07/schema#",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "default": true,
      "definitions": {
        "nonNegativeInteger": {
          "minimum": 0,
          "type": "integer"
        },
        "nonNegativeIntegerDefault0": {
          "allOf": [
            {
              "$ref": "#/definitions/nonNegativeInteger"
            },
            {
              "default": 0
            }
          ]
        },
        "schemaArray": {
          "items": {
            "$ref": "#"
          },
          "minItems": 1,
          "type": "array"
        },
        "simpleTypes": {
          "enum": [
            "array",
            "boolean",
            "integer",
            "null",
            "number",
            "object",
            "string"
          ]
        },
        "stringArray": {
          "default": [],
          "items": {
            "type": "string"
          },
          "type": "array",
          "uniqueItems": true
        }
      },
      "properties": {
        "$comment": {
          "type": "string"
        },
        "$id": {
          "format": "uri-reference",
          "type": "string"
        },
        "$ref": {
          "format": "uri-reference",
          "type": "string"
        },
        "$schema": {
          "format": "uri",
          "type": "string"
        },
        "additionalItems": {
          "$ref": "#"
        },
        "additionalProperties": {
          "$ref": "#"
        },
        "allOf": {
          "$ref": "#/definitions/schemaArray"
        },
        "anyOf": {
          "$ref": "#/definitions/schemaArray"
        },
        "const": true,
        "contains": {
          "$ref": "#"
        },
        "contentEncoding": {
          "type": "string"
        },
        "contentMediaType": {
          "type": "string"
        },
        "default": true,
        "definitions": {
          "additionalProperties": {
            "$ref": "#"
          },
          "default": {},
          "type": "object"
        },
        "dependencies": {
          "additionalProperties": {
            "anyOf": [
              {
                "$ref": "#"
              },
              {
                "$ref": "#/definitions/stringArray"
              }
            ]
          },
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "else": {
          "$ref": "#"
        },
        "enum": {
          "items": true,
          "minItems": 1,
          "type": "array",
          "uniqueItems": true
        },
        "examples": {
          "items": true,
          "type": "array"
        },
        "exclusiveMaximum": {
          "type": "number"
        },
        "exclusiveMinimum": {
          "type": "number"
        },
        "format": {
          "type": "string"
        },
        "if": {
          "$ref": "#"
        },
        "items": {
          "anyOf": [
            {
              "$ref": "#"
            },
            {
              "$ref": "#/definitions/schemaArray"
            }
          ],
          "default": true
        },
        "maxItems": {
          "$ref": "#/definitions/nonNegativeInteger"
        },
        "maxLength": {
          "$ref": "#/definitions/nonNegativeInteger"
        },
        "maxProperties": {
          "$ref": "#/definitions/nonNegativeInteger"
        },
        "maximum": {
          "type": "number"
        },
        "minItems": {
          "$ref": "#/definitions/nonNegativeIntegerDefault0"
        },
        "minLength": {
          "$ref": "#/definitions/nonNegativeIntegerDefault0"
        },
        "minProperties": {
          "$ref": "#/definitions/nonNegativeIntegerDefault0"
        },
        "minimum": {
          "type": "number"
        },
        "multipleOf": {
          "exclusiveMinimum": 0,
          "type": "number"
        },
        "not": {
          "$ref": "#"
        },
        "oneOf": {
          "$ref": "#/definitions/schemaArray"
        },
        "pattern": {
          "format": "regex",
          "type": "string"
        },
        "patternProperties": {
          "additionalProperties": {
            "$ref": "#"
          },
          "default": {},
          "propertyNames": {
            "format": "regex"
          },
          "type": "object"
        },
        "properties": {
          "additionalProperties": {
            "$ref": "#"
          },
          "default": {},
          "type": "object"
        },
        "propertyNames": {
          "$ref": "#"
        },
        "readOnly": {
          "default": false,
          "type": "boolean"
        },
        "required": {
          "$ref": "#/definitions/stringArray"
        },
        "then": {
          "$ref": "#"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "anyOf": [
            {
              "$ref": "#/definitions/simpleTypes"
            },
            {
              "items": {
                "$ref": "#/definitions/simpleTypes"
              },
              "minItems": 1,
              "type": "array",
              "uniqueItems": true
            }
          ]
        },
        "uniqueItems": {
          "default": false,
          "type": "boolean"
        }
      },
      "title": "Core schema meta-schema",
      "type": [
        "object",
        "boolean"
      ]
    },
    "uischema": false,
    "data": {}
  },
  {
    "name": "fb.jsonschema.github",
    "label": "FormBuilder JsonSchema - github",
    "schema": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "github.schema.json#",
      "title": "GitHubConnection",
      "description": "Configuration for a connection to GitHub or GitHub Enterprise.",
      "allowComments": true,
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "description": "URL of a GitHub instance, such as https://github.com or https://github-enterprise.example.com.",
          "type": "string",
          "not": {
            "type": "string",
            "pattern": "example\\.com"
          },
          "pattern": "^https?://",
          "format": "uri",
          "examples": [
            "https://github.com",
            "https://github-enterprise.example.com"
          ]
        },
        "gitURLType": {
          "description": "The type of Git URLs to use for cloning and fetching Git repositories on this GitHub instance.\n\nIf \"http\", Sourcegraph will access GitHub repositories using Git URLs of the form http(s)://github.com/myteam/myproject.git (using https: if the GitHub instance uses HTTPS).\n\nIf \"ssh\", Sourcegraph will access GitHub repositories using Git URLs of the form git@github.com:myteam/myproject.git. See the documentation for how to provide SSH private keys and known_hosts: https://docs.sourcegraph.com/admin/repo/auth#repositories-that-need-http-s-or-ssh-authentication.",
          "type": "string",
          "enum": [
            "http",
            "ssh"
          ],
          "default": "http"
        },
        "token": {
          "description": "A GitHub personal access token. Create one for GitHub.com at https://github.com/settings/tokens/new?description=Sourcegraph (for GitHub Enterprise, replace github.com with your instance's hostname). See https://docs.sourcegraph.com/admin/external_service/github#github-api-token-and-access for which scopes are required for which use cases.",
          "type": "string",
          "minLength": 1
        },
        "rateLimit": {
          "description": "Rate limit applied when making background API requests to GitHub.",
          "title": "GitHubRateLimit",
          "type": "object",
          "required": [
            "enabled",
            "requestsPerHour"
          ],
          "properties": {
            "enabled": {
              "description": "true if rate limiting is enabled.",
              "type": "boolean",
              "default": true
            },
            "requestsPerHour": {
              "description": "Requests per hour permitted. This is an average, calculated per second. Internally, the burst limit is set to 100, which implies that for a requests per hour limit as low as 1, users will continue to be able to send a maximum of 100 requests immediately, provided that the complexity cost of each request is 1.",
              "type": "number",
              "default": 5000,
              "minimum": 0
            }
          },
          "default": {
            "enabled": true,
            "requestsPerHour": 5000
          }
        },
        "certificate": {
          "description": "TLS certificate of the GitHub Enterprise instance. This is only necessary if the certificate is self-signed or signed by an internal CA. To get the certificate run `openssl s_client -connect HOST:443 -showcerts < /dev/null 2> /dev/null | openssl x509 -outform PEM`. To escape the value into a JSON string, you may want to use a tool like https://json-escape-text.now.sh.",
          "type": "string",
          "pattern": "^-----BEGIN CERTIFICATE-----\n",
          "examples": [
            "-----BEGIN CERTIFICATE-----\n..."
          ]
        },
        "repos": {
          "description": "An array of repository \"owner/name\" strings specifying which GitHub or GitHub Enterprise repositories to mirror on Sourcegraph.",
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[\\w-]+/[\\w.-]+$"
          },
          "examples": [
            [
              "owner/name"
            ],
            [
              "kubernetes/kubernetes",
              "golang/go",
              "facebook/react"
            ]
          ]
        },
        "orgs": {
          "description": "An array of organization names identifying GitHub organizations whose repositories should be mirrored on Sourcegraph.",
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[\\w-]+$"
          },
          "examples": [
            [
              "name"
            ],
            [
              "kubernetes",
              "golang",
              "facebook"
            ]
          ]
        },
        "webhooks": {
          "description": "An array of configurations defining existing GitHub webhooks that send updates back to Sourcegraph.",
          "deprecationMessage": "Deprecated in favour of first class webhooks. See https://docs.sourcegraph.com/admin/config/webhooks/incoming#deprecation-notice",
          "type": "array",
          "items": {
            "type": "object",
            "title": "GitHubWebhook",
            "required": [
              "org",
              "secret"
            ],
            "properties": {
              "org": {
                "description": "The name of the GitHub organization to which the webhook belongs",
                "type": "string",
                "minLength": 1
              },
              "secret": {
                "description": "The secret used when creating the webhook",
                "type": "string",
                "minLength": 1
              }
            }
          },
          "examples": [
            [
              {
                "org": "yourorgname",
                "secret": "webhook-secret"
              }
            ]
          ]
        },
        "exclude": {
          "description": "A list of repositories to never mirror from this GitHub instance. Takes precedence over \"orgs\", \"repos\", and \"repositoryQuery\" configuration.\n\nSupports excluding by name ({\"name\": \"owner/name\"}) or by ID ({\"id\": \"MDEwOlJlcG9zaXRvcnkxMTczMDM0Mg==\"}).\n\nNote: ID is the GitHub GraphQL ID, not the GitHub database ID. eg: \"curl https://api.github.com/repos/vuejs/vue | jq .node_id\"",
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "object",
            "title": "ExcludedGitHubRepo",
            "additionalProperties": false,
            "anyOf": [
              {
                "required": [
                  "name"
                ]
              },
              {
                "required": [
                  "id"
                ]
              },
              {
                "required": [
                  "pattern"
                ]
              },
              {
                "required": [
                  "forks"
                ]
              },
              {
                "required": [
                  "archived"
                ]
              }
            ],
            "properties": {
              "archived": {
                "description": "If set to true, archived repositories will be excluded.",
                "type": "boolean"
              },
              "forks": {
                "description": "If set to true, forks will be excluded.",
                "type": "boolean"
              },
              "name": {
                "description": "The name of a GitHub repository (\"owner/name\") to exclude from mirroring.",
                "type": "string",
                "pattern": "^[\\w-]+/[\\w.-]+$"
              },
              "id": {
                "description": "The node ID of a GitHub repository (as returned by the GitHub instance's API) to exclude from mirroring. Use this to exclude the repository, even if renamed. Note: This is the GraphQL ID, not the GitHub database ID. eg: \"curl https://api.github.com/repos/vuejs/vue | jq .node_id\"",
                "type": "string",
                "minLength": 1
              },
              "pattern": {
                "description": "Regular expression which matches against the name of a GitHub repository (\"owner/name\").",
                "type": "string",
                "format": "regex"
              }
            }
          },
          "examples": [
            [
              {
                "forks": true
              }
            ],
            [
              {
                "name": "owner/name"
              },
              {
                "id": "MDEwOlJlcG9zaXRvcnkxMTczMDM0Mg=="
              }
            ],
            [
              {
                "name": "vuejs/vue"
              },
              {
                "name": "php/php-src"
              },
              {
                "pattern": "^topsecretorg/.*"
              }
            ]
          ]
        },
        "repositoryQuery": {
          "description": "An array of strings specifying which GitHub or GitHub Enterprise repositories to mirror on Sourcegraph. The valid values are:\n\n- `public` mirrors all public repositories for GitHub Enterprise and is the equivalent of `none` for GitHub\n\n- `affiliated` mirrors all repositories affiliated with the configured token's user:\n\t- Private repositories with read access\n\t- Public repositories owned by the user or their orgs\n\t- Public repositories with write access\n\n- `none` mirrors no repositories (except those specified in the `repos` configuration property or added manually)\n\n- All other values are executed as a GitHub advanced repository search as described at https://github.com/search/advanced. Example: to sync all repositories from the \"sourcegraph\" organization including forks the query would be \"org:sourcegraph fork:true\".\n\nIf multiple values are provided, their results are unioned.\n\nIf you need to narrow the set of mirrored repositories further (and don't want to enumerate it with a list or query set as above), create a new bot/machine user on GitHub or GitHub Enterprise that is only affiliated with the desired repositories.",
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "default": [
            "none"
          ],
          "minItems": 1
        },
        "repositoryPathPattern": {
          "description": "The pattern used to generate the corresponding Sourcegraph repository name for a GitHub or GitHub Enterprise repository. In the pattern, the variable \"{host}\" is replaced with the GitHub host (such as github.example.com), and \"{nameWithOwner}\" is replaced with the GitHub repository's \"owner/path\" (such as \"myorg/myrepo\").\n\nFor example, if your GitHub Enterprise URL is https://github.example.com and your Sourcegraph URL is https://src.example.com, then a repositoryPathPattern of \"{host}/{nameWithOwner}\" would mean that a GitHub repository at https://github.example.com/myorg/myrepo is available on Sourcegraph at https://src.example.com/github.example.com/myorg/myrepo.\n\nIt is important that the Sourcegraph repository name generated with this pattern be unique to this code host. If different code hosts generate repository names that collide, Sourcegraph's behavior is undefined.",
          "type": "string",
          "default": "{host}/{nameWithOwner}"
        },
        "initialRepositoryEnablement": {
          "description": "Deprecated and ignored field which will be removed entirely in the next release. GitHub repositories can no longer be enabled or disabled explicitly. Configure repositories to be mirrored via \"repos\", \"exclude\" and \"repositoryQuery\" instead.",
          "type": "boolean"
        },
        "authorization": {
          "title": "GitHubAuthorization",
          "description": "If non-null, enforces GitHub repository permissions. This requires that there is an item in the [site configuration json](https://docs.sourcegraph.com/admin/config/site_config#auth-providers) `auth.providers` field, of type \"github\" with the same `url` field as specified in this `GitHubConnection`.",
          "type": "object",
          "properties": {
            "groupsCacheTTL": {
              "description": "Experimental: If set, configures hours cached permissions from teams and organizations should be kept for. Setting a negative value disables syncing from teams and organizations, and falls back to the default behaviour of syncing all permisisons directly from user-repository affiliations instead. [Learn more](https://docs.sourcegraph.com/admin/external_service/github#teams-and-organizations-permissions-caching).",
              "type": "number",
              "default": 72
            }
          }
        },
        "githubAppInstallationID": {
          "description": "The installation ID of the GitHub App.",
          "type": "string"
        },
        "pending": {
          "description": "Whether the code host connection is in a pending state.",
          "type": "boolean",
          "default": false
        },
        "cloudGlobal": {
          "title": "CloudGlobal",
          "description": "When set to true, this external service will be chosen as our 'Global' GitHub service. Only valid on Sourcegraph.com. Only one service can have this flag set.",
          "type": "boolean",
          "default": false,
          "deprecationMessage": "DEPRECATED: The cloud_default flag should be set in the database instead"
        },
        "cloudDefault": {
          "title": "CloudDefault",
          "description": "Only used to override the cloud_default column from a config file specified by EXTSVC_CONFIG_FILE",
          "type": "boolean",
          "default": false
        }
      }
    },
    "uischema": false,
    "data": {}
  },
  {
    "name": "fb.jsonschema.gitlab",
    "label": "FormBuilder JsonSchema - gitlab",
    "schema": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "gitlab.schema.json#",
      "title": "GitLabConnection",
      "description": "Configuration for a connection to GitLab (GitLab.com or GitLab self-managed).",
      "allowComments": true,
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url",
        "token",
        "projectQuery"
      ],
      "properties": {
        "url": {
          "description": "URL of a GitLab instance, such as https://gitlab.example.com or (for GitLab.com) https://gitlab.com.",
          "type": "string",
          "pattern": "^https?://",
          "not": {
            "type": "string",
            "pattern": "example\\.com"
          },
          "format": "uri",
          "examples": [
            "https://gitlab.com",
            "https://gitlab.example.com"
          ]
        },
        "token": {
          "description": "A GitLab access token with \"api\" scope. Can be a personal access token (PAT) or an OAuth token. If you are enabling permissions with identity provider type \"external\", this token should also have \"sudo\" scope.",
          "type": "string",
          "minLength": 1
        },
        "token.type": {
          "description": "The type of the token",
          "type": "string",
          "enum": [
            "pat",
            "oauth"
          ],
          "default": "pat"
        },
        "token.oauth.refresh": {
          "description": "The OAuth refresh token",
          "type": "string"
        },
        "token.oauth.expiry": {
          "description": "The OAuth token expiry (Unix timestamp in seconds)",
          "type": "integer"
        },
        "rateLimit": {
          "description": "Rate limit applied when making background API requests to GitLab.",
          "title": "GitLabRateLimit",
          "type": "object",
          "required": [
            "enabled",
            "requestsPerHour"
          ],
          "properties": {
            "enabled": {
              "description": "true if rate limiting is enabled.",
              "type": "boolean",
              "default": true
            },
            "requestsPerHour": {
              "description": "Requests per hour permitted. This is an average, calculated per second. Internally the burst limit is set to 100, which implies that for a requests per hour limit as low as 1, users will continue to be able to send a maximum of 100 requests immediately, provided that the complexity cost of each request is 1.",
              "type": "number",
              "default": 36000,
              "minimum": 0
            }
          },
          "default": {
            "enabled": true,
            "requestsPerHour": 36000
          }
        },
        "gitURLType": {
          "description": "The type of Git URLs to use for cloning and fetching Git repositories on this GitLab instance.\n\nIf \"http\", Sourcegraph will access GitLab repositories using Git URLs of the form http(s)://gitlab.example.com/myteam/myproject.git (using https: if the GitLab instance uses HTTPS).\n\nIf \"ssh\", Sourcegraph will access GitLab repositories using Git URLs of the form git@example.gitlab.com:myteam/myproject.git. See the documentation for how to provide SSH private keys and known_hosts: https://docs.sourcegraph.com/admin/repo/auth#repositories-that-need-http-s-or-ssh-authentication.",
          "type": "string",
          "enum": [
            "http",
            "ssh"
          ],
          "default": "http"
        },
        "certificate": {
          "description": "TLS certificate of the GitLab instance. This is only necessary if the certificate is self-signed or signed by an internal CA. To get the certificate run `openssl s_client -connect HOST:443 -showcerts < /dev/null 2> /dev/null | openssl x509 -outform PEM`. To escape the value into a JSON string, you may want to use a tool like https://json-escape-text.now.sh.",
          "type": "string",
          "pattern": "^-----BEGIN CERTIFICATE-----\n",
          "examples": [
            "-----BEGIN CERTIFICATE-----\n..."
          ]
        },
        "projects": {
          "description": "A list of projects to mirror from this GitLab instance. Supports including by name ({\"name\": \"group/name\"}) or by ID ({\"id\": 42}).",
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "object",
            "title": "GitLabProject",
            "additionalProperties": false,
            "oneOf": [
              {
                "required": [
                  "name"
                ]
              },
              {
                "required": [
                  "id"
                ]
              }
            ],
            "properties": {
              "name": {
                "description": "The name of a GitLab project (\"group/name\") to mirror.",
                "type": "string",
                "pattern": "^[\\w.-]+(/[\\w.-]+)+$"
              },
              "id": {
                "description": "The ID of a GitLab project (as returned by the GitLab instance's API) to mirror.",
                "type": "integer"
              }
            }
          },
          "examples": [
            [
              {
                "name": "group/name"
              },
              {
                "id": 42
              }
            ],
            [
              {
                "name": "gnachman/iterm2"
              },
              {
                "name": "gitlab-org/gitlab-ce"
              }
            ]
          ]
        },
        "exclude": {
          "description": "A list of projects to never mirror from this GitLab instance. Takes precedence over \"projects\" and \"projectQuery\" configuration. Supports excluding by name ({\"name\": \"group/name\"}) or by ID ({\"id\": 42}).",
          "type": "array",
          "items": {
            "type": "object",
            "title": "ExcludedGitLabProject",
            "additionalProperties": false,
            "anyOf": [
              {
                "required": [
                  "name"
                ]
              },
              {
                "required": [
                  "id"
                ]
              },
              {
                "required": [
                  "emptyRepos"
                ]
              }
            ],
            "properties": {
              "name": {
                "description": "The name of a GitLab project (\"group/name\") to exclude from mirroring.",
                "type": "string",
                "pattern": "^[\\w.-]+(/[\\w.-]+)+$"
              },
              "id": {
                "description": "The ID of a GitLab project (as returned by the GitLab instance's API) to exclude from mirroring.",
                "type": "integer"
              },
              "emptyRepos": {
                "description": "Whether to exclude empty repositories.",
                "type": "boolean"
              }
            }
          },
          "examples": [
            [
              {
                "name": "group/name"
              },
              {
                "id": 42
              },
              {
                "emptyRepos": true
              }
            ],
            [
              {
                "name": "gitlab-org/gitlab-ee"
              },
              {
                "name": "gitlab-com/www-gitlab-com"
              }
            ]
          ]
        },
        "projectQuery": {
          "description": "An array of strings specifying which GitLab projects to mirror on Sourcegraph. Each string is a URL path and query that targets a GitLab API endpoint returning a list of projects. If the string only contains a query, then \"projects\" is used as the path. Examples: \"?membership=true&search=foo\", \"groups/mygroup/projects\".\n\nThe special string \"none\" can be used as the only element to disable this feature. Projects matched by multiple query strings are only imported once. Here are a few endpoints that return a list of projects: https://docs.gitlab.com/ee/api/projects.html#list-all-projects, https://docs.gitlab.com/ee/api/groups.html#list-a-groups-projects, https://docs.gitlab.com/ee/api/search.html#scope-projects.",
          "type": "array",
          "default": [
            "none"
          ],
          "items": {
            "type": "string",
            "minLength": 1
          },
          "minItems": 1,
          "examples": [
            [
              "?membership=true&search=foo",
              "groups/mygroup/projects"
            ]
          ]
        },
        "repositoryPathPattern": {
          "description": "The pattern used to generate a the corresponding Sourcegraph repository name for a GitLab project. In the pattern, the variable \"{host}\" is replaced with the GitLab URL's host (such as gitlab.example.com), and \"{pathWithNamespace}\" is replaced with the GitLab project's \"namespace/path\" (such as \"myteam/myproject\").\n\nFor example, if your GitLab is https://gitlab.example.com and your Sourcegraph is https://src.example.com, then a repositoryPathPattern of \"{host}/{pathWithNamespace}\" would mean that a GitLab project at https://gitlab.example.com/myteam/myproject is available on Sourcegraph at https://src.example.com/gitlab.example.com/myteam/myproject.\n\nIt is important that the Sourcegraph repository name generated with this pattern be unique to this code host. If different code hosts generate repository names that collide, Sourcegraph's behavior is undefined.",
          "type": "string",
          "default": "{host}/{pathWithNamespace}"
        },
        "nameTransformations": {
          "description": "An array of transformations will apply to the repository name. Currently, only regex replacement is supported. All transformations happen after \"repositoryPathPattern\" is processed.",
          "type": "array",
          "items": {
            "$ref": "#/definitions/NameTransformation"
          },
          "examples": [
            [
              {
                "regex": "\\.d/",
                "replacement": "/"
              },
              {
                "regex": "-git$",
                "replacement": ""
              }
            ]
          ]
        },
        "initialRepositoryEnablement": {
          "description": "Deprecated and ignored field which will be removed entirely in the next release. GitLab repositories can no longer be enabled or disabled explicitly.",
          "type": "boolean"
        },
        "authorization": {
          "title": "GitLabAuthorization",
          "description": "If non-null, enforces GitLab repository permissions. This requires that there be an item in the `auth.providers` field of type \"gitlab\" with the same `url` field as specified in this `GitLabConnection`.",
          "type": "object",
          "additionalProperties": false,
          "required": [
            "identityProvider"
          ],
          "properties": {
            "identityProvider": {
              "description": "The source of identity to use when computing permissions. This defines how to compute the GitLab identity to use for a given Sourcegraph user.",
              "type": "object",
              "required": [
                "type"
              ],
              "properties": {
                "type": {
                  "type": "string",
                  "enum": [
                    "oauth",
                    "username",
                    "external"
                  ]
                }
              },
              "oneOf": [
                {
                  "$ref": "#/definitions/OAuthIdentity"
                },
                {
                  "$ref": "#/definitions/UsernameIdentity"
                },
                {
                  "$ref": "#/definitions/ExternalIdentity"
                }
              ],
              "!go": {
                "taggedUnionType": true
              }
            }
          }
        },
        "webhooks": {
          "description": "An array of webhook configurations",
          "deprecationMessage": "Deprecated in favour of first class webhooks. See https://docs.sourcegraph.com/admin/config/webhooks/incoming#deprecation-notice",
          "type": "array",
          "items": {
            "type": "object",
            "title": "GitLabWebhook",
            "required": [
              "secret"
            ],
            "additionalProperties": false,
            "properties": {
              "secret": {
                "description": "The secret used to authenticate incoming webhook requests",
                "type": "string",
                "minLength": 1
              }
            }
          }
        },
        "cloudGlobal": {
          "title": "CloudGlobal",
          "description": "When set to true, this external service will be chosen as our 'Global' GitLab service. Only valid on Sourcegraph.com. Only one service can have this flag set.",
          "type": "boolean",
          "default": false,
          "deprecationMessage": "DEPRECATED: The cloud_default flag should be set in the database instead"
        },
        "cloudDefault": {
          "title": "CloudDefault",
          "description": "Only used to override the cloud_default column from a config file specified by EXTSVC_CONFIG_FILE",
          "type": "boolean",
          "default": false
        }
      },
      "definitions": {
        "OAuthIdentity": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "type"
          ],
          "properties": {
            "type": {
              "type": "string",
              "const": "oauth"
            }
          }
        },
        "UsernameIdentity": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "type"
          ],
          "properties": {
            "type": {
              "type": "string",
              "const": "username"
            }
          }
        },
        "ExternalIdentity": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "type",
            "authProviderID",
            "authProviderType",
            "gitlabProvider"
          ],
          "properties": {
            "type": {
              "type": "string",
              "const": "external"
            },
            "authProviderID": {
              "type": "string",
              "description": "The value of the `configID` field of the targeted authentication provider."
            },
            "authProviderType": {
              "type": "string",
              "description": "The `type` field of the targeted authentication provider."
            },
            "gitlabProvider": {
              "type": "string",
              "description": "The name that identifies the authentication provider to GitLab. This is passed to the `?provider=` query parameter in calls to the GitLab Users API. If you're not sure what this value is, you can look at the `identities` field of the GitLab Users API result (`curl  -H 'PRIVATE-TOKEN: $YOUR_TOKEN' $GITLAB_URL/api/v4/users`)."
            }
          }
        },
        "NameTransformation": {
          "title": "GitLabNameTransformation",
          "type": "object",
          "additionalProperties": false,
          "anyOf": [
            {
              "required": [
                "regex",
                "replacement"
              ]
            }
          ],
          "properties": {
            "regex": {
              "type": "string",
              "format": "regex",
              "description": "The regex to match for the occurrences of its replacement."
            },
            "replacement": {
              "type": "string",
              "description": "The replacement used to replace all matched occurrences by the regex."
            }
          }
        }
      }
    },
    "uischema": false,
    "data": {}
  },
  {
    "name": "fb.renderer.AllOf, AnyOf, OneOf",
    "label": "FormBuilder Renderer - AllOf, AnyOf, OneOf",
    "schema": {
      "type": "object",
      "properties": {
        "oneOf": {
          "oneOf": [
            {
              "type": "boolean"
            },
            {
              "type": "string"
            }
          ]
        },
        "anyOf": {
          "anyOf": [
            {
              "type": "boolean"
            },
            {
              "type": "string"
            }
          ]
        },
        "allOf": {
          "allOf": [
            {
              "type": "boolean"
            },
            {
              "type": "string"
            }
          ]
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Group",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/oneOf"
            }
          ],
          "label": "OneOf"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/anyOf"
            }
          ],
          "label": "AnyOf"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/allOf"
            }
          ],
          "label": "allOf"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.renderer.Array Controler",
    "label": "FormBuilder Renderer - Array Controler",
    "schema": {
      "type": "object",
      "properties": {
        "colorNames": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "colorData": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer"
              },
              "name": {
                "type": "string"
              }
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
          "scope": "#/properties/colorNames"
        },
        {
          "type": "Control",
          "scope": "#/properties/colorData"
        }
      ]
    },
    "data": {
      "colorNames": [
        "red",
        "blue"
      ],
      "colorData": [
        {
          "id": 1,
          "name": "green"
        },
        {
          "id": 2,
          "name": "yellow"
        }
      ]
    }
  },
  {
    "name": "fb.renderer.Array Layout",
    "label": "FormBuilder Renderer - Array Layout",
    "schema": {
      "type": "object",
      "definitions": {
        "namedText": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "text": {
              "type": "string"
            }
          }
        }
      },
      "properties": {
        "colors": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "colorcodes": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          }
        },
        "texts": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/namedText"
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Group",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/colors"
            }
          ],
          "label": "ArrayLayout"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "ListWithDetail",
              "scope": "#/properties/texts",
              "options": {
                "labelRef": "#/items/properties/name",
                "detail": {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/name"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/text",
                      "options": {
                        "multi": true
                      }
                    }
                  ]
                }
              }
            }
          ],
          "label": "ListWithDetail"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.renderer.Autocomplete",
    "label": "FormBuilder Renderer - Autocomplete",
    "schema": {
      "type": "object",
      "properties": {
        "countryCode": {
          "type": "string",
          "enum": [
            "CL",
            "GR",
            "LV",
            "PA",
            "TD",
            "AD",
            "ZW",
            "BB",
            "BG",
            "BF",
            "BI",
            "GH",
            "ME",
            "TH",
            "ET",
            "SC",
            "BT",
            "UY",
            "TW",
            "ML"
          ]
        },
        "countryName": {
          "type": "string",
          "oneOf": [
            {
              "const": "GD",
              "title": "Grenada"
            },
            {
              "const": "EE",
              "title": "Estland"
            },
            {
              "const": "SC",
              "title": "Seychellen"
            },
            {
              "const": "ID",
              "title": "Indonesien"
            },
            {
              "const": "PT",
              "title": "Portugal"
            },
            {
              "const": "VN",
              "title": "Vietnam"
            },
            {
              "const": "GB",
              "title": "Vereinigtes Königreich"
            },
            {
              "const": "TG",
              "title": "Togo"
            },
            {
              "const": "MW",
              "title": "Malawi"
            },
            {
              "const": "KH",
              "title": "Kambodscha"
            },
            {
              "const": "GA",
              "title": "Gabun"
            },
            {
              "const": "CU",
              "title": "Kuba"
            },
            {
              "const": "BS",
              "title": "Bahamas"
            },
            {
              "const": "CM",
              "title": "Kamerun"
            },
            {
              "const": "KH",
              "title": "Kambodscha"
            },
            {
              "const": "BN",
              "title": "Brunei Darussalam"
            },
            {
              "const": "BY",
              "title": "Weißrussland"
            },
            {
              "const": "IS",
              "title": "Island"
            },
            {
              "const": "KZ",
              "title": "Kasachstan"
            },
            {
              "const": "LU",
              "title": "Luxemburg"
            }
          ]
        }
      }
    },
    "uischema": {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/countryCode",
          "options": {
            "autocomplete": true
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/countryName",
          "options": {
            "autocomplete": true
          }
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.renderer.Categorization",
    "label": "FormBuilder Renderer - Categorization",
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "height": {
          "type": "number"
        },
        "weight": {
          "type": "number"
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Categorization",
          "elements": [
            {
              "type": "Category",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/name"
                }
              ],
              "label": "Base"
            },
            {
              "type": "Category",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/height"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/weight"
                }
              ],
              "label": "Body"
            }
          ]
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.renderer.Enum Array",
    "label": "FormBuilder Renderer - Enum Array",
    "schema": {
      "type": "object",
      "properties": {
        "colors": {
          "type": "array",
          "uniqueItems": true,
          "items": {
            "enum": [
              "red",
              "green",
              "blue"
            ],
            "type": "string"
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/colors"
        }
      ]
    },
    "data": {
      "colors": [
        "green"
      ]
    }
  },
  {
    "name": "fb.renderer.Object",
    "label": "FormBuilder Renderer - Object",
    "schema": {
      "type": "object",
      "properties": {
        "user": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "body": {
              "type": "object",
              "properties": {
                "height": {
                  "type": "number"
                },
                "weight": {
                  "type": "number"
                }
              }
            },
            "properties": {
              "type": "object",
              "additionalProperties": {
                "type": "string",
                "title": "add more Properties"
              },
              "properties": {}
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
          "scope": "#/properties/user"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.renderer.RadioGroup",
    "label": "FormBuilder Renderer - RadioGroup",
    "schema": {
      "type": "object",
      "properties": {
        "exampleRadioEnum": {
          "type": "string",
          "enum": [
            "One",
            "Two",
            "Three"
          ]
        },
        "exampleRadioOneOfEnum": {
          "type": "string",
          "oneOf": [
            {
              "const": "foo",
              "title": "Foo"
            },
            {
              "const": "bar",
              "title": "Bar"
            },
            {
              "const": "foobar",
              "title": "FooBar"
            }
          ]
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Group",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/exampleRadioEnum",
              "options": {
                "format": "radio"
              }
            }
          ],
          "label": "Simple enum"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/exampleRadioOneOfEnum",
              "options": {
                "format": "radio"
              }
            }
          ],
          "label": "One of Enum"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "fb.renderer.Toggle, Slider, Password, Const",
    "label": "FormBuilder Renderer - Toggle, Slider, Password, Const",
    "schema": {
      "type": "object",
      "properties": {
        "toggle": {
          "type": "boolean"
        },
        "slider": {
          "type": "number",
          "minimum": 0,
          "maximum": 100,
          "default": 50
        },
        "password": {
          "type": "string",
          "format": "password"
        },
        "const": {
          "const": false
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/toggle",
          "options": {
            "toggle": true
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/slider",
          "options": {
            "slider": true
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/password"
        },
        {
          "type": "Control",
          "scope": "#/properties/const"
        }
      ]
    },
    "data": {}
  },
  {
    "name": "generate",
    "label": "Generate both Schemas",
    "data": {
      "name": "John Doe",
      "vegetarian": false,
      "birthDate": "1985-06-02",
      "personalData": {
        "age": 34
      },
      "postalCode": "12345"
    }
  },
  {
    "name": "dynamic",
    "label": "Generate both schemas - Dynamic data change",
    "data": {
      "name": "bla"
    },
    "actions": [
      {
        "label": "Change data"
      }
    ]
  },
  {
    "name": "generate-ui",
    "label": "Generate UI Schema",
    "data": {
      "name": "John Doe",
      "vegetarian": false,
      "birthDate": "1985-06-02",
      "personalData": {
        "age": 34
      },
      "postalCode": "12345"
    },
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your name"
        },
        "vegetarian": {
          "type": "boolean"
        },
        "birthDate": {
          "type": "string",
          "format": "date",
          "description": "Please enter your birth date."
        },
        "nationality": {
          "type": "string",
          "enum": [
            "DE",
            "IT",
            "JP",
            "US",
            "RU",
            "Other"
          ]
        }
      }
    }
  },
  {
    "name": "huge",
    "label": "Huge Test",
    "data": {
      "attribution": {
        "contributor": {
          "resource": "#A-1"
        },
        "modified": 1398405600000
      },
      "persons": [
        {
          "names": [
            {
              "nameForms": [
                {
                  "fullText": "Samuel Ham"
                }
              ]
            }
          ],
          "gender": {
            "type": "http://gedcomx.org/Male"
          },
          "facts": [
            {
              "type": "http://gedcomx.org/Residence",
              "date": {
                "original": "3 November 1828",
                "formal": "+1828-11-03"
              },
              "place": {
                "original": "parish of Honiton, Devon, England"
              }
            }
          ],
          "extracted": true,
          "sources": [
            {
              "description": "#S-2"
            }
          ],
          "id": "P-1"
        },
        {
          "names": [
            {
              "nameForms": [
                {
                  "fullText": "Elizabeth Spiller"
                }
              ]
            }
          ],
          "gender": {
            "type": "http://gedcomx.org/Female"
          },
          "facts": [
            {
              "type": "http://gedcomx.org/Residence",
              "date": {
                "original": "3 November 1828",
                "formal": "+1828-11-03"
              },
              "place": {
                "original": "parish of Wilton, Somerset, England"
              }
            }
          ],
          "extracted": true,
          "sources": [
            {
              "description": "#S-2"
            }
          ],
          "id": "P-2"
        },
        {
          "names": [
            {
              "nameForms": [
                {
                  "fullText": "Jno. Pain"
                }
              ]
            }
          ],
          "extracted": true,
          "sources": [
            {
              "description": "#S-2"
            }
          ],
          "id": "P-3"
        },
        {
          "names": [
            {
              "nameForms": [
                {
                  "fullText": "R.G. Halls"
                }
              ]
            }
          ],
          "extracted": true,
          "sources": [
            {
              "description": "#S-2"
            }
          ],
          "id": "P-4"
        },
        {
          "names": [
            {
              "nameForms": [
                {
                  "fullText": "Peggy Hammet"
                }
              ]
            }
          ],
          "extracted": true,
          "sources": [
            {
              "description": "#S-2"
            }
          ],
          "id": "P-5"
        },
        {
          "names": [
            {
              "nameForms": [
                {
                  "fullText": "David Smith Stone"
                }
              ]
            }
          ],
          "extracted": true,
          "sources": [
            {
              "description": "#S-2"
            }
          ],
          "id": "P-6"
        },
        {
          "evidence": [
            {
              "resource": "#P-1"
            }
          ],
          "analysis": {
            "resource": "#D-2"
          },
          "id": "C-1"
        }
      ],
      "relationships": [
        {
          "type": "http://gedcomx.org/Couple",
          "extracted": true,
          "facts": [
            {
              "type": "http://gedcomx.org/Marriage",
              "date": {
                "original": "3 November 1828",
                "formal": "+1828-11-03"
              },
              "place": {
                "original": "Wilton St George, Wilton, Somerset, England"
              }
            }
          ],
          "person1": {
            "resource": "#P-1"
          },
          "person2": {
            "resource": "#P-2"
          }
        }
      ],
      "sourceDescriptions": [
        {
          "description": [
            {
              "value": "Marriage entry for Samuel Ham and Elizabeth in a copy of the registers of the baptisms, marriages, and burials at the church of St. George in the parish of Wilton : adjoining Taunton, in the county of Somerset from A.D. 1558 to A.D. 1837."
            }
          ],
          "resourceType": "http://gedcomx.org/PhysicalArtifact",
          "citations": [
            {
              "value": "Joseph Houghton Spencer, transcriber, Church of England, Parish Church of Wilton (Somerset). A copy of the registers of the baptisms, marriages, and burials at the church of St. George in the parish of Wilton : adjoining Taunton, in the county of Somerset from A.D. 1558 to A.D. 1837; Marriage entry for Samuel Ham and Elizabeth Spiller (3 November 1828), (Taunton: Barnicott, 1890), p. 224, No. 86."
            }
          ],
          "titles": [
            {
              "value": "Marriage entry for Samuel Ham and Elizabeth Spiller, Parish Register, Wilton, Somerset, England"
            }
          ],
          "repository": {
            "resource": "#A-2"
          },
          "id": "S-1"
        },
        {
          "description": [
            {
              "value": "Transcription of marriage entry for Samuel Ham and Elizabeth in a copy of the registers of the baptisms, marriages, and burials at the church of St. George in the parish of Wilton : adjoining Taunton, in the county of Somerset from A.D. 1558 to A.D. 1837."
            }
          ],
          "sources": [
            {
              "description": "#S-1"
            }
          ],
          "resourceType": "http://gedcomx.org/DigitalArtifact",
          "citations": [
            {
              "value": "Joseph Houghton Spencer, transcriber, Church of England, Parish Church of Wilton (Somerset). A copy of the registers of the baptisms, marriages, and burials at the church of St. George in the parish of Wilton : adjoining Taunton, in the county of Somerset from A.D. 1558 to A.D. 1837; Marriage entry for Samuel Ham and Elizabeth Spiller (3 November 1828), (Taunton: Barnicott, 1890), p. 224, No. 86."
            }
          ],
          "about": "#D-1",
          "titles": [
            {
              "value": "Transcription of marriage entry for Samuel Ham and Elizabeth Spiller, Parish Register, Wilton, Somerset, England"
            }
          ],
          "id": "S-2"
        }
      ],
      "agents": [
        {
          "names": [
            {
              "value": "Jane Doe"
            }
          ],
          "emails": [
            {
              "resource": "mailto:example@example.org"
            }
          ],
          "id": "A-1"
        },
        {
          "names": [
            {
              "value": "Family History Library"
            }
          ],
          "addresses": [
            {
              "city": "Salt Lake City",
              "stateOrProvince": "Utah"
            }
          ],
          "id": "A-2"
        }
      ],
      "events": [
        {
          "type": "http://gedcomx.org/Marriage",
          "date": {
            "original": "3 November 1828",
            "formal": "+1828-11-03"
          },
          "place": {
            "original": "Wilton St George, Wilton, Somerset, England"
          },
          "roles": [
            {
              "type": "http://gedcomx.org/Principal",
              "person": {
                "resource": "#P-1"
              }
            },
            {
              "type": "http://gedcomx.org/Principal",
              "person": {
                "resource": "#P-2"
              }
            },
            {
              "type": "http://gedcomx.org/Witness",
              "person": {
                "resource": "#P-3"
              }
            },
            {
              "type": "http://gedcomx.org/Witness",
              "person": {
                "resource": "#P-4"
              }
            },
            {
              "type": "http://gedcomx.org/Witness",
              "person": {
                "resource": "#P-5"
              }
            },
            {
              "type": "http://gedcomx.org/Official",
              "person": {
                "resource": "#P-6"
              }
            }
          ],
          "extracted": true,
          "id": "E-1"
        }
      ],
      "documents": [
        {
          "type": "http://gedcomx.org/Transcription",
          "text": "Samuel Ham of the parish of Honiton and Elizabeth Spiller\nwere married this 3rd day of November 1828 by David Smith\nStone, Pl Curate,\nIn the Presence of\nJno Pain.\nR.G. Halls.  Peggy Hammet.\nNo. 86.",
          "sources": [
            {
              "description": "#S-1"
            }
          ],
          "lang": "en",
          "id": "D-1"
        },
        {
          "text": "...Jane Doe`s analysis document...",
          "id": "D-2"
        }
      ]
    },
    "schema": {
      "$schema": "http://json-schema.org/schema#",
      "definitions": {
        "confidenceTypes": {
          "type": "string",
          "enum": [
            "http://gedcomx.org/High",
            "http://gedcomx.org/Medium",
            "http://gedcomx.org/Low"
          ]
        },
        "genderTypes": {
          "type": "string",
          "enum": [
            "http://gedcomx.org/Male",
            "http://gedcomx.org/Female",
            "http://gedcomx.org/Unknown",
            "http://gedcomx.org/Intersex"
          ]
        },
        "nameTypes": {
          "type": "string",
          "enum": [
            "http://gedcomx.org/BirthName",
            "http://gedcomx.org/MarriedName",
            "http://gedcomx.org/AlsoKnownAs",
            "http://gedcomx.org/Nickname",
            "http://gedcomx.org/AdoptiveName",
            "http://gedcomx.org/FormalName",
            "http://gedcomx.org/ReligiousName"
          ]
        },
        "namePartTypes": {
          "enum": [
            "http://gedcomx.org/Prefix",
            "http://gedcomx.org/Suffix",
            "http://gedcomx.org/Given",
            "http://gedcomx.org/Surname"
          ]
        },
        "personFactTypes": {
          "type": "string",
          "enum": [
            "http://gedcomx.org/Adoption",
            "http://gedcomx.org/AdultChristening",
            "http://gedcomx.org/Amnesty",
            "http://gedcomx.org/Apprenticeship",
            "http://gedcomx.org/Arrest",
            "http://gedcomx.org/Baptism",
            "http://gedcomx.org/BarMitzvah",
            "http://gedcomx.org/BatMitzvah",
            "http://gedcomx.org/Birth",
            "http://gedcomx.org/Blessing",
            "http://gedcomx.org/Burial",
            "http://gedcomx.org/Caste",
            "http://gedcomx.org/Census",
            "http://gedcomx.org/Christening",
            "http://gedcomx.org/Circumcision",
            "http://gedcomx.org/Clan",
            "http://gedcomx.org/Confirmation",
            "http://gedcomx.org/Cremation",
            "http://gedcomx.org/Death",
            "http://gedcomx.org/Education",
            "http://gedcomx.org/Emigration",
            "http://gedcomx.org/Ethnicity",
            "http://gedcomx.org/Excommunication",
            "http://gedcomx.org/FirstCommunion",
            "http://gedcomx.org/Funeral",
            "http://gedcomx.org/GenderChange",
            "http://gedcomx.org/Heimat",
            "http://gedcomx.org/Immigration",
            "http://gedcomx.org/Imprisonment",
            "http://gedcomx.org/LandTransaction",
            "http://gedcomx.org/Language",
            "http://gedcomx.org/Living",
            "http://gedcomx.org/MaritalStatus",
            "http://gedcomx.org/Medical",
            "http://gedcomx.org/MilitaryAward",
            "http://gedcomx.org/MilitaryDischarge",
            "http://gedcomx.org/MilitaryDraftRegistration",
            "http://gedcomx.org/MilitaryInduction",
            "http://gedcomx.org/MilitaryService",
            "http://gedcomx.org/Mission",
            "http://gedcomx.org/MoveTo",
            "http://gedcomx.org/MoveFrom",
            "http://gedcomx.org/MultipleBirth",
            "http://gedcomx.org/NationalId",
            "http://gedcomx.org/Nationality",
            "http://gedcomx.org/Naturalization",
            "http://gedcomx.org/NumberOfChildren",
            "http://gedcomx.org/NumberOfMarriages",
            "http://gedcomx.org/Occupation",
            "http://gedcomx.org/Ordination",
            "http://gedcomx.org/Pardon",
            "http://gedcomx.org/PhysicalDescription",
            "http://gedcomx.org/Probate",
            "http://gedcomx.org/Property",
            "http://gedcomx.org/Religion",
            "http://gedcomx.org/Residence",
            "http://gedcomx.org/Retirement",
            "http://gedcomx.org/Stillbirth",
            "http://gedcomx.org/Will",
            "http://gedcomx.org/Visit",
            "http://gedcomx.org/Yahrzeit"
          ]
        },
        "uri": {
          "type": "string"
        },
        "localeTag": {
          "type": "string"
        },
        "resourceReference": {
          "type": "object",
          "properties": {
            "resource": {
              "$ref": "#/definitions/uri"
            }
          }
        },
        "identifier": {
          "type": "object"
        },
        "attribution": {
          "title": "Attribution",
          "properties": {
            "contributor": {
              "$ref": "#/definitions/resourceReference",
              "description": "Reference to the agent to whom the attributed data is attributed."
            },
            "modified": {
              "type": "number",
              "description": "Timestamp of when the attributed data was contributed."
            },
            "changeMessage": {
              "type": "string",
              "description": "A statement of why the attributed data is being provided by the contributor."
            },
            "creator": {
              "$ref": "#/definitions/resourceReference",
              "description": "Reference to the agent that created the attributed data. The creator MAY be different from the contributor if changes were made to the attributed data."
            },
            "created": {
              "type": "number",
              "description": "Timestamp of when the attributed data was contributed."
            }
          }
        },
        "note": {
          "title": "Note",
          "properties": {
            "lang": {
              "$ref": "#/definitions/localeTag",
              "description": "The locale identifier for the note."
            },
            "subject": {
              "type": "string",
              "description": "A subject or title for the note."
            },
            "text": {
              "type": "string",
              "description": "The text of the note."
            },
            "attribution": {
              "$ref": "#/definitions/attribution",
              "description": "The attribution of this note."
            }
          },
          "required": [
            "text"
          ]
        },
        "textValue": {
          "type": "object",
          "properties": {
            "lang": {
              "$ref": "#/definitions/localeTag",
              "description": "The locale identifier for the value of the text."
            },
            "value": {
              "type": "string",
              "description": "The text value."
            }
          },
          "required": [
            "value"
          ]
        },
        "sourceCitation": {
          "type": "object",
          "properties": {
            "lang": {
              "$ref": "#/definitions/localeTag",
              "description": "The locale identifier for the bibliographic metadata."
            },
            "value": {
              "type": "string",
              "description": "The bibliographic metadata rendered as a full citation."
            }
          },
          "required": [
            "value"
          ]
        },
        "sourceReference": {
          "title": "SourceReference",
          "properties": {
            "description": {
              "$ref": "#/definitions/uri",
              "description": "Reference to a description of the target source."
            },
            "descriptionId": {
              "type": "string",
              "description": "The id of the target source."
            },
            "attribution": {
              "$ref": "#/definitions/attribution",
              "description": "The attribution of this source reference."
            },
            "qualifiers": {
              "items": {
                "$ref": "#/definitions/sourceReferenceQualifier"
              },
              "description": "Qualifiers for the reference, used to identify specific fragments of the source that are being referenced."
            }
          },
          "required": [
            "description"
          ]
        },
        "sourceReferenceQualifier": {
          "properties": {
            "name": {
              "anyOf": [
                {
                  "$ref": "#/definitions/sourceReferenceQualifierNames"
                },
                {
                  "$ref": "#/definitions/uri"
                }
              ]
            },
            "value": {
              "type": "string"
            }
          },
          "required": [
            "name"
          ]
        },
        "sourceReferenceQualifierNames": {
          "enum": [
            "http://gedcomx.org/CharacterRegion",
            "http://gedcomx.org/RectangleRegion",
            "http://gedcomx.org/TimeRegion"
          ]
        },
        "evidenceReference": {
          "title": "EvidenceReference",
          "properties": {
            "resource": {
              "$ref": "#/definitions/uri"
            },
            "attribution": {
              "$ref": "#/definitions/attribution"
            }
          },
          "required": [
            "resource"
          ]
        },
        "onlineAccount": {
          "type": "object",
          "properties": {
            "serviceHomepage": {
              "$ref": "#/definitions/resourceReference"
            },
            "accountName": {
              "type": "string"
            }
          },
          "required": [
            "serviceHomepage",
            "accountName"
          ]
        },
        "address": {
          "type": "object",
          "properties": {
            "value": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "country": {
              "type": "string"
            },
            "postalCode": {
              "type": "string"
            },
            "stateOrProvince": {
              "type": "string"
            },
            "street": {
              "type": "string"
            },
            "street2": {
              "type": "string"
            },
            "street3": {
              "type": "string"
            },
            "street4": {
              "type": "string"
            },
            "street5": {
              "type": "string"
            },
            "street6": {
              "type": "string"
            }
          }
        },
        "conclusion": {
          "type": "object",
          "title": "Conclusion",
          "properties": {
            "id": {
              "type": "string",
              "description": "An identifier for the conclusion data."
            },
            "lang": {
              "$ref": "#/definitions/localeTag",
              "description": "The locale identifier for the conclusion."
            },
            "sources": {
              "items": {
                "$ref": "#/definitions/sourceReference"
              },
              "description": "The list of references to the sources of related to this conclusion."
            },
            "analysis": {
              "$ref": "#/definitions/resourceReference",
              "description": "Reference to a document containing analysis supporting this conclusion."
            },
            "notes": {
              "items": {
                "$ref": "#/definitions/note"
              },
              "description": "A list of notes about this conclusion."
            },
            "confidence": {
              "anyOf": [
                {
                  "$ref": "#/definitions/uri"
                },
                {
                  "$ref": "#/definitions/confidenceTypes"
                }
              ],
              "description": "Reference to a confidence level for this conclusion."
            },
            "attribution": {
              "$ref": "#/definitions/attribution",
              "description": "The attribution of this conclusion."
            }
          }
        },
        "subject": {
          "title": "Subject",
          "allOf": [
            {
              "$ref": "#/definitions/conclusion"
            },
            {
              "properties": {
                "extracted": {
                  "type": "boolean",
                  "description": "Whether this subject is to be constrained as an extracted conclusion."
                },
                "evidence": {
                  "items": {
                    "$ref": "#/definitions/evidenceReference"
                  },
                  "description": "References to other subjects that support this subject."
                },
                "media": {
                  "items": {
                    "$ref": "#/definitions/sourceReference"
                  },
                  "description": "References to multimedia resources for this subject, such as photos or videos, intended to provide additional context or illustration for the subject and not considered evidence supporting the identity of the subject or its supporting conclusions."
                },
                "identifiers": {
                  "$ref": "#/definitions/identifier",
                  "description": "A list of identifiers for the subject."
                }
              }
            }
          ]
        },
        "gender": {
          "allOf": [
            {
              "$ref": "#/definitions/conclusion"
            },
            {
              "properties": {
                "type": {
                  "anyOf": [
                    {
                      "$ref": "#/definitions/uri"
                    },
                    {
                      "$ref": "#/definitions/genderTypes"
                    }
                  ],
                  "description": "Enumerated value identifying the gender."
                }
              },
              "required": [
                "type"
              ]
            }
          ]
        },
        "date": {
          "type": "object",
          "properties": {
            "original": {
              "type": "string",
              "description": "The original value of the date as supplied by the contributor."
            },
            "formal": {
              "type": "string",
              "pattern": "^(A?[\\+-]\\d{4}(-\\d{2})?(-\\d{2})?T?(\\d{2})?(:\\d{2})?(:\\d{2})?([\\+-]\\d{2}(:\\d{2})?|Z)?)|(P(\\d{0,4}Y)?(\\d{0,4}M)?(\\d{0,4}D)?(T(\\d{0,4}H)?(\\d{0,4}M)?(\\d{0,4}S)?)?)$",
              "description": "The standardized formal value of the date, formatted according to the GEDCOM X Date Format specification."
            }
          }
        },
        "name": {
          "title": "Name",
          "allOf": [
            {
              "$ref": "#/definitions/conclusion"
            },
            {
              "properties": {
                "type": {
                  "anyOf": [
                    {
                      "$ref": "#/definitions/uri"
                    },
                    {
                      "$ref": "#/definitions/nameTypes"
                    }
                  ],
                  "description": "Enumerated value identifying the name type."
                },
                "date": {
                  "$ref": "#/definitions/date",
                  "description": "The date of applicability of the name."
                },
                "nameForms": {
                  "items": {
                    "$ref": "#/definitions/nameForm"
                  },
                  "description": "The name form(s) that best express this name, usually representations considered proper and well formed in the person's native, historical cultural context."
                }
              },
              "required": [
                "nameForms"
              ]
            }
          ]
        },
        "namePart": {
          "title": "NamePart",
          "description": "The NamePart data type is used to model a portion of a full name, including the terms that make up that portion. Some name parts may have qualifiers to provide additional semantic meaning to the name part (e.g., \"given name\" or \"surname\").",
          "properties": {
            "type": {
              "anyOf": [
                {
                  "$ref": "#/definitions/uri"
                },
                {
                  "$ref": "#/definitions/namePartTypes"
                }
              ],
              "description": "Enumerated value identifying the type of the name part."
            },
            "value": {
              "type": "string",
              "description": "The term(s) from the name that make up this name part."
            },
            "qualifiers": {
              "items": {
                "$ref": "#/definitions/namePartQualifier"
              },
              "description": "Qualifiers to add additional semantic meaning to the name part."
            }
          },
          "required": [
            "value"
          ]
        },
        "namePartQualifier": {
          "properties": {
            "name": {
              "anyOf": [
                {
                  "$ref": "#/definitions/namePartQualifierNames"
                },
                {
                  "$ref": "#/definitions/uri"
                }
              ]
            },
            "value": {
              "type": "string"
            }
          },
          "required": [
            "name"
          ]
        },
        "namePartQualifierNames": {
          "enum": [
            "http://gedcomx.org/Title",
            "http://gedcomx.org/Primary",
            "http://gedcomx.org/Secondary",
            "http://gedcomx.org/Middle",
            "http://gedcomx.org/Familiar",
            "http://gedcomx.org/Religious",
            "http://gedcomx.org/Family",
            "http://gedcomx.org/Maiden",
            "http://gedcomx.org/Patronymic",
            "http://gedcomx.org/Matronymic",
            "http://gedcomx.org/Geographic",
            "http://gedcomx.org/Occupational",
            "http://gedcomx.org/Characteristic",
            "http://gedcomx.org/Postnom",
            "http://gedcomx.org/Particle",
            "http://gedcomx.org/RootName"
          ]
        },
        "nameForm": {
          "title": "NameForm",
          "description": "The NameForm data type defines a representation of a name (a \"name form\") within a given cultural context, such as a given language and script.\n      As names are captured (both in records or in applications), the terms in the name are sometimes classified by type. For example, a certificate of death might prompt for \"given name(s)\" and \"surname\". The parts list can be used to represent the terms in the name that have been classified.\n      If both a full rendering of the name and a list of parts are provided, it NOT REQUIRED that every term in the fully rendered name appear in the list of parts.\n      Name parts in the parts list SHOULD be ordered in the natural order they would be used in the applicable cultural context.\n      If a full rendering of the name is not provided (i.e., the name has only been expressed in parts), a full rendering of the name MAY be derived (sans punctuation) by concatenating, in order, each name part value in the list of parts, separating each part with the name part separator appropriate for the applicable cultural context.",
          "properties": {
            "lang": {
              "$ref": "#/definitions/localeTag",
              "description": "The locale identifier for the name form."
            },
            "fullText": {
              "type": "string",
              "description": "A full rendering of the name (or as much of the name as is known)."
            },
            "parts": {
              "items": {
                "$ref": "#/definitions/namePart"
              },
              "description": "Any identified name parts from the name."
            }
          }
        },
        "fact": {
          "title": "PersonFact",
          "allOf": [
            {
              "$ref": "#/definitions/conclusion"
            },
            {
              "properties": {
                "type": {
                  "anyOf": [
                    {
                      "$ref": "#/definitions/uri"
                    },
                    {
                      "$ref": "#/definitions/personFactTypes"
                    }
                  ],
                  "description": "Enumerated value identifying the type of the fact."
                },
                "date": {
                  "$ref": "#/definitions/date",
                  "description": "The date of applicability of the fact."
                },
                "place": {
                  "$ref": "#/definitions/placeReference",
                  "description": "A reference to the place applicable to this fact."
                },
                "value": {
                  "type": "string",
                  "description": "The value of the fact."
                },
                "qualifiers": {
                  "items": {
                    "$ref": "#/definitions/factQualifier"
                  },
                  "description": "Qualifiers to add additional details about the fact."
                }
              },
              "required": [
                "type"
              ]
            }
          ]
        },
        "factQualifier": {
          "properties": {
            "name": {
              "anyOf": [
                {
                  "$ref": "#/definitions/factQualifierNames"
                },
                {
                  "$ref": "#/definitions/uri"
                }
              ]
            },
            "value": {
              "type": "string"
            }
          },
          "required": [
            "name"
          ]
        },
        "factQualifierNames": {
          "enum": [
            "http://gedcomx.org/Age",
            "http://gedcomx.org/Cause",
            "http://gedcomx.org/Religion",
            "http://gedcomx.org/Transport",
            "http://gedcomx.org/NonConsensual"
          ]
        },
        "eventRole": {
          "allOf": [
            {
              "$ref": "#/definitions/conclusion"
            },
            {
              "properties": {
                "person": {
                  "$ref": "#/definitions/resourceReference",
                  "description": "Reference to the event participant."
                },
                "type": {
                  "anyOf": [
                    {
                      "$ref": "#/definitions/uri"
                    },
                    {
                      "$ref": "#/definitions/eventRoleTypes"
                    }
                  ],
                  "description": "Enumerated value identifying the participant's role."
                },
                "details": {
                  "type": "string",
                  "description": "Details about the role of participant in the event."
                }
              },
              "required": [
                "person"
              ]
            }
          ]
        },
        "eventRoleTypes": {
          "enum": [
            "http://gedcomx.org/Principal",
            "http://gedcomx.org/Participant",
            "http://gedcomx.org/Official",
            "http://gedcomx.org/Witness"
          ]
        },
        "placeReference": {
          "type": "object",
          "properties": {
            "original": {
              "type": "string",
              "description": "The original place name text as supplied by the contributor."
            },
            "description": {
              "$ref": "#/definitions/uri",
              "description": "A reference to a description of this place."
            }
          }
        },
        "coverage": {
          "properties": {
            "spatial": {
              "$ref": "#/definitions/placeReference",
              "description": "The spatial (i.e., geographic) coverage."
            },
            "temporal": {
              "$ref": "#/definitions/date",
              "description": "The temporal coverage."
            }
          }
        },
        "groupRole": {
          "allOf": [
            {
              "$ref": "#/definitions/conclusion"
            },
            {
              "properties": {
                "person": {
                  "$ref": "#/definitions/resourceReference",
                  "description": "Reference to the group participant."
                },
                "type": {
                  "$ref": "#/definitions/uri",
                  "description": "Enumerated value identifying the participant's role."
                },
                "date": {
                  "$ref": "#/definitions/date",
                  "description": "The date of applicability of the role."
                },
                "details": {
                  "type": "string",
                  "description": "Details about the role of he participant in the group."
                }
              },
              "required": [
                "person"
              ]
            }
          ]
        },
        "person": {
          "title": "Person",
          "allOf": [
            {
              "$ref": "#/definitions/subject"
            },
            {
              "properties": {
                "private": {
                  "type": "boolean",
                  "description": "Whether this instance of Person has been designated for limited distribution or display."
                },
                "gender": {
                  "$ref": "#/definitions/gender",
                  "description": "The sex of the person as assigned at birth."
                },
                "names": {
                  "items": {
                    "$ref": "#/definitions/name"
                  },
                  "description": "The names of the person."
                },
                "facts": {
                  "items": {
                    "$ref": "#/definitions/fact"
                  },
                  "description": "The facts of the person."
                }
              }
            }
          ]
        },
        "relationship": {
          "allOf": [
            {
              "$ref": "#/definitions/subject"
            },
            {
              "properties": {
                "type": {
                  "anyOf": [
                    {
                      "$ref": "#/definitions/relationshipType"
                    },
                    {
                      "$ref": "#/definitions/uri"
                    }
                  ],
                  "description": "Enumerated value identifying the type of the relationship."
                },
                "person1": {
                  "$ref": "#/definitions/resourceReference",
                  "description": "Reference to the first person in the relationship."
                },
                "person2": {
                  "$ref": "#/definitions/resourceReference",
                  "description": "Reference to the second person in the relationship."
                },
                "facts": {
                  "items": {
                    "$ref": "#/definitions/fact"
                  },
                  "description": "The facts about the relationship."
                }
              },
              "required": [
                "person1",
                "person2"
              ]
            }
          ]
        },
        "relationshipType": {
          "enum": [
            "http://gedcomx.org/Couple",
            "http://gedcomx.org/ParentChild",
            "http://gedcomx.org/EnslavedBy"
          ]
        },
        "sourceDescription": {
          "title": "SourceDescription",
          "properties": {
            "id": {
              "type": "string",
              "description": "An identifier for the data structure holding the source description data."
            },
            "resourceType": {
              "anyOf": [
                {
                  "$ref": "#/definitions/resourceTypes"
                },
                {
                  "$ref": "#/definitions/uri"
                }
              ],
              "description": "Enumerated value identifying the type of resource being described."
            },
            "citations": {
              "items": {
                "$ref": "#/definitions/sourceCitation"
              },
              "description": "The citation(s) for this source."
            },
            "mediaType": {
              "type": "string",
              "description": "A hint about the media type of the resource being described."
            },
            "about": {
              "$ref": "#/definitions/uri",
              "description": "A uniform resource identifier (URI) for the resource being described."
            },
            "mediator": {
              "$ref": "#/definitions/resourceReference",
              "description": "A reference to the entity that mediates access to the described source."
            },
            "publisher": {
              "$ref": "#/definitions/resourceReference",
              "description": "A reference to the entity responsible for making the described source available."
            },
            "sources": {
              "items": {
                "$ref": "#/definitions/sourceReference"
              },
              "description": "A list of references to any sources from which this source is derived."
            },
            "analysis": {
              "$ref": "#/definitions/resourceReference",
              "description": "A reference to a document containing analysis about this source."
            },
            "componentOf": {
              "$ref": "#/definitions/sourceReference",
              "description": "A reference to the source that contains this source, i.e. its parent context. Used when the description of a source is not complete without the description of its parent (or containing) source."
            },
            "titles": {
              "items": {
                "$ref": "#/definitions/textValue"
              },
              "description": "The display name(s) for this source."
            },
            "notes": {
              "items": {
                "$ref": "#/definitions/note"
              },
              "description": "A list of notes about a source."
            },
            "attribution": {
              "$ref": "#/definitions/attribution",
              "description": "The attribution of this source description."
            },
            "rights": {
              "items": {
                "$ref": "#/definitions/resourceReference"
              },
              "description": "The rights for this resource."
            },
            "coverage": {
              "$ref": "#/definitions/coverage",
              "description": "The coverage of the resource."
            },
            "descriptions": {
              "items": {
                "$ref": "#/definitions/textValue"
              },
              "description": "Human-readable descriptions of this source."
            },
            "identifiers": {
              "items": {
                "$ref": "#/definitions/identifier"
              },
              "description": "A list of identifiers for the resource being described."
            },
            "created": {
              "type": "number",
              "description": "Timestamp of when the resource being described was created."
            },
            "modified": {
              "type": "number",
              "description": "Timestamp of when the resource being described was modified."
            },
            "repository": {
              "$ref": "#/definitions/resourceReference",
              "description": "A reference to the repository that contains the described resource."
            }
          },
          "required": [
            "citations"
          ]
        },
        "resourceTypes": {
          "enum": [
            "http://gedcomx.org/Collection",
            "http://gedcomx.org/PhysicalArtifact",
            "http://gedcomx.org/DigitalArtifact",
            "http://gedcomx.org/Record"
          ]
        },
        "agent": {
          "title": "Agent",
          "properties": {
            "id": {
              "type": "string"
            },
            "identifiers": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/identifier"
              }
            },
            "names": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/textValue"
              }
            },
            "homepage": {
              "$ref": "#/definitions/resourceReference"
            },
            "openid": {
              "$ref": "#/definitions/resourceReference"
            },
            "accounts": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/onlineAccount"
              }
            },
            "emails": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/resourceReference"
              }
            },
            "phones": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/resourceReference"
              }
            },
            "addresses": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/address"
              }
            },
            "person": {
              "$ref": "#/definitions/resourceReference"
            }
          }
        },
        "event": {
          "allOf": [
            {
              "$ref": "#/definitions/subject"
            },
            {
              "properties": {
                "type": {
                  "anyOf": [
                    {
                      "$ref": "#/definitions/eventTypes"
                    },
                    {
                      "$ref": "#/definitions/uri"
                    }
                  ]
                },
                "date": {
                  "$ref": "#/definitions/date"
                },
                "place": {
                  "$ref": "#/definitions/placeReference"
                },
                "roles": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/eventRole"
                  }
                }
              }
            }
          ]
        },
        "eventTypes": {
          "enum": [
            "http://gedcomx.org/Adoption",
            "http://gedcomx.org/AdultChristening",
            "http://gedcomx.org/Annulment",
            "http://gedcomx.org/Baptism",
            "http://gedcomx.org/BarMitzvah",
            "http://gedcomx.org/BatMitzvah",
            "http://gedcomx.org/Birth",
            "http://gedcomx.org/Blessing",
            "http://gedcomx.org/Burial",
            "http://gedcomx.org/Census",
            "http://gedcomx.org/Christening",
            "http://gedcomx.org/Circumcision",
            "http://gedcomx.org/Confirmation",
            "http://gedcomx.org/Cremation",
            "http://gedcomx.org/Death",
            "http://gedcomx.org/Divorce",
            "http://gedcomx.org/DivorceFiling",
            "http://gedcomx.org/Education",
            "http://gedcomx.org/Engagement",
            "http://gedcomx.org/Emigration",
            "http://gedcomx.org/Excommunication",
            "http://gedcomx.org/FirstCommunion",
            "http://gedcomx.org/Funeral",
            "http://gedcomx.org/Immigration",
            "http://gedcomx.org/LandTransaction",
            "http://gedcomx.org/Marriage",
            "http://gedcomx.org/MilitaryAward",
            "http://gedcomx.org/MilitaryDischarge",
            "http://gedcomx.org/Mission",
            "http://gedcomx.org/MoveFrom",
            "http://gedcomx.org/MoveTo",
            "http://gedcomx.org/Naturalization",
            "http://gedcomx.org/Ordination",
            "http://gedcomx.org/Retirement"
          ]
        },
        "document": {
          "title": "Document",
          "allOf": [
            {
              "$ref": "#/definitions/conclusion"
            },
            {
              "properties": {
                "type": {
                  "anyOf": [
                    {
                      "$ref": "#/definitions/documentTypes"
                    },
                    {
                      "$ref": "#/definitions/uri"
                    }
                  ]
                },
                "extracted": {
                  "type": "boolean"
                },
                "textType": {
                  "type": "string"
                },
                "text": {
                  "type": "string"
                },
                "attribution": {
                  "$ref": "#/definitions/attribution"
                }
              },
              "required": [
                "text"
              ]
            }
          ]
        },
        "documentTypes": {
          "enum": [
            "http://gedcomx.org/Abstract",
            "http://gedcomx.org/Transcription",
            "http://gedcomx.org/Translation",
            "http://gedcomx.org/Analysis"
          ]
        },
        "placeDescription": {
          "title": "PlaceDescription",
          "allOf": [
            {
              "$ref": "#/definitions/subject"
            },
            {
              "properties": {
                "names": {
                  "items": {
                    "$ref": "#/definitions/textValue"
                  }
                },
                "type": {
                  "$ref": "#/definitions/uri"
                },
                "place": {
                  "$ref": "#/definitions/resourceReference"
                },
                "jurisdiction": {
                  "$ref": "#/definitions/resourceReference"
                },
                "latitude": {
                  "type": "number"
                },
                "longitude": {
                  "type": "number"
                },
                "temporalDescription": {
                  "$ref": "#/definitions/date"
                },
                "spatialDescription": {
                  "$ref": "#/definitions/resourceReference"
                }
              },
              "required": [
                "names"
              ]
            }
          ]
        },
        "group": {
          "allOf": [
            {
              "$ref": "#/definitions/subject"
            },
            {
              "properties": {
                "names": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/textValue"
                  }
                },
                "date": {
                  "$ref": "#/definitions/date"
                },
                "place": {
                  "$ref": "#/definitions/resourceReference"
                },
                "roles": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/groupRole"
                  }
                }
              },
              "required": [
                "names"
              ]
            }
          ]
        }
      },
      "type": "object",
      "properties": {
        "persons": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/person"
          }
        },
        "relationships": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/relationship"
          }
        },
        "sourceDescriptions": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/sourceDescription"
          }
        },
        "agents": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/agent"
          }
        },
        "events": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/event"
          }
        },
        "documents": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/document"
          }
        },
        "places": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/placeDescription"
          }
        },
        "groups": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/group"
          }
        },
        "description": {
          "$ref": "#/definitions/uri"
        },
        "id": {
          "type": "string"
        },
        "lang": {
          "$ref": "#/definitions/localeTag"
        },
        "attribution": {
          "$ref": "#/definitions/attribution"
        }
      }
    },
    "uischema": {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Persons",
          "elements": [
            {
              "type": "ListWithDetail",
              "scope": "#/properties/persons"
            }
          ]
        },
        {
          "type": "Category",
          "label": "Relationships",
          "elements": [
            {
              "type": "ListWithDetail",
              "scope": "#/properties/relationships"
            }
          ]
        },
        {
          "type": "Category",
          "label": "SourceDescriptions",
          "elements": [
            {
              "type": "ListWithDetail",
              "scope": "#/properties/sourceDescriptions"
            }
          ]
        },
        {
          "type": "Category",
          "label": "Agents",
          "elements": [
            {
              "type": "ListWithDetail",
              "scope": "#/properties/agents"
            }
          ]
        },
        {
          "type": "Category",
          "label": "Events",
          "elements": [
            {
              "type": "ListWithDetail",
              "scope": "#/properties/events"
            }
          ]
        },
        {
          "type": "Category",
          "label": "Documents",
          "elements": [
            {
              "type": "ListWithDetail",
              "scope": "#/properties/documents"
            }
          ]
        },
        {
          "type": "Category",
          "label": "Places",
          "elements": [
            {
              "type": "ListWithDetail",
              "scope": "#/properties/places"
            }
          ]
        },
        {
          "type": "Category",
          "label": "Generic",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/description"
            },
            {
              "type": "Control",
              "scope": "#/properties/lang"
            },
            {
              "type": "Control",
              "scope": "#/properties/attribution"
            },
            {
              "type": "Control",
              "scope": "#/properties/id"
            }
          ]
        }
      ]
    }
  },
  {
    "name": "ifthenelse",
    "label": "If Then Else",
    "data": {},
    "schema": {
      "type": "object",
      "properties": {
        "b": {
          "type": "boolean"
        },
        "c": {
          "type": "string",
          "minLength": 1
        }
      },
      "if": {
        "properties": {
          "b": {
            "enum": [
              false
            ]
          }
        }
      },
      "then": {
        "required": [
          "c"
        ]
      }
    }
  },
  {
    "name": "1884",
    "label": "Issue 1884 - Nested enable/disable",
    "data": {
      "firstName": "Max",
      "lastName": "Power",
      "committer": false
    },
    "schema": {
      "type": "object",
      "required": [
        "age"
      ],
      "properties": {
        "firstName": {
          "type": "string",
          "minLength": 2,
          "maxLength": 20
        },
        "lastName": {
          "type": "string",
          "minLength": 5,
          "maxLength": 15
        },
        "age": {
          "type": "integer",
          "minimum": 18,
          "maximum": 100
        },
        "gender": {
          "type": "string",
          "enum": [
            "Male",
            "Female",
            "Undisclosed"
          ]
        },
        "height": {
          "type": "number"
        },
        "dateOfBirth": {
          "type": "string",
          "format": "date"
        },
        "rating": {
          "type": "integer"
        },
        "committer": {
          "type": "boolean"
        },
        "address": {
          "type": "object",
          "properties": {
            "street": {
              "type": "string"
            },
            "streetnumber": {
              "type": "string"
            },
            "postalCode": {
              "type": "string"
            },
            "city": {
              "type": "string"
            }
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Label",
          "text": "Toggle the committer boolean to enable/disable the address block."
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/firstName"
            },
            {
              "type": "Control",
              "scope": "#/properties/lastName"
            }
          ]
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/age"
            },
            {
              "type": "Control",
              "scope": "#/properties/dateOfBirth"
            }
          ]
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/height"
            },
            {
              "type": "Control",
              "scope": "#/properties/gender"
            },
            {
              "type": "Control",
              "scope": "#/properties/committer"
            }
          ]
        },
        {
          "type": "Group",
          "label": "Address for Shipping T-Shirt",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/street"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/streetnumber"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/postalCode"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/address/properties/city"
                }
              ]
            }
          ],
          "rule": {
            "effect": "ENABLE",
            "condition": {
              "scope": "#/properties/committer",
              "schema": {
                "const": true
              }
            }
          }
        }
      ]
    }
  },
  {
    "name": "1948_without",
    "label": "Issue 1948 - Array renderer selection (w/o schema)",
    "data": {
      "import": [
        {
          "document": "Document1",
          "package": "Package1",
          "prefix": "Prefix"
        }
      ]
    }
  },
  {
    "name": "1948_with",
    "label": "Issue 1948 - Array renderer selection (with schema)",
    "data": {
      "import": [
        {
          "document": "Document1",
          "package": "Package1",
          "prefix": "Prefix"
        }
      ]
    },
    "schema": {
      "type": "object",
      "definitions": {
        "import": {
          "title": "Import",
          "type": "object",
          "properties": {
            "eClass": {
              "const": "http://my_schema/1.0.0#//Import"
            },
            "document": {
              "type": "string"
            },
            "package": {
              "type": "string"
            },
            "prefix": {
              "type": "string"
            }
          }
        }
      },
      "properties": {
        "import": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/import"
          }
        }
      }
    }
  },
  {
    "name": "layout-complex",
    "label": "Layout Complex",
    "data": {
      "name": "John Doe",
      "vegetarian": false,
      "birthDate": "1985-06-02",
      "personalData": {
        "age": 34
      },
      "postalCode": "12345"
    },
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your name"
        },
        "vegetarian": {
          "type": "boolean"
        },
        "birthDate": {
          "type": "string",
          "format": "date"
        },
        "nationality": {
          "type": "string",
          "enum": [
            "DE",
            "IT",
            "JP",
            "US",
            "RU",
            "Other"
          ]
        },
        "personalData": {
          "type": "object",
          "properties": {
            "age": {
              "type": "integer",
              "description": "Please enter your age."
            },
            "height": {
              "type": "number"
            },
            "drivingSkill": {
              "type": "number",
              "maximum": 10,
              "minimum": 1,
              "default": 7
            }
          },
          "required": [
            "age",
            "height"
          ]
        },
        "occupation": {
          "type": "string"
        },
        "postalCode": {
          "type": "string",
          "maxLength": 5
        }
      },
      "required": [
        "occupation",
        "nationality"
      ]
    },
    "uischema": {
      "type": "Group",
      "label": "My Group",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "Control",
                  "label": "Name",
                  "scope": "#/properties/name"
                },
                {
                  "type": "Control",
                  "label": "Birth Date",
                  "scope": "#/properties/birthDate"
                }
              ]
            },
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "Control",
                  "label": "Name",
                  "scope": "#/properties/name"
                },
                {
                  "type": "Control",
                  "label": "Birth Date",
                  "scope": "#/properties/birthDate"
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "name": "layout-group",
    "label": "Layout Group",
    "data": {
      "name": "John Doe",
      "vegetarian": false,
      "birthDate": "1985-06-02",
      "personalData": {
        "age": 34
      },
      "postalCode": "12345"
    },
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your name"
        },
        "vegetarian": {
          "type": "boolean"
        },
        "birthDate": {
          "type": "string",
          "format": "date"
        },
        "nationality": {
          "type": "string",
          "enum": [
            "DE",
            "IT",
            "JP",
            "US",
            "RU",
            "Other"
          ]
        },
        "personalData": {
          "type": "object",
          "properties": {
            "age": {
              "type": "integer",
              "description": "Please enter your age."
            },
            "height": {
              "type": "number"
            },
            "drivingSkill": {
              "type": "number",
              "maximum": 10,
              "minimum": 1,
              "default": 7
            }
          },
          "required": [
            "age",
            "height"
          ]
        },
        "occupation": {
          "type": "string"
        },
        "postalCode": {
          "type": "string",
          "maxLength": 5
        }
      },
      "required": [
        "occupation",
        "nationality"
      ]
    },
    "uischema": {
      "type": "Group",
      "label": "My Group",
      "elements": [
        {
          "type": "Control",
          "label": "Name",
          "scope": "#/properties/name"
        },
        {
          "type": "Control",
          "label": "Birth Date",
          "scope": "#/properties/birthDate"
        }
      ]
    }
  },
  {
    "name": "layout-horizontal",
    "label": "Layout Horizontal",
    "data": {
      "name": "John Doe",
      "vegetarian": false,
      "birthDate": "1985-06-02",
      "personalData": {
        "age": 34
      },
      "postalCode": "12345"
    },
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your name"
        },
        "vegetarian": {
          "type": "boolean"
        },
        "birthDate": {
          "type": "string",
          "format": "date"
        },
        "nationality": {
          "type": "string",
          "enum": [
            "DE",
            "IT",
            "JP",
            "US",
            "RU",
            "Other"
          ]
        },
        "personalData": {
          "type": "object",
          "properties": {
            "age": {
              "type": "integer",
              "description": "Please enter your age."
            },
            "height": {
              "type": "number"
            },
            "drivingSkill": {
              "type": "number",
              "maximum": 10,
              "minimum": 1,
              "default": 7
            }
          },
          "required": [
            "age",
            "height"
          ]
        },
        "occupation": {
          "type": "string"
        },
        "postalCode": {
          "type": "string",
          "maxLength": 5
        }
      },
      "required": [
        "occupation",
        "nationality"
      ]
    },
    "uischema": {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Control",
          "label": "Name",
          "scope": "#/properties/name"
        },
        {
          "type": "Control",
          "label": "Birth Date",
          "scope": "#/properties/birthDate"
        }
      ]
    }
  },
  {
    "name": "layout-vertical",
    "label": "Layout Vertical",
    "data": {
      "name": "John Doe",
      "vegetarian": false,
      "birthDate": "1985-06-02",
      "personalData": {
        "age": 34
      },
      "postalCode": "12345"
    },
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your name"
        },
        "vegetarian": {
          "type": "boolean"
        },
        "birthDate": {
          "type": "string",
          "format": "date"
        },
        "nationality": {
          "type": "string",
          "enum": [
            "DE",
            "IT",
            "JP",
            "US",
            "RU",
            "Other"
          ]
        },
        "personalData": {
          "type": "object",
          "properties": {
            "age": {
              "type": "integer",
              "description": "Please enter your age."
            },
            "height": {
              "type": "number"
            },
            "drivingSkill": {
              "type": "number",
              "maximum": 10,
              "minimum": 1,
              "default": 7
            }
          },
          "required": [
            "age",
            "height"
          ]
        },
        "occupation": {
          "type": "string"
        },
        "postalCode": {
          "type": "string",
          "maxLength": 5
        }
      },
      "required": [
        "occupation",
        "nationality"
      ]
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "label": "Name",
          "scope": "#/properties/name"
        },
        {
          "type": "Control",
          "label": "Birth Date",
          "scope": "#/properties/birthDate"
        }
      ]
    }
  },
  {
    "name": "list-with-detail",
    "label": "List With Detail",
    "data": {
      "orders": [
        {
          "customer": {
            "id": "471201",
            "name": "Sirius Cybernetics Corporation",
            "department": "Complaints Division"
          },
          "title": "42 killer robots",
          "ordered": true,
          "processId": "1890004498",
          "assignee": "Philip J. Fry",
          "status": "ordered",
          "startDate": "2018-06-01",
          "endDate": "2018-08-01"
        },
        {
          "customer": {
            "id": "471202",
            "name": "Very Big Corporation of America"
          },
          "title": "1000 gallons of MomCorp Oil",
          "processId": "1890004499",
          "assignee": "Jen Barber",
          "startDate": "2018-07-01",
          "status": "planned"
        }
      ]
    },
    "schema": {
      "definitions": {
        "order": {
          "type": "object",
          "properties": {
            "customer": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "name": {
                  "type": "string",
                  "format": "email"
                },
                "department": {
                  "type": "string"
                }
              }
            },
            "title": {
              "type": "string",
              "minLength": 5,
              "title": "Official Title"
            },
            "ordered": {
              "type": "boolean"
            },
            "processId": {
              "type": "number",
              "minimum": 0
            },
            "assignee": {
              "type": "string"
            },
            "startDate": {
              "type": "string",
              "format": "date"
            },
            "endDate": {
              "type": "string",
              "format": "date"
            },
            "status": {
              "type": "string",
              "enum": [
                "unordered",
                "planned",
                "ordered"
              ]
            }
          },
          "required": [
            "title"
          ]
        }
      },
      "type": "object",
      "properties": {
        "orders": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/order"
          }
        }
      }
    },
    "uischema": {
      "type": "ListWithDetail",
      "scope": "#/properties/orders",
      "options": {
        "labelRef": "#/items/properties/customer/properties/name",
        "detail": {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/title"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/processId"
                }
              ]
            },
            {
              "type": "Group",
              "label": "Customer",
              "elements": [
                {
                  "type": "Control",
                  "label": "ID",
                  "scope": "#/properties/customer/properties/id"
                },
                {
                  "type": "Control",
                  "label": "Name",
                  "scope": "#/properties/customer/properties/name"
                },
                {
                  "type": "Control",
                  "label": "Department",
                  "scope": "#/properties/customer/properties/department"
                }
              ]
            },
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/ordered",
                          "options": {
                            "toggle": true
                          }
                        },
                        {
                          "type": "Control",
                          "scope": "#/properties/assignee"
                        }
                      ]
                    },
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/startDate"
                        },
                        {
                          "type": "Control",
                          "scope": "#/properties/endDate"
                        }
                      ]
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/status"
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "name": "list-with-detail-no-labelref",
    "label": "List With Detail (No Label Ref)",
    "data": {
      "orders": [
        {
          "customer": {
            "id": "471201",
            "name": "Sirius Cybernetics Corporation",
            "department": "Complaints Division"
          },
          "title": "42 killer robots",
          "ordered": true,
          "processId": "1890004498",
          "assignee": "Philip J. Fry",
          "status": "ordered",
          "startDate": "2018-06-01",
          "endDate": "2018-08-01"
        },
        {
          "customer": {
            "id": "471202",
            "name": "Very Big Corporation of America"
          },
          "title": "1000 gallons of MomCorp Oil",
          "processId": "1890004499",
          "assignee": "Jen Barber",
          "startDate": "2018-07-01",
          "status": "planned"
        }
      ]
    },
    "schema": {
      "definitions": {
        "order": {
          "type": "object",
          "properties": {
            "customer": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "name": {
                  "type": "string",
                  "format": "email"
                },
                "department": {
                  "type": "string"
                }
              }
            },
            "title": {
              "type": "string",
              "minLength": 5,
              "title": "Official Title"
            },
            "ordered": {
              "type": "boolean"
            },
            "processId": {
              "type": "number",
              "minimum": 0
            },
            "assignee": {
              "type": "string"
            },
            "startDate": {
              "type": "string",
              "format": "date"
            },
            "endDate": {
              "type": "string",
              "format": "date"
            },
            "status": {
              "type": "string",
              "enum": [
                "unordered",
                "planned",
                "ordered"
              ]
            }
          },
          "required": [
            "title"
          ]
        }
      },
      "type": "object",
      "properties": {
        "orders": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/order"
          }
        }
      }
    },
    "uischema": {
      "type": "ListWithDetail",
      "scope": "#/properties/orders",
      "options": {
        "detail": {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/title"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/processId"
                }
              ]
            },
            {
              "type": "Group",
              "label": "Customer",
              "elements": [
                {
                  "type": "Control",
                  "label": "ID",
                  "scope": "#/properties/customer/properties/id"
                },
                {
                  "type": "Control",
                  "label": "Name",
                  "scope": "#/properties/customer/properties/name"
                },
                {
                  "type": "Control",
                  "label": "Department",
                  "scope": "#/properties/customer/properties/department"
                }
              ]
            },
            {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/ordered",
                          "options": {
                            "toggle": true
                          }
                        },
                        {
                          "type": "Control",
                          "scope": "#/properties/assignee"
                        }
                      ]
                    },
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/startDate"
                        },
                        {
                          "type": "Control",
                          "scope": "#/properties/endDate"
                        }
                      ]
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/status"
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "name": "list-with-detail-registered",
    "label": "List With Detail (Registered Detail UISchema)",
    "data": {
      "warehouseitems": [
        {
          "name": "Fantasy Book",
          "buyer": {
            "email": "buyerA@info.org",
            "age": 18
          },
          "status": "warehouse"
        },
        {
          "name": "Boardgame",
          "buyer": {
            "email": "buyerB@info.org",
            "age": 45
          },
          "status": "shipping"
        },
        {
          "name": "Energy Drink",
          "buyer": {
            "email": "buyerC@info.org",
            "age": 90
          },
          "status": "delivered"
        }
      ]
    },
    "schema": {
      "definitions": {
        "warehouseitem": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "buyer": {
              "type": "object",
              "properties": {
                "email": {
                  "type": "string",
                  "format": "email"
                },
                "age": {
                  "type": "number"
                }
              }
            },
            "status": {
              "type": "string",
              "enum": [
                "warehouse",
                "shipping",
                "delivered"
              ]
            }
          },
          "required": [
            "name"
          ]
        }
      },
      "type": "object",
      "properties": {
        "warehouseitems": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/warehouseitem"
          }
        }
      }
    },
    "uischema": {
      "type": "ListWithDetail",
      "scope": "#/properties/warehouseitems",
      "options": {
        "labelRef": "#/items/properties/name"
      }
    }
  },
  {
    "name": "list-with-detail-primitive-number",
    "label": "List With Detail primitive (number)",
    "data": {
      "an-array-of-numbers": [
        1,
        2,
        3
      ]
    },
    "schema": {
      "type": "object",
      "properties": {
        "an-array-of-numbers": {
          "type": "array",
          "items": {
            "type": "number"
          }
        }
      }
    },
    "uischema": {
      "type": "ListWithDetail",
      "scope": "#/properties/an-array-of-numbers"
    }
  },
  {
    "name": "list-with-detail-primitive-string",
    "label": "List With Detail primitive (string)",
    "data": {
      "an-array-of-strings": [
        "foo",
        "bar",
        "foobar"
      ]
    },
    "schema": {
      "type": "object",
      "properties": {
        "an-array-of-strings": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "uischema": {
      "type": "ListWithDetail",
      "scope": "#/properties/an-array-of-strings"
    }
  },
  {
    "name": "nestedArray",
    "label": "Nested Array",
    "data": {
      "exampleArray": [
        {
          "choices": [
            "This",
            "is",
            "an",
            "example"
          ],
          "name": "Hi there"
        }
      ]
    },
    "schema": {
      "definitions": {
        "choicesContainer": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "choices": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        }
      },
      "type": "object",
      "properties": {
        "exampleArray": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/choicesContainer"
          }
        }
      }
    },
    "uischema": {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Control",
          "label": {
            "text": "Example Array",
            "show": true
          },
          "scope": "#/properties/exampleArray"
        }
      ]
    },
    "actions": [
      {
        "label": "Register NestedArray UISchema"
      },
      {
        "label": "Unregister NestedArray UISchema"
      }
    ]
  },
  {
    "name": "nestedCategorization",
    "label": "Nested Categorization",
    "data": {},
    "schema": {
      "type": "object",
      "properties": {
        "cat1": {
          "type": "object",
          "properties": {
            "subcat11": {
              "type": "string"
            }
          }
        },
        "cat2": {
          "type": "object",
          "properties": {
            "subcat21": {
              "type": "string"
            },
            "subcat22": {
              "type": "string"
            }
          }
        },
        "cat3": {
          "type": "object",
          "properties": {
            "subcat31": {
              "type": "string"
            },
            "subcat32": {
              "type": "string"
            },
            "subcat33": {
              "type": "string"
            }
          }
        }
      }
    },
    "uischema": {
      "type": "Categorization",
      "elements": [
        {
          "type": "Category",
          "label": "Cat1",
          "elements": [
            {
              "type": "Categorization",
              "elements": [
                {
                  "type": "Category",
                  "label": "SubCat1-1",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/cat1/properties/subcat11"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "Category",
          "label": "Cat2",
          "elements": [
            {
              "type": "Categorization",
              "elements": [
                {
                  "type": "Category",
                  "label": "SubCat2-1",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/cat2/properties/subcat21"
                    }
                  ]
                },
                {
                  "type": "Category",
                  "label": "SubCat2-2",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/cat2/properties/subcat22"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "Category",
          "label": "Cat3",
          "elements": [
            {
              "type": "Categorization",
              "elements": [
                {
                  "type": "Category",
                  "label": "SubCat3-1",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/cat3/properties/subcat31"
                    }
                  ]
                },
                {
                  "type": "Category",
                  "label": "SubCat3-2",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/cat3/properties/subcat32"
                    }
                  ]
                },
                {
                  "type": "Category",
                  "label": "SubCat3-3",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/cat3/properties/subcat33"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "name": "numbers",
    "label": "Numbers",
    "data": {},
    "schema": {
      "type": "object",
      "properties": {
        "price": {
          "type": "number",
          "maximum": 100,
          "minimum": 1,
          "default": 50
        },
        "age": {
          "type": "integer"
        },
        "height": {
          "type": "number"
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/price",
              "label": {
                "text": "Price"
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/age"
            },
            {
              "type": "Control",
              "scope": "#/properties/height"
            },
            {
              "type": "Control",
              "scope": "#/properties/price",
              "label": {
                "text": "Price with Slider"
              },
              "options": {
                "slider": true
              }
            }
          ]
        }
      ]
    }
  },
  {
    "name": "object",
    "label": "Object",
    "data": {
      "address": {
        "street_address": "1600 Pennsylvania Avenue NW",
        "city": "Washington",
        "state": "DC"
      }
    },
    "schema": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "properties": {
        "address": {
          "type": "object",
          "properties": {
            "street_address": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "state": {
              "type": "string"
            }
          },
          "required": [
            "street_address",
            "city",
            "state"
          ]
        },
        "user": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "mail": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "mail"
          ]
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/address"
        },
        {
          "type": "Control",
          "scope": "#/properties/user",
          "rule": {
            "effect": "SHOW",
            "condition": {
              "type": "LEAF",
              "scope": "#/properties/address/properties/state",
              "expectedValue": "DC"
            }
          },
          "options": {
            "detail": {
              "type": "Group",
              "label": "User Data",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/name"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/mail"
                }
              ]
            }
          }
        }
      ]
    }
  },
  {
    "name": "rootObject",
    "label": "Object - Root Scope",
    "data": {
      "address": {
        "street_address": "1600 Pennsylvania Avenue NW",
        "city": "Washington",
        "state": "DC"
      }
    },
    "schema": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "properties": {
        "address": {
          "type": "object",
          "properties": {
            "street_address": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "state": {
              "type": "string"
            }
          },
          "required": [
            "street_address",
            "city",
            "state"
          ]
        },
        "user": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "mail": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "mail"
          ]
        }
      }
    },
    "uischema": {
      "type": "Control",
      "scope": "#"
    }
  },
  {
    "name": "onChange",
    "label": "On Change Listener",
    "data": {},
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string",
          "minLength": 1
        }
      },
      "required": [
        "name",
        "description"
      ]
    }
  },
  {
    "name": "oneOf",
    "label": "oneOf",
    "data": {
      "name": "test",
      "addressOrUser": {
        "name": "User",
        "mail": "mail@example.com"
      }
    },
    "schema": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "definitions": {
        "address": {
          "type": "object",
          "properties": {
            "street_address": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "state": {
              "type": "string"
            }
          },
          "required": [
            "street_address",
            "city",
            "state"
          ],
          "additionalProperties": false
        },
        "user": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "mail": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "mail"
          ],
          "additionalProperties": false
        }
      },
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "addressOrUser": {
          "oneOf": [
            {
              "$ref": "#/definitions/address"
            },
            {
              "$ref": "#/definitions/user"
            }
          ]
        }
      },
      "required": [
        "name"
      ]
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/name"
        },
        {
          "type": "Control",
          "scope": "#/properties/addressOrUser"
        }
      ]
    }
  },
  {
    "name": "oneOfArray",
    "label": "oneOf - Inside array items",
    "data": {
      "name": "test",
      "addressOrUsers": [
        {
          "street_address": "1600 Pennsylvania Avenue NW",
          "city": "Washington",
          "state": "DC"
        },
        {
          "name": "User",
          "mail": "user@user.user"
        }
      ]
    },
    "schema": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "definitions": {
        "address": {
          "type": "object",
          "properties": {
            "street_address": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "state": {
              "type": "string"
            }
          },
          "required": [
            "street_address",
            "city",
            "state"
          ]
        },
        "user": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "mail": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "mail"
          ]
        }
      },
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "addressOrUsers": {
          "type": "array",
          "items": {
            "oneOf": [
              {
                "$ref": "#/definitions/address"
              },
              {
                "$ref": "#/definitions/user"
              }
            ]
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/addressOrUsers"
        }
      ]
    }
  },
  {
    "name": "oneOf_1273",
    "label": "oneOf - Preselection for Objects (Issue 1273)",
    "data": {
      "quantity": {
        "valueLow": 1,
        "valueHigh": 100,
        "unit": "kg"
      }
    },
    "schema": {
      "type": "object",
      "properties": {
        "quantity": {
          "oneOf": [
            {
              "$ref": "#/definitions/unrangedQuantity"
            },
            {
              "$ref": "#/definitions/rangedQuantity"
            }
          ]
        }
      },
      "definitions": {
        "unrangedQuantity": {
          "title": "Value",
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "unit": {
              "type": "string"
            }
          },
          "required": [
            "value",
            "unit"
          ]
        },
        "rangedQuantity": {
          "title": "Range",
          "type": "object",
          "properties": {
            "valueLow": {
              "type": "number"
            },
            "valueHigh": {
              "type": "number",
              "maximum": 10
            },
            "unit": {
              "type": "string"
            }
          },
          "required": [
            "valueLow",
            "valueHigh",
            "unit"
          ]
        }
      }
    }
  },
  {
    "name": "oneOf_1273_simple",
    "label": "oneOf - Preselection for Primitives (Issue 1273 )",
    "data": {
      "quantity": 5
    },
    "schema": {
      "type": "object",
      "properties": {
        "quantity": {
          "oneOf": [
            {
              "type": "string"
            },
            {
              "type": "number"
            }
          ]
        }
      }
    }
  },
  {
    "name": "oneOf_1265_array",
    "label": "oneOf - Validation for Arrays (Issue 1265)",
    "data": {
      "coloursOrNumbers": [
        "Foo"
      ]
    },
    "schema": {
      "type": "object",
      "properties": {
        "coloursOrNumbers": {
          "oneOf": [
            {
              "$ref": "#/definitions/colours"
            },
            {
              "$ref": "#/definitions/numbers"
            },
            {
              "$ref": "#/definitions/shapes"
            }
          ]
        }
      },
      "definitions": {
        "colours": {
          "title": "Colours",
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Type",
            "type": "string",
            "enum": [
              "Red",
              "Green",
              "Blue"
            ]
          }
        },
        "numbers": {
          "title": "Numbers",
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Type",
            "type": "string",
            "enum": [
              "One",
              "Two",
              "Three"
            ]
          }
        },
        "shapes": {
          "title": "Shapes",
          "type": "array",
          "minItems": 1,
          "items": {
            "title": "Type",
            "type": "string",
            "enum": [
              "Circle",
              "Triangle",
              "Square"
            ]
          }
        }
      }
    }
  },
  {
    "name": "oneOf_1265_object",
    "label": "oneOf - Validation for Objects (Issue 1265)",
    "data": {
      "coloursOrNumbers": {
        "colour": "Foo"
      }
    },
    "schema": {
      "type": "object",
      "properties": {
        "coloursOrNumbers": {
          "oneOf": [
            {
              "$ref": "#/definitions/colours"
            },
            {
              "$ref": "#/definitions/numbers"
            },
            {
              "$ref": "#/definitions/shapes"
            }
          ]
        }
      },
      "additionalProperties": false,
      "definitions": {
        "colours": {
          "title": "Colours",
          "type": "object",
          "properties": {
            "colour": {
              "title": "Type",
              "type": "string",
              "enum": [
                "Red",
                "Green",
                "Blue"
              ]
            }
          },
          "additionalProperties": false
        },
        "numbers": {
          "title": "Numbers",
          "type": "object",
          "properties": {
            "number": {
              "title": "Type",
              "type": "string",
              "enum": [
                "One",
                "Two",
                "Three"
              ]
            }
          },
          "additionalProperties": false
        },
        "shapes": {
          "title": "Shapes",
          "type": "object",
          "properties": {
            "shape": {
              "title": "Type",
              "type": "string",
              "enum": [
                "Circle",
                "Triangle",
                "Square"
              ]
            }
          },
          "additionalProperties": false
        }
      }
    }
  },
  {
    "name": "oneOf_1265_simple",
    "label": "oneOf - Validation for Primitives (Issue 1265)",
    "data": {
      "coloursOrNumbers": "Foo"
    },
    "schema": {
      "type": "object",
      "properties": {
        "coloursOrNumbers": {
          "oneOf": [
            {
              "$ref": "#/definitions/colours"
            },
            {
              "$ref": "#/definitions/numbers"
            },
            {
              "$ref": "#/definitions/shapes"
            }
          ]
        }
      },
      "definitions": {
        "colours": {
          "title": "Colours",
          "type": "string",
          "enum": [
            "Red",
            "Green",
            "Blue"
          ]
        },
        "numbers": {
          "title": "Numbers",
          "type": "string",
          "enum": [
            "One",
            "Two",
            "Three"
          ]
        },
        "shapes": {
          "title": "Shapes",
          "type": "string",
          "enum": [
            "Circle",
            "Triangle",
            "Square"
          ]
        }
      }
    }
  },
  {
    "name": "oneOf-recursive",
    "label": "oneOf recursive",
    "data": {},
    "schema": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "definitions": {
        "fileOrFolder": {
          "title": "fileOrFolder",
          "oneOf": [
            {
              "$ref": "#/definitions/file"
            },
            {
              "$ref": "#/definitions/folder"
            }
          ]
        },
        "file": {
          "title": "File",
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            }
          }
        },
        "folder": {
          "type": "object",
          "title": "Folder",
          "properties": {
            "name": {
              "type": "string"
            },
            "children": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/fileOrFolder"
              }
            }
          }
        }
      },
      "type": "object",
      "properties": {
        "root": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/folder"
          }
        }
      }
    },
    "uischema": {
      "type": "Control",
      "scope": "#"
    }
  },
  {
    "name": "person",
    "label": "Person",
    "data": {
      "name": "John Doe",
      "vegetarian": false,
      "birthDate": "1985-06-02",
      "personalData": {
        "age": 34
      },
      "postalCode": "12345"
    },
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your name"
        },
        "vegetarian": {
          "type": "boolean"
        },
        "birthDate": {
          "type": "string",
          "format": "date"
        },
        "nationality": {
          "type": "string",
          "enum": [
            "DE",
            "IT",
            "JP",
            "US",
            "RU",
            "Other"
          ]
        },
        "personalData": {
          "type": "object",
          "properties": {
            "age": {
              "type": "integer",
              "description": "Please enter your age."
            },
            "height": {
              "type": "number"
            },
            "drivingSkill": {
              "type": "number",
              "maximum": 10,
              "minimum": 1,
              "default": 7
            }
          },
          "required": [
            "age",
            "height"
          ]
        },
        "occupation": {
          "type": "string"
        },
        "postalCode": {
          "type": "string",
          "maxLength": 5
        }
      },
      "required": [
        "occupation",
        "nationality"
      ]
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/name"
            },
            {
              "type": "Control",
              "scope": "#/properties/personalData/properties/age"
            },
            {
              "type": "Control",
              "scope": "#/properties/birthDate"
            }
          ]
        },
        {
          "type": "Label",
          "text": "Additional Information"
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/personalData/properties/height"
            },
            {
              "type": "Control",
              "scope": "#/properties/nationality"
            },
            {
              "type": "Control",
              "scope": "#/properties/occupation",
              "suggestion": [
                "Accountant",
                "Engineer",
                "Freelancer",
                "Journalism",
                "Physician",
                "Student",
                "Teacher",
                "Other"
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "name": "i18n",
    "label": "Person (i18n)",
    "data": {
      "vegetarian": false,
      "birthDate": "1985-06-02",
      "personalData": {
        "age": 34
      },
      "postalCode": "12345"
    },
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "minLength": 3,
          "description": "Please enter your name"
        },
        "vegetarian": {
          "type": "boolean"
        },
        "birthDate": {
          "type": "string",
          "format": "date",
          "description": "Please enter your birth date."
        },
        "nationality": {
          "type": "string",
          "enum": [
            "DE",
            "IT",
            "JP",
            "US",
            "RU",
            "Other"
          ]
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Group",
          "i18n": "basicInfoGroup",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/name"
            },
            {
              "type": "Control",
              "scope": "#/properties/birthDate"
            }
          ]
        },
        {
          "type": "Label",
          "text": "additionalInformationLabel"
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/nationality"
            },
            {
              "type": "Control",
              "scope": "#/properties/vegetarian"
            }
          ]
        }
      ]
    },
    "i18n": {
      "locale": "en"
    }
  },
  {
    "name": "radio-group",
    "label": "Radio Group",
    "data": {},
    "schema": {
      "type": "object",
      "properties": {
        "exampleRadioEnum": {
          "type": "string",
          "enum": [
            "One",
            "Two",
            "Three"
          ]
        },
        "exampleRadioOneOfEnum": {
          "type": "string",
          "oneOf": [
            {
              "const": "foo",
              "title": "Foo"
            },
            {
              "const": "bar",
              "title": "Bar"
            },
            {
              "const": "foobar",
              "title": "FooBar"
            }
          ]
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Group",
          "label": "Simple enum",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/exampleRadioEnum",
              "options": {
                "format": "radio",
                "orientation": "vertical"
              }
            }
          ]
        },
        {
          "type": "Group",
          "label": "One of Enum",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/exampleRadioOneOfEnum",
              "options": {
                "format": "radio"
              }
            }
          ]
        }
      ]
    }
  },
  {
    "name": "Readonly Fields",
    "label": "Readonly examples",
    "data": {
      "readonly": "readonly by schema",
      "readonlyByUISchema": "readonly by ui schema",
      "notReadonly": "normal field"
    },
    "schema": {
      "type": "object",
      "properties": {
        "readonly": {
          "type": "string",
          "readOnly": true
        },
        "readonlyByUISchema": {
          "type": "string"
        },
        "notReadonly": {
          "type": "string"
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/readonly",
          "label": "A readonly field"
        },
        {
          "type": "Control",
          "scope": "#/properties/readonlyByUISchema",
          "label": "A readonly field by ui schema",
          "options": {
            "readonly": true
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/notReadonly",
          "label": "A normal field"
        }
      ]
    }
  },
  {
    "name": "rule",
    "label": "Rule",
    "data": {
      "name": "John Doe",
      "dead": false,
      "vegetables": false
    },
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "dead": {
          "type": "boolean"
        },
        "kindOfDead": {
          "type": "string",
          "enum": [
            "Zombie",
            "Vampire",
            "Ghoul"
          ]
        },
        "vegetables": {
          "type": "boolean"
        },
        "kindOfVegetables": {
          "type": "string",
          "enum": [
            "All",
            "Some",
            "Only potatoes"
          ]
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "label": "Name",
          "scope": "#/properties/name"
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "Control",
              "label": "Is Dead?",
              "scope": "#/properties/dead"
            },
            {
              "type": "Control",
              "label": "Kind of dead",
              "scope": "#/properties/kindOfDead",
              "rule": {
                "effect": "ENABLE",
                "condition": {
                  "scope": "#/properties/dead",
                  "schema": {
                    "const": true
                  }
                }
              }
            }
          ]
        },
        {
          "type": "Group",
          "elements": [
            {
              "type": "Control",
              "label": "Eats vegetables?",
              "scope": "#/properties/vegetables"
            },
            {
              "type": "Control",
              "label": "Kind of vegetables",
              "scope": "#/properties/kindOfVegetables",
              "rule": {
                "effect": "HIDE",
                "condition": {
                  "scope": "#/properties/vegetables",
                  "schema": {
                    "const": false
                  }
                }
              }
            }
          ]
        }
      ]
    }
  },
  {
    "name": "rule-enable",
    "label": "Rule Inheritance",
    "data": {
      "toggleTopLayout": true,
      "toggleBottomLayout": true,
      "toggleControl": true
    },
    "schema": {
      "type": "object",
      "properties": {
        "toggleTopLayout": {
          "type": "boolean"
        },
        "topString": {
          "type": "string"
        },
        "middleNumber": {
          "type": "number"
        },
        "toggleBottomLayout": {
          "type": "boolean"
        },
        "bottomBoolean": {
          "type": "boolean"
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "rule": {
        "effect": "ENABLE",
        "condition": {
          "scope": "#/properties/toggleTopLayout",
          "schema": {
            "const": true
          }
        }
      },
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/topString"
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/middleNumber"
            },
            {
              "type": "Group",
              "label": "group",
              "rule": {
                "effect": "SHOW",
                "condition": {
                  "scope": "#/properties/toggleBottomLayout",
                  "schema": {
                    "const": true
                  }
                }
              },
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/bottomBoolean"
                }
              ]
            }
          ]
        }
      ]
    },
    "actions": [
      {
        "label": "Enable/Disable top layout"
      },
      {
        "label": "Show/Hide bottom layout"
      }
    ]
  },
  {
    "name": "scope",
    "label": "Scope",
    "data": {
      "orderId": "123456",
      "purchaseDate": "1985-06-02",
      "price": 16,
      "shippingAddress": {
        "aptNo": 3,
        "streetNumber": 12
      }
    },
    "schema": {
      "type": "object",
      "properties": {
        "orderId": {
          "type": "string"
        },
        "purchaseDate": {
          "type": "string",
          "format": "date"
        },
        "price": {
          "type": "number"
        },
        "shippingAddress": {
          "$ref": "#/definitions/shippingAddress"
        }
      },
      "definitions": {
        "shippingAddress": {
          "type": "object",
          "properties": {
            "aptNo": {
              "type": "integer"
            },
            "streetNumber": {
              "type": "integer"
            }
          }
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/orderId"
            },
            {
              "type": "Control",
              "scope": "#/properties/purchaseDate"
            },
            {
              "type": "Control",
              "scope": "#/properties/price"
            }
          ]
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/shippingAddress/properties/aptNo"
            },
            {
              "type": "Control",
              "scope": "#/properties/shippingAddress/properties/streetNumber"
            }
          ]
        }
      ]
    }
  },
  {
    "name": "text",
    "label": "Text Control Options",
    "data": {
      "zipCode": "12345",
      "zipCodeWithoutTrim": "12345678",
      "zipCodeWithoutRestrict": "12345678"
    },
    "schema": {
      "type": "object",
      "properties": {
        "zipCode": {
          "type": "string",
          "maxLength": 5
        },
        "zipCodeWithoutTrim": {
          "type": "string",
          "maxLength": 5
        },
        "zipCodeWithoutRestrict": {
          "type": "string",
          "maxLength": 5
        }
      }
    },
    "uischema": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/zipCode",
              "label": "ZIP Code (with trim and restrict options)",
              "options": {
                "trim": true,
                "restrict": true
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/zipCodeWithoutTrim",
              "label": "ZIP Code (without trimming)",
              "options": {
                "trim": false,
                "restrict": true
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/zipCodeWithoutRestrict",
              "label": "ZIP Code (without restricting)",
              "options": {
                "trim": true,
                "restrict": false
              }
            }
          ]
        }
      ]
    }
  }
]
