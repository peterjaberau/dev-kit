export const mockData = {}


export const mockDataForForm = [
  {
    name: "xstate-v5-schema-original",
    schema: {
      "type": "object",
      "$schema": "http://json-schema.org/draft-07/schema",
      "$defs": {
        "actionObject": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "description": "The action type"
            }
          },
          "additionalProperties": true,
          "required": ["type"]
        },
        "baseStateNode": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "key": {
              "type": "string"
            },
            "type": {
              "type": "string",
              "enum": ["atomic", "compound", "parallel", "final", "history"]
            },
            "order": {
              "$ref": "#/$defs/order"
            },
            "description": {
              "type": "string",
              "description": "The description of the state node, in Markdown"
            }
          },
          "required": ["id", "key", "type"]
        },
        "compoundStateNode": {
          "allOf": [
            { "$ref": "#/$defs/baseStateNode" },
            {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "pattern": "compound"
                },
                "entry": {
                  "type": "array",
                  "items": {
                    "$ref": "#/$defs/actionObject"
                  }
                },
                "exit": {
                  "type": "array",
                  "items": {
                    "$ref": "#/$defs/actionObject"
                  }
                },
                "initial": {
                  "$ref": "#/$defs/initialTransitionObject"
                },
                "invoke": {
                  "$ref": "#/$defs/invokeArray"
                },
                "on": {
                  "$ref": "#/$defs/transitionsObject"
                },
                "states": {
                  "$ref": "#/$defs/statesObject"
                }
              },
              "required": ["states"]
            }
          ]
        },
        "parallelStateNode": {
          "allOf": [
            { "$ref": "#/$defs/baseStateNode" },
            {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "pattern": "parallel"
                },
                "entry": {
                  "type": "array",
                  "items": {
                    "$ref": "#/$defs/actionObject"
                  }
                },
                "exit": {
                  "type": "array",
                  "items": {
                    "$ref": "#/$defs/actionObject"
                  }
                },
                "invoke": {
                  "$ref": "#/$defs/invokeArray"
                },
                "on": {
                  "$ref": "#/$defs/transitionsObject"
                },
                "states": {
                  "$ref": "#/$defs/statesObject"
                }
              },
              "required": ["states"]
            }
          ]
        },
        "atomicStateNode": {
          "allOf": [
            { "$ref": "#/$defs/baseStateNode" },
            {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "pattern": "atomic"
                },
                "entry": {
                  "type": "array",
                  "items": {
                    "$ref": "#/$defs/actionObject"
                  }
                },
                "exit": {
                  "type": "array",
                  "items": {
                    "$ref": "#/$defs/actionObject"
                  }
                },
                "invoke": {
                  "$ref": "#/$defs/invokeArray"
                },
                "on": {
                  "$ref": "#/$defs/transitionsObject"
                }
              },
              "required": ["on"]
            }
          ]
        },
        "historyStateNode": {
          "allOf": [
            { "$ref": "#/$defs/baseStateNode" },
            {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "pattern": "history"
                },
                "history": {
                  "type": "string",
                  "enum": ["shallow", "deep"]
                }
              },
              "required": ["history"]
            }
          ]
        },
        "finalStateNode": {
          "allOf": [
            { "$ref": "#/$defs/baseStateNode" },
            {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "pattern": "final"
                },
                "data": {
                  "type": "object"
                }
              }
            }
          ]
        },
        "statesObject": {
          "type": "object",
          "patternProperties": {
            "^.*$": {
              "oneOf": [
                { "$ref": "#/$defs/atomicStateNode" },
                { "$ref": "#/$defs/compoundStateNode" },
                { "$ref": "#/$defs/parallelStateNode" },
                { "$ref": "#/$defs/historyStateNode" },
                { "$ref": "#/$defs/finalStateNode" }
              ]
            }
          }
        },
        "initialTransitionObject": {
          "type": "object",
          "properties": {
            "actions": {
              "type": "array",
              "items": {
                "$ref": "#/$defs/actionObject"
              }
            },
            "source": {
              "type": "string"
            },
            "target": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "minItems": 1
            }
          },
          "required": ["actions", "eventType", "source", "target"]
        },
        "transitionsObject": {
          "type": "object",
          "patternProperties": {
            "^.*$": {
              "type": "array",
              "items": {
                "$ref": "#/$defs/transitionObject"
              }
            }
          }
        },
        "transitionObject": {
          "type": "object",
          "properties": {
            "actions": {
              "type": "array",
              "items": {
                "$ref": "#/$defs/actionObject"
              }
            },
            "cond": {
              "type": "object"
            },
            "eventType": {
              "type": "string"
            },
            "source": {
              "type": "string"
            },
            "target": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": ["actions", "eventType", "source", "target"]
        },
        "invokeObject": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "src": {
              "type": "string"
            }
          },
          "required": ["type", "id", "src"],
          "additionalProperties": false
        },
        "invokeArray": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/invokeObject"
          }
        },
        "functionObject": {
          "type": "object",
          "properties": {
            "$function": {
              "type": "string"
            }
          }
        },
        "order": {
          "type": "integer"
        }
      },
      "properties": {
        "id": {
          "title": "ID",
          "type": "string"
        },
        "initial": {
          "$ref": "#/$defs/initialTransitionObject"
        },
        "key": {
          "type": "string"
        },
        "type": {
          "type": "string",
          "enum": ["compound", "parallel"]
        },
        "context": {
          "type": "object"
        },
        "states": {
          "$ref": "#/$defs/statesObject"
        },
        "on": {
          "$ref": "#/$defs/transitionsObject"
        },
        "transitions": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/transitionObject"
          }
        },
        "entry": {
          "type": "array"
        },
        "exit": {
          "type": "array"
        },
        "order": {
          "$ref": "#/$defs/order"
        },
        "invoke": {
          "$ref": "#/$defs/invokeArray"
        },
        "version": {
          "type": "string"
        }
      },
      "required": ["id", "key", "type", "states"]
    }
    ,
    uiSchema: {},
    formData: {}
  },
  {
    name: "xstate-v5-schema-standardized",
    schema: {
      "type": "object",
      "$schema": "http://json-schema.org/draft-07/schema",
      "definitions": {
        "actionObject": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "description": "The action type"
            }
          },
          "additionalProperties": true,
          "required": ["type"]
        },
        "baseStateNode": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "key": {
              "type": "string"
            },
            "type": {
              "type": "string",
              "enum": ["atomic", "compound", "parallel", "final", "history"]
            },
            "order": {
              "$ref": "#/definitions/order"
            },
            "description": {
              "type": "string",
              "description": "The description of the state node, in Markdown"
            }
          },
          "required": ["id", "key", "type"]
        },
        "compoundStateNode": {
          "allOf": [
            { "$ref": "#/definitions/baseStateNode" },
            {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "pattern": "compound"
                },
                "entry": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/actionObject"
                  }
                },
                "exit": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/actionObject"
                  }
                },
                "initial": {
                  "$ref": "#/definitions/initialTransitionObject"
                },
                "invoke": {
                  "$ref": "#/definitions/invokeArray"
                },
                "on": {
                  "$ref": "#/definitions/transitionsObject"
                },
                "states": {
                  "$ref": "#/definitions/statesObject"
                }
              },
              "required": ["states"]
            }
          ]
        },
        "parallelStateNode": {
          "allOf": [
            { "$ref": "#/definitions/baseStateNode" },
            {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "pattern": "parallel"
                },
                "entry": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/actionObject"
                  }
                },
                "exit": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/actionObject"
                  }
                },
                "invoke": {
                  "$ref": "#/definitions/invokeArray"
                },
                "on": {
                  "$ref": "#/definitions/transitionsObject"
                },
                "states": {
                  "$ref": "#/definitions/statesObject"
                }
              },
              "required": ["states"]
            }
          ]
        },
        "atomicStateNode": {
          "allOf": [
            { "$ref": "#/definitions/baseStateNode" },
            {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "pattern": "atomic"
                },
                "entry": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/actionObject"
                  }
                },
                "exit": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/actionObject"
                  }
                },
                "invoke": {
                  "$ref": "#/definitions/invokeArray"
                },
                "on": {
                  "$ref": "#/definitions/transitionsObject"
                }
              },
              "required": ["on"]
            }
          ]
        },
        "historyStateNode": {
          "allOf": [
            { "$ref": "#/definitions/baseStateNode" },
            {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "pattern": "history"
                },
                "history": {
                  "type": "string",
                  "enum": ["shallow", "deep"]
                }
              },
              "required": ["history"]
            }
          ]
        },
        "finalStateNode": {
          "allOf": [
            { "$ref": "#/definitions/baseStateNode" },
            {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "pattern": "final"
                },
                "data": {
                  "type": "object"
                }
              }
            }
          ]
        },
        "statesObject": {
          "type": "object",
          "patternProperties": {
            "^.*$": {
              "oneOf": [
                { "$ref": "#/definitions/atomicStateNode" },
                { "$ref": "#/definitions/compoundStateNode" },
                { "$ref": "#/definitions/parallelStateNode" },
                { "$ref": "#/definitions/historyStateNode" },
                { "$ref": "#/definitions/finalStateNode" }
              ]
            }
          }
        },
        "initialTransitionObject": {
          "type": "object",
          "properties": {
            "actions": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/actionObject"
              }
            },
            "source": {
              "type": "string"
            },
            "target": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "minItems": 1
            }
          },
          "required": ["actions", "eventType", "source", "target"]
        },
        "transitionsObject": {
          "type": "object",
          "patternProperties": {
            "^.*$": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/transitionObject"
              }
            }
          }
        },
        "transitionObject": {
          "type": "object",
          "properties": {
            "actions": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/actionObject"
              }
            },
            "cond": {
              "type": "object"
            },
            "eventType": {
              "type": "string"
            },
            "source": {
              "type": "string"
            },
            "target": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": ["actions", "eventType", "source", "target"]
        },
        "invokeObject": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "src": {
              "type": "string"
            }
          },
          "required": ["type", "id", "src"],
          "additionalProperties": false
        },
        "invokeArray": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/invokeObject"
          }
        },
        "functionObject": {
          "type": "object",
          "properties": {
            "$function": {
              "type": "string"
            }
          }
        },
        "order": {
          "type": "integer"
        }
      },
      "properties": {
        "id": {
          "title": "ID",
          "type": "string"
        },
        "initial": {
          "$ref": "#/definitions/initialTransitionObject"
        },
        "key": {
          "type": "string"
        },
        "type": {
          "type": "string",
          "enum": ["compound", "parallel"]
        },
        "context": {
          "type": "object"
        },
        "states": {
          "$ref": "#/definitions/statesObject"
        },
        "on": {
          "$ref": "#/definitions/transitionsObject"
        },
        "transitions": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/transitionObject"
          }
        },
        "entry": {
          "type": "array"
        },
        "exit": {
          "type": "array"
        },
        "order": {
          "$ref": "#/definitions/order"
        },
        "invoke": {
          "$ref": "#/definitions/invokeArray"
        },
        "version": {
          "type": "string"
        }
      },
      "required": ["id", "key", "type", "states"]
    }
    ,
    uiSchema: {},
    formData: {}
  },
  {
    name: "schema_builder_demo1",
    schema: {
      "type": "object",
      "title": "test form",
      "properties": {
        "firstName": {
          "title": "First name",
          "type": "string",
          "minLength": 2,
          "maxLength": 15
        },
        "age": {
          "title": "Age",
          "type": "integer",
          "default": 18,
          "minimum": 18,
          "exclusiveMinimum": null,
          "maximum": 64,
          "exclusiveMaximum": null
        },
        "country": {
          "enum": [
            "lebanon",
            "australia"
          ],
          "title": "Country",
          "type": "string",
          "enumNames": [
            "Lebanon",
            "Australia"
          ]
        },
        "preferredColor": {
          "$ref": "#/definitions/colours",
          "title": "Prefered Colour",
          "description": ""
        }
      },
      "dependencies": {},
      "required": [
        "firstName"
      ],
      "definitions": {
        "colours": {
          "enum": [
            "Black",
            "Red",
            "Blue"
          ],
          "title": "colours",
          "type": "string"
        }
      }
    },
    uiSchema: {
      "firstName": {
        "ui:column": "6"
      },
      "age": {
        "ui:column": "6"
      },
      "country": {
        "ui:column": "12"
      },
      "ui:order": [
        "firstName",
        "age",
        "country",
        "preferredColor"
      ],
      "definitions": {}
    },
    formData: {},
  },
  {
    name: "Files_Plus",
    schema: {
      title: "Files",
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "data-url",
          title: "Single file(max 1MB)",
          maxLength: Math.floor(1024 * 1024 * (8 / 6)), // 8/6 base64
        },
        files: {
          type: "array",
          title: "1-3 files(max 100KB each)",
          items: {
            type: "string",
            format: "data-url",
            maxLength: Math.floor(100 * 1024 * (8 / 6)), // 8/6 base64
          },
          maxItems: 3,
          minItems: 1,
        },
        filesAccept: {
          type: "string",
          format: "data-url",
          title: "Single File with Accept attribute",
        },
      },
    },
    uiSchema: {
      filesAccept: {
        "ui:options": {
          filePreview: true,
          accept: {
            "image/*": [".jpg", ".jpeg", ".png"],
            "audio/*": [],
            "application/pdf": [".pdf"],
          },
        },
      },
    },
    formData: {},
  },
  {
    name: "School_Plus",
    jsonSchema: {
      definitions: {
        userIdentInfo: {
          title: "",
          $id: "#/definitions/userIdentInfo",
          type: "object",
          properties: {
            lastName: {
              title: "last name",
              type: "string",
            },
            firstName: {
              title: "Name",
              type: "string",
            },
            lastNameKana: {
              title: "Last name (kana)",
              type: "string",
            },
            firstNameKana: {
              title: "Name (kana)",
              type: "string",
            },
            sex: {
              type: "number",
              oneOf: [
                {
                  const: 0,
                  title: "Unknown",
                },
                {
                  const: 1,
                  title: "Male",
                },
                {
                  const: 2,
                  title: "Female",
                },
                {
                  const: 9,
                  title: "Other",
                },
              ],
              title: "Gender",
            },
            birthDate: {
              title: "Date of birth",
              format: "date",
              type: "string",
            },
            postalCode: {
              title: "Zip code",
              pattern: "^[0-9]{7}$",
              type: "string",
            },
            address: {
              title: "Address",
              type: "string",
            },
            tel: {
              title: "Phone number",
              pattern: "^0[0-9]{9,10}$",
              type: "string",
            },
          },
          required: [
            "lastName",
            "firstName",
            "lastNameKana",
            "firstNameKana",
            "sex",
            "birthDate",
            "postalCode",
            "address",
            "tel",
          ],
        },
      },
      type: "object",
      properties: {
        basicInfo: {
          title: "Management information",
          description: "Administrative matters relating to the application.",
          type: "object",
          properties: {
            id: {
              title: "Application ID",
              description: "Primary key of application information",
              pattern: "^[0-9]{12}$",
              readOnly: true,
              type: "string",
            },
            createdAt: {
              title: "Date and time of application delivery",
              description:
                "Date and time of creation of application information",
              format: "date-time",
              readOnly: true,
              type: "string",
            },
            updatedAt: {
              title: "Last updated",
              description:
                "Last updated date and time of application information",
              format: "date-time",
              readOnly: true,
              type: "string",
            },
          },
          required: ["id", "createdAt", "updatedAt"],
        },
        acceptanceInfo: {
          title: "Reception Information",
          description: "Information about the reception.",
          type: "object",
          properties: {
            acceptedAt: {
              title: "Date and time received",
              description: "Date and time of acceptance",
              format: "date-time",
              type: "string",
            },
            status: {
              type: "string",
              oneOf: [
                {
                  const: "received",
                  title: "Accept",
                },
                {
                  const: "awaitingReview",
                  title: "Pending review",
                },
                {
                  const: "reviewing",
                  title: "Under review",
                },
                {
                  const: "awaitingTreatment",
                  title: "Waiting for response",
                },
                {
                  const: "approved",
                  title: "approved",
                },
                {
                  const: "rejected",
                  title: "rejected",
                },
              ],
              title: "Application Status",
              description: "Please select the status of your application.",
            },
          },
          required: ["acceptedAt", "status"],
        },
        examinee: {
          title: "Candidate information",
          description:
            "Please enter the information of the person taking the exam",
          type: "object",
          properties: {
            userIdentInfo: {
              title: "",
              $ref: "#/definitions/userIdentInfo",
            },
            ageOnRequest: {
              title: "Age at application",
              readOnly: true,
              type: "number",
            },
            ageOnEnter: {
              title: "Age at admission",
              readOnly: true,
              type: "number",
            },
            ageOnGraduate: {
              title: "Age at graduation",
              readOnly: true,
              type: "number",
            },
          },
          required: [
            "userIdentInfo",
            "ageOnRequest",
            "ageOnEnter",
            "ageOnGraduate",
          ],
        },
        applicant: {
          type: "object",
          properties: {
            type: {
              type: "string",
              oneOf: [
                {
                  const: "sameAsExaminee",
                  title: "Same as test taker",
                },
                {
                  const: "other",
                  title: "Different from the test taker",
                },
              ],
              title: "Applicant's presence or absence",
            },
          },
          if: {
            type: "object",
            properties: {
              type: {
                const: "other",
                type: "string",
              },
            },
            required: ["type"],
          },
          then: {
            type: "object",
            properties: {
              userIdentInfo: {
                title: "",
                $ref: "#/definitions/userIdentInfo",
              },
            },
            required: ["userIdentInfo"],
          },
          required: ["type"],
          title: "Applicant Information",
          description:
            "Submit this application and enter your contact information to receive contact and return of documents",
        },
        guardian: {
          type: "object",
          properties: {
            type: {
              type: "string",
              oneOf: [
                {
                  const: "independent",
                  title: "None",
                },
                {
                  const: "sameAsApplicant",
                  title: "Same as applicant",
                },
                {
                  const: "other",
                  title: "Different from applicant",
                },
              ],
              title: "Parents",
            },
          },
          if: {
            type: "object",
            properties: {
              type: {
                const: "other",
                type: "string",
              },
            },
            required: ["type"],
          },
          then: {
            type: "object",
            properties: {
              userIdentInfo: {
                title: "",
                $ref: "#/definitions/userIdentInfo",
              },
            },
            required: ["userIdentInfo"],
          },
          required: ["type"],
          title: "Parent Information",
          description: "Enter your guardian or adult ward information",
        },
        applicationInfo: {
          title: "Application Information",
          description:
            "Enter the information about the application that will be described in the application form.",
          type: "object",
          properties: {
            school: {
              title: "School name",
              type: "string",
            },
            schoolCode: {
              title: "School code",
              pattern: "^[0-9]{8}$",
              type: "string",
            },
            department: {
              title: "Undergraduate/Course Name",
              examples: ["normal"],
              type: "string",
            },
            subdepartment: {
              title: "Department/department etc.",
              type: "string",
            },
            departmentCode: {
              title: "Department/Department etc code",
              pattern: "^[0-9]{4}$",
              type: "string",
            },
            entranceType: {
              type: "number",
              oneOf: [
                {
                  const: 0,
                  title: "General Admission",
                },
                {
                  const: 1,
                  title: "Transfer",
                },
                {
                  const: 2,
                  title: "International Student Admission",
                },
                {
                  const: 3,
                  title: "Other",
                },
              ],
              title: "Admission type",
              examples: [0],
            },
            enterAt: {
              title: "Year of enrollment",
              format: "date",
              type: "string",
            },
            graduateAt: {
              title: "Graduation year",
              format: "date",
              type: "string",
            },
          },
          required: [
            "school",
            "schoolCode",
            "department",
            "departmentCode",
            "entranceType",
            "enterAt",
            "graduateAt",
          ],
        },
        examinationInfo: {
          title: "Exam Information",
          description: "Enter information about the exam of the day.",
          type: "object",
          properties: {
            room: {
              title: "Test venue",
              type: "string",
            },
            date: {
              title: "Test date",
              format: "date",
              type: "string",
            },
            subject: {
              title: "Test Subjects",
              description: "Choose the subject you want to take.",
              uniqueItems: true,
              type: "array",
              items: {
                type: "string",
                oneOf: [
                  {
                    const: "japanese",
                    title: "Kokugo",
                  },
                  {
                    const: "mathematics",
                    title: "mathematics",
                  },
                  {
                    const: "english",
                    title: "English",
                  },
                  {
                    const: "science",
                    title: "Science",
                  },
                  {
                    const: "social",
                    title: "social",
                  },
                ],
                title: "Test Subjects",
              },
            },
            subjQuestions: {
              title: "Test subject and problem number",
              description:
                "Enter the subject you want to take and the question number.",
              uniqueItems: true,
              type: "array",
              items: {
                type: "object",
                properties: {
                  subject: {
                    type: "string",
                    oneOf: [
                      {
                        const: "japanese",
                        title: "Kokugo",
                      },
                      {
                        const: "mathematics",
                        title: "mathematics",
                      },
                      {
                        const: "english",
                        title: "English",
                      },
                      {
                        const: "science",
                        title: "Science",
                      },
                      {
                        const: "social",
                        title: "social",
                      },
                    ],
                    title: "Test Subjects",
                  },
                  question: {
                    title: "Problem number",
                    type: "string",
                  },
                },
                required: ["subject", "question"],
              },
            },
          },
          required: ["room", "date", "subject", "subjQuestions"],
        },
        handicap: {
          title: "Presence or absence of consideration",
          description:
            "Please enter information about your consideration for the exam.",
          type: "object",
          properties: {
            isMild: {
              title: "Mild case",
              description:
                "Do you want to apply the special case for mild patients?",
              type: "boolean",
            },
            vision: {
              type: "string",
              oneOf: [
                {
                  const: "braille",
                  title:
                    "Braille, normal (Braille answer, time extension 1.5x, normal use of IC player)",
                },
                {
                  const: "brailleWithHelp",
                  title:
                    "Braille, Assistance (Braille answer, time extension 1.5x, using proctor CD player)",
                },
                {
                  const: "lowVision",
                  title:
                    "Low vision, normal (character answer, time extension 1.3x, normal IC player use)",
                },
                {
                  const: "lowVisionWithHelp",
                  title:
                    "Low vision, assistance (letter answer, time extension 1.3x, proctor CD player use)",
                },
                {
                  const: "lowVisionUtil",
                  title:
                    "Visual dysfunction (character answer, time extension 1.3x)",
                },
                {
                  const: "other",
                  title: "other",
                },
              ],
              title: "Visual",
            },
            hearing: {
              type: "string",
              oneOf: [
                {
                  const: "lowHearing",
                  title: "Less than 60dB (listening exemption)",
                },
                {
                  const: "other",
                  title: "other",
                },
              ],
              title: "Hearing",
            },
            physical: {
              type: "string",
              oneOf: [
                {
                  const: "checkAnsExt",
                  title: "Check answer + extension",
                },
                {
                  const: "checkAns",
                  title: "Check answer",
                },
                {
                  const: "agentExt",
                  title: "Proxy answer + Extension",
                },
                {
                  const: "agent",
                  title: "Proxy answer",
                },
                {
                  const: "other",
                  title: "other",
                },
              ],
              title: "Disabled",
            },
            developmental: {
              type: "string",
              oneOf: [
                {
                  const: "other",
                  title: "other",
                },
              ],
              title: "Developmental disorder",
            },
            needPreExamHelp: {
              title: "Consideration before exam",
              description: "Do you need consideration before the exam?",
              default: true,
              type: "boolean",
            },
            description: {
              title:
                "Free description field about the characteristics of the disorder",
              description: "Please fill in about the fault.",
              type: "string",
            },
            helps: {
              title: "Free description field on consideration contents",
              description: "Please fill in the details of consideration.",
              type: "string",
            },
          },
          required: ["needPreExamHelp"],
        },
        fee: {
          title: "Examination fee, etc.",
          description: "Please enter information about exam fee, etc.",
          type: "object",
          properties: {
            autoCalcValue: {
              title: "Automatically calculated amount",
              readOnly: true,
              type: "number",
            },
            value: {
              title: "Amount",
              type: "number",
            },
            exception: {
              uniqueItems: true,
              title: "Special case",
              type: "array",
              items: {
                type: "string",
                oneOf: [
                  {
                    const: "1",
                    title: "Disabled",
                  },
                  {
                    const: "2",
                    title: "Designated intractable disease",
                  },
                  {
                    const: "3",
                    title: "Childhood chronic",
                  },
                  {
                    const: "4",
                    title: "Household apportionment",
                  },
                  {
                    const: "5",
                    title:
                      "Designated intractable disease (prefectural designation)",
                  },
                  {
                    const: "6",
                    title: "Households without resident tax",
                  },
                  {
                    const: "7",
                    title: "Low Income Rank",
                  },
                  {
                    const: "8",
                    title: "Other",
                  },
                ],
              },
            },
          },
          required: ["autoCalcValue", "value", "exception"],
        },
        delay: {
          type: "object",
          properties: {
            delayed: {
              title: "Is it a delay?",
              description:
                "If it is a submission after the due date, please select it.",
              type: "boolean",
            },
          },
          if: {
            type: "object",
            properties: {
              delayed: {
                const: true,
                type: "boolean",
              },
            },
            required: ["delayed"],
          },
          then: {
            type: "object",
            properties: {
              reason: {
                title: "Reason for delay",
                description: "Choose the reason for the delay.",
                examples: [
                  "Due to delay in delivery of required documents",
                  "Due to worsening of symptoms, etc., it took time to prepare and submit the application documents",
                  "Due to a large-scale disaster, it took time to submit the application documents",
                  "Other (please fill in)",
                ],
                type: "string",
              },
            },
            required: ["reason"],
          },
          required: ["delayed"],
          title: "Delayed Application",
        },
        memo: {
          title: "Memo-offer",
          description: "Operator is another note or offer.",
          type: "object",
          properties: {
            items: {
              title: "Memo item",
              description: "Item of note.",
              type: "array",
              items: {
                type: "object",
                properties: {
                  operatorName: {
                    title: "Operator name",
                    type: "string",
                  },
                  content: {
                    title: "Content",
                    type: "string",
                  },
                },
                required: ["operatorName", "content"],
              },
            },
          },
          required: ["items"],
        },
      },
      required: [
        "basicInfo",
        "acceptanceInfo",
        "examinee",
        "applicant",
        "guardian",
        "applicationInfo",
        "examinationInfo",
        "handicap",
        "fee",
        "delay",
        "memo",
      ],
    },
    uiSchema: {
      basicInfo: {
        "ui:classNames": "rowDir__hsema__a98a04ed",
        id: {
          "ui:classNames": "fullWidth__hsema__a98a04ed",
        },
      },
      acceptanceInfo: {
        "ui:classNames": "rowDir__hsema__a98a04ed",
      },
      examinee: {
        "ui:classNames": "rowDir__hsema__a98a04ed",
      },
      applicant: {
        "ui:widget": "radio",
      },
      applicationInfo: {
        "ui:classNames": "rowDir__hsema__a98a04ed",
        school: {
          "ui:classNames": "fullWidth__hsema__a98a04ed",
        },
      },
      examinationInfo: {
        subjQuestions: {
          items: {
            "ui:classNames": "rowDir__hsema__a98a04ed",
          },
        },
      },
      handicap: {
        description: {
          "ui:widget": "textarea",
        },
        helps: {
          "ui:widget": "textarea",
        },
      },
      fee: {
        "ui:classNames": "rowDir__hsema__a98a04ed",
        exception: {
          "ui:widget": "checkboxes",
        },
      },
      memo: {
        items: {
          items: {
            content: {
              "ui:widget": "textarea",
            },
          },
        },
      },
    },
    formData: {
      basicInfo: {},
      acceptanceInfo: {
        status: "approved",
      },
      examinee: {
        userIdentInfo: {},
      },
      applicant: {
        type: "sameAsExaminee",
      },
      guardian: {
        type: "sameAsApplicant",
      },
      applicationInfo: {},
      examinationInfo: {
        subject: [],
        subjQuestions: [],
      },
      handicap: {
        needPreExamHelp: true,
        isMild: false,
        vision: "braille",
      },
      fee: {
        exception: ["5", "4"],
      },
      delay: {
        delayed: true,
        reason:
          "Due to worsening of symptoms, etc., it took time to prepare and submit the application documents",
      },
      memo: {
        items: [{}],
      },
      affinity: {
        nodeAffinity: {
          preferredDuringSchedulingIgnoredDuringExecution: [],
          requiredDuringSchedulingIgnoredDuringExecution: {
            nodeSelectorTerms: [],
          },
        },
        podAffinity: {
          preferredDuringSchedulingIgnoredDuringExecution: [],
          requiredDuringSchedulingIgnoredDuringExecution: [],
        },
        podAntiAffinity: {
          preferredDuringSchedulingIgnoredDuringExecution: [],
          requiredDuringSchedulingIgnoredDuringExecution: [],
        },
      },
      containers: [
        {
          args: [],
          command: [],
          env: [{}],
          envFrom: [],
          lifecycle: {
            postStart: {
              exec: {
                command: [],
              },
              httpGet: {
                httpHeaders: [],
              },
            },
            preStop: {
              exec: {
                command: [],
              },
              httpGet: {
                httpHeaders: [],
              },
            },
          },
          livenessProbe: {
            exec: {
              command: [],
            },
            httpGet: {
              httpHeaders: [],
            },
          },
          ports: [],
          readinessProbe: {
            exec: {
              command: [],
            },
            httpGet: {
              httpHeaders: [],
            },
          },
          resizePolicy: [],
          resources: {
            claims: [],
          },
          securityContext: {
            capabilities: {
              add: [],
              drop: [],
            },
          },
          startupProbe: {
            exec: {
              command: [],
            },
            httpGet: {
              httpHeaders: [],
            },
          },
          volumeDevices: [],
          volumeMounts: [],
        },
      ],
      dnsConfig: {
        nameservers: [],
        options: [{}],
        searches: [null, null],
      },
      ephemeralContainers: [
        {
          args: [],
          command: [],
          env: [{}],
          envFrom: [
            {},
            {
              configMapRef: {
                optional: false,
              },
            },
          ],
          lifecycle: {
            postStart: {
              exec: {
                command: [],
              },
              httpGet: {
                httpHeaders: [],
              },
            },
            preStop: {
              exec: {
                command: [],
              },
              httpGet: {
                httpHeaders: [],
              },
            },
          },
          livenessProbe: {
            exec: {
              command: [],
            },
            httpGet: {
              httpHeaders: [],
            },
          },
          ports: [],
          readinessProbe: {
            exec: {
              command: [],
            },
            httpGet: {
              httpHeaders: [],
            },
          },
          resizePolicy: [],
          resources: {
            claims: [],
          },
          securityContext: {
            capabilities: {
              add: [],
              drop: [],
            },
          },
          startupProbe: {
            exec: {
              command: [],
            },
            httpGet: {
              httpHeaders: [],
            },
          },
          volumeDevices: [],
          volumeMounts: [],
        },
      ],
      hostAliases: [],
      imagePullSecrets: [],
      initContainers: [],
      readinessGates: [],
      resourceClaims: [],
      schedulingGates: [],
      securityContext: {
        supplementalGroups: [],
        sysctls: [],
      },
      tolerations: [],
      topologySpreadConstraints: [],
      volumes: [],
    },
  },
  {
    name: "Cms_Plus",
    jsonSchema: {
      title: "",
      type: "object",
      properties: {
        title: {
          title: "title",
          description: "Give a title that moves people's hearts.",
          type: "string",
        },
        subtitle: {
          title: "subtitle",
          description: "You can add a subtitle to attract even more readers.",
          type: "string",
        },
        tags: {
          uniqueItems: true,
          title: "tag",
          description: "Tag to make it easier to search.",
          type: "array",
          items: {
            title: "",
            type: "string",
          },
        },
        body: {
          title: "Body",
          description:
            "Enter the body in the Markdown editor, or Visual editor.",
          type: "string",
        },
        images: {
          uniqueItems: true,
          title: "Image",
          description:
            "Select the image you want to insert in the body.You can insert up to 10 images.",
          type: "array",
          items: {
            format: "data-url",
            type: "string",
          },
        },
        thumbnail: {
          title: "Thumbnail",
          description:
            "If not set, the first image in the body will be a thumbnail.",
          format: "data-url",
          type: "string",
        },
        publishedAt: {
          title: "Published date",
          description:
            "If you do not set it, it will be published immediately.",
          format: "date-time",
          type: "string",
        },
        scope: {
          type: "string",
          oneOf: [
            {
              const: "public",
              title: "Searchable from all over the world",
            },
            {
              const: "publiclyAccailable",
              title: "Public (not visible to search engines)",
            },
            {
              const: "linkOnly",
              title: "Only to people who know the link",
            },
            {
              const: "private",
              title: "Only for me",
            },
          ],
          title: "Public scope",
          description: "Set the public scope.",
        },
        price: {
          title: "Price",
          description: "Set the price.",
          minimum: 0,
          type: "number",
        },
      },
      required: ["title", "tags", "body", "images", "scope"],
    },
    uiSchema: {
      body: {
        "ui:widget": "textarea",
      },
      tags: {
        "ui:options": {
          widget: "PillInputWidget",
          punctuation: ",",
          removeOnBackspace: true,
        },
      },
      images: {
        "ui:options": {
          accept: "image/*",
          filePreview: true,
        },
      },
      thumbnail: {
        "ui:options": {
          accept: "image/*",
          filePreview: true,
        },
      },
      publishedAt: {
        "ui:widget": "MantineDateTimeWidget",
      },
      scope: {
        "ui:widget": "radio",
      },
      price: {
        "ui:options": {
          widget: "updown",
          props: {
            prefix: "$",
            thousandSeparator: ",",
          },
        },
      },
    },
    formData: {
      tags: [],
      images: [],
      basicInfo: {},
      acceptanceInfo: {
        status: "approved",
      },
      examinee: {
        userIdentInfo: {},
      },
      applicant: {
        type: "sameAsExaminee",
      },
      guardian: {
        type: "sameAsApplicant",
      },
      applicationInfo: {},
      examinationInfo: {
        subject: [],
        subjQuestions: [],
      },
      handicap: {
        needPreExamHelp: true,
        isMild: false,
        vision: "braille",
      },
      fee: {
        exception: ["5", "4"],
      },
      delay: {
        delayed: true,
        reason:
          "Due to worsening of symptoms, etc., it took time to prepare and submit the application documents",
      },
      memo: {
        items: [{}],
      },
      affinity: {
        nodeAffinity: {
          preferredDuringSchedulingIgnoredDuringExecution: [],
          requiredDuringSchedulingIgnoredDuringExecution: {
            nodeSelectorTerms: [],
          },
        },
        podAffinity: {
          preferredDuringSchedulingIgnoredDuringExecution: [],
          requiredDuringSchedulingIgnoredDuringExecution: [],
        },
        podAntiAffinity: {
          preferredDuringSchedulingIgnoredDuringExecution: [],
          requiredDuringSchedulingIgnoredDuringExecution: [],
        },
      },
      containers: [
        {
          args: [],
          command: [],
          env: [{}],
          envFrom: [],
          lifecycle: {
            postStart: {
              exec: {
                command: [],
              },
              httpGet: {
                httpHeaders: [],
              },
            },
            preStop: {
              exec: {
                command: [],
              },
              httpGet: {
                httpHeaders: [],
              },
            },
          },
          livenessProbe: {
            exec: {
              command: [],
            },
            httpGet: {
              httpHeaders: [],
            },
          },
          ports: [],
          readinessProbe: {
            exec: {
              command: [],
            },
            httpGet: {
              httpHeaders: [],
            },
          },
          resizePolicy: [],
          resources: {
            claims: [],
          },
          securityContext: {
            capabilities: {
              add: [],
              drop: [],
            },
          },
          startupProbe: {
            exec: {
              command: [],
            },
            httpGet: {
              httpHeaders: [],
            },
          },
          volumeDevices: [],
          volumeMounts: [],
        },
      ],
      dnsConfig: {
        nameservers: [],
        options: [{}],
        searches: [null, null],
      },
      ephemeralContainers: [
        {
          args: [],
          command: [],
          env: [{}],
          envFrom: [
            {},
            {
              configMapRef: {
                optional: false,
              },
            },
          ],
          lifecycle: {
            postStart: {
              exec: {
                command: [],
              },
              httpGet: {
                httpHeaders: [],
              },
            },
            preStop: {
              exec: {
                command: [],
              },
              httpGet: {
                httpHeaders: [],
              },
            },
          },
          livenessProbe: {
            exec: {
              command: [],
            },
            httpGet: {
              httpHeaders: [],
            },
          },
          ports: [],
          readinessProbe: {
            exec: {
              command: [],
            },
            httpGet: {
              httpHeaders: [],
            },
          },
          resizePolicy: [],
          resources: {
            claims: [],
          },
          securityContext: {
            capabilities: {
              add: [],
              drop: [],
            },
          },
          startupProbe: {
            exec: {
              command: [],
            },
            httpGet: {
              httpHeaders: [],
            },
          },
          volumeDevices: [],
          volumeMounts: [],
        },
      ],
      hostAliases: [],
      imagePullSecrets: [],
      initContainers: [],
      readinessGates: [],
      resourceClaims: [],
      schedulingGates: [],
      securityContext: {
        supplementalGroups: [],
        sysctls: [],
      },
      tolerations: [],
      topologySpreadConstraints: [],
      volumes: [],
      scope: "public",
    },
  },
  {
    name: 'adaptiveCards',
    schema: {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "id": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "object",
      "title": "Microsoft Adaptive Card Schema",
      "additionalProperties": true,
      "allOf": [
        {
          "$ref": "#/definitions/AdaptiveCard"
        }
      ],
      "properties": {
        "version": {
          "type": "string",
          "description": "version of schema that this card was authored "
        },
        "minVersion": {
          "type": "string",
          "description": "if a client doesn't support the minVersion the card should be rejected and return the fallbackText.  If it does, then the elements that are not supported are safe to ignore"
        },
        "fallbackText": {
          "type": "string",
          "description": "if a client is not able to show the card, show fallbackText to the user. This can be in markdown format. "
        },
        "speak": {
          "type": "string",
          "description": "Specifies what should be spoken for this entire Item. This is simple text or SSML fragment"
        }
      },
      "required": [
        "version"
      ],
      "definitions": {
        "Action": {
          "anyOf": [
            {
              "$ref": "#/definitions/Action.Submit"
            },
            {
              "$ref": "#/definitions/Action.ShowCard"
            },
            {
              "$ref": "#/definitions/Action.OpenUrl"
            }
          ]
        },
        "Action.OpenUrl": {
          "additionalProperties": true,
          "description": "When Action.OpenUrl is invoked it will show the given url, either by launching it to an external web browser or showing in-situ with embedded web browser.",
          "properties": {
            "title": {
              "type": "string",
              "description": "Label for button or link that represents this action"
            },
            "type": {
              "type": "string",
              "description": "Must be Action.OpenUrl",
              "enum": [
                "Action.OpenUrl"
              ]
            },
            "url": {
              "type": "string",
              "description": "The URL to open"
            }
          },
          "required": [
            "type",
            "url"
          ],
          "type": "object"
        },
        "Action.ShowCard": {
          "type": "object",
          "additionalProperties": true,
          "description": "Action.ShowCard defines an inline AdaptiveCard which is shown to the user when it is clicked.",
          "properties": {
            "type": {
              "type": "string",
              "description": "Must be Action.ShowCard",
              "enum": [
                "Action.ShowCard"
              ]
            },
            "title": {
              "type": "string",
              "description": "Label for button or link that represents this action"
            },
            "card": {
              "$ref": "#/definitions/AdaptiveCard"
            }
          },
          "required": [
            "type",
            "card"
          ]
        },
        "Action.Submit": {
          "type": "object",
          "additionalProperties": true,
          "description": "Submit action gathers up input fields, merges with optional data field and generates event to client asking for data to be submitted. It is up to the client to determine how that data is processed. For example: With BotFramework bots the client would send an activity through the messaging medium to the bot.",
          "properties": {
            "type": {
              "type": "string",
              "description": "Must be Action.Submit",
              "enum": [
                "Action.Submit"
              ]
            },
            "title": {
              "type": "string",
              "description": "Label for button or link that represents this action"
            },
            "data": {
              "type": ["string", "object"],
              "description": "initial data that input fields will be combined with. This is essentially 'hidden' properties"
            }
          },
          "required": [
            "type"
          ]
        },
        "Actions": {
          "additionalItems": true,
          "items": {
            "$ref": "#/definitions/Action"
          },
          "type": "array"
        },
        "AdaptiveCard": {
          "additionalProperties": true,
          "type": "object",
          "description": "Card schema for an adaptive card",
          "properties": {
            "type": {
              "type": "string",
              "description": "Must be AdaptiveCard",
              "enum": [
                "AdaptiveCard"
              ]
            },
            "actions": {
              "description": "The Actions to show in the card's action bar",
              "$ref": "#/definitions/Actions"
            },
            "body": {
              "type": ["object", "array"],
              "description": "The Card Elements to show in the primary card region",
              "$ref": "#/definitions/CardElements"
            }
          },
          "required": [
            "type",
            "version"
          ]
        },
        "CardElement": {
          "additionalProperties": true,
          "properties": {
            "type": {
              "type": "string"
            },
            "id": {
              "type": "string",
              "description": "A unique Id associated with the element"
            },
            "spacing": {
              "$ref": "#/definitions/SpacingStyle"
            },
            "separator": {
              "type": "boolean",
              "description": "The Separator object type describes the look and feel of a separation line between two elements.",
              "default": false
            }
          },
          "required": [
            "type"
          ]
        },
        "CardElements": {
          "type": "array",
          "additionalItems": true,
          "items": [
            {
              "anyOf": [
                {
                  "$ref": "#/definitions/TextBlock"
                },
                {
                  "$ref": "#/definitions/Image"
                },
                {
                  "$ref": "#/definitions/Container"
                },
                {
                  "$ref": "#/definitions/ColumnSet"
                },
                {
                  "$ref": "#/definitions/FactSet"
                },
                {
                  "$ref": "#/definitions/ImageSet"
                },
                {
                  "$ref": "#/definitions/Input.Text"
                },
                {
                  "$ref": "#/definitions/Input.Number"
                },
                {
                  "$ref": "#/definitions/Input.Date"
                },
                {
                  "$ref": "#/definitions/Input.Time"
                },
                {
                  "$ref": "#/definitions/Input.Toggle"
                },
                {
                  "$ref": "#/definitions/Input.ChoiceSet"
                }
              ]
            }
          ]
        },
        "Input.Choice": {
          "type": "object",
          "description": "Describes a Choice input. The value should be a simple string without a \",\"",
          "additionalProperties": true,
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "Input.Choice"
              ]
            },
            "title": {
              "type": "string",
              "description": "The text for a choice"
            },
            "value": {
              "type": "string",
              "description": "The raw value for the choice. NOTE: do not use a \",\" in the value, since MultiSelect ChoiceSet returns a comma-delimited string of choice values"
            }
          },
          "required": [
            "title",
            "value"
          ]
        },
        "ChoiceInputStyle": {
          "type": "string",
          "description": "Style hint for Input.ChoiceSet",
          "enum": [
            "compact",
            "expanded"
          ]
        },
        "Column": {
          "additionalProperties": true,
          "type": "object",
          "description": "Defines a container that is part of a ColumnSet",
          "allOf": [
            {
              "$ref": "#/definitions/CardElement"
            }
          ],
          "properties": {
            "items": {
              "description": "The Card Elements to include in the Column",
              "$ref": "#/definitions/CardElements"
            },
            "selectAction": {
              "description": "An Action that will be invoked when the Column is tapped or selected",
              "$ref": "#/definitions/Action"
            },
            "width": {
              "type": [
                "string",
                "number"
              ],
              "description": "\"auto\", \"stretch\", or a number representing relative width of the column in the column group"
            },
            "type": {
              "type": "string",
              "description": "Must be Column",
              "enum": [
                "Column"
              ]
            }
          },
          "required": [
            "items"
          ]
        },
        "ColumnSet": {
          "additionalProperties": true,
          "type": "object",
          "description": "ColumnSet divides a region into Column's allowing elements to sit side-by-side",
          "allOf": [
            {
              "$ref": "#/definitions/CardElement"
            }
          ],
          "properties": {
            "columns": {
              "type": "array",
              "description": "The array of Columns to divide the region into",
              "items": {
                "$ref": "#/definitions/Column"
              }
            },
            "selectAction": {
              "$ref": "#/definitions/Action",
              "description": "The Action that is executed when the ColumnSet is clicked/tapped"
            },
            "type": {
              "type": "string",
              "description": "Must be ColumnSet",
              "enum": [
                "ColumnSet"
              ]
            }
          }
        },
        "Container": {
          "additionalProperties": true,
          "type": "object",
          "description": "Containers group items together",
          "allOf": [
            {
              "$ref": "#/definitions/CardElement"
            }
          ],
          "properties": {
            "items": {
              "description": "The Card Elements to render inside the Container",
              "$ref": "#/definitions/CardElements"
            },
            "selectAction": {
              "description": "An Action that will be invoked when the Image is tapped or selected",
              "$ref": "#/definitions/Action"
            },
            "style": {
              "type": "string",
              "description": "Style hint for Container",
              "enum": [
                "default",
                "emphasis"
              ]
            },
            "type": {
              "type": "string",
              "description": "Must be Container",
              "enum": [
                "Container"
              ]
            }
          },
          "required": [
            "items"
          ]
        },
        "Fact": {
          "additionalProperties": true,
          "type": "object",
          "description": "Describes a Fact in a FactSet as a key/value pair",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "Fact"
              ]
            },
            "title": {
              "type": "string",
              "description": "The title of the fact"
            },
            "value": {
              "type": "string",
              "description": "The value of the fact"
            }
          },
          "required": [
            "title",
            "value"
          ]
        },
        "FactSet": {
          "additionalProperties": true,
          "type": "object",
          "description": "The FactSet Item makes it simple to display a series of facts (e.g. name/value pairs) in a tabular form.",
          "allOf": [
            {
              "$ref": "#/definitions/CardElement"
            }
          ],
          "properties": {
            "facts": {
              "type": "array",
              "description": "The array of Facts",
              "items": {
                "$ref": "#/definitions/Fact"
              }
            },
            "type": {
              "type": "string",
              "description": "Must be FactSet",
              "enum": [
                "FactSet"
              ]
            }
          },
          "required": [
            "facts"
          ]
        },
        "HorizontalAlignment": {
          "type": "string",
          "description": "Controls how Items are horizontally positioned within their container.",
          "enum": [
            "left",
            "center",
            "right"
          ]
        },
        "Image": {
          "additionalProperties": true,
          "type": "object",
          "description": "The Image Item allows for the inclusion of images in an Adaptive Card.",
          "allOf": [
            {
              "$ref": "#/definitions/CardElement"
            }
          ],
          "properties": {
            "altText": {
              "type": "string",
              "description": "Alternate text for the image for accessibility"
            },
            "horizontalAlignment": {
              "$ref": "#/definitions/HorizontalAlignment"
            },
            "selectAction": {
              "description": "An Action that will be invoked when the Image is tapped or selected",
              "$ref": "#/definitions/Action"
            },
            "size": {
              "type": "object",
              "$ref": "#/definitions/ImageSize"
            },
            "style": {
              "$ref": "#/definitions/ImageStyle"
            },
            "type": {
              "type": "string",
              "description": "Must be Image",
              "enum": [
                "Image"
              ]
            },
            "url": {
              "type": "string",
              "description": "The URL to the image."
            }
          },
          "required": [
            "url"
          ]
        },
        "ImageSet": {
          "additionalProperties": true,
          "type": "object",
          "description": "The ImageSet allows for the inclusion of a collection images like a photogallery.",
          "allOf": [
            {
              "$ref": "#/definitions/CardElement"
            }
          ],
          "properties": {
            "images": {
              "type": "array",
              "description": "The array of Image elements to show",
              "items": {
                "$ref": "#/definitions/Image"
              }
            },
            "imageSize": {
              "$ref": "#/definitions/ImageSize"
            },
            "type": {
              "type": "string",
              "description": "Must be ImageSet",
              "enum": [
                "ImageSet"
              ]
            }
          },
          "required": [
            "images"
          ]
        },
        "ImageSize": {
          "type": "string",
          "description": "Controls the approximate size of the image. The physical dimensions will vary per host. Specify \"auto\" for true image dimension or \"stretch\" to force it to fill the container",
          "default": "auto",
          "enum": [
            "auto",
            "stretch",
            "small",
            "medium",
            "large"
          ]
        },
        "ImageStyle": {
          "type": "string",
          "description": "Controls the way Images are displayed",
          "enum": [
            "default",
            "person"
          ]
        },
        "Input.ChoiceSet": {
          "additionalProperties": true,
          "type": "object",
          "description": "Shows an array of Choice objects",
          "allOf": [
            {
              "$ref": "#/definitions/CardElement"
            }
          ],
          "properties": {
            "choices": {
              "type": "array",
              "description": "the choice options",
              "items": {
                "$ref": "#/definitions/Input.Choice"
              }
            },
            "id": {
              "type": "string",
              "description": "Id for the value (will be used to identify collected input when SUBMIT is clicked)"
            },
            "isMultiSelect": {
              "type": "boolean",
              "description": "allow multiple choices to be selected",
              "default": false
            },
            "style": {
              "$ref": "#/definitions/ChoiceInputStyle"
            },
            "type": {
              "description": "Must be Input.ChoiceInput",
              "enum": [
                "Input.ChoiceSet"
              ],
              "type": "string"
            },
            "value": {
              "type": "string",
              "description": "The initial choice (or set of choices) that should be selected. For multi-select, specifcy a comma-separated string of values"
            }
          },
          "required": [
            "id",
            "choices"
          ]
        },
        "Input.Date": {
          "additionalProperties": true,
          "type": "object",
          "description": "Input.Date collects Date from the user,",
          "allOf": [
            {
              "$ref": "#/definitions/CardElement"
            }
          ],
          "properties": {
            "id": {
              "type": "string",
              "description": "Id for the value (will be used to identify collected input when SUBMIT is clicked)"
            },
            "max": {
              "type": "string",
              "description": "hint of maximum value expressed in ISO-8601 format (may be ignored by some clients)"
            },
            "min": {
              "type": "string",
              "description": "hint of minimum value expressed in ISO-8601 format (may be ignored by some clients)"
            },
            "placeholder": {
              "type": "string",
              "description": "Title Description of the input desired"
            },
            "type": {
              "type": "string",
              "description": "The type must be Input.Date",
              "enum": [
                "Input.Date"
              ]
            },
            "value": {
              "type": "string",
              "description": "The initial value for a field expressed in ISO-8601 format"
            }
          },
          "required": [
            "id"
          ]
        },
        "Input.Number": {
          "additionalProperties": true,
          "type": "object",
          "description": "Input.Number collects number from the user,",
          "allOf": [
            {
              "$ref": "#/definitions/CardElement"
            }
          ],
          "properties": {
            "id": {
              "type": "string",
              "description": "Id for the value (will be used to identify collected input when SUBMIT is clicked)"
            },
            "max": {
              "type": "number",
              "description": "hint of maximum value (may be ignored by some clients)"
            },
            "min": {
              "type": "number",
              "description": "hint of minimum value (may be ignored by some clients)"
            },
            "placeholder": {
              "type": "string",
              "description": "Title Description of the input desired"
            },
            "type": {
              "type": "string",
              "description": "The type must be Input.Number",
              "enum": [
                "Input.Number"
              ]
            },
            "value": {
              "type": "number",
              "description": "The initial value for a field"
            }
          },
          "required": [
            "id"
          ]
        },
        "Input.Text": {
          "additionalProperties": true,
          "type": "object",
          "description": "Input.Text collects text from the user,",
          "allOf": [
            {
              "$ref": "#/definitions/CardElement"
            }
          ],
          "properties": {
            "id": {
              "type": "string",
              "description": "Id for the value (will be used to identify collected input when SUBMIT is clicked)"
            },
            "isMultiline": {
              "type": "boolean",
              "description": "Do you want to allow multiple lines of input"
            },
            "maxLength": {
              "type": "number",
              "description": "hint of maximum length characters to collect (may be ignored by some clients)"
            },
            "placeholder": {
              "type": "string",
              "description": "Title Description of the input desired"
            },
            "style": {
              "$ref": "#/definitions/TextInputStyle"
            },
            "type": {
              "type": "string",
              "description": "Input.Text",
              "enum": [
                "Input.Text"
              ]
            },
            "value": {
              "type": "string",
              "description": "The initial value for a field"
            }
          },
          "required": [
            "id"
          ]
        },
        "Input.Time": {
          "additionalProperties": true,
          "type": "object",
          "description": "Input.Time collects Time from the user,",
          "allOf": [
            {
              "$ref": "#/definitions/CardElement"
            }
          ],
          "properties": {
            "id": {
              "type": "string",
              "description": "Id for the value (will be used to identify collected input when SUBMIT is clicked)"
            },
            "max": {
              "type": "string",
              "description": "hint of maximum value (may be ignored by some clients)"
            },
            "min": {
              "type": "string",
              "description": "hint of minimum value (may be ignored by some clients)"
            },
            "placeholder": {
              "type": "string",
              "description": "Title Description of the input desired"
            },
            "type": {
              "type": "string",
              "description": "The type must be Input.Time",
              "enum": [
                "Input.Time"
              ]
            },
            "value": {
              "type": "string",
              "description": "The initial value for a field expressed in ISO-8601 format"
            }
          },
          "required": [
            "id"
          ]
        },
        "Input.Toggle": {
          "additionalProperties": true,
          "type": "object",
          "description": "Input.Toggle collects a true/false response from the user",
          "allOf": [
            {
              "$ref": "#/definitions/CardElement"
            }
          ],
          "properties": {
            "id": {
              "type": "string",
              "description": "Id for the value (will be used to identify collected input when SUBMIT is clicked)"
            },
            "title": {
              "type": "string",
              "description": "Title for the toggle"
            },
            "type": {
              "type": "string",
              "description": "Input.Toggle",
              "enum": [
                "Input.Toggle"
              ]
            },
            "value": {
              "type": "string",
              "description": "The current selected value (default:false)"
            },
            "valueOff": {
              "type": "string",
              "description": "The value when toggle is off (default:false)"
            },
            "valueOn": {
              "type": "string",
              "description": "The value when toggle is on (default:true)"
            }
          },
          "required": [
            "id",
            "title"
          ]
        },
        "TextBlock": {
          "additionalProperties": true,
          "type": "object",
          "description": "The TextBlock Item allows for the inclusion of text, with various font sizes, weight and color, in Adaptive Cards.",
          "allOf": [
            {
              "$ref": "#/definitions/CardElement"
            }
          ],
          "properties": {
            "color": {
              "type": "string",
              "description": "Controls the color of TextBlock Items.",
              "enum": [
                "default",
                "dark",
                "light",
                "accent",
                "good",
                "warning",
                "attention"
              ]
            },
            "horizontalAlignment": {
              "$ref": "#/definitions/HorizontalAlignment"
            },
            "isSubtle": {
              "type": "boolean",
              "description": "Indicates whether the color of the text should be slightly toned down to appear less prominent"
            },
            "maxLines": {
              "type": "number",
              "description": "When Wrap is true, you can specify the maximum number of lines to allow the textBlock to use."
            },
            "size": {
              "type": "string",
              "description": "controls size of the text.",
              "enum": [
                "small",
                "default",
                "medium",
                "large",
                "extraLarge"
              ]
            },
            "text": {
              "type": "string",
              "description": "The actual text to display"
            },
            "type": {
              "type": "string",
              "description": "Must be TextBlock",
              "enum": [
                "TextBlock"
              ]
            },
            "weight": {
              "type": "string",
              "description": "Controls the weight of TextBlock Items",
              "enum": [
                "lighter",
                "default",
                "bolder"
              ]
            },
            "wrap": {
              "type": "boolean",
              "description": "True if be is allowed to wrap"
            }
          },
          "required": [
            "text"
          ]
        },
        "SeparatorStyle": {
          "type": "object",
          "description": "Indicates whether there should be a visible separator (e.g. a line) between the element and the one before it. If this property is not specified, no separator is displayed. If it is, a separator line is displayed. A separator will only appear if there was a preceding element.",
          "properties": {
            "thickness": {
              "type": "string",
              "description": "Specifies the thickness of the separation line.",
              "enum": [
                "default",
                "thick"
              ]
            },
            "color": {
              "type": "string",
              "description": "Specifies the color of the separation line.",
              "enum": [
                "default",
                "accent"
              ]
            }
          }
        },
        "SpacingStyle": {
          "type": "string",
          "description": "Controls the amount of spacing between this element and the previous element.",
          "enum": [
            "none",
            "small",
            "default",
            "medium",
            "large",
            "extraLarge",
            "padding"
          ]
        },
        "TextInputStyle": {
          "type": "string",
          "description": "Style hint for Input.Text.",
          "enum": [
            "text",
            "tel",
            "url",
            "email"
          ]
        }
      }
    },
    uiSchema: {},
    formData: {}

  },

  {
    name: 'core_schema_meta_schema',
    schema: {
      title: 'Core schema meta-schema',
      definitions: {
        schemaArray: {
          type: 'array',
          minItems: 1,
          items: { $ref: '#/definitions/rootSchema' },
        },
        nonNegativeInteger: {
          type: 'integer',
          minimum: 0,
        },
        nonNegativeIntegerDefault0: {
          allOf: [{ $ref: '#/definitions/nonNegativeInteger' }, { default: 0 }],
        },
        simpleTypes: {
          enum: ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'],
        },
        stringArray: {
          type: 'array',
          items: { type: 'string' },
          uniqueItems: true,
          default: [],
        },
        rootSchema: {
          oneOf: [
            { const: null, title: 'default null' },
            { $ref: '#/definitions/_rootSchema', title: 'danger schema' },
          ],
          default: null,
        },
        _rootSchema: {
          type: 'object',
          properties: {
            $comment: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            default: true,
            readOnly: {
              type: 'boolean',
              default: false,
            },
            writeOnly: {
              type: 'boolean',
              default: false,
            },
            examples: {
              type: 'array',
              items: {
                type: ['object', 'array', 'number', 'boolean', 'string', 'null'],
                default: true,
              },
            },
            multipleOf: {
              type: 'number',
              exclusiveMinimum: 0,
            },
            maximum: {
              type: 'number',
            },
            exclusiveMaximum: {
              type: 'number',
            },
            minimum: {
              type: 'number',
            },
            exclusiveMinimum: {
              type: 'number',
            },
            maxLength: { $ref: '#/definitions/nonNegativeInteger' },
            minLength: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
            pattern: {
              type: 'string',
              format: 'regex',
            },
            additionalItems: { $ref: '#/definitions/rootSchema' },
            items: {
              anyOf: [{ $ref: '#/definitions/rootSchema' }, { $ref: '#/definitions/schemaArray' }],
            },
            maxItems: { $ref: '#/definitions/nonNegativeInteger' },
            minItems: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
            uniqueItems: {
              type: 'boolean',
              default: false,
            },
            contains: { $ref: '#/definitions/rootSchema' },
            maxProperties: { $ref: '#/definitions/nonNegativeInteger' },
            minProperties: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
            required: { $ref: '#/definitions/stringArray' },
            additionalProperties: { $ref: '#/definitions/rootSchema' },
            definitions: {
              type: 'object',
              additionalProperties: { $ref: '#/definitions/rootSchema' },
            },
            properties: {
              type: 'object',
              additionalProperties: { $ref: '#/definitions/rootSchema' },
            },
            patternProperties: {
              type: 'object',
              additionalProperties: { $ref: '#/definitions/rootSchema' },
              propertyNames: { format: 'regex' },
            },
            dependencies: {
              type: 'object',
              additionalProperties: {
                anyOf: [{ $ref: '#/definitions/rootSchema' }, { $ref: '#/definitions/stringArray' }],
              },
            },
            propertyNames: { $ref: '#/definitions/rootSchema' },
            const: true,
            enum: {
              type: 'array',
              items: {
                type: ['string', 'number', 'boolean', 'null', 'object'],
                default: null,
              },

              minItems: 1,
              uniqueItems: true,
            },
            type: {
              anyOf: [
                { $ref: '#/definitions/simpleTypes' },
                {
                  type: 'array',
                  items: { $ref: '#/definitions/simpleTypes' },
                  minItems: 1,
                  uniqueItems: true,
                },
              ],
            },
            format: { type: 'string' },
            contentMediaType: { type: 'string' },
            contentEncoding: { type: 'string' },
            if: { $ref: '#/definitions/rootSchema' },
            then: { $ref: '#/definitions/rootSchema' },
            else: { $ref: '#/definitions/rootSchema' },
            allOf: { $ref: '#/definitions/schemaArray' },
            anyOf: { $ref: '#/definitions/schemaArray' },
            oneOf: { $ref: '#/definitions/schemaArray' },
            not: { $ref: '#/definitions/rootSchema' },
          },
        },
      },
      $ref: '#/definitions/rootSchema',
      default: null,
    },
    uiSchema: {},
    formData: {
      type: 'null',
    },

  },


  {
    name: 'widgets',
    schema: {
      title: 'Widgets',
      type: 'object',
      properties: {
        stringFormats: {
          type: 'object',
          title: 'String formats',
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            uri: {
              type: 'string',
              format: 'uri',
            },
          },
        },
        boolean: {
          type: 'object',
          title: 'Boolean field',
          properties: {
            default: {
              type: 'boolean',
              title: 'checkbox (default)',
              description: 'This is the checkbox-description',
            },
            radio: {
              type: 'boolean',
              title: 'radio buttons',
              description: 'This is the radio-description',
            },
            select: {
              type: 'boolean',
              title: 'select box',
              description: 'This is the select-description',
            },
          },
        },
        string: {
          type: 'object',
          title: 'String field',
          properties: {
            default: {
              type: 'string',
              title: 'text input (default)',
            },
            textarea: {
              type: 'string',
              title: 'textarea',
            },
            placeholder: {
              type: 'string',
            },
            color: {
              type: 'string',
              title: 'color picker',
              default: '#151ce6',
            },
          },
        },
        secret: {
          type: 'string',
          default: "I'm a hidden string.",
        },
        disabled: {
          type: 'string',
          title: 'A disabled field',
          default: 'I am disabled.',
        },
        readonly: {
          type: 'string',
          title: 'A readonly field',
          default: 'I am read-only.',
        },
        readonly2: {
          type: 'string',
          title: 'Another readonly field',
          default: 'I am also read-only.',
          readOnly: true,
        },
        widgetOptions: {
          title: 'Custom widget with options',
          type: 'string',
          default: 'I am yellow',
        },
        selectWidgetOptions: {
          title: 'Custom select widget with options',
          type: 'string',
          enum: ['foo', 'bar'],
        },
        selectWidgetOptions2: {
          title: 'Custom select widget with options, overriding the enum titles.',
          type: 'string',
          oneOf: [
            {
              const: 'foo',
              title: 'Foo',
            },
            {
              const: 'bar',
              title: 'Bar',
            },
          ],
        },
      },
    },
    uiSchema: {
      "boolean": {
        "radio": {
          "ui:widget": "radio"
        },
        "select": {
          "ui:widget": "select"
        }
      },
      "string": {
        "textarea": {
          "ui:widget": "textarea",
          "ui:options": {
            "rows": 5
          }
        },
        "placeholder": {
          "ui:placeholder": "This is a placeholder"
        },
        "color": {
          "ui:widget": "color"
        }
      },
      "secret": {
        "ui:widget": "hidden"
      },
      "disabled": {
        "ui:disabled": true
      },
      "readonly": {
        "ui:readonly": true
      },
      "widgetOptions": {
        "ui:options": {
          "backgroundColor": "yellow"
        }
      },
      "selectWidgetOptions": {
        "ui:options": {
          "backgroundColor": "pink"
        }
      }
    },
    'formData': {
      "string": {
        "color": "#151ce6",
        "default": "Hello...",
        "textarea": "... World"
      },
      "secret": "I'm a hidden string.",
      "disabled": "I am disabled.",
      "readonly": "I am read-only.",
      "readonly2": "I am also read-only.",
      "widgetOptions": "I am yellow",
      "stringFormats": {
        "email": "chuck@norris.net",
        "uri": "http://chucknorris.com/"
      },
      "boolean": {
        "default": true,
        "radio": true,
        "select": true
      }
    }

  },
  {
    "name": "Button",
    "schema": {
      "definitions": {
        "sizes": {
          "type": "string",
          "enum": [
            "xs",
            "sm",
            "md",
            "lg",
            "xl"
          ]
        },
        "sizeEnumConst": {
          "type": "string",
          "oneOf": [
            {
              "title": "xSmall",
              "const": "xs"
            },
            {
              "title": "Small",
              "const": "sm"
            },
            {
              "title": "Medium",
              "const": "md"
            },
            {
              "title": "Large",
              "const": "lg"
            },
            {
              "title": "xLarge",
              "const": "xl"
            }
          ]
        }
      },
      "title": "Property Editor",
      "type": "object",
      "properties": {
        "children": {
          "type": "string",
          "title": "Text"
        },
        "variant": {
          "type": "string",
          "title": "Variant",
          "enum": [
            "default",
            "filled",
            "light",
            "outline",
            "subtle",
            "transparent",
            "blank"
          ]
        },
        "color": {
          "type": "string",
          "title": "Color"
        },
        "size": {
          "type": "string",
          "title": "Size",
          "$ref": "#/definitions/sizes"
        },
        "radius": {
          "type": "string",
          "title": "Radius",
          "$ref": "#/definitions/sizeEnumConst"
        }
      }
    },
    "uiSchema": {},
    "formData": {
      "children": "Button",
      "variant": "filled",
      "color": "blue",
      "size": "lg",
      "radius": "xs"
    }
  },

  {
    name: "additionalProperties",
    schema: {
      title: "A customizable registration form",
      description: "A simple form with additional properties example.",
      type: "object",
      required: ["firstName", "lastName"],
      additionalProperties: {
        type: "string",
      },
      properties: {
        firstName: {
          type: "string",
          title: "First name",
        },
        lastName: {
          type: "string",
          title: "Last name",
        },
      },
    },
    uiSchema: {
      firstName: {
        "ui:autofocus": true,
        "ui:emptyValue": "",
      },
    },
    formData: {
      firstName: "Chuck",
      lastName: "Norris",
      assKickCount: "infinity",
    },
  },
  {
    name: "allOf",
    schema: {
      type: "object",
      allOf: [
        {
          properties: {
            lorem: {
              type: ["string", "boolean"],
              default: true,
            },
          },
        },
        {
          properties: {
            lorem: {
              type: "boolean",
            },
            ipsum: {
              type: "string",
            },
          },
        },
      ],
    },
    formData: {},
  },
  {
    name: "alternatives",
    schema: {
      definitions: {
        Color: {
          title: "Color",
          type: "string",
          anyOf: [
            {
              type: "string",
              enum: ["#ff0000"],
              title: "Red",
            },
            {
              type: "string",
              enum: ["#00ff00"],
              title: "Green",
            },
            {
              type: "string",
              enum: ["#0000ff"],
              title: "Blue",
            },
          ],
        },
        Toggle: {
          title: "Toggle",
          type: "boolean",
          oneOf: [
            {
              title: "Enable",
              const: true,
            },
            {
              title: "Disable",
              const: false,
            },
          ],
        },
      },
      title: "Image editor",
      type: "object",
      required: ["currentColor", "colorMask", "blendMode"],
      properties: {
        currentColor: {
          $ref: "#/definitions/Color",
          title: "Brush color",
        },
        colorMask: {
          type: "array",
          uniqueItems: true,
          items: {
            $ref: "#/definitions/Color",
          },
          title: "Color mask",
        },
        toggleMask: {
          title: "Apply color mask",
          $ref: "#/definitions/Toggle",
        },
        colorPalette: {
          type: "array",
          title: "Color palette",
          items: {
            $ref: "#/definitions/Color",
          },
        },
        blendMode: {
          title: "Blend mode",
          type: "string",
          oneOf: [
            { const: "screen", title: "Screen" },
            { const: "multiply", title: "Multiply" },
            { const: "overlay", title: "Overlay" },
          ],
        },
      },
    },
    uiSchema: {
      blendMode: {
        "ui:enumDisabled": ["multiply"],
      },
      toggleMask: {
        "ui:widget": "radio",
      },
    },
    formData: {
      currentColor: "#00ff00",
      colorMask: ["#0000ff"],
      colorPalette: ["#ff0000"],
      blendMode: "screen",
    },
  },
  {
    name: "anyOf",
    schema: {
      type: "object",
      properties: {
        age: {
          type: "integer",
          title: "Age",
        },
        items: {
          type: "array",
          items: {
            type: "object",
            anyOf: [
              {
                properties: {
                  foo: {
                    type: "string",
                  },
                },
              },
              {
                properties: {
                  bar: {
                    type: "string",
                  },
                },
              },
            ],
          },
        },
      },
      anyOf: [
        {
          title: "First method of identification",
          properties: {
            firstName: {
              type: "string",
              title: "First name",
              default: "Chuck",
            },
            lastName: {
              type: "string",
              title: "Last name",
            },
          },
        },
        {
          title: "Second method of identification",
          properties: {
            idCode: {
              type: "string",
              title: "ID code",
            },
          },
        },
      ],
    },
    formData: {},
  },
  {
    name: "arrays",
    schema: {
      definitions: {
        Thing: {
          type: "object",
          properties: {
            name: {
              type: "string",
              default: "Default name",
            },
          },
        },
      },
      type: "object",
      properties: {
        listOfStrings: {
          type: "array",
          title: "A list of strings",
          items: {
            type: "string",
            default: "bazinga",
          },
        },
        multipleChoicesList: {
          type: "array",
          title: "A multiple choices list",
          items: {
            type: "string",
            enum: ["foo", "bar", "fuzz", "qux"],
          },
          uniqueItems: true,
        },
        fixedItemsList: {
          type: "array",
          title: "A list of fixed items",
          items: [
            {
              title: "A string value",
              type: "string",
              default: "lorem ipsum",
            },
            {
              title: "a boolean value",
              type: "boolean",
            },
          ],
          additionalItems: {
            title: "Additional item",
            type: "number",
          },
        },
        minItemsList: {
          type: "array",
          title: "A list with a minimal number of items",
          minItems: 3,
          items: {
            $ref: "#/definitions/Thing",
          },
        },
        defaultsAndMinItems: {
          type: "array",
          title: "List and item level defaults",
          minItems: 5,
          default: ["carp", "trout", "bream"],
          items: {
            type: "string",
            default: "unidentified",
          },
        },
        nestedList: {
          type: "array",
          title: "Nested list",
          items: {
            type: "array",
            title: "Inner list",
            items: {
              type: "string",
              default: "lorem ipsum",
            },
          },
        },
        unorderable: {
          title: "Unorderable items",
          type: "array",
          items: {
            type: "string",
            default: "lorem ipsum",
          },
        },
        copyable: {
          title: "Copyable items",
          type: "array",
          items: {
            type: "string",
            default: "lorem ipsum",
          },
        },
        unremovable: {
          title: "Unremovable items",
          type: "array",
          items: {
            type: "string",
            default: "lorem ipsum",
          },
        },
        noToolbar: {
          title: "No add, remove and order buttons",
          type: "array",
          items: {
            type: "string",
            default: "lorem ipsum",
          },
        },
        fixedNoToolbar: {
          title: "Fixed array without buttons",
          type: "array",
          items: [
            {
              title: "A number",
              type: "number",
              default: 42,
            },
            {
              title: "A boolean",
              type: "boolean",
              default: false,
            },
          ],
          additionalItems: {
            title: "A string",
            type: "string",
            default: "lorem ipsum",
          },
        },
      },
    },
    uiSchema: {
      listOfStrings: {
        items: { "ui:emptyValue": "" },
        "ui:options": {
          orderable: true,
        },
      },
      multipleChoicesList: {
        "ui:widget": "checkboxes",
      },
      fixedItemsList: {
        items: [{ "ui:widget": "textarea" }, { "ui:widget": "select" }],
        additionalItems: {
          "ui:widget": "updown",
        },
        "ui:options": {
          orderable: true,
        },
      },
      unorderable: {
        "ui:options": {
          orderable: true,
        },
      },
      copyable: {
        "ui:options": {
          copyable: true,
          orderable: true,
        },
      },
      unremovable: {
        "ui:options": {
          removable: false,
          orderable: true,
        },
      },
      noToolbar: {
        "ui:options": {
          addable: false,
          orderable: true,
          removable: false,
        },
      },
      fixedNoToolbar: {
        "ui:options": {
          addable: false,
          orderable: true,
          removable: false,
        },
      },
    },
    formData: {
      listOfStrings: ["foo", "bar"],
      multipleChoicesList: ["foo", "bar"],
      fixedItemsList: ["Some text", true, 123],
      nestedList: [["lorem", "ipsum"], ["dolor"]],
      unorderable: ["one", "two"],
      copyable: ["one", "two"],
      unremovable: ["one", "two"],
      noToolbar: ["one", "two"],
      fixedNoToolbar: [42, true, "additional item one", "additional item two"],
    },
  },
  {
    name: "custom",
    schema: {
      title: "A localisation form",
      type: "object",
      required: ["lat", "lon"],
      properties: {
        lat: {
          type: "number",
        },
        lon: {
          type: "number",
        },
      },
    },
    uiSchema: {
      "ui:field": "geo",
    },
    formData: {
      lat: 0,
      lon: 0,
    },
  },
  {
    name: "customField",
    schema: {
      title: "A registration form",
      description: "A custom-field form example.",
      type: "object",
      definitions: {
        specialString: {
          $id: "/schemas/specialString",
          type: "string",
        },
      },
      properties: {
        mySpecialStringField: {
          $ref: "#/definitions/specialString",
        },
        mySpecialStringArray: {
          type: "array",
          items: {
            $ref: "#/definitions/specialString",
          },
        },
      },
    },
    uiSchema: {},
    formData: {
      mySpecialStringField: "special-text",
    },
  },
  {
    name: "date",
    schema: {
      title: "Date and time widgets",
      type: "object",
      properties: {
        native: {
          title: "Native",
          description:
            "May not work on some browsers, notably Firefox Desktop and IE.",
          type: "object",
          properties: {
            datetime: {
              type: "string",
              format: "date-time",
            },
            date: {
              type: "string",
              format: "date",
            },
            time: {
              type: "string",
              format: "time",
            },
          },
        },
        alternative: {
          title: "Alternative",
          description: "These work on most platforms.",
          type: "object",
          properties: {
            "alt-datetime": {
              type: "string",
              format: "date-time",
            },
            "alt-date": {
              type: "string",
              format: "date",
            },
          },
        },
        mantine: {
          title: "Mantine",
          description: "Mantine date and time pickers",
          type: "object",
          properties: {
            datetime: {
              type: "string",
              format: "date-time",
            },
            date: {
              type: "string",
              format: "date",
            },
          },
        },
      },
    },
    uiSchema: {
      alternative: {
        "alt-datetime": {
          "ui:widget": "alt-datetime",
          "ui:options": {
            yearsRange: [1980, 2030],
            format: "YMD",
          },
        },
        "alt-date": {
          "ui:widget": "alt-date",
          "ui:options": {
            yearsRange: [1980, 2030],
            format: "MDY",
          },
        },
      },
      mantine: {
        datetime: {
          "ui:widget": "MantineDateTimeWidget",
        },
        date: {
          "ui:widget": "MantineDateWidget",
        },
      },
    },
    formData: {},
  },
  {
    name: "defaults",
    schema: {
      title: "Schema default properties",
      type: "object",
      properties: {
        valuesInFormData: {
          title: "Values in form data",
          $ref: "#/definitions/defaultsExample",
        },
        noValuesInFormData: {
          title: "No values in form data",
          $ref: "#/definitions/defaultsExample",
        },
      },
      definitions: {
        defaultsExample: {
          type: "object",
          properties: {
            scalar: {
              title: "Scalar",
              type: "string",
              default: "scalar default",
            },
            array: {
              title: "Array",
              type: "array",
              items: {
                type: "object",
                properties: {
                  nested: {
                    title: "Nested array",
                    type: "string",
                    default: "nested array default",
                  },
                },
              },
            },
            object: {
              title: "Object",
              type: "object",
              properties: {
                nested: {
                  title: "Nested object",
                  type: "string",
                  default: "nested object default",
                },
              },
            },
          },
        },
      },
    },
    uiSchema: {},
    formData: {
      valuesInFormData: {
        scalar: "value",
        array: [
          {
            nested: "nested array value",
          },
        ],
        object: {
          nested: "nested object value",
        },
      },
      noValuesInFormData: {
        array: [{}, {}],
      },
    },
  },
  {
    name: "enumObjects",
    schema: {
      definitions: {
        locations: {
          enumNames: ["New York", "Amsterdam", "Hong Kong"],
          enum: [
            {
              name: "New York",
              lat: 40,
              lon: 74,
            },
            {
              name: "Amsterdam",
              lat: 52,
              lon: 5,
            },
            {
              name: "Hong Kong",
              lat: 22,
              lon: 114,
            },
          ],
        },
      },
      type: "object",
      properties: {
        location: {
          title: "Location",
          $ref: "#/definitions/locations",
        },
        locationRadio: {
          title: "Location Radio",
          $ref: "#/definitions/locations",
        },
        multiSelect: {
          title: "Locations",
          type: "array",
          uniqueItems: true,
          items: {
            $ref: "#/definitions/locations",
          },
        },
        checkboxes: {
          title: "Locations Checkboxes",
          type: "array",
          uniqueItems: true,
          items: {
            $ref: "#/definitions/locations",
          },
        },
      },
    },
    uiSchema: {
      locationRadio: {
        "ui:widget": "RadioWidget",
      },
      checkboxes: {
        "ui:widget": "CheckboxesWidget",
      },
    },
    formData: {
      location: {
        name: "Amsterdam",
        lat: 52,
        lon: 5,
      },
    },
  },
  {
    name: "errors",
    schema: {
      title: "Contextualized errors",
      type: "object",
      properties: {
        firstName: {
          type: "string",
          title: "First name",
          minLength: 8,
          pattern: "\\d+",
        },
        active: {
          type: "boolean",
          title: "Active",
        },
        skills: {
          type: "array",
          items: {
            type: "string",
            minLength: 5,
          },
        },
        multipleChoicesList: {
          type: "array",
          title: "Pick max two items",
          uniqueItems: true,
          maxItems: 2,
          items: {
            type: "string",
            enum: ["foo", "bar", "fuzz"],
          },
        },
      },
    },
    uiSchema: {},
    formData: {
      firstName: "Chuck",
      active: "wrong",
      skills: ["karate", "budo", "aikido"],
      multipleChoicesList: ["foo", "bar", "fuzz"],
    },
  },
  {
    name: "errorSchema",
    schema: {
      title: "A registration form",
      description: "A simple form example.",
      type: "object",
      required: ["firstName", "lastName"],
      properties: {
        firstName: {
          type: "string",
          title: "First name",
          default: "Chuck",
        },
        lastName: {
          type: "string",
          title: "Last name",
        },
        age: {
          type: "integer",
          title: "Age",
        },
        bio: {
          type: "string",
          title: "Bio",
        },
        password: {
          type: "string",
          title: "Password",
          minLength: 3,
        },
        telephone: {
          type: "string",
          title: "Telephone",
          minLength: 10,
        },
      },
    },
    uiSchema: {
      firstName: {
        "ui:autofocus": true,
        "ui:emptyValue": "",
      },
      age: {
        "ui:widget": "updown",
        "ui:title": "Age of person",
        "ui:description": "(earthian year)",
      },
      bio: {
        "ui:widget": "textarea",
      },
      password: {
        "ui:widget": "password",
        "ui:help": "Hint: Make it strong!",
      },
      date: {
        "ui:widget": "alt-datetime",
      },
      telephone: {
        "ui:options": {
          inputType: "tel",
        },
      },
    },
    formData: {
      lastName: "Norris",
      age: 75,
      bio: "Roundhouse kicking asses since 1940",
      password: "noneed",
    },
    extraErrors: {},
  },
  {
    name: "examples",
    schema: {
      title: "Examples",
      description: "A text field with example values.",
      type: "object",
      properties: {
        browser: {
          type: "string",
          title: "Browser",
          examples: ["Firefox", "Chrome", "Opera", "Vivaldi", "Safari"],
        },
      },
    },
  },
  {
    name: "files",
    schema: {
      title: "Files",
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "data-url",
          title: "Single file",
        },
        files: {
          type: "array",
          title: "Multiple files",
          items: {
            type: "string",
            format: "data-url",
          },
        },
        filesAccept: {
          type: "string",
          format: "data-url",
          title: "Single File with Accept attribute",
        },
      },
    },
    uiSchema: {
      filesAccept: {
        "ui:options": { accept: ".pdf" },
      },
    },
    formData: {},
  },
  {
    name: "ifThenElse",
    schema: {
      type: "object",
      properties: {
        animal: {
          enum: ["Cat", "Fish"],
        },
      },
      allOf: [
        {
          if: {
            properties: { animal: { const: "Cat" } },
          },
          then: {
            properties: {
              food: { type: "string", enum: ["meat", "grass", "fish"] },
            },
            required: ["food"],
          },
        },
        {
          if: {
            properties: { animal: { const: "Fish" } },
          },
          then: {
            properties: {
              food: {
                type: "string",
                enum: ["insect", "worms"],
              },
              water: {
                type: "string",
                enum: ["lake", "sea"],
              },
            },
            required: ["food", "water"],
          },
        },
        {
          required: ["animal"],
        },
      ],
    },
    formData: {},
  },
  {
    name: "large",
    schema: {
      definitions: {
        largeEnum: { type: "string", enum: [
            "option #1", "option #2", "option #3", "option #4", "option #5", "option #6","option #7", "option #8"
          ]
        },
      },
      title: "A rather large form",
      type: "object",
      properties: {
        string: {
          type: "string",
          title: "Some string",
        },
        choice1: { $ref: "#/definitions/largeEnum" },
        choice2: { $ref: "#/definitions/largeEnum" },
        choice3: { $ref: "#/definitions/largeEnum" },
        choice4: { $ref: "#/definitions/largeEnum" },
        choice5: { $ref: "#/definitions/largeEnum" },
        choice6: { $ref: "#/definitions/largeEnum" },
        choice7: { $ref: "#/definitions/largeEnum" },
        choice8: { $ref: "#/definitions/largeEnum" },
        choice9: { $ref: "#/definitions/largeEnum" },
        choice10: { $ref: "#/definitions/largeEnum" },
      },
    },
    uiSchema: {
      choice1: {
        "ui:placeholder": "Choose one",
      },
    },
    formData: {},
  },
  {
    name: "nested",
    schema: {
      title: "A list of tasks",
      type: "object",
      required: ["title"],
      properties: {
        title: {
          type: "string",
          title: "Task list title",
        },
        tasks: {
          type: "array",
          title: "Tasks",
          items: {
            type: "object",
            required: ["title"],
            properties: {
              title: {
                type: "string",
                title: "Title",
                description: "A sample title",
              },
              details: {
                type: "string",
                title: "Task details",
                description: "Enter the task details",
              },
              done: {
                type: "boolean",
                title: "Done?",
                default: false,
              },
            },
          },
        },
      },
    },
    uiSchema: {
      tasks: {
        items: {
          details: {
            "ui:widget": "textarea",
          },
          "ui:options": {
            orderable: true,
            copyable: true,
            removable: true,
            addable: true,
          },
        },
      },
    },
    formData: {
      title: "My current tasks",
      tasks: [
        {
          title: "My first task",
          details:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          done: true,
        },
        {
          title: "My second task",
          details:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
          done: false,
        },
      ],
    },
  },
  {
    name: "null",
    schema: {
      title: "Null field example",
      description: "A short form with a null field",
      type: "object",
      required: ["firstName"],
      properties: {
        helpText: {
          title: "A null field",
          description:
            "Null fields like this are great for adding extra information",
          type: "null",
        },
        firstName: {
          type: "string",
          title: "A regular string field",
          default: "Chuck",
        },
      },
    },
    uiSchema: {
      firstName: {
        "ui:autofocus": true,
        "ui:emptyValue": "",
      },
    },
    formData: {},
  },
  {
    name: "nullable",
    schema: {
      title: "A registration form (nullable)",
      description: "A simple form example using nullable types",
      type: "object",
      required: ["firstName", "lastName"],
      properties: {
        firstName: {
          type: "string",
          title: "First name",
          default: "Chuck",
        },
        lastName: {
          type: "string",
          title: "Last name",
        },
        age: {
          type: ["integer", "null"],
          title: "Age",
        },
        bio: {
          type: ["string", "null"],
          title: "Bio",
        },
        password: {
          type: "string",
          title: "Password",
          minLength: 3,
        },
        telephone: {
          type: "string",
          title: "Telephone",
          minLength: 10,
        },
      },
    },
    uiSchema: {
      firstName: {
        "ui:autofocus": true,
        "ui:emptyValue": "",
      },
      age: {
        "ui:widget": "updown",
        "ui:title": "Age of person",
        "ui:description": "(earthian year)",
        "ui:emptyValue": null,
      },
      bio: {
        "ui:widget": "textarea",
        "ui:placeholder":
          "Leaving this field empty will cause formData property to be `null`",
        "ui:emptyValue": null,
      },
      password: {
        "ui:widget": "password",
        "ui:help": "Hint: Make it strong!",
      },
      date: {
        "ui:widget": "alt-datetime",
      },
      telephone: {
        "ui:options": {
          inputType: "tel",
        },
      },
    },
    formData: {
      lastName: "Norris",
      age: 75,
      bio: null,
      password: "noneed",
    },
  },
  {
    name: "numbers",
    schema: {
      type: "object",
      title: "Number fields & widgets",
      properties: {
        number: {
          title: "Number",
          type: "number",
        },
        integer: {
          title: "Integer",
          type: "integer",
        },
        numberEnum: {
          type: "number",
          title: "Number enum",
          enum: [1, 2, 3],
        },
        numberEnumRadio: {
          type: "number",
          title: "Number enum",
          enum: [1, 2, 3],
        },
        integerRange: {
          title: "Integer range",
          type: "integer",
          minimum: -50,
          maximum: 50,
        },
        integerRangeSteps: {
          title: "Integer range (by 10)",
          type: "integer",
          minimum: 50,
          maximum: 100,
          multipleOf: 10,
        },
        ratings: {
          title: "Ratings (integer)",
          type: "integer",
          minimum: 1,
          maximum: 5,
        },
      },
    },
    uiSchema: {
      integer: {
        "ui:widget": "updown",
      },
      numberEnumRadio: {
        "ui:widget": "radio",
        "ui:options": {
          inline: true,
        },
      },
      integerRange: {
        "ui:widget": "range",
      },
      integerRangeSteps: {
        "ui:widget": "range",
      },
      ratings: {
        "ui:widget": "RatingWidget",
      },
    },
    formData: {
      number: 3.14,
      integer: 42,
      numberEnum: 2,
      integerRange: 42,
      integerRangeSteps: 80,
    },
  },
  {
    name: "oneOf",
    schema: {
      type: "object",
      oneOf: [
        {
          properties: {
            lorem: {
              type: "string",
            },
          },
          required: ["lorem"],
        },
        {
          properties: {
            ipsum: {
              type: "string",
            },
          },
          required: ["ipsum"],
        },
      ],
    },
    formData: {},
  },
  {
    name: "options",
    schema: {
      title: "A registration form",
      description: "A simple form example. Demonstrating ui options",
      type: "object",
      required: ["firstName", "lastName"],
      properties: {
        firstName: {
          type: "string",
          title: "First name",
          default: "Chuck",
        },
        lastName: {
          type: "string",
          title: "Last name",
        },
        telephone: {
          type: "string",
          title: "Telephone",
          minLength: 10,
        },
      },
    },
    uiSchema: {
      "ui:submitButtonOptions": {
        submitText: "Confirm Details",
        norender: false,
        props: {
          disabled: false,
          className: "btn btn-info",
        },
      },
      firstName: {
        "ui:autofocus": true,
        "ui:emptyValue": "",
        "ui:autocomplete": "family-name",
      },
      lastName: {
        "ui:title": "Surname",
        "ui:emptyValue": "",
        "ui:autocomplete": "given-name",
      },
      age: {
        "ui:widget": "updown",
        "ui:title": "Age of person",
        "ui:description": "(earthian year)",
      },
      bio: {
        "ui:widget": "textarea",
      },
      password: {
        "ui:widget": "password",
        "ui:help": "Hint: Make it strong!",
      },
      date: {
        "ui:widget": "alt-datetime",
      },
      telephone: {
        "ui:options": {
          inputType: "tel",
        },
      },
    },
    formData: {
      lastName: "Norris",
      age: 75,
      bio: "Roundhouse kicking asses since 1940",
      password: "noneed",
    },
  },
  {
    name: "ordering",
    schema: {
      title: "A registration form",
      type: "object",
      required: ["firstName", "lastName"],
      properties: {
        password: {
          type: "string",
          title: "Password",
        },
        lastName: {
          type: "string",
          title: "Last name",
        },
        bio: {
          type: "string",
          title: "Bio",
        },
        firstName: {
          type: "string",
          title: "First name",
        },
        age: {
          type: "integer",
          title: "Age",
        },
      },
    },
    uiSchema: {
      "ui:order": ["firstName", "lastName", "*", "password"],
      age: {
        "ui:widget": "updown",
      },
      bio: {
        "ui:widget": "textarea",
      },
      password: {
        "ui:widget": "password",
      },
    },
    formData: {
      firstName: "Chuck",
      lastName: "Norris",
      age: 75,
      bio: "Roundhouse kicking asses since 1940",
      password: "noneed",
    },
  },
  {
    name: "propertyDependencies",
    schema: {
      title: "Property dependencies",
      description: "These samples are best viewed without live validation.",
      type: "object",
      properties: {
        unidirectional: {
          title: "Unidirectional",
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            credit_card: {
              type: "number",
            },
            billing_address: {
              type: "string",
            },
          },
          required: ["name"],
          dependencies: {
            credit_card: ["billing_address"],
          },
        },
        bidirectional: {
          title: "Bidirectional",
          description:
            "Dependencies are not bidirectional, you can, of course, define the bidirectional dependencies explicitly.",
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            credit_card: {
              type: "number",
            },
            billing_address: {
              type: "string",
            },
          },
          required: ["name"],
          dependencies: {
            credit_card: ["billing_address"],
            billing_address: ["credit_card"],
          },
        },
      },
    },
    uiSchema: {
      unidirectional: {
        credit_card: {
          "ui:help":
            "If you enter anything here then billing_address will become required.",
        },
        billing_address: {
          "ui:help":
            "It's okay to have a billing address without a credit card number.",
        },
      },
      bidirectional: {
        credit_card: {
          "ui:help":
            "If you enter anything here then billing_address will become required.",
        },
        billing_address: {
          "ui:help":
            "If you enter anything here then credit_card will become required.",
        },
      },
    },
    formData: {
      unidirectional: {
        name: "Tim",
      },
      bidirectional: {
        name: "Jill",
      },
    },
  },
  {
    name: "references",
    schema: {
      definitions: {
        address: {
          type: "object",
          properties: {
            street_address: { type: "string" },
            city: { type: "string" },
            state: { type: "string" },
          },
          required: ["street_address", "city", "state"],
        },
        node: {
          type: "object",
          properties: {
            name: { type: "string" },
            children: {
              type: "array",
              items: {
                $ref: "#/definitions/node",
              },
            },
          },
        },
      },
      type: "object",
      properties: {
        billing_address: {
          title: "Billing address",
          $ref: "#/definitions/address",
        },
        shipping_address: {
          title: "Shipping address",
          $ref: "#/definitions/address",
        },
        tree: {
          title: "Recursive references",
          $ref: "#/definitions/node",
        },
      },
    },
    uiSchema: {
      "ui:order": ["shipping_address", "billing_address", "tree"],
    },
    formData: {
      billing_address: {
        street_address: "21, Jump Street",
        city: "Babel",
        state: "Neverland",
      },
      shipping_address: {
        street_address: "221B, Baker Street",
        city: "London",
        state: "N/A",
      },
      tree: {
        name: "root",
        children: [{ name: "leaf" }],
      },
    },
  },
  {
    name: "schemaDependencies",
    schema: {
      title: "Schema dependencies",
      description: "These samples are best viewed without live validation.",
      type: "object",
      properties: {
        simple: {
          title: "Simple",
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            credit_card: {
              type: "number",
            },
          },
          required: ["name"],
          dependencies: {
            credit_card: {
              properties: {
                billing_address: {
                  type: "string",
                },
              },
              required: ["billing_address"],
            },
          },
        },
        conditional: {
          title: "Conditional",
          $ref: "#/definitions/person",
        },
        arrayOfConditionals: {
          title: "Array of conditionals",
          type: "array",
          items: {
            $ref: "#/definitions/person",
          },
        },
        fixedArrayOfConditionals: {
          title: "Fixed array of conditionals",
          type: "array",
          items: [
            {
              title: "Primary person",
              $ref: "#/definitions/person",
            },
          ],
          additionalItems: {
            title: "Additional person",
            $ref: "#/definitions/person",
          },
        },
      },
      definitions: {
        person: {
          title: "Person",
          type: "object",
          properties: {
            "Do you have any pets?": {
              type: "string",
              enum: ["No", "Yes: One", "Yes: More than one"],
              default: "No",
            },
          },
          required: ["Do you have any pets?"],
          dependencies: {
            "Do you have any pets?": {
              oneOf: [
                {
                  properties: {
                    "Do you have any pets?": {
                      enum: ["No"],
                    },
                  },
                },
                {
                  properties: {
                    "Do you have any pets?": {
                      enum: ["Yes: One"],
                    },
                    "How old is your pet?": {
                      type: "number",
                    },
                  },
                  required: ["How old is your pet?"],
                },
                {
                  properties: {
                    "Do you have any pets?": {
                      enum: ["Yes: More than one"],
                    },
                    "Do you want to get rid of any?": {
                      type: "boolean",
                    },
                  },
                  required: ["Do you want to get rid of any?"],
                },
              ],
            },
          },
        },
      },
    },
    uiSchema: {
      simple: {
        credit_card: {
          "ui:help":
            "If you enter anything here then billing_address will be dynamically added to the form.",
        },
      },
      conditional: {
        "Do you want to get rid of any?": {
          "ui:widget": "radio",
        },
      },
      arrayOfConditionals: {
        items: {
          "Do you want to get rid of any?": {
            "ui:widget": "radio",
          },
        },
      },
      fixedArrayOfConditionals: {
        items: {
          "Do you want to get rid of any?": {
            "ui:widget": "radio",
          },
        },
        additionalItems: {
          "Do you want to get rid of any?": {
            "ui:widget": "radio",
          },
        },
      },
    },
    formData: {
      simple: {
        name: "Randy",
      },
      conditional: {
        "Do you have any pets?": "No",
      },
      arrayOfConditionals: [
        {
          "Do you have any pets?": "Yes: One",
          "How old is your pet?": 6,
        },
        {
          "Do you have any pets?": "Yes: More than one",
          "Do you want to get rid of any?": false,
        },
      ],
      fixedArrayOfConditionals: [
        {
          "Do you have any pets?": "No",
        },
        {
          "Do you have any pets?": "Yes: One",
          "How old is your pet?": 6,
        },
        {
          "Do you have any pets?": "Yes: More than one",
          "Do you want to get rid of any?": true,
        },
      ],
    },
  },
  {
    name: "simple",
    schema: {
      title: "A registration form",
      description: "A simple form example.",
      type: "object",
      required: ["firstName", "lastName"],
      properties: {
        firstName: {
          type: "string",
          title: "First name",
          default: "Chuck",
        },
        lastName: {
          type: "string",
          title: "Last name",
        },
        age: {
          type: "integer",
          title: "Age",
        },
        bio: {
          type: "string",
          title: "Bio",
        },
        password: {
          type: "string",
          title: "Password",
          minLength: 3,
        },
        telephone: {
          type: "string",
          title: "Telephone",
          minLength: 10,
        },
      },
    },
    uiSchema: {
      firstName: {
        "ui:autofocus": true,
        "ui:emptyValue": "",
        "ui:placeholder":
          "ui:emptyValue causes this field to always be valid despite being required",
        "ui:autocomplete": "family-name",
        "ui:enableMarkdownInDescription": true,
        "ui:description":
          "Make text **bold** or *italic*. Take a look at other options [here](https://probablyup.com/markdown-to-jsx/).",
      },
      lastName: {
        "ui:autocomplete": "given-name",
        "ui:enableMarkdownInDescription": true,
        "ui:description":
          "Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> ",
      },
      age: {
        "ui:widget": "updown",
        "ui:title": "Age of person",
        "ui:description": "(earth year)",
      },
      bio: {
        "ui:widget": "textarea",
      },
      password: {
        "ui:widget": "password",
        "ui:help": "Hint: Make it strong!",
      },
      telephone: {
        "ui:options": {
          inputType: "tel",
        },
      },
    },
    formData: {
      lastName: "Norris",
      age: 75,
      bio: "Roundhouse kicking asses since 1940",
      password: "noneed",
      telephone: "1-800-KICKASS",
    },
  },
  {
    name: "single",
    schema: {
      title: "A single-field form",
      type: "string",
    },
    formData: "initial value",
    uiSchema: {},
  },
  {
    name: "validation",
    schema: {
      title: "Custom validation",
      description:
        "This form defines custom validation rules checking that the two passwords match. There is also a custom validation message when submitting an age < 18, which can only be seen if HTML5 validation is turned off.",
      type: "object",
      properties: {
        pass1: {
          title: "Password",
          type: "string",
          minLength: 3,
        },
        pass2: {
          title: "Repeat password",
          type: "string",
          minLength: 3,
        },
        age: {
          title: "Age",
          type: "number",
          minimum: 18,
        },
      },
    },
    uiSchema: {
      pass1: {
        "ui:widget": "password",
      },
      pass2: {
        "ui:widget": "password",
      },
    },
    formData: {},
  },
]
