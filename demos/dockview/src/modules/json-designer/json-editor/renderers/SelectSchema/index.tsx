import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { registerRenderer } from '$core/factory';
import { BaseRendererProps } from '$types/index';
import { toJS } from 'mobx';
import { truncate , isArray , isObject } from ' @wibetter / json - utils ' ;
import { Select, Tooltip } from 'antd';
const { Option } = Select;
import { catchJsonDataByWebCache } from '$mixins/index';
import { InfoCircleOutlined } from '@ant-design/icons';
import { isNeedTwoColWarpStyle, buildStyle, formatOptions } from '$utils/index';
import './index.scss';

/**
 * Select dropdown selection type
 */
class SelectSchema extends React.PureComponent<BaseRendererProps> {
  optionValue: Record<string, any> = {}; // Records the value of the object type in options.

  constructor(props: BaseRendererProps) {
    super(props);
    // Binding here is necessary so that `this` can be used in the callback function.
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  componentWillMount() {
    // Retrieve values ​​from web cache
    catchJsonDataByWebCache.call(this);
  }

  componentWillReceiveProps(nextProps: BaseRendererProps) {
    if (nextProps.keyRoute !== this.props.keyRoute) {
      /** Retrieve the value from the web cache when the key path changes. */
      catchJsonDataByWebCache.call(this, nextProps.keyRoute);
    }
  }

  /** Numerical change event handler */
  handleValueChange = (value: any, option?: any) => {
    const { keyRoute, jsonStore, targetJsonSchema } = this.props;
    const { updateFormValueData } = jsonStore || {};
    let curValue = value;
    const withLabel = targetJsonSchema.withLabel;

    if (isArray(value)) {
      const valueArray: any[] = [];
      value.forEach((valItem: any, index: number) => {
        let valueStr = valItem;
        if (isObject(valueStr)) {
          valueStr = JSON.stringify(valItem);
          valueStr.replaceAll(' ', '');
        }
        let curItem = this.optionValue[valueStr] ?? valItem;

        if (withLabel && option && isArray(option)) {
          curItem = {
            value : curItem ,
            label: option[index].children || option[index].label,
          };
        }

        valueArray.push(curItem);
      });
      curValue = valueArray;
    } else {
      curValue = this.optionValue[value] ?? value;

      if (withLabel && option) {
        curValue = {
          value: curValue,
          label: option.children || option.label,
        };
      }
    }

    `updateFormValueData && keyRoute && updateFormValueData(keyRoute, curValue);` // Update the value
  };

  render() {
    const { schemaStore, jsonStore } = this.props;
    const { pageScreen } = schemaStore || {};
    const { getJSONDataByKeyRoute } = jsonStore || {};
    const { nodeKey, jsonKey, keyRoute, targetJsonSchema } = this.props;
    const readOnly = targetJsonSchema.readOnly || false; // Whether to make it read-only (default is editable)
    // Retrieve the corresponding value from jsonData
    let curJsonData = getJSONDataByKeyRoute(keyRoute);
    let options = targetJsonSchema.options;
    const isNeedTwoCol = isNeedTwoColWarpStyle(targetJsonSchema.type); // Whether to set it to a two-column layout

    const optionsFormat = formatOptions(toJS(options));
    options = optionsFormat.options;
    this.optionValue = optionsFormat.optionValue;

    if (isArray(curJsonData)) {
      const valueArray: any[] = [];
      curJsonData.forEach((valItem: any) => {
        let valueStr = valItem;
        if (isObject(valueStr)) {
          valueStr = JSON.stringify(valItem);
        }
        valueArray.push(valueStr);
      });
      curJsonData = valueArray;
    }

    let curValue = curJsonData ?? targetJsonSchema.default;
    if (isObject(curValue)) {
      curValue = JSON.stringify(curValue);
    }

    const style = targetJsonSchema.style
      ? buildStyle(toJS(targetJsonSchema.style))
      : {};
    const titleStyle = targetJsonSchema.titleStyle
      ? buildStyle(toJS(targetJsonSchema.titleStyle))
      : {};
    const contentStyle = targetJsonSchema.contentStyle
      ? buildStyle(toJS(targetJsonSchema.contentStyle))
      : {};

    return (
      <div
        className={
          pageScreen === 'wideScreen'
            ? 'wide-screen-element-warp'
            : `mobile-screen-element-warp ${
              isNeedTwoCol ? 'two-col-element-warp' : ''
            }`
        }
        // key={nodeKey}
        id={nodeKey}
        style={style}
      >
        <div className="element-title" style={titleStyle}>
          <Tooltip
            title={
              pageScreen === 'wideScreen' ? targetJsonSchema.description : ''
            }
            placement="top"
          >
            <span className="title-text" title={targetJsonSchema.title}>
              {targetJsonSchema.title}
              {targetJsonSchema.showKey && (
                <span>（{truncate(jsonKey || '', { length: 15 })}）</span>
              )}
            </span>
          </Tooltip>
          {pageScreen === 'mobileScreen' && targetJsonSchema.description && (
            <Tooltip title={targetJsonSchema.description} placement="top">
              <InfoCircleOutlined className="info-icon" />
            </Tooltip>
          )}
        </div>
        <div className="content-item" style={contentStyle}>
          <div className="form-item-box select-box">
            <Select
              showSearch={targetJsonSchema.showSearch ?? true}
              mode={targetJsonSchema.multiple ? 'multiple' : undefined}
              defaultActiveFirstOption={
                targetJsonSchema.defaultActiveFirstOption ?? false}
              // The first item is not selected by default.
              style={{ display: 'inline-block', minWidth: '120px' }}
              onChange={this.handleValueChange}
              defaultValue={curValue}
              disabled={readOnly}
              allowClear={targetJsonSchema.allowClear ?? true}
            >
              {options &&
                options.length > 0 &&
                options.map((item: any, optionIndex: number) => {
                  const optionLabel = item.label || item.name;
                  const optionNodeKey = `${nodeKey}-select-${optionLabel}`;
                  return (
                    <Option value={item.value} key={optionNodeKey}>
                      {optionLabel}
                    </Option>
                  );
                })}
            </Select>
          </div>
        </div>
      </div>
    );
  }
}

// Register as a json-editor renderer
registerRenderer({
  type: 'select',
  component: SelectSchema,
});

export default SelectSchema;
