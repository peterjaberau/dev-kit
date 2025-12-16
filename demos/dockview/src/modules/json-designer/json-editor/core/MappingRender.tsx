import React from 'react';
import {
  evalExpression,
  getParentKeyRoute,
  isString,
  isBoolean,
} from '@wibetter/json-utils';
// import {omit} from 'lodash';
import { hasProperties } from '$utils/index';
// Import the built-in renderer
import '$renderers/index';
// Import custom renderer
import '$customRenderers/index';
import { renderersMap } from '$core/factory';
import InputFormSchema from '$renderers/InputFormSchema';
import { BaseRendererProps } from '$types/index';

/** Select the corresponding component for rendering based on the current type */
const MappingRender = (props: BaseRendererProps): React.ReactElement | null => {
  const { schemaStore, jsonStore } = props;
  const { getJSONDataByKeyRoute, JSONEditorObj } = jsonStore || {};
  const { nodeKey, keyRoute, targetJsonSchema, rendererType } = props;

  if (!targetJsonSchema) {
    return null;
  }

  // Supports explicit and implicit attribute expressions
  const parentKeyRoute = keyRoute && getParentKeyRoute(keyRoute);
  const parentData =
    parentKeyRoute && getJSONDataByKeyRoute
      ? getJSONDataByKeyRoute(parentKeyRoute) || {}
      : {}; // Get the current parent data field
  const curData = Object.assign({}, JSONEditorObj || {}, parentData);

  if (
    hasProperties(targetJsonSchema.onShow) &&
    targetJsonSchema.onShow !== '' &&
    (targetJsonSchema.onShow === 'false' ||
      (isBoolean(targetJsonSchema.onShow) && !targetJsonSchema.onShow) ||
      (isString(targetJsonSchema.onShow) &&
        !evalExpression(targetJsonSchema.onShow, curData)))
  ) {
    return null;
  }

  const curType =
    rendererType ||
    (targetJsonSchema.typeOn
      ? evalExpression(targetJsonSchema.typeOn, curData)
      : targetJsonSchema.type);
  let curNodeKey = nodeKey;

  // Collect all current condition subfields
  /*
  const curData = getJSONDataByKeyRoute(keyRoute) || {};
  const curConditionValue = schema2conditionValue(targetJsonSchema, curData);
  // Use the value of the condition field as part of the key
  if (curConditionValue) {
    curNodeKey = `${nodeKey}-${curConditionValue}`;
  }
  */

  const newProps: BaseRendererProps = {
    ...props,
    nodeKey: curNodeKey,
    key: curNodeKey,
    renderChild: (thisProps: BaseRendererProps) =>
      MappingRender({
        ...thisProps,
        schemaStore,
        jsonStore,
      }),
  };

  const JSONEditorFormSchema = renderersMap[curType] || InputFormSchema;

  return <JSONEditorFormSchema {...newProps} />;
};

export default MappingRender;
