/**
 * General functional components
 * Provides operations related to key value editing, type selection list, title editing, adding, copying, deleting, data item sorting, and advanced settings.
 */
 import * as React from 'react';
 import { inject, observer } from 'mobx-react';
 import { Input, message, Select, Modal, Button, Tooltip } from 'antd';
 const { Option } = Select;
 import {
 PlusOutlined,
 CloseOutlined,
 CopyOutlined,
 DragOutlined,
 SettingOutlined,
 SortAscendingOutlined,
 } from '@ant-design/icons';
 import AdvanceConfig from '$components/AdvanceConfig/index'; // Advanced configuration content
 import {
 isContainerSchema,
 getParentIndexRoute,
 TypeDataList,
 } from '@wibetter/json-utils';
 import { objClone, saveWebCacheData } from '$utils/index';
 import { TypeInfoList } from '$data/TypeList';
 import { BaseRendererProps } from '$types/index';
 import './index.scss';

 /**
 * Basic Configuration
 * 1. Regarding special attributes in the schema:
 * 1) isFixed indicates that the current element is fixed and cannot be copied, dragged, or deleted;
 * 2) When the parent element isContainer is false, the current element does not support operations such as adding, copying, deleting, and dragging. The visibility of advanced operation icons is controlled separately.
 */

 interface BaseFormSchemaState {
 showAdvanceConfig: boolean;
 }

 class BaseFormSchema extends React.PureComponent<
 BaseRendererProps,
 BaseFormSchemaState
 > {
 constructor(props: BaseRendererProps) {
 super(props);
 this.state = {
 showAdvanceConfig: false,
 };
 // Binding here is necessary so that `this` can be used in the callback function.
 this.onAddBtnEvent = this.onAddBtnEvent.bind(this);
 this.onCopyBtnEvent = this.onCopyBtnEvent.bind(this);
 this.onDeleteBtnEvent = this.onDeleteBtnEvent.bind(this);
 this.handleJsonKeyChange = this.handleJsonKeyChange.bind(this);
 this.handleTitleChange = this.handleTitleChange.bind(this);
 this.handleTypeChange = this.handleTypeChange.bind(this);
 this.childElemSort = this.childElemSort.bind(this);
 }

 /** Select type change event handler */
handleTypeChange = (newType: string) => {
  const { changeType } = this.props.schemaStore || {};
  const { indexRoute, jsonKey, targetJsonSchema } = this.props;
  if (targetJsonSchema.type === newType) return; // If the format value has not changed, exit immediately.

  // Retrieve initialized object data based on the current new type
  const newTypeData = TypeDataList[newType];
  changeType(indexRoute, jsonKey, newTypeData, targetJsonSchema);
};

/** jsonKey type input value change event handler */
handleJsonKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { editJsonKey, isExitJsonKey } = this.props.schemaStore || {};
  const { value } = event.target;
  const { indexRoute, jsonKey } = this.props;
  if (jsonKey === value) return; // If the jsonKey value has not changed, exit immediately.
  if (isExitJsonKey(indexRoute, value)) {
    message.warning('The current key already exists, please choose another one.');
    return;
  }
  editJsonKey(indexRoute, value);
};

/** Event handler for changes in title type input value */
handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { editSchemaData } = this.props.schemaStore || {};
  const { value } = event.target;
  const { indexRoute, jsonKey, targetJsonSchema } = this.props;
  if (targetJsonSchema.title === value) return; // If the title value hasn't changed, exit immediately.
  editSchemaData(indexRoute, jsonKey, {
    title: value,
  });
};

/** Get the list of types for the current field */
/* The range of selectable types for the current field is determined by the type of the parent element. If the parent type is empty, a completely new selectable type will be used by default.*/
getCurrentTypeList = (parentType: string) => {
  const { SchemaTypeList } = this.props.schemaStore || {};
  const myParentType = parentType || 'all';
  let typeList = SchemaTypeList[myParentType];
  if (!typeList || typeList.length === 0) {
    typeList = SchemaTypeList.all; // If the current type list is empty, all field types will be displayed by default.
  }
  return typeList;
};

