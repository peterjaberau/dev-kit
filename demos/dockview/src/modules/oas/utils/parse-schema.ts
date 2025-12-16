/* Recursive parser from the report. */
export function parseSchema(name: any, schema: any, visited = new Set()) {
  if (visited.has(schema)) {
    return { name, type: 'circularRef', details: {}, children: [] };
  }
  visited.add(schema);

  const node: any = {
    name,
    type: schema.type || 'object',
    details: {},
    children: []
  };

  [
    'format',
    'default',
    'enum',
    'pattern',
    'description',
    'minimum',
    'maximum',
    'minLength',
    'maxLength',
    'minItems',
    'maxItems',
    'deprecated'
  ].forEach(key => {
    if (schema[key] !== undefined) node.details[key] = schema[key];
  });

  ['allOf', 'oneOf', 'anyOf'].forEach(keyword => {
    if (Array.isArray(schema[keyword])) {
      schema[keyword].forEach((subSchema, idx) => {
        node.children.push(parseSchema(`${keyword}[${idx}]`, subSchema, visited));
      });
    }
  });

  if (node.type === 'object') {
    if (schema.properties) {
      Object.entries(schema.properties).forEach(([propName, propSchema]) => {
        node.children.push(parseSchema(propName, propSchema, visited));
      });
    }
    if (schema.patternProperties) {
      Object.entries(schema.patternProperties).forEach(([pattern, subSchema]) => {
        node.children.push(parseSchema(`pattern:${pattern}`, subSchema, visited));
      });
    }
    if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
      node.children.push(parseSchema('[additionalProperties]', schema.additionalProperties, visited));
    }
  } else if (node.type === 'array' && schema.items) {
    if (Array.isArray(schema.items)) {
      schema.items.forEach((item: any, idx: any) => {
        node.children.push(parseSchema(`items[${idx}]`, item, visited));
      });
    } else {
      node.children.push(parseSchema('items', schema.items, visited));
    }
  }

  if (schema.$ref) {
    node.type = '$ref';
    node.details.ref = schema.$ref;
  }

  return node;
}
