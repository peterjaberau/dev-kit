export interface DocsParameter {
  id?: string
  name: string
  type: string
  defaultValue?: any
  required?: boolean
  description: string
  enum?: string[]
}

export const parameters: DocsParameter[] = [
  {
    id: 'query-path',
    name: 'query, path',
    type: 'string',
    required: true,
    description:
      'Whether the parameter is a query, path, body, or header. Followed by the parameter name.',
  },
  {
    id: 'limit',
    name: 'limit',
    type: 'integer',
    defaultValue: 10,
    description:
      'The maximum number of items to return in the response. Defaults to 10 if not specified.',
  },
  {
    id: 'include-metadata',
    name: 'includeMetadata',
    type: 'boolean',
    description:
      'Whether to include additional metadata in the response. When true, extra fields like timestamps and validation status are included.',
  },
  {
    id: 'sort-order',
    name: 'sortOrder',
    type: 'array',
    description:
      "An array of sort criteria objects. Each object should contain a 'field' and 'direction' property.",
  },
  {
    id: 'behavior',
    name: 'behavior',
    type: 'enum',
    defaultValue: 'append',
    description: 'The behavior of the parameter',
    enum: ['append', 'replace'],
  },
]

export interface CollapsibleParameter {
  prop: string
  type: string
  name: string
  description: string
  defaultValue?: string
  required?: boolean
}

export const collapsibleParameterData: CollapsibleParameter[] = [
  {
    prop: 'disabled',
    type: 'boolean',
    name: 'disabled',
    description: 'Whether the component should ignore user interaction.',
    defaultValue: 'false',
    required: false,
  },
  {
    prop: 'className',
    type: 'string | function',
    name: 'className',
    description: 'CSS class name to apply to the component.',
    required: false,
  },
  {
    prop: 'render',
    type: 'ReactElement | function',
    name: 'render',
    description: 'Custom render function for the component.',
    required: false,
  },
]
