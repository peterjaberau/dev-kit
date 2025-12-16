import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Tree, message } from 'antd';
import ObjectSchema from '$schemaRenderer/ObjectSchema/index';
import MappingRender from '$schemaRenderer/MappingRender';
import { isEqual, saveWebCacheData, getWebCacheData } from '$utils/index';
import JsonView from '$components/JsonView';
import {
  getParentIndexRoute,
  isEmptySchema,
  isSameParent,
  getCurPosition,
  moveForward,
} from '@wibetter/json-utils';
import { BaseRendererProps } from '$types/index';
import './index.scss';

class JSONSchema extends React.PureComponent<BaseRendererProps> {
  constructor(props: BaseRendererProps) {
    super(props);
    const { initJSONSchemaData, initOnChange, initSchemaTypeList } =
    this.props.schemaStore || {};

    // Initialize jsonSchema based on props.data
    if (props.data) {
      initJSONSchemaData(props.data);
    }
    // Record the onChange event
    if (props.onChange) {
      initOnChange(props.onChange);
    }
    // Reset TypeList
    if (props.typeList) {
      initSchemaTypeList(props.typeList);
    }
  }

  componentWillReceiveProps(nextProps: BaseRendererProps) {
    const { initJSONSchemaData, initOnChange, initSchemaTypeList } =
    this.props.schemaStore || {};
    if (!isEqual(nextProps.data, this.props.data)) {
      initJSONSchemaData(nextProps.data);
    }
    // Record the onChange event
    if (!isEqual(nextProps.onChange, this.props.onChange)) {
      initOnChange(nextProps.onChange);
    }
    // Reset TypeList
    if (!isEqual(nextProps.typeList, this.props.typeList)) {
      initSchemaTypeList(nextProps.typeList);
    }
  }

  /**
   * Drag-and-drop related methods: Events triggered when dragging begins.
   */
  onDragStart = (eventData: any) => {
    const { getSchemaByIndexRoute } = this.props.schemaStore || {};
    const { node } = eventData;
    const curIndexRoute = node.indexRoute;
    const curJsonObj = getSchemaByIndexRoute(curIndexRoute);
    if (curJsonObj.isFixed) {
      message.warning('Drag and drop is not supported for this element.');
    }
  };

  /**
   * Drag-and-drop related methods: Events triggered when the drag is complete.
   */
  onDrop = (eventData: any) => {
    /**
     * dragNode: The dragged element
     * node: The element at the target location of the drag.
     Determining the insertion position based on the dropPosition value in eventData can be inaccurate.
     * */
    const { dragNode, node } = eventData;
    const {
      getSchemaByIndexRoute,
      indexRoute2keyRoute,
      insertJsonData,
      deleteJsonByIndex,
      isExitJsonKey,
      isSupportCurType,
    } = this.props.schemaStore || {};

    // Drag element key
    const curIndexRoute = dragNode.indexRoute;
    const curJsonKey = dragNode.jsonKey;
    // Get the currently dragged element
    const curJsonObj = getSchemaByIndexRoute(curIndexRoute);
    if (curJsonObj.isFixed) return; // Fixed-type elements cannot be dragged.

    // Place the target element key
    let targetIndexRoute = node.indexRoute;

    // Check if they are from the same parent container
    const isSameParentElem = isSameParent(curIndexRoute, targetIndexRoute);
    // Determine the order of appearance
    const curPosition = getCurPosition(curIndexRoute, targetIndexRoute);

    if (isSameParentElem) {
      /** Drag and drop interaction of sibling elements */
    /* Note: 1. Drag and drop between sibling elements does not need to consider whether there are duplicate key names;
    * 2. Delete before inserting to avoid duplicate name errors during insertion;
    * */
      // First delete the currently dragged element
      deleteJsonByIndex(curIndexRoute, true); // Setting it to true indicates skipping onChange
      // If curPosition === 'before', a shift operation is required after deletion.
      if (curPosition === 'before') {
        /**
         * When the dragged element is in front and the target element is behind,
         Deleting a dragged element first will cause the targetIndexRoute to shift, which needs to be moved forward one position to correct it (so that the previous target element can still be accessed).
         */
        targetIndexRoute = moveForward(targetIndexRoute);
      }
      if (node.dragOverGapTop) {
        /** Drag and drop to the front of the target element */
        insertJsonData(targetIndexRoute, curJsonKey, curJsonObj, 'before');
      } else if (node.dragOver || node.dragOverGapBottom) {
        /** Drag to the current position of the target element; without swapping positions, it is considered as dragging to the back of the target element. */
        insertJsonData(targetIndexRoute, curJsonKey, curJsonObj);
      }
    } else {
      /** Drag and drop interaction between non-sibling elements */
        // Check if there is a duplicate jsonKey name (duplicate names may occur when dragging non-sibling elements).
      const isExitJsonKey_ = isExitJsonKey(targetIndexRoute, curJsonKey);
      if (isExitJsonKey_) {
        message.warning('An element with the same name exists at the target location');
        return;
      }
      const curType = curJsonObj.type;
      const isSupportCurType_ = isSupportCurType(targetIndexRoute, curType);
      if (!isSupportCurType_) {
        message.warning(`The target location does not support elements of type ${curType}`);
        return;
      }

      // When dragging across levels
      const curKeyRoute = indexRoute2keyRoute(curIndexRoute);
      const targetParentIndexRoute = getParentIndexRoute(targetIndexRoute);
      // First get the original path of the dragged element
      const cacheKeyRoute = getWebCacheData(`${curKeyRoute}-${curType}`);
      saveWebCacheData(
        `${indexRoute2keyRoute(
          targetParentIndexRoute,
        )}-${curJsonKey}-${curType}`,
        cacheKeyRoute || curKeyRoute,
      );

      // Delete non-sibling elements after dragging
      if (node.dragOverGapTop) {
        /** Drag and drop to the front of the target element */
        if (curPosition === 'after') {
          deleteJsonByIndex(curIndexRoute, true); // Setting it to true indicates skipping onChange
          insertJsonData(targetIndexRoute, curJsonKey, curJsonObj, 'before');
        } else {
          // curPosition === 'before'
          insertJsonData(
            targetIndexRoute,
            curJsonKey,
            curJsonObj,
            'before',
            true,
          )
            // Setting it to true indicates skipping onChange
            deleteJsonByIndex(curIndexRoute);
        }
      } else if (node.dragOver || node.dragOverGapBottom) {
        /** Drag to the current position of the target element; without swapping positions, it is considered as dragging to the back of the target element. */
        if (curPosition === 'after') {
          deleteJsonByIndex(curIndexRoute, true); // Setting it to true indicates skipping onChange
          insertJsonData(targetIndexRoute, curJsonKey, curJsonObj);
        } else {
          // curPosition === 'before'
          insertJsonData(targetIndexRoute, curJsonKey, curJsonObj, '', true); // Setting it to true indicates skipping onChange
          deleteJsonByIndex(curIndexRoute);
        }
      }
    }
  };