/** Add a new field item
 * Note: If the current field is a container type, add a child field item to it; if it is a primitive type, add a sibling node field item to it. */
onAddBtnEvent = () => {
  const { addChildJson, addNextJsonData } = this.props.schemaStore || {};
  const { indexRoute, targetJsonSchema } = this.props;

  if (isContainerSchema(targetJsonSchema)) {
    // Indicates that the current field is a container type.
    addChildJson(indexRoute);
  } else {
    // Insert sibling node
    addNextJsonData(indexRoute);
  }
};

/** Copy function
 *Note: A key value needs to be automatically generated.*/
onCopyBtnEvent = () => {
  const { indexRoute, targetJsonSchema, jsonKey } = this.props;
  const {
    getSchemaByIndexRoute,
    indexRoute2keyRoute,
    insertJsonData,
    getNewJsonKeyIndex,
  } = this.props.schemaStore || {};
  const newJsonData = objClone(targetJsonSchema);
  // 1. Get the parent element
  const parentIndexRoute = getParentIndexRoute(indexRoute);
  const parentJSONObj = getSchemaByIndexRoute(parentIndexRoute);
  // 2. Generate a new key value
  const newJsonKey = getNewJsonKeyIndex(parentJSONObj, jsonKey);
  // 3. Record the path value of the data source when copying (Note: Only keep the most recent copy value source).
  const curType = targetJsonSchema.type;
  saveWebCacheData(
    `${indexRoute2keyRoute(parentIndexRoute)}-${newJsonKey}-${curType}`,
    indexRoute2keyRoute(indexRoute),
  );
  // 4. Insert copied JSON data
  insertJsonData(indexRoute, newJsonKey, newJsonData);
};

/** Delete field item */
onDeleteBtnEvent = () => {
  const { jsonKey, indexRoute } = this.props;
  const { deleteJsonByIndex_CurKey } = this.props.schemaStore || {};
  deleteJsonByIndex_CurKey(indexRoute, jsonKey); // Delete the corresponding JSON data object
};

/** Intercept drag and drop events */
ignoreDragEvent = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

/** Data item sorting function */
childElemSort = () => {
  const { indexRoute } = this.props;
  const { childElemSort } = this.props.schemaStore || {};
  childElemSort(indexRoute);
};

