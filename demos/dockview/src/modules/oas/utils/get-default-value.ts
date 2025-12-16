/*
 * A helper that returns a sensible default value for a given schema node. This
 * allows the editor to prepopulate fields when editing. You can extend this
 * function to handle more complex default generation.
 */
export function getDefaultValue(node: any) {
  if (node.details && node.details.default !== undefined) {
    return node.details.default;
  }
  // Use basic defaults based on type
  switch (node.type) {
    case 'string':
      return '';
    case 'integer':
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'array':
      return [];
    case 'object':
      // Build an object with default values for each property
      const obj: any = {};
      node.children.forEach((child: any) => {
        obj[child.name] = getDefaultValue(child);
      });
      return obj;
    default:
      return undefined;
  }
}