  /**
   * The second-level schema panel expands by default.
   */
  catchExpandedKeys = (jsonSchema: any) => {
    const defaultExpandedKeys: string[] = [];
    if (jsonSchema && jsonSchema.propertyOrder && jsonSchema.properties) {
      jsonSchema.propertyOrder.map((key: string, index: number) => {
        /** 1. Get the key value of the current element */
        const currentJsonKey = key;
        /** 2. Retrieve the JSON data object of the current element */
        const currentSchemaData = jsonSchema.properties[currentJsonKey];
        /** 3. Determine if it is a container element; if so, disable selection. */
        const curType = currentSchemaData.type;
        /** 4. Get the ID of the current element, used as a unique identifier */
        let nodeKey = `${curType}-${currentJsonKey}`; // Use the current format + jsonKey as nodeKey
        defaultExpandedKeys.push(nodeKey);
      });
    }
    return defaultExpandedKeys;
  };

  render() {
    const { jsonView, jsonViewReadOnly } = this.props;
    const { jsonSchema, schemaChange } = this.props.schemaStore || {};
    const isEmpty = isEmptySchema(jsonSchema);
    const curType = jsonSchema.type;
    /**
     * Note: The object is rendered separately here mainly to extract the Tree root component (so that drag events can be handled here).
     * First-level fields in a JSON Schema must be of type object (to avoid invalid JSON Schema data and JSON Schema data with a simple structure).
     * We will consider how to make it compatible with single-structure JSONSchema data separately later.
     * */
    return (
      <div className="json-schema-container">
        {!isEmpty && !jsonView && (
          <>
            <Tree
              draggable={true}
              selectable={false}
              onDragStart={this.onDragStart}
              onDrop={this.onDrop}
              defaultExpandedKeys={
                curType === 'object' && !isEmpty
                  ? this.catchExpandedKeys(jsonSchema)
                  : []
              }
            >
              {curType === 'object' &&
                ObjectSchema({
                  ...this.props,
                  parentType: '',
                  jsonKey: '',
                  indexRoute: '',
                  nodeKey: '',
                  targetJsonSchema: jsonSchema,
                  isOnlyShowChild: true, // First-level object types are not displayed; only their child items are shown.
                })}
              {curType !== 'object' &&
                MappingRender({
                  ...this.props,
                  parentType: '',
                  jsonKey: '',
                  indexRoute: '',
                  nodeKey: 'first-schema',
                  targetJsonSchema: jsonSchema,
                  key: 'schema',
                  isFirstSchema: true,
                })}
            </Tree>
          </>
        )}
        {!isEmpty && jsonView && (
          <JsonView
            jsonData={jsonSchema}
            readOnly={jsonViewReadOnly ?? true}
            maxLines={25}
            onChange={schemaChange}
          />
        )}
        {isEmpty && (
          <p className="json-schema-empty">The current jsonSchema contains no data</p>
        )}
      </div>
    );
  }
}

export default inject((stores: any) => ({
  schemaStore: stores.schemaStore,
}))(observer(JSONSchema));