render() {
  const { getSchemaByIndexRoute } = this.props.schemaStore || {};
  const { parentType, indexRoute, jsonKey, nodeKey, targetJsonSchema } =
    this.props;
  const { showAdvanceConfig } = this.state;
  // Get the parent element
  const parentIndexRoute = indexRoute ? getParentIndexRoute(indexRoute) : '';
  const parentSchemaObj = parentIndexRoute
    ?getSchemaByIndexRoute(parentIndexRoute)
    : {};
  const parentIsContainer =
    (parentSchemaObj && parentSchemaObj.isContainer) ?? true; // Determines if the parent element is a container element (by default, all elements are container elements)

  const isFixed = targetJsonSchema.isFixed || this.props.isFixed || false;
  // readOnly: Whether it is an inherent property (uneditable, uneditable) // Whether it is in an uneditable state, the default is an editable state for deletion, used to control whether the json-editor is editable.
  const readOnly = this.props.readOnly || targetJsonSchema.readOnly || false;
  const keyIsFixed =
    this.props.keyIsFixed !== undefined
      ? this.props.keyIsFixed
      : !parentIsContainer || isFixed; // Check if the key is a non-editable property
  const typeIsFixed =
    `this.props.typeIsFixed !== undefined ? this.props.typeIsFixed : isFixed;` // Check if the `type` property is uneditable.
  const titleIsFixed =
    `this.props.titleIsFixed !== undefined ? this.props.titleIsFixed : isFixed;` // Check if the title property is uneditable.
  const hideOperaBtn = this.props.hideOperaBtn || !parentIsContainer; // Whether to hide the operation class button

  const showAdvanceBtn = this.props.showAdvanceBtn ?? true; // Used to individually control the visibility of the advanced configuration button (currently only required by QuantitySchema)
  const currentTypeList = this.getCurrentTypeList(parentType); // Get the list of available types based on the parent element's type.
  const curType = targetJsonSchema.type;
  const isContainerElem = isContainerSchema(targetJsonSchema); // Determine if an element is a container type

  return (
    <>
    {targetJsonSchema && (
      <div className="base-schema-box" id={nodeKey}>
        <div
          className="key-input-item"
          draggable="true"
          onDragStart={this.ignoreDragEvent}
        >
          <Input
            defaultValue={jsonKey || 'key value does not exist'}
            disabled={keyIsFixed}
            // onPressEnter={this.handleJsonKeyChange}
            onBlur={this.handleJsonKeyChange}
          />
        </div>
        <div
          className="type-select-item"
          draggable="true"
          onDragStart={this.ignoreDragEvent}
        >
          <Select
            showSearch
            defaultValue={curType}
            style={{ width: 150 }}
            onChange={this.handleTypeChange}
            disabled={typeIsFixed}
            filterOption={(inputValue: string, option: any) => {
              if (
                (option && option.value.indexOf(inputValue) > -1) ||
                (option.children &&
                  option.children.indexOf(inputValue) > -1)
              ) {
                return true;
              }
              return false;
            }}
          >
            {currentTypeList.map((item: string) => (
              <Option key={item} value={item}>
                {(TypeInfoList as any)[item] || item}
              </Option>
            ))}
          </Select>
        </div>
        <div
          className="title-input-item"
          draggable="true"
          onDragStart={this.ignoreDragEvent}
        >
          <Input
            defaultValue={targetJsonSchema.title}
            disabled={titleIsFixed}
            //onPressEnter={this.handleTitleChange}
            onBlur={this.handleTitleChange}
          />
        </div>
        <div className="operate-item">
          {!hideOperaBtn && (
            <>
            {!isFid && (
              <Tooltip title="Delete">
                <CloseOutlined
                  className="operate-btn delete-operate"
                  onClick={this.onDeleteBtnEvent}
                />
              </Tooltip>
            )}
            <Tooltip
            title={isContainerElem ? 'Added Child Element' : 'Added Sibling Element'}
            >
            <PlusOutlined
              className="operate-btn"
              onClick={this.onAddBtnEvent}
            />
            </Tooltip>
          {/*  Automatic sorting function */}
          {isContainerElem && (
            <Tooltip title={'Data Item Sorting'}>
              <SortAscendingOutlined
              className="operate-btn"
              onClick={this.childElemSort}
              />
            </Tooltip>
          )}
          {!isFid && (
            <>
              <Tooltip title="Copy">
                <CopyOutlined
                  className="operate-btn"
                  onClick={this.onCopyBtnEvent}
                />
              </Tooltip>
              <Tooltip title="Hold and drag">
                <DragOutlined className="operate-btn drag-btn" />
              </Tooltip>
            </>
          )}
        </>
        )}
        {showAdvanceBtn && (
          <Tooltip title="Advanced Settings">
            <SettingOutlined
              className="operate-btn"
              onClick={() => {
                this.setState({
                  showAdvanceConfig: true,
                });
              }}
            />
          </Tooltip>
        )}
      </div>
    {showAdvanceConfig && (
      <Modal
      visible={true}
    title={`Advanced Settings/ Current Field: ${targetJsonSchema.title}(${jsonKey})`}
    onCancel={() => {
      this.setState({
        showAdvanceConfig: false,
      });
    }}
    footer={[
      <Button
      key="submit"
      type="primary"
      onClick={() => {
      this.setState({
      showAdvanceConfig: false,
    });
    }}
      >
      Save and close
      </Button>
      ]}
    >
    <AdvanceConfig
      {...{
        indexRoute,
        jsonKey,
        targetJsonSchema,
      }}
    />
    </Modal>
  )}
</div>
)}
{!targetJsonSchema && (
  <div className="base-schema-box">
    <div className="warn-text">{jsonKey}: Data element is empty</div>
  </div>
)}
</>
);
}
}

export default inject((stores: any) => ({
  schemaStore: stores.schemaStore,
}))(observer(BaseFormSchema));
