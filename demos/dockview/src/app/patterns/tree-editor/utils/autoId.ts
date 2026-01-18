/**
 * A string of unique IDs generated
 */
export const genUniqueId = (prefix?: string | number) =>
  `${prefix}${Math.round(Math.random() * 1000).toString(16)}`;
