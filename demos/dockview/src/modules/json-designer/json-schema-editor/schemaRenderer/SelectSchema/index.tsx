import React from 'react';
import { Tree } from 'antd';
const { TreeNode } = Tree;
import BaseFormSchema from '$components/BaseFormSchema/index';
import OptionSchema from '$components/OptionSchema/index';
import { BaseRendererProps } from '$types/index';

/** Renders the form field for the current field (the content of a single item in the Tree) */
const getTreeNodeTitleCont = (params: any) => <BaseFormSchema {...params} />;

/** Render the elements in options */
const optionItemRender = (params: any) => <OptionSchema {...params} />;

/** Select type rendering component */
const SelectSchema = (props: BaseRendererProps) => {
  const { jsonKey, indexRoute, nodeKey, targetJsonSchema } = props;
  const curType = targetJsonSchema.type;

  const options = targetJsonSchema.options;
  const curIndexRoute = indexRoute ? indexRoute : '0';

  return (
    <TreeNode
      className={`${curType}-schema schema-item-form`}
      id={nodeKey}
      key={nodeKey}
      // indexRoute={indexRoute || '0'}
      // jsonKey={jsonKey}
      title={getTreeNodeTitleCont({
        ...props,
      })}
    >
      {options &&
        options.length > 0 &&
        options.map((optionItem: any, optionIndex: number) => {
          /** 1. Get the label and value of the current option */
          const optionLabel = optionItem.label || optionItem.name;
          const optionValue = optionItem.value;
          /** 2. Get the ID of the current option element for unique identification */
          const optionNodeKey = `${nodeKey}${curType}-${optionLabel}`;

          return (
            <TreeNode
              className="enum-item-schema schema-item-form"
              id={optionNodeKey}
              key={optionNodeKey}
              // indexRoute={curIndexRoute}
              disabled={true}
              title={optionItemRender({
                indexRoute: curIndexRoute,
                optionIndex,
                optionLabel,
                optionValue,
                optionNodeKey,
              })}
            ></TreeNode>
          );
        })}
    </TreeNode>
  );
};

export default SelectSchema;
