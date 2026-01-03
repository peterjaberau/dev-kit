const treeDataReducer = [
  {
    "instruction": {
      "operation": "reorder-after",
      "blocked": false,
      "axis": "vertical"
    },
    "result": [
      {
        "id": "1",
        "isOpen": true,
        "profile": {
          "firstName": "John",
          "lastName": "Doe",
          "dob": "1990-01-01",
          "summary": "A sample user profile",
          "weight": 70,
          "height": 175
        },
        "children": [
          {
            "id": "1.1",
            "isOpen": true,
            "children": [
              {
                "id": "1.1.1",
                "isOpen": true,
                "children": []
              },
              {
                "id": "1.1.2",
                "isDraft": true,
                "children": []
              }
            ]
          },
          {
            "id": "1.2",
            "children": []
          }
        ]
      },
      {
        "id": "2",
        "isOpen": true,
        "children": [
          {
            "id": "2.1",
            "isOpen": true,
            "children": [
              {
                "id": "2.1.1",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id": "3.1",
        "isOpen": false,
        "children": [
          {
            "id": "3.1",
            "children": []
          },
          {
            "id": "3.1.2",
            "children": []
          },
          {
            "id": "3.1.3",
            "children": []
          },
          {
            "id": "3.1.4",
            "children": []
          }
        ]
      },
      {
        "id": "3",
        "isOpen": true,
        "children": []
      },
      {
        "id": "4",
        "isOpen": true,
        "children": [
          {
            "id": "4.1",
            "isOpen": true,
            "children": [
              {
                "id": "4.1.1"
              },
              {
                "id": "4.1.2"
              }
            ]
          }
        ]
      }
    ],
    "item": {
      "id": "2.1.2",
      "children": []
    },
    "data": [
      {
        "id": "1",
        "isOpen": true,
        "profile": {
          "firstName": "John",
          "lastName": "Doe",
          "dob": "1990-01-01",
          "summary": "A sample user profile",
          "weight": 70,
          "height": 175
        },
        "children": [
          {
            "id": "1.1",
            "isOpen": true,
            "children": [
              {
                "id": "1.1.1",
                "isOpen": true,
                "children": []
              },
              {
                "id": "1.1.2",
                "isDraft": true,
                "children": []
              }
            ]
          },
          {
            "id": "1.2",
            "children": []
          }
        ]
      },
      {
        "id": "2",
        "isOpen": true,
        "children": [
          {
            "id": "2.1",
            "isOpen": true,
            "children": [
              {
                "id": "2.1.1",
                "children": []
              },
              {
                "id": "2.1.2",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id": "3.1",
        "isOpen": false,
        "children": [
          {
            "id": "3.1",
            "children": []
          },
          {
            "id": "3.1.2",
            "children": []
          },
          {
            "id": "3.1.3",
            "children": []
          },
          {
            "id": "3.1.4",
            "children": []
          }
        ]
      },
      {
        "id": "3",
        "isOpen": true,
        "children": []
      },
      {
        "id": "4",
        "isOpen": true,
        "children": [
          {
            "id": "4.1",
            "isOpen": true,
            "children": [
              {
                "id": "4.1.1"
              },
              {
                "id": "4.1.2"
              }
            ]
          }
        ]
      }
    ],
    "action": {
      "type": "instruction",
      "instruction": {
        "operation": "reorder-after",
        "blocked": false,
        "axis": "vertical"
      },
      "itemId": "2.1.2",
      "targetId": "2.1"
    },
    "tree": {}
  },
  {
    "instruction": {
      "operation": "combine",
      "blocked": true,
      "axis": "vertical"
    },
    "item": {
      "id": "3.1",
      "isOpen": false,
      "children": [
        {
          "id": "3.1",
          "children": []
        },
        {
          "id": "3.1.2",
          "children": []
        },
        {
          "id": "3.1.3",
          "children": []
        },
        {
          "id": "3.1.4",
          "children": []
        }
      ]
    },
    "data": [
      {
        "id": "1",
        "isOpen": true,
        "profile": {
          "firstName": "John",
          "lastName": "Doe",
          "dob": "1990-01-01",
          "summary": "A sample user profile",
          "weight": 70,
          "height": 175
        },
        "children": [
          {
            "id": "1.1",
            "isOpen": true,
            "children": [
              {
                "id": "1.1.1",
                "isOpen": true,
                "children": []
              },
              {
                "id": "1.1.2",
                "isDraft": true,
                "children": []
              }
            ]
          },
          {
            "id": "1.2",
            "children": []
          }
        ]
      },
      {
        "id": "2",
        "isOpen": true,
        "children": [
          {
            "id": "2.1",
            "isOpen": true,
            "children": [
              {
                "id": "2.1.1",
                "children": []
              }
            ]
          },
          {
            "id": "2.1.2",
            "children": []
          }
        ]
      },
      {
        "id": "3.1",
        "isOpen": false,
        "children": [
          {
            "id": "3.1",
            "children": []
          },
          {
            "id": "3.1.2",
            "children": []
          },
          {
            "id": "3.1.3",
            "children": []
          },
          {
            "id": "3.1.4",
            "children": []
          }
        ]
      },
      {
        "id": "3",
        "isOpen": true,
        "children": []
      },
      {
        "id": "4",
        "isOpen": true,
        "children": [
          {
            "id": "4.1",
            "isOpen": true,
            "children": [
              {
                "id": "4.1.1"
              },
              {
                "id": "4.1.2"
              }
            ]
          }
        ]
      }
    ],
    "action": {
      "type": "instruction",
      "instruction": {
        "operation": "combine",
        "blocked": true,
        "axis": "vertical"
      },
      "itemId": "3.1",
      "targetId": "1.1.2"
    },
    "tree": {}
  },
  {
    "instruction": {
      "operation": "combine",
      "blocked": false,
      "axis": "vertical"
    },
    "result": [
      {
        "id": "1",
        "isOpen": true,
        "profile": {
          "firstName": "John",
          "lastName": "Doe",
          "dob": "1990-01-01",
          "summary": "A sample user profile",
          "weight": 70,
          "height": 175
        },
        "children": [
          {
            "id": "1.1",
            "isOpen": true,
            "children": [
              {
                "id": "1.1.1",
                "isOpen": true,
                "children": [
                  {
                    "id": "3.1",
                    "isOpen": false,
                    "children": [
                      {
                        "id": "3.1",
                        "children": []
                      },
                      {
                        "id": "3.1.2",
                        "children": []
                      },
                      {
                        "id": "3.1.3",
                        "children": []
                      },
                      {
                        "id": "3.1.4",
                        "children": []
                      }
                    ]
                  }
                ]
              },
              {
                "id": "1.1.2",
                "isDraft": true,
                "children": []
              }
            ]
          },
          {
            "id": "1.2",
            "children": []
          }
        ]
      },
      {
        "id": "2",
        "isOpen": true,
        "children": [
          {
            "id": "2.1",
            "isOpen": true,
            "children": [
              {
                "id": "2.1.1",
                "children": []
              }
            ]
          },
          {
            "id": "2.1.2",
            "children": []
          }
        ]
      },
      {
        "id": "3",
        "isOpen": true,
        "children": []
      },
      {
        "id": "4",
        "isOpen": true,
        "children": [
          {
            "id": "4.1",
            "isOpen": true,
            "children": [
              {
                "id": "4.1.1"
              },
              {
                "id": "4.1.2"
              }
            ]
          }
        ]
      }
    ],
    "item": {
      "id": "3.1",
      "isOpen": false,
      "children": [
        {
          "id": "3.1",
          "children": []
        },
        {
          "id": "3.1.2",
          "children": []
        },
        {
          "id": "3.1.3",
          "children": []
        },
        {
          "id": "3.1.4",
          "children": []
        }
      ]
    },
    "data": [
      {
        "id": "1",
        "isOpen": true,
        "profile": {
          "firstName": "John",
          "lastName": "Doe",
          "dob": "1990-01-01",
          "summary": "A sample user profile",
          "weight": 70,
          "height": 175
        },
        "children": [
          {
            "id": "1.1",
            "isOpen": true,
            "children": [
              {
                "id": "1.1.1",
                "isOpen": true,
                "children": []
              },
              {
                "id": "1.1.2",
                "isDraft": true,
                "children": []
              }
            ]
          },
          {
            "id": "1.2",
            "children": []
          }
        ]
      },
      {
        "id": "2",
        "isOpen": true,
        "children": [
          {
            "id": "2.1",
            "isOpen": true,
            "children": [
              {
                "id": "2.1.1",
                "children": []
              }
            ]
          },
          {
            "id": "2.1.2",
            "children": []
          }
        ]
      },
      {
        "id": "3.1",
        "isOpen": false,
        "children": [
          {
            "id": "3.1",
            "children": []
          },
          {
            "id": "3.1.2",
            "children": []
          },
          {
            "id": "3.1.3",
            "children": []
          },
          {
            "id": "3.1.4",
            "children": []
          }
        ]
      },
      {
        "id": "3",
        "isOpen": true,
        "children": []
      },
      {
        "id": "4",
        "isOpen": true,
        "children": [
          {
            "id": "4.1",
            "isOpen": true,
            "children": [
              {
                "id": "4.1.1"
              },
              {
                "id": "4.1.2"
              }
            ]
          }
        ]
      }
    ],
    "action": {
      "type": "instruction",
      "instruction": {
        "operation": "combine",
        "blocked": false,
        "axis": "vertical"
      },
      "itemId": "3.1",
      "targetId": "1.1.1"
    },
    "tree": {}
  }
]


const treeItemState = {

  isInnerMostOver: [
    {
      "dragState": "idle",
      "groupState": "is-innermost-over",
      "instruction": null,
      "item": {
        "id": "2.1",
        "isOpen": true,
        "children": [
          {
            "id": "2.1.1",
            "children": []
          },
          {
            "id": "2.1.2",
            "children": []
          }
        ]
      }
    }
  ],

  dragging: [
    {
      "dragState": "dragging",
      "groupState": "idle",
      "instruction": null,
      "item": {
        "id": "3.1",
        "isOpen": false,
        "children": [
          {
            "id": "3.1",
            "children": []
          },
          {
            "id": "3.1.2",
            "children": []
          },
          {
            "id": "3.1.3",
            "children": []
          },
          {
            "id": "3.1.4",
            "children": []
          }
        ]
      }
    }
  ],

  reorderBeforeInstruction: [
    {
      "instruction": {
        "operation": "reorder-before",
        "blocked": false,
        "axis": "vertical"
      },
      "result": [
        {
          "id": "1",
          "isOpen": true,
          "profile": {
            "firstName": "John",
            "lastName": "Doe",
            "dob": "1990-01-01",
            "summary": "A sample user profile",
            "weight": 70,
            "height": 175
          },
          "children": [
            {
              "id": "1.1",
              "isOpen": true,
              "children": [
                {
                  "id": "1.1.1",
                  "isOpen": true,
                  "children": []
                },
                {
                  "id": "1.1.2",
                  "isDraft": true,
                  "children": []
                }
              ]
            },
            {
              "id": "1.2",
              "children": []
            }
          ]
        },
        {
          "id": "2",
          "isOpen": true,
          "children": [
            {
              "id": "2.1",
              "isOpen": true,
              "children": [
                {
                  "id": "2.1.1",
                  "children": []
                },
                {
                  "id": "2.1.2",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "3",
          "isOpen": true,
          "children": []
        },
        {
          "id": "4",
          "isOpen": true,
          "children": [
            {
              "id": "4.1",
              "isOpen": true,
              "children": [
                {
                  "id": "4.1.1"
                },
                {
                  "id": "4.1.2"
                }
              ]
            }
          ]
        }
      ],
      "item": {
        "id": "3.1",
        "isOpen": false,
        "children": [
          {
            "id": "3.1",
            "children": []
          },
          {
            "id": "3.1.2",
            "children": []
          },
          {
            "id": "3.1.3",
            "children": []
          },
          {
            "id": "3.1.4",
            "children": []
          }
        ]
      },
      "data": [
        {
          "id": "1",
          "isOpen": true,
          "profile": {
            "firstName": "John",
            "lastName": "Doe",
            "dob": "1990-01-01",
            "summary": "A sample user profile",
            "weight": 70,
            "height": 175
          },
          "children": [
            {
              "id": "1.1",
              "isOpen": true,
              "children": [
                {
                  "id": "1.1.1",
                  "isOpen": true,
                  "children": []
                },
                {
                  "id": "1.1.2",
                  "isDraft": true,
                  "children": []
                }
              ]
            },
            {
              "id": "1.2",
              "children": []
            }
          ]
        },
        {
          "id": "2",
          "isOpen": true,
          "children": [
            {
              "id": "2.1",
              "isOpen": true,
              "children": [
                {
                  "id": "2.1.1",
                  "children": []
                },
                {
                  "id": "2.1.2",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "3",
          "isOpen": true,
          "children": [
            {
              "id": "3.1",
              "isOpen": false,
              "children": [
                {
                  "id": "3.1",
                  "children": []
                },
                {
                  "id": "3.1.2",
                  "children": []
                },
                {
                  "id": "3.1.3",
                  "children": []
                },
                {
                  "id": "3.1.4",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "4",
          "isOpen": true,
          "children": [
            {
              "id": "4.1",
              "isOpen": true,
              "children": [
                {
                  "id": "4.1.1"
                },
                {
                  "id": "4.1.2"
                }
              ]
            }
          ]
        }
      ],
      "action": {
        "type": "instruction",
        "instruction": {
          "operation": "reorder-before",
          "blocked": false,
          "axis": "vertical"
        },
        "itemId": "3.1",
        "targetId": "3"
      },
      "tree": {}
    }
  ],
  blockedInstruction: [
    {
      "instruction": {
        "operation": "combine",
        "blocked": true,
        "axis": "vertical"
      },
      "item": {
        "id": "2.1.1",
        "children": []
      },
      "data": [
        {
          "id": "1",
          "isOpen": true,
          "profile": {
            "firstName": "John",
            "lastName": "Doe",
            "dob": "1990-01-01",
            "summary": "A sample user profile",
            "weight": 70,
            "height": 175
          },
          "children": [
            {
              "id": "1.1",
              "isOpen": true,
              "children": [
                {
                  "id": "1.1.1",
                  "isOpen": true,
                  "children": []
                },
                {
                  "id": "1.1.2",
                  "isDraft": true,
                  "children": []
                }
              ]
            },
            {
              "id": "1.2",
              "children": []
            }
          ]
        },
        {
          "id": "2",
          "isOpen": true,
          "children": [
            {
              "id": "2.1",
              "isOpen": true,
              "children": [
                {
                  "id": "2.1.1",
                  "children": []
                },
                {
                  "id": "2.1.2",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "3.1",
          "isOpen": false,
          "children": [
            {
              "id": "3.1",
              "children": []
            },
            {
              "id": "3.1.2",
              "children": []
            },
            {
              "id": "3.1.3",
              "children": []
            },
            {
              "id": "3.1.4",
              "children": []
            }
          ]
        },
        {
          "id": "3",
          "isOpen": true,
          "children": []
        },
        {
          "id": "4",
          "isOpen": true,
          "children": [
            {
              "id": "4.1",
              "isOpen": true,
              "children": [
                {
                  "id": "4.1.1"
                },
                {
                  "id": "4.1.2"
                }
              ]
            }
          ]
        }
      ],
      "action": {
        "type": "instruction",
        "instruction": {
          "operation": "combine",
          "blocked": true,
          "axis": "vertical"
        },
        "itemId": "2.1.1",
        "targetId": "1.1.2"
      },
      "tree": {}
    }
  ]
}


const treeItem = [

  {
    dragState: "idle",
    groupState: "idle",
    instruction: {
      operation: "reorder-before",
      blocked: false,
      axis: "vertical",
    },
    item: {
      id: "3.1",
      isOpen: true,
      children: [
        {
          id: "3.1.2",
          children: [],
        },
        {
          id: "3.1",
          children: [],
        },
        {
          id: "3.1.3",
          children: [],
        },
        {
          id: "3.1.4",
          children: [],
        },
      ],
    },
  },
  {
    dragState: "idle",
    groupState: "idle",
    instruction: {
      operation: "combine",
      blocked: false,
      axis: "vertical",
    },
    item: {
      id: "3.1",
      isOpen: true,
      children: [
        {
          id: "3.1.2",
          children: [],
        },
        {
          id: "3.1",
          children: [],
        },
        {
          id: "3.1.3",
          children: [],
        },
        {
          id: "3.1.4",
          children: [],
        },
      ],
    },
  },
  {
    dragState: "idle",
    groupState: "idle",
    instruction: {
      operation: "combine",
      blocked: false,
      axis: "vertical",
    },
    item: {
      id: "3.1",
      isOpen: true,
      children: [
        {
          id: "3.1.2",
          children: [],
        },
        {
          id: "3.1",
          children: [],
        },
        {
          id: "3.1.3",
          children: [],
        },
        {
          id: "3.1.4",
          children: [],
        },
      ],
    },
  },
  {
    dragState: "idle",
    groupState: "is-innermost-over",
    instruction: null,
    item: {
      id: "3",
      isOpen: true,
      children: [
        {
          id: "3.1",
          isOpen: true,
          children: [
            {
              id: "3.1.2",
              children: [],
            },
            {
              id: "3.1",
              children: [],
            },
            {
              id: "3.1.3",
              children: [],
            },
            {
              id: "3.1.4",
              children: [],
            },
          ],
        },
      ],
    },
  },
  {
    dragState: "dragging",
    groupState: "idle",
    instruction: null,
    item: {
      id: "4.1.2",
    },
  },
]


