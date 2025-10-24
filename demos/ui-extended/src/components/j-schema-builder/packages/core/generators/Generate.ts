
import { ControlElement, JsonSchema, UISchemaElement } from '../models';
import { generateJsonSchema } from './schema';
import { createControlElement, generateDefaultUISchema } from './uischema';

export const Generate: {
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
