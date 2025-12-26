export const typeOf = (v: unknown): any =>
  typeof v

/*

returns:
  typeof undefined      // "undefined"
  typeof true           // "boolean"
  typeof 42             // "number"
  typeof "hi"           // "string"
  typeof 10n            // "bigint"
  typeof Symbol()       // "symbol"
  typeof function () {} // "function"
  typeof {}             // "object"
  typeof []             // "object"
  typeof null           // "object"  // historical quirk
 */
