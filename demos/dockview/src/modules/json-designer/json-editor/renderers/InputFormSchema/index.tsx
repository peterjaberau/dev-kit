import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { registerRenderer } from '$core/factory';
import { toJS } from 'mobx';
import { Input, Tooltip, AutoComplete } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { truncate, isArray } from '@wibetter/json-utils';
import { catchJsonDataByWebCache } from '$mixins/index';
import { buildStyle } from '$utils/index';
import { BaseRendererProps } from '$types/index';

class InputFormSchema extends React.PureComponent<BaseRendererProps> {
  constructor(props: BaseRendererProps) {
    super(props);
    // Binding here is necessary so that `this` can be used in the callback function.
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  // Method 1: Declare a static property in the class component, and it must be contextType, to ensure that the current component can use data in the global context (this.context is not empty).
  // static contextType = ThemeContext;

  /** Numerical change event handler */
  handleInputChange = (event: any): void => {
    const { value } = event.target;
    this.handleValueChange(value);
  };

  handleValueChange = (value: any): void => {
    const { keyRoute, jsonStore } = this.props;
    const { updateFormValueData } = jsonStore || {};
    if (this.props.onChange) {
      // If there is a function to monitor data changes, it will be triggered first.
      this.props.onChange(value);
    } else {
      updateFormValueData(keyRoute, value); // Update the value
    }
  };

  componentWillMount() {
    // Retrieve values ​​from web cache
    catchJsonDataByWebCache.call(this);
  }

  componentWillReceiveProps(nextProps: BaseRendererProps): void {
    if (nextProps.keyRoute !== this.props.keyRoute) {
      /** Retrieve the value from the web cache when the key path changes. */
      catchJsonDataByWebCache.call(this, nextProps.keyRoute);
    }
  }

  render() {
    const { schemaStore, jsonStore } = this.props;
    const { pageScreen } = schemaStore || {};
    const { options: _editorOptions, getJSONDataByKeyRoute } = jsonStore || {};
    const { nodeKey, jsonKey, keyRoute, targetJsonSchema } = this.props;
    // Retrieve the corresponding value from jsonData
    const curJsonData = keyRoute && getJSONDataByKeyRoute(keyRoute);
    const readOnly = targetJsonSchema.readOnly || false; // Whether to make it read-only (default is editable)
    const isRequired: boolean = targetJsonSchema.isRequired || false; // Whether the field is required (default is not required)
    const autoComplete = targetJsonSchema.autoComplete || false; // Whether to support optional functions

    const editorOptions = _editorOptions || {};
    let defaultOptions = [];
    if (editorOptions.GlobalOptions && isArray(editorOptions.GlobalOptions)) {
      defaultOptions = editorOptions.GlobalOptions;
    }
    const options = targetJsonSchema.options || defaultOptions; // Whether to support optional options

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
            {autoComplete && (
              <AutoComplete
                className="ant-input"
                style={{ display: 'inline-block' }}
                options={options}
                disabled={readOnly}
                // required={isRequired}
                allowClear={true}
                placeholder={
                  targetJsonSchema.placeholder ||
                  `Please enter ${targetJsonSchema.title}`
                }
                defaultValue={curJsonData ?? targetJsonSchema.default}
                onChange={this.handleValueChange}
              />
            )}
            {!autoComplete && (
              <Input
                style={{ display: 'inline-flex' }}
                disabled={readOnly}
                required={isRequired}
                allowClear={true}
                placeholder={
                  targetJsonSchema.placeholder ||
                  `Please enter ${targetJsonSchema.title}`
                }
                defaultValue={curJsonData ?? targetJsonSchema.default}
                onPressEnter={this.handleInputChange}
                onBlur={this.handleInputChange}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

// Register as a json-editor renderer
registerRenderer({
  type: 'input',
  component: InputFormSchema,
});

export default InputFormSchema;
