import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { registerRenderer } from '$core/factory';
import { toJS } from 'mobx';
import { BaseRendererProps } from '$types/index';
import { Checkbox, Tooltip } from 'antd';
import { truncate } from '@wibetter/json-utils';
import { catchJsonDataByWebCache } from '$mixins/index';
import { InfoCircleOutlined } from '@ant-design/icons';
import { buildStyle } from '$utils/index';

class CheckboxSchema extends React.PureComponent<BaseRendererProps> {
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
  handleValueChange = (checkedValue: any) => {
    const { keyRoute, jsonStore } = this.props;
    const { updateFormValueData } = jsonStore || {};
    updateFormValueData &&
    keyRoute &&
    updateFormValueData(keyRoute, checkedValue); // Update the value
  };

  render() {
    const { schemaStore, jsonStore } = this.props;
    const { pageScreen } = schemaStore || {};
    const { getJSONDataByKeyRoute } = jsonStore || {};
    const { nodeKey, jsonKey, keyRoute, targetJsonSchema } = this.props;
    const readOnly = targetJsonSchema.readOnly || false; // Whether to make it read-only (default is editable)
    // Retrieve the corresponding value from jsonData
    const curJsonData =
      getJSONDataByKeyRoute && keyRoute && getJSONDataByKeyRoute(keyRoute);
    const options = targetJsonSchema.options;

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
            : 'mobile-screen-element-warp'
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
          <div className="form-item-box">
            <Checkbox.Group
              style={{ display: 'inline-block' }}
              onChange={this.handleValueChange}
              defaultValue={curJsonData ?? targetJsonSchema.default}
              disabled={targetJsonSchema.readOnly}
            >
              {options &&
                options.length > 0 &&
                options.map((item: any, optionIndex: number) => {
                  const optionLabel = item.label || item.name;
                  // const optionNodeKey = `${nodeKey}-select-${optionLabel}`;
                  const optionNodeKey = `select-${optionIndex}-${optionLabel}`;
                  return (
                    <Checkbox value={item.value} key={optionNodeKey}>
                      {optionLabel}
                    </Checkbox>
                  );
                })}
            </Checkbox.Group>
          </div>
        </div>
      </div>
    );
  }
}

// Register as a json-editor renderer
registerRenderer({
  type: 'checkboxes',
  component: CheckboxSchema,
});

export default CheckboxSchema;
