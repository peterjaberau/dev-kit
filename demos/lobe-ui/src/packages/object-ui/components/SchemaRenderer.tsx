import React from 'react';
import { ComponentRegistry } from '#object-ui/core';
import { chakra } from '@chakra-ui/react';

export const SchemaRenderer = ({ schema }: { schema: any }) => {
  if (!schema) return null;
  if (Array.isArray(schema)) {
      return <>{schema.map((s, i) => <SchemaRenderer key={s.id || i} schema={s} />)}</>;
  }
  
  const { type, hidden } = schema;
  if (hidden) return null; // Simple hidden check
  
  if (!type) {
      if (typeof schema === 'string') return <>{schema}</>;
      return null;
  }

  const Component = ComponentRegistry.get(type);

  if (!Component) {
    console.warn(`Renderer not found for type: ${type}`);
    return (
      <chakra.div
        css={{
          borderRadius: 'full',
          border: '1px solid',
          borderColor: 'red.200',
          backgroundColor: 'red.50',
          padding: '0.5rem',
          fontSize: '0.75rem',
          color: 'red.500',
        }}
       >
        Unknown: {type}
      </chakra.div>
    )
  }

  // This is dynamic component resolution from registry, not component creation during render
  // eslint-disable-next-line
  return <Component schema={schema} {...schema} />;
};
