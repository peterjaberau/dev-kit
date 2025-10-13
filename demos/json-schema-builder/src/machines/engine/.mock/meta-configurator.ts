export const settings = {
  SETTINGS_DATA_DEFAULT: {
    settingsVersion: '1.0.3',
    latestNewsHash: 0,
    dataFormat: 'json',
    toolbarTitle: 'MetaConfigurator',
    hideSchemaEditor: false,
    hideSettings: false,
    performance: {
      maxDocumentSizeForValidation: 1024000, // 1 MiB
      maxDocumentSizeForCursorSynchronization: 1240000, // 1 MiB
      maxDocumentSizeForSchemaInference: 40960, // 40 KiB
      minObjectPropertyCountToPreserve: 16, // when large document is trimmed, this is minimum count of object properties to be preserved
      maxShownChildrenInGuiEditor: 50,
    },
    codeEditor: {
      fontSize: 14,
      tabSize: 2,
      showFormatSelector: true,
      xml: {
        attributeNamePrefix: '_',
      },
    },
    guiEditor: {
      maximumDepth: 20,
      propertySorting: 'schemaOrder',
      hideAddPropertyButton: true,
      showBorderAroundInputFields: true,
      showSchemaTitleAsHeader: true,
    },
    schemaDiagram: {
      editMode: true,
      vertical: true,
      showAttributes: true,
      showEnumValues: true,
      maxAttributesToShow: 30,
      maxEnumValuesToShow: 10,
      moveViewToSelectedElement: false,
      automaticZoomMaxValue: 1,
      automaticZoomMinValue: 0.5,
      mergeAllOfs: false,
    },
    documentation: {
      mergeAllOfs: true,
      enumMaxCountToShowWithoutSpoiler: 10,
      repeatMultipleOccurrencesInTableOfContents: true,
    },
    metaSchema: {
      allowBooleanSchema: false,
      allowMultipleTypes: false,
      objectTypesComfort: false,
      markMoreFieldsAsAdvanced: true,
      showAdditionalPropertiesButton: false,
      showJsonLdFields: false,
    },
    panels: {
      dataEditor: [
        {
          panelType: 'textEditor',
          mode: 'dataEditor',
          size: 50,
        },
        {
          panelType: 'guiEditor',
          mode: 'dataEditor',
          size: 50,
        },
      ],
      schemaEditor: [
        {
          panelType: 'textEditor',
          mode: 'schemaEditor',
          size: 33,
        },
        {
          panelType: 'schemaDiagram',
          mode: 'schemaEditor',
          size: 33,
        },
        {
          panelType: 'guiEditor',
          mode: 'schemaEditor',
          size: 33,
        },
      ],
      settings: [
        {
          panelType: 'textEditor',
          mode: 'settings',
          size: 50,
        },
        {
          panelType: 'guiEditor',
          mode: 'settings',
          size: 50,
        },
      ],
      hidden: ['debug', 'test'],
    },
    frontend: {
      hostname:
        import.meta.env.VITE_FRONTEND_HOSTNAME ||
        'https://metaconfigurator.github.io/meta-configurator',
    },
    backend: {
      hostname: 'https://metaconfigurator.informatik.uni-stuttgart.de',
    },
    rdf: {
      sparqlEndpointUrl: 'https://dbpedia.org/sparql',
    },
    aiIntegration: {
      model: 'gpt-4o-mini',
      maxTokens: 5000,
      temperature: 0.0,
      endpoint: 'https://api.openai.com/v1/chat/completions',
    },
  },
  SETTINGS_SCHEMA: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Settings',
    description: 'MetaConfigurator settings',
    type: 'object',
    required: ['dataFormat', 'codeEditor', 'guiEditor', 'schemaDiagram', 'metaSchema', 'panels'],
    additionalProperties: false,
    properties: {
      settingsVersion: {
        type: 'string',
        description: 'The version of the settings file.',
        default: '1.0.2',
        enum: ['1.0.0', '1.0.1', '1.0.2', '1.0.3'],
        readOnly: true,
      },
      latestNewsHash: {
        type: 'integer',
        description:
          'The hash of the current news. This is used to determine if the news has changed since the last time the settings were loaded.',
        default: 0,
        readOnly: true,
      },
      dataFormat: {
        type: 'string',
        description: 'The data format to use for the configuration files.',
        default: 'json',
        enum: ['json', 'yaml', 'xml'],
      },
      toolbarTitle: {
        type: 'string',
        description: 'The title of the editor, shown in the toolbar.',
        default: 'MetaConfigurator',
      },
      hideSchemaEditor: {
        type: 'boolean',
        description: 'If set to true, the complete schema editor view will be hidden.',
        default: false,
      },
      hideSettings: {
        type: 'boolean',
        description: 'If set to true, the complete settings view will be hidden.',
        default: false,
      },
      performance: {
        type: 'object',
        required: [
          'maxDocumentSizeForValidation',
          'maxDocumentSizeForCursorSynchronization',
          'maxDocumentSizeForSchemaInference',
          'minObjectPropertyCountToPreserve',
          'maxShownChildrenInGuiEditor',
        ],
        additionalProperties: false,
        description: 'Performance related settings belong here.',
        properties: {
          maxDocumentSizeForValidation: {
            type: 'integer',
            description:
              'The maximum size of the document to validate in bytes. If the document is larger, it will not be validated.',
            default: 1000000, // 1 MB
            minimum: 1000,
          },
          maxDocumentSizeForCursorSynchronization: {
            type: 'integer',
            description:
              'The maximum size of the document to synchronize the cursor position in bytes. If the document is larger, the cursor position will not be synchronized.',
            default: 1000000, // 1 MB
            minimum: 1000,
          },
          maxDocumentSizeForSchemaInference: {
            type: 'integer',
            description:
              'The maximum size of the document to infer the schema from in bytes. If the document is larger, a smart algorithm is used to trim the document first and then infer the schema from the smaller, trimmed input document.',
            default: 250000, // 250 KB
            minimum: 1000,
          },
          minObjectPropertyCountToPreserve: {
            type: 'integer',
            description:
              'When large documents are trimmed, this is the minimum count of object properties to be preserved. This is used to avoid trimming too much data from objects with many properties. The value can be increased in this setting if in your application more properties are cut than desired during the performance optimization.',
            default: 16,
            minimum: 16,
          },
          maxShownChildrenInGuiEditor: {
            type: 'integer',
            description:
              'The maximum amount of child nodes to be shown in the GUI editor per parent node. If the document has more children than this value, those will not be shown in the GUI editor, but still exist in the document and can be edited by other panels.',
            default: 50,
            minimum: 5,
          },
        },
      },
      codeEditor: {
        type: 'object',
        required: ['fontSize'],
        additionalProperties: false,
        description: 'Settings of the code editor.',
        properties: {
          fontSize: {
            type: 'integer',
            description: 'The font size of the code editor.',
            default: 14,
            minimum: 10,
            maximum: 40,
          },
          tabSize: {
            type: 'integer',
            description: 'The tab size of the code editor.',
            default: 2,
            minimum: 1,
            maximum: 8,
          },
          showFormatSelector: {
            type: 'boolean',
            description:
              'If set to true, a dropdown for selecting the format (JSON or YAML) will be shown in the code editor.',
            default: true,
          },
          xml: {
            type: 'object',
            required: ['attributeNamePrefix'],
            additionalProperties: false,
            description: 'Settings for the XML format  in the code editor.',
            properties: {
              attributeNamePrefix: {
                type: 'string',
                description: 'The prefix for attributes in the XML format.',
                default: '_',
              },
            },
          },
        },
      },
      guiEditor: {
        type: 'object',
        required: ['maximumDepth', 'propertySorting'],
        additionalProperties: false,
        description: 'GUI Editor related settings belong here.',
        properties: {
          maximumDepth: {
            type: 'integer',
            description:
              'The maximum depth of the GUI editor. If the depth of the configuration object is higher, the GUI editor will not show the deeper levels, but they can be navigated by clicking on the property name',
            default: 5,
            minimum: 1,
            maximum: 20,
          },
          propertySorting: {
            type: 'string',
            description:
              "The sorting of the properties in the GUI editor. If set to 'priorityOrder', the order will be required properties first, then optional properties, then additional and pattern properties and finally deprecated properties. If set to 'dataOrder', the properties will be displayed in the order they are in the configuration object. If set to 'schemaOrder', the properties will be sorted according to the order in the schema.",
            default: 'schemaOrder',
            enum: ['priorityOrder', 'schemaOrder', 'dataOrder'],
          },
          hideAddPropertyButton: {
            type: 'boolean',
            description:
              'If set to true, the button for adding custom (not defined by the schema) properties in the GUI editor will be hidden. By default, every schema object allows any additional properties, however, showing this option in the GUI is often not desired as it would only confuse the user. If a particular schema is defined for additional properties, other than "true", then the button will not be hidden.',
            default: true,
          },
          showBorderAroundInputFields: {
            type: 'boolean',
            description:
              'If set to true, the input fields in the GUI editor will have a border around them. This can make the GUI editor more readable, but also can make it look cluttered.',
            default: true,
          },
          showSchemaTitleAsHeader: {
            type: 'boolean',
            description:
              'If set to true, the title of the schema will be shown as a header in the GUI editor.',
            default: true,
          },
        },
      },
      schemaDiagram: {
        type: 'object',
        required: [
          'editMode',
          'vertical',
          'showAttributes',
          'showEnumValues',
          'maxAttributesToShow',
          'maxEnumValuesToShow',
          'moveViewToSelectedElement',
          'automaticZoomMaxValue',
          'automaticZoomMinValue',
          'mergeAllOfs',
        ],
        additionalProperties: false,
        description: 'Settings of the schema diagram.',
        properties: {
          editMode: {
            type: 'boolean',
            description:
              'If set to true, the schema diagram will be in edit mode, allowing the user to change the schema by clicking on the elements. If set to false, the schema diagram will be in view mode, showing the schema without the possibility to change it.',
            default: true,
          },
          vertical: {
            type: 'boolean',
            description: 'If set to true, the schema diagram will be displayed vertically.',
            default: true,
          },
          showAttributes: {
            type: 'boolean',
            description:
              'If set to true, the attributes of the schema will be displayed in the schema diagram.',
            default: true,
          },
          showEnumValues: {
            type: 'boolean',
            description:
              'If set to true, the enum values of the schema will be displayed in the schema diagram.',
            default: true,
          },
          maxAttributesToShow: {
            type: 'integer',
            description:
              'The maximum number of attributes to show in the schema diagram. If the number of attributes is higher, they will be hidden.',
            default: 8,
            minimum: 1,
          },
          maxEnumValuesToShow: {
            type: 'integer',
            description:
              'The maximum number of enum values to show in the schema diagram. If the number of enum values is higher, they will be hidden.',
            default: 5,
            minimum: 1,
          },
          moveViewToSelectedElement: {
            type: 'boolean',
            description:
              'If set to true, the view will be moved to the selected element in the schema diagram.',
            default: true,
          },
          automaticZoomMaxValue: {
            type: 'number',
            description:
              'The maximum zoom level of the automatic zoom in the schema diagram, which happens whenever the view moves to a selected element.',
            default: 1,
          },
          automaticZoomMinValue: {
            type: 'number',
            description:
              'The minimum zoom level of the automatic zoom in the schema diagram, which happens whenever the view moves to a selected element.',
            default: 0.5,
          },
          mergeAllOfs: {
            type: 'boolean',
            description:
              'If set to true, allOf schemas will be merged in the schema diagram. This can make the diagram more readable, but sometimes also is not desired, because some information gets lost.',
            $comment:
              'Warning: has undefined behavior when merging multiple allOfs using the "$ref" keyword.',
            default: false,
          },
        },
      },
      documentation: {
        description: 'Settings of the documentation view.',
        type: 'object',
        required: [
          'mergeAllOfs',
          'enumMaxCountToShowWithoutSpoiler',
          `repeatMultipleOccurrencesInTableOfContents`,
        ],
        properties: {
          mergeAllOfs: {
            type: 'boolean',
            description:
              'If set to true, allOf schemas will be merged in the documentation view. This can make the documentation more readable, but sometimes also is not desired, because some information gets lost.',
            $comment:
              'Warning: has undefined behavior when merging multiple allOfs using the "$ref" keyword.',
            default: true,
          },
          enumMaxCountToShowWithoutSpoiler: {
            type: 'integer',
            description:
              'For an enumeration, when the number of values exceeds this maximum, instead of showing all enum values directly, they are hidden behind a spoiler and can be expanded/collapsed.',
            default: 10,
            minimum: 0,
          },
          repeatMultipleOccurrencesInTableOfContents: {
            type: 'boolean',
            description:
              'If set to true, the table of contents will show multiple occurrences of the same schema element. Some schemas refer to the same sub-schema multiple times, and this option allows the table of contents to show each occurrence separately. If set to false, only the first occurrence will be shown in the table of contents.',
            default: true,
          },
        },
        additionalProperties: false,
      },
      metaSchema: {
        type: 'object',
        required: ['allowBooleanSchema', 'allowMultipleTypes', 'objectTypesComfort'],
        additionalProperties: false,
        description:
          'Meta Schema related settings belong here. They affect the functionality of the schema editor. By making the meta schema more expressive (e.g., by allowing multiple data types for a property), the schema editor will be more powerful but also more complicated.',
        properties: {
          allowBooleanSchema: {
            type: 'boolean',
            description:
              "Whether a JSON Schema definition can also be just 'true' or 'false'. Having this option enabled will increase the choices that have to be made when defining a sub-schema in the schema editor.",
            default: false,
          },
          allowMultipleTypes: {
            type: 'boolean',
            description:
              "Whether an object property can be assigned to multiple types (e.g., string and number). Having this option enabled will increase the choices that have to be made when defining the type of an object property in the schema editor, but also allows more flexibility. An alternative to defining multiple types directly is using the 'anyOf' or 'oneOf' keywords.",
            default: false,
          },
          objectTypesComfort: {
            type: 'boolean',
            $comment:
              "Warning: due to incompatibility, this option will disable schema editor support for defining the items of an array, as well as support for many advanced keywords, such as conditionals and 'not'.",
            description:
              'This is a comfort feature: the original JSON Meta Schema allows properties of a particular type to have example values, constant values, default values or enum values of different types. For example, a field for numbers could have a string as a default value. This meta schema option forces the same type for all these values. This enables the tool to auto-select the corresponding type in the schema editor, avoiding the need for the user to manually select the types. ',
            default: false,
            metaConfigurator: {
              advanced: true,
            },
          },
          markMoreFieldsAsAdvanced: {
            type: 'boolean',
            description:
              'If set to true, more fields (e.g., default values, const, enum, examples, string length) will be marked as advanced in the schema editor. This can make the schema editor less cluttered, but also hides some fields that might be needed. Recommended for users who are not familiar with JSON Schema.',
            default: true,
          },
          showAdditionalPropertiesButton: {
            type: 'boolean',
            description:
              'Most schemas allow additional properties (e.g., adding properties to the data, which are not defined in the schema). To support this in the schema editor, it would always provide an "Add Property" button to allow adding properties unknown to the schema. In practice, this option is not used much, but it can confuse the user. For example, they might try adding new fields for their schema by using this button, although that does not have any effect on the schema.',
            default: false,
          },
          showJsonLdFields: {
            type: 'boolean',
            description: 'If set to true, the fields for JSON-LD will be shown in the schema editor.',
            default: false,
          },
        },
      },
      panels: {
        required: ['dataEditor', 'schemaEditor', 'settings'],
        title: 'Panels',
        type: 'object',
        additionalProperties: false,
        description:
          'In this setting the view can be customized: which panels to show in the different modes.',
        properties: {
          dataEditor: {
            $ref: '#/$defs/panels',
          },
          schemaEditor: {
            $ref: '#/$defs/panels',
          },
          settings: {
            allOf: [
              {
                $ref: '#/$defs/panels',
              },
              {
                readOnly: true,
              },
            ],
          },
          hidden: {
            type: 'array',
            title: 'Hide Panels',
            description:
              'Panels that should be hidden in the editor and not shown to the user. By default, this section contains debugging and experimental panels.',
            items: {
              type: 'string',
              enum: [
                'aiPrompts',
                'debug',
                'test',
                'schemaDiagram',
                'guiEditor',
                'textEditor',
                'tableView',
                'documentation',
              ],
            },
          },
        },
      },
      frontend: {
        type: 'object',
        required: ['hostname'],
        additionalProperties: false,
        description: 'Settings for the frontend.',
        properties: {
          hostname: {
            type: 'string',
            description: 'The hostname of the frontend server.',
            default:
              process.env.FRONTEND_HOSTNAME || 'https://metaconfigurator.github.io/meta-configurator',
            format: 'uri',
          },
        },
      },
      backend: {
        type: 'object',
        required: ['hostname'],
        additionalProperties: false,
        description: 'Settings for the backend.',
        properties: {
          hostname: {
            type: 'string',
            description: 'The hostname of the backend server.',
            default: 'https://metaconfigurator.informatik.uni-stuttgart.de',
            format: 'uri',
          },
        },
      },
      rdf: {
        type: 'object',
        required: ['sparqlEndpointUrl'],
        additionalProperties: false,
        description: 'Settings for RDF data.',
        properties: {
          sparqlEndpointUrl: {
            type: 'string',
            description: 'The SPARQL endpoint to use for querying RDF data.',
            default: 'https://dbpedia.org/sparql',
            format: 'uri',
          },
        },
      },
      aiIntegration: {
        type: 'object',
        required: ['model', 'maxTokens', 'temperature', 'endpoint'],
        additionalProperties: false,
        description: 'Settings for AI API.',
        properties: {
          model: {
            type: 'string',
            description: 'The model to use for the AI API.',
            default: 'gpt-4o-mini',
            examples: ['gpt-4o-mini', 'gpt-4o'],
          },
          maxTokens: {
            type: 'integer',
            description: 'The maximum number of tokens to generate.',
            default: 5000,
            minimum: 1,
          },
          temperature: {
            type: 'number',
            description: 'The sampling temperature for the AI API.',
            default: 0.0,
            minimum: 0.0,
            maximum: 1.0,
          },
          endpoint: {
            type: 'string',
            description:
              'The endpoint to use for the AI API. Must follow the OpenAI API specification.',
            default: 'https://api.openai.com/v1/',
            examples: [
              'https://api.openai.com/v1/',
              'https://api.helmholtz-blablador.fz-juelich.de/v1/',
              'https://chat-ai.academiccloud.de/v1/',
            ],
          },
        },
      },
    },
    $defs: {
      panels: {
        type: 'array',
        title: 'Panels',
        description: 'Which panels to show in the editor and their order.',
        items: {
          type: 'object',
          required: ['panelType', 'mode'],
          additionalProperties: false,
          title: 'Panel',
          description: 'Panel type and tool mode.',
          properties: {
            panelType: {
              type: 'string',
              enum: [
                'guiEditor',
                'textEditor',
                'schemaDiagram',
                'aiPrompts',
                'tableView',
                'documentation',
              ],
              title: 'Panel Type',
              description: 'Type of panel to display.',
            },
            mode: {
              type: 'string',
              title: 'Mode',
              description: 'The mode determines which kind of data and schema the panel uses.',
              enum: ['schemaEditor', 'dataEditor', 'settings'],
            },
            size: {
              type: 'number',
              title: 'Size',
              description: 'The size of the panel in percent of the total width of the editor.',
              minimum: 10,
            },
          },
          if: {
            properties: {
              panelType: {
                const: 'schemaDiagram',
              },
            },
          },
          then: {
            properties: {
              mode: {
                const: 'schemaEditor',
              },
            },
          },
        },
      },
    },
  },

}

