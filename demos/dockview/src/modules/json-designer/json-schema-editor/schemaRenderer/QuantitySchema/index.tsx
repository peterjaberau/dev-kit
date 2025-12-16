import React from 'react';
import { Tree } from 'antd';
const { TreeNode } = Tree;
import BaseFormSchema from '$components/BaseFormSchema/index';
import SelectFormSchema from '$components/SelectFormSchema/index';
import { BaseRendererProps } from '$types/index';

/** Renders the form field for the current field (the content of a single item in the Tree) */
const getTreeNodeTitleCont = (params: BaseRendererProps) => (
  <BaseFormSchema {...params} />
);

/** Render the content of dataSelect */
const getTypeSelectCont = (params: BaseRendererProps) => (
  <SelectFormSchema {...params} />
);

/** Quantity type rendering component */
const QuantitySchema = (props: BaseRendererProps) => {
  const { jsonKey, indexRoute, nodeKey, targetJsonSchema } = props;
  const curType = targetJsonSchema.type;

  /** Retrieves the numeric object from the quantity (the first one is the numeric object by default) */
  const unitJsonKey = targetJsonSchema.propertyOrder[0];
  const unitJsonData = targetJsonSchema.properties[unitJsonKey];

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
      <TreeNode
        className={'quantity-unit-item-schema schema-item-form'}
        id={`${nodeKey}-${unitJsonKey}`}
        key={`${nodeKey}-${unitJsonKey}`}
        // indexRoute={indexRoute ? `${indexRoute}-0` : '0'}
        // jsonKey={unitJsonKey}
        disabled={true}
        title={getTreeNodeTitleCont({
          ...props,
          indexRoute: indexRoute ? `${indexRoute}-0` : '0',
          jsonKey: unitJsonKey,
          targetJsonSchema: unitJsonData,
          parentType: curType,
          nodeKey: `${nodeKey}-${unitJsonKey}`,
          hideOperaBtn: true,
          showAdvanceBtn: true,
          typeIsFixed: true,
        })}
      ></TreeNode>
      <TreeNode
        className={'quantity-typeSelect-item-schema schema-item-form'}
        id={`${nodeKey}-quantity`}
        key={`${nodeKey}-quantity`}
        // indexRoute={indexRoute ? `${indexRoute}-1` : '1'}
        // jsonKey={'quantity'}
        disabled={true}
        title={getTypeSelectCont({
          ...props,
          indexRoute: indexRoute ? `${indexRoute}-1` : '1',
          jsonKey: 'quantity',
          targetJsonSchema: targetJsonSchema.properties.quantity,
          parentType: curType,
          nodeKey: `${nodeKey}-quantity`,
        })}
      ></TreeNode>
    </TreeNode>
  );
};

export default QuantitySchema;
