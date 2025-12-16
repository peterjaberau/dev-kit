/*
* SchemaEditorNode
*
* Recursively renders inputs for a given schema node. The component maintains
* its own local state for the value of the node. For a full form solution you
* might lift the state up or use a form library to manage the entire data
* model.
*/
import { useState } from "react"
import { getDefaultValue } from '../utils/get-default-value'
export function SchemaEditorNode({ node }: any) {
  const [value, setValue] = useState(() => getDefaultValue(node));

  // Render reference nodes as read-only
  if (node.type === '$ref') {
    return <span>$ref: {node.details.ref}</span>;
  }

  // Render primitive and enum types
  if (node.details && node.details.enum) {
    const options = node.details.enum;
    return (
      <select
        value={value}
        onChange={e => setValue(e.target.value)}
      >
        {options.map((opt: any) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    );
  }
  if (node.type === 'string') {
    return (
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={node.details && node.details.description}
      />
    );
  }
  if (node.type === 'integer' || node.type === 'number') {
    return (
      <input
        type="number"
        value={value}
        onChange={e => setValue(Number(e.target.value))}
      />
    );
  }
  if (node.type === 'boolean') {
    return (
      <input
        type="checkbox"
        checked={value}
        onChange={e => setValue(e.target.checked)}
      />
    );
  }

  // Render objects by recursively rendering each child as a form field
  if (node.type === 'object') {
    return (
      <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
        {node.children.map((child: any, idx: any) => (
          <li key={`${child.name}-${idx}`} style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>{child.name}</label>
            <SchemaEditorNode node={child} />
          </li>
        ))}
      </ul>
    );
  }

  // Render arrays with controls to add, edit and delete items
  if (node.type === 'array') {
    const items = value;
    const addItem = () => {
      const newItem = getDefaultValue(node.children[0] || {});
      setValue([...items, newItem]);
    };
    const updateItem = (index: any, newValue: any) => {
      const newItems = items.slice();
      newItems[index] = newValue;
      setValue(newItems);
    };
    const deleteItem = (index: any) => {
      const newItems = items.slice();
      newItems.splice(index, 1);
      setValue(newItems);
    };
    return (
      <div>
        <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
          {items.map((itemValue: any, index: any) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>
              <SchemaEditorNode
                node={node.children[0]}
                // Pass a key so React treats each item consistently
              />
              <button type="button" onClick={() => deleteItem(index)} style={{ marginLeft: '0.5rem' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={addItem}>Add Item</button>
      </div>
    );
  }

  // Handle oneOf/anyOf by allowing the user to choose which schema to use
  if (node.children && node.children.length > 0 && (node.name.startsWith('oneOf') || node.name.startsWith('anyOf'))) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleSelect = (e: any) => setSelectedIndex(Number(e.target.value));
    return (
      <div>
        <select value={selectedIndex} onChange={handleSelect} style={{ marginBottom: '0.5rem' }}>
          {node.children.map((child: any, idx: any) => (
            <option key={idx} value={idx}>{child.name}</option>
          ))}
        </select>
        <SchemaEditorNode node={node.children[selectedIndex]} />
      </div>
    );
  }

  // Fallback: render node name
  return <span>{node.name}</span>;
}
