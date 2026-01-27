export const data = [
  {
    "id": "3-1-dereference-handling",
    "data": {
      "openapi": "3.1.0",
      "info": {
        "title": "Special handling of OpenAPI 3.1 dereferencing cases",
        "version": "1.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org/anything"
        }
      ],
      "paths": {
        "/": {
          "get": {
            "description": "We should be able to handle `$ref` pointers alongside description properties.",
            "parameters": [
              {
                "description": "This is an overridden description on the number parameter.",
                "$ref": "#/components/parameters/number"
              }
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "*/*": {
                    "schema": {
                      "description": "This is an overridden description on the response.",
                      "summary": "This is an overridden summary on the response.",
                      "$ref": "#/components/schemas/simple-object"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "components": {
        "parameters": {
          "number": {
            "description": "This is a number parameter",
            "in": "query",
            "name": "number",
            "required": false,
            "schema": {
              "type": "integer"
            }
          }
        },
        "schemas": {
          "simple-object": {
            "description": "This is a simple object",
            "summary": "This is a summary on the simple object schema",
            "type": "object",
            "properties": {
              "foo": {
                "type": "string"
              },
              "bar": {
                "type": "number"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "3-1-no-responses",
    "data": {
      "openapi": "3.1.0",
      "servers": [
        {
          "url": "http://petstore.swagger.io/v2"
        }
      ],
      "info": {
        "description": "This file tests oas 3.1's ability to have operations without responses",
        "version": "1.0.0",
        "title": "3.1.0 without responses",
        "license": {
          "name": "Apache 2.0",
          "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
      },
      "paths": {
        "/pet/{petId}": {
          "delete": {
            "tags": [
              "pet"
            ],
            "summary": "Deletes a pet",
            "description": "",
            "operationId": "deletePet",
            "parameters": [
              {
                "name": "api_key",
                "in": "header",
                "required": false,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "petId",
                "in": "path",
                "description": "Pet id to delete",
                "required": true,
                "schema": {
                  "type": "integer",
                  "format": "int64"
                }
              }
            ],
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ]
          }
        }
      },
      "components": {
        "securitySchemes": {
          "petstore_auth": {
            "type": "oauth2",
            "flows": {
              "implicit": {
                "authorizationUrl": "http://petstore.swagger.io/oauth/dialog",
                "scopes": {
                  "write:pets": "modify pets in your account",
                  "read:pets": "read your pets"
                }
              }
            }
          },
          "api_key": {
            "type": "apiKey",
            "name": "api_key",
            "in": "header"
          }
        }
      }
    }
  },
  {
    "id": "3-1-primitive-components",
    "data": {
      "openapi": "3.1.0",
      "info": {
        "title": "Special handling of OpenAPI 3.1 dereferencing cases",
        "version": "1.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org/anything"
        }
      ],
      "paths": {
        "/": {
          "get": {
            "description": "We should be able to primitive `$ref` pointers.",
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "*/*": {
                    "schema": {
                      "$ref": "#/components/schemas/primitive"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "primitive": true
        }
      }
    }
  },
  {
    "id": "ably",
    "data": {
      "openapi": "3.0.1",
      "servers": [
        {
          "url": "https://control.ably.net/v1"
        }
      ],
      "info": {
        "contact": {
          "x-twitter": "ablyrealtime"
        },
        "description": "Use the Control API to manage your applications, namespaces, keys, queues, rules, and more.\n\nDetailed information on using this API can be found in the Ably <a href=\"https://ably.com/documentation/control-api\">developer documentation</a>.\n\nControl API is currently in Beta.",
        "title": "Control API v1",
        "version": "1.0.14",
        "x-apisguru-categories": [
          "cloud"
        ],
        "x-logo": {
          "url": "https://api.apis.guru/v2/cache/logo/https_twitter.com_ablyrealtime_profile_image"
        },
        "x-origin": [
          {
            "format": "openapi",
            "url": "https://raw.githubusercontent.com/ably/open-specs/main/definitions/control-v1.yaml",
            "version": "3.0"
          }
        ],
        "x-providerName": "ably.net",
        "x-serviceName": "control"
      },
      "paths": {
        "/accounts/{account_id}/apps": {
          "get": {
            "description": "List all applications for the specified account ID.",
            "parameters": [
              {
                "description": "The account ID for which to retrieve the associated applications.",
                "in": "path",
                "name": "account_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "content": {
                  "application/json": {
                    "schema": {
                      "items": {
                        "$ref": "#/components/schemas/app_response"
                      },
                      "type": "array"
                    }
                  }
                },
                "description": "List of apps for the specified account are returned"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Account not found"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Lists apps",
            "tags": [
              "apps"
            ]
          },
          "post": {
            "description": "Creates an application with the specified properties.",
            "parameters": [
              {
                "description": "The account ID of the account in which to create the application.",
                "in": "path",
                "name": "account_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/app_post"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/app_response"
                    }
                  }
                },
                "description": "App created"
              },
              "400": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Bad request"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Account not found"
              },
              "422": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Invalid request"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Creates an app",
            "tags": [
              "apps"
            ]
          }
        },
        "/apps/{app_id}/keys": {
          "get": {
            "description": "Lists the API keys associated with the application ID.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "content": {
                  "application/json": {
                    "schema": {
                      "items": {
                        "$ref": "#/components/schemas/key_response"
                      },
                      "type": "array"
                    }
                  }
                },
                "description": "Key list"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              },
              "504": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Gateway timeout"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Lists app keys",
            "tags": [
              "keys"
            ]
          },
          "post": {
            "description": "Creates an API key for the application specified.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/key_post"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/key_response"
                    }
                  }
                },
                "description": "Key created"
              },
              "400": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Bad request"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "422": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Invalid request"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Creates a key",
            "tags": [
              "keys"
            ]
          }
        },
        "/apps/{app_id}/keys/{key_id}": {
          "patch": {
            "description": "Update the API key with the specified key ID, for the application with the specified application ID.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "description": "The API key ID.",
                "in": "path",
                "name": "key_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/key_patch"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/key_response"
                    }
                  }
                },
                "description": "Key updated"
              },
              "400": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Bad request"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "422": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Invalid request"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              },
              "504": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Gateway timeout"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Updates a key",
            "tags": [
              "keys"
            ]
          }
        },
        "/apps/{app_id}/keys/{key_id}/revoke": {
          "post": {
            "description": "Revokes the API key with the specified ID, with the Application ID. This deletes the key.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "description": "The key ID.",
                "in": "path",
                "name": "key_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "content": {},
                "description": "Key revoked"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Not found"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              },
              "504": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Gateway timeout"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Revokes a key",
            "tags": [
              "keys"
            ]
          }
        },
        "/apps/{app_id}/namespaces": {
          "get": {
            "description": "List the namespaces for the specified application ID.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "content": {
                  "application/json": {
                    "schema": {
                      "items": {
                        "$ref": "#/components/schemas/namespace_response"
                      },
                      "type": "array"
                    }
                  }
                },
                "description": "Namespace list"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              },
              "504": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Gateway timeout"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Lists namespaces",
            "tags": [
              "namespaces"
            ]
          },
          "post": {
            "description": "Creates a namespace for the specified application ID.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/namespace_post"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/namespace_response"
                    }
                  }
                },
                "description": "Namespace created"
              },
              "400": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Bad request"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "422": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Invalid request"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Creates a namespace",
            "tags": [
              "namespaces"
            ]
          }
        },
        "/apps/{app_id}/namespaces/{namespace_id}": {
          "delete": {
            "description": "Deletes the namespace with the specified ID, for the specified application ID.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "description": "The namespace ID.",
                "in": "path",
                "name": "namespace_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "204": {
                "content": {},
                "description": "Namespace deleted"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Not found"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              },
              "504": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Gateway timeout"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Deletes a namespace",
            "tags": [
              "namespaces"
            ]
          },
          "patch": {
            "description": "Updates the namespace with the specified ID, for the application with the specified application ID.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "description": "The namespace ID.",
                "in": "path",
                "name": "namespace_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/namespace_patch"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/namespace_response"
                    }
                  }
                },
                "description": "Namespace updated"
              },
              "400": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Bad request"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Not found"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              },
              "504": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Gateway timeout"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Updates a namespace",
            "tags": [
              "namespaces"
            ]
          }
        },
        "/apps/{app_id}/queues": {
          "get": {
            "description": "Lists the queues associated with the specified application ID.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "content": {
                  "application/json": {
                    "schema": {
                      "items": {
                        "$ref": "#/components/schemas/queue_response"
                      },
                      "type": "array"
                    }
                  }
                },
                "description": "Queue list"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              },
              "503": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "503 Service unavailable"
              },
              "504": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Gateway timeout"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Lists queues",
            "tags": [
              "queues"
            ]
          },
          "post": {
            "description": "Creates a queue for the application specified by application ID. The properties for the queue to be created are specified in the request body.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/queue"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/queue_response"
                    }
                  }
                },
                "description": "Queue created"
              },
              "400": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Bad request"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "422": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Invalid request"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Creates a queue",
            "tags": [
              "queues"
            ]
          }
        },
        "/apps/{app_id}/queues/{queue_id}": {
          "delete": {
            "description": "Delete the queue with the specified queue name, from the application with the specified application ID.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "description": "The queue ID.",
                "in": "path",
                "name": "queue_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "204": {
                "content": {},
                "description": "Queue deleted"
              },
              "400": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Bad request"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              },
              "503": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "503 Service unavailable"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Deletes a queue",
            "tags": [
              "queues"
            ]
          }
        },
        "/apps/{app_id}/rules": {
          "get": {
            "description": "Lists the rules for the application specified by the application ID.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "content": {
                  "application/json": {
                    "schema": {
                      "items": {
                        "$ref": "#/components/schemas/rule_response"
                      },
                      "type": "array"
                    }
                  }
                },
                "description": "Reactor rule list"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              },
              "504": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Gateway timeout"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Lists Reactor rules",
            "tags": [
              "rules"
            ]
          },
          "post": {
            "description": "Creates a rule for the application with the specified application ID.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/rule_post"
                  }
                }
              },
              "description": "The rule properties."
            },
            "responses": {
              "201": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/rule_response"
                    }
                  }
                },
                "description": "Reactor rule created"
              },
              "400": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Bad request"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "422": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Invalid request"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              },
              "504": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Gateway timeout"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Creates a Reactor rule",
            "tags": [
              "rules"
            ]
          }
        },
        "/apps/{app_id}/rules/{rule_id}": {
          "delete": {
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "description": "The rule ID.",
                "in": "path",
                "name": "rule_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "204": {
                "content": {},
                "description": "Reactor rule deleted"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              },
              "504": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Gateway timeout"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Deletes a Reactor rule",
            "tags": [
              "rules"
            ]
          },
          "get": {
            "description": "Returns the rule specified by the rule ID, for the application specified by application ID.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "description": "The rule ID.",
                "in": "path",
                "name": "rule_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/rule_response"
                    }
                  }
                },
                "description": "Reactor rule"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Not found"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              },
              "504": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Gateway timeout"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Gets a reactor rule by rule ID",
            "tags": [
              "rules"
            ]
          },
          "patch": {
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "app_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "description": "The rule ID.",
                "in": "path",
                "name": "rule_id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/rule_patch"
                  }
                }
              },
              "description": "Properties for the rule."
            },
            "responses": {
              "200": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/rule_response"
                    }
                  }
                },
                "description": "Reactor rule updated"
              },
              "400": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Bad request"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "422": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Invalid request"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              },
              "504": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Gateway timeout"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Updates a Reactor rule",
            "tags": [
              "rules"
            ]
          }
        },
        "/apps/{id}": {
          "delete": {
            "description": "Deletes the application with the specified application ID.",
            "parameters": [
              {
                "description": "The ID of the application to be deleted.",
                "in": "path",
                "name": "id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "204": {
                "content": {},
                "description": "App deleted"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "422": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Invalid request"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Deletes an app",
            "tags": [
              "apps"
            ]
          },
          "patch": {
            "description": "Updates the application with the specified application ID.",
            "parameters": [
              {
                "description": "The ID of application to be updated.",
                "in": "path",
                "name": "id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/app_patch"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/app_response"
                    }
                  }
                },
                "description": "App updated"
              },
              "400": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Bad request"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Updates an app",
            "tags": [
              "apps"
            ]
          }
        },
        "/apps/{id}/pkcs12": {
          "post": {
            "description": "Updates the application's Apple Push Notification service (APNs) information.",
            "parameters": [
              {
                "description": "The application ID.",
                "in": "path",
                "name": "id",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "multipart/form-data": {
                  "schema": {
                    "$ref": "#/components/schemas/app_pkcs12"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/app_response"
                    }
                  }
                },
                "description": "App updated"
              },
              "400": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Bad request"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "404": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "App not found"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Updates app's APNs info from a `.p12` file",
            "tags": [
              "apps"
            ]
          }
        },
        "/me": {
          "get": {
            "responses": {
              "200": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/me"
                    }
                  }
                },
                "description": "Token details"
              },
              "401": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Authentication failed"
              },
              "500": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/error"
                    }
                  }
                },
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearer_auth": []
              }
            ],
            "summary": "Get token details",
            "tags": [
              "tokens"
            ]
          }
        }
      },
      "components": {
        "schemas": {
          "amqp_external_rule_patch": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AMQP external (using Firehose). See the <a href=\"https://ably.com/documentation/general/firehose\">Ably documentation</a> for further information.",
                "enum": [
                  "amqp/external"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "mandatoryRoute": {
                    "description": "Reject delivery of the message if the route does not exist, otherwise fail silently.",
                    "type": "boolean"
                  },
                  "messageTtl": {
                    "description": "You can optionally override the default TTL on a queue and specify a TTL in minutes for messages to be persisted. It is unusual to change the default TTL, so if this field is left empty, the default TTL for the queue will be used.",
                    "type": "integer"
                  },
                  "persistentMessages": {
                    "description": "Marks the message as persistent, instructing the broker to write it to disk if it is in a durable queue.",
                    "type": "boolean"
                  },
                  "routingKey": {
                    "description": "The AMQP routing key. See this <a href=\"https://knowledge.ably.com/what-is-the-format-of-the-routingkey-for-an-amqp-or-kinesis-reactor-rule\">Ably knowledge base article</a> for details.",
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  }
                },
                "type": "object"
              }
            },
            "type": "object"
          },
          "amqp_external_rule_post": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AMQP external (using Firehose). See the <a href=\"https://ably.com/documentation/general/firehose\">documentation</a> for further information.",
                "enum": [
                  "amqp/external"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "mandatoryRoute": {
                    "description": "Reject delivery of the message if the route does not exist, otherwise fail silently.",
                    "type": "boolean"
                  },
                  "messageTtl": {
                    "description": "You can optionally override the default TTL on a queue and specify a TTL in minutes for messages to be persisted. It is unusual to change the default TTL, so if this field is left empty, the default TTL for the queue will be used.",
                    "type": "integer"
                  },
                  "persistentMessages": {
                    "description": "Marks the message as persistent, instructing the broker to write it to disk if it is in a durable queue.",
                    "type": "boolean"
                  },
                  "routingKey": {
                    "description": "The AMQP routing key. See this <a href=\"https://knowledge.ably.com/what-is-the-format-of-the-routingkey-for-an-amqp-or-kinesis-reactor-rule\">Ably knowledge base article</a> for details.",
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  }
                },
                "required": [
                  "url",
                  "routingKey",
                  "mandatoryRoute",
                  "persistentMessages"
                ],
                "type": "object"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "amqp_external_rule_response": {
            "additionalProperties": false,
            "properties": {
              "_links": {
                "nullable": true,
                "type": "object"
              },
              "appId": {
                "description": "The Ably application ID.",
                "example": "28GY6a",
                "type": "string"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the rule.",
                "example": 1602844091815,
                "type": "number"
              },
              "id": {
                "description": "The rule ID.",
                "example": "83IzAB",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of last modification of the rule.",
                "example": 1614679682091,
                "type": "number"
              },
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AMQP external (using Firehose). See the <a href=\"https://ably.com/documentation/general/firehose\">Ably documentation</a> for further information.",
                "enum": [
                  "amqp/external"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "mandatoryRoute": {
                    "description": "Reject delivery of the message if the route does not exist, otherwise fail silently.",
                    "type": "boolean"
                  },
                  "messageTtl": {
                    "description": "You can optionally override the default TTL on a queue and specify a TTL in minutes for messages to be persisted. It is unusual to change the default TTL, so if this field is left empty, the default TTL for the queue will be used.",
                    "type": "integer"
                  },
                  "persistentMessages": {
                    "description": "Marks the message as persistent, instructing the broker to write it to disk if it is in a durable queue.",
                    "type": "boolean"
                  },
                  "routingKey": {
                    "description": "The AMQP routing key. See this <a href=\"https://knowledge.ably.com/what-is-the-format-of-the-routingkey-for-an-amqp-or-kinesis-reactor-rule\">Ably knowledge base article</a> for details.",
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  }
                },
                "required": [
                  "url",
                  "routingKey",
                  "mandatoryRoute",
                  "persistentMessages"
                ],
                "type": "object"
              },
              "version": {
                "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
                "type": "string"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "amqp_rule_patch": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AMQP. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "amqp"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "queueId": {
                    "type": "string"
                  }
                },
                "type": "object"
              }
            },
            "type": "object"
          },
          "amqp_rule_post": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AMQP. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "amqp"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "queueId": {
                    "type": "string"
                  }
                },
                "required": [
                  "queueId"
                ],
                "type": "object"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "amqp_rule_response": {
            "additionalProperties": false,
            "properties": {
              "_links": {
                "nullable": true,
                "type": "object"
              },
              "appId": {
                "description": "The Ably application ID.",
                "example": "28GY6a",
                "type": "string"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the rule.",
                "example": 1602844091815,
                "type": "number"
              },
              "id": {
                "description": "The rule ID.",
                "example": "83IzAB",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of last modification of the rule.",
                "example": 1614679682091,
                "type": "number"
              },
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AMQP. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "amqp"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "queueId": {
                    "type": "string"
                  }
                },
                "required": [
                  "queueId"
                ],
                "type": "object"
              },
              "version": {
                "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
                "type": "string"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "app_patch": {
            "additionalProperties": false,
            "properties": {
              "apnsCertificate": {
                "description": "The Apple Push Notification service certificate.",
                "nullable": true,
                "type": "string"
              },
              "apnsPrivateKey": {
                "description": "The Apple Push Notification service private key.",
                "nullable": true,
                "type": "string"
              },
              "apnsUseSandboxEndpoint": {
                "description": "The Apple Push Notification service sandbox endpoint.",
                "nullable": true,
                "type": "boolean"
              },
              "fcmKey": {
                "description": "The Firebase Cloud Messaging key.",
                "example": false,
                "nullable": true,
                "type": "string"
              },
              "name": {
                "description": "The name of the application for your reference only.",
                "example": "My App",
                "type": "string"
              },
              "status": {
                "description": "The status of the application. Can be `enabled` or `disabled`. Enabled means available to accept inbound connections and all services are available.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "tlsOnly": {
                "description": "Enforce TLS for all connections.",
                "example": true,
                "nullable": true,
                "type": "boolean"
              }
            },
            "type": "object"
          },
          "app_pkcs12": {
            "additionalProperties": false,
            "properties": {
              "p12File": {
                "description": "The `.p12` file containing the app's APNs information.",
                "format": "binary",
                "type": "string"
              },
              "p12Pass": {
                "description": "The password for the corresponding `.p12` file.",
                "type": "string"
              }
            },
            "required": [
              "p12File",
              "p12Pass"
            ],
            "type": "object"
          },
          "app_post": {
            "additionalProperties": false,
            "properties": {
              "apnsCertificate": {
                "description": "The Apple Push Notification service certificate.",
                "nullable": true,
                "type": "string"
              },
              "apnsPrivateKey": {
                "description": "The Apple Push Notification service private key.",
                "nullable": true,
                "type": "string"
              },
              "apnsUseSandboxEndpoint": {
                "description": "The Apple Push Notification service sandbox endpoint.",
                "nullable": true,
                "type": "boolean"
              },
              "fcmKey": {
                "description": "The Firebase Cloud Messaging key.",
                "example": false,
                "nullable": true,
                "type": "string"
              },
              "name": {
                "description": "The name of the application for your reference only.",
                "example": "My App",
                "type": "string"
              },
              "status": {
                "description": "The status of the application. Can be `enabled` or `disabled`. Enabled means available to accept inbound connections and all services are available.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "tlsOnly": {
                "description": "Enforce TLS for all connections.",
                "example": true,
                "nullable": true,
                "type": "boolean"
              }
            },
            "required": [
              "name"
            ],
            "type": "object"
          },
          "app_response": {
            "additionalProperties": false,
            "properties": {
              "_links": {
                "description": "A link self-referencing the app that has been created.",
                "nullable": true,
                "type": "object"
              },
              "accountId": {
                "description": "The ID of your Ably account.",
                "example": "WgRpOB",
                "type": "string"
              },
              "apnsUseSandboxEndpoint": {
                "description": "Apple Push Notification service endpoint.",
                "example": false,
                "nullable": true,
                "type": "boolean"
              },
              "id": {
                "description": "The application ID.",
                "example": "28AB6x",
                "type": "string"
              },
              "name": {
                "description": "The application name.",
                "example": "Default",
                "type": "string"
              },
              "status": {
                "description": "The application status. Disabled applications will not accept new connections and will return an error to all clients.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "tlsOnly": {
                "description": "Enforce TLS for all connections. This setting overrides any channel setting.",
                "example": true,
                "nullable": true,
                "type": "boolean"
              }
            },
            "type": "object"
          },
          "aws_access_keys": {
            "additionalProperties": false,
            "properties": {
              "accessKeyId": {
                "description": "The AWS key ID for the AWS IAM user. See this <a href=\"https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis\">Ably knowledge base article</a> for details.",
                "type": "string"
              },
              "authenticationMode": {
                "description": "Authentication method is using AWS credentials (AWS key ID and secret key).",
                "enum": [
                  "credentials"
                ],
                "type": "string"
              },
              "secretAccessKey": {
                "description": "The AWS secret key for the AWS IAM user. See this <a href=\"https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis\">Ably knowledge base article</a> for details.",
                "type": "string"
              }
            },
            "required": [
              "accessKeyId",
              "secretAccessKey"
            ],
            "type": "object"
          },
          "aws_access_keys_response": {
            "additionalProperties": false,
            "properties": {
              "accessKeyId": {
                "description": "The AWS key ID for the AWS IAM user. See this <a href=\"https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis\">Ably knowledge base article</a> for details.",
                "type": "string"
              },
              "authenticationMode": {
                "description": "Authentication method is using AWS credentials (AWS key ID and secret key).",
                "enum": [
                  "credentials"
                ],
                "type": "string"
              }
            },
            "type": "object"
          },
          "aws_assume_role": {
            "additionalProperties": false,
            "properties": {
              "assumeRoleArn": {
                "description": "If you are using the \"ARN of an assumable role\" authentication method, this is your Assume Role ARN. See this <a href=\"https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis\">Ably knowledge base article</a> for details.",
                "type": "string"
              },
              "authenticationMode": {
                "description": "Authentication method is using the ARN of an assumable role. See this <a href=\"https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis\">Ably knowledge base article</a> for details.",
                "enum": [
                  "assumeRole"
                ],
                "type": "string"
              }
            },
            "required": [
              "assumeRoleArn"
            ],
            "type": "object"
          },
          "aws_kinesis_rule_patch": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AWS Kinesis. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "aws/kinesis"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "authentication": {
                    "discriminator": {
                      "mapping": {
                        "assumeRole": "#/components/schemas/aws_assume_role",
                        "credentials": "#/components/schemas/aws_access_keys"
                      },
                      "propertyName": "authenticationMode"
                    },
                    "oneOf": [
                      {
                        "$ref": "#/components/schemas/aws_access_keys"
                      },
                      {
                        "$ref": "#/components/schemas/aws_assume_role"
                      }
                    ]
                  },
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "description": "JSON provides a text-based encoding.",
                    "enum": [
                      "json"
                    ],
                    "type": "string"
                  },
                  "partitionKey": {
                    "description": "The AWS Kinesis partition key. See this <a href=\"https://knowledge.ably.com/what-is-the-format-of-the-routingkey-for-an-amqp-or-kinesis-reactor-rule\">Ably knowledge base article</a> for details.",
                    "type": "string"
                  },
                  "region": {
                    "description": "The region is which AWS Kinesis is hosted. See the <a href=\"https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region\">AWS documentation</a> for more detail.",
                    "example": "us-west-1",
                    "type": "string"
                  },
                  "streamName": {
                    "description": "The name of your AWS Kinesis Stream.",
                    "type": "string"
                  }
                },
                "type": "object"
              }
            },
            "type": "object"
          },
          "aws_kinesis_rule_post": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AWS Kinesis. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "aws/kinesis"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "authentication": {
                    "discriminator": {
                      "mapping": {
                        "assumeRole": "#/components/schemas/aws_assume_role",
                        "credentials": "#/components/schemas/aws_access_keys"
                      },
                      "propertyName": "authenticationMode"
                    },
                    "oneOf": [
                      {
                        "$ref": "#/components/schemas/aws_access_keys"
                      },
                      {
                        "$ref": "#/components/schemas/aws_assume_role"
                      }
                    ]
                  },
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "description": "JSON provides a text-based encoding.",
                    "enum": [
                      "json"
                    ],
                    "type": "string"
                  },
                  "partitionKey": {
                    "description": "The AWS Kinesis partition key. See this <a href=\"https://knowledge.ably.com/what-is-the-format-of-the-routingkey-for-an-amqp-or-kinesis-reactor-rule\">Ably knowledge base article</a> for details.",
                    "type": "string"
                  },
                  "region": {
                    "description": "The region is which AWS Kinesis is hosted. See the <a href=\"https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region\">AWS documentation</a> for more detail.",
                    "example": "us-west-1",
                    "type": "string"
                  },
                  "streamName": {
                    "description": "The name of your AWS Kinesis Stream.",
                    "type": "string"
                  }
                },
                "required": [
                  "region",
                  "streamName",
                  "partitionKey",
                  "authentication",
                  "format"
                ],
                "type": "object"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "aws_kinesis_rule_response": {
            "additionalProperties": false,
            "properties": {
              "_links": {
                "nullable": true,
                "type": "object"
              },
              "appId": {
                "description": "The Ably application ID.",
                "example": "28GY6a",
                "type": "string"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the rule.",
                "example": 1602844091815,
                "type": "number"
              },
              "id": {
                "description": "The rule ID.",
                "example": "83IzAB",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of last modification of the rule.",
                "example": 1614679682091,
                "type": "number"
              },
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AWS Kinesis. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "aws/kinesis"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "authentication": {
                    "discriminator": {
                      "mapping": {
                        "assumeRole": "#/components/schemas/aws_assume_role",
                        "credentials": "#/components/schemas/aws_access_keys_response"
                      },
                      "propertyName": "authenticationMode"
                    },
                    "oneOf": [
                      {
                        "$ref": "#/components/schemas/aws_access_keys_response"
                      },
                      {
                        "$ref": "#/components/schemas/aws_assume_role"
                      }
                    ]
                  },
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "description": "JSON provides a text-based encoding.",
                    "enum": [
                      "json"
                    ],
                    "type": "string"
                  },
                  "partitionKey": {
                    "description": "The AWS Kinesis partition key. See this <a href=\"https://knowledge.ably.com/what-is-the-format-of-the-routingkey-for-an-amqp-or-kinesis-reactor-rule\">Ably knowledge base article</a> for details.",
                    "type": "string"
                  },
                  "region": {
                    "description": "The region is which AWS Kinesis is hosted. See the <a href=\"https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region\">AWS documentation</a> for more detail.",
                    "example": "us-west-1",
                    "type": "string"
                  },
                  "streamName": {
                    "description": "The name of your AWS Kinesis Stream.",
                    "type": "string"
                  }
                },
                "required": [
                  "region",
                  "streamName",
                  "partitionKey",
                  "authentication",
                  "format"
                ],
                "type": "object"
              },
              "version": {
                "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
                "type": "string"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "aws_lambda_rule_patch": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AWS Lambda. See the <a href=\"https://ably.com/integrations\">Ably documentation</a> for further information.",
                "enum": [
                  "aws/lambda"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "authentication": {
                    "discriminator": {
                      "mapping": {
                        "assumeRole": "#/components/schemas/aws_assume_role",
                        "credentials": "#/components/schemas/aws_access_keys"
                      },
                      "propertyName": "authenticationMode"
                    },
                    "oneOf": [
                      {
                        "$ref": "#/components/schemas/aws_access_keys"
                      },
                      {
                        "$ref": "#/components/schemas/aws_assume_role"
                      }
                    ]
                  },
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "functionName": {
                    "description": "The name of your AWS Lambda Function.",
                    "type": "string"
                  },
                  "region": {
                    "description": "The region is which your AWS Lambda Function is hosted. See the <a href=\"https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region\">AWS documentation</a> for more detail.",
                    "example": "us-west-1",
                    "type": "string"
                  }
                },
                "required": [
                  "region",
                  "functionName",
                  "authentication"
                ],
                "type": "object"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "aws_lambda_rule_post": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AWS Lambda. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "aws/lambda"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "authentication": {
                    "discriminator": {
                      "mapping": {
                        "assumeRole": "#/components/schemas/aws_assume_role",
                        "credentials": "#/components/schemas/aws_access_keys"
                      },
                      "propertyName": "authenticationMode"
                    },
                    "oneOf": [
                      {
                        "$ref": "#/components/schemas/aws_access_keys"
                      },
                      {
                        "$ref": "#/components/schemas/aws_assume_role"
                      }
                    ]
                  },
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "functionName": {
                    "description": "The name of your AWS Lambda Function.",
                    "type": "string"
                  },
                  "region": {
                    "description": "The region is which your AWS Lambda Function is hosted. See the <a href=\"https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region\">AWS documentation</a> for more detail.",
                    "example": "us-west-1",
                    "type": "string"
                  }
                },
                "required": [
                  "region",
                  "functionName",
                  "authentication"
                ],
                "type": "object"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "aws_lambda_rule_response": {
            "additionalProperties": false,
            "properties": {
              "_links": {
                "nullable": true,
                "type": "object"
              },
              "appId": {
                "description": "The Ably application ID.",
                "example": "28GY6a",
                "type": "string"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the rule.",
                "example": 1602844091815,
                "type": "number"
              },
              "id": {
                "description": "The rule ID.",
                "example": "83IzAB",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of last modification of the rule.",
                "example": 1614679682091,
                "type": "number"
              },
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AWS Lambda. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "aws/lambda"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "authentication": {
                    "discriminator": {
                      "mapping": {
                        "assumeRole": "#/components/schemas/aws_assume_role",
                        "credentials": "#/components/schemas/aws_access_keys_response"
                      },
                      "propertyName": "authenticationMode"
                    },
                    "oneOf": [
                      {
                        "$ref": "#/components/schemas/aws_access_keys_response"
                      },
                      {
                        "$ref": "#/components/schemas/aws_assume_role"
                      }
                    ]
                  },
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "type": "string"
                  },
                  "functionName": {
                    "description": "The name of your AWS Lambda Function.",
                    "type": "string"
                  },
                  "region": {
                    "description": "The region is which your AWS Lambda Function is hosted. See the <a href=\"https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region\">AWS documentation</a> for more detail.",
                    "example": "us-west-1",
                    "type": "string"
                  }
                },
                "required": [
                  "region",
                  "functionName",
                  "authentication"
                ],
                "type": "object"
              },
              "version": {
                "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
                "type": "string"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "aws_sqs_rule_patch": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AWS SQS. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "aws/sqs"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "authentication": {
                    "discriminator": {
                      "mapping": {
                        "assumeRole": "#/components/schemas/aws_assume_role",
                        "credentials": "#/components/schemas/aws_access_keys"
                      },
                      "propertyName": "authenticationMode"
                    },
                    "oneOf": [
                      {
                        "$ref": "#/components/schemas/aws_access_keys"
                      },
                      {
                        "$ref": "#/components/schemas/aws_assume_role"
                      }
                    ]
                  },
                  "awsAccountId": {
                    "description": "Your AWS account ID.",
                    "type": "string"
                  },
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "type": "string"
                  },
                  "queueName": {
                    "description": "The AWS SQS queue name.",
                    "type": "string"
                  },
                  "region": {
                    "description": "The region is which AWS SQS is hosted. See the <a href=\"https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region\">AWS documentation</a> for more detail.",
                    "example": "us-west-1",
                    "type": "string"
                  }
                },
                "type": "object"
              }
            },
            "type": "object"
          },
          "aws_sqs_rule_post": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AWS SQS. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "aws/sqs"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "authentication": {
                    "discriminator": {
                      "mapping": {
                        "assumeRole": "#/components/schemas/aws_assume_role",
                        "credentials": "#/components/schemas/aws_access_keys"
                      },
                      "propertyName": "authenticationMode"
                    },
                    "oneOf": [
                      {
                        "$ref": "#/components/schemas/aws_access_keys"
                      },
                      {
                        "$ref": "#/components/schemas/aws_assume_role"
                      }
                    ]
                  },
                  "awsAccountId": {
                    "description": "Your AWS account ID.",
                    "type": "string"
                  },
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "type": "string"
                  },
                  "queueName": {
                    "description": "The AWS SQS queue name.",
                    "type": "string"
                  },
                  "region": {
                    "description": "The region is which AWS SQS is hosted. See the <a href=\"https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region\">AWS documentation</a> for more detail.",
                    "example": "us-west-1",
                    "type": "string"
                  }
                },
                "required": [
                  "region",
                  "awsAccountId",
                  "queueName",
                  "authentication"
                ],
                "type": "object"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "aws_sqs_rule_response": {
            "additionalProperties": false,
            "properties": {
              "_links": {
                "nullable": true,
                "type": "object"
              },
              "appId": {
                "description": "The Ably application ID.",
                "example": "28GY6a",
                "type": "string"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the rule.",
                "example": 1602844091815,
                "type": "number"
              },
              "id": {
                "description": "The rule ID.",
                "example": "83IzAB",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of last modification of the rule.",
                "example": 1614679682091,
                "type": "number"
              },
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case AWS SQS. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "aws/sqs"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "authentication": {
                    "discriminator": {
                      "mapping": {
                        "assumeRole": "#/components/schemas/aws_assume_role",
                        "credentials": "#/components/schemas/aws_access_keys_response"
                      },
                      "propertyName": "authenticationMode"
                    },
                    "oneOf": [
                      {
                        "$ref": "#/components/schemas/aws_access_keys_response"
                      },
                      {
                        "$ref": "#/components/schemas/aws_assume_role"
                      }
                    ]
                  },
                  "awsAccountId": {
                    "description": "Your AWS account ID.",
                    "type": "string"
                  },
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "type": "string"
                  },
                  "queueName": {
                    "description": "The AWS SQS queue name.",
                    "type": "string"
                  },
                  "region": {
                    "description": "The region is which AWS SQS is hosted. See the <a href=\"https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region\">AWS documentation</a> for more detail.",
                    "example": "us-west-1",
                    "type": "string"
                  }
                },
                "required": [
                  "region",
                  "awsAccountId",
                  "queueName",
                  "authentication"
                ],
                "type": "object"
              },
              "version": {
                "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
                "type": "string"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "azure_function_rule_patch": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case Microsoft Azure Function. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http/azure-function"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "azureAppId": {
                    "description": "The Microsoft Azure Application ID. You can find your Microsoft Azure Application ID as shown in this <a href=\"https://dev.applicationinsights.io/documentation/Authorization/API-key-and-App-ID\">article</a>.",
                    "example": "d1e9f419-c438-6032b32df979",
                    "type": "string"
                  },
                  "azureFunctionName": {
                    "description": "The name of your Microsoft Azure Function.",
                    "type": "string"
                  },
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "description": "JSON provides a text-based encoding.",
                    "enum": [
                      "json"
                    ],
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  }
                },
                "type": "object"
              }
            },
            "type": "object"
          },
          "azure_function_rule_post": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case Microsoft Azure Function. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http/azure-function"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "azureAppId": {
                    "description": "The Microsoft Azure Application ID. You can find your Microsoft Azure Application ID as shown in this <a href=\"https://dev.applicationinsights.io/documentation/Authorization/API-key-and-App-ID\">article</a>.",
                    "example": "d1e9f419-c438-6032b32df979",
                    "type": "string"
                  },
                  "azureFunctionName": {
                    "description": "The name of your Microsoft Azure Function.",
                    "type": "string"
                  },
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "description": "JSON provides a text-based encoding.",
                    "enum": [
                      "json"
                    ],
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  }
                },
                "required": [
                  "azureAppId",
                  "azureFunctionName"
                ],
                "type": "object"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "azure_function_rule_response": {
            "additionalProperties": false,
            "properties": {
              "_links": {
                "nullable": true,
                "type": "object"
              },
              "appId": {
                "description": "The Ably application ID.",
                "example": "28GY6a",
                "type": "string"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the rule.",
                "example": 1602844091815,
                "type": "number"
              },
              "id": {
                "description": "The rule ID.",
                "example": "83IzAB",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of last modification of the rule.",
                "example": 1614679682091,
                "type": "number"
              },
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case Microsoft Azure Function. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http/azure-function"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "azureAppId": {
                    "description": "The Microsoft Azure Application ID. You can find your Microsoft Azure Application ID as shown in this <a href=\"https://dev.applicationinsights.io/documentation/Authorization/API-key-and-App-ID\">article</a>.",
                    "example": "d1e9f419-c438-6032b32df979",
                    "type": "string"
                  },
                  "azureFunctionName": {
                    "description": "The name of your Microsoft Azure Function.",
                    "type": "string"
                  },
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "description": "JSON provides a text-based encoding.",
                    "enum": [
                      "json"
                    ],
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  }
                },
                "required": [
                  "azureAppId",
                  "azureFunctionName"
                ],
                "type": "object"
              },
              "version": {
                "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
                "type": "string"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "cloudflare_worker_rule_patch": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case Cloudflare Worker. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http/cloudflare-worker"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  }
                },
                "type": "object"
              }
            },
            "type": "object"
          },
          "cloudflare_worker_rule_post": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case Cloudflare Worker. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http/cloudflare-worker"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  }
                },
                "required": [
                  "url"
                ],
                "type": "object"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "cloudflare_worker_rule_response": {
            "additionalProperties": false,
            "properties": {
              "_links": {
                "nullable": true,
                "type": "object"
              },
              "appId": {
                "description": "The Ably application ID.",
                "example": "28GY6a",
                "type": "string"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the rule.",
                "example": 1602844091815,
                "type": "number"
              },
              "id": {
                "description": "The rule ID.",
                "example": "83IzAB",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of last modification of the rule.",
                "example": 1614679682091,
                "type": "number"
              },
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case Cloudflare Worker. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http/cloudflare-worker"
                ],
                "example": "http/cloudflare-worker",
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  }
                },
                "required": [
                  "url"
                ],
                "type": "object"
              },
              "version": {
                "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
                "type": "string"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "error": {
            "additionalProperties": false,
            "properties": {
              "code": {
                "description": "The HTTP status code returned.",
                "type": "integer"
              },
              "details": {
                "description": "Any additional details about the error message.",
                "nullable": true,
                "type": "object"
              },
              "href": {
                "description": "The URL to documentation about the error code.",
                "type": "string"
              },
              "message": {
                "description": "The error message.",
                "type": "string"
              },
              "statusCode": {
                "description": "The Ably error code.",
                "type": "integer"
              }
            },
            "required": [
              "message",
              "code",
              "statusCode",
              "href"
            ],
            "type": "object"
          },
          "google_cloud_function_rule_patch": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case Google Cloud Function. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http/google-cloud-function"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "description": "JSON provides a text-based encoding.",
                    "enum": [
                      "json"
                    ],
                    "type": "string"
                  },
                  "functionName": {
                    "description": "The name of your Google Cloud Function.",
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "projectId": {
                    "description": "The project ID for your Google Cloud Project that was generated when you created your project.",
                    "type": "string"
                  },
                  "region": {
                    "description": "The region in which your Google Cloud Function is hosted. See the <a href=\"https://cloud.google.com/compute/docs/regions-zones/\">Google documentation</a> for more details.",
                    "example": "us-west1",
                    "type": "string"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  }
                },
                "type": "object"
              }
            },
            "type": "object"
          },
          "google_cloud_function_rule_post": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case Google Cloud Function. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http/google-cloud-function"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "description": "JSON provides a text-based encoding.",
                    "enum": [
                      "json"
                    ],
                    "type": "string"
                  },
                  "functionName": {
                    "description": "The name of your Google Cloud Function.",
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "projectId": {
                    "description": "The project ID for your Google Cloud Project that was generated when you created your project.",
                    "type": "string"
                  },
                  "region": {
                    "description": "The region in which your Google Cloud Function is hosted. See the <a href=\"https://cloud.google.com/compute/docs/regions-zones/\">Google documentation</a> for more details.",
                    "example": "us-west1",
                    "type": "string"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  }
                },
                "required": [
                  "region",
                  "projectId",
                  "functionName"
                ],
                "type": "object"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "google_cloud_function_rule_response": {
            "additionalProperties": false,
            "properties": {
              "_links": {
                "nullable": true,
                "type": "object"
              },
              "appId": {
                "description": "The Ably application ID.",
                "example": "28GY6a",
                "type": "string"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the rule.",
                "example": 1602844091815,
                "type": "number"
              },
              "id": {
                "description": "The rule ID.",
                "example": "83IzAB",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of last modification of the rule.",
                "example": 1614679682091,
                "type": "number"
              },
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case Google Cloud Function. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http/google-cloud-function"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "description": "JSON provides a text-based encoding.",
                    "enum": [
                      "json"
                    ],
                    "type": "string"
                  },
                  "functionName": {
                    "description": "The name of your Google Cloud Function.",
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "projectId": {
                    "description": "The project ID for your Google Cloud Project that was generated when you created your project.",
                    "type": "string"
                  },
                  "region": {
                    "description": "The region in which your Google Cloud Function is hosted. See the <a href=\"https://cloud.google.com/compute/docs/regions-zones/\">Google documentation</a> for more details.",
                    "example": "us-west1",
                    "type": "string"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  }
                },
                "required": [
                  "region",
                  "projectId",
                  "functionName"
                ],
                "type": "object"
              },
              "version": {
                "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
                "type": "string"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "http_rule_patch": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "description": "JSON provides a simpler text-based encoding, whereas MsgPack provides a more efficient binary encoding.",
                    "enum": [
                      "json",
                      "msgpack"
                    ],
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  }
                },
                "type": "object"
              }
            },
            "type": "object"
          },
          "http_rule_post": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "description": "JSON provides a simpler text-based encoding, whereas MsgPack provides a more efficient binary encoding.",
                    "enum": [
                      "json",
                      "msgpack"
                    ],
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  },
                  "url": {
                    "description": "The URL of the endpoint that is invoked when events occur on Ably.",
                    "type": "string"
                  }
                },
                "required": [
                  "url",
                  "format"
                ],
                "type": "object"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "http_rule_response": {
            "additionalProperties": false,
            "properties": {
              "_links": {
                "nullable": true,
                "type": "object"
              },
              "appId": {
                "description": "The Ably application ID.",
                "example": "28GY6a",
                "type": "string"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the rule.",
                "example": 1602844091815,
                "type": "number"
              },
              "id": {
                "description": "The rule ID.",
                "example": "83IzAB",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of last modification of the rule.",
                "example": 1614679682091,
                "type": "number"
              },
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "enveloped": {
                    "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
                    "nullable": true,
                    "type": "boolean"
                  },
                  "format": {
                    "description": "JSON provides a simpler text-based encoding, whereas MsgPack provides a more efficient binary encoding.",
                    "enum": [
                      "json",
                      "msgpack"
                    ],
                    "type": "string"
                  },
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  }
                },
                "required": [
                  "url",
                  "format"
                ],
                "type": "object"
              },
              "version": {
                "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
                "type": "string"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "ifttt_rule_patch": {
            "x-requestMode": {
              "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
              "enum": [
                "single"
              ],
              "example": "single",
              "type": "string"
            },
            "x-ruleType": {
              "description": "The type of rule. In this case IFTTT. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
              "enum": [
                "http/ifttt"
              ],
              "type": "string"
            },
            "x-source": {
              "$ref": "#/components/schemas/rule_source"
            },
            "x-target": {
              "additionalProperties": false,
              "properties": {
                "eventName": {
                  "type": "string"
                },
                "webhookKey": {
                  "type": "string"
                }
              },
              "type": "object"
            }
          },
          "ifttt_rule_post": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case IFTTT. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http/ifttt"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "eventName": {
                    "type": "string"
                  },
                  "webhookKey": {
                    "type": "string"
                  }
                },
                "required": [
                  "webhookKey",
                  "eventName"
                ],
                "type": "object"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "ifttt_rule_response": {
            "additionalProperties": false,
            "properties": {
              "_links": {
                "nullable": true,
                "type": "object"
              },
              "appId": {
                "description": "The Ably application ID.",
                "example": "28GY6a",
                "type": "string"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the rule.",
                "example": 1602844091815,
                "type": "number"
              },
              "id": {
                "description": "The rule ID.",
                "example": "83IzAB",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of last modification of the rule.",
                "example": 1614679682091,
                "type": "number"
              },
              "requestMode": {
                "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
                "enum": [
                  "single"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case IFTTT. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http/ifttt"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "eventName": {
                    "type": "string"
                  },
                  "webhookKey": {
                    "type": "string"
                  }
                },
                "required": [
                  "webhookKey",
                  "eventName"
                ],
                "type": "object"
              },
              "version": {
                "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
                "type": "string"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "key_patch": {
            "additionalProperties": false,
            "properties": {
              "capabilities": {
                "description": "The capabilities that this key has. More information on capabilities can be found in the <a href=\"https://ably.com/documentation/core-features/authentication#capabilities-explained\">Ably documentation</a>.",
                "items": {
                  "enum": [
                    "publish",
                    "subscribe",
                    "history",
                    "presence",
                    "channel-metadata",
                    "push-admin",
                    "push-subscribe",
                    "statistics"
                  ],
                  "type": "string"
                },
                "type": "array"
              },
              "channels": {
                "description": "Specify the channels and queues that this key can be used with.",
                "type": "string"
              },
              "name": {
                "description": "The name for your API key. This is a friendly name for your reference.",
                "type": "string"
              }
            },
            "type": "object"
          },
          "key_post": {
            "additionalProperties": false,
            "properties": {
              "capabilities": {
                "description": "The capabilities that this key has. More information on capabilities can be found in the <a href=\"https://ably.com/documentation/core-features/authentication#capabilities-explained\">Ably documentation</a>.",
                "items": {
                  "enum": [
                    "publish",
                    "subscribe",
                    "history",
                    "presence",
                    "channel-metadata",
                    "push-admin",
                    "push-subscribe",
                    "statistics"
                  ],
                  "type": "string"
                },
                "type": "array"
              },
              "channels": {
                "description": "Specify the channels and queues that this key can be used with.",
                "type": "string"
              },
              "name": {
                "description": "The name for your API key. This is a friendly name for your reference.",
                "type": "string"
              }
            },
            "required": [
              "name",
              "channels",
              "capabilities"
            ],
            "type": "object"
          },
          "key_response": {
            "additionalProperties": false,
            "properties": {
              "appId": {
                "description": "The Ably application ID which this key is associated with.",
                "example": "28GY6a",
                "type": "string"
              },
              "capability": {
                "additionalProperties": {
                  "items": {
                    "enum": [
                      "publish",
                      "subscribe",
                      "history",
                      "presence",
                      "channel-metadata",
                      "push-admin",
                      "push-subscribe",
                      "statistics"
                    ],
                    "type": "string"
                  },
                  "type": "array"
                },
                "description": "The capabilities that this key has. More information on capabilities can be found in the <a href=\"https://ably.com/documentation/core-features/authentication#capabilities-explained\">Ably documentation</a>.",
                "type": "object"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the key.",
                "example": 1602844091815,
                "type": "integer"
              },
              "id": {
                "description": "The key ID.",
                "type": "string"
              },
              "key": {
                "description": "The complete API key including API secret.",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of the last modification of the key.",
                "example": 1614679682091,
                "type": "integer"
              },
              "name": {
                "description": "The name of the application this key is associated with.",
                "type": "string"
              }
            },
            "type": "object"
          },
          "me": {
            "additionalProperties": false,
            "properties": {
              "account": {
                "additionalProperties": false,
                "properties": {
                  "id": {
                    "description": "The account ID.",
                    "example": "VpWaOA",
                    "type": "string"
                  },
                  "name": {
                    "description": "The name of the account.",
                    "example": "Free account",
                    "type": "string"
                  }
                },
                "required": [
                  "id",
                  "name"
                ],
                "type": "object"
              },
              "token": {
                "additionalProperties": false,
                "properties": {
                  "capabilities": {
                    "description": "An array containing the access capabilities associated with the access token.",
                    "example": [
                      "write:namespace",
                      "read:namespace",
                      "write:queue",
                      "read:queue",
                      "write:rule",
                      "read:rule",
                      "write:key",
                      "read:key",
                      "write:app",
                      "read:app"
                    ],
                    "items": {
                      "type": "string"
                    },
                    "type": "array"
                  },
                  "id": {
                    "description": "The token ID. This is a UUID.",
                    "example": "C95837C9-184B-4CC2-8779-B769F960FADB",
                    "type": "integer"
                  },
                  "name": {
                    "description": "The friendly name for the token.",
                    "example": "My Token",
                    "type": "string"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "capabilities"
                ],
                "type": "object"
              },
              "user": {
                "additionalProperties": false,
                "properties": {
                  "email": {
                    "description": "Email address of the user associated with the account.",
                    "type": "string"
                  },
                  "id": {
                    "description": "The user ID associated with the account. This is a UUID.",
                    "example": "C95837C9-184B-4CC2-8779-B769F960FADB",
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "email"
                ],
                "type": "object"
              }
            },
            "type": "object"
          },
          "namespace_patch": {
            "additionalProperties": false,
            "properties": {
              "authenticated": {
                "default": false,
                "description": "If `true`, clients will not be permitted to use (including to attach, publish, or subscribe) any channels within this namespace unless they are identified, that is, authenticated using a client ID. See the <a href=\"https://knowledge.ably.com/authenticated-and-identified-clients\">Ably knowledge base/a> for more details.",
                "example": false,
                "type": "boolean"
              },
              "persistLast": {
                "default": false,
                "description": "If `true`, the last message published on a channel will be stored for 365 days. You can access the stored message only by using the channel rewind mechanism and attaching with rewind=1. Please note that for each message stored, an additional message is deducted from your monthly allocation.",
                "example": false,
                "type": "boolean"
              },
              "persisted": {
                "default": false,
                "description": "If `true`, all messages on a channel will be stored for 24 hours. You can access stored messages via the History API. Please note that for each message stored, an additional message is deducted from your monthly allocation.",
                "example": false,
                "type": "boolean"
              },
              "pushEnabled": {
                "default": false,
                "description": "If `true`, publishing messages with a push payload in the extras field is permitted and can trigger the delivery of a native push notification to registered devices for the channel.",
                "example": false,
                "type": "boolean"
              },
              "tlsOnly": {
                "default": false,
                "description": "If `true`, only clients that are connected using TLS will be permitted to subscribe to any channels within this namespace.",
                "example": false,
                "type": "boolean"
              }
            },
            "type": "object"
          },
          "namespace_post": {
            "additionalProperties": false,
            "properties": {
              "authenticated": {
                "default": false,
                "description": "If `true`, clients will not be permitted to use (including to attach, publish, or subscribe) any channels within this namespace unless they are identified, that is, authenticated using a client ID. See the <a href=\"https://knowledge.ably.com/authenticated-and-identified-clients\">Ably Knowledge base</a> for more details.",
                "example": false,
                "type": "boolean"
              },
              "id": {
                "description": "The namespace or channel name that the channel rule will apply to. For example, if you specify `namespace` the namespace will be set to `namespace` and will match with channels `namespace:*` and `namespace`.",
                "example": "namespace",
                "type": "string"
              },
              "persistLast": {
                "default": false,
                "description": "If `true`, the last message published on a channel will be stored for 365 days. You can access the stored message only by using the channel rewind mechanism and attaching with rewind=1. Please note that for each message stored, an additional message is deducted from your monthly allocation.",
                "example": false,
                "type": "boolean"
              },
              "persisted": {
                "default": false,
                "description": "If `true`, all messages on a channel will be stored for 24 hours. You can access stored messages via the History API. Please note that for each message stored, an additional message is deducted from your monthly allocation.",
                "example": false,
                "type": "boolean"
              },
              "pushEnabled": {
                "default": false,
                "description": "If `true`, publishing messages with a push payload in the extras field is permitted and can trigger the delivery of a native push notification to registered devices for the channel.",
                "example": false,
                "type": "boolean"
              },
              "tlsOnly": {
                "default": false,
                "description": "If `true`, only clients that are connected using TLS will be permitted to subscribe to any channels within this namespace.",
                "example": false,
                "type": "boolean"
              }
            },
            "required": [
              "id"
            ],
            "type": "object"
          },
          "namespace_response": {
            "additionalProperties": false,
            "properties": {
              "authenticated": {
                "default": false,
                "description": "If `true`, clients will not be permitted to use (including to attach, publish, or subscribe) any channels within this namespace unless they are identified, that is, authenticated using a client ID. See the <a href=\"https://knowledge.ably.com/authenticated-and-identified-clients\">Ably knowledge base</a> for more details.",
                "example": false,
                "type": "boolean"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the namespace.",
                "example": 1602844091815,
                "type": "integer"
              },
              "id": {
                "description": "The namespace or channel name that the channel rule will apply to. For example, if you specify `namespace` the namespace will be set to `namespace` and will match with channels `namespace:*` and `namespace`.",
                "example": "namespace",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of last modification of the namespace.",
                "example": 1614679682091,
                "type": "integer"
              },
              "persistLast": {
                "default": false,
                "description": "If `true`, the last message published on a channel will be stored for 365 days. You can access the stored message only by using the channel rewind mechanism and attaching with rewind=1. Please note that for each message stored, an additional message is deducted from your monthly allocation.",
                "example": false,
                "type": "boolean"
              },
              "persisted": {
                "default": false,
                "description": "If `true`, all messages on a channel will be stored for 24 hours. You can access stored messages via the History API. Please note that for each message stored, an additional message is deducted from your monthly allocation.",
                "example": false,
                "type": "boolean"
              },
              "pushEnabled": {
                "default": false,
                "description": "If `true`, publishing messages with a push payload in the extras field is permitted and can trigger the delivery of a native push notification to registered devices for the channel.",
                "example": false,
                "type": "boolean"
              },
              "tlsOnly": {
                "default": false,
                "description": "If `true`, only clients that are connected using TLS will be permitted to subscribe to any channels within this namespace.",
                "example": false,
                "type": "boolean"
              }
            },
            "type": "object"
          },
          "queue": {
            "additionalProperties": false,
            "properties": {
              "maxLength": {
                "description": "Message limit in number of messages.",
                "example": 10000,
                "type": "integer"
              },
              "name": {
                "description": "A friendly name for your queue.",
                "example": "My queue",
                "type": "string"
              },
              "region": {
                "description": "The data center region. US East (Virginia) or EU West (Ireland). Values are `us-east-1-a` or `eu-west-1-a`.",
                "example": "us-east-1-a",
                "type": "string"
              },
              "ttl": {
                "description": "TTL in minutes.",
                "example": 60,
                "type": "integer"
              }
            },
            "required": [
              "name",
              "ttl",
              "maxLength",
              "region"
            ],
            "type": "object"
          },
          "queue_response": {
            "additionalProperties": false,
            "properties": {
              "amqp": {
                "additionalProperties": false,
                "properties": {
                  "queueName": {
                    "description": "Name of the Ably queue.",
                    "example": "28AB6w:My queue",
                    "type": "string"
                  },
                  "uri": {
                    "description": "URI for the AMQP queue interface.",
                    "example": "amqps://us-east-1-a-queue.ably.io:5671/shared",
                    "type": "string"
                  }
                },
                "type": "object"
              },
              "appId": {
                "description": "The Ably application ID.",
                "example": "28AB6w",
                "type": "string"
              },
              "deadletter": {
                "description": "A boolean that indicates whether this is a dead letter queue or not.",
                "example": false,
                "type": "boolean"
              },
              "deadletterId": {
                "example": "28AB6w:us-east-1-a:deadletter",
                "nullable": true,
                "type": "string"
              },
              "id": {
                "description": "The ID of the Ably queue",
                "example": "28AB6w:us-east-1-a:My queue",
                "type": "string"
              },
              "maxLength": {
                "description": "Message limit in number of messages.",
                "example": 10000,
                "type": "integer"
              },
              "messages": {
                "additionalProperties": false,
                "description": "Details of messages in the queue.",
                "properties": {
                  "ready": {
                    "description": "The number of ready messages in the queue.",
                    "example": 0,
                    "nullable": true,
                    "type": "integer"
                  },
                  "total": {
                    "description": "The total number of messages in the queue.",
                    "example": 0,
                    "nullable": true,
                    "type": "integer"
                  },
                  "unacknowledged": {
                    "description": "The number of unacknowledged messages in the queue.",
                    "example": 0,
                    "nullable": true,
                    "type": "integer"
                  }
                },
                "type": "object"
              },
              "name": {
                "description": "The friendly name of the queue.",
                "example": "My queue",
                "type": "string"
              },
              "region": {
                "description": "The data center region for the queue.",
                "example": "eu-west-1-a",
                "type": "string"
              },
              "state": {
                "description": "The current state of the queue.",
                "example": "Running",
                "type": "string"
              },
              "stats": {
                "additionalProperties": false,
                "properties": {
                  "acknowledgementRate": {
                    "description": "The rate at which messages are acknowledged. Rate is messages per minute.",
                    "nullable": true,
                    "type": "number"
                  },
                  "deliveryRate": {
                    "description": "The rate at which messages are delivered from the queue. Rate is messages per minute.",
                    "nullable": true,
                    "type": "number"
                  },
                  "publishRate": {
                    "description": "The rate at which messages are published to the queue. Rate is messages per minute.",
                    "nullable": true,
                    "type": "number"
                  }
                },
                "type": "object"
              },
              "stomp": {
                "additionalProperties": false,
                "properties": {
                  "destination": {
                    "description": "Destination queue.",
                    "example": "/amqp/queue/28AB6w:My queue",
                    "type": "string"
                  },
                  "host": {
                    "description": "The host type for the queue.",
                    "example": "shared",
                    "type": "string"
                  },
                  "uri": {
                    "description": "URI for the STOMP queue interface.",
                    "example": "stomp://us-east-1-a-queue.ably.io:61614",
                    "type": "string"
                  }
                },
                "type": "object"
              },
              "ttl": {
                "description": "TTL in minutes.",
                "example": 60,
                "type": "integer"
              }
            },
            "type": "object"
          },
          "rule_attributes": {
            "additionalProperties": false,
            "properties": {
              "appId": {
                "description": "The Ably application ID.",
                "example": "28GY6a",
                "type": "string"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the rule.",
                "example": 1602844091815,
                "type": "number"
              },
              "id": {
                "description": "The rule ID.",
                "example": "83IzAB",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of last modification of the rule.",
                "example": 1614679682091,
                "type": "number"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "version": {
                "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
                "type": "string"
              }
            },
            "type": "object"
          },
          "rule_patch": {
            "discriminator": {
              "mapping": {
                "amqp": "#/components/schemas/amqp_rule_patch",
                "amqp/external": "#/components/schemas/amqp_external_rule_patch",
                "aws/kinesis": "#/components/schemas/aws_kinesis_rule_patch",
                "aws/lambda": "#/components/schemas/aws_lambda_rule_patch",
                "aws/sqs": "#/components/schemas/aws_sqs_rule_patch",
                "http": "#/components/schemas/http_rule_patch",
                "http/azure-function": "#/components/schemas/azure_function_rule_patch",
                "http/cloudflare-worker": "#/components/schemas/cloudflare_worker_rule_patch",
                "http/google-cloud-function": "#/components/schemas/google_cloud_function_rule_patch",
                "http/ifttt": "#/components/schemas/ifttt_rule_patch",
                "http/zapier": "#/components/schemas/zapier_rule_patch"
              },
              "propertyName": "ruleType"
            },
            "oneOf": [
              {
                "$ref": "#/components/schemas/http_rule_patch"
              },
              {
                "$ref": "#/components/schemas/ifttt_rule_patch"
              },
              {
                "$ref": "#/components/schemas/zapier_rule_patch"
              },
              {
                "$ref": "#/components/schemas/cloudflare_worker_rule_patch"
              },
              {
                "$ref": "#/components/schemas/azure_function_rule_patch"
              },
              {
                "$ref": "#/components/schemas/google_cloud_function_rule_patch"
              },
              {
                "$ref": "#/components/schemas/aws_lambda_rule_patch"
              },
              {
                "$ref": "#/components/schemas/aws_kinesis_rule_patch"
              },
              {
                "$ref": "#/components/schemas/aws_sqs_rule_patch"
              },
              {
                "$ref": "#/components/schemas/amqp_rule_patch"
              },
              {
                "$ref": "#/components/schemas/amqp_external_rule_patch"
              }
            ]
          },
          "rule_post": {
            "discriminator": {
              "mapping": {
                "amqp": "#/components/schemas/amqp_rule_post",
                "amqp/external": "#/components/schemas/amqp_external_rule_post",
                "aws/kinesis": "#/components/schemas/aws_kinesis_rule_post",
                "aws/lambda": "#/components/schemas/aws_lambda_rule_post",
                "aws/sqs": "#/components/schemas/aws_sqs_rule_post",
                "http": "#/components/schemas/http_rule_post",
                "http/azure-function": "#/components/schemas/azure_function_rule_post",
                "http/cloudflare-worker": "#/components/schemas/cloudflare_worker_rule_post",
                "http/google-cloud-function": "#/components/schemas/google_cloud_function_rule_post",
                "http/ifttt": "#/components/schemas/ifttt_rule_post",
                "http/zapier": "#/components/schemas/zapier_rule_post",
                "unsupported": "#/components/schemas/unsupported_rule_response"
              },
              "propertyName": "ruleType"
            },
            "oneOf": [
              {
                "$ref": "#/components/schemas/http_rule_post"
              },
              {
                "$ref": "#/components/schemas/ifttt_rule_post"
              },
              {
                "$ref": "#/components/schemas/zapier_rule_post"
              },
              {
                "$ref": "#/components/schemas/cloudflare_worker_rule_post"
              },
              {
                "$ref": "#/components/schemas/azure_function_rule_post"
              },
              {
                "$ref": "#/components/schemas/google_cloud_function_rule_post"
              },
              {
                "$ref": "#/components/schemas/aws_lambda_rule_post"
              },
              {
                "$ref": "#/components/schemas/aws_kinesis_rule_post"
              },
              {
                "$ref": "#/components/schemas/aws_sqs_rule_post"
              },
              {
                "$ref": "#/components/schemas/amqp_rule_post"
              },
              {
                "$ref": "#/components/schemas/amqp_external_rule_post"
              },
              {
                "$ref": "#/components/schemas/unsupported_rule_response"
              }
            ]
          },
          "rule_response": {
            "discriminator": {
              "mapping": {
                "amqp": "#/components/schemas/amqp_rule_response",
                "amqp/external": "#/components/schemas/amqp_external_rule_response",
                "aws/kinesis": "#/components/schemas/aws_kinesis_rule_response",
                "aws/lambda": "#/components/schemas/aws_lambda_rule_response",
                "aws/sqs": "#/components/schemas/aws_sqs_rule_response",
                "http": "#/components/schemas/http_rule_response",
                "http/azure-function": "#/components/schemas/azure_function_rule_response",
                "http/cloudflare-worker": "#/components/schemas/cloudflare_worker_rule_response",
                "http/google-cloud-function": "#/components/schemas/google_cloud_function_rule_response",
                "http/ifttt": "#/components/schemas/ifttt_rule_response",
                "http/zapier": "#/components/schemas/zapier_rule_response"
              },
              "propertyName": "ruleType"
            },
            "oneOf": [
              {
                "$ref": "#/components/schemas/http_rule_response"
              },
              {
                "$ref": "#/components/schemas/ifttt_rule_response"
              },
              {
                "$ref": "#/components/schemas/zapier_rule_response"
              },
              {
                "$ref": "#/components/schemas/cloudflare_worker_rule_response"
              },
              {
                "$ref": "#/components/schemas/azure_function_rule_response"
              },
              {
                "$ref": "#/components/schemas/google_cloud_function_rule_response"
              },
              {
                "$ref": "#/components/schemas/aws_lambda_rule_response"
              },
              {
                "$ref": "#/components/schemas/aws_kinesis_rule_response"
              },
              {
                "$ref": "#/components/schemas/aws_sqs_rule_response"
              },
              {
                "$ref": "#/components/schemas/amqp_rule_response"
              },
              {
                "$ref": "#/components/schemas/amqp_external_rule_response"
              }
            ]
          },
          "rule_source": {
            "additionalProperties": false,
            "properties": {
              "channelFilter": {
                "description": "This field allows you to filter your rule based on a regular expression that is matched against the complete channel name. Leave this empty if you want the rule to apply to all channels.",
                "type": "string"
              },
              "type": {
                "description": "The type `channel.message` delivers all messages published on a channel. The type `channel.presence` delivers all enter, update and leave events for members present on a channel. The type `channel.lifecycle` events for this rule type are currently not supported. Get in touch (https://ably.com/contact) if you need this feature. The type `channel.occupancy` delivers all occupancy events for the channel.",
                "enum": [
                  "channel.message",
                  "channel.presence",
                  "channel.lifecycle",
                  "channel.occupancy"
                ],
                "example": "channel.message",
                "type": "string"
              }
            },
            "required": [
              "channelFilter",
              "type"
            ],
            "type": "object"
          },
          "rule_source_patch": {
            "additionalProperties": false,
            "properties": {
              "channelFilter": {
                "description": "This field allows you to filter your rule based on a regular expression that is matched against the complete channel name. Leave this empty if you want the rule to apply to all channels.",
                "type": "string"
              },
              "type": {
                "description": "The type `channel.message` delivers all messages published on a channel. The type `channel.presence` delivers all enter, update and leave events for members present on a channel. The type `channel.lifecycle` events for this rule type are currently not supported. Get in touch (https://ably.com/contact) if you need this feature. The type `channel.occupancy` delivers all occupancy events for the channel.",
                "enum": [
                  "channel.message",
                  "channel.presence",
                  "channel.lifecycle",
                  "channel.occupancy"
                ],
                "type": "string"
              }
            },
            "type": "object"
          },
          "unsupported_rule_response": {
            "additionalProperties": false,
            "properties": {
              "_links": {
                "nullable": true,
                "type": "object"
              },
              "appId": {
                "description": "The Ably application ID.",
                "example": "28GY6a",
                "type": "string"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the rule.",
                "example": 1602844091815,
                "type": "number"
              },
              "id": {
                "description": "The rule ID.",
                "example": "83IzAB",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of last modification of the rule.",
                "example": 1614679682091,
                "type": "number"
              },
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "This rule type is currently unsupported.",
                "enum": [
                  "unsupported"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "url": {
                    "type": "string"
                  }
                },
                "required": [
                  "url"
                ],
                "type": "object"
              },
              "version": {
                "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
                "type": "string"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "zapier_rule_patch": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case Zapier. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http/zapier"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  }
                },
                "type": "object"
              }
            },
            "type": "object"
          },
          "zapier_rule_post": {
            "additionalProperties": false,
            "properties": {
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case Zapier. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http/zapier"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  }
                },
                "required": [
                  "url"
                ],
                "type": "object"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          },
          "zapier_rule_response": {
            "additionalProperties": false,
            "properties": {
              "_links": {
                "nullable": true,
                "type": "object"
              },
              "appId": {
                "description": "The Ably application ID.",
                "example": "28GY6a",
                "type": "string"
              },
              "created": {
                "description": "Unix timestamp representing the date and time of creation of the rule.",
                "example": 1602844091815,
                "type": "number"
              },
              "id": {
                "description": "The rule ID.",
                "example": "83IzAB",
                "type": "string"
              },
              "modified": {
                "description": "Unix timestamp representing the date and time of last modification of the rule.",
                "example": 1614679682091,
                "type": "number"
              },
              "requestMode": {
                "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
                "enum": [
                  "single",
                  "batch"
                ],
                "example": "single",
                "type": "string"
              },
              "ruleType": {
                "description": "The type of rule. In this case Zapier. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
                "enum": [
                  "http/zapier"
                ],
                "type": "string"
              },
              "source": {
                "$ref": "#/components/schemas/rule_source"
              },
              "status": {
                "description": "The status of the rule. Rules can be enabled or disabled.",
                "enum": [
                  "enabled",
                  "disabled"
                ],
                "example": "enabled",
                "type": "string"
              },
              "target": {
                "additionalProperties": false,
                "properties": {
                  "headers": {
                    "description": "If you have additional information to send, you'll need to include the relevant headers.",
                    "items": {
                      "properties": {
                        "name": {
                          "description": "The name of the header.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value of the header.",
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "signingKeyId": {
                    "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
                    "nullable": true,
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  }
                },
                "required": [
                  "url"
                ],
                "type": "object"
              },
              "version": {
                "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
                "type": "string"
              }
            },
            "required": [
              "ruleType",
              "requestMode",
              "source",
              "target"
            ],
            "type": "object"
          }
        },
        "securitySchemes": {
          "bearer_auth": {
            "description": "Control API uses bearer authentication. You need to generate an access token for use with this API. More details can be found in the <a href=\"https://ably.com/documentation/control-api/#authentication\">Ably documentation</a>.",
            "scheme": "bearer",
            "type": "http"
          }
        }
      }
    }
  },
  {
    "id": "callbacks",
    "data": {
      "openapi": "3.0.3",
      "info": {
        "title": "Support for callbacks",
        "description": "https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject\n\nhttps://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameter-object\n\nhttps://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schema-object",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org"
        }
      ],
      "paths": {
        "/callbacks": {
          "get": {
            "summary": "Utilizes callbacks.",
            "description": "https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#callbackObject",
            "responses": {
              "200": {
                "description": "OK"
              }
            },
            "callbacks": {
              "myCallback": {
                "{$request.query.queryUrl}": {
                  "post": {
                    "summary": "Callback summary",
                    "description": "Callback description",
                    "requestBody": {
                      "description": "Callback payload",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/dog"
                          }
                        }
                      }
                    },
                    "responses": {
                      "200": {
                        "description": "callback successfully processed",
                        "content": {
                          "application/json": {
                            "example": {
                              "id": 1,
                              "name": "Pug",
                              "is_a_good_dog": true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "multipleCallback": {
                "{$request.multipleExpression.queryUrl}": {
                  "post": {
                    "requestBody": {
                      "description": "Callback payload",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/dog"
                          }
                        }
                      }
                    },
                    "responses": {
                      "200": {
                        "description": "callback successfully processed",
                        "content": {
                          "application/json": {
                            "example": {
                              "id": 1,
                              "name": "Pug",
                              "is_a_good_dog": true
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "{$request.multipleMethod.queryUrl}": {
                  "summary": "[common] callback summary",
                  "description": "[common] callback description",
                  "parameters": [
                    {
                      "in": "query",
                      "name": "queryParam",
                      "schema": {
                        "type": "string"
                      },
                      "required": true
                    }
                  ],
                  "post": {
                    "summary": "[post] callback summary",
                    "description": "[post] callback description",
                    "requestBody": {
                      "description": "Callback payload",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/dog"
                          }
                        }
                      }
                    },
                    "responses": {
                      "200": {
                        "description": "callback successfully processed"
                      }
                    }
                  },
                  "get": {
                    "summary": "[get] callback summary",
                    "description": "[get] callback description",
                    "parameters": [
                      {
                        "in": "query",
                        "name": "queryParam",
                        "schema": {
                          "type": "string"
                        },
                        "required": true
                      },
                      {
                        "in": "query",
                        "name": "anotherQueryParam",
                        "schema": {
                          "type": "string"
                        },
                        "required": true
                      }
                    ],
                    "responses": {
                      "200": {
                        "description": "callback successfully processed",
                        "content": {
                          "application/json": {
                            "example": {
                              "id": 1,
                              "name": "Pug",
                              "is_a_good_dog": true
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
      "components": {
        "schemas": {
          "dog": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer"
              },
              "name": {
                "type": "string"
              },
              "is_a_good_dog": {
                "type": "boolean"
              }
            },
            "example": {
              "id": 1,
              "name": "Pug",
              "is_a_good_dog": true
            }
          }
        }
      }
    }
  },
  {
    "id": "callbacks-weird-summary-description",
    "data": {
      "openapi": "3.0.3",
      "info": {
        "title": "Support for callbacks",
        "description": "https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject\n\nhttps://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameter-object\n\nhttps://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schema-object",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org"
        }
      ],
      "paths": {
        "/callbacks": {
          "summary": {
            "$ref": "foo-summary.md"
          },
          "description": {
            "$ref": "foo-desc.md"
          },
          "get": {
            "summary": {
              "$ref": "foo-summary.md"
            },
            "description": {
              "$ref": "foo-desc.md"
            },
            "responses": {
              "200": {
                "description": "OK"
              }
            },
            "callbacks": {
              "myCallback": {
                "{$request.query.queryUrl}": {
                  "post": {
                    "summary": {
                      "$ref": "foo-summary.md"
                    },
                    "description": {
                      "$ref": "foo-desc.md"
                    },
                    "requestBody": {
                      "description": "Callback payload",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/dog"
                          }
                        }
                      }
                    },
                    "responses": {
                      "200": {
                        "description": "callback successfully processed",
                        "content": {
                          "application/json": {
                            "example": {
                              "id": 1,
                              "name": "Pug",
                              "is_a_good_dog": true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "multipleCallback": {
                "{$request.multipleExpression.queryUrl}": {
                  "post": {
                    "requestBody": {
                      "description": "Callback payload",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/dog"
                          }
                        }
                      }
                    },
                    "responses": {
                      "200": {
                        "description": "callback successfully processed",
                        "content": {
                          "application/json": {
                            "example": {
                              "id": 1,
                              "name": "Pug",
                              "is_a_good_dog": true
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "{$request.multipleMethod.queryUrl}": {
                  "summary": {
                    "$ref": "foo-summary.md"
                  },
                  "description": {
                    "$ref": "foo-desc.md"
                  },
                  "parameters": [
                    {
                      "in": "query",
                      "name": "queryParam",
                      "schema": {
                        "type": "string"
                      },
                      "required": true
                    }
                  ],
                  "post": {
                    "requestBody": {
                      "description": "Callback payload",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/dog"
                          }
                        }
                      }
                    },
                    "responses": {
                      "200": {
                        "description": "callback successfully processed"
                      }
                    }
                  },
                  "get": {
                    "summary": "[get] callback summary",
                    "description": "[get] callback description",
                    "parameters": [
                      {
                        "in": "query",
                        "name": "queryParam",
                        "schema": {
                          "type": "string"
                        },
                        "required": true
                      },
                      {
                        "in": "query",
                        "name": "anotherQueryParam",
                        "schema": {
                          "type": "string"
                        },
                        "required": true
                      }
                    ],
                    "responses": {
                      "200": {
                        "description": "callback successfully processed",
                        "content": {
                          "application/json": {
                            "example": {
                              "id": 1,
                              "name": "Pug",
                              "is_a_good_dog": true
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
          "post": {
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "dog": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer"
              },
              "name": {
                "type": "string"
              },
              "is_a_good_dog": {
                "type": "boolean"
              }
            },
            "example": {
              "id": 1,
              "name": "Pug",
              "is_a_good_dog": true
            }
          }
        }
      }
    }
  },
  {
    "id": "circular",
    "data": {
      "openapi": "3.0.0",
      "info": {
        "title": "circular example",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org/anything"
        }
      ],
      "paths": {
        "/": {
          "get": {
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "dateTime": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "offsetAfter": {
                          "$ref": "#/components/schemas/offset"
                        },
                        "offsetBefore": {
                          "$ref": "#/components/schemas/offset"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "post": {
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "dateTime": {
                        "type": "string",
                        "format": "date-time"
                      },
                      "dateTimeFromRef": {
                        "$ref": "#/components/schemas/dateTime"
                      },
                      "offsetAfter": {
                        "$ref": "#/components/schemas/offset"
                      },
                      "offsetBefore": {
                        "$ref": "#/components/schemas/offset"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          },
          "put": {
            "description": "This operation is different because it has a circular ref array as a parameter and in its response, but not its request body.",
            "parameters": [
              {
                "name": "content",
                "in": "header",
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/SalesLine"
                  }
                }
              }
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/SalesLine"
                      }
                    }
                  }
                }
              },
              "201": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/SalesLine"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "dateTime": {
            "type": "string",
            "format": "date-time"
          },
          "offset": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "rules": {
                "$ref": "#/components/schemas/rules"
              }
            }
          },
          "offsetTransition": {
            "type": "object",
            "properties": {
              "dateTime": {
                "type": "string",
                "format": "date-time"
              },
              "offsetAfter": {
                "$ref": "#/components/schemas/offset"
              },
              "offsetBefore": {
                "$ref": "#/components/schemas/offset"
              }
            }
          },
          "rules": {
            "type": "object",
            "properties": {
              "transitions": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/offsetTransition"
                }
              }
            }
          },
          "SalesLine": {
            "type": "object",
            "properties": {
              "stock": {
                "$ref": "#/components/schemas/ProductStock"
              }
            }
          },
          "ProductStock": {
            "properties": {
              "test_param": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/SalesLine"
                }
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "circular-path",
    "data": {
      "openapi": "3.0.0",
      "info": {
        "title": "circular example",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org/anything"
        }
      ],
      "paths": {
        "/anything": {
          "get": {
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "dateTime": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "offsetAfter": {
                          "$ref": "#/components/schemas/offset"
                        },
                        "offsetBefore": {
                          "$ref": "#/paths/~1anything/post/requestBody/content/application~1json/schema/properties/circular"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "post": {
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "circular": {
                        "$ref": "#/components/schemas/offset"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          },
          "put": {
            "description": "This operation is different because it has a circular ref array as a parameter and in its response, but not its request body.",
            "parameters": [
              {
                "name": "content",
                "in": "header",
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/SalesLine"
                  }
                }
              }
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/SalesLine"
                      }
                    }
                  }
                }
              },
              "201": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/SalesLine"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "dateTime": {
            "type": "string",
            "format": "date-time"
          },
          "offset": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "rules": {
                "$ref": "#/components/schemas/rules"
              }
            }
          },
          "offsetTransition": {
            "type": "object",
            "properties": {
              "dateTime": {
                "type": "string",
                "format": "date-time"
              },
              "offsetAfter": {
                "$ref": "#/components/schemas/offset"
              },
              "offsetBefore": {
                "$ref": "#/components/schemas/offset"
              }
            }
          },
          "rules": {
            "type": "object",
            "properties": {
              "transitions": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/offsetTransition"
                }
              }
            }
          },
          "SalesLine": {
            "type": "object",
            "properties": {
              "stock": {
                "$ref": "#/components/schemas/ProductStock"
              }
            }
          },
          "ProductStock": {
            "properties": {
              "test_param": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/SalesLine"
                }
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "complex-nesting",
    "data": {
      "openapi": "3.0.3",
      "info": {
        "title": "Responses with various schema formats",
        "description": "https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schema-object",
        "version": "1.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org"
        }
      ],
      "paths": {
        "/top-level-array/simple": {
          "post": {
            "summary": "Simple Array",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ArrayOfFlatObjects"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/ArrayOfFlatObjects"
                    }
                  }
                }
              }
            }
          }
        },
        "/top-level-array/of-everything": {
          "post": {
            "summary": "Array of Everything",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/ObjectOfEverything"
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/ObjectOfEverything"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/top-level-object/simple": {
          "post": {
            "summary": "Simple Object",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "nest1": {
                        "$ref": "#/components/schemas/FlatObject"
                      },
                      "nest2": {
                        "$ref": "#/components/schemas/FlatObject"
                      },
                      "nest3": {
                        "$ref": "#/components/schemas/FlatObject"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "nest": {
                          "$ref": "#/components/schemas/FlatObject"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/top-level-object/of-everything": {
          "post": {
            "summary": "Object of Everything",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ObjectOfEverything"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/ObjectOfEverything"
                    }
                  }
                }
              }
            }
          }
        },
        "/multischema/of-everything": {
          "post": {
            "summary": "Multischema of Everything",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MultischemaOfEverything"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/MultischemaOfEverything"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "MultischemaOfEverything": {
            "oneOf": [
              {
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/ArrayOfObjectsOfObjectsAndArrays"
                  },
                  {
                    "type": "object",
                    "properties": {
                      "objEverything": {
                        "$ref": "#/components/schemas/ObjectOfEverything"
                      },
                      "flatObj": {
                        "$ref": "#/components/schemas/FlatObject"
                      }
                    }
                  }
                ]
              },
              {
                "$ref": "#/components/schemas/ArrayOfPrimitives"
              },
              {
                "$ref": "#/components/schemas/ArrayOfFlatObjects"
              },
              {
                "$ref": "#/components/schemas/FlatObject"
              },
              {
                "$ref": "#/components/schemas/ObjectOfEverything"
              }
            ]
          },
          "ArrayOfObjectsOfObjectsAndArrays": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ObjectOfObjectsAndArrays"
            }
          },
          "ObjectOfEverything": {
            "type": "object",
            "properties": {
              "ObjectOfObjectsAndArrays": {
                "$ref": "#/components/schemas/ObjectOfObjectsAndArrays"
              },
              "ArrayOfObjectsOfObjectsAndArrays": {
                "$ref": "#/components/schemas/ArrayOfObjectsOfObjectsAndArrays"
              },
              "StringPrimitive": {
                "type": "string"
              }
            }
          },
          "ArrayOfPrimitives": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "ArrayOfFlatObjects": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/FlatObject"
            }
          },
          "ObjectOfObjectsAndArrays": {
            "type": "object",
            "properties": {
              "ObjectPropInArray": {
                "$ref": "#/components/schemas/FlatObject"
              },
              "PrimitiveArrayPropInArray": {
                "$ref": "#/components/schemas/ArrayOfPrimitives"
              },
              "ObjectArrayPropInArray": {
                "$ref": "#/components/schemas/ArrayOfFlatObjects"
              },
              "StringPrimitive": {
                "type": "string"
              }
            }
          },
          "FlatObject": {
            "type": "object",
            "properties": {
              "StringProp": {
                "type": "string"
              },
              "BoolProp": {
                "type": "boolean"
              },
              "NumProp": {
                "type": "number"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "deprecated",
    "data": {
      "openapi": "3.0.0",
      "servers": [
        {
          "url": "https://httpbin.org/"
        }
      ],
      "info": {
        "title": "Operations with deprecated properties and no examples",
        "version": "1.0"
      },
      "paths": {
        "/": {
          "post": {
            "description": "This operation handles has no schemas, but empty `examples`.",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/tag"
                  },
                  "examples": {}
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/tag"
                      }
                    },
                    "examples": {}
                  }
                }
              }
            }
          }
        },
        "/allof-schema": {
          "post": {
            "description": "This operation handles has no schemas, but empty `examples`.",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/tag"
                      },
                      {
                        "$ref": "#/components/schemas/category"
                      }
                    ]
                  },
                  "examples": {}
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "allOf": [
                          {
                            "$ref": "#/components/schemas/tag"
                          },
                          {
                            "$ref": "#/components/schemas/category"
                          }
                        ]
                      }
                    },
                    "examples": {}
                  }
                }
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "category": {
            "type": "object",
            "properties": {
              "category": {
                "type": "string"
              }
            }
          },
          "tag": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "name": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "discriminators",
    "data": {
      "openapi": "3.0.3",
      "info": {
        "title": "Discriminator support",
        "description": "https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#discriminatorObject",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org"
        }
      ],
      "paths": {
        "/anything/discriminator-with-mapping": {
          "patch": {
            "operationId": "oneOfWithTopLevelDiscriminatorAndMapping",
            "summary": "oneOf with discriminator and mapping",
            "description": "Polymorphic `oneOf` schema with a top-level discriminator and a mapping definition.",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "oneOf": [
                      {
                        "$ref": "#/components/schemas/OptionOneNoDisc"
                      },
                      {
                        "$ref": "#/components/schemas/OptionTwoNoDisc"
                      }
                    ],
                    "discriminator": {
                      "propertyName": "discrim",
                      "mapping": {
                        "Option One": "#/components/schemas/OptionOneNoDisc",
                        "Option Two": "#/components/schemas/OptionTwoNoDisc"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Updated"
              }
            }
          }
        },
        "/anything/discriminator-with-no-mapping": {
          "patch": {
            "operationId": "oneOfWithTopLevelDiscriminatorNoMapping",
            "summary": "oneOf with top-level discriminator (no mapping)",
            "description": "Polymorphic `oneOf` schema with a top-level discriminator and **no** mapping definition.",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "oneOf": [
                      {
                        "$ref": "#/components/schemas/OptionOneNoDisc"
                      },
                      {
                        "$ref": "#/components/schemas/OptionTwoNoDisc"
                      }
                    ],
                    "discriminator": {
                      "propertyName": "discrim"
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Updated"
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "OptionOneNoDisc": {
            "type": "object",
            "required": [
              "discrim"
            ],
            "properties": {
              "discrim": {
                "type": "string"
              },
              "optionone": {
                "type": "number"
              }
            }
          },
          "OptionTwoNoDisc": {
            "type": "object",
            "required": [
              "discrim"
            ],
            "properties": {
              "discrim": {
                "type": "string"
              },
              "optiontwo": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "local-link",
    "data": {
      "openapi": "3.0.0",
      "info": {
        "title": "Link Example",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": "http://local-link.com"
        }
      ],
      "paths": {
        "/2.0/users/{username}": {
          "get": {
            "operationId": "getUserByName",
            "security": [
              {
                "cookieAuth": []
              },
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "username",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "The User",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/user"
                    }
                  }
                },
                "links": {
                  "userRepositories": {
                    "$ref": "#/components/links/UserRepositories"
                  }
                }
              }
            }
          }
        },
        "/2.0/repositories/{username}": {
          "get": {
            "operationId": "getRepositoriesByOwner",
            "parameters": [
              {
                "name": "username",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "repositories owned by the supplied user",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/repository"
                      }
                    }
                  }
                },
                "links": {
                  "userRepository": {
                    "$ref": "#/components/links/UserRepository"
                  }
                }
              }
            }
          }
        },
        "/2.0/repositories/{username}/{slug}": {
          "get": {
            "operationId": "getRepository",
            "parameters": [
              {
                "name": "username",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "slug",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "The repository",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/repository"
                    }
                  }
                },
                "links": {
                  "repositoryPullRequests": {
                    "$ref": "#/components/links/RepositoryPullRequests"
                  }
                }
              }
            }
          }
        },
        "/2.0/repositories/{username}/{slug}/pullrequests": {
          "get": {
            "operationId": "getPullRequestsByRepository",
            "parameters": [
              {
                "name": "username",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "slug",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "state",
                "in": "query",
                "schema": {
                  "type": "string",
                  "enum": [
                    "open",
                    "merged",
                    "declined"
                  ]
                }
              },
              {
                "$ref": "#/components/parameters/host"
              }
            ],
            "responses": {
              "200": {
                "description": "an array of pull request objects",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/pullrequest"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/2.0/repositories/{username}/{slug}/pullrequests/{pid}": {
          "get": {
            "operationId": "getPullRequestsById",
            "parameters": [
              {
                "name": "username",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "slug",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "pid",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "a pull request object",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/pullrequest"
                    }
                  }
                },
                "links": {
                  "pullRequestMerge": {
                    "$ref": "#/components/links/PullRequestMerge"
                  }
                }
              }
            }
          }
        },
        "/2.0/repositories/{username}/{slug}/pullrequests/{pid}/merge": {
          "post": {
            "operationId": "mergePullRequest",
            "parameters": [
              {
                "name": "username",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "slug",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "pid",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "204": {
                "description": "the PR was successfully merged"
              }
            }
          }
        }
      },
      "components": {
        "links": {
          "UserRepositories": {
            "operationId": "getRepositoriesByOwner",
            "parameters": {
              "username": "$response.body#/username"
            }
          },
          "UserRepository": {
            "operationId": "getRepository",
            "parameters": {
              "username": "$response.body#/owner/username",
              "slug": "$response.body#/slug"
            }
          },
          "RepositoryPullRequests": {
            "operationId": "getPullRequestsByRepository",
            "parameters": {
              "username": "$response.body#/owner/username",
              "slug": "$response.body#/slug"
            }
          },
          "PullRequestMerge": {
            "operationId": "mergePullRequest",
            "parameters": {
              "username": "$response.body#/author/username",
              "slug": "$response.body#/repository/slug",
              "pid": "$response.body#/id"
            }
          }
        },
        "schemas": {
          "user": {
            "type": "object",
            "properties": {
              "username": {
                "type": "string"
              },
              "uuid": {
                "type": "string"
              }
            }
          },
          "repository": {
            "type": "object",
            "properties": {
              "slug": {
                "type": "string"
              },
              "owner": {
                "$ref": "#/components/schemas/user"
              }
            }
          },
          "pullrequest": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer"
              },
              "title": {
                "type": "string"
              },
              "repository": {
                "$ref": "#/components/schemas/repository"
              },
              "author": {
                "$ref": "#/components/schemas/user"
              }
            }
          }
        },
        "securitySchemes": {
          "apiKey": {
            "name": "X-API-KEY",
            "type": "apiKey",
            "in": "header"
          },
          "basicAuth": {
            "type": "http",
            "scheme": "basic"
          },
          "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
          },
          "cookieAuth": {
            "type": "apiKey",
            "in": "cookie",
            "name": "cookieSessionId"
          }
        },
        "parameters": {
          "host": {
            "in": "header",
            "name": "hostname",
            "schema": {
              "type": "string"
            }
          }
        }
      }
    }
  },
  {
    "id": "multiple-securities",
    "data": {
      "openapi": "3.0.0",
      "info": {
        "version": "1.0.0",
        "title": "Multiple Securities"
      },
      "servers": [
        {
          "url": "http://example.com"
        }
      ],
      "paths": {
        "/or-security": {
          "post": {
            "operationId": "orSecurity",
            "security": [
              {
                "oauthScheme": [
                  "write:things"
                ]
              },
              {
                "apiKeyScheme": []
              }
            ],
            "summary": "or security",
            "description": "",
            "parameters": [],
            "responses": {
              "405": {
                "description": "Invalid input"
              }
            }
          }
        },
        "/and-security": {
          "post": {
            "operationId": "andSecurity",
            "security": [
              {
                "oauthScheme": [
                  "write:things"
                ],
                "apiKeyScheme": []
              }
            ],
            "summary": "and security",
            "description": "",
            "parameters": [],
            "responses": {
              "405": {
                "description": "Invalid input"
              }
            }
          }
        },
        "/and-or-security": {
          "post": {
            "operationId": "andOrSecurity",
            "security": [
              {
                "oauthScheme": [
                  "write:things"
                ],
                "apiKeyScheme": []
              },
              {
                "oauthDiff": [
                  "write:things"
                ]
              }
            ],
            "summary": "and or security",
            "description": "",
            "parameters": [],
            "responses": {
              "405": {
                "description": "Invalid input"
              }
            }
          }
        },
        "/single-auth": {
          "post": {
            "operationId": "singleAuth",
            "security": [
              {
                "apiKeyScheme": []
              }
            ],
            "summary": "one security for endpoint",
            "description": "",
            "parameters": [],
            "responses": {
              "405": {
                "description": "Invalid input"
              }
            }
          }
        },
        "/no-auth": {
          "post": {
            "operationId": "noAuth",
            "summary": "no security needed",
            "description": "",
            "parameters": [],
            "responses": {
              "405": {
                "description": "Invalid input"
              }
            }
          }
        },
        "/multiple-oauths": {
          "post": {
            "operationId": "multipleOauths",
            "security": [
              {
                "oauthScheme": [
                  "write:things",
                  "read:things"
                ]
              },
              {
                "oauthDiff": [
                  "write:things",
                  "read:things"
                ]
              }
            ],
            "summary": "or security",
            "description": "",
            "parameters": [],
            "responses": {
              "405": {
                "description": "Invalid input"
              }
            }
          }
        },
        "/multiple-combo-auths": {
          "post": {
            "operationId": "unsupported scheme in the and",
            "security": [
              {
                "oauthScheme": [
                  "write:things",
                  "read:things"
                ],
                "unknownAuthType": []
              },
              {
                "oauthDiff": [
                  "write:things",
                  "read:things"
                ]
              },
              {
                "apiKeyScheme": []
              }
            ],
            "summary": "second and does not show security",
            "description": "",
            "parameters": [],
            "responses": {
              "405": {
                "description": "Invalid input"
              }
            }
          }
        },
        "/multiple-combo-auths-schemes": {
          "post": {
            "operationId": "nonexistent scheme in the or",
            "security": [
              {
                "oauthScheme": [
                  "write:things",
                  "read:things"
                ],
                "unknownAuthType": []
              },
              {
                "nonExistentScheme": []
              }
            ],
            "summary": "one or security",
            "description": "",
            "parameters": [],
            "responses": {
              "405": {
                "description": "Invalid input"
              }
            }
          }
        },
        "/multiple-combo-auths-duped": {
          "get": {
            "responses": {
              "200": {
                "description": "OK"
              },
              "400": {
                "description": "Bad Request"
              }
            },
            "security": [
              {
                "apiKeyScheme": [],
                "httpBearer": []
              },
              {
                "apiKeyScheme": [],
                "apiKeySignature": []
              }
            ]
          }
        },
        "/unknown-auth-type": {
          "post": {
            "operationId": "unknownAuthType",
            "security": [
              {
                "unknownAuthType": []
              }
            ],
            "summary": "unknown auth type",
            "description": "",
            "parameters": [],
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          }
        },
        "/unknown-scheme": {
          "post": {
            "operationId": "unknownScheme",
            "security": [
              {
                "nonExistentScheme": []
              }
            ],
            "summary": "this scheme doesnt exist",
            "description": "",
            "parameters": [],
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          }
        }
      },
      "components": {
        "securitySchemes": {
          "oauthScheme": {
            "type": "oauth2",
            "flows": {
              "implicit": {
                "authorizationUrl": "http://example.com/oauth/dialog",
                "scopes": {
                  "write:things": "Add things to your account"
                }
              }
            }
          },
          "oauthDiff": {
            "type": "oauth2",
            "flows": {
              "implicit": {
                "authorizationUrl": "http://example.com/oauth/dialog",
                "scopes": {
                  "write:things": "Add things to your account"
                }
              }
            }
          },
          "httpBearer": {
            "type": "http",
            "scheme": "bearer"
          },
          "apiKeyScheme": {
            "type": "apiKey",
            "name": "testKey",
            "in": "header"
          },
          "apiKeySignature": {
            "type": "apiKey",
            "name": "X-AUTH-SIGNATURE",
            "in": "header"
          },
          "basicAuth": {
            "type": "http",
            "scheme": "basic",
            "in": "header"
          },
          "unknownAuthType": {
            "type": "demigorgon",
            "name": "eleven",
            "in": "header"
          }
        },
        "responses": {},
        "parameters": {},
        "examples": {},
        "requestBodies": {},
        "headers": {}
      }
    }
  },
  {
    "id": "nested-allof-flattening",
    "data": {
      "openapi": "3.0.0",
      "info": {
        "version": "1.0.0",
        "title": "nested allOf flattening"
      },
      "servers": [
        {
          "url": "https://httpbin.org"
        }
      ],
      "paths": {
        "/": {
          "get": {
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/json;charset=UTF-8": {
                    "schema": {
                      "$ref": "#/components/schemas/extendedAttribute"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "extendedAttribute": {
            "type": "object",
            "required": [
              "value"
            ],
            "properties": {
              "createdOn": {
                "type": "string",
                "format": "date-time",
                "readOnly": true
              },
              "lastModifiedOn": {
                "type": "string",
                "format": "date-time",
                "readOnly": true
              },
              "application": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/link"
                  }
                ]
              },
              "value": {
                "type": "string"
              }
            }
          },
          "linkBase": {
            "type": "object",
            "required": [
              "href",
              "rel"
            ],
            "properties": {
              "href": {
                "type": "string"
              },
              "title": {
                "type": "string",
                "readOnly": true
              },
              "metadata": {
                "$ref": "#/components/schemas/metadata"
              }
            }
          },
          "link": {
            "type": "object",
            "allOf": [
              {
                "$ref": "#/components/schemas/linkBase"
              },
              {
                "type": "object",
                "properties": {
                  "source": {
                    "$ref": "#/components/schemas/linkBase"
                  }
                }
              }
            ]
          },
          "metadata": {
            "type": "object",
            "properties": {
              "createdOn": {
                "type": "string",
                "format": "date-time",
                "readOnly": true
              },
              "lastModifiedOn": {
                "type": "string",
                "format": "date-time",
                "readOnly": true
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "non-standard-components",
    "data": {
      "openapi": "3.0.0",
      "info": {
        "title": "Percolate V5 OpenAPI Specification",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org/anything"
        }
      ],
      "components": {
        "x-definitions": {
          "conditionCascadingValue": {
            "title": "CascadingValue",
            "additionalProperties": false,
            "properties": {
              "key": {
                "description": "The controlling field key.",
                "type": "string"
              },
              "where": {
                "description": "A list of cascading value rules.",
                "items": {
                  "title": "CascadingValueChild",
                  "additionalProperties": false,
                  "properties": {
                    "data": {
                      "description": "The value(s) of the controlling field.",
                      "type": "array"
                    },
                    "include": {
                      "description": "The cascading value(s) of the dependent field.",
                      "type": "array"
                    }
                  },
                  "required": [
                    "data",
                    "include"
                  ],
                  "type": "object",
                  "description": "Evaluate the child node for cascading value."
                },
                "type": "array"
              }
            },
            "required": [
              "key",
              "where"
            ],
            "type": "object",
            "description": "Evaluate the root node for cascading values."
          },
          "conditionFieldDependency": {
            "title": "Dependency",
            "oneOf": [
              {
                "additionalProperties": false,
                "properties": {
                  "args": {
                    "description": "A set of Aggregator or Resolver.",
                    "items": {
                      "$ref": "#/components/x-definitions/conditionFieldDependency"
                    },
                    "type": "array"
                  },
                  "operator": {
                    "description": "A function defined by https://lodash.com/docs evaluated recursively on the args.",
                    "enum": [
                      "every",
                      "some"
                    ],
                    "type": "string"
                  }
                },
                "required": [
                  "args",
                  "operator"
                ],
                "title": "Aggregator",
                "type": "object",
                "description": "Recursively evaluates the set of aggregators or resolvers using the operator."
              },
              {
                "additionalProperties": false,
                "properties": {
                  "args": {
                    "description": "The static arguments applied to the operator.",
                    "type": "array"
                  },
                  "key": {
                    "description": "The controlling field key.",
                    "type": "string"
                  },
                  "operator": {
                    "description": "A function defined by https://lodash.com/docs evaluated on the args.",
                    "enum": [
                      "includes",
                      "isEqual"
                    ],
                    "type": "string"
                  }
                },
                "required": [
                  "args",
                  "key",
                  "operator"
                ],
                "title": "Resolver",
                "type": "object",
                "description": "Evaluates the controlling field's value and the static args using the operator. When evaluating, the first argument of the operator call must be the dynamic value of the controlling field, e.g. `isEqual(controllingFieldValue, ...resolver.args)`."
              }
            ]
          }
        }
      },
      "paths": {
        "/api/v5/schema/": {
          "post": {
            "description": "Create a schema.",
            "operationId": "createSchema",
            "tags": [
              "Schema"
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "required": [
                      "ext",
                      "fields",
                      "name",
                      "scope_id",
                      "status",
                      "type"
                    ],
                    "example": {
                      "status": "active",
                      "ext": {
                        "channel_type": "facebook",
                        "platform_id": null
                      },
                      "scope_id": "license:1",
                      "name": "Custom form",
                      "plugins": [],
                      "fields": [
                        {
                          "description": null,
                          "required": true,
                          "label": "Your first and last name",
                          "ext": null,
                          "key": "name",
                          "type": "text",
                          "deprecated": false,
                          "read_only": true,
                          "hidden": false
                        }
                      ],
                      "type": "post"
                    },
                    "properties": {
                      "ext": {
                        "oneOf": [
                          {
                            "title": "campaign_section",
                            "description": "Extra properties for schemas of type `campaign_section`.",
                            "type": "object",
                            "example": {
                              "campaign_section_types": [
                                "brief",
                                "workspace"
                              ]
                            },
                            "additionalProperties": false,
                            "required": [
                              "campaign_section_types"
                            ],
                            "properties": {
                              "campaign_section_types": {
                                "description": "Which campaign section type this schema applies to",
                                "type": "array",
                                "minItems": 1,
                                "uniqueItems": true,
                                "items": {
                                  "type": "string",
                                  "enum": [
                                    "brief",
                                    "workspace"
                                  ]
                                }
                              }
                            }
                          },
                          {
                            "title": "post/targeting",
                            "description": "Extra properties for schemas of type `post`, `targeting`, `post_attachment`",
                            "type": "object",
                            "example": {
                              "platform_id": "platform:1",
                              "channel_type": "custom"
                            },
                            "additionalProperties": false,
                            "required": [
                              "platform_id",
                              "channel_type"
                            ],
                            "properties": {
                              "platform_id": {
                                "type": "string",
                                "description": "Which platform ID this schema applies to.",
                                "pattern": "^platform:\\d+$",
                                "nullable": true
                              },
                              "channel_type": {
                                "description": "Which channel type this schema applies to.",
                                "type": "string"
                              }
                            }
                          },
                          {
                            "title": "intake_request",
                            "description": "Extra properties for schemas of type `intake_request`.",
                            "type": "object",
                            "example": {
                              "assignee_id_default": "user:1",
                              "due_at_required_default": false,
                              "source_campaign_id_default": "campaign:1"
                            },
                            "additionalProperties": false,
                            "required": [
                              "assignee_id_default",
                              "due_at_required_default",
                              "source_campaign_id_default"
                            ],
                            "properties": {
                              "assignee_id_default": {
                                "title": "user_id",
                                "type": "string",
                                "description": "Default assignee ID for this schema.",
                                "pattern": "^user:\\d+$",
                                "nullable": true
                              },
                              "due_at_required_default": {
                                "type": "boolean",
                                "description": "Default due date for this schema.",
                                "nullable": true
                              },
                              "source_campaign_id_default": {
                                "title": "campaign_id",
                                "type": "string",
                                "pattern": "^campaign:\\d+$",
                                "example": "campaign:1",
                                "description": "Default campaign ID for this schema.",
                                "nullable": true
                              }
                            }
                          },
                          {
                            "title": "empty",
                            "description": "`metadata` has no extra properties",
                            "example": {},
                            "type": "object",
                            "additionalProperties": false,
                            "properties": {}
                          }
                        ],
                        "nullable": true
                      },
                      "fields": {
                        "description": "An ordered list of fields",
                        "type": "array",
                        "items": {
                          "title": "Schema Field",
                          "description": "A field is used to describe the type of input and data a user can enter.\nFields can be different types based on `type` attribute. Certain fields have additional configuration defined in `ext`. The field type also determines the type of data stored under the value of `key`.\nGiven this field definition: ```\n  {\n    \"key\": \"email\",\n    \"label\": \"Email address\",\n    \"description\": \"Your work email address\",\n    \"required\": true,\n    \"type\": \"email\",\n    \"ext\": null,\n  }\n```\nThe following output is produced when a user enters \"example@percolate.com\" into the field:\n```\n  {\n    \"email\": \"example@percolate.com\"\n  }\n```\n| type | description | stored value example | | --- | --- | --- | | `asset` | An assets field | `[\"asset:1\"]` | | `currency` | A currency field | `{ \"currency\": \"USD\", \"amount\": \"20.0000\" }` | | `date-range` | A date range field | `{ \"from\": \"2014-12-25\", \"to\": \"2014-12-31\" }` | | `date` | A date field | `\"2014-04-30T20:32:18+00:00\"` | | `email` | An email field | `\"example@percolate.com\"` | | `hidden` | A field for data passing, that should not be shown in UI | `\"string data\"` | | `html` | An html field | `\"<b>hello world</b>\"` | | `link` | A links field | `[\"link:1\"]` | | `multi-select` | A multi-select field (ex. checkbox, multi dropdown) | `[\"checkbox 1\", \"checkbox 2\"]` | | `number` | A number field | `9`, `100.25`, `0.091231` | | `object-array` | A field that stores array of objects | `[{ body: \"hello\\nworld\", age: 18 }, { body: \"hi\\nthere\", age: 21 }]` | | `post_attachment` | A [post attachment](#post_attachment) field | `[\"post_attachment:1\"]` | | `select` | A select field (ex. radio, single dropdown) | `\"radio_1\"` | | `string-array` | A list of strings. Values are represented as lists, not comma-separated strings. `,` and carriage return will automatically add a new value.  | `[\"hello\", \"24\", \"I'm another thing\"]` | | `term` | A terms field | `[\"term:XTN123\", \"term:XTN456\"]` | | `text` | A single line text field | `\"hello world\"` | | `textarea` | A multi-line text field | `\"hello\\nworld\"` | | `user` | A list of user IDs | `[\"user:123\", \"user:1234\"]` |",
                          "type": "object",
                          "required": [
                            "key",
                            "label",
                            "required",
                            "type"
                          ],
                          "additionalProperties": false,
                          "properties": {
                            "key": {
                              "description": "The key used to store what the user entered It must be only one word, e.g. space and dash are not allowed",
                              "type": "string"
                            },
                            "label": {
                              "description": "The label identifying the field",
                              "type": "string"
                            },
                            "description": {
                              "description": "A description about the field when `label` isn't enough",
                              "type": "string",
                              "nullable": true
                            },
                            "required": {
                              "description": "Whether this field is required or not",
                              "type": "boolean"
                            },
                            "type": {
                              "description": "The field type",
                              "type": "string",
                              "enum": [
                                "asset",
                                "currency",
                                "date",
                                "date-range",
                                "email",
                                "hidden",
                                "html",
                                "link",
                                "multi-select",
                                "number",
                                "object-array",
                                "post_attachment",
                                "select",
                                "string-array",
                                "term",
                                "text",
                                "textarea",
                                "user"
                              ]
                            },
                            "deprecated": {
                              "type": "boolean",
                              "default": false
                            },
                            "read_only": {
                              "description": "Whether this field is read-only and the form value cannot be changed",
                              "type": "boolean",
                              "default": false
                            },
                            "hidden": {
                              "description": "Whether this field is hidden and should not be rendered on the form",
                              "type": "boolean",
                              "default": false
                            },
                            "ext": {
                              "oneOf": [
                                {
                                  "title": "date",
                                  "description": "`date` field configuration",
                                  "type": "object",
                                  "example": {
                                    "include_time": true
                                  },
                                  "additionalProperties": false,
                                  "required": [
                                    "include_time"
                                  ],
                                  "properties": {
                                    "include_time": {
                                      "description": "Adds a time field which must be converted to UTC before being sent to the server",
                                      "type": "boolean"
                                    }
                                  }
                                },
                                {
                                  "title": "empty",
                                  "description": "`currency`, `date-range`, `email`, `html`, `number` have no configuration",
                                  "example": {},
                                  "type": "object",
                                  "additionalProperties": false,
                                  "properties": {}
                                },
                                {
                                  "title": "asset/link/user",
                                  "description": "`asset`, `link`, `user` field configuration",
                                  "additionalProperties": false,
                                  "type": "object",
                                  "example": {
                                    "limit": 1
                                  },
                                  "required": [
                                    "limit"
                                  ],
                                  "properties": {
                                    "limit": {
                                      "description": "The maximum number of items a user can add",
                                      "type": "integer"
                                    }
                                  }
                                },
                                {
                                  "title": "select/multi-select",
                                  "description": "`select`, `multi-select` field configuration.",
                                  "additionalProperties": false,
                                  "type": "object",
                                  "example": {
                                    "values": [
                                      {
                                        "key": "J3acbe",
                                        "label": "Percolate",
                                        "value": "percolate:1"
                                      }
                                    ]
                                  },
                                  "required": [
                                    "values"
                                  ],
                                  "properties": {
                                    "values": {
                                      "description": "An array of objects describing the list of possible values. Can only be `[]` if an autocomplete plugin is applied.",
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "required": [
                                          "label",
                                          "value"
                                        ],
                                        "additionalProperties": false,
                                        "properties": {
                                          "key": {
                                            "description": "This key helps the server determine whether this value was renamed or deleted during PUT.",
                                            "type": "string"
                                          },
                                          "label": {
                                            "description": "The label describing the value (what the user sees).",
                                            "oneOf": [
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "number"
                                              }
                                            ]
                                          },
                                          "value": {
                                            "description": "The value that will be stored with the field.",
                                            "oneOf": [
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "number"
                                              },
                                              {
                                                "type": "boolean"
                                              },
                                              {
                                                "type": "array"
                                              }
                                            ],
                                            "items": {
                                              "oneOf": [
                                                {
                                                  "type": "string"
                                                },
                                                {
                                                  "type": "number"
                                                },
                                                {
                                                  "type": "boolean"
                                                }
                                              ]
                                            }
                                          },
                                          "deprecated": {
                                            "type": "boolean",
                                            "default": false
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                {
                                  "title": "term",
                                  "description": "`term` field configuration",
                                  "type": "object",
                                  "example": {
                                    "limit": 1,
                                    "parent_term_ids": [
                                      "term:XTN123"
                                    ],
                                    "placeholder": "http://"
                                  },
                                  "additionalProperties": false,
                                  "required": [
                                    "limit",
                                    "parent_term_ids",
                                    "placeholder"
                                  ],
                                  "properties": {
                                    "limit": {
                                      "description": "The maximum number of terms allowed",
                                      "type": "integer",
                                      "nullable": true
                                    },
                                    "parent_term_ids": {
                                      "description": "Limit the tree(s) of terms to choose from.\nIf empty, any terms can be applied",
                                      "items": {
                                        "type": "string",
                                        "description": "The unique term ID.",
                                        "pattern": "^term:[a-zA-Z\\d]+$"
                                      },
                                      "type": "array"
                                    },
                                    "placeholder": {
                                      "description": "A short hint that describes the expected value",
                                      "example": "http://",
                                      "type": "string",
                                      "nullable": true
                                    }
                                  }
                                },
                                {
                                  "title": "text/textarea",
                                  "description": "`text`, `textarea` field configuration",
                                  "additionalProperties": false,
                                  "type": "object",
                                  "example": {
                                    "max_length": 140,
                                    "placeholder": null
                                  },
                                  "required": [
                                    "max_length"
                                  ],
                                  "properties": {
                                    "max_length": {
                                      "description": "The maximum number of characters allowed",
                                      "type": "integer",
                                      "nullable": true
                                    },
                                    "placeholder": {
                                      "description": "A short hint that describes the expected value",
                                      "example": "http://",
                                      "type": "string",
                                      "nullable": true
                                    }
                                  }
                                },
                                {
                                  "title": "object-array",
                                  "description": "`object-array` field configuration",
                                  "type": "object",
                                  "additionalProperties": false,
                                  "required": [
                                    "limit",
                                    "minimum",
                                    "sub_schema"
                                  ],
                                  "properties": {
                                    "limit": {
                                      "description": "The maximum allowed fields",
                                      "type": "integer"
                                    },
                                    "minimum": {
                                      "description": "The minimum allowed fields",
                                      "type": "integer"
                                    },
                                    "sub_schema": {
                                      "type": "object",
                                      "properties": {
                                        "fields": {
                                          "description": "This follows the same fields array at the root of the schema with the exception that fields of type `object-array` cannot be nested.",
                                          "type": "array",
                                          "items": {
                                            "type": "object"
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              ],
                              "nullable": true
                            }
                          }
                        }
                      },
                      "fieldsets": {
                        "description": "An ordered array of fieldset objects",
                        "type": "array",
                        "items": {
                          "required": [
                            "legend",
                            "field_keys"
                          ],
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "legend": {
                              "description": "The legend or title for the grouping",
                              "type": "string"
                            },
                            "summary": {
                              "description": "A summary about the fields in the fieldset",
                              "type": "string",
                              "nullable": true
                            },
                            "field_keys": {
                              "description": "An ordered list of field keys displayed inside the fieldset. The keys must match the `key` value in the `fields` array.",
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          }
                        }
                      },
                      "plugins": {
                        "description": "A list of plugins",
                        "type": "array",
                        "items": {
                          "description": "Plugins can be applied to fields to enhance their functionality.\nPlugins can be different types based on `type` attribute. Certain plugins have addition configuration defined in `ext`.\n### autocomplete\nAdds autocomplete to fields of type `select` and `multi-select`. A server search on the `autocomplete` endpoint is triggered with `search_url`\n### mentions\nAdds hyper-linking to fields of type `textarea`. A server search on the `autocomplete` endpoint is intialized with `search_url` when the regular expression of `search_trigger` is met. The user can then enhance parts of the text with values returned from the server. Multiple mentions can be applied to the same field and get stored on the `key` with the following JSON-Schema:\n```yaml type: array items:\n  type: object\n  required:\n    - value\n    - offset\n    - length\n  additionalProperties: false\n  properties:\n    value:\n      description: The external ID of this mention.\n      type: string\n    offset:\n      description: 0-based offset where this mention begins\n      type: integer\n    length:\n      description: Number of characters\n      type: integer\n```\nExample plugin data:\n```json {\n    \"message\": \"I like Disney and Disney/Pixar\",\n    \"mentions\": [\n        {\"value\": \"11784025953\", \"offset\": 7, \"length\": 6},\n        {\"value\": \"108014809233498\", \"offset\": 18, \"length\": 12}\n    ]\n} ```\n### inline-links\nAdds URL metadata to fields of type `textarea`. The plugin enables identifying which parts of the text represent URLs (using `offset` and `length`, like the mentions plugin) and provides optional related information for each URL. Multiple links can be applied to the same textarea and get stored on the `key` as objects with the following JSON-Schema. (Note that the `short_url` and `tracking_url` attributes are read-only):\n```yaml type: array items:\n  type: object\n  required:\n    - url\n    - offset\n    - length\n  additionalProperties: false\n  properties:\n    url:\n      description: The original URL found in the textarea.\n      type: string\n    offset:\n      description: 0-based offset where this link begins\n      type: integer\n    length:\n      description: Number of characters in the original url (not short or tracking)\n      type: integer\n    shorten:\n      description: A boolean indicating whether the url should be shortened\n      type: boolean\n    track:\n      description: A boolean indicating whether the url should be tracked\n      type: boolean\n    short_url:\n      description: A bitly-shortened version of the URL. Can be empty if shortening is disabled. This value is read-only.\n      type: string\n    tracking_tag_ids:\n      description: The tracking tag IDs to apply to the link before shortening. Same as in the `tracking_tags` plugin. Can be empty array.\n      type: array\n      items:\n        type: string\n        pattern: ^tracking_tag:\\d+$\n    tracking_url:\n      description: The long URL that was used for shortening. Can be empty if shortening is disabled. This is the original URL with additional query parameters: automatic tracking tags (if configured) and a unique random __prclt parameter. This attribute is read-only.\n      type: string\n```\nExample plugin data:\n```json {\n    \"message\": \"Check out http://example.com and https://isitchristmas.com/\",\n    \"links\": [\n      {\n        \"url\": \"http://example.com\",\n        \"tracking_tag_ids\": [\"tracking_tag:1\", \"tracking_tag:2\"],\n        \"tracking_url\": \"http://example.com?__prclt=123&__utm_foo=bar&__utm_xyz=pdq\",\n        \"short_url\": \"http://bit.ly/28TtifN\",\n        \"length\": 18,\n        \"offset\": 10,\n        \"shorten\": true,\n        \"track\": true\n      },\n      {\n        \"url\": \"https://isitchristmas.com\",\n        \"tracking_tag_ids\": [],\n        \"tracking_url\": \"\",\n        \"short_url\": \"\",\n        \"length\": 25,\n        \"offset\": 33,\n        \"shorten\": true,\n        \"track\": true\n      }\n    ]\n} ```\n### timezone\nAdds timezone support to fields of type `date`. Since all times are converted to UTC, displaying the date varies based on the device's current timezone. By storing the timezone, we can display the date in its original/intended form. The selected timezone will be stored under the `key` value.\n### tracking_tags\nAdd tracking tags to fields of type `link` Selected tracking tags are stored on the `key` with the following JSON-Schema:\n```yaml type: array items:\n  type: object\n  required:\n    - link_id\n    - tracking_tag_ids\n  additionalProperties: false\n  properties:\n    link_id:\n      description: >\n        The link ID to attach the tracking tags to.\n\n        Important: The link ID must exist in associated array of link IDs defined by the `field_key`.\n      type: string\n      pattern: ^link:\\d+$\n    tracking_tag_ids:\n      description: The tracking tag IDs associated with the link\n      type: array\n      items:\n        type: string\n        pattern: ^tracking_tag:\\d+$\n```\nExample:\n```json [\n    {\n        \"link_id\": \"link:1\",\n        \"tracking_tag_ids\": [\"tracking_tag:1\", \"tracking_tag:2\"]\n    }\n] ```",
                          "type": "object",
                          "required": [
                            "field_key",
                            "type",
                            "ext"
                          ],
                          "additionalProperties": false,
                          "properties": {
                            "field_key": {
                              "description": "The field this plugin is applied to",
                              "type": "string"
                            },
                            "key": {
                              "description": "The key used to store plugin information. Can be `null` for plugins that don't need to store data.",
                              "type": "string",
                              "nullable": true
                            },
                            "type": {
                              "description": "The plugin type",
                              "type": "string",
                              "enum": [
                                "autocomplete",
                                "inline-links",
                                "mentions",
                                "timezone",
                                "tracking_tags"
                              ]
                            },
                            "ext": {
                              "oneOf": [
                                {
                                  "title": "autocomplete",
                                  "description": "`autocomplete` plugin configuration",
                                  "type": "object",
                                  "example": {
                                    "search_url": "https://example.com/search"
                                  },
                                  "additionalProperties": false,
                                  "required": [
                                    "search_url"
                                  ],
                                  "properties": {
                                    "search_url": {
                                      "description": "The search URL for `/v5/autocomplete/?search_url=`",
                                      "format": "uri",
                                      "type": "string"
                                    }
                                  }
                                },
                                {
                                  "title": "mentions",
                                  "description": "`mentions` plugin configuration",
                                  "type": "object",
                                  "example": {
                                    "search_url": "https://example.com/search",
                                    "search_trigger": "/@/"
                                  },
                                  "additionalProperties": false,
                                  "required": [
                                    "search_url",
                                    "search_trigger"
                                  ],
                                  "properties": {
                                    "search_url": {
                                      "description": "The search URL for `/v5/autocomplete/?search_url=`",
                                      "format": "uri",
                                      "type": "string"
                                    },
                                    "search_trigger": {
                                      "description": "The regex pattern typed in a textarea that will trigger a search",
                                      "type": "string"
                                    }
                                  }
                                },
                                {
                                  "title": "timezone",
                                  "description": "`timezone` plugin configuration",
                                  "type": "object",
                                  "example": {
                                    "timezones": []
                                  },
                                  "required": [
                                    "timezones"
                                  ],
                                  "additionalProperties": false,
                                  "properties": {
                                    "timezones": {
                                      "description": "Restricts the list of timezones a user can select. If empty, the form will use the device's current timezone.",
                                      "type": "array",
                                      "items": {
                                        "title": "timezone",
                                        "description": "A timezone name from the [tz database](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Timezone abbreviations (eg. EST) are *not* supported.",
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                {
                                  "title": "empty",
                                  "description": "`tracking_tags` and `inline-links` plugins have no configuration",
                                  "example": {},
                                  "type": "object",
                                  "additionalProperties": false,
                                  "properties": {}
                                }
                              ]
                            }
                          }
                        }
                      },
                      "name": {
                        "description": "A name identifying the schema",
                        "type": "string"
                      },
                      "scope_id": {
                        "oneOf": [
                          {
                            "title": "license_scope_id",
                            "description": "A valid license ID `^license:\\d+$`.",
                            "type": "string",
                            "pattern": "^license:\\d+$",
                            "example": "license:1"
                          }
                        ]
                      },
                      "type": {
                        "description": "Schema type.",
                        "enum": [
                          "campaign_section",
                          "campaign_template",
                          "intake_request",
                          "integrated_campaign_template",
                          "metadata",
                          "post",
                          "post_attachment",
                          "targeting"
                        ],
                        "type": "string"
                      },
                      "limit_resource_types": {
                        "description": "Ability to assign a schema to a specific resource type. Certain schema types must can only be applied to one resource type (ex. `post`). Others (ex. `metadata`), can be applied to multiple resource types.",
                        "type": "array",
                        "items": {
                          "type": "string",
                          "enum": [
                            "asset",
                            "campaign",
                            "campaign_section",
                            "campaign_template",
                            "channel",
                            "intake_request",
                            "post",
                            "post_attachment",
                            "targeting",
                            "task"
                          ]
                        }
                      },
                      "slug": {
                        "description": "A permanent unique human-readable identifier for the schema",
                        "type": "string",
                        "nullable": true
                      },
                      "status": {
                        "description": "Whether this schema can be used to create other resources.",
                        "enum": [
                          "active",
                          "inactive",
                          "deleted"
                        ],
                        "type": "string"
                      },
                      "conditions": {
                        "items": {
                          "oneOf": [
                            {
                              "type": "object",
                              "title": "FieldDependency",
                              "additionalProperties": false,
                              "required": [
                                "depends_on",
                                "key"
                              ],
                              "properties": {
                                "depends_on": {
                                  "$ref": "#/components/x-definitions/conditionFieldDependency"
                                },
                                "key": {
                                  "description": "dependent field key",
                                  "type": "string"
                                }
                              }
                            },
                            {
                              "type": "object",
                              "title": "CascadingValue",
                              "additionalProperties": false,
                              "required": [
                                "values_depend_on",
                                "key"
                              ],
                              "properties": {
                                "values_depend_on": {
                                  "$ref": "#/components/x-definitions/conditionCascadingValue"
                                },
                                "key": {
                                  "description": "dependent field key",
                                  "type": "string"
                                }
                              }
                            }
                          ]
                        },
                        "title": "Conditions",
                        "description": "A set of conditions that define field dependencies or cascading values for the schema.",
                        "type": "array"
                      },
                      "platform_ids": {
                        "items": {
                          "type": "string",
                          "description": "The unique platform ID.",
                          "pattern": "^platform:\\d+$"
                        },
                        "type": "array",
                        "description": "An array of platform IDs the schema applies to. Send `null` if the schema applies to all platforms.",
                        "nullable": true
                      }
                    }
                  },
                  "examples": {
                    "request": {
                      "value": {
                        "status": "active",
                        "ext": {
                          "channel_type": "facebook",
                          "platform_id": null
                        },
                        "scope_id": "license:1",
                        "name": "Custom form",
                        "plugins": [],
                        "fields": [
                          {
                            "description": null,
                            "required": true,
                            "label": "Your first and last name",
                            "ext": null,
                            "key": "name",
                            "type": "text",
                            "deprecated": false,
                            "read_only": true,
                            "hidden": false
                          }
                        ],
                        "type": "post"
                      }
                    }
                  }
                }
              },
              "required": false
            },
            "responses": {
              "201": {
                "description": "A new schema was created."
              },
              "400": {
                "description": "Bad request"
              },
              "401": {
                "description": "Unauthorized"
              },
              "403": {
                "description": "Invalid authorization or resource not found"
              },
              "405": {
                "description": "Method not allowed"
              },
              "409": {
                "description": "Conflict"
              },
              "429": {
                "description": "Rate limit. Response should contain a `Retry-After` header"
              }
            }
          }
        }
      },
      "x-readme": {
        "explorer-enabled": true,
        "proxy-enabled": true,
        "samples-enabled": true
      }
    }
  },
  {
    "id": "operation-examples",
    "data": {
      "openapi": "3.0.0",
      "servers": [
        {
          "url": "https://httpbin.org/"
        }
      ],
      "info": {
        "title": "Operations with and without examples",
        "version": "1.0"
      },
      "paths": {
        "/examples-at-mediaType-level": {
          "post": {
            "description": "This operation has no requestBody or response schemas, but has curated examples within `examples` at the mediaType level.",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "examples": {
                    "userRegistration": {
                      "value": {
                        "user": {
                          "id": 12343354,
                          "email": "test@example.com",
                          "name": "Test user name"
                        }
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "examples": {
                      "response": {
                        "value": {
                          "user": {
                            "email": "test@example.com",
                            "name": "Test user name"
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Validation failed",
                "content": {
                  "application/xml": {
                    "examples": {
                      "response": {
                        "value": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>"
                      }
                    }
                  }
                }
              },
              "default": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "examples": {
                      "response": {
                        "value": {
                          "user": {
                            "id": 12343354,
                            "email": "test@example.com",
                            "name": "Test user name"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "callbacks": {
              "myCallback": {
                "{$request.query.queryUrl}": {
                  "post": {
                    "responses": {
                      "200": {
                        "description": "OK",
                        "content": {
                          "application/json": {
                            "examples": {
                              "response": {
                                "value": {
                                  "user": {
                                    "email": "test@example.com",
                                    "name": "Test user name"
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "400": {
                        "description": "Validation failed",
                        "content": {
                          "application/xml": {
                            "examples": {
                              "response": {
                                "value": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>"
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
        "/single-media-type-single-example-in-example-prop": {
          "post": {
            "description": "This operation handles a single media type a single request and response example.",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "example": {
                    "id": 12343354,
                    "email": "test@example.com",
                    "name": "Test user name"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "example": {
                      "id": 12343354,
                      "email": "test@example.com",
                      "name": "Test user name"
                    }
                  }
                }
              }
            }
          }
        },
        "/single-media-type-single-example-in-example-prop-with-ref": {
          "post": {
            "description": "This operation handles a single media type with a single request and response example.",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "example": {
                    "$ref": "#/components/examples/user"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "example": {
                      "$ref": "#/components/examples/user"
                    }
                  }
                }
              }
            }
          }
        },
        "/single-media-type-single-example-in-example-prop-thats-a-string": {
          "post": {
            "description": "This operation handles a single media type with single request and response example that's a string.",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "example": "column1,column2,column3,column4"
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "example": "column1,column2,column3,column4"
                  }
                }
              }
            }
          }
        },
        "/single-media-type-single-example-in-examples-prop-that-are-strings": {
          "post": {
            "description": "This operation handles a single media type with single example in an `examples` property that's a string.",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "examples": {
                    "cat": {
                      "summary": "An example of a cat",
                      "value": "{\n  \"name\": \"Fluffy\",\n  \"petType\": \"Cat\"\n}"
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "examples": {
                      "cat": {
                        "summary": "An example of a cat",
                        "value": "{\n  \"name\": \"Fluffy\",\n  \"petType\": \"Cat\"\n}"
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Validation failed",
                "content": {
                  "application/xml": {
                    "examples": {
                      "response": {
                        "value": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/single-media-type-single-example-in-examples-prop-that-are-arrays": {
          "post": {
            "description": "This operation handles a single media type with single example in an `examples` property that are arrays.",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "examples": {
                    "cat": {
                      "summary": "An example of a cat",
                      "value": "[\n  {\n    \"name\": \"Fluffy\",\n    \"petType\": \"Cat\"\n  }\n]"
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "examples": {
                      "cat": {
                        "summary": "An example of a cat",
                        "value": "[\n  {\n    \"name\": \"Fluffy\",\n    \"petType\": \"Cat\"\n  }\n]"
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Validation failed",
                "content": {
                  "application/xml": {
                    "examples": {
                      "response": {
                        "value": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/multi-media-types-multiple-examples": {
          "post": {
            "description": "This operation handles multiple media types with multiple examples.",
            "requestBody": {
              "required": true,
              "content": {
                "text/plain": {
                  "examples": {
                    "response": {
                      "value": "OK"
                    }
                  }
                },
                "application/json": {
                  "examples": {
                    "cat": {
                      "summary": "An example of a cat",
                      "value": {
                        "name": "Fluffy",
                        "petType": "Cat"
                      }
                    },
                    "dog": {
                      "summary": "An example of a dog with a cat's name",
                      "value": {
                        "name": "Puma",
                        "petType": "Dog"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "text/plain": {
                    "examples": {
                      "response": {
                        "value": "OK"
                      }
                    }
                  },
                  "application/json": {
                    "examples": {
                      "cat": {
                        "summary": "An example of a cat",
                        "value": {
                          "name": "Fluffy",
                          "petType": "Cat"
                        }
                      },
                      "dog": {
                        "summary": "An example of a dog with a cat's name",
                        "value": {
                          "name": "Puma",
                          "petType": "Dog"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Validation failed",
                "content": {
                  "application/xml": {
                    "examples": {
                      "response": {
                        "value": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>"
                      }
                    }
                  }
                }
              }
            },
            "callbacks": {
              "myCallback": {
                "{$request.query.queryUrl}": {
                  "post": {
                    "responses": {
                      "200": {
                        "description": "OK",
                        "content": {
                          "text/plain": {
                            "examples": {
                              "response": {
                                "value": "OK"
                              }
                            }
                          },
                          "application/json": {
                            "examples": {
                              "cat": {
                                "summary": "An example of a cat",
                                "value": {
                                  "name": "Fluffy",
                                  "petType": "Cat"
                                }
                              },
                              "dog": {
                                "summary": "An example of a dog with a cat's name",
                                "value": {
                                  "name": "Puma",
                                  "petType": "Dog"
                                }
                              }
                            }
                          }
                        }
                      },
                      "400": {
                        "description": "Validation failed",
                        "content": {
                          "application/xml": {
                            "examples": {
                              "response": {
                                "value": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>"
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
        "/emptyexample": {
          "post": {
            "description": "This operation handles has no schemas, but empty `examples`.",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "examples": {}
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "examples": {}
                  }
                }
              },
              "204": {
                "description": "No content"
              }
            },
            "callbacks": {
              "myCallback": {
                "{$request.query.queryUrl}": {
                  "post": {
                    "responses": {
                      "200": {
                        "description": "OK",
                        "content": {
                          "application/json": {
                            "examples": {}
                          }
                        }
                      },
                      "204": {
                        "description": "No content"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/emptyexample-with-schema": {
          "post": {
            "description": "This operation handles has no schemas, but empty `examples`.",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/tag"
                  },
                  "examples": {}
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/tag"
                      }
                    },
                    "examples": {}
                  }
                }
              }
            },
            "callbacks": {
              "myCallback": {
                "{$request.query.queryUrl}": {
                  "post": {
                    "responses": {
                      "200": {
                        "description": "OK",
                        "content": {
                          "application/json": {
                            "schema": {
                              "type": "array",
                              "items": {
                                "$ref": "#/components/schemas/tag"
                              }
                            },
                            "examples": {}
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
        "/nothing": {
          "get": {
            "description": "This operation has neither a requestBody or response schema, but also no examples for either.",
            "responses": {},
            "callbacks": {}
          }
        },
        "/no-response-schemas": {
          "get": {
            "description": "This operation has neither a requestBody or response schema, but also no examples for either.",
            "responses": {
              "200": {
                "description": "OK"
              }
            },
            "callbacks": {
              "myCallback": {
                "{$request.query.queryUrl}": {
                  "post": {
                    "responses": {
                      "200": {
                        "description": "OK"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/ref-examples": {
          "post": {
            "description": "This operation has examples stored in a `$ref`.",
            "requestBody": {
              "required": true,
              "content": {
                "text/plain": {
                  "schema": {
                    "type": "string"
                  }
                },
                "application/json": {
                  "examples": {
                    "user": {
                      "$ref": "#/components/schemas/user"
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "examples": {
                      "response": {
                        "value": {
                          "user": {
                            "email": "test@example.com",
                            "name": "Test user name"
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "$ref": "#/components/responses/400-Response-Ref"
              },
              "default": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "examples": {
                      "response": {
                        "value": {
                          "user": {
                            "id": 12343354,
                            "email": "test@example.com",
                            "name": "Test user name"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "callbacks": {
              "myCallback": {
                "{$request.query.queryUrl}": {
                  "post": {
                    "responses": {
                      "200": {
                        "description": "OK",
                        "content": {
                          "application/json": {
                            "examples": {
                              "response": {
                                "value": {
                                  "user": {
                                    "email": "test@example.com",
                                    "name": "Test user name"
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "400": {
                        "$ref": "#/components/responses/400-Response-Ref"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/wildcard-media-type": {
          "post": {
            "description": "This operation handles a single media type that returns a wildcard `*/*`.",
            "requestBody": {
              "required": true,
              "content": {
                "*/*": {
                  "example": {
                    "id": 12343354,
                    "email": "test@example.com",
                    "name": "Test user name"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "*/*": {
                    "example": {
                      "id": 12343354,
                      "email": "test@example.com",
                      "name": "Test user name"
                    }
                  }
                }
              }
            }
          }
        },
        "/headers-but-no-content": {
          "post": {
            "description": "This operation has response headers but no response content or media types",
            "requestBody": {
              "content": {
                "*/*": {
                  "example": {
                    "id": 12343354,
                    "email": "test@example.com",
                    "name": "Test user name"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "headers": {
                  "Location": {
                    "description": "A response header",
                    "style": "simple",
                    "schema": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        },
        "/similarly-named-type-example": {
          "post": {
            "description": "This schema has two `type` properties, each with their own example. They should retain those separate examples.",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string"
                      },
                      "buyer": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "type": "string"
                          },
                          "type": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "type": "payment",
                    "buyer": {
                      "name": "Buster",
                      "type": "pug"
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          }
        }
      },
      "components": {
        "examples": {
          "user": {
            "value": {
              "id": 12343354,
              "email": "test@example.com",
              "name": "Test user name"
            }
          }
        },
        "responses": {
          "400-Response-Ref": {
            "description": "Validation failed",
            "content": {
              "application/xml": {
                "examples": {
                  "response": {
                    "value": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>"
                  }
                }
              }
            }
          }
        },
        "schemas": {
          "tag": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "name": {
                "type": "string"
              }
            }
          },
          "user": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "email": {
                "type": "string"
              },
              "name": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "ordered-tags",
    "data": {
      "openapi": "3.0.0",
      "info": {
        "description": "This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.",
        "version": "1.0.0",
        "title": "Swagger Petstore"
      },
      "tags": [
        {
          "name": "user",
          "description": "Operations about user",
          "externalDocs": {
            "description": "Find out more about our store",
            "url": "http://swagger.io"
          }
        },
        {
          "name": "store",
          "description": "Access to Petstore orders"
        },
        {
          "name": "pet",
          "description": "Everything about your Pets",
          "externalDocs": {
            "description": "Find out more",
            "url": "http://swagger.io"
          }
        }
      ],
      "paths": {
        "/pet": {
          "post": {
            "tags": [
              "pet"
            ],
            "summary": "Add a new pet to the store",
            "description": "",
            "operationId": "addPet",
            "responses": {
              "405": {
                "description": "Invalid input"
              }
            }
          },
          "put": {
            "tags": [
              "endpoint"
            ],
            "summary": "Update an existing pet",
            "description": "",
            "operationId": "updatePet",
            "responses": {
              "400": {
                "description": "Invalid ID supplied"
              }
            }
          }
        },
        "/pet/findByStatus": {
          "get": {
            "tags": [
              "store"
            ],
            "summary": "Finds Pets by status",
            "description": "Multiple status values can be provided with comma separated strings",
            "operationId": "findPetsByStatus",
            "responses": {
              "200": {
                "description": "successful operation"
              }
            }
          }
        },
        "/pet/findByTags": {
          "get": {
            "tags": [
              "user"
            ],
            "summary": "Finds Pets by tags",
            "description": "Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.",
            "operationId": "findPetsByTags",
            "responses": {
              "200": {
                "description": "successful operation"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "path-matching-quirks",
    "data": {
      "openapi": "3.1.0",
      "info": {
        "title": "Path Matching Quirks",
        "description": "Example API definition to cover some quirks with path matching where a query param in a path might break `Oas.findOperation()`",
        "version": "1.0"
      },
      "servers": [
        {
          "url": "https://api.example.com/v2"
        }
      ],
      "paths": {
        "/listings": {
          "post": {
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          }
        },
        "/rating_stats": {
          "get": {
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          }
        },
        "/rating_stats?listing_ids[]=1234567": {
          "get": {
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          }
        },
        "/listings#hash": {
          "get": {
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          }
        },
        "/games/{game}/dlc/{dlcrelease}}": {
          "get": {
            "description": "This operation is us asserting that we're able to match against a path with a malformed path parameter.",
            "parameters": [
              {
                "schema": {
                  "type": "string"
                },
                "name": "game",
                "in": "path",
                "required": true
              },
              {
                "schema": {
                  "type": "string"
                },
                "name": "dlcrelease",
                "in": "path",
                "required": true
              }
            ]
          }
        },
        "/games/{game}/platforms/{platform}/dlc/{dlc-release}": {
          "get": {
            "description": "This operation is asserting that we're able to match against a path that has a path parameter that contains a hyphen.",
            "parameters": [
              {
                "schema": {
                  "type": "string"
                },
                "name": "game",
                "in": "path",
                "required": true
              },
              {
                "schema": {
                  "type": "string"
                },
                "name": "platform",
                "in": "path",
                "required": true
              },
              {
                "schema": {
                  "type": "string"
                },
                "name": "dlc-release",
                "in": "path",
                "required": true
              }
            ]
          }
        }
      }
    }
  },
  {
    "id": "path-variable-quirks",
    "data": {
      "openapi": "3.0.3",
      "info": {
        "title": "Path variable quirks",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": "https://api.example.com"
        }
      ],
      "paths": {
        "/people/{personIdType}:{personId}": {
          "post": {
            "parameters": [
              {
                "name": "personIdType",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "personId",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "pathitems-component",
    "data": {
      "openapi": "3.1.0",
      "info": {
        "version": "1.0.0",
        "title": "Single Path",
        "description": "This is a slimmed down single path version of the Petstore definition that uses `pathItems` components."
      },
      "servers": [
        {
          "url": "https://httpbin.org/anything"
        }
      ],
      "paths": {
        "/pet/:id": {
          "$ref": "#/components/pathItems/singlePet"
        }
      },
      "components": {
        "securitySchemes": {
          "apiKey": {
            "type": "http",
            "scheme": "basic"
          }
        },
        "pathItems": {
          "singlePet": {
            "put": {
              "tags": [
                "pet"
              ],
              "summary": "Update a pet",
              "description": "This operation will update a pet in the database.",
              "responses": {
                "400": {
                  "description": "Invalid id value"
                }
              },
              "security": [
                {
                  "apiKey": []
                }
              ]
            },
            "get": {
              "tags": [
                "pet"
              ],
              "summary": "Find a pet",
              "description": "This operation will find a pet in the database.",
              "responses": {
                "400": {
                  "description": "Invalid status value"
                }
              },
              "security": []
            }
          }
        }
      }
    }
  },
  {
    "id": "petstore-nondereferenced",
    "data": {
      "openapi": "3.1.0",
      "info": {
        "title": "testing",
        "version": "1.0.0"
      },
      "paths": {
        "/anything": {
          "post": {
            "requestBody": {
              "$ref": "#/components/requestBodies/Pet"
            }
          }
        }
      },
      "components": {
        "requestBodies": {
          "Pet": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Pet"
                }
              }
            },
            "required": true
          }
        },
        "schemas": {
          "Pet": {
            "type": "string"
          }
        }
      }
    }
  },
  {
    "id": "petstore-ref-quirks",
    "data": {
      "openapi": "3.0.0",
      "info": {
        "description": "This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.",
        "version": "1.0.0",
        "title": "Swagger Petstore",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
          "email": "apiteam@swagger.io"
        },
        "license": {
          "name": "Apache 2.0",
          "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
      },
      "externalDocs": {
        "description": "Find out more about Swagger",
        "url": "http://swagger.io"
      },
      "servers": [
        {
          "url": "http://petstore.swagger.io/v2"
        }
      ],
      "tags": [
        {
          "name": "pet",
          "description": "Everything about your Pets",
          "externalDocs": {
            "description": "Find out more",
            "url": "http://swagger.io"
          }
        },
        {
          "name": "store",
          "description": "Access to Petstore orders"
        },
        {
          "name": "user",
          "description": "Operations about user",
          "externalDocs": {
            "description": "Find out more about our store",
            "url": "http://swagger.io"
          }
        }
      ],
      "paths": {
        "/pet": {
          "post": {
            "tags": [
              "pet"
            ],
            "summary": "Add a new pet to the store",
            "description": "",
            "operationId": "addPet",
            "requestBody": {
              "$ref": "#/components/requestBodies/Pet"
            },
            "responses": {
              "405": {
                "description": "Invalid input"
              }
            },
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ]
          },
          "put": {
            "tags": [
              "pet"
            ],
            "summary": "Update an existing pet",
            "description": "",
            "operationId": "updatePet",
            "requestBody": {
              "$ref": "#/components/requestBodies/Pet"
            },
            "responses": {
              "400": {
                "description": "Invalid ID supplied"
              },
              "404": {
                "description": "Pet not found"
              },
              "405": {
                "description": "Validation exception"
              }
            },
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ]
          }
        },
        "/pet/findByStatus": {
          "get": {
            "tags": [
              "pet"
            ],
            "summary": "Finds Pets by status",
            "description": "Multiple status values can be provided with comma separated strings",
            "operationId": "findPetsByStatus",
            "parameters": [
              {
                "name": "status",
                "in": "query",
                "description": "Status values that need to be considered for filter",
                "required": true,
                "explode": true,
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": [
                      "available",
                      "pending",
                      "sold"
                    ],
                    "default": "available"
                  }
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/xml": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Pet"
                      }
                    }
                  },
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Pet"
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid status value"
              }
            },
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ]
          }
        },
        "/pet/findByTags": {
          "get": {
            "tags": [
              "pet"
            ],
            "summary": "Finds Pets by tags",
            "description": "Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.",
            "operationId": "findPetsByTags",
            "parameters": [
              {
                "name": "tags",
                "in": "query",
                "description": "Tags to filter by",
                "required": true,
                "explode": true,
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/xml": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Pet"
                      }
                    }
                  },
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Pet"
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid tag value"
              }
            },
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ],
            "deprecated": true
          }
        },
        "/pet/{petId}": {
          "get": {
            "tags": [
              "pet"
            ],
            "summary": "Find pet by ID",
            "description": "Returns a single pet",
            "operationId": "getPetById",
            "parameters": [
              {
                "name": "petId",
                "in": "path",
                "description": "ID of pet to return",
                "required": true,
                "schema": {
                  "type": "integer",
                  "format": "int64"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/xml": {
                    "schema": {
                      "$ref": "#/components/schemas/Pet"
                    }
                  },
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Pet"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid ID supplied"
              },
              "404": {
                "description": "Pet not found"
              },
              "default": {
                "description": "successful response"
              }
            },
            "security": [
              {
                "api_key": []
              }
            ]
          },
          "post": {
            "tags": [
              "pet"
            ],
            "summary": "Updates a pet in the store with form data",
            "description": "",
            "operationId": "updatePetWithForm",
            "parameters": [
              {
                "name": "petId",
                "in": "path",
                "description": "ID of pet that needs to be updated",
                "required": true,
                "schema": {
                  "type": "integer",
                  "format": "int64"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/x-www-form-urlencoded": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "description": "Updated name of the pet",
                        "type": "string"
                      },
                      "status": {
                        "description": "Updated status of the pet",
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "405": {
                "description": "Invalid input"
              }
            },
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ]
          },
          "delete": {
            "tags": [
              "pet"
            ],
            "summary": "Deletes a pet",
            "description": "",
            "operationId": "deletePet",
            "parameters": [
              {
                "name": "api_key",
                "in": "header",
                "required": false,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "petId",
                "in": "path",
                "description": "Pet id to delete",
                "required": true,
                "schema": {
                  "type": "integer",
                  "format": "int64"
                }
              }
            ],
            "responses": {
              "400": {
                "description": "Invalid ID supplied"
              },
              "404": {
                "description": "Pet not found"
              }
            },
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ]
          }
        },
        "/pet/{petId}/uploadImage": {
          "post": {
            "tags": [
              "pet"
            ],
            "summary": "Uploads an image",
            "description": "",
            "operationId": "uploadFile",
            "parameters": [
              {
                "name": "petId",
                "in": "path",
                "description": "ID of pet to update",
                "required": true,
                "schema": {
                  "type": "integer",
                  "format": "int64"
                }
              }
            ],
            "requestBody": {
              "content": {
                "multipart/form-data": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "additionalMetadata": {
                        "description": "Additional data to pass to server",
                        "type": "string"
                      },
                      "file": {
                        "description": "file to upload",
                        "type": "string",
                        "format": "binary"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/ApiResponse"
                    }
                  }
                }
              }
            },
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ]
          }
        },
        "/store/inventory": {
          "get": {
            "tags": [
              "store"
            ],
            "summary": "Returns pet inventories by status",
            "description": "Returns a map of status codes to quantities",
            "operationId": "getInventory",
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "integer",
                        "format": "int32"
                      }
                    }
                  }
                }
              }
            },
            "security": [
              {
                "api_key": []
              }
            ]
          }
        },
        "/store/order": {
          "post": {
            "tags": [
              "store"
            ],
            "summary": "Place an order for a pet",
            "description": "",
            "operationId": "placeOrder",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Order"
                  }
                }
              },
              "description": "order placed for purchasing the pet",
              "required": true
            },
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/xml": {
                    "schema": {
                      "$ref": "#/components/schemas/Order"
                    }
                  },
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Order"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid Order"
              }
            }
          }
        },
        "/store/order/{orderId}": {
          "get": {
            "tags": [
              "store"
            ],
            "summary": "Find purchase order by ID",
            "description": "For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions",
            "operationId": "getOrderById",
            "parameters": [
              {
                "name": "orderId",
                "in": "path",
                "description": "ID of pet that needs to be fetched",
                "required": true,
                "schema": {
                  "type": "integer",
                  "format": "int64",
                  "minimum": 1,
                  "maximum": 10
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/xml": {
                    "schema": {
                      "$ref": "#/components/schemas/Order"
                    }
                  },
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Order"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid ID supplied"
              },
              "404": {
                "description": "Order not found"
              }
            }
          },
          "delete": {
            "tags": [
              "store"
            ],
            "summary": "Delete purchase order by ID",
            "description": "For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors",
            "operationId": "deleteOrder",
            "parameters": [
              {
                "name": "orderId",
                "in": "path",
                "description": "ID of the order that needs to be deleted",
                "required": true,
                "schema": {
                  "type": "integer",
                  "format": "int64",
                  "minimum": 1
                }
              }
            ],
            "responses": {
              "400": {
                "description": "Invalid ID supplied"
              },
              "404": {
                "description": "Order not found"
              }
            }
          }
        },
        "/user": {
          "post": {
            "tags": [
              "user"
            ],
            "summary": "Create user",
            "description": "This can only be done by the logged in user.",
            "operationId": "createUser",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              },
              "description": "Created user object",
              "required": true
            },
            "responses": {
              "default": {
                "description": "successful operation"
              }
            }
          }
        },
        "/user/createWithArray": {
          "post": {
            "tags": [
              "user"
            ],
            "summary": "Creates list of users with given input array",
            "description": "",
            "operationId": "createUsersWithArrayInput",
            "requestBody": {
              "$ref": "#/components/requestBodies/UserArray"
            },
            "responses": {
              "default": {
                "description": "successful operation"
              }
            }
          }
        },
        "/user/createWithList": {
          "post": {
            "tags": [
              "user"
            ],
            "summary": "Creates list of users with given input array",
            "description": "",
            "operationId": "createUsersWithListInput",
            "requestBody": {
              "$ref": "#/components/requestBodies/UserArray"
            },
            "responses": {
              "default": {
                "description": "successful operation"
              }
            }
          }
        },
        "/user/login": {
          "get": {
            "tags": [
              "user"
            ],
            "summary": "Logs user into the system",
            "description": "",
            "operationId": "loginUser",
            "parameters": [
              {
                "name": "username",
                "in": "query",
                "description": "The user name for login",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "password",
                "in": "query",
                "description": "The password for login in clear text",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "headers": {
                  "X-Rate-Limit": {
                    "description": "calls per hour allowed by the user",
                    "schema": {
                      "type": "integer",
                      "format": "int32"
                    }
                  },
                  "X-Expires-After": {
                    "description": "date in UTC when token expires",
                    "schema": {
                      "type": "string",
                      "format": "date-time"
                    }
                  }
                },
                "content": {
                  "application/xml": {
                    "schema": {
                      "type": "string"
                    }
                  },
                  "application/json": {
                    "schema": {
                      "type": "string"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid username/password supplied"
              }
            }
          }
        },
        "/user/logout": {
          "get": {
            "tags": [
              "user"
            ],
            "summary": "Logs out current logged in user session",
            "description": "",
            "operationId": "logoutUser",
            "responses": {
              "default": {
                "description": "successful operation"
              }
            }
          }
        },
        "/user/{username}": {
          "get": {
            "tags": [
              "user"
            ],
            "summary": "Get user by user name",
            "description": "",
            "operationId": "getUserByName",
            "parameters": [
              {
                "name": "username",
                "in": "path",
                "description": "The name that needs to be fetched. Use user1 for testing.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/xml": {
                    "schema": {
                      "$ref": "#/components/schemas/User"
                    }
                  },
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/User"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid username supplied"
              },
              "404": {
                "description": "User not found"
              }
            }
          },
          "put": {
            "tags": [
              "user"
            ],
            "summary": "Updated user",
            "description": "This can only be done by the logged in user.",
            "operationId": "updateUser",
            "parameters": [
              {
                "name": "username",
                "in": "path",
                "description": "name that need to be updated",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              },
              "description": "Updated user object",
              "required": true
            },
            "responses": {
              "400": {
                "description": "Invalid user supplied"
              },
              "404": {
                "description": "User not found"
              }
            }
          },
          "delete": {
            "tags": [
              "user"
            ],
            "summary": "Delete user",
            "description": "This can only be done by the logged in user.",
            "operationId": "deleteUser",
            "parameters": [
              {
                "name": "username",
                "in": "path",
                "description": "The name that needs to be deleted",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "400": {
                "description": "Invalid username supplied"
              },
              "404": {
                "description": "User not found"
              }
            }
          }
        }
      },
      "components": {
        "requestBodies": {
          "Pet": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Pet"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Pet"
                }
              }
            },
            "description": "Pet object that needs to be added to the store",
            "required": true
          },
          "UserArray": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            },
            "description": "List of user object",
            "required": true
          }
        },
        "securitySchemes": {
          "petstore_auth": {
            "type": "oauth2",
            "flows": {
              "implicit": {
                "authorizationUrl": "http://petstore.swagger.io/oauth/dialog",
                "scopes": {
                  "write:pets": "modify pets in your account",
                  "read:pets": "read your pets"
                }
              }
            }
          },
          "api_key": {
            "type": "apiKey",
            "name": "api_key",
            "in": "header"
          }
        },
        "schemas": {
          "Order": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "petId": {
                "type": "integer",
                "format": "int64"
              },
              "quantity": {
                "type": "integer",
                "format": "int32"
              },
              "shipDate": {
                "type": "string",
                "format": "date-time"
              },
              "status": {
                "type": "string",
                "description": "Order Status",
                "enum": [
                  "placed",
                  "approved",
                  "delivered"
                ]
              },
              "$ref": {
                "type": "string",
                "description": "A property called $ref to see what happens"
              },
              "complete": {
                "type": "boolean",
                "default": false
              }
            },
            "xml": {
              "name": "Order"
            }
          },
          "Category": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "name": {
                "type": "string"
              }
            },
            "xml": {
              "name": "Category"
            }
          },
          "User": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "username": {
                "type": "string"
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "email": {
                "type": "string"
              },
              "password": {
                "type": "string"
              },
              "phone": {
                "type": "string"
              },
              "userStatus": {
                "type": "integer",
                "format": "int32",
                "description": "User Status"
              }
            },
            "xml": {
              "name": "User"
            }
          },
          "Tag": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "name": {
                "type": "string"
              }
            },
            "xml": {
              "name": "Tag"
            }
          },
          "Pet": {
            "type": "object",
            "required": [
              "name",
              "photoUrls"
            ],
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64",
                "readOnly": true,
                "default": 40,
                "example": 25
              },
              "category": {
                "$ref": "#/components/schemas/Category"
              },
              "name": {
                "type": "string",
                "example": "doggie"
              },
              "photoUrls": {
                "type": "array",
                "xml": {
                  "name": "photoUrl",
                  "wrapped": true
                },
                "items": {
                  "type": "string",
                  "example": "https://example.com/photo.png"
                }
              },
              "tags": {
                "type": "array",
                "xml": {
                  "name": "tag",
                  "wrapped": true
                },
                "items": {
                  "$ref": "#/components/schemas/Tag"
                }
              },
              "status": {
                "type": "string",
                "description": "pet status in the store",
                "enum": [
                  "available",
                  "pending",
                  "sold"
                ]
              }
            },
            "xml": {
              "name": "Pet"
            }
          },
          "ApiResponse": {
            "type": "object",
            "properties": {
              "code": {
                "type": "integer",
                "format": "int32"
              },
              "type": {
                "type": "string"
              },
              "message": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "petstore-server-vars",
    "data": {
      "openapi": "3.0.2",
      "servers": [
        {
          "url": "http://petstore.swagger.io/{basePath}",
          "variables": {
            "basePath": {
              "default": "v2"
            }
          }
        }
      ],
      "info": {
        "description": "This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.",
        "version": "1.0.0",
        "title": "Swagger Petstore",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
          "email": "apiteam@swagger.io"
        },
        "license": {
          "name": "Apache 2.0",
          "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
      },
      "tags": [
        {
          "name": "pet",
          "description": "Everything about your Pets",
          "externalDocs": {
            "description": "Find out more",
            "url": "http://swagger.io"
          }
        },
        {
          "name": "store",
          "description": "Access to Petstore orders"
        },
        {
          "name": "user",
          "description": "Operations about user",
          "externalDocs": {
            "description": "Find out more about our store",
            "url": "http://swagger.io"
          }
        }
      ],
      "paths": {
        "/pet": {
          "post": {
            "tags": [
              "pet"
            ],
            "summary": "Add a new pet to the store",
            "description": "",
            "operationId": "addPet",
            "responses": {
              "405": {
                "description": "Invalid input"
              }
            },
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ],
            "requestBody": {
              "$ref": "#/components/requestBodies/Pet"
            }
          },
          "put": {
            "tags": [
              "pet"
            ],
            "summary": "Update an existing pet",
            "description": "",
            "operationId": "updatePet",
            "responses": {
              "400": {
                "description": "Invalid ID supplied"
              },
              "404": {
                "description": "Pet not found"
              },
              "405": {
                "description": "Validation exception"
              }
            },
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ],
            "requestBody": {
              "$ref": "#/components/requestBodies/Pet"
            }
          }
        },
        "/pet/findByStatus": {
          "get": {
            "tags": [
              "pet"
            ],
            "summary": "Finds Pets by status",
            "description": "Multiple status values can be provided with comma separated strings",
            "operationId": "findPetsByStatus",
            "parameters": [
              {
                "name": "status",
                "in": "query",
                "description": "Status values that need to be considered for filter",
                "required": true,
                "explode": true,
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": [
                      "available",
                      "pending",
                      "sold"
                    ],
                    "default": "available"
                  }
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/xml": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Pet"
                      }
                    }
                  },
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Pet"
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid status value"
              }
            },
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ]
          }
        },
        "/pet/findByTags": {
          "get": {
            "tags": [
              "pet"
            ],
            "summary": "Finds Pets by tags",
            "description": "Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.",
            "operationId": "findPetsByTags",
            "parameters": [
              {
                "name": "tags",
                "in": "query",
                "description": "Tags to filter by",
                "required": true,
                "explode": true,
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/xml": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Pet"
                      }
                    }
                  },
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Pet"
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid tag value"
              }
            },
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ],
            "deprecated": true
          }
        },
        "/pet/{petId}": {
          "get": {
            "tags": [
              "pet"
            ],
            "summary": "Find pet by ID",
            "description": "Returns a single pet",
            "operationId": "getPetById",
            "parameters": [
              {
                "name": "petId",
                "in": "path",
                "description": "ID of pet to return",
                "required": true,
                "schema": {
                  "type": "integer",
                  "format": "int64"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/xml": {
                    "schema": {
                      "$ref": "#/components/schemas/Pet"
                    }
                  },
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Pet"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid ID supplied"
              },
              "404": {
                "description": "Pet not found"
              }
            },
            "security": [
              {
                "api_key": []
              }
            ]
          },
          "post": {
            "tags": [
              "pet"
            ],
            "summary": "Updates a pet in the store with form data",
            "description": "",
            "operationId": "updatePetWithForm",
            "parameters": [
              {
                "name": "petId",
                "in": "path",
                "description": "ID of pet that needs to be updated",
                "required": true,
                "schema": {
                  "type": "integer",
                  "format": "int64"
                }
              }
            ],
            "responses": {
              "405": {
                "description": "Invalid input"
              }
            },
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ],
            "requestBody": {
              "content": {
                "application/x-www-form-urlencoded": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "description": "Updated name of the pet",
                        "type": "string"
                      },
                      "status": {
                        "description": "Updated status of the pet",
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "delete": {
            "tags": [
              "pet"
            ],
            "summary": "Deletes a pet",
            "description": "",
            "operationId": "deletePet",
            "parameters": [
              {
                "name": "api_key",
                "in": "header",
                "required": false,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "petId",
                "in": "path",
                "description": "Pet id to delete",
                "required": true,
                "schema": {
                  "type": "integer",
                  "format": "int64"
                }
              }
            ],
            "responses": {
              "400": {
                "description": "Invalid ID supplied"
              },
              "404": {
                "description": "Pet not found"
              }
            },
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ]
          }
        },
        "/pet/{petId}/uploadImage": {
          "post": {
            "tags": [
              "pet"
            ],
            "summary": "uploads an image",
            "description": "",
            "operationId": "uploadFile",
            "parameters": [
              {
                "name": "petId",
                "in": "path",
                "description": "ID of pet to update",
                "required": true,
                "schema": {
                  "type": "integer",
                  "format": "int64"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/ApiResponse"
                    }
                  }
                }
              }
            },
            "security": [
              {
                "petstore_auth": [
                  "write:pets",
                  "read:pets"
                ]
              }
            ],
            "requestBody": {
              "content": {
                "application/octet-stream": {
                  "schema": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              }
            }
          }
        },
        "/store/inventory": {
          "get": {
            "tags": [
              "store"
            ],
            "summary": "Returns pet inventories by status",
            "description": "Returns a map of status codes to quantities",
            "operationId": "getInventory",
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "integer",
                        "format": "int32"
                      }
                    }
                  }
                }
              }
            },
            "security": [
              {
                "api_key": []
              }
            ]
          }
        },
        "/store/order": {
          "post": {
            "tags": [
              "store"
            ],
            "summary": "Place an order for a pet",
            "description": "",
            "operationId": "placeOrder",
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/xml": {
                    "schema": {
                      "$ref": "#/components/schemas/Order"
                    }
                  },
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Order"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid Order"
              }
            },
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Order"
                  }
                }
              },
              "description": "order placed for purchasing the pet",
              "required": true
            }
          }
        },
        "/store/order/{orderId}": {
          "get": {
            "tags": [
              "store"
            ],
            "summary": "Find purchase order by ID",
            "description": "For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions",
            "operationId": "getOrderById",
            "parameters": [
              {
                "name": "orderId",
                "in": "path",
                "description": "ID of pet that needs to be fetched",
                "required": true,
                "schema": {
                  "type": "integer",
                  "format": "int64",
                  "minimum": 1,
                  "maximum": 10
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/xml": {
                    "schema": {
                      "$ref": "#/components/schemas/Order"
                    }
                  },
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Order"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid ID supplied"
              },
              "404": {
                "description": "Order not found"
              }
            }
          },
          "delete": {
            "tags": [
              "store"
            ],
            "summary": "Delete purchase order by ID",
            "description": "For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors",
            "operationId": "deleteOrder",
            "parameters": [
              {
                "name": "orderId",
                "in": "path",
                "description": "ID of the order that needs to be deleted",
                "required": true,
                "schema": {
                  "type": "integer",
                  "format": "int64",
                  "minimum": 1
                }
              }
            ],
            "responses": {
              "400": {
                "description": "Invalid ID supplied"
              },
              "404": {
                "description": "Order not found"
              }
            }
          }
        },
        "/user": {
          "post": {
            "tags": [
              "user"
            ],
            "summary": "Create user",
            "description": "This can only be done by the logged in user.",
            "operationId": "createUser",
            "responses": {
              "default": {
                "description": "successful operation"
              }
            },
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              },
              "description": "Created user object",
              "required": true
            }
          }
        },
        "/user/createWithArray": {
          "post": {
            "tags": [
              "user"
            ],
            "summary": "Creates list of users with given input array",
            "description": "",
            "operationId": "createUsersWithArrayInput",
            "responses": {
              "default": {
                "description": "successful operation"
              }
            },
            "requestBody": {
              "$ref": "#/components/requestBodies/UserArray"
            }
          }
        },
        "/user/createWithList": {
          "post": {
            "tags": [
              "user"
            ],
            "summary": "Creates list of users with given input array",
            "description": "",
            "operationId": "createUsersWithListInput",
            "responses": {
              "default": {
                "description": "successful operation"
              }
            },
            "requestBody": {
              "$ref": "#/components/requestBodies/UserArray"
            }
          }
        },
        "/user/login": {
          "get": {
            "tags": [
              "user"
            ],
            "summary": "Logs user into the system",
            "description": "",
            "operationId": "loginUser",
            "parameters": [
              {
                "name": "username",
                "in": "query",
                "description": "The user name for login",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "password",
                "in": "query",
                "description": "The password for login in clear text",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "headers": {
                  "X-Rate-Limit": {
                    "description": "calls per hour allowed by the user",
                    "schema": {
                      "type": "integer",
                      "format": "int32"
                    }
                  },
                  "X-Expires-After": {
                    "description": "date in UTC when token expires",
                    "schema": {
                      "type": "string",
                      "format": "date-time"
                    }
                  }
                },
                "content": {
                  "application/xml": {
                    "schema": {
                      "type": "string"
                    }
                  },
                  "application/json": {
                    "schema": {
                      "type": "string"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid username/password supplied"
              }
            }
          }
        },
        "/user/logout": {
          "get": {
            "tags": [
              "user"
            ],
            "summary": "Logs out current logged in user session",
            "description": "",
            "operationId": "logoutUser",
            "responses": {
              "default": {
                "description": "successful operation"
              }
            }
          }
        },
        "/user/{username}": {
          "get": {
            "tags": [
              "user"
            ],
            "summary": "Get user by user name",
            "description": "",
            "operationId": "getUserByName",
            "parameters": [
              {
                "name": "username",
                "in": "path",
                "description": "The name that needs to be fetched. Use user1 for testing.",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/xml": {
                    "schema": {
                      "$ref": "#/components/schemas/User"
                    }
                  },
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/User"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid username supplied"
              },
              "404": {
                "description": "User not found"
              }
            }
          },
          "put": {
            "tags": [
              "user"
            ],
            "summary": "Updated user",
            "description": "This can only be done by the logged in user.",
            "operationId": "updateUser",
            "parameters": [
              {
                "name": "username",
                "in": "path",
                "description": "name that need to be updated",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "400": {
                "description": "Invalid user supplied"
              },
              "404": {
                "description": "User not found"
              }
            },
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              },
              "description": "Updated user object",
              "required": true
            }
          },
          "delete": {
            "tags": [
              "user"
            ],
            "summary": "Delete user",
            "description": "This can only be done by the logged in user.",
            "operationId": "deleteUser",
            "parameters": [
              {
                "name": "username",
                "in": "path",
                "description": "The name that needs to be deleted",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "400": {
                "description": "Invalid username supplied"
              },
              "404": {
                "description": "User not found"
              }
            }
          }
        }
      },
      "externalDocs": {
        "description": "Find out more about Swagger",
        "url": "http://swagger.io"
      },
      "components": {
        "schemas": {
          "Order": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "petId": {
                "type": "integer",
                "format": "int64"
              },
              "quantity": {
                "type": "integer",
                "format": "int32"
              },
              "shipDate": {
                "type": "string",
                "format": "date-time"
              },
              "status": {
                "type": "string",
                "description": "Order Status",
                "enum": [
                  "placed",
                  "approved",
                  "delivered"
                ]
              },
              "complete": {
                "type": "boolean",
                "default": false
              }
            },
            "xml": {
              "name": "Order"
            }
          },
          "Category": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "name": {
                "type": "string"
              }
            },
            "xml": {
              "name": "Category"
            }
          },
          "User": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "username": {
                "type": "string"
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "email": {
                "type": "string"
              },
              "password": {
                "type": "string"
              },
              "phone": {
                "type": "string"
              },
              "userStatus": {
                "type": "integer",
                "format": "int32",
                "description": "User Status"
              }
            },
            "xml": {
              "name": "User"
            }
          },
          "Tag": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "name": {
                "type": "string"
              }
            },
            "xml": {
              "name": "Tag"
            }
          },
          "Pet": {
            "type": "object",
            "required": [
              "name",
              "photoUrls"
            ],
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "category": {
                "$ref": "#/components/schemas/Category"
              },
              "name": {
                "type": "string",
                "example": "doggie"
              },
              "photoUrls": {
                "type": "array",
                "xml": {
                  "name": "photoUrl",
                  "wrapped": true
                },
                "items": {
                  "type": "string"
                }
              },
              "tags": {
                "type": "array",
                "xml": {
                  "name": "tag",
                  "wrapped": true
                },
                "items": {
                  "$ref": "#/components/schemas/Tag"
                }
              },
              "status": {
                "type": "string",
                "description": "pet status in the store",
                "enum": [
                  "available",
                  "pending",
                  "sold"
                ]
              }
            },
            "xml": {
              "name": "Pet"
            }
          },
          "ApiResponse": {
            "type": "object",
            "properties": {
              "code": {
                "type": "integer",
                "format": "int32"
              },
              "type": {
                "type": "string"
              },
              "message": {
                "type": "string"
              }
            }
          }
        },
        "requestBodies": {
          "Pet": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Pet"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Pet"
                }
              }
            },
            "description": "Pet object that needs to be added to the store",
            "required": true
          },
          "UserArray": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            },
            "description": "List of user object",
            "required": true
          }
        },
        "securitySchemes": {
          "petstore_auth": {
            "type": "oauth2",
            "flows": {
              "implicit": {
                "authorizationUrl": "http://petstore.swagger.io/oauth/dialog",
                "scopes": {
                  "write:pets": "modify pets in your account",
                  "read:pets": "read your pets"
                }
              }
            }
          },
          "api_key": {
            "type": "apiKey",
            "name": "api_key",
            "in": "header"
          }
        }
      }
    }
  },
  {
    "id": "polymorphism-quirks",
    "data": {
      "openapi": "3.0.0",
      "info": {
        "title": "Polymorhism quirks",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org"
        }
      ],
      "paths": {
        "/allof-with-empty-object-property": {
          "post": {
            "description": "Within the allOf of this requestBody there is a `data` object property that has no schema.",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/api.WithdrawalRequest"
                      },
                      {
                        "type": "object",
                        "properties": {
                          "token": {
                            "allOf": [
                              {
                                "$ref": "#/components/schemas/core.Token"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "data": {
                                    "$ref": "#/components/schemas/core.TokenData"
                                  }
                                }
                              }
                            ]
                          }
                        }
                      }
                    ]
                  }
                }
              },
              "required": true
            },
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          }
        },
        "/allof-with-oneOf": {
          "post": {
            "description": "Within the allOf of this requestBody there is a top-level oneOf.",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/QuoteCreationRequest"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "api.WithdrawalRequest": {
            "type": "object",
            "required": [
              "amount",
              "token",
              "user"
            ],
            "properties": {
              "amount": {
                "type": "string"
              },
              "token": {
                "$ref": "#/components/schemas/core.Token"
              },
              "user": {
                "type": "string"
              }
            }
          },
          "core.TokenData": {
            "type": "object",
            "properties": {
              "decimals": {
                "type": "integer",
                "example": 18
              },
              "token_address": {
                "type": "string"
              },
              "token_id": {
                "type": "string",
                "example": "200"
              }
            }
          },
          "core.Token": {
            "type": "object",
            "properties": {
              "data": {},
              "type": {
                "type": "string"
              }
            }
          },
          "QuoteCreationRequest": {
            "allOf": [
              {
                "type": "object",
                "properties": {
                  "quoteType": {
                    "type": "string"
                  },
                  "lockPeriod": {
                    "type": "string"
                  },
                  "conversionSchedule": {
                    "type": "string"
                  },
                  "sourceCurrencyCode": {
                    "type": "string"
                  },
                  "destinationCurrencyCode": {
                    "type": "string"
                  }
                }
              },
              {
                "$ref": "#/components/schemas/EitherSourceOrDestinationAmountOrNoAmount"
              }
            ],
            "required": [
              "sourceCurrencyCode",
              "destinationCurrencyCode",
              "quoteType"
            ]
          },
          "EitherSourceOrDestinationAmountOrNoAmount": {
            "oneOf": [
              {
                "type": "object",
                "title": "With Source Amount",
                "properties": {
                  "sourceAmount": {
                    "type": "number"
                  }
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "id": "polymorphism-with-circular-ref",
    "data": {
      "openapi": "3.0.1",
      "info": {
        "title": "Nomad Admin API",
        "version": "v3"
      },
      "servers": [
        {
          "url": "https://httpbin.org"
        }
      ],
      "paths": {
        "/admin/search": {
          "post": {
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/SearchModel"
                      }
                    ]
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": ""
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "AccountLoginResponseModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "userName": {
                "type": "string",
                "nullable": true
              },
              "firstName": {
                "type": "string",
                "nullable": true
              },
              "lastName": {
                "type": "string",
                "nullable": true
              },
              "loginStatus": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LoginResponseStatuses"
                  }
                ],
                "description": "TwoFactorSetupRequired\r\n\r\nTwoFactorCodeRequired\r\n\r\nIsDisabled\r\n\r\nIsPendingEmailConfirmation\r\n\r\nIsPendingNewAccountSignup\r\n\r\nIsPendingAccountMigrationSignup\r\n\r\nIsPendingNewPassword\r\n\r\nIsExpired\r\n\r\nIsPendingInvitation",
                "nullable": true
              },
              "cookies": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LoginCookieModel"
                },
                "nullable": true
              },
              "token": {
                "type": "string",
                "description": "Gets the JWT token response that must be inclued in the header of all API requests. Add it to the Authorization header prefaced by Bearer.",
                "nullable": true
              },
              "refreshToken": {
                "type": "string",
                "description": "Use this token to request a new token",
                "nullable": true
              },
              "expirationSeconds": {
                "type": "number",
                "description": "Duration in seconds when the token will expire",
                "format": "double"
              },
              "scopeId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "scopeName": {
                "type": "string",
                "nullable": true
              },
              "twoFactorQRCodeImage": {
                "type": "string",
                "nullable": true
              },
              "twoFactorQRCode": {
                "type": "string",
                "nullable": true
              },
              "claims": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Claim"
                },
                "nullable": true
              },
              "isAdmin": {
                "type": "boolean",
                "description": "If the user has permissions as an administrator",
                "nullable": true
              },
              "isGuest": {
                "type": "boolean",
                "description": "If the user has permissions as a guest user",
                "nullable": true
              },
              "userSessionId": {
                "type": "string",
                "description": "The user's session id",
                "format": "uuid",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "AdBreakModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "The ID of the ad break",
                "format": "uuid"
              },
              "timeCode": {
                "type": "string",
                "description": "The timecode of the ad break in the format of hh:mm:ss:ff",
                "nullable": true
              },
              "score": {
                "type": "number",
                "description": "The calculated score of the ad break from the AI analysis. The higher the better.",
                "format": "double",
                "nullable": true
              },
              "adBreakType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AdSlotTypes"
                  }
                ],
                "description": "The type of the ad break (pre-roll, post-roll, mid-roll)\r\n\r\nPreroll\r\n\r\nMidroll\r\n\r\nPostroll",
                "x-enumNames": [
                  "Preroll",
                  "Midroll",
                  "Postroll"
                ]
              },
              "tags": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "description": "The list of tags that are targeted with this ad break",
                "nullable": true
              },
              "labels": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "description": "The list of labels that are targeted with this ad break",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "AdBreakSubmitModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "The ID of the ad break",
                "format": "uuid",
                "nullable": true
              },
              "timeCode": {
                "type": "string",
                "description": "The timecode of the ad break in the format of hh:mm:ss:ff",
                "nullable": true
              },
              "tags": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "description": "The list of tags that are targeted with this ad break",
                "nullable": true
              },
              "labels": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "description": "The list of labels that are targeted with this ad break",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "AdSlotTypes": {
            "enum": [
              "Preroll",
              "Midroll",
              "Postroll"
            ],
            "type": "string",
            "description": "Preroll\r\n\r\nMidroll\r\n\r\nPostroll",
            "x-enumNames": [
              "Preroll",
              "Midroll",
              "Postroll"
            ]
          },
          "AddScheduleItemModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "timeCode": {
                "type": "string",
                "nullable": true
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "asset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "scheduleItemType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ScheduleItemTypes"
                  }
                ],
                "description": "Asset\r\n\r\nDynamic",
                "x-enumNames": [
                  "Asset",
                  "Dynamic"
                ]
              },
              "scheduleId": {
                "type": "string",
                "format": "uuid"
              },
              "endTimeCode": {
                "type": "string",
                "nullable": true
              },
              "days": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "tags": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "relatedContent": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "collections": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "labels": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "playlistSchedule": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "liveChannel": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "defaultVideo": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "thumbnailAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "searchFilterType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ScheduleItemSearchTypes"
                  }
                ],
                "description": "Random\r\n\r\nRandomWithinDateRange\r\n\r\nNewest\r\n\r\nNewestNotPlayed",
                "nullable": true
              },
              "sourceType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ScheduleItemSourceTypes"
                  }
                ],
                "description": "PlaylistSchedule\r\n\r\nSearchFilters\r\n\r\nVideoAsset\r\n\r\nLiveChannel",
                "nullable": true
              },
              "searchDurationInMinutes": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "endSearchDurationInMinutes": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "searchDate": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "endSearchDate": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "AddScheduleModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "routeName": {
                "type": "string",
                "nullable": true
              },
              "thumbnailAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "scheduleType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ScheduleTypes"
                  }
                ],
                "description": "Playlist\r\n\r\nIntelligentSchedule\r\n\r\nIntelligentPlaylist",
                "x-enumNames": [
                  "Playlist",
                  "IntelligentSchedule",
                  "IntelligentPlaylist"
                ]
              },
              "timeZoneId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "defaultVideoAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "loopPlaylist": {
                "type": "boolean",
                "nullable": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "AdminUserModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "The ID of the user",
                "format": "uuid"
              },
              "email": {
                "type": "string",
                "description": "The email of the user",
                "nullable": true
              },
              "firstName": {
                "type": "string",
                "description": "The first name of the user",
                "nullable": true
              },
              "lastName": {
                "type": "string",
                "description": "The last name of the user",
                "nullable": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "The additional custom properties of the user",
                "nullable": true,
                "readOnly": true
              },
              "status": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "description": "The status of the user",
                "nullable": true
              },
              "loginStatus": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LoginResponseStatuses"
                  }
                ],
                "description": "TwoFactorSetupRequired\r\n\r\nTwoFactorCodeRequired\r\n\r\nIsDisabled\r\n\r\nIsPendingEmailConfirmation\r\n\r\nIsPendingNewAccountSignup\r\n\r\nIsPendingAccountMigrationSignup\r\n\r\nIsPendingNewPassword\r\n\r\nIsExpired\r\n\r\nIsPendingInvitation",
                "nullable": true
              },
              "assignedSecurityGroups": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "description": "The security groups that this user is part of",
                "nullable": true
              },
              "assignedSystemRoles": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "description": "The system roles that this user is part of",
                "nullable": true
              },
              "personalFolder": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "description": "The personal folder Asset ID for this user",
                "nullable": true
              },
              "homeFolder": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "description": "The home folder Asset ID for this user",
                "nullable": true
              },
              "lastModifiedDate": {
                "type": "string",
                "format": "date-time"
              },
              "createdDate": {
                "type": "string",
                "format": "date-time"
              },
              "lastModifiedUserName": {
                "type": "string",
                "nullable": true
              },
              "lastModifiedUserId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "AdminUserModelListResultModel": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/AdminUserModel"
                },
                "nullable": true
              },
              "totalItemCount": {
                "type": "integer",
                "format": "int64"
              },
              "nextPageOffset": {
                "nullable": true
              },
              "hasItems": {
                "type": "boolean",
                "readOnly": true
              },
              "relatedItems": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/AdminUserModel"
                },
                "nullable": true
              },
              "message": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "AssetDetailModel": {
            "type": "object",
            "properties": {
              "assetId": {
                "type": "string",
                "format": "uuid"
              },
              "permission": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/SecurityPermissions"
                  }
                ],
                "description": "Read\r\n\r\nFileWrite\r\n\r\nFolderWrite\r\n\r\nAdministrator\r\n\r\nGuest",
                "nullable": true
              },
              "isRestricted": {
                "type": "boolean",
                "nullable": true
              },
              "inheritSecurity": {
                "type": "boolean"
              },
              "relatedAudio": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/AssetReferenceModel"
                },
                "nullable": true
              },
              "relatedAssets": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/AssetReferenceModel"
                },
                "nullable": true
              },
              "relatedVideos": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/AssetReferenceModel"
                },
                "nullable": true
              },
              "relatedImages": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/AssetReferenceModel"
                },
                "nullable": true
              },
              "screenshots": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/AssetReferenceModel"
                },
                "nullable": true
              },
              "segments": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/AssetReferenceModel"
                },
                "nullable": true
              },
              "labels": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LabelModel"
                },
                "nullable": true
              },
              "faceItems": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/FaceModel"
                },
                "nullable": true
              },
              "persons": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/PersonReferenceModel"
                },
                "nullable": true
              },
              "textItems": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/TextItemGroupModel"
                },
                "nullable": true
              },
              "parents": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/AssetModel"
                },
                "nullable": true
              },
              "collections": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "tags": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "securityGroups": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "securityUsers": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "relatedContent": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "assetStats": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetStatsModel"
                  }
                ],
                "nullable": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              },
              "customAttributes": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              },
              "attributeSummary": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/UserContentAttributeSummaryModel"
                  }
                ],
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "AssetModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "parentId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "displayName": {
                "type": "string",
                "nullable": true
              },
              "displayDate": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "bucketName": {
                "type": "string",
                "nullable": true
              },
              "objectKey": {
                "type": "string",
                "nullable": true
              },
              "fullUrl": {
                "type": "string",
                "nullable": true
              },
              "assetStatus": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetStatuses"
                  }
                ],
                "description": "Available\r\n\r\nRenaming\r\n\r\nCopying\r\n\r\nRestoring\r\n\r\nRegistering\r\n\r\nUploading\r\n\r\nArchiving\r\n\r\nArchived\r\n\r\nPendingArchive\r\n\r\nPendingRestore\r\n\r\nRestored\r\n\r\nDeleting\r\n\r\nMoving\r\n\r\nSlugReplaced\r\n\r\nUpdating\r\n\r\nError\r\n\r\nAssembling\r\n\r\nClipping\r\n\r\nPlaceholder",
                "nullable": true
              },
              "storageClass": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/StorageClasses"
                  }
                ],
                "description": "Standard\r\n\r\nReducedRedundancy\r\n\r\nGlacier\r\n\r\nStandardInfrequentAccess\r\n\r\nOneZoneInfrequentAccess\r\n\r\nIntelligentTiering\r\n\r\nDeepArchive\r\n\r\nGlacierInstantRetrieval\r\n\r\nOutposts",
                "nullable": true
              },
              "assetType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetTypes"
                  }
                ],
                "description": "Folder\r\n\r\nFile\r\n\r\nBucket",
                "x-enumNames": [
                  "Folder",
                  "File",
                  "Bucket"
                ]
              }
            },
            "additionalProperties": false
          },
          "AssetPartUploadModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "The ID of this specific part",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "description": "The URL that can be used to upload TO. This is meant to be a partial file upload location and will expire.",
                "nullable": true
              },
              "partNumber": {
                "type": "integer",
                "description": "The # of the part being uploaded",
                "format": "int32"
              },
              "startingPosition": {
                "type": "integer",
                "description": "The starting byte of the upload chunk for this part",
                "format": "int64"
              },
              "endingPosition": {
                "type": "integer",
                "description": "The ending byte of the upload chunk for this part",
                "format": "int64"
              },
              "isCompleted": {
                "type": "boolean",
                "description": "If the part has already been uploaded"
              }
            },
            "additionalProperties": false
          },
          "AssetReferenceModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "jobId": {
                "type": "string",
                "nullable": true
              },
              "url": {
                "type": "string",
                "nullable": true
              },
              "fullUrl": {
                "type": "string",
                "nullable": true
              },
              "title": {
                "type": "string",
                "nullable": true
              },
              "language": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LanguageModel"
                  }
                ],
                "nullable": true
              },
              "lastModifiedDate": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "metadataType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/MetadataTypes"
                  }
                ],
                "description": "DocumentContent\r\n\r\nComprehendKeyPhrases\r\n\r\nComprehendEntities\r\n\r\nRekognitionImageIndexFaces\r\n\r\nRekognitionImageSearchFaces\r\n\r\nRekognitionImageLabels\r\n\r\nRekognitionImageCelebrityRecognition\r\n\r\nRekognitionVideoLabels\r\n\r\nTextractAnalyzeDocument\r\n\r\nTranscribe\r\n\r\nTranscribeVtt\r\n\r\nTranscribeTranslation\r\n\r\nTranscribeVttTranslation\r\n\r\nRekognitionVideoCelebrityRecognition\r\n\r\nRekognitionVideoPersonTracking\r\n\r\nRekognitionVideoFaceDetection\r\n\r\nImageInfo\r\n\r\nTranscode\r\n\r\nClip\r\n\r\nMediaInfo\r\n\r\nRekognitionImageDetectText\r\n\r\nRekognitionImageUnsafeContent\r\n\r\nRekognitionVideoUnsafeContent\r\n\r\nScreenshot\r\n\r\nSageMakerGroundTruthLabelResults\r\n\r\nThumbnailSheet\r\n\r\nThumbnailImage\r\n\r\nSageMakerInvokeEndpointResults\r\n\r\nSageMakerModelLabels\r\n\r\nRekognitionImageCustomLabels\r\n\r\nSageMakerManifest\r\n\r\nPreviewImage\r\n\r\nRekognitionVideoTextDetection\r\n\r\nRekognitionVideoSegmentDetection\r\n\r\nNomadVideoSegmentDetection\r\n\r\nTranscribeMedical\r\n\r\nPreviewAudio\r\n\r\nText\r\n\r\nAssetManifest\r\n\r\nIntervalSegments\r\n\r\nTranscribeMedicalText\r\n\r\nTranscribeMedicalTranslation\r\n\r\nAdobeMetadata\r\n\r\nAdobeMetadataText\r\n\r\nImageExif\r\n\r\nTextractImageDetectText\r\n\r\nAdSegments\r\n\r\nVmap\r\n\r\nVast\r\n\r\nMediaTailorVideo\r\n\r\nTranscribeSrt\r\n\r\nTranscribeRaw\r\n\r\nSubtitles\r\n\r\nVizRtMetadata\r\n\r\nProcessorJobs\r\n\r\nOfficeDocument\r\n\r\nTranscriptionContainer\r\n\r\nComprehendSentiment\r\n\r\nComprehendLanguage\r\n\r\nOriginalSourceVideo\r\n\r\nImportManifest\r\n\r\nTranscribeScc\r\n\r\nTranscribeTtml\r\n\r\nTranscribeDfxp\r\n\r\nTranscribeSmptett\r\n\r\nTranscribeXml\r\n\r\nTranscribeQt\r\n\r\nTranscribeRt\r\n\r\nTranscribeSsa\r\n\r\nTranscribeAss\r\n\r\nTranscribeSbv\r\n\r\nTranscribeSmi\r\n\r\nTranscribeSami\r\n\r\nTranscribeStl\r\n\r\nTranscribeSub\r\n\r\nAssociatedAsset\r\n\r\nMobiusLabsImageLabels\r\n\r\nMobiusLabsVideoLabels",
                "nullable": true
              },
              "metadataTypeDisplay": {
                "type": "string",
                "nullable": true
              },
              "mediaType": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "mediaTypeDisplay": {
                "type": "string",
                "nullable": true
              },
              "format": {
                "type": "string",
                "nullable": true
              },
              "templateName": {
                "type": "string",
                "nullable": true
              },
              "videoDuration": {
                "type": "string",
                "nullable": true
              },
              "contentLength": {
                "type": "integer",
                "format": "int64",
                "nullable": true
              },
              "isUrlSecure": {
                "type": "boolean",
                "nullable": true
              },
              "hasAds": {
                "type": "boolean",
                "nullable": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "AssetStatsModel": {
            "type": "object",
            "properties": {
              "mediaTypeCounts": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              },
              "assetTypeCounts": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              },
              "assetStatusCounts": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              },
              "totalContentLength": {
                "type": "integer",
                "format": "int64",
                "nullable": true
              },
              "totalContentLengthDisplay": {
                "type": "string",
                "nullable": true
              },
              "totalVideoDuration": {
                "type": "number",
                "format": "double",
                "nullable": true
              },
              "totalVideoDurationDisplay": {
                "type": "string",
                "nullable": true
              },
              "totalAudioDuration": {
                "type": "number",
                "format": "double",
                "nullable": true
              },
              "totalAudioDurationDisplay": {
                "type": "string",
                "nullable": true
              },
              "message": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "AssetStatuses": {
            "enum": [
              "Available",
              "Renaming",
              "Copying",
              "Restoring",
              "Registering",
              "Uploading",
              "Archiving",
              "Archived",
              "PendingArchive",
              "PendingRestore",
              "Restored",
              "Deleting",
              "Moving",
              "SlugReplaced",
              "Updating",
              "Error",
              "Assembling",
              "Clipping",
              "Placeholder"
            ],
            "type": "string",
            "description": "Available\r\n\r\nRenaming\r\n\r\nCopying\r\n\r\nRestoring\r\n\r\nRegistering\r\n\r\nUploading\r\n\r\nArchiving\r\n\r\nArchived\r\n\r\nPendingArchive\r\n\r\nPendingRestore\r\n\r\nRestored\r\n\r\nDeleting\r\n\r\nMoving\r\n\r\nSlugReplaced\r\n\r\nUpdating\r\n\r\nError\r\n\r\nAssembling\r\n\r\nClipping\r\n\r\nPlaceholder",
            "x-enumNames": [
              "Available",
              "Renaming",
              "Copying",
              "Restoring",
              "Registering",
              "Uploading",
              "Archiving",
              "Archived",
              "PendingArchive",
              "PendingRestore",
              "Restored",
              "Deleting",
              "Moving",
              "SlugReplaced",
              "Updating",
              "Error",
              "Assembling",
              "Clipping",
              "Placeholder"
            ]
          },
          "AssetTypes": {
            "enum": [
              "Folder",
              "File",
              "Bucket"
            ],
            "type": "string",
            "description": "Folder\r\n\r\nFile\r\n\r\nBucket",
            "x-enumNames": [
              "Folder",
              "File",
              "Bucket"
            ]
          },
          "AssetUploadCompletePartRequestModel": {
            "type": "object",
            "properties": {
              "etag": {
                "type": "string",
                "description": "The etag that was returned from the client upload",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "AssetUploadModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "The ID of the upload",
                "format": "uuid"
              },
              "assetId": {
                "type": "string",
                "description": "The Asset ID where the upload will become",
                "format": "uuid"
              },
              "etag": {
                "type": "string",
                "description": "Determines if the asset has been uploaded. If it has, the etag is there, else null.",
                "nullable": true
              },
              "url": {
                "type": "string",
                "description": "The URL of the upload",
                "nullable": true
              },
              "contentLength": {
                "type": "integer",
                "description": "The size of the file",
                "format": "int64"
              },
              "startDate": {
                "type": "string",
                "description": "The date the original upload was started",
                "format": "date-time"
              },
              "parts": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/AssetPartUploadModel"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "AssetUploadStartRequestModel": {
            "type": "object",
            "properties": {
              "existingAssetId": {
                "type": "string",
                "description": "The Existing AssetId (file) that should be overwritten with this upload.\r\nNote that by specifying this attribute then the parentId, relativePath and displayName are all ignored.",
                "format": "uuid",
                "nullable": true
              },
              "relatedAssetId": {
                "type": "string",
                "description": "The related asset ID of the existingAsset that we're replacing. If this is used, most of the other properties are not needed.",
                "format": "uuid",
                "nullable": true
              },
              "relatedContentId": {
                "type": "string",
                "description": "The Content ID of the related content record to associate this asset to.\r\nNote that by specifying this attribute then the parentId and relativePath attributes are both ignored.",
                "format": "uuid",
                "nullable": true
              },
              "parentId": {
                "type": "string",
                "description": "The Parent AssetId (folder) to add the upload to. Note that if there is a full relativePath, then it is appended to this parent path. If this value is omitted then the file will be added to the predefined incoming folder.\r\nThis is ignored if the ExistingAssetId or if the RelatedContentId has a value",
                "format": "uuid",
                "nullable": true
              },
              "relativePath": {
                "type": "string",
                "description": "The filename to upload - or a full path with the filename at the end.\r\nThis is ignored if the ExistingAssetId or if the RelatedContentId has a value",
                "nullable": true
              },
              "languageId": {
                "type": "string",
                "description": "The language of the asset to upload. If this is left blank then the default system language is used.",
                "format": "uuid",
                "nullable": true
              },
              "displayName": {
                "type": "string",
                "description": "The display name of the file to upload (does not include the path) and must include the file extension\r\nThis is ignored if the ExistingAssetId has a value",
                "nullable": true
              },
              "contentLength": {
                "type": "integer",
                "description": "The size of the asset to upload. This is used to calculate the upload parts.",
                "format": "int64"
              },
              "chunkSize": {
                "type": "integer",
                "description": "The size of the upload chunks. This should be adjusted to optimize the upload size based on the user's internet connection.",
                "format": "int64"
              },
              "uploadOverwriteOption": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/UploadOverwriteOptions"
                  }
                ],
                "description": "If the file already exists on the server, this decides how to handle the situation\r\n\r\nCancel\r\n\r\nContinue\r\n\r\nReplace",
                "x-enumNames": [
                  "Cancel",
                  "Continue",
                  "Replace"
                ]
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "The additional custom properties for the uploaded file",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "BatchModel": {
            "type": "object",
            "properties": {
              "batchAction": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "contentDefinitionId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "schemaName": {
                "type": "string",
                "nullable": true
              },
              "targetIds": {
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uuid"
                },
                "nullable": true
              },
              "userId": {
                "type": "string",
                "format": "uuid"
              },
              "actionArguments": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "BatchResultModel": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": {}
                },
                "nullable": true
              },
              "totalItemCount": {
                "type": "integer",
                "format": "int64"
              }
            },
            "additionalProperties": false
          },
          "BoundingBoxModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "sourceId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "confidence": {
                "type": "number",
                "format": "double"
              },
              "top": {
                "type": "number",
                "format": "double"
              },
              "left": {
                "type": "number",
                "format": "double"
              },
              "height": {
                "type": "number",
                "format": "double"
              },
              "width": {
                "type": "number",
                "format": "double"
              }
            },
            "additionalProperties": false
          },
          "ChangeAssetLanguageModel": {
            "type": "object",
            "properties": {
              "languageId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "ChangeAssetPropertiesModel": {
            "type": "object",
            "properties": {
              "displayName": {
                "type": "string",
                "description": "The visual name of the asset for display purposes",
                "nullable": true
              },
              "displayDate": {
                "type": "string",
                "description": "The visual date of the asset for display purposes",
                "format": "date-time",
                "nullable": true
              },
              "customProperties": {
                "type": "object",
                "additionalProperties": {},
                "description": "A list of custom properties that should be saved for the asset. To remove a property value, set the value to null",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "ChangeEmailRequestModel": {
            "type": "object",
            "properties": {
              "password": {
                "type": "string",
                "description": "The existing password of the user for verification",
                "nullable": true
              },
              "newEmail": {
                "type": "string",
                "description": "The new email of the user",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "ChangePasswordRequestModel": {
            "type": "object",
            "properties": {
              "password": {
                "type": "string",
                "description": "The existing password of the user for verification",
                "nullable": true
              },
              "newPassword": {
                "type": "string",
                "description": "The new password of the user",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "ChangeSessionStatusModel": {
            "required": [
              "id",
              "userSessionStatus"
            ],
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "userSessionStatus": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/UserSessionStatuses"
                  }
                ],
                "description": "Normal\r\n\r\nChatDisabled\r\n\r\nSessionReplaced\r\n\r\nDeactivated\r\n\r\nSharedAccess\r\n\r\nPendingInvite\r\n\r\nExpired\r\n\r\nDeletedInvite",
                "x-enumNames": [
                  "Normal",
                  "ChatDisabled",
                  "SessionReplaced",
                  "Deactivated",
                  "SharedAccess",
                  "PendingInvite",
                  "Expired",
                  "DeletedInvite"
                ]
              },
              "applicationId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "Claim": {
            "type": "object",
            "properties": {
              "issuer": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "originalIssuer": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {
                  "type": "string"
                },
                "nullable": true,
                "readOnly": true
              },
              "subject": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ClaimsIdentity"
                  }
                ],
                "nullable": true,
                "readOnly": true
              },
              "type": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "value": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "valueType": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "ClaimsIdentity": {
            "type": "object",
            "properties": {
              "authenticationType": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "isAuthenticated": {
                "type": "boolean",
                "readOnly": true
              },
              "actor": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ClaimsIdentity"
                  }
                ],
                "nullable": true
              },
              "bootstrapContext": {
                "nullable": true
              },
              "claims": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Claim"
                },
                "nullable": true,
                "readOnly": true
              },
              "label": {
                "type": "string",
                "nullable": true
              },
              "name": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "nameClaimType": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "roleClaimType": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "ClipModel": {
            "type": "object",
            "properties": {
              "startTimeCode": {
                "type": "string",
                "nullable": true
              },
              "endTimeCode": {
                "type": "string",
                "nullable": true
              },
              "title": {
                "type": "string",
                "nullable": true
              },
              "outputFolderId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "tags": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "collections": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "relatedContent": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "CloudFrontDistributions": {
            "enum": [
              "Content",
              "PublicApi",
              "RestrictedContent"
            ],
            "type": "string",
            "description": "Content\r\n\r\nPublicApi\r\n\r\nRestrictedContent",
            "x-enumNames": [
              "Content",
              "PublicApi",
              "RestrictedContent"
            ]
          },
          "CollectionContentModel": {
            "type": "object",
            "properties": {
              "contentDefinition": {
                "type": "string",
                "description": "The content definition string name of the content records that should be affected",
                "nullable": true
              },
              "contentId": {
                "type": "string",
                "description": "The ID of the content record to apply the new or removed attributes",
                "format": "uuid"
              },
              "createNew": {
                "type": "boolean",
                "description": "Defaults to True. If true, then the attribute will be added if it doesn't already exist with a matching name"
              },
              "collectionId": {
                "type": "string",
                "description": "The collection ID that should be added or removed",
                "format": "uuid",
                "nullable": true
              },
              "name": {
                "type": "string",
                "description": "The name of the collection that should be added or removed. If the name and the collectionId are both specified, the name is ignored.",
                "nullable": true
              },
              "childId": {
                "type": "string",
                "format": "uuid",
                "nullable": true,
                "readOnly": true
              },
              "childPropertyName": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "CollectionContentModelListModel": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/CollectionContentModel"
                },
                "nullable": true
              },
              "hasItems": {
                "type": "boolean",
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "CollectionModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "name": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "ConfigTypes": {
            "enum": [
              1,
              2,
              3
            ],
            "type": "integer",
            "description": "1 = Admin\r\n\r\n2 = Lambda\r\n\r\n3 = Groundtruth",
            "format": "int32",
            "x-enumNames": [
              "Admin",
              "Lambda",
              "Groundtruth"
            ]
          },
          "ContentDefinitionGroupModel": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string",
                "nullable": true
              },
              "contentDefinitionGroupId": {
                "type": "string",
                "format": "uuid"
              },
              "contentDefinitions": {
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uuid"
                },
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "ContentDefinitionGroupModelListResultModel": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/ContentDefinitionGroupModel"
                },
                "nullable": true
              },
              "totalItemCount": {
                "type": "integer",
                "format": "int64"
              },
              "nextPageOffset": {
                "nullable": true
              },
              "hasItems": {
                "type": "boolean",
                "readOnly": true
              },
              "relatedItems": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/ContentDefinitionGroupModel"
                },
                "nullable": true
              },
              "message": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "ContentDefinitionModel": {
            "type": "object",
            "properties": {
              "contentDefinitionId": {
                "type": "string",
                "format": "uuid"
              },
              "createdDate": {
                "type": "string",
                "format": "date-time"
              },
              "lastModifiedDate": {
                "type": "string",
                "format": "date-time"
              },
              "editorTemplate": {
                "type": "string",
                "nullable": true
              },
              "sampleTemplate": {
                "type": "string",
                "nullable": true
              },
              "isSystemModule": {
                "type": "boolean"
              },
              "useEditorFormOverride": {
                "type": "boolean"
              },
              "templateFolderAssetId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "contentFields": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/ContentFieldModel"
                },
                "nullable": true,
                "readOnly": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "ContentFieldModel": {
            "type": "object",
            "properties": {
              "contentFieldId": {
                "type": "string",
                "format": "uuid"
              },
              "createdDate": {
                "type": "string",
                "format": "date-time"
              },
              "lastModifiedDate": {
                "type": "string",
                "format": "date-time"
              },
              "listViewSequence": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "editorViewSequence": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "isInEditorForm": {
                "type": "boolean"
              },
              "isInContentList": {
                "type": "boolean"
              },
              "isDeleted": {
                "type": "boolean"
              },
              "isSystemField": {
                "type": "boolean"
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "ContentInstanceModel": {
            "type": "object",
            "properties": {
              "dropZone": {
                "type": "string",
                "nullable": true
              },
              "contentInstanceId": {
                "type": "string",
                "format": "uuid"
              },
              "pageId": {
                "type": "string",
                "format": "uuid"
              },
              "parentContentInstanceId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "contentDefinitionId": {
                "type": "string",
                "format": "uuid"
              },
              "createdDate": {
                "type": "string",
                "format": "date-time"
              },
              "lastModifiedDate": {
                "type": "string",
                "format": "date-time"
              },
              "rankSeq": {
                "type": "integer",
                "format": "int32"
              },
              "contentInstances": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/ContentInstanceModel"
                },
                "nullable": true,
                "readOnly": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "ContentLanguageStatuses": {
            "enum": [
              "Original",
              "Override",
              "Auto"
            ],
            "type": "string",
            "description": "Original\r\n\r\nOverride\r\n\r\nAuto",
            "x-enumNames": [
              "Original",
              "Override",
              "Auto"
            ]
          },
          "ContentManagementTypes": {
            "enum": [
              1,
              2,
              3
            ],
            "type": "integer",
            "description": "1 = None\r\n\r\n2 = DataSelector\r\n\r\n3 = FormSelector",
            "format": "int32",
            "x-enumNames": [
              "None",
              "DataSelector",
              "FormSelector"
            ]
          },
          "ContentSecurityAttributes": {
            "enum": [
              "Undefined",
              "Guest",
              "Demo"
            ],
            "type": "string",
            "description": "Undefined\r\n\r\nGuest\r\n\r\nDemo",
            "x-enumNames": [
              "Undefined",
              "Guest",
              "Demo"
            ]
          },
          "ContentTextTypes": {
            "enum": [
              "Line",
              "Word",
              "Person",
              "Location",
              "Organization",
              "CommercialItem",
              "Event",
              "Date",
              "Quantity",
              "Title",
              "Entity",
              "KeyPhrase",
              "MixedSentiment",
              "NegativeSentiment",
              "NeutralSentiment",
              "PositiveSentiment",
              "Transcript",
              "Other"
            ],
            "type": "string",
            "description": "Line\r\n\r\nWord\r\n\r\nPerson\r\n\r\nLocation\r\n\r\nOrganization\r\n\r\nCommercialItem\r\n\r\nEvent\r\n\r\nDate\r\n\r\nQuantity\r\n\r\nTitle\r\n\r\nEntity\r\n\r\nKeyPhrase\r\n\r\nMixedSentiment\r\n\r\nNegativeSentiment\r\n\r\nNeutralSentiment\r\n\r\nPositiveSentiment\r\n\r\nTranscript\r\n\r\nOther",
            "x-enumNames": [
              "Line",
              "Word",
              "Person",
              "Location",
              "Organization",
              "CommercialItem",
              "Event",
              "Date",
              "Quantity",
              "Title",
              "Entity",
              "KeyPhrase",
              "MixedSentiment",
              "NegativeSentiment",
              "NeutralSentiment",
              "PositiveSentiment",
              "Transcript",
              "Other"
            ]
          },
          "ContentTypeModel": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string",
                "nullable": true
              },
              "contentTypeId": {
                "type": "string",
                "format": "uuid"
              },
              "typeName": {
                "type": "string",
                "nullable": true
              },
              "contentManagementType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ContentManagementTypes"
                  }
                ],
                "description": "1 = None\r\n\r\n2 = DataSelector\r\n\r\n3 = FormSelector",
                "x-enumNames": [
                  "None",
                  "DataSelector",
                  "FormSelector"
                ]
              },
              "hasLayout": {
                "type": "boolean"
              }
            },
            "additionalProperties": false
          },
          "ContentTypeModelListResultModel": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/ContentTypeModel"
                },
                "nullable": true
              },
              "totalItemCount": {
                "type": "integer",
                "format": "int64"
              },
              "nextPageOffset": {
                "nullable": true
              },
              "hasItems": {
                "type": "boolean",
                "readOnly": true
              },
              "relatedItems": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/ContentTypeModel"
                },
                "nullable": true
              },
              "message": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "ContentUpdateModel": {
            "type": "object",
            "properties": {
              "contentId": {
                "type": "string",
                "format": "uuid"
              },
              "masterId": {
                "type": "string",
                "format": "uuid"
              },
              "contentDefinitionId": {
                "type": "string",
                "format": "uuid"
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "CreateFolderModel": {
            "required": [
              "displayName"
            ],
            "type": "object",
            "properties": {
              "displayName": {
                "minLength": 1,
                "type": "string",
                "description": "The visual name of the new folder. It can contain spaces and other characters."
              }
            },
            "additionalProperties": false
          },
          "CreateLiveOperatorSegmentRequestModel": {
            "type": "object",
            "properties": {
              "liveOperatorId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "relatedContent": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "tags": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "CreateLiveOperatorStreamRequestModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "preRollAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "postRollAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "liveInput": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "relatedContent": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "tags": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "liveChannelId": {
                "type": "string",
                "format": "uuid"
              },
              "customProperties": {
                "type": "object",
                "additionalProperties": {
                  "type": "string"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "CreateLiveOperatorStreamResponseModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "liveChannel": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "liveOperatorStatus": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LiveOperatorStatuses"
                  }
                ],
                "description": "PreRoll\r\n\r\nRunning\r\n\r\nCreatingSegment\r\n\r\nError\r\n\r\nPostRoll\r\n\r\nStarting\r\n\r\nStopping\r\n\r\nStopped",
                "x-enumNames": [
                  "PreRoll",
                  "Running",
                  "CreatingSegment",
                  "Error",
                  "PostRoll",
                  "Starting",
                  "Stopping",
                  "Stopped"
                ]
              },
              "liveOperatorMode": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LiveOperatorModes"
                  }
                ],
                "description": "Manual\r\n\r\nIVS\r\n\r\nMediaLive\r\n\r\nRealtime",
                "x-enumNames": [
                  "Manual",
                  "IVS",
                  "MediaLive",
                  "Realtime"
                ]
              }
            },
            "additionalProperties": false
          },
          "CreatePlaceholderModel": {
            "required": [
              "assetName"
            ],
            "type": "object",
            "properties": {
              "assetName": {
                "minLength": 1,
                "type": "string",
                "description": "The visual name of the new placeholder. It can contain spaces and other characters,\r\nmust contain file extension"
              }
            },
            "additionalProperties": false
          },
          "EmailDispatcherModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "emailType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/EmailTypes"
                  }
                ],
                "description": "AssetRestored\r\n\r\nUserApproved\r\n\r\nCollectionShared\r\n\r\nCollectionSharedExternal\r\n\r\nUserInvite",
                "x-enumNames": [
                  "AssetRestored",
                  "UserApproved",
                  "CollectionShared",
                  "CollectionSharedExternal",
                  "UserInvite"
                ]
              },
              "userId": {
                "type": "string",
                "format": "uuid"
              },
              "assetId": {
                "type": "string",
                "format": "uuid"
              },
              "userFirstName": {
                "type": "string",
                "nullable": true
              },
              "userLastName": {
                "type": "string",
                "nullable": true
              },
              "userEmail": {
                "type": "string",
                "nullable": true
              },
              "assetName": {
                "type": "string",
                "nullable": true
              },
              "recipients": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "nullable": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "EmailTypes": {
            "enum": [
              "AssetRestored",
              "UserApproved",
              "CollectionShared",
              "CollectionSharedExternal",
              "UserInvite"
            ],
            "type": "string",
            "description": "AssetRestored\r\n\r\nUserApproved\r\n\r\nCollectionShared\r\n\r\nCollectionSharedExternal\r\n\r\nUserInvite",
            "x-enumNames": [
              "AssetRestored",
              "UserApproved",
              "CollectionShared",
              "CollectionSharedExternal",
              "UserInvite"
            ]
          },
          "FaceMatchTypes": {
            "enum": [
              "Automatch",
              "ProbableMatch",
              "NotMatch",
              "ConfirmedMatch",
              "Blurry"
            ],
            "type": "string",
            "description": "Automatch\r\n\r\nProbableMatch\r\n\r\nNotMatch\r\n\r\nConfirmedMatch\r\n\r\nBlurry",
            "x-enumNames": [
              "Automatch",
              "ProbableMatch",
              "NotMatch",
              "ConfirmedMatch",
              "Blurry"
            ]
          },
          "FaceModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "confidence": {
                "type": "number",
                "format": "double"
              },
              "externalFaceId": {
                "type": "string",
                "nullable": true
              },
              "boundingBoxes": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/BoundingBoxModel"
                },
                "nullable": true
              },
              "sourceId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "similarityScore": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "personId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "segments": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/SegmentModel"
                },
                "nullable": true
              },
              "rotationCorrection": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "celebrityExternalId": {
                "type": "string",
                "nullable": true
              },
              "celebrityConfidence": {
                "type": "number",
                "format": "double",
                "nullable": true
              },
              "celebrityName": {
                "type": "string",
                "nullable": true
              },
              "celebrityUrls": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "FieldModel": {
            "type": "object",
            "properties": {
              "fieldId": {
                "type": "string",
                "format": "uuid"
              },
              "title": {
                "type": "string",
                "nullable": true
              },
              "typeName": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "FieldModelListResultModel": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/FieldModel"
                },
                "nullable": true
              },
              "totalItemCount": {
                "type": "integer",
                "format": "int64"
              },
              "nextPageOffset": {
                "nullable": true
              },
              "hasItems": {
                "type": "boolean",
                "readOnly": true
              },
              "relatedItems": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/FieldModel"
                },
                "nullable": true
              },
              "message": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "ForgotPasswordRequestModel": {
            "required": [
              "userName"
            ],
            "type": "object",
            "properties": {
              "userName": {
                "minLength": 1,
                "type": "string",
                "description": "Username"
              }
            },
            "additionalProperties": false
          },
          "IdModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              }
            },
            "additionalProperties": false
          },
          "InvalidateDistributionModel": {
            "type": "object",
            "properties": {
              "cloudFrontDistribution": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/CloudFrontDistributions"
                  }
                ],
                "description": "Content\r\n\r\nPublicApi\r\n\r\nRestrictedContent",
                "x-enumNames": [
                  "Content",
                  "PublicApi",
                  "RestrictedContent"
                ]
              },
              "path": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LabelModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "labelName": {
                "type": "string",
                "nullable": true
              },
              "confidence": {
                "type": "number",
                "format": "double",
                "nullable": true
              },
              "count": {
                "type": "integer",
                "format": "int64",
                "nullable": true
              },
              "segments": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/SegmentModel"
                },
                "nullable": true
              },
              "children": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LabelModel"
                },
                "nullable": true
              },
              "boundingBoxes": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/BoundingBoxModel"
                },
                "nullable": true
              },
              "sourceId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "rollupCount": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "rollupConfidence": {
                "type": "number",
                "format": "double",
                "nullable": true
              },
              "metadataType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/MetadataTypes"
                  }
                ],
                "description": "DocumentContent\r\n\r\nComprehendKeyPhrases\r\n\r\nComprehendEntities\r\n\r\nRekognitionImageIndexFaces\r\n\r\nRekognitionImageSearchFaces\r\n\r\nRekognitionImageLabels\r\n\r\nRekognitionImageCelebrityRecognition\r\n\r\nRekognitionVideoLabels\r\n\r\nTextractAnalyzeDocument\r\n\r\nTranscribe\r\n\r\nTranscribeVtt\r\n\r\nTranscribeTranslation\r\n\r\nTranscribeVttTranslation\r\n\r\nRekognitionVideoCelebrityRecognition\r\n\r\nRekognitionVideoPersonTracking\r\n\r\nRekognitionVideoFaceDetection\r\n\r\nImageInfo\r\n\r\nTranscode\r\n\r\nClip\r\n\r\nMediaInfo\r\n\r\nRekognitionImageDetectText\r\n\r\nRekognitionImageUnsafeContent\r\n\r\nRekognitionVideoUnsafeContent\r\n\r\nScreenshot\r\n\r\nSageMakerGroundTruthLabelResults\r\n\r\nThumbnailSheet\r\n\r\nThumbnailImage\r\n\r\nSageMakerInvokeEndpointResults\r\n\r\nSageMakerModelLabels\r\n\r\nRekognitionImageCustomLabels\r\n\r\nSageMakerManifest\r\n\r\nPreviewImage\r\n\r\nRekognitionVideoTextDetection\r\n\r\nRekognitionVideoSegmentDetection\r\n\r\nNomadVideoSegmentDetection\r\n\r\nTranscribeMedical\r\n\r\nPreviewAudio\r\n\r\nText\r\n\r\nAssetManifest\r\n\r\nIntervalSegments\r\n\r\nTranscribeMedicalText\r\n\r\nTranscribeMedicalTranslation\r\n\r\nAdobeMetadata\r\n\r\nAdobeMetadataText\r\n\r\nImageExif\r\n\r\nTextractImageDetectText\r\n\r\nAdSegments\r\n\r\nVmap\r\n\r\nVast\r\n\r\nMediaTailorVideo\r\n\r\nTranscribeSrt\r\n\r\nTranscribeRaw\r\n\r\nSubtitles\r\n\r\nVizRtMetadata\r\n\r\nProcessorJobs\r\n\r\nOfficeDocument\r\n\r\nTranscriptionContainer\r\n\r\nComprehendSentiment\r\n\r\nComprehendLanguage\r\n\r\nOriginalSourceVideo\r\n\r\nImportManifest\r\n\r\nTranscribeScc\r\n\r\nTranscribeTtml\r\n\r\nTranscribeDfxp\r\n\r\nTranscribeSmptett\r\n\r\nTranscribeXml\r\n\r\nTranscribeQt\r\n\r\nTranscribeRt\r\n\r\nTranscribeSsa\r\n\r\nTranscribeAss\r\n\r\nTranscribeSbv\r\n\r\nTranscribeSmi\r\n\r\nTranscribeSami\r\n\r\nTranscribeStl\r\n\r\nTranscribeSub\r\n\r\nAssociatedAsset\r\n\r\nMobiusLabsImageLabels\r\n\r\nMobiusLabsVideoLabels",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LanguageModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "title": {
                "type": "string",
                "nullable": true
              },
              "translatedTitle": {
                "type": "string",
                "nullable": true
              },
              "iso2": {
                "type": "string",
                "nullable": true
              },
              "iso5": {
                "type": "string",
                "nullable": true
              },
              "score": {
                "type": "number",
                "format": "float",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveChannelEditModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "thumbnailImage": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "archiveFolderAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "archivePrefixes": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "routeName": {
                "type": "string",
                "nullable": true
              },
              "externalUrl": {
                "type": "string",
                "nullable": true
              },
              "isSecureOutput": {
                "type": "boolean"
              },
              "mediaPackageOutputChannelId": {
                "type": "string",
                "nullable": true
              },
              "outputType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "outputScreenshots": {
                "type": "boolean"
              },
              "outputProfiles": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveChannelModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "routeName": {
                "type": "string",
                "nullable": true
              },
              "isSecureOutput": {
                "type": "boolean"
              },
              "outputScreenshots": {
                "type": "boolean"
              },
              "mediaPackageOutputChannelId": {
                "type": "string",
                "nullable": true
              },
              "thumbnailImageUrl": {
                "type": "string",
                "nullable": true
              },
              "thumbnailImage": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "archiveFolderAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "channelId": {
                "type": "string",
                "nullable": true
              },
              "type": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "outputType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "status": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "recordingStatus": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "statusMessage": {
                "type": "string",
                "nullable": true
              },
              "outputStartTime": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "inputMaximumBitrate": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "inputResolution": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "inputCodec": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "outputLiveVideoUrl": {
                "type": "string",
                "nullable": true
              },
              "inputIngestAddress": {
                "type": "string",
                "nullable": true
              },
              "inputStreamKey": {
                "type": "string",
                "nullable": true
              },
              "scheduleEvents": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LiveScheduleEventModel"
                },
                "nullable": true
              },
              "lastModifiedDate": {
                "type": "string",
                "format": "date-time"
              },
              "statusMessages": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "nullable": true,
                "readOnly": true
              },
              "outputProfiles": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "archivePrefixes": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveChannelModelLiveResultModel": {
            "type": "object",
            "properties": {
              "requestId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "changeList": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LiveChannelModel"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveChannelNewModel": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "nullable": true
              },
              "routeName": {
                "type": "string",
                "nullable": true
              },
              "isSecureOutput": {
                "type": "boolean"
              },
              "outputScreenshots": {
                "type": "boolean"
              },
              "mediaPackageOutputChannelId": {
                "type": "string",
                "nullable": true
              },
              "thumbnailImage": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "externalUrl": {
                "type": "string",
                "nullable": true
              },
              "archiveFolderAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "archivePrefixes": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "type": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "outputType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "outputProfiles": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveEndpointInfoModel": {
            "type": "object",
            "properties": {
              "ip": {
                "type": "string",
                "nullable": true
              },
              "port": {
                "type": "string",
                "nullable": true
              },
              "url": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveInputEditModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "internalName": {
                "type": "string",
                "nullable": true
              },
              "sourceCidr": {
                "type": "string",
                "nullable": true
              },
              "destinations": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LiveEndpointInfoModel"
                },
                "description": "Sources must be URLs and are only valid for input types: URL_PULL, MP4_FILE",
                "nullable": true
              },
              "sources": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LiveEndpointInfoModel"
                },
                "description": "Sources must be URLs and are only valid for input types: RTMP_PULL",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveInputModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "internalName": {
                "type": "string",
                "nullable": true
              },
              "sourceCidr": {
                "type": "string",
                "nullable": true
              },
              "resourceName": {
                "type": "string",
                "nullable": true
              },
              "inputId": {
                "type": "string",
                "nullable": true
              },
              "status": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "statusMessage": {
                "type": "string",
                "nullable": true
              },
              "type": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "thumbnailUrl": {
                "type": "string",
                "nullable": true
              },
              "videoAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "destinations": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LiveEndpointInfoModel"
                },
                "nullable": true
              },
              "sources": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LiveEndpointInfoModel"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveInputModelLiveResultModel": {
            "type": "object",
            "properties": {
              "requestId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "changeList": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LiveInputModel"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveInputNewModel": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "nullable": true
              },
              "internalName": {
                "type": "string",
                "nullable": true
              },
              "sourceCidr": {
                "type": "string",
                "nullable": true
              },
              "type": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "isStandard": {
                "type": "boolean"
              },
              "videoAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "destinations": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LiveEndpointInfoModel"
                },
                "description": "Sources must be URLs and are only valid for input types: RTMP_PUSH, URL_PULL, MP4_FILE",
                "nullable": true
              },
              "sources": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LiveEndpointInfoModel"
                },
                "description": "Sources must be URLs and are only valid for input types: RTMP_PULL",
                "nullable": true
              }
            },
            "additionalProperties": false,
            "description": "NOTE: MediaConnect input creation not supported"
          },
          "LiveOperatorModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "liveOperatorStatus": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LiveOperatorStatuses"
                  }
                ],
                "description": "PreRoll\r\n\r\nRunning\r\n\r\nCreatingSegment\r\n\r\nError\r\n\r\nPostRoll\r\n\r\nStarting\r\n\r\nStopping\r\n\r\nStopped",
                "x-enumNames": [
                  "PreRoll",
                  "Running",
                  "CreatingSegment",
                  "Error",
                  "PostRoll",
                  "Starting",
                  "Stopping",
                  "Stopped"
                ]
              },
              "liveChannelType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "liveRecordingStatus": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "liveOperatorMode": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LiveOperatorModes"
                  }
                ],
                "description": "Manual\r\n\r\nIVS\r\n\r\nMediaLive\r\n\r\nRealtime",
                "x-enumNames": [
                  "Manual",
                  "IVS",
                  "MediaLive",
                  "Realtime"
                ]
              },
              "liveChannel": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "startRecordingTime": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "liveInput": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "segmentStartTime": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "isCompleted": {
                "type": "boolean",
                "nullable": true
              },
              "isSecureOutput": {
                "type": "boolean",
                "nullable": true
              },
              "preRollAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "postRollAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "tags": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "relatedContent": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "collections": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "labels": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "statusMessage": {
                "type": "string",
                "nullable": true
              },
              "segments": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/AssetReferenceModel"
                },
                "nullable": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              },
              "customProperties": {
                "type": "object",
                "additionalProperties": {
                  "type": "string"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveOperatorModes": {
            "enum": [
              "Manual",
              "IVS",
              "MediaLive",
              "Realtime"
            ],
            "type": "string",
            "description": "Manual\r\n\r\nIVS\r\n\r\nMediaLive\r\n\r\nRealtime",
            "x-enumNames": [
              "Manual",
              "IVS",
              "MediaLive",
              "Realtime"
            ]
          },
          "LiveOperatorStatuses": {
            "enum": [
              "PreRoll",
              "Running",
              "CreatingSegment",
              "Error",
              "PostRoll",
              "Starting",
              "Stopping",
              "Stopped"
            ],
            "type": "string",
            "description": "PreRoll\r\n\r\nRunning\r\n\r\nCreatingSegment\r\n\r\nError\r\n\r\nPostRoll\r\n\r\nStarting\r\n\r\nStopping\r\n\r\nStopped",
            "x-enumNames": [
              "PreRoll",
              "Running",
              "CreatingSegment",
              "Error",
              "PostRoll",
              "Starting",
              "Stopping",
              "Stopped"
            ]
          },
          "LiveOutputProfileModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "manifestType": {
                "type": "string",
                "description": "Video Package Manifest Type. Possible Values:\r\n HLS\r\n DASH",
                "nullable": true
              },
              "videoCodec": {
                "type": "string",
                "description": "Video Encoding Format. Possible Values:\r\n H264\r\n H265",
                "nullable": true
              },
              "videoPixelWidth": {
                "type": "integer",
                "format": "int32"
              },
              "videoPixelHeight": {
                "type": "integer",
                "format": "int32"
              },
              "videoBitrateMode": {
                "type": "string",
                "description": "Video Bitrate Mode. Possible values:\r\n CBR\r\n VBR",
                "nullable": true
              },
              "videoBitsPerSecond": {
                "type": "integer",
                "format": "int32"
              },
              "videoFramesPerSecond": {
                "type": "number",
                "format": "float"
              },
              "audioBitsPerSecond": {
                "type": "integer",
                "format": "int32"
              },
              "properties": {
                "type": "object",
                "additionalProperties": {
                  "nullable": true
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveScheduleEventEditModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "channelId": {
                "type": "string",
                "format": "uuid"
              },
              "thumbnail": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "startOffsetTimeCode": {
                "type": "string",
                "nullable": true
              },
              "fixedOnAirTimeUtc": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "durationTimeCode": {
                "type": "string",
                "nullable": true
              },
              "isLoop": {
                "type": "boolean"
              },
              "asset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "liveInput": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "liveInput2": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveScheduleEventModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "previousId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "internalName": {
                "type": "string",
                "nullable": true
              },
              "channelId": {
                "type": "string",
                "format": "uuid"
              },
              "thumbnailUrl": {
                "type": "string",
                "nullable": true
              },
              "startOffsetTimeCode": {
                "type": "string",
                "nullable": true
              },
              "fixedOnAirTimeUtc": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "durationTimeCode": {
                "type": "string",
                "nullable": true
              },
              "isLoop": {
                "type": "boolean"
              },
              "type": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "asset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "liveInput": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "liveInput2": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "status": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "statusMessage": {
                "type": "string",
                "nullable": true
              },
              "startTimeUtc": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveScheduleEventMoveModel": {
            "type": "object",
            "properties": {
              "previousScheduleEventId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveScheduleEventNewModel": {
            "type": "object",
            "properties": {
              "previousId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "channelId": {
                "type": "string",
                "format": "uuid"
              },
              "startOffsetTimeCode": {
                "type": "string",
                "nullable": true
              },
              "fixedOnAirTimeUtc": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "durationTimeCode": {
                "type": "string",
                "nullable": true
              },
              "isLoop": {
                "type": "boolean"
              },
              "thumbnail": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "type": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "asset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "liveInput": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "liveInput2": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LiveScheduleEventResultModel": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LiveScheduleEventModel"
                },
                "nullable": true
              },
              "totalItemCount": {
                "type": "integer",
                "format": "int64"
              },
              "nextPageOffset": {
                "nullable": true
              },
              "hasItems": {
                "type": "boolean",
                "readOnly": true
              },
              "relatedItems": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LiveScheduleEventModel"
                },
                "nullable": true
              },
              "message": {
                "type": "string",
                "nullable": true
              },
              "requestId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "changeList": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LiveScheduleEventModel"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LoginCookieModel": {
            "type": "object",
            "properties": {
              "path": {
                "type": "string",
                "nullable": true
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "expires": {
                "type": "string",
                "format": "date-time"
              },
              "value": {
                "type": "string",
                "nullable": true
              },
              "domain": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LoginRequestModel": {
            "required": [
              "password",
              "userName"
            ],
            "type": "object",
            "properties": {
              "userName": {
                "minLength": 1,
                "type": "string",
                "description": "Username"
              },
              "password": {
                "minLength": 1,
                "type": "string",
                "description": "Current password"
              },
              "token": {
                "type": "string",
                "description": "Assigned token if available",
                "nullable": true
              },
              "newPassword": {
                "type": "string",
                "description": "The new password to set if the account requires a password change",
                "nullable": true
              },
              "applicationId": {
                "type": "string",
                "description": "The Application Id the user is logging in from",
                "format": "uuid",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LoginResponseStatuses": {
            "enum": [
              "TwoFactorSetupRequired",
              "TwoFactorCodeRequired",
              "IsDisabled",
              "IsPendingEmailConfirmation",
              "IsPendingNewAccountSignup",
              "IsPendingAccountMigrationSignup",
              "IsPendingNewPassword",
              "IsExpired",
              "IsPendingInvitation"
            ],
            "type": "string",
            "description": "TwoFactorSetupRequired\r\n\r\nTwoFactorCodeRequired\r\n\r\nIsDisabled\r\n\r\nIsPendingEmailConfirmation\r\n\r\nIsPendingNewAccountSignup\r\n\r\nIsPendingAccountMigrationSignup\r\n\r\nIsPendingNewPassword\r\n\r\nIsExpired\r\n\r\nIsPendingInvitation",
            "x-enumNames": [
              "TwoFactorSetupRequired",
              "TwoFactorCodeRequired",
              "IsDisabled",
              "IsPendingEmailConfirmation",
              "IsPendingNewAccountSignup",
              "IsPendingAccountMigrationSignup",
              "IsPendingNewPassword",
              "IsExpired",
              "IsPendingInvitation"
            ]
          },
          "LogoutRequestModel": {
            "type": "object",
            "properties": {
              "userSessionId": {
                "type": "string",
                "description": "Username",
                "format": "uuid",
                "nullable": true
              },
              "applicationId": {
                "type": "string",
                "description": "The Application Id the user is logging in from",
                "format": "uuid",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LookupModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "Primary key associated with model instance.",
                "format": "uuid"
              },
              "enumValue": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "description": {
                "type": "string",
                "nullable": true
              },
              "type": {
                "type": "string",
                "nullable": true
              },
              "lookupTypeId": {
                "type": "string",
                "format": "uuid"
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "title": {
                "type": "string",
                "nullable": true
              },
              "lookupId": {
                "type": "string",
                "format": "uuid",
                "nullable": true,
                "deprecated": true
              },
              "fullUrl": {
                "type": "string",
                "nullable": true
              },
              "screenshotUrl": {
                "type": "string",
                "nullable": true
              },
              "rankSeq": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "enumName": {
                "type": "string",
                "nullable": true,
                "deprecated": true
              },
              "description2": {
                "type": "string",
                "nullable": true
              },
              "description3": {
                "type": "string",
                "nullable": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "LookupTypes": {
            "enum": [
              "PageTemplates",
              "Fields",
              "LookupTypes",
              "ContentTemplates",
              "ContentDefinitions",
              "ContentTypes",
              "ContentDefinitionGroups",
              "WorkflowStatuses",
              "DataSelectorContentDefinitions",
              "Content",
              "TemplatePacks",
              "PopularTags",
              "AllTags",
              "PropertyValues",
              "MediaTypes",
              "AssetTypes",
              "ContentFields",
              "FormSelectorContentDefinitions",
              "CustomRenderers",
              "ConstantContactCampaigns",
              "Languages",
              "SecurityGroups",
              "Collections",
              "Permissions",
              "CustomLabelerTypes",
              "CustomLabelerStatuses",
              "Labels",
              "Users",
              "MeetingSources",
              "LiveScheduleEventStatuses",
              "LiveScheduleEventTypes",
              "LiveChannelStatuses",
              "LiveInputCodecs",
              "LiveInputMaximumBitrates",
              "LiveInputResolutions",
              "LiveInputStatuses",
              "LiveInputTypes",
              "NodeTypes",
              "LiveChannelTypes",
              "LiveOutputProfiles",
              "LiveOutputTypes",
              "Roles",
              "NewsSystems",
              "NprProfileTypes",
              "PaymentStatuses",
              "PingStatuses",
              "PropertyValueTypes",
              "ScheduleItemSearchTypes",
              "ScheduleItemSourceTypes",
              "ScheduleItemTypes",
              "ScheduleStatuses",
              "ScheduleTypes",
              "SecurityPermissions",
              "StorageClasses",
              "SubtitleTypes",
              "SubtitleValueTypes",
              "TextEntityTypes",
              "UploadOverwriteOptions",
              "UserSessionStatuses",
              "VideoSegmentTypes",
              "LiveOperatorModes",
              "VideoTrackingEvents",
              "BatchActionProcessorExecutionTypes",
              "VideoTrackingAttributes",
              "ContentSecurityAttributes",
              "TemplatePackTypes",
              "AdServerTypes",
              "AdSlotTypes",
              "AssetRestoreTiers",
              "AssetStatuses",
              "BatchActions",
              "BucketTypes",
              "CloudFrontDistributions",
              "ContentAttributes",
              "ContentLanguageStatuses",
              "ContentTextTypes",
              "ContentUnitOfWorkActions",
              "DataFilterFieldOperators",
              "DataIndexTypes",
              "DataJoinFilterFieldClauses",
              "DataPatchTypes",
              "DataSortHeading",
              "EmailTypes",
              "EndPointSystems",
              "FaceMatchTypes",
              "FeaturedContentTypes",
              "ImageTypes",
              "IvsChannelTypes",
              "IvsLatencyTypes",
              "JobProcessorActions",
              "LiveOperatorStatuses",
              "LiveRequestActions",
              "LiveRequestTargets",
              "LoginResponseStatuses",
              "MediaConvertTypes",
              "MessageInfoTypes",
              "MetadataTypes",
              "ModelContainerModes",
              "DayOfWeek",
              "VideoTrackingActions",
              "FrameIngestActions",
              "ArchivePrefixTypes",
              "LiveRecordingStatuses",
              "VideoTrackingStatuses",
              "VideoTrackingAlertStatuses"
            ],
            "type": "string",
            "description": "PageTemplates\r\n\r\nFields\r\n\r\nLookupTypes\r\n\r\nContentTemplates\r\n\r\nContentDefinitions\r\n\r\nContentTypes\r\n\r\nContentDefinitionGroups\r\n\r\nWorkflowStatuses\r\n\r\nDataSelectorContentDefinitions\r\n\r\nContent\r\n\r\nTemplatePacks\r\n\r\nPopularTags\r\n\r\nAllTags\r\n\r\nPropertyValues\r\n\r\nMediaTypes\r\n\r\nAssetTypes\r\n\r\nContentFields\r\n\r\nFormSelectorContentDefinitions\r\n\r\nCustomRenderers\r\n\r\nConstantContactCampaigns\r\n\r\nLanguages\r\n\r\nSecurityGroups\r\n\r\nCollections\r\n\r\nPermissions\r\n\r\nCustomLabelerTypes\r\n\r\nCustomLabelerStatuses\r\n\r\nLabels\r\n\r\nUsers\r\n\r\nMeetingSources\r\n\r\nLiveScheduleEventStatuses\r\n\r\nLiveScheduleEventTypes\r\n\r\nLiveChannelStatuses\r\n\r\nLiveInputCodecs\r\n\r\nLiveInputMaximumBitrates\r\n\r\nLiveInputResolutions\r\n\r\nLiveInputStatuses\r\n\r\nLiveInputTypes\r\n\r\nNodeTypes\r\n\r\nLiveChannelTypes\r\n\r\nLiveOutputProfiles\r\n\r\nLiveOutputTypes\r\n\r\nRoles\r\n\r\nNewsSystems\r\n\r\nNprProfileTypes\r\n\r\nPaymentStatuses\r\n\r\nPingStatuses\r\n\r\nPropertyValueTypes\r\n\r\nScheduleItemSearchTypes\r\n\r\nScheduleItemSourceTypes\r\n\r\nScheduleItemTypes\r\n\r\nScheduleStatuses\r\n\r\nScheduleTypes\r\n\r\nSecurityPermissions\r\n\r\nStorageClasses\r\n\r\nSubtitleTypes\r\n\r\nSubtitleValueTypes\r\n\r\nTextEntityTypes\r\n\r\nUploadOverwriteOptions\r\n\r\nUserSessionStatuses\r\n\r\nVideoSegmentTypes\r\n\r\nLiveOperatorModes\r\n\r\nVideoTrackingEvents\r\n\r\nBatchActionProcessorExecutionTypes\r\n\r\nVideoTrackingAttributes\r\n\r\nContentSecurityAttributes\r\n\r\nTemplatePackTypes\r\n\r\nAdServerTypes\r\n\r\nAdSlotTypes\r\n\r\nAssetRestoreTiers\r\n\r\nAssetStatuses\r\n\r\nBatchActions\r\n\r\nBucketTypes\r\n\r\nCloudFrontDistributions\r\n\r\nContentAttributes\r\n\r\nContentLanguageStatuses\r\n\r\nContentTextTypes\r\n\r\nContentUnitOfWorkActions\r\n\r\nDataFilterFieldOperators\r\n\r\nDataIndexTypes\r\n\r\nDataJoinFilterFieldClauses\r\n\r\nDataPatchTypes\r\n\r\nDataSortHeading\r\n\r\nEmailTypes\r\n\r\nEndPointSystems\r\n\r\nFaceMatchTypes\r\n\r\nFeaturedContentTypes\r\n\r\nImageTypes\r\n\r\nIvsChannelTypes\r\n\r\nIvsLatencyTypes\r\n\r\nJobProcessorActions\r\n\r\nLiveOperatorStatuses\r\n\r\nLiveRequestActions\r\n\r\nLiveRequestTargets\r\n\r\nLoginResponseStatuses\r\n\r\nMediaConvertTypes\r\n\r\nMessageInfoTypes\r\n\r\nMetadataTypes\r\n\r\nModelContainerModes\r\n\r\nDayOfWeek\r\n\r\nVideoTrackingActions\r\n\r\nFrameIngestActions\r\n\r\nArchivePrefixTypes\r\n\r\nLiveRecordingStatuses\r\n\r\nVideoTrackingStatuses\r\n\r\nVideoTrackingAlertStatuses",
            "x-enumNames": [
              "PageTemplates",
              "Fields",
              "LookupTypes",
              "ContentTemplates",
              "ContentDefinitions",
              "ContentTypes",
              "ContentDefinitionGroups",
              "WorkflowStatuses",
              "DataSelectorContentDefinitions",
              "Content",
              "TemplatePacks",
              "PopularTags",
              "AllTags",
              "PropertyValues",
              "MediaTypes",
              "AssetTypes",
              "ContentFields",
              "FormSelectorContentDefinitions",
              "CustomRenderers",
              "ConstantContactCampaigns",
              "Languages",
              "SecurityGroups",
              "Collections",
              "Permissions",
              "CustomLabelerTypes",
              "CustomLabelerStatuses",
              "Labels",
              "Users",
              "MeetingSources",
              "LiveScheduleEventStatuses",
              "LiveScheduleEventTypes",
              "LiveChannelStatuses",
              "LiveInputCodecs",
              "LiveInputMaximumBitrates",
              "LiveInputResolutions",
              "LiveInputStatuses",
              "LiveInputTypes",
              "NodeTypes",
              "LiveChannelTypes",
              "LiveOutputProfiles",
              "LiveOutputTypes",
              "Roles",
              "NewsSystems",
              "NprProfileTypes",
              "PaymentStatuses",
              "PingStatuses",
              "PropertyValueTypes",
              "ScheduleItemSearchTypes",
              "ScheduleItemSourceTypes",
              "ScheduleItemTypes",
              "ScheduleStatuses",
              "ScheduleTypes",
              "SecurityPermissions",
              "StorageClasses",
              "SubtitleTypes",
              "SubtitleValueTypes",
              "TextEntityTypes",
              "UploadOverwriteOptions",
              "UserSessionStatuses",
              "VideoSegmentTypes",
              "LiveOperatorModes",
              "VideoTrackingEvents",
              "BatchActionProcessorExecutionTypes",
              "VideoTrackingAttributes",
              "ContentSecurityAttributes",
              "TemplatePackTypes",
              "AdServerTypes",
              "AdSlotTypes",
              "AssetRestoreTiers",
              "AssetStatuses",
              "BatchActions",
              "BucketTypes",
              "CloudFrontDistributions",
              "ContentAttributes",
              "ContentLanguageStatuses",
              "ContentTextTypes",
              "ContentUnitOfWorkActions",
              "DataFilterFieldOperators",
              "DataIndexTypes",
              "DataJoinFilterFieldClauses",
              "DataPatchTypes",
              "DataSortHeading",
              "EmailTypes",
              "EndPointSystems",
              "FaceMatchTypes",
              "FeaturedContentTypes",
              "ImageTypes",
              "IvsChannelTypes",
              "IvsLatencyTypes",
              "JobProcessorActions",
              "LiveOperatorStatuses",
              "LiveRequestActions",
              "LiveRequestTargets",
              "LoginResponseStatuses",
              "MediaConvertTypes",
              "MessageInfoTypes",
              "MetadataTypes",
              "ModelContainerModes",
              "DayOfWeek",
              "VideoTrackingActions",
              "FrameIngestActions",
              "ArchivePrefixTypes",
              "LiveRecordingStatuses",
              "VideoTrackingStatuses",
              "VideoTrackingAlertStatuses"
            ]
          },
          "MetadataTypes": {
            "enum": [
              "DocumentContent",
              "ComprehendKeyPhrases",
              "ComprehendEntities",
              "RekognitionImageIndexFaces",
              "RekognitionImageSearchFaces",
              "RekognitionImageLabels",
              "RekognitionImageCelebrityRecognition",
              "RekognitionVideoLabels",
              "TextractAnalyzeDocument",
              "Transcribe",
              "TranscribeVtt",
              "TranscribeTranslation",
              "TranscribeVttTranslation",
              "RekognitionVideoCelebrityRecognition",
              "RekognitionVideoPersonTracking",
              "RekognitionVideoFaceDetection",
              "ImageInfo",
              "Transcode",
              "Clip",
              "MediaInfo",
              "RekognitionImageDetectText",
              "RekognitionImageUnsafeContent",
              "RekognitionVideoUnsafeContent",
              "Screenshot",
              "SageMakerGroundTruthLabelResults",
              "ThumbnailSheet",
              "ThumbnailImage",
              "SageMakerInvokeEndpointResults",
              "SageMakerModelLabels",
              "RekognitionImageCustomLabels",
              "SageMakerManifest",
              "PreviewImage",
              "RekognitionVideoTextDetection",
              "RekognitionVideoSegmentDetection",
              "NomadVideoSegmentDetection",
              "TranscribeMedical",
              "PreviewAudio",
              "Text",
              "AssetManifest",
              "IntervalSegments",
              "TranscribeMedicalText",
              "TranscribeMedicalTranslation",
              "AdobeMetadata",
              "AdobeMetadataText",
              "ImageExif",
              "TextractImageDetectText",
              "AdSegments",
              "Vmap",
              "Vast",
              "MediaTailorVideo",
              "TranscribeSrt",
              "TranscribeRaw",
              "Subtitles",
              "VizRtMetadata",
              "ProcessorJobs",
              "OfficeDocument",
              "TranscriptionContainer",
              "ComprehendSentiment",
              "ComprehendLanguage",
              "OriginalSourceVideo",
              "ImportManifest",
              "TranscribeScc",
              "TranscribeTtml",
              "TranscribeDfxp",
              "TranscribeSmptett",
              "TranscribeXml",
              "TranscribeQt",
              "TranscribeRt",
              "TranscribeSsa",
              "TranscribeAss",
              "TranscribeSbv",
              "TranscribeSmi",
              "TranscribeSami",
              "TranscribeStl",
              "TranscribeSub",
              "AssociatedAsset",
              "MobiusLabsImageLabels",
              "MobiusLabsVideoLabels"
            ],
            "type": "string",
            "description": "Note that this is a PARTIAL list of types that we need to know about\r\n\r\nDocumentContent\r\n\r\nComprehendKeyPhrases\r\n\r\nComprehendEntities\r\n\r\nRekognitionImageIndexFaces\r\n\r\nRekognitionImageSearchFaces\r\n\r\nRekognitionImageLabels\r\n\r\nRekognitionImageCelebrityRecognition\r\n\r\nRekognitionVideoLabels\r\n\r\nTextractAnalyzeDocument\r\n\r\nTranscribe\r\n\r\nTranscribeVtt\r\n\r\nTranscribeTranslation\r\n\r\nTranscribeVttTranslation\r\n\r\nRekognitionVideoCelebrityRecognition\r\n\r\nRekognitionVideoPersonTracking\r\n\r\nRekognitionVideoFaceDetection\r\n\r\nImageInfo\r\n\r\nTranscode\r\n\r\nClip\r\n\r\nMediaInfo\r\n\r\nRekognitionImageDetectText\r\n\r\nRekognitionImageUnsafeContent\r\n\r\nRekognitionVideoUnsafeContent\r\n\r\nScreenshot\r\n\r\nSageMakerGroundTruthLabelResults\r\n\r\nThumbnailSheet\r\n\r\nThumbnailImage\r\n\r\nSageMakerInvokeEndpointResults\r\n\r\nSageMakerModelLabels\r\n\r\nRekognitionImageCustomLabels\r\n\r\nSageMakerManifest\r\n\r\nPreviewImage\r\n\r\nRekognitionVideoTextDetection\r\n\r\nRekognitionVideoSegmentDetection\r\n\r\nNomadVideoSegmentDetection\r\n\r\nTranscribeMedical\r\n\r\nPreviewAudio\r\n\r\nText\r\n\r\nAssetManifest\r\n\r\nIntervalSegments\r\n\r\nTranscribeMedicalText\r\n\r\nTranscribeMedicalTranslation\r\n\r\nAdobeMetadata\r\n\r\nAdobeMetadataText\r\n\r\nImageExif\r\n\r\nTextractImageDetectText\r\n\r\nAdSegments\r\n\r\nVmap\r\n\r\nVast\r\n\r\nMediaTailorVideo\r\n\r\nTranscribeSrt\r\n\r\nTranscribeRaw\r\n\r\nSubtitles\r\n\r\nVizRtMetadata\r\n\r\nProcessorJobs\r\n\r\nOfficeDocument\r\n\r\nTranscriptionContainer\r\n\r\nComprehendSentiment\r\n\r\nComprehendLanguage\r\n\r\nOriginalSourceVideo\r\n\r\nImportManifest\r\n\r\nTranscribeScc\r\n\r\nTranscribeTtml\r\n\r\nTranscribeDfxp\r\n\r\nTranscribeSmptett\r\n\r\nTranscribeXml\r\n\r\nTranscribeQt\r\n\r\nTranscribeRt\r\n\r\nTranscribeSsa\r\n\r\nTranscribeAss\r\n\r\nTranscribeSbv\r\n\r\nTranscribeSmi\r\n\r\nTranscribeSami\r\n\r\nTranscribeStl\r\n\r\nTranscribeSub\r\n\r\nAssociatedAsset\r\n\r\nMobiusLabsImageLabels\r\n\r\nMobiusLabsVideoLabels",
            "x-enumNames": [
              "DocumentContent",
              "ComprehendKeyPhrases",
              "ComprehendEntities",
              "RekognitionImageIndexFaces",
              "RekognitionImageSearchFaces",
              "RekognitionImageLabels",
              "RekognitionImageCelebrityRecognition",
              "RekognitionVideoLabels",
              "TextractAnalyzeDocument",
              "Transcribe",
              "TranscribeVtt",
              "TranscribeTranslation",
              "TranscribeVttTranslation",
              "RekognitionVideoCelebrityRecognition",
              "RekognitionVideoPersonTracking",
              "RekognitionVideoFaceDetection",
              "ImageInfo",
              "Transcode",
              "Clip",
              "MediaInfo",
              "RekognitionImageDetectText",
              "RekognitionImageUnsafeContent",
              "RekognitionVideoUnsafeContent",
              "Screenshot",
              "SageMakerGroundTruthLabelResults",
              "ThumbnailSheet",
              "ThumbnailImage",
              "SageMakerInvokeEndpointResults",
              "SageMakerModelLabels",
              "RekognitionImageCustomLabels",
              "SageMakerManifest",
              "PreviewImage",
              "RekognitionVideoTextDetection",
              "RekognitionVideoSegmentDetection",
              "NomadVideoSegmentDetection",
              "TranscribeMedical",
              "PreviewAudio",
              "Text",
              "AssetManifest",
              "IntervalSegments",
              "TranscribeMedicalText",
              "TranscribeMedicalTranslation",
              "AdobeMetadata",
              "AdobeMetadataText",
              "ImageExif",
              "TextractImageDetectText",
              "AdSegments",
              "Vmap",
              "Vast",
              "MediaTailorVideo",
              "TranscribeSrt",
              "TranscribeRaw",
              "Subtitles",
              "VizRtMetadata",
              "ProcessorJobs",
              "OfficeDocument",
              "TranscriptionContainer",
              "ComprehendSentiment",
              "ComprehendLanguage",
              "OriginalSourceVideo",
              "ImportManifest",
              "TranscribeScc",
              "TranscribeTtml",
              "TranscribeDfxp",
              "TranscribeSmptett",
              "TranscribeXml",
              "TranscribeQt",
              "TranscribeRt",
              "TranscribeSsa",
              "TranscribeAss",
              "TranscribeSbv",
              "TranscribeSmi",
              "TranscribeSami",
              "TranscribeStl",
              "TranscribeSub",
              "AssociatedAsset",
              "MobiusLabsImageLabels",
              "MobiusLabsVideoLabels"
            ]
          },
          "MobiusLabsWebhookResponseModel": {
            "type": "object",
            "properties": {
              "status": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "NodeModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "parentId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "fullUrl": {
                "type": "string",
                "nullable": true
              },
              "url": {
                "type": "string",
                "nullable": true
              },
              "children": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/NodeModel"
                },
                "nullable": true
              },
              "hasChildren": {
                "type": "boolean"
              },
              "lastModifiedDate": {
                "type": "string",
                "format": "date-time"
              },
              "isExpanded": {
                "type": "boolean"
              },
              "sequence": {
                "type": "integer",
                "format": "int32"
              },
              "permission": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/Permissions"
                  }
                ],
                "description": "Read\r\n\r\nWrite\r\n\r\nDelete\r\n\r\nAdministrator\r\n\r\nGuest",
                "x-enumNames": [
                  "Read",
                  "Write",
                  "Delete",
                  "Administrator",
                  "Guest"
                ]
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true,
                "readOnly": true
              },
              "previousPageId": {
                "type": "string",
                "format": "uuid",
                "nullable": true,
                "readOnly": true
              },
              "assetType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/NodeTypes"
                  }
                ],
                "description": "Folder\r\n\r\nFile\r\n\r\nPage\r\n\r\nContentDefinition\r\n\r\nBucket\r\n\r\nCustomLabeler\r\n\r\nCustomLabelerVersion\r\n\r\nScreenshot",
                "nullable": true,
                "readOnly": true
              },
              "includeInNavigation": {
                "type": "boolean",
                "nullable": true,
                "readOnly": true
              },
              "navigationTitle": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "NodeModelListResultModel": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/NodeModel"
                },
                "nullable": true
              },
              "totalItemCount": {
                "type": "integer",
                "format": "int64"
              },
              "nextPageOffset": {
                "nullable": true
              },
              "hasItems": {
                "type": "boolean",
                "readOnly": true
              },
              "relatedItems": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/NodeModel"
                },
                "nullable": true
              },
              "message": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "NodeTypes": {
            "enum": [
              "Folder",
              "File",
              "Page",
              "ContentDefinition",
              "Bucket",
              "CustomLabeler",
              "CustomLabelerVersion",
              "Screenshot"
            ],
            "type": "string",
            "description": "Folder\r\n\r\nFile\r\n\r\nPage\r\n\r\nContentDefinition\r\n\r\nBucket\r\n\r\nCustomLabeler\r\n\r\nCustomLabelerVersion\r\n\r\nScreenshot",
            "x-enumNames": [
              "Folder",
              "File",
              "Page",
              "ContentDefinition",
              "Bucket",
              "CustomLabeler",
              "CustomLabelerVersion",
              "Screenshot"
            ]
          },
          "PageModel": {
            "type": "object",
            "properties": {
              "pageId": {
                "type": "string",
                "format": "uuid"
              },
              "parentPageId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "previousPageId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "fullUrl": {
                "type": "string",
                "nullable": true
              },
              "createdDate": {
                "type": "string",
                "format": "date-time"
              },
              "lastModifiedDate": {
                "type": "string",
                "format": "date-time"
              },
              "contentInstances": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/ContentInstanceModel"
                },
                "nullable": true,
                "readOnly": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "PageTypes": {
            "enum": [
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ],
            "type": "integer",
            "description": "1 = Page\r\n\r\n2 = PageTemplate\r\n\r\n3 = PageFileTemplate\r\n\r\n4 = Redirect\r\n\r\n5 = PageWithRoute\r\n\r\n6 = PageWithRouteItem\r\n\r\n7 = CustomRenderer",
            "format": "int32",
            "x-enumNames": [
              "Page",
              "PageTemplate",
              "PageFileTemplate",
              "Redirect",
              "PageWithRoute",
              "PageWithRouteItem",
              "CustomRenderer"
            ]
          },
          "Permissions": {
            "enum": [
              "Read",
              "Write",
              "Delete",
              "Administrator",
              "Guest"
            ],
            "type": "string",
            "description": "Read\r\n\r\nWrite\r\n\r\nDelete\r\n\r\nAdministrator\r\n\r\nGuest",
            "x-enumNames": [
              "Read",
              "Write",
              "Delete",
              "Administrator",
              "Guest"
            ]
          },
          "PersonFaceModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "assetId": {
                "type": "string",
                "format": "uuid"
              },
              "segmentId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "videoAssetId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "similarity": {
                "type": "number",
                "format": "double"
              },
              "boundingBox": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/BoundingBoxModel"
                  }
                ],
                "nullable": true
              },
              "rotationCorrection": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "previewImageUrl": {
                "type": "string",
                "nullable": true
              },
              "previewImageHeight": {
                "type": "integer",
                "format": "int32"
              },
              "previewImageWidth": {
                "type": "integer",
                "format": "int32"
              },
              "displayName": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "PersonFaceModelListResultModel": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/PersonFaceModel"
                },
                "nullable": true
              },
              "totalItemCount": {
                "type": "integer",
                "format": "int64"
              },
              "nextPageOffset": {
                "nullable": true
              },
              "hasItems": {
                "type": "boolean",
                "readOnly": true
              },
              "relatedItems": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/PersonFaceModel"
                },
                "nullable": true
              },
              "message": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "PersonModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "The ID of the person",
                "format": "uuid"
              },
              "name": {
                "type": "string",
                "description": "The name of the person",
                "nullable": true
              },
              "automatchFaceCount": {
                "type": "integer",
                "description": "The count of faces that are automatched for this person",
                "format": "int32",
                "nullable": true
              },
              "probableMatchFaceCount": {
                "type": "integer",
                "description": "The count of faces that have been identified as probable matches for this person",
                "format": "int32",
                "nullable": true
              },
              "confirmedMatchFaceCount": {
                "type": "integer",
                "description": "The count of faces that have been marked as confirmed for this person",
                "format": "int32",
                "nullable": true
              },
              "notMatchFaceCount": {
                "type": "integer",
                "description": "The count of faces that have been marked as not a match for this person",
                "format": "int32",
                "nullable": true
              },
              "celebrityConfidence": {
                "type": "number",
                "description": "The % confidence of the celebrity name that was automatically detected through AI",
                "format": "float",
                "nullable": true
              },
              "celebrityExternalId": {
                "type": "string",
                "description": "The external (usually IMDB) ID of the celebrity that was identified",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "PersonReferenceModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "confidence": {
                "type": "number",
                "format": "double"
              },
              "sourceId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "boundingBoxes": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/BoundingBoxModel"
                },
                "nullable": true
              },
              "segments": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/SegmentModel"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "PersonSubmitModel": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "description": "The name of the person",
                "nullable": true
              },
              "matchedFaces": {
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uuid"
                },
                "description": "The list of face IDs that match this person. This list contains only changed faces that have become matched.",
                "nullable": true
              },
              "unmatchedFaces": {
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uuid"
                },
                "description": "The list of face IDs that do not match this person. This list contains only changed faces that have become not matched.",
                "nullable": true
              },
              "blurryFaces": {
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uuid"
                },
                "description": "The list of face IDs that are blurry. This list contains only changed faces that are marked as blurry.",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "PingRequestModel": {
            "type": "object",
            "properties": {
              "userSessionId": {
                "type": "string",
                "format": "uuid"
              },
              "applicationId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "PingResponseModel": {
            "type": "object",
            "properties": {
              "redirectUrl": {
                "type": "string",
                "nullable": true
              },
              "pingStatus": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/PingStatuses"
                  }
                ],
                "description": "Normal\r\n\r\nChatDisabled\r\n\r\nAccountExpired\r\n\r\nSessionDeactivated",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "PingStatuses": {
            "enum": [
              "Normal",
              "ChatDisabled",
              "AccountExpired",
              "SessionDeactivated"
            ],
            "type": "string",
            "description": "Normal\r\n\r\nChatDisabled\r\n\r\nAccountExpired\r\n\r\nSessionDeactivated",
            "x-enumNames": [
              "Normal",
              "ChatDisabled",
              "AccountExpired",
              "SessionDeactivated"
            ]
          },
          "PublishScheduleRequestModel": {
            "required": [
              "numberOfLockedDays"
            ],
            "type": "object",
            "properties": {
              "scheduleId": {
                "type": "string",
                "description": "Schedule Id",
                "format": "uuid"
              },
              "numberOfLockedDays": {
                "type": "integer",
                "description": "Number of days to lock schedule",
                "format": "int32"
              }
            },
            "additionalProperties": false
          },
          "Red5AuthRequestModel": {
            "type": "object",
            "properties": {
              "userName": {
                "type": "string",
                "nullable": true
              },
              "password": {
                "type": "string",
                "nullable": true
              },
              "token": {
                "type": "string",
                "nullable": true
              },
              "type": {
                "type": "string",
                "nullable": true
              },
              "streamId": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "Red5AuthResponseModel": {
            "type": "object",
            "properties": {
              "result": {
                "type": "boolean"
              },
              "url": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "Red5StatusRequestModel": {
            "type": "object",
            "properties": {
              "event": {
                "type": "string",
                "nullable": true
              },
              "channel": {
                "type": "string",
                "nullable": true
              },
              "clusterNodeType": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "Red5StatusResponseModel": {
            "type": "object",
            "additionalProperties": false
          },
          "RefreshTokenRequestModel": {
            "required": [
              "refreshToken"
            ],
            "type": "object",
            "properties": {
              "refreshToken": {
                "minLength": 1,
                "type": "string",
                "description": "The RefreshToken from the Login response"
              }
            },
            "additionalProperties": false
          },
          "RegisterAssetModel": {
            "required": [
              "bucketName",
              "objectKey"
            ],
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "parentId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "displayObjectKey": {
                "type": "string",
                "nullable": true
              },
              "bucketName": {
                "minLength": 1,
                "type": "string"
              },
              "objectKey": {
                "minLength": 1,
                "type": "string"
              },
              "eTag": {
                "type": "string",
                "nullable": true
              },
              "tags": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "nullable": true
              },
              "collections": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "nullable": true
              },
              "relatedContent": {
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uuid"
                },
                "nullable": true
              },
              "sequencer": {
                "type": "string",
                "nullable": true
              },
              "assetStatus": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetStatuses"
                  }
                ],
                "description": "Available\r\n\r\nRenaming\r\n\r\nCopying\r\n\r\nRestoring\r\n\r\nRegistering\r\n\r\nUploading\r\n\r\nArchiving\r\n\r\nArchived\r\n\r\nPendingArchive\r\n\r\nPendingRestore\r\n\r\nRestored\r\n\r\nDeleting\r\n\r\nMoving\r\n\r\nSlugReplaced\r\n\r\nUpdating\r\n\r\nError\r\n\r\nAssembling\r\n\r\nClipping\r\n\r\nPlaceholder",
                "nullable": true
              },
              "storageClass": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/StorageClasses"
                  }
                ],
                "description": "Standard\r\n\r\nReducedRedundancy\r\n\r\nGlacier\r\n\r\nStandardInfrequentAccess\r\n\r\nOneZoneInfrequentAccess\r\n\r\nIntelligentTiering\r\n\r\nDeepArchive\r\n\r\nGlacierInstantRetrieval\r\n\r\nOutposts",
                "nullable": true
              },
              "assetType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetTypes"
                  }
                ],
                "description": "Folder\r\n\r\nFile\r\n\r\nBucket",
                "nullable": true
              },
              "contentLength": {
                "type": "integer",
                "format": "int64",
                "nullable": true
              },
              "storageEventName": {
                "type": "string",
                "nullable": true
              },
              "createdDate": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "storageSourceIpAddress": {
                "type": "string",
                "nullable": true
              },
              "startMediaProcessor": {
                "type": "boolean"
              },
              "deleteMissingAsset": {
                "type": "boolean"
              }
            },
            "additionalProperties": false
          },
          "RelatedContentModel": {
            "type": "object",
            "properties": {
              "contentDefinition": {
                "type": "string",
                "description": "The content definition string name of the content records that should be affected",
                "nullable": true
              },
              "contentId": {
                "type": "string",
                "description": "The ID of the content record to apply the new or removed attributes",
                "format": "uuid"
              },
              "createNew": {
                "type": "boolean",
                "description": "Defaults to True. If true, then the attribute will be added if it doesn't already exist with a matching name"
              },
              "relatedContentId": {
                "type": "string",
                "description": "The related content ID that should be added or removed",
                "format": "uuid"
              },
              "childId": {
                "type": "string",
                "format": "uuid",
                "nullable": true,
                "readOnly": true
              },
              "childPropertyName": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "RelatedContentModelListModel": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/RelatedContentModel"
                },
                "nullable": true
              },
              "hasItems": {
                "type": "boolean",
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "ResendConfirmationCodeRequestModel": {
            "required": [
              "userName"
            ],
            "type": "object",
            "properties": {
              "userName": {
                "minLength": 1,
                "type": "string",
                "description": "Username"
              }
            },
            "additionalProperties": false
          },
          "ResetPasswordRequestModel": {
            "required": [
              "userName"
            ],
            "type": "object",
            "properties": {
              "userName": {
                "minLength": 1,
                "type": "string",
                "description": "Username"
              },
              "token": {
                "type": "string",
                "description": "Confirmation Token",
                "nullable": true
              },
              "newPassword": {
                "type": "string",
                "description": "The new password",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "ResponseCookieWrapper": {
            "type": "object",
            "properties": {
              "internalCookies": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "nullable": true,
                "readOnly": true
              },
              "responseCookies": {
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "ScheduleGuideModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "asset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "liveChannel": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "scheduleItem": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "startTime": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "startTimeUtc": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "duration": {
                "type": "string",
                "nullable": true
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "sourceName": {
                "type": "string",
                "nullable": true
              },
              "timeCode": {
                "type": "string",
                "nullable": true
              },
              "endTimeCode": {
                "type": "string",
                "nullable": true
              },
              "dayId": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "ScheduleItemChangeModel": {
            "type": "object",
            "properties": {
              "scheduleItemId": {
                "type": "string",
                "format": "uuid"
              },
              "changedList": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/ScheduleItemModel"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "ScheduleItemModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "previousItem": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "timeCode": {
                "type": "string",
                "nullable": true
              },
              "asset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "scheduleItemType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ScheduleItemTypes"
                  }
                ],
                "description": "Asset\r\n\r\nDynamic",
                "x-enumNames": [
                  "Asset",
                  "Dynamic"
                ]
              },
              "scheduleId": {
                "type": "string",
                "format": "uuid"
              },
              "endTimeCode": {
                "type": "string",
                "nullable": true
              },
              "days": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "tags": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "relatedContent": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "collections": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "labels": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "playlistSchedule": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "liveChannel": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "defaultVideo": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "thumbnailAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "searchFilterType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ScheduleItemSearchTypes"
                  }
                ],
                "description": "Random\r\n\r\nRandomWithinDateRange\r\n\r\nNewest\r\n\r\nNewestNotPlayed",
                "nullable": true
              },
              "sourceType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ScheduleItemSourceTypes"
                  }
                ],
                "description": "PlaylistSchedule\r\n\r\nSearchFilters\r\n\r\nVideoAsset\r\n\r\nLiveChannel",
                "nullable": true
              },
              "searchDurationInMinutes": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "endSearchDurationInMinutes": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "searchDate": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "endSearchDate": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "ScheduleItemMoveModel": {
            "type": "object",
            "properties": {
              "previousItem": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "ScheduleItemSearchTypes": {
            "enum": [
              "Random",
              "RandomWithinDateRange",
              "Newest",
              "NewestNotPlayed"
            ],
            "type": "string",
            "description": "Random\r\n\r\nRandomWithinDateRange\r\n\r\nNewest\r\n\r\nNewestNotPlayed",
            "x-enumNames": [
              "Random",
              "RandomWithinDateRange",
              "Newest",
              "NewestNotPlayed"
            ]
          },
          "ScheduleItemSourceTypes": {
            "enum": [
              "PlaylistSchedule",
              "SearchFilters",
              "VideoAsset",
              "LiveChannel"
            ],
            "type": "string",
            "description": "PlaylistSchedule\r\n\r\nSearchFilters\r\n\r\nVideoAsset\r\n\r\nLiveChannel",
            "x-enumNames": [
              "PlaylistSchedule",
              "SearchFilters",
              "VideoAsset",
              "LiveChannel"
            ]
          },
          "ScheduleItemTypes": {
            "enum": [
              "Asset",
              "Dynamic"
            ],
            "type": "string",
            "description": "Asset\r\n\r\nDynamic",
            "x-enumNames": [
              "Asset",
              "Dynamic"
            ]
          },
          "ScheduleModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "routeName": {
                "type": "string",
                "nullable": true
              },
              "thumbnailAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "scheduleType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ScheduleTypes"
                  }
                ],
                "description": "Playlist\r\n\r\nIntelligentSchedule\r\n\r\nIntelligentPlaylist",
                "x-enumNames": [
                  "Playlist",
                  "IntelligentSchedule",
                  "IntelligentPlaylist"
                ]
              },
              "statusMessage": {
                "type": "string",
                "nullable": true
              },
              "scheduleStatus": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ScheduleStatuses"
                  }
                ],
                "description": "New\r\n\r\nStopped\r\n\r\nStarting\r\n\r\nRunning\r\n\r\nStopping\r\n\r\nError",
                "x-enumNames": [
                  "New",
                  "Stopped",
                  "Starting",
                  "Running",
                  "Stopping",
                  "Error"
                ]
              },
              "status": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LookupModel"
                  }
                ],
                "nullable": true
              },
              "playBackUrl": {
                "type": "string",
                "nullable": true
              },
              "timeZoneId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "defaultVideoAsset": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetReferenceModel"
                  }
                ],
                "nullable": true
              },
              "loopPlaylist": {
                "type": "boolean",
                "nullable": true
              },
              "expirationDate": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "hasAds": {
                "type": "boolean",
                "nullable": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "ScheduleStatuses": {
            "enum": [
              "New",
              "Stopped",
              "Starting",
              "Running",
              "Stopping",
              "Error"
            ],
            "type": "string",
            "description": "New\r\n\r\nStopped\r\n\r\nStarting\r\n\r\nRunning\r\n\r\nStopping\r\n\r\nError",
            "x-enumNames": [
              "New",
              "Stopped",
              "Starting",
              "Running",
              "Stopping",
              "Error"
            ]
          },
          "ScheduleTypes": {
            "enum": [
              "Playlist",
              "IntelligentSchedule",
              "IntelligentPlaylist"
            ],
            "type": "string",
            "description": "Playlist\r\n\r\nIntelligentSchedule\r\n\r\nIntelligentPlaylist",
            "x-enumNames": [
              "Playlist",
              "IntelligentSchedule",
              "IntelligentPlaylist"
            ]
          },
          "ScreenshotModel": {
            "type": "object",
            "properties": {
              "timeCode": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "SearchConditionBinders": {
            "enum": [
              0,
              1
            ],
            "type": "integer",
            "description": "0 = And\r\n\r\n1 = Or",
            "format": "int32",
            "x-enumNames": [
              "And",
              "Or"
            ]
          },
          "SearchFieldModel": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "nullable": true
              },
              "loadDetail": {
                "type": "boolean"
              },
              "searchResultFields": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/SearchFieldModel"
                },
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "SearchFilter": {
            "type": "object",
            "properties": {
              "fieldName": {
                "type": "string",
                "nullable": true
              },
              "operator": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/SearchFilterOperators"
                  }
                ],
                "description": "0 = Equals\r\n\r\n1 = NotEquals\r\n\r\n2 = Contains\r\n\r\n3 = NotContains\r\n\r\n4 = LessThan\r\n\r\n5 = GreaterThan\r\n\r\n6 = LessThanEquals\r\n\r\n7 = GreaterThanEquals",
                "x-enumNames": [
                  "Equals",
                  "NotEquals",
                  "Contains",
                  "NotContains",
                  "LessThan",
                  "GreaterThan",
                  "LessThanEquals",
                  "GreaterThanEquals"
                ]
              },
              "includeNull": {
                "type": "boolean"
              },
              "values": {
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "SearchFilterOperators": {
            "enum": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ],
            "type": "integer",
            "description": "0 = Equals\r\n\r\n1 = NotEquals\r\n\r\n2 = Contains\r\n\r\n3 = NotContains\r\n\r\n4 = LessThan\r\n\r\n5 = GreaterThan\r\n\r\n6 = LessThanEquals\r\n\r\n7 = GreaterThanEquals",
            "format": "int32",
            "x-enumNames": [
              "Equals",
              "NotEquals",
              "Contains",
              "NotContains",
              "LessThan",
              "GreaterThan",
              "LessThanEquals",
              "GreaterThanEquals"
            ]
          },
          "SearchModel": {
            "type": "object",
            "properties": {
              "pageSize": {
                "type": "integer",
                "description": "The size of the page (the number of items returned for this page)",
                "format": "int32"
              },
              "pageOffset": {
                "description": "The offset of the page (zero based).",
                "nullable": true
              },
              "searchQuery": {
                "type": "string",
                "description": "A text string to search within all of the text fields to match",
                "nullable": true
              },
              "filters": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/SearchFilter"
                },
                "description": "A list of the filters to apply for this search",
                "nullable": true
              },
              "filterBinder": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/SearchConditionBinders"
                  }
                ],
                "description": "Tells the query engine of the Filters should be applied as an And or an Or (the default is And)\r\n\r\n0 = And\r\n\r\n1 = Or",
                "x-enumNames": [
                  "And",
                  "Or"
                ]
              },
              "sortFields": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/SearchSort"
                },
                "description": "The fields to sort by",
                "nullable": true
              },
              "returnedFieldNames": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "nullable": true,
                "deprecated": true
              },
              "searchResultFields": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/SearchFieldModel"
                },
                "description": "The list of fields and optionally the sub fields and related records that should be returned as a result",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "SearchResultModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "masterId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "contentDefinitionId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "title": {
                "type": "string",
                "nullable": true
              },
              "contentDefinitionTitle": {
                "type": "string",
                "nullable": true
              },
              "keywordSearchField": {
                "type": "string",
                "nullable": true
              },
              "uuidSearchField": {
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uuid"
                },
                "nullable": true
              },
              "isRestricted": {
                "type": "boolean",
                "description": "This has the impact of not allowing downloading or clipping in the portal UI",
                "nullable": true
              },
              "lastModifiedDate": {
                "type": "string",
                "format": "date-time"
              },
              "createdDate": {
                "type": "string",
                "format": "date-time"
              },
              "identifiers": {
                "type": "object",
                "additionalProperties": {},
                "description": "Note that we convert all incoming keys to lower first char to help with serialization for JSON later",
                "nullable": true
              },
              "securitySearchField": {
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uuid"
                },
                "nullable": true
              },
              "languageId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "inheritSecurity": {
                "type": "boolean"
              },
              "permission": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/SecurityPermissions"
                  }
                ],
                "description": "Read\r\n\r\nFileWrite\r\n\r\nFolderWrite\r\n\r\nAdministrator\r\n\r\nGuest",
                "nullable": true
              },
              "contentLanguageStatus": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ContentLanguageStatuses"
                  }
                ],
                "description": "Original\r\n\r\nOverride\r\n\r\nAuto",
                "x-enumNames": [
                  "Original",
                  "Override",
                  "Auto"
                ]
              },
              "originalLanguageName": {
                "type": "string",
                "nullable": true
              },
              "assetStats": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AssetStatsModel"
                  }
                ],
                "nullable": true
              },
              "collections": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "tags": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "securityGroups": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "securityUsers": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "relatedContent": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "userContentAttributes": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/UserContentAttributeSummaryModel"
                  }
                ],
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "SearchResultModelListResultModel": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/SearchResultModel"
                },
                "nullable": true
              },
              "totalItemCount": {
                "type": "integer",
                "format": "int64"
              },
              "nextPageOffset": {
                "nullable": true
              },
              "hasItems": {
                "type": "boolean",
                "readOnly": true
              },
              "relatedItems": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/SearchResultModel"
                },
                "nullable": true
              },
              "message": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "SearchSort": {
            "type": "object",
            "properties": {
              "fieldName": {
                "type": "string",
                "nullable": true
              },
              "sortType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/SearchSortTypes"
                  }
                ],
                "description": "0 = Ascending\r\n\r\n1 = Descending",
                "x-enumNames": [
                  "Ascending",
                  "Descending"
                ]
              },
              "position": {
                "type": "integer",
                "format": "int32"
              }
            },
            "additionalProperties": false
          },
          "SearchSortTypes": {
            "enum": [
              0,
              1
            ],
            "type": "integer",
            "description": "0 = Ascending\r\n\r\n1 = Descending",
            "format": "int32",
            "x-enumNames": [
              "Ascending",
              "Descending"
            ]
          },
          "SecurityModel": {
            "type": "object",
            "properties": {
              "securityGroups": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "securityUsers": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/LookupModel"
                },
                "nullable": true
              },
              "inheritSecurity": {
                "type": "boolean"
              }
            },
            "additionalProperties": false
          },
          "SecurityPermissions": {
            "enum": [
              "Read",
              "FileWrite",
              "FolderWrite",
              "Administrator",
              "Guest"
            ],
            "type": "string",
            "description": "Read\r\n\r\nFileWrite\r\n\r\nFolderWrite\r\n\r\nAdministrator\r\n\r\nGuest",
            "x-enumNames": [
              "Read",
              "FileWrite",
              "FolderWrite",
              "Administrator",
              "Guest"
            ]
          },
          "SegmentModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "duration": {
                "type": "integer",
                "format": "int64"
              },
              "timestamp": {
                "type": "integer",
                "format": "int64"
              },
              "confidence": {
                "type": "number",
                "format": "double",
                "nullable": true
              },
              "count": {
                "type": "integer",
                "format": "int32"
              }
            },
            "additionalProperties": false
          },
          "StorageClasses": {
            "enum": [
              "Standard",
              "ReducedRedundancy",
              "Glacier",
              "StandardInfrequentAccess",
              "OneZoneInfrequentAccess",
              "IntelligentTiering",
              "DeepArchive",
              "GlacierInstantRetrieval",
              "Outposts"
            ],
            "type": "string",
            "description": "Standard\r\n\r\nReducedRedundancy\r\n\r\nGlacier\r\n\r\nStandardInfrequentAccess\r\n\r\nOneZoneInfrequentAccess\r\n\r\nIntelligentTiering\r\n\r\nDeepArchive\r\n\r\nGlacierInstantRetrieval\r\n\r\nOutposts",
            "x-enumNames": [
              "Standard",
              "ReducedRedundancy",
              "Glacier",
              "StandardInfrequentAccess",
              "OneZoneInfrequentAccess",
              "IntelligentTiering",
              "DeepArchive",
              "GlacierInstantRetrieval",
              "Outposts"
            ]
          },
          "TagContentModel": {
            "type": "object",
            "properties": {
              "contentDefinition": {
                "type": "string",
                "description": "The content definition string name of the content records that should be affected",
                "nullable": true
              },
              "contentId": {
                "type": "string",
                "description": "The ID of the content record to apply the new or removed attributes",
                "format": "uuid"
              },
              "createNew": {
                "type": "boolean",
                "description": "Defaults to True. If true, then the attribute will be added if it doesn't already exist with a matching name"
              },
              "tagId": {
                "type": "string",
                "description": "The tag ID that should be added or removed",
                "format": "uuid",
                "nullable": true
              },
              "name": {
                "type": "string",
                "description": "The name of the tag that should be added or removed. If the name and the tagId are both specified, the name is ignored.",
                "nullable": true
              },
              "childId": {
                "type": "string",
                "format": "uuid",
                "nullable": true,
                "readOnly": true
              },
              "childPropertyName": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "TagContentModelListModel": {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/TagContentModel"
                },
                "nullable": true
              },
              "hasItems": {
                "type": "boolean",
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "TagModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "name": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "TextItemGroupModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "sourceId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "name": {
                "type": "string",
                "nullable": true
              },
              "contentTextType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ContentTextTypes"
                  }
                ],
                "description": "Line\r\n\r\nWord\r\n\r\nPerson\r\n\r\nLocation\r\n\r\nOrganization\r\n\r\nCommercialItem\r\n\r\nEvent\r\n\r\nDate\r\n\r\nQuantity\r\n\r\nTitle\r\n\r\nEntity\r\n\r\nKeyPhrase\r\n\r\nMixedSentiment\r\n\r\nNegativeSentiment\r\n\r\nNeutralSentiment\r\n\r\nPositiveSentiment\r\n\r\nTranscript\r\n\r\nOther",
                "x-enumNames": [
                  "Line",
                  "Word",
                  "Person",
                  "Location",
                  "Organization",
                  "CommercialItem",
                  "Event",
                  "Date",
                  "Quantity",
                  "Title",
                  "Entity",
                  "KeyPhrase",
                  "MixedSentiment",
                  "NegativeSentiment",
                  "NeutralSentiment",
                  "PositiveSentiment",
                  "Transcript",
                  "Other"
                ]
              },
              "children": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/TextItemModel"
                },
                "nullable": true
              },
              "metadataType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/MetadataTypes"
                  }
                ],
                "description": "Note that this is a PARTIAL list of types that we need to know about\r\n\r\nDocumentContent\r\n\r\nComprehendKeyPhrases\r\n\r\nComprehendEntities\r\n\r\nRekognitionImageIndexFaces\r\n\r\nRekognitionImageSearchFaces\r\n\r\nRekognitionImageLabels\r\n\r\nRekognitionImageCelebrityRecognition\r\n\r\nRekognitionVideoLabels\r\n\r\nTextractAnalyzeDocument\r\n\r\nTranscribe\r\n\r\nTranscribeVtt\r\n\r\nTranscribeTranslation\r\n\r\nTranscribeVttTranslation\r\n\r\nRekognitionVideoCelebrityRecognition\r\n\r\nRekognitionVideoPersonTracking\r\n\r\nRekognitionVideoFaceDetection\r\n\r\nImageInfo\r\n\r\nTranscode\r\n\r\nClip\r\n\r\nMediaInfo\r\n\r\nRekognitionImageDetectText\r\n\r\nRekognitionImageUnsafeContent\r\n\r\nRekognitionVideoUnsafeContent\r\n\r\nScreenshot\r\n\r\nSageMakerGroundTruthLabelResults\r\n\r\nThumbnailSheet\r\n\r\nThumbnailImage\r\n\r\nSageMakerInvokeEndpointResults\r\n\r\nSageMakerModelLabels\r\n\r\nRekognitionImageCustomLabels\r\n\r\nSageMakerManifest\r\n\r\nPreviewImage\r\n\r\nRekognitionVideoTextDetection\r\n\r\nRekognitionVideoSegmentDetection\r\n\r\nNomadVideoSegmentDetection\r\n\r\nTranscribeMedical\r\n\r\nPreviewAudio\r\n\r\nText\r\n\r\nAssetManifest\r\n\r\nIntervalSegments\r\n\r\nTranscribeMedicalText\r\n\r\nTranscribeMedicalTranslation\r\n\r\nAdobeMetadata\r\n\r\nAdobeMetadataText\r\n\r\nImageExif\r\n\r\nTextractImageDetectText\r\n\r\nAdSegments\r\n\r\nVmap\r\n\r\nVast\r\n\r\nMediaTailorVideo\r\n\r\nTranscribeSrt\r\n\r\nTranscribeRaw\r\n\r\nSubtitles\r\n\r\nVizRtMetadata\r\n\r\nProcessorJobs\r\n\r\nOfficeDocument\r\n\r\nTranscriptionContainer\r\n\r\nComprehendSentiment\r\n\r\nComprehendLanguage\r\n\r\nOriginalSourceVideo\r\n\r\nImportManifest\r\n\r\nTranscribeScc\r\n\r\nTranscribeTtml\r\n\r\nTranscribeDfxp\r\n\r\nTranscribeSmptett\r\n\r\nTranscribeXml\r\n\r\nTranscribeQt\r\n\r\nTranscribeRt\r\n\r\nTranscribeSsa\r\n\r\nTranscribeAss\r\n\r\nTranscribeSbv\r\n\r\nTranscribeSmi\r\n\r\nTranscribeSami\r\n\r\nTranscribeStl\r\n\r\nTranscribeSub\r\n\r\nAssociatedAsset\r\n\r\nMobiusLabsImageLabels\r\n\r\nMobiusLabsVideoLabels",
                "x-enumNames": [
                  "DocumentContent",
                  "ComprehendKeyPhrases",
                  "ComprehendEntities",
                  "RekognitionImageIndexFaces",
                  "RekognitionImageSearchFaces",
                  "RekognitionImageLabels",
                  "RekognitionImageCelebrityRecognition",
                  "RekognitionVideoLabels",
                  "TextractAnalyzeDocument",
                  "Transcribe",
                  "TranscribeVtt",
                  "TranscribeTranslation",
                  "TranscribeVttTranslation",
                  "RekognitionVideoCelebrityRecognition",
                  "RekognitionVideoPersonTracking",
                  "RekognitionVideoFaceDetection",
                  "ImageInfo",
                  "Transcode",
                  "Clip",
                  "MediaInfo",
                  "RekognitionImageDetectText",
                  "RekognitionImageUnsafeContent",
                  "RekognitionVideoUnsafeContent",
                  "Screenshot",
                  "SageMakerGroundTruthLabelResults",
                  "ThumbnailSheet",
                  "ThumbnailImage",
                  "SageMakerInvokeEndpointResults",
                  "SageMakerModelLabels",
                  "RekognitionImageCustomLabels",
                  "SageMakerManifest",
                  "PreviewImage",
                  "RekognitionVideoTextDetection",
                  "RekognitionVideoSegmentDetection",
                  "NomadVideoSegmentDetection",
                  "TranscribeMedical",
                  "PreviewAudio",
                  "Text",
                  "AssetManifest",
                  "IntervalSegments",
                  "TranscribeMedicalText",
                  "TranscribeMedicalTranslation",
                  "AdobeMetadata",
                  "AdobeMetadataText",
                  "ImageExif",
                  "TextractImageDetectText",
                  "AdSegments",
                  "Vmap",
                  "Vast",
                  "MediaTailorVideo",
                  "TranscribeSrt",
                  "TranscribeRaw",
                  "Subtitles",
                  "VizRtMetadata",
                  "ProcessorJobs",
                  "OfficeDocument",
                  "TranscriptionContainer",
                  "ComprehendSentiment",
                  "ComprehendLanguage",
                  "OriginalSourceVideo",
                  "ImportManifest",
                  "TranscribeScc",
                  "TranscribeTtml",
                  "TranscribeDfxp",
                  "TranscribeSmptett",
                  "TranscribeXml",
                  "TranscribeQt",
                  "TranscribeRt",
                  "TranscribeSsa",
                  "TranscribeAss",
                  "TranscribeSbv",
                  "TranscribeSmi",
                  "TranscribeSami",
                  "TranscribeStl",
                  "TranscribeSub",
                  "AssociatedAsset",
                  "MobiusLabsImageLabels",
                  "MobiusLabsVideoLabels"
                ]
              }
            },
            "additionalProperties": false
          },
          "TextItemModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "value": {
                "type": "string",
                "nullable": true
              },
              "confidence": {
                "type": "number",
                "format": "double",
                "nullable": true
              },
              "count": {
                "type": "integer",
                "format": "int64",
                "nullable": true
              },
              "segments": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/SegmentModel"
                },
                "nullable": true
              },
              "boundingBoxes": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/BoundingBoxModel"
                },
                "nullable": true
              },
              "contextTextType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ContentTextTypes"
                  }
                ],
                "description": "Line\r\n\r\nWord\r\n\r\nPerson\r\n\r\nLocation\r\n\r\nOrganization\r\n\r\nCommercialItem\r\n\r\nEvent\r\n\r\nDate\r\n\r\nQuantity\r\n\r\nTitle\r\n\r\nEntity\r\n\r\nKeyPhrase\r\n\r\nMixedSentiment\r\n\r\nNegativeSentiment\r\n\r\nNeutralSentiment\r\n\r\nPositiveSentiment\r\n\r\nTranscript\r\n\r\nOther",
                "x-enumNames": [
                  "Line",
                  "Word",
                  "Person",
                  "Location",
                  "Organization",
                  "CommercialItem",
                  "Event",
                  "Date",
                  "Quantity",
                  "Title",
                  "Entity",
                  "KeyPhrase",
                  "MixedSentiment",
                  "NegativeSentiment",
                  "NeutralSentiment",
                  "PositiveSentiment",
                  "Transcript",
                  "Other"
                ]
              },
              "metadataType": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/MetadataTypes"
                  }
                ],
                "description": "Note that this is a PARTIAL list of types that we need to know about\r\n\r\nDocumentContent\r\n\r\nComprehendKeyPhrases\r\n\r\nComprehendEntities\r\n\r\nRekognitionImageIndexFaces\r\n\r\nRekognitionImageSearchFaces\r\n\r\nRekognitionImageLabels\r\n\r\nRekognitionImageCelebrityRecognition\r\n\r\nRekognitionVideoLabels\r\n\r\nTextractAnalyzeDocument\r\n\r\nTranscribe\r\n\r\nTranscribeVtt\r\n\r\nTranscribeTranslation\r\n\r\nTranscribeVttTranslation\r\n\r\nRekognitionVideoCelebrityRecognition\r\n\r\nRekognitionVideoPersonTracking\r\n\r\nRekognitionVideoFaceDetection\r\n\r\nImageInfo\r\n\r\nTranscode\r\n\r\nClip\r\n\r\nMediaInfo\r\n\r\nRekognitionImageDetectText\r\n\r\nRekognitionImageUnsafeContent\r\n\r\nRekognitionVideoUnsafeContent\r\n\r\nScreenshot\r\n\r\nSageMakerGroundTruthLabelResults\r\n\r\nThumbnailSheet\r\n\r\nThumbnailImage\r\n\r\nSageMakerInvokeEndpointResults\r\n\r\nSageMakerModelLabels\r\n\r\nRekognitionImageCustomLabels\r\n\r\nSageMakerManifest\r\n\r\nPreviewImage\r\n\r\nRekognitionVideoTextDetection\r\n\r\nRekognitionVideoSegmentDetection\r\n\r\nNomadVideoSegmentDetection\r\n\r\nTranscribeMedical\r\n\r\nPreviewAudio\r\n\r\nText\r\n\r\nAssetManifest\r\n\r\nIntervalSegments\r\n\r\nTranscribeMedicalText\r\n\r\nTranscribeMedicalTranslation\r\n\r\nAdobeMetadata\r\n\r\nAdobeMetadataText\r\n\r\nImageExif\r\n\r\nTextractImageDetectText\r\n\r\nAdSegments\r\n\r\nVmap\r\n\r\nVast\r\n\r\nMediaTailorVideo\r\n\r\nTranscribeSrt\r\n\r\nTranscribeRaw\r\n\r\nSubtitles\r\n\r\nVizRtMetadata\r\n\r\nProcessorJobs\r\n\r\nOfficeDocument\r\n\r\nTranscriptionContainer\r\n\r\nComprehendSentiment\r\n\r\nComprehendLanguage\r\n\r\nOriginalSourceVideo\r\n\r\nImportManifest\r\n\r\nTranscribeScc\r\n\r\nTranscribeTtml\r\n\r\nTranscribeDfxp\r\n\r\nTranscribeSmptett\r\n\r\nTranscribeXml\r\n\r\nTranscribeQt\r\n\r\nTranscribeRt\r\n\r\nTranscribeSsa\r\n\r\nTranscribeAss\r\n\r\nTranscribeSbv\r\n\r\nTranscribeSmi\r\n\r\nTranscribeSami\r\n\r\nTranscribeStl\r\n\r\nTranscribeSub\r\n\r\nAssociatedAsset\r\n\r\nMobiusLabsImageLabels\r\n\r\nMobiusLabsVideoLabels",
                "x-enumNames": [
                  "DocumentContent",
                  "ComprehendKeyPhrases",
                  "ComprehendEntities",
                  "RekognitionImageIndexFaces",
                  "RekognitionImageSearchFaces",
                  "RekognitionImageLabels",
                  "RekognitionImageCelebrityRecognition",
                  "RekognitionVideoLabels",
                  "TextractAnalyzeDocument",
                  "Transcribe",
                  "TranscribeVtt",
                  "TranscribeTranslation",
                  "TranscribeVttTranslation",
                  "RekognitionVideoCelebrityRecognition",
                  "RekognitionVideoPersonTracking",
                  "RekognitionVideoFaceDetection",
                  "ImageInfo",
                  "Transcode",
                  "Clip",
                  "MediaInfo",
                  "RekognitionImageDetectText",
                  "RekognitionImageUnsafeContent",
                  "RekognitionVideoUnsafeContent",
                  "Screenshot",
                  "SageMakerGroundTruthLabelResults",
                  "ThumbnailSheet",
                  "ThumbnailImage",
                  "SageMakerInvokeEndpointResults",
                  "SageMakerModelLabels",
                  "RekognitionImageCustomLabels",
                  "SageMakerManifest",
                  "PreviewImage",
                  "RekognitionVideoTextDetection",
                  "RekognitionVideoSegmentDetection",
                  "NomadVideoSegmentDetection",
                  "TranscribeMedical",
                  "PreviewAudio",
                  "Text",
                  "AssetManifest",
                  "IntervalSegments",
                  "TranscribeMedicalText",
                  "TranscribeMedicalTranslation",
                  "AdobeMetadata",
                  "AdobeMetadataText",
                  "ImageExif",
                  "TextractImageDetectText",
                  "AdSegments",
                  "Vmap",
                  "Vast",
                  "MediaTailorVideo",
                  "TranscribeSrt",
                  "TranscribeRaw",
                  "Subtitles",
                  "VizRtMetadata",
                  "ProcessorJobs",
                  "OfficeDocument",
                  "TranscriptionContainer",
                  "ComprehendSentiment",
                  "ComprehendLanguage",
                  "OriginalSourceVideo",
                  "ImportManifest",
                  "TranscribeScc",
                  "TranscribeTtml",
                  "TranscribeDfxp",
                  "TranscribeSmptett",
                  "TranscribeXml",
                  "TranscribeQt",
                  "TranscribeRt",
                  "TranscribeSsa",
                  "TranscribeAss",
                  "TranscribeSbv",
                  "TranscribeSmi",
                  "TranscribeSami",
                  "TranscribeStl",
                  "TranscribeSub",
                  "AssociatedAsset",
                  "MobiusLabsImageLabels",
                  "MobiusLabsVideoLabels"
                ]
              }
            },
            "additionalProperties": false
          },
          "UploadOverwriteOptions": {
            "enum": [
              "Cancel",
              "Continue",
              "Replace"
            ],
            "type": "string",
            "description": "Cancel\r\n\r\nContinue\r\n\r\nReplace",
            "x-enumNames": [
              "Cancel",
              "Continue",
              "Replace"
            ]
          },
          "UserContentAttributeSummaryModel": {
            "type": "object",
            "properties": {
              "likedCount": {
                "type": "integer",
                "format": "int64"
              },
              "dislikedCount": {
                "type": "integer",
                "format": "int64"
              },
              "liked": {
                "type": "boolean",
                "nullable": true
              },
              "disliked": {
                "type": "boolean",
                "nullable": true
              },
              "favorite": {
                "type": "boolean",
                "nullable": true
              },
              "lastSecond": {
                "type": "number",
                "format": "double",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "UserContentSecurityModel": {
            "type": "object",
            "properties": {
              "contentId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "contentDefinitionId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "userId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "email": {
                "type": "string",
                "nullable": true
              },
              "id": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "contentSecurityAttribute": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ContentSecurityAttributes"
                  }
                ],
                "description": "Undefined\r\n\r\nGuest\r\n\r\nDemo",
                "x-enumNames": [
                  "Undefined",
                  "Guest",
                  "Demo"
                ]
              },
              "keyName": {
                "type": "string",
                "nullable": true
              },
              "expirationDate": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "UserModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "The ID of the user",
                "format": "uuid"
              },
              "email": {
                "type": "string",
                "description": "The email of the user",
                "nullable": true
              },
              "firstName": {
                "type": "string",
                "description": "The first name of the user",
                "nullable": true
              },
              "lastName": {
                "type": "string",
                "description": "The last name of the user",
                "nullable": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "The additional custom properties of the user",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "UserRegistrationRequestModel": {
            "type": "object",
            "properties": {
              "email": {
                "type": "string",
                "description": "The email address of the user",
                "nullable": true
              },
              "firstName": {
                "type": "string",
                "description": "The first name of the user",
                "nullable": true
              },
              "lastName": {
                "type": "string",
                "description": "The last name of the user",
                "nullable": true
              },
              "password": {
                "type": "string",
                "description": "The password of the user",
                "nullable": true
              },
              "properties": {
                "type": "object",
                "additionalProperties": {},
                "description": "The additional custom properties for the registration",
                "nullable": true,
                "readOnly": true
              }
            },
            "additionalProperties": false
          },
          "UserResponseModel": {
            "type": "object",
            "properties": {
              "loginStatus": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LoginResponseStatuses"
                  }
                ],
                "description": "TwoFactorSetupRequired\r\n\r\nTwoFactorCodeRequired\r\n\r\nIsDisabled\r\n\r\nIsPendingEmailConfirmation\r\n\r\nIsPendingNewAccountSignup\r\n\r\nIsPendingAccountMigrationSignup\r\n\r\nIsPendingNewPassword\r\n\r\nIsExpired\r\n\r\nIsPendingInvitation",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "UserSessionModel": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid"
              },
              "userId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "firstName": {
                "type": "string",
                "nullable": true
              },
              "lastName": {
                "type": "string",
                "nullable": true
              },
              "email": {
                "type": "string",
                "nullable": true
              },
              "browserType": {
                "type": "string",
                "nullable": true
              },
              "userAgent": {
                "type": "string",
                "nullable": true
              },
              "ipAddress": {
                "type": "string",
                "nullable": true
              },
              "origin": {
                "type": "string",
                "nullable": true
              },
              "environmentName": {
                "type": "string",
                "nullable": true
              },
              "startDate": {
                "type": "string",
                "format": "date-time"
              },
              "lastActivityDate": {
                "type": "string",
                "format": "date-time"
              },
              "userSessionStatus": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/UserSessionStatuses"
                  }
                ],
                "description": "Normal\r\n\r\nChatDisabled\r\n\r\nSessionReplaced\r\n\r\nDeactivated\r\n\r\nSharedAccess\r\n\r\nPendingInvite\r\n\r\nExpired\r\n\r\nDeletedInvite",
                "x-enumNames": [
                  "Normal",
                  "ChatDisabled",
                  "SessionReplaced",
                  "Deactivated",
                  "SharedAccess",
                  "PendingInvite",
                  "Expired",
                  "DeletedInvite"
                ]
              },
              "userSessionStatusName": {
                "type": "string",
                "nullable": true
              },
              "externalId": {
                "type": "string",
                "nullable": true
              },
              "chatName": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "UserSessionStatuses": {
            "enum": [
              "Normal",
              "ChatDisabled",
              "SessionReplaced",
              "Deactivated",
              "SharedAccess",
              "PendingInvite",
              "Expired",
              "DeletedInvite"
            ],
            "type": "string",
            "description": "Normal\r\n\r\nChatDisabled\r\n\r\nSessionReplaced\r\n\r\nDeactivated\r\n\r\nSharedAccess\r\n\r\nPendingInvite\r\n\r\nExpired\r\n\r\nDeletedInvite",
            "x-enumNames": [
              "Normal",
              "ChatDisabled",
              "SessionReplaced",
              "Deactivated",
              "SharedAccess",
              "PendingInvite",
              "Expired",
              "DeletedInvite"
            ]
          },
          "UserVideoTrackingModel": {
            "type": "object",
            "properties": {
              "assetId": {
                "type": "string",
                "format": "uuid"
              },
              "contentId": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "videoTrackingAttribute": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/VideoTrackingAttributes"
                  }
                ],
                "description": "Undefined\r\n\r\nWatchlist",
                "x-enumNames": [
                  "Undefined",
                  "Watchlist"
                ]
              },
              "userId": {
                "type": "string",
                "format": "uuid"
              },
              "id": {
                "type": "string",
                "format": "uuid",
                "nullable": true
              },
              "isFirstQuartile": {
                "type": "boolean",
                "nullable": true
              },
              "isMidPoint": {
                "type": "boolean",
                "nullable": true
              },
              "isThirdQuartile": {
                "type": "boolean",
                "nullable": true
              },
              "isComplete": {
                "type": "boolean"
              },
              "isHidden": {
                "type": "boolean"
              },
              "maxSecond": {
                "type": "number",
                "format": "double"
              },
              "lastSecond": {
                "type": "number",
                "format": "double"
              },
              "totalSeconds": {
                "type": "number",
                "format": "double"
              },
              "lastBeaconDate": {
                "type": "string",
                "format": "date-time"
              },
              "keyName": {
                "type": "string",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "VerifyEmailRequestModel": {
            "required": [
              "userName"
            ],
            "type": "object",
            "properties": {
              "userName": {
                "minLength": 1,
                "type": "string",
                "description": "Username"
              },
              "token": {
                "type": "string",
                "description": "Confirmation Token",
                "nullable": true
              }
            },
            "additionalProperties": false
          },
          "VideoTrackingAttributes": {
            "enum": [
              "Undefined",
              "Watchlist"
            ],
            "type": "string",
            "description": "Undefined\r\n\r\nWatchlist",
            "x-enumNames": [
              "Undefined",
              "Watchlist"
            ]
          }
        }
      },
      "x-readme": {
        "explorer-enabled": true,
        "proxy-enabled": true,
        "samples-enabled": true
      }
    }
  },
  {
    "id": "readonly-writeonly",
    "data": {
      "openapi": "3.1.0",
      "info": {
        "title": "Operation with readOnly and writeOnly properties",
        "version": "1.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org"
        }
      ],
      "paths": {
        "/": {
          "put": {
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "propWithReadOnly": {
                        "type": "string",
                        "readOnly": true
                      },
                      "propWithWriteOnly": {
                        "type": "string",
                        "writeOnly": true
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "propWithReadOnly": {
                          "type": "string",
                          "readOnly": true
                        },
                        "propWithWriteOnly": {
                          "type": "string",
                          "writeOnly": true
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "post": {
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/product"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Created",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/product"
                    }
                  }
                }
              }
            }
          }
        },
        "/allOf": {
          "post": {
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/product_allOf"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/product_allOf"
                    }
                  }
                }
              }
            }
          }
        },
        "/readOnly": {
          "post": {
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/readOnly"
                  }
                }
              },
              "required": true
            }
          },
          "put": {
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/readOnly-partially"
                  }
                }
              },
              "required": true
            }
          }
        },
        "/writeOnly": {
          "post": {
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/writeOnly"
                  }
                }
              },
              "required": true
            }
          },
          "put": {
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/writeOnly-partially"
                  }
                }
              },
              "required": true
            }
          }
        }
      },
      "components": {
        "schemas": {
          "product_allOf": {
            "allOf": [
              {
                "$ref": "#/components/schemas/product"
              },
              {
                "type": "object",
                "properties": {
                  "readOnly_primitive": {
                    "type": "string",
                    "readOnly": true
                  },
                  "writeOnly_primitive": {
                    "type": "string",
                    "writeOnly": true
                  }
                }
              }
            ]
          },
          "product": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "readOnly": true
              },
              "product_id": {
                "type": "string",
                "format": "uuid"
              },
              "start_date": {
                "type": "string",
                "format": "YYYY-MM-DD"
              },
              "end_date": {
                "type": "string",
                "format": "YYYY-MM-DD"
              },
              "start_hour": {
                "type": "string",
                "readOnly": true
              },
              "end_hour": {
                "type": "string",
                "readOnly": true
              }
            }
          },
          "readOnly-partially": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "product_id": {
                "type": "string",
                "format": "uuid",
                "readOnly": true
              }
            }
          },
          "readOnly": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "readOnly": true
              },
              "product_id": {
                "type": "string",
                "format": "uuid",
                "readOnly": true
              },
              "start_date": {
                "type": "string",
                "format": "YYYY-MM-DD",
                "readOnly": true
              },
              "end_date": {
                "type": "string",
                "format": "YYYY-MM-DD",
                "readOnly": true
              },
              "start_hour": {
                "type": "string",
                "readOnly": true
              },
              "end_hour": {
                "type": "string",
                "readOnly": true
              }
            }
          },
          "writeOnly-partially": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "product_id": {
                "type": "string",
                "format": "uuid",
                "writeOnly": true
              }
            }
          },
          "writeOnly": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "writeOnly": true
              },
              "product_id": {
                "type": "string",
                "format": "uuid",
                "writeOnly": true
              },
              "start_date": {
                "type": "string",
                "format": "YYYY-MM-DD",
                "writeOnly": true
              },
              "end_date": {
                "type": "string",
                "format": "YYYY-MM-DD",
                "writeOnly": true
              },
              "start_hour": {
                "type": "string",
                "writeOnly": true
              },
              "end_hour": {
                "type": "string",
                "writeOnly": true
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "reduce-quirks",
    "data": {
      "openapi": "3.1.0",
      "info": {
        "version": "v2",
        "title": "Example API"
      },
      "servers": [
        {
          "url": "https://example.com/v2"
        }
      ],
      "paths": {
        "/events": {
          "get": {
            "operationId": "search-events",
            "summary": "Search events",
            "tags": [
              "Events"
            ],
            "responses": {
              "200": {
                "$ref": "#/components/responses/200-event-search"
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "pagination": {
            "type": "object",
            "properties": {
              "current_page": {
                "type": "integer"
              },
              "next_page": {
                "type": "integer"
              },
              "previous_page": {
                "type": "integer"
              },
              "total_items": {
                "type": "integer"
              },
              "total_pages": {
                "type": "integer"
              },
              "page_size": {
                "type": "integer"
              }
            }
          },
          "links": {
            "type": "object",
            "properties": {
              "next_page_url": {
                "type": "string"
              },
              "previous_page_url": {
                "type": "string"
              }
            }
          },
          "event": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "unique_key": {
                "type": "string"
              },
              "title": {
                "type": "string"
              },
              "calendar_id": {
                "type": "string"
              },
              "datetime_start": {
                "type": "string"
              },
              "datetime_end": {
                "type": "string"
              },
              "all_day_event": {
                "type": "boolean"
              },
              "timezone": {
                "type": "string"
              },
              "recurring_rule": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "internal_name": {
                "type": "string"
              },
              "location": {
                "type": "string"
              },
              "location_id": {
                "type": "integer"
              },
              "organizer_name": {
                "type": "string"
              },
              "organizer_email": {
                "type": "string",
                "format": "email"
              },
              "reminder": {
                "type": "integer"
              },
              "color": {
                "type": "integer"
              },
              "free_busy": {
                "type": "string"
              },
              "landing_page_template_id": {
                "type": "string"
              },
              "rsvp_enabled": {
                "type": "boolean"
              },
              "rsvp": {
                "type": "object",
                "properties": {
                  "settings": {
                    "$ref": "#/components/schemas/event-rsvp-settings"
                  },
                  "stats": {
                    "$ref": "#/components/schemas/event-rsvp-stats"
                  }
                }
              },
              "custom_data": {
                "type": "object"
              },
              "link_long": {
                "type": "string"
              },
              "link_short": {
                "type": "string"
              },
              "created": {
                "type": "string"
              },
              "modified": {
                "type": "string"
              }
            }
          },
          "event-rsvp-settings": {
            "type": "object",
            "properties": {
              "rsvp_form_id": {
                "type": "string"
              },
              "seats_limited": {
                "type": "boolean"
              },
              "seats_limit": {
                "type": "integer"
              },
              "inactive": {
                "type": "boolean"
              },
              "notify_emails": {
                "type": "string"
              },
              "notify_frequency": {
                "type": "string"
              }
            }
          },
          "event-rsvp-stats": {
            "type": "object",
            "properties": {
              "seats_left": {
                "type": "integer"
              },
              "count_total": {
                "type": "integer"
              },
              "count_going": {
                "type": "integer"
              },
              "count_maybe": {
                "type": "integer"
              },
              "count_cantgo": {
                "type": "integer"
              }
            }
          },
          "event-input": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string",
                "pattern": "^(?!\\s*$).+"
              },
              "calendar_id": {
                "type": "string",
                "pattern": "^(?!\\s*$).+"
              },
              "datetime_start": {
                "type": "string",
                "pattern": "^\\d{4}-\\d{2}-\\d{2}(\\s\\d{2}:\\d{2}(:\\d{2})?)?$"
              },
              "datetime_end": {
                "type": "string",
                "pattern": "^\\d{4}-\\d{2}-\\d{2}(\\s\\d{2}:\\d{2}(:\\d{2})?)?$"
              },
              "all_day_event": {
                "type": "boolean",
                "default": false
              },
              "timezone": {
                "type": "string",
                "pattern": "^(?!\\s*$).+"
              },
              "recurring_rule": {
                "type": "string",
                "pattern": "(?:(\\w+)=((?:(?:[^;,=]+,?)*[^;,=])|\"(?:[^\"]|\"\")*\");?)+"
              },
              "description": {
                "type": "string"
              },
              "internal_name": {
                "type": "string"
              },
              "location": {
                "type": "string"
              },
              "location_id": {
                "type": "integer",
                "minimum": 0
              },
              "organizer_name": {
                "type": "string"
              },
              "organizer_email": {
                "type": "string",
                "format": "email",
                "pattern": "^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
              },
              "reminder": {
                "type": "integer",
                "minimum": 0,
                "maximum": 10800,
                "default": 60
              },
              "color": {
                "type": "integer",
                "minimum": 1,
                "maximum": 20,
                "default": 1
              },
              "free_busy": {
                "type": "string",
                "enum": [
                  "free",
                  "busy",
                  "default"
                ],
                "default": "default"
              },
              "landing_page_template_id": {
                "type": "string",
                "pattern": "^(?!\\s*$).+",
                "default": "default"
              },
              "rsvp_enabled": {
                "type": "boolean",
                "default": false
              },
              "rsvp_form_id": {
                "type": "string",
                "pattern": "^(?!\\s*$).+",
                "default": "default"
              },
              "custom_data": {
                "type": "object"
              }
            }
          }
        },
        "responses": {
          "200-event-search": {
            "description": "Ok",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "pagination": {
                      "$ref": "#/components/schemas/pagination"
                    },
                    "links": {
                      "$ref": "#/components/schemas/links"
                    },
                    "events": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/event"
                      }
                    }
                  }
                },
                "examples": {
                  "Search results": {
                    "$ref": "#/components/examples/event-search"
                  }
                }
              }
            }
          }
        },
        "examples": {
          "event-min": {
            "value": {
              "id": "evt-0f571af553d8437eb6a9ce22384fdcba",
              "calendar_id": 1687480957492930,
              "unique_key": "de16434237",
              "title": "Event name",
              "internal_name": "",
              "datetime_start": "2023-07-02 15:00:00",
              "datetime_end": "2023-07-02 16:00:00",
              "recurring_rule": "",
              "all_day_event": false,
              "timezone": "America/Los_Angeles",
              "description": "",
              "location": "",
              "location_id": 0,
              "organizer_name": "",
              "organizer_email": "",
              "reminder": 60,
              "free_busy": "default",
              "color": 1,
              "landing_page_template_id": "default",
              "rsvp_enabled": false,
              "rsvp": {
                "settings": {
                  "rsvp_form_id": "default",
                  "seats_limited": false,
                  "seats_limit": 50,
                  "inactive": false,
                  "notify_emails": "",
                  "notify_frequency": "none"
                },
                "stats": {
                  "seats_left": 50,
                  "count_total": 0,
                  "count_going": 0,
                  "count_maybe": 0,
                  "count_cantgo": 0
                }
              },
              "custom_data": {},
              "link_long": "https://example.com/event/de16434237",
              "link_short": "https://example.com/aougueghw",
              "created": "2023-07-19 23:46:13",
              "modified": "2023-07-19 23:46:37"
            }
          },
          "event-all": {
            "value": {
              "id": "evt-0f571af553d8437eb6a9ce22384fdcba",
              "calendar_id": 1687480957492930,
              "unique_key": "de16434237",
              "title": "Event name",
              "internal_name": "internal event name",
              "datetime_start": "2023-07-02 15:00:00",
              "datetime_end": "2023-07-02 16:00:00",
              "recurring_rule": "FREQ=DAILY;COUNT=2",
              "all_day_event": false,
              "timezone": "America/Los_Angeles",
              "description": "This is a description of what the event is about.",
              "location": "https://example.com/123456",
              "location_id": 0,
              "organizer_name": "Lorem Ipsum",
              "organizer_email": "lorem@example.com",
              "reminder": 60,
              "free_busy": "default",
              "color": 1,
              "landing_page_template_id": "QnTHySwB6570",
              "rsvp_enabled": true,
              "rsvp": {
                "settings": {
                  "rsvp_form_id": "8709VYGmXZOkJh",
                  "seats_limited": false,
                  "seats_limit": 50,
                  "inactive": false,
                  "notify_emails": "",
                  "notify_frequency": "none"
                },
                "stats": {
                  "seats_left": 50,
                  "count_total": 20,
                  "count_going": 15,
                  "count_maybe": 3,
                  "count_cantgo": 2
                }
              },
              "custom_data": {
                "internal_id": 123456,
                "bannerimage": "https://cdn.example.org/banner1.jpg"
              },
              "link_long": "https://example.com/event/de16434237",
              "link_short": "https://example.com/aougueghw",
              "created": "2023-07-19 23:46:13",
              "modified": "2023-07-19 23:46:37"
            }
          },
          "event-search": {
            "value": {
              "pagination": {
                "pagination": {
                  "current_page": 1,
                  "next_page": 1,
                  "previous_page": 1,
                  "total_items": 2,
                  "total_pages": 1,
                  "page_size": 10
                },
                "links": {
                  "next_page_url": "https://api.example.com/calevent/v2/events&page=1",
                  "previous_page_url": "https://api.example.com/calevent/v2/events&page=1"
                },
                "events": [
                  {
                    "$ref": "#/components/examples/event-min/value"
                  },
                  {
                    "$ref": "#/components/examples/event-all/value"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "requestbody-example-quirks",
    "data": {
      "openapi": "3.1.0",
      "info": {
        "title": "Request example quirks",
        "version": "1.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org"
        }
      ],
      "paths": {
        "/anything": {
          "post": {
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "required": [
                      "paymentMethodId",
                      "amount",
                      "currency"
                    ],
                    "properties": {
                      "paymentMethodId": {
                        "type": "string"
                      },
                      "amount": {
                        "type": "string"
                      },
                      "currency": {
                        "type": "string"
                      }
                    }
                  },
                  "examples": {
                    "Brazil": {
                      "value": {
                        "paymentMethodId": "brazil.5e98df1f-1701-499b-a739-4e5e70d51c9b",
                        "amount": 25000,
                        "currency": "brazil.BRL"
                      }
                    },
                    "Colombia": {
                      "value": {
                        "paymentmethodid": "colombia.1cd4740f-16c7-419b-a84f-734292c89f01",
                        "amount": 40000,
                        "currency": "colombia.COP"
                      }
                    },
                    "Chile": {
                      "value": {
                        "paymentMethodId": "chile.8f0414bf-7cef-47fd-82aa-a77a2fe655f6",
                        "amount": 2345,
                        "currency": "chile.CLP"
                      }
                    },
                    "Mexico": {
                      "value": {
                        "paymentmethodid": "mexico.0ef648e0-9f31-4efa-9db8-cf78125d1bdc",
                        "amount": 500,
                        "currency": "mexico.MXN"
                      }
                    },
                    "Ecuador": {
                      "value": {
                        "paymentmethodid": "ecuador.1d8b9dd0-80e6-472a-a06f-b518eb24aa58",
                        "amount": 1067,
                        "currency": "ecuador.USD"
                      }
                    },
                    "Argentina": {
                      "value": {
                        "paymentmethodid": "argentina.598f2405-21d6-4e6f-a2cb-617a463a45e7",
                        "amount": 40000,
                        "currency": "argentina.ARS"
                      }
                    },
                    "Costa Rica": {
                      "value": {
                        "paymentmethodid": "costarica.eb2fc2cb-22f1-4ce2-a25b-7ff54cb646e9",
                        "amount": 172105,
                        "currency": "costarica.CRC"
                      }
                    },
                    "Peru": {
                      "value": {
                        "paymentmethodid": "peru.8d74f8f2-dc96-435f-9e10-330578740da9",
                        "amount": 90021,
                        "currency": "peru.PES"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "200"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "response-enums",
    "data": {
      "openapi": "3.0.3",
      "info": {
        "title": "Responses w/ enums",
        "description": "This is a demo API definition for our support to supplement response schema descriptions with enums are present.",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org"
        }
      ],
      "paths": {
        "/anything": {
          "post": {
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/enum-request"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/enum-request"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "enum-request": {
            "type": "object",
            "properties": {
              "stock": {
                "type": "string"
              },
              "description (markdown)": {
                "type": "string",
                "description": "This is a string with a **markdown** description: [link](ref:action-object)"
              },
              "enum (no description)": {
                "type": "string",
                "enum": [
                  "available",
                  "pending",
                  "sold"
                ]
              },
              "enum (with boolean values)": {
                "type": "boolean",
                "enum": [
                  true,
                  false
                ]
              },
              "enum (with default)": {
                "type": "string",
                "description": "This enum has a `default` of `available`.",
                "enum": [
                  "available",
                  "pending",
                  "sold"
                ],
                "default": "available"
              },
              "enum (with default + no description)": {
                "type": "string",
                "enum": [
                  "available",
                  "pending",
                  "sold"
                ],
                "default": "available"
              },
              "enum (with empty option)": {
                "type": "string",
                "description": "This enum has a an empty string (`\"\"`) as one of its available options.",
                "enum": [
                  "",
                  "available",
                  "pending",
                  "sold"
                ]
              },
              "enum (with empty option and empty default)": {
                "type": "string",
                "description": "This enum has a an empty string (`\"\"`) as its only available option, and that same value is set as its `default`.",
                "enum": [
                  ""
                ],
                "default": ""
              },
              "enum (with null value)": {
                "type": "string",
                "nullable": true,
                "enum": [
                  "available",
                  "pending",
                  "sold",
                  null
                ]
              },
              "enum (with value 0)": {
                "type": "number",
                "enum": [
                  0,
                  1
                ]
              },
              "enum (with value containing only a space)": {
                "type": "string",
                "nullable": true,
                "enum": [
                  "available",
                  ""
                ]
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "responses",
    "data": {
      "openapi": "3.0.3",
      "info": {
        "title": "Various response handling cases",
        "version": "1.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org/anything"
        }
      ],
      "paths": {
        "/vendor-prefix-content-type": {
          "get": {
            "description": "We should be able to return a response schema on vendor-prefixed content type that's JSON-compatible.",
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/vnd.partytime+json": {
                    "schema": {
                      "$ref": "#/components/schemas/simple-object"
                    }
                  }
                }
              }
            }
          }
        },
        "/vendored-xml-content-type-suffix": {
          "get": {
            "description": "We should be able to return a response schema on vendor-prefixed content type that's XML-compatible.",
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "text/plain+xml": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/multiple-responses-with-a-json-compatible": {
          "get": {
            "description": "We should always prefer a JSON-compatible content type when multiple content types are present in a response.",
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "image/png": {
                    "schema": {
                      "type": "string"
                    }
                  },
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/simple-object"
                    }
                  }
                }
              }
            }
          }
        },
        "/multiple-responses-with-json-compatible-and-wildcard": {
          "get": {
            "description": "We should always prefer the JSON-compatible content type when both JSON and wildcard content types are present.",
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "*/*": {
                    "schema": {
                      "type": "string"
                    }
                  },
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/simple-object"
                    }
                  },
                  "image/png": {
                    "schema": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          }
        },
        "/wildcard-content-type": {
          "get": {
            "description": "We should be able to handle wildcard content types.",
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "*/*": {
                    "schema": {
                      "$ref": "#/components/schemas/simple-object"
                    }
                  }
                }
              }
            }
          }
        },
        "/response-with-example-and-no-schema": {
          "get": {
            "responses": {
              "200": {
                "content": {
                  "application/json": {
                    "example": [
                      {
                        "id": 29748772,
                        "calendar_ids": [
                          6625762,
                          6447372
                        ]
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "simple-object": {
            "type": "object",
            "properties": {
              "foo": {
                "type": "string"
              },
              "bar": {
                "type": "number"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "schema-deprecated",
    "data": {
      "openapi": "3.0.3",
      "info": {
        "title": "Support for `deprecated` declaration",
        "description": "https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject\n\nhttps://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameter-object\n\nhttps://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schema-object",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org"
        }
      ],
      "paths": {
        "/anything": {
          "post": {
            "description": "https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject",
            "deprecated": true,
            "parameters": [
              {
                "name": "filter",
                "in": "query",
                "description": "This query parameter is explicitly **not** deprecated.",
                "explode": true,
                "schema": {
                  "type": "string",
                  "enum": [
                    "active",
                    "inactive"
                  ]
                }
              },
              {
                "name": "filterLegacy",
                "in": "query",
                "deprecated": true,
                "description": "This query parameter is deprecated.\n\nhttps://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameter-object",
                "explode": true,
                "schema": {
                  "type": "string",
                  "enum": [
                    "active",
                    "inactive"
                  ]
                }
              },
              {
                "name": "status",
                "in": "query",
                "deprecated": true,
                "required": true,
                "explode": true,
                "schema": {
                  "type": "array",
                  "items": {
                    "deprecated": true,
                    "type": "string",
                    "enum": [
                      "available",
                      "pending",
                      "sold"
                    ],
                    "default": "available"
                  }
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Pet"
                  }
                }
              },
              "description": "Pet object that needs to be added to the store",
              "required": true
            },
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Pet"
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid status value"
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "Category": {
            "type": "object",
            "properties": {
              "id": {
                "deprecated": true,
                "type": "integer",
                "format": "int64"
              },
              "name": {
                "deprecated": true,
                "type": "string"
              }
            }
          },
          "Tag": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "name": {
                "type": "string"
              }
            }
          },
          "Tag_deprecated": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64",
                "deprecated": true
              },
              "name": {
                "type": "string",
                "deprecated": true
              }
            }
          },
          "Pet": {
            "type": "object",
            "required": [
              "name",
              "photoUrls"
            ],
            "properties": {
              "id": {
                "description": "This `requestBody` schema property is marked as deprecated.\n\nhttps://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schema-object",
                "deprecated": true,
                "type": "integer",
                "format": "int64",
                "default": 40,
                "example": 25
              },
              "category": {
                "$ref": "#/components/schemas/Category"
              },
              "category_alt": {
                "description": "Though this loads a `$ref` to the `Category` schema, and that contains deprecated properties within itself, this `category_alt` parameter is also deprecated.",
                "deprecated": true,
                "$ref": "#/components/schemas/Category"
              },
              "name": {
                "deprecated": true,
                "type": "string",
                "example": "doggie"
              },
              "photoUrls": {
                "deprecated": true,
                "type": "array",
                "items": {
                  "deprecated": true,
                  "type": "string",
                  "example": "https://example.com/photo.png"
                }
              },
              "tags": {
                "deprecated": true,
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Tag"
                }
              },
              "idReadOnly": {
                "deprecated": true,
                "readOnly": true,
                "type": "integer",
                "format": "int64",
                "default": 40,
                "example": 25
              },
              "tags_alt": {
                "description": "Unlike the `tags` parameter, this is **not** deprecated, but the contents within itself are.",
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Tag_deprecated"
                }
              },
              "status": {
                "$ref": "#/components/schemas/Status"
              },
              "polymorphism": {
                "type": "object",
                "properties": {
                  "oneOf": {
                    "description": "This is a `oneOf` that's marked as deprecated.",
                    "deprecated": true,
                    "oneOf": [
                      {
                        "title": "option 1",
                        "$ref": "#/components/schemas/StatusWrapper"
                      },
                      {
                        "title": "option 2",
                        "$ref": "#/components/schemas/StatusWrapper"
                      }
                    ]
                  },
                  "allOf": {
                    "description": "This is a `allOf` that's marked as deprecated.",
                    "deprecated": true,
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/StatusWrapper"
                      },
                      {
                        "$ref": "#/components/schemas/StatusWrapper"
                      }
                    ]
                  },
                  "anyOf": {
                    "description": "This is a `anyOf` that's marked as deprecated.",
                    "deprecated": true,
                    "anyOf": [
                      {
                        "title": "option 1",
                        "$ref": "#/components/schemas/StatusWrapper"
                      },
                      {
                        "title": "option 2",
                        "$ref": "#/components/schemas/StatusWrapper"
                      }
                    ]
                  }
                }
              }
            }
          },
          "Status": {
            "type": "string",
            "deprecated": true,
            "description": "pet status in the store",
            "enum": [
              "available",
              "pending",
              "sold"
            ]
          },
          "StatusWrapper": {
            "type": "object",
            "properties": {
              "status": {
                "$ref": "#/components/schemas/Status"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": "security-root-level",
    "data": {
      "openapi": "3.0.3",
      "info": {
        "version": "1.0.0",
        "title": "Example API definition with a root-defined `security` setup."
      },
      "servers": [
        {
          "url": "https://httpbin.org"
        }
      ],
      "security": [
        {
          "apiKey_query": []
        }
      ],
      "paths": {
        "/anything/apiKey": {
          "get": {
            "summary": "Query parameter",
            "description": "`apiKey` auth will be supplied within an `apiKey` query parameter.",
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          },
          "post": {
            "summary": "Cookie",
            "description": "`apiKey` auth will be supplied within an `api_key` cookie.",
            "responses": {
              "200": {
                "description": "OK"
              }
            },
            "security": [
              {
                "apiKey_cookie": []
              }
            ]
          }
        }
      },
      "components": {
        "securitySchemes": {
          "apiKey_cookie": {
            "type": "apiKey",
            "in": "cookie",
            "name": "api_key",
            "description": "An API key that will be supplied in a named cookie. https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#security-scheme-object"
          },
          "apiKey_query": {
            "type": "apiKey",
            "in": "query",
            "name": "apiKey",
            "description": "An API key that will be supplied in a named query parameter. https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#security-scheme-object"
          }
        }
      }
    }
  },
  {
    "id": "server-variables",
    "data": {
      "openapi": "3.1.0",
      "info": {
        "title": "Server variables",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": "https://{name}.example.com:{port}/{basePath}",
          "variables": {
            "name": {
              "default": "demo"
            },
            "port": {
              "default": "443"
            },
            "basePath": {
              "default": "v2"
            }
          }
        },
        {
          "url": "{protocol}://{hostname}/api/public/v1",
          "variables": {
            "protocol": {
              "default": "http"
            },
            "hostname": {
              "default": "localhost:10000"
            }
          }
        }
      ],
      "paths": {
        "/post": {
          "post": {
            "summary": "Should fetch variables from defaults and user values"
          }
        },
        "/tables/{tableId}/rows/{rowId}": {
          "put": {
            "summary": "Should be able to match a complex URL that uses a server that has a full hostname as a server variable.",
            "parameters": [
              {
                "in": "path",
                "name": "tableId",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "in": "path",
                "name": "rowId",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "id": "tag-quirks",
    "data": {
      "openapi": "3.0.3",
      "info": {
        "title": "An API definition that has an operation that lives in multiple tags/",
        "description": "https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#tagObject",
        "version": "1.0"
      },
      "servers": [
        {
          "url": "https://httpbin.org"
        }
      ],
      "tags": [
        {
          "name": "pet",
          "description": "Everything about your Pets"
        },
        {
          "name": "store",
          "description": "Access to Petstore orders"
        }
      ],
      "paths": {
        "/pet": {
          "post": {
            "tags": [
              "pet"
            ],
            "summary": "Add a new pet to the store",
            "description": "",
            "operationId": "addPet",
            "parameters": [],
            "responses": {
              "405": {
                "description": "Invalid input"
              }
            },
            "requestBody": {
              "$ref": "#/components/requestBodies/Pet"
            }
          }
        },
        "/store/inventory": {
          "get": {
            "tags": [
              "commerce",
              "store"
            ],
            "summary": "Returns pet inventories by status",
            "description": "Returns a map of status codes to quantities",
            "operationId": "getInventory",
            "parameters": [],
            "responses": {
              "200": {
                "description": "successful operation",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "integer",
                        "format": "int32"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "Category": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "name": {
                "type": "string"
              }
            },
            "xml": {
              "name": "Category"
            }
          },
          "Tag": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "name": {
                "type": "string"
              }
            },
            "xml": {
              "name": "Tag"
            }
          },
          "Pet": {
            "type": "object",
            "required": [
              "name",
              "photoUrls"
            ],
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64",
                "readOnly": true
              },
              "category": {
                "$ref": "#/components/schemas/Category"
              },
              "name": {
                "type": "string",
                "example": "doggie"
              },
              "photoUrls": {
                "type": "array",
                "xml": {
                  "name": "photoUrl",
                  "wrapped": true
                },
                "items": {
                  "type": "string"
                }
              },
              "tags": {
                "type": "array",
                "xml": {
                  "name": "tag",
                  "wrapped": true
                },
                "items": {
                  "$ref": "#/components/schemas/Tag"
                }
              },
              "status": {
                "type": "string",
                "description": "pet status in the store",
                "enum": [
                  "available",
                  "pending",
                  "sold"
                ]
              }
            },
            "xml": {
              "name": "Pet"
            }
          }
        },
        "requestBodies": {
          "Pet": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Pet"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Pet"
                }
              }
            },
            "description": "Pet object that needs to be added to the store",
            "required": true
          }
        }
      }
    }
  }
]
