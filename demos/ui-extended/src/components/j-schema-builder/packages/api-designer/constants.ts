/** Http */
export const httpMethods = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'head',
  'options',
  'trace',
];

export const methodColors = {
  get: 'success',
  post: 'info',
  put: 'warning',
  patch: 'warning',
  delete: 'danger',
  copy: 'gray',
  head: 'gray',
  link: 'gray',
  unlink: 'gray',
  purge: 'gray',
  lock: 'gray',
  unlock: 'gray',
  options: 'gray',
  trace: 'gray',
};

export const pathMethods = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete',
};

export const contentTypes = [
  'application/json',
  'application/xml',
  'multipart/form-data',
  'text/html',
  'text/plain',
  'application/EDI-X12',
  'application/EDIFACT',
  'application/atom+xml',
  'application/font-woff',
  'application/gzip',
  'application/javascript',
  'application/octet-stream',
  'application/ogg',
  'application/pdf',
  'application/postscript',
  'application/soap+xml',
  'application/x-bittorrent',
  'application/x-tex',
  'application/xhtml+xml',
  'application/xml-dtd',
  'application/xop+xml',
  'application/zip',
  'application/x-www-form-urlencoded',
];

export const ContentTypesMapping = {
  json: 'application/json',
  xml: 'application/xml',
  form: 'application/x-www-form-urlencoded',
  multipart: 'multipart/form-data',
  text: 'text/plain; charset=utf-8',
  html: 'text/html',
  pdf: 'application/pdf',
  png: 'image/png',
};

export const statusCodes = {
  100: 'Continue',
  101: 'Switching Protocols',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status (WebDAV)',
  208: 'Already Reported (WebDAV)',
  226: 'IM Used',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  306: '(Unused)',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect (experiemental)',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: "I'm a teapot (RFC 2324)",
  420: 'Enhance Your Calm (Twitter)',
  422: 'Unprocessable Entity (WebDAV)',
  423: 'Locked (WebDAV)',
  424: 'Failed Dependency (WebDAV)',
  425: 'Too Early',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  444: 'No Response (Nginx)',
  449: 'Retry With (Microsoft)',
  450: 'Blocked by Windows Parental Controls (Microsoft)',
  451: 'Unavailable For Legal Reasons',
  499: 'Client Closed Request (Nginx)',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates (Experimental)',
  507: 'Insufficient Storage (WebDAV)',
  508: 'Loop Detected (WebDAV)',
  509: 'Bandwidth Limit Exceeded (Apache)',
  510: 'Not Extended',
  511: 'Network Authentication Required',
  598: 'Network read timeout error',
  599: 'Network connect timeout error',
};

export const primaryStatusCodes = [200, 201, 400, 401, 403, 404, 500];

export const sortedStatusCodes = Object.keys(statusCodes).map(Number).sort();

export const statusCodesColor = {
  1: 'gray',
  2: 'green',
  3: 'yellow',
  4: 'orange',
  5: 'red',
};


/** Tree */
export const NodeTypes = {
  Overview: 'overview',
  Paths: 'paths',
  Path: 'path',
  Operation: 'operation',
  Model: 'model',
  Models: 'models',
  Response: 'response',
  Responses: 'responses',
  RequestBody: 'requestBody',
  RequestBodies: 'requestBodies',
  Parameter: 'parameter',
  Parameters: 'parameters',
  Examples: 'examples',
  Example: 'example',
  Components: 'components',
  Schemas: 'schemas',
};

export const eventTypes = {
  NodeMouseEnter: 'node.mouseenter',
  NodeMouseLeave: 'node.mouseexit',
  NodeClick: 'node.click',
  NodeDoubleClick: 'node.doubleClick',
  NodeCaretClick: 'node.caretClick',
  NodeExpand: 'node.expand',
  Drop: 'drop',
  EditCancel: 'edit.cancel',
  ValidationError: 'edit.validationError',
  BeforeEditComplete: 'edit.beforecomplete',
  AfterEditComplete: 'edit.aftercomplete',

  // Graph events
  GraphNodeAdd: 'graph.node_add',
  DidAddSourceMapNode: 'graph.source_map_node_add',
  DidPatchSourceNodeProp: 'graph.patch_sourcemap_node',
  DidChangeSourceNode: 'graph.did_changed_source_node',
  DidPatchSourceNodePropComplete: 'graph.did_patch_source_complete',
  DidUpdateNodeUri: 'graph.did_update_node_uri',
  DidRemoveNode: 'graph.did_remove_node',
  DidPatch: 'graph.did_patch_node',
  ComputeSourceMap: 'graph.compute_source_map',

  // sidebar events
  CreatePath: 'action.create_path',
  CreateModel: 'action.create_model',
  CreateExample: 'action.create_example',
  CreateParameter: 'action.create_parameter',
  CreateResponse: 'action.create_response',
  CreateRequestBody: 'action.create_request_body',
  RenameNode: 'action.rename_node',
  DeleteNode: 'action.delete_node',
  DeleteHttpMethod: 'action.delete_http_method',

  // Store events
  StoreEvents: {
    ExtraPropUpdate: 'store.extra_prop_update',
    Change: 'store.change',
    Transformed: 'store.transformed',
    GoToRef: 'store.goto_ref',
  },

  // Schema events
  GoToRef: 'schema.goto_ref',
};

