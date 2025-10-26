export const data = {
  combiners: {
    allOfs: {
      base: {
        "type": "object",
        "properties": {
          "AllOfMergeObjects": {
            "allOf": [
              {
                "properties": {
                  "Object1Property": {
                    "type": "string",
                    "minLength": 1,
                    "x-val": "lol"
                  }
                }
              },
              {
                "properties": {
                  "Object2Property": {
                    "type": "number",
                    "maximum": 2
                  }
                }
              }
            ],
            "type": "object"
          },
          "AllOfMergeValidations": {
            "allOf": [
              {
                "minLength": 1
              },
              {
                "maxLength": 2
              }
            ],
            "type": "string"
          },
          "AllOfMergeTakeMoreLogicalValidation": {
            "allOf": [
              {
                "maximum": 1
              },
              {
                "maximum": 2
              }
            ],
            "type": "number"
          },
          "AllOfMergeObjectPropertyValidations": {
            "allOf": [
              {
                "properties": {
                  "Property": {
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              {
                "properties": {
                  "Property": {
                    "type": "string",
                    "maxLength": 2
                  }
                }
              }
            ],
            "type": "object"
          },
          "AllOfMergeRefs": {
            "allOf": [
              { "$ref": "#/definitions/ref1" },
              {
                "type": "object",
                "properties": {
                  "zipCode": {
                    "type": "string"
                  }
                }
              }
            ]
          }
        },

        "definitions": {
          "ref1": {
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
            "required": ["street_address", "city", "state"]
          },
          "ref2": {
            "type": "object",
            "properties": {
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              }
            }
          }
        }
      },
      complex: {
        "allOf": [
          {
            "allOf": [
              {
                "type": "object",
                "properties": {
                  "foo": {
                    "type": "object",
                    "properties": {
                      "user": {
                        "$ref": "#/allOf/0/allOf/0/properties/foo/definitions/event"
                      }
                    },
                    "definitions": {
                      "event": {
                        "allOf": [
                          {
                            "type": "object",
                            "properties": {
                              "names": {
                                "items": {
                                  "$ref": "#/allOf/0/allOf/0/properties/foo/definitions/event/allOf/0/properties/name"
                                }
                              },
                              "users": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "creation": {
                                      "$ref": "#/allOf/0/allOf/0/properties/foo"
                                    },
                                    "foo": {
                                      "$ref": "#/allOf/0/allOf/0/properties/foo/definitions/event/allOf/0/properties/contacts"
                                    },
                                    "products": {
                                      "$ref": "#/allOf/0/allOf/0/properties/foo/definitions/event/allOf/0/properties/contacts"
                                    }
                                  }
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
          {
            "type": "object",
            "properties": {
              "bar": {
                "allOf": [
                  {
                    "$ref": "#/allOf/0/allOf/0"
                  }
                ]
              }
            }
          }
        ]
      },
      todoFull: {
        "type": "array",
        "items": {
          "title": "Todo Full",
          "allOf": [
            {
              "title": "Todo Partial",
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "completed": {
                  "type": [
                    "boolean",
                    "null"
                  ]
                }
              },
              "required": [
                "name",
                "completed"
              ],
              "x-tags": [
                "Todos"
              ]
            },
            {
              "type": "object",
              "properties": {
                "id": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 1000000
                },
                "completed_at": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "format": "date-time"
                },
                "created_at": {
                  "type": "string",
                  "format": "date-time"
                },
                "updated_at": {
                  "type": "string",
                  "format": "date-time"
                },
                "user": {
                  "title": "User",
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "The user's full name."
                    },
                    "age": {
                      "type": "number",
                      "minimum": 0,
                      "maximum": 150
                    }
                  },
                  "required": [
                    "name",
                    "age"
                  ],
                  "x-tags": [
                    "Todos"
                  ]
                }
              },
              "required": [
                "id",
                "user"
              ]
            }
          ],
          "x-tags": [
            "Todos"
          ]
        }
      },
      todoFull2: {
        "title": "Todo Full",
        "allOf": [
          {
            "properties": {
              "test": {
                "type": "string"
              }
            }
          },
          {
            "properties": {
              "id": {
                "type": "integer",
                "minimum": 0,
                "maximum": 1000000
              },
              "completed_at": {
                "type": ["string", "null"],
                "format": "date-time"
              },
              "created_at": {
                "type": "string",
                "format": "date-time"
              },
              "updated_at": {
                "type": "string",
                "format": "date-time"
              }
            },
            "required": ["id"]
          }
        ],
        "type": "object"
      },
      withType: {
        "title": "BugExample",
        "description": "An example model to demonstrate a bug.",
        "allOf": [
          {
            "properties": {
              "actionType": {
                "type": "string",
                "enum": [
                  "Cancel",
                  "Confirm",
                  "Create",
                  "Update"
                ]
              },
              "id": {
                "type": "string",
                "description": "The identifier of the existing reservation."
              },
              "externalId": {
                "type": "string"
              },
              "calculateCosts": {
                "type": "boolean"
              },
              "calculateDates": {
                "type": "boolean"
              },
              "items": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": [
              "actionType",
              "items"
            ]
          },
          {
            "oneOf": [
              {
                "type": "object",
                "properties": {
                  "actionType": {
                    "type": "string",
                    "enum": [
                      "Cancel",
                      "Confirm",
                      "Update"
                    ]
                  },
                  "id": {
                    "type": "string"
                  }
                },
                "required": [
                  "actionType",
                  "id"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "actionType": {
                    "type": "string",
                    "enum": [
                      "Create"
                    ]
                  }
                },
                "required": [
                  "actionType"
                ]
              }
            ]
          }
        ],
        "type": "object"
      }



    },
    anyOf: {
      "type": "object",
      "properties": {
        "myProp": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "properties": {
                  "foo": {
                    "type": "string"
                  }
                }
              },
              {
                "properties": {
                  "bar": {
                    "type": "number"
                  }
                }
              },
              {
                "properties": {
                  "baz": {
                    "type": "boolean"
                  }
                }
              }
            ],
            "type": "object"
          }
        }
      }
    },
    oneofWithAllofChildren: {
      "oneOf": [
        {
          "allOf": [
            {
              "type": "object",
              "properties": {
                "foo": {
                  "type": "string"
                }
              }
            },
            {
              "type": "object",
              "properties": {
                "bar": {
                  "type": "number"
                }
              }
            }
          ]
        },
        {
          "allOf": [
            {
              "type": "object",
              "properties": {
                "baz": {
                  "type": "string"
                }
              }
            },
            {
              "type": "object",
              "properties": {
                "boggle": {
                  "type": "number"
                }
              }
            }
          ]
        }
      ]
    },
    oneofWithMultiTypes: {
      "title": "a",
      "oneOf": [
        {
          "title": "b",
          "type": "object",
          "properties": {
            "c": {
              "title": "d",
              "type": "string"
            },
            "e": {
              "title": "e",
              "type": "string"
            }
          }
        },
        {
          "title": "f",
          "type": "boolean"
        },
        {
          "title": "g",
          "oneOf": [
            {
              "title": "h",
              "type": "string"
            },
            {
              "title": "l",
              "type": "object",
              "properties": {
                "foo": {
                  "title": "k",
                  "oneOf": [
                    {
                      "title": "m",
                      "type": "string"
                    },
                    {
                      "title": "o",
                      "type": "object",
                      "properties": {
                        "foo": { "type": "string" }
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      ]
    },
    oneofWithArrayType: {
      "oneOf": [
        {
          "items": {
            "properties": {
              "foo": {
                "type": "string",
                "enum": ["test"]
              }
            }
          }
        },
        {
          "items": {
            "properties": {
              "foo": {
                "type": "number"
              },
              "bar": {
                "type": "string"
              }
            }
          }
        }
      ],
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "foo": {
            "type": ["string", "number"]
          },
          "baz": {
            "type": "integer"
          }
        }
      }
    },
    oneofWithinArrayItem: {
      "title": "a",
      "oneOf": [
        {
          "title": "b",
          "type": "object",
          "properties": {
            "c": {
              "title": "d",
              "type": "string"
            },
            "e": {
              "title": "e",
              "type": "string"
            }
          }
        },
        {
          "title": "f",
          "type": "boolean"
        },
        {
          "title": "g",
          "oneOf": [
            {
              "title": "h",
              "type": "string"
            },
            {
              "title": "l",
              "type": "object",
              "properties": {
                "foo": {
                  "title": "k",
                  "oneOf": [
                    {
                      "title": "m",
                      "type": "string"
                    },
                    {
                      "title": "o",
                      "type": "object",
                      "properties": {
                        "foo": { "type": "string" }
                      }
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
  diff: {
    rootRef: {
      "title": "User",
      "type": "object",
      "x-stoplight": { "id": "root-id" },
      "properties": {
        "billing_address": {
          "type": "string",
          "title": "Billing Address",
          "x-stoplight": { "id": "billing_address-id" },
          "$ref": "#/$defs/Address"
        }
      },
      "$defs": {
        "Address": {
          "type": "object",
          "title": "Address",
          "x-stoplight": { "id": "address-id" },
          "properties": {
            "street": {
              "type": "string",
              "x-stoplight": { "id": "address-street-id" }
            }
          }
        }
      }
    },
    simpleExample: {
      "title": "User",
      "type": "object",
      "x-stoplight": { "id": "root-id" },
      "properties": {
        "name": {
          "type": "string",
          "const": "Constant name",
          "examples": ["Example name", "Different name"],
          "x-stoplight": { "id": "name-id" }
        },
        "age": {
          "type": "number",
          "minimum": 10,
          "maximum": 40,
          "x-stoplight": { "id": "age-id" }
        },
        "completed_at": {
          "type": "string",
          "format": "date-time",
          "x-stoplight": { "id": "completed_at-id" }
        },
        "list": {
          "type": ["null", "array"],
          "items": {
            "type": ["string", "number"],
            "x-stoplight": { "id": "list-items-id" }
          },
          "minItems": 1,
          "maxItems": 4,
          "x-stoplight": { "id": "list-id" }
        },
        "email": {
          "type": "string",
          "format": "email",
          "examples": ["one@email.com", "two@email.com"],
          "deprecated": true,
          "default": "default@email.com",
          "minLength": 2,
          "x-stoplight": { "id": "email-id" }
        },
        "list-of-objects": {
          "type": "array",
          "items": {
            "type": "object",
            "x-stoplight": { "id": "list-of-objects-items-id" },
            "properties": {
              "id": {
                "type": "string",
                "x-stoplight": { "id": "list-of-objects-items-id-id" }
              },
              "friend": {
                "type": "object",
                "x-stoplight": { "id": "list-of-objects-items-friend-id" },
                "properties": {
                  "id": {
                    "type": "string",
                    "x-stoplight": { "id": "list-of-objects-items-friend-id-id" }
                  },
                  "name": {
                    "type": "object",
                    "x-stoplight": { "id": "list-of-objects-items-friend-name-id" },
                    "properties": {
                      "first": {
                        "type": "string",
                        "x-stoplight": { "id": "list-of-objects-items-friend-name-first-id" }
                      },
                      "last": {
                        "type": "string",
                        "x-stoplight": { "id": "list-of-objects-items-friend-name-last-id" }
                      }
                    }
                  }
                }
              }
            }
          },
          "minItems": 1,
          "maxItems": 4,
          "x-stoplight": { "id": "list-of-objects-id" }
        },
        "friend": {
          "type": "object",
          "x-stoplight": { "id": "friend-id" },
          "properties": {
            "id": {
              "type": "string",
              "x-stoplight": { "id": "friend-id-id" }
            },
            "name": {
              "type": "string",
              "x-stoplight": { "id": "friend-name-id" }
            }
          }
        }
      }
    }
  },
  extensions: {
    simple: {
      "title": "User",
      "type": "object",
      "x-stoplight": { "id": "root-id" },
      "properties": {
        "name": {
          "type": "string",
          "const": "Constant name",
          "examples": ["Example name", "Different name"],
          "x-stoplight": { "id": "name-id" }
        },
        "age": {
          "type": "number",
          "minimum": 10,
          "maximum": 40,
          "x-stoplight": { "id": "age-id" }
        },
        "completed_at": {
          "type": "string",
          "format": "date-time",
          "x-stoplight": { "id": "completed_at-id" }
        },
        "list": {
          "type": ["null", "array"],
          "items": {
            "type": ["string", "number"],
            "x-stoplight": { "id": "list-items-id" }
          },
          "minItems": 1,
          "maxItems": 4,
          "x-stoplight": { "id": "list-id" }
        },
        "email": {
          "type": "string",
          "format": "email",
          "examples": ["one@email.com", "two@email.com"],
          "deprecated": true,
          "default": "default@email.com",
          "minLength": 2,
          "x-stoplight": { "id": "email-id" }
        },
        "list-of-objects": {
          "type": "array",
          "items": {
            "type": "object",
            "x-stoplight": { "id": "list-of-objects-items-id" },
            "properties": {
              "id": {
                "type": "string",
                "x-stoplight": { "id": "list-of-objects-items-id-id" }
              },
              "friend": {
                "type": "object",
                "x-stoplight": { "id": "list-of-objects-items-friend-id" },
                "properties": {
                  "id": {
                    "type": "string",
                    "x-stoplight": { "id": "list-of-objects-items-friend-id-id" }
                  },
                  "name": {
                    "type": "object",
                    "x-stoplight": { "id": "list-of-objects-items-friend-name-id" },
                    "properties": {
                      "first": {
                        "type": "string",
                        "x-stoplight": { "id": "list-of-objects-items-friend-name-first-id" }
                      },
                      "last": {
                        "type": "string",
                        "x-stoplight": { "id": "list-of-objects-items-friend-name-last-id" }
                      }
                    }
                  }
                }
              }
            }
          },
          "minItems": 1,
          "maxItems": 4,
          "x-stoplight": { "id": "list-of-objects-id" }
        },
        "friend": {
          "type": "object",
          "x-stoplight": { "id": "friend-id" },
          "properties": {
            "id": {
              "type": "string",
              "x-stoplight": { "id": "friend-id-id" }
            },
            "name": {
              "type": "string",
              "x-stoplight": { "id": "friend-name-id" }
            }
          }
        }
      }
    }
  },
  realWorld: {
    boxFile: {
      "title": "File",
      "type": "object",
      "x-box-resource-id": "file",
      "x-box-variant": "standard",
      "description": "A standard representation of a file, as returned from any\nfile API endpoints by default",
      "allOf": [
        {
          "$ref": "#/definitions/File--Mini"
        },
        {
          "properties": {
            "description": {
              "type": "string",
              "nullable": false,
              "description": "The optional description of this file",
              "maxLength": 256,
              "example": "Contract for Q1 renewal"
            },
            "size": {
              "type": "integer",
              "nullable": false,
              "description": "The file size in bytes. Be careful parsing this integer as it can\nget very large and cause an integer overflow.",
              "example": 629644
            },
            "path_collection": {
              "allOf": [
                {
                  "title": "Path collection",
                  "description": "A list of parent folders for an item.",
                  "type": "object",
                  "properties": {
                    "total_count": {
                      "description": "The number of folders in this list.",
                      "example": 1,
                      "type": "integer",
                      "format": "int64",
                      "nullable": false
                    },
                    "entries": {
                      "type": "array",
                      "description": "The parent folders for this item",
                      "nullable": false,
                      "items": {
                        "$ref": "#/definitions/Folder--Mini"
                      }
                    }
                  }
                },
                {
                  "description": "The tree of folders that this file is contained in,\nstarting at the root."
                },
                {
                  "nullable": false
                }
              ]
            },
            "created_at": {
              "type": "string",
              "format": "date-time",
              "nullable": false,
              "description": "The date and time when the file was created on Box.",
              "example": "2012-12-12T10:53:43-08:00"
            },
            "modified_at": {
              "type": "string",
              "format": "date-time",
              "nullable": false,
              "description": "The date and time when the file was last updated on Box.",
              "example": "2012-12-12T10:53:43-08:00"
            },
            "trashed_at": {
              "type": "string",
              "format": "date-time",
              "nullable": true,
              "description": "The time at which this file was put in the trash.",
              "example": "2012-12-12T10:53:43-08:00"
            },
            "purged_at": {
              "type": "string",
              "format": "date-time",
              "nullable": true,
              "description": "The time at which this file is expected to be purged\nfrom the trash.",
              "example": "2012-12-12T10:53:43-08:00"
            },
            "content_created_at": {
              "type": "string",
              "format": "date-time",
              "nullable": true,
              "description": "The date and time at which this file was originally\ncreated, which might be before it was uploaded to Box.",
              "example": "2012-12-12T10:53:43-08:00"
            },
            "content_modified_at": {
              "type": "string",
              "format": "date-time",
              "nullable": true,
              "description": "The date and time at which this file was last updated,\nwhich might be before it was uploaded to Box.",
              "example": "2012-12-12T10:53:43-08:00"
            },
            "created_by": {
              "allOf": [
                {
                  "$ref": "#/definitions/User--Mini"
                },
                {
                  "description": "The user who created this file"
                }
              ]
            },
            "modified_by": {
              "allOf": [
                {
                  "$ref": "#/definitions/User--Mini"
                },
                {
                  "description": "The user who last modified this file"
                },
                {
                  "nullable": false
                }
              ]
            },
            "owned_by": {
              "allOf": [
                {
                  "$ref": "#/definitions/User--Mini"
                },
                {
                  "description": "The user who owns this file"
                },
                {
                  "nullable": false
                }
              ]
            },
            "shared_link": {
              "allOf": [
                {
                  "title": "Shared link",
                  "description": "Shared links provide direct, read-only access to files or folder on Box.\n\nShared links with open access level allow anyone with the URL\nto access the item, while shared links with company or collaborators access\nlevels can only be accessed by appropriately authenticated Box users.",
                  "type": "object",
                  "properties": {
                    "url": {
                      "type": "string",
                      "format": "url",
                      "description": "The URL that can be used to access the item on Box.\n\nThis URL will display the item in Box's preview UI where the file\ncan be downloaded if allowed.\n\nThis URL will continue to work even when a custom `vanity_url`\nhas been set for this shared link.",
                      "example": "https://www.box.com/s/vspke7y05sb214wjokpk",
                      "nullable": false
                    },
                    "download_url": {
                      "type": "string",
                      "format": "url",
                      "x-box-premium-feature": true,
                      "description": "A URL that can be used to download the file. This URL can be used in\na browser to download the file. This URL includes the file\nextension so that the file will be saved with the right file type.\n\nThis property will be `null` for folders.",
                      "example": "https://www.box.com/shared/static/rh935iit6ewrmw0unyul.jpeg",
                      "nullable": true
                    },
                    "vanity_url": {
                      "type": "string",
                      "format": "url",
                      "description": "The \"Custom URL\" that can also be used to preview the item on Box.  Custom\nURLs can only be created or modified in the Box Web application.",
                      "example": "https://acme.app.box.com/v/my_url/",
                      "nullable": true
                    },
                    "vanity_name": {
                      "type": "string",
                      "description": "The custom name of a shared link, as used in the `vanity_url` field.",
                      "example": "my_url",
                      "nullable": true
                    },
                    "access": {
                      "type": "string",
                      "description": "The access level for this shared link.\n\n* `open` - provides access to this item to anyone with this link\n* `company` - only provides access to this item to people the same company\n* `collaborators` - only provides access to this item to people who are\n   collaborators on this item\n\nIf this field is omitted when creating the shared link, the access level\nwill be set to the default access level specified by the enterprise admin.",
                      "enum": ["open", "company", "collaborators"],
                      "example": "open",
                      "nullable": false
                    },
                    "effective_access": {
                      "type": "string",
                      "description": "The effective access level for the shared link. This can be a more\nrestrictive access level than the value in the `access` field when the\nenterprise settings restrict the allowed access levels.",
                      "enum": ["open", "company", "collaborators"],
                      "example": "company",
                      "nullable": false
                    },
                    "effective_permission": {
                      "type": "string",
                      "description": "The effective permissions for this shared link.",
                      "enum": ["can_download", "can_preview"],
                      "example": "can_download",
                      "nullable": false
                    },
                    "unshared_at": {
                      "type": "string",
                      "format": "date-time",
                      "description": "The date and time when this link will be unshared. This field can only be\nset by users with paid accounts.",
                      "example": "2018-04-13T13:53:23-07:00",
                      "nullable": true
                    },
                    "is_password_enabled": {
                      "type": "boolean",
                      "description": "Defines if the shared link requires a password to access the item.",
                      "example": true,
                      "nullable": false
                    },
                    "permissions": {
                      "type": "object",
                      "description": "Defines if this link allows a user to preview and download an item.",
                      "properties": {
                        "can_download": {
                          "type": "boolean",
                          "example": true,
                          "nullable": false,
                          "description": "Defines if the shared link allows for the item to be downloaded. For\nshared links on folders, this also applies to any items in the folder.\n\nThis value can be set to `true` when the effective access level is\nset to `open` or `company`, not `collaborators`."
                        },
                        "can_preview": {
                          "type": "boolean",
                          "example": true,
                          "nullable": false,
                          "description": "Defines if the shared link allows for the item to be previewed.\n\nThis value is always `true`. For shared links on folders this also\napplies to any items in the folder."
                        }
                      }
                    },
                    "download_count": {
                      "type": "integer",
                      "example": 3,
                      "description": "The number of times this item has been downloaded.",
                      "nullable": false
                    },
                    "preview_count": {
                      "type": "integer",
                      "example": 3,
                      "description": "The number of times this item has been previewed.",
                      "nullable": false
                    }
                  }
                },
                {
                  "description": "The shared link for this file. This will be\n`null` if no shared link has been created for this\nfile."
                },
                {
                  "nullable": true
                }
              ]
            },
            "parent": {
              "allOf": [
                {
                  "$ref": "#/definitions/Folder--Mini"
                },
                {
                  "description": "The folder that this file is located within."
                }
              ],
              "nullable": true
            },
            "item_status": {
              "type": "string",
              "description": "Defines if this item has been deleted or not.\n\n* `active` when the item has is not in the trash\n* `trashed` when the item has been moved to the trash but not deleted\n* `deleted` when the item has been permanently deleted.",
              "enum": ["active", "trashed", "deleted"],
              "nullable": false,
              "example": "active"
            }
          }
        }
      ],
      "definitions": {
        "File--Mini": {
          "title": "File (Mini)",
          "type": "object",
          "x-box-resource-id": "file--mini",
          "x-box-variant": "mini",
          "description": "A mini representation of a file, used when\nnested under another resource.",
          "allOf": [
            {
              "$ref": "#/definitions/File--Base"
            },
            {
              "properties": {
                "sequence_id": {
                  "allOf": [
                    {
                      "type": "string",
                      "example": "3",
                      "nullable": false,
                      "description": "A numeric identifier that represents the most recent user event\nthat has been applied to this item.\n\nThis can be used in combination with the `GET /events`-endpoint\nto filter out user events that would have occurred before this\nidentifier was read.\n\nAn example would be where a Box Drive-like application\nwould fetch an item via the API, and then listen to incoming\nuser events for changes to the item. The application would\nignore any user events where the `sequence_id` in the event\nis smaller than or equal to the `sequence_id` in the originally\nfetched resource."
                    },
                    {
                      "nullable": false
                    }
                  ]
                },
                "name": {
                  "type": "string",
                  "description": "The name of the file",
                  "example": "Contract.pdf"
                },
                "sha1": {
                  "type": "string",
                  "format": "digest",
                  "nullable": false,
                  "example": "85136C79CBF9FE36BB9D05D0639C70C265C18D37",
                  "description": "The SHA1 hash of the file. This can be used to compare the contents\nof a file on Box with a local file."
                },
                "file_version": {
                  "allOf": [
                    {
                      "$ref": "#/definitions/FileVersion--Mini"
                    },
                    {
                      "description": "The information about the current version of the file."
                    }
                  ]
                }
              }
            }
          ]
        },
        "File--Base": {
          "title": "File (Base)",
          "type": "object",
          "x-box-resource-id": "file--base",
          "x-box-sanitized": true,
          "x-box-tag": "files",
          "x-box-variants": ["base", "mini", "standard", "full"],
          "x-box-variant": "base",
          "description": "The bare basic representation of a file, the minimal\namount of fields returned when using the `fields` query\nparameter.",
          "properties": {
            "id": {
              "type": "string",
              "nullable": false,
              "description": "The unique identifier that represent a file.\n\nThe ID for any file can be determined\nby visiting a file in the web application\nand copying the ID from the URL. For example,\nfor the URL `https://*.app.box.com/files/123`\nthe `file_id` is `123`.",
              "example": "12345"
            },
            "etag": {
              "type": "string",
              "example": "1",
              "nullable": true,
              "description": "The HTTP `etag` of this file. This can be used within some API\nendpoints in the `If-Match` and `If-None-Match` headers to only\nperform changes on the file if (no) changes have happened."
            },
            "type": {
              "type": "string",
              "description": "`file`",
              "example": "file",
              "enum": ["file"],
              "nullable": false
            }
          }
        },
        "FileVersion--Mini": {
          "title": "File version (Mini)",
          "type": "object",
          "x-box-resource-id": "file_version--mini",
          "x-box-variant": "mini",
          "description": "A mini representation of a file version, used when\nnested within another resource.",
          "allOf": [
            {
              "$ref": "#/definitions/FileVersion--Base"
            },
            {
              "properties": {
                "sha1": {
                  "type": "string",
                  "description": "The SHA1 hash of this version of the file.",
                  "example": "134b65991ed521fcfe4724b7d814ab8ded5185dc"
                }
              }
            }
          ]
        },
        "FileVersion--Base": {
          "title": "File version (Base)",
          "type": "object",
          "x-box-resource-id": "file_version--base",
          "x-box-sanitized": true,
          "x-box-variants": ["base", "mini", "standard"],
          "x-box-variant": "base",
          "description": "The bare basic representation of a file version, the minimal\namount of fields returned when using the `fields` query\nparameter.",
          "properties": {
            "id": {
              "type": "string",
              "nullable": false,
              "description": "The unique identifier that represent a file version.",
              "example": "12345"
            },
            "type": {
              "type": "string",
              "description": "`file_version`",
              "example": "file_version",
              "enum": ["file_version"],
              "nullable": false
            }
          }
        },
        "Folder--Mini": {
          "title": "Folder (Mini)",
          "type": "object",
          "x-box-resource-id": "folder--mini",
          "x-box-variant": "mini",
          "description": "A mini representation of a file version, used when\nnested under another resource.",
          "allOf": [
            {
              "$ref": "#/definitions/Folder--Base"
            },
            {
              "properties": {
                "sequence_id": {
                  "allOf": [
                    {
                      "$ref": "#/definitions/allOf_0"
                    },
                    {
                      "nullable": false
                    }
                  ]
                },
                "name": {
                  "type": "string",
                  "description": "The name of the folder.",
                  "example": "Contracts",
                  "nullable": false
                }
              }
            }
          ]
        },
        "Folder--Base": {
          "title": "Folder (Base)",
          "type": "object",
          "x-box-resource-id": "folder--base",
          "x-box-sanitized": true,
          "x-box-tag": "folders",
          "x-box-variants": ["base", "mini", "standard", "full"],
          "x-box-variant": "base",
          "description": "The bare basic representation of a folder, the minimal\namount of fields returned when using the `fields` query\nparameter.",
          "properties": {
            "id": {
              "type": "string",
              "nullable": false,
              "description": "The unique identifier that represent a folder.\n\nThe ID for any folder can be determined\nby visiting a folder in the web application\nand copying the ID from the URL. For example,\nfor the URL `https://*.app.box.com/folders/123`\nthe `folder_id` is `123`.",
              "example": "12345"
            },
            "etag": {
              "type": "string",
              "nullable": true,
              "example": "1",
              "description": "The HTTP `etag` of this folder. This can be used within some API\nendpoints in the `If-Match` and `If-None-Match` headers to only\nperform changes on the folder if (no) changes have happened."
            },
            "type": {
              "type": "string",
              "description": "`folder`",
              "example": "folder",
              "enum": ["folder"],
              "nullable": false
            }
          }
        },
        "allOf_0": {
          "type": "string",
          "example": "3",
          "nullable": false,
          "description": "A numeric identifier that represents the most recent user event\nthat has been applied to this item.\n\nThis can be used in combination with the `GET /events`-endpoint\nto filter out user events that would have occurred before this\nidentifier was read.\n\nAn example would be where a Box Drive-like application\nwould fetch an item via the API, and then listen to incoming\nuser events for changes to the item. The application would\nignore any user events where the `sequence_id` in the event\nis smaller than or equal to the `sequence_id` in the originally\nfetched resource."
        },
        "User--Mini": {
          "title": "User (Mini)",
          "type": "object",
          "x-box-resource-id": "user--mini",
          "x-box-variant": "mini",
          "description": "A mini representation of a user, as can be returned when nested within other\nresources.",
          "allOf": [
            {
              "$ref": "#/definitions/User--Base"
            },
            {
              "properties": {
                "name": {
                  "type": "string",
                  "description": "The display name of this user",
                  "example": "Aaron Levie",
                  "maxLength": 50,
                  "nullable": false
                },
                "login": {
                  "type": "string",
                  "format": "email",
                  "description": "The primary email address of this user",
                  "example": "ceo@example.com",
                  "nullable": false
                }
              }
            }
          ]
        },
        "User--Base": {
          "title": "User (Base)",
          "type": "object",
          "x-box-resource-id": "user--base",
          "x-box-tag": "users",
          "x-box-variants": ["base", "mini", "standard", "full"],
          "x-box-variant": "base",
          "description": "A mini representation of a user, used when\nnested within another resource.",
          "properties": {
            "id": {
              "type": "string",
              "description": "The unique identifier for this user",
              "example": "11446498"
            },
            "type": {
              "type": "string",
              "description": "`user`",
              "example": "user",
              "nullable": false,
              "enum": ["user"]
            }
          }
        }
      }
    },
    githubIssue: {
      "title": "Issue",
      "description": "Issues are a great way to keep track of tasks, enhancements, and bugs for your projects.",
      "type": "object",
      "properties": {
        "id": {
          "type": "integer"
        },
        "node_id": {
          "type": "string"
        },
        "url": {
          "description": "URL for the issue",
          "example": "https://api.github.com/repositories/42/issues/1",
          "type": "string",
          "format": "uri"
        },
        "repository_url": {
          "type": "string",
          "format": "uri"
        },
        "labels_url": {
          "type": "string"
        },
        "comments_url": {
          "type": "string",
          "format": "uri"
        },
        "events_url": {
          "type": "string",
          "format": "uri"
        },
        "html_url": {
          "type": "string",
          "format": "uri"
        },
        "number": {
          "description": "Number uniquely identifying the issue within its repository",
          "example": 42,
          "type": "integer"
        },
        "state": {
          "description": "State of the issue; either 'open' or 'closed'",
          "example": "open",
          "type": "string"
        },
        "title": {
          "description": "Title of the issue",
          "example": "Widget creation fails in Safari on OS X 10.8",
          "type": "string"
        },
        "body": {
          "description": "Contents of the issue",
          "example": "It looks like the new widget form is broken on Safari. When I try and create the widget, Safari crashes. This is reproducible on 10.8, but not 10.9. Maybe a browser bug?",
          "type": "string",
          "nullable": true
        },
        "user": {
          "$ref": "#/definitions/nullable-simple-user"
        },
        "labels": {
          "description": "Labels to associate with this issue; pass one or more label names to replace the set of labels on this issue; send an empty array to clear all labels from the issue; note that the labels are silently dropped for users without push access to the repository",
          "example": ["bug", "registration"],
          "type": "array",
          "items": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer",
                    "format": "int64"
                  },
                  "node_id": {
                    "type": "string"
                  },
                  "url": {
                    "type": "string",
                    "format": "uri"
                  },
                  "name": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string",
                    "nullable": true
                  },
                  "color": {
                    "type": "string",
                    "nullable": true
                  },
                  "default": {
                    "type": "boolean"
                  }
                }
              }
            ]
          }
        },
        "assignee": {
          "$ref": "#/definitions/nullable-simple-user"
        },
        "assignees": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/simple-user"
          },
          "nullable": true
        },
        "milestone": {
          "$ref": "#/definitions/nullable-milestone"
        },
        "locked": {
          "type": "boolean"
        },
        "active_lock_reason": {
          "type": "string",
          "nullable": true
        },
        "comments": {
          "type": "integer"
        },
        "pull_request": {
          "type": "object",
          "properties": {
            "merged_at": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "diff_url": {
              "type": "string",
              "format": "uri",
              "nullable": true
            },
            "html_url": {
              "type": "string",
              "format": "uri",
              "nullable": true
            },
            "patch_url": {
              "type": "string",
              "format": "uri",
              "nullable": true
            },
            "url": {
              "type": "string",
              "format": "uri",
              "nullable": true
            }
          },
          "required": ["diff_url", "html_url", "patch_url", "url"]
        },
        "closed_at": {
          "type": "string",
          "format": "date-time",
          "nullable": true
        },
        "created_at": {
          "type": "string",
          "format": "date-time"
        },
        "updated_at": {
          "type": "string",
          "format": "date-time"
        },
        "draft": {
          "type": "boolean"
        },
        "closed_by": {
          "$ref": "#/definitions/nullable-simple-user"
        },
        "body_html": {
          "type": "string"
        },
        "body_text": {
          "type": "string"
        },
        "timeline_url": {
          "type": "string",
          "format": "uri"
        },
        "repository": {
          "$ref": "#/definitions/repository"
        },
        "performed_via_github_app": {
          "$ref": "#/definitions/nullable-integration"
        },
        "author_association": {
          "$ref": "#/definitions/author_association"
        },
        "reactions": {
          "$ref": "#/definitions/reaction-rollup"
        }
      },
      "required": [
        "assignee",
        "closed_at",
        "comments",
        "comments_url",
        "events_url",
        "html_url",
        "id",
        "node_id",
        "labels",
        "labels_url",
        "milestone",
        "number",
        "repository_url",
        "state",
        "locked",
        "title",
        "url",
        "user",
        "author_association",
        "created_at",
        "updated_at"
      ],
      "definitions": {
        "nullable-simple-user": {
          "title": "Simple User",
          "description": "Simple User",
          "type": "object",
          "properties": {
            "name": {
              "nullable": true,
              "type": "string"
            },
            "email": {
              "nullable": true,
              "type": "string"
            },
            "login": {
              "type": "string",
              "example": "octocat"
            },
            "id": {
              "type": "integer",
              "example": 1
            },
            "node_id": {
              "type": "string",
              "example": "MDQ6VXNlcjE="
            },
            "avatar_url": {
              "type": "string",
              "format": "uri",
              "example": "https://github.com/images/error/octocat_happy.gif"
            },
            "gravatar_id": {
              "type": "string",
              "example": "41d064eb2195891e12d0413f63227ea7",
              "nullable": true
            },
            "url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/users/octocat"
            },
            "html_url": {
              "type": "string",
              "format": "uri",
              "example": "https://github.com/octocat"
            },
            "followers_url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/users/octocat/followers"
            },
            "following_url": {
              "type": "string",
              "example": "https://api.github.com/users/octocat/following{/other_user}"
            },
            "gists_url": {
              "type": "string",
              "example": "https://api.github.com/users/octocat/gists{/gist_id}"
            },
            "starred_url": {
              "type": "string",
              "example": "https://api.github.com/users/octocat/starred{/owner}{/repo}"
            },
            "subscriptions_url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/users/octocat/subscriptions"
            },
            "organizations_url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/users/octocat/orgs"
            },
            "repos_url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/users/octocat/repos"
            },
            "events_url": {
              "type": "string",
              "example": "https://api.github.com/users/octocat/events{/privacy}"
            },
            "received_events_url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/users/octocat/received_events"
            },
            "type": {
              "type": "string",
              "example": "User"
            },
            "site_admin": {
              "type": "boolean"
            },
            "starred_at": {
              "type": "string",
              "example": "\"2020-07-09T00:17:55Z\""
            }
          },
          "required": [
            "avatar_url",
            "events_url",
            "followers_url",
            "following_url",
            "gists_url",
            "gravatar_id",
            "html_url",
            "id",
            "node_id",
            "login",
            "organizations_url",
            "received_events_url",
            "repos_url",
            "site_admin",
            "starred_url",
            "subscriptions_url",
            "type",
            "url"
          ],
          "nullable": true
        },
        "simple-user": {
          "title": "Simple User",
          "description": "Simple User",
          "type": "object",
          "properties": {
            "name": {
              "nullable": true,
              "type": "string"
            },
            "email": {
              "nullable": true,
              "type": "string"
            },
            "login": {
              "type": "string",
              "example": "octocat"
            },
            "id": {
              "type": "integer",
              "example": 1
            },
            "node_id": {
              "type": "string",
              "example": "MDQ6VXNlcjE="
            },
            "avatar_url": {
              "type": "string",
              "format": "uri",
              "example": "https://github.com/images/error/octocat_happy.gif"
            },
            "gravatar_id": {
              "type": "string",
              "example": "41d064eb2195891e12d0413f63227ea7",
              "nullable": true
            },
            "url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/users/octocat"
            },
            "html_url": {
              "type": "string",
              "format": "uri",
              "example": "https://github.com/octocat"
            },
            "followers_url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/users/octocat/followers"
            },
            "following_url": {
              "type": "string",
              "example": "https://api.github.com/users/octocat/following{/other_user}"
            },
            "gists_url": {
              "type": "string",
              "example": "https://api.github.com/users/octocat/gists{/gist_id}"
            },
            "starred_url": {
              "type": "string",
              "example": "https://api.github.com/users/octocat/starred{/owner}{/repo}"
            },
            "subscriptions_url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/users/octocat/subscriptions"
            },
            "organizations_url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/users/octocat/orgs"
            },
            "repos_url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/users/octocat/repos"
            },
            "events_url": {
              "type": "string",
              "example": "https://api.github.com/users/octocat/events{/privacy}"
            },
            "received_events_url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/users/octocat/received_events"
            },
            "type": {
              "type": "string",
              "example": "User"
            },
            "site_admin": {
              "type": "boolean"
            },
            "starred_at": {
              "type": "string",
              "example": "\"2020-07-09T00:17:55Z\""
            }
          },
          "required": [
            "avatar_url",
            "events_url",
            "followers_url",
            "following_url",
            "gists_url",
            "gravatar_id",
            "html_url",
            "id",
            "node_id",
            "login",
            "organizations_url",
            "received_events_url",
            "repos_url",
            "site_admin",
            "starred_url",
            "subscriptions_url",
            "type",
            "url"
          ]
        },
        "nullable-milestone": {
          "title": "Milestone",
          "description": "A collection of related issues and pull requests.",
          "type": "object",
          "properties": {
            "url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/repos/octocat/Hello-World/milestones/1"
            },
            "html_url": {
              "type": "string",
              "format": "uri",
              "example": "https://github.com/octocat/Hello-World/milestones/v1.0"
            },
            "labels_url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/repos/octocat/Hello-World/milestones/1/labels"
            },
            "id": {
              "type": "integer",
              "example": 1002604
            },
            "node_id": {
              "type": "string",
              "example": "MDk6TWlsZXN0b25lMTAwMjYwNA=="
            },
            "number": {
              "description": "The number of the milestone.",
              "type": "integer",
              "example": 42
            },
            "state": {
              "description": "The state of the milestone.",
              "example": "open",
              "type": "string",
              "enum": ["open", "closed"],
              "default": "open"
            },
            "title": {
              "description": "The title of the milestone.",
              "example": "v1.0",
              "type": "string"
            },
            "description": {
              "type": "string",
              "example": "Tracking milestone for version 1.0",
              "nullable": true
            },
            "creator": {
              "$ref": "#/definitions/nullable-simple-user"
            },
            "open_issues": {
              "type": "integer",
              "example": 4
            },
            "closed_issues": {
              "type": "integer",
              "example": 8
            },
            "created_at": {
              "type": "string",
              "format": "date-time",
              "example": "2011-04-10T20:09:31Z"
            },
            "updated_at": {
              "type": "string",
              "format": "date-time",
              "example": "2014-03-03T18:58:10Z"
            },
            "closed_at": {
              "type": "string",
              "format": "date-time",
              "example": "2013-02-12T13:22:01Z",
              "nullable": true
            },
            "due_on": {
              "type": "string",
              "format": "date-time",
              "example": "2012-10-09T23:39:01Z",
              "nullable": true
            }
          },
          "required": [
            "closed_issues",
            "creator",
            "description",
            "due_on",
            "closed_at",
            "id",
            "node_id",
            "labels_url",
            "html_url",
            "number",
            "open_issues",
            "state",
            "title",
            "url",
            "created_at",
            "updated_at"
          ],
          "nullable": true
        },
        "repository": {
          "title": "Repository",
          "description": "A git repository",
          "type": "object",
          "properties": {
            "id": {
              "description": "Unique identifier of the repository",
              "example": 42,
              "type": "integer"
            },
            "node_id": {
              "type": "string",
              "example": "MDEwOlJlcG9zaXRvcnkxMjk2MjY5"
            },
            "name": {
              "description": "The name of the repository.",
              "type": "string",
              "example": "Team Environment"
            },
            "full_name": {
              "type": "string",
              "example": "octocat/Hello-World"
            },
            "license": {
              "$ref": "#/definitions/nullable-license-simple"
            },
            "organization": {
              "$ref": "#/definitions/nullable-simple-user"
            },
            "forks": {
              "type": "integer"
            },
            "permissions": {
              "type": "object",
              "properties": {
                "admin": {
                  "type": "boolean"
                },
                "pull": {
                  "type": "boolean"
                },
                "triage": {
                  "type": "boolean"
                },
                "push": {
                  "type": "boolean"
                },
                "maintain": {
                  "type": "boolean"
                }
              },
              "required": ["admin", "pull", "push"]
            },
            "owner": {
              "$ref": "#/definitions/simple-user"
            },
            "private": {
              "description": "Whether the repository is private or public.",
              "default": false,
              "type": "boolean"
            },
            "html_url": {
              "type": "string",
              "format": "uri",
              "example": "https://github.com/octocat/Hello-World"
            },
            "description": {
              "type": "string",
              "example": "This your first repo!",
              "nullable": true
            },
            "fork": {
              "type": "boolean"
            },
            "url": {
              "type": "string",
              "format": "uri",
              "example": "https://api.github.com/repos/octocat/Hello-World"
            },
            "archive_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}"
            },
            "assignees_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/assignees{/user}"
            },
            "blobs_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}"
            },
            "branches_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/branches{/branch}"
            },
            "collaborators_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}"
            },
            "comments_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/comments{/number}"
            },
            "commits_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/commits{/sha}"
            },
            "compare_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}"
            },
            "contents_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/contents/{+path}"
            },
            "contributors_url": {
              "type": "string",
              "format": "uri",
              "example": "http://api.github.com/repos/octocat/Hello-World/contributors"
            },
            "deployments_url": {
              "type": "string",
              "format": "uri",
              "example": "http://api.github.com/repos/octocat/Hello-World/deployments"
            },
            "downloads_url": {
              "type": "string",
              "format": "uri",
              "example": "http://api.github.com/repos/octocat/Hello-World/downloads"
            },
            "events_url": {
              "type": "string",
              "format": "uri",
              "example": "http://api.github.com/repos/octocat/Hello-World/events"
            },
            "forks_url": {
              "type": "string",
              "format": "uri",
              "example": "http://api.github.com/repos/octocat/Hello-World/forks"
            },
            "git_commits_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/git/commits{/sha}"
            },
            "git_refs_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/git/refs{/sha}"
            },
            "git_tags_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/git/tags{/sha}"
            },
            "git_url": {
              "type": "string",
              "example": "git:github.com/octocat/Hello-World.git"
            },
            "issue_comment_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/issues/comments{/number}"
            },
            "issue_events_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/issues/events{/number}"
            },
            "issues_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/issues{/number}"
            },
            "keys_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/keys{/key_id}"
            },
            "labels_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/labels{/name}"
            },
            "languages_url": {
              "type": "string",
              "format": "uri",
              "example": "http://api.github.com/repos/octocat/Hello-World/languages"
            },
            "merges_url": {
              "type": "string",
              "format": "uri",
              "example": "http://api.github.com/repos/octocat/Hello-World/merges"
            },
            "milestones_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/milestones{/number}"
            },
            "notifications_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}"
            },
            "pulls_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/pulls{/number}"
            },
            "releases_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/releases{/id}"
            },
            "ssh_url": {
              "type": "string",
              "example": "git@github.com:octocat/Hello-World.git"
            },
            "stargazers_url": {
              "type": "string",
              "format": "uri",
              "example": "http://api.github.com/repos/octocat/Hello-World/stargazers"
            },
            "statuses_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/statuses/{sha}"
            },
            "subscribers_url": {
              "type": "string",
              "format": "uri",
              "example": "http://api.github.com/repos/octocat/Hello-World/subscribers"
            },
            "subscription_url": {
              "type": "string",
              "format": "uri",
              "example": "http://api.github.com/repos/octocat/Hello-World/subscription"
            },
            "tags_url": {
              "type": "string",
              "format": "uri",
              "example": "http://api.github.com/repos/octocat/Hello-World/tags"
            },
            "teams_url": {
              "type": "string",
              "format": "uri",
              "example": "http://api.github.com/repos/octocat/Hello-World/teams"
            },
            "trees_url": {
              "type": "string",
              "example": "http://api.github.com/repos/octocat/Hello-World/git/trees{/sha}"
            },
            "clone_url": {
              "type": "string",
              "example": "https://github.com/octocat/Hello-World.git"
            },
            "mirror_url": {
              "type": "string",
              "format": "uri",
              "example": "git:git.example.com/octocat/Hello-World",
              "nullable": true
            },
            "hooks_url": {
              "type": "string",
              "format": "uri",
              "example": "http://api.github.com/repos/octocat/Hello-World/hooks"
            },
            "svn_url": {
              "type": "string",
              "format": "uri",
              "example": "https://svn.github.com/octocat/Hello-World"
            },
            "homepage": {
              "type": "string",
              "format": "uri",
              "example": "https://github.com",
              "nullable": true
            },
            "language": {
              "type": "string",
              "nullable": true
            },
            "forks_count": {
              "type": "integer",
              "example": 9
            },
            "stargazers_count": {
              "type": "integer",
              "example": 80
            },
            "watchers_count": {
              "type": "integer",
              "example": 80
            },
            "size": {
              "type": "integer",
              "example": 108
            },
            "default_branch": {
              "description": "The default branch of the repository.",
              "type": "string",
              "example": "master"
            },
            "open_issues_count": {
              "type": "integer",
              "example": 0
            },
            "is_template": {
              "description": "Whether this repository acts as a template that can be used to generate new repositories.",
              "default": false,
              "type": "boolean",
              "example": true
            },
            "topics": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "has_issues": {
              "description": "Whether issues are enabled.",
              "default": true,
              "type": "boolean",
              "example": true
            },
            "has_projects": {
              "description": "Whether projects are enabled.",
              "default": true,
              "type": "boolean",
              "example": true
            },
            "has_wiki": {
              "description": "Whether the wiki is enabled.",
              "default": true,
              "type": "boolean",
              "example": true
            },
            "has_pages": {
              "type": "boolean"
            },
            "has_downloads": {
              "description": "Whether downloads are enabled.",
              "default": true,
              "type": "boolean",
              "example": true
            },
            "archived": {
              "description": "Whether the repository is archived.",
              "default": false,
              "type": "boolean"
            },
            "disabled": {
              "type": "boolean",
              "description": "Returns whether or not this repository disabled."
            },
            "visibility": {
              "description": "The repository visibility: public, private, or internal.",
              "default": "public",
              "type": "string"
            },
            "pushed_at": {
              "type": "string",
              "format": "date-time",
              "example": "2011-01-26T19:06:43Z",
              "nullable": true
            },
            "created_at": {
              "type": "string",
              "format": "date-time",
              "example": "2011-01-26T19:01:12Z",
              "nullable": true
            },
            "updated_at": {
              "type": "string",
              "format": "date-time",
              "example": "2011-01-26T19:14:43Z",
              "nullable": true
            },
            "allow_rebase_merge": {
              "description": "Whether to allow rebase merges for pull requests.",
              "default": true,
              "type": "boolean",
              "example": true
            },
            "template_repository": {
              "nullable": true,
              "type": "object",
              "properties": {
                "id": {
                  "type": "integer"
                },
                "node_id": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "full_name": {
                  "type": "string"
                },
                "owner": {
                  "type": "object",
                  "properties": {
                    "login": {
                      "type": "string"
                    },
                    "id": {
                      "type": "integer"
                    },
                    "node_id": {
                      "type": "string"
                    },
                    "avatar_url": {
                      "type": "string"
                    },
                    "gravatar_id": {
                      "type": "string"
                    },
                    "url": {
                      "type": "string"
                    },
                    "html_url": {
                      "type": "string"
                    },
                    "followers_url": {
                      "type": "string"
                    },
                    "following_url": {
                      "type": "string"
                    },
                    "gists_url": {
                      "type": "string"
                    },
                    "starred_url": {
                      "type": "string"
                    },
                    "subscriptions_url": {
                      "type": "string"
                    },
                    "organizations_url": {
                      "type": "string"
                    },
                    "repos_url": {
                      "type": "string"
                    },
                    "events_url": {
                      "type": "string"
                    },
                    "received_events_url": {
                      "type": "string"
                    },
                    "type": {
                      "type": "string"
                    },
                    "site_admin": {
                      "type": "boolean"
                    }
                  }
                },
                "private": {
                  "type": "boolean"
                },
                "html_url": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "fork": {
                  "type": "boolean"
                },
                "url": {
                  "type": "string"
                },
                "archive_url": {
                  "type": "string"
                },
                "assignees_url": {
                  "type": "string"
                },
                "blobs_url": {
                  "type": "string"
                },
                "branches_url": {
                  "type": "string"
                },
                "collaborators_url": {
                  "type": "string"
                },
                "comments_url": {
                  "type": "string"
                },
                "commits_url": {
                  "type": "string"
                },
                "compare_url": {
                  "type": "string"
                },
                "contents_url": {
                  "type": "string"
                },
                "contributors_url": {
                  "type": "string"
                },
                "deployments_url": {
                  "type": "string"
                },
                "downloads_url": {
                  "type": "string"
                },
                "events_url": {
                  "type": "string"
                },
                "forks_url": {
                  "type": "string"
                },
                "git_commits_url": {
                  "type": "string"
                },
                "git_refs_url": {
                  "type": "string"
                },
                "git_tags_url": {
                  "type": "string"
                },
                "git_url": {
                  "type": "string"
                },
                "issue_comment_url": {
                  "type": "string"
                },
                "issue_events_url": {
                  "type": "string"
                },
                "issues_url": {
                  "type": "string"
                },
                "keys_url": {
                  "type": "string"
                },
                "labels_url": {
                  "type": "string"
                },
                "languages_url": {
                  "type": "string"
                },
                "merges_url": {
                  "type": "string"
                },
                "milestones_url": {
                  "type": "string"
                },
                "notifications_url": {
                  "type": "string"
                },
                "pulls_url": {
                  "type": "string"
                },
                "releases_url": {
                  "type": "string"
                },
                "ssh_url": {
                  "type": "string"
                },
                "stargazers_url": {
                  "type": "string"
                },
                "statuses_url": {
                  "type": "string"
                },
                "subscribers_url": {
                  "type": "string"
                },
                "subscription_url": {
                  "type": "string"
                },
                "tags_url": {
                  "type": "string"
                },
                "teams_url": {
                  "type": "string"
                },
                "trees_url": {
                  "type": "string"
                },
                "clone_url": {
                  "type": "string"
                },
                "mirror_url": {
                  "type": "string"
                },
                "hooks_url": {
                  "type": "string"
                },
                "svn_url": {
                  "type": "string"
                },
                "homepage": {
                  "type": "string"
                },
                "language": {
                  "type": "string"
                },
                "forks_count": {
                  "type": "integer"
                },
                "stargazers_count": {
                  "type": "integer"
                },
                "watchers_count": {
                  "type": "integer"
                },
                "size": {
                  "type": "integer"
                },
                "default_branch": {
                  "type": "string"
                },
                "open_issues_count": {
                  "type": "integer"
                },
                "is_template": {
                  "type": "boolean"
                },
                "topics": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "has_issues": {
                  "type": "boolean"
                },
                "has_projects": {
                  "type": "boolean"
                },
                "has_wiki": {
                  "type": "boolean"
                },
                "has_pages": {
                  "type": "boolean"
                },
                "has_downloads": {
                  "type": "boolean"
                },
                "archived": {
                  "type": "boolean"
                },
                "disabled": {
                  "type": "boolean"
                },
                "visibility": {
                  "type": "string"
                },
                "pushed_at": {
                  "type": "string"
                },
                "created_at": {
                  "type": "string"
                },
                "updated_at": {
                  "type": "string"
                },
                "permissions": {
                  "type": "object",
                  "properties": {
                    "admin": {
                      "type": "boolean"
                    },
                    "maintain": {
                      "type": "boolean"
                    },
                    "push": {
                      "type": "boolean"
                    },
                    "triage": {
                      "type": "boolean"
                    },
                    "pull": {
                      "type": "boolean"
                    }
                  }
                },
                "allow_rebase_merge": {
                  "type": "boolean"
                },
                "temp_clone_token": {
                  "type": "string"
                },
                "allow_squash_merge": {
                  "type": "boolean"
                },
                "delete_branch_on_merge": {
                  "type": "boolean"
                },
                "allow_update_branch": {
                  "type": "boolean"
                },
                "allow_merge_commit": {
                  "type": "boolean"
                },
                "subscribers_count": {
                  "type": "integer"
                },
                "network_count": {
                  "type": "integer"
                }
              }
            },
            "temp_clone_token": {
              "type": "string"
            },
            "allow_squash_merge": {
              "description": "Whether to allow squash merges for pull requests.",
              "default": true,
              "type": "boolean",
              "example": true
            },
            "delete_branch_on_merge": {
              "description": "Whether to delete head branches when pull requests are merged",
              "default": false,
              "type": "boolean",
              "example": false
            },
            "allow_merge_commit": {
              "description": "Whether to allow merge commits for pull requests.",
              "default": true,
              "type": "boolean",
              "example": true
            },
            "allow_forking": {
              "description": "Whether to allow forking this repo",
              "type": "boolean"
            },
            "subscribers_count": {
              "type": "integer"
            },
            "network_count": {
              "type": "integer"
            },
            "open_issues": {
              "type": "integer"
            },
            "watchers": {
              "type": "integer"
            },
            "master_branch": {
              "type": "string"
            },
            "starred_at": {
              "type": "string",
              "example": "\"2020-07-09T00:17:42Z\""
            }
          },
          "required": [
            "archive_url",
            "assignees_url",
            "blobs_url",
            "branches_url",
            "collaborators_url",
            "comments_url",
            "commits_url",
            "compare_url",
            "contents_url",
            "contributors_url",
            "deployments_url",
            "description",
            "downloads_url",
            "events_url",
            "fork",
            "forks_url",
            "full_name",
            "git_commits_url",
            "git_refs_url",
            "git_tags_url",
            "hooks_url",
            "html_url",
            "id",
            "node_id",
            "issue_comment_url",
            "issue_events_url",
            "issues_url",
            "keys_url",
            "labels_url",
            "languages_url",
            "merges_url",
            "milestones_url",
            "name",
            "notifications_url",
            "owner",
            "private",
            "pulls_url",
            "releases_url",
            "stargazers_url",
            "statuses_url",
            "subscribers_url",
            "subscription_url",
            "tags_url",
            "teams_url",
            "trees_url",
            "url",
            "clone_url",
            "default_branch",
            "forks",
            "forks_count",
            "git_url",
            "has_downloads",
            "has_issues",
            "has_projects",
            "has_wiki",
            "has_pages",
            "homepage",
            "language",
            "archived",
            "disabled",
            "mirror_url",
            "open_issues",
            "open_issues_count",
            "license",
            "pushed_at",
            "size",
            "ssh_url",
            "stargazers_count",
            "svn_url",
            "watchers",
            "watchers_count",
            "created_at",
            "updated_at"
          ]
        },
        "nullable-license-simple": {
          "title": "License Simple",
          "description": "License Simple",
          "type": "object",
          "properties": {
            "key": {
              "type": "string",
              "example": "mit"
            },
            "name": {
              "type": "string",
              "example": "MIT License"
            },
            "url": {
              "type": "string",
              "nullable": true,
              "format": "uri",
              "example": "https://api.github.com/licenses/mit"
            },
            "spdx_id": {
              "type": "string",
              "nullable": true,
              "example": "MIT"
            },
            "node_id": {
              "type": "string",
              "example": "MDc6TGljZW5zZW1pdA=="
            },
            "html_url": {
              "type": "string",
              "format": "uri"
            }
          },
          "required": ["key", "name", "url", "spdx_id", "node_id"],
          "nullable": true
        },
        "nullable-integration": {
          "title": "GitHub app",
          "description": "GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.",
          "type": "object",
          "properties": {
            "id": {
              "description": "Unique identifier of the GitHub app",
              "example": 37,
              "type": "integer"
            },
            "slug": {
              "description": "The slug name of the GitHub app",
              "example": "probot-owners",
              "type": "string"
            },
            "node_id": {
              "type": "string",
              "example": "MDExOkludGVncmF0aW9uMQ=="
            },
            "owner": {
              "$ref": "#/definitions/nullable-simple-user"
            },
            "name": {
              "description": "The name of the GitHub app",
              "example": "Probot Owners",
              "type": "string"
            },
            "description": {
              "type": "string",
              "example": "The description of the app.",
              "nullable": true
            },
            "external_url": {
              "type": "string",
              "format": "uri",
              "example": "https://example.com"
            },
            "html_url": {
              "type": "string",
              "format": "uri",
              "example": "https://github.com/apps/super-ci"
            },
            "created_at": {
              "type": "string",
              "format": "date-time",
              "example": "2017-07-08T16:18:44-04:00"
            },
            "updated_at": {
              "type": "string",
              "format": "date-time",
              "example": "2017-07-08T16:18:44-04:00"
            },
            "permissions": {
              "description": "The set of permissions for the GitHub app",
              "type": "object",
              "properties": {
                "issues": {
                  "type": "string"
                },
                "checks": {
                  "type": "string"
                },
                "metadata": {
                  "type": "string"
                },
                "contents": {
                  "type": "string"
                },
                "deployments": {
                  "type": "string"
                }
              },
              "additionalProperties": {
                "type": "string"
              },
              "example": {
                "issues": "read",
                "deployments": "write"
              }
            },
            "events": {
              "description": "The list of events for the GitHub app",
              "example": ["label", "deployment"],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "installations_count": {
              "description": "The number of installations associated with the GitHub app",
              "example": 5,
              "type": "integer"
            },
            "client_id": {
              "type": "string",
              "example": "\"Iv1.25b5d1e65ffc4022\""
            },
            "client_secret": {
              "type": "string",
              "example": "\"1d4b2097ac622ba702d19de498f005747a8b21d3\""
            },
            "webhook_secret": {
              "type": "string",
              "example": "\"6fba8f2fc8a7e8f2cca5577eddd82ca7586b3b6b\"",
              "nullable": true
            },
            "pem": {
              "type": "string",
              "example": "\"-----BEGIN RSA PRIVATE KEY-----\\nMIIEogIBAAKCAQEArYxrNYD/iT5CZVpRJu4rBKmmze3PVmT/gCo2ATUvDvZTPTey\\nxcGJ3vvrJXazKk06pN05TN29o98jrYz4cengG3YGsXPNEpKsIrEl8NhbnxapEnM9\\nJCMRe0P5JcPsfZlX6hmiT7136GRWiGOUba2X9+HKh8QJVLG5rM007TBER9/z9mWm\\nrJuNh+m5l320oBQY/Qq3A7wzdEfZw8qm/mIN0FCeoXH1L6B8xXWaAYBwhTEh6SSn\\nZHlO1Xu1JWDmAvBCi0RO5aRSKM8q9QEkvvHP4yweAtK3N8+aAbZ7ovaDhyGz8r6r\\nzhU1b8Uo0Z2ysf503WqzQgIajr7Fry7/kUwpgQIDAQABAoIBADwJp80Ko1xHPZDy\\nfcCKBDfIuPvkmSW6KumbsLMaQv1aGdHDwwTGv3t0ixSay8CGlxMRtRDyZPib6SvQ\\n6OH/lpfpbMdW2ErkksgtoIKBVrDilfrcAvrNZu7NxRNbhCSvN8q0s4ICecjbbVQh\\nnueSdlA6vGXbW58BHMq68uRbHkP+k+mM9U0mDJ1HMch67wlg5GbayVRt63H7R2+r\\nVxcna7B80J/lCEjIYZznawgiTvp3MSanTglqAYi+m1EcSsP14bJIB9vgaxS79kTu\\noiSo93leJbBvuGo8QEiUqTwMw4tDksmkLsoqNKQ1q9P7LZ9DGcujtPy4EZsamSJT\\ny8OJt0ECgYEA2lxOxJsQk2kI325JgKFjo92mQeUObIvPfSNWUIZQDTjniOI6Gv63\\nGLWVFrZcvQBWjMEQraJA9xjPbblV8PtfO87MiJGLWCHFxmPz2dzoedN+2Coxom8m\\nV95CLz8QUShuao6u/RYcvUaZEoYs5bHcTmy5sBK80JyEmafJPtCQVxMCgYEAy3ar\\nZr3yv4xRPEPMat4rseswmuMooSaK3SKub19WFI5IAtB/e7qR1Rj9JhOGcZz+OQrl\\nT78O2OFYlgOIkJPvRMrPpK5V9lslc7tz1FSh3BZMRGq5jSyD7ETSOQ0c8T2O/s7v\\nbeEPbVbDe4mwvM24XByH0GnWveVxaDl51ABD65sCgYB3ZAspUkOA5egVCh8kNpnd\\nSd6SnuQBE3ySRlT2WEnCwP9Ph6oPgn+oAfiPX4xbRqkL8q/k0BdHQ4h+zNwhk7+h\\nWtPYRAP1Xxnc/F+jGjb+DVaIaKGU18MWPg7f+FI6nampl3Q0KvfxwX0GdNhtio8T\\nTj1E+SnFwh56SRQuxSh2gwKBgHKjlIO5NtNSflsUYFM+hyQiPiqnHzddfhSG+/3o\\nm5nNaSmczJesUYreH5San7/YEy2UxAugvP7aSY2MxB+iGsiJ9WD2kZzTUlDZJ7RV\\nUzWsoqBR+eZfVJ2FUWWvy8TpSG6trh4dFxImNtKejCR1TREpSiTV3Zb1dmahK9GV\\nrK9NAoGAbBxRLoC01xfxCTgt5BDiBcFVh4fp5yYKwavJPLzHSpuDOrrI9jDn1oKN\\nonq5sDU1i391zfQvdrbX4Ova48BN+B7p63FocP/MK5tyyBoT8zQEk2+vWDOw7H/Z\\nu5dTCPxTIsoIwUw1I+7yIxqJzLPFgR2gVBwY1ra/8iAqCj+zeBw=\\n-----END RSA PRIVATE KEY-----\\n\""
            }
          },
          "required": [
            "id",
            "node_id",
            "owner",
            "name",
            "description",
            "external_url",
            "html_url",
            "created_at",
            "updated_at",
            "permissions",
            "events"
          ],
          "nullable": true
        },
        "author_association": {
          "title": "author_association",
          "type": "string",
          "example": "OWNER",
          "description": "How the author is associated with the repository.",
          "enum": [
            "COLLABORATOR",
            "CONTRIBUTOR",
            "FIRST_TIMER",
            "FIRST_TIME_CONTRIBUTOR",
            "MANNEQUIN",
            "MEMBER",
            "NONE",
            "OWNER"
          ]
        },
        "reaction-rollup": {
          "title": "Reaction Rollup",
          "type": "object",
          "properties": {
            "url": {
              "type": "string",
              "format": "uri"
            },
            "total_count": {
              "type": "integer"
            },
            "+1": {
              "type": "integer"
            },
            "-1": {
              "type": "integer"
            },
            "laugh": {
              "type": "integer"
            },
            "confused": {
              "type": "integer"
            },
            "heart": {
              "type": "integer"
            },
            "hooray": {
              "type": "integer"
            },
            "eyes": {
              "type": "integer"
            },
            "rocket": {
              "type": "integer"
            }
          },
          "required": ["url", "total_count", "+1", "-1", "laugh", "confused", "heart", "hooray", "eyes", "rocket"]
        }
      }
    }
  },
  references: {
    allOfRenference: {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "allOf": [
        {
          "type": "object",
          "properties": {
            "AAAAA": { "allOf": [{ "description": "AAAAA", "type": "string" }, { "examples": ["AAAAA"] }] },
            "BBBBB": {
              "allOf": [
                {
                  "$ref": "#/paths/~1operation/post/requestBody/content/application~1json/schema/allOf/0/properties/AAAAA/allOf/0",
                  "description": "BBBBB"
                },
                { "examples": ["BBBBB"] }
              ]
            }
          }
        }
      ]
    },
    base: {
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
          "$ref": "#/definitions/address"
        }
      }
    },
    fullAllOfReference: {
      "paths": {
        "/operation": {
          "post": {
            "summary": "operation",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "type": "object",
                        "properties": {
                          "AAAAA": { "allOf": [{ "description": "AAAAA", "type": "string" }, { "examples": ["AAAAA"] }] },
                          "BBBBB": {
                            "allOf": [
                              {
                                "$ref": "#/paths/~1operation/post/requestBody/content/application~1json/schema/allOf/0/properties/AAAAA/allOf/0",
                                "description": "BBBBB"
                              },
                              { "examples": ["BBBBB"] }
                            ]
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "operationId": "operationId",
            "security": []
          }
        }
      },
      "servers": [{ "url": "http://example.com" }],
      "openapi": "3.1.0",
      "info": { "title": "Test", "version": "version" }
    },
    nested: {
      "$ref": "#/__bundled__/repo",
      "__bundled__": {
        "repo": {
          "properties": {
            "parent": {
              "allOf": [
                {
                  "$ref": "#/__bundled__/repo"
                },
                {
                  "description": "something"
                }
              ]
            }
          },
          "type": "object"
        }
      }
    },
    nullish: {
      "properties": {
        "empty-ref": {
          "$ref": null
        }
      }
    }
  },
  defaultSchema: {
    "title": "User",
    "type": "object",
    "properties": {
      "profile_photo": {
        "type": "string",
        "contentMediaType": "application/octet-stream",
        "description": "This is user's profile photo"
      },
      "name": {
        "type": "string",
        "const": "Constant name",
        "examples": ["Example name", "Different name", "Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
        "description": "The user's full name. This description can be long and should truncate once it reaches the end of the row. If it's not truncating then theres and issue that needs to be fixed. Help!"
      },
      "age": {
        "type": "number",
        "minimum": 10,
        "maximum": 40,
        "multipleOf": 10,
        "default": 20,
        "enum": [10, 20, 30, 40],
        "readOnly": true
      },
      "completed_at": {
        "type": "string",
        "format": "date-time",
        "writeOnly": true,
        "pattern": "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
      },
      "items": {
        "type": ["null", "array"],
        "items": {
          "type": ["string", "number"]
        },
        "minItems": 1,
        "maxItems": 4,
        "description": "This description can be long and should truncate once it reaches the end of the row. If it's not truncating then theres and issue that needs to be fixed. Help!"
      },
      "email": {
        "type": "string",
        "format": "email",
        "examples": ["one@email.com", "two@email.com"],
        "deprecated": true,
        "default": "default@email.com",
        "minLength": 2
      },
      "plan": {
        "anyOf": [
          {
            "type": "object",
            "properties": {
              "foo": {
                "type": "string"
              },
              "bar": {
                "type": "string"
              }
            },
            "deprecated": false,
            "example": "hi",
            "required": ["foo", "bar"]
          },
          {
            "type": "array",
            "items": {
              "type": "integer"
            }
          }
        ]
      },
      "permissions": {
        "type": ["string", "object"],
        "properties": {
          "ids": {
            "type": "array",
            "items": {
              "type": "integer"
            }
          }
        }
      },
      "ref": {
        "$ref": "#/properties/permissions"
      }
    },
    "patternProperties": {
      "^id_": { "type": "number" },
      "foo": { "type": "integer" },
      "_name$": { "type": "string" }
    },
    "required": ["name", "age", "completed_at"]
  },
  formatsSchema: {
    "title": "model-with-formats",
    "type": "object",
    "properties": {
      "date-of-birth": {
        "type": ["number", "string", "array"],
        "format": "date-time",
        "items": {}
      },
      "name": {
        "type": "string"
      },
      "id": {
        "type": "number",
        "format": "float"
      },
      "count": {
        "type": ["integer", "null"],
        "format": "int32"
      },
      "size": {
        "type": ["number", "string"],
        "format": "byte"
      },
      "notype": {
        "format": "date-time"
      },
      "array-of-integers": {
        "type": "array",
        "items": {
          "type": "integer",
          "format": "int32"
        }
      },
      "map-of-ids": {
        "type": "object",
        "additionalProperties": {
          "type": "integer",
          "format": "int32"
        }
      },
      "permissions": {
        "type": ["string", "object"],
        "format": "password",
        "properties": {
          "ids": {
            "type": "array",
            "items": {
              "type": "integer",
              "format": "int32"
            }
          }
        }
      }
    }
  },
  stressSchema: {
    "title": "Confirmation Combined",
    "allOf": [
      {
        "title": "Confirmation Base",
        "description": "",
        "type": "object",
        "properties": {
          "confirmationId": {
            "type": "string",
            "description": "System of record confirmation Id"
          },
          "partyId": {
            "type": "string"
          },
          "systemOfRecord": {
            "title": "System Of Record",
            "type": "string",
            "enum": ["LOREM", "HEART", "IPSUM_CENTER", "SECURITY", "BAR", "FOO", "BUDDY", "BONUS"]
          },
          "systemOfRecordTransactionDate": {
            "title": "Date Time Extended",
            "type": "object",
            "properties": {
              "value": {
                "type": "string",
                "format": "date-time"
              },
              "format": {
                "type": "string",
                "enum": [
                  "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                  "yyyy-MM-dd'T'HH:mm:ss'Z'",
                  "yyyy-MM-dd'T'HH:mm'Z'",
                  "yyyy-MM-dd'T'HH",
                  "yyyy-MM-dd",
                  "yyyy-MM",
                  "yyyy"
                ]
              },
              "minValue": {
                "type": "string"
              },
              "maxValue": {
                "type": "string"
              },
              "defaultValue": {
                "type": "string"
              }
            },
            "required": ["value"]
          },
          "dateOfLoss": {
            "title": "Date Time Extended",
            "type": "object",
            "properties": {
              "value": {
                "type": "string",
                "format": "date-time"
              },
              "format": {
                "type": "string",
                "enum": [
                  "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                  "yyyy-MM-dd'T'HH:mm:ss'Z'",
                  "yyyy-MM-dd'T'HH:mm'Z'",
                  "yyyy-MM-dd'T'HH",
                  "yyyy-MM-dd",
                  "yyyy-MM",
                  "yyyy"
                ]
              },
              "minValue": {
                "type": "string"
              },
              "maxValue": {
                "type": "string"
              },
              "defaultValue": {
                "type": "string"
              }
            },
            "required": ["value"]
          },
          "reportedDate": {
            "title": "Date Time Extended",
            "type": "object",
            "properties": {
              "value": {
                "type": "string",
                "format": "date-time"
              },
              "format": {
                "type": "string",
                "enum": [
                  "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                  "yyyy-MM-dd'T'HH:mm:ss'Z'",
                  "yyyy-MM-dd'T'HH:mm'Z'",
                  "yyyy-MM-dd'T'HH",
                  "yyyy-MM-dd",
                  "yyyy-MM",
                  "yyyy"
                ]
              },
              "minValue": {
                "type": "string"
              },
              "maxValue": {
                "type": "string"
              },
              "defaultValue": {
                "type": "string"
              }
            },
            "required": ["value"]
          },
          "effectiveDate": {
            "title": "Date Time Extended",
            "type": "object",
            "properties": {
              "value": {
                "type": "string",
                "format": "date-time"
              },
              "format": {
                "type": "string",
                "enum": [
                  "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                  "yyyy-MM-dd'T'HH:mm:ss'Z'",
                  "yyyy-MM-dd'T'HH:mm'Z'",
                  "yyyy-MM-dd'T'HH",
                  "yyyy-MM-dd",
                  "yyyy-MM",
                  "yyyy"
                ]
              },
              "minValue": {
                "type": "string"
              },
              "maxValue": {
                "type": "string"
              },
              "defaultValue": {
                "type": "string"
              }
            },
            "required": ["value"]
          },
          "exportedAt": {
            "type": "string",
            "format": "date-time",
            "description": "When was this record exported out from the System of Record source. Format should be in UTC and as per ISO 8601/RFC3339 format (yyyy-MM-dd'T'HH:mm:ss.SSS'Z')"
          },
          "isInsuredAtFault": {
            "type": "boolean",
            "description": "Indicates whether or not the insured is to blame for the loss/accident"
          },
          "lossCause": {
            "type": "object",
            "description": "System of record loss code and its description",
            "properties": {
              "code": {
                "type": "string"
              },
              "codeDescription": {
                "type": "string"
              }
            },
            "required": ["code", "codeDescription"]
          },
          "status": {
            "type": "string",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum, arcu sit amet cursus dictum, libero ex vestibulum arcu, at elementum odio leo vel risus. Maecenas mi ipsum, vehicula ac dui sit amet, mattis ultricies lorem. Duis nec laoreet diam. Integer id aliquet tellus. Aliquam varius augue id mauris molestie, ac consectetur nulla vestibulum. Nulla lorem diam, euismod eget massa non, pulvinar tincidunt diam. Ut euismod augue at eros mattis, congue aliquet nisi pulvinar. Nam quis neque elit. Suspendisse pretium cursus dolor, eget vehicula sapien tristique ac. Ut eget varius ex, faucibus pharetra magna.",
            "enum": [
              "ARCHIVED",
              "CLOSED",
              "OPEN",
              "DRAFT",
              "CANCELLED",
              "INSTALMENT",
              "LAPSED",
              "PENDING",
              "REFUSED",
              "SPANISH",
              "LITIGATION",
              "REOPENED",
              "NOTIFICATION"
            ]
          },
          "confirmationHandler": {
            "type": "string",
            "description": "String that identifies the employee that is handling the confirmation.\nIn HEART, this will be the person's initials. In Lorem, this will be a full name"
          },
          "costOfConfirmation": {
            "title": "Amount Extended",
            "type": "object",
            "properties": {
              "amount": {
                "type": "number"
              },
              "currencyCode": {
                "type": "string"
              },
              "isGSTInclusive": {
                "type": "boolean"
              },
              "GSTAmount": {
                "type": "number"
              },
              "GSTPercentageApplicable": {
                "type": "number"
              },
              "description": {
                "type": "string"
              }
            },
            "required": ["amount"]
          },
          "insurancePolicy": {
            "type": "object",
            "properties": {
              "insurancePolicyId": {
                "type": "string",
                "description": "Bird ID of Policy"
              },
              "systemOfRecord": {
                "title": "System Of Record",
                "type": "string",
                "enum": ["LOREM", "HEART", "IPSUM_CENTER", "SECURITY", "BAR", "FOO", "BUDDY", "BONUS"]
              },
              "policyId": {
                "type": "string",
                "description": "systemOfRecord ID"
              },
              "riskId": {
                "type": "string",
                "description": ""
              },
              "riskGroupId": {
                "type": "string"
              }
            },
            "required": ["systemOfRecord", "policyId"]
          },
          "underlyingInsurancePolicy": {
            "title": "Insurance Policy Base",
            "description": "An agreement **individual agreement**, **commercial agreement** or **group agreement** between an *insurer* and a *policyholder* based on a *financial services product*. The agreement specifies the obligation of the *insurer* to pay benefits and of the **premium payer** to pay premiums.",
            "type": "object",
            "properties": {
              "policyId": {
                "type": "string",
                "description": "The policy reference number for the insurance policy. Each policy number can include multiple products under one policy reference"
              },
              "systemOfRecord": {
                "title": "System Of Record",
                "type": "string",
                "enum": ["LOREM", "HEART", "IPSUM_CENTER", "SECURITY", "BAR", "FOO", "BUDDY", "BONUS"]
              },
              "systemOfRecordTransactionDate": {
                "title": "Date Time Extended",
                "type": "object",
                "properties": {
                  "value": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "format": {
                    "type": "string",
                    "enum": [
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                      "yyyy-MM-dd'T'HH:mm:ss'Z'",
                      "yyyy-MM-dd'T'HH:mm'Z'",
                      "yyyy-MM-dd'T'HH",
                      "yyyy-MM-dd",
                      "yyyy-MM",
                      "yyyy"
                    ]
                  },
                  "minValue": {
                    "type": "string"
                  },
                  "maxValue": {
                    "type": "string"
                  },
                  "defaultValue": {
                    "type": "string"
                  }
                },
                "required": ["value"]
              },
              "originalInceptionDate": {
                "title": "Date Time Extended",
                "type": "object",
                "properties": {
                  "value": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "format": {
                    "type": "string",
                    "enum": [
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                      "yyyy-MM-dd'T'HH:mm:ss'Z'",
                      "yyyy-MM-dd'T'HH:mm'Z'",
                      "yyyy-MM-dd'T'HH",
                      "yyyy-MM-dd",
                      "yyyy-MM",
                      "yyyy"
                    ]
                  },
                  "minValue": {
                    "type": "string"
                  },
                  "maxValue": {
                    "type": "string"
                  },
                  "defaultValue": {
                    "type": "string"
                  }
                },
                "required": ["value"]
              },
              "inceptionDate": {
                "title": "Date Time Extended",
                "type": "object",
                "properties": {
                  "value": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "format": {
                    "type": "string",
                    "enum": [
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                      "yyyy-MM-dd'T'HH:mm:ss'Z'",
                      "yyyy-MM-dd'T'HH:mm'Z'",
                      "yyyy-MM-dd'T'HH",
                      "yyyy-MM-dd",
                      "yyyy-MM",
                      "yyyy"
                    ]
                  },
                  "minValue": {
                    "type": "string"
                  },
                  "maxValue": {
                    "type": "string"
                  },
                  "defaultValue": {
                    "type": "string"
                  }
                },
                "required": ["value"]
              },
              "expiryDate": {
                "title": "Date Time Extended",
                "type": "object",
                "properties": {
                  "value": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "format": {
                    "type": "string",
                    "enum": [
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                      "yyyy-MM-dd'T'HH:mm:ss'Z'",
                      "yyyy-MM-dd'T'HH:mm'Z'",
                      "yyyy-MM-dd'T'HH",
                      "yyyy-MM-dd",
                      "yyyy-MM",
                      "yyyy"
                    ]
                  },
                  "minValue": {
                    "type": "string"
                  },
                  "maxValue": {
                    "type": "string"
                  },
                  "defaultValue": {
                    "type": "string"
                  }
                },
                "required": ["value"]
              },
              "effectiveDate": {
                "title": "Date Time Extended",
                "type": "object",
                "properties": {
                  "value": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "format": {
                    "type": "string",
                    "enum": [
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                      "yyyy-MM-dd'T'HH:mm:ss'Z'",
                      "yyyy-MM-dd'T'HH:mm'Z'",
                      "yyyy-MM-dd'T'HH",
                      "yyyy-MM-dd",
                      "yyyy-MM",
                      "yyyy"
                    ]
                  },
                  "minValue": {
                    "type": "string"
                  },
                  "maxValue": {
                    "type": "string"
                  },
                  "defaultValue": {
                    "type": "string"
                  }
                },
                "required": ["value"]
              },
              "cancellationDate": {
                "title": "Date Time Extended",
                "type": "object",
                "properties": {
                  "value": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "format": {
                    "type": "string",
                    "enum": [
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                      "yyyy-MM-dd'T'HH:mm:ss'Z'",
                      "yyyy-MM-dd'T'HH:mm'Z'",
                      "yyyy-MM-dd'T'HH",
                      "yyyy-MM-dd",
                      "yyyy-MM",
                      "yyyy"
                    ]
                  },
                  "minValue": {
                    "type": "string"
                  },
                  "maxValue": {
                    "type": "string"
                  },
                  "defaultValue": {
                    "type": "string"
                  }
                },
                "required": ["value"]
              },
              "reviewDate": {
                "title": "Date Time Extended",
                "type": "object",
                "properties": {
                  "value": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "format": {
                    "type": "string",
                    "enum": [
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                      "yyyy-MM-dd'T'HH:mm:ss'Z'",
                      "yyyy-MM-dd'T'HH:mm'Z'",
                      "yyyy-MM-dd'T'HH",
                      "yyyy-MM-dd",
                      "yyyy-MM",
                      "yyyy"
                    ]
                  },
                  "minValue": {
                    "type": "string"
                  },
                  "maxValue": {
                    "type": "string"
                  },
                  "defaultValue": {
                    "type": "string"
                  }
                },
                "required": ["value"]
              },
              "exportedAt": {
                "type": "string",
                "description": "The current view of the policy as at the effective date. When was this record exported out from the System of Record source. Format should be in UTC and as per ISO 8601/RFC3339 format (yyyy-MM-dd'T'HH:mm:ss.SSS'Z')",
                "format": "date-time"
              },
              "customerId": {
                "type": "string",
                "description": "Client reference number which signifies the policy owner"
              },
              "brand": {
                "title": "Brand",
                "type": "string",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum, arcu sit amet cursus dictum, libero ex vestibulum arcu, at elementum odio leo vel risus. Maecenas mi ipsum, vehicula ac dui sit amet, mattis ultricies lorem. Duis nec laoreet diam. Integer id aliquet tellus. Aliquam varius augue id mauris molestie, ac consectetur nulla vestibulum. Nulla lorem diam, euismod eget massa non, pulvinar tincidunt diam. Ut euismod augue at eros mattis, congue aliquet nisi pulvinar. Nam quis neque elit. Suspendisse pretium cursus dolor, eget vehicula sapien tristique ac. Ut eget varius ex, faucibus pharetra magna.",
                "enum": [
                  "AMI",
                  "STATE",
                  "NZI",
                  "ANY",
                  "ASB",
                  "BNZ",
                  "COOPERATIVE",
                  "LUMLEY",
                  "IAG",
                  "MGA",
                  "PSIS",
                  "WESTPAC"
                ]
              },
              "partyLists": {
                "type": "array",
                "items": {
                  "type": "object",
                  "title": "Party List",
                  "properties": {
                    "partyId": {
                      "type": "string"
                    },
                    "systemOfRecord": {
                      "title": "System Of Record",
                      "type": "string",
                      "enum": ["LOREM", "HEART", "IPSUM_CENTER", "SECURITY", "BAR", "FOO", "BUDDY", "BONUS"]
                    },
                    "partyRoles": {
                      "type": "array",
                      "items": {
                        "title": "Party Role",
                        "type": "string",
                        "enum": [
                          "CUSTOMER",
                          "INSURED",
                          "ADDITIONAL_INSURED",
                          "NAMED_DRIVER",
                          "PRIMARY_CONTACT",
                          "SECONDARY_CONTACT",
                          "AUTHORISER",
                          "NAMED_PARTY"
                        ]
                      }
                    },
                    "externalReferences": {
                      "type": "array",
                      "items": {
                        "title": "External Reference",
                        "description": "",
                        "type": "object",
                        "properties": {
                          "namespace": {
                            "description": "A namespace for the identifier.",
                            "type": "string"
                          },
                          "identifier": {
                            "description": "An identifier for the entity",
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              },
              "externalReferences": {
                "description": "",
                "type": "array",
                "items": {
                  "title": "External Reference",
                  "description": "",
                  "type": "object",
                  "properties": {
                    "namespace": {
                      "description": "A namespace for the identifier.",
                      "type": "string"
                    },
                    "identifier": {
                      "description": "An identifier for the entity",
                      "type": "string"
                    }
                  }
                }
              },
              "hasAcceptedTerms": {
                "type": "boolean",
                "description": "Has the customer accepted Terms and Conditions?"
              },
              "beenAdvisedOfDetails": {
                "type": "boolean"
              },
              "renewablePeriod": {
                "type": "string",
                "description": "Frequency at which the policy renews eg. Annual policy will renew fortnightly"
              },
              "insuredRiskGroups": {
                "type": "array",
                "description": "An insurance policy can cover several assets; each asset is represented by an insured risk.\nAn insured risk group relates to a specific type of cover. Each risk group usually represents a specific product risk included under the policy.\nMajority of the insurance policies, especially for personal lines insurance products, include a single insured risk under an insured risk group.\n\nA contract component detailing the circumstances under which a benefit (money or services) will be paid. Effectively this provides protection against a particular risk. In property insurance, coverage identifies elements such as perils insured against, properties covered, locations covered, individuals insured and the limits of indemnification. In life insurance, a coverage identifies elements such as living and death benefits. In **GuideWire**, this is also known as *Coverable* or a *Group*",
                "items": {
                  "type": "object",
                  "title": "Insured Risk Group",
                  "properties": {
                    "riskGroupId": {
                      "type": "string",
                      "description": "A unique identifier for the insured risk group under an insurance policy. Usually identified as a risk number"
                    },
                    "riskGroupType": {
                      "title": "Risk Type",
                      "type": "string",
                      "description": "",
                      "enum": [
                        "COMMERCIAL_VEHICLE",
                        "PRIVATE_VEHICLE",
                        "HOME",
                        "CONTENTS",
                        "BUSINESS_ASSETS",
                        "GENERAL_LIABILITY",
                        "STATUTORY_LIABILITY",
                        "EMPLOYERS_LIABILITY",
                        "BUSINESS_INTERRUPTION",
                        "PLEASUREKRAFT",
                        "MOBILE_BUSINESS_ASSETS",
                        "LIABILITY",
                        "MARINE",
                        "LIABILITY",
                        "CONTRACT_WORKS",
                        "DETERIORATION",
                        "ELECTRONIC_EQUIPMENT",
                        "INCOME_PROTECTION",
                        "MACHINERY_BREAKDOWN",
                        "CARRIERS_LIABILITY"
                      ]
                    },
                    "attachmentDate": {
                      "title": "Date Time Extended",
                      "type": "object",
                      "properties": {
                        "value": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "format": {
                          "type": "string",
                          "enum": [
                            "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                            "yyyy-MM-dd'T'HH:mm:ss'Z'",
                            "yyyy-MM-dd'T'HH:mm'Z'",
                            "yyyy-MM-dd'T'HH",
                            "yyyy-MM-dd",
                            "yyyy-MM",
                            "yyyy"
                          ]
                        },
                        "minValue": {
                          "type": "string"
                        },
                        "maxValue": {
                          "type": "string"
                        },
                        "defaultValue": {
                          "type": "string"
                        }
                      },
                      "required": ["value"]
                    },
                    "effectiveDate": {
                      "title": "Date Time Extended",
                      "type": "object",
                      "properties": {
                        "value": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "format": {
                          "type": "string",
                          "enum": [
                            "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                            "yyyy-MM-dd'T'HH:mm:ss'Z'",
                            "yyyy-MM-dd'T'HH:mm'Z'",
                            "yyyy-MM-dd'T'HH",
                            "yyyy-MM-dd",
                            "yyyy-MM",
                            "yyyy"
                          ]
                        },
                        "minValue": {
                          "type": "string"
                        },
                        "maxValue": {
                          "type": "string"
                        },
                        "defaultValue": {
                          "type": "string"
                        }
                      },
                      "required": ["value"]
                    },
                    "endDate": {
                      "title": "Date Time Extended",
                      "type": "object",
                      "properties": {
                        "value": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "format": {
                          "type": "string",
                          "enum": [
                            "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                            "yyyy-MM-dd'T'HH:mm:ss'Z'",
                            "yyyy-MM-dd'T'HH:mm'Z'",
                            "yyyy-MM-dd'T'HH",
                            "yyyy-MM-dd",
                            "yyyy-MM",
                            "yyyy"
                          ]
                        },
                        "minValue": {
                          "type": "string"
                        },
                        "maxValue": {
                          "type": "string"
                        },
                        "defaultValue": {
                          "type": "string"
                        }
                      },
                      "required": ["value"]
                    },
                    "externalReferences": {
                      "description": "This is thirdPartyRiskID",
                      "type": "array",
                      "items": {
                        "title": "External Reference",
                        "description": "",
                        "type": "object",
                        "properties": {
                          "namespace": {
                            "description": "A namespace for the identifier.",
                            "type": "string"
                          },
                          "identifier": {
                            "description": "An identifier for the entity",
                            "type": "string"
                          }
                        }
                      }
                    },
                    "notes": {
                      "type": "array",
                      "items": {
                        "title": "Note",
                        "description": "",
                        "type": "object",
                        "properties": {
                          "effectiveDate": {
                            "title": "Date Time Extended",
                            "type": "object",
                            "properties": {
                              "value": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "format": {
                                "type": "string",
                                "enum": [
                                  "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                  "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                  "yyyy-MM-dd'T'HH:mm'Z'",
                                  "yyyy-MM-dd'T'HH",
                                  "yyyy-MM-dd",
                                  "yyyy-MM",
                                  "yyyy"
                                ]
                              },
                              "minValue": {
                                "type": "string"
                              },
                              "maxValue": {
                                "type": "string"
                              },
                              "defaultValue": {
                                "type": "string"
                              }
                            },
                            "required": ["value"]
                          },
                          "text": {
                            "type": "string"
                          },
                          "externalReferences": {
                            "description": "",
                            "type": "array",
                            "items": {
                              "title": "External Reference",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "namespace": {
                                  "description": "A namespace for the identifier.",
                                  "type": "string"
                                },
                                "identifier": {
                                  "description": "An identifier for the entity",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "forInternalUse": {
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "insuredRisks": {
                      "description": "An insured risk represents an asset covered by this insurance policy.\n\nThe list of each insured risk under the insurance policy",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "riskId": {
                            "type": "string",
                            "description": "A unique identifier for the insured risk group under an insured risk group. Usually identified as a risk number"
                          },
                          "lineOfBusinessCategory": {
                            "title": "Line Of Business Category",
                            "type": "string",
                            "enum": [
                              "COMMERCIAL_VEHICLE",
                              "PRIVATE_VEHICLE",
                              "HOME",
                              "CONTENTS",
                              "LIABILITY",
                              "PLEASUREKRAFT",
                              "BUSINESS_ASSETS",
                              "MOBILE_BUSINESS_ASSETS",
                              "BUSINESS_INTERRUPTION",
                              "MARINE",
                              "COMMERCIAL_PROPERTY"
                            ]
                          },
                          "attachmentDate": {
                            "title": "Date Time Extended",
                            "type": "object",
                            "properties": {
                              "value": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "format": {
                                "type": "string",
                                "enum": [
                                  "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                  "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                  "yyyy-MM-dd'T'HH:mm'Z'",
                                  "yyyy-MM-dd'T'HH",
                                  "yyyy-MM-dd",
                                  "yyyy-MM",
                                  "yyyy"
                                ]
                              },
                              "minValue": {
                                "type": "string"
                              },
                              "maxValue": {
                                "type": "string"
                              },
                              "defaultValue": {
                                "type": "string"
                              }
                            },
                            "required": ["value"]
                          },
                          "rateDate": {
                            "title": "Date Only Extended",
                            "type": "object",
                            "properties": {
                              "value": {
                                "type": "string",
                                "format": "date"
                              },
                              "format": {
                                "type": "string",
                                "enum": ["yyyy-MM-dd", "yyyy-MM", "yyyy"]
                              }
                            },
                            "required": ["value"]
                          },
                          "endDate": {
                            "title": "Date Time Extended",
                            "type": "object",
                            "properties": {
                              "value": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "format": {
                                "type": "string",
                                "enum": [
                                  "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                  "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                  "yyyy-MM-dd'T'HH:mm'Z'",
                                  "yyyy-MM-dd'T'HH",
                                  "yyyy-MM-dd",
                                  "yyyy-MM",
                                  "yyyy"
                                ]
                              },
                              "minValue": {
                                "type": "string"
                              },
                              "maxValue": {
                                "type": "string"
                              },
                              "defaultValue": {
                                "type": "string"
                              }
                            },
                            "required": ["value"]
                          },
                          "placesInvolved": {
                            "description": "",
                            "type": "array",
                            "items": {
                              "title": "Place",
                              "type": "object",
                              "properties": {
                                "address": {
                                  "title": "Address Output",
                                  "allOf": [
                                    {
                                      "type": "object",
                                      "properties": {
                                        "id": {
                                          "type": "string"
                                        }
                                      }
                                    },
                                    {
                                      "title": "Address Base",
                                      "description": "",
                                      "type": "object",
                                      "properties": {
                                        "addressId": {
                                          "description": "",
                                          "type": "string"
                                        },
                                        "addressPurpose": {
                                          "title": "Address Purpose",
                                          "type": "string",
                                          "enum": ["BILLING", "BUSINESS", "HOME", "OTHER", "MAILING", "CONTACT"]
                                        },
                                        "boxNumber": {
                                          "type": "string"
                                        },
                                        "boxType": {
                                          "type": "string"
                                        },
                                        "buildingName": {
                                          "type": "string"
                                        },
                                        "city": {
                                          "type": "string"
                                        },
                                        "country": {
                                          "type": "string"
                                        },
                                        "deliveryType": {
                                          "type": "string",
                                          "enum": [
                                            "PO_BOX",
                                            "PRIVATE_BAG",
                                            "RESPONSE_BAG",
                                            "CMB",
                                            "COUNTER_DELIVERY",
                                            "POST_BOX",
                                            "RURAL"
                                          ]
                                        },
                                        "description": {
                                          "type": "string"
                                        },
                                        "levelNumber": {
                                          "type": "string"
                                        },
                                        "levelType": {
                                          "type": "string"
                                        },
                                        "lobbyName": {
                                          "type": "string"
                                        },
                                        "postalCode": {
                                          "type": "string"
                                        },
                                        "region": {
                                          "type": "string"
                                        },
                                        "ruralDelivery": {
                                          "type": "string"
                                        },
                                        "ruralDistrict": {
                                          "type": "string"
                                        },
                                        "status": {
                                          "type": "string"
                                        },
                                        "streetName": {
                                          "type": "string"
                                        },
                                        "streetNumber": {
                                          "type": "string"
                                        },
                                        "streetNumberSuffix": {
                                          "type": "string"
                                        },
                                        "streetSuffix": {
                                          "type": "string"
                                        },
                                        "streetType": {
                                          "type": "string"
                                        },
                                        "subregion": {
                                          "type": "string"
                                        },
                                        "unitNumber": {
                                          "type": "string"
                                        },
                                        "unitType": {
                                          "type": "string"
                                        },
                                        "unstructured": {
                                          "description": "An address represented in a single string",
                                          "type": "string"
                                        },
                                        "displayAddress": {
                                          "type": "array",
                                          "items": {
                                            "type": "string"
                                          }
                                        },
                                        "externalReferences": {
                                          "type": "array",
                                          "items": {
                                            "$ref": "./common.oas2.yml#/definitions/external-reference"
                                          }
                                        },
                                        "geoLocation": {
                                          "$ref": "./common.oas2.yml#/definitions/geo-location"
                                        },
                                        "sourceId": {
                                          "type": "string"
                                        },
                                        "sourceType": {
                                          "type": "string",
                                          "description": "Can be Google, DPID etc"
                                        },
                                        "rateLocation": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  ]
                                },
                                "placeType": {
                                  "type": "string",
                                  "enum": [
                                    "GARAGE_LOCATION",
                                    "PHYSICAL_LOCATION",
                                    "EXPORT_DESTINATION",
                                    "IMPORT_SOURCE",
                                    "STORAGE_LOCATION"
                                  ]
                                }
                              }
                            }
                          },
                          "interestedParties": {
                            "description": "",
                            "type": "array",
                            "items": {
                              "title": "Interested Party",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "string"
                                },
                                "name": {
                                  "type": "string"
                                },
                                "address": {
                                  "title": "Address Output",
                                  "allOf": [
                                    {
                                      "type": "object",
                                      "properties": {
                                        "id": {
                                          "type": "string"
                                        }
                                      }
                                    },
                                    {
                                      "title": "Address Base",
                                      "description": "",
                                      "type": "object",
                                      "properties": {
                                        "addressId": {
                                          "description": "",
                                          "type": "string"
                                        },
                                        "addressPurpose": {
                                          "title": "Address Purpose",
                                          "type": "string",
                                          "enum": ["BILLING", "BUSINESS", "HOME", "OTHER", "MAILING", "CONTACT"]
                                        },
                                        "boxNumber": {
                                          "type": "string"
                                        },
                                        "boxType": {
                                          "type": "string"
                                        },
                                        "buildingName": {
                                          "type": "string"
                                        },
                                        "city": {
                                          "type": "string"
                                        },
                                        "country": {
                                          "type": "string"
                                        },
                                        "deliveryType": {
                                          "type": "string",
                                          "enum": [
                                            "PO_BOX",
                                            "PRIVATE_BAG",
                                            "RESPONSE_BAG",
                                            "CMB",
                                            "COUNTER_DELIVERY",
                                            "POST_BOX",
                                            "RURAL"
                                          ]
                                        },
                                        "description": {
                                          "type": "string"
                                        },
                                        "levelNumber": {
                                          "type": "string"
                                        },
                                        "levelType": {
                                          "type": "string"
                                        },
                                        "lobbyName": {
                                          "type": "string"
                                        },
                                        "postalCode": {
                                          "type": "string"
                                        },
                                        "region": {
                                          "type": "string"
                                        },
                                        "ruralDelivery": {
                                          "type": "string"
                                        },
                                        "ruralDistrict": {
                                          "type": "string"
                                        },
                                        "status": {
                                          "type": "string"
                                        },
                                        "streetName": {
                                          "type": "string"
                                        },
                                        "streetNumber": {
                                          "type": "string"
                                        },
                                        "streetNumberSuffix": {
                                          "type": "string"
                                        },
                                        "streetSuffix": {
                                          "type": "string"
                                        },
                                        "streetType": {
                                          "type": "string"
                                        },
                                        "subregion": {
                                          "type": "string"
                                        },
                                        "unitNumber": {
                                          "type": "string"
                                        },
                                        "unitType": {
                                          "type": "string"
                                        },
                                        "unstructured": {
                                          "description": "An address represented in a single string",
                                          "type": "string"
                                        },
                                        "displayAddress": {
                                          "type": "array",
                                          "items": {
                                            "type": "string"
                                          }
                                        },
                                        "externalReferences": {
                                          "type": "array",
                                          "items": {
                                            "$ref": "./common.oas2.yml#/definitions/external-reference"
                                          }
                                        },
                                        "geoLocation": {
                                          "$ref": "./common.oas2.yml#/definitions/geo-location"
                                        },
                                        "sourceId": {
                                          "type": "string"
                                        },
                                        "sourceType": {
                                          "type": "string",
                                          "description": "Can be Google, DPID etc"
                                        },
                                        "rateLocation": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  ]
                                },
                                "interestedAs": {
                                  "type": "string"
                                },
                                "type": {
                                  "type": "string"
                                },
                                "code": {
                                  "type": "string"
                                },
                                "firstName": {
                                  "type": "string"
                                },
                                "lastName": {
                                  "type": "string"
                                },
                                "annualPayments": {
                                  "type": "number"
                                },
                                "externalReferences": {
                                  "type": "array",
                                  "items": {
                                    "title": "External Reference",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "namespace": {
                                        "description": "A namespace for the identifier.",
                                        "type": "string"
                                      },
                                      "identifier": {
                                        "description": "An identifier for the entity",
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "roleType": {
                                  "type": "string",
                                  "description": "**OTHER_INSURER**: An organisation that is an interested party in the insurance",
                                  "enum": ["SUBCONTRACTOR", "NEW_INSURER", "PREVIOUS_INSURER", "OTHER_INSURER"]
                                },
                                "interestedIn": {
                                  "type": "string"
                                },
                                "effectiveDate": {
                                  "title": "Date Time Extended",
                                  "type": "object",
                                  "properties": {
                                    "value": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "format": {
                                      "type": "string",
                                      "enum": [
                                        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                        "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                        "yyyy-MM-dd'T'HH:mm'Z'",
                                        "yyyy-MM-dd'T'HH",
                                        "yyyy-MM-dd",
                                        "yyyy-MM",
                                        "yyyy"
                                      ]
                                    },
                                    "minValue": {
                                      "type": "string"
                                    },
                                    "maxValue": {
                                      "type": "string"
                                    },
                                    "defaultValue": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["value"]
                                }
                              }
                            }
                          },
                          "externalReferences": {
                            "description": "This is thirdPartyRiskID",
                            "type": "array",
                            "items": {
                              "title": "External Reference",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "namespace": {
                                  "description": "A namespace for the identifier.",
                                  "type": "string"
                                },
                                "identifier": {
                                  "description": "An identifier for the entity",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "riskType": {
                            "title": "Risk Type",
                            "type": "string",
                            "description": "",
                            "enum": [
                              "COMMERCIAL_VEHICLE",
                              "PRIVATE_VEHICLE",
                              "HOME",
                              "CONTENTS",
                              "BUSINESS_ASSETS",
                              "GENERAL_LIABILITY",
                              "STATUTORY_LIABILITY",
                              "EMPLOYERS_LIABILITY",
                              "BUSINESS_INTERRUPTION",
                              "PLEASUREKRAFT",
                              "MOBILE_BUSINESS_ASSETS",
                              "LIABILITY",
                              "MARINE",
                              "LIABILITY",
                              "CONTRACT_WORKS",
                              "DETERIORATION",
                              "ELECTRONIC_EQUIPMENT",
                              "INCOME_PROTECTION",
                              "MACHINERY_BREAKDOWN",
                              "CARRIERS_LIABILITY"
                            ]
                          },
                          "coInsurance": {
                            "type": "object",
                            "properties": {
                              "role": {
                                "type": "string",
                                "enum": ["LEAD", "NON_LEAD"]
                              },
                              "startDate": {
                                "title": "Date Time Extended",
                                "type": "object",
                                "properties": {
                                  "value": {
                                    "type": "string",
                                    "format": "date-time"
                                  },
                                  "format": {
                                    "type": "string",
                                    "enum": [
                                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                      "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                      "yyyy-MM-dd'T'HH:mm'Z'",
                                      "yyyy-MM-dd'T'HH",
                                      "yyyy-MM-dd",
                                      "yyyy-MM",
                                      "yyyy"
                                    ]
                                  },
                                  "minValue": {
                                    "type": "string"
                                  },
                                  "maxValue": {
                                    "type": "string"
                                  },
                                  "defaultValue": {
                                    "type": "string"
                                  }
                                },
                                "required": ["value"]
                              },
                              "endDate": {
                                "title": "Date Time Extended",
                                "type": "object",
                                "properties": {
                                  "value": {
                                    "type": "string",
                                    "format": "date-time"
                                  },
                                  "format": {
                                    "type": "string",
                                    "enum": [
                                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                      "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                      "yyyy-MM-dd'T'HH:mm'Z'",
                                      "yyyy-MM-dd'T'HH",
                                      "yyyy-MM-dd",
                                      "yyyy-MM",
                                      "yyyy"
                                    ]
                                  },
                                  "minValue": {
                                    "type": "string"
                                  },
                                  "maxValue": {
                                    "type": "string"
                                  },
                                  "defaultValue": {
                                    "type": "string"
                                  }
                                },
                                "required": ["value"]
                              },
                              "sharePercentage": {
                                "type": "number",
                                "description": ""
                              },
                              "coInsuranceParties": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "string"
                                    },
                                    "name": {
                                      "type": "string",
                                      "description": "Name of company sharing co-insurance of the risk"
                                    },
                                    "sharePercentage": {
                                      "type": "string",
                                      "description": "The percentage of the co-insurance risk that this party has taken"
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "notes": {
                            "type": "array",
                            "items": {
                              "title": "Note",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "effectiveDate": {
                                  "title": "Date Time Extended",
                                  "type": "object",
                                  "properties": {
                                    "value": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "format": {
                                      "type": "string",
                                      "enum": [
                                        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                        "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                        "yyyy-MM-dd'T'HH:mm'Z'",
                                        "yyyy-MM-dd'T'HH",
                                        "yyyy-MM-dd",
                                        "yyyy-MM",
                                        "yyyy"
                                      ]
                                    },
                                    "minValue": {
                                      "type": "string"
                                    },
                                    "maxValue": {
                                      "type": "string"
                                    },
                                    "defaultValue": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["value"]
                                },
                                "text": {
                                  "type": "string"
                                },
                                "externalReferences": {
                                  "description": "",
                                  "type": "array",
                                  "items": {
                                    "title": "External Reference",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "namespace": {
                                        "description": "A namespace for the identifier.",
                                        "type": "string"
                                      },
                                      "identifier": {
                                        "description": "An identifier for the entity",
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "forInternalUse": {
                                  "type": "boolean"
                                }
                              }
                            }
                          },
                          "benefits": {
                            "type": "array",
                            "description": "Details of benefits related to the insured risk",
                            "items": {
                              "title": "Benefit",
                              "description": "TODO: (Find this in GW??) This includes sum insured and/or limits like weekly rental",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "category": {
                                  "type": "string",
                                  "description": "eg. SumInsured, ComponentSumInsured,  RiskSumInsured"
                                },
                                "code": {
                                  "type": "string"
                                },
                                "limits": {
                                  "description": "",
                                  "type": "array",
                                  "items": {
                                    "title": "Limit",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "title": "Amount Extended",
                                        "type": "object",
                                        "properties": {
                                          "amount": {
                                            "type": "number"
                                          },
                                          "currencyCode": {
                                            "type": "string"
                                          },
                                          "isGSTInclusive": {
                                            "type": "boolean"
                                          },
                                          "GSTAmount": {
                                            "type": "number"
                                          },
                                          "GSTPercentageApplicable": {
                                            "type": "number"
                                          },
                                          "description": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["amount"]
                                      },
                                      "startDate": {
                                        "title": "Date Time Extended",
                                        "type": "object",
                                        "properties": {
                                          "value": {
                                            "type": "string",
                                            "format": "date-time"
                                          },
                                          "format": {
                                            "type": "string",
                                            "enum": [
                                              "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                              "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                              "yyyy-MM-dd'T'HH:mm'Z'",
                                              "yyyy-MM-dd'T'HH",
                                              "yyyy-MM-dd",
                                              "yyyy-MM",
                                              "yyyy"
                                            ]
                                          },
                                          "minValue": {
                                            "type": "string"
                                          },
                                          "maxValue": {
                                            "type": "string"
                                          },
                                          "defaultValue": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["value"]
                                      },
                                      "endDate": {
                                        "title": "Date Time Extended",
                                        "type": "object",
                                        "properties": {
                                          "value": {
                                            "type": "string",
                                            "format": "date-time"
                                          },
                                          "format": {
                                            "type": "string",
                                            "enum": [
                                              "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                              "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                              "yyyy-MM-dd'T'HH:mm'Z'",
                                              "yyyy-MM-dd'T'HH",
                                              "yyyy-MM-dd",
                                              "yyyy-MM",
                                              "yyyy"
                                            ]
                                          },
                                          "minValue": {
                                            "type": "string"
                                          },
                                          "maxValue": {
                                            "type": "string"
                                          },
                                          "defaultValue": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["value"]
                                      },
                                      "name": {
                                        "type": "string",
                                        "description": "Label or text displayed on GUI"
                                      },
                                      "code": {
                                        "type": "string",
                                        "description": "Value used for mapping at the backend system"
                                      },
                                      "category": {
                                        "description": "Examples includeHome,ContentsSpecified ItemsOptional CoverRental Amount, DailyConfirmationableAmount",
                                        "type": "string"
                                      },
                                      "description": {
                                        "type": "string"
                                      },
                                      "value": {
                                        "type": "string",
                                        "description": "This represents the percentage of requested sum insured"
                                      },
                                      "limitNumber": {
                                        "type": "string"
                                      },
                                      "coverageType": {
                                        "type": "string",
                                        "description": "conformed value"
                                      }
                                    }
                                  }
                                },
                                "description": {
                                  "type": "string"
                                },
                                "value": {
                                  "type": "string"
                                },
                                "premiumClass": {
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "conditions": {
                            "type": "array",
                            "items": {
                              "title": "Peril Category",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string"
                                },
                                "code": {
                                  "type": "string"
                                },
                                "value": {
                                  "type": "string"
                                },
                                "description": {
                                  "type": "string"
                                },
                                "subCategories": {
                                  "description": "",
                                  "type": "array",
                                  "items": {
                                    "$ref": "#/definitions/peril-category"
                                  }
                                }
                              }
                            }
                          },
                          "discounts": {
                            "type": "array",
                            "description": "List of discounts applied to the risk. This could include a burglar alarm discount, an age discount, a multiple policy discount",
                            "items": {
                              "title": "Discount",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "type": "string",
                                  "description": "Code used in System of Record, if available"
                                },
                                "name": {
                                  "type": "string",
                                  "description": "Specific to System of Record"
                                },
                                "value": {
                                  "type": "string"
                                },
                                "discountType": {
                                  "type": "string",
                                  "enum": ["PERCENT", "RATE", "DOLLAR_AMOUNT", "OTHER"]
                                },
                                "amount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "priority": {
                                  "type": "integer",
                                  "description": "Order in which the discount is applied"
                                }
                              },
                              "required": ["discountType"]
                            }
                          },
                          "excesses": {
                            "type": "array",
                            "items": {
                              "title": "Excess",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "type": "string",
                                  "description": "code used in System of Record, if available"
                                },
                                "name": {
                                  "type": "string",
                                  "description": "Specific to System of Record"
                                },
                                "excessCategory": {
                                  "type": "string",
                                  "enum": [
                                    "STANDARD",
                                    "VOLUNTARY",
                                    "IMPOSED",
                                    "NAMED_DRIVER",
                                    "COVERAGE_ITEM",
                                    "THEFT",
                                    "NAMED_DRIVER_IMPOSED",
                                    "UNNAMED_DRIVER_IMPOSED",
                                    "UNNAMED_DRIVER",
                                    "SPECIAL",
                                    "SPECIAL_IMPOSED"
                                  ]
                                },
                                "minimumAmount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "maximumAmount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "references": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "namespace": {
                                        "type": "string",
                                        "enum": ["NAMED_DRIVER_ID"]
                                      },
                                      "identifier": {
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "value": {
                                  "type": "string",
                                  "description": "TODO - may not be required"
                                },
                                "tier": {
                                  "type": "string",
                                  "description": "TODO - may not be required"
                                },
                                "rate": {
                                  "type": "number"
                                }
                              },
                              "required": ["excessCategory"]
                            }
                          },
                          "rates": {
                            "type": "array",
                            "items": {
                              "title": "Rate",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "startDate": {
                                  "title": "Date Time Extended",
                                  "type": "object",
                                  "properties": {
                                    "value": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "format": {
                                      "type": "string",
                                      "enum": [
                                        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                        "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                        "yyyy-MM-dd'T'HH:mm'Z'",
                                        "yyyy-MM-dd'T'HH",
                                        "yyyy-MM-dd",
                                        "yyyy-MM",
                                        "yyyy"
                                      ]
                                    },
                                    "minValue": {
                                      "type": "string"
                                    },
                                    "maxValue": {
                                      "type": "string"
                                    },
                                    "defaultValue": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["value"]
                                },
                                "endDate": {
                                  "title": "Date Time Extended",
                                  "type": "object",
                                  "properties": {
                                    "value": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "format": {
                                      "type": "string",
                                      "enum": [
                                        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                        "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                        "yyyy-MM-dd'T'HH:mm'Z'",
                                        "yyyy-MM-dd'T'HH",
                                        "yyyy-MM-dd",
                                        "yyyy-MM",
                                        "yyyy"
                                      ]
                                    },
                                    "minValue": {
                                      "type": "string"
                                    },
                                    "maxValue": {
                                      "type": "string"
                                    },
                                    "defaultValue": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["value"]
                                },
                                "name": {
                                  "type": "string"
                                },
                                "code": {
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "coverageItems": {
                            "type": "array",
                            "description": "List of items covered under this insured risk",
                            "items": {
                              "title": "Coverage Item",
                              "type": "object",
                              "properties": {
                                "itemNumber": {
                                  "type": "string",
                                  "description": "Identifies the instance of Coverage Item in the System of Record. e.g. Contents risk having multiple jewelry items, each with same coverage item code, itemNumber uniquely identifies a particular jewelry item"
                                },
                                "coverageCode": {
                                  "type": "string",
                                  "description": "Code that is used in the System of Record eg. in *HEART* these are extensions or property peril codes"
                                },
                                "coverageName": {
                                  "type": "string",
                                  "description": "eg. if coverageCode is **JWL** from *HEART* the  coverageName will be **Jewellery**"
                                },
                                "itemDescription": {
                                  "type": "string",
                                  "description": "This is the fre text field in the core System of Records that describes the item eg. 18ct wedding ring"
                                },
                                "isBaseCoverage": {
                                  "type": "boolean"
                                },
                                "category": {
                                  "type": "string",
                                  "description": "Value of 'Optional' indicates to confirmation center if the coverageItem is to be treated as a coverage or an extension"
                                },
                                "benefits": {
                                  "type": "array",
                                  "items": {
                                    "title": "Benefit",
                                    "description": "TODO: (Find this in GW??) This includes sum insured and/or limits like weekly rental",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "title": "Amount Extended",
                                        "type": "object",
                                        "properties": {
                                          "amount": {
                                            "type": "number"
                                          },
                                          "currencyCode": {
                                            "type": "string"
                                          },
                                          "isGSTInclusive": {
                                            "type": "boolean"
                                          },
                                          "GSTAmount": {
                                            "type": "number"
                                          },
                                          "GSTPercentageApplicable": {
                                            "type": "number"
                                          },
                                          "description": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["amount"]
                                      },
                                      "category": {
                                        "type": "string",
                                        "description": "eg. SumInsured, ComponentSumInsured,  RiskSumInsured"
                                      },
                                      "code": {
                                        "type": "string"
                                      },
                                      "limits": {
                                        "description": "",
                                        "type": "array",
                                        "items": {
                                          "title": "Limit",
                                          "description": "",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "title": "Amount Extended",
                                              "type": "object",
                                              "properties": {
                                                "amount": {
                                                  "type": "number"
                                                },
                                                "currencyCode": {
                                                  "type": "string"
                                                },
                                                "isGSTInclusive": {
                                                  "type": "boolean"
                                                },
                                                "GSTAmount": {
                                                  "type": "number"
                                                },
                                                "GSTPercentageApplicable": {
                                                  "type": "number"
                                                },
                                                "description": {
                                                  "type": "string"
                                                }
                                              },
                                              "required": ["amount"]
                                            },
                                            "startDate": {
                                              "title": "Date Time Extended",
                                              "type": "object",
                                              "properties": {
                                                "value": {
                                                  "type": "string",
                                                  "format": "date-time"
                                                },
                                                "format": {
                                                  "type": "string",
                                                  "enum": [
                                                    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                                    "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                                    "yyyy-MM-dd'T'HH:mm'Z'",
                                                    "yyyy-MM-dd'T'HH",
                                                    "yyyy-MM-dd",
                                                    "yyyy-MM",
                                                    "yyyy"
                                                  ]
                                                },
                                                "minValue": {
                                                  "type": "string"
                                                },
                                                "maxValue": {
                                                  "type": "string"
                                                },
                                                "defaultValue": {
                                                  "type": "string"
                                                }
                                              },
                                              "required": ["value"]
                                            },
                                            "endDate": {
                                              "title": "Date Time Extended",
                                              "type": "object",
                                              "properties": {
                                                "value": {
                                                  "type": "string",
                                                  "format": "date-time"
                                                },
                                                "format": {
                                                  "type": "string",
                                                  "enum": [
                                                    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                                    "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                                    "yyyy-MM-dd'T'HH:mm'Z'",
                                                    "yyyy-MM-dd'T'HH",
                                                    "yyyy-MM-dd",
                                                    "yyyy-MM",
                                                    "yyyy"
                                                  ]
                                                },
                                                "minValue": {
                                                  "type": "string"
                                                },
                                                "maxValue": {
                                                  "type": "string"
                                                },
                                                "defaultValue": {
                                                  "type": "string"
                                                }
                                              },
                                              "required": ["value"]
                                            },
                                            "name": {
                                              "type": "string",
                                              "description": "Label or text displayed on GUI"
                                            },
                                            "code": {
                                              "type": "string",
                                              "description": "Value used for mapping at the backend system"
                                            },
                                            "category": {
                                              "description": "Examples includeHome,ContentsSpecified ItemsOptional CoverRental Amount, DailyConfirmationableAmount",
                                              "type": "string"
                                            },
                                            "description": {
                                              "type": "string"
                                            },
                                            "value": {
                                              "type": "string",
                                              "description": "This represents the percentage of requested sum insured"
                                            },
                                            "limitNumber": {
                                              "type": "string"
                                            },
                                            "coverageType": {
                                              "type": "string",
                                              "description": "conformed value"
                                            }
                                          }
                                        }
                                      },
                                      "description": {
                                        "type": "string"
                                      },
                                      "value": {
                                        "type": "string"
                                      },
                                      "premiumClass": {
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "excesses": {
                                  "type": "array",
                                  "items": {
                                    "title": "Excess",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "code": {
                                        "type": "string",
                                        "description": "code used in System of Record, if available"
                                      },
                                      "name": {
                                        "type": "string",
                                        "description": "Specific to System of Record"
                                      },
                                      "excessCategory": {
                                        "type": "string",
                                        "enum": [
                                          "STANDARD",
                                          "VOLUNTARY",
                                          "IMPOSED",
                                          "NAMED_DRIVER",
                                          "COVERAGE_ITEM",
                                          "THEFT",
                                          "NAMED_DRIVER_IMPOSED",
                                          "UNNAMED_DRIVER_IMPOSED",
                                          "UNNAMED_DRIVER",
                                          "SPECIAL",
                                          "SPECIAL_IMPOSED"
                                        ]
                                      },
                                      "minimumAmount": {
                                        "title": "Amount Extended",
                                        "type": "object",
                                        "properties": {
                                          "amount": {
                                            "type": "number"
                                          },
                                          "currencyCode": {
                                            "type": "string"
                                          },
                                          "isGSTInclusive": {
                                            "type": "boolean"
                                          },
                                          "GSTAmount": {
                                            "type": "number"
                                          },
                                          "GSTPercentageApplicable": {
                                            "type": "number"
                                          },
                                          "description": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["amount"]
                                      },
                                      "maximumAmount": {
                                        "title": "Amount Extended",
                                        "type": "object",
                                        "properties": {
                                          "amount": {
                                            "type": "number"
                                          },
                                          "currencyCode": {
                                            "type": "string"
                                          },
                                          "isGSTInclusive": {
                                            "type": "boolean"
                                          },
                                          "GSTAmount": {
                                            "type": "number"
                                          },
                                          "GSTPercentageApplicable": {
                                            "type": "number"
                                          },
                                          "description": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["amount"]
                                      },
                                      "references": {
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "properties": {
                                            "namespace": {
                                              "type": "string",
                                              "enum": ["NAMED_DRIVER_ID"]
                                            },
                                            "identifier": {
                                              "type": "string"
                                            }
                                          }
                                        }
                                      },
                                      "value": {
                                        "type": "string",
                                        "description": "TODO - may not be required"
                                      },
                                      "tier": {
                                        "type": "string",
                                        "description": "TODO - may not be required"
                                      },
                                      "rate": {
                                        "type": "number"
                                      }
                                    },
                                    "required": ["excessCategory"]
                                  }
                                },
                                "discounts": {
                                  "type": "array",
                                  "items": {
                                    "title": "Discount",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "code": {
                                        "type": "string",
                                        "description": "Code used in System of Record, if available"
                                      },
                                      "name": {
                                        "type": "string",
                                        "description": "Specific to System of Record"
                                      },
                                      "value": {
                                        "type": "string"
                                      },
                                      "discountType": {
                                        "type": "string",
                                        "enum": ["PERCENT", "RATE", "DOLLAR_AMOUNT", "OTHER"]
                                      },
                                      "amount": {
                                        "title": "Amount Extended",
                                        "type": "object",
                                        "properties": {
                                          "amount": {
                                            "type": "number"
                                          },
                                          "currencyCode": {
                                            "type": "string"
                                          },
                                          "isGSTInclusive": {
                                            "type": "boolean"
                                          },
                                          "GSTAmount": {
                                            "type": "number"
                                          },
                                          "GSTPercentageApplicable": {
                                            "type": "number"
                                          },
                                          "description": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["amount"]
                                      },
                                      "priority": {
                                        "type": "integer",
                                        "description": "Order in which the discount is applied"
                                      }
                                    },
                                    "required": ["discountType"]
                                  }
                                },
                                "physicalConditions": {
                                  "type": "array",
                                  "items": {
                                    "title": "Physical Condition",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "description": {
                                        "type": "string"
                                      },
                                      "value": {
                                        "type": "string"
                                      },
                                      "establishedDate": {
                                        "title": "Date Time Extended",
                                        "type": "object",
                                        "properties": {
                                          "value": {
                                            "type": "string",
                                            "format": "date-time"
                                          },
                                          "format": {
                                            "type": "string",
                                            "enum": [
                                              "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                              "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                              "yyyy-MM-dd'T'HH:mm'Z'",
                                              "yyyy-MM-dd'T'HH",
                                              "yyyy-MM-dd",
                                              "yyyy-MM",
                                              "yyyy"
                                            ]
                                          },
                                          "minValue": {
                                            "type": "string"
                                          },
                                          "maxValue": {
                                            "type": "string"
                                          },
                                          "defaultValue": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["value"]
                                      },
                                      "physicalConditionType": {
                                        "type": "string",
                                        "enum": [
                                          "LAST_VALUATION",
                                          "STATED_VALUE",
                                          "PLANT_LAST_VALUATION",
                                          "LAST_INSPECTION",
                                          "LAST_SURVEYED",
                                          "RATING_CONDITION",
                                          "UNREPAIRED_DAMAGE"
                                        ]
                                      },
                                      "type": {
                                        "type": "string",
                                        "description": "e.g. Financial Valuation Type"
                                      },
                                      "amount": {
                                        "title": "Amount Extended",
                                        "type": "object",
                                        "properties": {
                                          "amount": {
                                            "type": "number"
                                          },
                                          "currencyCode": {
                                            "type": "string"
                                          },
                                          "isGSTInclusive": {
                                            "type": "boolean"
                                          },
                                          "GSTAmount": {
                                            "type": "number"
                                          },
                                          "GSTPercentageApplicable": {
                                            "type": "number"
                                          },
                                          "description": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["amount"]
                                      },
                                      "code": {
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "rates": {
                                  "type": "array",
                                  "items": {
                                    "title": "Rate",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "title": "Amount Extended",
                                        "type": "object",
                                        "properties": {
                                          "amount": {
                                            "type": "number"
                                          },
                                          "currencyCode": {
                                            "type": "string"
                                          },
                                          "isGSTInclusive": {
                                            "type": "boolean"
                                          },
                                          "GSTAmount": {
                                            "type": "number"
                                          },
                                          "GSTPercentageApplicable": {
                                            "type": "number"
                                          },
                                          "description": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["amount"]
                                      },
                                      "startDate": {
                                        "title": "Date Time Extended",
                                        "type": "object",
                                        "properties": {
                                          "value": {
                                            "type": "string",
                                            "format": "date-time"
                                          },
                                          "format": {
                                            "type": "string",
                                            "enum": [
                                              "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                              "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                              "yyyy-MM-dd'T'HH:mm'Z'",
                                              "yyyy-MM-dd'T'HH",
                                              "yyyy-MM-dd",
                                              "yyyy-MM",
                                              "yyyy"
                                            ]
                                          },
                                          "minValue": {
                                            "type": "string"
                                          },
                                          "maxValue": {
                                            "type": "string"
                                          },
                                          "defaultValue": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["value"]
                                      },
                                      "endDate": {
                                        "title": "Date Time Extended",
                                        "type": "object",
                                        "properties": {
                                          "value": {
                                            "type": "string",
                                            "format": "date-time"
                                          },
                                          "format": {
                                            "type": "string",
                                            "enum": [
                                              "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                              "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                              "yyyy-MM-dd'T'HH:mm'Z'",
                                              "yyyy-MM-dd'T'HH",
                                              "yyyy-MM-dd",
                                              "yyyy-MM",
                                              "yyyy"
                                            ]
                                          },
                                          "minValue": {
                                            "type": "string"
                                          },
                                          "maxValue": {
                                            "type": "string"
                                          },
                                          "defaultValue": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["value"]
                                      },
                                      "name": {
                                        "type": "string"
                                      },
                                      "code": {
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "premiumDetails": {
                                  "type": "array",
                                  "items": {
                                    "title": "Premium Detail",
                                    "type": "object",
                                    "properties": {
                                      "category": {
                                        "type": "string"
                                      },
                                      "code": {
                                        "type": "string"
                                      },
                                      "writtenPremium": {
                                        "title": "Premium",
                                        "description": "",
                                        "type": "object",
                                        "properties": {
                                          "companyPremium": {
                                            "type": "number",
                                            "description": "Company Premium"
                                          },
                                          "naturalDisasterPremium": {
                                            "type": "number"
                                          },
                                          "earthquakeLevy": {
                                            "type": "number",
                                            "description": "EQC Levy"
                                          },
                                          "fireServiceLevy": {
                                            "type": "number",
                                            "description": "Fire Service Levy"
                                          },
                                          "gst": {
                                            "type": "number",
                                            "description": "GST Amount"
                                          },
                                          "instalmentCharge": {
                                            "type": "number"
                                          },
                                          "adminCharge": {
                                            "type": "number",
                                            "description": "Admin Charge"
                                          },
                                          "commissionRate": {
                                            "type": "number",
                                            "description": "Commission Rate"
                                          },
                                          "minimumPremiumUsed": {
                                            "type": "boolean"
                                          },
                                          "naturalDisasterCommission": {
                                            "type": "number"
                                          },
                                          "terrorTotalTransactionCost": {
                                            "type": "number"
                                          },
                                          "commissionAmount": {
                                            "type": "number"
                                          },
                                          "commissionGST": {
                                            "type": "number"
                                          },
                                          "totalPremium": {
                                            "type": "number"
                                          },
                                          "businessPremium": {
                                            "type": "number"
                                          },
                                          "cappingAndCupping": {
                                            "type": "object",
                                            "properties": {
                                              "premiumAmount": {
                                                "title": "Amount Extended",
                                                "type": "object",
                                                "properties": {
                                                  "amount": {
                                                    "type": "number"
                                                  },
                                                  "currencyCode": {
                                                    "type": "string"
                                                  },
                                                  "isGSTInclusive": {
                                                    "type": "boolean"
                                                  },
                                                  "GSTAmount": {
                                                    "type": "number"
                                                  },
                                                  "GSTPercentageApplicable": {
                                                    "type": "number"
                                                  },
                                                  "description": {
                                                    "type": "string"
                                                  }
                                                },
                                                "required": ["amount"]
                                              },
                                              "adjustmentFactor": {
                                                "type": "number"
                                              },
                                              "premiumAdjustmentDueToOverride": {
                                                "title": "Amount Extended",
                                                "type": "object",
                                                "properties": {
                                                  "amount": {
                                                    "type": "number"
                                                  },
                                                  "currencyCode": {
                                                    "type": "string"
                                                  },
                                                  "isGSTInclusive": {
                                                    "type": "boolean"
                                                  },
                                                  "GSTAmount": {
                                                    "type": "number"
                                                  },
                                                  "GSTPercentageApplicable": {
                                                    "type": "number"
                                                  },
                                                  "description": {
                                                    "type": "string"
                                                  }
                                                },
                                                "required": ["amount"]
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "annualisedPremium": {
                                        "title": "Premium",
                                        "description": "",
                                        "type": "object",
                                        "properties": {
                                          "companyPremium": {
                                            "type": "number",
                                            "description": "Company Premium"
                                          },
                                          "naturalDisasterPremium": {
                                            "type": "number"
                                          },
                                          "earthquakeLevy": {
                                            "type": "number",
                                            "description": "EQC Levy"
                                          },
                                          "fireServiceLevy": {
                                            "type": "number",
                                            "description": "Fire Service Levy"
                                          },
                                          "gst": {
                                            "type": "number",
                                            "description": "GST Amount"
                                          },
                                          "instalmentCharge": {
                                            "type": "number"
                                          },
                                          "adminCharge": {
                                            "type": "number",
                                            "description": "Admin Charge"
                                          },
                                          "commissionRate": {
                                            "type": "number",
                                            "description": "Commission Rate"
                                          },
                                          "minimumPremiumUsed": {
                                            "type": "boolean"
                                          },
                                          "naturalDisasterCommission": {
                                            "type": "number"
                                          },
                                          "terrorTotalTransactionCost": {
                                            "type": "number"
                                          },
                                          "commissionAmount": {
                                            "type": "number"
                                          },
                                          "commissionGST": {
                                            "type": "number"
                                          },
                                          "totalPremium": {
                                            "type": "number"
                                          },
                                          "businessPremium": {
                                            "type": "number"
                                          },
                                          "cappingAndCupping": {
                                            "type": "object",
                                            "properties": {
                                              "premiumAmount": {
                                                "title": "Amount Extended",
                                                "type": "object",
                                                "properties": {
                                                  "amount": {
                                                    "type": "number"
                                                  },
                                                  "currencyCode": {
                                                    "type": "string"
                                                  },
                                                  "isGSTInclusive": {
                                                    "type": "boolean"
                                                  },
                                                  "GSTAmount": {
                                                    "type": "number"
                                                  },
                                                  "GSTPercentageApplicable": {
                                                    "type": "number"
                                                  },
                                                  "description": {
                                                    "type": "string"
                                                  }
                                                },
                                                "required": ["amount"]
                                              },
                                              "adjustmentFactor": {
                                                "type": "number"
                                              },
                                              "premiumAdjustmentDueToOverride": {
                                                "title": "Amount Extended",
                                                "type": "object",
                                                "properties": {
                                                  "amount": {
                                                    "type": "number"
                                                  },
                                                  "currencyCode": {
                                                    "type": "string"
                                                  },
                                                  "isGSTInclusive": {
                                                    "type": "boolean"
                                                  },
                                                  "GSTAmount": {
                                                    "type": "number"
                                                  },
                                                  "GSTPercentageApplicable": {
                                                    "type": "number"
                                                  },
                                                  "description": {
                                                    "type": "string"
                                                  }
                                                },
                                                "required": ["amount"]
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "transactionPremium": {
                                        "title": "Premium",
                                        "description": "",
                                        "type": "object",
                                        "properties": {
                                          "companyPremium": {
                                            "type": "number",
                                            "description": "Company Premium"
                                          },
                                          "naturalDisasterPremium": {
                                            "type": "number"
                                          },
                                          "earthquakeLevy": {
                                            "type": "number",
                                            "description": "EQC Levy"
                                          },
                                          "fireServiceLevy": {
                                            "type": "number",
                                            "description": "Fire Service Levy"
                                          },
                                          "gst": {
                                            "type": "number",
                                            "description": "GST Amount"
                                          },
                                          "instalmentCharge": {
                                            "type": "number"
                                          },
                                          "adminCharge": {
                                            "type": "number",
                                            "description": "Admin Charge"
                                          },
                                          "commissionRate": {
                                            "type": "number",
                                            "description": "Commission Rate"
                                          },
                                          "minimumPremiumUsed": {
                                            "type": "boolean"
                                          },
                                          "naturalDisasterCommission": {
                                            "type": "number"
                                          },
                                          "terrorTotalTransactionCost": {
                                            "type": "number"
                                          },
                                          "commissionAmount": {
                                            "type": "number"
                                          },
                                          "commissionGST": {
                                            "type": "number"
                                          },
                                          "totalPremium": {
                                            "type": "number"
                                          },
                                          "businessPremium": {
                                            "type": "number"
                                          },
                                          "cappingAndCupping": {
                                            "type": "object",
                                            "properties": {
                                              "premiumAmount": {
                                                "title": "Amount Extended",
                                                "type": "object",
                                                "properties": {
                                                  "amount": {
                                                    "type": "number"
                                                  },
                                                  "currencyCode": {
                                                    "type": "string"
                                                  },
                                                  "isGSTInclusive": {
                                                    "type": "boolean"
                                                  },
                                                  "GSTAmount": {
                                                    "type": "number"
                                                  },
                                                  "GSTPercentageApplicable": {
                                                    "type": "number"
                                                  },
                                                  "description": {
                                                    "type": "string"
                                                  }
                                                },
                                                "required": ["amount"]
                                              },
                                              "adjustmentFactor": {
                                                "type": "number"
                                              },
                                              "premiumAdjustmentDueToOverride": {
                                                "title": "Amount Extended",
                                                "type": "object",
                                                "properties": {
                                                  "amount": {
                                                    "type": "number"
                                                  },
                                                  "currencyCode": {
                                                    "type": "string"
                                                  },
                                                  "isGSTInclusive": {
                                                    "type": "boolean"
                                                  },
                                                  "GSTAmount": {
                                                    "type": "number"
                                                  },
                                                  "GSTPercentageApplicable": {
                                                    "type": "number"
                                                  },
                                                  "description": {
                                                    "type": "string"
                                                  }
                                                },
                                                "required": ["amount"]
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "instalmentPremium": {
                                        "title": "Premium",
                                        "description": "",
                                        "type": "object",
                                        "properties": {
                                          "companyPremium": {
                                            "type": "number",
                                            "description": "Company Premium"
                                          },
                                          "naturalDisasterPremium": {
                                            "type": "number"
                                          },
                                          "earthquakeLevy": {
                                            "type": "number",
                                            "description": "EQC Levy"
                                          },
                                          "fireServiceLevy": {
                                            "type": "number",
                                            "description": "Fire Service Levy"
                                          },
                                          "gst": {
                                            "type": "number",
                                            "description": "GST Amount"
                                          },
                                          "instalmentCharge": {
                                            "type": "number"
                                          },
                                          "adminCharge": {
                                            "type": "number",
                                            "description": "Admin Charge"
                                          },
                                          "commissionRate": {
                                            "type": "number",
                                            "description": "Commission Rate"
                                          },
                                          "minimumPremiumUsed": {
                                            "type": "boolean"
                                          },
                                          "naturalDisasterCommission": {
                                            "type": "number"
                                          },
                                          "terrorTotalTransactionCost": {
                                            "type": "number"
                                          },
                                          "commissionAmount": {
                                            "type": "number"
                                          },
                                          "commissionGST": {
                                            "type": "number"
                                          },
                                          "totalPremium": {
                                            "type": "number"
                                          },
                                          "businessPremium": {
                                            "type": "number"
                                          },
                                          "cappingAndCupping": {
                                            "type": "object",
                                            "properties": {
                                              "premiumAmount": {
                                                "title": "Amount Extended",
                                                "type": "object",
                                                "properties": {
                                                  "amount": {
                                                    "type": "number"
                                                  },
                                                  "currencyCode": {
                                                    "type": "string"
                                                  },
                                                  "isGSTInclusive": {
                                                    "type": "boolean"
                                                  },
                                                  "GSTAmount": {
                                                    "type": "number"
                                                  },
                                                  "GSTPercentageApplicable": {
                                                    "type": "number"
                                                  },
                                                  "description": {
                                                    "type": "string"
                                                  }
                                                },
                                                "required": ["amount"]
                                              },
                                              "adjustmentFactor": {
                                                "type": "number"
                                              },
                                              "premiumAdjustmentDueToOverride": {
                                                "title": "Amount Extended",
                                                "type": "object",
                                                "properties": {
                                                  "amount": {
                                                    "type": "number"
                                                  },
                                                  "currencyCode": {
                                                    "type": "string"
                                                  },
                                                  "isGSTInclusive": {
                                                    "type": "boolean"
                                                  },
                                                  "GSTAmount": {
                                                    "type": "number"
                                                  },
                                                  "GSTPercentageApplicable": {
                                                    "type": "number"
                                                  },
                                                  "description": {
                                                    "type": "string"
                                                  }
                                                },
                                                "required": ["amount"]
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "initialPaymentPremium": {
                                        "title": "Premium",
                                        "description": "",
                                        "type": "object",
                                        "properties": {
                                          "companyPremium": {
                                            "type": "number",
                                            "description": "Company Premium"
                                          },
                                          "naturalDisasterPremium": {
                                            "type": "number"
                                          },
                                          "earthquakeLevy": {
                                            "type": "number",
                                            "description": "EQC Levy"
                                          },
                                          "fireServiceLevy": {
                                            "type": "number",
                                            "description": "Fire Service Levy"
                                          },
                                          "gst": {
                                            "type": "number",
                                            "description": "GST Amount"
                                          },
                                          "instalmentCharge": {
                                            "type": "number"
                                          },
                                          "adminCharge": {
                                            "type": "number",
                                            "description": "Admin Charge"
                                          },
                                          "commissionRate": {
                                            "type": "number",
                                            "description": "Commission Rate"
                                          },
                                          "minimumPremiumUsed": {
                                            "type": "boolean"
                                          },
                                          "naturalDisasterCommission": {
                                            "type": "number"
                                          },
                                          "terrorTotalTransactionCost": {
                                            "type": "number"
                                          },
                                          "commissionAmount": {
                                            "type": "number"
                                          },
                                          "commissionGST": {
                                            "type": "number"
                                          },
                                          "totalPremium": {
                                            "type": "number"
                                          },
                                          "businessPremium": {
                                            "type": "number"
                                          },
                                          "cappingAndCupping": {
                                            "type": "object",
                                            "properties": {
                                              "premiumAmount": {
                                                "title": "Amount Extended",
                                                "type": "object",
                                                "properties": {
                                                  "amount": {
                                                    "type": "number"
                                                  },
                                                  "currencyCode": {
                                                    "type": "string"
                                                  },
                                                  "isGSTInclusive": {
                                                    "type": "boolean"
                                                  },
                                                  "GSTAmount": {
                                                    "type": "number"
                                                  },
                                                  "GSTPercentageApplicable": {
                                                    "type": "number"
                                                  },
                                                  "description": {
                                                    "type": "string"
                                                  }
                                                },
                                                "required": ["amount"]
                                              },
                                              "adjustmentFactor": {
                                                "type": "number"
                                              },
                                              "premiumAdjustmentDueToOverride": {
                                                "title": "Amount Extended",
                                                "type": "object",
                                                "properties": {
                                                  "amount": {
                                                    "type": "number"
                                                  },
                                                  "currencyCode": {
                                                    "type": "string"
                                                  },
                                                  "isGSTInclusive": {
                                                    "type": "boolean"
                                                  },
                                                  "GSTAmount": {
                                                    "type": "number"
                                                  },
                                                  "GSTPercentageApplicable": {
                                                    "type": "number"
                                                  },
                                                  "description": {
                                                    "type": "string"
                                                  }
                                                },
                                                "required": ["amount"]
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "premiumClass": {
                                        "type": "string"
                                      },
                                      "premiumFrequency": {
                                        "title": "Premium Frequency",
                                        "type": "string",
                                        "description": "",
                                        "enum": [
                                          "ANNUALLY",
                                          "QUARTERLY",
                                          "MONTHLY",
                                          "FORTNIGHTLY",
                                          "ONE_OFF",
                                          "HALF_YEARLY"
                                        ]
                                      }
                                    }
                                  }
                                },
                                "adjustments": {
                                  "type": "array",
                                  "items": {
                                    "title": "Adjustment",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "title": "Amount Extended",
                                        "type": "object",
                                        "properties": {
                                          "amount": {
                                            "type": "number"
                                          },
                                          "currencyCode": {
                                            "type": "string"
                                          },
                                          "isGSTInclusive": {
                                            "type": "boolean"
                                          },
                                          "GSTAmount": {
                                            "type": "number"
                                          },
                                          "GSTPercentageApplicable": {
                                            "type": "number"
                                          },
                                          "description": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["amount"]
                                      },
                                      "code": {
                                        "type": "string",
                                        "description": "code used in System of Record, if available"
                                      },
                                      "factor": {
                                        "type": "string"
                                      },
                                      "reason": {
                                        "type": "string"
                                      },
                                      "adjustmentType": {
                                        "type": "string",
                                        "enum": ["PERCENT", "RATE", "DOLLAR_AMOUNT"]
                                      },
                                      "name": {
                                        "type": "string",
                                        "description": "Specific to System of Record"
                                      },
                                      "priority": {
                                        "type": "integer",
                                        "description": "Order in which the discount is applied"
                                      }
                                    },
                                    "required": ["adjustmentType"]
                                  }
                                },
                                "conditions": {
                                  "type": "array",
                                  "items": {
                                    "title": "Peril Category",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "name": {
                                        "type": "string"
                                      },
                                      "code": {
                                        "type": "string"
                                      },
                                      "value": {
                                        "type": "string"
                                      },
                                      "description": {
                                        "type": "string"
                                      },
                                      "subCategories": {
                                        "description": "",
                                        "type": "array",
                                        "items": {
                                          "$ref": "#/definitions/peril-category"
                                        }
                                      }
                                    }
                                  }
                                },
                                "subCategory": {
                                  "type": "string"
                                },
                                "hasCoverage": {
                                  "type": "boolean"
                                },
                                "settlementBasis": {
                                  "type": "string",
                                  "enum": ["AGREED_VALUE", "FIXED_VALUE", "MARKET_VALUE", "SUM_INSURED"],
                                  "description": "Basis on which the confirmation would be settled for this coverageItem. Only required if it differes from the insuredRisks.settlementBasis"
                                },
                                "externalReferences": {
                                  "type": "array",
                                  "items": {
                                    "title": "External Reference",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "namespace": {
                                        "description": "A namespace for the identifier.",
                                        "type": "string"
                                      },
                                      "identifier": {
                                        "description": "An identifier for the entity",
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "coverageType": {
                                  "type": "string",
                                  "description": "This is the conformed representation of the coverage code example: \"INSURED_VEHICLE\", \"WINDSCREEN\", \"AGREED_VALUE\", \"INGESTION_OR_ENTANGLEMENT\", \"LOSS_OF_USE\", \"PORTABLE_ELECTRONIC_EQUIPMENT\", \"TAXI\""
                                },
                                "coverageNote": {
                                  "type": "string",
                                  "description": "Free format string populated by the System of Record contains detials that will add a note to the coverage e.g 25% of the sumInsured, limit shown in the policy schedule - First 7 days not covered"
                                },
                                "additionalCoverageDetails": {
                                  "type": "array",
                                  "items": {
                                    "title": "Additional Information",
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string"
                                      },
                                      "details": {
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "properties": {
                                            "name": {
                                              "type": "string"
                                            },
                                            "number": {
                                              "type": "number"
                                            },
                                            "value": {
                                              "type": "string"
                                            },
                                            "amount": {
                                              "title": "Amount Extended",
                                              "type": "object",
                                              "properties": {
                                                "amount": {
                                                  "type": "number"
                                                },
                                                "currencyCode": {
                                                  "type": "string"
                                                },
                                                "isGSTInclusive": {
                                                  "type": "boolean"
                                                },
                                                "GSTAmount": {
                                                  "type": "number"
                                                },
                                                "GSTPercentageApplicable": {
                                                  "type": "number"
                                                },
                                                "description": {
                                                  "type": "string"
                                                }
                                              },
                                              "required": ["amount"]
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "deferments": {
                                  "type": "array",
                                  "items": {
                                    "title": "Deferment",
                                    "type": "object",
                                    "properties": {
                                      "code": {
                                        "type": "string",
                                        "description": "Code used in System of record"
                                      },
                                      "name": {
                                        "type": "string"
                                      },
                                      "category": {
                                        "type": "string"
                                      },
                                      "description": {
                                        "type": "string",
                                        "enum": ["STANDARD", "VOLUNTARY", "IMPOSED"]
                                      },
                                      "length": {
                                        "type": "number"
                                      },
                                      "period": {
                                        "type": "string",
                                        "enum": ["HOURS", "DAYS", "WEEKS", "MONTHS"]
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "reInsurance": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string",
                                "description": "TODO: Can we delete?"
                              },
                              "category": {
                                "type": "string",
                                "description": "TODO: Can we delete?"
                              },
                              "classification": {
                                "type": "string"
                              },
                              "code": {
                                "type": "string"
                              }
                            }
                          },
                          "premiumDetails": {
                            "type": "array",
                            "description": "Includes premium details for this insured risk",
                            "items": {
                              "title": "Premium Detail",
                              "type": "object",
                              "properties": {
                                "category": {
                                  "type": "string"
                                },
                                "code": {
                                  "type": "string"
                                },
                                "writtenPremium": {
                                  "title": "Premium",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "companyPremium": {
                                      "type": "number",
                                      "description": "Company Premium"
                                    },
                                    "naturalDisasterPremium": {
                                      "type": "number"
                                    },
                                    "earthquakeLevy": {
                                      "type": "number",
                                      "description": "EQC Levy"
                                    },
                                    "fireServiceLevy": {
                                      "type": "number",
                                      "description": "Fire Service Levy"
                                    },
                                    "gst": {
                                      "type": "number",
                                      "description": "GST Amount"
                                    },
                                    "instalmentCharge": {
                                      "type": "number"
                                    },
                                    "adminCharge": {
                                      "type": "number",
                                      "description": "Admin Charge"
                                    },
                                    "commissionRate": {
                                      "type": "number",
                                      "description": "Commission Rate"
                                    },
                                    "minimumPremiumUsed": {
                                      "type": "boolean"
                                    },
                                    "naturalDisasterCommission": {
                                      "type": "number"
                                    },
                                    "terrorTotalTransactionCost": {
                                      "type": "number"
                                    },
                                    "commissionAmount": {
                                      "type": "number"
                                    },
                                    "commissionGST": {
                                      "type": "number"
                                    },
                                    "totalPremium": {
                                      "type": "number"
                                    },
                                    "businessPremium": {
                                      "type": "number"
                                    },
                                    "cappingAndCupping": {
                                      "type": "object",
                                      "properties": {
                                        "premiumAmount": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        },
                                        "adjustmentFactor": {
                                          "type": "number"
                                        },
                                        "premiumAdjustmentDueToOverride": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        }
                                      }
                                    }
                                  }
                                },
                                "annualisedPremium": {
                                  "title": "Premium",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "companyPremium": {
                                      "type": "number",
                                      "description": "Company Premium"
                                    },
                                    "naturalDisasterPremium": {
                                      "type": "number"
                                    },
                                    "earthquakeLevy": {
                                      "type": "number",
                                      "description": "EQC Levy"
                                    },
                                    "fireServiceLevy": {
                                      "type": "number",
                                      "description": "Fire Service Levy"
                                    },
                                    "gst": {
                                      "type": "number",
                                      "description": "GST Amount"
                                    },
                                    "instalmentCharge": {
                                      "type": "number"
                                    },
                                    "adminCharge": {
                                      "type": "number",
                                      "description": "Admin Charge"
                                    },
                                    "commissionRate": {
                                      "type": "number",
                                      "description": "Commission Rate"
                                    },
                                    "minimumPremiumUsed": {
                                      "type": "boolean"
                                    },
                                    "naturalDisasterCommission": {
                                      "type": "number"
                                    },
                                    "terrorTotalTransactionCost": {
                                      "type": "number"
                                    },
                                    "commissionAmount": {
                                      "type": "number"
                                    },
                                    "commissionGST": {
                                      "type": "number"
                                    },
                                    "totalPremium": {
                                      "type": "number"
                                    },
                                    "businessPremium": {
                                      "type": "number"
                                    },
                                    "cappingAndCupping": {
                                      "type": "object",
                                      "properties": {
                                        "premiumAmount": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        },
                                        "adjustmentFactor": {
                                          "type": "number"
                                        },
                                        "premiumAdjustmentDueToOverride": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        }
                                      }
                                    }
                                  }
                                },
                                "transactionPremium": {
                                  "title": "Premium",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "companyPremium": {
                                      "type": "number",
                                      "description": "Company Premium"
                                    },
                                    "naturalDisasterPremium": {
                                      "type": "number"
                                    },
                                    "earthquakeLevy": {
                                      "type": "number",
                                      "description": "EQC Levy"
                                    },
                                    "fireServiceLevy": {
                                      "type": "number",
                                      "description": "Fire Service Levy"
                                    },
                                    "gst": {
                                      "type": "number",
                                      "description": "GST Amount"
                                    },
                                    "instalmentCharge": {
                                      "type": "number"
                                    },
                                    "adminCharge": {
                                      "type": "number",
                                      "description": "Admin Charge"
                                    },
                                    "commissionRate": {
                                      "type": "number",
                                      "description": "Commission Rate"
                                    },
                                    "minimumPremiumUsed": {
                                      "type": "boolean"
                                    },
                                    "naturalDisasterCommission": {
                                      "type": "number"
                                    },
                                    "terrorTotalTransactionCost": {
                                      "type": "number"
                                    },
                                    "commissionAmount": {
                                      "type": "number"
                                    },
                                    "commissionGST": {
                                      "type": "number"
                                    },
                                    "totalPremium": {
                                      "type": "number"
                                    },
                                    "businessPremium": {
                                      "type": "number"
                                    },
                                    "cappingAndCupping": {
                                      "type": "object",
                                      "properties": {
                                        "premiumAmount": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        },
                                        "adjustmentFactor": {
                                          "type": "number"
                                        },
                                        "premiumAdjustmentDueToOverride": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        }
                                      }
                                    }
                                  }
                                },
                                "instalmentPremium": {
                                  "title": "Premium",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "companyPremium": {
                                      "type": "number",
                                      "description": "Company Premium"
                                    },
                                    "naturalDisasterPremium": {
                                      "type": "number"
                                    },
                                    "earthquakeLevy": {
                                      "type": "number",
                                      "description": "EQC Levy"
                                    },
                                    "fireServiceLevy": {
                                      "type": "number",
                                      "description": "Fire Service Levy"
                                    },
                                    "gst": {
                                      "type": "number",
                                      "description": "GST Amount"
                                    },
                                    "instalmentCharge": {
                                      "type": "number"
                                    },
                                    "adminCharge": {
                                      "type": "number",
                                      "description": "Admin Charge"
                                    },
                                    "commissionRate": {
                                      "type": "number",
                                      "description": "Commission Rate"
                                    },
                                    "minimumPremiumUsed": {
                                      "type": "boolean"
                                    },
                                    "naturalDisasterCommission": {
                                      "type": "number"
                                    },
                                    "terrorTotalTransactionCost": {
                                      "type": "number"
                                    },
                                    "commissionAmount": {
                                      "type": "number"
                                    },
                                    "commissionGST": {
                                      "type": "number"
                                    },
                                    "totalPremium": {
                                      "type": "number"
                                    },
                                    "businessPremium": {
                                      "type": "number"
                                    },
                                    "cappingAndCupping": {
                                      "type": "object",
                                      "properties": {
                                        "premiumAmount": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        },
                                        "adjustmentFactor": {
                                          "type": "number"
                                        },
                                        "premiumAdjustmentDueToOverride": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        }
                                      }
                                    }
                                  }
                                },
                                "initialPaymentPremium": {
                                  "title": "Premium",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "companyPremium": {
                                      "type": "number",
                                      "description": "Company Premium"
                                    },
                                    "naturalDisasterPremium": {
                                      "type": "number"
                                    },
                                    "earthquakeLevy": {
                                      "type": "number",
                                      "description": "EQC Levy"
                                    },
                                    "fireServiceLevy": {
                                      "type": "number",
                                      "description": "Fire Service Levy"
                                    },
                                    "gst": {
                                      "type": "number",
                                      "description": "GST Amount"
                                    },
                                    "instalmentCharge": {
                                      "type": "number"
                                    },
                                    "adminCharge": {
                                      "type": "number",
                                      "description": "Admin Charge"
                                    },
                                    "commissionRate": {
                                      "type": "number",
                                      "description": "Commission Rate"
                                    },
                                    "minimumPremiumUsed": {
                                      "type": "boolean"
                                    },
                                    "naturalDisasterCommission": {
                                      "type": "number"
                                    },
                                    "terrorTotalTransactionCost": {
                                      "type": "number"
                                    },
                                    "commissionAmount": {
                                      "type": "number"
                                    },
                                    "commissionGST": {
                                      "type": "number"
                                    },
                                    "totalPremium": {
                                      "type": "number"
                                    },
                                    "businessPremium": {
                                      "type": "number"
                                    },
                                    "cappingAndCupping": {
                                      "type": "object",
                                      "properties": {
                                        "premiumAmount": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        },
                                        "adjustmentFactor": {
                                          "type": "number"
                                        },
                                        "premiumAdjustmentDueToOverride": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        }
                                      }
                                    }
                                  }
                                },
                                "premiumClass": {
                                  "type": "string"
                                },
                                "premiumFrequency": {
                                  "title": "Premium Frequency",
                                  "type": "string",
                                  "description": "",
                                  "enum": ["ANNUALLY", "QUARTERLY", "MONTHLY", "FORTNIGHTLY", "ONE_OFF", "HALF_YEARLY"]
                                }
                              }
                            }
                          },
                          "adjustments": {
                            "type": "array",
                            "items": {
                              "title": "Adjustment",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "code": {
                                  "type": "string",
                                  "description": "code used in System of Record, if available"
                                },
                                "factor": {
                                  "type": "string"
                                },
                                "reason": {
                                  "type": "string"
                                },
                                "adjustmentType": {
                                  "type": "string",
                                  "enum": ["PERCENT", "RATE", "DOLLAR_AMOUNT"]
                                },
                                "name": {
                                  "type": "string",
                                  "description": "Specific to System of Record"
                                },
                                "priority": {
                                  "type": "integer",
                                  "description": "Order in which the discount is applied"
                                }
                              },
                              "required": ["adjustmentType"]
                            }
                          },
                          "questionAnswers": {
                            "type": "array",
                            "items": {
                              "title": "Question Instance",
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "string",
                                  "description": "QuestionInstance ID"
                                },
                                "question": {
                                  "title": "Application Question",
                                  "allOf": [
                                    {
                                      "title": "Question Output",
                                      "allOf": [
                                        {
                                          "type": "object",
                                          "properties": {
                                            "id": {
                                              "type": "string",
                                              "description": "Internal unique id generated by our DB or system"
                                            }
                                          },
                                          "required": ["id"]
                                        },
                                        {
                                          "title": "Question Base",
                                          "type": "object",
                                          "properties": {
                                            "questionType": {
                                              "type": "string",
                                              "enum": ["GROUP", "QUESTION", "HIDDEN"]
                                            },
                                            "text": {
                                              "type": "string",
                                              "description": "Text displayed on the Label"
                                            },
                                            "subText": {
                                              "type": "string",
                                              "description": "Additional helper text for the question"
                                            },
                                            "helpText": {
                                              "type": "string"
                                            },
                                            "answerType": {
                                              "type": "object",
                                              "properties": {
                                                "dataType": {
                                                  "type": "string",
                                                  "description": "DataType of the answer. Can be a simple dataType or complex dataType like Vehicle. Some possible types are: string, decimal, boolean, enum, int, date, money"
                                                },
                                                "minValue": {
                                                  "type": "string"
                                                },
                                                "maxValue": {
                                                  "type": "string"
                                                },
                                                "regEx": {
                                                  "type": "string",
                                                  "description": "Acceptable format for the String dataType"
                                                },
                                                "minLength": {
                                                  "type": "integer"
                                                },
                                                "maxLength": {
                                                  "type": "integer",
                                                  "description": "Maximum number of characters for string dataType"
                                                },
                                                "enumValues": {
                                                  "type": "array",
                                                  "description": "Values to be shown for enum DataType",
                                                  "items": {
                                                    "type": "object",
                                                    "properties": {
                                                      "value": {
                                                        "type": "string",
                                                        "description": "value that is stored at the backend"
                                                      },
                                                      "description": {
                                                        "type": "string",
                                                        "description": "Value that is shown to the user on UI"
                                                      },
                                                      "isDefault": {
                                                        "type": "boolean",
                                                        "description": "Whether the current value should be preselected for the user as default value"
                                                      }
                                                    },
                                                    "required": ["value", "description"]
                                                  }
                                                },
                                                "multiSelect": {
                                                  "type": "boolean",
                                                  "description": "Applicable only if the dataType is enum"
                                                },
                                                "customSource": {
                                                  "type": "string",
                                                  "description": "API endpoint for getting custom Data "
                                                },
                                                "defaultValue": {
                                                  "type": "string"
                                                },
                                                "placeHolder": {
                                                  "type": "string"
                                                },
                                                "isRequired": {
                                                  "type": "boolean"
                                                },
                                                "format": {
                                                  "type": "string"
                                                }
                                              },
                                              "required": ["dataType"]
                                            },
                                            "effectiveDate": {
                                              "type": "string",
                                              "format": "date",
                                              "description": "Date from which this question will become effective or active"
                                            },
                                            "expiryDate": {
                                              "type": "string",
                                              "format": "date",
                                              "description": "Date from which this question will expire or become inactive"
                                            }
                                          },
                                          "required": ["questionType"]
                                        }
                                      ]
                                    },
                                    {
                                      "type": "object",
                                      "properties": {
                                        "askOnce": {
                                          "type": "boolean"
                                        },
                                        "priority": {
                                          "type": "integer"
                                        },
                                        "maxOccurs": {
                                          "type": "integer"
                                        },
                                        "stageOfProcess": {
                                          "title": "Stage Of Process",
                                          "type": "string",
                                          "description": "",
                                          "enum": [
                                            "NEEDS_ANALYSIS",
                                            "COVER_SELECT",
                                            "PRODUCT_QUESTIONS",
                                            "QUOTE",
                                            "DECLARATIONS",
                                            "CONTACT",
                                            "PAYMENT",
                                            "CONFIRMATION"
                                          ]
                                        }
                                      }
                                    }
                                  ]
                                },
                                "productInstanceIds": {
                                  "type": "array",
                                  "description": "ProductInstances for which this question is applicable",
                                  "items": {
                                    "type": "string"
                                  }
                                },
                                "answer": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  }
                                },
                                "answeredOn": {
                                  "type": "string",
                                  "format": "date-time"
                                },
                                "questionInstances": {
                                  "type": "array",
                                  "items": {
                                    "$ref": "#/definitions/question-instance"
                                  }
                                },
                                "askIf": {
                                  "type": "array",
                                  "description": "Only ask this question if the conditions in the array are satisfied",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "questionInstanceId": {
                                        "type": "string",
                                        "description": "Link to the Question Instance ID which is to be compared"
                                      },
                                      "operator": {
                                        "type": "string",
                                        "description": "Operator to use for comparision e.g. =, <, >, <= etc."
                                      },
                                      "value": {
                                        "type": "string",
                                        "description": "Value to compare against"
                                      },
                                      "path": {
                                        "type": "string"
                                      },
                                      "stageOfProcess": {
                                        "title": "Stage Of Process",
                                        "type": "string",
                                        "description": "",
                                        "enum": [
                                          "NEEDS_ANALYSIS",
                                          "COVER_SELECT",
                                          "PRODUCT_QUESTIONS",
                                          "QUOTE",
                                          "DECLARATIONS",
                                          "CONTACT",
                                          "PAYMENT",
                                          "CONFIRMATION"
                                        ]
                                      }
                                    }
                                  }
                                },
                                "askIfSetOperator": {
                                  "type": "string",
                                  "enum": ["ALL_OF", "ANY_OF"]
                                }
                              }
                            }
                          },
                          "physicalConditions": {
                            "type": "array",
                            "items": {
                              "title": "Physical Condition",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "description": {
                                  "type": "string"
                                },
                                "value": {
                                  "type": "string"
                                },
                                "establishedDate": {
                                  "title": "Date Time Extended",
                                  "type": "object",
                                  "properties": {
                                    "value": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "format": {
                                      "type": "string",
                                      "enum": [
                                        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                        "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                        "yyyy-MM-dd'T'HH:mm'Z'",
                                        "yyyy-MM-dd'T'HH",
                                        "yyyy-MM-dd",
                                        "yyyy-MM",
                                        "yyyy"
                                      ]
                                    },
                                    "minValue": {
                                      "type": "string"
                                    },
                                    "maxValue": {
                                      "type": "string"
                                    },
                                    "defaultValue": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["value"]
                                },
                                "physicalConditionType": {
                                  "type": "string",
                                  "enum": [
                                    "LAST_VALUATION",
                                    "STATED_VALUE",
                                    "PLANT_LAST_VALUATION",
                                    "LAST_INSPECTION",
                                    "LAST_SURVEYED",
                                    "RATING_CONDITION",
                                    "UNREPAIRED_DAMAGE"
                                  ]
                                },
                                "type": {
                                  "type": "string",
                                  "description": "e.g. Financial Valuation Type"
                                },
                                "amount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "code": {
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "generalActivities": {
                            "type": "array",
                            "items": {
                              "title": "General Activity",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string"
                                },
                                "activityCode": {
                                  "type": "string"
                                },
                                "activityId": {
                                  "type": "string"
                                },
                                "turnoverPercentage": {
                                  "type": "number"
                                },
                                "turnoverAmount": {
                                  "type": "number"
                                },
                                "description": {
                                  "type": "string"
                                },
                                "estimatedTurnover": {
                                  "type": "number"
                                },
                                "externalReferences": {
                                  "description": "",
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/external-reference"
                                  }
                                },
                                "address": {
                                  "title": "Address Output",
                                  "allOf": [
                                    {
                                      "type": "object",
                                      "properties": {
                                        "id": {
                                          "type": "string"
                                        }
                                      }
                                    },
                                    {
                                      "title": "Address Base",
                                      "description": "",
                                      "type": "object",
                                      "properties": {
                                        "addressId": {
                                          "description": "",
                                          "type": "string"
                                        },
                                        "addressPurpose": {
                                          "title": "Address Purpose",
                                          "type": "string",
                                          "enum": ["BILLING", "BUSINESS", "HOME", "OTHER", "MAILING", "CONTACT"]
                                        },
                                        "boxNumber": {
                                          "type": "string"
                                        },
                                        "boxType": {
                                          "type": "string"
                                        },
                                        "buildingName": {
                                          "type": "string"
                                        },
                                        "city": {
                                          "type": "string"
                                        },
                                        "country": {
                                          "type": "string"
                                        },
                                        "deliveryType": {
                                          "type": "string",
                                          "enum": [
                                            "PO_BOX",
                                            "PRIVATE_BAG",
                                            "RESPONSE_BAG",
                                            "CMB",
                                            "COUNTER_DELIVERY",
                                            "POST_BOX",
                                            "RURAL"
                                          ]
                                        },
                                        "description": {
                                          "type": "string"
                                        },
                                        "levelNumber": {
                                          "type": "string"
                                        },
                                        "levelType": {
                                          "type": "string"
                                        },
                                        "lobbyName": {
                                          "type": "string"
                                        },
                                        "postalCode": {
                                          "type": "string"
                                        },
                                        "region": {
                                          "type": "string"
                                        },
                                        "ruralDelivery": {
                                          "type": "string"
                                        },
                                        "ruralDistrict": {
                                          "type": "string"
                                        },
                                        "status": {
                                          "type": "string"
                                        },
                                        "streetName": {
                                          "type": "string"
                                        },
                                        "streetNumber": {
                                          "type": "string"
                                        },
                                        "streetNumberSuffix": {
                                          "type": "string"
                                        },
                                        "streetSuffix": {
                                          "type": "string"
                                        },
                                        "streetType": {
                                          "type": "string"
                                        },
                                        "subregion": {
                                          "type": "string"
                                        },
                                        "unitNumber": {
                                          "type": "string"
                                        },
                                        "unitType": {
                                          "type": "string"
                                        },
                                        "unstructured": {
                                          "description": "An address represented in a single string",
                                          "type": "string"
                                        },
                                        "displayAddress": {
                                          "type": "array",
                                          "items": {
                                            "type": "string"
                                          }
                                        },
                                        "externalReferences": {
                                          "type": "array",
                                          "items": {
                                            "$ref": "./common.oas2.yml#/definitions/external-reference"
                                          }
                                        },
                                        "geoLocation": {
                                          "$ref": "./common.oas2.yml#/definitions/geo-location"
                                        },
                                        "sourceId": {
                                          "type": "string"
                                        },
                                        "sourceType": {
                                          "type": "string",
                                          "description": "Can be Google, DPID etc"
                                        },
                                        "rateLocation": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  ]
                                },
                                "activityType": {
                                  "type": "string",
                                  "enum": [
                                    "ANZSIC",
                                    "TERRITORIAL_LIMITS",
                                    "OUTSIDE_ACTIVITY",
                                    "HAZARDOUS_ACTIVITY",
                                    "HOTWORKS",
                                    "JURISDICTIONAL_LIMITS",
                                    "PRODUCT_DETAILS",
                                    "GENERAL",
                                    "AREA_OF_OPERATION",
                                    "USE_TYPE",
                                    "SUB_USE_TYPE",
                                    "BUSINESS_DESCRIPTION",
                                    "INDUSTRY",
                                    "BUSINESS_USAGE",
                                    "LOCATION",
                                    "VEHICLE_USAGE",
                                    "OCCUPATION"
                                  ]
                                },
                                "amount": {
                                  "type": "number",
                                  "description": "A numeric value associated with an activity e.g. What is the maximum value of cash carried in any of the vehicles at any one time = **$1000**"
                                },
                                "value": {
                                  "type": "string",
                                  "description": "A numeric value associated with an activity"
                                },
                                "component": {
                                  "type": "string"
                                },
                                "purpose": {
                                  "type": "string"
                                },
                                "dynamicProperties": {
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/dynamic-property"
                                  }
                                },
                                "undertakesActivity": {
                                  "type": "boolean"
                                },
                                "floorArea": {
                                  "type": "integer"
                                }
                              },
                              "required": ["activityType"]
                            }
                          },
                          "undergoneActivityOccurrences": {
                            "type": "array",
                            "items": {
                              "title": "Activity Occurence",
                              "description": "EstimatedGrossTurnoverNextTwelveMonths,LastRewiredYearChangedSeasonalIncreasePeriod",
                              "type": "object",
                              "properties": {
                                "actualCost": {
                                  "type": "number"
                                },
                                "budget": {
                                  "type": "number"
                                },
                                "endDate": {
                                  "title": "Date Time Extended",
                                  "type": "object",
                                  "properties": {
                                    "value": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "format": {
                                      "type": "string",
                                      "enum": [
                                        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                        "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                        "yyyy-MM-dd'T'HH:mm'Z'",
                                        "yyyy-MM-dd'T'HH",
                                        "yyyy-MM-dd",
                                        "yyyy-MM",
                                        "yyyy"
                                      ]
                                    },
                                    "minValue": {
                                      "type": "string"
                                    },
                                    "maxValue": {
                                      "type": "string"
                                    },
                                    "defaultValue": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["value"]
                                },
                                "objective": {
                                  "type": "string"
                                },
                                "startDate": {
                                  "title": "Date Time Extended",
                                  "type": "object",
                                  "properties": {
                                    "value": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "format": {
                                      "type": "string",
                                      "enum": [
                                        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                        "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                        "yyyy-MM-dd'T'HH:mm'Z'",
                                        "yyyy-MM-dd'T'HH",
                                        "yyyy-MM-dd",
                                        "yyyy-MM",
                                        "yyyy"
                                      ]
                                    },
                                    "minValue": {
                                      "type": "string"
                                    },
                                    "maxValue": {
                                      "type": "string"
                                    },
                                    "defaultValue": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["value"]
                                }
                              }
                            }
                          },
                          "objectOwnershipDetails": {
                            "type": "array",
                            "items": {
                              "title": "Object Ownership",
                              "type": "object",
                              "properties": {
                                "ownershipForm": {
                                  "type": "string",
                                  "enum": [
                                    "FREEHOLD",
                                    "RENTAL",
                                    "LEASE",
                                    "FULL_INDIVIDUAL_OWNERSHIP",
                                    "LEASEE",
                                    "LEASOR",
                                    "SOLE_OWNER",
                                    "PART_OWNER",
                                    "FRANCHISE"
                                  ],
                                  "description": "The legal class of ownership of a physical object"
                                },
                                "acquisitionCost": {
                                  "type": "number",
                                  "description": "The price paid for acquiring physical object"
                                },
                                "acquisitionMethod": {
                                  "type": "string",
                                  "enum": ["MORTGAGEE_SALE"],
                                  "description": "The method by which the physical object was acquired"
                                },
                                "isFirstOwner": {
                                  "type": "boolean"
                                },
                                "ownershipPercentage": {
                                  "type": "number"
                                },
                                "purchaseDate": {
                                  "type": "string",
                                  "format": "date"
                                },
                                "isInsuredObjectOwner": {
                                  "type": "boolean"
                                },
                                "objectOwnerName": {
                                  "type": "string"
                                },
                                "hasOtherInterestForCoverage": {
                                  "type": "boolean"
                                },
                                "partOfObjectOwned": {
                                  "type": "string",
                                  "description": "e.g. building, stock etc"
                                },
                                "objectOwnerDescription": {
                                  "type": "string",
                                  "description": "e.g. Lease company, Hire Company, Employee, Director"
                                }
                              }
                            }
                          },
                          "mobileAssets": {
                            "title": "Mobile Assets",
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string"
                              },
                              "carryingVehicle": {
                                "title": "Vehicle Output",
                                "allOf": [
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "description": "Internal unique id generated by our DB or system"
                                      }
                                    }
                                  },
                                  {
                                    "title": "Vehicle Base",
                                    "description": "The representation of vehicle data.",
                                    "type": "object",
                                    "properties": {
                                      "vehicleType": {
                                        "title": "Vehicle Type Output",
                                        "allOf": [
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "description": "Internal unique id generated by our DB or system"
                                              }
                                            }
                                          },
                                          {
                                            "title": "Vehicle Type Base",
                                            "description": "The representation of vehicleType data.",
                                            "type": "object",
                                            "properties": {
                                              "vehicleId": {
                                                "type": "integer",
                                                "description": "Recieved from RedBook or other sources"
                                              },
                                              "make": {
                                                "type": "string",
                                                "description": "The make of the vehicle"
                                              },
                                              "mass": {
                                                "type": "string",
                                                "description": "Gross laden weight"
                                              },
                                              "model": {
                                                "type": "string"
                                              },
                                              "vehicleType": {
                                                "type": "string"
                                              },
                                              "year": {
                                                "type": "integer"
                                              },
                                              "bodyStyle": {
                                                "type": "string"
                                              },
                                              "engineType": {
                                                "type": "string"
                                              },
                                              "driveType": {
                                                "type": "string",
                                                "description": "4WD or 2WD or AWD etc"
                                              },
                                              "doors": {
                                                "type": "integer"
                                              },
                                              "series": {
                                                "type": "string"
                                              },
                                              "engineCapacity": {
                                                "type": "string"
                                              },
                                              "engineSize": {
                                                "type": "string"
                                              },
                                              "equipmentLevel": {
                                                "type": "string"
                                              },
                                              "equipmentLevel2": {
                                                "type": "string"
                                              },
                                              "fullDescription": {
                                                "type": "string"
                                              },
                                              "standardEquipment": {
                                                "type": "string"
                                              },
                                              "gearType": {
                                                "type": "string",
                                                "description": "Automatic or Manual"
                                              },
                                              "releaseMonth": {
                                                "type": "integer"
                                              },
                                              "noOfGears": {
                                                "type": "integer"
                                              },
                                              "noOfCylinders": {
                                                "type": "integer"
                                              },
                                              "fuelType": {
                                                "type": "string"
                                              },
                                              "tareWeight": {
                                                "type": "number",
                                                "description": "Unladen weight"
                                              },
                                              "newPrice": {
                                                "type": "number"
                                              },
                                              "isImported": {
                                                "type": "boolean"
                                              },
                                              "seatCapacity": {
                                                "type": "integer"
                                              },
                                              "axels": {
                                                "type": "integer"
                                              },
                                              "bodyType": {
                                                "type": "string"
                                              },
                                              "vehicleIndicators": {
                                                "type": "array",
                                                "items": {
                                                  "type": "object",
                                                  "properties": {
                                                    "product": {
                                                      "type": "string",
                                                      "enum": ["State PMV", "FI PMV"]
                                                    },
                                                    "name": {
                                                      "type": "string"
                                                    },
                                                    "value": {
                                                      "type": "string"
                                                    },
                                                    "expiryDate": {
                                                      "type": "string",
                                                      "format": "date"
                                                    }
                                                  }
                                                }
                                              },
                                              "prices": {
                                                "type": "array",
                                                "items": {
                                                  "type": "object",
                                                  "properties": {
                                                    "price1": {
                                                      "type": "number"
                                                    },
                                                    "price2": {
                                                      "type": "number"
                                                    },
                                                    "price3": {
                                                      "type": "number"
                                                    },
                                                    "expiryDate": {
                                                      "type": "string",
                                                      "format": "date"
                                                    }
                                                  }
                                                }
                                              },
                                              "vehicleGroup": {
                                                "type": "string",
                                                "description": "General vehicle group e.g. car, ute etc."
                                              },
                                              "isHybrid": {
                                                "type": "boolean"
                                              },
                                              "isElectric": {
                                                "type": "boolean"
                                              },
                                              "countryOfOrigin": {
                                                "type": "string"
                                              },
                                              "externalReferences": {
                                                "type": "array",
                                                "items": {
                                                  "$ref": "./common.oas2.yml#/definitions/external-reference"
                                                }
                                              },
                                              "dataProvider": {
                                                "type": "string"
                                              }
                                            }
                                          }
                                        ]
                                      },
                                      "alternateVehicleType": {
                                        "type": "array",
                                        "items": {
                                          "title": "Vehicle Type Output",
                                          "allOf": [
                                            {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string",
                                                  "description": "Internal unique id generated by our DB or system"
                                                }
                                              }
                                            },
                                            {
                                              "title": "Vehicle Type Base",
                                              "description": "The representation of vehicleType data.",
                                              "type": "object",
                                              "properties": {
                                                "vehicleId": {
                                                  "type": "integer",
                                                  "description": "Recieved from RedBook or other sources"
                                                },
                                                "make": {
                                                  "type": "string",
                                                  "description": "The make of the vehicle"
                                                },
                                                "mass": {
                                                  "type": "string",
                                                  "description": "Gross laden weight"
                                                },
                                                "model": {
                                                  "type": "string"
                                                },
                                                "vehicleType": {
                                                  "type": "string"
                                                },
                                                "year": {
                                                  "type": "integer"
                                                },
                                                "bodyStyle": {
                                                  "type": "string"
                                                },
                                                "engineType": {
                                                  "type": "string"
                                                },
                                                "driveType": {
                                                  "type": "string",
                                                  "description": "4WD or 2WD or AWD etc"
                                                },
                                                "doors": {
                                                  "type": "integer"
                                                },
                                                "series": {
                                                  "type": "string"
                                                },
                                                "engineCapacity": {
                                                  "type": "string"
                                                },
                                                "engineSize": {
                                                  "type": "string"
                                                },
                                                "equipmentLevel": {
                                                  "type": "string"
                                                },
                                                "equipmentLevel2": {
                                                  "type": "string"
                                                },
                                                "fullDescription": {
                                                  "type": "string"
                                                },
                                                "standardEquipment": {
                                                  "type": "string"
                                                },
                                                "gearType": {
                                                  "type": "string",
                                                  "description": "Automatic or Manual"
                                                },
                                                "releaseMonth": {
                                                  "type": "integer"
                                                },
                                                "noOfGears": {
                                                  "type": "integer"
                                                },
                                                "noOfCylinders": {
                                                  "type": "integer"
                                                },
                                                "fuelType": {
                                                  "type": "string"
                                                },
                                                "tareWeight": {
                                                  "type": "number",
                                                  "description": "Unladen weight"
                                                },
                                                "newPrice": {
                                                  "type": "number"
                                                },
                                                "isImported": {
                                                  "type": "boolean"
                                                },
                                                "seatCapacity": {
                                                  "type": "integer"
                                                },
                                                "axels": {
                                                  "type": "integer"
                                                },
                                                "bodyType": {
                                                  "type": "string"
                                                },
                                                "vehicleIndicators": {
                                                  "type": "array",
                                                  "items": {
                                                    "type": "object",
                                                    "properties": {
                                                      "product": {
                                                        "type": "string",
                                                        "enum": ["State PMV", "FI PMV"]
                                                      },
                                                      "name": {
                                                        "type": "string"
                                                      },
                                                      "value": {
                                                        "type": "string"
                                                      },
                                                      "expiryDate": {
                                                        "type": "string",
                                                        "format": "date"
                                                      }
                                                    }
                                                  }
                                                },
                                                "prices": {
                                                  "type": "array",
                                                  "items": {
                                                    "type": "object",
                                                    "properties": {
                                                      "price1": {
                                                        "type": "number"
                                                      },
                                                      "price2": {
                                                        "type": "number"
                                                      },
                                                      "price3": {
                                                        "type": "number"
                                                      },
                                                      "expiryDate": {
                                                        "type": "string",
                                                        "format": "date"
                                                      }
                                                    }
                                                  }
                                                },
                                                "vehicleGroup": {
                                                  "type": "string",
                                                  "description": "General vehicle group e.g. car, ute etc."
                                                },
                                                "isHybrid": {
                                                  "type": "boolean"
                                                },
                                                "isElectric": {
                                                  "type": "boolean"
                                                },
                                                "countryOfOrigin": {
                                                  "type": "string"
                                                },
                                                "externalReferences": {
                                                  "type": "array",
                                                  "items": {
                                                    "$ref": "./common.oas2.yml#/definitions/external-reference"
                                                  }
                                                },
                                                "dataProvider": {
                                                  "type": "string"
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "alarmType": {
                                        "type": "string"
                                      },
                                      "fullDescription": {
                                        "type": "string"
                                      },
                                      "hasAccessory": {
                                        "type": "boolean"
                                      },
                                      "hasAlarm": {
                                        "type": "boolean"
                                      },
                                      "hasLowKM": {
                                        "type": "boolean"
                                      },
                                      "hasModification": {
                                        "type": "boolean"
                                      },
                                      "hasOccasionalUse": {
                                        "type": "boolean"
                                      },
                                      "isVintage": {
                                        "type": "boolean"
                                      },
                                      "purposeOfUse": {
                                        "type": "string"
                                      },
                                      "registrationNumber": {
                                        "type": "string"
                                      },
                                      "vehicleUsage": {
                                        "type": "string"
                                      },
                                      "vin": {
                                        "type": "string"
                                      },
                                      "colour": {
                                        "title": "Vehicle Colour",
                                        "description": "",
                                        "type": "string",
                                        "enum": [
                                          "BLUE",
                                          "RED",
                                          "GREEN",
                                          "WHITE",
                                          "BLACK",
                                          "YELLOW",
                                          "ORANGE",
                                          "BROWN",
                                          "CREAM",
                                          "GOLD",
                                          "GREY",
                                          "PINK",
                                          "PURPLE",
                                          "SILVER"
                                        ]
                                      },
                                      "driverParties": {
                                        "type": "array",
                                        "items": {
                                          "$ref": "./common.oas2.yml#/definitions/driver"
                                        }
                                      },
                                      "externalReferences": {
                                        "type": "array",
                                        "items": {
                                          "$ref": "./common.oas2.yml#/definitions/external-reference"
                                        }
                                      },
                                      "modifications": {
                                        "type": "array",
                                        "items": {
                                          "$ref": "./common.oas2.yml#/definitions/modification"
                                        }
                                      },
                                      "modificationsAmount": {
                                        "$ref": "./common.oas2.yml#/definitions/amount-extended"
                                      },
                                      "unnamedDrivers": {
                                        "type": "array",
                                        "items": {
                                          "$ref": "./common.oas2.yml#/definitions/unnamed-driver"
                                        }
                                      },
                                      "mass": {
                                        "type": "string"
                                      },
                                      "vehicleClass": {
                                        "type": "string"
                                      },
                                      "securityFeatures": {
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "properties": {
                                            "securityType": {
                                              "type": "string"
                                            }
                                          }
                                        }
                                      },
                                      "vehicleAssessments": {
                                        "type": "array",
                                        "items": {
                                          "$ref": "./common.oas2.yml#/definitions/vehicle-assessment"
                                        }
                                      },
                                      "permanentFixtureAmount": {
                                        "$ref": "./common.oas2.yml#/definitions/amount-extended"
                                      },
                                      "isPermanentlySited": {
                                        "type": "boolean"
                                      },
                                      "isPrestige": {
                                        "type": "boolean"
                                      },
                                      "isExotic": {
                                        "type": "boolean"
                                      },
                                      "hasImmobiliser": {
                                        "type": "boolean"
                                      },
                                      "parkingLocations": {
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "properties": {
                                            "code": {
                                              "type": "string",
                                              "description": "example - onRoad, offRoad, carPort"
                                            },
                                            "description": {
                                              "type": "string",
                                              "description": "Add a description of parking location, if applicable"
                                            }
                                          }
                                        }
                                      },
                                      "chassisNumber": {
                                        "type": "string"
                                      }
                                    }
                                  }
                                ]
                              }
                            }
                          },
                          "businessInterruption": {
                            "title": "Business Interruption",
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string",
                                "description": "  "
                              }
                            }
                          },
                          "dwelling": {
                            "title": "Dwelling",
                            "description": "",
                            "type": "object",
                            "properties": {
                              "occupancyOtherDetails": {
                                "type": "string"
                              },
                              "numberOfDwellings": {
                                "type": "integer",
                                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum, arcu sit amet cursus dictum, libero ex vestibulum arcu, at elementum odio leo vel risus. Maecenas mi ipsum, vehicula ac dui sit amet, mattis ultricies lorem. Duis nec laoreet diam. Integer id aliquet tellus. Aliquam varius augue id mauris molestie, ac consectetur nulla vestibulum. Nulla lorem diam, euismod eget massa non, pulvinar tincidunt diam. Ut euismod augue at eros mattis, congue aliquet nisi pulvinar. Nam quis neque elit. Suspendisse pretium cursus dolor, eget vehicula sapien tristique ac. Ut eget varius ex, faucibus pharetra magna."
                              },
                              "isTownWaterSupplied": {
                                "type": "boolean",
                                "description": "Is the dwelling connected to the town water supply? Answer 'Yes' or 'No'"
                              },
                              "yearBuilt": {
                                "type": "integer",
                                "description": "Year house was built"
                              },
                              "hasAlarm": {
                                "type": "boolean",
                                "description": "Flag to indicate if the house has a burglar alarm"
                              },
                              "alarmType": {
                                "type": "string",
                                "description": "Type of alarm"
                              },
                              "constructionMaterial": {
                                "type": "string",
                                "description": "The main construction material"
                              },
                              "roofType": {
                                "type": "string"
                              },
                              "constructionQuality": {
                                "type": "string",
                                "description": "Quality of construction."
                              },
                              "numberOfFloors": {
                                "type": "integer"
                              },
                              "numberOfDwellingsInBlock": {
                                "type": "integer",
                                "description": "This indiates total number of Dwellings in the Block that may or may not be insured"
                              },
                              "floorArea": {
                                "type": "integer",
                                "description": "Floor area in sq. metres"
                              },
                              "weeklyRentalAmount": {
                                "type": "number"
                              },
                              "purposeOfUse": {
                                "type": "string"
                              },
                              "structureType": {
                                "description": "The structure type describes how the building is physically built.Buildings can be free standing, semi-detached, apartments/flats.",
                                "type": "string"
                              },
                              "slope": {
                                "type": "string"
                              },
                              "dwellingType": {
                                "type": "string",
                                "description": "eg. \"House\", \"Home Unit\", \"Flat\", \"Retirement Unit\", \"Board\", \"Apartment\", \"Freestanding property\""
                              },
                              "occupancy": {
                                "type": "string",
                                "description": "Types of occupancy  can be owner occupied, tenanted, holiday home, unoccupied"
                              },
                              "location": {
                                "title": "Location",
                                "description": "",
                                "type": "object",
                                "properties": {
                                  "name": {
                                    "type": "string"
                                  },
                                  "address": {
                                    "title": "Address Output",
                                    "allOf": [
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string"
                                          }
                                        }
                                      },
                                      {
                                        "title": "Address Base",
                                        "description": "",
                                        "type": "object",
                                        "properties": {
                                          "addressId": {
                                            "description": "",
                                            "type": "string"
                                          },
                                          "addressPurpose": {
                                            "title": "Address Purpose",
                                            "type": "string",
                                            "enum": ["BILLING", "BUSINESS", "HOME", "OTHER", "MAILING", "CONTACT"]
                                          },
                                          "boxNumber": {
                                            "type": "string"
                                          },
                                          "boxType": {
                                            "type": "string"
                                          },
                                          "buildingName": {
                                            "type": "string"
                                          },
                                          "city": {
                                            "type": "string"
                                          },
                                          "country": {
                                            "type": "string"
                                          },
                                          "deliveryType": {
                                            "type": "string",
                                            "enum": [
                                              "PO_BOX",
                                              "PRIVATE_BAG",
                                              "RESPONSE_BAG",
                                              "CMB",
                                              "COUNTER_DELIVERY",
                                              "POST_BOX",
                                              "RURAL"
                                            ]
                                          },
                                          "description": {
                                            "type": "string"
                                          },
                                          "levelNumber": {
                                            "type": "string"
                                          },
                                          "levelType": {
                                            "type": "string"
                                          },
                                          "lobbyName": {
                                            "type": "string"
                                          },
                                          "postalCode": {
                                            "type": "string"
                                          },
                                          "region": {
                                            "type": "string"
                                          },
                                          "ruralDelivery": {
                                            "type": "string"
                                          },
                                          "ruralDistrict": {
                                            "type": "string"
                                          },
                                          "status": {
                                            "type": "string"
                                          },
                                          "streetName": {
                                            "type": "string"
                                          },
                                          "streetNumber": {
                                            "type": "string"
                                          },
                                          "streetNumberSuffix": {
                                            "type": "string"
                                          },
                                          "streetSuffix": {
                                            "type": "string"
                                          },
                                          "streetType": {
                                            "type": "string"
                                          },
                                          "subregion": {
                                            "type": "string"
                                          },
                                          "unitNumber": {
                                            "type": "string"
                                          },
                                          "unitType": {
                                            "type": "string"
                                          },
                                          "unstructured": {
                                            "description": "An address represented in a single string",
                                            "type": "string"
                                          },
                                          "displayAddress": {
                                            "type": "array",
                                            "items": {
                                              "type": "string"
                                            }
                                          },
                                          "externalReferences": {
                                            "type": "array",
                                            "items": {
                                              "$ref": "./common.oas2.yml#/definitions/external-reference"
                                            }
                                          },
                                          "geoLocation": {
                                            "$ref": "./common.oas2.yml#/definitions/geo-location"
                                          },
                                          "sourceId": {
                                            "type": "string"
                                          },
                                          "sourceType": {
                                            "type": "string",
                                            "description": "Can be Google, DPID etc"
                                          },
                                          "rateLocation": {
                                            "type": "string"
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "placeType": {
                                    "type": "string",
                                    "enum": [
                                      "GARAGE_LOCATION",
                                      "PHYSICAL_LOCATION",
                                      "EXPORT_DESTINATION",
                                      "IMPORT_SOURCE",
                                      "STORAGE_LOCATION"
                                    ]
                                  },
                                  "geoLocation": {
                                    "title": "Geo Location",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "latitude": {
                                        "type": "number"
                                      },
                                      "longitude": {
                                        "type": "number"
                                      },
                                      "meshBlockId": {
                                        "type": "string"
                                      },
                                      "reliabilityLevel": {
                                        "description": "Confidence Level, Reliability, Geocode Level Types, and ... (reliability levels 1, 2, or 3) can return a Meshblock ID.",
                                        "type": "integer"
                                      },
                                      "matchLevel": {
                                        "type": "string",
                                        "enum": ["EXACT", "PRIMARY", "SUBURB_LEVEL", "STREET_LEVEL", "NONE"]
                                      },
                                      "geoLocationId": {
                                        "type": "string",
                                        "description": "TUI"
                                      },
                                      "xcoordinate": {
                                        "type": "number"
                                      },
                                      "ycoordinate": {
                                        "type": "number"
                                      },
                                      "indicators": {
                                        "type": "array",
                                        "items": {
                                          "$ref": "./LocationIndicators.oas2.yml#/definitions/location-indicator"
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "isRewired": {
                                "type": "boolean"
                              },
                              "isReroofed": {
                                "type": "boolean"
                              },
                              "isReplumbed": {
                                "type": "boolean"
                              },
                              "isRelined": {
                                "type": "boolean"
                              },
                              "isRepiled": {
                                "type": "boolean"
                              },
                              "isNZHeritage": {
                                "type": "boolean"
                              },
                              "NZHeritageTypes": {
                                "type": "array",
                                "items": {
                                  "title": "Indicator Detail",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "isCouncilHeritage": {
                                "type": "boolean"
                              },
                              "councilHeritageTypes": {
                                "type": "array",
                                "items": {
                                  "title": "Indicator Detail",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "hasNaturalHazardHistory": {
                                "type": "boolean"
                              },
                              "naturalHazardHistoryTypes": {
                                "type": "array",
                                "items": {
                                  "title": "Indicator Detail",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "isEQCSection28Issued": {
                                "type": "boolean"
                              },
                              "isCouncilNaturalHazardRisk": {
                                "type": "boolean"
                              },
                              "councilNaturalHazardRiskTypes": {
                                "type": "array",
                                "items": {
                                  "title": "Indicator Detail",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "isCouncilSection74Issued": {
                                "type": "boolean"
                              },
                              "isUndergoingRenovation": {
                                "type": "boolean"
                              },
                              "isCodeOfComplianceIssued": {
                                "type": "boolean"
                              },
                              "isCouncilFloodRisk": {
                                "type": "boolean"
                              },
                              "councilFloodRiskTypes": {
                                "type": "array",
                                "items": {
                                  "title": "Indicator Detail",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "isPartiallyUsedForBusiness": {
                                "type": "boolean"
                              },
                              "hasOverdueRentHistory": {
                                "type": "boolean"
                              },
                              "isManaged": {
                                "type": "boolean"
                              },
                              "managementType": {
                                "type": "string"
                              },
                              "isRegularlyInspected": {
                                "type": "boolean"
                              },
                              "hasMultipleTenancies": {
                                "type": "boolean",
                                "description": "Are there multiple tenancy agreements for this property? Answer 'Yes' or 'No'"
                              },
                              "numberOfTenancies": {
                                "type": "integer"
                              },
                              "isAvailableShortTerm": {
                                "type": "boolean"
                              },
                              "isLowStructuralRisk": {
                                "type": "boolean"
                              },
                              "bodyCorp": {
                                "type": "object",
                                "properties": {
                                  "isSingleBuilding": {
                                    "type": "boolean"
                                  }
                                }
                              }
                            }
                          },
                          "liability": {
                            "title": "Liability",
                            "description": "",
                            "type": "object",
                            "properties": {
                              "liabilityId": {
                                "type": "string"
                              },
                              "description": {
                                "type": "string"
                              },
                              "externalReferences": {
                                "description": "",
                                "type": "array",
                                "items": {
                                  "title": "External Reference",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "namespace": {
                                      "description": "A namespace for the identifier.",
                                      "type": "string"
                                    },
                                    "identifier": {
                                      "description": "An identifier for the entity",
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "liabilityType": {
                                "type": "string",
                                "enum": ["EMPLOYERS_LIABILITY", "GENERAL_LIABILITY", "STATUTORY_LIABILITY"]
                              },
                              "liabilityCover": {
                                "title": "Liability Cover",
                                "description": "Elements common to various types of Liablility",
                                "type": "object",
                                "properties": {
                                  "complianceWithLegislation": {
                                    "type": "boolean"
                                  },
                                  "lastProposalDate": {
                                    "title": "Date Time Extended",
                                    "type": "object",
                                    "properties": {
                                      "value": {
                                        "type": "string",
                                        "format": "date-time"
                                      },
                                      "format": {
                                        "type": "string",
                                        "enum": [
                                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                          "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                          "yyyy-MM-dd'T'HH:mm'Z'",
                                          "yyyy-MM-dd'T'HH",
                                          "yyyy-MM-dd",
                                          "yyyy-MM",
                                          "yyyy"
                                        ]
                                      },
                                      "minValue": {
                                        "type": "string"
                                      },
                                      "maxValue": {
                                        "type": "string"
                                      },
                                      "defaultValue": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["value"]
                                  },
                                  "oldestYearOfConstruction": {
                                    "type": "integer"
                                  },
                                  "penaltyOrPremiumLoadingImposed": {
                                    "type": "boolean"
                                  }
                                }
                              },
                              "employersLiability": {
                                "title": "Employers Liability",
                                "description": "Custom extension from IAA which matches Guidewire as the master of policy coverages",
                                "type": "object",
                                "properties": {
                                  "retroactiveDate": {
                                    "title": "Date Time Extended",
                                    "type": "object",
                                    "properties": {
                                      "value": {
                                        "type": "string",
                                        "format": "date-time"
                                      },
                                      "format": {
                                        "type": "string",
                                        "enum": [
                                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                          "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                          "yyyy-MM-dd'T'HH:mm'Z'",
                                          "yyyy-MM-dd'T'HH",
                                          "yyyy-MM-dd",
                                          "yyyy-MM",
                                          "yyyy"
                                        ]
                                      },
                                      "minValue": {
                                        "type": "string"
                                      },
                                      "maxValue": {
                                        "type": "string"
                                      },
                                      "defaultValue": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["value"]
                                  },
                                  "retroactiveType": {
                                    "type": "string"
                                  }
                                }
                              },
                              "statutoryLiability": {
                                "title": "Statutory Liability",
                                "description": "Custom extension from IAA which matches Guidewire as the master of policy coverages",
                                "type": "object",
                                "properties": {
                                  "retroactiveDate": {
                                    "title": "Date Time Extended",
                                    "type": "object",
                                    "properties": {
                                      "value": {
                                        "type": "string",
                                        "format": "date-time"
                                      },
                                      "format": {
                                        "type": "string",
                                        "enum": [
                                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                          "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                          "yyyy-MM-dd'T'HH:mm'Z'",
                                          "yyyy-MM-dd'T'HH",
                                          "yyyy-MM-dd",
                                          "yyyy-MM",
                                          "yyyy"
                                        ]
                                      },
                                      "minValue": {
                                        "type": "string"
                                      },
                                      "maxValue": {
                                        "type": "string"
                                      },
                                      "defaultValue": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["value"]
                                  },
                                  "retroactiveType": {
                                    "type": "string"
                                  }
                                }
                              },
                              "generalLiability": {
                                "title": "General Liability",
                                "description": "Also known as Broadform liability and public liability",
                                "type": "object",
                                "properties": {
                                  "annualVehicleServiceTurnover": {
                                    "type": "number"
                                  },
                                  "annualWatercraftServTurnover": {
                                    "type": "number"
                                  },
                                  "carsAndMotorcyclesSelected": {
                                    "type": "boolean"
                                  },
                                  "hasAircraftParts": {
                                    "type": "boolean"
                                  },
                                  "hasChargeForBusinessAdviceOrService": {
                                    "type": "boolean"
                                  },
                                  "hasChargeForPropertyOfOthersInControl": {
                                    "type": "boolean"
                                  },
                                  "hasChemicalsProduct": {
                                    "type": "boolean"
                                  },
                                  "hasContractualLiability": {
                                    "type": "boolean"
                                  },
                                  "hasDesignTheProduct": {
                                    "type": "boolean"
                                  },
                                  "hasEthicalDrugs": {
                                    "type": "boolean"
                                  },
                                  "hasExportProducts": {
                                    "type": "boolean"
                                  },
                                  "hasFertilisers": {
                                    "type": "boolean"
                                  },
                                  "hasHazardousGoods": {
                                    "type": "boolean"
                                  },
                                  "hasMaintainQAOrRecordSys": {
                                    "type": "boolean"
                                  },
                                  "hasPropertyOfOthersInControl": {
                                    "type": "boolean"
                                  },
                                  "hasProvidedBusinessAdviceOrService": {
                                    "type": "boolean"
                                  },
                                  "hasRadioactiveMaterial": {
                                    "type": "boolean"
                                  },
                                  "hasWatercraftExceed8m": {
                                    "type": "boolean"
                                  },
                                  "hasWithdrawnProduct": {
                                    "type": "boolean"
                                  },
                                  "hazardousSubstancesSubComplyWithLaws": {
                                    "type": "boolean"
                                  },
                                  "heavyTruckSelected": {
                                    "type": "boolean"
                                  },
                                  "lightTrucksAndVansSelected": {
                                    "type": "boolean"
                                  },
                                  "mobilePlantAndMachySelected": {
                                    "type": "boolean"
                                  },
                                  "numberOfLocations": {
                                    "type": "integer"
                                  },
                                  "otherVehiclesSelected": {
                                    "type": "boolean"
                                  },
                                  "otherVehicleDetails": {
                                    "type": "string"
                                  },
                                  "perfAndRacingCarSelected": {
                                    "type": "boolean"
                                  },
                                  "serviceAndRepairMotorVehicles": {
                                    "type": "boolean"
                                  },
                                  "serviceAndRepairWatercraft": {
                                    "type": "boolean"
                                  },
                                  "location": {
                                    "title": "Location",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "name": {
                                        "type": "string"
                                      },
                                      "address": {
                                        "$ref": "./Addresses.oas2.yml#/definitions/address-output"
                                      },
                                      "placeType": {
                                        "type": "string",
                                        "enum": [
                                          "GARAGE_LOCATION",
                                          "PHYSICAL_LOCATION",
                                          "EXPORT_DESTINATION",
                                          "IMPORT_SOURCE",
                                          "STORAGE_LOCATION"
                                        ]
                                      },
                                      "geoLocation": {
                                        "$ref": "#/definitions/geo-location"
                                      }
                                    }
                                  },
                                  "numberOfEmployees": {
                                    "type": "string"
                                  },
                                  "estimatedRevenue": {
                                    "type": "string"
                                  },
                                  "lastRevenue": {
                                    "type": "string"
                                  },
                                  "estimatedLastRevenue": {
                                    "type": "string"
                                  },
                                  "placesInvolved": {
                                    "type": "array",
                                    "items": {
                                      "title": "Location",
                                      "description": "",
                                      "type": "object",
                                      "properties": {
                                        "name": {
                                          "type": "string"
                                        },
                                        "address": {
                                          "$ref": "./Addresses.oas2.yml#/definitions/address-output"
                                        },
                                        "placeType": {
                                          "type": "string",
                                          "enum": [
                                            "GARAGE_LOCATION",
                                            "PHYSICAL_LOCATION",
                                            "EXPORT_DESTINATION",
                                            "IMPORT_SOURCE",
                                            "STORAGE_LOCATION"
                                          ]
                                        },
                                        "geoLocation": {
                                          "$ref": "#/definitions/geo-location"
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "marineCraft": {
                            "title": "Marine Craft",
                            "type": "object",
                            "properties": {
                              "boatType": {
                                "type": "string"
                              },
                              "constructionMaterial": {
                                "type": "string"
                              },
                              "fuelType": {
                                "type": "string"
                              },
                              "length": {
                                "type": "number"
                              },
                              "make": {
                                "type": "string"
                              },
                              "maxSpeed": {
                                "type": "number"
                              },
                              "model": {
                                "type": "string"
                              },
                              "name": {
                                "type": "string"
                              },
                              "storageMethod": {
                                "type": "string"
                              },
                              "year": {
                                "type": "integer"
                              },
                              "tonnage": {
                                "type": "number"
                              },
                              "serialNumber": {
                                "type": "string"
                              },
                              "registeredAt": {
                                "type": "string"
                              },
                              "usage": {
                                "type": "string"
                              },
                              "engines": {
                                "type": "array",
                                "items": {
                                  "title": "Engine",
                                  "type": "object",
                                  "properties": {
                                    "engineType": {
                                      "type": "string"
                                    },
                                    "fuelType": {
                                      "type": "string"
                                    },
                                    "horsePower": {
                                      "type": "number"
                                    },
                                    "isAuxiliary": {
                                      "type": "boolean"
                                    },
                                    "make": {
                                      "type": "string"
                                    },
                                    "serialNumber": {
                                      "type": "string"
                                    },
                                    "yearMake": {
                                      "type": "integer"
                                    },
                                    "engineSize": {
                                      "type": "string"
                                    },
                                    "engineCapacity": {
                                      "type": "string"
                                    },
                                    "model": {
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "operatingLimits": {
                                "type": "string"
                              },
                              "externalReference": {
                                "type": "array",
                                "items": {
                                  "title": "External Reference",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "namespace": {
                                      "description": "A namespace for the identifier.",
                                      "type": "string"
                                    },
                                    "identifier": {
                                      "description": "An identifier for the entity",
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "beamWidth": {
                                "type": "number"
                              },
                              "draughtDepth": {
                                "type": "number"
                              },
                              "passengerCapacity": {
                                "type": "integer"
                              },
                              "propelledBy": {
                                "type": "string",
                                "description": "eg. Power, Sail "
                              }
                            }
                          },
                          "structure": {
                            "title": "Structure",
                            "description": "",
                            "type": "object",
                            "properties": {
                              "isTownWaterSupplied": {
                                "type": "boolean"
                              },
                              "numberOfInsuredUnits": {
                                "type": "integer"
                              },
                              "structureNumber": {
                                "type": "string"
                              },
                              "numberOfFloors": {
                                "type": "integer"
                              },
                              "constructionMaterial": {
                                "type": "string"
                              },
                              "structureType": {
                                "type": "string"
                              },
                              "fireAlarmType": {
                                "type": "string"
                              },
                              "yearBuilt": {
                                "type": "integer"
                              },
                              "description": {
                                "type": "string"
                              },
                              "inspection": {
                                "type": "boolean"
                              },
                              "structuralFramingType": {
                                "type": "string"
                              },
                              "alarmType": {
                                "type": "string"
                              },
                              "value": {
                                "type": "number"
                              },
                              "roofMaterial": {
                                "type": "string"
                              },
                              "burglaryClass": {
                                "type": "string"
                              },
                              "structureId": {
                                "type": "string"
                              },
                              "sprinklerSystemType": {
                                "type": "string"
                              },
                              "hasAlarm": {
                                "type": "boolean"
                              },
                              "percentOfInsulatedPanels": {
                                "type": "integer"
                              },
                              "fireProtection": {
                                "type": "string"
                              },
                              "hasSmokeDetectors": {
                                "type": "boolean"
                              },
                              "isDualWaterSupply": {
                                "type": "boolean"
                              },
                              "isHalfOrMoreUnoccupied": {
                                "type": "boolean"
                              },
                              "isOccupantBurglarRisk": {
                                "type": "boolean"
                              },
                              "isOccupantFireRisk": {
                                "type": "boolean"
                              },
                              "isNZS4541Compliant": {
                                "type": "string"
                              },
                              "numberOfHabitableUnits": {
                                "type": "integer"
                              },
                              "riskSurveyClassification": {
                                "type": "string"
                              },
                              "isResidentialProportionMoreThanHalf": {
                                "type": "boolean"
                              },
                              "hasAutoFireSuppressionSystem": {
                                "description": "A system for suppressing fire which is something other than a sprinkler system.",
                                "type": "boolean"
                              },
                              "hasSprinklers": {
                                "description": "Does the structure have sprinklers installed.",
                                "type": "boolean"
                              },
                              "isNoneOfTheAbove": {
                                "type": "boolean"
                              },
                              "externalReferences": {
                                "description": "",
                                "type": "array",
                                "items": {
                                  "title": "External Reference",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "namespace": {
                                      "description": "A namespace for the identifier.",
                                      "type": "string"
                                    },
                                    "identifier": {
                                      "description": "An identifier for the entity",
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "location": {
                                "title": "Location",
                                "description": "",
                                "type": "object",
                                "properties": {
                                  "name": {
                                    "type": "string"
                                  },
                                  "address": {
                                    "title": "Address Output",
                                    "allOf": [
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string"
                                          }
                                        }
                                      },
                                      {
                                        "title": "Address Base",
                                        "description": "",
                                        "type": "object",
                                        "properties": {
                                          "addressId": {
                                            "description": "",
                                            "type": "string"
                                          },
                                          "addressPurpose": {
                                            "title": "Address Purpose",
                                            "type": "string",
                                            "enum": ["BILLING", "BUSINESS", "HOME", "OTHER", "MAILING", "CONTACT"]
                                          },
                                          "boxNumber": {
                                            "type": "string"
                                          },
                                          "boxType": {
                                            "type": "string"
                                          },
                                          "buildingName": {
                                            "type": "string"
                                          },
                                          "city": {
                                            "type": "string"
                                          },
                                          "country": {
                                            "type": "string"
                                          },
                                          "deliveryType": {
                                            "type": "string",
                                            "enum": [
                                              "PO_BOX",
                                              "PRIVATE_BAG",
                                              "RESPONSE_BAG",
                                              "CMB",
                                              "COUNTER_DELIVERY",
                                              "POST_BOX",
                                              "RURAL"
                                            ]
                                          },
                                          "description": {
                                            "type": "string"
                                          },
                                          "levelNumber": {
                                            "type": "string"
                                          },
                                          "levelType": {
                                            "type": "string"
                                          },
                                          "lobbyName": {
                                            "type": "string"
                                          },
                                          "postalCode": {
                                            "type": "string"
                                          },
                                          "region": {
                                            "type": "string"
                                          },
                                          "ruralDelivery": {
                                            "type": "string"
                                          },
                                          "ruralDistrict": {
                                            "type": "string"
                                          },
                                          "status": {
                                            "type": "string"
                                          },
                                          "streetName": {
                                            "type": "string"
                                          },
                                          "streetNumber": {
                                            "type": "string"
                                          },
                                          "streetNumberSuffix": {
                                            "type": "string"
                                          },
                                          "streetSuffix": {
                                            "type": "string"
                                          },
                                          "streetType": {
                                            "type": "string"
                                          },
                                          "subregion": {
                                            "type": "string"
                                          },
                                          "unitNumber": {
                                            "type": "string"
                                          },
                                          "unitType": {
                                            "type": "string"
                                          },
                                          "unstructured": {
                                            "description": "An address represented in a single string",
                                            "type": "string"
                                          },
                                          "displayAddress": {
                                            "type": "array",
                                            "items": {
                                              "type": "string"
                                            }
                                          },
                                          "externalReferences": {
                                            "type": "array",
                                            "items": {
                                              "$ref": "./common.oas2.yml#/definitions/external-reference"
                                            }
                                          },
                                          "geoLocation": {
                                            "$ref": "./common.oas2.yml#/definitions/geo-location"
                                          },
                                          "sourceId": {
                                            "type": "string"
                                          },
                                          "sourceType": {
                                            "type": "string",
                                            "description": "Can be Google, DPID etc"
                                          },
                                          "rateLocation": {
                                            "type": "string"
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "placeType": {
                                    "type": "string",
                                    "enum": [
                                      "GARAGE_LOCATION",
                                      "PHYSICAL_LOCATION",
                                      "EXPORT_DESTINATION",
                                      "IMPORT_SOURCE",
                                      "STORAGE_LOCATION"
                                    ]
                                  },
                                  "geoLocation": {
                                    "title": "Geo Location",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "latitude": {
                                        "type": "number"
                                      },
                                      "longitude": {
                                        "type": "number"
                                      },
                                      "meshBlockId": {
                                        "type": "string"
                                      },
                                      "reliabilityLevel": {
                                        "description": "Confidence Level, Reliability, Geocode Level Types, and ... (reliability levels 1, 2, or 3) can return a Meshblock ID.",
                                        "type": "integer"
                                      },
                                      "matchLevel": {
                                        "type": "string",
                                        "enum": ["EXACT", "PRIMARY", "SUBURB_LEVEL", "STREET_LEVEL", "NONE"]
                                      },
                                      "geoLocationId": {
                                        "type": "string",
                                        "description": "TUI"
                                      },
                                      "xcoordinate": {
                                        "type": "number"
                                      },
                                      "ycoordinate": {
                                        "type": "number"
                                      },
                                      "indicators": {
                                        "type": "array",
                                        "items": {
                                          "$ref": "./LocationIndicators.oas2.yml#/definitions/location-indicator"
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "strengthened": {
                                "title": "Strengthened",
                                "description": "",
                                "type": "object",
                                "properties": {
                                  "description": {
                                    "type": "string"
                                  },
                                  "percentCompliant": {
                                    "type": "string",
                                    "enum": [
                                      "THIRTY_FOUR_PERCENT_OF_CODE",
                                      "SIXTY_SEVEN_PERCENT_OF_CODE",
                                      "ONE_HUNDRED_PERCENT_OF_CODE",
                                      "OTHER",
                                      "UNKNOWN"
                                    ]
                                  },
                                  "percentValue": {
                                    "type": "number"
                                  }
                                }
                              },
                              "annualRentalIncome": {
                                "type": "number"
                              },
                              "hasInsulatedPanels": {
                                "type": "boolean"
                              },
                              "hasBodyCorp": {
                                "type": "boolean"
                              },
                              "hasSoleOccupancy": {
                                "type": "boolean"
                              },
                              "hasResidentialPortion": {
                                "type": "boolean"
                              },
                              "isCloseToHazard": {
                                "type": "boolean"
                              },
                              "hasSection72Notice": {
                                "type": "boolean"
                              },
                              "hasHadSubsidence": {
                                "type": "boolean"
                              },
                              "buildingAge": {
                                "type": "string"
                              },
                              "numberOfResidentialDwellings": {
                                "type": "integer"
                              }
                            }
                          },
                          "vehicle": {
                            "title": "Vehicle Output",
                            "allOf": [
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "description": "Internal unique id generated by our DB or system"
                                  }
                                }
                              },
                              {
                                "title": "Vehicle Base",
                                "description": "The representation of vehicle data.",
                                "type": "object",
                                "properties": {
                                  "vehicleType": {
                                    "title": "Vehicle Type Output",
                                    "allOf": [
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "description": "Internal unique id generated by our DB or system"
                                          }
                                        }
                                      },
                                      {
                                        "title": "Vehicle Type Base",
                                        "description": "The representation of vehicleType data.",
                                        "type": "object",
                                        "properties": {
                                          "vehicleId": {
                                            "type": "integer",
                                            "description": "Recieved from RedBook or other sources"
                                          },
                                          "make": {
                                            "type": "string",
                                            "description": "The make of the vehicle"
                                          },
                                          "mass": {
                                            "type": "string",
                                            "description": "Gross laden weight"
                                          },
                                          "model": {
                                            "type": "string"
                                          },
                                          "vehicleType": {
                                            "type": "string"
                                          },
                                          "year": {
                                            "type": "integer"
                                          },
                                          "bodyStyle": {
                                            "type": "string"
                                          },
                                          "engineType": {
                                            "type": "string"
                                          },
                                          "driveType": {
                                            "type": "string",
                                            "description": "4WD or 2WD or AWD etc"
                                          },
                                          "doors": {
                                            "type": "integer"
                                          },
                                          "series": {
                                            "type": "string"
                                          },
                                          "engineCapacity": {
                                            "type": "string"
                                          },
                                          "engineSize": {
                                            "type": "string"
                                          },
                                          "equipmentLevel": {
                                            "type": "string"
                                          },
                                          "equipmentLevel2": {
                                            "type": "string"
                                          },
                                          "fullDescription": {
                                            "type": "string"
                                          },
                                          "standardEquipment": {
                                            "type": "string"
                                          },
                                          "gearType": {
                                            "type": "string",
                                            "description": "Automatic or Manual"
                                          },
                                          "releaseMonth": {
                                            "type": "integer"
                                          },
                                          "noOfGears": {
                                            "type": "integer"
                                          },
                                          "noOfCylinders": {
                                            "type": "integer"
                                          },
                                          "fuelType": {
                                            "type": "string"
                                          },
                                          "tareWeight": {
                                            "type": "number",
                                            "description": "Unladen weight"
                                          },
                                          "newPrice": {
                                            "type": "number"
                                          },
                                          "isImported": {
                                            "type": "boolean"
                                          },
                                          "seatCapacity": {
                                            "type": "integer"
                                          },
                                          "axels": {
                                            "type": "integer"
                                          },
                                          "bodyType": {
                                            "type": "string"
                                          },
                                          "vehicleIndicators": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "product": {
                                                  "type": "string",
                                                  "enum": ["State PMV", "FI PMV"]
                                                },
                                                "name": {
                                                  "type": "string"
                                                },
                                                "value": {
                                                  "type": "string"
                                                },
                                                "expiryDate": {
                                                  "type": "string",
                                                  "format": "date"
                                                }
                                              }
                                            }
                                          },
                                          "prices": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "price1": {
                                                  "type": "number"
                                                },
                                                "price2": {
                                                  "type": "number"
                                                },
                                                "price3": {
                                                  "type": "number"
                                                },
                                                "expiryDate": {
                                                  "type": "string",
                                                  "format": "date"
                                                }
                                              }
                                            }
                                          },
                                          "vehicleGroup": {
                                            "type": "string",
                                            "description": "General vehicle group e.g. car, ute etc."
                                          },
                                          "isHybrid": {
                                            "type": "boolean"
                                          },
                                          "isElectric": {
                                            "type": "boolean"
                                          },
                                          "countryOfOrigin": {
                                            "type": "string"
                                          },
                                          "externalReferences": {
                                            "type": "array",
                                            "items": {
                                              "$ref": "./common.oas2.yml#/definitions/external-reference"
                                            }
                                          },
                                          "dataProvider": {
                                            "type": "string"
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "alternateVehicleType": {
                                    "type": "array",
                                    "items": {
                                      "title": "Vehicle Type Output",
                                      "allOf": [
                                        {
                                          "type": "object",
                                          "properties": {
                                            "id": {
                                              "type": "string",
                                              "description": "Internal unique id generated by our DB or system"
                                            }
                                          }
                                        },
                                        {
                                          "title": "Vehicle Type Base",
                                          "description": "The representation of vehicleType data.",
                                          "type": "object",
                                          "properties": {
                                            "vehicleId": {
                                              "type": "integer",
                                              "description": "Recieved from RedBook or other sources"
                                            },
                                            "make": {
                                              "type": "string",
                                              "description": "The make of the vehicle"
                                            },
                                            "mass": {
                                              "type": "string",
                                              "description": "Gross laden weight"
                                            },
                                            "model": {
                                              "type": "string"
                                            },
                                            "vehicleType": {
                                              "type": "string"
                                            },
                                            "year": {
                                              "type": "integer"
                                            },
                                            "bodyStyle": {
                                              "type": "string"
                                            },
                                            "engineType": {
                                              "type": "string"
                                            },
                                            "driveType": {
                                              "type": "string",
                                              "description": "4WD or 2WD or AWD etc"
                                            },
                                            "doors": {
                                              "type": "integer"
                                            },
                                            "series": {
                                              "type": "string"
                                            },
                                            "engineCapacity": {
                                              "type": "string"
                                            },
                                            "engineSize": {
                                              "type": "string"
                                            },
                                            "equipmentLevel": {
                                              "type": "string"
                                            },
                                            "equipmentLevel2": {
                                              "type": "string"
                                            },
                                            "fullDescription": {
                                              "type": "string"
                                            },
                                            "standardEquipment": {
                                              "type": "string"
                                            },
                                            "gearType": {
                                              "type": "string",
                                              "description": "Automatic or Manual"
                                            },
                                            "releaseMonth": {
                                              "type": "integer"
                                            },
                                            "noOfGears": {
                                              "type": "integer"
                                            },
                                            "noOfCylinders": {
                                              "type": "integer"
                                            },
                                            "fuelType": {
                                              "type": "string"
                                            },
                                            "tareWeight": {
                                              "type": "number",
                                              "description": "Unladen weight"
                                            },
                                            "newPrice": {
                                              "type": "number"
                                            },
                                            "isImported": {
                                              "type": "boolean"
                                            },
                                            "seatCapacity": {
                                              "type": "integer"
                                            },
                                            "axels": {
                                              "type": "integer"
                                            },
                                            "bodyType": {
                                              "type": "string"
                                            },
                                            "vehicleIndicators": {
                                              "type": "array",
                                              "items": {
                                                "type": "object",
                                                "properties": {
                                                  "product": {
                                                    "type": "string",
                                                    "enum": ["State PMV", "FI PMV"]
                                                  },
                                                  "name": {
                                                    "type": "string"
                                                  },
                                                  "value": {
                                                    "type": "string"
                                                  },
                                                  "expiryDate": {
                                                    "type": "string",
                                                    "format": "date"
                                                  }
                                                }
                                              }
                                            },
                                            "prices": {
                                              "type": "array",
                                              "items": {
                                                "type": "object",
                                                "properties": {
                                                  "price1": {
                                                    "type": "number"
                                                  },
                                                  "price2": {
                                                    "type": "number"
                                                  },
                                                  "price3": {
                                                    "type": "number"
                                                  },
                                                  "expiryDate": {
                                                    "type": "string",
                                                    "format": "date"
                                                  }
                                                }
                                              }
                                            },
                                            "vehicleGroup": {
                                              "type": "string",
                                              "description": "General vehicle group e.g. car, ute etc."
                                            },
                                            "isHybrid": {
                                              "type": "boolean"
                                            },
                                            "isElectric": {
                                              "type": "boolean"
                                            },
                                            "countryOfOrigin": {
                                              "type": "string"
                                            },
                                            "externalReferences": {
                                              "type": "array",
                                              "items": {
                                                "$ref": "./common.oas2.yml#/definitions/external-reference"
                                              }
                                            },
                                            "dataProvider": {
                                              "type": "string"
                                            }
                                          }
                                        }
                                      ]
                                    }
                                  },
                                  "alarmType": {
                                    "type": "string"
                                  },
                                  "fullDescription": {
                                    "type": "string"
                                  },
                                  "hasAccessory": {
                                    "type": "boolean"
                                  },
                                  "hasAlarm": {
                                    "type": "boolean"
                                  },
                                  "hasLowKM": {
                                    "type": "boolean"
                                  },
                                  "hasModification": {
                                    "type": "boolean"
                                  },
                                  "hasOccasionalUse": {
                                    "type": "boolean"
                                  },
                                  "isVintage": {
                                    "type": "boolean"
                                  },
                                  "purposeOfUse": {
                                    "type": "string"
                                  },
                                  "registrationNumber": {
                                    "type": "string"
                                  },
                                  "vehicleUsage": {
                                    "type": "string"
                                  },
                                  "vin": {
                                    "type": "string"
                                  },
                                  "colour": {
                                    "title": "Vehicle Colour",
                                    "description": "",
                                    "type": "string",
                                    "enum": [
                                      "BLUE",
                                      "RED",
                                      "GREEN",
                                      "WHITE",
                                      "BLACK",
                                      "YELLOW",
                                      "ORANGE",
                                      "BROWN",
                                      "CREAM",
                                      "GOLD",
                                      "GREY",
                                      "PINK",
                                      "PURPLE",
                                      "SILVER"
                                    ]
                                  },
                                  "driverParties": {
                                    "type": "array",
                                    "items": {
                                      "$ref": "./common.oas2.yml#/definitions/driver"
                                    }
                                  },
                                  "externalReferences": {
                                    "type": "array",
                                    "items": {
                                      "$ref": "./common.oas2.yml#/definitions/external-reference"
                                    }
                                  },
                                  "modifications": {
                                    "type": "array",
                                    "items": {
                                      "$ref": "./common.oas2.yml#/definitions/modification"
                                    }
                                  },
                                  "modificationsAmount": {
                                    "$ref": "./common.oas2.yml#/definitions/amount-extended"
                                  },
                                  "unnamedDrivers": {
                                    "type": "array",
                                    "items": {
                                      "$ref": "./common.oas2.yml#/definitions/unnamed-driver"
                                    }
                                  },
                                  "mass": {
                                    "type": "string"
                                  },
                                  "vehicleClass": {
                                    "type": "string"
                                  },
                                  "securityFeatures": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "securityType": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  },
                                  "vehicleAssessments": {
                                    "type": "array",
                                    "items": {
                                      "$ref": "./common.oas2.yml#/definitions/vehicle-assessment"
                                    }
                                  },
                                  "permanentFixtureAmount": {
                                    "$ref": "./common.oas2.yml#/definitions/amount-extended"
                                  },
                                  "isPermanentlySited": {
                                    "type": "boolean"
                                  },
                                  "isPrestige": {
                                    "type": "boolean"
                                  },
                                  "isExotic": {
                                    "type": "boolean"
                                  },
                                  "hasImmobiliser": {
                                    "type": "boolean"
                                  },
                                  "parkingLocations": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "code": {
                                          "type": "string",
                                          "description": "example - onRoad, offRoad, carPort"
                                        },
                                        "description": {
                                          "type": "string",
                                          "description": "Add a description of parking location, if applicable"
                                        }
                                      }
                                    }
                                  },
                                  "chassisNumber": {
                                    "type": "string"
                                  }
                                }
                              }
                            ]
                          },
                          "coverType": {
                            "type": "string",
                            "description": "Type of cover purchased for the insured risk"
                          },
                          "assessmentResults": {
                            "type": "array",
                            "items": {
                              "title": "Assessment Results",
                              "description": "The result of an evaluation, based on an expert opinion, on the use of specialised instrumentation, or on the use of analytical systems. This includes scores (of parties, market segments, policies, and places) calculated for risk assessment, marketing or other purposes, financial valuations (of parties, market segments, agreements and physical objects) and conditions (of places, physical objects and activity occurrences). The details of the assessment activity which resulted in the assessment result may not always be known by the modelled organisation.",
                              "type": "object",
                              "properties": {
                                "requiredAuthorityLevel": {
                                  "type": "string"
                                },
                                "assessmentDate": {
                                  "title": "Date Only Extended",
                                  "type": "object",
                                  "properties": {
                                    "value": {
                                      "type": "string",
                                      "format": "date"
                                    },
                                    "format": {
                                      "type": "string",
                                      "enum": ["yyyy-MM-dd", "yyyy-MM", "yyyy"]
                                    }
                                  },
                                  "required": ["value"]
                                },
                                "reasons": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "status": {
                                        "type": "string",
                                        "enum": ["REFER", "COMMENT", "FAIL"]
                                      },
                                      "code": {
                                        "type": "string"
                                      },
                                      "description": {
                                        "type": "string"
                                      },
                                      "authorityLevel": {
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "isBindable": {
                                  "type": "boolean"
                                }
                              }
                            }
                          },
                          "confirmationHistories": {
                            "type": "array",
                            "items": {
                              "title": "Confirmation History",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "type": "string"
                                },
                                "period": {
                                  "type": "string",
                                  "description": "Describe the period of confirmations - e.g. \"last 5 years'"
                                },
                                "lossAmount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "numberOfConfirmations": {
                                  "type": "integer"
                                },
                                "hasConfirmationsOver10000": {
                                  "type": "boolean"
                                },
                                "yearsInBusiness": {
                                  "type": "integer"
                                },
                                "lineOfBusinessCategory": {
                                  "title": "Line Of Business Category",
                                  "type": "string",
                                  "enum": [
                                    "COMMERCIAL_VEHICLE",
                                    "PRIVATE_VEHICLE",
                                    "HOME",
                                    "CONTENTS",
                                    "LIABILITY",
                                    "PLEASUREKRAFT",
                                    "BUSINESS_ASSETS",
                                    "MOBILE_BUSINESS_ASSETS",
                                    "BUSINESS_INTERRUPTION",
                                    "MARINE",
                                    "COMMERCIAL_PROPERTY"
                                  ]
                                },
                                "hasHadMoreThan10Confirmations": {
                                  "type": "boolean"
                                },
                                "confirmationSummaries": {
                                  "type": "array",
                                  "items": {
                                    "title": "Confirmation Summary",
                                    "type": "object",
                                    "properties": {
                                      "description": {
                                        "type": "string"
                                      },
                                      "dateOfLoss": {
                                        "title": "Date Only Extended",
                                        "type": "object",
                                        "properties": {
                                          "value": {
                                            "type": "string",
                                            "format": "date"
                                          },
                                          "format": {
                                            "type": "string",
                                            "enum": ["yyyy-MM-dd", "yyyy-MM", "yyyy"]
                                          }
                                        },
                                        "required": ["value"]
                                      },
                                      "costOfConfirmation": {
                                        "title": "Amount Extended",
                                        "type": "object",
                                        "properties": {
                                          "amount": {
                                            "type": "number"
                                          },
                                          "currencyCode": {
                                            "type": "string"
                                          },
                                          "isGSTInclusive": {
                                            "type": "boolean"
                                          },
                                          "GSTAmount": {
                                            "type": "number"
                                          },
                                          "GSTPercentageApplicable": {
                                            "type": "number"
                                          },
                                          "description": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["amount"]
                                      },
                                      "code": {
                                        "type": "string"
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "insuredParty": {
                            "type": "object",
                            "properties": {
                              "partyId": {
                                "type": "string"
                              },
                              "systemOfRecord": {
                                "title": "System Of Record",
                                "type": "string",
                                "enum": ["LOREM", "HEART", "IPSUM_CENTER", "SECURITY", "BAR", "FOO", "BUDDY", "BONUS"]
                              },
                              "partyRole": {
                                "title": "Party Role",
                                "type": "string",
                                "enum": [
                                  "CUSTOMER",
                                  "INSURED",
                                  "ADDITIONAL_INSURED",
                                  "NAMED_DRIVER",
                                  "PRIMARY_CONTACT",
                                  "SECONDARY_CONTACT",
                                  "AUTHORISER",
                                  "NAMED_PARTY"
                                ]
                              }
                            }
                          },
                          "generalCover": {
                            "title": "General Cover",
                            "description": "Elements common to various types of Liablility",
                            "type": "object",
                            "properties": {
                              "numberOfSites": {
                                "type": "integer"
                              },
                              "numberOfEmployees": {
                                "type": "number"
                              },
                              "numberOfYearsInBusiness": {
                                "type": "number"
                              },
                              "turnover": {
                                "type": "number"
                              },
                              "estimatedTurnover": {
                                "type": "number"
                              },
                              "lastTurnover": {
                                "type": "number"
                              },
                              "estimatedLastTurnover": {
                                "type": "number"
                              },
                              "indemnityPeriod": {
                                "type": "integer"
                              },
                              "retroactiveDate": {
                                "title": "Date Time Extended",
                                "type": "object",
                                "properties": {
                                  "value": {
                                    "type": "string",
                                    "format": "date-time"
                                  },
                                  "format": {
                                    "type": "string",
                                    "enum": [
                                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                      "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                      "yyyy-MM-dd'T'HH:mm'Z'",
                                      "yyyy-MM-dd'T'HH",
                                      "yyyy-MM-dd",
                                      "yyyy-MM",
                                      "yyyy"
                                    ]
                                  },
                                  "minValue": {
                                    "type": "string"
                                  },
                                  "maxValue": {
                                    "type": "string"
                                  },
                                  "defaultValue": {
                                    "type": "string"
                                  }
                                },
                                "required": ["value"]
                              },
                              "retroactiveType": {
                                "type": "string"
                              },
                              "materialChange": {
                                "type": "string"
                              },
                              "declarationDate": {
                                "title": "Date Time Extended",
                                "type": "object",
                                "properties": {
                                  "value": {
                                    "type": "string",
                                    "format": "date-time"
                                  },
                                  "format": {
                                    "type": "string",
                                    "enum": [
                                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                      "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                      "yyyy-MM-dd'T'HH:mm'Z'",
                                      "yyyy-MM-dd'T'HH",
                                      "yyyy-MM-dd",
                                      "yyyy-MM",
                                      "yyyy"
                                    ]
                                  },
                                  "minValue": {
                                    "type": "string"
                                  },
                                  "maxValue": {
                                    "type": "string"
                                  },
                                  "defaultValue": {
                                    "type": "string"
                                  }
                                },
                                "required": ["value"]
                              },
                              "continuityDate": {
                                "title": "Date Time Extended",
                                "type": "object",
                                "properties": {
                                  "value": {
                                    "type": "string",
                                    "format": "date-time"
                                  },
                                  "format": {
                                    "type": "string",
                                    "enum": [
                                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                      "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                      "yyyy-MM-dd'T'HH:mm'Z'",
                                      "yyyy-MM-dd'T'HH",
                                      "yyyy-MM-dd",
                                      "yyyy-MM",
                                      "yyyy"
                                    ]
                                  },
                                  "minValue": {
                                    "type": "string"
                                  },
                                  "maxValue": {
                                    "type": "string"
                                  },
                                  "defaultValue": {
                                    "type": "string"
                                  }
                                },
                                "required": ["value"]
                              },
                              "eligibilityPeriod": {
                                "title": "Time Period",
                                "type": "object",
                                "properties": {
                                  "startDate": {
                                    "title": "Date Time Extended",
                                    "type": "object",
                                    "properties": {
                                      "value": {
                                        "type": "string",
                                        "format": "date-time"
                                      },
                                      "format": {
                                        "type": "string",
                                        "enum": [
                                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                          "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                          "yyyy-MM-dd'T'HH:mm'Z'",
                                          "yyyy-MM-dd'T'HH",
                                          "yyyy-MM-dd",
                                          "yyyy-MM",
                                          "yyyy"
                                        ]
                                      },
                                      "minValue": {
                                        "type": "string"
                                      },
                                      "maxValue": {
                                        "type": "string"
                                      },
                                      "defaultValue": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["value"]
                                  },
                                  "endDate": {
                                    "title": "Date Time Extended",
                                    "type": "object",
                                    "properties": {
                                      "value": {
                                        "type": "string",
                                        "format": "date-time"
                                      },
                                      "format": {
                                        "type": "string",
                                        "enum": [
                                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                          "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                          "yyyy-MM-dd'T'HH:mm'Z'",
                                          "yyyy-MM-dd'T'HH",
                                          "yyyy-MM-dd",
                                          "yyyy-MM",
                                          "yyyy"
                                        ]
                                      },
                                      "minValue": {
                                        "type": "string"
                                      },
                                      "maxValue": {
                                        "type": "string"
                                      },
                                      "defaultValue": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["value"]
                                  },
                                  "length": {
                                    "type": "number"
                                  },
                                  "lengthUnit": {
                                    "type": "string",
                                    "enum": ["HOURS", "DAYS", "WEEKS", "MONTHS", "YEARS"]
                                  },
                                  "description": {
                                    "type": "string"
                                  }
                                }
                              },
                              "extendedReportingPeriod": {
                                "title": "Time Period",
                                "type": "object",
                                "properties": {
                                  "startDate": {
                                    "title": "Date Time Extended",
                                    "type": "object",
                                    "properties": {
                                      "value": {
                                        "type": "string",
                                        "format": "date-time"
                                      },
                                      "format": {
                                        "type": "string",
                                        "enum": [
                                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                          "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                          "yyyy-MM-dd'T'HH:mm'Z'",
                                          "yyyy-MM-dd'T'HH",
                                          "yyyy-MM-dd",
                                          "yyyy-MM",
                                          "yyyy"
                                        ]
                                      },
                                      "minValue": {
                                        "type": "string"
                                      },
                                      "maxValue": {
                                        "type": "string"
                                      },
                                      "defaultValue": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["value"]
                                  },
                                  "endDate": {
                                    "title": "Date Time Extended",
                                    "type": "object",
                                    "properties": {
                                      "value": {
                                        "type": "string",
                                        "format": "date-time"
                                      },
                                      "format": {
                                        "type": "string",
                                        "enum": [
                                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                          "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                          "yyyy-MM-dd'T'HH:mm'Z'",
                                          "yyyy-MM-dd'T'HH",
                                          "yyyy-MM-dd",
                                          "yyyy-MM",
                                          "yyyy"
                                        ]
                                      },
                                      "minValue": {
                                        "type": "string"
                                      },
                                      "maxValue": {
                                        "type": "string"
                                      },
                                      "defaultValue": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["value"]
                                  },
                                  "length": {
                                    "type": "number"
                                  },
                                  "lengthUnit": {
                                    "type": "string",
                                    "enum": ["HOURS", "DAYS", "WEEKS", "MONTHS", "YEARS"]
                                  },
                                  "description": {
                                    "type": "string"
                                  }
                                }
                              },
                              "businessDescription": {
                                "type": "string"
                              },
                              "productTerritory": {
                                "type": "string"
                              },
                              "jurisdiction": {
                                "type": "string"
                              },
                              "contractDescription": {
                                "type": "string"
                              },
                              "otherInsuredEntities": {
                                "type": "object",
                                "properties": {
                                  "name": {
                                    "type": "string"
                                  },
                                  "insuredType": {
                                    "type": "string",
                                    "enum": ["UNKNOWN", "PRINCIPLE", "CONTRACTOR", "SUB_CONTRACTOR"]
                                  }
                                }
                              },
                              "maintenancePeriod": {
                                "title": "Time Period",
                                "type": "object",
                                "properties": {
                                  "startDate": {
                                    "title": "Date Time Extended",
                                    "type": "object",
                                    "properties": {
                                      "value": {
                                        "type": "string",
                                        "format": "date-time"
                                      },
                                      "format": {
                                        "type": "string",
                                        "enum": [
                                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                          "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                          "yyyy-MM-dd'T'HH:mm'Z'",
                                          "yyyy-MM-dd'T'HH",
                                          "yyyy-MM-dd",
                                          "yyyy-MM",
                                          "yyyy"
                                        ]
                                      },
                                      "minValue": {
                                        "type": "string"
                                      },
                                      "maxValue": {
                                        "type": "string"
                                      },
                                      "defaultValue": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["value"]
                                  },
                                  "endDate": {
                                    "title": "Date Time Extended",
                                    "type": "object",
                                    "properties": {
                                      "value": {
                                        "type": "string",
                                        "format": "date-time"
                                      },
                                      "format": {
                                        "type": "string",
                                        "enum": [
                                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                          "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                          "yyyy-MM-dd'T'HH:mm'Z'",
                                          "yyyy-MM-dd'T'HH",
                                          "yyyy-MM-dd",
                                          "yyyy-MM",
                                          "yyyy"
                                        ]
                                      },
                                      "minValue": {
                                        "type": "string"
                                      },
                                      "maxValue": {
                                        "type": "string"
                                      },
                                      "defaultValue": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["value"]
                                  },
                                  "length": {
                                    "type": "number"
                                  },
                                  "lengthUnit": {
                                    "type": "string",
                                    "enum": ["HOURS", "DAYS", "WEEKS", "MONTHS", "YEARS"]
                                  },
                                  "description": {
                                    "type": "string"
                                  }
                                }
                              },
                              "constructionPeriod": {
                                "title": "Time Period",
                                "type": "object",
                                "properties": {
                                  "startDate": {
                                    "title": "Date Time Extended",
                                    "type": "object",
                                    "properties": {
                                      "value": {
                                        "type": "string",
                                        "format": "date-time"
                                      },
                                      "format": {
                                        "type": "string",
                                        "enum": [
                                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                          "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                          "yyyy-MM-dd'T'HH:mm'Z'",
                                          "yyyy-MM-dd'T'HH",
                                          "yyyy-MM-dd",
                                          "yyyy-MM",
                                          "yyyy"
                                        ]
                                      },
                                      "minValue": {
                                        "type": "string"
                                      },
                                      "maxValue": {
                                        "type": "string"
                                      },
                                      "defaultValue": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["value"]
                                  },
                                  "endDate": {
                                    "title": "Date Time Extended",
                                    "type": "object",
                                    "properties": {
                                      "value": {
                                        "type": "string",
                                        "format": "date-time"
                                      },
                                      "format": {
                                        "type": "string",
                                        "enum": [
                                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                          "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                          "yyyy-MM-dd'T'HH:mm'Z'",
                                          "yyyy-MM-dd'T'HH",
                                          "yyyy-MM-dd",
                                          "yyyy-MM",
                                          "yyyy"
                                        ]
                                      },
                                      "minValue": {
                                        "type": "string"
                                      },
                                      "maxValue": {
                                        "type": "string"
                                      },
                                      "defaultValue": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["value"]
                                  },
                                  "length": {
                                    "type": "number"
                                  },
                                  "lengthUnit": {
                                    "type": "string",
                                    "enum": ["HOURS", "DAYS", "WEEKS", "MONTHS", "YEARS"]
                                  },
                                  "description": {
                                    "type": "string"
                                  }
                                }
                              },
                              "constructionType": {
                                "type": "string"
                              },
                              "constructionDate": {
                                "title": "Date Only Extended",
                                "type": "object",
                                "properties": {
                                  "value": {
                                    "type": "string",
                                    "format": "date"
                                  },
                                  "format": {
                                    "type": "string",
                                    "enum": ["yyyy-MM-dd", "yyyy-MM", "yyyy"]
                                  }
                                },
                                "required": ["value"]
                              }
                            }
                          },
                          "settlementBasis": {
                            "type": "string",
                            "enum": ["AGREED_VALUE", "FIXED_VALUE", "MARKET_VALUE", "SUM_INSURED"],
                            "description": "The basis on which the confirmation would be settled on this risk"
                          },
                          "isDisabled": {
                            "type": "boolean",
                            "description": "Used mainly for Quote UI where the user can enable/disable the risks in UI"
                          },
                          "financialServicesProduct": {
                            "type": "object",
                            "properties": {
                              "wordingCode": {
                                "type": "string",
                                "description": "Only use when necessary to override the wording code at insuredRisk Group level. e.g. Lorem liability risks which have different wording for each risk within the same group"
                              }
                            }
                          },
                          "isRiskTransitioning": {
                            "type": "boolean",
                            "description": "Only used for Rating renewals. Indicates if the risk is transitioning from one rating engine to another"
                          },
                          "deferments": {
                            "type": "array",
                            "items": {
                              "title": "Deferment",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "type": "string",
                                  "description": "Code used in System of record"
                                },
                                "name": {
                                  "type": "string"
                                },
                                "category": {
                                  "type": "string"
                                },
                                "description": {
                                  "type": "string",
                                  "enum": ["STANDARD", "VOLUNTARY", "IMPOSED"]
                                },
                                "length": {
                                  "type": "number"
                                },
                                "period": {
                                  "type": "string",
                                  "enum": ["HOURS", "DAYS", "WEEKS", "MONTHS"]
                                }
                              }
                            }
                          },
                          "namedParties": {
                            "type": "object",
                            "properties": {
                              "partyId": {
                                "type": "string"
                              },
                              "systemOfRecord": {
                                "title": "System Of Record",
                                "type": "string",
                                "enum": ["LOREM", "HEART", "IPSUM_CENTER", "SECURITY", "BAR", "FOO", "BUDDY", "BONUS"]
                              },
                              "partyRole": {
                                "title": "Party Role",
                                "type": "string",
                                "enum": [
                                  "CUSTOMER",
                                  "INSURED",
                                  "ADDITIONAL_INSURED",
                                  "NAMED_DRIVER",
                                  "PRIMARY_CONTACT",
                                  "SECONDARY_CONTACT",
                                  "AUTHORISER",
                                  "NAMED_PARTY"
                                ]
                              }
                            }
                          }
                        }
                      }
                    },
                    "financialServicesProduct": {
                      "title": "Contract Specification",
                      "description": "The representation of the rules governing the commitments a financial services provider has a business interest in.",
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "code": {
                          "type": "string",
                          "description": "System of record code. At policy level this is the package code. At insured Risk Group level, this is Risk Specification class, eg. For HEART  \"PEC\", \"PES\" etc."
                        },
                        "description": {
                          "description": "Policy wording",
                          "type": "string"
                        },
                        "wordingCode": {
                          "type": "string"
                        },
                        "conditions": {
                          "description": "",
                          "type": "array",
                          "items": {
                            "title": "Peril Category",
                            "description": "",
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string"
                              },
                              "code": {
                                "type": "string"
                              },
                              "value": {
                                "type": "string"
                              },
                              "description": {
                                "type": "string"
                              },
                              "subCategories": {
                                "description": "",
                                "type": "array",
                                "items": {
                                  "title": "Peril Category",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "name": {
                                      "type": "string"
                                    },
                                    "code": {
                                      "type": "string"
                                    },
                                    "value": {
                                      "type": "string"
                                    },
                                    "description": {
                                      "type": "string"
                                    },
                                    "subCategories": {
                                      "description": "",
                                      "type": "array",
                                      "items": {
                                        "$ref": "#/definitions/peril-category"
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "coverageClasses": {
                          "description": "",
                          "type": "array",
                          "items": {
                            "title": "Peril Category",
                            "description": "",
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string"
                              },
                              "code": {
                                "type": "string"
                              },
                              "value": {
                                "type": "string"
                              },
                              "description": {
                                "type": "string"
                              },
                              "subCategories": {
                                "description": "",
                                "type": "array",
                                "items": {
                                  "title": "Peril Category",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "name": {
                                      "type": "string"
                                    },
                                    "code": {
                                      "type": "string"
                                    },
                                    "value": {
                                      "type": "string"
                                    },
                                    "description": {
                                      "type": "string"
                                    },
                                    "subCategories": {
                                      "description": "",
                                      "type": "array",
                                      "items": {
                                        "$ref": "#/definitions/peril-category"
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "exclusions": {
                          "description": "",
                          "type": "array",
                          "items": {
                            "title": "Peril Category",
                            "description": "",
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string"
                              },
                              "code": {
                                "type": "string"
                              },
                              "value": {
                                "type": "string"
                              },
                              "description": {
                                "type": "string"
                              },
                              "subCategories": {
                                "description": "",
                                "type": "array",
                                "items": {
                                  "title": "Peril Category",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "name": {
                                      "type": "string"
                                    },
                                    "code": {
                                      "type": "string"
                                    },
                                    "value": {
                                      "type": "string"
                                    },
                                    "description": {
                                      "type": "string"
                                    },
                                    "subCategories": {
                                      "description": "",
                                      "type": "array",
                                      "items": {
                                        "$ref": "#/definitions/peril-category"
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "productVersion": {
                          "type": "string"
                        },
                        "ratingBrand": {
                          "type": "string"
                        },
                        "ratingLine": {
                          "type": "string",
                          "enum": ["PERSONAL", "COMMERCIAL"]
                        },
                        "ratingProductName": {
                          "type": "string"
                        },
                        "isRural": {
                          "type": "boolean"
                        }
                      }
                    },
                    "questionAnswers": {
                      "type": "array",
                      "items": {
                        "title": "Question Instance",
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "QuestionInstance ID"
                          },
                          "question": {
                            "title": "Application Question",
                            "allOf": [
                              {
                                "title": "Question Output",
                                "allOf": [
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "description": "Internal unique id generated by our DB or system"
                                      }
                                    },
                                    "required": ["id"]
                                  },
                                  {
                                    "title": "Question Base",
                                    "type": "object",
                                    "properties": {
                                      "questionType": {
                                        "type": "string",
                                        "enum": ["GROUP", "QUESTION", "HIDDEN"]
                                      },
                                      "text": {
                                        "type": "string",
                                        "description": "Text displayed on the Label"
                                      },
                                      "subText": {
                                        "type": "string",
                                        "description": "Additional helper text for the question"
                                      },
                                      "helpText": {
                                        "type": "string"
                                      },
                                      "answerType": {
                                        "type": "object",
                                        "properties": {
                                          "dataType": {
                                            "type": "string",
                                            "description": "DataType of the answer. Can be a simple dataType or complex dataType like Vehicle. Some possible types are: string, decimal, boolean, enum, int, date, money"
                                          },
                                          "minValue": {
                                            "type": "string"
                                          },
                                          "maxValue": {
                                            "type": "string"
                                          },
                                          "regEx": {
                                            "type": "string",
                                            "description": "Acceptable format for the String dataType"
                                          },
                                          "minLength": {
                                            "type": "integer"
                                          },
                                          "maxLength": {
                                            "type": "integer",
                                            "description": "Maximum number of characters for string dataType"
                                          },
                                          "enumValues": {
                                            "type": "array",
                                            "description": "Values to be shown for enum DataType",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "value": {
                                                  "type": "string",
                                                  "description": "value that is stored at the backend"
                                                },
                                                "description": {
                                                  "type": "string",
                                                  "description": "Value that is shown to the user on UI"
                                                },
                                                "isDefault": {
                                                  "type": "boolean",
                                                  "description": "Whether the current value should be preselected for the user as default value"
                                                }
                                              },
                                              "required": ["value", "description"]
                                            }
                                          },
                                          "multiSelect": {
                                            "type": "boolean",
                                            "description": "Applicable only if the dataType is enum"
                                          },
                                          "customSource": {
                                            "type": "string",
                                            "description": "API endpoint for getting custom Data "
                                          },
                                          "defaultValue": {
                                            "type": "string"
                                          },
                                          "placeHolder": {
                                            "type": "string"
                                          },
                                          "isRequired": {
                                            "type": "boolean"
                                          },
                                          "format": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["dataType"]
                                      },
                                      "effectiveDate": {
                                        "type": "string",
                                        "format": "date",
                                        "description": "Date from which this question will become effective or active"
                                      },
                                      "expiryDate": {
                                        "type": "string",
                                        "format": "date",
                                        "description": "Date from which this question will expire or become inactive"
                                      }
                                    },
                                    "required": ["questionType"]
                                  }
                                ]
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "askOnce": {
                                    "type": "boolean"
                                  },
                                  "priority": {
                                    "type": "integer"
                                  },
                                  "maxOccurs": {
                                    "type": "integer"
                                  },
                                  "stageOfProcess": {
                                    "title": "Stage Of Process",
                                    "type": "string",
                                    "description": "",
                                    "enum": [
                                      "NEEDS_ANALYSIS",
                                      "COVER_SELECT",
                                      "PRODUCT_QUESTIONS",
                                      "QUOTE",
                                      "DECLARATIONS",
                                      "CONTACT",
                                      "PAYMENT",
                                      "CONFIRMATION"
                                    ]
                                  }
                                }
                              }
                            ]
                          },
                          "productInstanceIds": {
                            "type": "array",
                            "description": "ProductInstances for which this question is applicable",
                            "items": {
                              "type": "string"
                            }
                          },
                          "answer": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          },
                          "answeredOn": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "questionInstances": {
                            "type": "array",
                            "items": {
                              "$ref": "#/definitions/question-instance"
                            }
                          },
                          "askIf": {
                            "type": "array",
                            "description": "Only ask this question if the conditions in the array are satisfied",
                            "items": {
                              "type": "object",
                              "properties": {
                                "questionInstanceId": {
                                  "type": "string",
                                  "description": "Link to the Question Instance ID which is to be compared"
                                },
                                "operator": {
                                  "type": "string",
                                  "description": "Operator to use for comparision e.g. =, <, >, <= etc."
                                },
                                "value": {
                                  "type": "string",
                                  "description": "Value to compare against"
                                },
                                "path": {
                                  "type": "string"
                                },
                                "stageOfProcess": {
                                  "title": "Stage Of Process",
                                  "type": "string",
                                  "description": "",
                                  "enum": [
                                    "NEEDS_ANALYSIS",
                                    "COVER_SELECT",
                                    "PRODUCT_QUESTIONS",
                                    "QUOTE",
                                    "DECLARATIONS",
                                    "CONTACT",
                                    "PAYMENT",
                                    "CONFIRMATION"
                                  ]
                                }
                              }
                            }
                          },
                          "askIfSetOperator": {
                            "type": "string",
                            "enum": ["ALL_OF", "ANY_OF"]
                          }
                        }
                      }
                    },
                    "benefits": {
                      "type": "array",
                      "items": {
                        "title": "Benefit",
                        "description": "TODO: (Find this in GW??) This includes sum insured and/or limits like weekly rental",
                        "type": "object",
                        "properties": {
                          "amount": {
                            "title": "Amount Extended",
                            "type": "object",
                            "properties": {
                              "amount": {
                                "type": "number"
                              },
                              "currencyCode": {
                                "type": "string"
                              },
                              "isGSTInclusive": {
                                "type": "boolean"
                              },
                              "GSTAmount": {
                                "type": "number"
                              },
                              "GSTPercentageApplicable": {
                                "type": "number"
                              },
                              "description": {
                                "type": "string"
                              }
                            },
                            "required": ["amount"]
                          },
                          "category": {
                            "type": "string",
                            "description": "eg. SumInsured, ComponentSumInsured,  RiskSumInsured"
                          },
                          "code": {
                            "type": "string"
                          },
                          "limits": {
                            "description": "",
                            "type": "array",
                            "items": {
                              "title": "Limit",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "startDate": {
                                  "title": "Date Time Extended",
                                  "type": "object",
                                  "properties": {
                                    "value": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "format": {
                                      "type": "string",
                                      "enum": [
                                        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                        "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                        "yyyy-MM-dd'T'HH:mm'Z'",
                                        "yyyy-MM-dd'T'HH",
                                        "yyyy-MM-dd",
                                        "yyyy-MM",
                                        "yyyy"
                                      ]
                                    },
                                    "minValue": {
                                      "type": "string"
                                    },
                                    "maxValue": {
                                      "type": "string"
                                    },
                                    "defaultValue": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["value"]
                                },
                                "endDate": {
                                  "title": "Date Time Extended",
                                  "type": "object",
                                  "properties": {
                                    "value": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "format": {
                                      "type": "string",
                                      "enum": [
                                        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                        "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                        "yyyy-MM-dd'T'HH:mm'Z'",
                                        "yyyy-MM-dd'T'HH",
                                        "yyyy-MM-dd",
                                        "yyyy-MM",
                                        "yyyy"
                                      ]
                                    },
                                    "minValue": {
                                      "type": "string"
                                    },
                                    "maxValue": {
                                      "type": "string"
                                    },
                                    "defaultValue": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["value"]
                                },
                                "name": {
                                  "type": "string",
                                  "description": "Label or text displayed on GUI"
                                },
                                "code": {
                                  "type": "string",
                                  "description": "Value used for mapping at the backend system"
                                },
                                "category": {
                                  "description": "Examples includeHome,ContentsSpecified ItemsOptional CoverRental Amount, DailyConfirmationableAmount",
                                  "type": "string"
                                },
                                "description": {
                                  "type": "string"
                                },
                                "value": {
                                  "type": "string",
                                  "description": "This represents the percentage of requested sum insured"
                                },
                                "limitNumber": {
                                  "type": "string"
                                },
                                "coverageType": {
                                  "type": "string",
                                  "description": "conformed value"
                                }
                              }
                            }
                          },
                          "description": {
                            "type": "string"
                          },
                          "value": {
                            "type": "string"
                          },
                          "premiumClass": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "discounts": {
                      "type": "array",
                      "items": {
                        "title": "Discount",
                        "description": "",
                        "type": "object",
                        "properties": {
                          "code": {
                            "type": "string",
                            "description": "Code used in System of Record, if available"
                          },
                          "name": {
                            "type": "string",
                            "description": "Specific to System of Record"
                          },
                          "value": {
                            "type": "string"
                          },
                          "discountType": {
                            "type": "string",
                            "enum": ["PERCENT", "RATE", "DOLLAR_AMOUNT", "OTHER"]
                          },
                          "amount": {
                            "title": "Amount Extended",
                            "type": "object",
                            "properties": {
                              "amount": {
                                "type": "number"
                              },
                              "currencyCode": {
                                "type": "string"
                              },
                              "isGSTInclusive": {
                                "type": "boolean"
                              },
                              "GSTAmount": {
                                "type": "number"
                              },
                              "GSTPercentageApplicable": {
                                "type": "number"
                              },
                              "description": {
                                "type": "string"
                              }
                            },
                            "required": ["amount"]
                          },
                          "priority": {
                            "type": "integer",
                            "description": "Order in which the discount is applied"
                          }
                        },
                        "required": ["discountType"]
                      }
                    },
                    "excesses": {
                      "type": "array",
                      "items": {
                        "title": "Excess",
                        "description": "",
                        "type": "object",
                        "properties": {
                          "code": {
                            "type": "string",
                            "description": "code used in System of Record, if available"
                          },
                          "name": {
                            "type": "string",
                            "description": "Specific to System of Record"
                          },
                          "excessCategory": {
                            "type": "string",
                            "enum": [
                              "STANDARD",
                              "VOLUNTARY",
                              "IMPOSED",
                              "NAMED_DRIVER",
                              "COVERAGE_ITEM",
                              "THEFT",
                              "NAMED_DRIVER_IMPOSED",
                              "UNNAMED_DRIVER_IMPOSED",
                              "UNNAMED_DRIVER",
                              "SPECIAL",
                              "SPECIAL_IMPOSED"
                            ]
                          },
                          "minimumAmount": {
                            "title": "Amount Extended",
                            "type": "object",
                            "properties": {
                              "amount": {
                                "type": "number"
                              },
                              "currencyCode": {
                                "type": "string"
                              },
                              "isGSTInclusive": {
                                "type": "boolean"
                              },
                              "GSTAmount": {
                                "type": "number"
                              },
                              "GSTPercentageApplicable": {
                                "type": "number"
                              },
                              "description": {
                                "type": "string"
                              }
                            },
                            "required": ["amount"]
                          },
                          "maximumAmount": {
                            "title": "Amount Extended",
                            "type": "object",
                            "properties": {
                              "amount": {
                                "type": "number"
                              },
                              "currencyCode": {
                                "type": "string"
                              },
                              "isGSTInclusive": {
                                "type": "boolean"
                              },
                              "GSTAmount": {
                                "type": "number"
                              },
                              "GSTPercentageApplicable": {
                                "type": "number"
                              },
                              "description": {
                                "type": "string"
                              }
                            },
                            "required": ["amount"]
                          },
                          "references": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "namespace": {
                                  "type": "string",
                                  "enum": ["NAMED_DRIVER_ID"]
                                },
                                "identifier": {
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "value": {
                            "type": "string",
                            "description": "TODO - may not be required"
                          },
                          "tier": {
                            "type": "string",
                            "description": "TODO - may not be required"
                          },
                          "rate": {
                            "type": "number"
                          }
                        },
                        "required": ["excessCategory"]
                      }
                    },
                    "rates": {
                      "type": "array",
                      "items": {
                        "title": "Rate",
                        "description": "",
                        "type": "object",
                        "properties": {
                          "amount": {
                            "title": "Amount Extended",
                            "type": "object",
                            "properties": {
                              "amount": {
                                "type": "number"
                              },
                              "currencyCode": {
                                "type": "string"
                              },
                              "isGSTInclusive": {
                                "type": "boolean"
                              },
                              "GSTAmount": {
                                "type": "number"
                              },
                              "GSTPercentageApplicable": {
                                "type": "number"
                              },
                              "description": {
                                "type": "string"
                              }
                            },
                            "required": ["amount"]
                          },
                          "startDate": {
                            "title": "Date Time Extended",
                            "type": "object",
                            "properties": {
                              "value": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "format": {
                                "type": "string",
                                "enum": [
                                  "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                  "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                  "yyyy-MM-dd'T'HH:mm'Z'",
                                  "yyyy-MM-dd'T'HH",
                                  "yyyy-MM-dd",
                                  "yyyy-MM",
                                  "yyyy"
                                ]
                              },
                              "minValue": {
                                "type": "string"
                              },
                              "maxValue": {
                                "type": "string"
                              },
                              "defaultValue": {
                                "type": "string"
                              }
                            },
                            "required": ["value"]
                          },
                          "endDate": {
                            "title": "Date Time Extended",
                            "type": "object",
                            "properties": {
                              "value": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "format": {
                                "type": "string",
                                "enum": [
                                  "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                  "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                  "yyyy-MM-dd'T'HH:mm'Z'",
                                  "yyyy-MM-dd'T'HH",
                                  "yyyy-MM-dd",
                                  "yyyy-MM",
                                  "yyyy"
                                ]
                              },
                              "minValue": {
                                "type": "string"
                              },
                              "maxValue": {
                                "type": "string"
                              },
                              "defaultValue": {
                                "type": "string"
                              }
                            },
                            "required": ["value"]
                          },
                          "name": {
                            "type": "string"
                          },
                          "code": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "exposureGrade": {
                      "type": "string",
                      "enum": [
                        "ZERO_AT_FAULT_LAST_3_YEARS",
                        "ONE_AT_FAULT_LAST_3_YEARS",
                        "TWO_AT_FAULT_LAST_3_YEARS",
                        "NO_PREVIOUS_HISTORY",
                        "THREEPLUS_AT_FAULT_LAST_3_YEARS"
                      ]
                    },
                    "exposureAmount": {
                      "type": "number",
                      "description": "TODO: can we delete this "
                    },
                    "premiumDetails": {
                      "type": "array",
                      "items": {
                        "title": "Premium Detail",
                        "type": "object",
                        "properties": {
                          "category": {
                            "type": "string"
                          },
                          "code": {
                            "type": "string"
                          },
                          "writtenPremium": {
                            "title": "Premium",
                            "description": "",
                            "type": "object",
                            "properties": {
                              "companyPremium": {
                                "type": "number",
                                "description": "Company Premium"
                              },
                              "naturalDisasterPremium": {
                                "type": "number"
                              },
                              "earthquakeLevy": {
                                "type": "number",
                                "description": "EQC Levy"
                              },
                              "fireServiceLevy": {
                                "type": "number",
                                "description": "Fire Service Levy"
                              },
                              "gst": {
                                "type": "number",
                                "description": "GST Amount"
                              },
                              "instalmentCharge": {
                                "type": "number"
                              },
                              "adminCharge": {
                                "type": "number",
                                "description": "Admin Charge"
                              },
                              "commissionRate": {
                                "type": "number",
                                "description": "Commission Rate"
                              },
                              "minimumPremiumUsed": {
                                "type": "boolean"
                              },
                              "naturalDisasterCommission": {
                                "type": "number"
                              },
                              "terrorTotalTransactionCost": {
                                "type": "number"
                              },
                              "commissionAmount": {
                                "type": "number"
                              },
                              "commissionGST": {
                                "type": "number"
                              },
                              "totalPremium": {
                                "type": "number"
                              },
                              "businessPremium": {
                                "type": "number"
                              },
                              "cappingAndCupping": {
                                "type": "object",
                                "properties": {
                                  "premiumAmount": {
                                    "title": "Amount Extended",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "type": "number"
                                      },
                                      "currencyCode": {
                                        "type": "string"
                                      },
                                      "isGSTInclusive": {
                                        "type": "boolean"
                                      },
                                      "GSTAmount": {
                                        "type": "number"
                                      },
                                      "GSTPercentageApplicable": {
                                        "type": "number"
                                      },
                                      "description": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["amount"]
                                  },
                                  "adjustmentFactor": {
                                    "type": "number"
                                  },
                                  "premiumAdjustmentDueToOverride": {
                                    "title": "Amount Extended",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "type": "number"
                                      },
                                      "currencyCode": {
                                        "type": "string"
                                      },
                                      "isGSTInclusive": {
                                        "type": "boolean"
                                      },
                                      "GSTAmount": {
                                        "type": "number"
                                      },
                                      "GSTPercentageApplicable": {
                                        "type": "number"
                                      },
                                      "description": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["amount"]
                                  }
                                }
                              }
                            }
                          },
                          "annualisedPremium": {
                            "title": "Premium",
                            "description": "",
                            "type": "object",
                            "properties": {
                              "companyPremium": {
                                "type": "number",
                                "description": "Company Premium"
                              },
                              "naturalDisasterPremium": {
                                "type": "number"
                              },
                              "earthquakeLevy": {
                                "type": "number",
                                "description": "EQC Levy"
                              },
                              "fireServiceLevy": {
                                "type": "number",
                                "description": "Fire Service Levy"
                              },
                              "gst": {
                                "type": "number",
                                "description": "GST Amount"
                              },
                              "instalmentCharge": {
                                "type": "number"
                              },
                              "adminCharge": {
                                "type": "number",
                                "description": "Admin Charge"
                              },
                              "commissionRate": {
                                "type": "number",
                                "description": "Commission Rate"
                              },
                              "minimumPremiumUsed": {
                                "type": "boolean"
                              },
                              "naturalDisasterCommission": {
                                "type": "number"
                              },
                              "terrorTotalTransactionCost": {
                                "type": "number"
                              },
                              "commissionAmount": {
                                "type": "number"
                              },
                              "commissionGST": {
                                "type": "number"
                              },
                              "totalPremium": {
                                "type": "number"
                              },
                              "businessPremium": {
                                "type": "number"
                              },
                              "cappingAndCupping": {
                                "type": "object",
                                "properties": {
                                  "premiumAmount": {
                                    "title": "Amount Extended",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "type": "number"
                                      },
                                      "currencyCode": {
                                        "type": "string"
                                      },
                                      "isGSTInclusive": {
                                        "type": "boolean"
                                      },
                                      "GSTAmount": {
                                        "type": "number"
                                      },
                                      "GSTPercentageApplicable": {
                                        "type": "number"
                                      },
                                      "description": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["amount"]
                                  },
                                  "adjustmentFactor": {
                                    "type": "number"
                                  },
                                  "premiumAdjustmentDueToOverride": {
                                    "title": "Amount Extended",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "type": "number"
                                      },
                                      "currencyCode": {
                                        "type": "string"
                                      },
                                      "isGSTInclusive": {
                                        "type": "boolean"
                                      },
                                      "GSTAmount": {
                                        "type": "number"
                                      },
                                      "GSTPercentageApplicable": {
                                        "type": "number"
                                      },
                                      "description": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["amount"]
                                  }
                                }
                              }
                            }
                          },
                          "transactionPremium": {
                            "title": "Premium",
                            "description": "",
                            "type": "object",
                            "properties": {
                              "companyPremium": {
                                "type": "number",
                                "description": "Company Premium"
                              },
                              "naturalDisasterPremium": {
                                "type": "number"
                              },
                              "earthquakeLevy": {
                                "type": "number",
                                "description": "EQC Levy"
                              },
                              "fireServiceLevy": {
                                "type": "number",
                                "description": "Fire Service Levy"
                              },
                              "gst": {
                                "type": "number",
                                "description": "GST Amount"
                              },
                              "instalmentCharge": {
                                "type": "number"
                              },
                              "adminCharge": {
                                "type": "number",
                                "description": "Admin Charge"
                              },
                              "commissionRate": {
                                "type": "number",
                                "description": "Commission Rate"
                              },
                              "minimumPremiumUsed": {
                                "type": "boolean"
                              },
                              "naturalDisasterCommission": {
                                "type": "number"
                              },
                              "terrorTotalTransactionCost": {
                                "type": "number"
                              },
                              "commissionAmount": {
                                "type": "number"
                              },
                              "commissionGST": {
                                "type": "number"
                              },
                              "totalPremium": {
                                "type": "number"
                              },
                              "businessPremium": {
                                "type": "number"
                              },
                              "cappingAndCupping": {
                                "type": "object",
                                "properties": {
                                  "premiumAmount": {
                                    "title": "Amount Extended",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "type": "number"
                                      },
                                      "currencyCode": {
                                        "type": "string"
                                      },
                                      "isGSTInclusive": {
                                        "type": "boolean"
                                      },
                                      "GSTAmount": {
                                        "type": "number"
                                      },
                                      "GSTPercentageApplicable": {
                                        "type": "number"
                                      },
                                      "description": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["amount"]
                                  },
                                  "adjustmentFactor": {
                                    "type": "number"
                                  },
                                  "premiumAdjustmentDueToOverride": {
                                    "title": "Amount Extended",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "type": "number"
                                      },
                                      "currencyCode": {
                                        "type": "string"
                                      },
                                      "isGSTInclusive": {
                                        "type": "boolean"
                                      },
                                      "GSTAmount": {
                                        "type": "number"
                                      },
                                      "GSTPercentageApplicable": {
                                        "type": "number"
                                      },
                                      "description": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["amount"]
                                  }
                                }
                              }
                            }
                          },
                          "instalmentPremium": {
                            "title": "Premium",
                            "description": "",
                            "type": "object",
                            "properties": {
                              "companyPremium": {
                                "type": "number",
                                "description": "Company Premium"
                              },
                              "naturalDisasterPremium": {
                                "type": "number"
                              },
                              "earthquakeLevy": {
                                "type": "number",
                                "description": "EQC Levy"
                              },
                              "fireServiceLevy": {
                                "type": "number",
                                "description": "Fire Service Levy"
                              },
                              "gst": {
                                "type": "number",
                                "description": "GST Amount"
                              },
                              "instalmentCharge": {
                                "type": "number"
                              },
                              "adminCharge": {
                                "type": "number",
                                "description": "Admin Charge"
                              },
                              "commissionRate": {
                                "type": "number",
                                "description": "Commission Rate"
                              },
                              "minimumPremiumUsed": {
                                "type": "boolean"
                              },
                              "naturalDisasterCommission": {
                                "type": "number"
                              },
                              "terrorTotalTransactionCost": {
                                "type": "number"
                              },
                              "commissionAmount": {
                                "type": "number"
                              },
                              "commissionGST": {
                                "type": "number"
                              },
                              "totalPremium": {
                                "type": "number"
                              },
                              "businessPremium": {
                                "type": "number"
                              },
                              "cappingAndCupping": {
                                "type": "object",
                                "properties": {
                                  "premiumAmount": {
                                    "title": "Amount Extended",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "type": "number"
                                      },
                                      "currencyCode": {
                                        "type": "string"
                                      },
                                      "isGSTInclusive": {
                                        "type": "boolean"
                                      },
                                      "GSTAmount": {
                                        "type": "number"
                                      },
                                      "GSTPercentageApplicable": {
                                        "type": "number"
                                      },
                                      "description": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["amount"]
                                  },
                                  "adjustmentFactor": {
                                    "type": "number"
                                  },
                                  "premiumAdjustmentDueToOverride": {
                                    "title": "Amount Extended",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "type": "number"
                                      },
                                      "currencyCode": {
                                        "type": "string"
                                      },
                                      "isGSTInclusive": {
                                        "type": "boolean"
                                      },
                                      "GSTAmount": {
                                        "type": "number"
                                      },
                                      "GSTPercentageApplicable": {
                                        "type": "number"
                                      },
                                      "description": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["amount"]
                                  }
                                }
                              }
                            }
                          },
                          "initialPaymentPremium": {
                            "title": "Premium",
                            "description": "",
                            "type": "object",
                            "properties": {
                              "companyPremium": {
                                "type": "number",
                                "description": "Company Premium"
                              },
                              "naturalDisasterPremium": {
                                "type": "number"
                              },
                              "earthquakeLevy": {
                                "type": "number",
                                "description": "EQC Levy"
                              },
                              "fireServiceLevy": {
                                "type": "number",
                                "description": "Fire Service Levy"
                              },
                              "gst": {
                                "type": "number",
                                "description": "GST Amount"
                              },
                              "instalmentCharge": {
                                "type": "number"
                              },
                              "adminCharge": {
                                "type": "number",
                                "description": "Admin Charge"
                              },
                              "commissionRate": {
                                "type": "number",
                                "description": "Commission Rate"
                              },
                              "minimumPremiumUsed": {
                                "type": "boolean"
                              },
                              "naturalDisasterCommission": {
                                "type": "number"
                              },
                              "terrorTotalTransactionCost": {
                                "type": "number"
                              },
                              "commissionAmount": {
                                "type": "number"
                              },
                              "commissionGST": {
                                "type": "number"
                              },
                              "totalPremium": {
                                "type": "number"
                              },
                              "businessPremium": {
                                "type": "number"
                              },
                              "cappingAndCupping": {
                                "type": "object",
                                "properties": {
                                  "premiumAmount": {
                                    "title": "Amount Extended",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "type": "number"
                                      },
                                      "currencyCode": {
                                        "type": "string"
                                      },
                                      "isGSTInclusive": {
                                        "type": "boolean"
                                      },
                                      "GSTAmount": {
                                        "type": "number"
                                      },
                                      "GSTPercentageApplicable": {
                                        "type": "number"
                                      },
                                      "description": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["amount"]
                                  },
                                  "adjustmentFactor": {
                                    "type": "number"
                                  },
                                  "premiumAdjustmentDueToOverride": {
                                    "title": "Amount Extended",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "type": "number"
                                      },
                                      "currencyCode": {
                                        "type": "string"
                                      },
                                      "isGSTInclusive": {
                                        "type": "boolean"
                                      },
                                      "GSTAmount": {
                                        "type": "number"
                                      },
                                      "GSTPercentageApplicable": {
                                        "type": "number"
                                      },
                                      "description": {
                                        "type": "string"
                                      }
                                    },
                                    "required": ["amount"]
                                  }
                                }
                              }
                            }
                          },
                          "premiumClass": {
                            "type": "string"
                          },
                          "premiumFrequency": {
                            "title": "Premium Frequency",
                            "type": "string",
                            "description": "",
                            "enum": ["ANNUALLY", "QUARTERLY", "MONTHLY", "FORTNIGHTLY", "ONE_OFF", "HALF_YEARLY"]
                          }
                        }
                      }
                    },
                    "adjustments": {
                      "type": "array",
                      "items": {
                        "title": "Adjustment",
                        "description": "",
                        "type": "object",
                        "properties": {
                          "amount": {
                            "title": "Amount Extended",
                            "type": "object",
                            "properties": {
                              "amount": {
                                "type": "number"
                              },
                              "currencyCode": {
                                "type": "string"
                              },
                              "isGSTInclusive": {
                                "type": "boolean"
                              },
                              "GSTAmount": {
                                "type": "number"
                              },
                              "GSTPercentageApplicable": {
                                "type": "number"
                              },
                              "description": {
                                "type": "string"
                              }
                            },
                            "required": ["amount"]
                          },
                          "code": {
                            "type": "string",
                            "description": "code used in System of Record, if available"
                          },
                          "factor": {
                            "type": "string"
                          },
                          "reason": {
                            "type": "string"
                          },
                          "adjustmentType": {
                            "type": "string",
                            "enum": ["PERCENT", "RATE", "DOLLAR_AMOUNT"]
                          },
                          "name": {
                            "type": "string",
                            "description": "Specific to System of Record"
                          },
                          "priority": {
                            "type": "integer",
                            "description": "Order in which the discount is applied"
                          }
                        },
                        "required": ["adjustmentType"]
                      }
                    },
                    "coverageItems": {
                      "type": "array",
                      "items": {
                        "title": "Coverage Item",
                        "type": "object",
                        "properties": {
                          "itemNumber": {
                            "type": "string",
                            "description": "Identifies the instance of Coverage Item in the System of Record. e.g. Contents risk having multiple jewelry items, each with same coverage item code, itemNumber uniquely identifies a particular jewelry item"
                          },
                          "coverageCode": {
                            "type": "string",
                            "description": "Code that is used in the System of Record eg. in *HEART* these are extensions or property peril codes"
                          },
                          "coverageName": {
                            "type": "string",
                            "description": "eg. if coverageCode is **JWL** from *HEART* the  coverageName will be **Jewellery**"
                          },
                          "itemDescription": {
                            "type": "string",
                            "description": "This is the fre text field in the core System of Records that describes the item eg. 18ct wedding ring"
                          },
                          "isBaseCoverage": {
                            "type": "boolean"
                          },
                          "category": {
                            "type": "string",
                            "description": "Value of 'Optional' indicates to confirmation center if the coverageItem is to be treated as a coverage or an extension"
                          },
                          "benefits": {
                            "type": "array",
                            "items": {
                              "title": "Benefit",
                              "description": "TODO: (Find this in GW??) This includes sum insured and/or limits like weekly rental",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "category": {
                                  "type": "string",
                                  "description": "eg. SumInsured, ComponentSumInsured,  RiskSumInsured"
                                },
                                "code": {
                                  "type": "string"
                                },
                                "limits": {
                                  "description": "",
                                  "type": "array",
                                  "items": {
                                    "title": "Limit",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "amount": {
                                        "title": "Amount Extended",
                                        "type": "object",
                                        "properties": {
                                          "amount": {
                                            "type": "number"
                                          },
                                          "currencyCode": {
                                            "type": "string"
                                          },
                                          "isGSTInclusive": {
                                            "type": "boolean"
                                          },
                                          "GSTAmount": {
                                            "type": "number"
                                          },
                                          "GSTPercentageApplicable": {
                                            "type": "number"
                                          },
                                          "description": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["amount"]
                                      },
                                      "startDate": {
                                        "title": "Date Time Extended",
                                        "type": "object",
                                        "properties": {
                                          "value": {
                                            "type": "string",
                                            "format": "date-time"
                                          },
                                          "format": {
                                            "type": "string",
                                            "enum": [
                                              "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                              "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                              "yyyy-MM-dd'T'HH:mm'Z'",
                                              "yyyy-MM-dd'T'HH",
                                              "yyyy-MM-dd",
                                              "yyyy-MM",
                                              "yyyy"
                                            ]
                                          },
                                          "minValue": {
                                            "type": "string"
                                          },
                                          "maxValue": {
                                            "type": "string"
                                          },
                                          "defaultValue": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["value"]
                                      },
                                      "endDate": {
                                        "title": "Date Time Extended",
                                        "type": "object",
                                        "properties": {
                                          "value": {
                                            "type": "string",
                                            "format": "date-time"
                                          },
                                          "format": {
                                            "type": "string",
                                            "enum": [
                                              "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                              "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                              "yyyy-MM-dd'T'HH:mm'Z'",
                                              "yyyy-MM-dd'T'HH",
                                              "yyyy-MM-dd",
                                              "yyyy-MM",
                                              "yyyy"
                                            ]
                                          },
                                          "minValue": {
                                            "type": "string"
                                          },
                                          "maxValue": {
                                            "type": "string"
                                          },
                                          "defaultValue": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["value"]
                                      },
                                      "name": {
                                        "type": "string",
                                        "description": "Label or text displayed on GUI"
                                      },
                                      "code": {
                                        "type": "string",
                                        "description": "Value used for mapping at the backend system"
                                      },
                                      "category": {
                                        "description": "Examples includeHome,ContentsSpecified ItemsOptional CoverRental Amount, DailyConfirmationableAmount",
                                        "type": "string"
                                      },
                                      "description": {
                                        "type": "string"
                                      },
                                      "value": {
                                        "type": "string",
                                        "description": "This represents the percentage of requested sum insured"
                                      },
                                      "limitNumber": {
                                        "type": "string"
                                      },
                                      "coverageType": {
                                        "type": "string",
                                        "description": "conformed value"
                                      }
                                    }
                                  }
                                },
                                "description": {
                                  "type": "string"
                                },
                                "value": {
                                  "type": "string"
                                },
                                "premiumClass": {
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "excesses": {
                            "type": "array",
                            "items": {
                              "title": "Excess",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "type": "string",
                                  "description": "code used in System of Record, if available"
                                },
                                "name": {
                                  "type": "string",
                                  "description": "Specific to System of Record"
                                },
                                "excessCategory": {
                                  "type": "string",
                                  "enum": [
                                    "STANDARD",
                                    "VOLUNTARY",
                                    "IMPOSED",
                                    "NAMED_DRIVER",
                                    "COVERAGE_ITEM",
                                    "THEFT",
                                    "NAMED_DRIVER_IMPOSED",
                                    "UNNAMED_DRIVER_IMPOSED",
                                    "UNNAMED_DRIVER",
                                    "SPECIAL",
                                    "SPECIAL_IMPOSED"
                                  ]
                                },
                                "minimumAmount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "maximumAmount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "references": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "namespace": {
                                        "type": "string",
                                        "enum": ["NAMED_DRIVER_ID"]
                                      },
                                      "identifier": {
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "value": {
                                  "type": "string",
                                  "description": "TODO - may not be required"
                                },
                                "tier": {
                                  "type": "string",
                                  "description": "TODO - may not be required"
                                },
                                "rate": {
                                  "type": "number"
                                }
                              },
                              "required": ["excessCategory"]
                            }
                          },
                          "discounts": {
                            "type": "array",
                            "items": {
                              "title": "Discount",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "type": "string",
                                  "description": "Code used in System of Record, if available"
                                },
                                "name": {
                                  "type": "string",
                                  "description": "Specific to System of Record"
                                },
                                "value": {
                                  "type": "string"
                                },
                                "discountType": {
                                  "type": "string",
                                  "enum": ["PERCENT", "RATE", "DOLLAR_AMOUNT", "OTHER"]
                                },
                                "amount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "priority": {
                                  "type": "integer",
                                  "description": "Order in which the discount is applied"
                                }
                              },
                              "required": ["discountType"]
                            }
                          },
                          "physicalConditions": {
                            "type": "array",
                            "items": {
                              "title": "Physical Condition",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "description": {
                                  "type": "string"
                                },
                                "value": {
                                  "type": "string"
                                },
                                "establishedDate": {
                                  "title": "Date Time Extended",
                                  "type": "object",
                                  "properties": {
                                    "value": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "format": {
                                      "type": "string",
                                      "enum": [
                                        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                        "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                        "yyyy-MM-dd'T'HH:mm'Z'",
                                        "yyyy-MM-dd'T'HH",
                                        "yyyy-MM-dd",
                                        "yyyy-MM",
                                        "yyyy"
                                      ]
                                    },
                                    "minValue": {
                                      "type": "string"
                                    },
                                    "maxValue": {
                                      "type": "string"
                                    },
                                    "defaultValue": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["value"]
                                },
                                "physicalConditionType": {
                                  "type": "string",
                                  "enum": [
                                    "LAST_VALUATION",
                                    "STATED_VALUE",
                                    "PLANT_LAST_VALUATION",
                                    "LAST_INSPECTION",
                                    "LAST_SURVEYED",
                                    "RATING_CONDITION",
                                    "UNREPAIRED_DAMAGE"
                                  ]
                                },
                                "type": {
                                  "type": "string",
                                  "description": "e.g. Financial Valuation Type"
                                },
                                "amount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "code": {
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "rates": {
                            "type": "array",
                            "items": {
                              "title": "Rate",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "startDate": {
                                  "title": "Date Time Extended",
                                  "type": "object",
                                  "properties": {
                                    "value": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "format": {
                                      "type": "string",
                                      "enum": [
                                        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                        "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                        "yyyy-MM-dd'T'HH:mm'Z'",
                                        "yyyy-MM-dd'T'HH",
                                        "yyyy-MM-dd",
                                        "yyyy-MM",
                                        "yyyy"
                                      ]
                                    },
                                    "minValue": {
                                      "type": "string"
                                    },
                                    "maxValue": {
                                      "type": "string"
                                    },
                                    "defaultValue": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["value"]
                                },
                                "endDate": {
                                  "title": "Date Time Extended",
                                  "type": "object",
                                  "properties": {
                                    "value": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "format": {
                                      "type": "string",
                                      "enum": [
                                        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                        "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                        "yyyy-MM-dd'T'HH:mm'Z'",
                                        "yyyy-MM-dd'T'HH",
                                        "yyyy-MM-dd",
                                        "yyyy-MM",
                                        "yyyy"
                                      ]
                                    },
                                    "minValue": {
                                      "type": "string"
                                    },
                                    "maxValue": {
                                      "type": "string"
                                    },
                                    "defaultValue": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["value"]
                                },
                                "name": {
                                  "type": "string"
                                },
                                "code": {
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "premiumDetails": {
                            "type": "array",
                            "items": {
                              "title": "Premium Detail",
                              "type": "object",
                              "properties": {
                                "category": {
                                  "type": "string"
                                },
                                "code": {
                                  "type": "string"
                                },
                                "writtenPremium": {
                                  "title": "Premium",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "companyPremium": {
                                      "type": "number",
                                      "description": "Company Premium"
                                    },
                                    "naturalDisasterPremium": {
                                      "type": "number"
                                    },
                                    "earthquakeLevy": {
                                      "type": "number",
                                      "description": "EQC Levy"
                                    },
                                    "fireServiceLevy": {
                                      "type": "number",
                                      "description": "Fire Service Levy"
                                    },
                                    "gst": {
                                      "type": "number",
                                      "description": "GST Amount"
                                    },
                                    "instalmentCharge": {
                                      "type": "number"
                                    },
                                    "adminCharge": {
                                      "type": "number",
                                      "description": "Admin Charge"
                                    },
                                    "commissionRate": {
                                      "type": "number",
                                      "description": "Commission Rate"
                                    },
                                    "minimumPremiumUsed": {
                                      "type": "boolean"
                                    },
                                    "naturalDisasterCommission": {
                                      "type": "number"
                                    },
                                    "terrorTotalTransactionCost": {
                                      "type": "number"
                                    },
                                    "commissionAmount": {
                                      "type": "number"
                                    },
                                    "commissionGST": {
                                      "type": "number"
                                    },
                                    "totalPremium": {
                                      "type": "number"
                                    },
                                    "businessPremium": {
                                      "type": "number"
                                    },
                                    "cappingAndCupping": {
                                      "type": "object",
                                      "properties": {
                                        "premiumAmount": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        },
                                        "adjustmentFactor": {
                                          "type": "number"
                                        },
                                        "premiumAdjustmentDueToOverride": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        }
                                      }
                                    }
                                  }
                                },
                                "annualisedPremium": {
                                  "title": "Premium",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "companyPremium": {
                                      "type": "number",
                                      "description": "Company Premium"
                                    },
                                    "naturalDisasterPremium": {
                                      "type": "number"
                                    },
                                    "earthquakeLevy": {
                                      "type": "number",
                                      "description": "EQC Levy"
                                    },
                                    "fireServiceLevy": {
                                      "type": "number",
                                      "description": "Fire Service Levy"
                                    },
                                    "gst": {
                                      "type": "number",
                                      "description": "GST Amount"
                                    },
                                    "instalmentCharge": {
                                      "type": "number"
                                    },
                                    "adminCharge": {
                                      "type": "number",
                                      "description": "Admin Charge"
                                    },
                                    "commissionRate": {
                                      "type": "number",
                                      "description": "Commission Rate"
                                    },
                                    "minimumPremiumUsed": {
                                      "type": "boolean"
                                    },
                                    "naturalDisasterCommission": {
                                      "type": "number"
                                    },
                                    "terrorTotalTransactionCost": {
                                      "type": "number"
                                    },
                                    "commissionAmount": {
                                      "type": "number"
                                    },
                                    "commissionGST": {
                                      "type": "number"
                                    },
                                    "totalPremium": {
                                      "type": "number"
                                    },
                                    "businessPremium": {
                                      "type": "number"
                                    },
                                    "cappingAndCupping": {
                                      "type": "object",
                                      "properties": {
                                        "premiumAmount": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        },
                                        "adjustmentFactor": {
                                          "type": "number"
                                        },
                                        "premiumAdjustmentDueToOverride": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        }
                                      }
                                    }
                                  }
                                },
                                "transactionPremium": {
                                  "title": "Premium",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "companyPremium": {
                                      "type": "number",
                                      "description": "Company Premium"
                                    },
                                    "naturalDisasterPremium": {
                                      "type": "number"
                                    },
                                    "earthquakeLevy": {
                                      "type": "number",
                                      "description": "EQC Levy"
                                    },
                                    "fireServiceLevy": {
                                      "type": "number",
                                      "description": "Fire Service Levy"
                                    },
                                    "gst": {
                                      "type": "number",
                                      "description": "GST Amount"
                                    },
                                    "instalmentCharge": {
                                      "type": "number"
                                    },
                                    "adminCharge": {
                                      "type": "number",
                                      "description": "Admin Charge"
                                    },
                                    "commissionRate": {
                                      "type": "number",
                                      "description": "Commission Rate"
                                    },
                                    "minimumPremiumUsed": {
                                      "type": "boolean"
                                    },
                                    "naturalDisasterCommission": {
                                      "type": "number"
                                    },
                                    "terrorTotalTransactionCost": {
                                      "type": "number"
                                    },
                                    "commissionAmount": {
                                      "type": "number"
                                    },
                                    "commissionGST": {
                                      "type": "number"
                                    },
                                    "totalPremium": {
                                      "type": "number"
                                    },
                                    "businessPremium": {
                                      "type": "number"
                                    },
                                    "cappingAndCupping": {
                                      "type": "object",
                                      "properties": {
                                        "premiumAmount": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        },
                                        "adjustmentFactor": {
                                          "type": "number"
                                        },
                                        "premiumAdjustmentDueToOverride": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        }
                                      }
                                    }
                                  }
                                },
                                "instalmentPremium": {
                                  "title": "Premium",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "companyPremium": {
                                      "type": "number",
                                      "description": "Company Premium"
                                    },
                                    "naturalDisasterPremium": {
                                      "type": "number"
                                    },
                                    "earthquakeLevy": {
                                      "type": "number",
                                      "description": "EQC Levy"
                                    },
                                    "fireServiceLevy": {
                                      "type": "number",
                                      "description": "Fire Service Levy"
                                    },
                                    "gst": {
                                      "type": "number",
                                      "description": "GST Amount"
                                    },
                                    "instalmentCharge": {
                                      "type": "number"
                                    },
                                    "adminCharge": {
                                      "type": "number",
                                      "description": "Admin Charge"
                                    },
                                    "commissionRate": {
                                      "type": "number",
                                      "description": "Commission Rate"
                                    },
                                    "minimumPremiumUsed": {
                                      "type": "boolean"
                                    },
                                    "naturalDisasterCommission": {
                                      "type": "number"
                                    },
                                    "terrorTotalTransactionCost": {
                                      "type": "number"
                                    },
                                    "commissionAmount": {
                                      "type": "number"
                                    },
                                    "commissionGST": {
                                      "type": "number"
                                    },
                                    "totalPremium": {
                                      "type": "number"
                                    },
                                    "businessPremium": {
                                      "type": "number"
                                    },
                                    "cappingAndCupping": {
                                      "type": "object",
                                      "properties": {
                                        "premiumAmount": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        },
                                        "adjustmentFactor": {
                                          "type": "number"
                                        },
                                        "premiumAdjustmentDueToOverride": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        }
                                      }
                                    }
                                  }
                                },
                                "initialPaymentPremium": {
                                  "title": "Premium",
                                  "description": "",
                                  "type": "object",
                                  "properties": {
                                    "companyPremium": {
                                      "type": "number",
                                      "description": "Company Premium"
                                    },
                                    "naturalDisasterPremium": {
                                      "type": "number"
                                    },
                                    "earthquakeLevy": {
                                      "type": "number",
                                      "description": "EQC Levy"
                                    },
                                    "fireServiceLevy": {
                                      "type": "number",
                                      "description": "Fire Service Levy"
                                    },
                                    "gst": {
                                      "type": "number",
                                      "description": "GST Amount"
                                    },
                                    "instalmentCharge": {
                                      "type": "number"
                                    },
                                    "adminCharge": {
                                      "type": "number",
                                      "description": "Admin Charge"
                                    },
                                    "commissionRate": {
                                      "type": "number",
                                      "description": "Commission Rate"
                                    },
                                    "minimumPremiumUsed": {
                                      "type": "boolean"
                                    },
                                    "naturalDisasterCommission": {
                                      "type": "number"
                                    },
                                    "terrorTotalTransactionCost": {
                                      "type": "number"
                                    },
                                    "commissionAmount": {
                                      "type": "number"
                                    },
                                    "commissionGST": {
                                      "type": "number"
                                    },
                                    "totalPremium": {
                                      "type": "number"
                                    },
                                    "businessPremium": {
                                      "type": "number"
                                    },
                                    "cappingAndCupping": {
                                      "type": "object",
                                      "properties": {
                                        "premiumAmount": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        },
                                        "adjustmentFactor": {
                                          "type": "number"
                                        },
                                        "premiumAdjustmentDueToOverride": {
                                          "title": "Amount Extended",
                                          "type": "object",
                                          "properties": {
                                            "amount": {
                                              "type": "number"
                                            },
                                            "currencyCode": {
                                              "type": "string"
                                            },
                                            "isGSTInclusive": {
                                              "type": "boolean"
                                            },
                                            "GSTAmount": {
                                              "type": "number"
                                            },
                                            "GSTPercentageApplicable": {
                                              "type": "number"
                                            },
                                            "description": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        }
                                      }
                                    }
                                  }
                                },
                                "premiumClass": {
                                  "type": "string"
                                },
                                "premiumFrequency": {
                                  "title": "Premium Frequency",
                                  "type": "string",
                                  "description": "",
                                  "enum": ["ANNUALLY", "QUARTERLY", "MONTHLY", "FORTNIGHTLY", "ONE_OFF", "HALF_YEARLY"]
                                }
                              }
                            }
                          },
                          "adjustments": {
                            "type": "array",
                            "items": {
                              "title": "Adjustment",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "title": "Amount Extended",
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currencyCode": {
                                      "type": "string"
                                    },
                                    "isGSTInclusive": {
                                      "type": "boolean"
                                    },
                                    "GSTAmount": {
                                      "type": "number"
                                    },
                                    "GSTPercentageApplicable": {
                                      "type": "number"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  },
                                  "required": ["amount"]
                                },
                                "code": {
                                  "type": "string",
                                  "description": "code used in System of Record, if available"
                                },
                                "factor": {
                                  "type": "string"
                                },
                                "reason": {
                                  "type": "string"
                                },
                                "adjustmentType": {
                                  "type": "string",
                                  "enum": ["PERCENT", "RATE", "DOLLAR_AMOUNT"]
                                },
                                "name": {
                                  "type": "string",
                                  "description": "Specific to System of Record"
                                },
                                "priority": {
                                  "type": "integer",
                                  "description": "Order in which the discount is applied"
                                }
                              },
                              "required": ["adjustmentType"]
                            }
                          },
                          "conditions": {
                            "type": "array",
                            "items": {
                              "title": "Peril Category",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string"
                                },
                                "code": {
                                  "type": "string"
                                },
                                "value": {
                                  "type": "string"
                                },
                                "description": {
                                  "type": "string"
                                },
                                "subCategories": {
                                  "description": "",
                                  "type": "array",
                                  "items": {
                                    "title": "Peril Category",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "name": {
                                        "type": "string"
                                      },
                                      "code": {
                                        "type": "string"
                                      },
                                      "value": {
                                        "type": "string"
                                      },
                                      "description": {
                                        "type": "string"
                                      },
                                      "subCategories": {
                                        "description": "",
                                        "type": "array",
                                        "items": {
                                          "$ref": "#/definitions/peril-category"
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "subCategory": {
                            "type": "string"
                          },
                          "hasCoverage": {
                            "type": "boolean"
                          },
                          "settlementBasis": {
                            "type": "string",
                            "enum": ["AGREED_VALUE", "FIXED_VALUE", "MARKET_VALUE", "SUM_INSURED"],
                            "description": "Basis on which the confirmation would be settled for this coverageItem. Only required if it differes from the insuredRisks.settlementBasis"
                          },
                          "externalReferences": {
                            "type": "array",
                            "items": {
                              "title": "External Reference",
                              "description": "",
                              "type": "object",
                              "properties": {
                                "namespace": {
                                  "description": "A namespace for the identifier.",
                                  "type": "string"
                                },
                                "identifier": {
                                  "description": "An identifier for the entity",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "coverageType": {
                            "type": "string",
                            "description": "This is the conformed representation of the coverage code example: \"INSURED_VEHICLE\", \"WINDSCREEN\", \"AGREED_VALUE\", \"INGESTION_OR_ENTANGLEMENT\", \"LOSS_OF_USE\", \"PORTABLE_ELECTRONIC_EQUIPMENT\", \"TAXI\""
                          },
                          "coverageNote": {
                            "type": "string",
                            "description": "Free format string populated by the System of Record contains detials that will add a note to the coverage e.g 25% of the sumInsured, limit shown in the policy schedule - First 7 days not covered"
                          },
                          "additionalCoverageDetails": {
                            "type": "array",
                            "items": {
                              "title": "Additional Information",
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "string"
                                },
                                "details": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "name": {
                                        "type": "string"
                                      },
                                      "number": {
                                        "type": "number"
                                      },
                                      "value": {
                                        "type": "string"
                                      },
                                      "amount": {
                                        "title": "Amount Extended",
                                        "type": "object",
                                        "properties": {
                                          "amount": {
                                            "type": "number"
                                          },
                                          "currencyCode": {
                                            "type": "string"
                                          },
                                          "isGSTInclusive": {
                                            "type": "boolean"
                                          },
                                          "GSTAmount": {
                                            "type": "number"
                                          },
                                          "GSTPercentageApplicable": {
                                            "type": "number"
                                          },
                                          "description": {
                                            "type": "string"
                                          }
                                        },
                                        "required": ["amount"]
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "deferments": {
                            "type": "array",
                            "items": {
                              "title": "Deferment",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "type": "string",
                                  "description": "Code used in System of record"
                                },
                                "name": {
                                  "type": "string"
                                },
                                "category": {
                                  "type": "string"
                                },
                                "description": {
                                  "type": "string",
                                  "enum": ["STANDARD", "VOLUNTARY", "IMPOSED"]
                                },
                                "length": {
                                  "type": "number"
                                },
                                "period": {
                                  "type": "string",
                                  "enum": ["HOURS", "DAYS", "WEEKS", "MONTHS"]
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "groupSubType": {
                      "type": "string",
                      "description": "",
                      "enum": ["FLEET", "NON_FLEET"]
                    }
                  }
                }
              },
              "changeType": {
                "type": "string",
                "description": "TODO: can we delete this??"
              },
              "recordedConfirmations": {
                "type": "array",
                "items": {
                  "title": "Confirmation Output",
                  "allOf": [
                    {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "This is generated by concatenating systemOfRecord, confirmationId and effective date (in this order)"
                        }
                      }
                    },
                    {
                      "title": "Confirmation Base",
                      "description": "",
                      "type": "object",
                      "properties": {
                        "confirmationId": {
                          "type": "string",
                          "description": "System of record confirmation Id"
                        },
                        "partyId": {
                          "type": "string"
                        },
                        "systemOfRecord": {
                          "title": "System Of Record",
                          "type": "string",
                          "enum": ["LOREM", "HEART", "IPSUM_CENTER", "SECURITY", "BAR", "FOO", "BUDDY", "BONUS"]
                        },
                        "systemOfRecordTransactionDate": {
                          "title": "Date Time Extended",
                          "type": "object",
                          "properties": {
                            "value": {
                              "type": "string",
                              "format": "date-time"
                            },
                            "format": {
                              "type": "string",
                              "enum": [
                                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                "yyyy-MM-dd'T'HH:mm'Z'",
                                "yyyy-MM-dd'T'HH",
                                "yyyy-MM-dd",
                                "yyyy-MM",
                                "yyyy"
                              ]
                            },
                            "minValue": {
                              "type": "string"
                            },
                            "maxValue": {
                              "type": "string"
                            },
                            "defaultValue": {
                              "type": "string"
                            }
                          },
                          "required": ["value"]
                        },
                        "dateOfLoss": {
                          "title": "Date Time Extended",
                          "type": "object",
                          "properties": {
                            "value": {
                              "type": "string",
                              "format": "date-time"
                            },
                            "format": {
                              "type": "string",
                              "enum": [
                                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                "yyyy-MM-dd'T'HH:mm'Z'",
                                "yyyy-MM-dd'T'HH",
                                "yyyy-MM-dd",
                                "yyyy-MM",
                                "yyyy"
                              ]
                            },
                            "minValue": {
                              "type": "string"
                            },
                            "maxValue": {
                              "type": "string"
                            },
                            "defaultValue": {
                              "type": "string"
                            }
                          },
                          "required": ["value"]
                        },
                        "reportedDate": {
                          "title": "Date Time Extended",
                          "type": "object",
                          "properties": {
                            "value": {
                              "type": "string",
                              "format": "date-time"
                            },
                            "format": {
                              "type": "string",
                              "enum": [
                                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                "yyyy-MM-dd'T'HH:mm'Z'",
                                "yyyy-MM-dd'T'HH",
                                "yyyy-MM-dd",
                                "yyyy-MM",
                                "yyyy"
                              ]
                            },
                            "minValue": {
                              "type": "string"
                            },
                            "maxValue": {
                              "type": "string"
                            },
                            "defaultValue": {
                              "type": "string"
                            }
                          },
                          "required": ["value"]
                        },
                        "effectiveDate": {
                          "title": "Date Time Extended",
                          "type": "object",
                          "properties": {
                            "value": {
                              "type": "string",
                              "format": "date-time"
                            },
                            "format": {
                              "type": "string",
                              "enum": [
                                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                "yyyy-MM-dd'T'HH:mm'Z'",
                                "yyyy-MM-dd'T'HH",
                                "yyyy-MM-dd",
                                "yyyy-MM",
                                "yyyy"
                              ]
                            },
                            "minValue": {
                              "type": "string"
                            },
                            "maxValue": {
                              "type": "string"
                            },
                            "defaultValue": {
                              "type": "string"
                            }
                          },
                          "required": ["value"]
                        },
                        "exportedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "When was this record exported out from the System of Record source. Format should be in UTC and as per ISO 8601/RFC3339 format (yyyy-MM-dd'T'HH:mm:ss.SSS'Z')"
                        },
                        "isInsuredAtFault": {
                          "type": "boolean",
                          "description": "Indicates whether or not the insured is to blame for the loss/accident"
                        },
                        "lossCause": {
                          "type": "object",
                          "description": "System of record loss code and its description",
                          "properties": {
                            "code": {
                              "type": "string"
                            },
                            "codeDescription": {
                              "type": "string"
                            }
                          },
                          "required": ["code", "codeDescription"]
                        },
                        "status": {
                          "type": "string",
                          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum, arcu sit amet cursus dictum, libero ex vestibulum arcu, at elementum odio leo vel risus. Maecenas mi ipsum, vehicula ac dui sit amet, mattis ultricies lorem. Duis nec laoreet diam. Integer id aliquet tellus. Aliquam varius augue id mauris molestie, ac consectetur nulla vestibulum. Nulla lorem diam, euismod eget massa non, pulvinar tincidunt diam. Ut euismod augue at eros mattis, congue aliquet nisi pulvinar. Nam quis neque elit. Suspendisse pretium cursus dolor, eget vehicula sapien tristique ac. Ut eget varius ex, faucibus pharetra magna.",
                          "enum": [
                            "ARCHIVED",
                            "CLOSED",
                            "OPEN",
                            "DRAFT",
                            "CANCELLED",
                            "INSTALMENT",
                            "LAPSED",
                            "PENDING",
                            "REFUSED",
                            "SPANISH",
                            "LITIGATION",
                            "REOPENED",
                            "NOTIFICATION"
                          ]
                        },
                        "confirmationHandler": {
                          "type": "string",
                          "description": "String that identifies the employee that is handling the confirmation.\nIn HEART, this will be the person's initials. In Lorem, this will be a full name"
                        },
                        "costOfConfirmation": {
                          "title": "Amount Extended",
                          "type": "object",
                          "properties": {
                            "amount": {
                              "type": "number"
                            },
                            "currencyCode": {
                              "type": "string"
                            },
                            "isGSTInclusive": {
                              "type": "boolean"
                            },
                            "GSTAmount": {
                              "type": "number"
                            },
                            "GSTPercentageApplicable": {
                              "type": "number"
                            },
                            "description": {
                              "type": "string"
                            }
                          },
                          "required": ["amount"]
                        },
                        "insurancePolicy": {
                          "type": "object",
                          "properties": {
                            "insurancePolicyId": {
                              "type": "string",
                              "description": "Bird ID of Policy"
                            },
                            "systemOfRecord": {
                              "title": "System Of Record",
                              "type": "string",
                              "enum": ["LOREM", "HEART", "IPSUM_CENTER", "SECURITY", "BAR", "FOO", "BUDDY", "BONUS"]
                            },
                            "policyId": {
                              "type": "string",
                              "description": "systemOfRecord ID"
                            },
                            "riskId": {
                              "type": "string",
                              "description": ""
                            },
                            "riskGroupId": {
                              "type": "string"
                            }
                          },
                          "required": ["systemOfRecord", "policyId"]
                        },
                        "underlyingInsurancePolicy": {
                          "$ref": "./InsurancePolicies.oas2.yml#/definitions/insurance-policy-base"
                        }
                      }
                    }
                  ]
                }
              },
              "confirmationHistories": {
                "type": "array",
                "items": {
                  "title": "Confirmation History",
                  "description": "",
                  "type": "object",
                  "properties": {
                    "code": {
                      "type": "string"
                    },
                    "period": {
                      "type": "string",
                      "description": "Describe the period of confirmations - e.g. \"last 5 years'"
                    },
                    "lossAmount": {
                      "title": "Amount Extended",
                      "type": "object",
                      "properties": {
                        "amount": {
                          "type": "number"
                        },
                        "currencyCode": {
                          "type": "string"
                        },
                        "isGSTInclusive": {
                          "type": "boolean"
                        },
                        "GSTAmount": {
                          "type": "number"
                        },
                        "GSTPercentageApplicable": {
                          "type": "number"
                        },
                        "description": {
                          "type": "string"
                        }
                      },
                      "required": ["amount"]
                    },
                    "numberOfConfirmations": {
                      "type": "integer"
                    },
                    "hasConfirmationsOver10000": {
                      "type": "boolean"
                    },
                    "yearsInBusiness": {
                      "type": "integer"
                    },
                    "lineOfBusinessCategory": {
                      "title": "Line Of Business Category",
                      "type": "string",
                      "enum": [
                        "COMMERCIAL_VEHICLE",
                        "PRIVATE_VEHICLE",
                        "HOME",
                        "CONTENTS",
                        "LIABILITY",
                        "PLEASUREKRAFT",
                        "BUSINESS_ASSETS",
                        "MOBILE_BUSINESS_ASSETS",
                        "BUSINESS_INTERRUPTION",
                        "MARINE",
                        "COMMERCIAL_PROPERTY"
                      ]
                    },
                    "hasHadMoreThan10Confirmations": {
                      "type": "boolean"
                    },
                    "confirmationSummaries": {
                      "type": "array",
                      "items": {
                        "title": "Confirmation Summary",
                        "type": "object",
                        "properties": {
                          "description": {
                            "type": "string"
                          },
                          "dateOfLoss": {
                            "title": "Date Only Extended",
                            "type": "object",
                            "properties": {
                              "value": {
                                "type": "string",
                                "format": "date"
                              },
                              "format": {
                                "type": "string",
                                "enum": ["yyyy-MM-dd", "yyyy-MM", "yyyy"]
                              }
                            },
                            "required": ["value"]
                          },
                          "costOfConfirmation": {
                            "title": "Amount Extended",
                            "type": "object",
                            "properties": {
                              "amount": {
                                "type": "number"
                              },
                              "currencyCode": {
                                "type": "string"
                              },
                              "isGSTInclusive": {
                                "type": "boolean"
                              },
                              "GSTAmount": {
                                "type": "number"
                              },
                              "GSTPercentageApplicable": {
                                "type": "number"
                              },
                              "description": {
                                "type": "string"
                              }
                            },
                            "required": ["amount"]
                          },
                          "code": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              },
              "contractStatuses": {
                "type": "array",
                "items": {
                  "title": "Insurance Policy Status",
                  "description": "",
                  "type": "object",
                  "properties": {
                    "description": {
                      "type": "string"
                    },
                    "state": {
                      "type": "string"
                    },
                    "reason": {
                      "type": "string"
                    }
                  }
                }
              },
              "closingSlips": {
                "type": "array",
                "items": {
                  "title": "Closing Slip",
                  "description": "",
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "coverageType": {
                      "title": "Risk Type",
                      "type": "string",
                      "description": "",
                      "enum": [
                        "COMMERCIAL_VEHICLE",
                        "PRIVATE_VEHICLE",
                        "HOME",
                        "CONTENTS",
                        "BUSINESS_ASSETS",
                        "GENERAL_LIABILITY",
                        "STATUTORY_LIABILITY",
                        "EMPLOYERS_LIABILITY",
                        "BUSINESS_INTERRUPTION",
                        "PLEASUREKRAFT",
                        "MOBILE_BUSINESS_ASSETS",
                        "LIABILITY",
                        "MARINE",
                        "LIABILITY",
                        "CONTRACT_WORKS",
                        "DETERIORATION",
                        "ELECTRONIC_EQUIPMENT",
                        "INCOME_PROTECTION",
                        "MACHINERY_BREAKDOWN",
                        "CARRIERS_LIABILITY"
                      ]
                    }
                  }
                }
              },
              "dataModifications": {
                "type": "array",
                "items": {
                  "title": "Data Modification",
                  "description": "",
                  "type": "object",
                  "properties": {
                    "insuredRiskGroups": {
                      "description": "",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "title": "Insured Risk Group",
                        "properties": {
                          "riskGroupId": {
                            "type": "string",
                            "description": "A unique identifier for the insured risk group under an insurance policy. Usually identified as a risk number"
                          },
                          "riskGroupType": {
                            "title": "Risk Type",
                            "type": "string",
                            "description": "",
                            "enum": [
                              "COMMERCIAL_VEHICLE",
                              "PRIVATE_VEHICLE",
                              "HOME",
                              "CONTENTS",
                              "BUSINESS_ASSETS",
                              "GENERAL_LIABILITY",
                              "STATUTORY_LIABILITY",
                              "EMPLOYERS_LIABILITY",
                              "BUSINESS_INTERRUPTION",
                              "PLEASUREKRAFT",
                              "MOBILE_BUSINESS_ASSETS",
                              "LIABILITY",
                              "MARINE",
                              "LIABILITY",
                              "CONTRACT_WORKS",
                              "DETERIORATION",
                              "ELECTRONIC_EQUIPMENT",
                              "INCOME_PROTECTION",
                              "MACHINERY_BREAKDOWN",
                              "CARRIERS_LIABILITY"
                            ]
                          },
                          "attachmentDate": {
                            "$ref": "./common.oas2.yml#/definitions/date-time-extended"
                          },
                          "effectiveDate": {
                            "$ref": "./common.oas2.yml#/definitions/date-time-extended"
                          },
                          "endDate": {
                            "$ref": "./common.oas2.yml#/definitions/date-time-extended"
                          },
                          "externalReferences": {
                            "description": "This is thirdPartyRiskID",
                            "type": "array",
                            "items": {
                              "$ref": "./common.oas2.yml#/definitions/external-reference"
                            }
                          },
                          "notes": {
                            "type": "array",
                            "items": {
                              "$ref": "./common.oas2.yml#/definitions/note"
                            }
                          },
                          "insuredRisks": {
                            "description": "An insured risk represents an asset covered by this insurance policy.\n\nThe list of each insured risk under the insurance policy",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "riskId": {
                                  "type": "string",
                                  "description": "A unique identifier for the insured risk group under an insured risk group. Usually identified as a risk number"
                                },
                                "lineOfBusinessCategory": {
                                  "title": "Line Of Business Category",
                                  "type": "string",
                                  "enum": [
                                    "COMMERCIAL_VEHICLE",
                                    "PRIVATE_VEHICLE",
                                    "HOME",
                                    "CONTENTS",
                                    "LIABILITY",
                                    "PLEASUREKRAFT",
                                    "BUSINESS_ASSETS",
                                    "MOBILE_BUSINESS_ASSETS",
                                    "BUSINESS_INTERRUPTION",
                                    "MARINE",
                                    "COMMERCIAL_PROPERTY"
                                  ]
                                },
                                "attachmentDate": {
                                  "$ref": "./common.oas2.yml#/definitions/date-time-extended"
                                },
                                "rateDate": {
                                  "$ref": "./common.oas2.yml#/definitions/date-only-extended"
                                },
                                "endDate": {
                                  "$ref": "./common.oas2.yml#/definitions/date-time-extended"
                                },
                                "placesInvolved": {
                                  "description": "",
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/place"
                                  }
                                },
                                "interestedParties": {
                                  "description": "",
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/interested-party"
                                  }
                                },
                                "externalReferences": {
                                  "description": "This is thirdPartyRiskID",
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/external-reference"
                                  }
                                },
                                "riskType": {
                                  "title": "Risk Type",
                                  "type": "string",
                                  "description": "",
                                  "enum": [
                                    "COMMERCIAL_VEHICLE",
                                    "PRIVATE_VEHICLE",
                                    "HOME",
                                    "CONTENTS",
                                    "BUSINESS_ASSETS",
                                    "GENERAL_LIABILITY",
                                    "STATUTORY_LIABILITY",
                                    "EMPLOYERS_LIABILITY",
                                    "BUSINESS_INTERRUPTION",
                                    "PLEASUREKRAFT",
                                    "MOBILE_BUSINESS_ASSETS",
                                    "LIABILITY",
                                    "MARINE",
                                    "LIABILITY",
                                    "CONTRACT_WORKS",
                                    "DETERIORATION",
                                    "ELECTRONIC_EQUIPMENT",
                                    "INCOME_PROTECTION",
                                    "MACHINERY_BREAKDOWN",
                                    "CARRIERS_LIABILITY"
                                  ]
                                },
                                "coInsurance": {
                                  "type": "object",
                                  "properties": {
                                    "role": {
                                      "type": "string",
                                      "enum": ["LEAD", "NON_LEAD"]
                                    },
                                    "startDate": {
                                      "$ref": "./common.oas2.yml#/definitions/date-time-extended"
                                    },
                                    "endDate": {
                                      "$ref": "./common.oas2.yml#/definitions/date-time-extended"
                                    },
                                    "sharePercentage": {
                                      "type": "number",
                                      "description": ""
                                    },
                                    "coInsuranceParties": {
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string"
                                          },
                                          "name": {
                                            "type": "string",
                                            "description": "Name of company sharing co-insurance of the risk"
                                          },
                                          "sharePercentage": {
                                            "type": "string",
                                            "description": "The percentage of the co-insurance risk that this party has taken"
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "notes": {
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/note"
                                  }
                                },
                                "benefits": {
                                  "type": "array",
                                  "description": "Details of benefits related to the insured risk",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/benefit"
                                  }
                                },
                                "conditions": {
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/peril-category"
                                  }
                                },
                                "discounts": {
                                  "type": "array",
                                  "description": "List of discounts applied to the risk. This could include a burglar alarm discount, an age discount, a multiple policy discount",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/discount"
                                  }
                                },
                                "excesses": {
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/excess"
                                  }
                                },
                                "rates": {
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/rate"
                                  }
                                },
                                "coverageItems": {
                                  "type": "array",
                                  "description": "List of items covered under this insured risk",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/coverage-item"
                                  }
                                },
                                "reInsurance": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "string",
                                      "description": "TODO: Can we delete?"
                                    },
                                    "category": {
                                      "type": "string",
                                      "description": "TODO: Can we delete?"
                                    },
                                    "classification": {
                                      "type": "string"
                                    },
                                    "code": {
                                      "type": "string"
                                    }
                                  }
                                },
                                "premiumDetails": {
                                  "type": "array",
                                  "description": "Includes premium details for this insured risk",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/premium-detail"
                                  }
                                },
                                "adjustments": {
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/adjustment"
                                  }
                                },
                                "questionAnswers": {
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/question-instance"
                                  }
                                },
                                "physicalConditions": {
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/physical-condition"
                                  }
                                },
                                "generalActivities": {
                                  "type": "array",
                                  "items": {
                                    "title": "General Activity",
                                    "description": "",
                                    "type": "object",
                                    "properties": {
                                      "name": {
                                        "type": "string"
                                      },
                                      "activityCode": {
                                        "type": "string"
                                      },
                                      "activityId": {
                                        "type": "string"
                                      },
                                      "turnoverPercentage": {
                                        "type": "number"
                                      },
                                      "turnoverAmount": {
                                        "type": "number"
                                      },
                                      "description": {
                                        "type": "string"
                                      },
                                      "estimatedTurnover": {
                                        "type": "number"
                                      },
                                      "externalReferences": {
                                        "description": "",
                                        "type": "array",
                                        "items": {
                                          "$ref": "./common.oas2.yml#/definitions/external-reference"
                                        }
                                      },
                                      "address": {
                                        "title": "Address Output",
                                        "allOf": [
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string"
                                              }
                                            }
                                          },
                                          {
                                            "title": "Address Base",
                                            "description": "",
                                            "type": "object",
                                            "properties": {
                                              "addressId": {
                                                "description": "",
                                                "type": "string"
                                              },
                                              "addressPurpose": {
                                                "title": "Address Purpose",
                                                "type": "string",
                                                "enum": ["BILLING", "BUSINESS", "HOME", "OTHER", "MAILING", "CONTACT"]
                                              },
                                              "boxNumber": {
                                                "type": "string"
                                              },
                                              "boxType": {
                                                "type": "string"
                                              },
                                              "buildingName": {
                                                "type": "string"
                                              },
                                              "city": {
                                                "type": "string"
                                              },
                                              "country": {
                                                "type": "string"
                                              },
                                              "deliveryType": {
                                                "type": "string",
                                                "enum": [
                                                  "PO_BOX",
                                                  "PRIVATE_BAG",
                                                  "RESPONSE_BAG",
                                                  "CMB",
                                                  "COUNTER_DELIVERY",
                                                  "POST_BOX",
                                                  "RURAL"
                                                ]
                                              },
                                              "description": {
                                                "type": "string"
                                              },
                                              "levelNumber": {
                                                "type": "string"
                                              },
                                              "levelType": {
                                                "type": "string"
                                              },
                                              "lobbyName": {
                                                "type": "string"
                                              },
                                              "postalCode": {
                                                "type": "string"
                                              },
                                              "region": {
                                                "type": "string"
                                              },
                                              "ruralDelivery": {
                                                "type": "string"
                                              },
                                              "ruralDistrict": {
                                                "type": "string"
                                              },
                                              "status": {
                                                "type": "string"
                                              },
                                              "streetName": {
                                                "type": "string"
                                              },
                                              "streetNumber": {
                                                "type": "string"
                                              },
                                              "streetNumberSuffix": {
                                                "type": "string"
                                              },
                                              "streetSuffix": {
                                                "type": "string"
                                              },
                                              "streetType": {
                                                "type": "string"
                                              },
                                              "subregion": {
                                                "type": "string"
                                              },
                                              "unitNumber": {
                                                "type": "string"
                                              },
                                              "unitType": {
                                                "type": "string"
                                              },
                                              "unstructured": {
                                                "description": "An address represented in a single string",
                                                "type": "string"
                                              },
                                              "displayAddress": {
                                                "type": "array",
                                                "items": {
                                                  "type": "string"
                                                }
                                              },
                                              "externalReferences": {
                                                "type": "array",
                                                "items": {
                                                  "$ref": "./common.oas2.yml#/definitions/external-reference"
                                                }
                                              },
                                              "geoLocation": {
                                                "$ref": "./common.oas2.yml#/definitions/geo-location"
                                              },
                                              "sourceId": {
                                                "type": "string"
                                              },
                                              "sourceType": {
                                                "type": "string",
                                                "description": "Can be Google, DPID etc"
                                              },
                                              "rateLocation": {
                                                "type": "string"
                                              }
                                            }
                                          }
                                        ]
                                      },
                                      "activityType": {
                                        "type": "string",
                                        "enum": [
                                          "ANZSIC",
                                          "TERRITORIAL_LIMITS",
                                          "OUTSIDE_ACTIVITY",
                                          "HAZARDOUS_ACTIVITY",
                                          "HOTWORKS",
                                          "JURISDICTIONAL_LIMITS",
                                          "PRODUCT_DETAILS",
                                          "GENERAL",
                                          "AREA_OF_OPERATION",
                                          "USE_TYPE",
                                          "SUB_USE_TYPE",
                                          "BUSINESS_DESCRIPTION",
                                          "INDUSTRY",
                                          "BUSINESS_USAGE",
                                          "LOCATION",
                                          "VEHICLE_USAGE",
                                          "OCCUPATION"
                                        ]
                                      },
                                      "amount": {
                                        "type": "number",
                                        "description": "A numeric value associated with an activity e.g. What is the maximum value of cash carried in any of the vehicles at any one time = **$1000**"
                                      },
                                      "value": {
                                        "type": "string",
                                        "description": "A numeric value associated with an activity"
                                      },
                                      "component": {
                                        "type": "string"
                                      },
                                      "purpose": {
                                        "type": "string"
                                      },
                                      "dynamicProperties": {
                                        "type": "array",
                                        "items": {
                                          "$ref": "./common.oas2.yml#/definitions/dynamic-property"
                                        }
                                      },
                                      "undertakesActivity": {
                                        "type": "boolean"
                                      },
                                      "floorArea": {
                                        "type": "integer"
                                      }
                                    },
                                    "required": ["activityType"]
                                  }
                                },
                                "undergoneActivityOccurrences": {
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/activity-occurence"
                                  }
                                },
                                "objectOwnershipDetails": {
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/object-ownership"
                                  }
                                },
                                "mobileAssets": {
                                  "$ref": "./common.oas2.yml#/definitions/mobile-assets"
                                },
                                "businessInterruption": {
                                  "$ref": "./common.oas2.yml#/definitions/business-interruption"
                                },
                                "dwelling": {
                                  "$ref": "./common.oas2.yml#/definitions/dwelling"
                                },
                                "liability": {
                                  "$ref": "./common.oas2.yml#/definitions/liability"
                                },
                                "marineCraft": {
                                  "$ref": "./common.oas2.yml#/definitions/marine-craft"
                                },
                                "structure": {
                                  "$ref": "./common.oas2.yml#/definitions/structure"
                                },
                                "vehicle": {
                                  "title": "Vehicle Output",
                                  "allOf": [
                                    {
                                      "type": "object",
                                      "properties": {
                                        "id": {
                                          "type": "string",
                                          "description": "Internal unique id generated by our DB or system"
                                        }
                                      }
                                    },
                                    {
                                      "title": "Vehicle Base",
                                      "description": "The representation of vehicle data.",
                                      "type": "object",
                                      "properties": {
                                        "vehicleType": {
                                          "title": "Vehicle Type Output",
                                          "allOf": [
                                            {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string",
                                                  "description": "Internal unique id generated by our DB or system"
                                                }
                                              }
                                            },
                                            {
                                              "title": "Vehicle Type Base",
                                              "description": "The representation of vehicleType data.",
                                              "type": "object",
                                              "properties": {
                                                "vehicleId": {
                                                  "type": "integer",
                                                  "description": "Recieved from RedBook or other sources"
                                                },
                                                "make": {
                                                  "type": "string",
                                                  "description": "The make of the vehicle"
                                                },
                                                "mass": {
                                                  "type": "string",
                                                  "description": "Gross laden weight"
                                                },
                                                "model": {
                                                  "type": "string"
                                                },
                                                "vehicleType": {
                                                  "type": "string"
                                                },
                                                "year": {
                                                  "type": "integer"
                                                },
                                                "bodyStyle": {
                                                  "type": "string"
                                                },
                                                "engineType": {
                                                  "type": "string"
                                                },
                                                "driveType": {
                                                  "type": "string",
                                                  "description": "4WD or 2WD or AWD etc"
                                                },
                                                "doors": {
                                                  "type": "integer"
                                                },
                                                "series": {
                                                  "type": "string"
                                                },
                                                "engineCapacity": {
                                                  "type": "string"
                                                },
                                                "engineSize": {
                                                  "type": "string"
                                                },
                                                "equipmentLevel": {
                                                  "type": "string"
                                                },
                                                "equipmentLevel2": {
                                                  "type": "string"
                                                },
                                                "fullDescription": {
                                                  "type": "string"
                                                },
                                                "standardEquipment": {
                                                  "type": "string"
                                                },
                                                "gearType": {
                                                  "type": "string",
                                                  "description": "Automatic or Manual"
                                                },
                                                "releaseMonth": {
                                                  "type": "integer"
                                                },
                                                "noOfGears": {
                                                  "type": "integer"
                                                },
                                                "noOfCylinders": {
                                                  "type": "integer"
                                                },
                                                "fuelType": {
                                                  "type": "string"
                                                },
                                                "tareWeight": {
                                                  "type": "number",
                                                  "description": "Unladen weight"
                                                },
                                                "newPrice": {
                                                  "type": "number"
                                                },
                                                "isImported": {
                                                  "type": "boolean"
                                                },
                                                "seatCapacity": {
                                                  "type": "integer"
                                                },
                                                "axels": {
                                                  "type": "integer"
                                                },
                                                "bodyType": {
                                                  "type": "string"
                                                },
                                                "vehicleIndicators": {
                                                  "type": "array",
                                                  "items": {
                                                    "type": "object",
                                                    "properties": {
                                                      "product": {
                                                        "type": "string",
                                                        "enum": ["State PMV", "FI PMV"]
                                                      },
                                                      "name": {
                                                        "type": "string"
                                                      },
                                                      "value": {
                                                        "type": "string"
                                                      },
                                                      "expiryDate": {
                                                        "type": "string",
                                                        "format": "date"
                                                      }
                                                    }
                                                  }
                                                },
                                                "prices": {
                                                  "type": "array",
                                                  "items": {
                                                    "type": "object",
                                                    "properties": {
                                                      "price1": {
                                                        "type": "number"
                                                      },
                                                      "price2": {
                                                        "type": "number"
                                                      },
                                                      "price3": {
                                                        "type": "number"
                                                      },
                                                      "expiryDate": {
                                                        "type": "string",
                                                        "format": "date"
                                                      }
                                                    }
                                                  }
                                                },
                                                "vehicleGroup": {
                                                  "type": "string",
                                                  "description": "General vehicle group e.g. car, ute etc."
                                                },
                                                "isHybrid": {
                                                  "type": "boolean"
                                                },
                                                "isElectric": {
                                                  "type": "boolean"
                                                },
                                                "countryOfOrigin": {
                                                  "type": "string"
                                                },
                                                "externalReferences": {
                                                  "type": "array",
                                                  "items": {
                                                    "$ref": "./common.oas2.yml#/definitions/external-reference"
                                                  }
                                                },
                                                "dataProvider": {
                                                  "type": "string"
                                                }
                                              }
                                            }
                                          ]
                                        },
                                        "alternateVehicleType": {
                                          "type": "array",
                                          "items": {
                                            "title": "Vehicle Type Output",
                                            "allOf": [
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "id": {
                                                    "type": "string",
                                                    "description": "Internal unique id generated by our DB or system"
                                                  }
                                                }
                                              },
                                              {
                                                "title": "Vehicle Type Base",
                                                "description": "The representation of vehicleType data.",
                                                "type": "object",
                                                "properties": {
                                                  "vehicleId": {
                                                    "type": "integer",
                                                    "description": "Recieved from RedBook or other sources"
                                                  },
                                                  "make": {
                                                    "type": "string",
                                                    "description": "The make of the vehicle"
                                                  },
                                                  "mass": {
                                                    "type": "string",
                                                    "description": "Gross laden weight"
                                                  },
                                                  "model": {
                                                    "type": "string"
                                                  },
                                                  "vehicleType": {
                                                    "type": "string"
                                                  },
                                                  "year": {
                                                    "type": "integer"
                                                  },
                                                  "bodyStyle": {
                                                    "type": "string"
                                                  },
                                                  "engineType": {
                                                    "type": "string"
                                                  },
                                                  "driveType": {
                                                    "type": "string",
                                                    "description": "4WD or 2WD or AWD etc"
                                                  },
                                                  "doors": {
                                                    "type": "integer"
                                                  },
                                                  "series": {
                                                    "type": "string"
                                                  },
                                                  "engineCapacity": {
                                                    "type": "string"
                                                  },
                                                  "engineSize": {
                                                    "type": "string"
                                                  },
                                                  "equipmentLevel": {
                                                    "type": "string"
                                                  },
                                                  "equipmentLevel2": {
                                                    "type": "string"
                                                  },
                                                  "fullDescription": {
                                                    "type": "string"
                                                  },
                                                  "standardEquipment": {
                                                    "type": "string"
                                                  },
                                                  "gearType": {
                                                    "type": "string",
                                                    "description": "Automatic or Manual"
                                                  },
                                                  "releaseMonth": {
                                                    "type": "integer"
                                                  },
                                                  "noOfGears": {
                                                    "type": "integer"
                                                  },
                                                  "noOfCylinders": {
                                                    "type": "integer"
                                                  },
                                                  "fuelType": {
                                                    "type": "string"
                                                  },
                                                  "tareWeight": {
                                                    "type": "number",
                                                    "description": "Unladen weight"
                                                  },
                                                  "newPrice": {
                                                    "type": "number"
                                                  },
                                                  "isImported": {
                                                    "type": "boolean"
                                                  },
                                                  "seatCapacity": {
                                                    "type": "integer"
                                                  },
                                                  "axels": {
                                                    "type": "integer"
                                                  },
                                                  "bodyType": {
                                                    "type": "string"
                                                  },
                                                  "vehicleIndicators": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "product": {
                                                          "type": "string",
                                                          "enum": ["State PMV", "FI PMV"]
                                                        },
                                                        "name": {
                                                          "type": "string"
                                                        },
                                                        "value": {
                                                          "type": "string"
                                                        },
                                                        "expiryDate": {
                                                          "type": "string",
                                                          "format": "date"
                                                        }
                                                      }
                                                    }
                                                  },
                                                  "prices": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "price1": {
                                                          "type": "number"
                                                        },
                                                        "price2": {
                                                          "type": "number"
                                                        },
                                                        "price3": {
                                                          "type": "number"
                                                        },
                                                        "expiryDate": {
                                                          "type": "string",
                                                          "format": "date"
                                                        }
                                                      }
                                                    }
                                                  },
                                                  "vehicleGroup": {
                                                    "type": "string",
                                                    "description": "General vehicle group e.g. car, ute etc."
                                                  },
                                                  "isHybrid": {
                                                    "type": "boolean"
                                                  },
                                                  "isElectric": {
                                                    "type": "boolean"
                                                  },
                                                  "countryOfOrigin": {
                                                    "type": "string"
                                                  },
                                                  "externalReferences": {
                                                    "type": "array",
                                                    "items": {
                                                      "$ref": "./common.oas2.yml#/definitions/external-reference"
                                                    }
                                                  },
                                                  "dataProvider": {
                                                    "type": "string"
                                                  }
                                                }
                                              }
                                            ]
                                          }
                                        },
                                        "alarmType": {
                                          "type": "string"
                                        },
                                        "fullDescription": {
                                          "type": "string"
                                        },
                                        "hasAccessory": {
                                          "type": "boolean"
                                        },
                                        "hasAlarm": {
                                          "type": "boolean"
                                        },
                                        "hasLowKM": {
                                          "type": "boolean"
                                        },
                                        "hasModification": {
                                          "type": "boolean"
                                        },
                                        "hasOccasionalUse": {
                                          "type": "boolean"
                                        },
                                        "isVintage": {
                                          "type": "boolean"
                                        },
                                        "purposeOfUse": {
                                          "type": "string"
                                        },
                                        "registrationNumber": {
                                          "type": "string"
                                        },
                                        "vehicleUsage": {
                                          "type": "string"
                                        },
                                        "vin": {
                                          "type": "string"
                                        },
                                        "colour": {
                                          "title": "Vehicle Colour",
                                          "description": "",
                                          "type": "string",
                                          "enum": [
                                            "BLUE",
                                            "RED",
                                            "GREEN",
                                            "WHITE",
                                            "BLACK",
                                            "YELLOW",
                                            "ORANGE",
                                            "BROWN",
                                            "CREAM",
                                            "GOLD",
                                            "GREY",
                                            "PINK",
                                            "PURPLE",
                                            "SILVER"
                                          ]
                                        },
                                        "driverParties": {
                                          "type": "array",
                                          "items": {
                                            "$ref": "./common.oas2.yml#/definitions/driver"
                                          }
                                        },
                                        "externalReferences": {
                                          "type": "array",
                                          "items": {
                                            "$ref": "./common.oas2.yml#/definitions/external-reference"
                                          }
                                        },
                                        "modifications": {
                                          "type": "array",
                                          "items": {
                                            "$ref": "./common.oas2.yml#/definitions/modification"
                                          }
                                        },
                                        "modificationsAmount": {
                                          "$ref": "./common.oas2.yml#/definitions/amount-extended"
                                        },
                                        "unnamedDrivers": {
                                          "type": "array",
                                          "items": {
                                            "$ref": "./common.oas2.yml#/definitions/unnamed-driver"
                                          }
                                        },
                                        "mass": {
                                          "type": "string"
                                        },
                                        "vehicleClass": {
                                          "type": "string"
                                        },
                                        "securityFeatures": {
                                          "type": "array",
                                          "items": {
                                            "type": "object",
                                            "properties": {
                                              "securityType": {
                                                "type": "string"
                                              }
                                            }
                                          }
                                        },
                                        "vehicleAssessments": {
                                          "type": "array",
                                          "items": {
                                            "$ref": "./common.oas2.yml#/definitions/vehicle-assessment"
                                          }
                                        },
                                        "permanentFixtureAmount": {
                                          "$ref": "./common.oas2.yml#/definitions/amount-extended"
                                        },
                                        "isPermanentlySited": {
                                          "type": "boolean"
                                        },
                                        "isPrestige": {
                                          "type": "boolean"
                                        },
                                        "isExotic": {
                                          "type": "boolean"
                                        },
                                        "hasImmobiliser": {
                                          "type": "boolean"
                                        },
                                        "parkingLocations": {
                                          "type": "array",
                                          "items": {
                                            "type": "object",
                                            "properties": {
                                              "code": {
                                                "type": "string",
                                                "description": "example - onRoad, offRoad, carPort"
                                              },
                                              "description": {
                                                "type": "string",
                                                "description": "Add a description of parking location, if applicable"
                                              }
                                            }
                                          }
                                        },
                                        "chassisNumber": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  ]
                                },
                                "coverType": {
                                  "type": "string",
                                  "description": "Type of cover purchased for the insured risk"
                                },
                                "assessmentResults": {
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/assessment-result"
                                  }
                                },
                                "confirmationHistories": {
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/confirmation-history"
                                  }
                                },
                                "insuredParty": {
                                  "type": "object",
                                  "properties": {
                                    "partyId": {
                                      "type": "string"
                                    },
                                    "systemOfRecord": {
                                      "title": "System Of Record",
                                      "type": "string",
                                      "enum": [
                                        "LOREM",
                                        "HEART",
                                        "IPSUM_CENTER",
                                        "SECURITY",
                                        "BAR",
                                        "FOO",
                                        "BUDDY",
                                        "BONUS"
                                      ]
                                    },
                                    "partyRole": {
                                      "title": "Party Role",
                                      "type": "string",
                                      "enum": [
                                        "CUSTOMER",
                                        "INSURED",
                                        "ADDITIONAL_INSURED",
                                        "NAMED_DRIVER",
                                        "PRIMARY_CONTACT",
                                        "SECONDARY_CONTACT",
                                        "AUTHORISER",
                                        "NAMED_PARTY"
                                      ]
                                    }
                                  }
                                },
                                "generalCover": {
                                  "$ref": "./common.oas2.yml#/definitions/general-cover"
                                },
                                "settlementBasis": {
                                  "type": "string",
                                  "enum": ["AGREED_VALUE", "FIXED_VALUE", "MARKET_VALUE", "SUM_INSURED"],
                                  "description": "The basis on which the confirmation would be settled on this risk"
                                },
                                "isDisabled": {
                                  "type": "boolean",
                                  "description": "Used mainly for Quote UI where the user can enable/disable the risks in UI"
                                },
                                "financialServicesProduct": {
                                  "type": "object",
                                  "properties": {
                                    "wordingCode": {
                                      "type": "string",
                                      "description": "Only use when necessary to override the wording code at insuredRisk Group level. e.g. Lorem liability risks which have different wording for each risk within the same group"
                                    }
                                  }
                                },
                                "isRiskTransitioning": {
                                  "type": "boolean",
                                  "description": "Only used for Rating renewals. Indicates if the risk is transitioning from one rating engine to another"
                                },
                                "deferments": {
                                  "type": "array",
                                  "items": {
                                    "$ref": "./common.oas2.yml#/definitions/deferment"
                                  }
                                },
                                "namedParties": {
                                  "type": "object",
                                  "properties": {
                                    "partyId": {
                                      "type": "string"
                                    },
                                    "systemOfRecord": {
                                      "title": "System Of Record",
                                      "type": "string",
                                      "enum": [
                                        "LOREM",
                                        "HEART",
                                        "IPSUM_CENTER",
                                        "SECURITY",
                                        "BAR",
                                        "FOO",
                                        "BUDDY",
                                        "BONUS"
                                      ]
                                    },
                                    "partyRole": {
                                      "title": "Party Role",
                                      "type": "string",
                                      "enum": [
                                        "CUSTOMER",
                                        "INSURED",
                                        "ADDITIONAL_INSURED",
                                        "NAMED_DRIVER",
                                        "PRIMARY_CONTACT",
                                        "SECONDARY_CONTACT",
                                        "AUTHORISER",
                                        "NAMED_PARTY"
                                      ]
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "financialServicesProduct": {
                            "$ref": "./common.oas2.yml#/definitions/contract-specification"
                          },
                          "questionAnswers": {
                            "type": "array",
                            "items": {
                              "$ref": "./common.oas2.yml#/definitions/question-instance"
                            }
                          },
                          "benefits": {
                            "type": "array",
                            "items": {
                              "$ref": "./common.oas2.yml#/definitions/benefit"
                            }
                          },
                          "discounts": {
                            "type": "array",
                            "items": {
                              "$ref": "./common.oas2.yml#/definitions/discount"
                            }
                          },
                          "excesses": {
                            "type": "array",
                            "items": {
                              "$ref": "./common.oas2.yml#/definitions/excess"
                            }
                          },
                          "rates": {
                            "type": "array",
                            "items": {
                              "$ref": "./common.oas2.yml#/definitions/rate"
                            }
                          },
                          "exposureGrade": {
                            "type": "string",
                            "enum": [
                              "ZERO_AT_FAULT_LAST_3_YEARS",
                              "ONE_AT_FAULT_LAST_3_YEARS",
                              "TWO_AT_FAULT_LAST_3_YEARS",
                              "NO_PREVIOUS_HISTORY",
                              "THREEPLUS_AT_FAULT_LAST_3_YEARS"
                            ]
                          },
                          "exposureAmount": {
                            "type": "number",
                            "description": "TODO: can we delete this "
                          },
                          "premiumDetails": {
                            "type": "array",
                            "items": {
                              "$ref": "./common.oas2.yml#/definitions/premium-detail"
                            }
                          },
                          "adjustments": {
                            "type": "array",
                            "items": {
                              "$ref": "./common.oas2.yml#/definitions/adjustment"
                            }
                          },
                          "coverageItems": {
                            "type": "array",
                            "items": {
                              "$ref": "./common.oas2.yml#/definitions/coverage-item"
                            }
                          },
                          "groupSubType": {
                            "type": "string",
                            "description": "",
                            "enum": ["FLEET", "NON_FLEET"]
                          }
                        }
                      }
                    },
                    "actionCode": {
                      "title": "Action Code",
                      "description": " TERMINATE",
                      "type": "string",
                      "enum": ["TERMINATE"]
                    }
                  }
                }
              },
              "notes": {
                "type": "array",
                "items": {
                  "title": "Note",
                  "description": "",
                  "type": "object",
                  "properties": {
                    "effectiveDate": {
                      "title": "Date Time Extended",
                      "type": "object",
                      "properties": {
                        "value": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "format": {
                          "type": "string",
                          "enum": [
                            "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                            "yyyy-MM-dd'T'HH:mm:ss'Z'",
                            "yyyy-MM-dd'T'HH:mm'Z'",
                            "yyyy-MM-dd'T'HH",
                            "yyyy-MM-dd",
                            "yyyy-MM",
                            "yyyy"
                          ]
                        },
                        "minValue": {
                          "type": "string"
                        },
                        "maxValue": {
                          "type": "string"
                        },
                        "defaultValue": {
                          "type": "string"
                        }
                      },
                      "required": ["value"]
                    },
                    "text": {
                      "type": "string"
                    },
                    "externalReferences": {
                      "description": "",
                      "type": "array",
                      "items": {
                        "title": "External Reference",
                        "description": "",
                        "type": "object",
                        "properties": {
                          "namespace": {
                            "description": "A namespace for the identifier.",
                            "type": "string"
                          },
                          "identifier": {
                            "description": "An identifier for the entity",
                            "type": "string"
                          }
                        }
                      }
                    },
                    "forInternalUse": {
                      "type": "boolean"
                    }
                  }
                }
              },
              "agent": {
                "title": "Agent",
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string",
                    "format": "email"
                  },
                  "name": {
                    "type": "string"
                  },
                  "costOfSaleGroup": {
                    "type": "string"
                  },
                  "externalReferences": {
                    "type": "array",
                    "items": {
                      "title": "External Reference",
                      "description": "",
                      "type": "object",
                      "properties": {
                        "namespace": {
                          "description": "A namespace for the identifier.",
                          "type": "string"
                        },
                        "identifier": {
                          "description": "An identifier for the entity",
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              },
              "servicingChannel": {
                "title": "Servicing Channel",
                "type": "object",
                "properties": {
                  "channelName": {
                    "type": "string"
                  },
                  "servicedBy": {
                    "type": "string"
                  }
                }
              },
              "status": {
                "type": "string",
                "enum": ["IN_FORCE", "EXPIRED", "CANCELLED", "SUSPENDED", "PENDING", "CANCELLATION_PENDING"],
                "description": "Current state of the policy i.e. whether active, cancelled, lapsed, at effective date"
              },
              "transactionData": {
                "type": "object",
                "properties": {
                  "paymentTransactions": {
                    "type": "array",
                    "items": {
                      "title": "Payment Transaction",
                      "type": "object",
                      "properties": {
                        "accountName": {
                          "type": "string"
                        },
                        "accountNumber": {
                          "type": "string"
                        },
                        "bankName": {
                          "type": "string"
                        },
                        "paymentMethod": {
                          "type": "string",
                          "enum": ["CASH", "CHEQUE", "DIRECT_DEBIT", "DIRECT_CREDIT", "CREDIT_CARD", "BANK_TRANSFER"]
                        },
                        "transactionReference": {
                          "type": "string"
                        },
                        "amount": {
                          "title": "Amount Extended",
                          "type": "object",
                          "properties": {
                            "amount": {
                              "type": "number"
                            },
                            "currencyCode": {
                              "type": "string"
                            },
                            "isGSTInclusive": {
                              "type": "boolean"
                            },
                            "GSTAmount": {
                              "type": "number"
                            },
                            "GSTPercentageApplicable": {
                              "type": "number"
                            },
                            "description": {
                              "type": "string"
                            }
                          },
                          "required": ["amount"]
                        },
                        "transactionDate": {
                          "title": "Date Time Extended",
                          "type": "object",
                          "properties": {
                            "value": {
                              "type": "string",
                              "format": "date-time"
                            },
                            "format": {
                              "type": "string",
                              "enum": [
                                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                "yyyy-MM-dd'T'HH:mm'Z'",
                                "yyyy-MM-dd'T'HH",
                                "yyyy-MM-dd",
                                "yyyy-MM",
                                "yyyy"
                              ]
                            },
                            "minValue": {
                              "type": "string"
                            },
                            "maxValue": {
                              "type": "string"
                            },
                            "defaultValue": {
                              "type": "string"
                            }
                          },
                          "required": ["value"]
                        },
                        "cardType": {
                          "type": "string"
                        },
                        "cardHolderName": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              },
              "paymentArrangement": {
                "title": "Payment Arrangement",
                "type": "object",
                "properties": {
                  "anniversaryDay": {
                    "type": "integer"
                  },
                  "firstDueDate": {
                    "title": "Date Time Extended",
                    "type": "object",
                    "properties": {
                      "value": {
                        "type": "string",
                        "format": "date-time"
                      },
                      "format": {
                        "type": "string",
                        "enum": [
                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                          "yyyy-MM-dd'T'HH:mm:ss'Z'",
                          "yyyy-MM-dd'T'HH:mm'Z'",
                          "yyyy-MM-dd'T'HH",
                          "yyyy-MM-dd",
                          "yyyy-MM",
                          "yyyy"
                        ]
                      },
                      "minValue": {
                        "type": "string"
                      },
                      "maxValue": {
                        "type": "string"
                      },
                      "defaultValue": {
                        "type": "string"
                      }
                    },
                    "required": ["value"]
                  },
                  "nextDueDate": {
                    "title": "Date Time Extended",
                    "type": "object",
                    "properties": {
                      "value": {
                        "type": "string",
                        "format": "date-time"
                      },
                      "format": {
                        "type": "string",
                        "enum": [
                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                          "yyyy-MM-dd'T'HH:mm:ss'Z'",
                          "yyyy-MM-dd'T'HH:mm'Z'",
                          "yyyy-MM-dd'T'HH",
                          "yyyy-MM-dd",
                          "yyyy-MM",
                          "yyyy"
                        ]
                      },
                      "minValue": {
                        "type": "string"
                      },
                      "maxValue": {
                        "type": "string"
                      },
                      "defaultValue": {
                        "type": "string"
                      }
                    },
                    "required": ["value"]
                  },
                  "paymentFrequency": {
                    "title": "Premium Frequency",
                    "type": "string",
                    "description": "",
                    "enum": ["ANNUALLY", "QUARTERLY", "MONTHLY", "FORTNIGHTLY", "ONE_OFF", "HALF_YEARLY"]
                  },
                  "paymentDetails": {
                    "type": "array",
                    "description": "Payment details",
                    "items": {
                      "title": "Payment Arrangement Detail",
                      "type": "object",
                      "properties": {
                        "paymentType": {
                          "type": "string",
                          "enum": ["INITIAL", "RECURRING"]
                        },
                        "accountName": {
                          "type": "string",
                          "description": "The name of the account holder paying for this insurance policy"
                        },
                        "accountNumber": {
                          "type": "string",
                          "description": "The bank account or credit card number where premium amount is deducted from"
                        },
                        "bankName": {
                          "type": "string"
                        },
                        "paymentMethod": {
                          "type": "string",
                          "enum": ["CASH", "CHEQUE", "DIRECT_DEBIT", "DIRECT_CREDIT", "CREDIT_CARD", "BANK_TRANSFER"]
                        },
                        "personName": {
                          "type": "string",
                          "description": "Person name may differ from the bank account name"
                        },
                        "isAccountHolder": {
                          "type": "boolean",
                          "description": "Is customer the account holder"
                        },
                        "hasOneSignatory": {
                          "type": "boolean",
                          "description": "Only one signature required on this account"
                        },
                        "hasAcceptedTerms": {
                          "type": "boolean",
                          "description": "Given IAG authority to commence diret debits and for the nominated bank to accept Direct Debits from IAG"
                        },
                        "isDeclarationStatementAccepted": {
                          "type": "boolean",
                          "description": "Customer has accepted the paperless declaration statement"
                        },
                        "amount": {
                          "title": "Amount Extended",
                          "type": "object",
                          "properties": {
                            "amount": {
                              "type": "number"
                            },
                            "currencyCode": {
                              "type": "string"
                            },
                            "isGSTInclusive": {
                              "type": "boolean"
                            },
                            "GSTAmount": {
                              "type": "number"
                            },
                            "GSTPercentageApplicable": {
                              "type": "number"
                            },
                            "description": {
                              "type": "string"
                            }
                          },
                          "required": ["amount"]
                        },
                        "merchantReference": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "billedToDate": {
                    "title": "Date Time Extended",
                    "type": "object",
                    "properties": {
                      "value": {
                        "type": "string",
                        "format": "date-time"
                      },
                      "format": {
                        "type": "string",
                        "enum": [
                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                          "yyyy-MM-dd'T'HH:mm:ss'Z'",
                          "yyyy-MM-dd'T'HH:mm'Z'",
                          "yyyy-MM-dd'T'HH",
                          "yyyy-MM-dd",
                          "yyyy-MM",
                          "yyyy"
                        ]
                      },
                      "minValue": {
                        "type": "string"
                      },
                      "maxValue": {
                        "type": "string"
                      },
                      "defaultValue": {
                        "type": "string"
                      }
                    },
                    "required": ["value"]
                  },
                  "paymentPlanCode": {
                    "type": "string"
                  }
                }
              },
              "benefits": {
                "type": "array",
                "items": {
                  "title": "Benefit",
                  "description": "TODO: (Find this in GW??) This includes sum insured and/or limits like weekly rental",
                  "type": "object",
                  "properties": {
                    "amount": {
                      "title": "Amount Extended",
                      "type": "object",
                      "properties": {
                        "amount": {
                          "type": "number"
                        },
                        "currencyCode": {
                          "type": "string"
                        },
                        "isGSTInclusive": {
                          "type": "boolean"
                        },
                        "GSTAmount": {
                          "type": "number"
                        },
                        "GSTPercentageApplicable": {
                          "type": "number"
                        },
                        "description": {
                          "type": "string"
                        }
                      },
                      "required": ["amount"]
                    },
                    "category": {
                      "type": "string",
                      "description": "eg. SumInsured, ComponentSumInsured,  RiskSumInsured"
                    },
                    "code": {
                      "type": "string"
                    },
                    "limits": {
                      "description": "",
                      "type": "array",
                      "items": {
                        "title": "Limit",
                        "description": "",
                        "type": "object",
                        "properties": {
                          "amount": {
                            "title": "Amount Extended",
                            "type": "object",
                            "properties": {
                              "amount": {
                                "type": "number"
                              },
                              "currencyCode": {
                                "type": "string"
                              },
                              "isGSTInclusive": {
                                "type": "boolean"
                              },
                              "GSTAmount": {
                                "type": "number"
                              },
                              "GSTPercentageApplicable": {
                                "type": "number"
                              },
                              "description": {
                                "type": "string"
                              }
                            },
                            "required": ["amount"]
                          },
                          "startDate": {
                            "title": "Date Time Extended",
                            "type": "object",
                            "properties": {
                              "value": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "format": {
                                "type": "string",
                                "enum": [
                                  "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                  "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                  "yyyy-MM-dd'T'HH:mm'Z'",
                                  "yyyy-MM-dd'T'HH",
                                  "yyyy-MM-dd",
                                  "yyyy-MM",
                                  "yyyy"
                                ]
                              },
                              "minValue": {
                                "type": "string"
                              },
                              "maxValue": {
                                "type": "string"
                              },
                              "defaultValue": {
                                "type": "string"
                              }
                            },
                            "required": ["value"]
                          },
                          "endDate": {
                            "title": "Date Time Extended",
                            "type": "object",
                            "properties": {
                              "value": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "format": {
                                "type": "string",
                                "enum": [
                                  "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                                  "yyyy-MM-dd'T'HH:mm:ss'Z'",
                                  "yyyy-MM-dd'T'HH:mm'Z'",
                                  "yyyy-MM-dd'T'HH",
                                  "yyyy-MM-dd",
                                  "yyyy-MM",
                                  "yyyy"
                                ]
                              },
                              "minValue": {
                                "type": "string"
                              },
                              "maxValue": {
                                "type": "string"
                              },
                              "defaultValue": {
                                "type": "string"
                              }
                            },
                            "required": ["value"]
                          },
                          "name": {
                            "type": "string",
                            "description": "Label or text displayed on GUI"
                          },
                          "code": {
                            "type": "string",
                            "description": "Value used for mapping at the backend system"
                          },
                          "category": {
                            "description": "Examples includeHome,ContentsSpecified ItemsOptional CoverRental Amount, DailyConfirmationableAmount",
                            "type": "string"
                          },
                          "description": {
                            "type": "string"
                          },
                          "value": {
                            "type": "string",
                            "description": "This represents the percentage of requested sum insured"
                          },
                          "limitNumber": {
                            "type": "string"
                          },
                          "coverageType": {
                            "type": "string",
                            "description": "conformed value"
                          }
                        }
                      }
                    },
                    "description": {
                      "type": "string"
                    },
                    "value": {
                      "type": "string"
                    },
                    "premiumClass": {
                      "type": "string"
                    }
                  }
                }
              },
              "excesses": {
                "type": "array",
                "items": {
                  "title": "Excess",
                  "description": "",
                  "type": "object",
                  "properties": {
                    "code": {
                      "type": "string",
                      "description": "code used in System of Record, if available"
                    },
                    "name": {
                      "type": "string",
                      "description": "Specific to System of Record"
                    },
                    "excessCategory": {
                      "type": "string",
                      "enum": [
                        "STANDARD",
                        "VOLUNTARY",
                        "IMPOSED",
                        "NAMED_DRIVER",
                        "COVERAGE_ITEM",
                        "THEFT",
                        "NAMED_DRIVER_IMPOSED",
                        "UNNAMED_DRIVER_IMPOSED",
                        "UNNAMED_DRIVER",
                        "SPECIAL",
                        "SPECIAL_IMPOSED"
                      ]
                    },
                    "minimumAmount": {
                      "title": "Amount Extended",
                      "type": "object",
                      "properties": {
                        "amount": {
                          "type": "number"
                        },
                        "currencyCode": {
                          "type": "string"
                        },
                        "isGSTInclusive": {
                          "type": "boolean"
                        },
                        "GSTAmount": {
                          "type": "number"
                        },
                        "GSTPercentageApplicable": {
                          "type": "number"
                        },
                        "description": {
                          "type": "string"
                        }
                      },
                      "required": ["amount"]
                    },
                    "maximumAmount": {
                      "title": "Amount Extended",
                      "type": "object",
                      "properties": {
                        "amount": {
                          "type": "number"
                        },
                        "currencyCode": {
                          "type": "string"
                        },
                        "isGSTInclusive": {
                          "type": "boolean"
                        },
                        "GSTAmount": {
                          "type": "number"
                        },
                        "GSTPercentageApplicable": {
                          "type": "number"
                        },
                        "description": {
                          "type": "string"
                        }
                      },
                      "required": ["amount"]
                    },
                    "references": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "namespace": {
                            "type": "string",
                            "enum": ["NAMED_DRIVER_ID"]
                          },
                          "identifier": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "value": {
                      "type": "string",
                      "description": "TODO - may not be required"
                    },
                    "tier": {
                      "type": "string",
                      "description": "TODO - may not be required"
                    },
                    "rate": {
                      "type": "number"
                    }
                  },
                  "required": ["excessCategory"]
                }
              },
              "discounts": {
                "type": "array",
                "items": {
                  "title": "Discount",
                  "description": "",
                  "type": "object",
                  "properties": {
                    "code": {
                      "type": "string",
                      "description": "Code used in System of Record, if available"
                    },
                    "name": {
                      "type": "string",
                      "description": "Specific to System of Record"
                    },
                    "value": {
                      "type": "string"
                    },
                    "discountType": {
                      "type": "string",
                      "enum": ["PERCENT", "RATE", "DOLLAR_AMOUNT", "OTHER"]
                    },
                    "amount": {
                      "title": "Amount Extended",
                      "type": "object",
                      "properties": {
                        "amount": {
                          "type": "number"
                        },
                        "currencyCode": {
                          "type": "string"
                        },
                        "isGSTInclusive": {
                          "type": "boolean"
                        },
                        "GSTAmount": {
                          "type": "number"
                        },
                        "GSTPercentageApplicable": {
                          "type": "number"
                        },
                        "description": {
                          "type": "string"
                        }
                      },
                      "required": ["amount"]
                    },
                    "priority": {
                      "type": "integer",
                      "description": "Order in which the discount is applied"
                    }
                  },
                  "required": ["discountType"]
                }
              },
              "adjustments": {
                "type": "array",
                "items": {
                  "title": "Adjustment",
                  "description": "",
                  "type": "object",
                  "properties": {
                    "amount": {
                      "title": "Amount Extended",
                      "type": "object",
                      "properties": {
                        "amount": {
                          "type": "number"
                        },
                        "currencyCode": {
                          "type": "string"
                        },
                        "isGSTInclusive": {
                          "type": "boolean"
                        },
                        "GSTAmount": {
                          "type": "number"
                        },
                        "GSTPercentageApplicable": {
                          "type": "number"
                        },
                        "description": {
                          "type": "string"
                        }
                      },
                      "required": ["amount"]
                    },
                    "code": {
                      "type": "string",
                      "description": "code used in System of Record, if available"
                    },
                    "factor": {
                      "type": "string"
                    },
                    "reason": {
                      "type": "string"
                    },
                    "adjustmentType": {
                      "type": "string",
                      "enum": ["PERCENT", "RATE", "DOLLAR_AMOUNT"]
                    },
                    "name": {
                      "type": "string",
                      "description": "Specific to System of Record"
                    },
                    "priority": {
                      "type": "integer",
                      "description": "Order in which the discount is applied"
                    }
                  },
                  "required": ["adjustmentType"]
                }
              },
              "premiumDetails": {
                "type": "array",
                "description": "Includes premium details for this insurance policy",
                "items": {
                  "title": "Premium Detail",
                  "type": "object",
                  "properties": {
                    "category": {
                      "type": "string"
                    },
                    "code": {
                      "type": "string"
                    },
                    "writtenPremium": {
                      "title": "Premium",
                      "description": "",
                      "type": "object",
                      "properties": {
                        "companyPremium": {
                          "type": "number",
                          "description": "Company Premium"
                        },
                        "naturalDisasterPremium": {
                          "type": "number"
                        },
                        "earthquakeLevy": {
                          "type": "number",
                          "description": "EQC Levy"
                        },
                        "fireServiceLevy": {
                          "type": "number",
                          "description": "Fire Service Levy"
                        },
                        "gst": {
                          "type": "number",
                          "description": "GST Amount"
                        },
                        "instalmentCharge": {
                          "type": "number"
                        },
                        "adminCharge": {
                          "type": "number",
                          "description": "Admin Charge"
                        },
                        "commissionRate": {
                          "type": "number",
                          "description": "Commission Rate"
                        },
                        "minimumPremiumUsed": {
                          "type": "boolean"
                        },
                        "naturalDisasterCommission": {
                          "type": "number"
                        },
                        "terrorTotalTransactionCost": {
                          "type": "number"
                        },
                        "commissionAmount": {
                          "type": "number"
                        },
                        "commissionGST": {
                          "type": "number"
                        },
                        "totalPremium": {
                          "type": "number"
                        },
                        "businessPremium": {
                          "type": "number"
                        },
                        "cappingAndCupping": {
                          "type": "object",
                          "properties": {
                            "premiumAmount": {
                              "title": "Amount Extended",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "type": "number"
                                },
                                "currencyCode": {
                                  "type": "string"
                                },
                                "isGSTInclusive": {
                                  "type": "boolean"
                                },
                                "GSTAmount": {
                                  "type": "number"
                                },
                                "GSTPercentageApplicable": {
                                  "type": "number"
                                },
                                "description": {
                                  "type": "string"
                                }
                              },
                              "required": ["amount"]
                            },
                            "adjustmentFactor": {
                              "type": "number"
                            },
                            "premiumAdjustmentDueToOverride": {
                              "title": "Amount Extended",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "type": "number"
                                },
                                "currencyCode": {
                                  "type": "string"
                                },
                                "isGSTInclusive": {
                                  "type": "boolean"
                                },
                                "GSTAmount": {
                                  "type": "number"
                                },
                                "GSTPercentageApplicable": {
                                  "type": "number"
                                },
                                "description": {
                                  "type": "string"
                                }
                              },
                              "required": ["amount"]
                            }
                          }
                        }
                      }
                    },
                    "annualisedPremium": {
                      "title": "Premium",
                      "description": "",
                      "type": "object",
                      "properties": {
                        "companyPremium": {
                          "type": "number",
                          "description": "Company Premium"
                        },
                        "naturalDisasterPremium": {
                          "type": "number"
                        },
                        "earthquakeLevy": {
                          "type": "number",
                          "description": "EQC Levy"
                        },
                        "fireServiceLevy": {
                          "type": "number",
                          "description": "Fire Service Levy"
                        },
                        "gst": {
                          "type": "number",
                          "description": "GST Amount"
                        },
                        "instalmentCharge": {
                          "type": "number"
                        },
                        "adminCharge": {
                          "type": "number",
                          "description": "Admin Charge"
                        },
                        "commissionRate": {
                          "type": "number",
                          "description": "Commission Rate"
                        },
                        "minimumPremiumUsed": {
                          "type": "boolean"
                        },
                        "naturalDisasterCommission": {
                          "type": "number"
                        },
                        "terrorTotalTransactionCost": {
                          "type": "number"
                        },
                        "commissionAmount": {
                          "type": "number"
                        },
                        "commissionGST": {
                          "type": "number"
                        },
                        "totalPremium": {
                          "type": "number"
                        },
                        "businessPremium": {
                          "type": "number"
                        },
                        "cappingAndCupping": {
                          "type": "object",
                          "properties": {
                            "premiumAmount": {
                              "title": "Amount Extended",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "type": "number"
                                },
                                "currencyCode": {
                                  "type": "string"
                                },
                                "isGSTInclusive": {
                                  "type": "boolean"
                                },
                                "GSTAmount": {
                                  "type": "number"
                                },
                                "GSTPercentageApplicable": {
                                  "type": "number"
                                },
                                "description": {
                                  "type": "string"
                                }
                              },
                              "required": ["amount"]
                            },
                            "adjustmentFactor": {
                              "type": "number"
                            },
                            "premiumAdjustmentDueToOverride": {
                              "title": "Amount Extended",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "type": "number"
                                },
                                "currencyCode": {
                                  "type": "string"
                                },
                                "isGSTInclusive": {
                                  "type": "boolean"
                                },
                                "GSTAmount": {
                                  "type": "number"
                                },
                                "GSTPercentageApplicable": {
                                  "type": "number"
                                },
                                "description": {
                                  "type": "string"
                                }
                              },
                              "required": ["amount"]
                            }
                          }
                        }
                      }
                    },
                    "transactionPremium": {
                      "title": "Premium",
                      "description": "",
                      "type": "object",
                      "properties": {
                        "companyPremium": {
                          "type": "number",
                          "description": "Company Premium"
                        },
                        "naturalDisasterPremium": {
                          "type": "number"
                        },
                        "earthquakeLevy": {
                          "type": "number",
                          "description": "EQC Levy"
                        },
                        "fireServiceLevy": {
                          "type": "number",
                          "description": "Fire Service Levy"
                        },
                        "gst": {
                          "type": "number",
                          "description": "GST Amount"
                        },
                        "instalmentCharge": {
                          "type": "number"
                        },
                        "adminCharge": {
                          "type": "number",
                          "description": "Admin Charge"
                        },
                        "commissionRate": {
                          "type": "number",
                          "description": "Commission Rate"
                        },
                        "minimumPremiumUsed": {
                          "type": "boolean"
                        },
                        "naturalDisasterCommission": {
                          "type": "number"
                        },
                        "terrorTotalTransactionCost": {
                          "type": "number"
                        },
                        "commissionAmount": {
                          "type": "number"
                        },
                        "commissionGST": {
                          "type": "number"
                        },
                        "totalPremium": {
                          "type": "number"
                        },
                        "businessPremium": {
                          "type": "number"
                        },
                        "cappingAndCupping": {
                          "type": "object",
                          "properties": {
                            "premiumAmount": {
                              "title": "Amount Extended",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "type": "number"
                                },
                                "currencyCode": {
                                  "type": "string"
                                },
                                "isGSTInclusive": {
                                  "type": "boolean"
                                },
                                "GSTAmount": {
                                  "type": "number"
                                },
                                "GSTPercentageApplicable": {
                                  "type": "number"
                                },
                                "description": {
                                  "type": "string"
                                }
                              },
                              "required": ["amount"]
                            },
                            "adjustmentFactor": {
                              "type": "number"
                            },
                            "premiumAdjustmentDueToOverride": {
                              "title": "Amount Extended",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "type": "number"
                                },
                                "currencyCode": {
                                  "type": "string"
                                },
                                "isGSTInclusive": {
                                  "type": "boolean"
                                },
                                "GSTAmount": {
                                  "type": "number"
                                },
                                "GSTPercentageApplicable": {
                                  "type": "number"
                                },
                                "description": {
                                  "type": "string"
                                }
                              },
                              "required": ["amount"]
                            }
                          }
                        }
                      }
                    },
                    "instalmentPremium": {
                      "title": "Premium",
                      "description": "",
                      "type": "object",
                      "properties": {
                        "companyPremium": {
                          "type": "number",
                          "description": "Company Premium"
                        },
                        "naturalDisasterPremium": {
                          "type": "number"
                        },
                        "earthquakeLevy": {
                          "type": "number",
                          "description": "EQC Levy"
                        },
                        "fireServiceLevy": {
                          "type": "number",
                          "description": "Fire Service Levy"
                        },
                        "gst": {
                          "type": "number",
                          "description": "GST Amount"
                        },
                        "instalmentCharge": {
                          "type": "number"
                        },
                        "adminCharge": {
                          "type": "number",
                          "description": "Admin Charge"
                        },
                        "commissionRate": {
                          "type": "number",
                          "description": "Commission Rate"
                        },
                        "minimumPremiumUsed": {
                          "type": "boolean"
                        },
                        "naturalDisasterCommission": {
                          "type": "number"
                        },
                        "terrorTotalTransactionCost": {
                          "type": "number"
                        },
                        "commissionAmount": {
                          "type": "number"
                        },
                        "commissionGST": {
                          "type": "number"
                        },
                        "totalPremium": {
                          "type": "number"
                        },
                        "businessPremium": {
                          "type": "number"
                        },
                        "cappingAndCupping": {
                          "type": "object",
                          "properties": {
                            "premiumAmount": {
                              "title": "Amount Extended",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "type": "number"
                                },
                                "currencyCode": {
                                  "type": "string"
                                },
                                "isGSTInclusive": {
                                  "type": "boolean"
                                },
                                "GSTAmount": {
                                  "type": "number"
                                },
                                "GSTPercentageApplicable": {
                                  "type": "number"
                                },
                                "description": {
                                  "type": "string"
                                }
                              },
                              "required": ["amount"]
                            },
                            "adjustmentFactor": {
                              "type": "number"
                            },
                            "premiumAdjustmentDueToOverride": {
                              "title": "Amount Extended",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "type": "number"
                                },
                                "currencyCode": {
                                  "type": "string"
                                },
                                "isGSTInclusive": {
                                  "type": "boolean"
                                },
                                "GSTAmount": {
                                  "type": "number"
                                },
                                "GSTPercentageApplicable": {
                                  "type": "number"
                                },
                                "description": {
                                  "type": "string"
                                }
                              },
                              "required": ["amount"]
                            }
                          }
                        }
                      }
                    },
                    "initialPaymentPremium": {
                      "title": "Premium",
                      "description": "",
                      "type": "object",
                      "properties": {
                        "companyPremium": {
                          "type": "number",
                          "description": "Company Premium"
                        },
                        "naturalDisasterPremium": {
                          "type": "number"
                        },
                        "earthquakeLevy": {
                          "type": "number",
                          "description": "EQC Levy"
                        },
                        "fireServiceLevy": {
                          "type": "number",
                          "description": "Fire Service Levy"
                        },
                        "gst": {
                          "type": "number",
                          "description": "GST Amount"
                        },
                        "instalmentCharge": {
                          "type": "number"
                        },
                        "adminCharge": {
                          "type": "number",
                          "description": "Admin Charge"
                        },
                        "commissionRate": {
                          "type": "number",
                          "description": "Commission Rate"
                        },
                        "minimumPremiumUsed": {
                          "type": "boolean"
                        },
                        "naturalDisasterCommission": {
                          "type": "number"
                        },
                        "terrorTotalTransactionCost": {
                          "type": "number"
                        },
                        "commissionAmount": {
                          "type": "number"
                        },
                        "commissionGST": {
                          "type": "number"
                        },
                        "totalPremium": {
                          "type": "number"
                        },
                        "businessPremium": {
                          "type": "number"
                        },
                        "cappingAndCupping": {
                          "type": "object",
                          "properties": {
                            "premiumAmount": {
                              "title": "Amount Extended",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "type": "number"
                                },
                                "currencyCode": {
                                  "type": "string"
                                },
                                "isGSTInclusive": {
                                  "type": "boolean"
                                },
                                "GSTAmount": {
                                  "type": "number"
                                },
                                "GSTPercentageApplicable": {
                                  "type": "number"
                                },
                                "description": {
                                  "type": "string"
                                }
                              },
                              "required": ["amount"]
                            },
                            "adjustmentFactor": {
                              "type": "number"
                            },
                            "premiumAdjustmentDueToOverride": {
                              "title": "Amount Extended",
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "type": "number"
                                },
                                "currencyCode": {
                                  "type": "string"
                                },
                                "isGSTInclusive": {
                                  "type": "boolean"
                                },
                                "GSTAmount": {
                                  "type": "number"
                                },
                                "GSTPercentageApplicable": {
                                  "type": "number"
                                },
                                "description": {
                                  "type": "string"
                                }
                              },
                              "required": ["amount"]
                            }
                          }
                        }
                      }
                    },
                    "premiumClass": {
                      "type": "string"
                    },
                    "premiumFrequency": {
                      "title": "Premium Frequency",
                      "type": "string",
                      "description": "",
                      "enum": ["ANNUALLY", "QUARTERLY", "MONTHLY", "FORTNIGHTLY", "ONE_OFF", "HALF_YEARLY"]
                    }
                  }
                }
              },
              "financialServicesProduct": {
                "title": "Contract Specification",
                "description": "The representation of the rules governing the commitments a financial services provider has a business interest in.",
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "code": {
                    "type": "string",
                    "description": "System of record code. At policy level this is the package code. At insured Risk Group level, this is Risk Specification class, eg. For HEART  \"PEC\", \"PES\" etc."
                  },
                  "description": {
                    "description": "Policy wording",
                    "type": "string"
                  },
                  "wordingCode": {
                    "type": "string"
                  },
                  "conditions": {
                    "description": "",
                    "type": "array",
                    "items": {
                      "title": "Peril Category",
                      "description": "",
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "code": {
                          "type": "string"
                        },
                        "value": {
                          "type": "string"
                        },
                        "description": {
                          "type": "string"
                        },
                        "subCategories": {
                          "description": "",
                          "type": "array",
                          "items": {
                            "$ref": "#/definitions/peril-category"
                          }
                        }
                      }
                    }
                  },
                  "coverageClasses": {
                    "description": "",
                    "type": "array",
                    "items": {
                      "title": "Peril Category",
                      "description": "",
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "code": {
                          "type": "string"
                        },
                        "value": {
                          "type": "string"
                        },
                        "description": {
                          "type": "string"
                        },
                        "subCategories": {
                          "description": "",
                          "type": "array",
                          "items": {
                            "$ref": "#/definitions/peril-category"
                          }
                        }
                      }
                    }
                  },
                  "exclusions": {
                    "description": "",
                    "type": "array",
                    "items": {
                      "title": "Peril Category",
                      "description": "",
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "code": {
                          "type": "string"
                        },
                        "value": {
                          "type": "string"
                        },
                        "description": {
                          "type": "string"
                        },
                        "subCategories": {
                          "description": "",
                          "type": "array",
                          "items": {
                            "$ref": "#/definitions/peril-category"
                          }
                        }
                      }
                    }
                  },
                  "productVersion": {
                    "type": "string"
                  },
                  "ratingBrand": {
                    "type": "string"
                  },
                  "ratingLine": {
                    "type": "string",
                    "enum": ["PERSONAL", "COMMERCIAL"]
                  },
                  "ratingProductName": {
                    "type": "string"
                  },
                  "isRural": {
                    "type": "boolean"
                  }
                }
              },
              "policyHandler": {
                "type": "string",
                "description": "Person who is handling the policy from Agency/Broker etc"
              },
              "loyaltyRegistrations": {
                "type": "array",
                "items": {
                  "title": "Loyalty Registration",
                  "type": "object",
                  "properties": {
                    "loyaltyId": {
                      "type": "string"
                    },
                    "loyaltyType": {
                      "type": "string"
                    },
                    "cardHolderName": {
                      "type": "string"
                    },
                    "startDate": {
                      "title": "Date Only Extended",
                      "type": "object",
                      "properties": {
                        "value": {
                          "type": "string",
                          "format": "date"
                        },
                        "format": {
                          "type": "string",
                          "enum": ["yyyy-MM-dd", "yyyy-MM", "yyyy"]
                        }
                      },
                      "required": ["value"]
                    }
                  }
                }
              },
              "policyVersion": {
                "type": "string"
              },
              "transactionType": {
                "title": "Transaction Type",
                "type": "string",
                "description": "",
                "enum": [
                  "NEW_BUSINESS",
                  "MID_TERM_ADJUSTMENT",
                  "RENEWAL",
                  "CANCELLATION",
                  "LAPSE",
                  "UPDATE",
                  "REINSTATEMENT"
                ]
              },
              "quoteId": {
                "type": "string"
              },
              "events": {
                "type": "array",
                "items": {
                  "title": "Event Base Model",
                  "type": "object",
                  "properties": {
                    "eventType": {
                      "type": "string",
                      "enum": ["DRIVING_OFFENCE", "CRIMINAL_OFFENCE", "LOSS_HISTORY", "INSURANCE_HISTORY", "UNSPECIFIED"]
                    },
                    "disclosureDate": {
                      "title": "Date Only Extended",
                      "type": "object",
                      "properties": {
                        "value": {
                          "type": "string",
                          "format": "date"
                        },
                        "format": {
                          "type": "string",
                          "enum": ["yyyy-MM-dd", "yyyy-MM", "yyyy"]
                        }
                      },
                      "required": ["value"]
                    },
                    "declaration": {
                      "type": "object",
                      "properties": {
                        "code": {
                          "type": "string"
                        },
                        "hasIncurred": {
                          "type": "boolean"
                        },
                        "period": {
                          "type": "string",
                          "enum": ["LAST_5_YEARS", "LAST_7_YEARS", "EVER", "LAST_YEAR"]
                        },
                        "value": {
                          "type": "string",
                          "description": "Used if the answer to the declaration is a string"
                        },
                        "number": {
                          "type": "number",
                          "description": "Used if the answer to the declaration is a number"
                        },
                        "amount": {
                          "title": "Amount Extended",
                          "type": "object",
                          "properties": {
                            "amount": {
                              "type": "number"
                            },
                            "currencyCode": {
                              "type": "string"
                            },
                            "isGSTInclusive": {
                              "type": "boolean"
                            },
                            "GSTAmount": {
                              "type": "number"
                            },
                            "GSTPercentageApplicable": {
                              "type": "number"
                            },
                            "description": {
                              "type": "string"
                            }
                          },
                          "required": ["amount"]
                        }
                      }
                    },
                    "detail": {
                      "type": "object",
                      "properties": {
                        "code": {
                          "type": "string"
                        },
                        "dateOfEvent": {
                          "title": "Date Only Extended",
                          "type": "object",
                          "properties": {
                            "value": {
                              "type": "string",
                              "format": "date"
                            },
                            "format": {
                              "type": "string",
                              "enum": ["yyyy-MM-dd", "yyyy-MM", "yyyy"]
                            }
                          },
                          "required": ["value"]
                        },
                        "wasDrugOrAlcoholRelated": {
                          "type": "boolean"
                        },
                        "insuranceType": {
                          "type": "string"
                        },
                        "insurer": {
                          "type": "string"
                        },
                        "insuredEntityName": {
                          "type": "string"
                        },
                        "outcomeDetails": {
                          "type": "string"
                        },
                        "outcomeCode": {
                          "type": "string",
                          "description": "Core system code for the outcome"
                        },
                        "details": {
                          "type": "string"
                        },
                        "personInvolved": {
                          "type": "string",
                          "description": "Name of the person involved in the event eg. Tenant on a TENANT_LOSS_HISTORY event"
                        },
                        "startDate": {
                          "title": "Date Only Extended",
                          "type": "object",
                          "properties": {
                            "value": {
                              "type": "string",
                              "format": "date"
                            },
                            "format": {
                              "type": "string",
                              "enum": ["yyyy-MM-dd", "yyyy-MM", "yyyy"]
                            }
                          },
                          "required": ["value"]
                        },
                        "endDate": {
                          "title": "Date Only Extended",
                          "type": "object",
                          "properties": {
                            "value": {
                              "type": "string",
                              "format": "date"
                            },
                            "format": {
                              "type": "string",
                              "enum": ["yyyy-MM-dd", "yyyy-MM", "yyyy"]
                            }
                          },
                          "required": ["value"]
                        },
                        "reason": {
                          "type": "string"
                        },
                        "wasConfirmationLodged": {
                          "type": "boolean"
                        },
                        "wasAtFault": {
                          "type": "boolean"
                        },
                        "policyId": {
                          "type": "string"
                        },
                        "amount": {
                          "title": "Amount Extended",
                          "type": "object",
                          "properties": {
                            "amount": {
                              "type": "number"
                            },
                            "currencyCode": {
                              "type": "string"
                            },
                            "isGSTInclusive": {
                              "type": "boolean"
                            },
                            "GSTAmount": {
                              "type": "number"
                            },
                            "GSTPercentageApplicable": {
                              "type": "number"
                            },
                            "description": {
                              "type": "string"
                            }
                          },
                          "required": ["amount"]
                        },
                        "periodImposed": {
                          "type": "string"
                        }
                      }
                    },
                    "relationships": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "riskLists": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "insurancePolicy": {
                                  "type": "object",
                                  "properties": {
                                    "policyId": {
                                      "type": "string"
                                    },
                                    "systemOfRecord": {
                                      "title": "System Of Record",
                                      "type": "string",
                                      "enum": [
                                        "LOREM",
                                        "HEART",
                                        "IPSUM_CENTER",
                                        "SECURITY",
                                        "BAR",
                                        "FOO",
                                        "BUDDY",
                                        "BONUS"
                                      ]
                                    },
                                    "insuredRiskGroups": {
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "properties": {
                                          "riskGroupId": {
                                            "type": "string"
                                          },
                                          "insuredRisks": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "riskId": {
                                                  "type": "string"
                                                },
                                                "externalReferences": {
                                                  "type": "array",
                                                  "items": {
                                                    "title": "External Reference",
                                                    "description": "",
                                                    "type": "object",
                                                    "properties": {
                                                      "namespace": {
                                                        "description": "A namespace for the identifier.",
                                                        "type": "string"
                                                      },
                                                      "identifier": {
                                                        "description": "An identifier for the entity",
                                                        "type": "string"
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "partyList": {
                            "type": "object",
                            "title": "Party List",
                            "properties": {
                              "partyId": {
                                "type": "string"
                              },
                              "systemOfRecord": {
                                "title": "System Of Record",
                                "type": "string",
                                "enum": ["LOREM", "HEART", "IPSUM_CENTER", "SECURITY", "BAR", "FOO", "BUDDY", "BONUS"]
                              },
                              "partyRoles": {
                                "type": "array",
                                "items": {
                                  "title": "Party Role",
                                  "type": "string",
                                  "enum": [
                                    "CUSTOMER",
                                    "INSURED",
                                    "ADDITIONAL_INSURED",
                                    "NAMED_DRIVER",
                                    "PRIMARY_CONTACT",
                                    "SECONDARY_CONTACT",
                                    "AUTHORISER",
                                    "NAMED_PARTY"
                                  ]
                                }
                              },
                              "externalReferences": {
                                "type": "array",
                                "items": {
                                  "$ref": "./common.oas2.yml#/definitions/external-reference"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "confirmationSpecialHandlingType": {
                "type": "string",
                "enum": ["EMPLOYEE", "SENSITIVE", "NONE"]
              },
              "transactionDescription": {
                "type": "string"
              }
            }
          }
        }
      },
      {
        "title": "Confirmation Mandatory",
        "description": "",
        "type": "object",
        "properties": {
          "confirmationId": {
            "type": "string",
            "description": "System of record confirmation id"
          },
          "systemOfRecord": {
            "title": "System Of Record",
            "type": "string",
            "enum": ["LOREM", "HEART", "IPSUM_CENTER", "SECURITY", "BAR", "FOO", "BUDDY", "BONUS"]
          },
          "systemOfRecordTransactionDate": {
            "title": "Date Time Extended",
            "type": "object",
            "properties": {
              "value": {
                "type": "string",
                "format": "date-time"
              },
              "format": {
                "type": "string",
                "enum": [
                  "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                  "yyyy-MM-dd'T'HH:mm:ss'Z'",
                  "yyyy-MM-dd'T'HH:mm'Z'",
                  "yyyy-MM-dd'T'HH",
                  "yyyy-MM-dd",
                  "yyyy-MM",
                  "yyyy"
                ]
              },
              "minValue": {
                "type": "string"
              },
              "maxValue": {
                "type": "string"
              },
              "defaultValue": {
                "type": "string"
              }
            },
            "required": ["value"]
          },
          "dateOfLoss": {
            "title": "Date Time Extended",
            "type": "object",
            "properties": {
              "value": {
                "type": "string",
                "format": "date-time"
              },
              "format": {
                "type": "string",
                "enum": [
                  "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                  "yyyy-MM-dd'T'HH:mm:ss'Z'",
                  "yyyy-MM-dd'T'HH:mm'Z'",
                  "yyyy-MM-dd'T'HH",
                  "yyyy-MM-dd",
                  "yyyy-MM",
                  "yyyy"
                ]
              },
              "minValue": {
                "type": "string"
              },
              "maxValue": {
                "type": "string"
              },
              "defaultValue": {
                "type": "string"
              }
            },
            "required": ["value"]
          },
          "lossCause": {
            "type": "object",
            "description": "System of record loss code and its description",
            "required": ["code", "codeDescription"],
            "properties": {
              "code": {
                "type": "string"
              },
              "codeDescription": {
                "type": "string"
              }
            }
          },
          "status": {
            "type": "string",
            "enum": ["ARCHIVED", "CLOSED", "OPEN", "DRAFT"]
          },
          "costOfConfirmation": {
            "title": "Amount Extended",
            "type": "object",
            "properties": {
              "amount": {
                "type": "number"
              },
              "currencyCode": {
                "type": "string"
              },
              "isGSTInclusive": {
                "type": "boolean"
              },
              "GSTAmount": {
                "type": "number"
              },
              "GSTPercentageApplicable": {
                "type": "number"
              },
              "description": {
                "type": "string"
              }
            },
            "required": ["amount"]
          },
          "exportedAt": {
            "type": "string"
          },
          "partyId": {
            "type": "string"
          }
        },
        "required": [
          "confirmationId",
          "systemOfRecord",
          "systemOfRecordTransactionDate",
          "dateOfLoss",
          "lossCause",
          "status",
          "costOfConfirmation",
          "exportedAt",
          "partyId"
        ]
      }
    ]
  },
  ticketsSchema: {
    "type": "object",
    "description": "This section allows the selection of the ticketing options for all sales of the order.",
    "properties": {
      "availableTicketingOptions": {
        "description": "List of ticketing options of the order.",
        "type": "array",
        "items": {
          "$ref": "../TicketingOptionInfo/TicketingOptionInfo.v1-0.yaml"
        }
      },
      "commonTicketingOptions": {
        "type": "array",
        "description": "Common ticketing options to all order items.",
        "items": {
          "type": "string"
        }
      },
      "ticketingOptionChoice": {
        "type": "array",
        "description": "Ticketing option selection per order item.",
        "items": {
          "type": "object",
          "properties": {
            "state": {
              "description": "The status that addresses if a specific ticket option is active or not. The status active is used before ticketing or before exchange confirmation. After ticketing, the status changes in completed. This allows to store ticketing options already used at ticketing time and to clean up all non selected options after ticketing or exchanged confirmation.",
              "type": "string",
              "default": "ACTIVE",
              "enum": [
                "COMPLETED",
                "ACTIVE"
              ]
            },
            "orderItemBreakdown": {
              "description": "Structure that contains ticketing options per order item.",
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "orderItemId": {
                    "type": "string",
                    "format": "uuid"
                  },
                  "options": {
                    "description": "Available ticketing options for a given order item.",
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "title": {
                          "description": "Ticketing option short-description.",
                          "type": "string",
                          "readOnly": true,
                          "enum": [
                            "HOMEPRINT",
                            "TICKETLESS",
                            "PRINT_AT_KIOSK",
                            "SECURE_PAPER"
                          ]
                        },
                        "selected": {
                          "description": "Flag to specify which ticketing option is selected. Only one option is allowed to be selected.",
                          "type": "boolean",
                          "example": true
                        },
                        "additionalRequiredInfo": {
                          "description": "Additional passenger required info specific to the given ticketing option.",
                          "type": "string"
                        },
                        "deliveryInfo": {
                          "description": "Data for ticket delivery.",
                          "type": "object",
                          "properties": {
                            "availableDeliveryTypes": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "enum": [
                                  "POSTAL",
                                  "PICK_UP_STATION",
                                  "E-MAIL",
                                  "LOYALTY_CARD"
                                ]
                              }
                            },
                            "ticketRecipients": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "enum": [
                                  "BOOKER",
                                  "CUSTOMER",
                                  "PASSENGER",
                                  "THIRD_PARTY"
                                ]
                              }
                            },
                            "ccEmail": {
                              "type": "string",
                              "format": "email"
                            },
                            "postalAddress": {
                              "$ref": "../Address/Address.v0-1.yaml"
                            },
                            "pickUpAtStation": {
                              "description": "The name of the Station in case you select pick up at station as a delivery type",
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  arrays: {
    ofAllOfs: {
      "title": "Test",
      "type": "object",
      "properties": {
        "array-all-objects": {
          "type": "array",
          "items": {
            "allOf": [
              {
                "properties": {
                  "foo": {
                    "type": "string"
                  }
                }
              },
              {
                "properties": {
                  "bar": {
                    "type": "string"
                  }
                }
              }
            ],
            "type": "object"
          }
        }
      }
    },
    ofArrays: {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "bar": {
            "type": "integer"
          },
          "foo": {
            "type": "array",
            "items": {
              "type": "array"
            }
          }
        }
      }
    },
    ofComplexObject: {
      "type": [
        "array"
      ],
      "minItems": 1,
      "maxItems": 10,
      "items":{
        "title": "User",
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "const": "Constant name",
            "examples": ["Example name", "Different name"],
            "description": "The user's full name. This description can be long and should truncate once it reaches the end of the row. If it's not truncating then theres and issue that needs to be fixed. Help!"
          },
          "age": {
            "type": "number",
            "minimum": 10,
            "maximum": 40,
            "multipleOf": 10,
            "default": 20,
            "enum": [10, 20, 30, 40],
            "readOnly": true
          },
          "completed_at": {
            "type": "string",
            "format": "date-time",
            "writeOnly": true,
            "pattern": "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
          },
          "items": {
            "type": ["null", "array"],
            "items": {
              "type": ["string", "number"]
            },
            "minItems": 1,
            "maxItems": 4,
            "description": "This description can be long and should truncate once it reaches the end of the row. If it's not truncating then theres and issue that needs to be fixed. Help!"
          },
          "email": {
            "type": "string",
            "format": "email",
            "examples": ["one@email.com", "two@email.com"],
            "deprecated": true,
            "default": "default@email.com",
            "minLength": 2
          },
          "plan": {
            "anyOf": [
              {
                "type": "object",
                "properties": {
                  "foo": {
                    "type": "string"
                  },
                  "bar": {
                    "type": "string"
                  }
                },
                "deprecated": false,
                "example": "hi",
                "required": ["foo", "bar"]
              },
              {
                "type": "array",
                "items": {
                  "type": "integer"
                }
              }
            ]
          },
          "permissions": {
            "type": ["string", "object"],
            "properties": {
              "ids": {
                "type": "array",
                "items": {
                  "type": "integer"
                }
              }
            }
          },
          "ref": {
            "$ref": "#/properties/permissions"
          }
        },
        "patternProperties": {
          "^id_": { "type": "number" },
          "foo": { "type": "integer" },
          "_name$": { "type": "string" }
        },
        "required": ["name", "age", "completed_at"]
      }

    },
    ofObject: {
      "type": "object",
      "xml": {
        "name": "Pet"
      },
      "properties": {
        "propertyIsArrayOfObjects": {
          "type": ["array"],
          "items": {
            "type": "object",
            "properties": {
              "ArrayObjectProperty": {
                "type": "string"
              }
            }
          }
        }
      }
    },
    ofRefs: {
      "type": "array",
      "items": {
        "$ref": "./models/todo-full.json"
      }
    },
    ofMultipleArray: {
      "type": "array",
      "items": [
        {
          "type": "number"
        },
        {
          "type": "object",
          "properties": {
            "code": {
              "type": "number"
            },
            "msg": {
              "type": "string"
            },
            "ref": {
              "type": "string"
            }
          },
          "required": [
            "code",
            "msg"
          ]
        }
      ]
    },
    withOrderedItems: {
      "type": "array",
      "items": [
        {
          "type": "number"
        },
        {
          "type": "string"
        }
      ]
    },
    withSingleArrayishItems: {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "code": {
              "type": "number"
            },
            "msg": {
              "type": "string"
            },
            "ref": {
              "type": "string"
            }
          },
          "required": [
            "code",
            "msg"
          ]
        }
      ]
    },
  }
}
