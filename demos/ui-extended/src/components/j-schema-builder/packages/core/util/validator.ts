
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import type { ErrorObject, Options, ValidateFunction } from 'ajv';

export const createAjv = (options?: Options) => {
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    strict: false,
    addUsedSchema: false,
    ...options,
  });
  addFormats(ajv);
  return ajv;
};

export const validate = (
  validator: ValidateFunction | undefined,
  data: any
): ErrorObject[] => {
  if (validator === undefined) {
    return [];
  }
  const valid = validator(data);
  if (valid) {
    return [];
  }
  return validator.errors as any;
};
