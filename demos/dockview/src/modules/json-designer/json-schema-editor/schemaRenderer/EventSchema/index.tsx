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

/** Event type rendering component */
const EventSchema = (props: BaseRendererProps) => {
  const { jsonKey, indexRoute, nodeKey, targetJsonSchema } = props;
  const curType = targetJsonSchema.type;
  const typeJsonObj = targetJsonSchema.properties.type || {};
  // Data object for registering type events
  const registerJsonObj = targetJsonSchema.properties.register || {};
  const actionFuncJsonObj = targetJsonSchema.properties.actionFunc || {};
  // Data object of the event type
  const triggerJsonObj = targetJsonSchema.properties.trigger || {};
  const eventDataJsonObj = targetJsonSchema.properties.eventData || {};

  return (
    <TreeNode
      className={`${curType}-schema schema-item-form`}
      id={nodeKey}
      key={nodeKey}
      //indexRoute={indexRoute}
      // jsonKey={jsonKey}
      title={getTreeNodeTitleCont({
        ...props,
      })}
    >
      <TreeNode
        className={'event-type-item-schema schema-item-form'}
        id={`${nodeKey}-type`}
        key={`${nodeKey}-type`}
        // indexRoute={indexRoute ? `${indexRoute}-0` : '0'}
        // jsonKey={'type'}
        disabled={true}
        title={getTypeSelectCont({
          ...props,
          indexRoute: indexRoute ? `${indexRoute}-0` : '0',
          jsonKey: 'type',
          targetJsonSchema: typeJsonObj,
          parentType: curType,
          nodeKey: `${nodeKey}-type`,
        })}
      ></TreeNode>
      {typeJsonObj.default === 'on' && registerJsonObj && (
        <TreeNode
          className={'event-register-item-schema schema-item-form'}
          id={`${nodeKey}-register-${typeJsonObj.default}`}
          key={`${nodeKey}-register-${typeJsonObj.default}`}
          // indexRoute={indexRoute ? `${indexRoute}-1` : '1'}
          // jsonKey={'register'}
          disabled={true}
          title={getTreeNodeTitleCont({
            ...props,
            indexRoute: indexRoute ? `${indexRoute}-1` : '1',
            jsonKey: 'register',
            targetJsonSchema: registerJsonObj,
            parentType: curType,
            nodeKey: `${nodeKey}-register-${typeJsonObj.default}`,
            hideOperaBtn: true,
            keyIsFixed: true,
            typeIsFixed: true,
          })}
        ></TreeNode>
      )}
      {typeJsonObj.default === 'on' && actionFuncJsonObj && (
        <TreeNode
          className={'event-actionFunc-item-schema schema-item-form'}
          id={`${nodeKey}-actionFunc-${typeJsonObj.default}`}
          key={`${nodeKey}-actionFunc-${typeJsonObj.default}`}
          // indexRoute={indexRoute ? `${indexRoute}-2` : '2'}
          // jsonKey={'actionFunc'}
          disabled={true}
          title={getTreeNodeTitleCont({
            ...props,
            indexRoute: indexRoute ? `${indexRoute}-2` : '2',
            jsonKey: 'actionFunc',
            targetJsonSchema: actionFuncJsonObj,
            parentType: curType,
            nodeKey: `${nodeKey}-actionFunc-${typeJsonObj.default}`,
            hideOperaBtn: true,
            keyIsFixed: true,
            typeIsFixed: true,
          })}
        ></TreeNode>
      )}
      {typeJsonObj.default === 'emit' && triggerJsonObj && (
        <TreeNode
          className={'event-trigger-item-schema schema-item-form'}
          id={`${nodeKey}-trigger-${typeJsonObj.default}`}
          key={`${nodeKey}-trigger-${typeJsonObj.default}`}
          // indexRoute={indexRoute ? `${indexRoute}-1` : '1'}
          // jsonKey={'trigger'}
          disabled={true}
          title={getTreeNodeTitleCont({
            ...props,
            indexRoute: indexRoute ? `${indexRoute}-1` : '1',
            jsonKey: 'trigger',
            targetJsonSchema: triggerJsonObj,
            parentType: curType,
            nodeKey: `${nodeKey}-trigger-${typeJsonObj.default}`,
            hideOperaBtn: true,
            keyIsFixed: true,
            typeIsFixed: true,
          })}
        ></TreeNode>
      )}
      {typeJsonObj.default === 'emit' && eventDataJsonObj && (
        <TreeNode
          className={'event-eventData-item-schema schema-item-form'}
          id={`${nodeKey}-eventData-${typeJsonObj.default}`}
          key={`${nodeKey}-eventData-${typeJsonObj.default}`}
          //indexRoute={indexRoute ? `${indexRoute}-2` : '2'}
          // jsonKey={'eventData'}
          disabled={true}
          title={getTreeNodeTitleCont({
            ...props,
            indexRoute: indexRoute ? `${indexRoute}-2` : '2',
            jsonKey: 'eventData',
            targetJsonSchema: eventDataJsonObj,
            parentType: curType,
            nodeKey: `${nodeKey}-eventData-${typeJsonObj.default}`,
            hideOperaBtn: true,
            keyIsFixed: true,
            typeIsFixed: true,
          })}
        ></TreeNode>
      )}
    </TreeNode>
  );
};

export default EventSchema;
