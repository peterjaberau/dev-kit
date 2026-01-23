const definitions = {
  playground: {
    defaults: {
      featureFlags: {
        toolbar: true,
      },
    },
    context: {
      editorIdGenerator: null,
      editors: [],
      featureFlags: {},
      value: [],
    },
    events: [
      {
        type: "add editor",
      },
      {
        type: "editor.mutation",
      },
      {
        type: "editor.remove",
      },
      {
        type: "toggle value",
      },
      {
        type: "toggle feature flag",
        flag: {},
      },
    ],
    emits: {},
    actions: {
      broadcastPatches: {},
      updateValue: {},
      broadcastValue: {},
      addEditorToContext: {},
      stopEditor: {},
      removeEditorFromContext: {},
      toggleFeatureFlag: {},
    },
    actors: {
      editorMachine: {},
    },
    logic: {
      initial: "value shown",
      on: {
        "add editor": ["addEditorToContext"],
        "editor.remove": ["stopEditor", "removeEditorFromContext"],
        "editor.mutation": ["broadcastPatches", "updateValue", "broadcastValue"],
        "toggle value": ["broadcastBatches"],
        "toggle feature flag": ["toggleFeatureFlag"],
      },
      entry: [
        {
          raise: ["add editor"],
        },
      ],
      states: {
        "value shown": {
          on: {
            "toggle value": {
              target: "value hidden",
            },
          },
        },
        "value hidden": {
          on: {
            "toggle value": {
              target: "value shown",
            },
          },
        },
      },
    },
  },
  playgroundEditor: {
    schema: {
      decorators: [
        {
          title: "Strong",
          name: "strong",
        },
        {
          title: "Emphasis",
          name: "em",
        },
        {
          title: "Code",
          name: "code",
        },
        {
          title: "Underline",
          name: "underline",
        },
        {
          title: "Strike",
          name: "strike-through",
        },
        {
          title: "Subscript",
          name: "subscript",
        },
        {
          title: "Superscript",
          name: "superscript",
        },
      ],
      annotations: [
        {
          title: "Link",
          name: "link",
          fields: [{ name: "href", title: "HREF", type: "string" }],
        },
        {
          title: "Comment",
          name: "comment",
          fields: [{ name: "text", title: "Text", type: "string" }],
        },
      ],
      lists: [
        {
          title: "Bulleted list",
          name: "bullet",
        },
        {
          title: "Numbered list",
          name: "number",
        },
      ],
      styles: [
        {
          title: "Normal",
          name: "normal",
        },
        {
          title: "Heading 1",
          name: "h1",
        },
        {
          title: "Heading 2",
          name: "h2",
        },
        {
          title: "Heading 3",
          name: "h3",
        },
        {
          title: "Heading 4",
          name: "h4",
        },
        {
          title: "Heading 5",
          name: "h5",
        },
        {
          title: "Heading 6",
          name: "h6",
        },
        {
          title: "Quote",
          name: "blockquote",
        },
      ],
      blockObjects: [
        {
          title: "Break",
          name: "break",
        },
        {
          title: "Image",
          name: "image",
          fields: [
            { name: "src", title: "Src", type: "string" },
            { name: "alt", title: "Alt text", type: "string" },
          ],
        },
      ],
      inlineObjects: [
        {
          title: "Stock ticker",
          name: "stock-ticker",
          fields: [{ name: "symbol", title: "Symbol", type: "string" }],
        },
        {
          title: "Inline image",
          name: "image",
          fields: [
            { name: "src", title: "Src", type: "string" },
            { name: "alt", title: "Alt text", type: "string" },
          ],
        },
        {
          title: "Mention",
          name: "mention",
          fields: [
            { name: "userId", title: "User ID", type: "string" },
            { name: "name", title: "Name", type: "string" },
            { name: "username", title: "Username", type: "string" },
          ],
        },
      ],
    },
  },
  editor: {
    context: {
      behaviors: [],
      behaviorsSorted: false,
      converters: [],
      pendingEvents: [],
      pendingIncomingPatchesEvents: [],
      schema: {},
      initialReadOnly: false,
      selection: null,
      initialValue: [],
      internalDrag: null,
      dragGhoast: null,
      slateEditor: null,
    },
    events: [
      'addBehaviorToContext',
      'removeBehaviorFromContext',
      'addSlateEditorToContext',
      'emitPatchEvent',
      'emitMutationEvent',
      'emitReadOnly',
      'emitEditable',
      'deferEvent',

    ],
    emits: [],
  },
  editorInternal: {
    events: [
      "add behavior",
      "remove behavior",
      "blur",
      "focus",
      "update selection",
      "done syncing value",
      "syncing value",
      "behavior event",
      "dragend", "drop", "add slate editor",
    ],

  },
  editorExternal: {
    events: [
      {
        type: "update readOnly",
      },
      {
        type: "patches",
      },
    ],
    actions: [],
  },
}
