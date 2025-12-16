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

// Selecting different data source types will display different data content (all of which are non-editable).
const typeSelectData = {
  local: {
    type: 'json',
    title: 'Local JSON Data',
    default: '{}', // Default value
    placeholder: 'Please enter static JSON data', // Input prompt
    isRequired: true,
    Description: 'Used to set local static JSON data',
  },
  remote: {
    type: 'url',
    title: 'Remote JSON Data',
    default: 'http://xxx', // Default value
    placeholder: 'Please enter the address of the remote JSON data source', // Input prompt
    isRequired: true,
    Description: 'Used to set the request address for retrieving element data',
  },
};

/** Render the content of dataSelect */
const getTypeSelectCont = (params: BaseRendererProps) => (
  <SelectFormSchema {...params} />
);

/** DataSource type rendering component */
const DataSourceSchema = (props: BaseRendererProps) => {
  const { jsonKey, indexRoute, nodeKey, targetJsonSchema } = props;
  const curType = targetJsonSchema.type;
  const dataJsonObj = targetJsonSchema.properties.data || {};

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
        className={'dataSource-type-item-schema schema-item-form'}
        id={`${nodeKey}-type`}
        key={`${nodeKey}-type`}
        // indexRoute={indexRoute ? `${indexRoute}-0` : '0'}
        // jsonKey={'type'}
        disabled={true}
        title={getTypeSelectCont({
          ...props,
          indexRoute: indexRoute ? `${indexRoute}-0` : '0',
          jsonKey: 'type',
          targetJsonSchema: targetJsonSchema.properties.type,
          parentType: curType,
          nodeKey: `${nodeKey}-type`,
          typeSelectData,
        })}
      ></TreeNode>
      <TreeNode
        className={'dataSource-data-item-schema schema-item-form'}
        id={`${nodeKey}-data-${dataJsonObj.type}`}
        key={`${nodeKey}-data-${dataJsonObj.type}`}
        // indexRoute={indexRoute ? `${indexRoute}-1` : '1'}
        // jsonKey={'data'}
        disabled={true}
        title={getTreeNodeTitleCont({
          ...props,
          indexRoute: indexRoute ? `${indexRoute}-1` : '1',
          jsonKey: 'data',
          targetJsonSchema: dataJsonObj,
          parentType: curType,
          nodeKey: `${nodeKey}-data-${dataJsonObj.type}`,
          hideOperaBtn: true,
          keyIsFixed: true,
          typeIsFixed: true,
        })}
      ></TreeNode>
      <TreeNode
        className={'dataSource-filter-item-schema schema-item-form'}
        id={`${nodeKey}-filter`}
        key={`${nodeKey}-filter`}
        // indexRoute={indexRoute ? `${indexRoute}-2` : '2'}
        // jsonKey={'filter'}
        disabled={true}
        title={getTreeNodeTitleCont({
          ...props,
          indexRoute: indexRoute ? `${indexRoute}-2` : '2',
          jsonKey: 'filter',
          targetJsonSchema: targetJsonSchema.properties.filter,
          parentType: curType,
          nodeKey: `${nodeKey}-filter`,
          hideOperaBtn: true,
          keyIsFixed: true,
          typeIsFixed: true,
        })}
      ></TreeNode>
    </TreeNode>
  );
};

export default DataSourceSchema;