export const taskTypes = {
  ReadSourceNode: 'read_source_node',
};

export const NodeCategories = {
  Source: 'source',
  SourceMap: 'source_map',
  Virtual: 'virtual',
};

export const nodeOperations = {
  AddNode: 'add_node',
  SetSourceNodeProp: 'set_source_node_props',
  PatchSourceNodeProp: 'patch_source_node_props',
  RemoveNode: 'remove_node',
  MoveNode: 'move_node',
  Add: 'add_child_node',
  Move: 'move_child_node',
  Replace: 'replace_child_node',
  Remove: 'remove_child_node',
  Text: 'text_child_node',
};

/** SecuritySchemes */
export const securitySchemes = {
  http: {
    type: 'http',
    scheme: 'basic',
  },
  apiKey: {
    type: 'apiKey',
    in: 'query',
    name: 'Api Key',
  },
  openIdConnect: {
    type: 'openIdConnect',
    openIdConnectUrl: '',
  },
  oauth2: {
    type: 'oauth2',
  },
};

/** openapi */
export const openapiSpec = {
  openapi: '3.0.0',
  info: {
    title: '',
    version: '1.0',
  },
  paths: {},
  components: {
    schemas: {},
    responses: {},
    parameters: {},
    examples: {},
    requestBodies: {},
    headers: {},
    securitySchemes: {},
    links: {},
    callbacks: {},
  },
  tags: [],
  servers: [],
};

export const openapiSchema = {
  $ref: {$ref: ''},
  string: {type: 'string'},
  boolean: {type: 'boolean'},
  number: {type: 'number'},
  integer: {type: 'integer'},
  array: {type: 'array', items: {type: 'string'}},
  object: {type: 'object', properties: {}, required: []},
};

/** languages */
export const primaryLanguage = 'en_US';

export const languages = {
  en_US: {
    title: 'Title',
    import_json: 'Import JSON',
    base_setting: 'Base Setting',
    all_setting: 'Source Code',
    default: 'Default',
    description: 'Description',
    adv_setting: 'Advanced Settings',
    add_child_node: 'Add child node',
    add_sibling_node: 'Add sibling nodes',
    add_node: 'Add sibling/child nodes',
    child_node: 'Child node',
    sibling_node: 'Sibling node',
    ok: 'OK',
    cancel: 'Cancel',
    minLength: 'Min length',
    maxLength: 'Max length',
    pattern: 'MUST be a string and SHOULD be a valid regular expression.',
    exclusiveMinimum: 'Value strictly less than',
    exclusiveMaximum: 'Value strictly more than',
    minimum: 'Min',
    maximum: 'Max',
    unique_items: 'Unique Items',
    min_items: 'MinItems',
    max_items: 'MaxItems',
    checked_all: 'Checked All',
    valid_json: 'Not valid json',
    enum: 'Enum',
    enum_msg: 'One value per line',
    enum_desc: 'desc',
    enum_desc_msg: 'enum description',
    required: 'required',
    mock: 'mock',
    mockLink: 'Help',
  },
};

export const icons = {
  down: null,
  right: null,

  [NodeTypes.Overview]: {
    default: 'star',
    color: 'var(--icon-color)',
  },

  [NodeTypes.Paths]: {
    default: 'folder-close',
    expanded: 'folder-open',
    color: '#eba439',
  },

  get [NodeTypes.Models]() {
    return Object.assign({}, this[NodeTypes.Paths]);
  },

  [NodeTypes.Model]: {
    default: 'cube',
    color: '#ef932b',
  },

  get [NodeTypes.Responses]() {
    return Object.assign({}, this[NodeTypes.Paths]);
  },

  [NodeTypes.Response]: {
    default: 'exchange',
    color: '#0f79c5',
  },

  get [NodeTypes.Parameters]() {
    return Object.assign({}, this[NodeTypes.Paths]);
  },

  [NodeTypes.Parameter]: {
    default: 'paragraph',
    color: '#1a4f75',
  },

  get [NodeTypes.Examples]() {
    return Object.assign({}, this[NodeTypes.Paths]);
  },

  [NodeTypes.Example]: {
    default: 'credit-card',
    color: '#e53e3e',
  },

  get [NodeTypes.RequestBodies]() {
    return Object.assign({}, this[NodeTypes.Paths]);
  },

  [NodeTypes.RequestBody]: {
    default: 'dot',
    color: '#6e44b1',
  },
} as any
