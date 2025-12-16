/*
 * EditableSchemaTree
 *
 * Accepts a map of schemas and an editMode flag. When editMode is true,
 * renders an editor for each schema; otherwise falls back to the read-only tree.
 *
 * You should supply a toggle in a parent component to switch between modes.
 */
import { useMemo } from "react"
import { parseSchema } from '../utils/parse-schema'
import { SchemaEditorNode } from './schema-editor-node'
import { SchemaTreeNode } from './schema-tree-node'

export default function EditableSchemaTree({ schemas, editMode }: any) {
  // Parse the schemas into tree nodes only once per change
  const roots = useMemo(() => {
    if (!schemas) return [];
    return Object.entries(schemas).map(([name, schema]) => parseSchema(name, schema));
  }, [schemas]);

  if (!schemas) return null;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {roots.map((root: any, index: any) => (
        <li key={`${root.name}-${index}`} style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 'bold' }}>{root.name}</label>
          {editMode ? (
            <SchemaEditorNode node={root} />
          ) : (
            // When not editing, reuse the read-only SchemaTreeNode component
            <SchemaTreeNode node={root} />
          )}
        </li>
      ))}
    </ul>
  );
}