export const packagedSchemas = {
  AUTONOMOUS_VEHICLE_SCHEMA: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Self-Driving Vehicle',
    description: 'A JSON schema for configuration of autonomous vehicles',
    type: 'object',
    $defs: {
      Point: {
        title: 'Point in the 2D plane',
        description: 'Position in absolute coordinates',
        type: 'object',
        properties: {
          x: {
            type: 'number',
            description: 'X-coordinate of the starting location.',
          },
          y: {
            type: 'number',
            description: 'Y-coordinate of the starting location.',
          },
        },
        required: ['x', 'y'],
        additionalProperties: false,
      },
      WaypointReference: {
        type: 'string',
        title: 'Name of a waypoint',
        description: 'Must a waypoint defined in the set of waypoints.',
        pattern: '^[A-Z][a-z]+[0-9]*$',
      },
      SensorDefinition: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of the radar sensor.',
            pattern: 'Sensor(0[1-9]|1[0-9]|20)$',
            title: 'SensorName',
          },
          type: {
            type: 'string',
            description: 'Type of the sensor.',
            enum: ['radar', 'lidar', 'ultrasonic'],
          },
          range: {
            type: 'number',
            description: 'Maximum range of the sensor. Unit in mm',
            examples: ['400'],
            title: 'SensorRange',
          },
          position: {
            description: "Position of the radar sensor relative to the vehicle's center.",
            $ref: '#/$defs/Point',
            title: 'SensorPosition',
          },
        },
        required: ['name', 'range', 'position'],
        additionalProperties: false,
      },
    },
    additionalProperties: false,
    properties: {
      SimulationName: {
        type: 'string',
        description: 'Name of the simulation.',
        pattern: '^Sim_.',
        title: 'SimulationName',
      },
      SelfDrivingVehicle: {
        type: 'object',
        properties: {
          StartingLocation: {
            title: 'Starting Location',
            description: 'The starting location of the self-driving vehicle.',
            $ref: '#/$defs/Point',
          },
          Destination: {
            title: 'Destination',
            description: 'The destination of the self-driving vehicle.',
            $ref: '#/$defs/Point',
          },
          PlanningAlgorithm: {
            type: 'string',
            description: 'The algorithms used for route planning.',
            enum: ['A* search', 'Dijkstra', 'Rapidly Random Tree (RRT)'],
            title: 'PlanningAlgorithm',
          },
          Sensors: {
            description: 'Set of sensors installed on the self-driving vehicle.',
            type: 'array',
            items: {
              $ref: '#/$defs/SensorDefinition',
            },
          },
          VehicleType: {
            type: 'string',
            description:
              'Levels of the Self-driving vehicle. Level 1 is the lowest level of automation and Level 6 is the highest level of automation.',
            enum: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6'],
          },
          PassengerCapacity: {
            type: 'integer',
            description: 'Maximum number of passengers the vehicle can carry.',
            minimum: 1,
            exclusiveMaximum: 10,
            title: 'Passenger capacity',
          },
          MaxSpeed: {
            type: 'integer',
            description: 'Maximum speed of the vehicle. Unit in km/h. Must be a multiple of 10.',
            minimum: 0,
            maximum: 480,
            multipleOf: 10,
          },
          'is4-Wheel-Drive': {
            type: 'boolean',
            description: 'if the car is a 4 wheel driven model',
            title: 'is4-Wheel-Drive',
            default: false,
          },
        },
        required: ['StartingLocation', 'PlanningAlgorithm', 'Sensors', 'VehicleType'],
        title: 'SelfDrivingVehicle',
      },
      Environment: {
        type: 'object',
        properties: {
          Weather: {
            type: 'string',
            description: 'Current weather conditions',
            enum: ['sunny', 'rainy', 'cloudy'],
            title: 'Weather',
          },
          Temperature: {
            type: 'number',
            description: 'Current temperature in Celsius.',
            title: 'Temperature',
          },
          Humidity: {
            type: 'integer',
            description: 'Relative humidity as a percentage.',
            minimum: 0,
            maximum: 100,
            title: 'Humidity',
          },
        },
        required: ['Weather'],
        additionalProperties: {
          type: 'string',
          description: 'Additional environment properties.',
        },
      },
      Vehicles: {
        type: 'object',
        description: 'Set of vehicles.',
        propertyNames: {
          type: 'string',
          minLength: 1,
          maxLength: 20,
          pattern: '^[a-z]+[0-9]*$',
        },
        additionalProperties: {
          type: 'object',
          properties: {
            VehicleType: {
              type: 'string',
              enum: ['car', 'truck', 'bus'],
              description: 'Type of the vehicle.',
              default: 'car',
            },
            PathToDrive: {
              type: 'array',
              description: "List of coordinates representing the vehicle's path.",
              items: {
                $ref: '#/$defs/WaypointReference',
              },
              additionalProperties: false,
              title: 'PathToDrive',
            },
            DrivingSpeed: {
              type: 'number',
              description: 'Average driving speed of the vehicle.',
              minimum: 0,
              maximum: 480,
              multipleOf: 10,
              title: 'Driving Speed',
            },
            IsElectric: {
              type: 'boolean',
              description: 'if the car is an electric model',
              default: false,
            },
            DriverBehavior: {
              type: 'object',
              description: 'Driver behavior of the vehicle.',
              properties: {
                AggressivenessFactor: {
                  type: 'number',
                  description:
                    'Aggressiveness factor of the driver. This influences e.g. the acceleration and deceleration of the vehicle and the likelihood of overtaking other vehicles.',
                  minimum: 0,
                  maximum: 1,
                },
                ReactionTime: {
                  type: 'number',
                  description:
                    'Reaction time of the driver in ms. This influences e.g. the reaction time to obstacles and traffic lights.',
                  minimum: 0,
                  maximum: 1000,
                },
                Distraction: {
                  type: 'number',
                  description:
                    'Distraction factor of the driver. This influences e.g. the likelihood of the driver being distracted by a phone call or a passenger.',
                  minimum: 0,
                  maximum: 1,
                },
                Fatigue: {
                  type: 'number',
                  description:
                    'Fatigue factor of the driver. This influences e.g. the likelihood of the driver falling asleep.',
                  minimum: 0,
                  maximum: 1,
                },
              },
            },
          },
          required: ['VehicleType', 'PathToDrive', 'DrivingSpeed'],
          additionalProperties: false,
        },
      },
      PedestrianGroups: {
        type: 'array',
        description: 'Array of pedestrian groups.',
        items: {
          type: 'object',
          properties: {
            Count: {
              type: 'integer',
              description: 'Number of pedestrians.',
              default: 1,
              minimum: 1,
              maximum: 1000,
            },
            Path: {
              type: 'array',
              description: "List of coordinates representing the pedestrian's path.",
              items: {
                $ref: '#/$defs/WaypointReference',
              },
              minItems: 1,
            },
            Speed: {
              type: 'number',
              description: 'Average walking speed of the pedestrians in km/h.',
              minimum: 0,
              maximum: 10,
            },
          },
          additionalProperties: false,
          required: ['Path', 'Speed'],
        },
      },
      Waypoints: {
        type: 'object',
        description:
          'Set of waypoints. Each waypoint is defined by a name and a position. The name must consist of a capital letter followed by at least one lowercase letter and optionally a number.',
        propertyNames: {
          type: 'string',
          minLength: 1,
          maxLength: 20,
          pattern: '^[A-Z][a-z]+[0-9]*$',
        },
        additionalProperties: {
          type: 'object',
          description: 'Position of the waypoint.',
          properties: {
            point: {
              $ref: '#/$defs/Point',
            },
            connectedWaypoints: {
              type: 'array',
              description: 'List of edges connected to the waypoint.',
              items: {
                type: 'string',
                description: 'Name of the connected waypoint.',
                pattern: '^[A-Z][a-z]+[0-9]*$',
              },
            },
            waypointType: {
              type: 'string',
              description: 'Type of the waypoint.',
              enum: [
                'street',
                'sidewalk',
                'bikeLane',
                'trafficLight',
                'stopSign',
                'pedestrianCrossing',
              ],
              default: 'normal',
            },
          },
          required: ['point'],
          additionalProperties: false,
        },
      },
      SimulationSettings: {
        type: 'object',
        properties: {
          Duration: {
            type: 'number',
            description: 'Duration of the simulation in the specified time unit.',
            minimum: 0,
          },
          TimeUnit: {
            type: 'string',
            description: 'Time unit for simulation duration.',
            enum: ['seconds', 'minutes', 'hours'],
          },
        },
        required: ['TimeUnit', 'Duration'],
        additionalProperties: false,
        title: 'Other simulation settings',
      },
    },
  },
  DEFAULT_SCHEMA: {
    type: 'object',
    title: 'Person',
    description: 'A person schema',
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'https://example.com/person.schema.json',
    required: ['name', 'firstName'],
    $defs: {
      name: {
        type: 'string',
        description: 'Last name',
      },
      circular: {
        title: 'Circular',
        type: 'object',
        properties: {
          name: {
            $ref: '#/$defs/name',
            minLength: 23,
          },
          circular: {
            $ref: '#/$defs/circular',
          },
        },
      },
      isMarried: {
        type: 'boolean',
        const: true,
      },
    },
    patternProperties: {
      '^Number.*': {
        type: 'number',
        description: 'Any number property',
      },
    },
    if: {
      properties: {
        isMarried: {
          $ref: '#/$defs/isMarried',
        },
      },
      required: ['isMarried'],
    },
    then: {
      properties: {
        spouse: {
          type: 'object',
          description: 'Spouse',
          properties: {
            name: {
              $ref: '#/$defs/name',
            },
            firstName: {
              type: 'string',
              description: 'First name',
            },
          },
        },
      },
    },
    dependentSchemas: {
      nickNames: {
        properties: {
          preferredNickName: {
            type: 'string',
            description: 'Preferred nick name',
          },
        },
      },
    },
    properties: {
      circular: {
        $ref: '#/$defs/circular',
      },
      name: {
        $ref: '#/$defs/name',
      },
      firstName: {
        type: 'string',
        description: 'First name',
        examples: ['John'],
        deprecated: true,
      },
      nickNames: {
        type: 'array',
        title: 'Nick names',
        description: 'Nick names',
        items: {
          type: 'string',
        },
      },
      isMarried: {
        type: 'boolean',
        description: 'Marital Status',
      },
      telephoneNumber: {
        type: 'integer',
        description: 'phone number',
        exclusiveMinimum: 149,
        maximum: 159,
      },
      heightInMeter: {
        type: 'number',
        description: 'Height',
        exclusiveMinimum: 1.2,
        maximum: 2.3,
        multipleOf: 0.01,
      },
      address: {
        type: 'object',
        description: 'Address of the person',
        allOf: [
          {
            properties: {
              street: {
                type: 'string',
                description: 'Street name',
                examples: ['Main Street'],
              },
            },
          },
          {
            properties: {
              number: {
                type: 'number',
              },
            },
          },
          {
            if: {
              properties: {
                number: {
                  multipleOf: 2,
                },
              },
              required: ['number'],
            },
            then: {
              properties: {
                number: {
                  description: 'Even street number',
                },
              },
            },
            else: {
              properties: {
                number: {
                  description: 'Odd street number',
                },
              },
            },
          },
          {
            if: {
              properties: {
                street: {
                  const: 'Main Street',
                },
              },
              required: ['street'],
            },
            then: {
              properties: {
                extraInfo: {
                  type: 'string',
                  description: 'Main street extra info',
                },
              },
              required: ['extraInfo'],
            },
          },
        ],
        dependentRequired: {
          city: ['zipCode'],
        },
        properties: {
          city: {
            type: 'string',
            description: 'City name',
          },
          zipCode: {
            type: 'string',
            description: 'Zip code',
            examples: ['12345'],
          },
          country: {
            description: 'Country name',
            enum: ['Germany', 'India', 'China', 'America', 'Japan', 'Spain', 'France'],
          },
          moreInfo: {
            type: 'object',
            description: 'More info about the address',
            deprecated: true,
            properties: {
              anyThing: true,
              info: {
                type: 'string',
                description: 'Some info',
              },
              neighborhood: {
                type: 'string',
                description: 'Neighborhood name',
              },
              timeZone: {
                description: 'Time zone',
                const: 'UTC',
              },
              booleanArray: {
                type: 'array',
                description: 'Boolean array',
                items: {
                  type: 'boolean',
                },
              },
              numbers: {
                type: 'array',
                description: 'Numbers',
                items: {
                  type: 'number',
                },
              },
              objects: {
                type: 'array',
                description: 'Objects',
                items: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                    },
                    age: {
                      type: 'number',
                    },
                  },
                },
              },
            },
          },
        },
      },
      partner: {
        title: 'partner',
        oneOf: [
          {
            type: 'boolean',
            const: false,
            title: 'No Partner',
          },
          {
            type: 'string',
            title: 'Partner Name',
          },
        ],
      },
    },
  },
  ENZYMEML_SCHEMA: {
    title: 'EnzymeMLDocument',
    description:
      'This is the root object that composes all objects found in an EnzymeML document. It also includes general metadata such as the name of the document, when it was created/modified and references to publications, databases and arbitrary links to the web.',
    type: 'object',
    properties: {
      id: {
        title: 'Id',
        description: 'Unique identifier of the given object.',
        xml: '@id',
        type: 'string',
      },
      name: {
        title: 'Name',
        description: 'Title of the EnzymeML Document.',
        type: 'string',
      },
      pubmedid: {
        title: 'Pubmedid',
        description: 'Pubmed ID reference.',
        type: 'string',
      },
      url: {
        title: 'Url',
        description: 'Arbitrary type of URL that is related to the EnzymeML document.',
        type: 'string',
      },
      doi: {
        title: 'Doi',
        description:
          'Digital Object Identifier of the referenced publication or the EnzymeML document.',
        type: 'string',
      },
      created: {
        title: 'Created',
        description: 'Date the EnzymeML document was created.',
        type: 'string',
        format: 'date-time',
      },
      modified: {
        title: 'Modified',
        description: 'Date the EnzymeML document was modified.',
        type: 'string',
        format: 'date-time',
      },
      creators: {
        title: 'Creators',
        description: 'Contains all authors that are part of the experiment.',
        multiple: true,
        type: 'array',
        items: {
          $ref: '#/definitions/Creator',
        },
      },
      vessels: {
        title: 'Vessels',
        description: 'Contains all vessels that are part of the experiment.',
        multiple: true,
        type: 'array',
        items: {
          $ref: '#/definitions/Vessel',
        },
      },
      proteins: {
        title: 'Proteins',
        description: 'Contains all proteins that are part of the experiment.',
        multiple: true,
        type: 'array',
        items: {
          $ref: '#/definitions/Protein',
        },
      },
      complexes: {
        title: 'Complexes',
        description: 'Contains all complexes that are part of the experiment.',
        multiple: true,
        type: 'array',
        items: {
          $ref: '#/definitions/Complex',
        },
      },
      reactants: {
        title: 'Reactants',
        description: 'Contains all reactants that are part of the experiment.',
        multiple: true,
        type: 'array',
        items: {
          $ref: '#/definitions/Reactant',
        },
      },
      reactions: {
        title: 'Reactions',
        description: 'Dictionary mapping from reaction IDs to reaction describing objects.',
        multiple: true,
        type: 'array',
        items: {
          $ref: '#/definitions/Reaction',
        },
      },
      measurements: {
        title: 'Measurements',
        description: 'Contains measurements that describe outcomes of an experiment.',
        multiple: true,
        type: 'array',
        items: {
          $ref: '#/definitions/Measurement',
        },
      },
      files: {
        title: 'Files',
        description: 'Contains files attached to the data model.',
        multiple: true,
        type: 'array',
        items: {
          $ref: '#/definitions/File',
        },
      },
      global_parameters: {
        title: 'Global Parameters',
        description:
          'Dictionary mapping from parameter IDs to global kinetic parameter describing objects.',
        multiple: true,
        type: 'array',
        items: {
          $ref: '#/definitions/KineticParameter',
        },
      },
    },
    required: ['name'],
    definitions: {
      Creator: {
        title: 'Creator',
        description:
          'The creator object contains all information about authors that contributed to the resulting document.',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          given_name: {
            title: 'Given Name',
            description: 'Given name of the author or contributor.',
            type: 'string',
          },
          family_name: {
            title: 'Family Name',
            description: 'Family name of the author or contributor.',
            type: 'string',
          },
          mail: {
            title: 'Mail',
            description: 'Email address of the author or contributor.',
            type: 'string',
          },
        },
        required: ['given_name', 'family_name', 'mail'],
      },
      Vessel: {
        title: 'Vessel',
        description:
          'This object describes vessels in which the experiment has been carried out. These can include any type of vessel used in biocatalytic experiments.',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          name: {
            title: 'Name',
            description: 'Name of the used vessel.',
            template_alias: 'Name',
            type: 'string',
          },
          volume: {
            title: 'Volume',
            description: 'Volumetric value of the vessel.',
            template_alias: 'Volume value',
            exclusiveMinimum: 0,
            type: 'number',
          },
          unit: {
            title: 'Unit',
            description: 'Volumetric unit of the vessel.',
            template_alias: 'Volume unit',
            type: 'string',
          },
          constant: {
            title: 'Constant',
            description: 'Whether the volume of the vessel is constant or not.',
            default: true,
            type: 'boolean',
          },
          uri: {
            title: 'Uri',
            description: 'URI of the vessel.',
            type: 'string',
          },
          creator_id: {
            title: 'Creator Id',
            description: 'Unique identifier of the author.',
            type: 'string',
          },
        },
        required: ['name', 'volume', 'unit'],
      },
      SBOTerm: {
        title: 'SBOTerm',
        description: 'An enumeration.',
        enum: [
          'SBO:0000176',
          'SBO:0000208',
          'SBO:0000181',
          'SBO:0000182',
          'SBO:0000179',
          'SBO:0000180',
          'SBO:0000209',
          'SBO:0000377',
          'SBO:0000177',
          'SBO:0000200',
          'SBO:0000672',
          'SBO:0000252',
          'SBO:0000251',
          'SBO:0000247',
          'SBO:0000327',
          'SBO:0000328',
          'SBO:0000336',
          'SBO:0000015',
          'SBO:0000011',
          'SBO:0000013',
          'SBO:0000020',
          'SBO:0000461',
          'SBO:0000462',
          'SBO:0000021',
          'SBO:0000296',
          'SBO:0000297',
          'SBO:0000607',
          'SBO:0000028',
          'SBO:0000025',
          'SBO:0000027',
          'SBO:0000186',
        ],
      },
      Protein: {
        title: 'Protein',
        description:
          'This objects describes the proteins that were used or produced in the course of the experiment.',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          name: {
            title: 'Name',
            description: 'None',
            type: 'string',
          },
          vessel_id: {
            title: 'Vessel Id',
            description: 'None',
            type: 'string',
          },
          init_conc: {
            title: 'Init Conc',
            description: 'None',
            type: 'number',
          },
          constant: {
            title: 'Constant',
            description: 'None',
            type: 'boolean',
          },
          unit: {
            title: 'Unit',
            description: 'None',
            type: 'string',
          },
          uri: {
            title: 'Uri',
            description: 'None',
            type: 'string',
          },
          creator_id: {
            title: 'Creator Id',
            description: 'None',
            type: 'string',
          },
          sequence: {
            title: 'Sequence',
            description: 'Amino acid sequence of the protein',
            template_alias: 'Sequence',
            type: 'string',
          },
          ecnumber: {
            title: 'Ecnumber',
            description: 'EC number of the protein.',
            pattern: '(\\d+.)(\\d+.)(\\d+.)(\\d+)',
            template_alias: 'EC Number',
            type: 'string',
          },
          organism: {
            title: 'Organism',
            description: 'Organism the protein was expressed in.',
            template_alias: 'Source organism',
            type: 'string',
          },
          organism_tax_id: {
            title: 'Organism Tax Id',
            description: 'Taxonomy identifier of the expression host.',
            type: 'string',
          },
          uniprotid: {
            title: 'Uniprotid',
            description:
              'Unique identifier referencing a protein entry at UniProt. Use this identifier to initialize the object from the UniProt database.',
            template_alias: 'UniProt ID',
            type: 'string',
          },
          ontology: {
            description: 'None',
            default: 'SBO:0000013',
            allOf: [
              {
                $ref: '#/definitions/SBOTerm',
              },
            ],
          },
        },
        required: ['name', 'vessel_id', 'constant', 'sequence'],
      },
      Complex: {
        title: 'Complex',
        description:
          'This object describes complexes made of reactants and/or proteins that were used or produced in the course of the experiment.',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          name: {
            title: 'Name',
            description: 'None',
            type: 'string',
          },
          vessel_id: {
            title: 'Vessel Id',
            description: 'None',
            type: 'string',
          },
          init_conc: {
            title: 'Init Conc',
            description: 'None',
            type: 'number',
          },
          constant: {
            title: 'Constant',
            description: 'None',
            type: 'boolean',
          },
          unit: {
            title: 'Unit',
            description: 'None',
            type: 'string',
          },
          uri: {
            title: 'Uri',
            description: 'None',
            type: 'string',
          },
          creator_id: {
            title: 'Creator Id',
            description: 'None',
            type: 'string',
          },
          participants: {
            title: 'Participants',
            description: 'Array of IDs the complex contains',
            pattern: '[s|p][\\d]+',
            multiple: true,
            type: 'array',
            items: {
              type: 'string',
              pattern: '[s|p][\\d]+',
            },
          },
          ontology: {
            description: 'None',
            default: 'SBO:0000296',
            allOf: [
              {
                $ref: '#/definitions/SBOTerm',
              },
            ],
          },
        },
        required: ['name', 'vessel_id', 'constant'],
      },
      Reactant: {
        title: 'Reactant',
        description:
          'This objects describes the reactants that were used or produced in the course of the experiment.',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          name: {
            title: 'Name',
            description: 'None',
            type: 'string',
          },
          vessel_id: {
            title: 'Vessel Id',
            description: 'None',
            type: 'string',
          },
          init_conc: {
            title: 'Init Conc',
            description: 'None',
            type: 'number',
          },
          constant: {
            title: 'Constant',
            description: 'None',
            type: 'boolean',
          },
          unit: {
            title: 'Unit',
            description: 'None',
            type: 'string',
          },
          uri: {
            title: 'Uri',
            description: 'None',
            type: 'string',
          },
          creator_id: {
            title: 'Creator Id',
            description: 'None',
            type: 'string',
          },
          smiles: {
            title: 'Smiles',
            description:
              'Simplified Molecular Input Line Entry System (SMILES) encoding of the reactant.',
            template_alias: 'SMILES',
            type: 'string',
          },
          inchi: {
            title: 'Inchi',
            description: 'International Chemical Identifier (InChI) encoding of the reactant.',
            template_alias: 'InCHI',
            type: 'string',
          },
          chebi_id: {
            title: 'Chebi Id',
            description:
              'Unique identifier of the CHEBI database. Use this identifier to initialize the object from the CHEBI database.',
            type: 'string',
          },
          ontology: {
            description: 'None',
            default: 'SBO:0000247',
            allOf: [
              {
                $ref: '#/definitions/SBOTerm',
              },
            ],
          },
        },
        required: ['name', 'vessel_id', 'constant'],
      },
      KineticParameter: {
        title: 'KineticParameter',
        description:
          'This object describes the parameters of the kinetic model and can include all estimated values.',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          name: {
            title: 'Name',
            description: 'Name of the estimated parameter.',
            type: 'string',
          },
          value: {
            title: 'Value',
            description: 'Numerical value of the estimated parameter.',
            type: 'number',
          },
          unit: {
            title: 'Unit',
            description: 'Unit of the estimated parameter.',
            type: 'string',
          },
          initial_value: {
            title: 'Initial Value',
            description: 'Initial value that was used for the parameter estimation.',
            type: 'number',
          },
          upper: {
            title: 'Upper',
            description: 'Upper bound of the estimated parameter.',
            type: 'number',
          },
          lower: {
            title: 'Lower',
            description: 'Lower bound of the estimated parameter.',
            type: 'number',
          },
          is_global: {
            title: 'Is Global',
            description: 'Specifies if this parameter is a global parameter.',
            default: false,
            type: 'boolean',
          },
          stdev: {
            title: 'Stdev',
            description: 'Standard deviation of the estimated parameter.',
            type: 'number',
          },
          constant: {
            title: 'Constant',
            description: 'Specifies if this parameter is constant',
            default: false,
            type: 'boolean',
          },
          ontology: {
            description: 'Type of the estimated parameter.',
            allOf: [
              {
                $ref: '#/definitions/SBOTerm',
              },
            ],
          },
        },
        required: ['name', 'value', 'unit'],
      },
      KineticModel: {
        title: 'KineticModel',
        description: 'This object describes a kinetic model that was derived from the experiment.',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          name: {
            title: 'Name',
            description: 'Name of the kinetic law.',
            type: 'string',
          },
          equation: {
            title: 'Equation',
            description: 'Equation for the kinetic law.',
            type: 'string',
          },
          parameters: {
            title: 'Parameters',
            description: 'List of estimated parameters.',
            multiple: true,
            type: 'array',
            items: {
              $ref: '#/definitions/KineticParameter',
            },
          },
          ontology: {
            description: 'Type of the estimated parameter.',
            allOf: [
              {
                $ref: '#/definitions/SBOTerm',
              },
            ],
          },
        },
        required: ['name', 'equation'],
      },
      ReactionElement: {
        title: 'ReactionElement',
        description:
          'This object is part of the Reaction object and describes either an educt, product or modifier. The latter includes buffers, counter-ions as well as proteins/enzymes.',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          species_id: {
            title: 'Species Id',
            description:
              'Internal identifier to either a protein or reactant defined in the EnzymeMLDocument.',
            type: 'string',
          },
          stoichiometry: {
            title: 'Stoichiometry',
            description: 'Positive float number representing the associated stoichiometry.',
            default: 1.0,
            exclusiveMinimum: 0,
            type: 'number',
          },
          constant: {
            title: 'Constant',
            description: 'Whether or not the concentration of this species remains constant.',
            default: false,
            type: 'boolean',
          },
          ontology: {
            description: 'Ontology defining the role of the given species.',
            allOf: [
              {
                $ref: '#/definitions/SBOTerm',
              },
            ],
          },
        },
        required: ['species_id'],
      },
      Reaction: {
        title: 'Reaction',
        description:
          'This object describes a chemical or enzymatic reaction that was investigated in the course of the experiment. All species used within this object need to be part of the data model.',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          name: {
            title: 'Name',
            description: 'Name of the reaction.',
            template_alias: 'Name',
            type: 'string',
          },
          reversible: {
            title: 'Reversible',
            description: 'Whether the reaction is reversible or irreversible',
            default: false,
            template_alias: 'Reversible',
            type: 'boolean',
          },
          temperature: {
            title: 'Temperature',
            description: 'Numeric value of the temperature of the reaction.',
            template_alias: 'Temperature value',
            type: 'number',
          },
          temperature_unit: {
            title: 'Temperature Unit',
            description: 'Unit of the temperature of the reaction.',
            pattern: 'kelvin|Kelvin|k|K|celsius|Celsius|C|c',
            template_alias: 'Temperature unit',
            type: 'string',
          },
          ph: {
            title: 'Ph',
            description: 'PH value of the reaction.',
            template_alias: 'pH value',
            inclusiveminimum: 0,
            inclusivemaximum: 14,
            type: 'number',
          },
          ontology: {
            description: 'Ontology defining the role of the given species.',
            default: 'SBO:0000176',
            allOf: [
              {
                $ref: '#/definitions/SBOTerm',
              },
            ],
          },
          uri: {
            title: 'Uri',
            description: 'URI of the reaction.',
            type: 'string',
          },
          creator_id: {
            title: 'Creator Id',
            description: 'Unique identifier of the author.',
            type: 'string',
          },
          model: {
            title: 'Model',
            description: 'Kinetic model decribing the reaction.',
            allOf: [
              {
                $ref: '#/definitions/KineticModel',
              },
            ],
          },
          educts: {
            title: 'Educts',
            description: 'List of educts containing ReactionElement objects.',
            multiple: true,
            template_alias: 'Educts',
            type: 'array',
            items: {
              $ref: '#/definitions/ReactionElement',
            },
          },
          products: {
            title: 'Products',
            description: 'List of products containing ReactionElement objects.',
            multiple: true,
            template_alias: 'Products',
            type: 'array',
            items: {
              $ref: '#/definitions/ReactionElement',
            },
          },
          modifiers: {
            title: 'Modifiers',
            description:
              'List of modifiers (Proteins, snhibitors, stimulators) containing ReactionElement objects.',
            multiple: true,
            template_alias: 'Modifiers',
            type: 'array',
            items: {
              $ref: '#/definitions/ReactionElement',
            },
          },
        },
        required: ['name'],
      },
      DataTypes: {
        title: 'DataTypes',
        description: 'An enumeration.',
        enum: ['conc', 'abs', 'feed', 'biomass', 'conversion', 'peak-area'],
      },
      Replicate: {
        title: 'Replicate',
        description:
          'This object contains the measured time course data as well as metadata to the replicate itself.',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          species_id: {
            title: 'Species Id',
            description: 'Unique identifier of the species that has been measured.',
            type: 'string',
          },
          measurement_id: {
            title: 'Measurement Id',
            description: 'Unique identifier of the measurement that the replicate is part of.',
            type: 'string',
          },
          data_type: {
            description: 'Type of data that was measured (e.g. concentration)',
            default: 'conc',
            allOf: [
              {
                $ref: '#/definitions/DataTypes',
              },
            ],
          },
          data_unit: {
            title: 'Data Unit',
            description: 'SI unit of the data that was measured.',
            type: 'string',
          },
          time_unit: {
            title: 'Time Unit',
            description: 'Time unit of the replicate.',
            type: 'string',
          },
          time: {
            title: 'Time',
            description: 'Time steps of the replicate.',
            multiple: true,
            type: 'array',
            items: {
              type: 'number',
            },
          },
          data: {
            title: 'Data',
            description: 'Data that was measured.',
            multiple: true,
            type: 'array',
            items: {
              type: 'number',
            },
          },
          is_calculated: {
            title: 'Is Calculated',
            description: 'Whether or not the data has been generated by simulation.',
            default: false,
            type: 'boolean',
          },
          uri: {
            title: 'Uri',
            description: 'URI of the protein.',
            type: 'string',
          },
          creator_id: {
            title: 'Creator Id',
            description: 'Unique identifier of the author.',
            type: 'string',
          },
        },
        required: ['species_id', 'measurement_id', 'data_unit', 'time_unit'],
      },
      MeasurementData: {
        title: 'MeasurementData',
        description:
          'This object describes a single entity of a measurement, which corresponds to one species. It also holds replicates which contain time course data.',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          init_conc: {
            title: 'Init Conc',
            description: 'Initial concentration of the measurement data.',
            type: 'number',
          },
          unit: {
            title: 'Unit',
            description: 'The unit of the measurement data.',
            type: 'string',
          },
          measurement_id: {
            title: 'Measurement Id',
            description: 'Unique measurement identifier this dataset belongs to.',
            type: 'string',
          },
          species_id: {
            title: 'Species Id',
            description: 'The identifier for the described reactant.',
            type: 'string',
          },
          replicates: {
            title: 'Replicates',
            description: 'A list of replicate objects holding raw data of the measurement.',
            multiple: true,
            type: 'array',
            items: {
              $ref: '#/definitions/Replicate',
            },
          },
        },
        required: ['init_conc', 'unit', 'measurement_id'],
      },
      Measurement: {
        title: 'Measurement',
        description:
          'This object describes the result of a measurement, which includes time course data of any type defined in DataTypes. It includes initial concentrations of all species used in a single measurement.',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          name: {
            title: 'Name',
            description: 'Name of the measurement',
            type: 'string',
          },
          temperature: {
            title: 'Temperature',
            description: 'Numeric value of the temperature of the reaction.',
            template_alias: 'Temperature value',
            type: 'number',
          },
          temperature_unit: {
            title: 'Temperature Unit',
            description: 'Unit of the temperature of the reaction.',
            pattern: 'kelvin|Kelvin|k|K|celsius|Celsius|C|c',
            type: 'string',
          },
          ph: {
            title: 'Ph',
            description: 'PH value of the reaction.',
            inclusiveminimum: 0,
            inclusivemaximum: 14,
            type: 'number',
          },
          species: {
            title: 'Species',
            description: 'Species of the measurement.',
            multiple: true,
            type: 'array',
            items: {
              $ref: '#/definitions/MeasurementData',
            },
          },
          global_time: {
            title: 'Global Time',
            description: 'Global time of the measurement all replicates agree on.',
            multiple: true,
            type: 'array',
            items: {
              type: 'number',
            },
          },
          global_time_unit: {
            title: 'Global Time Unit',
            description: 'Unit of the global time.',
            type: 'string',
          },
          uri: {
            title: 'Uri',
            description: 'URI of the reaction.',
            type: 'string',
          },
          creator_id: {
            title: 'Creator Id',
            description: 'Unique identifier of the author.',
            type: 'string',
          },
        },
        required: ['name', 'temperature', 'temperature_unit', 'ph', 'global_time_unit'],
      },
      File: {
        title: 'File',
        description: 'This objects contains a files that has been attached to the document.',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          name: {
            title: 'Name',
            description: 'Name of the file',
            type: 'string',
          },
          content: {
            title: 'Content',
            description: 'Contents of the file',
            type: 'string',
            format: 'binary',
          },
          filetype: {
            title: 'Filetype',
            description: 'Type of the file such as .xml, .json and so on',
            type: 'string',
          },
        },
        required: ['name', 'content', 'filetype'],
      },
    },
  },
  META_SCHEMA_SIMPLIFIED: {
    $ref: '#/$defs/jsonMetaSchema',
    $id: 'com.github.meta_configurator.simplified-meta-schema',
    $defs: {
      jsonMetaSchema: {
        title: 'JSON Schema Meta Schema',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        description:
          'This schema represents a simplified version of the json schema meta schema, to be used to edit schemas within MetaConfigurator.',
        allOf: [
          {
            $ref: '#/$defs/core',
          },
          {
            $ref: '#/$defs/rootObjectSubSchema',
          },
        ],
      },
      jsonSchema: {
        title: 'Json schema',
        oneOf: [
          {
            title: 'Always valid',
            type: 'boolean',
            const: true,
          },
          {
            title: 'Always invalid',
            type: 'boolean',
            const: false,
          },
          {
            $ref: '#/$defs/objectSubSchema',
          },
        ],
        $comment:
          'This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.',
      },
      rootObjectSubSchema: {
        title: 'Root Subschema',
        type: 'object',
        allOf: [
          {
            $ref: '#/$defs/objectSubSchema',
          },
          {
            properties: {
              examples: {
                metaConfigurator: {
                  advanced: true,
                },
              },
              default: {
                metaConfigurator: {
                  advanced: true,
                },
              },
              enum: {
                metaConfigurator: {
                  advanced: true,
                },
              },
              const: {
                metaConfigurator: {
                  advanced: true,
                },
              },
              additionalProperties: {
                metaConfigurator: {
                  advanced: true,
                },
              },
            },
          },
        ],
      },
      objectSubSchema: {
        title: 'Subschema',
        type: 'object',
        allOf: [
          {
            $ref: '#/$defs/typeDefinition',
          },
          {
            $ref: '#/$defs/meta-data',
          },
          {
            $ref: '#/$defs/enumProperty',
          },
          {
            $ref: '#/$defs/constProperty',
          },
          {
            $ref: '#/$defs/typeSpecificFields',
          },
          {
            $ref: '#/$defs/schemaComposition',
          },
          {
            $ref: '#/$defs/refProperty',
          },
          {
            $ref: '#/$defs/conditionalSchema',
          },
          {
            $ref: '#/$defs/anchor',
          },
          {
            $ref: '#/$defs/metaConfiguratorFields',
          },
        ],
      },
      constProperty: {
        title: 'Constant',
        type: ['object'],
        properties: {
          const: {
            description:
              'The value of this keyword MAY be of any type, including null.\n' +
              '\n' +
              'Use of this keyword is functionally equivalent to an "enum" with a single value.\n' +
              '\n' +
              'An instance validates successfully against this keyword if its value is equal to the value of the keyword.',
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-const',
          },
        },
      },
      enumProperty: {
        title: 'Enumeration',
        type: ['object'],
        properties: {
          enum: {
            type: 'array',
            items: true,
            description:
              'The value of this keyword MUST be an array. This array SHOULD have at least one element. Elements in the array SHOULD be unique.\n' +
              '\n' +
              "An instance validates successfully against this keyword if its value is equal to one of the elements in this keyword's array value.\n" +
              '\n' +
              'Elements in the array might be of any type, including null.',
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-enum',
          },
        },
      },
      schemaComposition: {
        title: 'Schema composition with "allOf", "anyOf", "oneOf", "not"',
        properties: {
          allOf: {
            description:
              "This keyword's value MUST be a non-empty array. Each item of the array MUST be a valid JSON Schema.\n" +
              '\n' +
              "An instance validates successfully against this keyword if it validates successfully against all schemas defined by this keyword's value.",
            $ref: '#/$defs/schemaArray',
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-allof',
            metaConfigurator: {
              advanced: true,
            },
          },
          anyOf: {
            $ref: '#/$defs/schemaArray',
            description:
              "This keyword's value MUST be a non-empty array. Each item of the array MUST be a valid JSON Schema.\n" +
              '\n' +
              "An instance validates successfully against this keyword if it validates successfully against at least one schema defined by this keyword's value. Note that when annotations are being collected, all subschemas MUST be examined so that annotations are collected from each subschema that validates successfully.",
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-anyof',
            metaConfigurator: {
              advanced: true,
            },
          },
          oneOf: {
            description:
              "This keyword's value MUST be a non-empty array. Each item of the array MUST be a valid JSON Schema.\n" +
              '\n' +
              "An instance validates successfully against this keyword if it validates successfully against exactly one schema defined by this keyword's value.",
            $ref: '#/$defs/schemaArray',
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-oneof',
            metaConfigurator: {
              advanced: true,
            },
          },
          not: {
            description:
              "This keyword's value MUST be a valid JSON Schema.\n" +
              '\n' +
              'An instance is valid against this keyword if it fails to validate successfully against the schema defined by this keyword.',
            $ref: '#/$defs/jsonSchema',
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-not',
            metaConfigurator: {
              advanced: true,
            },
          },
        },
      },
      metaConfiguratorFields: {
        properties: {
          metaConfigurator: {
            title:
              'Schema Metadata specific for MetaConfigurator, altering how the tool should render the schema',
            type: 'object',
            metaConfigurator: {
              advanced: true,
            },
            properties: {
              advanced: {
                description:
                  "All properties of an object which are marked as advanced will be grouped into a separate 'advanced' section in the MetaConfigurator UI. Advanced properties will not be shown to the user by default, but can be expanded by the user with a click.",
                type: 'boolean',
              },
            },
          },
        },
      },
      conditionalSchema: {
        title: 'Conditional schema with "if", "then", "else"',
        properties: {
          if: {
            description:
              "This keyword's value MUST be a valid JSON Schema.\n" +
              '\n' +
              'This validation outcome of this keyword\'s subschema has no direct effect on the overall validation result. Rather, it controls which of the "then" or "else" keywords are evaluated.\n' +
              '\n' +
              'Instances that successfully validate against this keyword\'s subschema MUST also be valid against the subschema value of the "then" keyword, if present.\n' +
              '\n' +
              'Instances that fail to validate against this keyword\'s subschema MUST also be valid against the subschema value of the "else" keyword, if present.',
            $ref: '#/$defs/jsonSchema',
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-if',
            metaConfigurator: {
              advanced: true,
            },
          },
        },
        if: {
          required: ['if'],
        },
        then: {
          properties: {
            then: {
              description:
                "This keyword's value MUST be a valid JSON Schema.\n" +
                '\n' +
                'When "if" is present, and the instance successfully validates against its subschema, then validation succeeds against this keyword if the instance also successfully validates against this keyword\'s subschema.\n' +
                '\n' +
                'This keyword has no effect when "if" is absent, or when the instance fails to validate against its subschema. Implementations MUST NOT evaluate the instance against this keyword, for either validation or annotation collection purposes, in such cases.',
              $ref: '#/$defs/jsonSchema',
              $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-then',
            },
            else: {
              description:
                "This keyword's value MUST be a valid JSON Schema.\n" +
                '\n' +
                'When "if" is present, and the instance fails to validate against its subschema, then validation succeeds against this keyword if the instance successfully validates against this keyword\'s subschema.\n' +
                '\n' +
                'This keyword has no effect when "if" is absent, or when the instance successfully validates against its subschema. Implementations MUST NOT evaluate the instance against this keyword, for either validation or annotation collection purposes, in such cases.',
              $ref: '#/$defs/jsonSchema',
              $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-else',
            },
          },
        },
      },
      core: {
        title: 'Core vocabulary meta-schema',
        properties: {
          $id: {
            description:
              'The "$id" keyword identifies a schema resource with its canonical [RFC6596] URI.\n' +
              '\n' +
              'Note that this URI is an identifier and not necessarily a network locator. In the case of a network-addressable URL, a schema need not be downloadable from its canonical URI.\n' +
              '\n' +
              'If present, the value for this keyword MUST be a string, and MUST represent a valid URI-reference [RFC3986]. This URI-reference SHOULD be normalized, and MUST resolve to an absolute-URI [RFC3986] (without a fragment), or to a URI with an empty fragment.',
            $ref: '#/$defs/uriReferenceString',
            $comment: 'Non-empty fragments not allowed.',
            pattern: '^[^#]*#?$',
          },
          $schema: {
            description:
              'The "$schema" keyword is both used as a JSON Schema dialect identifier and as the identifier of a resource which is itself a JSON Schema, which describes the set of valid schemas written for this particular dialect.',
            $ref: '#/$defs/uriString',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-core#name-the-schema-keyword',
            examples: [
              'https://json-schema.org/draft/2020-12/schema',
              'https://json-schema.org/draft/2019-09/schema',
              'http://json-schema.org/draft-07/schema#',
              'http://json-schema.org/draft-06/schema#',
              'http://json-schema.org/draft-04/schema#',
            ],
          },
          $vocabulary: {
            type: 'object',
            description:
              'The "$vocabulary" keyword is used in meta-schemas to identify the vocabularies available for use in schemas described by that meta-schema. It is also used to indicate whether each vocabulary is required or optional, in the sense that an implementation MUST understand the required vocabularies in order to successfully process the schema. Together, this information forms a dialect. Any vocabulary that is understood by the implementation MUST be processed in a manner consistent with the semantic definitions contained within the vocabulary.',
            propertyNames: {
              $ref: '#/$defs/uriString',
            },
            additionalProperties: {
              type: 'boolean',
            },
            metaConfigurator: {
              advanced: true,
            },
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-core#name-the-vocabulary-keyword',
          },
          $comment: {
            type: 'string',
            description:
              'This keyword reserves a location for comments from schema authors to readers or maintainers of the schema.\n' +
              '\n' +
              'The value of this keyword MUST be a string. Implementations MUST NOT present this string to end users. Tools for editing schemas SHOULD support displaying and editing this keyword. The value of this keyword MAY be used in debug or error output which is intended for developers making use of schemas.',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-core#name-comments-with-comment',
            metaConfigurator: {
              advanced: true,
            },
          },
          $defs: {
            type: 'object',
            description:
              'The "$defs" keyword reserves a location for schema authors to inline re-usable JSON Schemas into a more general schema. The keyword does not directly affect the validation result.\n' +
              '\n' +
              "This keyword's value MUST be an object. Each member value of this object MUST be a valid JSON Schema.",
            additionalProperties: {
              $ref: '#/$defs/jsonSchema',
            },
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-core#name-schema-re-use-with-defs',
          },
          definitions: {
            $comment: '"definitions" has been replaced by "$defs".',
            type: 'object',
            additionalProperties: {
              $ref: '#/$defs/jsonSchema',
            },
            deprecated: true,
            default: {},
          },
        },
      },
      typeSpecificFields: {
        allOf: [
          {
            if: {
              $ref: '#/$defs/hasTypeArray',
            },
            then: {
              $ref: '#/$defs/arrayProperty',
            },
          },
          {
            if: {
              $ref: '#/$defs/hasTypeObject',
            },
            then: {
              $ref: '#/$defs/objectProperty',
            },
          },
          {
            if: {
              $ref: '#/$defs/hasTypeString',
            },
            then: {
              $ref: '#/$defs/stringProperty',
            },
          },
          {
            if: {
              $ref: '#/$defs/hasTypeNumberOrInteger',
            },
            then: {
              $ref: '#/$defs/numberProperty',
            },
          },
          {
            if: {
              $ref: '#/$defs/hasTypeBoolean',
            },
            then: {
              $ref: '#/$defs/booleanProperty',
            },
          },
        ],
      },
      numberProperty: {
        title: 'Number property',
        properties: {
          maximum: {
            description:
              'The value of "maximum" MUST be a number, representing an inclusive upper limit for a numeric instance.\n' +
              '\n' +
              'If the instance is a number, then this keyword validates only if the instance is less than or exactly equal to "maximum".',
            type: 'number',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-maximum',
          },
          exclusiveMaximum: {
            description:
              'The value of "exclusiveMaximum" MUST be a number, representing an exclusive upper limit for a numeric instance.\n' +
              '\n' +
              'If the instance is a number, then the instance is valid only if it has a value strictly less than (not equal to) "exclusiveMaximum".',
            type: 'number',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-exclusivemaximum',
          },
          minimum: {
            description:
              'The value of "minimum" MUST be a number, representing an inclusive lower limit for a numeric instance.\n' +
              '\n' +
              'If the instance is a number, then this keyword validates only if the instance is greater than or exactly equal to "minimum".',
            type: 'number',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-minimum',
          },
          exclusiveMinimum: {
            type: 'number',
            description:
              'The value of "exclusiveMinimum" MUST be a number, representing an exclusive lower limit for a numeric instance.\n' +
              '\n' +
              'If the instance is a number, then the instance is valid only if it has a value strictly greater than (not equal to) "exclusiveMinimum".',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-exclusiveminimum',
          },
          multipleOf: {
            type: 'number',
            exclusiveMinimum: 0,
            description:
              'The value of "multipleOf" MUST be a number, strictly greater than 0.\n' +
              '\n' +
              "A numeric instance is valid only if division by this keyword's value results in an integer.",
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-multipleof',
            metaConfigurator: {
              advanced: true,
            },
          },
        },
      },
      objectProperty: {
        title: 'Object property',
        properties: {
          properties: {
            type: 'object',
            description:
              'The value of "properties" MUST be an object. Each value of this object MUST be a valid JSON Schema.\n' +
              '\n' +
              "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, the child instance for that name successfully validates against the corresponding schema.\n" +
              '\n' +
              'The annotation result of this keyword is the set of instance property names matched by this keyword. This annotation affects the behavior of "additionalProperties" (in this vocabulary) and "unevaluatedProperties" in the Unevaluated vocabulary.\n' +
              '\n' +
              'Omitting this keyword has the same assertion behavior as an empty object.',
            additionalProperties: {
              $ref: '#/$defs/jsonSchema',
            },
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-properties',
            default: {},
          },
          required: {
            description:
              'The value of this keyword MUST be an array. Elements of this array, if any, MUST be strings, and MUST be unique.\n' +
              '\n' +
              'An object instance is valid against this keyword if every item in the array is the name of a property in the instance.\n' +
              '\n' +
              'Omitting this keyword has the same behavior as an empty array.',
            $ref: '#/$defs/stringArray',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-required',
          },
          patternProperties: {
            type: 'object',
            description:
              'The value of "patternProperties" MUST be an object. Each property name of this object SHOULD be a valid regular expression, according to the ECMA-262 regular expression dialect. Each property value of this object MUST be a valid JSON Schema.\n' +
              '\n' +
              "Validation succeeds if, for each instance name that matches any regular expressions that appear as a property name in this keyword's value, the child instance for that name successfully validates against each schema that corresponds to a matching regular expression.\n" +
              '\n' +
              'The annotation result of this keyword is the set of instance property names matched by this keyword. This annotation affects the behavior of "additionalProperties" (in this vocabulary) and "unevaluatedProperties" (in the Unevaluated vocabulary).\n' +
              '\n' +
              'Omitting this keyword has the same assertion behavior as an empty object.',
            additionalProperties: {
              $ref: '#/$defs/jsonSchema',
            },
            propertyNames: {
              format: 'regex',
            },
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-patternproperties',
            default: {},
            metaConfigurator: {
              advanced: true,
            },
          },
          additionalProperties: {
            description:
              'The value of "additionalProperties" MUST be a valid JSON Schema.\n' +
              '\n' +
              'The behavior of this keyword depends on the presence and annotation results of "properties" and "patternProperties" within the same schema object. Validation with "additionalProperties" applies only to the child values of instance names that do not appear in the annotation results of either "properties" or "patternProperties".\n' +
              '\n' +
              'For all such properties, validation succeeds if the child instance validates against the "additionalProperties" schema.\n' +
              '\n' +
              'The annotation result of this keyword is the set of instance property names validated by this keyword\'s subschema. This annotation affects the behavior of "unevaluatedProperties" in the Unevaluated vocabulary.\n' +
              '\n' +
              'Omitting this keyword has the same assertion behavior as an empty schema.',
            $ref: '#/$defs/jsonSchema',
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-patternproperties',
          },
          maxProperties: {
            description:
              'The value of this keyword MUST be a non-negative integer.\n' +
              '\n' +
              'An object instance is valid against "maxProperties" if its number of properties is less than, or equal to, the value of this keyword.',
            $ref: '#/$defs/nonNegativeInteger',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-maxproperties',
            metaConfigurator: {
              advanced: true,
            },
          },
          minProperties: {
            description:
              'The value of this keyword MUST be a non-negative integer.\n' +
              '\n' +
              'An object instance is valid against "minProperties" if its number of properties is greater than, or equal to, the value of this keyword.\n' +
              '\n' +
              'Omitting this keyword has the same behavior as a value of 0.',
            $ref: '#/$defs/nonNegativeIntegerDefault0',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-minproperties',
            metaConfigurator: {
              advanced: true,
            },
          },
          propertyNames: {
            description:
              'The value of "propertyNames" MUST be a valid JSON Schema.\n' +
              '\n' +
              'If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema. Note the property name that the schema is testing will always be a string.\n' +
              '\n' +
              'Omitting this keyword has the same behavior as an empty schema.',
            $ref: '#/$defs/jsonSchema',
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-propertynames',
            metaConfigurator: {
              advanced: true,
            },
          },
          dependentRequired: {
            type: 'object',
            description:
              'The value of this keyword MUST be an object. Properties in this object, if any, MUST be arrays. Elements in each array, if any, MUST be strings, and MUST be unique.\n' +
              '\n' +
              'This keyword specifies properties that are required if a specific other property is present. Their requirement is dependent on the presence of the other property.\n' +
              '\n' +
              "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, every item in the corresponding array is also the name of a property in the instance.\n" +
              '\n' +
              'Omitting this keyword has the same behavior as an empty object.',
            additionalProperties: {
              $ref: '#/$defs/stringArray',
            },
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-dependentrequired',
            metaConfigurator: {
              advanced: true,
            },
          },
          dependentSchemas: {
            type: 'object',
            additionalProperties: {
              $ref: '#/$defs/jsonSchema',
            },
            description:
              'This keyword specifies subschemas that are evaluated if the instance is an object and contains a certain property.\n' +
              '\n' +
              "This keyword's value MUST be an object. Each value in the object MUST be a valid JSON Schema.\n" +
              '\n' +
              'If the object key is a property in the instance, the entire instance must validate against the subschema. Its use is dependent on the presence of the property.\n' +
              '\n' +
              'Omitting this keyword has the same behavior as an empty object.',
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-dependentschemas',
            default: {},
            metaConfigurator: {
              advanced: true,
            },
          },
          unevaluatedProperties: {
            $ref: '#/$defs/jsonSchema',
            metaConfigurator: {
              advanced: true,
            },
          },
        },
      },
      booleanProperty: {
        title: 'Boolean property',
      },
      stringProperty: {
        title: 'String property',
        properties: {
          maxLength: {
            description:
              'The value of this keyword MUST be a non-negative integer.\n' +
              '\n' +
              'A string instance is valid against this keyword if its length is less than, or equal to, the value of this keyword.',
            $ref: '#/$defs/nonNegativeInteger',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-maxlength',
          },
          minLength: {
            description:
              'The value of this keyword MUST be a non-negative integer.\n' +
              '\n' +
              'A string instance is valid against this keyword if its length is greater than, or equal to, the value of this keyword.\n' +
              '\n' +
              'Omitting this keyword has the same behavior as a value of 0.',
            $ref: '#/$defs/nonNegativeIntegerDefault0',
            default: 0,
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-minlength',
          },
          pattern: {
            description:
              'The value of this keyword MUST be a string. This string SHOULD be a valid regular expression, according to the ECMA-262 regular expression dialect.\n' +
              '\n' +
              'A string instance is considered valid if the regular expression matches the instance successfully. Recall: regular expressions are not implicitly anchored.',
            type: 'string',
            format: 'regex',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-pattern',
          },
          format: {
            type: 'string',
            examples: [
              'date-time',
              'time',
              'date',
              'duration',
              'email',
              'idn-email',
              'hostname',
              'idn-hostname',
              'ipv4',
              'ipv6',
              'uri',
              'uri-reference',
              'iri',
              'iri-reference',
              'uri-template',
              'json-pointer',
              'relative-json-pointer',
              'regex',
            ],
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation#name-vocabularies-for-semantic-c',
          },
          contentEncoding: {
            type: 'string',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation#name-contentencoding',
            metaConfigurator: {
              advanced: true,
            },
          },
          contentMediaType: {
            type: 'string',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation#name-contentmediatype',
            metaConfigurator: {
              advanced: true,
            },
          },
          contentSchema: {
            $ref: '#/$defs/jsonSchema',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation#name-contentschema',
            metaConfigurator: {
              advanced: true,
            },
          },
        },
      },
      arrayProperty: {
        title: 'Array property',
        properties: {
          items: {
            description:
              'The value of "items" MUST be a valid JSON Schema.\n' +
              '\n' +
              'This keyword applies its subschema to all instance elements at indexes greater than the length of the "prefixItems" array in the same schema object, as reported by the annotation result of that "prefixItems" keyword. If no such annotation result exists, "items" applies its subschema to all instance array elements. Note that the behavior of "items" without "prefixItems" is identical to that of the schema form of "items" in prior drafts. When "prefixItems" is present, the behavior of "items" is identical to the former "additionalItems" keyword. ',
            $ref: '#/$defs/jsonSchema',
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-items',
          },
          minItems: {
            description:
              'The value of this keyword MUST be a non-negative integer.\n' +
              '\n' +
              'An array instance is valid against "minItems" if its size is greater than, or equal to, the value of this keyword.\n' +
              '\n' +
              'Omitting this keyword has the same behavior as a value of 0.',
            $ref: '#/$defs/nonNegativeIntegerDefault0',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-minitems',
          },
          maxItems: {
            description:
              'The value of this keyword MUST be a non-negative integer.\n' +
              '\n' +
              'An array instance is valid against "maxItems" if its size is less than, or equal to, the value of this keyword.',
            $ref: '#/$defs/nonNegativeInteger',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-maxitems',
          },
          contains: {
            description:
              'The value of this keyword MUST be a valid JSON Schema.\n' +
              '\n' +
              'An array instance is valid against "contains" if at least one of its elements is valid against the given schema, except when "minContains" is present and has a value of 0, in which case an array instance MUST be considered valid against the "contains" keyword, even if none of its elements is valid against the given schema.',
            $ref: '#/$defs/jsonSchema',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-contains',
            metaConfigurator: {
              advanced: true,
            },
          },
          minContains: {
            description:
              'The value of this keyword MUST be a non-negative integer.\n' +
              '\n' +
              'If "contains" is not present within the same schema object, then this keyword has no effect.\n' +
              '\n' +
              'minContains and maxContains can be used with contains to further specify how many times a schema matches a contains constraint. These keywords can be any non-negative number including zero.',
            $ref: '#/$defs/nonNegativeInteger',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-mincontains',
            metaConfigurator: {
              advanced: true,
            },
            default: 1,
          },
          maxContains: {
            description:
              'The value of this keyword MUST be a non-negative integer.\n' +
              '\n' +
              'If "contains" is not present within the same schema object, then this keyword has no effect.\n' +
              '\n' +
              'minContains and maxContains can be used with contains to further specify how many times a schema matches a contains constraint. These keywords can be any non-negative number including zero.',
            $ref: '#/$defs/nonNegativeInteger',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-maxcontains',
            metaConfigurator: {
              advanced: true,
            },
          },
          prefixItems: {
            description:
              'The value of "prefixItems" MUST be a non-empty array of valid JSON Schemas.\n' +
              '\n' +
              "Validation succeeds if each element of the instance validates against the schema at the same position, if any. This keyword does not constrain the length of the array. If the array is longer than this keyword's value, this keyword validates only the prefix of matching length.",
            $ref: '#/$defs/schemaArray',
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-prefixitems',
            metaConfigurator: {
              advanced: true,
            },
          },
          uniqueItems: {
            description:
              'The value of this keyword MUST be a boolean.\n' +
              '\n' +
              'If this keyword has boolean value false, the instance validates successfully. If it has boolean value true, the instance validates successfully if all of its elements are unique.\n' +
              '\n' +
              'Omitting this keyword has the same behavior as a value of false.',
            type: 'boolean',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation.html#name-uniqueitems',
            default: false,
          },
          unevaluatedItems: {
            $ref: '#/$defs/jsonSchema',
            metaConfigurator: {
              advanced: true,
            },
          },
        },
      },
      refProperty: {
        title: 'Reference',
        properties: {
          $ref: {
            $ref: '#/$defs/uriReferenceString',
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-schema-references',
          },
          $dynamicRef: {
            $ref: '#/$defs/uriReferenceString',
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-core#name-schema-references',
            metaConfigurator: {
              advanced: true,
            },
          },
          $recursiveRef: {
            $comment: '"$recursiveRef" has been replaced by "$dynamicRef".',
            type: 'string',
            format: 'uri-reference',
            deprecated: true,
            metaConfigurator: {
              advanced: true,
            },
          },
        },
      },
      'meta-data': {
        properties: {
          title: {
            type: 'string',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation#name-title-and-description',
          },
          description: {
            type: 'string',
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation#name-title-and-description',
          },
          examples: {
            type: 'array',
            description:
              'The value of this keyword MUST be an array. There are no restrictions placed on the values within the array. When multiple occurrences of this keyword are applicable to a single sub-instance, implementations MUST provide a flat array of all values rather than an array of arrays.\n' +
              '\n' +
              'This keyword can be used to provide sample JSON values associated with a particular schema, for the purpose of illustrating usage. It is RECOMMENDED that these values be valid against the associated schema.\n' +
              '\n' +
              'Implementations MAY use the value(s) of "default", if present, as an additional example. If "examples" is absent, "default" MAY still be used in this manner.',
            items: true,
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-validation#name-examples',
          },
          default: {
            description:
              'There are no restrictions placed on the value of this keyword. When multiple occurrences of this keyword are applicable to a single sub-instance, implementations SHOULD remove duplicates.\n' +
              '\n' +
              'This keyword can be used to supply a default JSON value associated with a particular schema. It is RECOMMENDED that a default value be valid against the associated schema.',
          },
          deprecated: {
            type: 'boolean',
            description:
              'The value of this keyword MUST be a boolean. When multiple occurrences of this keyword are applicable to a single sub-instance, applications SHOULD consider the instance location to be deprecated if any occurrence specifies a true value.\n' +
              '\n' +
              'If "deprecated" has a value of boolean true, it indicates that applications SHOULD refrain from usage of the declared property. It MAY mean the property is going to be removed in the future.\n' +
              '\n' +
              'A root schema containing "deprecated" with a value of true indicates that the entire resource being described MAY be removed in the future.\n' +
              '\n' +
              'The "deprecated" keyword applies to each instance location to which the schema object containing the keyword successfully applies. This can result in scenarios where every array item or object property is deprecated even though the containing array or object is not.\n' +
              '\n' +
              'Omitting this keyword has the same behavior as a value of false.',
            default: false,
            $comment: 'https://json-schema.org/draft/2020-12/json-schema-validation#name-deprecated',
            metaConfigurator: {
              advanced: true,
            },
          },
          readOnly: {
            type: 'boolean',
            default: false,
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation#name-readonly-and-writeonly',
            metaConfigurator: {
              advanced: true,
            },
          },
          writeOnly: {
            type: 'boolean',
            default: false,
            $comment:
              'https://json-schema.org/draft/2020-12/json-schema-validation#name-readonly-and-writeonly',
            metaConfigurator: {
              advanced: true,
            },
          },
        },
      },
      hasTypeArray: {
        anyOf: [
          {
            properties: {
              type: {
                const: 'array',
              },
            },
          },
          {
            properties: {
              type: {
                type: 'array',
                contains: {
                  const: 'array',
                },
              },
            },
          },
        ],
        required: ['type'],
      },
      hasTypeObject: {
        anyOf: [
          {
            required: ['type'],
            properties: {
              type: {
                const: 'object',
              },
            },
          },
          {
            required: ['type'],
            properties: {
              type: {
                type: 'array',
                contains: {
                  const: 'object',
                },
              },
            },
          },
          {
            required: ['properties'],
            properties: {
              properties: {
                type: 'object',
                description: 'If "properties" is present, the instance is validated as an object.',
              },
            },
          },
        ],
      },
      hasTypeString: {
        anyOf: [
          {
            properties: {
              type: {
                const: 'string',
              },
            },
          },
          {
            properties: {
              type: {
                type: 'array',
                contains: {
                  const: 'string',
                },
              },
            },
          },
        ],
        required: ['type'],
      },
      hasTypeBoolean: {
        anyOf: [
          {
            properties: {
              type: {
                const: 'boolean',
              },
            },
          },
          {
            properties: {
              type: {
                type: 'array',
                contains: {
                  const: 'boolean',
                },
              },
            },
          },
        ],
        required: ['type'],
      },
      hasTypeNumberOrInteger: {
        oneOf: [
          {
            properties: {
              type: {
                enum: ['number', 'integer'],
              },
            },
          },
          {
            properties: {
              type: {
                type: 'array',
                contains: {
                  enum: ['number', 'integer'],
                },
              },
            },
          },
        ],
        required: ['type'],
      },
      anchor: {
        title: 'Anchor definition',
        properties: {
          $anchor: {
            $ref: '#/$defs/anchorString',
            metaConfigurator: {
              advanced: true,
            },
          },
          $dynamicAnchor: {
            $ref: '#/$defs/anchorString',
            metaConfigurator: {
              advanced: true,
            },
          },
          $recursiveAnchor: {
            $comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".',
            type: 'string',
            pattern: '^[A-Za-z_][-A-Za-z0-9._]*$',
            deprecated: true,
            metaConfigurator: {
              advanced: true,
            },
          },
        },
      },
      anchorString: {
        type: 'string',
        pattern: '^[A-Za-z_][-A-Za-z0-9._]*$',
      },
      uriString: {
        type: 'string',
        format: 'uri',
      },
      uriReferenceString: {
        type: 'string',
        format: 'uri-reference',
      },
      schemaArray: {
        type: 'array',
        minItems: 1,
        items: {
          $ref: '#/$defs/jsonSchema',
        },
      },
      nonNegativeInteger: {
        type: 'integer',
        minimum: 0,
      },
      nonNegativeIntegerDefault0: {
        $ref: '#/$defs/nonNegativeInteger',
        default: 0,
      },
      typeDefinition: {
        properties: {
          type: {
            oneOf: [
              {
                $ref: '#/$defs/simpleTypes',
                title: 'Simple type',
              },
              {
                title: 'Type union',
                type: 'array',
                items: {
                  $ref: '#/$defs/simpleTypes',
                },
                minItems: 1,
                uniqueItems: true,
              },
            ],
          },
        },
      },
      simpleTypes: {
        title: 'Single type',
        enum: ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'],
        type: 'string',
      },
      stringArray: {
        type: 'array',
        items: {
          type: 'string',
        },
        uniqueItems: true,
        default: [],
      },
    },
  },
  STRENDA_SCHEMA: {
    title: 'Dataset',
    type: 'object',
    properties: {
      id: {
        title: 'Id',
        description: 'Unique identifier of the given object.',
        xml: '@id',
        type: 'string',
      },
      manuscript: {
        title: 'Manuscript',
        description: 'Manuscript details',
        allOf: [
          {
            $ref: '#/definitions/Manuscript',
          },
        ],
      },
      experiments: {
        title: 'Experiments',
        description: 'Experiments that are part of this Dataset',
        multiple: true,
        type: 'array',
        items: {
          $ref: '#/definitions/Experiment',
        },
      },
      results: {
        title: 'Results',
        description: 'Results of this dataset',
        multiple: true,
        type: 'array',
        items: {
          $ref: '#/definitions/Result',
        },
      },
    },
    definitions: {
      Manuscript: {
        title: 'Manuscript',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          author_names: {
            title: 'Author Names',
            description: 'Names of the authors (last name, first name)',
            multiple: true,
            type: 'array',
            items: {
              type: 'string',
            },
          },
          DOI: {
            title: 'Doi',
            description: 'Digital Object Identifier of the given manuscript',
            anyOf: [
              {
                type: 'string',
              },
              {
                type: 'integer',
              },
            ],
          },
          PMID: {
            title: 'Pmid',
            description: 'PubMed identifier of the manuscript',
            anyOf: [
              {
                type: 'string',
              },
              {
                type: 'integer',
              },
            ],
          },
        },
      },
      Protein: {
        title: 'Protein',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          protein_id: {
            title: 'Protein Id',
            description: 'Unique identifier of the given protein',
            anyOf: [
              {
                type: 'string',
              },
              {
                type: 'integer',
              },
            ],
          },
          name: {
            title: 'Name',
            description: 'The name of the protein',
            type: 'string',
          },
          sequence: {
            title: 'Sequence',
            description: "Amino acid of the protein's primary structure",
            type: 'string',
          },
          ec_number: {
            title: 'Ec Number',
            description: "EC number of the protein e.g. '3.4.11.4'",
            type: 'string',
          },
          reaction: {
            title: 'Reaction',
            description: 'Catalyzed reaction of the given protein (from the EC number)',
            type: 'string',
          },
          assayed_reaction: {
            title: 'Assayed Reaction',
            description: 'Reaction that the proteins catalyzes within this manuscript',
            type: 'string',
          },
        },
      },
      CompoundRoles: {
        title: 'CompoundRoles',
        description: 'An enumeration.',
        enum: ['substrate', 'product', 'salt', 'buffer', 'inhibitor', 'activator'],
      },
      AssayConditions: {
        title: 'AssayConditions',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          assay_components: {
            title: 'Assay Components',
            description: 'Components of this assay',
            multiple: true,
            type: 'array',
            items: {
              type: 'string',
            },
          },
          compound_name: {
            title: 'Compound Name',
            description: 'Name of the compound that has been used within this assay',
            type: 'string',
          },
          inchi: {
            title: 'Inchi',
            description: 'International Chemical Identifier of the compound',
            type: 'string',
          },
          iupac_name: {
            title: 'Iupac Name',
            description: 'IUPAC name of the compound',
            type: 'string',
          },
          database_id: {
            title: 'Database Id',
            description: 'Unique identifier of the database this compound can be found',
            type: 'string',
          },
          concentration: {
            title: 'Concentration',
            description: 'Initial concentration of the given compound',
            exclusiveMinimum: 0,
            type: 'number',
          },
          protein_concentration: {
            title: 'Protein Concentration',
            description: 'Initial concentration of the protein used in this assay',
            exclusiveMinimum: 0,
            type: 'number',
          },
          ph: {
            title: 'Ph',
            description: 'pH value of the assay',
            exclusiveMinimum: 0.0,
            exclusiveMaximum: 14.0,
            type: 'number',
          },
          role: {
            description: 'Role of this compound. Find the list if roles [here](#compoundroles).',
            allOf: [
              {
                $ref: '#/definitions/CompoundRoles',
              },
            ],
          },
        },
      },
      Experiment: {
        title: 'Experiment',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          methodology: {
            title: 'Methodology',
            description: 'Free text describing the methodology of the experiment',
            type: 'string',
          },
          proteins: {
            title: 'Proteins',
            description: 'Proteins that have been used within this assay',
            multiple: true,
            type: 'array',
            items: {
              $ref: '#/definitions/Protein',
            },
          },
          assay_conditions: {
            title: 'Assay Conditions',
            description: 'Conditions of the assay',
            allOf: [
              {
                $ref: '#/definitions/AssayConditions',
              },
            ],
          },
        },
      },
      KineticParameters: {
        title: 'KineticParameters',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          Km: {
            title: 'Km',
            description: 'Estimated Michaelis-Menten constant',
            type: 'number',
          },
          kcat: {
            title: 'Kcat',
            description: 'Estimated catalytic rate',
            type: 'number',
          },
          V: {
            title: 'V',
            description: 'Reaction velocity',
            type: 'number',
          },
          kcat_over_km: {
            title: 'Kcat Over Km',
            description: 'Ratio of the catalytic rate over Michaelis-Menten constant',
            type: 'number',
          },
          V_over_km: {
            title: 'V Over Km',
            description: 'Ration of reaction velocity over Michaelis-Menten constant',
            type: 'number',
          },
        },
      },
      InhibitionType: {
        title: 'InhibitionType',
        description: 'An enumeration.',
        enum: ['competitive', 'uncompetitive', 'mixed'],
      },
      InhibitionParameters: {
        title: 'InhibitionParameters',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          reversible: {
            title: 'Reversible',
            description: 'Whether or not this reaction is reversible',
            type: 'boolean',
          },
          inhibition_type: {
            description: 'Type of inhibition that occured within this reaction',
            allOf: [
              {
                $ref: '#/definitions/InhibitionType',
              },
            ],
          },
          Kic: {
            title: 'Kic',
            description: 'Inhibition constant of the reaction (Case: (un-)competivtive, mixed)',
            type: 'number',
          },
          Kiu: {
            title: 'Kiu',
            description: 'Second inhibition constant of the reaction (Case: mixed)',
            type: 'number',
          },
          Ki: {
            title: 'Ki',
            description: 'Inhibition constant of the reaction (Case: irreversible reaction)',
            type: 'number',
          },
        },
      },
      ActivationParameters: {
        title: 'ActivationParameters',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          activation_affinity_constant: {
            title: 'Activation Affinity Constant',
            description: 'Activation affinity constant of the reaction',
            type: 'number',
          },
          velocity_at_no_activator: {
            title: 'Velocity At No Activator',
            description: 'Velocity of the reaction at zero concentration of the activator',
            type: 'number',
          },
          velocity_at_max_activator: {
            title: 'Velocity At Max Activator',
            description: 'Velocity of the reaction at maximum concentration of the activator',
            type: 'number',
          },
        },
      },
      Result: {
        title: 'Result',
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            description: 'Unique identifier of the given object.',
            xml: '@id',
            type: 'string',
          },
          kinetic_parameters: {
            title: 'Kinetic Parameters',
            description: 'Estimated kinetic parameters',
            allOf: [
              {
                $ref: '#/definitions/KineticParameters',
              },
            ],
          },
          inhibition_parameters: {
            title: 'Inhibition Parameters',
            description: 'Estimated inhibition parameters',
            allOf: [
              {
                $ref: '#/definitions/InhibitionParameters',
              },
            ],
          },
          activation_parameters: {
            title: 'Activation Parameters',
            description: 'Estimated activation parameters',
            allOf: [
              {
                $ref: '#/definitions/ActivationParameters',
              },
            ],
          },
        },
      },
    },
  }

}


export const schemaCollection = [
  {label: 'Feature testing Schema', key: 'default', schema: packagedSchemas.DEFAULT_SCHEMA},
  {label: 'Strenda Schema', key: 'strenda', schema: packagedSchemas.STRENDA_SCHEMA},
  {label: 'Enzymeml Schema', key: 'enzymeml', schema: packagedSchemas.ENZYMEML_SCHEMA},
  {label: 'Autonomous Vehicle Schema', key: 'autonomousvehicle', schema: packagedSchemas.AUTONOMOUS_VEHICLE_SCHEMA},
  {
    label: 'preCICE Adapter Config Schema',
    key: 'precice-adapter',
    url: 'https://github.com/precice/preeco-orga/blob/main/adapter-config-schema/precice_adapter_config_schema.json',
  },

]
