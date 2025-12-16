// Built-in expected type value
const valExpectType: Record<string, string> = {
  array: 'array',
  boolean: 'boolean',
  'box-style': 'object',
  'padding-margin': 'object',
  codearea: 'string',
  color: 'string',
  datasource: 'object',
  date: 'string',
  'date-time': 'string',
  'dynamic-data': 'object',
  event: 'object',
  'func-body': 'string',
  htmlarea: 'string',
  image: 'string',
  input: 'string',
  json: 'string',
  number: 'number',
  'input-image': 'string',
  object: 'object',
  quantity: 'object',
  radio: 'string',
  select: 'string',
  textarea: 'string',
  'text-editor': 'string',
  time: 'string',
  url: 'string',
};

// Get the expected type value of the corresponding element based on type
export function getExpectType(type: string) {
  return valExpectType[type] || type;
}

// Register a new expected type value
export function registerExpectType(type: string, valType: string) {
  if (valExpectType[type]) {
    console.warn(
      `${type}(${valExpectType[type]}) already exists and cannot be overridden at this time.`,
    );
    return;
  }
  valExpectType[type] = valType;
}
