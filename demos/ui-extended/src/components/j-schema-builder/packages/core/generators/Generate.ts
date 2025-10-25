

import { generateJsonSchema } from './schema';
import { createControlElement, generateDefaultUISchema } from './uischema';
import type { ControlElement, JsonSchema, UISchemaElement } from '../';

export const Generate: {
  // TODO fix @typescript-eslint/ban-types
  // eslint-disable-next-line @typescript-eslint/ban-types
  jsonSchema(instance: Object, options?: any): JsonSchema;
  uiSchema(
    jsonSchema: JsonSchema,
    layoutType?: string,
    prefix?: string,
    rootSchema?: JsonSchema
  ): UISchemaElement;
  controlElement(ref: string): ControlElement;
} = {
  jsonSchema: generateJsonSchema,
  uiSchema: generateDefaultUISchema,
  controlElement: createControlElement,
};
