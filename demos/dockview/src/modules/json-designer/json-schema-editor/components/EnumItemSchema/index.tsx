import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Input, message, Select, Tooltip } from 'antd';
const { Option } = Select;
import { PlusOutlined, CloseOutlined, CopyOutlined } from '@ant-design/icons';
import { BaseRendererProps } from '$types/index';
import './index.scss';

class EnumItemSchema extends React.PureComponent<BaseRendererProps> {
  constructor(props: BaseRendererProps) {
    super(props);
    // Binding here is necessary so that `this` can be used in the callback function.
    this.onAddBtnEvent = this.onAddBtnEvent.bind(this);
    this.onCopyBtnEvent = this.onCopyBtnEvent.bind(this);
    this.onDeleteBtnEvent = this.onDeleteBtnEvent.bind(this);
    this.handleEnumKeyChange = this.handleEnumKeyChange.bind(this);
    this.handleEnumTextChange = this.handleEnumTextChange.bind(this);
  }

  /** jsonKey type input value change event handler */
  handleEnumKeyChange = (event: any) => {
    const { value } = event.target;
    const { indexRoute, enumIndex, enumKey } = this.props;
    const { isExitEnumKey, updateEnumKey } = this.props.schemaStore || {};
    if (value !== enumKey) {
      if (isExitEnumKey(indexRoute, enumIndex, value)) {
        message.warning('Sorry, a duplicate key exists. Please edit it again.');
      } else {
        updateEnumKey(indexRoute, enumIndex, value); // Update enumeration value
      }
    }
  };

  /** Handler for changes to the input value of enumText type */
  handleEnumTextChange = (event: any) => {
    const { value } = event.target;
    const { indexRoute, enumIndex, enumText } = this.props;
    const { updateEnumText } = this.props.schemaStore || {};
    if (value !== enumText) {
      updateEnumText(indexRoute, enumIndex, value); // Update enumeration value
    }
  };

  /** Add new options */
  onAddBtnEvent = () => {
    const { indexRoute, enumIndex } = this.props;
    const { addEnumItem } = this.props.schemaStore || {};
    addEnumItem(indexRoute, enumIndex); // Add an enumeration value
  };

  /** Copy function */
  onCopyBtnEvent = () => {
    const { indexRoute, enumIndex } = this.props;
    const { copyEnumItem } = this.props.schemaStore || {};
    copyEnumItem(indexRoute, enumIndex); // copy枚举值
  };

  /** Delete field item */
  onDeleteBtnEvent = () => {
    const { getSchemaByIndexRoute, deleteEnumItem } =
    this.props.schemaStore || {};
    const { indexRoute, enumIndex } = this.props;
    const itemJSONObj = getSchemaByIndexRoute(indexRoute);
    if (itemJSONObj.enum && itemJSONObj.enum.length > 1) {
      deleteEnumItem(indexRoute, enumIndex); // Deletes the enum item at the specified position.
    } else {
      message.warning('Deletion failed. Please keep at least one option.');
    }
  };

  render() {
    const { enumKey, enumText, enumNodeKey } = this.props;

    return (
      <div className="enum-schema-box" id={enumNodeKey}>
        <div className="key-input-item">
          <Input
            defaultValue={enumKey}
            onPressEnter={this.handleEnumKeyChange}
            onBlur={this.handleEnumKeyChange}
          />
        </div>
        <div className="type-select-item">
          <Select defaultValue="string" style={{ width: 120 }}>
            <Option key="string" value="string">
              string
            </Option>
          </Select>
        </div>
        <div className="title-input-item">
          <Input
            defaultValue={enumText}
            onPressEnter={this.handleEnumTextChange}
            onBlur={this.handleEnumTextChange}
          />
        </div>
        <div className="operate-item">
          <Tooltip title="Delete">
            <CloseOutlined
              className="operate-btn delete-operate"
              onClick={this.onDeleteBtnEvent}
            />
          </Tooltip>
          <Tooltip title="Add optional">
            <PlusOutlined
              className="operate-btn"
              onClick={this.onAddBtnEvent}
            />
          </Tooltip>
          <Tooltip title="Copy">
            <CopyOutlined
              className="operate-btn"
              onClick={this.onCopyBtnEvent}
            />
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default inject((stores: any) => ({
  schemaStore: stores.schemaStore,
}))(observer(EnumItemSchema));
