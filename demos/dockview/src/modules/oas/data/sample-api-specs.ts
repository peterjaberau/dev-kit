export const data = {
  "openapi": "3.0.3",
  "info": {
    "title": "Comprehensive Sample API",
    "version": "1.0.0",
    "description": "An example API demonstrating various OpenAPI 3.0 features."
  },
  "servers": [
    { "url": "https://api.example.com/v1" }
  ],
  "security": [
    { "ApiKeyAuth": [] }
  ],
  "tags": [
    { "name": "Users", "description": "Operations about users" },
    { "name": "Pets", "description": "Operations about pets" }
  ],
  "paths": {
    "/users": {
      "get": {
        "tags": ["Users"],
        "summary": "List all users",
        "responses": {
          "200": {
            "description": "A list of users",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/Person" }
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": ["Users"],
        "summary": "Create a new user",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/Person" }
            }
          }
        },
        "responses": {
          "201": {
            "description": "The created user",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Person" }
              }
            }
          },
          "400": {
            "description": "Invalid input",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Error" }
              }
            }
          }
        }
      }
    },

    "/users/{userId}/things": {
      "parameters": [
        { "$ref": "#/components/parameters/UserId" }
      ],
      "get": {
        "tags": ["Users"],
        "summary": "Retrieve a map of miscellaneous things for a user",
        "responses": {
          "200": {
            "description": "A map of string keys to integer values",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/ExampleMap" }
              }
            }
          }
        }
      }
    },

    "/pets": {
      "get": {
        "tags": ["Pets"],
        "summary": "List all pets",
        "responses": {
          "200": {
            "description": "A list of pets",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/Pet" }
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": ["Pets"],
        "summary": "Create a new pet",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/Pet" }
            }
          }
        },
        "responses": {
          "201": {
            "description": "The created pet",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Pet" }
              }
            }
          },
          "400": {
            "description": "Invalid input",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Error" }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "ApiKeyAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "X-API-Key"
      }
    },
    "parameters": {
      "UserId": {
        "name": "userId",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9-]+$"
        },
        "description": "The ID of the user"
      }
    },
    "schemas": {
      "Person": {
        "type": "object",
        "required": ["name"],
        "properties": {
          "name": {
            "type": "string",
            "description": "The person’s name"
          },
          "age": {
            "type": "integer",
            "format": "int32",
            "minimum": 0,
            "description": "Age in years"
          },
          "address": {
            "$ref": "#/components/schemas/Address"
          },
          "pets": {
            "type": "array",
            "items": { "$ref": "#/components/schemas/Pet" }
          },
          "metadata": {
            "allOf": [
              { "$ref": "#/components/schemas/ExampleMap" },
              {
                "type": "object",
                "description": "Additional metadata about the person"
              }
            ]
          }
        },
        "description": "A user of the system"
      },
      "Address": {
        "type": "object",
        "properties": {
          "street": { "type": "string" },
          "city":   { "type": "string" },
          "state":  { "type": "string" },
          "zip":    { "type": "string", "pattern": "^[0-9]{5}(-[0-9]{4})?$" }
        },
        "additionalProperties": false
      },
      "Pet": {
        "type": "object",
        "discriminator": {
          "propertyName": "petType",
          "mapping": {
            "dog": "#/components/schemas/Dog",
            "cat": "#/components/schemas/Cat"
          }
        },
        "oneOf": [
          { "$ref": "#/components/schemas/Dog" },
          { "$ref": "#/components/schemas/Cat" }
        ],
        "description": "A pet (either a Dog or a Cat)"
      },
      "PetBase": {
        "type": "object",
        "required": ["petType", "name"],
        "properties": {
          "petType": {
            "type": "string",
            "description": "Discriminator for the pet type"
          },
          "name": {
            "type": "string",
            "description": "The pet’s name"
          }
        }
      },
      "Dog": {
        "allOf": [
          { "$ref": "#/components/schemas/PetBase" },
          {
            "type": "object",
            "properties": {
              "breed": {
                "type": "string",
                "enum": ["pug", "bulldog", "beagle"]
              },
              "huntingSkill": {
                "type": "string",
                "default": "lazy",
                "enum": ["clueless", "lazy", "adventurous", "aggressive"]
              }
            }
          }
        ],
        "description": "A dog"
      },
      "Cat": {
        "allOf": [
          { "$ref": "#/components/schemas/PetBase" },
          {
            "type": "object",
            "properties": {
              "huntingSkill": {
                "type": "string",
                "default": "lazy",
                "enum": ["clueless", "lazy", "adventurous", "aggressive"]
              },
              "indoor": {
                "type": "boolean",
                "description": "Whether the cat stays indoors"
              }
            }
          }
        ],
        "description": "A cat"
      },
      "ExampleMap": {
        "type": "object",
        "description": "An object with arbitrary string keys and integer values",
        "patternProperties": {
          "^.+$": {
            "type": "integer"
          }
        },
        "additionalProperties": false
      },
      "MixedType": {
        "anyOf": [
          { "type": "string" },
          { "type": "integer" }
        ],
        "description": "A value that may be a string or an integer"
      },
      "Error": {
        "type": "object",
        "required": ["code", "message"],
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          },
          "details": {
            "$ref": "#/components/schemas/MixedType"
          }
        }
      }
    }
  }
}
