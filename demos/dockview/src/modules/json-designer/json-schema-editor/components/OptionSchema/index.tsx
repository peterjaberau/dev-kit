import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Input, message, Select, Tooltip } from 'antd';
const { Option } = Select;
import { PlusOutlined, CloseOutlined, CopyOutlined } from '@ant-design/icons';
import { isArray , isObject , isString } from ' @wibetter / json - utils ' ;
import { BaseRendererProps } from '$types/index';
import './index.scss';

class OptionSchema extends React.PureComponent<BaseRendererProps> {
  constructor(props: BaseRendererProps) {
    super(props);
    // Binding here is necessary so that `this` can be used in the callback function.
    this.onAddBtnEvent = this.onAddBtnEvent.bind(this);
    this.onCopyBtnEvent = this.onCopyBtnEvent.bind(this);
    this.onDeleteBtnEvent = this.onDeleteBtnEvent.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  /** Option Label Change Event Handler */
  handleLabelChange = (event: any) => {
    const { isExitOptionLabel, updateOptionLabel } =
    this.props.schemaStore || {};
    const { value } = event.target;
    const { indexRoute, optionIndex, optionLabel } = this.props;
    if (value !== optionLabel) {
      if (isExitOptionLabel(indexRoute, value)) {
        message.warning('Sorry, a label value already exists. Please set it again.');
      } else {
        updateOptionLabel(indexRoute, optionIndex, value);
      }
    }
  };

  /** Option value change event handler */
  handleValueChange = (event: any) => {
    const { updateOptionValue } = this.props.schemaStore || {};
    const { value } = event.target;
    const { indexRoute, optionIndex, optionValue } = this.props;
    if (value !== optionValue) {
      let curValue = value;
      if (isObject(optionValue) && isString(curValue)) {
        try {
          curValue = JSON.parse(curValue);
        } catch (error) {
          console.warn('option value conversion failed:', curValue);
          curValue = optionValue;
        }
      }
      updateOptionValue(indexRoute, optionIndex, curValue);
    }
  };

  /** Add new options */
  onAddBtnEvent = () => {
    const { addOptionItem } = this.props.schemaStore || {};
    const { indexRoute, optionIndex } = this.props;
    addOptionItem(indexRoute, optionIndex); // Add an enumeration value
  };

  /** Copy function */
  onCopyBtnEvent = () => {
    const { copyOptionItem } = this.props.schemaStore || {};
    const { indexRoute, optionIndex } = this.props;
    copyOptionItem(indexRoute, optionIndex); // copy枚举值
  };

  /** Delete field item */
  onDeleteBtnEvent = () => {
    const { getSchemaByIndexRoute, deleteOptionItem } =
    this.props.schemaStore || {};
    const { indexRoute, optionIndex } = this.props;
    // const itemJSONObj = getSchemaByIndexRoute(indexRoute);
    deleteOptionItem(indexRoute, optionIndex); // Deletes the enumeration value at the specified position.

    /*
    if (itemJSONObj.options && itemJSONObj.options.length > 1) {
      deleteOptionItem(indexRoute, optionIndex); // Deletes the enumeration value at the specified position.
    } else {
      message.warning('Deletion failed; at least one option must be retained.');
    }
    */
  };

  render() {
    const { optionLabel, optionValue, optionNodeKey } = this.props;

    let curOptionValue = optionValue;
    if (isObject(optionValue) || isArray(optionValue)) {
      curOptionValue = JSON.stringify(optionValue);
    }

    return (
      <div className="option-schema-box" id={optionLabel}>
        <div className="key-input-item">
          <Input
            defaultValue={curOptionValue}
            onPressEnter={this.handleValueChange}
            onBlur={this.handleValueChange}
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
            defaultValue={optionLabel}
            onPressEnter={this.handleLabelChange}
            onBlur={this.handleLabelChange}
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
}))(observer(OptionSchema));
