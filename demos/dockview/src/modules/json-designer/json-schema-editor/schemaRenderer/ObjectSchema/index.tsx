import React from 'react';
import { Tree } from 'antd';
import BaseFormSchema from '$components/BaseFormSchema/index';
import MappingRender from '$schemaRenderer/MappingRender';
import { BaseRendererProps } from '$types/index';
const { TreeNode } = Tree;

/** Renders the form field for the current field (the form field content of the Tree) */
const getTreeNodeTitleCont = (params: BaseRendererProps) => {
  return <BaseFormSchema {...params} />;
};

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
    isOnlyShowChild,
    ...restProps
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
    let nodeKey = `${
      parentNodeKey ? `${parentNodeKey}-` : ''
        }${curType}-${currentJsonKey}`; // By default, only the current format + jsonKey is used as the nodeKey.

    return MappingRender({
    ...restProps,
    parentType,
    jsonKey: currentJsonKey,
    indexRoute: currentIndexRoute,
    key: nodeKey,
    nodeKey,
    targetJsonSchema: currentSchemaData,
    });
    });
};

/** ObjectSchema
 * Object type element rendering component
 * */
const ObjectSchema = (props: BaseRendererProps) => {
  const { jsonKey, indexRoute, nodeKey, targetJsonSchema, isOnlyShowChild } =
    props;
  const curType = targetJsonSchema.type;
  const isFixed = targetJsonSchema.isFixed;

  /** First, retrieve the properties content of the current node */
  const propertiesContElem = propertiesRender({
    ...props,
    propertyOrder: targetJsonSchema.propertyOrder,
    properties: targetJsonSchema.properties,
    parentIndexRoute: indexRoute,
    parentNodeKey: nodeKey,
    parentType: curType,
    isOnlyShowChild,
  });

  /** Node content */
  const TreeNodeElem = (
    <TreeNode
      className={`${curType}-schema schema-item-form`}
      id={nodeKey}
      key={nodeKey}
      // indexRoute={indexRoute}
      // jsonKey={jsonKey}
      disabled={isFixed}
      title={getTreeNodeTitleCont({
        ...props,
      })}
    >
      {propertiesContElem}
    </TreeNode>
  );

  /** When isOnlyShowChild is true, only the properties content of the node is rendered. */
   /* Note: The node content (Tree root interface) is already displayed in the JSONSchema rendering component.
   * */
  return isOnlyShowChild ? propertiesContElem : TreeNodeElem;
};

export default ObjectSchema;
