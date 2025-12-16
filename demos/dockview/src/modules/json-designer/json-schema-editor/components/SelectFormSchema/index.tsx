import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Input, Select } from 'antd';
const { Option } = Select;
import {
  getNextIndexRoute,
  getParentIndexRoute,
  EventTypeDataList,
} from '@wibetter/json-utils';
import { BaseRendererProps } from '$types/index';
import './index.scss';

/** Primarily used for rendering elements of typeSelect type */
/* Note: Only the default option in the SelectFormSchema component is editable (providing a selection list). */
class SelectFormSchema extends React.PureComponent<BaseRendererProps> {
  constructor(props: BaseRendererProps) {
    super(props);
    this.typeChange = this.typeChange.bind(this);
  }

  /** Data source type change event handler */
  typeChange = (newType: string) => {
    const { editSchemaData, updateSchemaData } = this.props.schemaStore || {};
    const { indexRoute, jsonKey, targetJsonSchema, typeSelectData } =
      this.props;
    if (targetJsonSchema.default === newType) return; // If the default value has not changed, exit directly.
    editSchemaData(indexRoute || '', jsonKey, {
      default: newType,
    });

    // Determine whether special handling is needed when the type changes (e.g., the data content of data in the dataSource type needs to be adjusted).
    if (typeSelectData) {
      const newDataJSONObj = (typeSelectData as any)[newType];
      if (newDataJSONObj && targetJsonSchema.title === 'Data Source Type') {
        // Get the path value of the next child element based on indexRoute
        const nextIndexRoute = getNextIndexRoute(indexRoute);
        // Update the data in targetJsonSchema.properties.data when the type changes.
        editSchemaData(nextIndexRoute, 'data', newDataJSONObj);
      }
    }
    // Special handling for event types
    if (EventTypeDataList) {
      const newEventJSONObj = (EventTypeDataList as any)[newType];
      if (targetJsonSchema.title === 'Event Type' && newEventJSONObj) {
        // Get the path value of the next child element based on indexRoute
        const parentIndexRoute = getParentIndexRoute(indexRoute);
        // Update the parent element's JSON data when the type changes.
        updateSchemaData(parentIndexRoute, newEventJSONObj);
      }
    }
  };

  render() {
    const { nodeKey, targetJsonSchema } = this.props;
    const curType = targetJsonSchema.type;
    const options = targetJsonSchema.options || [];

    return (
      <div className="typeSelect-schema-box" id={nodeKey}>
        <div className="key-input-item">
          <Select
            defaultValue={targetJsonSchema.default || 'local'}
            onChange={this.typeChange}
          >
            {options.map((optionItem: any, optionIndex: number) => (
              <Option key={optionIndex} value={optionItem.value}>
                {optionItem.label || optionItem.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="type-select-item">
          <Select defaultValue={curType} style={{ width: 120 }} disabled={true}>
            <Option key={curType} value={curType}>
              {curType}
            </Option>
          </Select>
        </div>
        <div className="title-input-item">
          <Input defaultValue={targetJsonSchema.title} disabled={true} />
        </div>
        <div className="operate-item">&nbsp;</div>
      </div>
    );
  }
}

export default inject((stores: any) => ({
  schemaStore: stores.schemaStore,
}))(observer(SelectFormSchema));
