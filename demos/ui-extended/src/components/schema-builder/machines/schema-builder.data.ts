
export const mockData = {
  simple: {
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
  }
}

export const mockFormBuilderData = {

  allFormInputs: {
    dateTime: {
      displayName: 'Date-Time',
      matchIf: [
        {
          types: ['string'],
          format: 'date-time',
        },
      ],
      defaultDataSchema: {
        format: 'date-time',
      },
      defaultUiSchema: {},
      type: 'string',
    },
    date: {
      displayName: 'Date',
      matchIf: [
        {
          types: ['string'],
          format: 'date',
        },
      ],
      defaultDataSchema: {
        format: 'date',
      },
      defaultUiSchema: {},
      type: 'string',
    },
    time: {
      displayName: 'Time',
      matchIf: [
        {
          types: ['string'],
          format: 'time',
        },
      ],
      defaultDataSchema: {
        format: 'time',
      },
      defaultUiSchema: {},
      type: 'string',
    },
    checkbox: {
      displayName: 'Checkbox',
      matchIf: [
        {
          types: ['boolean'],
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {},
      type: 'boolean',
    },
    radio: {
      displayName: 'Radio',
      matchIf: [
        {
          types: ['string', 'number', 'integer', 'array', 'boolean', 'null'],
          widget: 'radio',
          enum: true,
        },
      ],
      defaultDataSchema: {
        enum: [],
      },
      defaultUiSchema: {
        'ui:widget': 'radio',
      },
      type: 'string',
    },
    dropdown: {
      displayName: 'Dropdown',
      matchIf: [
        {
          types: ['string', 'number', 'integer', 'array', 'boolean', 'null'],
          enum: true,
        },
      ],
      defaultDataSchema: {
        enum: [],
      },
      defaultUiSchema: {},
      type: 'string',
    },
    ref: {
      displayName: 'Reference',
      matchIf: [
        {
          types: ['null'],
          $ref: true,
        },
      ],
      defaultDataSchema: {
        $ref: '',
        title: '',
        description: '',
      },
      defaultUiSchema: {},
      type: 'string',
      inputMode: 'string',
    },
    shortAnswer: {
      displayName: 'Short Answer',
      matchIf: [
        {
          types: ['string'],
        },
        {
          types: ['string'],
          format: 'email',
        },
        {
          types: ['string'],
          format: 'hostname',
        },
        {
          types: ['string'],
          format: 'uri',
        },
        {
          types: ['string'],
          format: 'regex',
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {},
      type: 'string',
      inputMode: 'string',
    },
    password: {
      displayName: 'Password',
      matchIf: [
        {
          types: ['string'],
          widget: 'password',
        },
      ],
      inputMode: 'string',
      defaultDataSchema: {},
      defaultUiSchema: {
        'ui:widget': 'password',
      },
      type: 'string',
    },
    longAnswer: {
      displayName: 'Long Answer',
      matchIf: [
        {
          types: ['string'],
          widget: 'textarea',
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {
        'ui:widget': 'textarea',
      },
      type: 'string',
      inputMode: 'string',
    },
    integer: {
      displayName: 'Integer',
      matchIf: [
        {
          types: ['integer'],
        },
        {
          types: ['integer'],
          widget: 'number',
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {},
      type: 'integer',
      inputMode: 'numeric',
    },
    number: {
      displayName: 'Number',
      matchIf: [
        {
          types: ['number'],
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {},
      inputMode: 'numeric',
      type: 'number',
    },
    array: {
      displayName: 'Array',
      matchIf: [
        {
          types: ['array'],
        },
      ],
      defaultDataSchema: {
        items: {
          type: 'string',
        },
      },
      defaultUiSchema: {},
      type: 'array',
    },
  },
  unsupportedFeatures: [
    "UI Property: ui:emptyValue for firstName",
    "UI Property: ui:enableMarkdownInDescription for firstName",
    "UI Property: ui:description for firstName",
    "UI Property: ui:enableMarkdownInDescription for lastName",
    "UI Property: ui:description for lastName",
    "UI Widget: updown for age",
    "UI Property: ui:title for age",
    "UI Property: ui:description for age",
    "UI Property: ui:help for password",
    "UI Property: ui:options.inputType for telephone"
  ],
  schemaElementsCount: 0,
  categoryHash: null,
  mods: {
    showFormHead: true,
    labels: {
      formNameLabel: "Form Name",
      formDescriptionLabel: null,
      objectNameLabel: null,
      displayNameLabel: null,
      descriptionLabel: null,
      inputTypeLabel: null,
      addElementLabel: null,
      addSectionLable: null
    },
    tooltipDescriptions: {
      add: null,
      cardObjectName: null,
      cardDisplayName: null,
      cardDescription: null,
      cardInputType: null,
      cardSectionObjectName: null,
      cardSectionDisplayName: null,
      cardSectionDescription: null,
      deactivatedFormInputs: [],
      newElementDefaultDataOptions: {
        title: null,
        type: null,
        description: null,
        $ref: null,
        default: null
      },
      newElementDefaultUiSchema: null,
      customFormInputs: null,
      components: {
        add: null
      }
    }




  },
  constants: {
    DROPPABLE_TYPE: "rjsfb",
    supportedPropertyParameters: [
      "title",
      "description",
      "enum",
      "minLength",
      "maxLength",
      "multipleOf",
      "minimum",
      "maximum",
      "format",
      "exclusiveMinimum",
      "exclusiveMaximum",
      "type",
      "default",
      "pattern",
      "required",
      "properties",
      "items",
      "definitions",
      "$ref",
      "minItems",
      "maxItems",
      "enumNames",
      "dependencies",
      "$id",
      "$schema",
      "meta",
      "additionalProperties",

    ],
    supportedUiParameters: ["ui:order", "ui:widget", "ui:autofocus", "ui:autocomplete", "ui:options", "ui:field", "ui:placeholder", "ui:column", "items", "definitions"]
  }


}


export const mockDataForFormBuilderRjsf = {
  allFormInputs: {
    dateTime: {
      displayName: 'Date-Time',
      matchIf: [
        {
          types: ['string'],
          format: 'date-time',
        },
      ],
      defaultDataSchema: {
        format: 'date-time',
      },
      defaultUiSchema: {},
      type: 'string',
    },
    date: {
      displayName: 'Date',
      matchIf: [
        {
          types: ['string'],
          format: 'date',
        },
      ],
      defaultDataSchema: {
        format: 'date',
      },
      defaultUiSchema: {},
      type: 'string',
    },
    time: {
      displayName: 'Time',
      matchIf: [
        {
          types: ['string'],
          format: 'time',
        },
      ],
      defaultDataSchema: {
        format: 'time',
      },
      defaultUiSchema: {},
      type: 'string',
    },
    checkbox: {
      displayName: 'Checkbox',
      matchIf: [
        {
          types: ['boolean'],
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {},
      type: 'boolean',
    },
    radio: {
      displayName: 'Radio',
      matchIf: [
        {
          types: ['string', 'number', 'integer', 'array', 'boolean', 'null'],
          widget: 'radio',
          enum: true,
        },
      ],
      defaultDataSchema: {
        enum: [],
      },
      defaultUiSchema: {
        'ui:widget': 'radio',
      },
      type: 'string',
    },
    dropdown: {
      displayName: 'Dropdown',
      matchIf: [
        {
          types: ['string', 'number', 'integer', 'array', 'boolean', 'null'],
          enum: true,
        },
      ],
      defaultDataSchema: {
        enum: [],
      },
      defaultUiSchema: {},
      type: 'string',
    },
    ref: {
      displayName: 'Reference',
      matchIf: [
        {
          types: ['null'],
          $ref: true,
        },
      ],
      defaultDataSchema: {
        $ref: '',
        title: '',
        description: '',
      },
      defaultUiSchema: {},
      type: 'string',
      inputMode: 'string',
    },
    shortAnswer: {
      displayName: 'Short Answer',
      matchIf: [
        {
          types: ['string'],
        },
        {
          types: ['string'],
          format: 'email',
        },
        {
          types: ['string'],
          format: 'hostname',
        },
        {
          types: ['string'],
          format: 'uri',
        },
        {
          types: ['string'],
          format: 'regex',
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {},
      type: 'string',
      inputMode: 'string',
    },
    password: {
      displayName: 'Password',
      matchIf: [
        {
          types: ['string'],
          widget: 'password',
        },
      ],
      inputMode: 'string',
      defaultDataSchema: {},
      defaultUiSchema: {
        'ui:widget': 'password',
      },
      type: 'string',
    },
    longAnswer: {
      displayName: 'Long Answer',
      matchIf: [
        {
          types: ['string'],
          widget: 'textarea',
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {
        'ui:widget': 'textarea',
      },
      type: 'string',
      inputMode: 'string',
    },
    integer: {
      displayName: 'Integer',
      matchIf: [
        {
          types: ['integer'],
        },
        {
          types: ['integer'],
          widget: 'number',
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {},
      type: 'integer',
      inputMode: 'numeric',
    },
    number: {
      displayName: 'Number',
      matchIf: [
        {
          types: ['number'],
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {},
      inputMode: 'numeric',
      type: 'number',
    },
    array: {
      displayName: 'Array',
      matchIf: [
        {
          types: ['array'],
        },
      ],
      defaultDataSchema: {
        items: {
          type: 'string',
        },
      },
      defaultUiSchema: {},
      type: 'array',
    },
  },
  unsupportedFeatures: [],
  elementNum: 0,
  defaultCollapseStates: [],
  cardOpenArray: [],
  categoryHash: {
    'type:string;widget:;field:;format:date-time;$ref:false;enum:false': 'dateTime',
    'type:string;widget:;field:;format:date;$ref:false;enum:false': 'date',
    'type:string;widget:;field:;format:time;$ref:false;enum:false': 'time',
    'type:boolean;widget:;field:;format:;$ref:false;enum:false': 'checkbox',
    'type:string;widget:radio;field:;format:;$ref:false;enum:true': 'radio',
    'type:number;widget:radio;field:;format:;$ref:false;enum:true': 'radio',
    'type:integer;widget:radio;field:;format:;$ref:false;enum:true': 'radio',
    'type:array;widget:radio;field:;format:;$ref:false;enum:true': 'radio',
    'type:boolean;widget:radio;field:;format:;$ref:false;enum:true': 'radio',
    'type:;widget:radio;field:;format:;$ref:false;enum:true': 'radio',
    'type:string;widget:;field:;format:;$ref:false;enum:true': 'dropdown',
    'type:number;widget:;field:;format:;$ref:false;enum:true': 'dropdown',
    'type:integer;widget:;field:;format:;$ref:false;enum:true': 'dropdown',
    'type:array;widget:;field:;format:;$ref:false;enum:true': 'dropdown',
    'type:boolean;widget:;field:;format:;$ref:false;enum:true': 'dropdown',
    'type:;widget:;field:;format:;$ref:false;enum:true': 'dropdown',
    'type:;widget:;field:;format:;$ref:true;enum:false': 'ref',
    'type:string;widget:;field:;format:;$ref:false;enum:false': 'shortAnswer',
    'type:string;widget:;field:;format:email;$ref:false;enum:false': 'shortAnswer',
    'type:string;widget:;field:;format:hostname;$ref:false;enum:false': 'shortAnswer',
    'type:string;widget:;field:;format:uri;$ref:false;enum:false': 'shortAnswer',
    'type:string;widget:;field:;format:regex;$ref:false;enum:false': 'shortAnswer',
    'type:string;widget:password;field:;format:;$ref:false;enum:false': 'password',
    'type:string;widget:textarea;field:;format:;$ref:false;enum:false': 'longAnswer',
    'type:integer;widget:;field:;format:;$ref:false;enum:false': 'integer',
    'type:integer;widget:number;field:;format:;$ref:false;enum:false': 'integer',
    'type:number;widget:;field:;format:;$ref:false;enum:false': 'number',
    'type:array;widget:;field:;format:;$ref:false;enum:false': 'array',
  },
  isFirstRender: false,
}

export const mockDataForFormBuilderRjsfEmpty = {
  categoryHash: {
    'type:string;widget:;field:;format:date-time;$ref:false;enum:false': 'dateTime',
    'type:string;widget:;field:;format:date;$ref:false;enum:false': 'date',
    'type:string;widget:;field:;format:time;$ref:false;enum:false': 'time',
    'type:boolean;widget:;field:;format:;$ref:false;enum:false': 'checkbox',
    'type:string;widget:radio;field:;format:;$ref:false;enum:true': 'radio',
    'type:number;widget:radio;field:;format:;$ref:false;enum:true': 'radio',
    'type:integer;widget:radio;field:;format:;$ref:false;enum:true': 'radio',
    'type:array;widget:radio;field:;format:;$ref:false;enum:true': 'radio',
    'type:boolean;widget:radio;field:;format:;$ref:false;enum:true': 'radio',
    'type:;widget:radio;field:;format:;$ref:false;enum:true': 'radio',
    'type:string;widget:;field:;format:;$ref:false;enum:true': 'dropdown',
    'type:number;widget:;field:;format:;$ref:false;enum:true': 'dropdown',
    'type:integer;widget:;field:;format:;$ref:false;enum:true': 'dropdown',
    'type:array;widget:;field:;format:;$ref:false;enum:true': 'dropdown',
    'type:boolean;widget:;field:;format:;$ref:false;enum:true': 'dropdown',
    'type:;widget:;field:;format:;$ref:false;enum:true': 'dropdown',
    'type:;widget:;field:;format:;$ref:true;enum:false': 'ref',
    'type:string;widget:;field:;format:;$ref:false;enum:false': 'shortAnswer',
    'type:string;widget:;field:;format:email;$ref:false;enum:false': 'shortAnswer',
    'type:string;widget:;field:;format:hostname;$ref:false;enum:false': 'shortAnswer',
    'type:string;widget:;field:;format:uri;$ref:false;enum:false': 'shortAnswer',
    'type:string;widget:;field:;format:regex;$ref:false;enum:false': 'shortAnswer',
    'type:string;widget:password;field:;format:;$ref:false;enum:false': 'password',
    'type:string;widget:textarea;field:;format:;$ref:false;enum:false': 'longAnswer',
    'type:integer;widget:;field:;format:;$ref:false;enum:false': 'integer',
    'type:integer;widget:number;field:;format:;$ref:false;enum:false': 'integer',
    'type:number;widget:;field:;format:;$ref:false;enum:false': 'number',
    'type:array;widget:;field:;format:;$ref:false;enum:false': 'array',
  },
  allFormInputs: {
    dateTime: {
      displayName: 'Date-Time',
      matchIf: [
        {
          types: ['string'],
          format: 'date-time',
        },
      ],
      defaultDataSchema: {
        format: 'date-time',
      },
      defaultUiSchema: {},
      type: 'string',
    },
    date: {
      displayName: 'Date',
      matchIf: [
        {
          types: ['string'],
          format: 'date',
        },
      ],
      defaultDataSchema: {
        format: 'date',
      },
      defaultUiSchema: {},
      type: 'string',
    },
    time: {
      displayName: 'Time',
      matchIf: [
        {
          types: ['string'],
          format: 'time',
        },
      ],
      defaultDataSchema: {
        format: 'time',
      },
      defaultUiSchema: {},
      type: 'string',
    },
    checkbox: {
      displayName: 'Checkbox',
      matchIf: [
        {
          types: ['boolean'],
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {},
      type: 'boolean',
    },
    radio: {
      displayName: 'Radio',
      matchIf: [
        {
          types: ['string', 'number', 'integer', 'array', 'boolean', 'null'],
          widget: 'radio',
          enum: true,
        },
      ],
      defaultDataSchema: {
        enum: [],
      },
      defaultUiSchema: {
        'ui:widget': 'radio',
      },
      type: 'string',
    },
    dropdown: {
      displayName: 'Dropdown',
      matchIf: [
        {
          types: ['string', 'number', 'integer', 'array', 'boolean', 'null'],
          enum: true,
        },
      ],
      defaultDataSchema: {
        enum: [],
      },
      defaultUiSchema: {},
      type: 'string',
    },
    ref: {
      displayName: 'Reference',
      matchIf: [
        {
          types: ['null'],
          $ref: true,
        },
      ],
      defaultDataSchema: {
        $ref: '',
        title: '',
        description: '',
      },
      defaultUiSchema: {},
      type: 'string',
      inputMode: 'string',
    },
    shortAnswer: {
      displayName: 'Short Answer',
      matchIf: [
        {
          types: ['string'],
        },
        {
          types: ['string'],
          format: 'email',
        },
        {
          types: ['string'],
          format: 'hostname',
        },
        {
          types: ['string'],
          format: 'uri',
        },
        {
          types: ['string'],
          format: 'regex',
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {},
      type: 'string',
      inputMode: 'string',
    },
    password: {
      displayName: 'Password',
      matchIf: [
        {
          types: ['string'],
          widget: 'password',
        },
      ],
      inputMode: 'string',
      defaultDataSchema: {},
      defaultUiSchema: {
        'ui:widget': 'password',
      },
      type: 'string',
    },
    longAnswer: {
      displayName: 'Long Answer',
      matchIf: [
        {
          types: ['string'],
          widget: 'textarea',
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {
        'ui:widget': 'textarea',
      },
      type: 'string',
      inputMode: 'string',
    },
    integer: {
      displayName: 'Integer',
      matchIf: [
        {
          types: ['integer'],
        },
        {
          types: ['integer'],
          widget: 'number',
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {},
      type: 'integer',
      inputMode: 'numeric',
    },
    number: {
      displayName: 'Number',
      matchIf: [
        {
          types: ['number'],
        },
      ],
      defaultDataSchema: {},
      defaultUiSchema: {},
      inputMode: 'numeric',
      type: 'number',
    },
    array: {
      displayName: 'Array',
      matchIf: [
        {
          types: ['array'],
        },
      ],
      defaultDataSchema: {
        items: {
          type: 'string',
        },
      },
      defaultUiSchema: {},
      type: 'array',
    },
  },
}
