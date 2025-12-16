import React from 'react';
import { Tree } from 'antd';
const { TreeNode } = Tree;

import BaseFormSchema from '$components/BaseFormSchema/index';
import MappingRender from '$schemaRenderer/MappingRender';
import { BaseRendererProps } from '$types/index';

/** Renders the form field for the current field (the content of a single item in the Tree) */
const getTreeNodeTitleCont = (params: BaseRendererProps) => (
  <BaseFormSchema {...params} />
);

/** Render elements in properties. */
/* Retrieve key values ​​in an ordered manner by iterating through the propertyOrder.
  Then, retrieve the corresponding JSON data from the properties file based on the key value.
* parentIndexRoute is used to concatenate the complete index path of the current element.
* */
const propertiesRender = (params: BaseRendererProps) => {
  const {
    propertyOrder,
    properties,
    parentIndexRoute,
    parentNodeKey,
    parentType,
  } = params;

  return propertyOrder.map((key: string, index: number) => {
    /** 1. Get the path value of the current element */
    const currentIndexRoute = parentIndexRoute
      ? `${parentIndexRoute}-${index}`
      : `${index}`;
    /** 2. Get the key value of the current element */
    const currentJsonKey = key;
    /** 3. Retrieve the JSON data object of the current element */
    const currentSchemaData = properties[currentJsonKey];
    /** 4. Determine if it is a container element; if so, disable selection. */
    const curType = currentSchemaData.type;
    /** 5. Get the ID of the current element, used as a unique identifier */
    const nodeKey = `${
      parentNodeKey ? `${parentNodeKey}-` : ''
    }${curType}-${currentJsonKey}`;

    return MappingRender({
      ...params,
      parentType,
      jsonKey: currentJsonKey,
      indexRoute: currentIndexRoute,
      key: nodeKey,
      nodeKey,
      targetJsonSchema: currentSchemaData,
    });
  });
};

/** Render the elements in items */
const itemsRender = (props: BaseRendererProps) => {
  const { parentType, jsonKey, indexRoute, nodeKey, targetJsonSchema } = props;

  return (
    <TreeNode
      className={'array-item-schema schema-item-form'}
      id={nodeKey}
      key={nodeKey}
      //indexRoute={indexRoute}
      // jsonKey={jsonKey}
      disabled={true}
      title={getTreeNodeTitleCont({
        ...props,
        indexRoute,
        jsonKey,
        targetJsonSchema,
        parentType,
        nodeKey,
        isFixed: true,
        typeIsFixed: false,
      })}
    >
      {targetJsonSchema.type === 'object' &&
        propertiesRender({
          ...props,
          propertyOrder: targetJsonSchema.propertyOrder,
          properties: targetJsonSchema.properties,
          parentIndexRoute: indexRoute,
          parentNodeKey: nodeKey,
          parentType,
        })}
    </TreeNode>
  );
};

/** Array type rendering component */
const ArraySchema = (props: BaseRendererProps) => {
  const { jsonKey, indexRoute, nodeKey, targetJsonSchema } = props;
  const curType = targetJsonSchema.type;

  // Get the index path value of items
  const currentIndexRoute = indexRoute ? `${indexRoute}-0` : '0';
  // Get the jsonKey of items
  const itemsJsonKey = 'items';
  // Get the key path of items
  const curNodeKey = nodeKey ? `${nodeKey}-${itemsJsonKey}` : itemsJsonKey;
  const items = targetJsonSchema[itemsJsonKey] || {};

  return (
    <TreeNode
      className={`${curType}-schema schema-item-form`}
      id={nodeKey}
      key={nodeKey}
      // indexRoute={indexRoute}
      // jsonKey={jsonKey}
      title={getTreeNodeTitleCont({
        ...props,
      })}
    >
      {itemsRender({
        ...props,
        parentType: 'array',
        jsonKey: itemsJsonKey,
        indexRoute: currentIndexRoute,
        nodeKey: curNodeKey,
        targetJsonSchema: items,
      })}
    </TreeNode>
  );
};

export default ArraySchema;
