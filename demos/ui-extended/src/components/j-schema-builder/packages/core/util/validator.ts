
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import type { Options } from 'ajv';

export const createAjv = (options?: Options) => {
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    strict: false,
    ...options,
  });
  addFormats(ajv);
  return ajv;
};
